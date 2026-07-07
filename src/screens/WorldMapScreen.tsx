// Adventure Tab — "Kitsune's Path"
// A story-driven vertical trail through themed regions. Each region features
// collapsible chapters with horizontal winding SVG paths, lesson nodes,
// and intermediate Sentinel or Guardian battles.
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_WORLDS } from '../content';
import { useProgressStore } from '../state/progressStore';
import { Lock, ChevronDown, ChevronUp, Check, Sparkles, ClipboardList } from 'lucide-react';
import type { World, Chapter } from '../content/types';

// ── Tail counter helper ──────────────────────────────────────────────────
const useTailCount = () => {
  const defeatedGuardians = useProgressStore((s) => s.defeatedGuardianWorldIds);
  let earned = 0;
  for (const world of ALL_WORLDS) {
    if (defeatedGuardians.includes(world.id)) {
      earned += world.tailsAwarded;
    }
  }
  return { earned, total: 9 };
};

// ── Main screen ──────────────────────────────────────────────────────────
const WorldMapScreen = () => {
  const navigate = useNavigate();
  const isWorldUnlocked = useProgressStore((s) => s.isWorldUnlocked);
  const tails = useTailCount();

  const regions = useMemo(
    () =>
      ALL_WORLDS.map((w) => ({
        world: w,
        unlocked: isWorldUnlocked(w.id),
      })),
    [isWorldUnlocked],
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base">
      {/* Header */}
      <div className="border-b-2 border-structural bg-bg-elevated px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-text-secondary">
              El Mapa del Camino
            </p>
            <h1 className="font-display text-2xl font-bold text-text-primary">Kitsune's Path</h1>
          </div>
          {/* Tail counter */}
          <div className="flex items-center gap-2 rounded-full border-2 border-accent-action/30 bg-accent-action/10 px-4 py-2">
            <span className="text-lg" role="img" aria-label="Kitsune">🦊</span>
            <span className="font-hud text-sm font-bold text-accent-action">
              {tails.earned}/{tails.total}
            </span>
            <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary">
              Tails
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-5">
        {/* Daily Quest Banner */}
        <div className="flex items-center justify-between rounded-xl border border-structural bg-bg-elevated p-3.5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="h-5 w-5 text-text-secondary" />
            <div>
              <p className="font-body text-xs font-semibold text-text-primary">Daily quest: finish 2 lessons today</p>
              <p className="font-body text-[10px] text-text-secondary">Complete quizzes or speaking tasks</p>
            </div>
          </div>
          <span className="font-hud text-xs font-bold text-accent-action bg-accent-action/10 px-2.5 py-1 rounded-full">+30 KC</span>
        </div>

        {/* Vertical trail of regions */}
        <div className="space-y-4">
          {regions.map((region, idx) => (
            <RegionCard
              key={region.world.id}
              world={region.world}
              unlocked={region.unlocked}
              regionIndex={idx}
              onPinTap={(questId) => navigate(`/quests?quest=${questId}`)}
            />
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <p className="px-6 pb-8 text-center font-body text-xs text-text-secondary">
        Complete all guardians to become the Nine-Tailed Kitsune Master 🦊
      </p>
    </div>
  );
};

// ── Region card ──────────────────────────────────────────────────────────
interface RegionCardProps {
  world: World;
  unlocked: boolean;
  regionIndex: number;
  onPinTap: (questId: string) => void;
}

const RegionCard = ({
  world,
  unlocked,
  regionIndex,
  onPinTap,
}: RegionCardProps) => {
  const defeatedGuardians = useProgressStore((s) => s.defeatedGuardianWorldIds);
  const isGuardianDefeated = defeatedGuardians.includes(world.id);

  const completed = useProgressStore((s) => s.completedQuestIds);
  const isQuestUnlocked = useProgressStore((s) => s.isQuestUnlocked);
  const defeatedSentinels = useProgressStore((s) => s.defeatedSentinelIds);

  // Group quests inside the region card
  const chapters = useMemo(() => {
    if (world.chapters && world.chapters.length > 0) {
      return world.chapters;
    }
    // Fallback virtual chapter for flat worlds
    return [{
      id: `${world.id}-ch1`,
      chapterNumber: 1,
      name: 'Lessons & Guardian Duel',
      description: world.description,
      quests: world.quests,
      endBoss: {
        type: 'guardian' as const,
        id: `${world.id}-boss`,
        name: world.guardian,
        hp: 8,
        coinReward: 100,
        tailsAwarded: world.tailsAwarded
      }
    }];
  }, [world]);

  // Overall region stats
  const totalQuests = world.quests.length;
  const completedCount = world.quests.filter((q) => completed.includes(q.id)).length;
  const progressPercent = totalQuests > 0 ? Math.round((completedCount / totalQuests) * 100) : 0;

  const status: 'completed' | 'current' | 'locked' = !unlocked ? 'locked' : isGuardianDefeated ? 'completed' : 'current';

  // Expand the active region by default
  const [expanded, setExpanded] = useState(status === 'current');

  // Guardian name accessibility helper
  const prevGuardian = regionIndex > 0 ? ALL_WORLDS[regionIndex - 1].guardian : null;

  if (status === 'locked') {
    return (
      <section
        className="relative overflow-hidden rounded-2xl border-2 border-structural/40 bg-bg-elevated shadow-md animate-fade-in"
        aria-label={`Locked region: ${world.name}. ${prevGuardian ? `Defeat ${prevGuardian} to unlock.` : 'Complete the previous region to unlock.'}`}
      >
        <div className="relative px-5 py-4 backdrop-blur-[2px]">
          {/* Fog overlay */}
          <div className="absolute inset-0 bg-bg-base/60 backdrop-blur-sm z-10" />
          <div className="relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-structural/25 border border-structural text-text-tertiary">
                <Lock size={18} />
              </div>
              <div>
                <p className="font-hud text-[9px] uppercase tracking-[0.2em] text-text-tertiary">
                  {world.level}
                </p>
                <h2 className="font-display text-base font-bold text-text-tertiary">{world.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-hud text-[10px] uppercase text-text-tertiary">Locked</span>
              <ChevronDown size={16} className="text-text-tertiary" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rounded-2xl border-2 shadow-lg transition-all duration-300 animate-fade-in ${
        status === 'completed'
          ? 'border-success/40 bg-bg-elevated'
          : 'border-accent-action/40 bg-bg-elevated'
      }`}
    >
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between bg-transparent border-none cursor-pointer text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              status === 'completed'
                ? 'border-success bg-success/15'
                : 'border-accent-action bg-accent-action/15'
            }`}
          >
            {status === 'completed' ? (
              <Check size={18} className="text-success" />
            ) : (
              <Sparkles size={18} className="text-accent-action" />
            )}
          </div>
          <div>
            <p className="font-hud text-[9px] uppercase tracking-[0.2em] text-text-secondary">
              {world.level}
            </p>
            <h2 className="font-display text-base font-bold text-text-primary">{world.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tail badge */}
          {isGuardianDefeated && (
            <div className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1">
              <span className="text-sm">🦊</span>
              <span className="font-hud text-[10px] font-bold text-success">+{world.tailsAwarded}</span>
            </div>
          )}
          {/* Progress pill */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-structural/30 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  status === 'completed' ? 'bg-success' : 'bg-accent-action'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-hud text-[10px] text-text-secondary">
              {completedCount}/{totalQuests}
            </span>
          </div>
          {/* Chevron */}
          {expanded ? (
            <ChevronUp size={16} className="text-text-secondary" />
          ) : (
            <ChevronDown size={16} className="text-text-secondary" />
          )}
        </div>
      </button>

      {/* Expanded map content */}
      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-structural/20 space-y-5">
          <p className="font-body text-xs text-text-secondary mb-1">{world.description}</p>
          
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <ChapterSegment
                key={chapter.id}
                world={world}
                chapter={chapter}
                completed={completed}
                isQuestUnlocked={isQuestUnlocked}
                defeatedSentinels={defeatedSentinels}
                defeatedGuardians={defeatedGuardians}
                onPinTap={onPinTap}
                isWorldUnlocked={unlocked}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// ── Chapter segment component ────────────────────────────────────────────────
interface ChapterSegmentProps {
  world: World;
  chapter: Chapter;
  completed: string[];
  isQuestUnlocked: (id: string) => boolean;
  defeatedSentinels: string[];
  defeatedGuardians: string[];
  onPinTap: (id: string) => void;
  isWorldUnlocked: boolean;
}

const ChapterSegment = ({
  world,
  chapter,
  completed,
  isQuestUnlocked,
  defeatedSentinels,
  defeatedGuardians,
  onPinTap,
  isWorldUnlocked,
}: ChapterSegmentProps) => {
  const navigate = useNavigate();

  // Evaluate chapter status
  const isBossDefeated = useMemo(() => {
    if (chapter.endBoss.type === 'sentinel') {
      return defeatedSentinels.includes(chapter.endBoss.id);
    } else {
      return defeatedGuardians.includes(world.id);
    }
  }, [chapter, defeatedSentinels, defeatedGuardians, world.id]);

  const allQuestsDone = useMemo(() => {
    return chapter.quests.every((q) => completed.includes(q.id));
  }, [chapter.quests, completed]);

  const isCompleted = allQuestsDone && isBossDefeated;

  const isUnlocked = useMemo(() => {
    if (!isWorldUnlocked) return false;
    if (chapter.chapterNumber === 1) return true;
    
    // Previous chapter must be fully completed (quests + boss)
    const prevCh = world.chapters?.find((c) => c.chapterNumber === chapter.chapterNumber - 1);
    if (!prevCh) return false;
    const prevQuestsDone = prevCh.quests.every((q) => completed.includes(q.id));
    const prevBossDefeated = prevCh.endBoss.type === 'sentinel'
      ? defeatedSentinels.includes(prevCh.endBoss.id)
      : defeatedGuardians.includes(world.id);
    return prevQuestsDone && prevBossDefeated;
  }, [world, chapter, completed, defeatedSentinels, defeatedGuardians, isWorldUnlocked]);

  // Construct pins state
  const pins = useMemo(() => {
    return chapter.quests.map((q, qi) => {
      const unlocked = isQuestUnlocked(q.id);
      const done = completed.includes(q.id);
      return { quest: q, unlocked, done, index: qi };
    });
  }, [chapter.quests, isQuestUnlocked, completed]);

  // Dynamic wave coordinate layout mapping
  const numQuests = pins.length;
  const coordinates = useMemo(() => {
    const coords: { x: number; y: number }[] = [];
    const startX = 40;
    const endX = 500;
    // Add 1 extra point at the end for the boss
    const totalPoints = numQuests + 1;
    for (let i = 0; i < totalPoints; i++) {
      const t = i / (totalPoints - 1);
      const x = startX + t * (endX - startX);
      const y = 110 + Math.sin(t * Math.PI * 2.5) * 55;
      coords.push({ x: Math.round(x), y: Math.round(y) });
    }
    return coords;
  }, [numQuests]);

  const pathD = useMemo(() => {
    if (coordinates.length === 0) return '';
    let d = `M ${coordinates[0].x} ${coordinates[0].y}`;
    for (let i = 1; i < coordinates.length; i++) {
      const prev = coordinates[i - 1];
      const curr = coordinates[i];
      const cpX = (prev.x + curr.x) / 2;
      const cpY = prev.y;
      d += ` Q ${cpX} ${cpY} ${curr.x} ${curr.y}`;
    }
    return d;
  }, [coordinates]);

  // Selected Pin local state
  const defaultSelectedIdx = useMemo(() => {
    const activeIdx = pins.findIndex((p) => p.unlocked && !p.done);
    return activeIdx !== -1 ? activeIdx : Math.max(0, pins.length); // fallback to boss index
  }, [pins]);

  const [selectedPinIdx, setSelectedPinIdx] = useState<number | null>(null);
  const activePinIdx = selectedPinIdx !== null ? selectedPinIdx : defaultSelectedIdx;
  const selectedPin = pins[activePinIdx]; // undefined if boss index is selected

  // Click handler for lesson node
  const handleNodeClick = (i: number, qId: string, unlocked: boolean) => {
    setSelectedPinIdx(i);
    if (unlocked) {
      onPinTap(qId);
    }
  };

  // Click handler for boss node
  const handleBossClick = () => {
    setSelectedPinIdx(pins.length);
    if (allQuestsDone) {
      if (chapter.endBoss.type === 'sentinel') {
        navigate(`/boss?region=${world.id}&sentinel=${chapter.endBoss.id}`);
      } else {
        navigate(`/boss?region=${world.id}`);
      }
    }
  };

  // Render Collapsed Cards for Completed or Locked Chapters
  if (isCompleted) {
    return (
      <div className="flex items-center justify-between p-4 border border-success/30 bg-success/5 rounded-xl animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/15 border border-success/30 text-success">
            <Check size={16} />
          </div>
          <div>
            <p className="font-hud text-[9px] uppercase tracking-wider text-text-secondary">Chapter {chapter.chapterNumber}</p>
            <h3 className="font-display text-sm font-bold text-text-primary">{chapter.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">🏆</span>
          <span className="font-hud text-[10px] text-success font-bold uppercase tracking-wider">Completed</span>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="flex items-center justify-between p-4 border border-structural/20 bg-bg-elevated/45 rounded-xl opacity-60 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-base/10 border border-structural/30 text-text-tertiary">
            <Lock size={16} />
          </div>
          <div>
            <p className="font-hud text-[9px] uppercase tracking-wider text-text-secondary">Chapter {chapter.chapterNumber}</p>
            <h3 className="font-display text-sm font-bold text-text-tertiary">{chapter.name}</h3>
          </div>
        </div>
        <span className="font-hud text-[10px] text-text-secondary uppercase tracking-wider">Locked</span>
      </div>
    );
  }

  // Render Active Expanded Chapter Segment
  return (
    <div className="border border-accent-action/30 rounded-2xl p-4 bg-bg-elevated/20 shadow-sm space-y-4 animate-fade-in">
      {/* Segment Header */}
      <div>
        <p className="font-hud text-[9px] uppercase tracking-[0.2em] text-accent-action font-bold">Chapter {chapter.chapterNumber}</p>
        <h3 className="font-display text-base font-bold text-text-primary">{chapter.name}</h3>
        <p className="font-body text-xs text-text-secondary mt-0.5">{chapter.description}</p>
      </div>

      {/* SVG Map Path */}
      <div className="relative border border-structural bg-bg-base/30 rounded-xl overflow-hidden p-3 shadow-inner">
        <svg viewBox="0 0 540 220" className="w-full h-auto" role="img" aria-label="Winding chapter path">
          <path
            d={pathD}
            fill="none"
            stroke="var(--structural)"
            strokeWidth="3.5"
            strokeDasharray="3 8"
            strokeLinecap="round"
          />

          {/* Render Chapter Quests */}
          {pins.map((p, i) => {
            const coord = coordinates[i];
            if (!coord) return null;
            const isSelected = activePinIdx === i;

            return (
              <g
                key={p.quest.id}
                className="cursor-pointer group"
                onClick={() => handleNodeClick(i, p.quest.id, p.unlocked || p.done)}
              >
                {p.done ? (
                  <>
                    <circle cx={coord.x} cy={coord.y} r="16" fill="var(--success)" className="transition-transform group-hover:scale-110" style={{ transformOrigin: `${coord.x}px ${coord.y}px` }} />
                    <path d={`M ${coord.x - 5} ${coord.y} l 3.5 3.5 l 7 -7`} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : p.unlocked ? (
                  <>
                    {isSelected && (
                      <circle cx={coord.x} cy={coord.y} r="21" fill="none" stroke="var(--accent-action)" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: `${coord.x}px ${coord.y}px` }} />
                    )}
                    <circle cx={coord.x} cy={coord.y} r="16" fill={isSelected ? "var(--accent-action)" : "var(--bg-elevated)"} stroke="var(--accent-action)" strokeWidth="2.5" className="transition-transform group-hover:scale-115" style={{ transformOrigin: `${coord.x}px ${coord.y}px` }} />
                    <text x={coord.x} y={coord.y + 4.5} textAnchor="middle" fontSize="11" fontWeight="bold" fill={isSelected ? "white" : "var(--accent-action)"}>
                      {i + 1}
                    </text>
                  </>
                ) : (
                  <g opacity="0.55">
                    <circle cx={coord.x} cy={coord.y} r="14" fill="var(--bg-elevated)" stroke="var(--structural)" strokeWidth="1.5" />
                    <text x={coord.x} y={coord.y + 4} textAnchor="middle" fontSize="10" fontWeight="semibold" fill="var(--text-secondary)">
                      {i + 1}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render Chapter End Boss Node */}
          {(() => {
            const coord = coordinates[coordinates.length - 1];
            if (!coord) return null;
            const isSelected = activePinIdx === pins.length;

            return (
              <g className="cursor-pointer group" onClick={handleBossClick}>
                <rect
                  x={coord.x - 22}
                  y={coord.y - 22}
                  width="44"
                  height="44"
                  rx="10"
                  fill={isBossDefeated ? "var(--success)" : isSelected ? "var(--accent-action)" : "var(--bg-elevated)"}
                  stroke={isBossDefeated ? "var(--success)" : "var(--accent-action)"}
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-110"
                  style={{ transformOrigin: `${coord.x}px ${coord.y}px` }}
                  opacity={allQuestsDone ? 1 : 0.6}
                />
                <text x={coord.x} y={coord.y + 6} textAnchor="middle" fontSize="18" fill={isBossDefeated || isSelected ? "white" : "var(--accent-action)"}>
                  ⚔️
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Dynamic Details card at bottom of active chapter */}
      {selectedPin ? (
        <div className="bg-bg-elevated border border-structural rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="min-w-0">
            <span className="font-hud text-[9px] uppercase tracking-wider text-accent-action font-bold bg-accent-action/10 px-2 py-0.5 rounded">
              Lesson {activePinIdx + 1}
            </span>
            <h3 className="font-display text-sm font-bold text-text-primary mt-1.5">{selectedPin.quest.title}</h3>
            <p className="font-body text-xs text-text-secondary mt-0.5">{selectedPin.quest.subtitle}</p>
          </div>
          <button
            type="button"
            disabled={!selectedPin.unlocked}
            onClick={() => selectedPin.unlocked && onPinTap(selectedPin.quest.id)}
            className={`shrink-0 px-4 py-2.5 rounded-xl font-body text-xs font-bold transition-all shadow-sm border-none ${
              selectedPin.done
                ? 'bg-success/15 hover:bg-success/20 text-success cursor-pointer'
                : selectedPin.unlocked
                  ? 'bg-accent-action hover:bg-accent-action-hover text-white cursor-pointer hover:scale-103'
                  : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
            }`}
          >
            {selectedPin.done ? 'Review Quiz' : selectedPin.unlocked ? 'Start Quiz →' : 'Locked'}
          </button>
        </div>
      ) : (
        <div className="bg-bg-elevated border border-structural rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="min-w-0">
            <span className="font-hud text-[9px] uppercase tracking-wider text-accent-action font-bold bg-accent-action/10 px-2 py-0.5 rounded">
              {chapter.endBoss.type === 'sentinel' ? 'Sentinel duel' : 'Guardian Battle'}
            </span>
            <h3 className="font-display text-sm font-bold text-text-primary mt-1.5">{chapter.endBoss.name}</h3>
            <p className="font-body text-xs text-text-secondary mt-0.5">
              {isBossDefeated
                ? `You defeated the ${chapter.endBoss.type === 'sentinel' ? 'sentinel' : 'guardian'} and claimed your rewards!`
                : `Challenge the ${chapter.endBoss.type === 'sentinel' ? 'sentinel' : 'guardian'} in an HP duel.`}
            </p>
          </div>
          <button
            type="button"
            disabled={!allQuestsDone}
            onClick={handleBossClick}
            className={`shrink-0 px-4 py-2.5 rounded-xl font-body text-xs font-bold transition-all shadow-sm border-none ${
              allQuestsDone
                ? 'bg-success hover:bg-success-hover text-white cursor-pointer hover:scale-103'
                : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
            }`}
          >
            {allQuestsDone ? (isBossDefeated ? 'Challenge Again' : 'Challenge Boss') : 'Locked'}
          </button>
        </div>
      )}
    </div>
  );
};

export default WorldMapScreen;
