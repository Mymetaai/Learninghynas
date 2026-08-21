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
        <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-1.5">
          {node.checklist.map((item) => (
            <div
              key={item.id}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-sans ${
                isCompleted
                  ? 'bg-white/15 text-white'
                  : isActive
                  ? 'bg-[#7D927D]/10 text-[#475847] dark:text-[#BED1BE] border border-[#7D927D]/20'
                  : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-500'
              }`}
              title={item.label}
            >
              {getActionIcon(item.actionType)}
              <span className="truncate max-w-[120px]">{item.label}</span>
            </div>
          ))}
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
