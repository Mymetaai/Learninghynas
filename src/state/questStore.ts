// Quest Store — Level progress, star ratings, and rewards for Quest Journey (24 Levels)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';

export interface LevelResult {
  levelId: string;
  completed: boolean;
  stars: number;
  bestScore: number;
  completedAt: string;
}

export interface QuestState {
  activeLevelId: string;
  levelResults: Record<string, LevelResult>;
  completedLevelIds: string[];
  
  // Actions
  setActiveLevelId: (levelId: string) => void;
  completeLevel: (levelId: string, stars: number, score: number, xpEarned?: number, coinsEarned?: number) => void;
  isLevelUnlocked: (levelId: string) => boolean;
  getLevelStars: (levelId: string) => number;
  resetQuestProgress: () => void;
}

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      activeLevelId: 'book-lvl-1',
      levelResults: {
        'book-lvl-1': {
          levelId: 'book-lvl-1',
          completed: false,
          stars: 0,
          bestScore: 0,
          completedAt: '',
        },
      },
      completedLevelIds: [],

      setActiveLevelId: (levelId) => set({ activeLevelId: levelId }),

      completeLevel: (levelId, stars, score, xpEarned = 100, coinsEarned = 40) => {
        const state = get();
        const existing = state.levelResults[levelId];
        const newStars = Math.max(existing?.stars || 0, Math.min(3, Math.max(1, stars)));
        const newBest = Math.max(existing?.bestScore || 0, score);
        const newlyCompleted = !state.completedLevelIds.includes(levelId);

        const updatedResults = {
          ...state.levelResults,
          [levelId]: {
            levelId,
            completed: true,
            stars: newStars,
            bestScore: newBest,
            completedAt: new Date().toISOString(),
          },
        };

        const updatedCompleted = newlyCompleted
          ? [...state.completedLevelIds, levelId]
          : state.completedLevelIds;

        set({
          levelResults: updatedResults,
          completedLevelIds: updatedCompleted,
        });

        // Grant XP and coins via statsStore
        if (newlyCompleted || score > (existing?.bestScore || 0)) {
          useStatsStore.getState().addRewards(xpEarned, coinsEarned);
        }
      },

      isLevelUnlocked: (levelId) => {
        if (levelId === 'book-lvl-1') return true;
        const match = levelId.match(/book-lvl-(\d+)/);
        if (!match) return true;
        const num = parseInt(match[1], 10);
        if (num <= 1) return true;
        const prevId = `book-lvl-${num - 1}`;
        return get().completedLevelIds.includes(prevId);
      },

      getLevelStars: (levelId) => {
        return get().levelResults[levelId]?.stars || 0;
      },

      resetQuestProgress: () => {
        set({
          activeLevelId: 'book-lvl-1',
          levelResults: {},
          completedLevelIds: [],
        });
      },
    }),
    {
      name: 'hyena-quest-store',
    }
  )
);
