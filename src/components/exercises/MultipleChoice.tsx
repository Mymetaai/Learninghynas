// Multiple Choice exercise with Serene Lexicon solid high-contrast feedback.
import { useState, useMemo, type FC } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

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
        <p className="mb-2 font-sans text-[10px] font-mono uppercase tracking-wider text-[#777775]">{context}</p>
      )}
      <p className="mb-4 font-sans text-base font-bold text-[#2F353B] leading-relaxed">{prompt}</p>
      <div className="space-y-3">
        {shuffledOptions.map((option) => {
          const isCorrect = option === answer;
          const isSelected = option === selected;
          const isWrong = isSelected && !isCorrect;

          let btnStyles = 'w-full rounded-xl border px-4 py-3.5 font-sans text-sm font-semibold transition-all cursor-pointer shadow-sm flex items-center justify-between ';

          if (answered) {
            if (isCorrect) {
              btnStyles += 'bg-[#7D927D] text-white border-[#7D927D] shadow-md';
            } else if (isWrong) {
              btnStyles += 'bg-[#C4796B] text-white border-[#C4796B] shadow-md';
            } else {
              btnStyles += 'bg-white border-[#7D927D]/20 text-[#2F353B] opacity-40 cursor-not-allowed';
            }
          } else {
            btnStyles += 'bg-white border-[#7D927D]/20 text-[#2F353B] hover:bg-[#F9F7F2] hover:border-[#7D927D]/50';
          }

          // Animation spec: bounce pop for correct, shake for incorrect
          const animationVariant = answered
            ? isCorrect
              ? { scale: [1, 1.05, 1] }
              : isWrong
                ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
                : undefined
            : undefined;

          const transitionSpec = answered
            ? isCorrect
              ? { type: 'spring', stiffness: 300 }
              : isWrong
                ? { duration: 0.4 }
                : undefined
            : undefined;

          return (
            <motion.button
              key={option}
              type="button"
              animate={animationVariant}
              transition={transitionSpec}
              whileTap={answered ? undefined : { scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={btnStyles}
              disabled={answered}
            >
              <span>{option}</span>
              {answered && (
                <span>
                  {isCorrect && <CheckCircle2 className="h-5 w-5 text-white shrink-0 ml-2" />}
                  {isWrong && <XCircle className="h-5 w-5 text-white shrink-0 ml-2" />}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      {answered && selected !== answer && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-xl bg-[#7D927D]/10 border border-[#7D927D]/30 font-sans text-xs text-[#2F353B] flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4 text-[#7D927D] shrink-0" />
          <span>Correct answer: <strong className="text-[#7D927D] font-bold">{answer}</strong></span>
        </motion.div>
      )}
    </div>
  );
};

export default MultipleChoice;
