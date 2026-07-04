// Adventure Tab — "Kitsune's Path"
// A story-driven vertical trail through themed regions. Each region awards
// kitsune tails (9 total). Only the current in-progress region is expanded;
// completed and locked regions render as collapsed summary cards.
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_WORLDS } from '../content';
import { useAvatarQuestId, useProgressStore } from '../state/progressStore';
import { Lock, Swords, ChevronDown, ChevronUp, Check, Sparkles } from 'lucide-react';

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

// ── Region status helper ─────────────────────────────────────────────────
type RegionStatus = 'completed' | 'current' | 'locked';

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

      {/* Vertical trail */}
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
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
  const status: RegionStatus = !unlocked ? 'locked' : allDone ? 'completed' : 'current';

  // Current region starts expanded; others start collapsed
  const [expanded, setExpanded] = useState(status === 'current');

  const completedCount = pins.filter((p) => p.done).length;
  const totalNodes = pins.length;
  const progressPercent = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;

  // Determine previous guardian name for locked accessibility text
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
        className="w-full px-5 py-4 flex items-center justify-between bg-transparent border-none cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          {/* Region icon */}
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

      {/* Guardian subtitle (always visible) */}
      <div className="px-5 -mt-1 pb-3 flex items-center gap-1.5 border-b border-structural/30">
        <Swords size={12} className="text-accent-action/70" />
        <span className="font-body text-[10px] text-text-secondary">
          Guardian: {world.guardian}
        </span>
      </div>

      {/* Expanded node trail */}
      {expanded && (
        <div className="px-5 py-4">
          <p className="font-body text-xs text-text-secondary mb-4">{world.description}</p>

          {/* Winding path */}
          <ol className="relative space-y-0">
            {/* Vertical connector line */}
            <span
              className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-structural/30"
              aria-hidden="true"
            />

            {pins.length === 0 ? (
              <li className="relative flex items-center gap-3 py-3">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-structural/40 bg-bg-elevated">
                  <Lock size={14} className="text-text-secondary" />
                </span>
                <p className="font-body text-xs italic text-text-secondary">
                  Content coming soon…
                </p>
              </li>
            ) : (
              pins.map((p, i) => {
                // Zigzag offset for winding trail effect
                const zigzag = i % 2 === 0 ? '' : 'ml-6';

                return (
                  <li
                    key={p.quest.id}
                    className={`relative flex items-center gap-3 py-2 transition-all ${zigzag}`}
                  >
                    {/* Node circle */}
                    <button
                      type="button"
                      disabled={!p.unlocked}
                      onClick={() => p.unlocked && onPinTap(p.quest.id)}
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                        p.done
                          ? 'border-success bg-success text-white shadow-[0_0_8px_rgba(34,197,94,0.3)]'
                          : p.unlocked
                            ? 'border-accent-action bg-accent-action/15 text-accent-action hover:scale-110 hover:shadow-[0_0_12px_rgba(230,72,51,0.3)] animate-pulse'
                            : 'border-structural bg-bg-elevated text-text-secondary cursor-not-allowed'
                      }`}
                      aria-label={
                        p.done
                          ? `${p.quest.title} — completed`
                          : p.unlocked
                            ? `Open ${p.quest.title}`
                            : `${p.quest.title} — locked`
                      }
                    >
                      {p.done ? (
                        <Check size={14} />
                      ) : p.unlocked ? (
                        <span>{p.index + 1}</span>
                      ) : (
                        <Lock size={12} />
                      )}
                    </button>

                    {/* Avatar indicator */}
                    {p.isAvatar && (
                      <span
                        className="absolute -top-1 left-0.5 z-20 text-base"
                        role="img"
                        aria-label="You are here"
                      >
                        🧭
                      </span>
                    )}

                    {/* Label */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-display text-sm font-semibold ${
                          p.done
                            ? 'text-success'
                            : p.unlocked
                              ? 'text-text-primary'
                              : 'text-text-secondary/50'
                        }`}
                      >
                        {p.quest.title}
                      </p>
                      <p className="font-body text-[11px] text-text-secondary truncate">
                        {p.quest.subtitle}
                      </p>
                    </div>
                  </li>
                );
              })
            )}

            {/* Guardian battle node (always at the end of each region) */}
            {pins.length > 0 && (
              <li className="relative flex items-center gap-3 py-3 mt-2">
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    allDone
                      ? 'border-success bg-success/15'
                      : 'border-accent-action bg-accent-action/10'
                  }`}
                >
                  <Swords
                    size={18}
                    className={allDone ? 'text-success' : 'text-accent-action'}
                  />
                </div>
                <div>
                  <p
                    className={`font-display text-sm font-bold ${
                      allDone ? 'text-success' : 'text-accent-action'
                    }`}
                  >
                    ⚔️ {world.guardian}
                  </p>
                  <p className="font-body text-[10px] text-text-secondary">
                    {allDone ? 'Guardian defeated!' : 'Complete all lessons to challenge the guardian'}
                  </p>
                </div>
              </li>
            )}
          </ol>
        </div>
      )}
    </section>
  );
};

export default WorldMapScreen;
