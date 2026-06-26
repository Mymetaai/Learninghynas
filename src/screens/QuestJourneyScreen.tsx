// Quest Journey — level-wise Spanish learning from the textbook.
// 24 levels (10 pages each, pages 10–241). Tap a level → Story → Training flow.
import { useMemo, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOK_LEVELS, TOTAL_BOOK_LEVELS } from '../content';
import { useProgressStore } from '../state/progressStore';
import {
  BookOpen,
  Lock,
  Trophy,
  Star,
  ChevronRight,
  Zap,
  Coins,
} from 'lucide-react';

const LEVEL_COLORS = [
  'from-teal-deep/80 to-teal-deep',
  'from-emerald-500/80 to-emerald-600',
  'from-green-500/80 to-green-600',
  'from-lime-500/80 to-lime-600',
  'from-yellow-500/80 to-yellow-600',
  'from-amber-500/80 to-amber-600',
  'from-orange-500/80 to-orange-600',
  'from-terracotta/80 to-terracotta',
  'from-red-500/80 to-red-600',
  'from-rose-500/80 to-rose-600',
  'from-pink-500/80 to-pink-600',
  'from-fuchsia-500/80 to-fuchsia-600',
  'from-purple-500/80 to-purple-600',
  'from-violet-500/80 to-violet-600',
  'from-indigo-500/80 to-indigo-600',
  'from-blue-500/80 to-blue-600',
  'from-sky-500/80 to-sky-600',
  'from-cyan-500/80 to-cyan-600',
  'from-teal-400/80 to-teal-500',
  'from-emerald-400/80 to-emerald-500',
  'from-green-400/80 to-green-500',
  'from-lime-400/80 to-lime-500',
  'from-yellow-400/80 to-yellow-500',
  'from-amber-400/80 to-amber-500',
];

function getColor(lvl: number) {
  return LEVEL_COLORS[(lvl - 1) % LEVEL_COLORS.length];
}

