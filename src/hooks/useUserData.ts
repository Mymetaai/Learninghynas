import { useState, useEffect, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { createClerkSupabaseClient, setCurrentUserId } from '../lib/supabaseClient';
import { useStatsStore, type WeeklyActivityItem } from '../state/statsStore';
import { useProgressStore } from '../state/progressStore';
import { useQuestStore } from '../state/questStore';
import { useDailyQuestStore } from '../state/dailyQuestStore';
import { useEntitlementStore } from '../state/entitlementStore';
import { useTrainingStore } from '../state/trainingStore';
import { useScenarioStore } from '../state/scenarioStore';
import { useActiveImmersionStore } from '../state/activeImmersionStore';
import { useStoryProgressStore } from '../state/storyProgressStore';
import { useShopStore } from '../state/shopStore';
import { useCompanionStore } from '../state/companionStore';

export interface UserProgressData {
  user_id: string;
  xp: number;
  level: number;
  kitsune_coins: number;
  streak_days: number;
  created_at?: string;
  weekly_activity?: WeeklyActivityItem[];
}

const getStoredUserData = (userId: string): UserProgressData | null => {
  try {
    const raw = localStorage.getItem(`wayfarer_user_progress_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
};

const saveStoredUserData = (userId: string, data: UserProgressData) => {
  try {
    localStorage.setItem(`wayfarer_user_progress_${userId}`, JSON.stringify(data));
  } catch {}
};

export function useUserData() {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [userData, setUserData] = useState<UserProgressData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Helper to request Clerk Supabase JWT token specifically.
   * If template 'supabase' is not configured or throws, returns null fallback
   * so default Clerk RS256 session tokens are never passed to Supabase (preventing 401 errors).
   */
  const getSupabaseToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await getToken({ template: 'supabase' });
      return token || null;
    } catch {
      return null;
    }
  }, [getToken]);

  // Sync to Zustand stats store
  const syncToLocalStore = useCallback((data: UserProgressData) => {
    useStatsStore.setState((state) => ({
      ...state,
      xp: data.xp,
      coins: data.kitsune_coins,
      streak: data.streak_days,
      ...(data.weekly_activity ? { weeklyActivity: data.weekly_activity } : {}),
    }));
  }, []);

  const fetchUserData = useCallback(async () => {
    if (!isUserLoaded) return;

    if (!isSignedIn || !user) {
      setCurrentUserId(null, null);
      const localStats = useStatsStore.getState();
      const fallback: UserProgressData = {
        user_id: 'guest',
        xp: localStats.xp || 0,
        level: Math.max(1, Math.floor((localStats.xp || 0) / 600) + 1),
        kitsune_coins: localStats.coins || 100,
        streak_days: localStats.streak || 1,
        weekly_activity: localStats.weeklyActivity || [],
      };
      setUserData(fallback);
      setIsLoading(false);
      return;
    }

    // Set global active user context & token getter for Zustand syncs
    setCurrentUserId(user.id, getSupabaseToken);

    // Check passive streak status (handles missed days / streak freezes)
    useStatsStore.getState().checkPassiveStreakStatus();

    // 1. Load user-specific storage for this Clerk User ID
    const savedLocal = getStoredUserData(user.id);
    const localStats = useStatsStore.getState();

    const initialData: UserProgressData = savedLocal || {
      user_id: user.id,
      xp: typeof localStats.xp === 'number' && localStats.xp > 0 ? localStats.xp : 0,
      level: Math.max(1, Math.floor((localStats.xp || 0) / 600) + 1),
      kitsune_coins: typeof localStats.coins === 'number' && localStats.coins > 0 ? localStats.coins : 100,
      streak_days: typeof localStats.streak === 'number' ? localStats.streak : 0,
      weekly_activity: localStats.weeklyActivity || [],
    };

    setUserData(initialData);
    syncToLocalStore(initialData);

    try {
      setIsLoading(true);

      const token = await getSupabaseToken();
      const client = createClerkSupabaseClient(token);

      // Fetch user_progress row from Supabase
      const { data, error } = await client
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('[useUserData] Fetch note:', error.message);
      }

      if (data) {
        const bestXp = Math.max(data.xp || 0, initialData.xp || 0, localStats.xp || 0);
        const bestCoins = Math.max(data.kitsune_coins || 0, initialData.kitsune_coins || 0, localStats.coins || 0);
        // Use live localStats.streak if lastActiveDate is set or after reset; fallback to remote data
        const currentStreak = typeof localStats.streak === 'number' ? localStats.streak : (data.streak_days || 0);
        const bestLevel = Math.max(1, Math.floor(bestXp / 600) + 1);

        const supabaseWeekly = (data.weekly_activity as unknown as WeeklyActivityItem[]) || [];
        const storeWeekly = localStats.weeklyActivity || [];
        const mergedWeekly = (Array.isArray(supabaseWeekly) && supabaseWeekly.length === 7 && supabaseWeekly.some((d) => d.minutes > 0))
          ? supabaseWeekly
          : (Array.isArray(storeWeekly) && storeWeekly.length === 7)
          ? storeWeekly
          : initialData.weekly_activity || [];

        const merged: UserProgressData = {
          user_id: user.id,
          xp: bestXp,
          level: bestLevel,
          kitsune_coins: bestCoins,
          streak_days: currentStreak,
          weekly_activity: mergedWeekly,
        };

        setUserData(merged);
        saveStoredUserData(user.id, merged);
        syncToLocalStore(merged);

        if (bestXp > (data.xp || 0) || bestCoins > (data.kitsune_coins || 0)) {
          Promise.resolve(client.from('user_progress').upsert(merged, { onConflict: 'user_id' })).catch(() => {});
        }
      } else {
        // First-time or missing row: Upsert initialData
        const { data: inserted, error: insertErr } = await client
          .from('user_progress')
          .upsert(initialData, { onConflict: 'user_id' })
          .select('*')
          .single();

        if (inserted) {
          setUserData(inserted);
          saveStoredUserData(user.id, inserted);
          syncToLocalStore(inserted);
        } else {
          if (insertErr) console.warn('[useUserData] Upsert note:', insertErr.message);
          saveStoredUserData(user.id, initialData);
        }
      }
    } catch (err) {
      console.warn('[useUserData] Fetch exception:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isUserLoaded, isSignedIn, user, getSupabaseToken, syncToLocalStore]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Subscribe to Zustand useStatsStore so ANY task completion anywhere updates userData & Supabase & LocalStorage
  useEffect(() => {
    if (!isUserLoaded || !isSignedIn || !user?.id) return;

    const unsubscribe = useStatsStore.subscribe((state) => {
      setUserData((prev) => {
        const currentXp = state.xp;
        const currentCoins = state.coins;
        const currentStreak = state.streak;
        const currentWeekly = state.weeklyActivity;

        if (
          prev &&
          prev.xp === currentXp &&
          prev.kitsune_coins === currentCoins &&
          prev.streak_days === currentStreak &&
          JSON.stringify(prev.weekly_activity) === JSON.stringify(currentWeekly)
        ) {
          return prev;
        }

        const newLevel = Math.max(1, Math.floor((currentXp || 0) / 600) + 1);
        const updated: UserProgressData = {
          user_id: user.id,
          xp: currentXp,
          kitsune_coins: currentCoins,
          streak_days: currentStreak,
          level: newLevel,
          weekly_activity: currentWeekly,
        };

        saveStoredUserData(user.id, updated);

        getSupabaseToken().then((token) => {
          const client = createClerkSupabaseClient(token);
          Promise.resolve(client.from('user_progress').upsert(updated, { onConflict: 'user_id' }))
            .then(({ error }: any) => {
              if (error && !error.message?.includes('No suitable key')) {
                console.warn('[useUserData] Background upsert note:', error.message);
              }
            })
            .catch(() => {});
        });

        return updated;
      });
    });

    return () => unsubscribe();
  }, [isUserLoaded, isSignedIn, user, getSupabaseToken]);

  // Dedicated addXP Mutation Function with Optimistic UI & Supabase UPSERT
  const addXP = useCallback(
    async (amount: number) => {
      if (amount <= 0) return;

      const currentXp = userData?.xp ?? useStatsStore.getState().xp;
      const newXp = currentXp + amount;
      const newLevel = Math.max(1, Math.floor(newXp / 600) + 1);

      useStatsStore.setState((s) => ({ ...s, xp: newXp }));

      if (isSignedIn && user?.id) {
        const updatedData: UserProgressData = {
          user_id: user.id,
          xp: newXp,
          level: newLevel,
          kitsune_coins: userData?.kitsune_coins ?? useStatsStore.getState().coins,
          streak_days: userData?.streak_days ?? useStatsStore.getState().streak,
          weekly_activity: userData?.weekly_activity ?? useStatsStore.getState().weeklyActivity,
        };
        setUserData(updatedData);
        saveStoredUserData(user.id, updatedData);

        try {
          const token = await getSupabaseToken();
          const client = createClerkSupabaseClient(token);
          await client.from('user_progress').upsert(updatedData, { onConflict: 'user_id' });
        } catch {}
      }
    },
    [userData, isSignedIn, user, getSupabaseToken]
  );

  // Dedicated addCoins Mutation Function with Optimistic UI & Supabase UPSERT
  const addCoins = useCallback(
    async (amount: number) => {
      if (amount <= 0) return;

      const currentCoins = userData?.kitsune_coins ?? useStatsStore.getState().coins;
      const newCoins = currentCoins + amount;

      useStatsStore.setState((s) => ({ ...s, coins: newCoins }));

      if (isSignedIn && user?.id) {
        const updatedData: UserProgressData = {
          user_id: user.id,
          xp: userData?.xp ?? useStatsStore.getState().xp,
          level: userData?.level ?? Math.max(1, Math.floor((userData?.xp || 0) / 600) + 1),
          kitsune_coins: newCoins,
          streak_days: userData?.streak_days ?? useStatsStore.getState().streak,
          weekly_activity: userData?.weekly_activity ?? useStatsStore.getState().weeklyActivity,
        };
        setUserData(updatedData);
        saveStoredUserData(user.id, updatedData);

        try {
          const token = await getSupabaseToken();
          const client = createClerkSupabaseClient(token);
          await client.from('user_progress').upsert(updatedData, { onConflict: 'user_id' });
        } catch {}
      }
    },
    [userData, isSignedIn, user, getSupabaseToken]
  );

  // Dedicated spendCoins Mutation Function with Optimistic UI & Supabase UPSERT
  const spendCoins = useCallback(
    async (amount: number): Promise<boolean> => {
      const currentCoins = userData?.kitsune_coins ?? useStatsStore.getState().coins;
      if (currentCoins < amount) {
        return false;
      }

      const newCoins = currentCoins - amount;

      useStatsStore.setState((s) => ({ ...s, coins: newCoins }));

      if (isSignedIn && user?.id) {
        const updatedData: UserProgressData = {
          user_id: user.id,
          xp: userData?.xp ?? useStatsStore.getState().xp,
          level: userData?.level ?? Math.max(1, Math.floor((userData?.xp || 0) / 600) + 1),
          kitsune_coins: newCoins,
          streak_days: userData?.streak_days ?? useStatsStore.getState().streak,
          weekly_activity: userData?.weekly_activity ?? useStatsStore.getState().weeklyActivity,
        };
        setUserData(updatedData);
        saveStoredUserData(user.id, updatedData);

        try {
          const token = await getSupabaseToken();
          const client = createClerkSupabaseClient(token);
          await client.from('user_progress').upsert(updatedData, { onConflict: 'user_id' });
        } catch {}
      }

      return true;
    },
    [userData, isSignedIn, user, getSupabaseToken]
  );

  const resetAllUserProgress = useCallback(async () => {
    const targetUserId = user?.id || 'guest';

    // 1. Reset ALL Zustand stores across the entire app
    useStatsStore.getState().reset();
    useProgressStore.getState().reset();
    useQuestStore.getState().resetQuestProgress();
    useDailyQuestStore.getState().resetDailyQuests();
    useEntitlementStore.getState().resetEntitlements();
    useTrainingStore.getState().clearAllMistakes();
    useScenarioStore.getState().resetAllScenarios();
    useActiveImmersionStore.getState().resetAllImmersionSessions();
    useStoryProgressStore.getState().resetStoryProgress();
    useShopStore.getState().resetShopInventory();
    useCompanionStore.getState().resetConversations();

    const freshData: UserProgressData = {
      user_id: targetUserId,
      xp: 0,
      level: 1,
      kitsune_coins: 100,
      streak_days: 0,
      weekly_activity: useStatsStore.getState().weeklyActivity,
    };

    // 2. Clear all store persistence keys from localStorage
    const keysToRemove = [
      'wayfarer-stats',
      'wayfarer-stats-store',
      'wayfarer-daily-quest',
      'wayfarer-daily-quest-store',
      'wayfarer-progress',
      'wayfarer-canonical-entitlements',
      'wayfarer-active-immersion',
      'wayfarer-training',
      'wayfarer-training-store',
      'wayfarer-scenarios',
      'wayfarer-story-progress',
      'hyena-quest-store',
      'hyena-shop-store',
      'wayfarer-companions',
    ];
    if (user?.id) {
      keysToRemove.push(`wayfarer_user_progress_${user.id}`);
    }
    keysToRemove.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {}
    });

    if (user?.id) {
      saveStoredUserData(user.id, freshData);
    }

    // 3. Reset React state
    setUserData(freshData);

    // 4. Wipe all user rows across Supabase tables and upsert fresh 0 XP row
    if (isSignedIn && user?.id) {
      try {
        const token = await getSupabaseToken();
        const client = createClerkSupabaseClient(token);

        await Promise.allSettled([
          client.from('daily_quests').delete().eq('user_id', user.id),
          client.from('user_stats').delete().eq('user_id', user.id),
          client.from('learned_vocabulary').delete().eq('user_id', user.id),
          client.from('immersion_chat_messages').delete().eq('user_id', user.id),
          client.from('user_entitlements').delete().eq('user_id', user.id),
          client.from('user_progress').upsert(freshData, { onConflict: 'user_id' }),
        ]);
      } catch (err) {
        console.warn('[useUserData] Reset note:', err);
      }
    }
  }, [user, isSignedIn, getSupabaseToken]);

  const updateCoins = useCallback(async (newCoins: number) => {
    useStatsStore.setState((state) => ({ ...state, coins: newCoins }));
  }, []);

  const updateXP = useCallback(
    async (additionalXp: number) => {
      addXP(additionalXp);
    },
    [addXP]
  );

  return {
    userData,
    isLoading,
    addXP,
    addCoins,
    spendCoins,
    updateCoins,
    updateXP,
    resetAllUserProgress,
    refetch: fetchUserData,
  };
}

