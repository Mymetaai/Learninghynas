// Training Grounds — Practice Hub screen.
// Replaces the old placeholder with a functional 4-tile drill hub.
// Each tile launches a short practice session (5-10 items) and awards XP.
import { useState, useMemo, useCallback, type FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getQuest } from '../content';
import { useProgressStore } from '../state/progressStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  BookOpen,
  Headphones,
  Mic,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';
import { useTrainingStore } from '../state/trainingStore';
import { BOOK_LEVELS } from '../content';
import { COMPANION_DICTIONARY } from '../content/dictionary';
import type { Exercise } from '../content/types';
import ExerciseEngine from '../components/exercises/ExerciseEngine';
import UnifiedVocabTrainer from '../components/UnifiedVocabTrainer';
import AutoFlashcardsPlayer from '../components/AutoFlashcardsPlayer';

// ── Types ────────────────────────────────────────────────────────────────────

type DrillMode = 'weak-spots' | 'vocab-drill' | 'listening-reps' | 'speaking-reps' | 'quest' | 'flashcards';
type ScreenView = 'hub' | 'session';

interface SessionResult {
  correct: number;
  total: number;
  xp: number;
  coins: number;
  mode: DrillMode;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Shuffle an array (Fisher-Yates). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Collect all listening-type exercises from book levels. */
function getListeningExercises(): Exercise[] {
  return BOOK_LEVELS.flatMap((level) =>
    level.exercises.filter((ex) => ex.type === 'listening'),
  );
}

/** Generate review exercises from recorded mistakes. */
function generateWeakSpotExercises(
  mistakes: { word: string; correctAnswer: string }[],
): Exercise[] {
  const pool = shuffle(mistakes).slice(0, 8);
  return pool.map((m, i) => {
    // Build distractors from other mistake answers + dictionary words
    const otherAnswers = mistakes
      .filter((o) => o.correctAnswer !== m.correctAnswer)
      .map((o) => o.correctAnswer);
    const dictWords = Object.values(COMPANION_DICTIONARY).map((d) => d.meaning);
    const allDistractors = shuffle([...new Set([...otherAnswers, ...dictWords])]).filter(
      (d) => d !== m.correctAnswer,
    );
    const distractors = allDistractors.slice(0, 3);
    const options = shuffle([m.correctAnswer, ...distractors]);

    return {
      id: `weak-spot-${i}`,
      type: 'multiple-choice' as const,
      prompt: m.word,
      answer: m.correctAnswer,
      options,
      context: 'Review — you got this wrong before. Try again!',
    };
  });
}

/** Generate vocab flashcard exercises from learned vocabulary. */
function generateVocabExercises(
  learnedVocab: { word: string }[],
): Exercise[] {
  // Build word→meaning from dictionary
  const vocabWithMeaning = learnedVocab
    .map((v) => {
      const entry = COMPANION_DICTIONARY[v.word.toLowerCase()];
      return entry ? { word: v.word, meaning: entry.meaning } : null;
    })
    .filter(Boolean) as { word: string; meaning: string }[];

  if (vocabWithMeaning.length === 0) return [];

  const pool = shuffle(vocabWithMeaning).slice(0, 6);

  // Create match-pairs exercise (batches of 4)
  const exercises: Exercise[] = [];
  for (let i = 0; i < pool.length; i += 4) {
    const batch = pool.slice(i, i + 4);
    if (batch.length < 2) continue;

    const answer = batch.map((b) => `${b.word}↔${b.meaning}`).join('|');
    const options = [...batch.map((b) => b.word), ...shuffle(batch.map((b) => b.meaning))];

    exercises.push({
      id: `vocab-drill-${i}`,
      type: 'match',
      prompt: 'Match each word to its English meaning',
      answer,
      options,
      context: 'Vocabulary Review',
    });
  }

  // Also add some multiple-choice translation exercises
  const mcPool = shuffle(vocabWithMeaning).slice(0, 5);
  mcPool.forEach((item, idx) => {
    const otherMeanings = vocabWithMeaning
      .filter((v) => v.meaning !== item.meaning)
      .map((v) => v.meaning);
    const distractors = shuffle(otherMeanings).slice(0, 3);
    const options = shuffle([item.meaning, ...distractors]);

    exercises.push({
      id: `vocab-mc-${idx}`,
      type: 'multiple-choice',
      prompt: `What does "${item.word}" mean?`,
      answer: item.meaning,
      options,
      context: 'Vocabulary Review',
    });
  });

  return shuffle(exercises).slice(0, 8);
}

// ── Main Component ───────────────────────────────────────────────────────────

const PracticeScreen: FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const questId = params.get('quest');
  const quest = useMemo(() => (questId ? getQuest(questId) : null), [questId]);

