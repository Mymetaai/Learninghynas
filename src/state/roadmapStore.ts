import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import roadmapData from '../data/roadmap.json';
import type { RoadmapContent } from '../data/roadmap.types';

const content = roadmapData as RoadmapContent;

export interface ProgressState {
  allUnlocked: boolean;
  completedChecklistItems: Record<string, string[]>;
  unlockedNodeIds: string[];
  completedNodeIds: string[];
  completeTask: (nodeId: string, taskId: string) => void;
  toggleChecklistItem: (nodeId: string, itemId: string) => void;
  checkAndUnlockNode: (nodeId: string) => void;
  unlockAll: () => void;
  resetProgress: () => void;
}

export const useRoadmapStore = create<ProgressState>()(
  persist(
    (set) => ({
      allUnlocked: true,
      completedChecklistItems: {},
      unlockedNodeIds: content.nodes.map((n) => n.id),
      completedNodeIds: [],

      completeTask: (nodeId, taskId) =>
        set((state) => {
          const nodeItems = state.completedChecklistItems[nodeId] || [];
          if (nodeItems.includes(taskId)) return state; // Already done
          const updatedItems = [...nodeItems, taskId];
          const newState = {
            completedChecklistItems: { ...state.completedChecklistItems, [nodeId]: updatedItems },
          };
          // Check for node unlock progression
          const node = content.nodes.find((n) => n.id === nodeId);
          if (node && updatedItems.length >= node.checklist.length) {
            const newCompleted = [...new Set([...state.completedNodeIds, nodeId])];
            const newUnlocked = [...new Set([...state.unlockedNodeIds, ...node.unlocks])];
            return { ...newState, completedNodeIds: newCompleted, unlockedNodeIds: newUnlocked };
          }
          return newState;
        }),

      toggleChecklistItem: (nodeId, itemId) =>
        set((state) => {
          const nodeItems = state.completedChecklistItems[nodeId] || [];
          const isDone = nodeItems.includes(itemId);
          const updatedItems = isDone
            ? nodeItems.filter((id) => id !== itemId)
            : [...nodeItems, itemId];
          const newState = {
            completedChecklistItems: {
              ...state.completedChecklistItems,
              [nodeId]: updatedItems,
            },
          };
          const node = content.nodes.find((n) => n.id === nodeId);
          if (node && updatedItems.length >= node.checklist.length) {
            const newCompleted = [...new Set([...state.completedNodeIds, nodeId])];
            const newUnlocked = [...new Set([...state.unlockedNodeIds, ...node.unlocks])];
            return { ...newState, completedNodeIds: newCompleted, unlockedNodeIds: newUnlocked };
          }
          return newState;
        }),

      checkAndUnlockNode: (nodeId) =>
        set((state) => {
          const node = content.nodes.find((n) => n.id === nodeId);
          if (!node) return state;

          const completedItems = state.completedChecklistItems[nodeId] || [];
          if (completedItems.length >= node.checklist.length) {
            const newCompleted = [...new Set([...state.completedNodeIds, nodeId])];
            const newUnlocked = [...new Set([...state.unlockedNodeIds, ...node.unlocks])];
            return { completedNodeIds: newCompleted, unlockedNodeIds: newUnlocked };
          }
          return state;
        }),

      unlockAll: () =>
        set({
          allUnlocked: true,
          unlockedNodeIds: content.nodes.map((n) => n.id),
        }),

      resetProgress: () =>
        set({
          allUnlocked: true,
          completedChecklistItems: {},
          unlockedNodeIds: content.nodes.map((n) => n.id),
          completedNodeIds: [],
        }),
    }),
    { name: 'hyena-roadmap-progress' }
  )
);
