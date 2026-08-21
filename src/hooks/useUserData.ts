import { useState, useEffect, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { createClerkSupabaseClient, setCurrentUserId, getStoredUserData, saveStoredUserData, syncLocalStoresToSupabase } from '../lib/supabaseClient';
import { useStatsStore, calculateConsecutiveStreak, type WeeklyActivityItem } from '../state/statsStore';
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

export function useUserData() {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [userData, setUserData] = useState<UserProgressData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Helper to request Clerk Supabase JWT token specifically.
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
    useStatsStore.setState((state) => {
      const targetStreak = Math.max(
        data.streak_days || 0,
        state.streak || 0,
        calculateConsecutiveStreak(state.dailyHistory, state.weeklyActivity)
      );

      return {
        ...state,
        xp: Math.max(data.xp || 0, state.xp || 0),
        coins: Math.max(data.kitsune_coins || 0, state.coins || 0),
        streak: targetStreak,
        ...(data.weekly_activity && data.weekly_activity.length > 0 ? { weeklyActivity: data.weekly_activity } : {}),
      };
    });
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
        kitsune_coins: typeof localStats.coins === 'number' ? localStats.coins : 100,
        streak_days: calculateConsecutiveStreak(localStats.dailyHistory, localStats.weeklyActivity),
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

    // 1. Load user-specific storage for this Clerk User ID and local state
    const savedLocal = getStoredUserData(user.id);
    const localStats = useStatsStore.getState();

    const initialStreak = Math.max(
      localStats.streak || 0,
      savedLocal?.streak_days || 0,
      calculateConsecutiveStreak(localStats.dailyHistory, localStats.weeklyActivity)
    );

    const initialData: UserProgressData = {
      user_id: user.id,
      xp: Math.max(savedLocal?.xp || 0, localStats.xp || 0),
      level: Math.max(1, Math.floor(Math.max(savedLocal?.xp || 0, localStats.xp || 0) / 600) + 1),
      kitsune_coins: Math.max(savedLocal?.kitsune_coins || 0, typeof localStats.coins === 'number' ? localStats.coins : 100),
      streak_days: initialStreak,
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

      // Also fetch user_entitlements
      const { data: entitlementsData } = await client
        .from('user_entitlements')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (entitlementsData) {
        useEntitlementStore.getState().syncFromSupabase({
          consumables: {
            streak_freeze: entitlementsData.streak_freeze ?? 0,
            hint_token: entitlementsData.hint_token ?? 0,
            boss_retry: entitlementsData.boss_retry ?? 0,
          },
          ownedCards: entitlementsData.owned_cards || [],
          unlockedThemes: entitlementsData.unlocked_themes || ['theme_parchment'],
          unlockedAuras: entitlementsData.unlocked_auras || [],
          unlockedPacks: entitlementsData.unlocked_packs || [],
          activeThemeId: entitlementsData.active_theme || 'theme_parchment',
          activeAuraId: entitlementsData.active_aura || null,
        });
      }

      // Also fetch learned_vocabulary
      const { data: vocabData } = await client
        .from('learned_vocabulary')
        .select('word, quest_id, date_learned')
        .eq('user_id', user.id);

      if (vocabData && vocabData.length > 0) {
        useStatsStore.setState((s) => {
          const existingMap = new Map(s.learnedVocab.map((v) => [v.word.toLowerCase(), v]));
          vocabData.forEach((v: any) => {
            if (!existingMap.has(v.word.toLowerCase())) {
              existingMap.set(v.word.toLowerCase(), {
                word: v.word,
                questId: v.quest_id || 'manual',
                date: v.date_learned || new Date().toISOString().split('T')[0],
              });
            }
          });
          return { ...s, learnedVocab: Array.from(existingMap.values()) };
        });
      }

      if (data) {
        const bestXp = Math.max(data.xp || 0, initialData.xp || 0, localStats.xp || 0);
        const bestCoins = Math.max(data.kitsune_coins || 0, initialData.kitsune_coins || 0, localStats.coins || 0);

        const supabaseWeekly = (data.weekly_activity as unknown as WeeklyActivityItem[]) || [];
        const storeWeekly = localStats.weeklyActivity || [];
        const mergedWeekly = (Array.isArray(supabaseWeekly) && supabaseWeekly.length === 7 && supabaseWeekly.some((d) => d.minutes > 0))
          ? supabaseWeekly
          : (Array.isArray(storeWeekly) && storeWeekly.length === 7)
          ? storeWeekly
          : initialData.weekly_activity || [];

        const calculatedStreak = calculateConsecutiveStreak(localStats.dailyHistory, mergedWeekly);
        const currentStreak = Math.max(
          data.streak_days || 0,
          initialData.streak_days || 0,
          localStats.streak || 0,
          calculatedStreak
        );
        const bestLevel = Math.max(1, Math.floor(bestXp / 600) + 1);

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

        // Always sync back the merged state to Supabase so remote has latest
        syncLocalStoresToSupabase(user.id, token).catch(() => {});
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
        syncLocalStoresToSupabase(user.id, token).catch(() => {});
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
        syncLocalStoresToSupabase(user.id).catch(() => {});
        return updated;
      });
    });

    return () => unsubscribe();
  }, [isUserLoaded, isSignedIn, user]);

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
        syncLocalStoresToSupabase(user.id).catch(() => {});
      }
    },
    [userData, isSignedIn, user]
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
        syncLocalStoresToSupabase(user.id).catch(() => {});
      }
    },
    [userData, isSignedIn, user]
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
        syncLocalStoresToSupabase(user.id).catch(() => {});
      }

      return true;
    },
    [userData, isSignedIn, user]
  );

  const resetAllUserProgress = useCallback(async () => {
    const targetUserId = user?.id || 'guest';

    // 1. Reset ALL Zustand stores across the entire app
    useStatsStore.getState().resetAllProgress();
    useProgressStore.getState().reset();
    useQuestStore.getState().resetQuestProgress();
    useDailyQuestStore.getState().resetDailyQuests();
    useEntitlementStore.getState().resetEntitlements();
    useTrainingStore.getState().resetTrainingStore();
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
