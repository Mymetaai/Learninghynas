// STEP 4 — Progress / unlock state.
// Tracks which quests a player has completed so the World Map can show
// locked vs. unlocked states and position the avatar. Persisted to
// localStorage. NOTE: XP/coins/streak live in a separate store (Step 10).
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_WORLDS, getQuest, getWorld, BOOK_LEVELS } from '../content';

interface ProgressState {
  /** Quest ids the player has completed (set, but stored as array). */
  completedQuestIds: string[];
  /** Mark a quest complete and unlock the next one in its world. */
  completeQuest: (questId: string) => void;
  /** Is this quest playable (unlocked) right now? */
  isQuestUnlocked: (questId: string) => boolean;
  /** Is this world's first quest accessible (its prerequisite world beaten)? */
  isWorldUnlocked: (worldId: string) => boolean;
  /** Reset all progress (fresh account / testing). */
  reset: () => void;
}

/**
 * Returns the ordered list of all quest ids across all worlds. Used to
 * determine "next" after a completion and avatar position.
 */
const orderedQuestIds = (): string[] =>
  ALL_WORLDS.flatMap((w) => w.quests.map((q) => q.id));

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedQuestIds: [],

      completeQuest: (questId) =>
        set((state) => {
          if (state.completedQuestIds.includes(questId)) return state;
          return { completedQuestIds: [...state.completedQuestIds, questId] };
        }),

      isQuestUnlocked: (questId) => {
        const quest = getQuest(questId);
        if (!quest) return false;
        // Check if it's a book level (Quest Journey tab)
        const bookIdx = BOOK_LEVELS.findIndex((q) => q.id === questId);
        if (bookIdx >= 0) {
          if (bookIdx === 0) return true; // Level 1 always unlocked
          return get().completedQuestIds.includes(BOOK_LEVELS[bookIdx - 1].id);
        }
        // Original world-based unlock logic
        const world = ALL_WORLDS.find((w) => w.quests.some((q) => q.id === questId));
        if (!world) return false;
        if (!get().isWorldUnlocked(world.id)) return false;
        const idx = world.quests.findIndex((q) => q.id === questId);
        if (idx <= 0) return true; // first quest of an unlocked world
        const prevId = world.quests[idx - 1].id;
        return get().completedQuestIds.includes(prevId);
      },

      isWorldUnlocked: (worldId) => {
        const world = getWorld(worldId);
        if (!world) return false;
        if (world.unlockRequirement === 'first') return true;
        // Unlock requirement is the previous world's id; unlocked when the
        // previous world's last quest is completed.
        const prevWorld = getWorld(world.unlockRequirement);
        if (!prevWorld) return false;
        const lastQuestId = prevWorld.quests.at(-1)?.id;
        if (!lastQuestId) return false;
        return get().completedQuestIds.includes(lastQuestId);
      },

      reset: () => set({ completedQuestIds: [] }),
    }),
    {
      name: 'wayfarer-progress',
      // Only persist the raw data, not the functions.
      partialize: (state) => ({ completedQuestIds: state.completedQuestIds }),
    },
  ),
);

/** The furthest unlocked quest id (avatar position). First quest if none done. */
export const useAvatarQuestId = (): string => {
  const ids = orderedQuestIds();
  const isUnlocked = useProgressStore((s) => s.isQuestUnlocked);
  for (let i = ids.length - 1; i >= 0; i--) {
    if (isUnlocked(ids[i])) return ids[i];
  }
  return ids[0];
};
