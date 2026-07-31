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

  // Sync to Zustand stats store so legacy HUD and shop components stay synchronized
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
      // Fallback for unauthenticated guest session using Zustand statsStore defaults
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

  // Mutation helper: updateCoins
  const updateCoins = useCallback(
    async (newCoins: number) => {
      if (!userData) return;
      const updated = { ...userData, kitsune_coins: newCoins };
      setUserData(updated);
      syncToLocalStore(updated);

      if (isSignedIn && user) {
        try {
          let token: string | null = null;
          try {
            token = await getToken({ template: 'supabase' }).catch(() => null);
          } catch {
            token = await getToken().catch(() => null);
          }
          const client = supabaseClient(token);
          await client
            .from('user_progress')
            .update({ kitsune_coins: newCoins })
            .eq('user_id', user.id);
        } catch (e) {
          console.warn('[useUserData] updateCoins error:', e);
        }
      }
    },
    [userData, isSignedIn, user, getToken, syncToLocalStore]
  );

  // Mutation helper: updateXP
  const updateXP = useCallback(
    async (additionalXp: number) => {
      if (!userData) return;
      const newXp = (userData.xp || 0) + additionalXp;
      const newLevel = Math.max(1, Math.floor(newXp / 600) + 1);
      const updated = { ...userData, xp: newXp, level: newLevel };
      setUserData(updated);
      syncToLocalStore(updated);

      if (isSignedIn && user) {
        try {
          let token: string | null = null;
          try {
            token = await getToken({ template: 'supabase' }).catch(() => null);
          } catch {
            token = await getToken().catch(() => null);
          }
          const client = supabaseClient(token);
          await client
            .from('user_progress')
            .update({ xp: newXp, level: newLevel })
            .eq('user_id', user.id);
        } catch (e) {
          console.warn('[useUserData] updateXP error:', e);
        }
      }
    },
    [userData, isSignedIn, user, getToken, syncToLocalStore]
  );

  return {
    userData,
    isLoading,
    updateCoins,
    updateXP,
    refetch: fetchUserData,
  };
}
