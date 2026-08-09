import { useState, useRef, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Lightbulb,
  ArrowLeft,
  Shuffle,
} from 'lucide-react';
import { useDailyQuestStore } from '../state/dailyQuestStore';
import Confetti from './Confetti';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TokenRole = 'Subject' | 'Verb' | 'Object' | 'Place' | 'Time' | 'Other';

export interface Token {
  text: string;
  role: TokenRole;
  order: number;
}

export interface SentenceExercise {
  id: string;
  lessonId: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  spanishSentence: string;
  englishTranslation: string;
  tokens: Token[];
  pronounDroppedVariant?: string | null;
  notes?: string | null;
}

export interface SentenceBuilderExerciseProps {
  exercise: SentenceExercise;
  onCompleted: (correct: boolean, timeSpent: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showHints?: boolean;
  allowRetry?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLE_COLORS: Record<TokenRole, string> = {
  Subject: 'bg-sky-500/10 border-sky-500/30 text-sky-900',
  Verb: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900',
  Object: 'bg-purple-500/10 border-purple-500/30 text-purple-900',
  Place: 'bg-amber-500/10 border-amber-500/30 text-amber-900',
  Time: 'bg-rose-500/10 border-rose-500/30 text-rose-900',
  Other: 'bg-slate-500/10 border-slate-500/30 text-slate-900',
};

const ROLE_LABELS: Record<TokenRole, string> = {
  Subject: 'Sujeto',
  Verb: 'Verbo',
  Object: 'Objeto',
  Place: 'Lugar',
  Time: 'Tiempo',
  Other: 'Otro',
};

// ─── Component ────────────────────────────────────────────────────────────────

const SentenceBuilderExercise: FC<SentenceBuilderExerciseProps> = ({
  exercise,
  onCompleted,
  onNext,
  onPrevious,
  showHints = false,
  allowRetry = true,
}) => {
  // State
  const [shuffledTokens, setShuffledTokens] = useState<Token[]>([]);
  const [placedTokens, setPlacedTokens] = useState<Token[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [_showSolution, setShowSolution] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [timeStarted] = useState(Date.now());
  const [draggedToken, setDraggedToken] = useState<Token | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Initialize shuffled tokens on mount or exercise change
  useEffect(() => {
    const tokensCopy = [...exercise.tokens];
    // Shuffle using Fisher-Yates algorithm
    for (let i = tokensCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tokensCopy[i], tokensCopy[j]] = [tokensCopy[j], tokensCopy[i]];
    }
    setShuffledTokens(tokensCopy);
    setPlacedTokens([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowSolution(false);
    setFireConfetti(false);
  }, [exercise]);

  // ─── Event Handlers ────────────────────────────────────────────────────────

  const handleDragStart = (token: Token) => {
    setDraggedToken(token);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnSentence = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedToken || isSubmitted) return;

    // Add token to placed tokens in order
    setPlacedTokens((prev) => [...prev, draggedToken]);
    // Remove from shuffled
    setShuffledTokens((prev) => prev.filter((t) => t.order !== draggedToken.order));
    setDraggedToken(null);
  };

  const handleRemoveToken = (token: Token) => {
    if (isSubmitted) return;
    setPlacedTokens((prev) => prev.filter((t) => t.order !== token.order));
    setShuffledTokens((prev) => {
      const newTokens = [...prev, token];
      // Re-sort by original order to maintain consistent shuffling
      return newTokens;
    });
  };

  const handleShuffle = () => {
    if (isSubmitted) {
      // Reset for retry
      const tokensCopy = [...exercise.tokens];
      for (let i = tokensCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tokensCopy[i], tokensCopy[j]] = [tokensCopy[j], tokensCopy[i]];
      }
      setShuffledTokens(tokensCopy);
      setPlacedTokens([]);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowSolution(false);
      setFireConfetti(false);
    } else {
      // Shuffle remaining tokens
      setShuffledTokens((prev) => {
        const newTokens = [...prev];
        for (let i = newTokens.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newTokens[i], newTokens[j]] = [newTokens[j], newTokens[i]];
        }
        return newTokens;
      });
    }
  };

  const handleSubmit = () => {
    if (placedTokens.length !== exercise.tokens.length) return;

    // Check if order is correct
    const correctOrder = placedTokens.every(
      (token, index) => token.order === exercise.tokens[index].order
    );

    setIsCorrect(correctOrder);
    setIsSubmitted(true);

    if (correctOrder) {
      setFireConfetti(true);
      setTimeout(() => setFireConfetti(false), 3000);
      useDailyQuestStore.getState().updateTaskProgress('sentence_builder', 1);
    }

    const timeSpent = Date.now() - timeStarted;
    onCompleted(correctOrder, timeSpent);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setPlacedTokens([...exercise.tokens]);
    setShuffledTokens([]);
  };

  const handleReset = () => {
    const tokensCopy = [...exercise.tokens];
    for (let i = tokensCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tokensCopy[i], tokensCopy[j]] = [tokensCopy[j], tokensCopy[i]];
    }
    setShuffledTokens(tokensCopy);
    setPlacedTokens([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowSolution(false);
    setFireConfetti(false);
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  const allPlaced = placedTokens.length === exercise.tokens.length;

  return (
    <div className="space-y-6 relative">
      <Confetti fire={fireConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-primary">
            Sentence Builder Exercise
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            CEFR Level: {exercise.cefrLevel} • Lesson {exercise.lessonId}
          </p>
        </div>
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="p-2 rounded-xl bg-bg-elevated border border-structural text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* English Prompt */}
      <div className="bg-bg-elevated-2 border border-structural rounded-2xl p-5 shadow-sm">
        <p className="text-xs font-mono uppercase tracking-wider text-accent-action mb-2">
          Reconstruct this sentence in Spanish
        </p>
        <p className="text-lg font-semibold text-text-primary leading-relaxed">
          "{exercise.englishTranslation}"
        </p>
        {exercise.notes && (
          <p className="text-xs text-text-tertiary mt-2 italic">
            Note: {exercise.notes}
          </p>
        )}
      </div>

      {/* Pronoun Drop Variant (B2/C1) */}
      {exercise.pronounDroppedVariant && (
        <div className="bg-info/10 border border-info/30 rounded-2xl p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-info mb-1">
            Pronoun Drop Variant
          </p>
          <p className="text-sm text-text-primary italic">
            "{exercise.pronounDroppedVariant}"
          </p>
        </div>
      )}

      {/* Word Blocks Pool */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary">
            Available Word Blocks ({shuffledTokens.length})
          </p>
          <button
            onClick={handleShuffle}
            disabled={isSubmitted || shuffledTokens.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-structural bg-bg-elevated hover:bg-bg-elevated-2 text-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Shuffle className="h-3 w-3" />
            Shuffle
          </button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[48px] p-3 bg-bg-elevated-2 rounded-xl border border-dashed border-structural">
          {shuffledTokens.length === 0 && !isSubmitted && (
            <p className="text-xs text-text-tertiary italic">
              Drag all word blocks here to build the sentence
            </p>
          )}
          {shuffledTokens.map((token) => (
            <motion.div
              key={token.order}
              layoutId={`token-${exercise.id}-${token.order}`}
              draggable={!isSubmitted}
              onDragStart={() => handleDragStart(token)}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-sm cursor-grab transition-all hover:scale-105 ${
                ROLE_COLORS[token.role]
              }`}
            >
              {token.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Target Sentence Area */}
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDrop={handleDropOnSentence}
        className="min-h-[64px] p-4 bg-bg-elevated rounded-2xl border border-dashed border-structural transition-all"
      >
        <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          Your Sentence
        </p>
        <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
          {placedTokens.length === 0 && (
            <p className="text-xs text-text-tertiary italic">
              Drag word blocks here in the correct order
            </p>
          )}
          {placedTokens.map((token, index) => (
            <motion.div
              key={`${token.order}-${index}`}
              layoutId={`token-${exercise.id}-${token.order}`}
              className={`px-4 py-2.5 rounded-xl border font-semibold text-sm ${
                isSubmitted
                  ? token.order === exercise.tokens[index].order
                    ? 'bg-[#7D927D]/20 text-[#5E735E] border-[#7D927D]/50 font-bold shadow-xs'
                    : 'bg-[#C4796B]/20 text-[#C4796B] border-[#C4796B]/50 font-bold shadow-xs'
                  : `${ROLE_COLORS[token.role]} cursor-pointer`
              }`}
              onClick={() => handleRemoveToken(token)}
            >
              {token.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex gap-2">
          {!isSubmitted && showHints && (
            <button
              onClick={handleShowSolution}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-[#7D927D]/30 bg-[#7D927D]/10 text-[#7D927D] hover:bg-[#7D927D]/20 transition-colors cursor-pointer"
            >
              <Lightbulb className="h-3 w-3" />
              Show Solution
            </button>
          )}
          {isSubmitted && allowRetry && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-structural bg-bg-elevated hover:bg-bg-elevated-2 text-text-primary transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Try Again
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              disabled={!allPlaced}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                allPlaced
                  ? 'bg-[#7D927D] text-white hover:bg-[#6B826B] border border-[#7D927D] shadow-sm cursor-pointer'
                  : 'bg-bg-elevated border border-structural text-text-tertiary cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          )}
          {isSubmitted && onNext && (
            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-[#7D927D] text-white hover:bg-[#6B826B] border border-[#7D927D] shadow-sm transition-all cursor-pointer"
            >
              Next Exercise
            </button>
          )}
        </div>
      </div>

      {/* Feedback Panel */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-2xl p-6 border shadow-sm backdrop-blur-md transition-all ${
              isCorrect
                ? 'bg-[#7D927D]/12 border-[#7D927D]/40 text-text-primary'
                : 'bg-[#C4796B]/12 border-[#C4796B]/40 text-text-primary'
            }`}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-3 mb-4 border-b border-structural/30 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs ${
                    isCorrect
                      ? 'bg-[#7D927D] text-white border border-[#5E735E]'
                      : 'bg-[#C4796B] text-white border border-[#A8584A]'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      <span>Correct! Well done!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3.5 w-3.5 text-white" />
                      <span>Not quite right. Let&apos;s review.</span>
                    </>
                  )}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-text-tertiary">
                {exercise.cefrLevel} Pattern
              </span>
            </div>

            {/* Token Breakdown Grid */}
            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#5E735E]">
                Sentence Breakdown
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {exercise.tokens.map((token) => (
                  <div
                    key={token.order}
                    className={`p-3 rounded-xl border flex flex-col justify-between shadow-2xs transition-all ${
                      ROLE_COLORS[token.role]
                    }`}
                  >
                    <span className="font-bold text-sm leading-tight text-text-primary">
                      {token.text}
                    </span>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary mt-1.5">
                      {ROLE_LABELS[token.role]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Correct Sentence Display */}
            <div className="mt-4 pt-3.5 border-t border-structural/40">
              <p className="text-[11px] font-mono uppercase tracking-wider font-bold text-text-tertiary mb-1">
                Correct sentence:
              </p>
              <p className="font-serif text-lg font-bold text-text-primary">
                {exercise.spanishSentence}
              </p>
              <p className="font-sans text-xs text-text-secondary mt-0.5 font-medium">
                {exercise.englishTranslation}
              </p>
            </div>

            {!isCorrect && (
              <div className="mt-4 p-3.5 bg-bg-elevated-2/90 rounded-xl border border-structural/50 shadow-xs">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-bold">Tip:</strong> Remember the word order pattern:{' '}
                  {exercise.cefrLevel === 'A1'
                    ? 'Subject + Verb + Object'
                    : exercise.cefrLevel === 'A2'
                    ? 'Subject + Verb + Object + Place'
                    : exercise.cefrLevel === 'B1'
                    ? 'Subject + Verb + Object + Place + Time'
                    : 'Place before Time in Spanish!'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SentenceBuilderExercise;

// ─── Types for Integration ────────────────────────────────────────────────────

export interface SentenceExerciseData {
  id: string;
  lessonId: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  spanishSentence: string;
  englishTranslation: string;
  tokens: Token[];
  pronounDroppedVariant?: string | null;
  notes?: string | null;
}

// ─── Helper: Generate Token Roles ─────────────────────────────────────────────

export function generateTokenRoles(
  sentence: string,
  pattern: string
): Token[] {
  const words = sentence.split(' ');
  const roles = pattern.split(' + ');

  return words.map((word, index) => ({
    text: word,
    role: (roles[index] as TokenRole) || 'Other',
    order: index + 1,
  }));
}