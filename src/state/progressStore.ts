// STEP 4 — Progress / unlock state.
// Tracks which quests a player has completed so the World Map can show
// locked vs. unlocked states and position the avatar. Persisted to
// localStorage. NOTE: XP/coins/streak live in a separate store (Step 10).
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_WORLDS } from '../content/worlds';

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
    (set, get) => ({
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

      isQuestUnlocked: (questId) => {
        const state = get();
        for (const world of ALL_WORLDS) {
          const idx = world.quests.findIndex((q) => q.id === questId);
          if (idx !== -1) {
            if (!state.isWorldUnlocked(world.id)) return false;
            if (idx === 0) return true;
            const prevQuest = world.quests[idx - 1];
            return state.completedQuestIds.includes(prevQuest.id);
          }
        }
        return false;
      },

      isWorldUnlocked: (worldId) => {
        const state = get();
        const world = ALL_WORLDS.find((w) => w.id === worldId);
        if (!world) return false;
        if (world.unlockRequirement === 'first' || world.id === 'world-pre-a1') return true;

        if (state.defeatedGuardianWorldIds.includes(world.unlockRequirement)) {
          return true;
        }
        const prereqWorld = ALL_WORLDS.find((w) => w.id === world.unlockRequirement);
        if (prereqWorld && prereqWorld.quests.length > 0) {
          const allDone = prereqWorld.quests.every((q) => state.completedQuestIds.includes(q.id));
          if (allDone) return true;
        }
        return false;
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
