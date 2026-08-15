// Quest Journey — level-wise Spanish learning from the textbook.
// 24 levels (10 pages each, pages 10–241). Tap a level → Story → Training flow.
import { useMemo, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOK_LEVELS, TOTAL_BOOK_LEVELS } from '../content';
import { useProgressStore } from '../state/progressStore';
import { useQuestStore } from '../state/questStore';
import { useStatsStore } from '../state/statsStore';
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
  'from-[#7D927D]/80 to-[#6B826B]',
  'from-emerald-500/80 to-emerald-600',
  'from-green-500/80 to-green-600',
  'from-lime-500/80 to-lime-600',
  'from-yellow-500/80 to-yellow-600',
  'from-amber-500/80 to-amber-600',
  'from-orange-500/80 to-orange-600',
  'from-[#7D927D]/80 to-[#7D927D]',
  'from-accent-action/80 to-accent-action',
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
  const completedIdsProgress = useProgressStore((s) => s.completedQuestIds);
  const isUnlockedProgress = useProgressStore((s) => s.isQuestUnlocked);
  
  const questStoreCompletedIds = useQuestStore((s) => s.completedLevelIds);
  const questStoreIsUnlocked = useQuestStore((s) => s.isLevelUnlocked);
  const getLevelStars = useQuestStore((s) => s.getLevelStars);

  const levels = useMemo(() => {
    return BOOK_LEVELS.map((quest, idx) => {
      const completed = completedIdsProgress.includes(quest.id) || questStoreCompletedIds.includes(quest.id);
      const unlocked = isUnlockedProgress(quest.id) || questStoreIsUnlocked(quest.id);
      const stars = getLevelStars(quest.id);
      return { quest, idx, completed, unlocked, stars };
    });
  }, [completedIdsProgress, isUnlockedProgress, questStoreCompletedIds, questStoreIsUnlocked, getLevelStars]);

  const completedCount = levels.filter((l) => l.completed).length;
  const nextLevel = levels.find((l) => l.unlocked && !l.completed);

  const handlePlay = (questId: string) => {
    navigate(`/stories?quest=${questId}`);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-sans">
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-[#7D927D]/20 bg-gradient-to-br from-[#7D927D]/20 via-[#F9F7F2] to-[#7D927D]/20 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D927D]">
            El Viaje del Conocimiento
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-text-primary">
            Quest Journey
          </h1>
          <p className="mt-2 font-sans text-sm text-[#777775]">
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
            <button
              onClick={() => {
                useQuestStore.getState().unlockAllLevels();
                useProgressStore.getState().unlockAll();
                useStatsStore.getState().addRewards(500, 200);
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-mono text-[10px] uppercase font-bold tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer border-none"
            >
              ✦ Unlock All 24 Levels
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-[#777775]/20">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#7D927D] to-amber-400 transition-all duration-500"
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
          {levels.map(({ quest, idx, completed, unlocked, stars }) => (
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
              stars={stars}
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
  stars?: number;
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
          ? 'border-[#7D927D]/40 bg-[#7D927D]/5 hover:bg-[#7D927D]/10'
          : unlocked
          ? 'border-[#7D927D]/30 bg-white hover:border-[#7D927D]/40 hover:shadow-sm'
          : 'cursor-not-allowed border-[#7D927D]/10 bg-bg-base/50 opacity-50'
      }`}
    >
      {/* Gradient accent bar */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${completed ? 'from-[#7D927D] to-emerald-400' : color}`}
      />

      <div className="flex flex-1 flex-col p-4">
        {/* Level number + status */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
              completed
                ? 'bg-[#7D927D]/15 text-[#7D927D]'
                : unlocked
                ? 'bg-[#7D927D]/10 text-[#7D927D]'
                : 'bg-[#777775]/10 text-[#777775]'
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
              className="text-[#777775] transition-transform group-hover:translate-x-1"
            />
          )}
        </div>

        {/* Title */}
        <h3 className="mt-2 font-serif text-sm font-bold text-[#2F353B] leading-tight">
          {title.replace(`Level ${level}: `, '')}
        </h3>
        <p className="mt-1 font-sans text-[11px] text-[#777775] leading-snug">
          {subtitle}
        </p>

        {/* Vocab preview chips */}
        {unlocked && vocabCount > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-0.5 rounded-md bg-bg-base/5 px-1.5 py-0.5 text-[9px] text-[#777775]">
              📖 {vocabCount} words
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-bg-base/5 px-1.5 py-0.5 text-[9px] text-[#777775]">
              ✏️ {exerciseCount} exercises
            </span>
          </div>
        )}

        {/* Rewards */}
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-[#7D927D]/10">
          <span className="flex items-center gap-1 text-[10px] text-[#7D927D]">
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
        ? 'border-[#7D927D]/30 bg-[#7D927D]/10'
        : 'border-[#7D927D]/15 bg-bg-base/40'
    }`}
  >
    <span className={accent ? 'text-[#7D927D]' : 'text-[#777775]'}>{icon}</span>
    <div>
      <p className="font-mono text-xs font-bold leading-none text-text-primary">
        {value}
      </p>
      <p className="text-[9px] text-[#777775]">{label}</p>
    </div>
  </div>
);

export default QuestJourneyScreen;
