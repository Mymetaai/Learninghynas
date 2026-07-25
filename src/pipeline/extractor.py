"""
Extractor Agent Module
Extracts PDF workbooks from 'Spanish Syllabus/', integrates Explorer 1 curriculum extraction,
chunks text using chonkie chunking strategy, and tags each lesson with appropriate CEFR levels.
"""

import os
import re
from typing import List, Dict, Any, Optional, Tuple

os.environ["HF_HUB_OFFLINE"] = "1"
os.environ["TRANSFORMERS_OFFLINE"] = "1"

# Import chonkie chunkers
try:
    from chonkie import SentenceChunker, TokenChunker as WordChunker, WordTokenizer
    HAS_CHONKIE = True
except ImportError:
    try:
        from chonkie import WordChunker, SentenceChunker
        WordTokenizer = None
        HAS_CHONKIE = True
    except ImportError:
        WordTokenizer = None
        HAS_CHONKIE = False


class ChonkieTextChunker:
    """Wrapper around Chonkie text chunking (WordChunker / SentenceChunker) with semantic fallback."""
    def __init__(self, chunk_size: int = 400, chunk_overlap: int = 40):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.word_chunker = None
        self.sentence_chunker = None

        if HAS_CHONKIE:
            try:
                if WordTokenizer:
                    self.word_chunker = WordChunker(tokenizer=WordTokenizer(), chunk_size=chunk_size, chunk_overlap=chunk_overlap)
                else:
                    self.word_chunker = WordChunker(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
            except Exception:
                self.word_chunker = None

            try:
                if WordTokenizer:
                    self.sentence_chunker = SentenceChunker(tokenizer=WordTokenizer(), chunk_size=chunk_size, chunk_overlap=chunk_overlap)
                else:
                    self.sentence_chunker = SentenceChunker(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
            except Exception:
                self.sentence_chunker = None

    def chunk_text(self, text: str) -> Tuple[List[str], str]:
        """Execute text chunking via Chonkie WordChunker/SentenceChunker or fallback. Returns (chunks, chunker_tool_name)."""
        if self.word_chunker:
            try:
                chunks = self.word_chunker.chunk(text)
                return [c.text if hasattr(c, 'text') else str(c) for c in chunks], "chonkie_word_chunker"
            except Exception:
                pass

        if self.sentence_chunker:
            try:
                chunks = self.sentence_chunker.chunk(text)
                return [c.text if hasattr(c, 'text') else str(c) for c in chunks], "chonkie_sentence_chunker"
            except Exception:
                pass

        # Python fallback chunker conforming to word chunking
        words = text.split()
        if not words:
            return [], "python_word_splitter"
        chunks = []
        step = max(1, self.chunk_size - self.chunk_overlap)
        for i in range(0, len(words), step):
            chunk_words = words[i:i + self.chunk_size]
            chunks.append(" ".join(chunk_words))
        return chunks, "python_word_splitter"


class ExtractorAgent:
    """Extractor Agent for Spanish Syllabus PDF workbooks and curriculum data."""

    # Explicit CEFR Level Mapping rules including lesson-level exceptions
    LESSON_CEFR_MAP = {
        # Part 1 (Lessons 1-4) -> A1
        1: 'A1', 2: 'A1', 3: 'A1', 4: 'A1',
        # Part 2 (Lessons 5-8) -> A1
        5: 'A1', 6: 'A1', 7: 'A1', 8: 'A1',
        # Part 3 (Lessons 9-12) -> A2
        9: 'A2', 10: 'A2', 11: 'A2', 12: 'A2',
        # Part 4 (Lessons 13-16) -> A2
        13: 'A2', 14: 'A2', 15: 'A2', 16: 'A2',
        # Part 5 (Lessons 17-21) -> B1 (L21 A2)
        17: 'B1', 18: 'B1', 19: 'B1', 20: 'B1', 21: 'A2',
        # Part 6 (Lessons 22-26) -> B1 (L26 A2)
        22: 'B1', 23: 'B1', 24: 'B1', 25: 'B1', 26: 'A2',
        # Part 7 (Lessons 27-30) -> B2 (L27, L29 B1)
        27: 'B1', 28: 'B2', 29: 'B1', 30: 'B2',
    }

    PART_NUMBER_MAP = {
        **{i: 1 for i in range(1, 5)},
        **{i: 2 for i in range(5, 9)},
        **{i: 3 for i in range(9, 13)},
        **{i: 4 for i in range(13, 17)},
        **{i: 5 for i in range(17, 22)},
        **{i: 6 for i in range(22, 27)},
        **{i: 7 for i in range(27, 31)},
    }

    def __init__(self, workspace_root: str):
        self.workspace_root = workspace_root
        self.syllabus_dir = os.path.join(workspace_root, "Spanish Syllabus")
        self.explorer_curriculum_path = os.path.join(
            workspace_root,
            ".agents",
            "teamwork_preview_explorer_m1_1",
            "extracted_curriculum.md"
        )
        self.chunker = ChonkieTextChunker(chunk_size=400, chunk_overlap=40)

    def get_cefr_level(self, lesson_number: int) -> str:
        """Return the CEFR level for a given lesson number."""
        return self.LESSON_CEFR_MAP.get(lesson_number, 'A1')

    def get_part_number(self, lesson_number: int) -> int:
        """Return the Part number (1-7) for a given lesson number."""
        return self.PART_NUMBER_MAP.get(lesson_number, 1)

    def read_pdf_or_txt_source(self, part_num: int) -> Tuple[str, str]:
        """
        Read source text from Spanish Syllabus PDF workbooks using marker / pypdf / pdfplumber.
        Returns (extracted_text, pdf_tool_used).
        """
        if not hasattr(self, "_part_cache"):
            self._part_cache = {}

        if part_num in self._part_cache:
            return self._part_cache[part_num]

        res = ("", "none")
        # 1. Process PDF workbooks in Spanish Syllabus/
        if os.path.exists(self.syllabus_dir):
            pdf_files = [f for f in os.listdir(self.syllabus_dir) if f.startswith(f"SpanishPart{part_num}_") and f.endswith(".pdf")]
            if pdf_files:
                pdf_path = os.path.join(self.syllabus_dir, pdf_files[0])

                # Try pypdf extraction (fast local extraction)
                try:
                    import pypdf
                    reader = pypdf.PdfReader(pdf_path)
                    page_texts = [page.extract_text() or "" for page in reader.pages]
                    full_text = "\n\n".join(page_texts).strip()
                    if full_text:
                        res = (full_text, "pypdf")
                except Exception:
                    pass

                # Try marker / marker-pdf converter if pypdf didn't succeed
                if res[1] == "none":
                    try:
                        import marker.converters.pdf as marker_pdf
                        if not hasattr(self, "_marker_converter"):
                            self._marker_converter = marker_pdf.PdfConverter()
                        rendered = self._marker_converter(pdf_path)
                        if hasattr(rendered, 'markdown') and rendered.markdown:
                            res = (rendered.markdown, "marker-pdf")
                    except Exception:
                        pass

                # Try pdfplumber extraction
                if res[1] == "none":
                    try:
                        import pdfplumber
                        with pdfplumber.open(pdf_path) as pdf:
                            page_texts = [p.extract_text() or "" for p in pdf.pages]
                            full_text = "\n\n".join(page_texts).strip()
                            if full_text:
                                res = (full_text, "pdfplumber")
                    except Exception:
                        pass

        # 2. Check for extracted txt source files if PDF not read
        if res[1] == "none":
            txt_files = [f for f in os.listdir(self.workspace_root) if f.startswith(f"SpanishPart{part_num}_") and f.endswith(".txt")]
            if txt_files:
                txt_path = os.path.join(self.workspace_root, txt_files[0])
                with open(txt_path, "r", encoding="utf-8", errors="ignore") as f:
                    res = (f.read(), "txt_file")

        self._part_cache[part_num] = res
        return res

    def load_explorer_curriculum(self) -> str:
        """Load extracted curriculum markdown produced by Explorer 1."""
        if os.path.exists(self.explorer_curriculum_path):
            with open(self.explorer_curriculum_path, "r", encoding="utf-8") as f:
                return f.read()
        return ""

    def extract_all_lessons(self) -> Tuple[Dict[int, Dict[str, Any]], str]:
        """
        Processes all 30 lessons (Parts 1 to 7).
        Returns (lessons_data_dict, extractor_tool_name).
        """
        explorer_text = self.load_explorer_curriculum()
        lessons_data: Dict[int, Dict[str, Any]] = {}
        pdf_tools_used = set()
        chunk_tools_used = set()

        for lesson_num in range(1, 31):
            part_num = self.get_part_number(lesson_num)
            cefr_level = self.get_cefr_level(lesson_num)

            # Read raw source text from PDF workbook
            part_text, pdf_tool = self.read_pdf_or_txt_source(part_num)
            if pdf_tool != "none":
                pdf_tools_used.add(pdf_tool)

            # Extract lesson section from explorer curriculum if available
            lesson_section = ""
            pattern = re.compile(rf"### Lesson {lesson_num}: (.*?)(?=### Lesson \d+:|---|$)", re.DOTALL)
            match = pattern.search(explorer_text)
            if match:
                lesson_section = match.group(0).strip()
            else:
                # Fallback extraction from part text
                lesson_pattern = re.compile(rf"Lesson {lesson_num}[:\s]+(.*?)(?=Lesson {lesson_num+1}|PART |$)", re.DOTALL | re.IGNORECASE)
                match2 = lesson_pattern.search(part_text)
                if match2:
                    lesson_section = match2.group(0).strip()

            combined_text = f"Lesson {lesson_num} (Part {part_num}, CEFR {cefr_level})\n"
            if lesson_section:
                combined_text += f"\n[Extracted Curriculum Summary]\n{lesson_section}"
            if part_text:
                combined_text += f"\n[Workbook Excerpt]\n{part_text[:2000]}"

            chunks, chunk_tool = self.chunker.chunk_text(combined_text)
            chunk_tools_used.add(chunk_tool)

            lessons_data[lesson_num] = {
                "lesson_number": lesson_num,
                "part_number": part_num,
                "cefr_level": cefr_level,
                "raw_text": combined_text,
                "chunks": chunks,
                "explorer_summary": lesson_section
            }

        pdf_tool_str = " + ".join(sorted(pdf_tools_used)) if pdf_tools_used else ""
        if "chonkie_word_chunker" in chunk_tools_used:
            chunk_tool_str = "chonkie_word_chunker"
        elif "chonkie_sentence_chunker" in chunk_tools_used:
            chunk_tool_str = "chonkie_sentence_chunker"
        else:
            chunk_tool_str = "python_word_splitter"

        if pdf_tool_str and chunk_tool_str:
            if "chonkie" in chunk_tool_str and pdf_tool_str == "marker-pdf":
                extractor_tool = "marker-pdf + chonkie"
            else:
                extractor_tool = f"{pdf_tool_str} + {chunk_tool_str}"
        elif pdf_tool_str:
            extractor_tool = pdf_tool_str
        else:
            extractor_tool = chunk_tool_str

        return lessons_data, extractor_tool
