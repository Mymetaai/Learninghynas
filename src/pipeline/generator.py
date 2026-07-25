"""
Generator Agent Module
Uses Instructor / DSPy / google-genai / litellm calling Gemini API (gemini-2.5-flash / gemini-1.5-flash / gemini-2.0-flash)
to dynamically generate vocabulary, MCQs, fill-in-the-blanks, and matching exercises for all 30 lessons (Parts 1–7)
validated against Pydantic models (models.py).
"""

import os
import json
import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional, Tuple

from src.pipeline.models import (
    UserStats,
    LearnedVocabulary,
    ImmersionChatMessage,
    VocabItem,
    MCQExercise,
    FillBlankExercise,
    MatchingPair,
    MatchingExercise,
    LessonExerciseBundle,
    ExerciseBundle,
)

# LLM Framework Imports
try:
    import instructor
    HAS_INSTRUCTOR = True
except ImportError:
    HAS_INSTRUCTOR = False

try:
    import google.genai as genai
    from google.genai import types as genai_types
    HAS_GOOGLE_GENAI = True
except ImportError:
    HAS_GOOGLE_GENAI = False

try:
    import dspy
    HAS_DSPY = True
except ImportError:
    HAS_DSPY = False

try:
    import litellm
    HAS_LITELLM = True
except ImportError:
    HAS_LITELLM = False

# DSPy Signature Definition
if HAS_DSPY:
    class LessonExerciseSignature(dspy.Signature):
        """DSPy Signature for generating Spanish lesson exercise bundles."""
        lesson_id: str = dspy.InputField(desc="Lesson ID or number")
        raw_text: str = dspy.InputField(desc="Raw text/excerpt of lesson content")
        cefr_level: str = dspy.InputField(desc="CEFR level of lesson")
        bundle_json: str = dspy.OutputField(desc="Structured JSON matching LessonExerciseBundle")


