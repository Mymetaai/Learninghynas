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

/**
 * Shuffles an array using the stable Fisher-Yates algorithm.
 * Returns a new array, leaving the input array unmodified.
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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

  // Split options into left and right columns.
  // IMPORTANT: Use array-based filtering (NOT Set) to preserve duplicate values
  // e.g. if two left words both mean "you", both "you" entries must appear separately.
  const optionsKey = options.join('\u0000');
  const { leftItems, rightItems } = useMemo(() => {
    const leftSet = new Set(correctPairs.map((p) => p.left));
    const rightValues = correctPairs.map((p) => p.right); // ordered, preserves dupes

    const optionsArray = optionsKey.split('\u0000');
    const leftFiltered = optionsArray.filter((o) => leftSet.has(o));

    // Build right column: for each expected right value (in order), find and
    // consume one matching item from the options array so duplicates are preserved.
    const remaining = [...optionsArray];
    const rightFiltered: string[] = [];
    for (const rv of rightValues) {
      const idx = remaining.indexOf(rv);
      if (idx !== -1) {
        rightFiltered.push(rv);
        remaining.splice(idx, 1);
      }
    }

    return {
      leftItems: fisherYatesShuffle(leftFiltered),
      rightItems: fisherYatesShuffle(rightFiltered),
    };
  }, [optionsKey, correctPairs]);

  // matchedPairs stores "left↔right" keys for confirmed pairs
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongRight, setWrongRight] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  // For right-column deduplication: track which right-column *indices* are matched.
  // This is needed when the same display string appears more than once in rightItems.
  const [matchedRightIndices, setMatchedRightIndices] = useState<Set<number>>(new Set());

  const handleRightTap = (rightItem: string, rightIndex: number) => {
    if (!selectedLeft || matchedPairs.has(`${selectedLeft}↔${rightItem}`)) return;
    // Also skip if this specific right slot is already consumed
    if (matchedRightIndices.has(rightIndex)) return;

    const isCorrect = correctPairs.some(
      (p) => p.left === selectedLeft && p.right === rightItem,
    );

    if (isCorrect) {
      const pairKey = `${selectedLeft}↔${rightItem}`;
      const newMatched = new Set(matchedPairs);
      newMatched.add(pairKey);
      setMatchedPairs(newMatched);

      const newMatchedRight = new Set(matchedRightIndices);
      newMatchedRight.add(rightIndex);
      setMatchedRightIndices(newMatchedRight);

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
      }, 600);
    }
  };

  const isLeftMatched = (left: string) =>
    correctPairs.some(
      (p) => p.left === left && matchedPairs.has(`${p.left}↔${p.right}`),
    );

  // isRightMatched now checks the specific slot by index, not just the string value.
  // This prevents the cross-contamination bug where two left items share the same
  // right translation and the first match "consumes" the only right slot visually.
  const isRightMatchedByIndex = (index: number) => matchedRightIndices.has(index);

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
          {rightItems.map((item, index) => {
            const matched = isRightMatchedByIndex(index);
            const isWrong = wrongRight === item && !matched;
            return (
              <motion.button
                key={`${item}-${index}`}
                type="button"
                animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                whileTap={!matched && selectedLeft ? { scale: 0.97 } : undefined}
                onClick={() => !matched && selectedLeft && handleRightTap(item, index)}
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
