# Project: Spanish Learning Web Application — Part 7 B1-Bridge Curriculum Integration

## Architecture & Overview
The Spanish Learning Web Application requires the completion and integration of Part 7 B1-Bridge Curriculum (Lessons 27 to 31) along with 200 interactive token-tagged sentence builder exercises (40 per lesson).

The curriculum documentation serves as the authoritative pedagogical specification, source document, and interactive exercise database. The project workflow involves creating `.md/part7_b1_bridge.md`, integrating it into `basic_espanol_complete_curriculum.md`, and verifying that all static analysis, linting, and build tasks (`npm run build`) execute cleanly with zero errors.

```
[ ORIGINAL_REQUEST.md ]
          │
          ▼
[ .md/part7_b1_bridge.md ] ──(Lessons 27-31 + 200 Token-Tagged Exercises)
          │
          ▼
[ basic_espanol_complete_curriculum.md ] ──(Consolidated Lessons 1-31)
          │
          ▼
[ npm run build ] ──(tsc -b && vite build → 0 errors)
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Part 7 Curriculum File Generation | Create `.md/part7_b1_bridge.md` containing Lessons 27 to 31 with required 9 sections per lesson. | M1 | R1 |
| 2 | Token-Tagged Sentence Builder Exercises | Generate 200 exercises (40 per lesson) with complete `(Subject) + (Verb) + (Object) + (Place) + (Time)` token tags. | M1 | R2 |
| 3 | Master Curriculum Integration | Create/update `basic_espanol_complete_curriculum.md` containing complete Lessons 1 to 31. | M2 | R1 |
| 4 | Build Verification & Forensic Audit | Run `npm run build`, review code quality, verify exercise count/tags, and pass forensic audit. | M3 | R3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | Survey & Specification Mining | Explore curriculum format, token tags, build pipeline | None | DONE |
| M1 | Part 7 B1-Bridge Markdown File Creation | Create `.md/part7_b1_bridge.md` with Lessons 27-31 & 200 token-tagged exercises | M0 | DONE |
| M2 | Master Curriculum Integration | Update/create `basic_espanol_complete_curriculum.md` with Lessons 1-31 | M1 | DONE |
| M3 | Verification, Forensic Audit & Build Check | Review, adversarial challenge, forensic audit & `npm run build` verification | M2 | DONE |

## Interface Contracts

### 1. Mandatory Lesson Structure (Lessons 27 to 31)
Each lesson must feature:
1. `Header`: `### 📖 Lesson [N]: [English Title] ([Spanish Title])`
2. `Subtitle`: `**Subtitle**: [Description]`
3. `Professor's Note`: `**Professor's Note**: *"[Guidance]"*`
4. `Learning Objectives`: `#### 🎯 Learning Objectives` (3+ bullet points)
5. `Grammar & Rules`: `#### 📐 Grammar & Structural Rules` (Formulas, tables, irregulars)
6. `Vocabulary Table`: `#### 🔤 Vocabulary Table` (8+ items with `Spanish Term`, `Phonetic Pronunciation`, `English Meaning`, `Usage Context`)
7. `Core Sentences`: `#### 💬 Core Example Sentences` (3+ examples)
8. `Real Dialogue`: `#### 🗣️ Real Dialogue Context` (Multi-turn dialogue)
9. `Quick Practice`: `#### ⚡ Quick Practice Check` (`Question`, `Options`, `Correct Answer`, `Explanation`)
10. `Sentence Builder`: `#### 🧩 Interactive Sentence Builder Database (Lesson [N]: 40 Exercises)`

### 2. Sentence Builder Token Tag Schema
Sentence builder exercises must follow this 5-column table structure:
`| # | Spanish Sentence | English Translation | Token Breakdown | Notes |`

The `Token Breakdown` column MUST format tokens using inline code backticks with explicit roles:
`` `[Subject Token] (Subject) + [Verb Token] (Verb) + [Object Token] (Object) + [Place Token] (Place) + [Time Token] (Time)` ``

### 3. Curriculum Files & Locations
- `.md/part7_b1_bridge.md`
- `basic_espanol_complete_curriculum.md`

## Code Layout
- `.md/part7_b1_bridge.md` (Part 7 B1-Bridge curriculum file)
- `basic_espanol_complete_curriculum.md` (Complete consolidated curriculum file)
- `package.json` (Build script definition)
- `tsconfig.json` & `tsconfig.app.json` (TypeScript compilation config)
