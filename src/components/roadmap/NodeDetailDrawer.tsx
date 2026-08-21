import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Play, MessageCircle, Globe, Swords, BookOpen } from 'lucide-react';
import { useRoadmapStore } from '../../state/roadmapStore';
import roadmapData from '../../data/roadmap.json';
import type { TaskActionType, RoadmapContent } from '../../data/roadmap.types';

const content = roadmapData as RoadmapContent;

interface NodeDetailDrawerProps {
  nodeId: string | null;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLaunchTask: (nodeId: string, taskId: string, actionType: TaskActionType, payload?: any) => void;
}

export default function NodeDetailDrawer({ nodeId, onClose, onLaunchTask }: NodeDetailDrawerProps) {
  const completedChecklistItems = useRoadmapStore((s) => s.completedChecklistItems);
  const completeTask = useRoadmapStore((s) => s.completeTask);

  const node = content.nodes.find((n) => n.id === nodeId);
  const completedTasks = nodeId ? completedChecklistItems[nodeId] || [] : [];
  const isNodeFullyComplete = node ? completedTasks.length >= node.checklist.length : false;

  // Action Dispatcher
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTaskAction = (taskId: string, actionType: TaskActionType, payload?: any) => {
    if (!nodeId) return;

    if (actionType === 'external_video' && payload?.url) {
      window.open(payload.url, '_blank', 'noopener,noreferrer');
      completeTask(nodeId, taskId);
    } else if (actionType === 'manual_check') {
      completeTask(nodeId, taskId);
    } else {
      // Pass in-app tasks to the parent screen to handle routing/modals
      onLaunchTask(nodeId, taskId, actionType, payload);
    }
  };

  const getActionIcon = (type: TaskActionType) => {
    switch (type) {
      case 'in_app_chat':
        return <MessageCircle className="w-5 h-5" />;
      case 'in_app_trivia':
        return <Globe className="w-5 h-5" />;
      case 'in_app_vocab':
        return <Swords className="w-5 h-5" />;
      case 'external_video':
        return <Play className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {nodeId && node && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/30 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 z-50 w-full max-w-md bg-bg-base dark:bg-bg-elevated shadow-2xl border-l border-[#7D927D]/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-structural/40 flex items-start justify-between bg-white/50 dark:bg-black/20">
              <div>
                <span className="text-xs font-mono font-bold text-[#7D927D] uppercase tracking-wider">
                  Week {node.week} • Day {node.day}
                </span>
                <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">{node.title}</h2>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">{node.summary}</p>
                {node.resourceUrl && (
                  <a
                    href={node.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-[#5E735E] dark:text-[#9EB59E] hover:underline font-mono font-medium"
                  >
                    <Play className="w-3.5 h-3.5 text-[#7D927D]" />
                    <span>{node.resourceLabel || 'Watch Resource Video'}</span>
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-structural/20 hover:bg-structural/30 rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer border-none"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checklist */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {node.checklist.map((task) => {
                const isDone = completedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 ${
                      isDone
                        ? 'border-[#7D927D]/40 bg-[#7D927D]/10'
                        : 'border-structural bg-white dark:bg-bg-base shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          isDone
                            ? 'bg-[#7D927D] text-white'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-5 h-5" /> : getActionIcon(task.actionType)}
                      </div>
                      <span
                        className={`font-sans font-medium text-sm truncate ${
                          isDone ? 'text-text-secondary line-through' : 'text-text-primary'
                        }`}
                      >
                        {task.label}
                      </span>
                    </div>

                    {!isDone && (
                      <button
                        onClick={() => handleTaskAction(task.id, task.actionType, task.payload)}
                        className="px-4 py-2 bg-[#7D927D] hover:bg-[#6B826B] text-white text-xs font-bold rounded-lg shadow-sm whitespace-nowrap transition-transform active:scale-95 cursor-pointer border-none shrink-0"
                      >
                        {task.actionType === 'manual_check' ? 'Mark Done' : 'Start'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Celebration Footer */}
            {isNodeFullyComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-[#7D927D] text-white text-center shadow-lg"
              >
                <h3 className="font-serif font-bold text-lg">Day Complete! 🎉</h3>
                <p className="text-xs opacity-90 mt-1">You've unlocked the next step on your journey.</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