const QuestJourneyScreen: FC = () => {
  const navigate = useNavigate();
  const completedIds = useProgressStore((s) => s.completedQuestIds);
  const isUnlocked = useProgressStore((s) => s.isQuestUnlocked);

  const levels = useMemo(() => {
    return BOOK_LEVELS.map((quest, idx) => {
      const completed = completedIds.includes(quest.id);
      const unlocked = isUnlocked(quest.id);
      return { quest, idx, completed, unlocked };
    });
  }, [completedIds, isUnlocked]);

  const completedCount = levels.filter((l) => l.completed).length;
  const nextLevel = levels.find((l) => l.unlocked && !l.completed);

  const handlePlay = (questId: string) => {
    navigate(`/stories?quest=${questId}`);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink text-paper font-body">
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-pencil/20 bg-gradient-to-br from-terracotta/20 via-ink to-teal-deep/20 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-terracotta">
            El Viaje del Conocimiento
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-paper">
            Quest Journey
          </h1>
          <p className="mt-2 font-body text-sm text-pencil">
            Learn Spanish level by level — 24 chapters from your textbook, each
            packed with vocabulary, grammar, and exercises.
          </p>

          {/* Stats bar */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <StatBadge
              icon={<BookOpen size={14} />}
              label="Levels"
              value={`${TOTAL_BOOK_LEVELS}`}
            />
            <StatBadge
              icon={<Trophy size={14} />}
              label="Completed"
              value={`${completedCount}`}
            />
            <StatBadge
              icon={<Star size={14} />}
              label="Progress"
              value={`${Math.round((completedCount / TOTAL_BOOK_LEVELS) * 100)}%`}
            />
            <StatBadge
              icon={<Zap size={14} />}
              label="Next"
              value={nextLevel ? `Level ${nextLevel.idx + 1}` : 'All done!'}
              accent
            />
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-pencil/20">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-terracotta to-amber-400 transition-all duration-500"
              style={{
                width: `${(completedCount / TOTAL_BOOK_LEVELS) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Level grid */}
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map(({ quest, idx, completed, unlocked }) => (
            <LevelCard
              key={quest.id}
              questId={quest.id}
              level={idx + 1}
              title={quest.title}
              subtitle={quest.subtitle}
              vocabCount={quest.vocabulary.length}
              exerciseCount={quest.exercises.length}
              xp={quest.rewards.xp}
              coins={quest.rewards.coins}
              completed={completed}
              unlocked={unlocked}
              color={getColor(idx + 1)}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Level card component ──────────────────────────────────────────────── */

interface LevelCardProps {
  questId: string;
  level: number;
  title: string;
  subtitle: string;
  vocabCount: number;
  exerciseCount: number;
  xp: number;
  coins: number;
  completed: boolean;
  unlocked: boolean;
  color: string;
  onPlay: (id: string) => void;
}

const LevelCard: FC<LevelCardProps> = ({
  questId,
  level,
  title,
  subtitle,
  vocabCount,
  exerciseCount,
  xp,
  coins,
  completed,
  unlocked,
  color,
  onPlay,
}) => {

  return (
    <button
      type="button"
      disabled={!unlocked}
      onClick={() => unlocked && onPlay(questId)}
      className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200 ${
        completed
          ? 'border-teal-deep/40 bg-teal-deep/5 hover:bg-teal-deep/10'
          : unlocked
          ? 'border-pencil/30 bg-paper hover:border-terracotta/40 hover:shadow-lg'
          : 'cursor-not-allowed border-pencil/10 bg-ink/50 opacity-50'
      }`}
    >
      {/* Gradient accent bar */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${completed ? 'from-teal-deep to-emerald-400' : color}`}
      />

      <div className="flex flex-1 flex-col p-4">
        {/* Level number + status */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-hud text-[10px] uppercase tracking-wider ${
              completed
                ? 'bg-teal-deep/15 text-teal-deep'
                : unlocked
                ? 'bg-terracotta/10 text-terracotta'
                : 'bg-pencil/10 text-pencil'
            }`}
          >
            {completed ? (
              <>
                <Trophy size={10} /> Complete
              </>
            ) : unlocked ? (
              <>Level {level}</>
            ) : (
              <>
                <Lock size={10} /> Locked
              </>
            )}
          </span>
          {unlocked && (
            <ChevronRight
              size={16}
              className="text-pencil transition-transform group-hover:translate-x-1"
            />
          )}
        </div>

        {/* Title */}
        <h3 className="mt-2 font-display text-sm font-bold text-ink leading-tight">
          {title.replace(`Level ${level}: `, '')}
        </h3>
        <p className="mt-1 font-body text-[11px] text-pencil leading-snug">
          {subtitle}
        </p>

        {/* Vocab preview chips */}
        {unlocked && vocabCount > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-0.5 rounded-md bg-ink/5 px-1.5 py-0.5 text-[9px] text-pencil">
              📖 {vocabCount} words
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-ink/5 px-1.5 py-0.5 text-[9px] text-pencil">
              ✏️ {exerciseCount} exercises
            </span>
          </div>
        )}

        {/* Rewards */}
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-pencil/10">
          <span className="flex items-center gap-1 text-[10px] text-terracotta">
            <Zap size={10} /> {xp} XP
          </span>
          <span className="flex items-center gap-1 text-[10px] text-amber-400">
            <Coins size={10} /> {coins}
          </span>
        </div>
      </div>
    </button>
  );
};

/* ── Stat badge component ───────────────────────────────────────────────── */

interface StatBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}

const StatBadge: FC<StatBadgeProps> = ({ icon, label, value, accent }) => (
  <div
    className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
      accent
        ? 'border-terracotta/30 bg-terracotta/10'
        : 'border-pencil/15 bg-ink/40'
    }`}
  >
    <span className={accent ? 'text-terracotta' : 'text-pencil'}>{icon}</span>
    <div>
      <p className="font-hud text-xs font-bold leading-none text-paper">
        {value}
      </p>
      <p className="text-[9px] text-pencil">{label}</p>
    </div>
  </div>
);

export default QuestJourneyScreen;
