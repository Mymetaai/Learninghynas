// Daily Quest Dashboard — 5 date-seeded micro-quests that shuffle daily.
// Each micro-quest is a short 3-exercise set drawn from the book levels.
// Score is tracked, points auto-granted to the stats store, and confetti
// fires when a micro-quest (or all 5) is completed.
import { useMemo, useState, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Flame,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Trophy,
  Sparkles,
  Zap,
  Coins,
  Star,
} from 'lucide-react';
import { useDailyQuestStore } from '../state/dailyQuestStore';
import type { MicroQuest } from '../state/dailyQuestStore';
import { useStatsStore } from '../state/statsStore';
import type { Exercise } from '../content/types';
import ExerciseCard from '../components/exercises/ExerciseCard';
import Confetti from '../components/Confetti';

const DailyQuestScreen: FC = () => {
  const getTodaysMicroQuests = useDailyQuestStore((s) => s.getTodaysMicroQuests);
  const isMicroQuestDone = useDailyQuestStore((s) => s.isMicroQuestDone);
  const completeMicroQuest = useDailyQuestStore((s) => s.completeMicroQuest);
  const dailyBonusClaimed = useDailyQuestStore((s) => s.dailyBonusClaimed);
  const totalCorrect = useDailyQuestStore((s) => s.totalCorrect);
  const totalAnswered = useDailyQuestStore((s) => s.totalAnswered);
  const { streak, coins } = useStatsStore();

  // Resolve today's micro-quests once.
  const microQuests = useMemo(() => getTodaysMicroQuests(), [getTodaysMicroQuests]);

  // Which micro-quest is currently being played (null = list view).
  const [activeQuest, setActiveQuest] = useState<MicroQuest | null>(null);

  // Confetti trigger
  const [confetti, setConfetti] = useState(false);

  const doneCount = microQuests.filter((q) => isMicroQuestDone(q.id)).length;
  const allDone = doneCount === microQuests.length;

  const accuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const handleQuestComplete = useCallback(
    (microQuest: MicroQuest, correct: number, total: number) => {
      completeMicroQuest(microQuest.id, correct, total);
      setConfetti(true);
      // Confetti auto-resets via its onDone callback; also clear after a beat.
      window.setTimeout(() => setConfetti(false), 2700);
      window.setTimeout(() => setActiveQuest(null), 2900);
    },
    [completeMicroQuest],
  );

  // ── Active play view ────────────────────────────────────────────────────
  if (activeQuest) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
        <Confetti fire={confetti} />
        <div className="mx-auto max-w-lg">
          <MicroQuestPlayer
            microQuest={activeQuest}
            alreadyDone={isMicroQuestDone(activeQuest.id)}
            onComplete={handleQuestComplete}
            onExit={() => setActiveQuest(null)}
          />
        </div>
      </div>
    );
  }

  // ── Dashboard list view ─────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary font-body">
      <Confetti fire={confetti} />

      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-structural bg-gradient-to-br from-accent-action/10 via-bg-base to-streak-warm/10 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-accent-action" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-accent-action font-semibold">
              Misión Diaria
            </p>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold text-text-primary">
            Today's Quest
          </h1>
          <p className="mt-2 font-body text-sm text-text-secondary">
            5 fresh micro-quests shuffle in every day. Complete them all for a
            bonus, and watch your score climb.
          </p>

          {/* Live stats */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <DashStat
              icon={<Flame size={14} className="text-streak-warm animate-pulse" />}
              label="Streak"
              value={`${streak}`}
            />
            <DashStat
              icon={<Star size={14} className="text-accent-action" />}
              label="Done"
              value={`${doneCount}/${microQuests.length}`}
            />
            <DashStat
              icon={<Zap size={14} className="text-accent-action" />}
              label="Accuracy"
              value={`${accuracy}%`}
            />
            <DashStat
              icon={<Coins size={14} className="text-accent-action" />}
              label="Coins"
              value={`${coins}`}
            />
          </div>

          {/* Daily progress bar */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary">
                Daily progress
              </span>
              <span className="font-body text-[10px] text-accent-action font-semibold">
                {Math.round((doneCount / microQuests.length) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-structural">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-accent-action to-streak-warm"
                initial={{ width: 0 }}
                animate={{
                  width: `${(doneCount / microQuests.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Micro-quest list */}
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="space-y-3">
          {microQuests.map((mq, idx) => {
            const done = isMicroQuestDone(mq.id);
            // Unlock rule: must complete the previous one first.
            const prevId = idx > 0 ? microQuests[idx - 1].id : null;
            const unlocked =
              idx === 0 || (prevId ? isMicroQuestDone(prevId) : false);
            return (
              <MicroQuestRow
                key={mq.id}
                microQuest={mq}
                index={idx}
                done={done}
                unlocked={unlocked}
                onPlay={() => setActiveQuest(mq)}
              />
            );
          })}
        </div>

        {/* Daily bonus banner */}
        <div className="mt-6">
          {allDone && dailyBonusClaimed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-teal-deep/40 bg-teal-deep/10 p-4 text-center"
            >
              <Trophy size={20} className="mx-auto mb-1 text-teal-deep" />
              <p className="font-display text-sm font-bold text-teal-deep">
                Daily bonus claimed! +75 XP, +30 coins
              </p>
              <p className="font-body text-xs text-pencil">
                Come back tomorrow for 5 fresh micro-quests.
              </p>
            </motion.div>
          ) : (
            <div className="rounded-xl border border-dashed border-pencil/25 bg-paper/5 p-4 text-center">
              <Sparkles size={16} className="mx-auto mb-1 text-amber-400" />
              <p className="font-body text-xs text-pencil">
                Complete all {microQuests.length} micro-quests to auto-claim the
                daily bonus (+75 XP, +30 coins).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Micro-quest row (list item) ─────────────────────────────────────────── */

interface MicroQuestRowProps {
  microQuest: MicroQuest;
  index: number;
  done: boolean;
  unlocked: boolean;
  onPlay: () => void;
}

const MicroQuestRow: FC<MicroQuestRowProps> = ({
  microQuest,
  index,
  done,
  unlocked,
  onPlay,
}) => {
  return (
    <motion.button
      type="button"
      disabled={!unlocked}
      onClick={onPlay}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={unlocked ? { scale: 1.01 } : undefined}
      whileTap={unlocked ? { scale: 0.99 } : undefined}
      className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
        done
          ? 'border-success/30 bg-success/10'
          : unlocked
            ? 'border-structural bg-bg-elevated hover:border-accent-action/40 hover:bg-bg-elevated-2'
            : 'cursor-not-allowed border-structural/50 bg-bg-base/40 opacity-50'
      }`}
    >
      {/* Status badge */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
          done
            ? 'border-success/30 bg-success/20 text-success'
            : unlocked
              ? 'border-accent-action/30 bg-accent-action/10 text-accent-action'
              : 'border-structural bg-bg-base/50 text-text-tertiary'
        }`}
      >
        {done ? (
          <CheckCircle2 size={18} />
        ) : unlocked ? (
          <span className="font-body text-sm font-bold">{index + 1}</span>
        ) : (
          <Lock size={16} />
        )}
      </div>

      {/* Title + meta */}
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold text-text-primary leading-tight">
          {microQuest.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 font-body text-[11px] text-text-secondary">
          <span>📘 Level {microQuest.sourceLevel}</span>
          <span>·</span>
          <span>✏️ {microQuest.exercises.length} quick questions</span>
          <span>·</span>
          <span className="text-accent-action font-semibold">⚡ up to 40 XP</span>
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0">
        {done ? (
          <span className="font-body text-[10px] uppercase tracking-wider text-success font-bold">
            Done
          </span>
        ) : unlocked ? (
          <span className="font-body text-xs font-bold text-accent-action group-hover:translate-x-0.5 transition-transform">
            Play →
          </span>
        ) : null}
      </div>
    </motion.button>
  );
};

/* ── Inline micro-quest player ───────────────────────────────────────────── */

interface MicroQuestPlayerProps {
  microQuest: MicroQuest;
  alreadyDone: boolean;
  onComplete: (mq: MicroQuest, correct: number, total: number) => void;
  onExit: () => void;
}

const MicroQuestPlayer: FC<MicroQuestPlayerProps> = ({
  microQuest,
  alreadyDone,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const exercises = microQuest.exercises;
  const currentExercise: Exercise | undefined = exercises[currentIndex];
  const progress = (currentIndex / exercises.length) * 100;

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const nextScore = {
        correct: score.correct + (correct ? 1 : 0),
        total: score.total + 1,
      };
      setScore(nextScore);

      if (currentIndex < exercises.length - 1) {
        window.setTimeout(() => {
          setCurrentIndex((i) => i + 1);
          setRenderKey((k) => k + 1);
        }, 800);
      } else {
        window.setTimeout(() => {
          setFinished(true);
          if (!alreadyDone) onComplete(microQuest, nextScore.correct, nextScore.total);
        }, 800);
      }
    },
    [currentIndex, exercises.length, score, alreadyDone, microQuest, onComplete],
  );

  // ── Results view ────────────────────────────────────────────────────────
  if (finished) {
    const pct =
      score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const passed = pct >= 60;
    const earnedXp = Math.round(15 + (score.correct / Math.max(1, score.total)) * 25);
    const earnedCoins = Math.round(3 + (score.correct / Math.max(1, score.total)) * 7);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="rounded-2xl border border-structural bg-bg-elevated p-8 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 12 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-action/30 bg-accent-action/10 text-3xl"
        >
          🎉
        </motion.div>

        <h2 className="font-display text-2xl font-bold text-text-primary">
          {passed ? '¡Excelente!' : '¡Buen trabajo!'}
        </h2>
        <p className="mt-1 font-body text-sm text-text-secondary">{microQuest.title}</p>

        {/* Score */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div>
            <p
              className={`font-body text-3xl font-bold tabular-nums ${
                passed ? 'text-success' : 'text-error'
              }`}
            >
              {pct}%
            </p>
            <p className="font-body text-xs text-text-secondary">accuracy</p>
          </div>
          <div className="h-8 w-px bg-structural" />
          <div>
            <p className="font-body text-3xl font-bold tabular-nums text-accent-action">
              {score.correct}
            </p>
            <p className="font-body text-xs text-text-secondary">
              of {score.total} correct
            </p>
          </div>
        </div>

        {/* Points earned */}
        {alreadyDone ? (
          <p className="mt-5 font-body text-xs italic text-text-secondary">
            Already completed today — no extra points, but nice practice!
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 flex items-center justify-center gap-4 rounded-xl border border-accent-action/20 bg-accent-action/10 py-2"
          >
            <span className="flex items-center gap-1 font-body text-sm text-accent-action font-semibold">
              <Zap size={14} /> +{earnedXp} XP
            </span>
            <span className="flex items-center gap-1 font-body text-sm text-accent-action font-semibold">
              <Coins size={14} /> +{earnedCoins}
            </span>
          </motion.div>
        )}

        <button
          type="button"
          onClick={onExit}
          className="mt-6 w-full rounded-xl bg-accent-action hover:bg-accent-action-hover px-4 py-3 font-display text-base font-semibold text-bg-base border-none shadow-md cursor-pointer transition-all duration-200"
        >
          Back to Today's Quest
        </button>
      </motion.div>
    );
  }

  // ── Exercise view ───────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1 font-body text-xs text-text-secondary transition-colors hover:text-text-primary bg-transparent border-none p-0 cursor-pointer"
        >
          <ChevronLeft size={14} /> Today's Quest
        </button>
        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-text-secondary">
          Micro-quest · Lvl {microQuest.sourceLevel}
        </p>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold text-text-primary">
            {microQuest.title}
          </p>
          <p className="font-body text-[10px] text-success font-bold">
            {score.correct}✓
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-text-secondary">
            Question {currentIndex + 1} of {exercises.length}
          </p>
        </div>
        <div className="mt-1 h-1 rounded-full bg-structural">
          <motion.div
            className="h-1 rounded-full bg-accent-action"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Exercise card */}
      <AnimatePresence mode="wait">
        {currentExercise && (
          <ExerciseCard
            key={renderKey}
            exercise={currentExercise}
            index={currentIndex + 1}
            total={exercises.length}
            onAnswer={handleAnswer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Small stat tile ─────────────────────────────────────────────────────── */

interface DashStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DashStat: FC<DashStatProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 rounded-lg border border-pencil/15 bg-bg-base/40 px-3 py-2">
    {icon}
    <div>
      <p className="font-hud text-base font-bold leading-none text-text-primary tabular-nums">
        {value}
      </p>
      <p className="text-[9px] uppercase tracking-wide text-pencil">{label}</p>
    </div>
  </div>
);

export default DailyQuestScreen;
