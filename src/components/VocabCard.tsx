import { type FC } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import type { VocabItem } from '../content/types';

// Color styles per CEFR level
const LEVEL_COLORS: Record<VocabItem['level'], { border: string; bg: string; text: string; glow: string }> = {
  A1: {
    border: 'border-emerald-500/30',
    bg: 'from-emerald-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    glow: 'shadow-[0_8px_32px_rgba(16,185,129,0.15)]',
  },
  A2: {
    border: 'border-sky-500/30',
    bg: 'from-sky-50 to-sky-100/60 dark:from-sky-950/40 dark:to-sky-900/30',
    text: 'text-sky-700 dark:text-sky-400',
    glow: 'shadow-[0_8px_32px_rgba(14,165,233,0.15)]',
  },
  B1: {
    border: 'border-amber-500/30',
    bg: 'from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    glow: 'shadow-[0_8px_32px_rgba(245,158,11,0.15)]',
  },
  B2: {
    border: 'border-orange-500/30',
    bg: 'from-orange-50 to-orange-100/60 dark:from-orange-950/40 dark:to-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    glow: 'shadow-[0_8px_32px_rgba(249,115,22,0.15)]',
  },
  C1: {
    border: 'border-purple-500/30',
    bg: 'from-purple-50 to-purple-100/60 dark:from-purple-950/40 dark:to-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    glow: 'shadow-[0_8px_32px_rgba(168,85,247,0.15)]',
  },
};

interface VocabCardProps {
  item: VocabItem;
  flipped: boolean;
  onFlip: () => void;
  status: 'idle' | 'revealed' | 'correct' | 'incorrect';
  rotation?: number;
  zIndex?: number;
  xOffset?: number;
  isFront?: boolean;
}

const VocabCard: FC<VocabCardProps> = ({
  item,
  flipped,
  onFlip,
  status,
  rotation = 0,
  zIndex = 1,
  xOffset = 0,
  isFront = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const colors = LEVEL_COLORS[item.level] || LEVEL_COLORS.A1;

  // Spring transition settings
  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 20 };

  const fadeTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.15 };

  // Status-specific borders
  let borderClass = colors.border;
  if (status === 'correct') {
    borderClass = 'border-success shadow-[0_0_12px_rgba(46,125,50,0.25)]';
  } else if (status === 'incorrect') {
    borderClass = 'border-error shadow-[0_0_12px_rgba(198,40,40,0.25)]';
  }

  return (
    <motion.div
      layout
      animate={{
        rotate: rotation,
        x: xOffset,
        scale: isFront ? 1.05 : 0.92,
      }}
      transition={springTransition}
      style={{
        zIndex: flipped ? 50 : zIndex,
        perspective: 1000,
      }}
      onClick={onFlip}
      className="absolute inset-0 w-full max-w-[280px] sm:max-w-sm h-80 sm:h-96 mx-auto cursor-pointer select-none origin-bottom"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={springTransition}
        className={`w-full h-full relative rounded-2xl border bg-white dark:bg-zinc-900 bg-gradient-to-br ${colors.bg} ${borderClass} ${colors.glow} transition-colors duration-300`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE (Spanish Word) */}
        <motion.div
          animate={{ opacity: flipped ? 0 : 1 }}
          transition={fadeTransition}
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Decorative Corner Icons */}
          <span className="absolute top-4 left-4 text-accent-action opacity-30 text-lg font-display">✦</span>
          <span className="absolute bottom-4 right-4 text-accent-action opacity-30 text-lg font-display">✦</span>

          {/* Level Badge */}
          <span className={`absolute top-4 right-4 font-hud text-[10px] px-2.5 py-0.5 rounded-full border border-structural bg-paper/10 ${colors.text}`}>
            {item.level}
          </span>

          <p className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center leading-tight">
            {item.es}
          </p>
          
          <p className="mt-3 font-hud text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
            Spanish
          </p>

          <p className="absolute bottom-6 font-body text-[10px] text-text-tertiary opacity-70">
            tap to reveal answer
          </p>
        </motion.div>

        {/* BACK FACE (English Translation + Examples) */}
        <motion.div
          animate={{ opacity: flipped ? 1 : 0 }}
          transition={fadeTransition}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <AnimatePresence>
            {flipped && (
              <div className="flex flex-col items-center gap-3 w-full">
                {/* English meaning */}
                <motion.p
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  className="font-display text-2xl sm:text-3xl font-bold text-accent-action px-2"
                >
                  {item.en}
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1, duration: 0.2 }}
                  className="w-16 h-[2px] bg-structural"
                />

                {/* Example sentence & Translation */}
                {(item.example || item.exampleTranslation) ? (
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15, duration: 0.25 }}
                    className="space-y-1.5 px-4"
                  >
                    {item.example && (
                      <p className="font-target text-base text-text-primary italic leading-relaxed">
                        &ldquo;{item.example}&rdquo;
                      </p>
                    )}
                    {item.exampleTranslation && (
                      <p className="font-body text-xs text-text-secondary">
                        {item.exampleTranslation}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  // Staggered placeholder for level description/category context
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15, duration: 0.25 }}
                    className="flex items-center gap-1.5 justify-center text-text-tertiary"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-marigold shrink-0" />
                    <span className="font-hud text-[9px] uppercase tracking-wider">
                      {item.category} Category
                    </span>
                  </motion.div>
                )}

                {/* Tags if present */}
                {item.tags && item.tags.length > 0 && (
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-wrap gap-1 justify-center mt-2"
                  >
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-hud bg-paper/5 px-2 py-0.5 rounded border border-structural/40 text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>

          {/* Validation overlay for correct/incorrect */}
          {status !== 'idle' && status !== 'revealed' && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute top-4 left-4 flex items-center justify-center h-7 w-7 rounded-full border ${
                status === 'correct'
                  ? 'border-success/30 bg-success/10 text-success'
                  : 'border-error/30 bg-error/10 text-error'
              }`}
            >
              {status === 'correct' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VocabCard;
