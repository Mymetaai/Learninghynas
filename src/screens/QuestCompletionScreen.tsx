// STEP 9 — Quest Completion screen.
// The signature full-screen moment after finishing exercises. A wax-seal
// stamp drops in, XP/coins counters animate up, and new vocabulary fades in
// one by one. On mount, marks the quest complete and grants rewards.
import { useEffect, useMemo, useState, type FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getQuest } from '../content';
import { useProgressStore } from '../state/progressStore';
import { useStatsStore } from '../state/statsStore';
import ScreenPlaceholder from '../components/ScreenPlaceholder';

const QuestCompletionScreen: FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const questId = params.get('quest') ?? '';
  const quest = useMemo(() => getQuest(questId), [questId]);

  const completeQuest = useProgressStore((s) => s.completeQuest);
  const grantQuestRewards = useStatsStore((s) => s.grantQuestRewards);
  const learnVocab = useStatsStore((s) => s.learnVocab);

  // Grant rewards + mark complete exactly once on mount.
  useEffect(() => {
    if (!quest) return;
    completeQuest(questId);
    grantQuestRewards(questId, quest.rewards.xp, quest.rewards.coins);
    learnVocab(
      quest.vocabulary.map((v) => v.word),
      questId,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questId]);

  if (!quest) {
    return (
      <ScreenPlaceholder
        title="Quest Completion"
        builtIn="Step 9"
        description="Finish a quest's exercises to see the completion celebration."
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
      <div className="mx-auto max-w-lg">
        {/* Wax-seal stamp — drops from top */}
        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ y: -120, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            className="relative flex h-24 w-24 items-center justify-center"
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-terracotta bg-terracotta/20" />
            {/* Inner circle */}
            <div className="absolute inset-2 rounded-full border-2 border-marigold bg-terracotta" />
            {/* Seal mark */}
            <span className="relative font-display text-4xl text-marigold">✓</span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-marigold">
            Quest Complete
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-text-primary">
            {quest.title}
          </h1>
        </motion.div>

        {/* Rewards — animated counters */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 20 }}
          className="mt-8 flex items-center justify-center gap-8 rounded-xl border border-pencil/20 bg-paper/5 p-6"
        >
          <Counter
            icon="✨"
            value={quest.rewards.xp}
            label="XP Earned"
            color="text-marigold"
            delay={0.6}
          />
          <div className="h-12 w-px bg-pencil/20" />
          <Counter
            icon="🪙"
            value={quest.rewards.coins}
            label="Coins"
            color="text-marigold"
            delay={0.8}
          />
        </motion.div>

        {/* New vocabulary — staggered fade in */}
        {quest.vocabulary.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8"
          >
            <p className="mb-3 text-center font-hud text-[10px] uppercase tracking-[0.25em] text-pencil">
              {quest.vocabulary.length} New Words Learned
            </p>
            <div className="space-y-2">
              {quest.vocabulary.map((vocab, i) => (
                <motion.div
                  key={vocab.word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-lg border border-pencil/20 bg-paper/5 p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marigold/20 font-display text-sm text-marigold">
                    {vocab.word.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-text-primary">
                      {vocab.word}
                    </p>
                    <p className="font-body text-xs text-pencil">{vocab.meaning}</p>
                  </div>
                  <p className="font-hud text-[10px] text-terracotta">
                    {vocab.pronunciation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Continue button */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 + quest.vocabulary.length * 0.08 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/map')}
          className="mt-8 w-full rounded-xl bg-terracotta px-4 py-3 font-display text-base font-semibold text-text-primary shadow-lg transition-colors hover:bg-terracotta/90"
        >
          Continue to Map →
        </motion.button>
      </div>
    </div>
  );
};

/** Animated counter that ticks up from 0 to the target value. */
interface CounterProps {
  icon: string;
  value: number;
  label: string;
  color: string;
  delay: number;
}

const Counter: FC<CounterProps> = ({ icon, value, label, color, delay }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 800; // ms
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(interval);
        } else {
          setDisplay(Math.round(current));
        }
      }, duration / steps);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <span className={`font-hud text-3xl font-bold tabular-nums ${color}`}>
        +{display}
      </span>
      <span className="font-body text-[10px] text-pencil">{label}</span>
    </div>
  );
};

export default QuestCompletionScreen;