  const [view, setView] = useState<ScreenView>(quest ? 'session' : 'hub');
  const [activeMode, setActiveMode] = useState<DrillMode | null>(quest ? 'quest' : null);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  // Data sources (existing stores)
  const learnedVocab = useStatsStore((s) => s.learnedVocab);
  const mistakes = useTrainingStore((s) => s.mistakes);
  const grantTrainingRewards = useTrainingStore((s) => s.grantTrainingRewards);
  const markReviewedCorrectly = useTrainingStore((s) => s.markReviewedCorrectly);

  // Derived data
  const mistakeCount = mistakes.length;
  const vocabCount = learnedVocab.length;
  const listeningExercises = useMemo(() => getListeningExercises(), []);
  const listeningCount = listeningExercises.length;

  // Session exercises — generated when a mode is activated
  const sessionExercises = useMemo<Exercise[]>(() => {
    if (quest) {
      return quest.exercises;
    }
    if (!activeMode) return [];
    switch (activeMode) {
      case 'weak-spots':
        return generateWeakSpotExercises(mistakes);
      case 'vocab-drill':
        return generateVocabExercises(learnedVocab);
      case 'listening-reps':
        return shuffle(listeningExercises).slice(0, 6);
      default:
        return [];
    }
  }, [activeMode, mistakes, learnedVocab, listeningExercises, quest]);

  const handleStartSession = useCallback((mode: DrillMode) => {
    setActiveMode(mode);
    setSessionResult(null);
    setView('session');
  }, []);

  const completeQuest = useProgressStore((s) => s.completeQuest);
  const grantQuestRewards = useStatsStore((s) => s.grantQuestRewards);
  const learnVocab = useStatsStore((s) => s.learnVocab);

  const handleSessionComplete = useCallback(
    (score: { correct: number; total: number }) => {
      if (quest && questId) {
        completeQuest(questId);
        grantQuestRewards(questId, quest.rewards.xp, quest.rewards.coins);
        const vocabWords = quest.vocabulary.map((v) => v.word);
        learnVocab(vocabWords, questId);

        setSessionResult({
          ...score,
          xp: quest.rewards.xp,
          coins: quest.rewards.coins,
          mode: 'quest',
        });
      } else {
        const { xp, coins } = grantTrainingRewards(score.correct, score.total);

        // For weak spots: mark correctly-answered items as reviewed
        if (activeMode === 'weak-spots') {
          mistakes.forEach((m) => {
            markReviewedCorrectly(m.word);
          });
        }

        setSessionResult({
          ...score,
          xp,
          coins,
          mode: activeMode!,
        });
      }
    },
    [activeMode, grantTrainingRewards, markReviewedCorrectly, mistakes, quest, questId, completeQuest, grantQuestRewards, learnVocab],
  );

  const handleBackToHub = useCallback(() => {
    if (quest) {
      navigate('/map');
    } else {
      setView('hub');
      setActiveMode(null);
      setSessionResult(null);
    }
  }, [quest, navigate]);

  // ── Session View ─────────────────────────────────────────────────────────

  if (view === 'session' && activeMode) {
    if (activeMode === 'flashcards') {
      return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
          <div className="mx-auto max-w-4xl">
            <AutoFlashcardsPlayer onBack={handleBackToHub} />
          </div>
        </div>
      );
    }

