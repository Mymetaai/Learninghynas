// Adventure Tab — "Kitsune's Path"
// A story-driven vertical trail through themed regions. Each region features
// a horizontal winding SVG path with lesson nodes and a guardian battle at the end.
// Features a Daily Quest banner and interactive node selection details.
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_WORLDS } from '../content';
import { useAvatarQuestId, useProgressStore } from '../state/progressStore';
import { Lock, Swords, ChevronDown, ChevronUp, Check, Sparkles, ClipboardList } from 'lucide-react';

// ── Tail counter helper ──────────────────────────────────────────────────
const useTailCount = () => {
  const completed = useProgressStore((s) => s.completedQuestIds);
  let earned = 0;
  for (const world of ALL_WORLDS) {
    if (world.quests.length === 0) continue;
    const lastQuest = world.quests.at(-1);
    if (lastQuest && completed.includes(lastQuest.id)) {
      earned += world.tailsAwarded;
    }
  }
  return { earned, total: 9 };
};

// ── Main screen ──────────────────────────────────────────────────────────
const WorldMapScreen = () => {
  const navigate = useNavigate();
  const isQuestUnlocked = useProgressStore((s) => s.isQuestUnlocked);
  const isWorldUnlocked = useProgressStore((s) => s.isWorldUnlocked);
  const completed = useProgressStore((s) => s.completedQuestIds);
  const avatarId = useAvatarQuestId();
  const tails = useTailCount();

  const regions = useMemo(
    () =>
      ALL_WORLDS.map((w) => ({
        world: w,
        unlocked: isWorldUnlocked(w.id),
        pins: w.quests.map((q, qi) => {
          const unlocked = isQuestUnlocked(q.id);
          const done = completed.includes(q.id);
          return { quest: q, unlocked, done, isAvatar: q.id === avatarId, index: qi };
        }),
      })),
    [isQuestUnlocked, isWorldUnlocked, completed, avatarId],
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
              pins={region.pins}
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
  world: (typeof ALL_WORLDS)[number];
  pins: {
    quest: { id: string; title: string; subtitle: string };
    unlocked: boolean;
    done: boolean;
    isAvatar: boolean;
    index: number;
  }[];
  unlocked: boolean;
  regionIndex: number;
  onPinTap: (questId: string) => void;
}

const RegionCard = ({
  world,
  pins,
  unlocked,
  regionIndex,
  onPinTap,
}: RegionCardProps) => {
  const allDone = pins.length > 0 && pins.every((p) => p.done);
  const status: 'completed' | 'current' | 'locked' = !unlocked ? 'locked' : allDone ? 'completed' : 'current';

  // Current region expanded by default; others collapsed
  const [expanded, setExpanded] = useState(status === 'current');

  const completedCount = pins.filter((p) => p.done).length;
  const totalNodes = pins.length;
  const progressPercent = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;

  // Selected node index for detailed info view below map
  const defaultSelectedIdx = useMemo(() => {
    const firstActiveIdx = pins.findIndex((p) => p.unlocked && !p.done);
    return firstActiveIdx !== -1 ? firstActiveIdx : Math.max(0, pins.length - 1);
  }, [pins]);

  const [selectedPinIdx, setSelectedPinIdx] = useState<number | null>(null);
  const activePinIdx = selectedPinIdx !== null ? selectedPinIdx : defaultSelectedIdx;
  const selectedPin = pins[activePinIdx];

  // Generate dynamic winding coordinates for this region's nodes
  const coordinates = useMemo(() => {
    if (pins.length === 0) return [];
    const coords: { x: number; y: number }[] = [];
    const startX = 40;
    const endX = 500;
    // Add 1 extra slot for the Guardian node at the end
    const totalPoints = pins.length + 1;
    for (let i = 0; i < totalPoints; i++) {
      const t = i / (totalPoints - 1);
      const x = startX + t * (endX - startX);
      // Nice wavy winding path using sine curve
      const y = 110 + Math.sin(t * Math.PI * 2.5) * 55;
      coords.push({ x: Math.round(x), y: Math.round(y) });
    }
    return coords;
  }, [pins]);

  // Construct SVG Bezier path linking the nodes
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

  // Guardian name accessibility helper
  const prevGuardian = regionIndex > 0 ? ALL_WORLDS[regionIndex - 1].guardian : null;

  if (status === 'locked') {
    return (
      <section
        className="relative overflow-hidden rounded-2xl border-2 border-structural/40 bg-bg-elevated shadow-md"
        aria-label={`Locked region: ${world.name}. ${prevGuardian ? `Defeat ${prevGuardian} to unlock.` : 'Complete the previous region to unlock.'}`}
      >
        <div className="relative px-5 py-4 backdrop-blur-[2px]">
          {/* Fog overlay */}
          <div className="absolute inset-0 bg-bg-base/60 backdrop-blur-sm z-10" />
          <div className="relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-structural bg-structural/20">
                <Lock size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="font-hud text-[9px] uppercase tracking-[0.2em] text-text-secondary">
                  {world.level}
                </p>
                <h2 className="font-display text-base font-bold text-text-secondary">{world.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary/60">
              <Swords size={14} />
              <span className="font-body text-[10px]">{world.guardian}</span>
            </div>
          </div>
          <p className="relative z-20 mt-2 font-body text-xs text-text-secondary/70 italic">
            {prevGuardian ? `Defeat ${prevGuardian} to unlock this region` : 'Complete the previous region to unlock'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rounded-2xl border-2 shadow-lg transition-all duration-300 ${
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
          {status === 'completed' && (
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
              {completedCount}/{totalNodes}
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
        <div className="px-5 pb-5 pt-2 border-t border-structural/20">
          <p className="font-body text-xs text-text-secondary mb-3">{world.description}</p>
          
          {pins.length === 0 ? (
            <div className="flex items-center gap-3 py-4 text-text-secondary italic text-xs">
              <Lock size={14} />
              Quests coming soon to this region!
            </div>
          ) : (
            <div className="space-y-4">
              {/* Map Box */}
              <div className="relative border border-structural bg-bg-base/30 rounded-xl overflow-hidden p-3 shadow-inner">
                <svg viewBox="0 0 540 220" className="w-full h-auto" role="img" aria-label="Winding quest path">
                  {/* Spline Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="var(--structural)"
                    strokeWidth="3.5"
                    strokeDasharray="3 8"
                    strokeLinecap="round"
                  />

                  {/* Render Lesson Nodes */}
                  {pins.map((p, i) => {
                    const coord = coordinates[i];
                    if (!coord) return null;
                    const isSelected = activePinIdx === i;

                    return (
                      <g
                        key={p.quest.id}
                        className="cursor-pointer group"
                        onClick={() => setSelectedPinIdx(i)}
                      >
                        {p.done ? (
                          // Success Node
                          <>
                            <circle cx={coord.x} cy={coord.y} r="16" fill="var(--success)" className="transition-transform group-hover:scale-110" />
                            <path d={`M ${coord.x - 5} ${coord.y} l 3.5 3.5 l 7 -7`} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </>
                        ) : p.unlocked ? (
                          // Unlocked / Active Node
                          <>
                            {isSelected && (
                              <circle cx={coord.x} cy={coord.y} r="21" fill="none" stroke="var(--accent-action)" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: `${coord.x}px ${coord.y}px` }} />
                            )}
                            <circle cx={coord.x} cy={coord.y} r="16" fill={isSelected ? "var(--accent-action)" : "var(--bg-elevated)"} stroke="var(--accent-action)" strokeWidth="2.5" className="transition-transform group-hover:scale-115" />
                            <text x={coord.x} y={coord.y + 4.5} textAnchor="middle" fontSize="11" fontWeight="bold" fill={isSelected ? "white" : "var(--accent-action)"}>
                              {i + 1}
                            </text>
                          </>
                        ) : (
                          // Locked Node
                          <g opacity="0.55">
                            <circle cx={coord.x} cy={coord.y} r="14" fill="var(--bg-elevated)" stroke="var(--structural)" strokeWidth="1.5" />
                            <text x={coord.x} y={coord.y + 4} textAnchor="middle" fontSize="10" fontWeight="semibold" fill="var(--text-secondary)">
                              {i + 1}
                            </text>
                          </g>
                        )}
                        {/* Avatar indicator */}
                        {p.isAvatar && (
                          <text x={coord.x - 9} y={coord.y - 14} fontSize="14">🧭</text>
                        )}
                      </g>
                    );
                  })}

                  {/* Render Guardian Battle Node */}
                  {(() => {
                    const coord = coordinates[coordinates.length - 1];
                    if (!coord) return null;
                    const isSelected = activePinIdx === pins.length; // guardian node index

                    return (
                      <g
                        className="cursor-pointer group"
                        onClick={() => setSelectedPinIdx(pins.length)}
                      >
                        <rect
                          x={coord.x - 22}
                          y={coord.y - 22}
                          width="44"
                          height="44"
                          rx="10"
                          fill={allDone ? "var(--success)" : isSelected ? "var(--accent-action)" : "var(--bg-elevated)"}
                          stroke={allDone ? "var(--success)" : "var(--accent-action)"}
                          strokeWidth="2.5"
                          className="transition-transform group-hover:scale-110"
                          opacity={allDone ? 1 : 0.6}
                        />
                        <text x={coord.x} y={coord.y + 6} textAnchor="middle" fontSize="18" fill={allDone || isSelected ? "white" : "var(--accent-action)"}>
                          ⚔️
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Node Details Card */}
              {selectedPin ? (
                <div className="bg-bg-elevated border border-structural rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                // Guardian Node Details Card
                <div className="bg-bg-elevated border border-structural rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-hud text-[9px] uppercase tracking-wider text-accent-action font-bold bg-accent-action/10 px-2 py-0.5 rounded">
                      Guardian Battle
                    </span>
                    <h3 className="font-display text-sm font-bold text-text-primary mt-1.5">{world.guardian}</h3>
                    <p className="font-body text-xs text-text-secondary mt-0.5">
                      {allDone ? 'You defeated the guardian and secured this tail!' : 'Challenge the guardian in a timed boss fight.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!allDone}
                    onClick={() => allDone && onPinTap(pins[pins.length - 1].quest.id)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl font-body text-xs font-bold transition-all shadow-sm border-none ${
                      allDone
                        ? 'bg-success hover:bg-success-hover text-white cursor-pointer hover:scale-103'
                        : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
                    }`}
                  >
                    {allDone ? 'Challenge Again' : 'Locked'}
                  </button>
                </div>
              )}

              {/* Dynamic Status line at the bottom */}
              <div className="flex justify-between items-center text-[10px] text-text-secondary tracking-wide uppercase font-hud px-1">
                <span>Node {pins.findIndex(p => p.unlocked && !p.done) + 1 || pins.length} in progress</span>
                <span>Guardian battle unlocked until node {pins.length}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default WorldMapScreen;
