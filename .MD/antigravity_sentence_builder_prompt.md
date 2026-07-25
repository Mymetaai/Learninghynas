# Antigravity Teamwork Prompt — Sentence Builder Exercise (Basic Español tab)

Paste everything in the fenced block below into Antigravity's Teamwork task box.

---

```
TASK: Build a new "Sentence Builder" exercise inside the existing Basic Español
tab. This is a new exercise TYPE, not a new tab. Do not touch Adventure Map at all.

ORCHESTRATION
Use /agent-jcode as the top-level orchestrator. jcode should decompose this task
and delegate to sub-agents/tools rather than doing it all in one pass:

  1. Extractor Agent — uses Marker to parse any source PDFs (starting with the
     already-uploaded "Spanish, Part 1 – Basic Elements and Simple Sentences"
     Great Courses workbook) into structured markdown, then uses Chonkie to
     chunk that markdown by lesson section (Vocabulario nuevo / Repaso general /
     Actividades / Respuestas). Output: one JSON chunk per lesson, used as
     seed/reference material — NOT copied verbatim (respect copyright: extract
     grammar patterns and structure, do not reproduce the workbook's proprietary
     text or exercises directly).

  2. Generator Agent — uses DSPy to define a reusable "SentenceBuilderModule"
     (declarative, not hand-prompted per lesson) that generates original
     Spanish practice sentences for a given CEFR level and grammar focus. Wrap
     every Gemini call through Instructor with a strict Pydantic/Zod schema
     (see SCHEMA below) so output is always structured JSON — never free text,
     never a silent template fallback. Optimize the DSPy module's few-shot
     examples against 3-5 hand-approved sentences per level so quality stays
     consistent across all lessons instead of drifting lesson to lesson.

  3. Mixer Agent — inserts the newly generated sentence sets into the Basic
     Español tab's lesson data structure, one exercise per existing lesson,
     without altering unrelated tabs or Adventure Map.

  4. QA/Validator Agent — checks: (a) schema conformance, (b) each sentence's
     word-order tags are internally consistent (e.g. the tagged "Verb" token
     is actually a conjugated verb), (c) no duplicate sentences within a
     lesson, (d) CEFR level is appropriate (A1 = present tense only, no
     subordinate clauses; C1 = subjunctive/complex clauses allowed, etc.).

  5. Wrap every agent call (Extractor, Generator, Mixer, QA) with Langfuse
     tracing so failures are debuggable per-agent, per-lesson — same pattern
     used to debug the earlier canned-reply bug in Active Immersion/Yuki.

CONTENT SPEC
Build sentence-structure practice covering CEFR levels A1 through C1. Each
lesson gets its own exercise set of ~30 original Spanish sentences that
progressively teach word order:

  - Levels A1-A2: Subject + Verb + Object
      e.g. Yo (Subject) + como (Verb) + una manzana (Object).
  - Levels A2-B1: Subject + Verb + Object + Place
  - Levels B1-B2: Subject + Verb + Object + Place + Time
      (place before time, matching natural Spanish word order)
  - Levels B2-C1: introduce pronoun-drop practice (sentence given both with
      and without the explicit subject pronoun, since Spanish usually omits
      it once the verb ending makes the subject clear), plus more complex
      objects/subordinate clauses appropriate to the level.

Each sentence object must carry its own word-by-word tags (Subject/Verb/
Object/Place/Time) so the UI can render draggable/tappable word blocks and
validate the user's reconstruction of the sentence, not just show static text.

SCHEMA (Instructor/Pydantic — adapt field names to match Supabase conventions
already in use, e.g. learned_vocabulary):

  SentenceExercise {
    id: uuid
    lesson_id: string          # ties to existing Basic Español lesson id
    cefr_level: enum[A1,A2,B1,B2,C1]
    spanish_sentence: string
    english_translation: string
    tokens: [
      { text: string, role: enum[Subject,Verb,Object,Place,Time,Other], order: int }
    ]
    pronoun_dropped_variant: string | null   # only for B2/C1
    notes: string | null
  }

SUPABASE
Add a new table (e.g. sentence_builder_exercises) following the exact same
pattern as the existing three tables: user_id UUID references auth.users(id),
appropriate unique constraint on (user_id, lesson_id, sentence_id) for
progress tracking, indexes, and RLS scoped to auth.uid() = user_id for the
authenticated role. Confirm this before writing migrations — do not silently
assume table shape.

UI
New exercise screen inside Basic Español: user sees the English translation
and a shuffled set of word blocks (Subject/Verb/Object/[Place]/[Time]); user
taps/drags blocks into correct order; on submit, highlight correct vs
incorrect placement and show the labeled breakdown (Subject/Verb/Object/etc.)
so the pattern is reinforced, not just marked right/wrong.

CONSTRAINTS
- Do not hardcode any API keys anywhere, including scratch/analysis files
  under .agents/. Use the existing Gemini proxy setup (or flag if it isn't
  wired up yet — do not call the Gemini API directly from the client).
- Do not modify Adventure Map.
- Do not silently fall back to template/canned sentences if Gemini or the
  schema validation fails — surface the error so it's visible, per the
  earlier root-cause fix for the canned-reply bug.
- Reuse existing auth.uid() wiring; do not reintroduce 'default-user'.

DELIVERABLE
1. Supabase migration for the new table + RLS policy (for review before applying).
2. DSPy module + Instructor schema for sentence generation.
3. Generated exercise sets for all existing Basic Español lessons (A1-C1).
4. Sentence Builder UI component wired into the Basic Español tab.
5. Langfuse trace links or logs for the generation run so quality can be spot-checked.
```

---

## Notes for you (not part of the paste)

- **jcode's exact role**: since you're routing this through `/agent-jcode` as
  the coordinator, Antigravity/jcode should decide the concrete tool-calling
  details (how it shells out to Marker/Chonkie/DSPy/etc.). The prompt above
  tells it *what* each stage must produce, not how to wire the libraries —
  that's intentional so jcode has room to plan.
- **Copyright**: I deliberately phrased the Extractor step as "extract
  structure/patterns, don't reproduce the workbook's text or exercises
  verbatim." The workbook is © The Teaching Company — fine to use as a
  structural reference (the S+V+O progression, lesson shape) but the app's
  own sentences should be original generations, not lifted example sentences.
- **Scope check**: this only touches Basic Español + a new Supabase table. If
  jcode's plan starts touching other tabs' data models, that's a sign the task
  description above wasn't followed — worth flagging in review.