    // Session completion overlay
    if (sessionResult) {
      return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
          <div className="mx-auto max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="rounded-2xl border border-pencil/20 bg-paper/5 p-8 text-center shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-marigold/60 bg-marigold/10 text-3xl"
              >
                🎉
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-text-primary">
                {quest ? 'Quest Complete!' : 'Session Complete!'}
              </h2>
              <p className="mt-1 font-body text-sm text-pencil">
                {quest ? quest.title : TILE_CONFIG[sessionResult.mode].title}
              </p>

              <div className="mt-6 flex items-center justify-center gap-6">
                <div>
                  <p className="font-hud text-3xl font-semibold tabular-nums text-teal-deep">
                    {sessionResult.total > 0
                      ? Math.round((sessionResult.correct / sessionResult.total) * 100)
                      : 0}%
                  </p>
                  <p className="font-body text-xs text-pencil">accuracy</p>
                </div>
                <div className="h-8 w-px bg-pencil/20" />
                <div>
                  <p className="font-hud text-3xl font-semibold tabular-nums text-marigold">
                    +{sessionResult.xp}
                  </p>
                  <p className="font-body text-xs text-pencil">XP earned</p>
                </div>
                <div className="h-8 w-px bg-pencil/20" />
                <div>
                  <p className="font-hud text-3xl font-semibold tabular-nums text-marigold">
                    +{sessionResult.coins}
                  </p>
                  <p className="font-body text-xs text-pencil">coins</p>
                </div>
              </div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToHub}
                className="mt-6 w-full rounded-xl bg-terracotta px-4 py-3 font-display text-base font-semibold text-text-primary shadow-lg transition-colors hover:bg-terracotta/90 cursor-pointer"
              >
                {quest ? 'Back to Adventure Map' : 'Back to Training Grounds'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      );
    }

    // Active session — ExerciseEngine handles the flow
    if (sessionExercises.length === 0) {
      return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
          <div className="mx-auto max-w-lg text-center">
            <p className="font-body text-sm text-pencil mt-12">
              No exercises available for this session right now.
            </p>
            <button
              onClick={handleBackToHub}
              className="mt-4 font-hud text-xs text-terracotta hover:text-terracotta/80 cursor-pointer"
            >
              ← Back to Training Grounds
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
        {/* Back button */}
        <div className="mx-auto max-w-lg mb-4">
          <button
            onClick={handleBackToHub}
            className="flex items-center gap-1.5 font-hud text-[11px] text-pencil hover:text-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {quest ? 'Back to Adventure Map' : 'Back to Training Grounds'}
          </button>
          <h2 className="font-display text-lg font-bold text-text-primary mt-2">
            {TILE_CONFIG[activeMode].title}
          </h2>
        </div>

        <ExerciseEngine
          exercises={sessionExercises}
          questId={`training-${activeMode}`}
          questTitle={TILE_CONFIG[activeMode].title}
          onSessionComplete={handleSessionComplete}
          trackMistakes={activeMode !== 'weak-spots'} // Don't re-record mistakes during review
        />
      </div>
    );
  }

  // ── Hub View ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-marigold" />
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
              Training Grounds
            </p>
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Quick practice, whenever you need it 💪
          </h1>
          <p className="mt-2 font-body text-sm text-pencil">
            Short drills to sharpen your skills. Pick a mode and jump in — each session takes just a few minutes.
          </p>
        </div>

        {/* Interactive Training Area: Unified Flashcard & Fill-in-the-Blanks Trainer */}
        <div className="mb-12">
          <UnifiedVocabTrainer />
        </div>

        {/* Drill Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AnimatePresence>
            {/* 1. Auto Flashcards */}
            <DrillTile
              mode="flashcards"
              icon={<Sparkles className="h-6 w-6" />}
              iconColor="text-teal-deep"
              iconBg="bg-teal-deep/10 border-teal-deep/20"
              title="Auto Flashcards"
              subtitle="Hands-free auto-play vocabulary card deck player"
              ctaLabel="Start Flashcards"
              onStart={() => handleStartSession('flashcards')}
              index={0}
            />

            {/* 2. Weak Spots */}
            <DrillTile
              mode="weak-spots"
              icon={<Target className="h-6 w-6" />}
              iconColor="text-terracotta"
              iconBg="bg-terracotta/10 border-terracotta/20"
              title="Weak Spots"
              subtitle={
                mistakeCount > 0
                  ? `${mistakeCount} mistake${mistakeCount !== 1 ? 's' : ''} to review`
                  : undefined
              }
              emptyState="No mistakes yet — keep going! 🎯"
              ctaLabel="Start Review"
              disabled={mistakeCount === 0}
              onStart={() => handleStartSession('weak-spots')}
              index={1}
            />

            {/* 3. Vocab Drill */}
            <DrillTile
              mode="vocab-drill"
              icon={<BookOpen className="h-6 w-6" />}
              iconColor="text-teal-deep"
              iconBg="bg-teal-deep/10 border-teal-deep/20"
              title="Vocab Drill"
              subtitle={
                vocabCount > 0
                  ? `${vocabCount} word${vocabCount !== 1 ? 's' : ''} to practice`
                  : undefined
              }
              emptyState="Complete a lesson to unlock vocab drills ✨"
              ctaLabel="Drill Vocab"
              disabled={vocabCount === 0}
              onStart={() => handleStartSession('vocab-drill')}
              index={2}
            />

            {/* 4. Listening Reps */}
            <DrillTile
              mode="listening-reps"
              icon={<Headphones className="h-6 w-6" />}
              iconColor="text-marigold"
              iconBg="bg-marigold/10 border-marigold/20"
              title="Listening Reps"
              subtitle={
                listeningCount > 0
                  ? `${listeningCount} clip${listeningCount !== 1 ? 's' : ''} available`
                  : undefined
              }
              emptyState="Audio exercises loading…"
              ctaLabel="Start Listening"
              disabled={listeningCount === 0}
              onStart={() => handleStartSession('listening-reps')}
              index={3}
            />

            {/* 5. Speaking Reps — Coming Soon */}
            <DrillTile
              mode="speaking-reps"
              icon={<Mic className="h-6 w-6" />}
              iconColor="text-pencil"
              iconBg="bg-pencil/10 border-pencil/20"
              title="Speaking Reps"
              subtitle="Practice pronunciation"
              ctaLabel="Start Speaking"
              disabled
              comingSoon
              onStart={() => {}}
              index={4}
            />
          </AnimatePresence>
        </div>

        {/* Quick stats footer */}
        <div className="mt-8 flex items-center justify-center gap-6 font-hud text-[11px] text-pencil">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-deep" />
            {useTrainingStore.getState().trainingSessionsCompleted} sessions completed
          </span>
          <span className="h-3 w-px bg-pencil/30" />
          <span className="flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-terracotta" />
            {mistakeCount} active weak spots
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Tile Configuration ───────────────────────────────────────────────────────

