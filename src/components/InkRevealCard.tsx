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
            className="fixed inset-0 z-50 bg-ink/40"
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
            <div className="absolute bottom-24 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl" />
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
            <div className="w-full max-w-sm rounded-t-2xl border border-pencil/30 bg-paper p-6 text-ink shadow-[0_-8px_40px_rgba(0,0,0,0.4)]">
              {/* Drag handle */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-pencil/30" />

              {/* Word */}
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-display text-2xl font-bold text-ink"
              >
                {word}
              </motion.h3>

              {/* Pronunciation */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-1 font-hud text-xs text-terracotta"
              >
                [{pronunciation}]
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="my-3 h-px origin-left bg-pencil/20"
              />

              {/* Meaning */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="font-body text-base text-ink"
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
                className="mt-4 w-full rounded-xl border border-pencil/20 bg-ink/5 py-2 font-hud text-xs uppercase tracking-[0.2em] text-pencil transition-colors hover:bg-ink/10 hover:text-paper"
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
