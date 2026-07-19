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
}

interface ScenarioStore {
  activeScenarioId: string | null;
  conversations: Record<string, ScenarioConversationState>;
  isTyping: boolean;

  selectScenario: (scenarioId: string) => void;
  backToSelection: () => void;
  sendUserMessage: (scenario: Scenario, userText: string) => Promise<void>;
  restartScenario: (scenario: Scenario) => void;
  addLearnedWord: (scenarioId: string, word: string, meaning: string) => void;
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
        let aiSignOff = `Saludos, ${scenario.characterName}`;
        let aiQuickReplies: { text: string; translation: string }[] = [];
        let aiNewVocab: { word: string; meaning: string }[] = [];

        if (isGeminiAvailable()) {
          const geminiRes = await getScenarioGeminiResponse(scenario, userText, history);

          if (geminiRes) {
            aiReplyText = geminiRes.text;
            aiTranslation = geminiRes.translation;
            aiSignOff = geminiRes.signOff;
            aiQuickReplies = geminiRes.quickReplies || [];
            aiNewVocab = geminiRes.newVocabWords || [];
          }
        }

        // Fallback response if Gemini unavailable or failed
        if (!aiReplyText) {
          aiReplyText = `¡Comprendo perfectamente! En la situación de "${scenario.title}", es genial seguir practicando. ¿Quieres continuar conversando?`;
          aiTranslation = `I understand completely! In the "${scenario.title}" situation, it is great to keep practicing. Want to continue conversing?`;
          aiQuickReplies = [
            { text: '¡Sí, me gustaría saber más!', translation: 'Yes, I would like to know more!' },
            { text: '¿Qué me aconsejas decir ahora?', translation: 'What do you advise me to say now?' },
          ];
        }

        const assistantMsg: ScenarioChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: aiReplyText,
          translation: aiTranslation,
          timestamp: new Date().toISOString(),
          quickReplies: aiQuickReplies,
          newVocabWords: aiNewVocab,
          signOff: aiSignOff,
        };

        // Automatically sync new vocabulary to learned words list
        const updatedLearned = [...currentSession.learnedWords];
        aiNewVocab.forEach((item) => {
          if (!updatedLearned.some((w) => w.word.toLowerCase() === item.word.toLowerCase())) {
            updatedLearned.push(item);
            // Also sync to global stats store
            useStatsStore.getState().learnVocab([item.word.toLowerCase()], scenarioId);
          }
        });

        const finalSessionMessages = [...updatedMessages, assistantMsg];

        set((s) => ({
          isTyping: false,
          conversations: {
            ...s.conversations,
            [scenarioId]: {
              ...currentSession,
              messages: finalSessionMessages,
              learnedWords: updatedLearned,
            },
          },
        }));
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
