import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { COMPANIONS } from '../content/companions';
import type { QuickReply } from '../content/companions';
import { useStatsStore } from './statsStore';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  translation: string;
  timestamp: string;
  quickReplies?: QuickReply[];
  signOff?: string;
}

export interface CompanionConversation {
  messages: ChatMessage[];
  letterCount: number;
  friendshipExp: number;
  friendshipLevel: number;
}

interface CompanionState {
  activeCompanionId: string;
  conversations: Record<string, CompanionConversation>;
  isTyping: boolean;
  
  setActiveCompanion: (id: string) => void;
  sendUserMessage: (companionId: string, text: string, nextNodeId?: string) => void;
  resetConversations: () => void;
}

const getInitialMessageForCompanion = (companionId: string): ChatMessage => {
  const companion = COMPANIONS[companionId];
  const startNode = companion.dialogueNodes[companion.greetingNodeId];
  return {
    id: `${companionId}-init`,
    sender: 'companion',
    text: startNode.text,
    translation: startNode.translation,
    timestamp: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
    quickReplies: startNode.quickReplies,
    signOff: startNode.signOff,
  };
};

const createFreshConversations = (): Record<string, CompanionConversation> => {
  return {
    elena: {
      messages: [getInitialMessageForCompanion('elena')],
      letterCount: 1,
      friendshipExp: 0,
      friendshipLevel: 1,
    },
    mateo: {
      messages: [getInitialMessageForCompanion('mateo')],
      letterCount: 1,
      friendshipExp: 0,
      friendshipLevel: 1,
    },
    diego: {
      messages: [getInitialMessageForCompanion('diego')],
      letterCount: 1,
      friendshipExp: 0,
      friendshipLevel: 1,
    },
  };
};

export const useCompanionStore = create<CompanionState>()(
  persist(
    (set, get) => ({
      activeCompanionId: 'elena',
      conversations: createFreshConversations(),
      isTyping: false,

      setActiveCompanion: (id) => set({ activeCompanionId: id }),

      sendUserMessage: (companionId, text, nextNodeId) => {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          sender: 'user',
          text,
          translation: '',
          timestamp,
        };

        // 1. Award base stats (+10 XP, +5 Coins)
        useStatsStore.getState().addRewards(10, 5);

        // 2. Update conversation progress & user message
        let levelUpAwarded = false;
        
        set((state) => {
          const conv = state.conversations[companionId];
          const newMessages = [...conv.messages, userMsg];
          const newLetterCount = conv.letterCount + 1;
          
          let newExp = conv.friendshipExp + 15; // +15 friendship exp per letter exchange
          let newLevel = conv.friendshipLevel;
          const expThreshold = newLevel * 100;
          
          if (newExp >= expThreshold) {
            newExp = newExp - expThreshold;
            newLevel = newLevel + 1;
            levelUpAwarded = true;
          }

          return {
            isTyping: true,
            conversations: {
              ...state.conversations,
              [companionId]: {
                messages: newMessages,
                letterCount: newLetterCount,
                friendshipExp: newExp,
                friendshipLevel: newLevel,
              },
            },
          };
        });

        // 3. Grant level up bonus if applicable
        if (levelUpAwarded) {
          useStatsStore.getState().addRewards(0, 50); // +50 Coin bonus for friendship level-up
        }

        // 4. Simulate companion typing & reply
        setTimeout(() => {
          const state = get();
          const companion = COMPANIONS[companionId];
          const conv = state.conversations[companionId];
          
          // Find the last companion message to know our current position
          const lastCompanionMsg = [...conv.messages]
            .reverse()
            .find((m) => m.sender === 'companion');

          let nextNode = companion.dialogueNodes[companion.greetingNodeId];

          if (nextNodeId && companion.dialogueNodes[nextNodeId]) {
            // User selected a quick reply chip
            nextNode = companion.dialogueNodes[nextNodeId];
          } else if (lastCompanionMsg) {
            // User typed custom free-text; transition using current node's fallbackReply
            // First find which node we were on
            const currentNodeId = Object.keys(companion.dialogueNodes).find(
              (key) => companion.dialogueNodes[key].text === lastCompanionMsg.text
            );

            if (currentNodeId) {
              const currentNode = companion.dialogueNodes[currentNodeId];
              if (currentNode.fallbackReply) {
                nextNode = companion.dialogueNodes[currentNode.fallbackReply.nextNodeId] || nextNode;
                // If it loops or falls back, we can customize the text to feel conversational
                if (currentNode.fallbackReply.text) {
                  nextNode = {
                    ...nextNode,
                    text: currentNode.fallbackReply.text,
                    translation: currentNode.fallbackReply.translation,
                  };
                }
              }
            }
          }

          const companionMsg: ChatMessage = {
            id: `${companionId}-${Date.now()}`,
            sender: 'companion',
            text: nextNode.text,
            translation: nextNode.translation,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            quickReplies: nextNode.quickReplies,
            signOff: nextNode.signOff,
          };

          set((state) => ({
            isTyping: false,
            conversations: {
              ...state.conversations,
              [companionId]: {
                ...state.conversations[companionId],
                messages: [...state.conversations[companionId].messages, companionMsg],
                letterCount: state.conversations[companionId].letterCount + 1,
              },
            },
          }));
        }, 1500);
      },

      resetConversations: () =>
        set({
          conversations: createFreshConversations(),
          isTyping: false,
        }),
    }),
    {
      name: 'wayfarer-companions',
      partialize: (state) => ({
        activeCompanionId: state.activeCompanionId,
        conversations: state.conversations,
      }),
    }
  )
);
