// STEP 8 — Multiple Choice exercise.
// Shows a prompt and 4 option buttons. User taps one, gets feedback.
import { useState, type FC } from 'react';
import { motion } from 'framer-motion';

interface MultipleChoiceProps {
  prompt: string;
  options: string[];
  answer: string;
  context?: string;
  onAnswer: (correct: boolean) => void;
}

const MultipleChoice: FC<MultipleChoiceProps> = ({
  prompt,
  options,
  answer,
  context,
  onAnswer,
}) => {
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
        <p className="mb-2 font-hud text-[10px] text-pencil">{context}</p>
      )}
      <p className="mb-4 font-body text-base text-ink">{prompt}</p>
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
              classes +=
                ' opacity-40';
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

export default MultipleChoice;
