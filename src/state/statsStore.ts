// STEP 9/10 — Stats store: XP, coins, streak, and learned vocabulary.
// Persisted to localStorage via Zustand `persist`. Separate from the
// progress store (which tracks quest completion / unlocks) so each concern
// stays isolated. The Quest Completion screen grants rewards here; the HUD
// reads live values from here.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUserId, syncUserStats, syncLearnedVocab } from '../lib/supabaseClient';
import { useDailyQuestStore } from './dailyQuestStore';
import { useEntitlementStore } from './entitlementStore';

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

export interface DailyActivityRecord {
  date: string; // YYYY-MM-DD
  minutes: number;
  xpEarned: number;
  lessonsCompleted: number;
}

interface StatsState {
  /** Reset all progress locally and clear persisted storage. */
  resetAllProgress: () => void;
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
  /** All-time daily activity history log keyed by YYYY-MM-DD. */
  dailyHistory: Record<string, DailyActivityRecord>;
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
  /** Passively check if streak has broken due to missed days without activity. */
  checkPassiveStreakStatus: () => void;
  /** Reset all stats to zero (fresh account / testing). */
  reset: () => void;
}

/** Today's date as yyyy-mm-dd, local time. */
export const todayKey = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Difference in whole days between two yyyy-mm-dd strings. */
export const dayDiff = (a: string, b: string): number => {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
};

/** Helper to record or update today's all-time activity log */
const updateDailyHistoryLog = (
  history: Record<string, DailyActivityRecord> = {},
  addedMinutes: number = 0,
  addedXp: number = 0,
  addedLessons: number = 0
): Record<string, DailyActivityRecord> => {
  const today = todayKey();
  const existing = history[today] || { date: today, minutes: 0, xpEarned: 0, lessonsCompleted: 0 };
  return {
    ...history,
    [today]: {
      date: today,
      minutes: existing.minutes + addedMinutes,
      xpEarned: existing.xpEarned + addedXp,
      lessonsCompleted: existing.lessonsCompleted + addedLessons,
    },
  };
};

/** Calculate consecutive active days strictly from dailyHistory and weeklyActivity */
export const calculateConsecutiveStreak = (
  dailyHistory: Record<string, DailyActivityRecord> = {},
  weeklyActivity: WeeklyActivityItem[] = []
): number => {
  const formatDateKey = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const today = new Date();
  const todayKey = formatDateKey(today);

  const hasActivityOnDate = (dateKey: string): boolean => {
    const rec = dailyHistory[dateKey];
    if (rec && ((rec.minutes || 0) > 0 || (rec.xpEarned || 0) > 0 || (rec.lessonsCompleted || 0) > 0)) {
      return true;
    }

    if (weeklyActivity && weeklyActivity.length === 7) {
      const todayDayIndex = (today.getDay() + 6) % 7;
      const d = new Date(dateKey + 'T00:00:00');
      const dDayIndex = (d.getDay() + 6) % 7;
      const diffDays = Math.round((today.getTime() - d.getTime()) / 86_400_000);

      if (diffDays >= 0 && diffDays <= todayDayIndex && weeklyActivity[dDayIndex]?.minutes > 0) {
        return true;
      }
    }

    return false;
  };

  const todayActive = hasActivityOnDate(todayKey);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = formatDateKey(yesterday);
  const yesterdayActive = hasActivityOnDate(yesterdayKey);

  if (!todayActive && !yesterdayActive) {
    return 0;
  }

  let count = 0;
  const curr = new Date(todayActive ? today : yesterday);

  for (let i = 0; i < 365; i++) {
    const key = formatDateKey(curr);
    if (hasActivityOnDate(key)) {
      count++;
      curr.setDate(curr.getDate() - 1);
    } else {
      break;
    }
  }

  return count;
};

