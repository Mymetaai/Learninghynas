// STEP 9/10 — Stats store: XP, coins, streak, and learned vocabulary.
// Persisted to localStorage via Zustand `persist`. Separate from the
// progress store (which tracks quest completion / unlocks) so each concern
// stays isolated. The Quest Completion screen grants rewards here; the HUD
// reads live values from here.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ONE_PIECE_CARDS } from '../content/onePieceCards';
import { DEMON_SLAYER_CARDS } from '../content/demonSlayerCards';
import { getCurrentUserId, syncUserStats, syncLearnedVocab } from '../lib/supabaseClient';

const allCardIds = [
  ...ONE_PIECE_CARDS.map(c => c.id),
  ...DEMON_SLAYER_CARDS.map(c => c.id)
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
  coins: 0,
  streak: 0,
  lastActiveDate: '',
  learnedVocab: [] as LearnedVocabEntry[],
  collectedCardIds: [] as string[],
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      grantQuestRewards: (questId, xp, coins) => {
        // Idempotent: if this quest already granted rewards, skip.
        const already = get().learnedVocab.some((v) => v.questId === questId);
        if (already) return;

        // Update streak based on today's activity.
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

      reset: () => {
        set({ ...DEFAULT_STATE });
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
      }),
    },
  ),
);

if (typeof window !== 'undefined') {
  // Clear any old mock stats from localStorage and reset store immediately to 0
  try {
    const raw = localStorage.getItem('wayfarer-stats');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state && (parsed.state.xp > 10000 || parsed.state.coins > 1000 || parsed.state.streak > 10)) {
        parsed.state.xp = 0;
        parsed.state.coins = 0;
        parsed.state.streak = 0;
        localStorage.setItem('wayfarer-stats', JSON.stringify(parsed));
        useStatsStore.getState().reset();
      }
    }
  } catch (e) {
    console.warn("Failed to reset stats:", e);
  }

  setTimeout(() => {
    try {
      useStatsStore.getState().collectAllCards(allCardIds);
    } catch (e) {
      console.warn("Failed to auto-unlock cards:", e);
    }
  }, 100);

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
