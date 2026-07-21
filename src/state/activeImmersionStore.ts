import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getActiveImmersionResponse,
  isGeminiAvailable,
  getApiKeyError,
  type ImmersionMode,
  type ActiveImmersionResponse,
  type GeminiErrorDetails,
} from '../utils/geminiService';
import { useStatsStore } from './statsStore';

export type { ImmersionMode, ActiveImmersionResponse };

export interface ImmersionChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  translation?: string;
  timestamp: string;
  quickReplies?: { text: string; translation: string }[];
  newVocabWords?: { word: string; meaning: string }[];
  structuredContent?: {
    type: 'plan' | 'quiz' | 'vocab-group' | 'exercise';
    items: { label: string; detail: string; example?: string }[];
  };
}

export interface ImmersionSessionState {
  messages: ImmersionChatMessage[];
  learnedWords: { word: string; meaning: string }[];
  error?: GeminiErrorDetails | string | null;
}

export type ActiveImmersionLevel = 'beginner' | 'intermediate';

interface ActiveImmersionStore {
  activeMode: ImmersionMode | null;
  selectedTopic: string | null;
  selectedAccent: string | null; // 'Madrid' | 'Mexico City' | 'Buenos Aires' | null
  selectedLevel: ActiveImmersionLevel;
  sessions: Record<string, ImmersionSessionState>; // keyed by `${mode}-${topic}`
  isTyping: boolean;

  setMode: (mode: ImmersionMode | null) => void;
  setTopic: (topic: string | null) => void;
  setAccent: (accent: string | null) => void;
  setSelectedLevel: (level: ActiveImmersionLevel) => void;
  startSession: (mode: ImmersionMode, topic: string, accent?: string | null) => Promise<void>;
  sendMessage: (mode: ImmersionMode, topic: string, userText: string, accent?: string | null) => Promise<void>;
  retryLastMessage: (mode: ImmersionMode, topic: string, accent?: string | null) => Promise<void>;
  resetSession: (mode: ImmersionMode, topic: string) => void;
  addLearnedWord: (sessionKey: string, word: string, meaning: string) => void;
  clearSessionError: (mode: ImmersionMode, topic: string) => void;
}

const WELCOME_MESSAGES: Record<ImmersionMode, (topic: string) => { text: string; translation: string }> = {
  daily: (topic) => ({
    text: `¡Hola! 📅 Voy a prepararte un plan de inmersión personalizado sobre '${topic}'. ¡Empecemos!`,
    translation: `Hi! I'll prepare a personalized immersion plan about '${topic}'. Let's start!`,
  }),
  conversation: (topic) => ({
    text: `¡Hola! 💬 Me encantaría charlar contigo sobre '${topic}'. ¿Qué opinas?`,
    translation: `Hi! I'd love to chat with you about '${topic}'. What do you think?`,
  }),
  vocabulary: (topic) => ({
    text: `¡Hola! 🧠 Vamos a aprender vocabulario sobre '${topic}' en grupos de 5. ¿Listo/a?`,
    translation: `Hi! Let's learn vocabulary about '${topic}' in groups of 5. Ready?`,
  }),
  roleplay: (topic) => ({
    text: `¡Hola! 🎭 Vamos a practicar un escenario real: '${topic}'. Yo seré tu interlocutor. ¡Empezamos!`,
    translation: `Hi! Let's practice a real scenario: '${topic}'. I'll be your conversation partner. Let's begin!`,
  }),
};

const buildSessionKey = (mode: ImmersionMode, topic: string): string => `${mode}-${topic}`;

