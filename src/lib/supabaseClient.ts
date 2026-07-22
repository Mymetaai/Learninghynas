import { createClient } from '@supabase/supabase-js';
import { useStatsStore } from '../state/statsStore';
import { useActiveImmersionStore } from '../state/activeImmersionStore';
import { useAuthStore } from '../state/authStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szctbtxwzffnvnoqugyy.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y3RidHh3emZmbnZub3F1Z3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MzYxMjksImV4cCI6MjEwMDMxMjEyOX0.Ktql4HSI2FFTGb5h-ixdz8PIXbNlkVTE7kRxQJWzPAo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

let activeUserId: string | null = null;

/**
 * Helper returning active auth.uid() or null if offline/unauthenticated.
 */
export const getCurrentUserId = (): string | null => {
  return activeUserId;
};

let onlineListenerAttached = false;

const setupOnlineRetry = () => {
  if (typeof window === 'undefined' || onlineListenerAttached) return;
  onlineListenerAttached = true;
  window.addEventListener('online', () => {
    console.log('[Supabase Auth] Network reconnected. Retrying sign-in...');
    initAnonymousAuth()
      .then((uid) => {
        if (uid) {
          fetchAndHydrateRemoteState(uid).then(() => {
            triggerFullLocalSync(uid);
          });
        }
      })
      .catch(() => {});
  });
};

/**
 * Initializes Supabase anonymous authentication.
 * Checks existing session, signs in anonymously if needed, and gracefully catches offline errors.
 */
export const initAnonymousAuth = async (): Promise<string | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (!sessionError && sessionData?.session?.user?.id) {
      activeUserId = sessionData.session.user.id;
      useAuthStore.getState().setUserId?.(activeUserId);
      return activeUserId;
    }

    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) {
      console.warn('[Supabase Auth] Anonymous sign-in unavailable, operating in local storage mode:', authError.message);
      setupOnlineRetry();
      return null;
    }

    const uid = authData?.user?.id || authData?.session?.user?.id || null;
    if (uid) {
      activeUserId = uid;
      useAuthStore.getState().setUserId?.(activeUserId);
      return activeUserId;
    }

    return null;
  } catch (error) {
    console.warn('[Supabase Auth] Offline or unreachable, operating in local storage mode:', error);
    setupOnlineRetry();
    return null;
  }
};

/**
 * Upserts user stats to `user_stats` table in Supabase.
 */
