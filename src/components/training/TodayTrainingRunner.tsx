import { useState, useMemo, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { assembleTodaySession, type SessionStep } from '../../lib/sessionDirector';
import { createMultipleChoiceOptions } from '../../lib/distractorGenerator';
import { useTrainingStore } from '../../state/trainingStore';
import { useStatsStore } from '../../state/statsStore';
import ExerciseEngine from '../exercises/ExerciseEngine';
import AutoFlashcardsPlayer from '../AutoFlashcardsPlayer';
import FeynmanDrill from '../FeynmanDrill';
import BeltRankStamp from './BeltRankStamp';
import Kitsune3D from '../Kitsune3D';
import type { Exercise } from '../../content/types';
import type { VocabItem } from '../../lib/vocabExpansionEngine';

interface TodayTrainingRunnerProps {
  onClose: () => void;
}

export const TodayTrainingRunner: FC<TodayTrainingRunnerProps> = ({ onClose }) => {
  const steps: SessionStep[] = useMemo(() => assembleTodaySession(), []);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chibiState, setChibiState] = useState<{ mode: 'idle' | 'wag'; message: string }>({
    mode: 'idle',
    message: "Let me guide you through today's workout!",
  });

  const isCompleted = currentStepIndex >= steps.length;
  const currentStep = steps[currentStepIndex];

  const handleNextStep = useCallback(() => {
    setChibiState({
      mode: 'wag',
      message: '¡Excelente! Step completed! Moving forward...',
    });
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
      setChibiState({
        mode: 'idle',
        message: 'Keep going! Master each step!',
      });
    }, 400);
  }, []);

  // ── Weak Spot Exercises ──────────────────────────────────────────────
  const weakSpotExercises: Exercise[] = useMemo(() => {
    if (currentStep?.type !== 'weakspot') return [];
    const items = currentStep.payload?.items || [];
    return items.map((m: any, i: number) => {
      const correct = m.correctAnswer || m.word;
      return {
        id: `weak-step-${i}`,
        type: 'multiple-choice',
        prompt: `Review Weak Spot: Select the correct Spanish term for "${m.word}"`,
        answer: correct,
        options: createMultipleChoiceOptions(correct),
        context: 'Weak Spot Quarantine',
      };
    });
  }, [currentStep]);

  const handleWeakSpotComplete = useCallback(() => {
    const items = currentStep?.payload?.items || [];
    items.forEach((item: any) => {
      if (item.word) {
        useTrainingStore.getState().markReviewedCorrectly(item.word);
      }
    });
    handleNextStep();
  }, [currentStep, handleNextStep]);

  // ── New Vocabulary Exercises (with mastery dispatch) ──────────────────
  const newVocabExercises: Exercise[] = useMemo(() => {
    if (currentStep?.type !== 'new_vocab') return [];
    const vocabItems: VocabItem[] = currentStep.payload?.vocabItems || [];
    return vocabItems.map((v, i) => ({
      id: `new-vocab-${i}`,
      type: 'multiple-choice',
      prompt: `New Word: Translate "${v.meaning}" to Spanish`,
      answer: v.word,
      options: createMultipleChoiceOptions(v.word),
      context: `${v.level} — ${v.category || 'Vocabulary'}`,
    }));
  }, [currentStep]);

  const handleNewVocabComplete = useCallback(() => {
    // Graduate all new vocab items: mark mastered, register in SRS, add to learnedVocab
    const vocabItems: VocabItem[] = currentStep?.payload?.vocabItems || [];
    const wordsToLearn: string[] = [];

    vocabItems.forEach((v) => {
      // 1. Mark in statsStore.learnVocab
      wordsToLearn.push(v.word);

      // 2. Register in FSRS spaced repetition
      useTrainingStore
        .getState()
        .getOrCreateSRSCard(v.id, v.word, v.meaning, v.level, v.category || 'General');

      // 3. Mark as mastered
      useTrainingStore.setState((s) => ({
        masteredWordIds: { ...s.masteredWordIds, [v.word.toLowerCase()]: true },
      }));
    });

    if (wordsToLearn.length > 0) {
      useStatsStore.getState().learnVocab(wordsToLearn, 'dojo-workout');
    }

    handleNextStep();
  }, [currentStep, handleNextStep]);

  // ── Grammar Blitz Exercises ──────────────────────────────────────────
  const grammarExercises: Exercise[] = useMemo(() => {
    if (currentStep?.type !== 'grammar_blitz') return [];
    const lesson = currentStep.payload?.lesson;
    const vocab = lesson?.vocabularyTable || [];
    if (vocab.length > 0) {
      return vocab.slice(0, 4).map((v: any, i: number) => {
        const correct = v.spanish;
        return {
          id: `grammar-step-${i}`,
          type: 'multiple-choice',
          prompt: `Lesson ${lesson.lessonNumber}: Translate "${v.english}" to Spanish`,
          answer: correct,
          options: createMultipleChoiceOptions(correct),
          context: lesson.title,
        };
      });
    }
    return [
      {
        id: 'grammar-fallback',
        type: 'multiple-choice',
        prompt: 'Select the correct conjugation of SER for "Nosotros":',
        answer: 'somos',
        options: createMultipleChoiceOptions('somos'),
        context: 'Grammar Blitz',
      },
    ];
  }, [currentStep]);

  // ── Completion ───────────────────────────────────────────────────────
  if (isCompleted) {
    return <BeltRankStamp onDone={onClose} />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg-base text-text-primary px-4 py-6 relative z-20">
      {/* Top Bar & Progress Rail */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-bg-elevated border border-structural/60 font-mono text-xs font-bold text-text-secondary hover:text-text-primary hover:border-accent-action shadow-xs transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
            <span>Exit Workout</span>
          </button>

          {/* Persistent Chibi Reaction Viewport */}
          <div className="flex items-center gap-3 bg-white/80 dark:bg-bg-elevated/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-[#7D927D]/30 shadow-xs">
            <div className="w-10 h-10 relative shrink-0">
              <Kitsune3D direction="right" mode={chibiState.mode} />
            </div>
            <p className="font-sans text-xs font-semibold text-text-primary hidden sm:block">
              {chibiState.message}
            </p>
          </div>
        </div>

        {/* Step Progress Rail */}
        <div className="bg-white/70 dark:bg-bg-elevated/70 backdrop-blur-md p-4 rounded-2xl border border-[#7D927D]/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#5E735E] uppercase tracking-wider">
              Step {currentStepIndex + 1} of {steps.length}: {currentStep.title}
            </span>
            <span className="font-mono text-xs text-text-tertiary">
              {currentStep.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {steps.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <div
                  key={step.id}
                  className="flex-1 h-2.5 rounded-full overflow-hidden relative bg-structural/30"
                >
                  {(isActive || isPast) && (
                    <motion.div
                      layoutId="dojoStep"
                      className={`h-full rounded-full ${
                        isPast ? 'bg-[#7D927D]' : 'bg-gradient-to-r from-[#7D927D] to-amber-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Viewport */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* WEAK SPOTS */}
            {currentStep.type === 'weakspot' && (
              <div>
                {weakSpotExercises.length > 0 ? (
                  <ExerciseEngine
                    exercises={weakSpotExercises}
                    questId="workout-weakspot"
                    questTitle={currentStep.title}
                    onSessionComplete={handleWeakSpotComplete}
                    trackMistakes={false}
                  />
                ) : (
                  <EmptyStepCard onContinue={handleNextStep} message="No active weak spots found!" />
                )}
              </div>
            )}

            {/* SRS FLASHCARDS */}
            {currentStep.type === 'srs_flashcards' && (
              <div>
                <AutoFlashcardsPlayer onBack={handleNextStep} />
              </div>
            )}

            {/* NEW VOCABULARY DRILL */}
            {currentStep.type === 'new_vocab' && (
              <div>
                {newVocabExercises.length > 0 ? (
                  <ExerciseEngine
                    exercises={newVocabExercises}
                    questId="workout-new-vocab"
                    questTitle={currentStep.title}
                    onSessionComplete={handleNewVocabComplete}
                    trackMistakes={true}
                  />
                ) : (
                  <EmptyStepCard onContinue={handleNextStep} message="All vocabulary mastered for your level! 🎉" />
                )}
              </div>
            )}

            {/* GRAMMAR BLITZ */}
            {currentStep.type === 'grammar_blitz' && (
              <div>
                <ExerciseEngine
                  exercises={grammarExercises}
                  questId="workout-grammar"
                  questTitle={currentStep.title}
                  onSessionComplete={handleNextStep}
                  trackMistakes={true}
                />
              </div>
            )}

            {/* FEYNMAN CHECKPOINT */}
            {currentStep.type === 'feynman_checkpoint' && (
              <div>
                <FeynmanDrill onComplete={handleNextStep} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/** Small reusable empty-state card for steps with no content. */
const EmptyStepCard: FC<{ message: string; onContinue: () => void }> = ({ message, onContinue }) => (
  <div className="p-8 text-center bg-white dark:bg-bg-elevated rounded-3xl border border-structural/40">
    <p className="font-sans text-sm text-text-secondary mb-4">{message}</p>
    <button
      onClick={onContinue}
      className="px-6 py-2.5 rounded-xl bg-[#7D927D] text-white font-mono text-xs font-bold cursor-pointer border-none"
    >
      Continue to Next Step ➔
    </button>
  </div>
);

export default TodayTrainingRunner;
