// STEP 8 — Listening exercise.
// Shows a pronunciation guide (simulated audio — real audio comes later) and
// asks the user to pick the correct word from options. Uses the `context`
// field for an additional hint.
import { useState, useMemo, type FC } from 'react';
import { motion } from 'framer-motion';

interface ListeningExerciseProps {
  prompt: string;
  options: string[];
  answer: string;
  context?: string;
  onAnswer: (correct: boolean) => void;
}

const ListeningExercise: FC<ListeningExerciseProps> = ({
  prompt,
  options,
  answer,
  context,
  onAnswer,
}) => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const optionsKey = options.join('\u0000');
  const shuffledOptions = useMemo(() => {
    const arr = optionsKey.split('\u0000');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [optionsKey]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    onAnswer(option === answer);
  };

  return (
    <div>
      {context && (
        <p className="mb-2 font-body text-[10px] text-accent-action font-semibold">{context}</p>
      )}

      {/* Audio playback stub — pronunciation card */}
      <div className="mb-4 rounded-xl border border-structural bg-bg-elevated-2 p-4 text-center">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="flex mx-auto h-12 w-12 items-center justify-center rounded-full border border-structural bg-bg-elevated text-text-primary transition-all hover:bg-accent-action/25 cursor-pointer"
          aria-label="Play pronunciation"
        >
          🔊
        </button>
        <p className="mt-2 font-body text-sm text-text-secondary">
          {revealed ? prompt : 'Tap to hear pronunciation'}
        </p>
        {revealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 font-target text-[18px] tracking-[0.015em] font-semibold text-accent-action"
          >
            {prompt}
          </motion.p>
        )}
      </div>

      <p className="mb-3 font-body text-base text-text-primary">Which word is it?</p>

      <div className="space-y-2">
        {shuffledOptions.map((option) => {
          let classes =
            'w-full rounded-xl border border-structural bg-bg-elevated px-4 py-3 font-body text-sm text-text-primary text-left transition-all';

          if (answered) {
            if (option === answer) {
              classes =
                'w-full rounded-xl border border-success/60 bg-success/10 px-4 py-3 font-body text-sm font-bold text-success text-left';
            } else if (option === selected && option !== answer) {
              classes =
                'w-full rounded-xl border border-error/60 bg-error/10 px-4 py-3 font-body text-sm text-error text-left';
            } else {
              classes += ' opacity-40';
            }
          } else {
            classes += ' hover:bg-structural hover:border-text-secondary/40';
          }

          return (
            <motion.button
              key={option}
              type="button"
              whileTap={answered ? undefined : { scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={classes}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {answered && selected !== answer && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-body text-sm text-success"
        >
          ✓ Correct answer: <span className="font-semibold">{answer}</span>
        </motion.p>
      )}
    </div>
  );
};

export default ListeningExercise;
