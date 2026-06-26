// STEP 8 — Listening exercise.
// Shows a pronunciation guide (simulated audio — real audio comes later) and
// asks the user to pick the correct word from options. Uses the `context`
// field for an additional hint.
import { useState, type FC } from 'react';
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

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    onAnswer(option === answer);
  };

  return (
    <div>
      {context && (
        <p className="mb-2 font-hud text-[10px] text-terracotta">{context}</p>
      )}

      {/* Audio playback stub — pronunciation card */}
      <div className="mb-4 rounded-xl border border-pencil/20 bg-ink/5 p-4 text-center">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="flex mx-auto h-12 w-12 items-center justify-center rounded-full border border-pencil/30 bg-paper text-ink transition-colors hover:bg-marigold/20"
          aria-label="Play pronunciation"
        >
          🔊
        </button>
        <p className="mt-2 font-body text-sm text-pencil">
          {revealed ? prompt : 'Tap to hear pronunciation'}
        </p>
        {revealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 font-hud text-lg font-semibold text-terracotta"
          >
            {prompt}
          </motion.p>
        )}
      </div>

      <p className="mb-3 font-body text-base text-ink">Which word is it?</p>

      <div className="space-y-2">
        {options.map((option) => {
          let classes =
            'w-full rounded-xl border border-pencil/20 bg-paper px-4 py-3 font-body text-sm text-ink text-left transition-colors';

          if (answered) {
            if (option === answer) {
              classes =
                'w-full rounded-xl border border-teal-deep/60 bg-teal-deep/10 px-4 py-3 font-body text-sm font-semibold text-teal-deep text-left';
            } else if (option === selected && option !== answer) {
              classes =
                'w-full rounded-xl border border-terracotta/60 bg-terracotta/10 px-4 py-3 font-body text-sm text-terracotta text-left';
            } else {
              classes += ' opacity-40';
            }
          } else {
            classes += ' hover:bg-ink/5 hover:border-pencil/40';
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
          className="mt-3 font-body text-sm text-teal-deep"
        >
          ✓ Correct answer: <span className="font-semibold">{answer}</span>
        </motion.p>
      )}
    </div>
  );
};

export default ListeningExercise;
