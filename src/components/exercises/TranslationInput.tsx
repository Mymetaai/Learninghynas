// STEP 8 — Translation exercise.
// Shows a source text and direction (es-en or en-es). User types the translation
// in a text input. Compares case-insensitively with trimmed whitespace.
import { useState, useRef, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';

interface TranslationInputProps {
  prompt: string;
  answer: string;
  direction?: 'es-en' | 'en-es';
  distractorPool?: string[];
  context?: string;
  onAnswer: (correct: boolean) => void;
}

const TranslationInput: FC<TranslationInputProps> = ({
  prompt,
  answer,
  direction = 'en-es',
  context,
  onAnswer,
}) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isCorrect = input.trim().toLowerCase() === answer.trim().toLowerCase();

  const handleSubmit = () => {
    if (submitted || !input.trim()) return;
    setSubmitted(true);
    onAnswer(isCorrect);
  };

  const directionLabel =
    direction === 'es-en' ? 'Spanish → English' : 'English → Spanish';

  return (
    <div>
      {context && (
        <p className="mb-2 font-body text-[10px] text-text-secondary">{context}</p>
      )}
      <p className="mb-1 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-accent-action">
        {directionLabel}
      </p>
      <p className="mb-4 font-display text-xl font-bold text-text-primary">{prompt}</p>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={submitted}
          placeholder="Type your translation…"
          className={`flex-1 rounded-xl border border-structural bg-bg-elevated px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:border-accent-action/60 ${
            submitted
              ? isCorrect
                ? 'border-success/60 text-success'
                : 'border-error/60 text-error'
              : ''
          }`}
        />
        {!submitted && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="rounded-xl bg-accent-action px-4 py-3 font-body text-sm font-bold text-bg-base transition-colors hover:bg-accent-action-hover border-none shadow-md cursor-pointer disabled:opacity-40"
          >
            →
          </motion.button>
        )}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 space-y-1"
        >
          {isCorrect ? (
            <p className="font-body text-sm text-success">✓ Correct!</p>
          ) : (
            <>
              <p className="font-body text-sm text-error">Not quite right.</p>
              <p className="font-body text-sm text-success">
                Correct answer: <span className="font-semibold">{answer}</span>
              </p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TranslationInput;
