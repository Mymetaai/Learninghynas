// Training store — tracks exercise mistakes for the "Weak Spots" drill mode
// and provides the same data to the Home Dashboard's "AI Study Insights" card.
// Persisted to localStorage via Zustand `persist`, matching existing stores.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';

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

interface TrainingState {
  /** Recorded mistakes from exercises. */
  mistakes: MistakeEntry[];
  /** Total training-session XP earned (display only). */
  trainingSessionsCompleted: number;

  /** Record a mistake (deduped by word — updates existing if already tracked). */
  recordMistake: (entry: Omit<MistakeEntry, 'reviewedCorrectly'>) => void;
  /** Mark a mistake-word as reviewed correctly once. Removes after 2 correct reviews. */
  markReviewedCorrectly: (word: string) => void;
  /** Clear all mistakes (testing / reset). */
  clearAllMistakes: () => void;
  /** Increment sessions completed count. */
  completeTrainingSession: () => void;
  /**
   * Award XP + coins for a training session. Delegates to the existing
   * statsStore.addRewards() — no parallel XP system.
   */
  grantTrainingRewards: (correct: number, total: number) => { xp: number; coins: number };
}

const DEFAULT_STATE = {
  mistakes: [] as MistakeEntry[],
  trainingSessionsCompleted: 0,
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

      grantTrainingRewards: (correct, total) => {
        const percentage = total > 0 ? correct / total : 0;
        // Same formula as dailyQuestStore: 15–40 XP, 3–10 coins
        const xp = Math.round(15 + percentage * 25);
        const coins = Math.round(3 + percentage * 7);
        useStatsStore.getState().addRewards(xp, coins);
        get().completeTrainingSession();
        return { xp, coins };
      },
    }),
    {
      name: 'wayfarer-training',
      partialize: (state) => ({
        mistakes: state.mistakes,
        trainingSessionsCompleted: state.trainingSessionsCompleted,
      }),
    },
  ),
);