class GeneratorAgent:
    """
    Generator Agent responsible for dynamically producing structured exercise bundles,
    vocabulary items, and Supabase-aligned database models for all 30 lessons.
    Uses Gemini API (gemini-2.5-flash) with Instructor/DSPy/Pydantic validation.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    def _estimate_tokens(self, text: str) -> int:
        """Estimate token count based on standard word/character ratio."""
        return max(1, len(text.split()) * 4 // 3)

    def generate_lesson_exercises(
        self, lesson_num: int, part_num: int, cefr_level: str, extracted_info: Dict[str, Any]
    ) -> Tuple[LessonExerciseBundle, int, int, str, str]:
        """
        Generates structured exercises for a specific lesson based on syllabus topics.
        Returns (LessonExerciseBundle, prompt_tokens, completion_tokens, framework_used, model_used).
        """
        lesson_title, topics = self._get_lesson_metadata(lesson_num)
        raw_text = extracted_info.get("raw_text", "")

        # 1. Attempt DSPy + Instructor + Gemini / LiteLLM pipeline
        if self.api_key and HAS_DSPY:
            try:
                try:
                    lm = dspy.LM("gemini/gemini-2.5-flash", api_key=self.api_key)
                    dspy.configure(lm=lm)
                except Exception:
                    pass

                predictor = dspy.Predict(LessonExerciseSignature)
                prediction = predictor(
                    lesson_id=str(lesson_num),
                    raw_text=raw_text[:1200],
                    cefr_level=cefr_level
                )
                if prediction and hasattr(prediction, "bundle_json") and prediction.bundle_json:
                    bundle_data = json.loads(prediction.bundle_json)
                    response = LessonExerciseBundle.model_validate(bundle_data)
                    p_tokens = self._estimate_tokens(f"{lesson_num} {raw_text[:1200]} {cefr_level}")
                    c_tokens = self._estimate_tokens(response.model_dump_json())
                    return response, p_tokens, c_tokens, "DSPy + Instructor + Gemini", "dspy-gemini-2.5-flash"
            except Exception:
                pass

        # 2. Attempt Instructor + Gemini / LiteLLM pipeline
        if self.api_key and HAS_INSTRUCTOR and (HAS_GOOGLE_GENAI or HAS_LITELLM):
            try:
                prompt = (
                    f"Generate a Spanish learning lesson bundle for Lesson {lesson_num} (Part {part_num}, CEFR {cefr_level}). "
                    f"Title: {lesson_title}. Topics: {', '.join(topics)}.\n"
                    f"Workbook excerpt:\n{raw_text[:1200]}"
                )
                if HAS_GOOGLE_GENAI:
                    client = genai.Client(api_key=self.api_key)
                    inst_client = instructor.from_genai(client)
                    response = inst_client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=prompt,
                        response_model=LessonExerciseBundle,
                    )
                    p_tokens = self._estimate_tokens(prompt)
                    c_tokens = self._estimate_tokens(response.model_dump_json())
                    return response, p_tokens, c_tokens, "Instructor + Gemini", "gemini-2.5-flash"
                elif HAS_LITELLM:
                    inst_client = instructor.patch()
                    response = inst_client.chat.completions.create(
                        model="gemini/gemini-2.5-flash",
                        response_model=LessonExerciseBundle,
                        messages=[{"role": "user", "content": prompt}],
                        api_key=self.api_key,
                    )
                    p_tokens = self._estimate_tokens(prompt)
                    c_tokens = self._estimate_tokens(response.model_dump_json())
                    return response, p_tokens, c_tokens, "Instructor + Gemini", "gemini-2.5-flash"
            except Exception:
                pass

        # 3. Fallback to Pydantic Engine (dynamic rule-based generator)
        vocab_list = self._build_vocabulary_for_lesson(lesson_num, cefr_level, extracted_info)
        mcq_list = self._build_mcqs_for_lesson(lesson_num, cefr_level, extracted_info)
        fill_list = self._build_fill_blanks_for_lesson(lesson_num, cefr_level, extracted_info)
        match_list = self._build_matching_for_lesson(lesson_num, cefr_level, extracted_info)

        bundle = LessonExerciseBundle(
            lessonNumber=lesson_num,
            partNumber=part_num,
            title=lesson_title,
            cefrLevel=cefr_level,
            topics=topics,
            vocabulary=vocab_list,
            mcqs=mcq_list,
            fillInBlanks=fill_list,
            matchingPairs=match_list,
        )

        prompt_str = f"Lesson {lesson_num} {lesson_title} {cefr_level} {raw_text[:500]}"
        completion_str = bundle.model_dump_json()
        p_tokens = self._estimate_tokens(prompt_str)
        c_tokens = self._estimate_tokens(completion_str)

        return bundle, p_tokens, c_tokens, "Pydantic Engine", "none (local_pydantic_engine)"

    def generate_full_bundle(self, extracted_lessons: Dict[int, Dict[str, Any]]) -> Tuple[ExerciseBundle, int, int, str, str]:
        """
        Generates the complete ExerciseBundle covering all 30 lessons and sample Supabase models.
        Returns (ExerciseBundle, total_prompt_tokens, total_completion_tokens, framework_used, model_used).
        """
        lessons_map: Dict[str, LessonExerciseBundle] = {}
        total_p_tokens = 0
        total_c_tokens = 0
        frameworks_used = set()
        models_used = set()

        for lesson_num in range(1, 31):
            info = extracted_lessons.get(lesson_num, {})
            part_num = info.get("part_number", 1)
            cefr_level = info.get("cefr_level", "A1")
            bundle, p_tok, c_tok, fw, model_name = self.generate_lesson_exercises(lesson_num, part_num, cefr_level, info)
            lessons_map[f"lesson_{lesson_num}"] = bundle
            total_p_tokens += p_tok
            total_c_tokens += c_tok
            frameworks_used.add(fw)
            models_used.add(model_name)

        if "DSPy + Instructor + Gemini" in frameworks_used:
            framework_used = "DSPy + Instructor + Gemini"
            model_used = "dspy-gemini-2.5-flash"
        elif "Instructor + Gemini" in frameworks_used:
            framework_used = "Instructor + Gemini"
            model_used = "gemini-2.5-flash"
        else:
            framework_used = "Pydantic Engine"
            model_used = "none (local_pydantic_engine)"

        sample_user_id = str(uuid.uuid4())
        user_stats_sample = UserStats(
            id=str(uuid.uuid4()),
            user_id=sample_user_id,
            streak=5,
            coins=250,
            xp=1200,
            level=3,
            completed_lessons={f"lesson_{i}": True for i in range(1, 6)},
            updated_at=datetime.utcnow().isoformat() + "Z",
        )

        learned_vocab_sample = [
            LearnedVocabulary(
                id=str(uuid.uuid4()),
                user_id=sample_user_id,
                word="hablar",
                meaning="to speak",
                learned_at=datetime.utcnow().isoformat() + "Z",
            ),
            LearnedVocabulary(
                id=str(uuid.uuid4()),
                user_id=sample_user_id,
                word="comer",
                meaning="to eat",
                learned_at=datetime.utcnow().isoformat() + "Z",
            ),
        ]

        immersion_chat_sample = [
            ImmersionChatMessage(
                id=str(uuid.uuid4()),
                user_id=sample_user_id,
                session_key="session_001_intro",
                sender="assistant",
                text="¡Hola! ¿Cómo estás hoy?",
                translation="Hello! How are you today?",
                metadata={"topic": "greetings", "cefr": "A1"},
                created_at=datetime.utcnow().isoformat() + "Z",
            )
        ]

        full_bundle = ExerciseBundle(
            totalLessons=30,
            generatedAt=datetime.utcnow().isoformat() + "Z",
            userStatsSample=user_stats_sample,
            learnedVocabularySample=learned_vocab_sample,
            immersionChatSample=immersion_chat_sample,
            lessons=lessons_map,
        )

        return full_bundle, total_p_tokens, total_c_tokens, framework_used, model_used

    def generate_candidate_items(self, extracted_lessons: Dict[int, Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], int, int, str, str]:
        """
        Generates candidate items for QA validation batch processing.
        Returns (candidate_items_list, prompt_tokens, completion_tokens, framework_used, model_used).
        """
        bundle, p_tok, c_tok, framework_used, model_used = self.generate_full_bundle(extracted_lessons)
        candidate_items: List[Dict[str, Any]] = []

        for lesson_key, lesson_bundle in bundle.lessons.items():
            lvl = lesson_bundle.cefrLevel

            for mcq in lesson_bundle.mcqs:
                candidate_items.append({
                    "id": mcq.id,
                    "level": lvl,
                    "type": mcq.type,
                    "prompt": mcq.prompt,
                    "answer": mcq.answer,
                    "options": mcq.options,
                    "explanation": mcq.explanation,
                })

            for fib in lesson_bundle.fillInBlanks:
                candidate_items.append({
                    "id": fib.id,
                    "level": lvl,
                    "type": fib.type,
                    "prompt": fib.prompt,
                    "answer": fib.answer,
                    "options": fib.options or [fib.answer],
                    "context": fib.context or "",
                })

            for v in lesson_bundle.vocabulary:
                candidate_items.append({
                    "id": f"vocab_{lesson_bundle.lessonNumber}_{v.word}",
                    "level": lvl,
                    "type": "vocabulary",
                    "es": v.word,
                    "en": v.meaning,
                    "prompt": v.example,
                    "answer": v.word,
                    "options": [v.word, "gracias", "adios", "hola"],
                })

        return candidate_items, p_tok, c_tok, framework_used, model_used

    def _get_lesson_metadata(self, lesson_num: int) -> Tuple[str, List[str]]:
        titles = {
            1: ("Intro to Spanish & Vowel Pronunciation", ["alphabet-pronunciation", "greetings"]),
            2: ("Gender of Nouns & Definite Articles", ["classroom-objects", "nouns"]),
            3: ("Subject Pronouns & Verb Ser", ["pronouns", "verbs-ser"]),
            4: ("Regular -AR Verbs & Negation", ["verbs-ar", "negation"]),
            5: ("Indefinite Articles & Numbers to 100", ["articles", "numbers"]),
            6: ("Verb Estar & Numbers over 100", ["verbs-estar", "numbers-100"]),
            7: ("Regular -ER and -IR Verbs", ["verbs-er", "verbs-ir"]),
            8: ("Verb Ir & Question Words", ["verbs-ir", "questions"]),
            9: ("Dates, Calendar & Seasons", ["calendar", "seasons"]),
            10: ("Telling Time & Schedule", ["time", "schedule"]),
            11: ("Tener Idioms & Physical States", ["verbs-tener", "idioms"]),
            12: ("Hacer, Weather & Saber vs Conocer", ["weather", "saber-conocer"]),
            13: ("Stem-Changing Boot Verbs", ["stem-changing", "verbs"]),
            14: ("Yo-Go Irregular Present Verbs", ["irregular-verbs", "present"]),
            15: ("Present Progressive Tense", ["progressive", "gerund"]),
            16: ("Direct Object Pronouns & Adverbs", ["dop", "adverbs"]),
            17: ("Demonstratives & Possessives", ["demonstratives", "possessives"]),
            18: ("Indefinites & Negative Expressions", ["negatives", "indefinites"]),
            19: ("Indirect Object Pronouns & Gustar", ["iop", "gustar"]),
            20: ("Double Object Pronoun Combinations", ["double-objects", "pronouns"]),
            21: ("Reflexive Verbs & Daily Routine", ["reflexives", "daily-routine"]),
            22: ("Recent Past & Duration Expressions", ["recent-past", "duration"]),
            23: ("Present Duration & Time Queries", ["duration", "questions"]),
            24: ("Formal Commands & Comparisons", ["commands-usted", "comparisons"]),
            25: ("Informal Tú Commands", ["commands-tu", "imperative"]),
            26: ("Preterite Past Tense Regulars", ["preterite-regular", "past"]),
            27: ("Imperfect Tense Description", ["imperfect", "past-description"]),
            28: ("Preterite Irregular Stems", ["preterite-irregular", "past"]),
            29: ("Preterite vs Imperfect Contrast", ["aspect-contrast", "past"]),
            30: ("Superlatives & Synthesis", ["superlatives", "synthesis"]),
        }
        return titles.get(lesson_num, (f"Lesson {lesson_num}", ["general"]))

    def _build_vocabulary_for_lesson(self, lesson_num: int, level: str, extracted_info: Optional[Dict[str, Any]] = None) -> List[VocabItem]:
        if not hasattr(self, "_vocab_cache"):
            self._vocab_cache = {}
        if lesson_num in self._vocab_cache:
            return self._vocab_cache[lesson_num]

        lesson_title, topics = self._get_lesson_metadata(lesson_num)
        main_topic = topics[0] if topics else "general"

        # 1. Dynamic extraction from extracted_info (curriculum markdown tables & bold terms)
        extracted_vocab_items = []
        if extracted_info and isinstance(extracted_info, dict):
            raw_text = extracted_info.get("raw_text", "")
            explorer_summary = extracted_info.get("explorer_summary", "")
            content_to_parse = explorer_summary or raw_text

            for line in content_to_parse.splitlines():
                line_str = line.strip()
                if line_str.startswith("|") and not line_str.startswith("| Spanish") and not line_str.startswith("| :---"):
                    parts = [p.strip() for p in line_str.split("|")[1:-1]]
                    if len(parts) >= 2:
                        w_raw = parts[0].replace("**", "").strip()
                        m_raw = parts[1].strip()
                        pos_raw = parts[2].strip() if len(parts) > 2 else main_topic
                        notes_raw = parts[3].strip() if len(parts) > 3 else f"Lesson {lesson_num} vocabulary"

                        if w_raw.lower() in ["spanish", "word", "term", "---", ""] or m_raw.lower() in ["english", "meaning", "---", ""]:
                            continue

                        ex_es = f"En la lección {lesson_num}, estudiamos: {w_raw}."
                        ex_en = f"In Lesson {lesson_num}, we study: {m_raw}."

                        cue = notes_raw if notes_raw else f"Pronunciation for {w_raw}"
                        extracted_vocab_items.append(
                            VocabItem(
                                word=w_raw,
                                meaning=m_raw,
                                pronunciation=f"pron-{w_raw.lower().replace(' ', '-')}",
                                example=ex_es,
                                exampleTranslation=ex_en,
                                audioCue=cue,
                                levelIntroduced=level,
                                topic=main_topic,
                            )
                        )

        # 2. Predefined lesson-specific dictionary
        items_raw = {
            1: [
                ("hola", "hello", "OH-lah", "¡Hola! ¿Cómo estás?", "Hello! How are you?", "Stress on OH", "greetings"),
                ("buenos días", "good morning", "BWEH-nohs DEE-ahs", "Buenos días, profesor.", "Good morning, professor.", "Soft d sound", "greetings"),
                ("mucho gusto", "nice to meet you", "MOO-choh GOOS-toh", "Mucho gusto en conocerte.", "Nice to meet you.", "Pure u sound", "greetings"),
            ],
            2: [
                ("el libro", "the book", "ehl LEE-broh", "El libro está en la mesa.", "The book is on the table.", "Masc. article el", "classroom-objects"),
                ("la casa", "the house", "lah KAH-sah", "La casa es grande y azul.", "The house is big and blue.", "Fem. article la", "nouns"),
            ],
            3: [
                ("yo soy", "I am", "yoh soy", "Yo soy estudiante de español.", "I am a Spanish student.", "Verb ser identity", "verbs-ser"),
                ("tú eres", "you are", "too EH-rehs", "Tú eres mi mejor amigo.", "You are my best friend.", "Verb ser informal", "verbs-ser"),
            ],
            4: [
                ("hablar", "to speak", "ah-BLAHR", "No hablo francés, hablo español.", "I don't speak French, I speak Spanish.", "Silent h", "verbs-ar"),
                ("estudiar", "to study", "es-too-DYAHR", "Estudio español por la tarde.", "I study Spanish in the afternoon.", "Starts with e", "verbs-ar"),
            ],
            5: [
                ("un cuaderno", "a notebook", "oon kwah-DEHR-noh", "Tengo un cuaderno verde.", "I have a green notebook.", "Indefinite article un", "articles"),
                ("cincuenta", "fifty", "seen-KWEHN-tah", "El libro tiene cincuenta páginas.", "The book has fifty pages.", "Number 50", "numbers"),
            ],
            6: [
                ("estar en", "to be in/at", "ehs-TAHR ehn", "El profesor está en la clase.", "The teacher is in the classroom.", "Temporary location", "verbs-estar"),
                ("doscientos", "two hundred", "dohs-SYEHN-tohs", "Cuesta doscientos euros.", "It costs two hundred euros.", "Number 200", "numbers-100"),
            ],
            7: [
                ("comer", "to eat", "koh-MEHR", "Comemos manzanas frescas.", "We eat fresh apples.", "-ER verb", "verbs-er"),
                ("vivir", "to live", "bee-BEER", "Vivo en Madrid con mi familia.", "I live in Madrid with my family.", "-IR verb", "verbs-ir"),
            ],
            8: [
                ("ir a", "to go to", "eer ah", "Voy a la biblioteca ahora.", "I am going to the library now.", "Irregular verb ir", "verbs-ir"),
                ("¿dónde?", "where?", "DOHN-deh", "¿Dónde está la estación de tren?", "Where is the train station?", "Inverted question mark", "questions"),
            ],
            9: [
                ("la primavera", "spring", "lah pree-mah-BEH-rah", "La primavera empieza en marzo.", "Spring starts in March.", "Season noun", "seasons"),
                ("el calendario", "the calendar", "ehl kah-lehn-DAH-ryoh", "Miro el calendario de la clase.", "I look at the class calendar.", "Date topic", "calendar"),
            ],
            10: [
                ("son las dos", "it is two o'clock", "sohn lahs DOHS", "Son las dos de la tarde.", "It is two in the afternoon.", "Plural time", "time"),
                ("el horario", "the schedule", "ehl oh-RAH-ryoh", "Mi horario de clases es flexible.", "My class schedule is flexible.", "Schedule topic", "schedule"),
            ],
            11: [
                ("tengo hambre", "I am hungry", "TEHN-goh AHM-breh", "Tengo hambre, quiero comer algo.", "I am hungry, I want to eat something.", "Tener idiom", "verbs-tener"),
                ("tengo frío", "I am cold", "TEHN-goh FREE-oh", "Hace viento y tengo frío.", "It is windy and I am cold.", "Physical state", "idioms"),
            ],
            12: [
                ("hace sol", "it is sunny", "AH-seh SOHL", "Hoy hace sol en la playa.", "Today it is sunny at the beach.", "Weather expression", "weather"),
                ("conocer", "to know (people/places)", "koh-noh-SEHR", "Conozco la ciudad de Madrid.", "I know the city of Madrid.", "Saber vs conocer", "saber-conocer"),
            ],
            13: [
                ("pensar", "to think", "pehn-SAHR", "Pienso que el español es útil.", "I think Spanish is useful.", "e->ie stem change", "stem-changing"),
                ("dormir", "to sleep", "dohr-MEER", "Duermo ocho horas cada noche.", "I sleep eight hours every night.", "o->ue stem change", "verbs"),
            ],
            14: [
                ("hacer", "to do/make", "ah-SEHR", "Hago la tarea todos los días.", "I do homework every day.", "Yo-go verb hago", "irregular-verbs"),
                ("poner", "to put/place", "poh-NEHR", "Pongo los libros en la mesa.", "I put the books on the table.", "Yo-go verb pongo", "present"),
            ],
            15: [
                ("estoy hablando", "I am speaking", "ehs-TOY ah-BLAHN-doh", "Estoy hablando con mi profesor.", "I am speaking with my teacher.", "Gerund -ando", "progressive"),
                ("está comiendo", "he/she is eating", "ehs-TAH koh-MYEHN-doh", "Está comiendo una fruta.", "He is eating a fruit.", "Gerund -iendo", "gerund"),
            ],
            16: [
                ("lo veo", "I see it/him", "loh BEH-oh", "El libro está allí, lo veo.", "The book is there, I see it.", "Direct object pronoun lo", "dop"),
                ("rápidamente", "quickly", "RAH-pee-dah-MEHN-teh", "Camina rápidamente a la clase.", "She walks quickly to class.", "Adverb -mente", "adverbs"),
            ],
            17: [
                ("este libro", "this book", "EHS-teh LEE-broh", "Este libro es muy interesante.", "This book is very interesting.", "Demonstrative este", "demonstratives"),
                ("nuestro", "our", "NWEHS-troh", "Nuestro profesor es amable.", "Our teacher is friendly.", "Possessive adjective", "possessives"),
            ],
            18: [
                ("nada", "nothing", "NAH-dah", "No hay nada en la caja.", "There is nothing in the box.", "Negative word", "negatives"),
                ("alguien", "someone", "AHL-gyehn", "¿Hay alguien en la clase?", "Is there someone in the classroom?", "Indefinite word", "indefinites"),
            ],
            19: [
                ("me gusta", "I like (it pleases me)", "meh GOOS-tah", "Me gusta la música española.", "I like Spanish music.", "Verb gustar with IOP", "iop"),
                ("les encanta", "they love", "lehs ehn-KAHN-tah", "Les encanta aprender idiomas.", "They love learning languages.", "Enkantar structure", "gustar"),
            ],
            20: [
                ("se lo doy", "I give it to him/her", "seh loh DOHY", "El libro es de Juan, se lo doy.", "The book is Juan's, I give it to him.", "Double object se lo", "double-objects"),
                ("me la trae", "he brings it to me", "meh lah TRAH-eh", "La comida está lista, me la trae.", "The food is ready, he brings it to me.", "DOP and IOP combination", "pronouns"),
            ],
            21: [
                ("lavarse", "to wash oneself", "lah-BAHR-seh", "Me lavo las manos antes de comer.", "I wash my hands before eating.", "Reflexive verb", "reflexives"),
                ("despertarse", "to wake up", "dehs-pehr-TAHR-seh", "Me despierto a las siete.", "I wake up at seven o'clock.", "Daily routine", "daily-routine"),
            ],
            22: [
                ("acabo de", "I have just", "ah-KAH-boh deh", "Acabo de terminar la lección.", "I have just finished the lesson.", "Recent past expression", "recent-past"),
                ("hace dos horas", "two hours ago", "AH-seh dohs OH-rahs", "Llegué hace dos horas.", "I arrived two hours ago.", "Time duration", "duration"),
            ],
            23: [
                ("¿cuánto tiempo hace?", "how long has it been?", "KWAHN-toh TYEHM-poh AH-seh", "¿Cuánto tiempo hace que estudias?", "How long have you been studying?", "Time duration query", "questions"),
                ("llevo tres años", "I have been ... for three years", "YEH-boh trehs AH-nyohs", "Llevo tres años viviendo aquí.", "I have been living here for three years.", "Duration expression", "duration"),
            ],
            24: [
                ("hable usted", "speak (formal)", "AH-bleh oo-STEHD", "Por favor, hable usted más despacio.", "Please speak more slowly.", "Usted command", "commands-usted"),
                ("más que", "more than", "mahs keh", "Este curso es más interesante que el anterior.", "This course is more interesting than the previous one.", "Comparative", "comparisons"),
            ],
            25: [
                ("habla", "speak! (informal)", "AH-blah", "¡Habla en español con tu compañero!", "Speak in Spanish with your classmate!", "Affirmative tú command", "commands-tu"),
                ("no hables", "don't speak! (informal)", "noh AH-blehs", "¡No hables durante el examen!", "Don't speak during the exam!", "Negative tú command", "imperative"),
            ],
            26: [
                ("hablé", "I spoke", "ah-BLEH", "Ayer hablé con el director.", "Yesterday I spoke with the director.", "Preterite regular -AR", "preterite-regular"),
                ("comí", "I ate", "koh-MEE", "Anoche comí una pizza deliciosa.", "Last night I ate a delicious pizza.", "Preterite regular -ER", "past"),
            ],
            27: [
                ("hablaba", "I used to speak / was speaking", "ah-BLAH-bah", "Cuando era niño, hablaba poco.", "When I was a child, I used to speak little.", "Imperfect -AR", "imperfect"),
                ("vivía", "I used to live / was living", "bee-BEE-ah", "Vivía en una casa pequeña.", "I used to live in a small house.", "Imperfect -IR description", "past-description"),
            ],
            28: [
                ("estuve", "I was (preterite)", "ehs-TOO-beh", "Ayer estuve en la biblioteca todo el día.", "Yesterday I was at the library all day.", "Irregular preterite estuvo", "preterite-irregular"),
                ("tuve", "I had (preterite)", "TOO-beh", "Tuve un problema con el coche.", "I had a problem with the car.", "Irregular preterite tuve", "past"),
            ],
            29: [
                ("mientras", "while", "MYEHN-trahs", "Mientras leía, sonó el teléfono.", "While I was reading, the phone rang.", "Aspect contrast connector", "aspect-contrast"),
                ("de repente", "suddenly", "deh reh-PEHN-teh", "Estudiaba cuando de repente se cortó la luz.", "I was studying when suddenly the power went out.", "Preterite trigger", "past"),
            ],
            30: [
                ("el más grande", "the biggest", "ehl mahs GRAHN-deh", "Este es el edificio más grande de la ciudad.", "This is the biggest building in the city.", "Superlative expression", "superlatives"),
                ("la mejor opción", "the best option", "lah meh-HOR ohp-SYOHN", "Aprender español es la mejor opción.", "Learning Spanish is the best option.", "Irregular superlative", "synthesis"),
            ],
        }

        raw = items_raw.get(lesson_num, [
            (f"tema_{lesson_num}", f"topic {lesson_num}", f"teh-mah {lesson_num}", f"Estudiamos el tema {lesson_num}.", f"We study topic {lesson_num}.", f"Lesson {lesson_num} vocabulary", main_topic)
        ])
        dict_items = [
            VocabItem(
                word=w,
                meaning=m,
                pronunciation=p,
                example=ex,
                exampleTranslation=ex_tr,
                audioCue=cue,
                levelIntroduced=level,
                topic=top,
            )
            for w, m, p, ex, ex_tr, cue, top in raw
        ]

        # Combine extracted items with dict items, deduplicating by word
        combined = list(extracted_vocab_items)
        existing_words = {v.word.lower() for v in combined}
        for item in dict_items:
            if item.word.lower() not in existing_words:
                combined.append(item)
                existing_words.add(item.word.lower())

        self._vocab_cache[lesson_num] = combined
        return combined

    def _build_mcqs_for_lesson(self, lesson_num: int, level: str, extracted_info: Optional[Dict[str, Any]] = None) -> List[MCQExercise]:
        vocab_items = self._build_vocabulary_for_lesson(lesson_num, level, extracted_info)
        mcqs_raw = {
            1: [
                ("How do you greet someone in Spanish in the morning?", "Buenos días", ["Buenos días", "Buenas noches", "Hasta luego", "Por favor"], "Buenos días is used from sunrise until noon."),
                ("Which vowel sound in Spanish sounds like 'ee' in machine?", "I", ["A", "E", "I", "U"], "Spanish 'I' is pronounced crisp and high like 'ee'."),
            ],
            2: [
                ("What is the correct definite article for 'casa' (house)?", "la", ["el", "la", "los", "las"], "'Casa' is a feminine singular noun taking 'la'."),
            ],
            3: [
                ("Which verb form corresponds to 'yo' for the verb ser?", "soy", ["soy", "eres", "es", "somos"], "'Soy' is the first person singular form of ser."),
            ],
            4: [
                ("How do you say 'I do not speak' in Spanish?", "No hablo", ["No hablo", "Yo no hablar", "Hablo no", "No hablas"], "Negation 'no' precedes the conjugated verb."),
            ],
            5: [
                ("What is the correct Spanish word for the number 50?", "cincuenta", ["cincuenta", "cuarenta", "sesenta", "cincuenta y cinco"], "Cincuenta is Spanish for 50."),
            ],
            6: [
                ("Which verb is used for temporary locations (e.g. 'The teacher is in class')?", "estar", ["estar", "ser", "haber", "tener"], "Estar is used for temporary states and locations."),
            ],
            7: [
                ("What is the 'nosotros' form of the regular -ER verb 'comer'?", "comemos", ["comemos", "como", "comes", "comen"], "-ER verbs take -emos for nosotros in present tense."),
            ],
            8: [
                ("What does the question word '¿Dónde?' mean in English?", "Where?", ["Where?", "When?", "Why?", "Who?"], "'¿Dónde?' asks about location."),
            ],
            9: [
                ("Which season in Spanish means 'spring'?", "la primavera", ["la primavera", "el verano", "el otoño", "el invierno"], "La primavera is spring."),
            ],
            10: [
                ("How do you say 'It is two o'clock' in Spanish?", "Son las dos", ["Son las dos", "Es la una", "Son dos horas", "Tengo dos horas"], "'Son las dos' is used for plural hours."),
            ],
            11: [
                ("Which tener idiom means 'I am hungry'?", "Tengo hambre", ["Tengo hambre", "Soy hambriento", "Tengo frío", "Estoy hambre"], "'Tener hambre' literally means to have hunger."),
            ],
            12: [
                ("Which verb means 'to know a person or place'?", "conocer", ["conocer", "saber", "hacer", "tener"], "Conocer is used for familiarity with people and places."),
            ],
            13: [
                ("What is the 'yo' form of the stem-changing verb 'pensar' (e->ie)?", "pienso", ["pienso", "penso", "piensa", "pensamos"], "Pensar undergoes e->ie stem change to pienso."),
            ],
            14: [
                ("What is the irregular 'yo' form of 'hacer' in present tense?", "hago", ["hago", "haco", "hace", "hacemos"], "Hacer is a yo-go verb producing hago."),
            ],
            15: [
                ("What is the present progressive form of 'hablar' for 'yo'?", "estoy hablando", ["estoy hablando", "hablé", "hablaba", "hablaré"], "Present progressive requires estar + gerund (-ando)."),
            ],
            16: [
                ("Which direct object pronoun replaces 'el libro' (masculine singular)?", "lo", ["lo", "la", "los", "las"], "'Lo' replaces masculine singular direct objects."),
            ],
            17: [
                ("Which demonstrative adjective means 'this book' (close to speaker)?", "este libro", ["este libro", "ese libro", "aquel libro", "esta libro"], "'Este' is used for masculine singular near the speaker."),
            ],
            18: [
                ("What is the Spanish word for 'nothing'?", "nada", ["nada", "nadie", "nunca", "alguien"], "'Nada' means nothing."),
            ],
            19: [
                ("How do you say 'I like Spanish music' using gustar?", "Me gusta la música española", ["Me gusta la música española", "Yo gusto la música", "Le gusta la música", "Nos gusta el español"], "Gustar takes IOP 'me' for 'yo'."),
            ],
            20: [
                ("When direct and indirect pronouns combine (le + lo), what does 'le' change to?", "se", ["se", "me", "te", "nos"], "Le/les changes to 'se' before lo/la/los/las."),
            ],
            21: [
                ("What is the reflexive pronoun for 'yo' in daily routine verbs?", "me", ["me", "te", "se", "nos"], "'Me' is the reflexive pronoun for yo."),
            ],
            22: [
                ("What does the expression 'acabo de comer' mean?", "I have just eaten", ["I have just eaten", "I am going to eat", "I ate yesterday", "I want to eat"], "'Acabar de + infinitive' means to have just done something."),
            ],
            23: [
                ("How do you ask 'How long have you been studying?' in Spanish?", "¿Cuánto tiempo hace que estudias?", ["¿Cuánto tiempo hace que estudias?", "¿Cuándo estudias?", "¿Por qué estudias?", "¿Dónde estudias?"], "'¿Cuánto tiempo hace que...?' queries duration."),
            ],
            24: [
                ("What is the formal 'usted' command for 'hablar'?", "hable", ["hable", "habla", "hablas", "hablen"], "Formal usted command for -AR verbs ends in -e."),
            ],
            25: [
                ("What is the informal affirmative 'tú' command for 'hablar'?", "habla", ["habla", "hables", "hable", "hablar"], "Affirmative tú command uses 3rd person singular present form."),
            ],
            26: [
                ("What is the preterite past tense form of 'comer' for 'yo'?", "comí", ["comí", "como", "comía", "comeré"], "Preterite regular -ER ending for 'yo' is -í."),
            ],
            27: [
                ("Which tense is used to describe habitual past actions (e.g. 'I used to live')?", "imperfect", ["imperfect", "preterite", "present", "future"], "Imperfect describes ongoing/habitual past actions."),
            ],
            28: [
                ("What is the irregular preterite stem of 'tener' for 'yo'?", "tuve", ["tuve", "tenía", "tengo", "tendré"], "Tener has irregular preterite stem tuv- -> tuve."),
            ],
            29: [
                ("Which word signals a sudden completed past event interacting with an imperfect background?", "de repente", ["de repente", "mientras", "siempre", "cada día"], "'De repente' triggers a preterite action."),
            ],
            30: [
                ("How do you express 'the best option' in Spanish?", "la mejor opción", ["la mejor opción", "la más buena opción", "la opción mayor", "la peor opción"], "'Mejor' is the irregular superlative for 'bueno'."),
            ],
        }

        lesson_title, topics = self._get_lesson_metadata(lesson_num)
        raw_predefined = mcqs_raw.get(lesson_num, [])
        result_mcqs = [
            MCQExercise(
                id=f"mcq_l{lesson_num}_{idx}",
                prompt=prompt,
                answer=ans,
                options=opts,
                explanation=expl,
            )
            for idx, (prompt, ans, opts, expl) in enumerate(raw_predefined, 1)
        ]

        # Dynamically generate MCQs from vocabulary items extracted for this lesson
        all_meanings = [v.meaning for v in vocab_items]
        for idx, item in enumerate(vocab_items, len(result_mcqs) + 1):
            distractors = [m for m in all_meanings if m != item.meaning]
            standard_distractors = ["good morning", "thank you", "goodbye", "please", "see you later", "welcome"]
            for d in standard_distractors:
                if d not in distractors and d != item.meaning:
                    distractors.append(d)

            options = [item.meaning] + distractors[:3]
            options = sorted(options, key=lambda x: len(x))

            mcq = MCQExercise(
                id=f"mcq_l{lesson_num}_{idx}",
                prompt=f"What is the English meaning of the Spanish term '{item.word}'?",
                answer=item.meaning,
                options=options,
                explanation=f"'{item.word}' translates to '{item.meaning}' in Spanish (Lesson {lesson_num}: {item.topic}).",
            )
            result_mcqs.append(mcq)

        return result_mcqs

    def _build_fill_blanks_for_lesson(self, lesson_num: int, level: str, extracted_info: Optional[Dict[str, Any]] = None) -> List[FillBlankExercise]:
        vocab_items = self._build_vocabulary_for_lesson(lesson_num, level, extracted_info)
        fill_raw = {
            1: [("¡Hola! Me ___ Carlos.", "llamo", ["llamo", "eres", "está", "tengo"], "Introducing yourself")],
            2: [("La ___ está en la mesa.", "casa", ["casa", "perro", "libro", "cuaderno"], "Feminine noun practice")],
            3: [("Yo ___ estudiante de español.", "soy", ["soy", "eres", "es", "somos"], "Ser conjugation for yo")],
            4: [("Yo no ___ francés.", "hablo", ["hablo", "hablas", "habla", "hablamos"], "Negation with regular -AR verb")],
            5: [("Tengo ___ cuaderno verde en la mochila.", "un", ["un", "una", "unos", "unas"], "Indefinite article for masculine singular noun")],
            6: [("El profesor ___ en el aula hoy.", "está", ["está", "es", "tienen", "van"], "Estar for location")],
            7: [("Nosotros ___ una pizza deliciosa.", "comemos", ["comemos", "como", "comes", "comen"], "-ER verb present tense")],
            8: [("¿___ está la estación de tren?", "Dónde", ["Dónde", "Cuándo", "Por qué", "Quién"], "Question word for location")],
            9: [("La ___ empieza en marzo.", "primavera", ["primavera", "verano", "otoño", "invierno"], "Season vocabulary")],
            10: [("Son las ___ de la tarde.", "dos", ["dos", "una", "primero", "cero"], "Time expression")],
            11: [("Cuando hace frío, yo ___ frío.", "tengo", ["tengo", "soy", "estoy", "hago"], "Tener idiom for physical state")],
            12: [("Hoy ___ sol en la playa.", "hace", ["hace", "es", "está", "tiene"], "Weather expression with hacer")],
            13: [("Yo ___ (pensar) que el examen es fácil.", "pienso", ["pienso", "penso", "piensa", "pensamos"], "e->ie stem-changing verb")],
            14: [("Por la mañana yo ___ (hacer) la tarea.", "hago", ["hago", "haco", "hace", "hacemos"], "Yo-go irregular verb")],
            15: [("Ahora mismo estoy ___ (hablar) español.", "hablando", ["hablando", "hablado", "hablar", "hables"], "Gerund form for present progressive")],
            16: [("Tengo el libro y ___ (it) leo ahora.", "lo", ["lo", "la", "los", "las"], "Direct object pronoun placement")],
            17: [("___ (this) libro es muy interesante.", "Este", ["Este", "Ese", "Aquel", "Esta"], "Demonstrative adjective")],
            18: [("No hay ___ en la caja.", "nada", ["nada", "nadie", "nunca", "alguien"], "Negative expression")],
            19: [("A mí ___ gusta aprender idiomas.", "me", ["me", "te", "le", "nos"], "Indirect object pronoun with gustar")],
            20: [("El regalo es para María, se ___ doy ahora.", "lo", ["lo", "la", "los", "las"], "Double object pronoun combination")],
            21: [("Por la mañana yo ___ lavo las manos.", "me", ["me", "te", "se", "nos"], "Reflexive pronoun")],
            22: [("Acabo ___ terminar la lección.", "de", ["de", "a", "con", "por"], "Acabar de idiom")],
            23: [("Llevo dos años ___ (vivir) aquí.", "viviendo", ["viviendo", "vivir", "vivo", "vivido"], "Duration with gerund")],
            24: [("Por favor, señor, ___ (hablar) despacio.", "hable", ["hable", "habla", "hablas", "hablen"], "Formal command")],
            25: [("¡___ (hablar) en español ahora!", "Habla", ["Habla", "Hables", "Hable", "Hablar"], "Informal tú command")],
            26: [("Ayer yo ___ (comer) una ensalada.", "comí", ["comí", "como", "comía", "comeré"], "Preterite past tense")],
            27: [("Cuando era niño, yo ___ (vivir) en Madrid.", "vivía", ["vivía", "viví", "vivo", "viviré"], "Imperfect past description")],
            28: [("Ayer yo ___ (estar) en la clase.", "estuve", ["estuve", "estaba", "estoy", "estaré"], "Irregular preterite stem")],
            29: [("Estudiaba cuando de repente ___ (llamar) Juan.", "llamó", ["llamó", "llamaba", "llama", "llamará"], "Preterite action interrupting imperfect")],
            30: [("Esta es la ___ (best) opción para estudiar.", "mejor", ["mejor", "buena", "mayor", "más buena"], "Irregular superlative")],
        }

        lesson_title, topics = self._get_lesson_metadata(lesson_num)
        raw_predefined = fill_raw.get(lesson_num, [])
        result_fills = [
            FillBlankExercise(
                id=f"fill_l{lesson_num}_{idx}",
                prompt=prompt,
                answer=ans,
                options=opts,
                context=ctxt,
            )
            for idx, (prompt, ans, opts, ctxt) in enumerate(raw_predefined, 1)
        ]

        # Dynamically generate fill-in-the-blanks from vocabulary items
        for idx, v in enumerate(vocab_items, len(result_fills) + 1):
            if v.example and v.word in v.example:
                prompt_text = v.example.replace(v.word, "___")
            else:
                prompt_text = f"Completa la frase: 'El estudiante usa ___ ({v.meaning}).'"

            distractors = ["gracias", "adios", "hola", "por favor"]
            opts = [v.word] + [d for d in distractors if d != v.word][:3]
            opts = sorted(opts, key=lambda x: len(x))

            fill_ex = FillBlankExercise(
                id=f"fill_l{lesson_num}_{idx}",
                prompt=prompt_text,
                answer=v.word,
                options=opts,
                context=f"Select the correct Spanish word for '{v.meaning}'.",
            )
            result_fills.append(fill_ex)

        return result_fills

    def _build_matching_for_lesson(self, lesson_num: int, level: str, extracted_info: Optional[Dict[str, Any]] = None) -> List[MatchingExercise]:
        vocab_items = self._build_vocabulary_for_lesson(lesson_num, level, extracted_info)
        pair_set = []
        for item in vocab_items[:4]:
            pair_set.append((item.word, item.meaning))

        if len(pair_set) < 2:
            pair_set = [("hola", "hello"), ("libro", "book"), ("casa", "house"), ("amigo", "friend")]

        return [
            MatchingExercise(
                id=f"match_l{lesson_num}_1",
                prompt=f"Match the Lesson {lesson_num} Spanish terms with their correct English meanings.",
                pairs=[MatchingPair(es=es, en=en) for es, en in pair_set],
            )
        ]


