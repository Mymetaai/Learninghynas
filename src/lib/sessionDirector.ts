import { useTrainingStore } from '../state/trainingStore';
import { useStatsStore } from '../state/statsStore';
import { ALL_SYLLABUS_LESSONS } from '../data/syllabusLessonsData';
import { getNextUnseenVocabBatch } from './vocabExpansionEngine';

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

export function assembleTodaySession(): SessionStep[] {
  const { mistakes, srsCards } = useTrainingStore.getState();
  const { completedLessons } = useStatsStore.getState();
  const allLessons = Object.values(ALL_SYLLABUS_LESSONS);

  const steps: SessionStep[] = [];

  // 1. Weak Spots Step (Quarantine: pull up to 3 active mistakes)
  const activeMistakes = mistakes.filter((m) => m.reviewedCorrectly < 2);
  if (activeMistakes.length > 0) {
    steps.push({
      id: 'step-weakspots',
      type: 'weakspot',
      title: 'Weak Spots Quarantine',
      subtitle: `Targeting ${Math.min(activeMistakes.length, 3)} recent review items`,
      payload: { items: activeMistakes.slice(0, 3) },
    });
  }

  // 2. New Vocabulary Expansion Step (Dynamic Ingestion: 4 fresh unseen words)
  const newVocab = getNextUnseenVocabBatch(4);
  if (newVocab.length > 0) {
    steps.push({
      id: 'step-new-vocab',
      type: 'new_vocab',
      title: 'New Vocabulary Expansion',
      subtitle: `${newVocab.length} fresh ${newVocab[0]?.level || 'A1'} words to learn`,
      payload: { vocabItems: newVocab },
    });
  }

  // 3. FSRS Spaced Repetition Flashcards Step (Due review flashcards)
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

  // 4. Current Lesson Grammar Blitz (Sourced from syllabusLessonsData)
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

  // 5. Feynman Sensei Checkpoint (Active recall drill)
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
