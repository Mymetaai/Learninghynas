import { useMemo, useCallback, memo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
  type NodeMouseHandler,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import roadmapData from '../../data/roadmap.json';
import type { RoadmapContent } from '../../data/roadmap.types';
import { useRoadmapStore } from '../../state/roadmapStore';
import RoadmapNodeWidget, { type RoadmapCustomNode } from './RoadmapNodeWidget';
import { Compass, Sparkles, CheckCircle2, RotateCcw, Unlock } from 'lucide-react';

const content = roadmapData as RoadmapContent;

const nodeTypes = {
  roadmapNode: RoadmapNodeWidget,
};

export interface RoadmapCanvasProps {
  onNodeSelect?: (id: string) => void;
}

export function RoadmapCanvas({ onNodeSelect }: RoadmapCanvasProps) {
  const allUnlocked = useRoadmapStore((s) => s.allUnlocked);
  const completedChecklistItems = useRoadmapStore((s) => s.completedChecklistItems);
  const unlockedNodeIds = useRoadmapStore((s) => s.unlockedNodeIds);
  const completedNodeIds = useRoadmapStore((s) => s.completedNodeIds);
  const unlockAll = useRoadmapStore((s) => s.unlockAll);
  const resetProgress = useRoadmapStore((s) => s.resetProgress);

  // Compute graph nodes with reactive progress state
  const nodes = useMemo<RoadmapCustomNode[]>(() => {
    return content.nodes.map((node) => {
      const isUnlocked = allUnlocked || unlockedNodeIds.includes(node.id);
      const isCompleted = completedNodeIds.includes(node.id);
      const completedItems = completedChecklistItems[node.id] || [];

      return {
        id: node.id,
        type: 'roadmapNode',
        position: node.position,
        data: {
          node,
          isUnlocked,
          isCompleted,
          completedTasksCount: completedItems.length,
          totalTasksCount: node.checklist.length,
        },
      };
    });
  }, [allUnlocked, unlockedNodeIds, completedNodeIds, completedChecklistItems]);

  // Compute graph edges with dynamic completion styling
  const edges = useMemo<Edge[]>(() => {
    return content.nodes.flatMap((node) => {
      const isSourceCompleted = completedNodeIds.includes(node.id);
      const isSourceUnlocked = allUnlocked || unlockedNodeIds.includes(node.id);

      return node.unlocks.map((targetId) => {
        const isTargetUnlocked = allUnlocked || unlockedNodeIds.includes(targetId);
        return {
          id: `edge-${node.id}-${targetId}`,
          source: node.id,
          target: targetId,
          type: 'smoothstep',
          animated: isSourceUnlocked && !isTargetUnlocked,
          style: {
            stroke: isSourceCompleted ? '#7D927D' : isSourceUnlocked ? '#D4AF37' : '#9CA3AF',
            strokeWidth: 3,
            strokeDasharray: isSourceCompleted ? undefined : '6,6',
          },
        };
      });
    });
  }, [allUnlocked, completedNodeIds, unlockedNodeIds]);

  const handleNodeClick: NodeMouseHandler<RoadmapCustomNode> = useCallback(
    (_, node) => {
      console.log('Clicked node:', node.id);
      // Only open if unlocked or completed
      if (allUnlocked || node.data.isUnlocked || node.data.isCompleted) {
        onNodeSelect?.(node.id);
      }
    },
    [allUnlocked, onNodeSelect]
  );

  const totalNodes = content.nodes.length;
  const completedCount = completedNodeIds.length;
  const unlockedCount = allUnlocked ? totalNodes : unlockedNodeIds.length;

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-3xl overflow-hidden border border-[#7D927D]/30 bg-bg-elevated/40 backdrop-blur-md shadow-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.4 }}
        minZoom={0.2}
        maxZoom={1.6}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        {/* Serene Tatami Grid Ambient Background */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={28}
          size={1.5}
          color="#7D927D30"
          className="bg-bg-base/60 dark:bg-bg-base/80"
        />

        {/* Top Floating Control / HUD Panel */}
        <Panel position="top-left" className="m-3">
          <div className="bg-bg-elevated/90 dark:bg-bg-elevated/90 backdrop-blur-md border border-[#7D927D]/30 rounded-2xl p-3 shadow-md space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#7D927D]/15 text-[#5E735E] dark:text-[#9EB59E]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-sm font-bold text-text-primary">
                  {content.title}
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-wider text-text-secondary">
                  30-Day Actionable Roadmap
                </p>
              </div>
            </div>

            {/* Quick Stats Chips */}
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                {completedCount}/{totalNodes} Done
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Sparkles className="w-3 h-3" />
                {unlockedCount}/{totalNodes} Unlocked
              </span>
            </div>
          </div>
        </Panel>

        {/* Top-Right Action Panel */}
        <Panel position="top-right" className="m-3">
          <div className="flex items-center gap-2">
            {!allUnlocked && (
              <button
                onClick={unlockAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7D927D] hover:bg-[#6B826B] text-white font-mono text-[10px] font-bold shadow-sm transition-all cursor-pointer border-none"
                title="Unlock All Roadmap Nodes"
              >
                <Unlock className="w-3 h-3" />
                <span>Unlock All</span>
              </button>
            )}
            <button
              onClick={() => {
                if (window.confirm('Reset roadmap progress?')) {
                  resetProgress();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-elevated/90 hover:bg-bg-elevated border border-structural/60 text-text-secondary hover:text-text-primary font-mono text-[10px] font-semibold shadow-sm transition-all cursor-pointer"
              title="Reset Roadmap Progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Map</span>
            </button>
          </div>
        </Panel>

        {/* Canvas Controls */}
        <Controls
          className="!bg-bg-elevated !border !border-structural/60 !rounded-2xl !shadow-md !overflow-hidden [&>button]:!bg-transparent [&>button]:!border-b [&>button]:!border-structural/30 [&>button]:!fill-text-primary hover:[&>button]:!bg-[#7D927D]/15"
          showInteractive={false}
        />

        {/* MiniMap */}
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(n) => {
            const data = n.data as unknown as { isCompleted?: boolean; isUnlocked?: boolean };
            if (data?.isCompleted) return '#7D927D';
            if (allUnlocked || data?.isUnlocked) return '#D4AF37';
            return '#A8A29E';
          }}
          className="!bg-bg-elevated/80 !border !border-structural/40 !rounded-2xl !shadow-md !hidden sm:!block"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}

export default memo(RoadmapCanvas);
