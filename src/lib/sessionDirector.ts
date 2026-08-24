import { useTrainingStore } from '../state/trainingStore';
import { useStatsStore } from '../state/statsStore';
import { ALL_SYLLABUS_LESSONS } from '../data/syllabusLessonsData';
import { getNextUnseenVocabBatch, getActiveLevel } from './vocabExpansionEngine';

export type SessionStepType =
  | 'weakspot'
  | 'new_vocab'
  | 'srs_flashcards'
  | 'grammar_blitz'
  | 'feynman_checkpoint';

export interface SessionStep {
  id: string;
  type: SessionStepType;
  title: string;
  subtitle: string;
  payload: any;
}

export interface UserProgressLevelInfo {
  level: number;
  rankTitle: string;
  cefr: string;
  learnedCount: number;
  completedLessonCount: number;
  scalingLabel: string;
  limits: {
    weakSpotsLimit: number;
    newVocabBatch: number;
    srsCardsLimit: number;
    grammarItemsCount: number;
  };
}

export function getUserProgressLevelInfo(): UserProgressLevelInfo {
  const { learnedVocab, completedLessons } = useStatsStore.getState();
  const learnedCount = learnedVocab.length;
  const completedLessonCount = Object.values(completedLessons).filter(Boolean).length;
  const cefr = getActiveLevel();

  // Determine Level (1 to 5) based on mastered vocabulary and completed lessons
  let level = 1;
  let rankTitle = 'White Belt (Novice)';

  if (learnedCount >= 200 || completedLessonCount >= 21) {
    level = 5;
    rankTitle = 'Black Belt (Master)';
  } else if (learnedCount >= 100 || completedLessonCount >= 15) {
    level = 4;
    rankTitle = 'Brown Belt (Advanced)';
  } else if (learnedCount >= 50 || completedLessonCount >= 9) {
    level = 3;
    rankTitle = 'Green Belt (Intermediate)';
  } else if (learnedCount >= 20 || completedLessonCount >= 3) {
    level = 2;
    rankTitle = 'Yellow Belt (Elementary)';
  }

  // Automatic scaling of question limits per step based on user progress level
  const limitsMap: Record<
    number,
    { weakSpotsLimit: number; newVocabBatch: number; srsCardsLimit: number; grammarItemsCount: number }
  > = {
    1: { weakSpotsLimit: 2, newVocabBatch: 3, srsCardsLimit: 3, grammarItemsCount: 3 },
    2: { weakSpotsLimit: 3, newVocabBatch: 4, srsCardsLimit: 5, grammarItemsCount: 4 },
    3: { weakSpotsLimit: 4, newVocabBatch: 6, srsCardsLimit: 7, grammarItemsCount: 6 },
    4: { weakSpotsLimit: 5, newVocabBatch: 8, srsCardsLimit: 10, grammarItemsCount: 8 },
    5: { weakSpotsLimit: 6, newVocabBatch: 10, srsCardsLimit: 12, grammarItemsCount: 10 },
  };

  const limits = limitsMap[level];
  const scalingLabel = `Level ${level} • ${rankTitle} (${cefr})`;

  return {
    level,
    rankTitle,
    cefr,
    learnedCount,
    completedLessonCount,
    scalingLabel,
    limits,
  };
}

export function assembleTodaySession(): SessionStep[] {
  const { mistakes, srsCards } = useTrainingStore.getState();
  const { completedLessons } = useStatsStore.getState();
  const allLessons = Object.values(ALL_SYLLABUS_LESSONS);
  const info = getUserProgressLevelInfo();

  const steps: SessionStep[] = [];

  // 1. Weak Spots Step (Targeting user's actual past mistakes only)
  const activeMistakes = mistakes.filter((m) => m.reviewedCorrectly < 2);
  if (activeMistakes.length > 0) {
    const countToPull = Math.min(activeMistakes.length, info.limits.weakSpotsLimit);
    steps.push({
      id: 'step-weakspots',
      type: 'weakspot',
      title: `Weak Spots Quarantine`,
      subtitle: `Targeting ${countToPull} recent review items matching your progress`,
      payload: { items: activeMistakes.slice(0, countToPull) },
    });
  }

  // 2. New Vocabulary Expansion Step (Filtered by user's active CEFR progress tier)
  const newVocab = getNextUnseenVocabBatch(info.limits.newVocabBatch, info.cefr);
  if (newVocab.length > 0) {
    steps.push({
      id: 'step-new-vocab',
      type: 'new_vocab',
      title: `New Vocab Expansion`,
      subtitle: `${newVocab.length} fresh ${info.cefr} words tailored to your level`,
      payload: { vocabItems: newVocab },
    });
  }

  // 3. FSRS Spaced Repetition Flashcards Step (User's acquired memory cards)
  const now = new Date();
  const dueCards = srsCards.filter((card) => !card.due || new Date(card.due) <= now);
  if (dueCards.length > 0) {
    const srsCount = Math.min(dueCards.length, info.limits.srsCardsLimit);
    steps.push({
      id: 'step-srs',
      type: 'srs_flashcards',
      title: `Spaced Repetition Recall`,
      subtitle: `${srsCount} cards due for memory reinforcement`,
      payload: { cards: dueCards.slice(0, srsCount) },
    });
  }

  // 4. Current Unlocked Lesson Grammar Blitz (Restricted to completed + 1 lesson)
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const currentLessonNum = Math.min(completedCount + 1, allLessons.length || 1);
  const currentLessonData =
    allLessons.find((l) => l.lessonNumber === currentLessonNum) || allLessons[0];

  steps.push({
    id: 'step-grammar',
    type: 'grammar_blitz',
    title: `Grammar Blitz: Lesson ${currentLessonData?.lessonNumber || 1}`,
    subtitle: `${currentLessonData?.title || 'Spanish Fundamentals'} (${info.limits.grammarItemsCount} drills)`,
    payload: { lesson: currentLessonData, itemsCount: info.limits.grammarItemsCount },
  });

  // 5. Feynman Sensei Checkpoint (Active recall drill for current progress concept)
  const grammarTitle = currentLessonData?.grammarSections?.[0]?.title || 'Core Concept';
  steps.push({
    id: 'step-feynman',
    type: 'feynman_checkpoint',
    title: `Sensei Checkpoint`,
    subtitle: `Explain ${grammarTitle} to Chibi Sensei`,
    payload: { concept: grammarTitle },
  });

  return steps;
}
