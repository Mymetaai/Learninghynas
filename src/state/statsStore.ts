// STEP 9/10 — Stats store: XP, coins, streak, and learned vocabulary.
// Persisted to localStorage via Zustand `persist`. Separate from the
// progress store (which tracks quest completion / unlocks) so each concern
// stays isolated. The Quest Completion screen grants rewards here; the HUD
// reads live values from here.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUserId, syncUserStats, syncLearnedVocab } from '../lib/supabaseClient';

export interface WeeklyActivityItem {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  minutes: number;
}

/** Returns yyyy-mm-dd string for local Monday of the given date. */
export const getMondayKey = (d: Date = new Date()): string => {
  const dayIndex = (d.getDay() + 6) % 7;
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dayIndex);
  const y = monday.getFullYear();
  const m = String(monday.getMonth() + 1).padStart(2, '0');
  const day = String(monday.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const DEFAULT_WEEKLY_ACTIVITY: WeeklyActivityItem[] = [
  { day: 'Mon', minutes: 0 },
  { day: 'Tue', minutes: 0 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 0 },
  { day: 'Fri', minutes: 0 },
  { day: 'Sat', minutes: 0 },
  { day: 'Sun', minutes: 0 },
];

interface LearnedVocabEntry {
  /** The Spanish word, e.g. "hola". */
  word: string;
  /** Quest id where the word was learned. */
  questId: string;
  /** ISO date string (yyyy-mm-dd) of when it was learned. */
  date: string;
}

interface StatsState {
  /** Total experience points. */
  xp: number;
  /** Spendable coins. */
  coins: number;
  /** Current day streak (consecutive days with activity). */
  streak: number;
  /** ISO date string of the last active day (for streak calc). */
  lastActiveDate: string;
  /** Vocabulary the player has encountered/learned. */
  learnedVocab: LearnedVocabEntry[];
  /** Collected One Piece card ids in the shop. */
  collectedCardIds: string[];
  /** Completed/claimed quest reward ids (for idempotency). */
  claimedQuestRewards: string[];
  /** Claimed master exam ids. */
  claimedExamIds: string[];
  /** Earned syllabus badges per course part. */
  earnedBadges: Record<string, boolean>;
  /** Completed syllabus lesson checklist. */
  completedLessons: Record<string, boolean>;
  /** Active study minutes per day for the current week (Mon-Sun). */
  weeklyActivity: WeeklyActivityItem[];
  /** Sub-minute active study seconds accumulator. */
  activeSeconds: number;
  /** ISO date string (yyyy-mm-dd) of Monday for current tracked week. */
  weekStartDate: string;

  /** Grant XP and coins for completing a quest (idempotent per quest). */
  grantQuestRewards: (questId: string, xp: number, coins: number) => void;
  /** Grant XP and coins for general activities (e.g. talking to companions). */
  addRewards: (xp: number, coins: number) => void;
  /** Record vocabulary words learned from a quest (deduped by word). */
  learnVocab: (words: string[], questId: string) => void;
  /** Spend coins (returns false if not enough). */
  spendCoins: (amount: number) => boolean;
  /** Collect a drawn shop card. */
  collectCard: (cardId: string) => void;
  /** Collect a list of shop cards at once. */
  collectAllCards: (cardIds: string[]) => void;
  /** Claim master exam rewards (once per part). */
  claimExamReward: (examId: string, xp: number, coins: number, coursePart: string) => boolean;
  /** Toggle lesson completion state. */
  toggleLessonComplete: (lessonKey: string) => void;
  /** Tick active study time by adding elapsed seconds. */
  tickActiveStudyTime: (secondsElapsed: number) => void;
  /** Reset all stats to zero (fresh account / testing). */
  reset: () => void;
}

/** Today's date as yyyy-mm-dd, local time. */
const todayKey = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Difference in whole days between two yyyy-mm-dd strings. */
const dayDiff = (a: string, b: string): number => {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
};

const DEFAULT_STATE = {
  xp: 0,
  coins: 100,
  streak: 1,
  lastActiveDate: '',
  learnedVocab: [] as LearnedVocabEntry[],
  collectedCardIds: [] as string[],
  claimedQuestRewards: [] as string[],
  claimedExamIds: [] as string[],
  earnedBadges: {
    part1: false,
    part2: false,
    part3: false,
    part4: false,
    part5: false,
    part6: false,
    part7: false,
    part8: false,
  } as Record<string, boolean>,
  completedLessons: {} as Record<string, boolean>,
  weeklyActivity: DEFAULT_WEEKLY_ACTIVITY,
  activeSeconds: 0,
  weekStartDate: getMondayKey(),
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      grantQuestRewards: (questId, xp, coins) => {
        // Idempotent: if this quest already granted rewards, skip.
        const state = get();
        if (state.claimedQuestRewards.includes(questId)) return;

        // Update streak based on today's activity.
        const today = todayKey();
        const prev = state.lastActiveDate;
        let newStreak = state.streak;
        if (prev !== today) {
          newStreak = prev && dayDiff(prev, today) === 1 ? newStreak + 1 : 1;
        }

        set((s) => ({
          xp: s.xp + xp,
          coins: s.coins + coins,
          streak: newStreak,
          lastActiveDate: today,
          claimedQuestRewards: [...s.claimedQuestRewards, questId],
        }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },
      
      addRewards: (xp, coins) => {
        const today = todayKey();
        const prev = get().lastActiveDate;
        let newStreak = get().streak;
        if (prev !== today) {
          newStreak = prev && dayDiff(prev, today) === 1 ? newStreak + 1 : 1;
        }

        set((state) => ({
          xp: state.xp + xp,
          coins: state.coins + coins,
          streak: newStreak,
          lastActiveDate: today,
        }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      learnVocab: (words, questId) => {
        const date = todayKey();
        set((state) => {
          const existingWords = new Set(state.learnedVocab.map((v) => v.word));
          const newEntries = words
            .filter((w) => !existingWords.has(w))
            .map((word) => ({ word, questId, date }));
          return { learnedVocab: [...state.learnedVocab, ...newEntries] };
        });
        const uid = getCurrentUserId();
        if (uid) {
          syncLearnedVocab(uid, get().learnedVocab).catch(() => {});
          syncUserStats(uid, get()).catch(() => {});
        }
      },

      spendCoins: (amount) => {
        if (get().coins < amount) return false;
        set((state) => ({ coins: state.coins - amount }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
        return true;
      },

      collectCard: (cardId) => {
        set((state) => {
          if (state.collectedCardIds.includes(cardId)) return state;
          return { collectedCardIds: [...state.collectedCardIds, cardId] };
        });
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      collectAllCards: (cardIds) => {
        set((state) => {
          const union = Array.from(new Set([...state.collectedCardIds, ...cardIds]));
          return { collectedCardIds: union };
        });
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      claimExamReward: (examId, xp, coins, coursePart) => {
        const state = get();
        if (state.claimedExamIds.includes(examId) || state.claimedExamIds.includes(coursePart)) {
          return false;
        }

        const today = todayKey();
        const prev = state.lastActiveDate;
        let newStreak = state.streak;
        if (prev !== today) {
          newStreak = prev && dayDiff(prev, today) === 1 ? newStreak + 1 : 1;
        }

        set((s) => ({
          xp: s.xp + xp,
          coins: s.coins + coins,
          streak: newStreak,
          lastActiveDate: today,
          claimedExamIds: Array.from(new Set([...s.claimedExamIds, examId, coursePart])),
          earnedBadges: { ...s.earnedBadges, [coursePart]: true },
        }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
        return true;
      },

      toggleLessonComplete: (lessonKey) => {
        set((s) => {
          const next = { ...s.completedLessons, [lessonKey]: !s.completedLessons[lessonKey] };
          return { completedLessons: next };
        });
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      tickActiveStudyTime: (secondsElapsed) => {
        set((state) => {
          const currentMondayKey = getMondayKey();
          const isRollover = state.weekStartDate !== currentMondayKey;

          let weeklyActivity = isRollover
            ? DEFAULT_WEEKLY_ACTIVITY.map((item) => ({ ...item }))
            : (state.weeklyActivity || DEFAULT_WEEKLY_ACTIVITY).map((item) => ({ ...item }));

          if (weeklyActivity.length !== 7) {
            weeklyActivity = DEFAULT_WEEKLY_ACTIVITY.map((item) => ({ ...item }));
          }

          const currentActiveSec = isRollover ? 0 : (state.activeSeconds || 0);
          const totalSeconds = currentActiveSec + secondsElapsed;
          const addedMinutes = Math.floor(totalSeconds / 60);
          const remainingSeconds = totalSeconds % 60;

          const dayIndex = (new Date().getDay() + 6) % 7;

          if (addedMinutes > 0) {
            weeklyActivity[dayIndex] = {
              ...weeklyActivity[dayIndex],
              minutes: (weeklyActivity[dayIndex]?.minutes || 0) + addedMinutes,
            };
          }

          return {
            weeklyActivity,
            activeSeconds: remainingSeconds,
            weekStartDate: currentMondayKey,
          };
        });
      },

      reset: () => {
        set({
          ...DEFAULT_STATE,
          weeklyActivity: DEFAULT_WEEKLY_ACTIVITY.map((item) => ({ ...item })),
          activeSeconds: 0,
          weekStartDate: getMondayKey(),
          lastActiveDate: todayKey(),
        });
        const uid = getCurrentUserId();
        if (uid) {
          syncUserStats(uid, get()).catch(() => {});
          syncLearnedVocab(uid, get().learnedVocab).catch(() => {});
        }
      },
    }),
    {
      name: 'wayfarer-stats',
      partialize: (state) => ({
        xp: state.xp,
        coins: state.coins,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        learnedVocab: state.learnedVocab,
        collectedCardIds: state.collectedCardIds,
        claimedQuestRewards: state.claimedQuestRewards,
        claimedExamIds: state.claimedExamIds,
        earnedBadges: state.earnedBadges,
        completedLessons: state.completedLessons,
        weeklyActivity: state.weeklyActivity,
        activeSeconds: state.activeSeconds,
        weekStartDate: state.weekStartDate,
      }),
    },
  ),
);

if (typeof window !== 'undefined') {
  useStatsStore.subscribe((state) => {
    const uid = getCurrentUserId();
    if (uid) {
      syncUserStats(uid, state).catch(() => {});
      if (state.learnedVocab && state.learnedVocab.length > 0) {
        syncLearnedVocab(uid, state.learnedVocab).catch(() => {});
      }
    }
  });
}
