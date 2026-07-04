// STEP 8 — Reorder exercise.
// Shows items in shuffled order. User taps up/down arrows to arrange items
// in the correct order, then confirms.
// Answer format: "uno|cinco|diez|veinte" (correct order).
// Options: shuffled presentation of the same items.
import { useState, useMemo, type FC } from 'react';
import { motion } from 'framer-motion';

interface ReorderListProps {
  prompt: string;
  answer: string;
  options: string[];
  context?: string;
  onAnswer: (correct: boolean) => void;
}

const ReorderList: FC<ReorderListProps> = ({
  prompt,
  answer,
  options,
  context,
  onAnswer,
}) => {
  const correctOrder = useMemo(() => answer.split('|'), [answer]);
  const [items, setItems] = useState<string[]>(() => shuffleArray([...options]));
  const [confirmed, setConfirmed] = useState(false);

  // Move item up in the list
  const moveUp = (index: number) => {
    if (confirmed || index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
  };

  // Move item down in the list
  const moveDown = (index: number) => {
    if (confirmed || index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    const isCorrect = items.join('|') === correctOrder.join('|');
    onAnswer(isCorrect);
  };

  const getItemStatus = (item: string, index: number) => {
    if (!confirmed) return 'default';
    if (item === correctOrder[index]) return 'correct';
    return 'wrong';
  };

  return (
    <div>
      {context && (
        <p className="mb-2 font-body text-[10px] text-text-secondary">{context}</p>
      )}
      <p className="mb-4 font-body text-base text-text-primary">{prompt}</p>

      <div className="space-y-2">
        {items.map((item, index) => {
          const status = getItemStatus(item, index);
          const statusClasses =
            status === 'correct'
              ? 'border-success/60 bg-success/10 text-success font-semibold'
              : status === 'wrong'
                ? 'border-error/60 bg-error/10 text-error'
                : 'border-structural bg-bg-elevated text-text-primary';

          return (
            <div
              key={`${item}-${index}`}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${statusClasses}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-elevated-2 font-body text-[10px] text-text-secondary">
                {index + 1}
              </span>
              <span className="flex-1 font-body text-sm">{item}</span>
              {!confirmed && (
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveUp(index)}
                    className="flex h-6 w-6 items-center justify-center rounded border border-structural text-text-secondary hover:bg-bg-elevated-2 cursor-pointer bg-transparent"
                    aria-label="Move up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => moveDown(index)}
                    className="flex h-6 w-6 items-center justify-center rounded border border-structural text-text-secondary hover:bg-bg-elevated-2 cursor-pointer bg-transparent"
                    aria-label="Move down"
                  >
                    ▼
                  </button>
                </div>
              )}
              {status === 'correct' && <span className="text-success font-bold">✓</span>}
              {status === 'wrong' && <span className="text-error font-bold">✗</span>}
            </div>
          );
        })}
      </div>

      {!confirmed && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="mt-4 w-full rounded-xl bg-accent-action px-4 py-2.5 font-display text-sm font-semibold text-bg-base transition-colors hover:bg-accent-action-hover border-none shadow-md cursor-pointer"
        >
          Check Order
        </motion.button>
      )}

      {confirmed && items.join('|') !== correctOrder.join('|') && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 font-body text-sm text-success"
        >
          ✓ Correct order:{' '}
          <span className="font-semibold">{correctOrder.join(', ')}</span>
        </motion.p>
      )}
    </div>
  );
};

/** Simple Fisher-Yates shuffle. */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default ReorderList;
