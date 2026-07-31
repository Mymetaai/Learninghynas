// Fill-in-the-Blank exercise with Serene Lexicon solid high-contrast pop & shake validation.
import { useState, useMemo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FillBlankProps {
  prompt: string;
  answer: string;
  distractorPool?: string[];
  context?: string;
  onAnswer: (correct: boolean) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

  const renderPrompt = () => {
    const parts = prompt.split('___');
    return (
      <p className="mb-4 font-sans text-base text-[#2F353B] font-medium leading-relaxed">
        {parts[0]}
        <AnimatePresence mode="wait">
          {answered ? (
            <motion.span
              key={selected}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg text-white mx-1 ${
                selected === answer ? 'bg-[#7D927D]' : 'bg-[#C4796B]'
              }`}
            >
              {selected}
            </motion.span>
          ) : (
            <span className="inline-block min-w-[4rem] border-b-2 border-dashed border-[#7D927D] mx-1" />
          )}
        </AnimatePresence>
        {parts[1]}
      </p>
    );
  };

  return (
    <div>
      {context && (
        <p className="mb-2 font-sans text-[10px] font-mono uppercase tracking-wider text-[#777775]">{context}</p>
      )}
      {renderPrompt()}
      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip) => {
          const isCorrect = chip === answer;
          const isSelected = chip === selected;
          const isWrong = isSelected && !isCorrect;

          let btnClasses =
            'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all shadow-sm ';

          if (answered) {
            if (isCorrect) {
              btnClasses += 'bg-[#7D927D] text-white border-[#7D927D] shadow-md';
            } else if (isWrong) {
              btnClasses += 'bg-[#C4796B] text-white border-[#C4796B] line-through shadow-md';
            } else {
              btnClasses += 'bg-white border-[#7D927D]/20 text-[#2F353B] opacity-30 cursor-not-allowed';
            }
          } else {
            btnClasses += 'bg-white border-[#7D927D]/20 text-[#2F353B] hover:bg-[#F9F7F2] hover:border-[#7D927D]/50 cursor-pointer';
          }

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
              key={chip}
              type="button"
              animate={animationVariant}
              transition={transitionSpec}
              whileTap={answered ? undefined : { scale: 0.95 }}
              onClick={() => handleSelect(chip)}
              className={btnClasses}
              disabled={answered}
            >
              <span>{chip}</span>
              {answered && isCorrect && <CheckCircle2 className="h-4 w-4 text-white shrink-0 ml-1" />}
              {answered && isWrong && <XCircle className="h-4 w-4 text-white shrink-0 ml-1" />}
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

export default FillBlank;
