import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getActiveImmersionResponse,
  isGeminiAvailable,
  type ImmersionMode,
  type ActiveImmersionResponse,
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
}

interface ActiveImmersionStore {
  activeMode: ImmersionMode | null;
  selectedTopic: string | null;
  selectedAccent: string | null; // 'Madrid' | 'Mexico City' | 'Buenos Aires' | null
  sessions: Record<string, ImmersionSessionState>; // keyed by `${mode}-${topic}`
  isTyping: boolean;

  setMode: (mode: ImmersionMode | null) => void;
  setTopic: (topic: string | null) => void;
  setAccent: (accent: string | null) => void;
  startSession: (mode: ImmersionMode, topic: string, accent?: string | null) => void;
  sendMessage: (mode: ImmersionMode, topic: string, userText: string, accent?: string | null) => Promise<void>;
  resetSession: (mode: ImmersionMode, topic: string) => void;
  addLearnedWord: (sessionKey: string, word: string, meaning: string) => void;
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

      startSession: (mode: ImmersionMode, topic: string, accent?: string | null) => {
        const sessionKey = buildSessionKey(mode, topic);
        const currentSessions = get().sessions;

        if (currentSessions[sessionKey]) {
          // Session already exists — just activate it
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
          sessions: {
            ...currentSessions,
            [sessionKey]: {
              messages: [initialMessage],
              learnedWords: [],
            },
          },
        });
      },

      sendMessage: async (mode: ImmersionMode, topic: string, userText: string, accent?: string | null) => {
        const state = get();
        const sessionKey = buildSessionKey(mode, topic);
        const currentSession = state.sessions[sessionKey] || {
          messages: [],
          learnedWords: [],
        };

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
            },
          },
        });

        // Award rewards (+10 XP, +5 Coins)
        useStatsStore.getState().addRewards(10, 5);

        // Convert messages format for Gemini
        const history = updatedMessages.map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          text: m.text,
        }));

        let aiReplyText = '';
        let aiTranslation = '';
        let aiQuickReplies: { text: string; translation: string }[] = [];
        let aiNewVocab: { word: string; meaning: string }[] = [];
        let aiStructuredContent: ActiveImmersionResponse['structuredContent'] | undefined;

        if (isGeminiAvailable()) {
          const geminiRes = await getActiveImmersionResponse(
            mode,
            topic,
            userText,
            history,
            accent ?? undefined,
          );

          if (geminiRes) {
            aiReplyText = geminiRes.text;
            aiTranslation = geminiRes.translation;
            aiQuickReplies = geminiRes.quickReplies || [];
            aiNewVocab = geminiRes.newVocabWords || [];
            aiStructuredContent = geminiRes.structuredContent;
          }
        }

        // Fallback response if Gemini unavailable or failed
        if (!aiReplyText) {
          aiReplyText = `¡Comprendo! Sigamos practicando sobre '${topic}'. ¿Qué te gustaría explorar ahora?`;
          aiTranslation = `I understand! Let's keep practicing about '${topic}'. What would you like to explore now?`;
          aiQuickReplies = [
            { text: '¡Sí, continuemos!', translation: 'Yes, let\'s continue!' },
            { text: '¿Puedes repetir eso?', translation: 'Can you repeat that?' },
          ];
        }

        const assistantMsg: ImmersionChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: aiReplyText,
          translation: aiTranslation,
          timestamp: new Date().toISOString(),
          quickReplies: aiQuickReplies,
          newVocabWords: aiNewVocab,
          structuredContent: aiStructuredContent,
        };

        // Automatically sync new vocabulary to learned words list
        const updatedLearned = [...currentSession.learnedWords];
        aiNewVocab.forEach((item) => {
          if (!updatedLearned.some((w) => w.word.toLowerCase() === item.word.toLowerCase())) {
            updatedLearned.push(item);
            // Also sync to global stats store
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
            },
          },
        }));
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
    }),
    {
      name: 'wayfarer-active-immersion',
      partialize: (state) => ({
        sessions: state.sessions,
        activeMode: state.activeMode,
        selectedTopic: state.selectedTopic,
        selectedAccent: state.selectedAccent,
      }),
    }
  )
);
