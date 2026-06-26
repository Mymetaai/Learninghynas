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
  const unselectedItems = useMemo(
    () => options.filter((o) => !selected.has(o)),
    [options, selected],
  );

  return (
    <div>
      {context && (
        <p className="mb-2 font-hud text-[10px] text-pencil">{context}</p>
      )}
      <p className="mb-4 font-body text-base text-ink">{prompt}</p>

      {/* Drop zone — shows selected items */}
      <div className="mb-4 min-h-[3rem] rounded-xl border border-dashed border-terracotta/40 bg-terracotta/5 p-3">
        <p className="mb-1 font-hud text-[9px] uppercase tracking-[0.2em] text-terracotta">
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
                className={`inline-flex items-center rounded-full border px-3 py-1.5 font-body text-sm transition-colors ${
                  confirmed
                    ? correctItems.has(item)
                      ? 'border-teal-deep/60 bg-teal-deep/10 text-teal-deep font-semibold'
                      : 'border-terracotta/60 bg-terracotta/10 text-terracotta line-through'
                    : 'border-terracotta/40 bg-marigold/10 text-terracotta hover:bg-terracotta/20'
                }`}
              >
                {item}
                {!confirmed && (
                  <span className="ml-1 text-xs text-terracotta/60">✕</span>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="font-body text-xs text-terracotta/40">
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
            className={`inline-flex items-center rounded-full border border-pencil/20 bg-paper px-3 py-1.5 font-body text-sm text-ink transition-colors hover:border-pencil/40 hover:bg-ink/5 ${
              confirmed ? (correctItems.has(item) ? 'opacity-40' : 'opacity-40') : ''
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
          className="mt-4 w-full rounded-xl bg-terracotta px-4 py-2.5 font-display text-sm font-semibold text-paper transition-colors hover:bg-terracotta/90"
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
              ? 'text-teal-deep'
              : 'text-terracotta'
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
