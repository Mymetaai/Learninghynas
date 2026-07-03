// STEP 8 — Exercise Engine orchestrator.
// Manages the sequence of exercises for a quest, tracks score, and shows a
// results summary when all exercises are done. Navigates to quest-complete
// on finish (or calls onSessionComplete for training sessions).
import { useState, useCallback, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Exercise } from '../../content/types';
import { useTrainingStore } from '../../state/trainingStore';
import ExerciseCard from './ExerciseCard';

interface ExerciseEngineProps {
  exercises: Exercise[];
  questId: string;
  questTitle: string;
  /** If set, called on session completion instead of navigating to quest-complete. */
  onSessionComplete?: (score: { correct: number; total: number }) => void;
  /** If set, the "Continue" button navigates here instead of quest-complete. */
  returnPath?: string;
  /** If true, records wrong answers to the training store for Weak Spots review. */
  trackMistakes?: boolean;
}

const ExerciseEngine: FC<ExerciseEngineProps> = ({
  exercises,
  questId,
  questTitle,
  onSessionComplete,
  returnPath,
  trackMistakes = true,
}) => {
  const navigate = useNavigate();
  const recordMistake = useTrainingStore((s) => s.recordMistake);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const [currentKey, setCurrentKey] = useState(0); // forces re-render on next exercise

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex) / exercises.length) * 100;

  const handleAnswer = useCallback((correct: boolean) => {
    const exercise = exercises[currentIndex];

    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    // Record wrong answers for Weak Spots review
    if (!correct && trackMistakes && exercise) {
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      recordMistake({
        word: exercise.prompt,
        correctAnswer: exercise.answer,
        wrongAnswer: '', // We don't have the exact wrong answer from ExerciseCard
        exerciseType: exercise.type,
        date: dateStr,
      });
    }

    // Move to next exercise after a brief delay (ExerciseCard also has a delay)
    if (currentIndex < exercises.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setCurrentKey((prev) => prev + 1);
      }, 800);
    } else {
      setTimeout(() => {
        const finalScore = {
          correct: score.correct + (correct ? 1 : 0),
          total: score.total + 1,
        };
        if (onSessionComplete) {
          onSessionComplete(finalScore);
        }
        setFinished(true);
      }, 800);
    }
  }, [currentIndex, exercises, score, trackMistakes, recordMistake, onSessionComplete]);

  const handleFinish = () => {
    if (returnPath) {
      navigate(returnPath);
    } else {
      navigate(`/quest-complete?quest=${questId}`);
    }
  };

  // Results summary screen
  if (finished) {
    const percentage = Math.round((score.correct / score.total) * 100);
    const passed = percentage >= 70; // 70% threshold

    return (
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="rounded-xl border border-pencil/20 bg-paper p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 text-3xl"
            style={{
              borderColor: passed ? 'var(--tw-colors-teal-deep)' : 'var(--tw-colors-terracotta)',
              backgroundColor: passed ? 'rgba(28,92,92,0.1)' : 'rgba(193,80,46,0.1)',
            }}
          >
            {passed ? '🎉' : '💪'}
          </motion.div>

          <h2 className="font-display text-2xl font-bold text-ink">
            {passed ? 'Well Done!' : 'Keep Practicing!'}
          </h2>
          <p className="mt-1 font-body text-sm text-pencil">{questTitle}</p>

          {/* Score */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div>
              <p
                className={`font-hud text-3xl font-semibold tabular-nums ${
                  passed ? 'text-teal-deep' : 'text-terracotta'
                }`}
              >
                {percentage}%
              </p>
              <p className="font-body text-xs text-pencil">accuracy</p>
            </div>
            <div className="h-8 w-px bg-pencil/20" />
            <div>
              <p className="font-hud text-3xl font-semibold tabular-nums text-marigold">
                {score.correct}
              </p>
              <p className="font-body text-xs text-pencil">
                of {score.total} correct
              </p>
            </div>
          </div>

          {/* Continue */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFinish}
            className="mt-6 w-full rounded-xl bg-terracotta px-4 py-3 font-display text-base font-semibold text-paper shadow-lg transition-colors hover:bg-terracotta/90"
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="font-hud text-[10px] uppercase tracking-[0.25em] text-pencil">
            Exercise {currentIndex + 1} of {exercises.length}
          </p>
          <p className="font-hud text-[10px] text-marigold">
            {score.correct}✓
          </p>
        </div>
        <div className="mt-1 h-1 rounded-full bg-pencil/20">
          <motion.div
            className="h-1 rounded-full bg-terracotta"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Current exercise */}
      {currentExercise && (
        <ExerciseCard
          key={currentKey}
          exercise={currentExercise}
          index={currentIndex + 1}
          total={exercises.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default ExerciseEngine;
