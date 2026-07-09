import { type FC } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import type { VocabItem } from '../content/types';

// ── Level-specific color tokens ─────────────────────────────────────────────

const LEVEL_COLORS: Record<VocabItem['level'], {
  badgeBg: string;
  badgeText: string;
  edgeTint: string;
  glowShadow: string;
  dotColor: string;
}> = {
  A1: {
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    edgeTint: 'border-emerald-400/25',
    glowShadow: '0 8px 32px rgba(16,185,129,0.12)',
    dotColor: 'bg-emerald-500',
  },
  A2: {
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-700',
    edgeTint: 'border-sky-400/25',
    glowShadow: '0 8px 32px rgba(14,165,233,0.12)',
    dotColor: 'bg-sky-500',
  },
  B1: {
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    edgeTint: 'border-amber-400/25',
    glowShadow: '0 8px 32px rgba(245,158,11,0.12)',
    dotColor: 'bg-amber-500',
  },
  B2: {
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    edgeTint: 'border-orange-400/25',
    glowShadow: '0 8px 32px rgba(249,115,22,0.12)',
    dotColor: 'bg-orange-500',
  },
  C1: {
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    edgeTint: 'border-purple-400/25',
    glowShadow: '0 8px 32px rgba(168,85,247,0.12)',
    dotColor: 'bg-purple-500',
  },
};

// ── Stacked background card geometry ────────────────────────────────────────

const STACK_OFFSETS = [
  { rotate: -5,  x: -6,  y:  8, opacity: 0.25, scale: 0.94 },
  { rotate:  3,  x:  5,  y:  6, opacity: 0.35, scale: 0.96 },
  { rotate: -2,  x: -3,  y:  4, opacity: 0.50, scale: 0.98 },
];

// ── Spring configs ──────────────────────────────────────────────────────────

const FLIP_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

// ── Component Props ─────────────────────────────────────────────────────────

interface VocabCardProps {
  item: VocabItem;
  flipped: boolean;
  onFlip: () => void;
  status: 'idle' | 'revealed' | 'correct' | 'incorrect';
  /** Nearby items used to render stacked silhouettes behind the active card. */
  stackItems?: VocabItem[];
}

// ── Stack Silhouette Card ───────────────────────────────────────────────────

const StackCard: FC<{
  item: VocabItem;
  offset: typeof STACK_OFFSETS[0];
  index: number;
}> = ({ item, offset, index }) => {
  const colors = LEVEL_COLORS[item.level] || LEVEL_COLORS.A1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
        opacity: offset.opacity,
        rotate: offset.rotate,
        x: offset.x,
        y: offset.y,
        scale: offset.scale,
      }}
      exit={{ opacity: 0, y: 10, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24, delay: index * 0.04 }}
      className={`absolute inset-0 rounded-[1.25rem] border bg-[var(--bg-elevated)] ${colors.edgeTint}`}
      style={{
        zIndex: index,
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
      aria-hidden="true"
    >
      {/* Level badge hint on silhouette */}
      <span
        className={`absolute top-3 right-3 text-[8px] font-hud px-1.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText} opacity-60`}
      >
        {item.level}
      </span>
    </motion.div>
  );
};

// ── Main VocabCard ──────────────────────────────────────────────────────────

const VocabCard: FC<VocabCardProps> = ({
  item,
  flipped,
  onFlip,
  status,
  stackItems = [],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const colors = LEVEL_COLORS[item.level] || LEVEL_COLORS.A1;

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : FLIP_SPRING;

  const fadeTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.15 };

  // Status-specific border override
  let borderClass = colors.edgeTint;
  if (status === 'correct') {
    borderClass = 'border-success shadow-[0_0_12px_rgba(46,125,50,0.25)]';
  } else if (status === 'incorrect') {
    borderClass = 'border-error shadow-[0_0_12px_rgba(198,40,40,0.25)]';
  }

  return (
    <div
      className="relative w-full max-w-[300px] sm:max-w-[340px] h-[400px] sm:h-[440px] mx-auto"
      style={{ perspective: 1200 }}
    >
      {/* ── Stacked silhouette cards behind ── */}
      <AnimatePresence mode="popLayout">
        {stackItems.slice(0, 3).map((stackItem, i) => (
          <StackCard
            key={`stack-${stackItem.id}-${i}`}
            item={stackItem}
            offset={STACK_OFFSETS[i]}
            index={i}
          />
        ))}
      </AnimatePresence>

      {/* ── Active card (front) ── */}
      <motion.div
        onClick={onFlip}
        className="absolute inset-0 cursor-pointer select-none"
        style={{ zIndex: 10 }}
        role="button"
        aria-label={flipped ? `English: ${item.en}` : `Spanish: ${item.es}. Tap to reveal answer.`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onFlip(); }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={springTransition}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ═══ FRONT FACE (Spanish Word) ═══ */}
          <motion.div
            animate={{ opacity: flipped ? 0 : 1 }}
            transition={fadeTransition}
            className={`absolute inset-0 rounded-[1.25rem] border bg-[var(--bg-elevated)] ${borderClass}
              flex flex-col items-center justify-center p-6`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08), ${colors.glowShadow}`,
            }}
          >
            {/* Decorative sparkle corners */}
            <span className="absolute top-4 left-4 text-accent-action opacity-25 text-base" aria-hidden="true">✦</span>
            <span className="absolute bottom-4 right-4 text-accent-action opacity-25 text-base" aria-hidden="true">✦</span>

            {/* Level badge pill */}
            <span
              className={`absolute top-4 right-4 font-hud text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
            >
              {item.level}
            </span>

            {/* Spanish word — large, centered */}
            <p className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center leading-tight px-4">
              {item.es}
            </p>

            {/* SPANISH label */}
            <p className="mt-3 font-hud text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
              SPANISH
            </p>

            {/* Footer hint */}
            <p className="absolute bottom-5 font-body text-[10px] text-text-tertiary opacity-60">
              tap to reveal answer
            </p>
          </motion.div>

          {/* ═══ BACK FACE (English Translation) ═══ */}
          <motion.div
            animate={{ opacity: flipped ? 1 : 0 }}
            transition={fadeTransition}
            className={`absolute inset-0 rounded-[1.25rem] border card-glow-border ${borderClass}`}
            style={{
              position: 'absolute',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.1), ${colors.glowShadow}`,
            }}
          >
            <div className="card-inner-content flex flex-col items-center justify-center p-6 text-center h-full">
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

                    {/* Example sentence & translation */}
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

                    {/* Tags */}
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
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VocabCard;
