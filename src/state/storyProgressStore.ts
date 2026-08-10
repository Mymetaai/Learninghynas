import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';

export interface StoryProgressEntry {
  status: 'unread' | 'read' | 'stamped';
  readAt: string;
}

export interface WordEncounterEntry {
  storyId: string;
  storyTitle: string;
  firstSeenAt: string;
}

export interface StoryProgressState {
  storyProgress: Record<string, StoryProgressEntry>;
  wordEncounters: Record<string, WordEncounterEntry>;

  /** Mark a story as stamped and grant coin/xp rewards */
  markStoryStamped: (storyId: string, storyTitle: string, vocabList?: { word: string }[]) => boolean;

  /** Record a word encounter from a story */
  recordWordEncounter: (lemma: string, storyId: string, storyTitle: string) => void;

  /** Check if a word was encountered in an earlier story */
  getWordEncounter: (lemma: string) => WordEncounterEntry | undefined;

  /** Get story status */
  getStoryStatus: (storyId: string) => 'unread' | 'read' | 'stamped';

  /** Reset all story progress and word encounters */
  resetStoryProgress: () => void;
}

const DEFAULT_STATE = {
  storyProgress: {} as Record<string, StoryProgressEntry>,
  wordEncounters: {} as Record<string, WordEncounterEntry>,
};

export const useStoryProgressStore = create<StoryProgressState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      markStoryStamped: (storyId: string, storyTitle: string, vocabList?: { word: string }[]) => {
        const current = get().storyProgress[storyId];
        if (current?.status === 'stamped') return false; // Already stamped

        const now = new Date().toISOString();
        const updatedProgress = {
          ...get().storyProgress,
          [storyId]: { status: 'stamped' as const, readAt: now },
        };

        // Record vocabulary encounters for this completed story
        const updatedEncounters = { ...get().wordEncounters };
        if (vocabList && vocabList.length > 0) {
          vocabList.forEach((v) => {
            const key = v.word.toLowerCase();
            if (!updatedEncounters[key]) {
              updatedEncounters[key] = {
                storyId,
                storyTitle,
                firstSeenAt: now,
              };
            }
          });
        }

        set({
          storyProgress: updatedProgress,
          wordEncounters: updatedEncounters,
        });

        // Award +15 coins and +25 XP to stats store
        useStatsStore.getState().addRewards(25, 15);

        return true;
      },

      recordWordEncounter: (lemma: string, storyId: string, storyTitle: string) => {
        const key = lemma.toLowerCase();
        if (get().wordEncounters[key]) return; // Already recorded

        set((state) => ({
          wordEncounters: {
            ...state.wordEncounters,
            [key]: {
              storyId,
              storyTitle,
              firstSeenAt: new Date().toISOString(),
            },
          },
        }));
      },

      getWordEncounter: (lemma: string) => {
        return get().wordEncounters[lemma.toLowerCase()];
      },

      getStoryStatus: (storyId: string) => {
        return get().storyProgress[storyId]?.status || 'unread';
      },

      resetStoryProgress: () => {
        set({
          storyProgress: {},
          wordEncounters: {},
        });
      },
    }),
    {
      name: 'wayfarer-story-progress',
    }
  )
);
