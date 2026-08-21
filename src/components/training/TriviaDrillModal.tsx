import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Coins,
  ArrowRight,
  RotateCcw,
  X,
  Trophy,
  HelpCircle,
} from 'lucide-react';
import { fetchCulturalTrivia, type TriviaQuestion } from '../../services/triviaService';
import { useStatsStore } from '../../state/statsStore';
import { useDailyQuestStore } from '../../state/dailyQuestStore';
import Confetti from '../Confetti';

interface TriviaDrillModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function TriviaDrillModal({ isOpen = true, onClose, onComplete }: TriviaDrillModalProps) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fireConfetti, setFireConfetti] = useState(false);

  const addRewards = useStatsStore((s) => s.addRewards);
  const updateTaskProgress = useDailyQuestStore((s) => s.updateTaskProgress);

  const loadTrivia = useCallback(async () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setFireConfetti(false);

    try {
      const data = await fetchCulturalTrivia(5);
      setQuestions(data);
    } catch (err) {
      console.warn('Failed to load trivia drill:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadTrivia();
    }
  }, [isOpen, loadTrivia]);

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed drill!
      setIsFinished(true);
      setFireConfetti(true);

      // Award +20 XP and +10 Coins via statsStore
      addRewards(20, 10);

      // Dispatch daily quest progress
      updateTaskProgress('lesson_progress', 1);
      updateTaskProgress('vocab_review', 1);

      // Fire onComplete callback
      if (onComplete) {
        onComplete();
      }
    }
  };

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPct = totalQuestions > 0 ? ((currentIndex + (isAnswerSubmitted ? 1 : 0)) / totalQuestions) * 100 : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
        <Confetti fire={fireConfetti} count={120} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white dark:bg-bg-elevated border border-[#7D927D]/30 shadow-2xl rounded-3xl overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-structural/40 bg-[#7D927D]/5 dark:bg-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#7D927D]/15 border border-[#7D927D]/30 text-[#7D927D]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-text-primary">
                    Cultural Trivia Drill
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#7D927D]/15 text-[#5E735E] dark:text-[#A3B899] border border-[#7D927D]/30">
                    OpenTDB
                  </span>
                </div>
                <p className="text-xs text-text-secondary font-sans mt-0.5">
                  Hispanic Culture, Geography & History
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          {!isLoading && !isFinished && totalQuestions > 0 && (
            <div className="w-full bg-structural/20 h-1.5 overflow-hidden">
              <motion.div
                className="bg-[#7D927D] h-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {/* Body Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-3 border-[#7D927D]/30 border-t-[#7D927D] rounded-full animate-spin" />
                <p className="font-mono text-xs text-text-secondary">Loading trivia challenge...</p>
              </div>
            ) : isFinished ? (
              /* Completion Screen */
              <div className="py-4 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-[#7D927D]/15 border border-[#7D927D]/40 flex items-center justify-center text-[#7D927D] shadow-inner">
                  <Trophy className="w-10 h-10 text-[#7D927D]" />
                </div>

                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E735E] dark:text-[#A3B899]">
                    Drill Completed
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-primary mt-1">
                    ¡Excelente Trabajo!
                  </h3>
                  <p className="text-sm text-text-secondary font-sans mt-1 max-w-sm mx-auto">
                    You answered <strong className="text-text-primary">{score}</strong> out of{' '}
                    <strong className="text-text-primary">{totalQuestions}</strong> questions correctly (
                    {Math.round((score / totalQuestions) * 100)}% accuracy).
                  </p>
                </div>

                {/* Rewards Earned Box */}
                <div className="w-full bg-[#7D927D]/10 dark:bg-white/5 border border-[#7D927D]/30 rounded-2xl p-4 flex items-center justify-around">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono uppercase text-text-secondary font-bold">Reward</span>
                      <p className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">+20 XP</p>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-structural/40" />

                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono uppercase text-text-secondary font-bold">Bonus</span>
                      <p className="font-mono font-bold text-base text-emerald-600 dark:text-emerald-400">+10 KC</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full flex items-center gap-3 pt-2">
                  <button
                    onClick={loadTrivia}
                    className="flex-1 py-3 px-4 rounded-xl border border-structural/60 bg-bg-elevated hover:bg-bg-elevated-2 font-mono text-xs font-bold text-text-primary flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#7D927D]" />
                    <span>Play Again</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7D927D] hover:bg-[#6B826B] text-white font-mono text-xs font-bold transition-colors cursor-pointer border-none shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Finish Drill</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : currentQ ? (
              /* Active Question View */
              <div className="space-y-6">
                {/* Question Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-structural/20 text-text-secondary font-medium">
                      {currentQ.category}
                    </span>
                    <span className="font-bold text-[#5E735E] dark:text-[#A3B899]">
                      Question {currentIndex + 1} / {totalQuestions}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl font-bold text-text-primary leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQ.correctAnswer;

                    let buttonStyles =
                      'bg-bg-base/70 dark:bg-white/5 border-structural/50 text-text-primary hover:border-[#7D927D]/60 hover:bg-[#7D927D]/5';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        buttonStyles = 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        buttonStyles = 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 font-medium';
                      } else {
                        buttonStyles = 'opacity-40 border-structural/30 bg-bg-base/30 text-text-secondary';
                      }
                    } else if (isSelected) {
                      buttonStyles = 'border-[#7D927D] bg-[#7D927D]/15 text-[#5E735E] dark:text-[#A3B899] font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={`${currentQ.id}-opt-${idx}`}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full p-3.5 rounded-2xl border text-left font-sans text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${buttonStyles}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center bg-structural/20 shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-structural/40">
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary font-sans">
                    <HelpCircle className="w-4 h-4 text-[#7D927D]" />
                    <span>Select an option then confirm</span>
                  </div>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      className="px-5 py-2.5 rounded-xl bg-[#7D927D] hover:bg-[#6B826B] disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono text-xs font-bold transition-all cursor-pointer border-none shadow-xs flex items-center gap-1.5"
                    >
                      <span>Check Answer</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-[#7D927D] hover:bg-[#6B826B] text-white font-mono text-xs font-bold transition-all cursor-pointer border-none shadow-xs flex items-center gap-1.5"
                    >
                      <span>{currentIndex + 1 < totalQuestions ? 'Next Question' : 'See Results'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
