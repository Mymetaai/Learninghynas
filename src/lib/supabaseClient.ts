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
let activeClerkTokenGetter: (() => Promise<string | null>) | null = null;

/**
 * Helper returning active auth.uid() or null if offline/unauthenticated.
 */
export const getCurrentUserId = (): string | null => {
  return activeUserId;
};

/**
 * Sets active auth.uid() context for store sync.
 */
export const setCurrentUserId = (userId: string | null, tokenGetter?: (() => Promise<string | null>) | null): void => {
  activeUserId = userId;
  if (tokenGetter !== undefined) {
    activeClerkTokenGetter = tokenGetter;
  }
};

/**
 * LocalStorage helpers for per-user progress caching
 */
export const getStoredUserData = (userId: string): any => {
  try {
    const raw = localStorage.getItem(`wayfarer_user_progress_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
};

export const saveStoredUserData = (userId: string, data: any): void => {
  try {
    localStorage.setItem(`wayfarer_user_progress_${userId}`, JSON.stringify(data));
  } catch {}
};

/**
 * Global store sync helper. Reads local Zustand state and updates Supabase using Clerk Auth JWT token.
 */
export const syncLocalStoresToSupabase = async (userId?: string | null, token?: string | null): Promise<boolean> => {
  const targetId = userId || activeUserId;
  if (!targetId) return false;

  try {
    const stats = useStatsStore.getState();

    const payload = {
      user_id: targetId,
      xp: stats.xp || 0,
      level: Math.max(1, Math.floor((stats.xp || 0) / 600) + 1),
      kitsune_coins: typeof stats.coins === 'number' ? stats.coins : 100,
      streak_days: stats.streak || 0,
      weekly_activity: stats.weeklyActivity || [],
    };

    saveStoredUserData(targetId, payload);

    let authToken = token;
    if (!authToken && activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {
        authToken = null;
      }
    }

    const client = createClerkSupabaseClient(authToken);
    const { error } = await client.from('user_progress').upsert(payload, { onConflict: 'user_id' });

    if (error) {
      if (!error.message?.includes('No suitable key') && error.code !== '401') {
        console.warn('[Supabase Sync] Note during store sync:', error.message);
      }
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

export const syncUserEntitlements = async (entitlements: any, userId?: string | null): Promise<boolean> => {
  const targetId = userId || activeUserId;
  if (!targetId || !entitlements) return false;

  try {
    const payload = {
      user_id: targetId,
      streak_freeze: entitlements.consumables?.streak_freeze || 0,
      hint_token: entitlements.consumables?.hint_token || 0,
      boss_retry: entitlements.consumables?.boss_retry || 0,
      owned_cards: entitlements.ownedCards || [],
      unlocked_themes: entitlements.unlockedThemes || ['theme_parchment'],
      unlocked_auras: entitlements.unlockedAuras || [],
      unlocked_packs: entitlements.unlockedPacks || [],
      active_theme: entitlements.activeThemeId || 'theme_parchment',
      active_aura: entitlements.activeAuraId || null,
      updated_at: new Date().toISOString(),
    };

    let authToken: string | null = null;
    if (activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {}
    }

    const client = createClerkSupabaseClient(authToken);
    const { error } = await client.from('user_entitlements').upsert(payload, { onConflict: 'user_id' });

    if (error && !error.message?.includes('No suitable key') && error.code !== '401') {
      console.warn('[Supabase Entitlements] Note during sync:', error.message);
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Entitlements] Exception during sync:', err);
    return false;
  }
};

/**
 * Fetch today's daily quest for user from Supabase daily_quests table.
 */
export const fetchTodayDailyQuest = async (userId?: string | null, questDate?: string): Promise<any | null> => {
  const targetId = userId || activeUserId;
  if (!targetId) return null;

  try {
    let authToken: string | null = null;
    if (activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {}
    }

    const todayStr = questDate || new Date().toISOString().split('T')[0];
    const client = createClerkSupabaseClient(authToken);
    const { data, error } = await client
      .from('daily_quests')
      .select('*')
      .eq('user_id', targetId)
      .eq('quest_date', todayStr)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.warn('[Supabase DailyQuest] Fetch error:', error.message);
    }
    return data;
  } catch (err) {
    console.warn('[Supabase DailyQuest] Fetch exception:', err);
    return null;
  }
};

/**
 * Upsert daily quest record to Supabase daily_quests table.
 */
export const syncDailyQuest = async (dailyQuestPayload: any, userId?: string | null): Promise<boolean> => {
  const targetId = userId || activeUserId || dailyQuestPayload?.user_id;
  if (!targetId || !dailyQuestPayload) return false;

  try {
    let authToken: string | null = null;
    if (activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {}
    }

    const payload = {
      ...dailyQuestPayload,
      user_id: targetId,
      updated_at: new Date().toISOString(),
    };

    const client = createClerkSupabaseClient(authToken);
    const { error } = await client.from('daily_quests').upsert(payload, { onConflict: 'user_id,quest_date' });

    if (error && !error.message?.includes('No suitable key') && error.code !== '401') {
      console.warn('[Supabase DailyQuest] Sync note:', error.message);
    }
    return true;
  } catch (err) {
    console.warn('[Supabase DailyQuest] Sync exception:', err);
    return false;
  }
};


