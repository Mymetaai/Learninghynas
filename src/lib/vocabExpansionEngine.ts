import { useStatsStore } from '../state/statsStore';
import { useTrainingStore } from '../state/trainingStore';
import { ALL_SYLLABUS_LESSONS } from '../data/syllabusLessonsData';

// Import vocabulary JSON files
import a1Vocab from '../data/vocab/a1.json';
import a2Vocab from '../data/vocab/a2.json';
import b1Vocab from '../data/vocab/b1.json';
import b2Vocab from '../data/vocab/b2.json';
import c1Vocab from '../data/vocab/c1.json';

export interface VocabItem {
  id: string;
  word: string;
  meaning: string;
  level: string;
  category?: string;
}

const CEFR_DECKS: Record<string, any[]> = {
  A1: a1Vocab,
  A2: a2Vocab,
  B1: b1Vocab,
  B2: b2Vocab,
  C1: c1Vocab,
};

/**
 * Determines user's active CEFR level from completed lessons count.
 */
function getActiveLevel(): string {
  const completedCount = Object.values(
    useStatsStore.getState().completedLessons,
  ).filter(Boolean).length;

  if (completedCount > 26) return 'C1';
  if (completedCount > 20) return 'B2';
  if (completedCount > 14) return 'B1';
  if (completedCount > 8) return 'A2';
  return 'A1';
}

/**
 * Retrieves a batch of fresh, unlearned words for the user's active CEFR tier.
 * Filters out all words already in statsStore.learnedVocab or trainingStore.masteredWordIds.
 */
export function getNextUnseenVocabBatch(batchSize = 4): VocabItem[] {
  const { learnedVocab } = useStatsStore.getState();
  const { masteredWordIds } = useTrainingStore.getState();

  // Build a set of all previously seen/mastered words (lowercased)
  const seenWords = new Set([
    ...learnedVocab.map((v) => v.word.toLowerCase().trim()),
    ...Object.keys(masteredWordIds).map((w) => w.toLowerCase().trim()),
  ]);

  const activeLevel = getActiveLevel();
  const deck = CEFR_DECKS[activeLevel] || a1Vocab;
  const unlearnedWords: VocabItem[] = [];

  // 1. Gather unseen words from the active CEFR deck
  //    Vocab JSON shape: { id, level, category, es, en }
  for (const item of deck) {
    const spanishTerm = (item.es || '').trim();
    const englishMeaning = (item.en || '').trim();

    if (spanishTerm && !seenWords.has(spanishTerm.toLowerCase())) {
      unlearnedWords.push({
        id: item.id || `vocab-${activeLevel}-${spanishTerm}`,
        word: spanishTerm,
        meaning: englishMeaning,
        level: activeLevel,
        category: item.category || 'General',
      });
      if (unlearnedWords.length >= batchSize) break;
    }
  }

  // 2. Fallback: Pull from syllabus lesson vocabularyTable if deck is exhausted
  if (unlearnedWords.length < batchSize) {
    const allLessons = Object.values(ALL_SYLLABUS_LESSONS);
    for (const lesson of allLessons) {
      if (unlearnedWords.length >= batchSize) break;
      for (const v of lesson.vocabularyTable || []) {
        if (unlearnedWords.length >= batchSize) break;
        const spanishTerm = (v.spanish || '').trim();
        if (spanishTerm && !seenWords.has(spanishTerm.toLowerCase())) {
          unlearnedWords.push({
            id: `syllabus-${spanishTerm}`,
            word: spanishTerm,
            meaning: (v.english || '').trim(),
            level: activeLevel,
            category: 'Syllabus',
          });
        }
      }
    }
  }

  return unlearnedWords;
}