export const useActiveImmersionStore = create<ActiveImmersionStore>()(
  persist(
    (set, get) => ({
      activeMode: null,
      selectedTopic: null,
      selectedAccent: null,
      selectedLevel: 'beginner',
      sessions: {},
      isTyping: false,

      setMode: (mode: ImmersionMode | null) => {
        set({ activeMode: mode });
      },

      setTopic: (topic: string | null) => {
        set({ selectedTopic: topic });
      },

      setAccent: (accent: string | null) => {
        set({ selectedAccent: accent });
      },

      setSelectedLevel: (level: ActiveImmersionLevel) => {
        set({ selectedLevel: level });
      },

      startSession: async (mode: ImmersionMode, topic: string, accent?: string | null) => {
        const sessionKey = buildSessionKey(mode, topic);
        const currentSessions = get().sessions;
        const level = get().selectedLevel;

        if (currentSessions[sessionKey]) {
          // Session already exists — activate it
          set({ activeMode: mode, selectedTopic: topic, selectedAccent: accent ?? null });
          return;
        }

        const welcome = WELCOME_MESSAGES[mode](topic);

        const initialMessage: ImmersionChatMessage = {
          id: `msg-init-${Date.now()}`,
          sender: 'assistant',
          text: welcome.text,
          translation: welcome.translation,
          timestamp: new Date().toISOString(),
        };

        set({
          activeMode: mode,
          selectedTopic: topic,
          selectedAccent: accent ?? null,
          isTyping: true,
          sessions: {
            ...currentSessions,
            [sessionKey]: {
              messages: [initialMessage],
              learnedWords: [],
              error: null,
            },
          },
        });

        if (isGeminiAvailable()) {
          const history = [{ role: 'assistant' as const, text: welcome.text }];
          const geminiRes = await getActiveImmersionResponse(
            mode,
            topic,
            `¡Hola! Empecemos la sesión sobre ${topic}.`,
            history,
            accent ?? undefined,
            level,
          );

          if (geminiRes.success) {
            const assistantMsg: ImmersionChatMessage = {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              text: geminiRes.data.text,
              translation: geminiRes.data.translation,
              timestamp: new Date().toISOString(),
              quickReplies: geminiRes.data.quickReplies || [],
              newVocabWords: geminiRes.data.newVocabWords || [],
              structuredContent: geminiRes.data.structuredContent,
            };

            const session = get().sessions[sessionKey] || { messages: [], learnedWords: [] };
            set((s) => ({
              isTyping: false,
              sessions: {
                ...s.sessions,
                [sessionKey]: {
                  ...session,
                  messages: [...session.messages, assistantMsg],
                  error: null,
                },
              },
            }));
          } else {
            const session = get().sessions[sessionKey] || { messages: [], learnedWords: [] };
            set((s) => ({
              isTyping: false,
              sessions: {
                ...s.sessions,
                [sessionKey]: {
                  ...session,
                  error: geminiRes.error,
                },
              },
            }));
          }
        } else {
          set({ isTyping: false });
        }
      },

      sendMessage: async (mode: ImmersionMode, topic: string, userText: string, accent?: string | null) => {
        const state = get();
        const sessionKey = buildSessionKey(mode, topic);
        const currentSession = state.sessions[sessionKey] || {
          messages: [],
          learnedWords: [],
        };
        const level = state.selectedLevel;

        const userMsg: ImmersionChatMessage = {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: userText,
          timestamp: new Date().toISOString(),
        };

        const updatedMessages = [...currentSession.messages, userMsg];

        set({
          isTyping: true,
          sessions: {
            ...state.sessions,
            [sessionKey]: {
              ...currentSession,
              messages: updatedMessages,
              error: null,
            },
          },
        });

        // Award rewards (+10 XP, +5 Coins)
        useStatsStore.getState().addRewards(10, 5);

        // Maintain full message history (up to 20 turns)
        const history = updatedMessages.slice(-20).map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          text: m.text,
        }));

        if (isGeminiAvailable()) {
          const geminiRes = await getActiveImmersionResponse(
            mode,
            topic,
            userText,
            history,
            accent ?? undefined,
            level,
          );

          if (geminiRes.success) {
            const assistantMsg: ImmersionChatMessage = {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              text: geminiRes.data.text,
              translation: geminiRes.data.translation,
              timestamp: new Date().toISOString(),
              quickReplies: geminiRes.data.quickReplies || [],
              newVocabWords: geminiRes.data.newVocabWords || [],
              structuredContent: geminiRes.data.structuredContent,
            };

            const updatedLearned = [...currentSession.learnedWords];
            (geminiRes.data.newVocabWords || []).forEach((item) => {
              if (!updatedLearned.some((w) => w.word.toLowerCase() === item.word.toLowerCase())) {
                updatedLearned.push(item);
                useStatsStore.getState().learnVocab([item.word.toLowerCase()], sessionKey);
              }
            });

            const finalSessionMessages = [...updatedMessages, assistantMsg];

            set((s) => ({
              isTyping: false,
              sessions: {
                ...s.sessions,
                [sessionKey]: {
                  ...currentSession,
                  messages: finalSessionMessages,
                  learnedWords: updatedLearned,
                  error: null,
                },
              },
            }));
          } else {
            // Check geminiRes.success; if false, set explicit error state on active session/store
            set((s) => ({
              isTyping: false,
              sessions: {
                ...s.sessions,
                [sessionKey]: {
                  ...currentSession,
                  messages: updatedMessages,
                  error: geminiRes.error,
                },
              },
            }));
          }
        } else {
          const keyError = getApiKeyError() || {
            code: 'MISSING_API_KEY',
            message: 'Gemini API key is not configured.',
          };
          set((s) => ({
            isTyping: false,
            sessions: {
              ...s.sessions,
              [sessionKey]: {
                ...currentSession,
                messages: updatedMessages,
                error: keyError,
              },
            },
          }));
        }
      },

      retryLastMessage: async (mode: ImmersionMode, topic: string, accent?: string | null) => {
        const state = get();
        const sessionKey = buildSessionKey(mode, topic);
        const currentSession = state.sessions[sessionKey];
        if (!currentSession) return;

        const level = state.selectedLevel;
        const messages = currentSession.messages;

        set((s) => ({
          isTyping: true,
          sessions: {
            ...s.sessions,
            [sessionKey]: {
              ...currentSession,
              error: null,
            },
          },
        }));

        const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
        const userText = lastUserMsg ? lastUserMsg.text : `¡Hola! Empecemos la sesión sobre ${topic}.`;

        const history = messages.slice(-20).map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          text: m.text,
        }));

        if (isGeminiAvailable()) {
          const geminiRes = await getActiveImmersionResponse(
            mode,
            topic,
            userText,
            history,
            accent ?? undefined,
            level,
          );

          if (geminiRes.success) {
            const assistantMsg: ImmersionChatMessage = {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              text: geminiRes.data.text,
              translation: geminiRes.data.translation,
              timestamp: new Date().toISOString(),
              quickReplies: geminiRes.data.quickReplies || [],
              newVocabWords: geminiRes.data.newVocabWords || [],
              structuredContent: geminiRes.data.structuredContent,
            };

            const updatedLearned = [...currentSession.learnedWords];
            (geminiRes.data.newVocabWords || []).forEach((item) => {
              if (!updatedLearned.some((w) => w.word.toLowerCase() === item.word.toLowerCase())) {
                updatedLearned.push(item);
                useStatsStore.getState().learnVocab([item.word.toLowerCase()], sessionKey);
              }
            });

            set((s) => ({
              isTyping: false,
              sessions: {
                ...s.sessions,
                [sessionKey]: {
                  ...currentSession,
                  messages: [...messages, assistantMsg],
                  learnedWords: updatedLearned,
                  error: null,
                },
              },
            }));
          } else {
            set((s) => ({
              isTyping: false,
              sessions: {
                ...s.sessions,
                [sessionKey]: {
                  ...currentSession,
                  error: geminiRes.error,
                },
              },
            }));
          }
        } else {
          const keyError = getApiKeyError() || {
            code: 'MISSING_API_KEY',
            message: 'Gemini API key is not configured.',
          };
          set((s) => ({
            isTyping: false,
            sessions: {
              ...s.sessions,
              [sessionKey]: {
                ...currentSession,
                error: keyError,
              },
            },
          }));
        }
      },

      resetSession: (mode: ImmersionMode, topic: string) => {
        const sessionKey = buildSessionKey(mode, topic);
        const welcome = WELCOME_MESSAGES[mode](topic);

        const initialMessage: ImmersionChatMessage = {
          id: `msg-init-${Date.now()}`,
          sender: 'assistant',
          text: welcome.text,
          translation: welcome.translation,
          timestamp: new Date().toISOString(),
        };

        set((s) => ({
          sessions: {
            ...s.sessions,
            [sessionKey]: {
              messages: [initialMessage],
              learnedWords: [],
              error: null,
            },
          },
        }));
      },

      addLearnedWord: (sessionKey: string, word: string, meaning: string) => {
        const state = get();
        const currentSession = state.sessions[sessionKey];
        if (!currentSession) return;

        if (!currentSession.learnedWords.some((w) => w.word.toLowerCase() === word.toLowerCase())) {
          const updatedLearned = [...currentSession.learnedWords, { word, meaning }];
          set({
            sessions: {
              ...state.sessions,
              [sessionKey]: {
                ...currentSession,
                learnedWords: updatedLearned,
              },
            },
          });
          useStatsStore.getState().learnVocab([word.toLowerCase()], sessionKey);
        }
      },

      clearSessionError: (mode: ImmersionMode, topic: string) => {
        const sessionKey = buildSessionKey(mode, topic);
        const state = get();
        const currentSession = state.sessions[sessionKey];
        if (currentSession) {
          set({
            sessions: {
              ...state.sessions,
              [sessionKey]: {
                ...currentSession,
                error: null,
              },
            },
          });
        }
      },
    }),
    {
      name: 'wayfarer-active-immersion',
      partialize: (state) => ({
        sessions: state.sessions,
        activeMode: state.activeMode,
        selectedTopic: state.selectedTopic,
        selectedAccent: state.selectedAccent,
        selectedLevel: state.selectedLevel,
      }),
    }
  )
);
