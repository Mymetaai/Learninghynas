import { createClient } from '@supabase/supabase-js';
import { useStatsStore } from '../state/statsStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szctbtxwzffnvnoqugyy.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y3RidHh3emZmbnZub3F1Z3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MzYxMjksImV4cCI6MjEwMDMxMjEyOX0.Ktql4HSI2FFTGb5h-ixdz8PIXbNlkVTE7kRxQJWzPAo';

/**
 * Creates or returns a Supabase client dynamically injected with the Clerk JWT token
 * in the global Authorization header for Row Level Security (RLS).
 */
export const createClerkSupabaseClient = (clerkToken?: string | null) => {
  const headers: Record<string, string> = {
    apikey: supabaseAnonKey,
  };

  if (clerkToken) {
    headers.Authorization = `Bearer ${clerkToken}`;
  } else {
    headers.Authorization = `Bearer ${supabaseAnonKey}`;
  }

  return createClient<any>(supabaseUrl, supabaseAnonKey, {
    global: { headers },
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const supabase = createClerkSupabaseClient(null);
export const supabaseClient = createClerkSupabaseClient;

let activeUserId: string | null = null;

/**
 * Helper returning active auth.uid() or null if offline/unauthenticated.
 */
export const getCurrentUserId = (): string | null => {
  return activeUserId;
};

/**
 * Sets active auth.uid() context for store sync.
 */
export const setCurrentUserId = (userId: string | null): void => {
  activeUserId = userId;
};

/**
 * Global store sync helper. Reads local Zustand state and updates Supabase.
 */
export const syncLocalStoresToSupabase = async (userId?: string | null): Promise<boolean> => {
  const targetId = userId || activeUserId;
  if (!targetId) return false;

  try {
    const stats = useStatsStore.getState();

    const payload = {
      user_id: targetId,
      xp: stats.xp || 0,
      level: Math.max(1, Math.floor((stats.xp || 0) / 600) + 1),
      kitsune_coins: stats.coins || 500,
      streak_days: stats.streak || 0,
      learned_vocab: stats.learnedVocab || [],
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('user_progress').upsert(payload, { onConflict: 'user_id' });

    if (error) {
      console.warn('[Supabase Sync] Note during store sync:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Sync] Exception during sync:', err);
    return false;
  }
};

/** Legacy Sync Helper Functions for store compatibility (accepts variadic arguments) */
export const syncUserStats = async (..._args: any[]): Promise<boolean> => {
  const uid = typeof _args[0] === 'string' ? _args[0] : activeUserId;
  return syncLocalStoresToSupabase(uid);
};

export const syncLearnedVocab = async (..._args: any[]): Promise<boolean> => {
  const uid = typeof _args[0] === 'string' ? _args[0] : activeUserId;
  return syncLocalStoresToSupabase(uid);
};

export const syncImmersionMessages = async (..._args: any[]): Promise<boolean> => {
  const uid = typeof _args[0] === 'string' ? _args[0] : activeUserId;
  return syncLocalStoresToSupabase(uid);
};
