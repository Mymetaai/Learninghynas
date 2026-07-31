import { useState, useEffect, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { createClerkSupabaseClient } from '../lib/supabaseClient';
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

    const defaultData: UserProgressData = {
      user_id: user.id,
      xp: 350,
      level: 2,
      kitsune_coins: 500,
      streak_days: 1,
    };

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

      if (error) {
        if (error.code === '401' || error.message?.includes('No suitable key') || error.message?.includes('JWT')) {
          console.info('[useUserData] Clerk Supabase JWT template pending in Clerk Dashboard. Using client user state.');
        } else if (error.code !== 'PGRST116') {
          console.warn('[useUserData] Fetch note:', error.message);
        }
      }

      if (data) {
        setUserData(data);
        syncToLocalStore(data);
      } else {
        // First-time login: Insert default progress row
        const { data: inserted, error: insertErr } = await client
          .from('user_progress')
          .insert(defaultData)
          .select('*')
          .single();

        if (insertErr) {
          if (insertErr.code === '401' || insertErr.message?.includes('No suitable key')) {
            console.info('[useUserData] Supabase RLS pending Clerk JWT token. Using default initial state.');
          }
          setUserData(defaultData);
          syncToLocalStore(defaultData);
        } else if (inserted) {
          setUserData(inserted);
          syncToLocalStore(inserted);
        } else {
          setUserData(defaultData);
          syncToLocalStore(defaultData);
        }
      }
    } catch (err) {
      console.warn('[useUserData] Fetch exception:', err);
      setUserData(defaultData);
      syncToLocalStore(defaultData);
    } finally {
      setIsLoading(false);
    }
  }, [isUserLoaded, isSignedIn, user, getSupabaseToken, syncToLocalStore]);

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
          getSupabaseToken().then((token) => {
            const client = createClerkSupabaseClient(token);
            Promise.resolve(client.from('user_progress').upsert(updated, { onConflict: 'user_id' }))
              .then(({ error }: any) => {
                if (error && !error.message?.includes('No suitable key')) {
                  console.warn('[useUserData] Background sync note:', error.message);
                }
              })
              .catch(() => {});
          });
        }

        return updated;
      });
    });

    return () => unsubscribe();
  }, [isUserLoaded, isSignedIn, user, getSupabaseToken]);

  // Dedicated addXP Mutation Function with Optimistic UI & Supabase UPDATE
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
          const token = await getSupabaseToken();
          const client = createClerkSupabaseClient(token);
          await client
            .from('user_progress')
            .update({ xp: newXp, level: newLevel })
            .eq('user_id', user.id);
        } catch {
          // Optimistic UI retains state seamlessly
        }
      }
    },
    [userData, isSignedIn, user, getSupabaseToken]
  );

  // Dedicated addCoins Mutation Function with Optimistic UI & Supabase UPDATE
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
          const token = await getSupabaseToken();
          const client = createClerkSupabaseClient(token);
          await client
            .from('user_progress')
            .update({ kitsune_coins: newCoins })
            .eq('user_id', user.id);
        } catch {
          // Optimistic UI retains state seamlessly
        }
      }
    },
    [userData, isSignedIn, user, getSupabaseToken]
  );

  // Dedicated spendCoins Mutation Function with Optimistic UI & Supabase UPDATE
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
          const token = await getSupabaseToken();
          const client = createClerkSupabaseClient(token);
          await client
            .from('user_progress')
            .update({ kitsune_coins: newCoins })
            .eq('user_id', user.id);
        } catch {
          // Optimistic UI retains state seamlessly
        }
      }

      return true;
    },
    [userData, isSignedIn, user, getSupabaseToken]
  );

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
    refetch: fetchUserData,
  };
}
