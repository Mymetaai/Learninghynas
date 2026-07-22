// STEP 4 — Progress / unlock state.
// Tracks which quests a player has completed so the World Map can show
// locked vs. unlocked states and position the avatar. Persisted to
// localStorage. NOTE: XP/coins/streak live in a separate store (Step 10).
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  /** Quest ids the player has completed (set, but stored as array). */
  completedQuestIds: string[];
  /** World ids where the guardian has been defeated. */
  defeatedGuardianWorldIds: string[];
  /** Sentinel ids that have been defeated. */
  defeatedSentinelIds: string[];
  /** Mark a quest complete and unlock the next one in its world. */
  completeQuest: (questId: string) => void;
  /** Mark a guardian defeated for a world. */
  defeatGuardian: (worldId: string) => void;
  /** Mark a sentinel defeated. */
  defeatSentinel: (sentinelId: string) => void;
  /** Is this quest playable (unlocked) right now? */
  isQuestUnlocked: (questId: string) => boolean;
  /** Is this world's first quest accessible (its prerequisite world beaten)? */
  isWorldUnlocked: (worldId: string) => boolean;
  /** Reset all progress (fresh account / testing). */
  reset: () => void;
}


export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedQuestIds: [],
      defeatedGuardianWorldIds: [],
      defeatedSentinelIds: [],

      completeQuest: (questId) =>
        set((state) => {
          if (state.completedQuestIds.includes(questId)) return state;
          return { completedQuestIds: [...state.completedQuestIds, questId] };
        }),

      defeatGuardian: (worldId) =>
        set((state) => {
          if (state.defeatedGuardianWorldIds.includes(worldId)) return state;
          return { defeatedGuardianWorldIds: [...state.defeatedGuardianWorldIds, worldId] };
        }),

      defeatSentinel: (sentinelId) =>
        set((state) => {
          if (state.defeatedSentinelIds.includes(sentinelId)) return state;
          return { defeatedSentinelIds: [...state.defeatedSentinelIds, sentinelId] };
        }),

      isQuestUnlocked: (_questId) => {
        // Dev bypass: always unlocked
        return true;
      },

      isWorldUnlocked: (_worldId) => {
        // Dev bypass: always unlocked
        return true;
      },

      reset: () => set({ completedQuestIds: [], defeatedGuardianWorldIds: [], defeatedSentinelIds: [] }),
    }),
    {
      name: 'wayfarer-progress',
      // Only persist the raw data, not the functions.
      partialize: (state) => ({
        completedQuestIds: state.completedQuestIds,
        defeatedGuardianWorldIds: state.defeatedGuardianWorldIds,
        defeatedSentinelIds: state.defeatedSentinelIds,
      }),
    }
  )
);
