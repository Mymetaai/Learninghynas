// Training store — tracks exercise mistakes for the "Weak Spots" drill mode
// and provides the same data to the Home Dashboard's "AI Study Insights" card.
// Also manages FSRS (Free Spaced Repetition Scheduler) cards for vocabulary.
// Persisted to localStorage via Zustand `persist`, matching existing stores.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';
import { getCurrentUserId, syncUserStats } from '../lib/supabaseClient';
import { Rating, getDefaultCard, scheduleCard, getCardsDue, getCardsByState } from '../lib/fsrs';
import type { VocabCardState } from '../lib/fsrs';

export interface MistakeEntry {
  /** The word or prompt the student got wrong. */
  word: string;
  /** The correct answer they should have given. */
  correctAnswer: string;
  /** What they actually answered. */
  wrongAnswer: string;
  /** Exercise type for regenerating a similar exercise. */
  exerciseType: 'multiple-choice' | 'fill-blank' | 'match' | 'translation' | 'listening' | 'reorder' | 'drag-drop';
  /** ISO date of the mistake (yyyy-mm-dd). */
  date: string;
  /** How many times this word has been reviewed correctly (clears at 2). */
  reviewedCorrectly: number;
}

export type SRSCard = VocabCardState

interface TrainingState {
  /** Recorded mistakes from exercises. */
  mistakes: MistakeEntry[];
  /** FSRS cards for spaced repetition vocabulary review. */
  srsCards: SRSCard[];
  /** Total training-session XP earned (display only). */
  trainingSessionsCompleted: number;

  /** Last active level chosen in UnifiedVocabTrainer. */
  lastActiveLevel: string;
  /** Last active category chosen in UnifiedVocabTrainer. */
  lastActiveCategory: string;
  /** Saved card index per level-category key (e.g. 'A1-Saludos': 4). */
  categoryProgressIndex: Record<string, number>;
  /** Track mastered word IDs. */
  masteredWordIds: Record<string, boolean>;

  /** Record a mistake (deduped by word — updates existing if already tracked). */
  recordMistake: (entry: Omit<MistakeEntry, 'reviewedCorrectly'>) => void;
  /** Mark a mistake-word as reviewed correctly once. Removes after 2 correct reviews. */
  markReviewedCorrectly: (word: string) => void;
  /** Clear all mistakes (testing / reset). */
  clearAllMistakes: () => void;
  /** Increment sessions completed count. */
  completeTrainingSession: () => void;
  /** Save current level, category, and card index in training store. */
  saveVocabProgress: (level: string, category: string, cardIndex: number, wordId?: string) => void;
  /**
   * Award XP + coins for a training session. Delegates to the existing
   * statsStore.addRewards() — no parallel XP system.
   */
  grantTrainingRewards: (correct: number, total: number) => { xp: number; coins: number };
  /** Get or create an SRS card for a vocabulary word. */
  getOrCreateSRSCard: (wordId: string, word: string, translation: string, level: string, category: string) => SRSCard;
  /** Review an SRS card with a rating (Again/Hard/Good/Easy). */
  reviewSRSCard: (wordId: string, rating: Rating) => void;
  /** Get all cards due for review. */
  getDueSRSCards: () => SRSCard[];
  /** Get SRS cards by state (New, Learning, Review, Relearning). */
  getSRSCardsByState: (state: number) => SRSCard[];
}

const DEFAULT_STATE = {
  mistakes: [] as MistakeEntry[],
  srsCards: [] as SRSCard[],
  trainingSessionsCompleted: 0,
  lastActiveLevel: 'A1',
  lastActiveCategory: 'Saludos',
  categoryProgressIndex: {} as Record<string, number>,
  masteredWordIds: {} as Record<string, boolean>,
};

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      recordMistake: (entry) => {
        set((state) => {
          const existing = state.mistakes.findIndex(
            (m) => m.word.toLowerCase() === entry.word.toLowerCase(),
          );
          if (existing >= 0) {
            // Update existing mistake with latest attempt, reset review count
            const updated = [...state.mistakes];
            updated[existing] = { ...entry, reviewedCorrectly: 0 };
            return { mistakes: updated };
          }
          return {
            mistakes: [...state.mistakes, { ...entry, reviewedCorrectly: 0 }],
          };
        });
      },

      markReviewedCorrectly: (word) => {
        set((state) => {
          const updated = state.mistakes
            .map((m) => {
              if (m.word.toLowerCase() === word.toLowerCase()) {
                return { ...m, reviewedCorrectly: m.reviewedCorrectly + 1 };
              }
              return m;
            })
            // Remove entries that have been reviewed correctly 2+ times
            .filter((m) => m.reviewedCorrectly < 2);
          return { mistakes: updated };
        });
      },

      clearAllMistakes: () => set({ mistakes: [] }),

      completeTrainingSession: () =>
        set((s) => ({ trainingSessionsCompleted: s.trainingSessionsCompleted + 1 })),

      saveVocabProgress: (level, category, cardIndex, wordId) => {
        set((state) => {
          const key = `${level}-${category}`;
          const updatedIndexMap = { ...state.categoryProgressIndex, [key]: cardIndex };
          const updatedMastered = wordId
            ? { ...state.masteredWordIds, [wordId]: true }
            : state.masteredWordIds;

          return {
            lastActiveLevel: level,
            lastActiveCategory: category,
            categoryProgressIndex: updatedIndexMap,
            masteredWordIds: updatedMastered,
          };
        });
      },

      grantTrainingRewards: (correct, total) => {
        const percentage = total > 0 ? correct / total : 0;
        // Same formula as dailyQuestStore: 15–40 XP, 3–10 coins
        const xp = Math.round(15 + percentage * 25);
        const coins = Math.round(3 + percentage * 7);
        useStatsStore.getState().addRewards(xp, coins);
        get().completeTrainingSession();
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, useStatsStore.getState()).catch(() => {});
        return { xp, coins };
      },

      // SRS methods
      getOrCreateSRSCard: (wordId, word, translation, level, category) => {
        const state = get();
        const existingCard = state.srsCards.find((c) => c.wordId === wordId);
        if (existingCard) return existingCard;
        const newCard = getDefaultCard(wordId, word, translation, level, category);
        set((s) => ({ srsCards: [...s.srsCards, newCard] }));
        return newCard;
      },

      reviewSRSCard: (wordId, rating) => {
        set((state) => {
          const cardIndex = state.srsCards.findIndex((c) => c.wordId === wordId);
          if (cardIndex === -1) return state;
          const card = state.srsCards[cardIndex];
          const { card: updatedCard } = scheduleCard(card, rating);
          const updatedCards = [...state.srsCards];
          updatedCards[cardIndex] = updatedCard;
          return { srsCards: updatedCards };
        });
      },

      getDueSRSCards: () => {
        const state = get();
        return getCardsDue(state.srsCards);
      },

      getSRSCardsByState: (srsState) => {
        const state = get();
        return getCardsByState(state.srsCards, srsState);
      },
    }),
    {
      name: 'wayfarer-training',
      partialize: (state) => ({
        mistakes: state.mistakes,
        srsCards: state.srsCards,
        trainingSessionsCompleted: state.trainingSessionsCompleted,
        lastActiveLevel: state.lastActiveLevel,
        lastActiveCategory: state.lastActiveCategory,
        categoryProgressIndex: state.categoryProgressIndex,
        masteredWordIds: state.masteredWordIds,
      }),
    },
  ),
);