const TILE_CONFIG: Record<DrillMode, { title: string }> = {
  'weak-spots': { title: 'Weak Spots Review' },
  'vocab-drill': { title: 'Vocabulary Drill' },
  'listening-reps': { title: 'Listening Reps' },
  'speaking-reps': { title: 'Speaking Reps' },
  'quest': { title: 'Quest Quiz' },
  'flashcards': { title: 'Auto Flashcards' },
};

// ── DrillTile Component ──────────────────────────────────────────────────────

interface DrillTileProps {
  mode: DrillMode;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle?: string;
  emptyState?: string;
  ctaLabel: string;
  disabled?: boolean;
  comingSoon?: boolean;
  onStart: () => void;
  index: number;
}

const DrillTile: FC<DrillTileProps> = ({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  emptyState,
  ctaLabel,
  disabled,
  comingSoon,
  onStart,
  index,
}) => {
  const hasData = !!subtitle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className={`relative bg-paper/5 border border-pencil/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between min-h-[220px] transition-all duration-200 group ${
        comingSoon ? 'opacity-70' : 'hover:border-pencil/40 hover:bg-paper/[0.07]'
      }`}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-3 right-3 bg-marigold/15 border border-marigold/30 text-marigold font-hud text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
          Coming Soon
        </div>
      )}

      {/* Icon + Title */}
      <div>
        <div
          className={`h-11 w-11 rounded-xl border ${iconBg} flex items-center justify-center ${iconColor} mb-3`}
        >
          {icon}
        </div>
        <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>

        {/* Subtitle / Empty State */}
        <p className="mt-1 font-body text-xs text-pencil min-h-[2em]">
          {hasData ? subtitle : emptyState ?? ''}
        </p>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onStart}
        disabled={disabled}
        className={`mt-4 w-full rounded-xl py-2.5 font-hud text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
          disabled
            ? 'bg-pencil/10 border border-pencil/20 text-pencil/50 cursor-not-allowed'
            : 'bg-terracotta/15 border border-terracotta/30 text-terracotta hover:bg-terracotta/25 hover:border-terracotta/50 active:scale-[0.98]'
        }`}
      >
        {ctaLabel}
      </button>
    </motion.div>
  );
};

export default PracticeScreen;
