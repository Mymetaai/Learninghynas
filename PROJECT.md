# Project: Multi-Agent Educational Content & Observability Pipeline

## Architecture
Multi-agent content processing and exercise generation pipeline for Spanish learning web application with Langfuse observability.

- **Extractor Agent**: Reads PDF workbooks from `Spanish Syllabus/` using `marker-pdf` and `chonkie`, generating CEFR-tagged (A1-C1) lesson chunks.
- **Generator Agent**: Leverages DSPy + Instructor + Gemini (`google-genai` / `litellm`) to generate structured vocabulary, MCQs, fill-in-the-blanks, matching exercises validated against Pydantic schemas mapped to Supabase DB tables (`user_stats`, `learned_vocabulary`, `immersion_chat_messages`).
- **QA/Validator Agent**: Linguistic & CEFR validation, confidence scoring (<0.85 quarantine/retry threshold), schema verification.
- **Mixer Agent**: Merges original syllabus content with AI exercises, distributing and shuffling across 8 web app features (Basic Español, Quest Journey, Stories, Training Grounds, AI Companion, Voice Arena, Today's Quest, Shop) while leaving Adventure Map strictly untouched.
- **Langfuse Layer**: Complete trace logging, latencies, token usages, and quality metrics across all steps.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Architecture | Workspace audit, PDF analysis, Pydantic/Supabase mapping, Langfuse setup | None | DONE |
| 2 | Extraction & Generation | marker-pdf + chonkie extraction, DSPy + Instructor generation, Pydantic schemas | M1 | DONE |
| 3 | QA/Validation & Tracing | Spanish linguistic QA, CEFR validation, retry fallback, Langfuse observability | M2 | DONE |
| 4 | Content Mixing & 8-Feature Distribution | Content merger, shuffling across 8 features, Adventure Map protection | M3 | DONE |
| 5 | System Build & Forensic Verification | npm run build, full end-to-end verification, Challenger & Forensic Audit | M4 | DONE |

## Code Layout
- `Spanish Syllabus/`: Source PDF workbooks
- `src/`: React + TypeScript frontend codebase
- `src/content/`: Application content stores and feature data files
- `.agents/`: Agent metadata and execution logs

## Interface Contracts
- **PDF Lesson Chunk**: `{ lesson_id: string, cefr_level: 'A1'|'A2'|'B1'|'B2'|'C1', title: string, raw_text: string, chunks: Array<{ chunk_id: string, text: string, keywords: string[] }> }`
- **Exercise Schema**: Pydantic validated exercises mapped to Supabase (`learned_vocabulary`, `immersion_chat_messages`, `user_stats`)
- **QA Result**: `{ item_id: string, confidence_score: number, passed: boolean, errors: string[], fallback_triggered: boolean }`
