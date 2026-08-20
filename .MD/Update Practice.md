# 🚀 FEATURE: PROGRESSIVE VOCABULARY EXPANSION ENGINE & DYNAMIC DOJO ROTATION
**Project:** TheLearningHyena — Serene Lexicon  
**Target Files:**
- `src/lib/vocabExpansionEngine.ts` (New: Dynamic vocabulary feed & unseen word selector)
- `src/lib/sessionDirector.ts` (Update: Multi-tier adaptive workout assembly)
- `src/components/training/TodayTrainingRunner.tsx` (Update: Mastery dispatch on correct answers)
- `src/state/trainingStore.ts` & `src/state/statsStore.ts`

---

## 🎯 OBJECTIVES
1. **Dynamic Vocab Growth:** Connect the Dojo workout directly to the 5 CEFR vocabulary datasets in `src/data/vocab/` (`a1.json`, `a2.json`, `b1.json`, `b2.json`, `c1.json`) and `syllabusLessonsData.ts`.
2. **Progressive Unseen Ingestion:** Filter out all words already in `statsStore.learnedVocab` or `trainingStore.masteredWordIds` to serve 4–6 fresh, unlearned Spanish words matching the user's active level each session.
3. **Automatic Graduation:** When a user correctly answers a new vocabulary drill:
   - Mark the word in `statsStore.learnVocab([word], 'dojo-workout')`.
   - Register the word in FSRS Spaced Repetition (`trainingStore.getOrCreateSRSCard`).
   - Mark `trainingStore.masteredWordIds[word] = true`.
4. **Never-Repeat Bug Fix:** Ensure cleared words exit the "New Vocab" pool immediately so future workouts always deliver new words.

---

## 🛠️ STEP 1: CREATE VOCABULARY EXPANSION ENGINE (`src/lib/vocabExpansionEngine.ts`)

Create a dedicated vocabulary selector that compares the global vocabulary database against the user's mastered list:

```typescript
import { useStatsStore } from '@/state/statsStore';
import { useTrainingStore } from '@/state/trainingStore';
import { syllabusLessonsData } from '@/data/syllabusLessonsData';

// Import vocabulary JSON files
import a1Vocab from '@/data/vocab/a1.json';
import a2Vocab from '@/data/vocab/a2.json';
import b1Vocab from '@/data/vocab/b1.json';
import b2Vocab from '@/data/vocab/b2.json';
import c1Vocab from '@/data/vocab/c1.json';

export interface VocabItem {
  id: string;
  word: string;
  meaning: string;
  level: string;
  category?: string;
  exampleSentence?: string;
}

const CEFR_DECKS: Record<string, any[]> = {
  A1: a1Vocab,
  A2: a2Vocab,
  B1: b1Vocab,
  B2: b2Vocab,
  C1: c1Vocab,
};

/**
 * Retrieves a batch of fresh, unlearned words for the user's active CEFR tier.
 */
export function getNextUnseenVocabBatch(batchSize = 4): VocabItem[] {
  const { learnedVocab } = useStatsStore.getState();
  const { masteredWordIds } = useTrainingStore.getState();

  // Create a set of all previously seen words
  const seenWords = new Set([
    ...learnedVocab.map((v) => v.word.toLowerCase().trim()),
    ...Object.keys(masteredWordIds).map((w) => w.toLowerCase().trim()),
  ]);

  // Determine user's active CEFR tier from completed lessons
  const completedCount = Object.keys(useStatsStore.getState().completedLessons).length;
  let activeLevel = 'A1';
  if (completedCount > 26) activeLevel = 'C1';
  else if (completedCount > 20) activeLevel = 'B2';
  else if (completedCount > 14) activeLevel = 'B1';
  else if (completedCount > 8) activeLevel = 'A2';

  const deck = CEFR_DECKS[activeLevel] || a1Vocab;
  const unlearnedWords: VocabItem[] = [];

  // 1. Gather unseen words from the active CEFR deck
  for (const item of deck) {
    const spanishTerm = (item.word || item.spanish || '').trim();
    const englishMeaning = (item.meaning || item.english || item.translation || '').trim();

    if (spanishTerm && !seenWords.has(spanishTerm.toLowerCase())) {
      unlearnedWords.push({
        id: `vocab-${activeLevel}-${spanishTerm}`,
        word: spanishTerm,
        meaning: englishMeaning,
        level: activeLevel,
        category: item.category || 'General',
        exampleSentence: item.exampleSentence || item.example || '',
      });
      if (unlearnedWords.length >= batchSize) break;
    }
  }

  // 2. Fallback: Pull from syllabus lesson tables if deck is exhausted
  if (unlearnedWords.length < batchSize) {
    syllabusLessonsData.forEach((lesson) => {
      lesson.vocabulary?.forEach((v: any) => {
        if (v.word && !seenWords.has(v.word.toLowerCase()) && unlearnedWords.length < batchSize) {
          unlearnedWords.push({
            id: `syllabus-${v.word}`,
            word: v.word,
            meaning: v.meaning,
            level: activeLevel,
            category: 'Syllabus',
          });
        }
      });
    });
  }

  return unlearnedWords;
}