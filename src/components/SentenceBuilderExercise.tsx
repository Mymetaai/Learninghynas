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
  Subject: 'bg-blue-500/10 border-blue-500/30 text-blue-800',
  Verb: 'bg-green-500/10 border-green-500/30 text-green-800',
  Object: 'bg-purple-500/10 border-purple-500/30 text-purple-800',
  Place: 'bg-orange-500/10 border-orange-500/30 text-orange-800',
  Time: 'bg-pink-500/10 border-pink-500/30 text-pink-800',
  Other: 'bg-gray-500/10 border-gray-500/30 text-gray-800',
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
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  const allPlaced = placedTokens.length === exercise.tokens.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-text-primary">
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
      <div className="bg-bg-elevated-2 border border-structural rounded-2xl p-5 shadow-md">
        <p className="text-xs font-hud uppercase tracking-wider text-accent-action mb-2">
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
          <p className="text-xs font-hud uppercase tracking-wider text-info mb-1">
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
          <p className="text-xs font-hud uppercase tracking-wider text-text-tertiary">
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

        <div className="flex flex-wrap gap-2 min-h-[48px] p-3 bg-bg-elevated-2 rounded-xl border-2 border-dashed border-structural">
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
        className="min-h-[64px] p-4 bg-bg-elevated rounded-2xl border-2 border-dashed border-structural transition-all"
      >
        <p className="text-xs font-hud uppercase tracking-wider text-text-tertiary mb-2">
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
                    ? 'bg-teal-500/20 border-teal-500/50 text-teal-800'
                    : 'bg-[#F5A991]/20 border-[#F5A991]/50 text-[#2C1E11]'
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-info/30 bg-info/10 text-info hover:bg-info/20 transition-colors cursor-pointer"
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
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 ${
                allPlaced
                  ? 'bg-[#F5A991] text-[#2C1E11] hover:bg-[#EAA088] border-2 border-[#2C1E11] shadow-[0_3px_0_#5C524E] cursor-pointer'
                  : 'bg-bg-elevated border border-structural text-text-tertiary cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          )}
          {isSubmitted && onNext && (
            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-[#F5A991] text-[#2C1E11] hover:bg-[#EAA088] border-2 border-[#2C1E11] shadow-[0_3px_0_#5C524E] transition-all cursor-pointer"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-2xl p-5 border ${
              isCorrect
                ? 'bg-teal-500/10 border-teal-500/30'
                : 'bg-[#F5A991]/10 border-[#F5A991]/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-[#F5A991] shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-bold text-sm mb-2">
                  {isCorrect
                    ? '✅ Correct! Well done!'
                    : '❌ Not quite right. Let\'s review.'}
                </p>

                {/* Token Breakdown */}
                <div className="space-y-2 mt-3">
                  <p className="text-xs font-hud uppercase tracking-wider text-text-tertiary">
                    Sentence Breakdown
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {exercise.tokens.map((token) => (
                      <div
                        key={token.order}
                        className={`p-2 rounded-lg border text-xs ${
                          ROLE_COLORS[token.role]
                        }`}
                      >
                        <span className="font-bold">{token.text}</span>
                        <span className="block text-[10px] text-text-tertiary">
                          {ROLE_LABELS[token.role]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Sentence */}
                <div className="mt-3 pt-3 border-t border-structural/50">
                  <p className="text-xs text-text-tertiary mb-1">
                    Correct sentence:
                  </p>
                  <p className="font-semibold text-sm text-text-primary">
                    {exercise.spanishSentence}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {exercise.englishTranslation}
                  </p>
                </div>

                {!isCorrect && (
                  <div className="mt-3 p-3 bg-bg-elevated-2 rounded-lg border border-structural">
                    <p className="text-xs text-text-secondary">
                      <strong>Tip:</strong> Remember the word order pattern:{' '}
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
              </div>
            </div>
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