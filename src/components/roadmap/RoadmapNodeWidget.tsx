import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import {
  Lock,
  Check,
  Sparkles,
  BookOpen,
  MessageCircle,
  HelpCircle,
  Video,
  CheckCircle2,
} from 'lucide-react';
import type { RoadmapNode, TaskActionType } from '../../data/roadmap.types';
import MarqueeText from '../common/MarqueeText';

export interface RoadmapNodeData {
  node: RoadmapNode;
  isUnlocked: boolean;
  isCompleted: boolean;
  completedTasksCount: number;
  totalTasksCount: number;
  [key: string]: unknown;
}

export type RoadmapCustomNode = Node<RoadmapNodeData, 'roadmapNode'>;

const getActionIcon = (actionType: TaskActionType) => {
  switch (actionType) {
    case 'in_app_vocab':
      return <BookOpen className="w-3.5 h-3.5" />;
    case 'in_app_chat':
      return <MessageCircle className="w-3.5 h-3.5" />;
    case 'in_app_trivia':
      return <HelpCircle className="w-3.5 h-3.5" />;
    case 'external_video':
      return <Video className="w-3.5 h-3.5" />;
    default:
      return <CheckCircle2 className="w-3.5 h-3.5" />;
  }
};

export const getConnectedTabBadge = (actionType: TaskActionType) => {
  switch (actionType) {
    case 'in_app_vocab':
      return { name: 'Training Grounds', short: 'Training', color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' };
    case 'in_app_chat':
      return { name: 'AI Companion', short: 'Companion', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/20' };
    case 'in_app_trivia':
      return { name: 'Trivia Drill', short: 'Trivia', color: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/20' };
    case 'external_video':
      return { name: 'External Video', short: 'Video', color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/20' };
    default:
      return { name: 'Self-Check', short: 'Manual', color: 'bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/20' };
  }
};

const RoadmapNodeWidget = ({ data }: NodeProps<RoadmapCustomNode>) => {
  const { node, isUnlocked, isCompleted, completedTasksCount, totalTasksCount } = data;

  // Determine visual state
  const isLocked = !isUnlocked;
  const isActive = isUnlocked && !isCompleted;

  return (
    <div className="relative group">
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-[#7D927D] !border-2 !border-white dark:!border-stone-900 !rounded-full transition-transform group-hover:scale-125"
      />

      {/* Floating Active Chibi Sensei Mascot Badge */}
      {isActive && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#7D927D] text-white shadow-md font-mono text-[10px] font-bold uppercase tracking-wider animate-bounce">
          <span role="img" aria-label="fox" className="text-xs">🦊</span>
          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
          <span>Day {node.day} Active</span>
        </div>
      )}

      {/* Card Body */}
      <div
        className={`w-64 sm:w-72 p-4 rounded-2xl transition-all duration-300 relative select-none ${
          isLocked
            ? 'bg-bg-elevated/75 dark:bg-stone-900/75 border border-dashed border-structural/60 opacity-60 grayscale cursor-not-allowed shadow-none'
            : isCompleted
            ? 'bg-[#7D927D] text-white border-2 border-[#5E735E] shadow-md shadow-[#7D927D]/20 cursor-pointer hover:scale-[1.02] hover:shadow-lg'
            : 'bg-[#FDFBF7] dark:bg-[#1C221D] text-text-primary border-2 border-[#7D927D] ring-4 ring-[#7D927D]/35 shadow-xl cursor-pointer hover:scale-[1.02]'
        }`}
      >
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isCompleted
                ? 'bg-white/20 text-white'
                : isActive
                ? 'bg-[#7D927D]/15 text-[#5E735E] dark:text-[#9EB59E]'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
            }`}
          >
            Week {node.week} • Day {node.day}
          </span>

          {/* Status Indicator */}
          {isLocked && (
            <div className="flex items-center gap-1 text-stone-500 font-mono text-[10px]">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </div>
          )}

          {isCompleted && (
            <div className="flex items-center gap-1 bg-[#D4AF37] text-white px-2 py-0.5 rounded-full shadow-xs font-mono text-[10px] font-bold">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Done</span>
            </div>
          )}

          {isActive && (
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#7D927D] dark:text-[#9EB59E]">
              <span>
                {completedTasksCount}/{totalTasksCount} tasks
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h4
          className={`font-serif text-sm sm:text-base font-bold leading-snug ${
            isCompleted ? 'text-white' : 'text-text-primary'
          }`}
        >
          {node.title}
        </h4>

        {/* Summary */}
        <p
          className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
            isCompleted
              ? 'text-white/85'
              : isLocked
              ? 'text-text-tertiary'
              : 'text-text-secondary'
          }`}
        >
          {node.summary}
        </p>

        {/* Actionable Task Chips Preview */}
        <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/10 space-y-1.5">
          {node.checklist.map((item) => {
            const tabInfo = getConnectedTabBadge(item.actionType);
            return (
              <div
                key={item.id}
                className={`w-full flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-sans ${
                  isCompleted
                    ? 'bg-white/15 text-white'
                    : isActive
                    ? 'bg-[#7D927D]/10 text-[#3D4F3D] dark:text-[#BED1BE] border border-[#7D927D]/20'
                    : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-500'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                  <span className="shrink-0">{getActionIcon(item.actionType)}</span>
                  <MarqueeText text={item.label} className="w-full text-[11px] font-medium" />
                </div>
                <span
                  className={`shrink-0 px-1.5 py-0.2 rounded font-mono text-[9px] font-bold border ${tabInfo.color}`}
                  title={`Connects with ${tabInfo.name} tab`}
                >
                  [{tabInfo.short}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Fill Bar for active card */}
        {isActive && totalTasksCount > 0 && (
          <div className="mt-2.5 w-full h-1.5 bg-[#7D927D]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7D927D] rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((completedTasksCount / totalTasksCount) * 100)}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-[#7D927D] !border-2 !border-white dark:!border-stone-900 !rounded-full transition-transform group-hover:scale-125"
      />
    </div>
  );
};

export default memo(RoadmapNodeWidget);
