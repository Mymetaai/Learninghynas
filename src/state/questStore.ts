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
  allUnlocked: boolean;
  activeLevelId: string;
  levelResults: Record<string, LevelResult>;
  completedLevelIds: string[];
  
  // Actions
  setActiveLevelId: (levelId: string) => void;
  completeLevel: (levelId: string, stars: number, score: number, xpEarned?: number, coinsEarned?: number) => void;
  isLevelUnlocked: (levelId: string) => boolean;
  getLevelStars: (levelId: string) => number;
  unlockAllLevels: () => void;
  resetQuestProgress: () => void;
}

const ALL_24_BOOK_LEVEL_IDS = Array.from({ length: 24 }, (_, i) => `book-lvl-${i + 1}`);

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      allUnlocked: true,
      activeLevelId: 'book-lvl-1',
      levelResults: ALL_24_BOOK_LEVEL_IDS.reduce((acc, id) => {
        acc[id] = {
          levelId: id,
          completed: true,
          stars: 3,
          bestScore: 100,
          completedAt: new Date().toISOString(),
        };
        return acc;
      }, {} as Record<string, LevelResult>),
      completedLevelIds: ALL_24_BOOK_LEVEL_IDS,

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

      isLevelUnlocked: (_levelId) => {
        return true; // All 24 levels unlocked globally
      },

      getLevelStars: (levelId) => {
        return get().levelResults[levelId]?.stars || 3;
      },

      unlockAllLevels: () => {
        set({
          allUnlocked: true,
          completedLevelIds: ALL_24_BOOK_LEVEL_IDS,
          levelResults: ALL_24_BOOK_LEVEL_IDS.reduce((acc, id) => {
            acc[id] = {
              levelId: id,
              completed: true,
              stars: 3,
              bestScore: 100,
              completedAt: new Date().toISOString(),
            };
            return acc;
          }, {} as Record<string, LevelResult>),
        });
      },

      resetQuestProgress: () => {
        set({
          allUnlocked: true,
          activeLevelId: 'book-lvl-1',
          levelResults: ALL_24_BOOK_LEVEL_IDS.reduce((acc, id) => {
            acc[id] = {
              levelId: id,
              completed: true,
              stars: 3,
              bestScore: 100,
              completedAt: new Date().toISOString(),
            };
            return acc;
          }, {} as Record<string, LevelResult>),
          completedLevelIds: ALL_24_BOOK_LEVEL_IDS,
        });
      },
    }),
    {
      name: 'hyena-quest-store',
      partialize: (state) => ({
        allUnlocked: state.allUnlocked,
        activeLevelId: state.activeLevelId,
        levelResults: state.levelResults,
        completedLevelIds: state.completedLevelIds,
      }),
    }
  )
);
