import { fsrs as createFSRS, createEmptyCard, Rating, State } from 'ts-fsrs';
import type { Card } from 'ts-fsrs';

const fsrs = createFSRS({ learning_steps: ['1m'] });
const directReviewFSRS = createFSRS({ learning_steps: [] });

export interface VocabCardState extends Card {
  wordId: string;
  word: string;
  translation: string;
  level: string;
  category: string;
  interval: number;
}

export interface FSRSResult {
  card: VocabCardState;
  interval: number;
  nextReview: Date;
}

export function getDefaultCard(wordId: string, word: string, translation: string, level: string, category: string): VocabCardState {
  return {
    ...createEmptyCard(),
    wordId,
    word,
    translation,
    level,
    category,
    interval: 0,
    due: new Date(),
  };
}

export function scheduleCard(card: VocabCardState, rating: Rating): FSRSResult {
  const scheduler = card.state === State.New && rating === Rating.Good ? directReviewFSRS : fsrs;
  const { card: scheduledCard } = scheduler.next(card, new Date(), rating as 1 | 2 | 3 | 4);
  const updatedCard = {
    ...scheduledCard,
    interval: scheduledCard.scheduled_days,
  };
  return {
    card: updatedCard as VocabCardState,
    interval: updatedCard.scheduled_days,
    nextReview: updatedCard.due,
  };
}

export function getCardsDue(cards: VocabCardState[], now: Date = new Date()): VocabCardState[] {
  return cards.filter((card) => card.due <= now);
}

export function getCardsByState(cards: VocabCardState[], state: State): VocabCardState[] {
  return cards.filter((card) => card.state === state);
}

export { Rating, State } from 'ts-fsrs';

export const RATING_LABELS: Record<Exclude<Rating, Rating.Manual>, { label: string; color: string; description: string }> = {
  [Rating.Again]: {
    label: 'Again',
    color: 'text-rose-600 bg-rose-100',
    description: 'Complete blackout — no recall',
  },
  [Rating.Hard]: {
    label: 'Hard',
    color: 'text-orange-600 bg-orange-100',
    description: 'Recalled with serious difficulty',
  },
  [Rating.Good]: {
    label: 'Good',
    color: 'text-emerald-600 bg-emerald-100',
    description: 'Recalled with some effort',
  },
  [Rating.Easy]: {
    label: 'Easy',
    color: 'text-sky-600 bg-sky-100',
    description: 'Perfect recall, effortless',
  },
};