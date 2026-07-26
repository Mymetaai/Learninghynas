TASK: Read antigravity_sentence_builder_prompt.md in full before doing anything
else. That file is the spec for this task — follow it exactly, with one change:
increase the sentence count from ~30 to a minimum of 40 original sentences per
lesson.

STEP 1 — LOCATE SOURCE FILES
Before generating anything, find and read:
  - antigravity_sentence_builder_prompt.md (the spec)
  - the existing Basic Español lesson data files in this repo (wherever
    lessons/vocab/exercises currently live)
  - any uploaded reference PDFs already in the project (e.g. the Great
    Courses Spanish workbook) if present
Confirm what you found and its structure before generating content. If any
of these files can't be located, stop and report that rather than guessing
at a file structure.

STEP 2 — EXECUTE THE SPEC
Use /agent-jcode as orchestrator, delegating to the Extractor, Generator,
Mixer, and QA/Validator agents exactly as defined in
antigravity_sentence_builder_prompt.md. Wrap generation calls with Instructor
schemas, use DSPy for the reusable generation module, trace every agent step
with Langfuse.

STEP 3 — CONTENT REQUIREMENT
For every existing Basic Español lesson (A1 through C1), generate and
integrate a minimum of 40 original Spanish sentences following the
Subject+Verb+Object → +Place+Time progression described in the spec. Do not
reduce coverage on any lesson to hit the count faster — every lesson needs
the full 40, tagged token-by-token (Subject/Verb/Object/Place/Time) per the
SentenceExercise schema in the spec.

STEP 4 — VALIDATE AND REPORT
Run the QA/Validator agent against all generated content before integrating
it. Report back: total sentences generated, sentences per lesson, any
lessons that failed validation, and links/logs from Langfuse for this run.

CONSTRAINTS (repeated from spec — do not skip)
- Original sentences only; do not reproduce workbook text verbatim.
- No hardcoded API keys anywhere, including scratch/.agents/ files.
- Do not touch Adventure Map or any tab other than Basic Español.
- No silent fallback to template content if generation or validation fails —
  surface the error.
- Reuse existing auth.uid() wiring; do not reintroduce 'default-user'.
