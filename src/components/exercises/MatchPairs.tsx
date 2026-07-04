// STEP 8 — Match Pairs exercise.
// Shows two columns of words. User taps a left item, then a right item to
// pair them. Correct pairs are highlighted, wrong ones shake briefly.
// Answer format: "hola↔hello|adiós↔goodbye" → parse into pairs.
import { useState, useMemo, type FC } from 'react';
import { motion } from 'framer-motion';

interface MatchPairsProps {
  prompt: string;
  answer: string;
  options: string[];
  context?: string;
  onAnswer: (correct: boolean) => void;
}

interface Pair {
  left: string;
  right: string;
}

const MatchPairs: FC<MatchPairsProps> = ({
  prompt,
  answer,
  options,
  context,
  onAnswer,
}) => {
  // Parse answer into pairs: "left↔right|left↔right"
  const correctPairs = useMemo<Pair[]>(() => {
    return answer.split('|').map((pair) => {
      const [left, right] = pair.split('↔');
      return { left: left!.trim(), right: right!.trim() };
    });
  }, [answer]);

  // Split options into left and right columns
  const { leftItems, rightItems } = useMemo(() => {
    const leftSet = new Set(correctPairs.map((p) => p.left));
    const rightSet = new Set(correctPairs.map((p) => p.right));
    return {
      leftItems: options.filter((o) => leftSet.has(o)),
      rightItems: options.filter((o) => rightSet.has(o)),
    };
  }, [options, correctPairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongRight, setWrongRight] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleRightTap = (rightItem: string) => {
    if (!selectedLeft || matchedPairs.has(selectedLeft)) return;

    const isCorrect = correctPairs.some(
      (p) => p.left === selectedLeft && p.right === rightItem,
    );

    if (isCorrect) {
      const pairKey = `${selectedLeft}↔${rightItem}`;
      const newMatched = new Set(matchedPairs);
      newMatched.add(pairKey);
      setMatchedPairs(newMatched);
      setSelectedLeft(null);

      // Check if all pairs matched
      if (newMatched.size === correctPairs.length) {
        setCompleted(true);
        onAnswer(true);
      }
    } else {
      setWrongRight(rightItem);
      setTimeout(() => {
        setWrongRight(null);
        // If all pairs must be matched, don't mark wrong yet
      }, 600);
    }
  };

  const isLeftMatched = (left: string) =>
    correctPairs.some(
      (p) => p.left === left && matchedPairs.has(`${p.left}↔${p.right}`),
    );

  const isRightMatched = (right: string) =>
    correctPairs.some(
      (p) => p.right === right && matchedPairs.has(`${p.left}↔${p.right}`),
    );

  return (
    <div>
      {context && (
        <p className="mb-2 font-body text-[10px] text-text-secondary">{context}</p>
      )}
      <p className="mb-4 font-body text-base text-text-primary">{prompt}</p>

      <div className="flex gap-4">
        {/* Left column */}
        <div className="flex-1 space-y-2">
          {leftItems.map((item) => {
            const matched = isLeftMatched(item);
            const selected = selectedLeft === item && !matched;
            return (
              <motion.button
                key={item}
                type="button"
                whileTap={!matched ? { scale: 0.97 } : undefined}
                onClick={() => !matched && setSelectedLeft(item)}
                className={`w-full rounded-xl border px-3 py-2.5 font-body text-sm text-left transition-colors border-none cursor-pointer ${
                  matched
                    ? 'border border-success/60 bg-success/10 text-success font-bold'
                    : selected
                      ? 'border border-accent-action bg-accent-action/20 text-accent-action font-bold'
                      : 'border border-structural bg-bg-elevated text-text-primary hover:border-text-secondary/40 hover:bg-bg-elevated-2'
                }`}
              >
                {item}
              </motion.button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex-1 space-y-2">
          {rightItems.map((item) => {
            const matched = isRightMatched(item);
            const isWrong = wrongRight === item;
            return (
              <motion.button
                key={item}
                type="button"
                animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                whileTap={!matched && selectedLeft ? { scale: 0.97 } : undefined}
                onClick={() => !matched && selectedLeft && handleRightTap(item)}
                className={`w-full rounded-xl border px-3 py-2.5 font-body text-sm text-left transition-colors border-none cursor-pointer ${
                  matched
                    ? 'border border-success/60 bg-success/10 text-success font-bold'
                    : selectedLeft
                      ? 'border border-structural bg-bg-elevated text-text-primary hover:border-text-secondary/40 hover:bg-bg-elevated-2'
                      : 'border border-structural bg-bg-elevated text-text-secondary/60 opacity-60'
                }`}
              >
                {item}
              </motion.button>
            );
          })}
        </div>
      </div>

      {completed && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-body text-sm text-success font-semibold"
        >
          ✓ All pairs matched!
        </motion.p>
      )}
    </div>
  );
};

export default MatchPairs;
