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
 * Global store sync helper. Reads local Zustand state and updates Supabase tables.
 */
export const syncLocalStoresToSupabase = async (userId?: string | null, token?: string | null): Promise<boolean> => {
  const targetId = userId || activeUserId;
  if (!targetId) return false;

  try {
    const stats = useStatsStore.getState();

    const progressPayload = {
      user_id: targetId,
      xp: stats.xp || 0,
      level: Math.max(1, Math.floor((stats.xp || 0) / 600) + 1),
      kitsune_coins: typeof stats.coins === 'number' ? stats.coins : 100,
      streak_days: stats.streak || 0,
      weekly_activity: stats.weeklyActivity || [],
      daily_history: stats.dailyHistory || {},
      active_study_minutes: Math.floor((stats.activeSeconds || 0) / 60),
      last_active_date: stats.lastActiveDate || new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString(),
    };

    saveStoredUserData(targetId, progressPayload);

    let authToken = token;
    if (!authToken && activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {
        authToken = null;
      }
    }

    const client = createClerkSupabaseClient(authToken);

    // 1. Sync to user_progress
    const progressPromise = client
      .from('user_progress')
      .upsert(progressPayload, { onConflict: 'user_id' });

    // 2. Sync to user_stats
    const statsPayload = {
      user_id: targetId,
      streak: stats.streak || 0,
      coins: typeof stats.coins === 'number' ? stats.coins : 100,
      xp: stats.xp || 0,
      level: Math.max(1, Math.floor((stats.xp || 0) / 600) + 1),
      last_active_date: stats.lastActiveDate || null,
      collected_card_ids: stats.collectedCardIds || [],
      claimed_quest_rewards: stats.claimedQuestRewards || [],
      claimed_exam_ids: stats.claimedExamIds || [],
      earned_badges: stats.earnedBadges || {},
      completed_lessons: stats.completedLessons || {},
      updated_at: new Date().toISOString(),
    };

    const statsPromise = client
      .from('user_stats')
      .upsert(statsPayload, { onConflict: 'user_id' });

    await Promise.allSettled([progressPromise, statsPromise]);
    return true;
  } catch (err) {
    console.warn('[Supabase Sync] Exception during sync:', err);
    return false;
  }
};

/** Sync user stats across Supabase */
export const syncUserStats = async (..._args: any[]): Promise<boolean> => {
  const uid = typeof _args[0] === 'string' ? _args[0] : activeUserId;
  return syncLocalStoresToSupabase(uid);
};

/** Sync learned vocabulary entries to Supabase */
export const syncLearnedVocab = async (..._args: any[]): Promise<boolean> => {
  const targetId = typeof _args[0] === 'string' ? _args[0] : activeUserId;
  const vocabList = Array.isArray(_args[1]) ? _args[1] : useStatsStore.getState().learnedVocab;
  if (!targetId || !vocabList || vocabList.length === 0) return false;

  try {
    let authToken: string | null = null;
    if (activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {}
    }

    const client = createClerkSupabaseClient(authToken);
    const rows = vocabList.map((item: any) => ({
      user_id: targetId,
      word: typeof item === 'string' ? item : item.word,
      meaning: typeof item === 'object' ? item.meaning || null : null,
      quest_id: typeof item === 'object' ? item.questId || null : null,
      date_learned: typeof item === 'object' && item.date ? item.date : new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString(),
    }));

    await client.from('learned_vocabulary').upsert(rows, { onConflict: 'user_id,word' });
    return true;
  } catch (err) {
    console.warn('[Supabase Vocab] Exception during sync:', err);
    return false;
  }
};

/** Sync immersion chat messages to Supabase */
export const syncImmersionMessages = async (..._args: any[]): Promise<boolean> => {
  const targetId = typeof _args[0] === 'string' ? _args[0] : activeUserId;
  const messages = Array.isArray(_args[1]) ? _args[1] : [];
  if (!targetId || messages.length === 0) return true;

  try {
    let authToken: string | null = null;
    if (activeClerkTokenGetter) {
      try {
        authToken = await activeClerkTokenGetter();
      } catch {}
    }

    const client = createClerkSupabaseClient(authToken);
    const rows = messages.map((m: any) => ({
      id: m.id || `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      user_id: targetId,
      session_key: m.sessionKey || 'default',
      mode: m.mode || 'conversation',
      topic: m.topic || 'General',
      sender: m.sender || 'assistant',
      text: m.text || '',
      translation: m.translation || null,
      quick_replies: m.quickReplies || [],
      new_vocab_words: m.newVocabWords || [],
      structured_content: m.structuredContent || null,
      metadata: m.metadata || {},
      timestamp: m.timestamp || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    await client.from('immersion_chat_messages').upsert(rows, { onConflict: 'id' });
    return true;
  } catch (err) {
    console.warn('[Supabase Immersion] Exception during sync:', err);
    return false;
  }
};

/** Sync user entitlements (themes, cards, consumables) to Supabase */
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
    await client.from('user_entitlements').upsert(payload, { onConflict: 'user_id' });
    return true;
  } catch (err) {
    console.warn('[Supabase Entitlements] Exception during sync:', err);
    return false;
  }
};

/** Fetch today's daily quest for user from Supabase daily_quests table */
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

/** Upsert daily quest record to Supabase daily_quests table */
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
    await client.from('daily_quests').upsert(payload, { onConflict: 'user_id,quest_date' });
    return true;
  } catch (err) {
    console.warn('[Supabase DailyQuest] Sync exception:', err);
    return false;
  }
};
