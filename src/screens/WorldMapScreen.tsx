// STEP 4 — World Map screen.
// Parchment-style horizontally-scrollable path. Quest pins render from the
// Step 3 data. Locked worlds show a fog overlay with a "?" pin. The avatar
// token sits at the furthest unlocked quest. Tapping an unlocked pin opens
// the Quest Preview (Step 5).
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_WORLDS } from '../content';
import { useAvatarQuestId, useProgressStore } from '../state/progressStore';
import { Lock } from 'lucide-react';

const WorldMapScreen = () => {
  const navigate = useNavigate();
  const isQuestUnlocked = useProgressStore((s) => s.isQuestUnlocked);
  const isWorldUnlocked = useProgressStore((s) => s.isWorldUnlocked);
  const completed = useProgressStore((s) => s.completedQuestIds);
  const avatarId = useAvatarQuestId();

  // Flatten worlds into the path the avatar walks. Each world is a "region".
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
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="border-b border-pencil/20 bg-ink px-4 py-4">
        <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
          El Mapa del Camino
        </p>
        <h1 className="font-display text-2xl font-bold text-paper">World Map</h1>
      </div>

      {/* Horizontally scrollable parchment path */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-6 p-6">
          {regions.map((region) => (
            <RegionCard
              key={region.world.id}
              name={region.world.name}
              level={region.world.level}
              description={region.world.description}
              fogged={!region.unlocked}
              pins={region.pins}
              onPinTap={(questId) =>
                navigate(`/quests?quest=${questId}`)
              }
            />
          ))}
        </div>
      </div>

      {/* Hint */}
      <p className="px-6 pb-8 font-body text-sm text-pencil">
        ← Scroll sideways to follow the path →
      </p>
    </div>
  );
};

interface RegionCardProps {
  name: string;
  level: string;
  description: string;
  fogged: boolean;
  pins: {
    quest: { id: string; title: string; subtitle: string };
    unlocked: boolean;
    done: boolean;
    isAvatar: boolean;
    index: number;
  }[];
  onPinTap: (questId: string) => void;
}

const RegionCard = ({
  name,
  level,
  description,
  fogged,
  pins,
  onPinTap,
}: RegionCardProps) => {
  return (
    <section
      className={`relative w-72 shrink-0 overflow-hidden rounded-xl border bg-paper p-5 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
        fogged ? 'border-pencil/20' : 'border-pencil/40'
      }`}
    >
      {/* Region header */}
      <div className="mb-4">
        <p className="font-hud text-[10px] uppercase tracking-[0.25em] text-terracotta">
          {level}
        </p>
        <h2 className="font-display text-xl font-bold">{name}</h2>
        <p className="mt-1 font-body text-xs text-pencil">{description}</p>
      </div>

      {/* Dashed path connecting pins */}
      <ol className="relative space-y-5">
        <span className="absolute left-[14px] top-2 bottom-2 border-l-2 border-dashed border-pencil/40" />
        {pins.length === 0 ? (
          // Empty stub world — single locked "?" pin.
          <EmptyWorldPin />
        ) : (
          pins.map((p) => (
            <li key={p.quest.id} className="relative flex items-start gap-3">
              {/* Pin marker */}
              <button
                type="button"
                disabled={!p.unlocked}
                onClick={() => p.unlocked && onPinTap(p.quest.id)}
                className={`relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm transition-transform ${
                  p.done
                    ? 'border-teal-deep bg-teal-deep text-paper'
                    : p.unlocked
                      ? 'border-terracotta bg-marigold text-ink hover:scale-110'
                      : 'border-pencil/40 bg-paper text-pencil'
                } ${p.unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                aria-label={
                  p.unlocked ? `Open ${p.quest.title}` : `${p.quest.title} (locked)`
                }
              >
                {p.done ? '✓' : p.unlocked ? p.index + 1 : <Lock size={12} className="text-pencil/70" />}
              </button>
              {/* Avatar token on the furthest unlocked pin */}
              {p.isAvatar && !fogged && (
                <span
                  className="absolute -top-2 left-1 z-20 text-lg"
                  role="img"
                  aria-label="You are here"
                >
                  🧭
                </span>
              )}
              {/* Pin label */}
              <div className="min-w-0">
                <p
                  className={`font-display text-sm font-semibold ${
                    p.unlocked ? 'text-ink' : 'text-pencil/50'
                  }`}
                >
                  {p.quest.title}
                </p>
                <p className="font-body text-xs text-pencil">{p.quest.subtitle}</p>
              </div>
            </li>
          ))
        )}
      </ol>

      {/* Fog-of-war overlay for locked worlds */}
      {fogged && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/70 backdrop-blur-[1px]">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper/30 bg-paper/10 text-paper/70">
              <Lock size={26} />
            </div>
            <p className="mt-2 font-body text-xs text-paper/60">Locked region</p>
            <p className="font-hud text-[9px] uppercase tracking-widest text-paper/40">
              Beat the previous boss
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

const EmptyWorldPin = () => (
  <li className="relative flex items-start gap-3">
    <span className="relative z-10 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-pencil/30 bg-paper text-pencil/70">
      <Lock size={11} />
    </span>
    <p className="font-body text-xs italic text-pencil/60">
      Content coming in a later region…
    </p>
  </li>
);

export default WorldMapScreen;