export const syncUserStats = async (userId?: string, stats?: any): Promise<void> => {
  const uid = userId || getCurrentUserId();
  if (!uid) return;
  const currentStats = stats || useStatsStore.getState();
  try {
    const payload = {
      user_id: uid,
      xp: currentStats.xp ?? 0,
      coins: currentStats.coins ?? 0,
      streak: currentStats.streak ?? 0,
      last_active_date: currentStats.lastActiveDate || currentStats.last_active_date || '',
      collected_card_ids: currentStats.collectedCardIds || currentStats.collected_card_ids || [],
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('user_stats').upsert(payload, { onConflict: 'user_id' });
    if (error) {
      console.warn('[Supabase Sync] syncUserStats error:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase Sync] syncUserStats exception:', err);
  }
};

/**
 * Upserts learned vocabulary items to `learned_vocabulary` table with composite key (user_id, word).
 */
export const syncLearnedVocab = async (userId?: string, words?: any[]): Promise<void> => {
  const uid = userId || getCurrentUserId();
  if (!uid) return;
  const currentWords = words || useStatsStore.getState().learnedVocab || [];
  if (currentWords.length === 0) return;

  try {
    const rows = currentWords.map((w) => {
      if (typeof w === 'string') {
        return {
          user_id: uid,
          word: w.toLowerCase(),
          quest_id: 'unknown',
          date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString(),
        };
      }
      return {
        user_id: uid,
        word: (w.word || '').toLowerCase(),
        quest_id: w.questId || w.quest_id || 'unknown',
        date: w.date || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      };
    });

    const { error } = await supabase.from('learned_vocabulary').upsert(rows, { onConflict: 'user_id,word' });
    if (error) {
      console.warn('[Supabase Sync] syncLearnedVocab error:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase Sync] syncLearnedVocab exception:', err);
  }
};

/**
 * Upserts immersion chat messages into `immersion_chat_messages` table.
 */
export const syncImmersionMessages = async (
  userId?: string,
  sessionKey?: string,
  mode?: string,
  topic?: string,
  messages?: any[]
): Promise<void> => {
  const uid = userId || getCurrentUserId();
  if (!uid) return;

  if (sessionKey && mode && topic && messages) {
    if (messages.length === 0) return;
    try {
      const rows = messages.map((msg) => ({
        user_id: uid,
        session_key: sessionKey,
        mode: mode,
        topic: topic,
        id: msg.id,
        sender: msg.sender,
        text: msg.text,
        translation: msg.translation || null,
        timestamp: msg.timestamp || new Date().toISOString(),
        quick_replies: msg.quickReplies || null,
        new_vocab_words: msg.newVocabWords || null,
        structured_content: msg.structuredContent || null,
        metadata: {
          quickReplies: msg.quickReplies || [],
          newVocabWords: msg.newVocabWords || [],
          structuredContent: msg.structuredContent || null,
        },
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('immersion_chat_messages').upsert(rows, {
        onConflict: 'user_id,session_key,id',
      });
      if (error) {
        await supabase.from('immersion_chat_messages').upsert(rows);
      }
    } catch (err) {
      console.warn('[Supabase Sync] syncImmersionMessages exception:', err);
    }
  } else {
    // Sync all sessions in activeImmersionStore
    const immersionState = useActiveImmersionStore.getState();
    if (immersionState.sessions) {
      for (const [key, session] of Object.entries(immersionState.sessions)) {
        if (session.messages && session.messages.length > 0) {
          const parts = key.split('-');
          const m = parts[0] || 'daily';
          const t = parts.slice(1).join('-') || 'general';
          await syncImmersionMessages(uid, key, m, t, session.messages);
        }
      }
    }
  }
};

/**
 * Fetches remote records from Supabase and hydrates local Zustand stores.
 */
export const fetchAndHydrateRemoteState = async (userId: string): Promise<void> => {
  if (!userId) return;
  try {
    // 1. Hydrate User Stats
    const { data: statsData } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (statsData) {
      useStatsStore.setState((state) => ({
        xp: statsData.xp ?? state.xp,
        coins: statsData.coins ?? state.coins,
        streak: statsData.streak ?? state.streak,
        lastActiveDate: statsData.last_active_date || statsData.lastActiveDate || state.lastActiveDate,
        collectedCardIds: Array.from(
          new Set([
            ...(state.collectedCardIds || []),
            ...(statsData.collected_card_ids || statsData.collected_card_ids || []),
          ])
        ),
      }));
    }

    // 2. Hydrate Learned Vocabulary
    const { data: vocabData } = await supabase
      .from('learned_vocabulary')
      .select('*')
      .eq('user_id', userId);

    if (vocabData && vocabData.length > 0) {
      useStatsStore.setState((state) => {
        const vocabMap = new Map(state.learnedVocab.map((v) => [v.word.toLowerCase(), v]));
        vocabData.forEach((row) => {
          const wLower = row.word.toLowerCase();
          if (!vocabMap.has(wLower)) {
            vocabMap.set(wLower, {
              word: row.word,
              questId: row.quest_id || row.questId || 'remote',
              date: row.date || (row.learned_at ? row.learned_at.split('T')[0] : new Date().toISOString().split('T')[0]),
            });
          }
        });
        return { learnedVocab: Array.from(vocabMap.values()) };
      });
    }

    // 3. Hydrate Immersion Messages
    const { data: immersionData } = await supabase
      .from('immersion_chat_messages')
      .select('*')
      .eq('user_id', userId);

    if (immersionData && immersionData.length > 0) {
      useActiveImmersionStore.setState((state) => {
        const nextSessions = { ...state.sessions };
        immersionData.forEach((row) => {
          const key = row.session_key || `${row.mode}-${row.topic}`;
          if (!nextSessions[key]) {
            nextSessions[key] = {
              messages: [],
              learnedWords: [],
              error: null,
            };
          }
          const existingMsgs = nextSessions[key].messages;
          if (!existingMsgs.some((m) => m.id === row.id)) {
            const meta = row.metadata || {};
            existingMsgs.push({
              id: row.id,
              sender: row.sender as 'user' | 'assistant',
              text: row.text,
              translation: row.translation || undefined,
              timestamp: row.timestamp || row.created_at || new Date().toISOString(),
              quickReplies: row.quick_replies || meta.quickReplies || undefined,
              newVocabWords: row.new_vocab_words || meta.newVocabWords || undefined,
              structuredContent: row.structured_content || meta.structuredContent || undefined,
            });
          }
        });
        return { sessions: nextSessions };
      });
    }
  } catch (err) {
    console.warn('[Supabase Sync] fetchAndHydrateRemoteState warning:', err);
  }
};

/**
 * Triggers full local cached state sync to Supabase.
 */
export const triggerFullLocalSync = async (userId: string): Promise<void> => {
  if (!userId) return;
  const statsState = useStatsStore.getState();
  await syncUserStats(userId, statsState);

  if (statsState.learnedVocab && statsState.learnedVocab.length > 0) {
    await syncLearnedVocab(userId, statsState.learnedVocab);
  }

  const immersionState = useActiveImmersionStore.getState();
  if (immersionState.sessions) {
    for (const [key, session] of Object.entries(immersionState.sessions)) {
      if (session.messages && session.messages.length > 0) {
        const parts = key.split('-');
        const mode = parts[0] || 'daily';
        const topic = parts.slice(1).join('-') || 'general';
        await syncImmersionMessages(userId, key, mode, topic, session.messages);
      }
    }
  }
};


/**
 * Upgrades an anonymous user account to a permanent email/password account.

 * Uses `supabase.auth.updateUser({ email, password })` to preserve active auth.uid() in-place.
 */
export const upgradeAnonymousAccount = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const { data, error } = await supabase.auth.updateUser({
      email: email.trim(),
      password: password,
    });

    if (error) {
      let cleanMsg = error.message;
      if (
        error.message.toLowerCase().includes('already registered') ||
        error.message.toLowerCase().includes('already exists')
      ) {
        cleanMsg = 'An account with this email is already registered.';
      }
      return { success: false, error: cleanMsg };
    }

    const updatedUser = data?.user;
    if (updatedUser) {
      activeUserId = updatedUser.id;
      const userEmail = updatedUser.email || email.trim();
      useAuthStore.getState().login(userEmail, 'email');
      useAuthStore.getState().setIsAnonymous?.(false);
      return { success: true };
    }

    return { success: false, error: 'Failed to update account details.' };
  } catch (err: any) {
    return { success: false, error: err?.message || 'An unexpected error occurred during account upgrade.' };
  }
};

// Subscribe to Supabase Auth state changes
supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user?.id) {
    activeUserId = session.user.id;
    useAuthStore.getState().setUserId?.(activeUserId);
    await fetchAndHydrateRemoteState(activeUserId);
    await triggerFullLocalSync(activeUserId);
  } else {
    activeUserId = null;
    useAuthStore.getState().setUserId?.(null);
  }
});

// Auto-initialize anonymous auth on load
initAnonymousAuth()
  .then((uid) => {
    if (uid) {
      fetchAndHydrateRemoteState(uid).then(() => {
        triggerFullLocalSync(uid);
      });
    }
  })
  .catch(() => {});