const DEFAULT_STATE = {
  xp: 0,
  coins: 100,
  streak: 0,
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
  dailyHistory: {} as Record<string, DailyActivityRecord>,
  activeSeconds: 0,
  weekStartDate: getMondayKey(),
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      checkPassiveStreakStatus: () => {
        const state = get();
        const today = todayKey();
        const calcStreak = calculateConsecutiveStreak(state.dailyHistory, state.weeklyActivity);

        if (calcStreak === 0 && state.streak > 0 && state.lastActiveDate) {
          const diff = dayDiff(state.lastActiveDate, today);
          if (diff > 1) {
            try {
              const entitlements = useEntitlementStore.getState();
              if (entitlements.consumables?.streak_freeze > 0) {
                useEntitlementStore.setState((s) => ({
                  ...s,
                  consumables: { ...s.consumables, streak_freeze: Math.max(0, s.consumables.streak_freeze - 1) },
                }));
                return;
              }
            } catch {}
          }
        }

        set({ streak: calcStreak, lastActiveDate: calcStreak > 0 ? today : state.lastActiveDate });
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      grantQuestRewards: (questId, xp, coins) => {
        const state = get();
        if (state.claimedQuestRewards.includes(questId)) return;

        const nextDailyHistory = updateDailyHistoryLog(state.dailyHistory, 0, xp, 0);
        const newStreak = calculateConsecutiveStreak(nextDailyHistory, state.weeklyActivity);
        const today = todayKey();

        set((s) => ({
          xp: s.xp + xp,
          coins: s.coins + coins,
          streak: newStreak,
          lastActiveDate: today,
          claimedQuestRewards: [...s.claimedQuestRewards, questId],
          dailyHistory: nextDailyHistory,
        }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      addRewards: (xp, coins) => {
        const state = get();
        const nextDailyHistory = updateDailyHistoryLog(state.dailyHistory, 0, xp, 0);
        const newStreak = calculateConsecutiveStreak(nextDailyHistory, state.weeklyActivity);
        const today = todayKey();

        set((s) => ({
          xp: s.xp + xp,
          coins: s.coins + coins,
          streak: newStreak,
          lastActiveDate: today,
          dailyHistory: nextDailyHistory,
        }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
      },

      learnVocab: (words, questId) => {
        const date = todayKey();
        const state = get();
        const nextDailyHistory = updateDailyHistoryLog(state.dailyHistory, 0, 0, 0);
        const newStreak = calculateConsecutiveStreak(nextDailyHistory, state.weeklyActivity);

        set((s) => {
          const existingWords = new Set(s.learnedVocab.map((v) => v.word));
          const newEntries = words
            .filter((w) => !existingWords.has(w))
            .map((word) => ({ word, questId, date }));
          return {
            learnedVocab: [...s.learnedVocab, ...newEntries],
            streak: newStreak,
            lastActiveDate: date,
            dailyHistory: nextDailyHistory,
          };
        });
        useDailyQuestStore.getState().updateTaskProgress('vocab_review', words.length);
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

        const nextDailyHistory = updateDailyHistoryLog(state.dailyHistory, 0, xp, 0);
        const newStreak = calculateConsecutiveStreak(nextDailyHistory, state.weeklyActivity);
        const today = todayKey();

        set((s) => ({
          xp: s.xp + xp,
          coins: s.coins + coins,
          streak: newStreak,
          lastActiveDate: today,
          claimedExamIds: Array.from(new Set([...s.claimedExamIds, examId, coursePart])),
          earnedBadges: { ...s.earnedBadges, [coursePart]: true },
          dailyHistory: nextDailyHistory,
        }));
        const uid = getCurrentUserId();
        if (uid) syncUserStats(uid, get()).catch(() => {});
        return true;
      },

      toggleLessonComplete: (lessonKey) => {
        const isNowComplete = !get().completedLessons[lessonKey];
        const state = get();
        const nextDailyHistory = updateDailyHistoryLog(state.dailyHistory, 0, 0, isNowComplete ? 1 : 0);
        const newStreak = calculateConsecutiveStreak(nextDailyHistory, state.weeklyActivity);
        const today = todayKey();

        set((s) => {
          const next = { ...s.completedLessons, [lessonKey]: isNowComplete };
          return {
            completedLessons: next,
            streak: newStreak,
            lastActiveDate: today,
            dailyHistory: nextDailyHistory,
          };
        });
        if (isNowComplete) {
          useDailyQuestStore.getState().updateTaskProgress('lesson_progress', 1);
        }
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

          const nextDailyHistory = addedMinutes > 0 ? updateDailyHistoryLog(state.dailyHistory, addedMinutes, 0, 0) : (state.dailyHistory || {});
          const newStreak = calculateConsecutiveStreak(nextDailyHistory, weeklyActivity);
          const today = todayKey();

          return {
            weeklyActivity,
            dailyHistory: nextDailyHistory,
            activeSeconds: remainingSeconds,
            weekStartDate: currentMondayKey,
            streak: newStreak,
            lastActiveDate: newStreak > 0 ? today : state.lastActiveDate,
          };
        });
      },

      /**
       * Reset all progress locally and clear persisted storage.
       * This is used by the UI "Reset Progress" flow.
       */
      resetAllProgress: () => {
        // Clear Zustand persisted localStorage entry.
        try {
          localStorage.removeItem('wayfarer-stats');
        } catch {}
        // Reset store to defaults (without contacting Supabase).
        set({
          ...DEFAULT_STATE,
          xp: 0,
          coins: 100,
          streak: 0,
          lastActiveDate: '',
          weeklyActivity: DEFAULT_WEEKLY_ACTIVITY.map((item) => ({ ...item })),
          dailyHistory: {},
          activeSeconds: 0,
          weekStartDate: getMondayKey(),
        });
        // No Supabase sync – local‑first mode.
      },

      /** Existing reset kept for internal use (e.g., testing) */
      reset: () => {
        set({
          ...DEFAULT_STATE,
          xp: 0,
          coins: 100,
          streak: 0,
          lastActiveDate: '',
          weeklyActivity: DEFAULT_WEEKLY_ACTIVITY.map((item) => ({ ...item })),
          dailyHistory: {},
          activeSeconds: 0,
          weekStartDate: getMondayKey(),
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
        dailyHistory: state.dailyHistory,
        activeSeconds: state.activeSeconds,
        weekStartDate: state.weekStartDate,
      }),
    },
  ),
);

/**
 * Resets all progress locally and clears persisted storage.
 * Uses the store's local-first resetAllProgress (no Supabase sync).
 */
export const resetAllProgress = () => {
  try {
    localStorage.removeItem('wayfarer-stats');
  } catch {}
  useStatsStore.getState().resetAllProgress();
};

/** Export a selector that returns prepared activity metrics for the UI.
 *  The selector is deliberately pure – UI components can memoize it with useMemo.
 */
export const selectUserActivityMetrics = (state: StatsState) => {
  // Helper to get a date string N days ago.
  const daysAgo = (n: number): string => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // 7‑day (current week) metrics – already stored in weeklyActivity.
  const weekly = state.weeklyActivity;

  // 30‑day heatmap data – aggregate dailyHistory for last 30 days.
  const heatmap30: { date: string; minutes: number; xp: number; lessons: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const key = daysAgo(i);
    const rec = state.dailyHistory[key] || { minutes: 0, xpEarned: 0, lessonsCompleted: 0 };
    heatmap30.push({ date: key, minutes: rec.minutes, xp: rec.xpEarned, lessons: rec.lessonsCompleted });
  }

  // All‑time summary.
  const allTime = Object.values(state.dailyHistory).reduce(
    (acc: { totalMinutes: number; totalXp: number; totalLessons: number }, rec: DailyActivityRecord) => {
      acc.totalMinutes += rec.minutes;
      acc.totalXp += rec.xpEarned;
      acc.totalLessons += rec.lessonsCompleted;
      return acc;
    },
    { totalMinutes: 0, totalXp: 0, totalLessons: 0 },
  );

  return { weekly, heatmap30, allTime };
};

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
