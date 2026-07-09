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

  // Status-specific border or shadow override
  let borderClass = 'border-[var(--structural)]';
  if (status === 'correct') {
    borderClass = 'border-success shadow-[0_0_12px_rgba(46,125,50,0.25)]';
  } else if (status === 'incorrect') {
    borderClass = 'border-error shadow-[0_0_12px_rgba(198,40,40,0.25)]';
  }

  return (
    <div
      className="relative w-full max-w-[320px] h-[430px] mx-auto"
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

      {/* ── Active Card Container ── */}
      <div
        onClick={onFlip}
        className="uiverse-card-container select-none cursor-pointer absolute inset-0"
        style={{ zIndex: 10 }}
        role="button"
        aria-label={flipped ? `English: ${item.en}` : `Spanish: ${item.es}. Tap to reveal answer.`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onFlip(); }}
      >
        <div
          className="uiverse-card-content hover-flip h-full w-full"
          style={{
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: shouldReduceMotion ? 'none' : undefined,
          }}
        >
          {/* ═══ FRONT FACE (Spanish Word) ═══ */}
          <div className="uiverse-card-front flex flex-col justify-between p-6">
            {/* Blurry floating decorative circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="uiverse-circle"></div>
              <div className="uiverse-circle bottom"></div>
              <div className="uiverse-circle right"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              {/* Top Row: Category Badge & CEFR Level */}
              <div className="flex justify-between items-center w-full">
                <span className="badge bg-black/25 backdrop-blur-[2px] text-white text-[9px] px-3 py-1 rounded-full font-hud font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <span className={`font-hud text-[10px] font-bold px-2.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                  {item.level}
                </span>
              </div>

              {/* Center: Spanish Word */}
              <div className="flex flex-col items-center justify-center my-auto text-center px-4">
                <p className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
                  {item.es}
                </p>
                <p className="mt-2.5 font-hud text-[10px] uppercase tracking-[0.2em] text-text-secondary font-semibold">
                  SPANISH
                </p>
              </div>

              {/* Bottom Row: Design Details & Tap Hint */}
              <div className="flex justify-between items-center w-full border-t border-structural/30 pt-3">
                <span className="text-text-tertiary text-xs">✦</span>
                <p className="font-body text-[10px] text-text-secondary opacity-75 animate-pulse">
                  tap to flip card
                </p>
                <span className="text-text-tertiary text-xs">✦</span>
              </div>
            </div>
          </div>

          {/* ═══ BACK FACE (English Translation) ═══ */}
          <div className="uiverse-card-back h-full w-full">
            {/* Glowing card border wrapper */}
            <div className={`uiverse-card-back-content ${borderClass}`}>
              {/* Top Row: Info label & CEFR Level */}
              <div className="flex justify-between items-center w-full absolute top-5 left-0 px-6 z-10">
                <span className="text-[9px] font-hud font-semibold uppercase tracking-widest text-text-secondary">
                  Meaning
                </span>
                <span className={`font-hud text-[10px] font-bold px-2.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                  {item.level}
                </span>
              </div>

              {/* Center Content: English Translation & Example */}
              <div className="flex flex-col items-center justify-center gap-4 text-center w-full my-auto px-2">
                <p className="font-display text-2xl sm:text-3xl font-bold text-accent-action leading-tight">
                  {item.en}
                </p>
                <div className="w-12 h-[2px] bg-structural" />

                {item.example ? (
                  <div className="space-y-2 px-2">
                    <p className="font-target text-base text-text-primary italic leading-relaxed font-medium">
                      &ldquo;{item.example}&rdquo;
                    </p>
                    {item.exampleTranslation && (
                      <p className="font-body text-xs text-text-secondary leading-normal">
                        {item.exampleTranslation}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 justify-center text-text-tertiary">
                    <Sparkles className="h-3.5 w-3.5 text-accent-action shrink-0" />
                    <span className="font-hud text-[9px] uppercase tracking-wider">
                      {item.category} Category
                    </span>
                  </div>
                )}
              </div>

              {/* Tags block */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center absolute bottom-16 left-0 px-6 w-full">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[8px] font-hud bg-white/80 px-2 py-0.5 rounded border border-structural text-text-secondary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Validation overlay for correct/incorrect */}
              {status !== 'idle' && status !== 'revealed' && (
                <div className={`absolute top-4 left-4 flex items-center justify-center h-7 w-7 rounded-full border ${
                  status === 'correct'
                    ? 'border-success/30 bg-success/10 text-success'
                    : 'border-error/30 bg-error/10 text-error'
                }`}>
                  {status === 'correct' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </div>
              )}

              {/* Bottom Row */}
              <div className="flex justify-between items-center w-full absolute bottom-5 left-0 px-6 border-t border-structural/30 pt-3">
                <span className="text-text-tertiary text-xs">✦</span>
                <p className="font-hud text-[9px] uppercase tracking-wider text-text-secondary font-semibold">
                  Kitsune's Path
                </p>
                <span className="text-text-tertiary text-xs">✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabCard;
