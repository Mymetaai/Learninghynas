import { useState, useEffect, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { supabaseClient } from '../lib/supabaseClient';
import { useStatsStore } from '../state/statsStore';

export interface UserProgressData {
  user_id: string;
  xp: number;
  level: number;
  kitsune_coins: number;
  streak_days: number;
  created_at?: string;
}

export function useUserData() {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [userData, setUserData] = useState<UserProgressData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync to Zustand stats store
  const syncToLocalStore = useCallback((data: UserProgressData) => {
    useStatsStore.setState((state) => ({
      ...state,
      xp: data.xp,
      coins: data.kitsune_coins,
      streak: data.streak_days,
    }));
  }, []);

  const fetchUserData = useCallback(async () => {
    if (!isUserLoaded) return;

    if (!isSignedIn || !user) {
      // Fallback for unauthenticated guest session using Zustand statsStore
      const localStats = useStatsStore.getState();
      const fallback: UserProgressData = {
        user_id: 'guest',
        xp: localStats.xp || 350,
        level: Math.max(1, Math.floor((localStats.xp || 350) / 600) + 1),
        kitsune_coins: localStats.coins || 500,
        streak_days: localStats.streak || 1,
      };
      setUserData(fallback);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Attempt to retrieve Supabase JWT token from Clerk session
      let token: string | null = null;
      try {
        token = await getToken({ template: 'supabase' }).catch(() => null);
        if (!token) {
          token = await getToken().catch(() => null);
        }
      } catch {
        // Token fallback
      }

      const client = supabaseClient(token);

      // Fetch user_progress row from Supabase
      const { data, error } = await client
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('[useUserData] Fetch error:', error.message);
      }

      if (data) {
        setUserData(data);
        syncToLocalStore(data);
      } else {
        // First-time login: Automatically trigger INSERT with default user progress values
        const defaultData: UserProgressData = {
          user_id: user.id,
          xp: 350,
          level: 2,
          kitsune_coins: 500,
          streak_days: 1,
        };

        const { data: inserted, error: insertErr } = await client
          .from('user_progress')
          .insert(defaultData)
          .select('*')
          .single();

        if (insertErr) {
          console.warn('[useUserData] Insert error, using local fallback:', insertErr.message);
          setUserData(defaultData);
          syncToLocalStore(defaultData);
        } else if (inserted) {
          setUserData(inserted);
          syncToLocalStore(inserted);
        }
      }
    } catch (err) {
      console.warn('[useUserData] Exception:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isUserLoaded, isSignedIn, user, getToken, syncToLocalStore]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Subscribe to Zustand useStatsStore so ANY task completion anywhere updates userData & Supabase
  useEffect(() => {
    if (!isUserLoaded) return;

    const unsubscribe = useStatsStore.subscribe((state) => {
      setUserData((prev) => {
        if (!prev) return prev;
        if (prev.xp === state.xp && prev.kitsune_coins === state.coins && prev.streak_days === state.streak) {
          return prev;
        }

        const newLevel = Math.max(1, Math.floor((state.xp || 0) / 600) + 1);
        const updated: UserProgressData = {
          ...prev,
          xp: state.xp,
          kitsune_coins: state.coins,
          streak_days: state.streak,
          level: newLevel,
        };

        if (isSignedIn && user?.id) {
          getToken({ template: 'supabase' })
            .then((token) => {
              const client = supabaseClient(token);
              Promise.resolve(client.from('user_progress').upsert(updated, { onConflict: 'user_id' }))
                .then(({ error }: any) => {
                  if (error) console.warn('[useUserData] Background sync error:', error.message);
                })
                .catch(() => {});
            })
            .catch(() => {
              const client = supabaseClient(null);
              Promise.resolve(client.from('user_progress').upsert(updated, { onConflict: 'user_id' }))
                .then(() => {})
                .catch(() => {});
            });
        }

        return updated;
      });
    });

    return () => unsubscribe();
  }, [isUserLoaded, isSignedIn, user, getToken]);

  // ── Dedicated Mutation Functions ──────────────────────────────────────────

  /** Add XP to current user with Optimistic UI & Supabase UPDATE mutation */
  const addXP = useCallback(
    async (amount: number) => {
      if (amount <= 0) return;

      const currentXp = userData?.xp ?? useStatsStore.getState().xp;
      const newXp = currentXp + amount;
      const newLevel = Math.max(1, Math.floor(newXp / 600) + 1);

      // Optimistic UI Update
      setUserData((prev) => (prev ? { ...prev, xp: newXp, level: newLevel } : prev));
      useStatsStore.setState((s) => ({ ...s, xp: newXp }));

      if (isSignedIn && user?.id) {
        try {
          const token = await getToken({ template: 'supabase' }).catch(() => null);
          const client = supabaseClient(token);
          await client
            .from('user_progress')
            .update({ xp: newXp, level: newLevel })
            .eq('user_id', user.id);
        } catch (e) {
          console.warn('[useUserData] addXP update error:', e);
        }
      }
    },
    [userData, isSignedIn, user, getToken]
  );

  /** Add Kitsune Coins to current user with Optimistic UI & Supabase UPDATE mutation */
  const addCoins = useCallback(
    async (amount: number) => {
      if (amount <= 0) return;

      const currentCoins = userData?.kitsune_coins ?? useStatsStore.getState().coins;
      const newCoins = currentCoins + amount;

      // Optimistic UI Update
      setUserData((prev) => (prev ? { ...prev, kitsune_coins: newCoins } : prev));
      useStatsStore.setState((s) => ({ ...s, coins: newCoins }));

      if (isSignedIn && user?.id) {
        try {
          const token = await getToken({ template: 'supabase' }).catch(() => null);
          const client = supabaseClient(token);
          await client
            .from('user_progress')
            .update({ kitsune_coins: newCoins })
            .eq('user_id', user.id);
        } catch (e) {
          console.warn('[useUserData] addCoins update error:', e);
        }
      }
    },
    [userData, isSignedIn, user, getToken]
  );

  /** Spend Kitsune Coins with validation, Optimistic UI & Supabase UPDATE mutation */
  const spendCoins = useCallback(
    async (amount: number): Promise<boolean> => {
      const currentCoins = userData?.kitsune_coins ?? useStatsStore.getState().coins;
      if (currentCoins < amount) {
        return false;
      }

      const newCoins = currentCoins - amount;

      // Optimistic UI Update
      setUserData((prev) => (prev ? { ...prev, kitsune_coins: newCoins } : prev));
      useStatsStore.setState((s) => ({ ...s, coins: newCoins }));

      if (isSignedIn && user?.id) {
        try {
          const token = await getToken({ template: 'supabase' }).catch(() => null);
          const client = supabaseClient(token);
          await client
            .from('user_progress')
            .update({ kitsune_coins: newCoins })
            .eq('user_id', user.id);
        } catch (e) {
          console.warn('[useUserData] spendCoins update error:', e);
        }
      }

      return true;
    },
    [userData, isSignedIn, user, getToken]
  );

  // Legacy compatibility helpers
  const updateCoins = useCallback(
    async (newCoins: number) => {
      useStatsStore.setState((state) => ({ ...state, coins: newCoins }));
    },
    []
  );

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
    refetch: fetchUserData,
  };
}
