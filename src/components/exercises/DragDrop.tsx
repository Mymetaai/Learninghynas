// STEP 8 — Drag-Drop exercise (tap-to-select variant).
// Shows a set of items. User taps to select the correct subset and drop them
// into the target zone. On mobile, drag is impractical, so we use a
// tap-to-select/tap-to-deselect pattern.
// Answer format: "hermano|abuelo|papá" (the correct items).
// Options: full array including distractors.
import { useState, useMemo, type FC } from 'react';
import { motion } from 'framer-motion';

interface DragDropProps {
  prompt: string;
  answer: string;
  options: string[];
  context?: string;
  onAnswer: (correct: boolean) => void;
}

const DragDrop: FC<DragDropProps> = ({
  prompt,
  answer,
  options,
  context,
  onAnswer,
}) => {
  const correctItems = useMemo(() => new Set(answer.split('|')), [answer]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmed, setConfirmed] = useState(false);

  const toggleItem = (item: string) => {
    if (confirmed) return;
    const newSelected = new Set(selected);
    if (newSelected.has(item)) {
      newSelected.delete(item);
    } else {
      newSelected.add(item);
    }
    setSelected(newSelected);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    // Correct if selected matches correctItems exactly
    const isCorrect =
      selected.size === correctItems.size &&
      [...selected].every((item) => correctItems.has(item));
    onAnswer(isCorrect);
  };

  const selectedItems = useMemo(
    () => [...selected],
    [selected],
  );
  const optionsKey = options.join('\u0000');
  const shuffledOptions = useMemo(() => {
    const arr = optionsKey.split('\u0000');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [optionsKey]);

  const unselectedItems = useMemo(
    () => shuffledOptions.filter((o) => !selected.has(o)),
    [shuffledOptions, selected],
  );

  return (
    <div>
      {context && (
        <p className="mb-2 font-body text-[10px] text-text-secondary">{context}</p>
      )}
      <p className="mb-4 font-body text-base text-text-primary">{prompt}</p>

      {/* Drop zone — shows selected items */}
      <div className="mb-4 min-h-[3rem] rounded-xl border border-dashed border-accent-action/40 bg-accent-action/5 p-3">
        <p className="mb-1 font-body text-[9px] font-bold uppercase tracking-[0.2em] text-accent-action">
          Selected
        </p>
        {selectedItems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <motion.button
                key={item}
                type="button"
                whileTap={confirmed ? undefined : { scale: 0.95 }}
                onClick={() => toggleItem(item)}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 font-body text-sm transition-colors border-none ${
                  confirmed
                    ? correctItems.has(item)
                      ? 'border border-success/60 bg-success/10 text-success font-bold'
                      : 'border border-error/60 bg-error/10 text-error line-through'
                    : 'border border-accent-action/40 bg-accent-action/10 text-accent-action hover:bg-accent-action/20'
                }`}
              >
                {item}
                {!confirmed && (
                  <span className="ml-1 text-xs text-accent-action/60">✕</span>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="font-body text-xs text-accent-action/40">
            Tap items below to select…
          </p>
        )}
      </div>

      {/* Available items */}
      <div className="flex flex-wrap gap-2">
        {unselectedItems.map((item) => (
          <motion.button
            key={item}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleItem(item)}
            className={`inline-flex items-center rounded-full border border-structural bg-bg-elevated px-3 py-1.5 font-body text-sm text-text-primary transition-colors hover:border-text-secondary/40 hover:bg-bg-elevated-2 ${
              confirmed ? 'opacity-40' : ''
            }`}
          >
            {item}
          </motion.button>
        ))}
      </div>

      {/* Confirm button */}
      {selectedItems.length > 0 && !confirmed && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="mt-4 w-full rounded-xl bg-accent-action px-4 py-2.5 font-display text-sm font-semibold text-bg-base transition-colors hover:bg-accent-action-hover border-none shadow-md cursor-pointer"
        >
          Check Selection
        </motion.button>
      )}

      {confirmed && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 font-body text-sm ${
            selected.size === correctItems.size &&
            [...selected].every((item) => correctItems.has(item))
              ? 'text-success'
              : 'text-error'
          }`}
        >
          {selected.size === correctItems.size &&
          [...selected].every((item) => correctItems.has(item))
            ? '✓ Correct!'
            : `✗ Correct items: ${[...correctItems].join(', ')}`}
        </motion.p>
      )}
    </div>
  );
};

export default DragDrop;
