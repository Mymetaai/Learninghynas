import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useTrainingStore } from '../state/trainingStore';

describe('Training Store', () => {
  beforeEach(() => {
    // Reset store to initial state
    useTrainingStore.setState({
      mistakes: [],
      srsCards: [],
      trainingSessionsCompleted: 0,
    });
    vi.clearAllMocks();
  });

  describe('Mistakes', () => {
    it('records a new mistake', () => {
      act(() => {
        useTrainingStore.getState().recordMistake({
          word: 'hola',
          correctAnswer: 'hello',
          wrongAnswer: 'hi',
          exerciseType: 'multiple-choice',
          date: '2024-01-15',
        });
      });

      const mistakes = useTrainingStore.getState().mistakes;
      expect(mistakes).toHaveLength(1);
      expect(mistakes[0].word).toBe('hola');
      expect(mistakes[0].reviewedCorrectly).toBe(0);
    });

    it('updates existing mistake instead of duplicating', () => {
      act(() => {
        useTrainingStore.getState().recordMistake({
          word: 'hola',
          correctAnswer: 'hello',
          wrongAnswer: 'hi',
          exerciseType: 'multiple-choice',
          date: '2024-01-15',
        });
        useTrainingStore.getState().recordMistake({
          word: 'hola',
          correctAnswer: 'hello',
          wrongAnswer: 'hey',
          exerciseType: 'translation',
          date: '2024-01-16',
        });
      });

      const mistakes = useTrainingStore.getState().mistakes;
      expect(mistakes).toHaveLength(1);
      expect(mistakes[0].wrongAnswer).toBe('hey');
      expect(mistakes[0].exerciseType).toBe('translation');
      expect(mistakes[0].reviewedCorrectly).toBe(0); // Reset on new mistake
    });

    it('marks mistake as reviewed correctly', () => {
      act(() => {
        useTrainingStore.getState().recordMistake({
          word: 'hola',
          correctAnswer: 'hello',
          wrongAnswer: 'hi',
          exerciseType: 'multiple-choice',
          date: '2024-01-15',
        });
        useTrainingStore.getState().markReviewedCorrectly('hola');
      });

      let mistakes = useTrainingStore.getState().mistakes;
      expect(mistakes[0].reviewedCorrectly).toBe(1);

      act(() => {
        useTrainingStore.getState().markReviewedCorrectly('hola');
      });

      mistakes = useTrainingStore.getState().mistakes;
      expect(mistakes).toHaveLength(0);
    });

    it('removes mistake after 2 correct reviews', () => {
      act(() => {
        useTrainingStore.getState().recordMistake({
          word: 'hola',
          correctAnswer: 'hello',
          wrongAnswer: 'hi',
          exerciseType: 'multiple-choice',
          date: '2024-01-15',
        });
        useTrainingStore.getState().markReviewedCorrectly('hola');
        useTrainingStore.getState().markReviewedCorrectly('hola');
      });

      const mistakes = useTrainingStore.getState().mistakes;
      expect(mistakes).toHaveLength(0);
    });

    it('clears all mistakes', () => {
      act(() => {
        useTrainingStore.getState().recordMistake({
          word: 'hola',
          correctAnswer: 'hello',
          wrongAnswer: 'hi',
          exerciseType: 'multiple-choice',
          date: '2024-01-15',
        });
        useTrainingStore.getState().clearAllMistakes();
      });

      const mistakes = useTrainingStore.getState().mistakes;
      expect(mistakes).toHaveLength(0);
    });
  });

  describe('SRS Cards', () => {
    it('creates a new SRS card for a vocabulary word', () => {
      const card = useTrainingStore.getState().getOrCreateSRSCard(
        'word-1',
        'hola',
        'hello',
        'A1',
        'greetings'
      );

      expect(card.wordId).toBe('word-1');
      expect(card.word).toBe('hola');
      expect(card.translation).toBe('hello');
      expect(card.level).toBe('A1');
      expect(card.category).toBe('greetings');
    });

    it('returns existing card instead of creating duplicate', () => {
      const card1 = useTrainingStore.getState().getOrCreateSRSCard(
        'word-1',
        'hola',
        'hello',
        'A1',
        'greetings'
      );
      const card2 = useTrainingStore.getState().getOrCreateSRSCard(
        'word-1',
        'hola',
        'hello',
        'A1',
        'greetings'
      );

      expect(card1).toBe(card2);
      expect(useTrainingStore.getState().srsCards).toHaveLength(1);
    });

    it('reviews an SRS card and updates its state', () => {
      const card = useTrainingStore.getState().getOrCreateSRSCard(
        'word-1',
        'hola',
        'hello',
        'A1',
        'greetings'
      );
      const initialDue = card.due;

      act(() => {
        useTrainingStore.getState().reviewSRSCard('word-1', 3); // Good
      });

      const updatedCard = useTrainingStore.getState().srsCards.find(c => c.wordId === 'word-1');
      expect(updatedCard).toBeDefined();
      expect(updatedCard!.due).not.toEqual(initialDue);
      expect(updatedCard!.interval).toBeGreaterThan(0);
    });

    it('gets due cards for review', () => {
      useTrainingStore.getState().getOrCreateSRSCard('word-1', 'hola', 'hello', 'A1', 'greetings');
      useTrainingStore.getState().getOrCreateSRSCard('word-2', 'adios', 'goodbye', 'A1', 'greetings');

      // Set one card as due in the past
      act(() => {
        useTrainingStore.setState({
          srsCards: useTrainingStore.getState().srsCards.map(card =>
            card.wordId === 'word-1'
              ? { ...card, due: new Date(Date.now() - 86400000) }
              : card
          ),
        });
      });

      act(() => {
        useTrainingStore.setState({
          srsCards: useTrainingStore.getState().srsCards.map(card =>
            card.wordId === 'word-2'
              ? { ...card, due: new Date(Date.now() + 86400000) }
              : card,
          ),
        });
      });

      const dueCards = useTrainingStore.getState().getDueSRSCards();
      expect(dueCards).toHaveLength(1);
      expect(dueCards[0].wordId).toBe('word-1');
    });

    it('gets cards by state', () => {
      useTrainingStore.getState().getOrCreateSRSCard('word-1', 'hola', 'hello', 'A1', 'greetings');
      useTrainingStore.getState().getOrCreateSRSCard('word-2', 'adios', 'goodbye', 'A1', 'greetings');

      // Manually set one to Learning state
      act(() => {
        useTrainingStore.setState({
          srsCards: useTrainingStore.getState().srsCards.map(card =>
            card.wordId === 'word-1'
              ? { ...card, state: 1 } // Learning state
              : card
          ),
        });
      });

      const learningCards = useTrainingStore.getState().getSRSCardsByState(1);
      expect(learningCards).toHaveLength(1);
      expect(learningCards[0].wordId).toBe('word-1');
    });
  });

  describe('Training Sessions', () => {
    it('increments sessions completed', () => {
      act(() => {
        useTrainingStore.getState().completeTrainingSession();
      });

      expect(useTrainingStore.getState().trainingSessionsCompleted).toBe(1);

      act(() => {
        useTrainingStore.getState().completeTrainingSession();
      });

      expect(useTrainingStore.getState().trainingSessionsCompleted).toBe(2);
    });

    it('grants training rewards based on performance', () => {
      const result = useTrainingStore.getState().grantTrainingRewards(8, 10); // 80% accuracy

      expect(result.xp).toBeGreaterThan(15);
      expect(result.xp).toBeLessThanOrEqual(40);
      expect(result.coins).toBeGreaterThan(3);
      expect(result.coins).toBeLessThanOrEqual(10);
      expect(useTrainingStore.getState().trainingSessionsCompleted).toBe(1);
    });
  });
});