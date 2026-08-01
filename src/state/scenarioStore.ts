import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SCENARIOS, type Scenario } from '../content/scenarios';
import { getScenarioGeminiResponse, isGeminiAvailable } from '../utils/geminiService';
import { useStatsStore } from './statsStore';

export interface ScenarioChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  translation?: string;
  timestamp: string;
  quickReplies?: { text: string; translation: string }[];
  newVocabWords?: { word: string; meaning: string }[];
  signOff?: string;
}

export interface ScenarioConversationState {
  scenarioId: string;
  messages: ScenarioChatMessage[];
  learnedWords: { word: string; meaning: string }[];
  error?: any;
}

interface ScenarioStore {
  activeScenarioId: string | null;
  conversations: Record<string, ScenarioConversationState>;
  isTyping: boolean;

  selectScenario: (scenarioId: string) => void;
  backToSelection: () => void;
  sendUserMessage: (scenario: Scenario, userText: string) => Promise<void>;
  retryLastMessage: (scenario: Scenario) => Promise<void>;
  restartScenario: (scenario: Scenario) => void;
  addLearnedWord: (scenarioId: string, word: string, meaning: string) => void;
  clearError: (scenarioId: string) => void;
  resetAllScenarios: () => void;
}

const initializeScenarioSession = (scenario: Scenario): ScenarioConversationState => ({
  scenarioId: scenario.id,
  messages: [
    {
      id: `msg-init-${Date.now()}`,
      sender: 'assistant',
      text: scenario.initialMessage.text,
      translation: scenario.initialMessage.translation,
      timestamp: new Date().toISOString(),
      quickReplies: scenario.initialMessage.quickReplies,
      signOff: scenario.initialMessage.signOff,
    },
  ],
  learnedWords: [],
  error: null,
});

