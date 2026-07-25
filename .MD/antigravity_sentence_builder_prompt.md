# Básico Español Interactive Sentence Builder Programming Guide

**Version**: 2.0 | **Target**: C1 Spanish Mastery | **Integration**: Basic Español tab only

---

## 🎯 Project Overview

Build an interactive **Sentence Builder** exercise that teaches Spanish word order through gamified reconstruction. This is a **new exercise TYPE** (not a new tab) that integrates with the existing Basic Español curriculum (Lessons 1-37).

**Critical Constraint**: Do NOT touch Adventure Map.

---

## 🏗️ Development Architecture

### Orchestration Flow
```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Extractor  │────▶│  Generator   │────▶│   Mixer      │────▶│  Validator   │
│  Agent      │     │  Agent       │     │  Agent       │     │  Agent       │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │                     │
       ▼                    ▼                     ▼                     ▼
   PDF/Markdown       DSPy Module +        JSON Injection       Schema Validation
   Extraction         Gemini Generation    into Curriculum      & Quality Checks
```

### Agent Responsibilities

| Agent | Tools | Output |
|-------|-------|--------|
| **Extractor** | Marker PDF → Markdown, Chonkie chunker | JSON chunks: `{lesson_id, grammar_patterns, vocab, structure}` |
| **Generator** | DSPy + Gemini (via Instructor) | `{spanish_sentence, english_translation, tokens[], cefr_level}` |
| **Mixer** | Schema-aware injector | Valid JSON exercises injected into lesson data |
| **QA/Validator** | Custom validators | Pass/fail reports with error details |

---

## 📚 Content Design Specification

### CEFR Progression Map

| Level | Lessons | Focus | Sentence Complexity |
|-------|---------|-------|---------------------|
| **A1** | 1-4 | Subject-Verb-Object (SVO) | Simple statements, present tense |
| **A2** | 5-8 | SVO + Place | Locational expressions, basic time |
| **B1** | 9-12 | SVO + Place + Time | Complete basic sentences, question forms |
| **B2** | 13-21 | SVO + Pronoun drop | Stem changers, DOP/IOP, pronouns |
| **C1** | 22-37 | Complex clauses | Subjunctive, idioms, academic register |

### Word Order Teaching Progression

```
A1-A2: [Subject] + [Verb] + [Object]
       Yo + como + una manzana

A2-B1: [Subject] + [Verb] + [Object] + [Place]
       Yo + como + una manzana + en la cocina

B1-B2: [Subject] + [Verb] + [Object] + [Place] + [Time]
       Yo + como + una manzana + en la cocina + ahora

B2-C1: Pronoun-dropped variants + complex objects
       Como una manzana (yo implícito)
       Aunque estoy cansado, sigo estudiando
```

---

## 🔧 Technical Schema Definition

### Database Schema

```sql
CREATE TABLE sentence_builder_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id TEXT NOT NULL,
  cefr_level TEXT NOT NULL CHECK (cefr_level IN ('A1','A2','B1','B2','C1')),
  spanish_sentence TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  tokens JSONB NOT NULL,
  pronoun_dropped_variant TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Indexes
CREATE INDEX idx_sbe_lesson_id ON sentence_builder_exercises(lesson_id);
CREATE INDEX idx_sbe_cefr ON sentence_builder_exercises(cefr_level);
CREATE INDEX idx_sbe_user_progress ON sentence_builder_exercises(user_id, lesson_id);

-- RLS Policy
CREATE POLICY "Users can read/write own exercises"
  ON sentence_builder_exercises
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);
```

### JSON Schema (Pydantic/Instructor)

```python
class Token(BaseModel):
    text: str
    role: Literal["Subject", "Verb", "Object", "Place", "Time", "Other"]
    order: int = Field(gt=0)

class SentenceExercise(BaseModel):
    lesson_id: str
    cefr_level: Literal["A1", "A2", "B1", "B2", "C1"]
    spanish_sentence: str
    english_translation: str
    tokens: List[Token]
    pronoun_dropped_variant: Optional[str] = None
    notes: Optional[str] = None
```

---

## 🎨 UI Component Specification

### Component: `SentenceBuilderExercise.tsx`

**Props Interface**:
```typescript
interface SentenceBuilderExerciseProps {
  exercise: SentenceExercise;
  onCompleted: (correct: boolean) => void;
  showHints?: boolean;
}
```

**UI Elements**:
1. **English prompt** at top: "Reconstruct: The apple is on the table"
2. **Word blocks** (draggable/tappable): `[Yo] [como] [una manzana]`
3. **Target sentence display**: `_ _ _ _ _`
4. **Submit button**: Validates order, highlights correct/incorrect
5. **Feedback panel**: Shows labeled breakdown with color-coded roles

**Interaction Flow**:
```
User sees English → Drags blocks into order → Clicks Submit → 
UI highlights correct positions → Shows "Subject: Yo ✓ | Verb: como ✓ | Object: una manzana ✓"
```

**Styling Guide**:
- Subject blocks: Blue background
- Verb blocks: Green background  
- Object blocks: Purple background
- Place/Time blocks: Orange background
- Correct placement: Green glow
- Incorrect placement: Red pulse

---

## ✅ Success Criteria

| Criterion | Acceptance Test |
|-----------|-----------------|
| **Schema Validation** | 100% of generated sentences pass Pydantic validation |
| **No Duplicates** | No duplicate sentences within a lesson (hash check) |
| **CEFR Compliance** | A1 sentences: no subjunctive; C1 sentences: subjunctive allowed |
| **Word Tagging** | Each token's role matches actual word function |
| **UI Integration** | Exercise renders in BasicEspanolScreen without errors |
| **RLS Security** | RLS policies prevent cross-user data access |
| **Copyright Safe** | No direct copy from workbook; all sentences original |

---

## 🚨 Failure Handling

If Gemini generation fails or schema validation fails:
1. **DO NOT** fall back to template/canned sentences
2. **DO** surface error to user: "Unable to generate exercise - please try again"
3. **DO** log error to Langfuse with full context
4. **DO** mark lesson as "needs regeneration" in UI

---

## 📋 Deliverables Checklist

- [ ] Supabase migration file (`20260723_sentence_builder.sql`)
- [ ] DSPy module (`src/lib/sentenceBuilder.ts`)
- [ ] Instructor schema validation
- [ ] Generated exercises for all 37 lessons (A1-C1)
- [ ] UI component with drag-drop functionality
- [ ] Integration into BasicEspanolScreen
- [ ] Langfuse trace documentation

---

## 🔗 References

- Existing tables: `user_stats`, `learned_vocabulary`, `immersion_chat_messages`
- Pattern reference: `learned_vocabulary` has `user_id UUID REFERENCES auth.users(id)`
- UI library: lucide-react icons, framer-motion for animations
- State management: Zustand stores (`useStatsStore`)
- Authentication: `auth.uid()` pattern already established

---

## ⚠️ Scope Boundary

**IN SCOPE**:
- Basic Español tabs and lessons
- New sentence_builder_exercises table
- Exercise generation and UI

**OUT OF SCOPE**:
- Adventure Map modifications
- Other tabs (Stories, Quest Journey, etc.)
- User authentication changes
- API key modifications

---

## 🧪 Testing Protocol

1. **Unit Tests**: Validate schema parsing, token ordering
2. **Integration Tests**: Render component, simulate drag-drop
3. **E2E Tests**: Complete lesson with sentence builder
4. **Load Test**: Generate 30 sentences per lesson, verify performance

---

*For questions or clarifications, reference the original `.agents/orchestrator/plan.md` for project context.*