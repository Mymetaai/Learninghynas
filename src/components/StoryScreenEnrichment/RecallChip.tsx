import { useState, useMemo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface RecallChipProps {
  vocabulary: { word: string; meaning: string }[];
}

export const RecallChip: FC<RecallChipProps> = ({ vocabulary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Pick a random vocabulary item to test
  const testItem = useMemo(() => {
    if (!vocabulary || vocabulary.length === 0) return null;
    return vocabulary[Math.floor(Math.random() * vocabulary.length)];
  }, [vocabulary]);

  if (!testItem) return null;

  const handleCheck = (guess: string) => {
    setUserGuess(guess);
    const correct = guess.trim().toLowerCase() === testItem.word.toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);

    // Auto collapse after 2 seconds
    setTimeout(() => {
      setIsExpanded(false);
      setSubmitted(false);
      setUserGuess('');
    }, 2200);
  };

  return (
    <div className="my-4">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 font-mono text-xs text-[#7D927D] hover:text-[#5E735E] bg-[#7D927D]/10 hover:bg-[#7D927D]/20 border border-[#7D927D]/30 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Quick recall?</span>
            <Sparkles className="h-3 w-3 text-amber-500" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-[#7D927D]/30 bg-bg-elevated p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#7D927D] tracking-wider">
                Recall Challenge
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="font-mono text-xs text-text-tertiary hover:text-text-primary"
              >
                Skip ×
              </button>
            </div>

            <p className="font-sans text-xs text-text-primary">
              What is the Spanish word for <strong className="text-[#5E735E]">"{testItem.meaning}"</strong>?
            </p>

            {!submitted ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userGuess.trim()) handleCheck(userGuess);
                  }}
                  placeholder="Type word..."
                  className="bg-bg-base border border-structural rounded-xl px-3 py-1.5 font-sans text-xs text-text-primary focus:outline-none focus:border-[#7D927D] w-full"
                />
                <button
                  onClick={() => handleCheck(userGuess)}
                  disabled={!userGuess.trim()}
                  className="font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-[#7D927D] text-white hover:bg-[#6B826B] disabled:opacity-50 transition-all cursor-pointer shrink-0"
                >
                  Check
                </button>
              </div>
            ) : (
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 font-mono text-xs ${
                isCorrect
                  ? 'bg-[#7D927D]/15 border-[#7D927D]/40 text-[#5E735E]'
                  : 'bg-streak-warm/15 border-streak-warm/40 text-streak-warm'
              }`}>
                {isCorrect ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
                <span>
                  {isCorrect ? '¡Correcto!' : `Correct word: ${testItem.word}`}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
