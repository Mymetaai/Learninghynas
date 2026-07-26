TASK: Execute implementation_plan.md as written, with the decisions below
locked in. Read implementation_plan.md, antigravity_sentence_builder_prompt.md,
and antigravity_sentence_builder_execute_prompt.md in full before starting.

DECISIONS (answers to the plan's open questions — do not re-ask these)

1. GENERATION STRATEGY: Live Gemini API calls via the existing @google/genai
   SDK, not hand-crafted. But do not one-shot accept output. For each lesson
   batch: generate ~40 sentences, run every sentence through
   SentenceBuilderModule.validateExercise(), and regenerate only the failing
   sentences (not the whole batch) until the lesson has 40 valid, non-duplicate
   exercises. Cap retries at 3 passes per lesson; if still short after 3
   passes, stop and report which lesson/how many short, rather than padding
   with template fallback content.

2. API KEY: A key has already been provisioned. Before running anything,
   confirm which env var the generation script actually reads from. It must
   NOT be VITE_GEMINI_API_KEY or any other VITE_-prefixed variable, since
   those get bundled into the client build — this is the same class of leak
   already flagged in the project's open security backlog. If the only key
   available is the VITE_-prefixed one, stop and ask before proceeding rather
   than reusing it for the generation script. The script itself must never
   contain the raw key value — read from process.env only.

3. FUTURE AGENT PIPELINE: The DSPy/Instructor/Agency/Langfuse pipeline is a
   longer-term goal beyond this task, not being built right now (no Python
   backend exists yet). For this task, write the generation script as a
   clean, isolated module (e.g. scripts/generateSentenceExercises.ts or
   .mjs) with a clear separation between: (a) prompt construction, (b) the
   Gemini call, (c) validation, (d) output writing. Keep these as separate
   functions with clear inputs/outputs, so this logic can later be lifted
   into a Generator Agent in the real pipeline without a rewrite. Do not
   over-engineer this into a framework now — just keep the boundaries clean.

4. DUPLICATE CHECK: Exact-match dedup is not sufficient, especially at A1
   where the vocab pool is small. Add a basic similarity check (e.g. token
   overlap ratio or simple edit-distance threshold) across all exercises
   within the same lesson, and flag/regenerate anything above ~80% similarity
   to another sentence in that lesson.

5. EXERCISE CAROUSEL: Build it, per Phase 2 of the plan — Previous/Next
   navigation, "Exercise X of 40" progress indicator, shuffle on lesson entry.

6. C1 COMPLEXITY: Use multi-clause/subjunctive sentences for lessons 27–37,
   matching the original spec's allowance for complex structures at C1 — not
   simplified structures with only harder vocabulary.

7. LOGGING (Langfuse substitute for this task): Since there's no tracing
   pipeline yet, write a generation_log.json capturing, per lesson: sentences
   generated, sentences that failed validation and were regenerated, final
   count, and any lesson that didn't reach 40 after 3 retry passes. This is
   the manual substitute for what Langfuse would give you later.

EXECUTION ORDER
1. Confirm the API key situation (point 2) before writing any code.
2. Build the generation script (point 3) with validation + similarity-check
   + retry logic (points 1 and 4).
3. Run it across all 37 lessons, write output to
   src/data/sentenceBuilderExercises.ts, replacing the current 22-exercise
   file. Preserve the existing 22 exercises if they already pass validation
   and dedup checks — don't discard known-good content.
4. Evaluate generated_content.json and mixed_content.json per Phase 4 —
   merge anything valid, otherwise remove the orphaned files.
5. Build the exercise carousel UI (Phase 2) in BasicEspanolScreen.tsx.
6. Improve sentenceBuilder.ts per Phase 3 (vocab pools, subject-verb
   agreement) so the fallback path is also correct, not just the primary
   generated content.
7. Run npm run build — zero TypeScript errors required.
8. Report back: total exercises generated, per-lesson counts, any lessons
   short of 40, generation_log.json summary, and confirmation the carousel
   renders correctly.

CONSTRAINTS (carried over — do not skip)
- Original sentences only; nothing copied from workbook PDFs.
- No hardcoded API keys anywhere, including this new generation script.
- Do not touch Adventure Map or any tab other than Basic Español.
- No silent fallback to nonsensical template content (e.g. "Yo como un
  coche") — every shipped exercise must pass validateExercise().
- Reuse existing auth.uid() wiring; do not reintroduce 'default-user'.
