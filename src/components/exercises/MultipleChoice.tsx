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
        <p className="mb-2 font-body text-[10px] text-text-secondary">{context}</p>
      )}
      <p className="mb-4 font-body text-base text-text-primary">{prompt}</p>
      <div className="space-y-2">
        {options.map((option) => {
          let classes =
            'w-full rounded-xl border border-structural bg-bg-elevated-2 px-4 py-3 font-body text-sm text-text-primary text-left transition-all';

          if (answered) {
            if (option === answer) {
              classes =
                'w-full rounded-xl border border-success/60 bg-success/10 px-4 py-3 font-body text-sm font-bold text-success text-left';
            } else if (option === selected && option !== answer) {
              classes =
                'w-full rounded-xl border border-error/60 bg-error/10 px-4 py-3 font-body text-sm text-error text-left';
            } else {
              classes +=
                ' opacity-40';
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

export default MultipleChoice;
