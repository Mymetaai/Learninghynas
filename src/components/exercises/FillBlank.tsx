// STEP 8 — Fill-in-the-Blank exercise.
// Shows a prompt with a ___ gap. Presents the answer word + distractors
// as tappable chips. User taps the correct word.
import { useState, useMemo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FillBlankProps {
  prompt: string;
  answer: string;
  distractorPool?: string[];
  context?: string;
  onAnswer: (correct: boolean) => void;
}

const FillBlank: FC<FillBlankProps> = ({
  prompt,
  answer,
  distractorPool,
  context,
  onAnswer,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  // Build word chips: answer + distractors, shuffled
  const chips = useMemo(() => {
    const pool = [answer, ...(distractorPool ?? [])];
    return shuffleArray([...pool]);
  }, [answer, distractorPool]);

  const handleSelect = (word: string) => {
    if (answered) return;
    setSelected(word);
    setAnswered(true);
    onAnswer(word === answer);
  };

  // Render the prompt, replacing ___ with the selected/answer word
  const renderPrompt = () => {
    const parts = prompt.split('___');
    return (
      <p className="mb-4 font-body text-base text-text-primary">
        {parts[0]}
        <AnimatePresence mode="wait">
          {answered ? (
            <motion.span
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`font-semibold ${
                selected === answer ? 'text-success' : 'text-error'
              }`}
            >
              {selected}
            </motion.span>
          ) : (
            <span className="inline-block min-w-[4rem] border-b-2 border-dashed border-accent-action/60" />
          )}
        </AnimatePresence>
        {parts[1]}
      </p>
    );
  };

  return (
    <div>
      {context && (
        <p className="mb-2 font-body text-[10px] text-text-secondary">{context}</p>
      )}
      {renderPrompt()}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          let classes =
            'inline-flex items-center rounded-full border border-structural bg-bg-elevated px-3 py-1.5 font-body text-sm text-text-primary transition-all';

          if (answered) {
            if (chip === answer) {
              classes =
                'inline-flex items-center rounded-full border border-success/60 bg-success/10 px-3 py-1.5 font-body text-sm font-bold text-success';
            } else if (chip === selected && chip !== answer) {
              classes =
                'inline-flex items-center rounded-full border border-error/60 bg-error/10 px-3 py-1.5 font-body text-sm text-error line-through';
            } else {
              classes += ' opacity-30';
            }
          } else {
            classes += ' hover:border-text-secondary/40 hover:bg-bg-elevated-2 cursor-pointer';
          }

          return (
            <motion.button
              key={chip}
              type="button"
              whileTap={answered ? undefined : { scale: 0.95 }}
              onClick={() => handleSelect(chip)}
              className={classes}
            >
              {chip}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

/** Simple Fisher-Yates shuffle. */
function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default FillBlank;
export { shuffleArray };
