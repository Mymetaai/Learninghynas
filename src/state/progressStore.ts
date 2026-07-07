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

if (typeof window !== 'undefined' && window.localStorage) {
  window.localStorage.removeItem('wayfarer-progress');
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
        
        // If the world has a chapter structure
        if (world.chapters && world.chapters.length > 0) {
          const chapter = world.chapters.find((c) => c.quests.some((q) => q.id === questId));
          if (!chapter) return false;
          
          const idx = chapter.quests.findIndex((q) => q.id === questId);
          if (idx > 0) {
            // Unlocked if previous quest in this chapter is complete
            return get().completedQuestIds.includes(chapter.quests[idx - 1].id);
          } else {
            // First quest of the chapter
            if (chapter.chapterNumber === 1) {
              return true; // first chapter starts unlocked when world is unlocked
            }
            
            // Succeeding chapters require the previous chapter's boss to be defeated
            const prevChapter = world.chapters.find((c) => c.chapterNumber === chapter.chapterNumber - 1);
            if (!prevChapter) return false;
            
            const boss = prevChapter.endBoss;
            if (boss.type === 'sentinel') {
              return get().defeatedSentinelIds.includes(boss.id);
            } else {
              return get().defeatedGuardianWorldIds.includes(world.id);
            }
          }
        }
        
        // Fallback for flat worlds
        const idx = world.quests.findIndex((q) => q.id === questId);
        if (idx <= 0) return true; // first quest of an unlocked world
        const prevId = world.quests[idx - 1].id;
        return get().completedQuestIds.includes(prevId);
      },

      isWorldUnlocked: (worldId) => {
        const world = getWorld(worldId);
        if (!world) return false;
        if (world.unlockRequirement === 'first') return true;
        return get().defeatedGuardianWorldIds.includes(world.unlockRequirement);
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
