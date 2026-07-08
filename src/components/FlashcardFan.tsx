// FlashcardFan.tsx — Interactive flashcard shuffle fan for Training Grounds.
// A diagonal fanned hand of cards that auto-shuffles every ~2.5s with spring
// physics. Click any card to flip it (Spanish front → English back). The
// auto-shuffle pauses while a card is flipped so the user can read.

import { useState, useEffect, useCallback, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOK_LEVELS } from '../content';
import type { VocabWord } from '../content/types';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Fisher-Yates shuffle. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Collect a shuffled pool of vocab words from all book levels. */
function getVocabPool(): VocabWord[] {
  const all = BOOK_LEVELS.flatMap((level) => level.vocabulary);
  // Dedupe by word
  const seen = new Set<string>();
  const deduped = all.filter((v) => {
    if (seen.has(v.word.toLowerCase())) return false;
    seen.add(v.word.toLowerCase());
    return true;
  });
  return shuffle(deduped).slice(0, 20);
}

// ── Fan geometry ─────────────────────────────────────────────────────────────

const FAN_SIZE = 5;
const ROTATIONS = [-8, -4, 0, 4, 8]; // degrees
const Z_INDICES = [1, 2, 3, 2, 1];
const X_OFFSETS = [-40, -20, 0, 20, 40]; // px horizontal spread

// ── Spring config ────────────────────────────────────────────────────────────

const SHUFFLE_SPRING = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.8 };
const FLIP_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

// ── Single Flashcard ─────────────────────────────────────────────────────────

interface FlashcardProps {
  word: VocabWord;
  rotation: number;
  zIndex: number;
  xOffset: number;
  isFront: boolean;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: FC<FlashcardProps> = ({
  word,
  rotation,
  zIndex,
  xOffset,
  isFront,
  isFlipped,
  onFlip,
}) => {
  return (
    <motion.div
      layout
      animate={{
        rotate: rotation,
        x: xOffset,
        scale: isFront ? 1.08 : 0.95,
      }}
      transition={SHUFFLE_SPRING}
      style={{
        zIndex: isFlipped ? 50 : zIndex,
        perspective: 800,
      }}
      onClick={onFlip}
      className="absolute cursor-pointer select-none"
    >
      {/* Card shell — this div rotates for the flip */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={FLIP_SPRING}
        className="relative w-44 h-60 sm:w-52 sm:h-72"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Front Face ── */}
        <motion.div
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className={`absolute inset-0 rounded-2xl border flex flex-col items-center justify-center p-5 shadow-xl
            ${isFront
              ? 'bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-elevated-2)] border-[var(--accent-action)]/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
              : 'bg-[var(--bg-elevated)] border-[var(--structural)] shadow-lg'
            }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
        >
          {/* Decorative corner marks */}
          <span className="absolute top-3 left-3 text-[var(--accent-action)] opacity-30 text-lg font-display">✦</span>
          <span className="absolute bottom-3 right-3 text-[var(--accent-action)] opacity-30 text-lg font-display">✦</span>

          {/* Spanish word */}
          <p className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center leading-tight">
            {word.word}
          </p>
          <p className="mt-2 font-hud text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Español
          </p>

          {/* Subtle tap hint on the front card */}
          {isFront && (
            <p className="absolute bottom-4 font-body text-[9px] text-[var(--text-tertiary)] opacity-60">
              tap to flip
            </p>
          )}
        </motion.div>

        {/* ── Back Face ── */}
        <motion.div
          animate={{ opacity: isFlipped ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 rounded-2xl border bg-gradient-to-br from-[var(--bg-elevated-2)] to-[var(--bg-elevated)] border-[var(--accent-action)]/30 shadow-xl flex flex-col items-center justify-center p-5 gap-3"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
        >
          {/* English meaning */}
          <p className="font-display text-xl sm:text-2xl font-bold text-[var(--accent-action)] text-center">
            {word.meaning}
          </p>

          {/* Divider */}
          <div className="w-12 h-px bg-[var(--structural)]" />

          {/* Example sentence */}
          <div className="text-center">
            <p className="font-target text-sm text-[var(--text-primary)] italic">
              &ldquo;{word.example}&rdquo;
            </p>
            <p className="font-body text-xs text-[var(--text-secondary)] mt-1">
              {word.exampleTranslation}
            </p>
          </div>

          {/* Pronunciation */}
          <p className="font-hud text-[9px] text-[var(--text-tertiary)] uppercase tracking-wider mt-1">
            {word.pronunciation}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ── FlashcardFan (main) ──────────────────────────────────────────────────────

const FlashcardFan: FC = () => {
  const [pool] = useState<VocabWord[]>(() => getVocabPool());
  const [deckIndex, setDeckIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const pauseRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // The 5 visible cards at any time
  const visibleCards: VocabWord[] = [];
  for (let i = 0; i < FAN_SIZE; i++) {
    visibleCards.push(pool[(deckIndex + i) % pool.length]);
  }

  // Auto-shuffle — advances deckIndex every 2.5s
  const advance = useCallback(() => {
    if (pauseRef.current) return;
    setFlippedIndex(null);
    setDeckIndex((prev) => (prev + 1) % pool.length);
  }, [pool.length]);

  useEffect(() => {
    timerRef.current = setInterval(advance, 2500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  // Handle flip — pause auto-shuffle while flipped
  const handleFlip = useCallback(
    (fanPos: number) => {
      if (flippedIndex === fanPos) {
        // Un-flip
        setFlippedIndex(null);
        pauseRef.current = false;
      } else {
        // Flip this card and pause
        setFlippedIndex(fanPos);
        pauseRef.current = true;

        // Auto-resume after 4s
        setTimeout(() => {
          setFlippedIndex(null);
          pauseRef.current = false;
        }, 4000);
      }
    },
    [flippedIndex],
  );

  if (pool.length === 0) return null;

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🃏</span>
        <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          Flashcard Shuffle
        </p>
      </div>
      <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-1">
        Watch &amp; tap to learn
      </h2>
      <p className="font-body text-xs text-[var(--text-secondary)] mb-8">
        Cards shuffle automatically — tap any card to flip and see its meaning.
      </p>

      {/* Fan container */}
      <div className="relative flex items-center justify-center h-72 sm:h-80">
        <AnimatePresence mode="popLayout">
          {visibleCards.map((word, fanPos) => (
            <Flashcard
              key={`${word.word}-${(deckIndex + fanPos) % pool.length}`}
              word={word}
              rotation={ROTATIONS[fanPos]}
              zIndex={Z_INDICES[fanPos]}
              xOffset={X_OFFSETS[fanPos]}
              isFront={fanPos === 2}
              isFlipped={flippedIndex === fanPos}
              onFlip={() => handleFlip(fanPos)}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FlashcardFan;
