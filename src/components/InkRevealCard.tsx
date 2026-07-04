// STEP 7 — Ink-reveal vocab card.
// A parchment-style bottom-sheet that slides up when a tappable vocab word
// is tapped in the Story Chapter. Uses Framer Motion for the slide-up
// entrance and ink-splash circle animation. Replaces the plain popover
// that was in Step 6.
import { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InkRevealCardProps {
  /** The Spanish word. */
  word: string;
  /** Pronunciation guide, e.g. "OH-lah". */
  pronunciation: string;
  /** English meaning. */
  meaning: string;
  /** Whether the card is visible. */
  visible: boolean;
  /** Callback to dismiss the card. */
  onClose: () => void;
}

const InkRevealCard: FC<InkRevealCardProps> = ({
  word,
  pronunciation,
  meaning,
  visible,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="ink-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-bg-base/40"
            onClick={onClose}
          />

          {/* Ink splash circle */}
          <motion.div
            key="ink-splash"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center"
          >
            <div className="absolute bottom-24 h-64 w-64 rounded-full bg-accent-action/10 blur-3xl" />
          </motion.div>

          {/* Card — slides up from bottom */}
          <motion.div
            key="ink-card"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-sm rounded-t-2xl border border-structural bg-bg-elevated p-6 text-text-primary shadow-[0_-8px_40px_rgba(20,24,28,0.5)]">
              {/* Drag handle */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-text-tertiary/30" />

              {/* Word — Atkinson Hyperlegible Next font for Spanish vocabulary */}
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-target text-2xl font-bold text-text-primary tracking-[0.015em]"
              >
                {word}
              </motion.h3>

              {/* Pronunciation */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-1 font-body text-xs text-text-secondary"
              >
                [{pronunciation}]
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="my-3 h-px origin-left bg-structural"
              />

              {/* Meaning */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="font-body text-base text-text-primary"
              >
                {meaning}
              </motion.p>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                type="button"
                onClick={onClose}
                className="mt-4 w-full rounded-xl border border-structural bg-bg-elevated-2 py-2 font-body text-xs uppercase tracking-[0.2em] text-text-secondary transition-colors hover:bg-structural hover:text-text-primary"
              >
                Tap to close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InkRevealCard;
