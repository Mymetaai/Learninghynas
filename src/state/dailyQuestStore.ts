// Daily Quest store — date-seeded micro-quests, score tracking, auto rewards.
// Each day generates 5 shuffled micro-quests from the book levels.
// Uses a simple seeded PRNG so the same day always yields the same set.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BOOK_LEVELS } from '../content';
import type { Exercise } from '../content/types';
import { useStatsStore } from './statsStore';

// ── Seeded PRNG (mulberry32) ──────────────────────────────────────────────

function hashDate(dateStr: string): number {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = ((h << 5) - h + dateStr.charCodeAt(i)) | 0;
  }
  return h;
}

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Date helpers ───────────────────────────────────────────────────────────

export const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// ── Micro-quest generation ────────────────────────────────────────────────

export interface MicroQuest {
  id: string;
  title: string;
  /** Which book level this quest draws from. */
  sourceLevel: number;
  /** 3 exercises for this micro-quest. */
  exercises: Exercise[];
}

/** Generate 5 micro-quests for a given date string (deterministic). */
export function generateDailyMicroQuests(dateStr: string): MicroQuest[] {
  const rand = seededRandom(hashDate(dateStr));
  const quests: MicroQuest[] = [];
  const levelCount = BOOK_LEVELS.length;

  // Pick 5 distinct levels (with replacement if less than 5, but we have 24)
  const pickedLevels = new Set<number>();
  while (pickedLevels.size < 5 && pickedLevels.size < levelCount) {
    pickedLevels.add(Math.floor(rand() * levelCount));
  }

  let qi = 0;
  for (const lvlIdx of pickedLevels) {
    const level = BOOK_LEVELS[lvlIdx];
    if (!level || level.exercises.length === 0) continue;

    // Pick 3 random exercises from this level
    const exercises = shuffle([...level.exercises], rand).slice(0, 3).map((ex, i) => ({
      ...ex,
      id: `daily-${dateStr}-q${qi}-${i}`,
    }));

    quests.push({
      id: `daily-${dateStr}-q${qi}`,
      title: level.title.replace(/^Level \d+: /, ''),
      sourceLevel: lvlIdx + 1,
      exercises,
    });
    qi++;
    if (qi >= 5) break;
  }

  return quests;
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Store interface ────────────────────────────────────────────────────────

export interface DailyQuestState {
  /** Today's date key. Resets when the day changes. */
  activeDate: string;
  /** Completed micro-quest ids for the current day. */
  completedMicroQuestIds: string[];
  /** Correct answers across today's micro-quests. */
  totalCorrect: number;
  /** Total exercises answered across today's micro-quests. */
  totalAnswered: number;
  /** Whether the daily bonus has been claimed (all 5 done). */
  dailyBonusClaimed: boolean;

  /** Get today's micro-quests (regenerated each day). */
  getTodaysMicroQuests: () => MicroQuest[];
  /** Mark a micro-quest as completed with score. */
  completeMicroQuest: (microQuestId: string, correct: number, total: number) => void;
  /** Claim daily bonus XP/coins. */
  claimDailyBonus: () => void;
  /** Is this micro-quest already done today? */
  isMicroQuestDone: (id: string) => boolean;
}

const QUESTS_PER_DAY = 5;

export const useDailyQuestStore = create<DailyQuestState>()(
  persist(
    (set, get) => ({
      activeDate: '',
      completedMicroQuestIds: [],
      totalCorrect: 0,
      totalAnswered: 0,
      dailyBonusClaimed: false,

      getTodaysMicroQuests: () => {
        const today = todayKey();
        if (get().activeDate !== today) {
          // Day changed — reset daily state
          set({
            activeDate: today,
            completedMicroQuestIds: [],
            totalCorrect: 0,
            totalAnswered: 0,
            dailyBonusClaimed: false,
          });
        }
        return generateDailyMicroQuests(today);
      },

      completeMicroQuest: (microQuestId, correct, total) => {
        set((s) => ({
          completedMicroQuestIds: [...s.completedMicroQuestIds, microQuestId],
          totalCorrect: s.totalCorrect + correct,
          totalAnswered: s.totalAnswered + total,
        }));

        // Auto-grant XP/coins based on accuracy
        const percentage = total > 0 ? correct / total : 0;
        const xp = Math.round(15 + percentage * 25); // 15–40 XP per micro-quest
        const coins = Math.round(3 + percentage * 7); // 3–10 coins per micro-quest
        useStatsStore.getState().addRewards(xp, coins);

        // If all 5 done, auto-claim daily bonus
        const updated = get();
        if (
          !updated.dailyBonusClaimed &&
          updated.completedMicroQuestIds.length >= QUESTS_PER_DAY
        ) {
          const bonusXp = 75;
          const bonusCoins = 30;
          useStatsStore.getState().addRewards(bonusXp, bonusCoins);
          set({ dailyBonusClaimed: true });
        }
      },

      claimDailyBonus: () => {
        // No-op if already claimed (auto-claimed above)
      },

      isMicroQuestDone: (id) => get().completedMicroQuestIds.includes(id),
    }),
    {
      name: 'wayfarer-daily-quest',
      partialize: (state) => ({
        activeDate: state.activeDate,
        completedMicroQuestIds: state.completedMicroQuestIds,
        totalCorrect: state.totalCorrect,
        totalAnswered: state.totalAnswered,
        dailyBonusClaimed: state.dailyBonusClaimed,
      }),
    },
  ),
);
