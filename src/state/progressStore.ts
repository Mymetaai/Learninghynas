// STEP 4 — Progress / unlock state.
// Tracks which quests a player has completed so the World Map can show
// locked vs. unlocked states and position the avatar. Persisted to
// localStorage. NOTE: XP/coins/streak live in a separate store (Step 10).
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_WORLDS } from '../content/worlds';

interface ProgressState {
  /** Global unlock flag (defaults to true for full access). */
  allUnlocked: boolean;
  /** Quest ids the player has completed. */
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
  /** Unlock all quests, worlds, and guardians globally. */
  unlockAll: () => void;
  /** Reset all progress (fresh account / testing). */
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      allUnlocked: true,
      completedQuestIds: [],
      defeatedGuardianWorldIds: ALL_WORLDS.map((w) => w.id),
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
        if (state.allUnlocked) return true;
        for (const world of ALL_WORLDS) {
          const idx = world.quests.findIndex((q) => q.id === questId);
          if (idx !== -1) {
            if (!state.isWorldUnlocked(world.id)) return false;
            if (idx === 0) return true;
            const prevQuest = world.quests[idx - 1];
            return state.completedQuestIds.includes(prevQuest.id);
          }
        }
        return true;
      },

      isWorldUnlocked: (_worldId) => {
        return true; // All worlds unlocked globally
      },

      unlockAll: () => {
        const allQuests = ALL_WORLDS.flatMap((w) => w.quests.map((q) => q.id));
        const allWorlds = ALL_WORLDS.map((w) => w.id);
        set({
          allUnlocked: true,
          completedQuestIds: Array.from(new Set([...get().completedQuestIds, ...allQuests])),
          defeatedGuardianWorldIds: Array.from(new Set([...get().defeatedGuardianWorldIds, ...allWorlds])),
        });
      },

      reset: () =>
        set({
          allUnlocked: true,
          completedQuestIds: [],
          defeatedGuardianWorldIds: ALL_WORLDS.map((w) => w.id),
          defeatedSentinelIds: [],
        }),
    }),
    {
      name: 'wayfarer-progress',
      partialize: (state) => ({
        allUnlocked: state.allUnlocked,
        completedQuestIds: state.completedQuestIds,
        defeatedGuardianWorldIds: state.defeatedGuardianWorldIds,
        defeatedSentinelIds: state.defeatedSentinelIds,
      }),
    }
  )
);
