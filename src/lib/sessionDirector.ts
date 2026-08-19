import { useTrainingStore } from '../state/trainingStore';
import { useStatsStore } from '../state/statsStore';
import { ALL_SYLLABUS_LESSONS } from '../data/syllabusLessonsData';

export type SessionStepType = 'weakspot' | 'srs_flashcards' | 'grammar_blitz' | 'feynman_checkpoint';

export interface SessionStep {
  id: string;
  type: SessionStepType;
  title: string;
  subtitle: string;
  payload: any;
}

export function assembleTodaySession(): SessionStep[] {
  const { mistakes, srsCards } = useTrainingStore.getState();
  const { completedLessons } = useStatsStore.getState();
  const allLessons = Object.values(ALL_SYLLABUS_LESSONS);

  const steps: SessionStep[] = [];

  // 1. Weak Spots Step (Recent incorrect answers)
  const activeMistakes = mistakes.filter((m) => m.reviewedCorrectly < 2);
  if (activeMistakes.length > 0) {
    steps.push({
      id: 'step-weakspots',
      type: 'weakspot',
      title: 'Weak Spots Quarantine',
      subtitle: `Targeting ${Math.min(activeMistakes.length, 4)} recent review items`,
      payload: { items: activeMistakes.slice(0, 4) },
    });
  }

  // 2. FSRS Spaced Repetition Flashcards Step
  const now = new Date();
  const dueCards = srsCards.filter((card) => !card.due || new Date(card.due) <= now);
  if (dueCards.length > 0) {
    steps.push({
      id: 'step-srs',
      type: 'srs_flashcards',
      title: 'Spaced Repetition Recall',
      subtitle: `${Math.min(dueCards.length, 5)} cards due for memory reinforcement`,
      payload: { cards: dueCards.slice(0, 5) },
    });
  }

  // 3. Current Lesson Grammar Blitz (Sourced from 37-lesson curriculum)
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const currentLessonNum = Math.min(completedCount + 1, allLessons.length || 1);
  const currentLessonData =
    allLessons.find((l) => l.lessonNumber === currentLessonNum) || allLessons[0];

  steps.push({
    id: 'step-grammar',
    type: 'grammar_blitz',
    title: `Grammar Blitz: Lesson ${currentLessonData?.lessonNumber || 1}`,
    subtitle: currentLessonData?.title || 'Spanish Fundamentals',
    payload: { lesson: currentLessonData },
  });

  // 4. Feynman Teach-the-Chibi Checkpoint
  const grammarTitle = currentLessonData?.grammarSections?.[0]?.title || 'Core Concept';
  steps.push({
    id: 'step-feynman',
    type: 'feynman_checkpoint',
    title: 'Sensei Checkpoint',
    subtitle: `Explain ${grammarTitle} to Chibi`,
    payload: { concept: grammarTitle },
  });

  return steps;
}