export const useScenarioStore = create<ScenarioStore>()(
  persist(
    (set, get) => ({
      activeScenarioId: null,
      conversations: {},
      isTyping: false,

      selectScenario: (scenarioId: string) => {
        const currentConversations = get().conversations;
        const scenario = SCENARIOS.find((s) => s.id === scenarioId);

        if (scenario && !currentConversations[scenarioId]) {
          set({
            activeScenarioId: scenarioId,
            conversations: {
              ...currentConversations,
              [scenarioId]: initializeScenarioSession(scenario),
            },
          });
        } else {
          set({ activeScenarioId: scenarioId });
        }
      },

      backToSelection: () => {
        set({ activeScenarioId: null });
      },

      clearError: (scenarioId: string) => {
        set((s) => {
          const current = s.conversations[scenarioId];
          if (!current) return s;
          return {
            conversations: {
              ...s.conversations,
              [scenarioId]: { ...current, error: null },
            },
          };
        });
      },

      sendUserMessage: async (scenario: Scenario, userText: string) => {
        const state = get();
        const scenarioId = scenario.id;
        const currentSession = state.conversations[scenarioId] || initializeScenarioSession(scenario);

        const userMsg: ScenarioChatMessage = {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: userText,
          timestamp: new Date().toISOString(),
        };

        const updatedMessages = [...currentSession.messages, userMsg];

        set({
          isTyping: true,
          conversations: {
            ...state.conversations,
            [scenarioId]: {
              ...currentSession,
              messages: updatedMessages,
              error: null,
            },
          },
        });

        // Award rewards (+10 XP, +5 Coins)
        useStatsStore.getState().addRewards(10, 5);

        // Previous messages history excluding current user text
        const history = currentSession.messages.map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          text: m.text,
        }));

        if (isGeminiAvailable()) {
          const geminiRes = await getScenarioGeminiResponse(scenario, userText, history);

          if (geminiRes.success) {
            const assistantMsg: ScenarioChatMessage = {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              text: geminiRes.data.text,
              translation: geminiRes.data.translation,
              timestamp: new Date().toISOString(),
              quickReplies: geminiRes.data.quickReplies || [],
              newVocabWords: geminiRes.data.newVocabWords || [],
              signOff: geminiRes.data.signOff || `Saludos, ${scenario.characterName}`,
            };

            const updatedLearned = [...currentSession.learnedWords];
            (geminiRes.data.newVocabWords || []).forEach((item) => {
              if (!updatedLearned.some((w) => w.word.toLowerCase() === item.word.toLowerCase())) {
                updatedLearned.push(item);
                useStatsStore.getState().learnVocab([item.word.toLowerCase()], scenarioId);
              }
            });

            set((s) => ({
              isTyping: false,
              conversations: {
                ...s.conversations,
                [scenarioId]: {
                  ...currentSession,
                  messages: [...updatedMessages, assistantMsg],
                  learnedWords: updatedLearned,
                  error: null,
                },
              },
            }));
            return;
          } else {
            set((s) => ({
              isTyping: false,
              conversations: {
                ...s.conversations,
                [scenarioId]: {
                  ...currentSession,
                  messages: updatedMessages,
                  error: geminiRes.error,
                },
              },
            }));
            return;
          }
        } else {
          set((s) => ({
            isTyping: false,
            conversations: {
              ...s.conversations,
              [scenarioId]: {
                ...currentSession,
                messages: updatedMessages,
                error: 'Gemini API key is not configured. Please set your API key.',
              },
            },
          }));
        }
      },

      retryLastMessage: async (scenario: Scenario) => {
        const state = get();
        const scenarioId = scenario.id;
        const currentSession = state.conversations[scenarioId];
        if (!currentSession || currentSession.messages.length === 0) return;

        const lastUserMsg = [...currentSession.messages].reverse().find((m) => m.sender === 'user');
        if (!lastUserMsg) return;

        // Remove trailing assistant message if last message was assistant or failed
        const historyMsgs = currentSession.messages.slice(0, currentSession.messages.lastIndexOf(lastUserMsg));
        const history = historyMsgs.map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          text: m.text,
        }));

        set({
          isTyping: true,
          conversations: {
            ...state.conversations,
            [scenarioId]: {
              ...currentSession,
              error: null,
            },
          },
        });

        if (isGeminiAvailable()) {
          const geminiRes = await getScenarioGeminiResponse(scenario, lastUserMsg.text, history);

          if (geminiRes.success) {
            const assistantMsg: ScenarioChatMessage = {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              text: geminiRes.data.text,
              translation: geminiRes.data.translation,
              timestamp: new Date().toISOString(),
              quickReplies: geminiRes.data.quickReplies || [],
              newVocabWords: geminiRes.data.newVocabWords || [],
              signOff: geminiRes.data.signOff || `Saludos, ${scenario.characterName}`,
            };

            const cleanMessages = currentSession.messages.slice(0, currentSession.messages.indexOf(lastUserMsg) + 1);

            set((s) => ({
              isTyping: false,
              conversations: {
                ...s.conversations,
                [scenarioId]: {
                  ...currentSession,
                  messages: [...cleanMessages, assistantMsg],
                  error: null,
                },
              },
            }));
          } else {
            set((s) => ({
              isTyping: false,
              conversations: {
                ...s.conversations,
                [scenarioId]: {
                  ...currentSession,
                  error: geminiRes.error,
                },
              },
            }));
          }
        } else {
          set({ isTyping: false });
        }
      },

      restartScenario: (scenario: Scenario) => {
        set((s) => ({
          conversations: {
            ...s.conversations,
            [scenario.id]: initializeScenarioSession(scenario),
          },
        }));
      },

      addLearnedWord: (scenarioId: string, word: string, meaning: string) => {
        const state = get();
        const currentSession = state.conversations[scenarioId];
        if (!currentSession) return;

        if (!currentSession.learnedWords.some((w) => w.word.toLowerCase() === word.toLowerCase())) {
          const updatedLearned = [...currentSession.learnedWords, { word, meaning }];
          set({
            conversations: {
              ...state.conversations,
              [scenarioId]: {
                ...currentSession,
                learnedWords: updatedLearned,
              },
            },
          });
          useStatsStore.getState().learnVocab([word.toLowerCase()], scenarioId);
        }
      },

      resetAllScenarios: () =>
        set({
          activeScenarioId: null,
          conversations: {},
          isTyping: false,
        }),
    }),
    {
      name: 'wayfarer-scenarios',
      partialize: (state) => ({
        activeScenarioId: state.activeScenarioId,
        conversations: state.conversations,
      }),
    }
  )
);
