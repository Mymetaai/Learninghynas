export type TaskActionType = 'in_app_vocab' | 'in_app_chat' | 'in_app_trivia' | 'external_video' | 'manual_check';

export interface ChecklistItem {
  id: string;
  label: string;
  actionType: TaskActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // e.g., { count: 10 } or { companion: 'Mateo', topic: 'Food' }
}

export interface RoadmapNode {
  id: string;
  week: number;
  day: number;
  title: string;
  summary: string;
  checklist: ChecklistItem[];
  resourceUrl?: string;
  resourceLabel?: string;
  unlocks: string[];
  position: { x: number; y: number };
}

export interface RoadmapContent {
  title: string;
  nodes: RoadmapNode[];
}
