// AutoFlashcardsPlayer.tsx — Stacked card-deck flashcard player.
// Merged A1–C1 vocabulary, auto-shuffle every 2–3s, pause/resume,
// manual prev/next/reshuffle with level filtering.
//
// Visual: single active card centered with 3 stacked silhouettes behind it.
// Inspired by Uiverse.io/ElSombrero2/tricky-robin-67.

import { useState, useMemo, useEffect, useCallback, type FC } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shuffle, ArrowLeft, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import VocabCard from './VocabCard';
import type { VocabItem } from '../content/types';

// Load all datasets
import a1Data from '../data/vocab/a1.json';
import a2Data from '../data/vocab/a2.json';
import b1Data from '../data/vocab/b1.json';
import b2Data from '../data/vocab/b2.json';
import c1Data from '../data/vocab/c1.json';

const LEVEL_DATA: Record<string, VocabItem[]> = {
  A1: a1Data as VocabItem[],
  A2: a2Data as VocabItem[],
  B1: b1Data as VocabItem[],
  B2: b2Data as VocabItem[],
  C1: c1Data as VocabItem[],
};

const ALL_LEVELS = ['All', 'A1', 'A2', 'B1', 'B2', 'C1'];

// ── Level accent colors for header dot + progress bar ───────────────────────

const LEVEL_ACCENTS: Record<string, { bar: string; dot: string }> = {
  All: { bar: 'bg-accent-action', dot: 'bg-accent-action' },
  A1:  { bar: 'bg-emerald-500',   dot: 'bg-emerald-500'   },
  A2:  { bar: 'bg-sky-500',       dot: 'bg-sky-500'       },
  B1:  { bar: 'bg-amber-500',     dot: 'bg-amber-500'     },
  B2:  { bar: 'bg-orange-500',    dot: 'bg-orange-500'    },
  C1:  { bar: 'bg-purple-500',    dot: 'bg-purple-500'    },
};

// ── Fisher-Yates shuffle ────────────────────────────────────────────────────

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Component ───────────────────────────────────────────────────────────────

interface AutoFlashcardsPlayerProps {
  onBack: () => void;
}

const AutoFlashcardsPlayer: FC<AutoFlashcardsPlayerProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [deck, setDeck] = useState<VocabItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // ── Deck initialization ─────────────────────────────────────────────────

  const initializeDeck = useCallback((level: string) => {
    let sourceItems: VocabItem[] = [];
    if (level === 'All') {
      sourceItems = [
        ...a1Data,
        ...a2Data,
        ...b1Data,
        ...b2Data,
        ...c1Data,
      ] as VocabItem[];
    } else {
      sourceItems = LEVEL_DATA[level] || [];
    }
    const shuffled = fisherYatesShuffle(sourceItems);
    setDeck(shuffled);
    setIndex(0);
    setIsFlipped(false);
  }, []);

  useEffect(() => {
    initializeDeck(selectedLevel);
  }, [selectedLevel, initializeDeck]);

  // ── Auto-advance / flip loop ────────────────────────────────────────────
  // Shows front 1.5s → flips → shows back 2.5s → advances

  useEffect(() => {
    if (isPaused || deck.length === 0) return;

    let timer: ReturnType<typeof setTimeout>;

    if (isFlipped) {
      timer = setTimeout(() => {
        setIsFlipped(false);
        setIndex((prev) => (prev + 1) % deck.length);
      }, 2500);
    } else {
      timer = setTimeout(() => {
        setIsFlipped(true);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isFlipped, isPaused, index, deck.length]);

  // ── Get 3 nearby cards for the stack silhouettes ────────────────────────

  const stackItems = useMemo(() => {
    if (deck.length < 2) return [];
    const items: VocabItem[] = [];
    for (let offset = 1; offset <= 3; offset++) {
      const idx = (index + offset) % deck.length;
      items.push(deck[idx]);
    }
    return items;
  }, [deck, index]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleCardClick = useCallback(() => {
    setIsPaused(false);
    setIsFlipped((prev) => !prev);
  }, []);

  const handleManualNext = useCallback(() => {
    setIsPaused(true);
    setIsFlipped(false);
    setIndex((prev) => (prev + 1) % deck.length);
  }, [deck.length]);

  const handleManualPrev = useCallback(() => {
    setIsPaused(true);
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + deck.length) % deck.length);
  }, [deck.length]);

  // ── Derived values ──────────────────────────────────────────────────────

  const progressPercent = deck.length > 0 ? Math.round(((index + 1) / deck.length) * 100) : 0;
  const accent = LEVEL_ACCENTS[selectedLevel] || LEVEL_ACCENTS.All;
  const levelLabel = selectedLevel === 'All' ? 'ALL LEVELS' : `${selectedLevel} LEVEL`;
  const currentItem = deck[index];

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="w-full flex flex-col gap-5">
      {/* ── Level selector header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-structural/45 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-paper/10 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="font-hud text-xs uppercase tracking-widest text-text-secondary">
            CEFR Level:
          </span>
          <div className="flex flex-wrap gap-1">
            {ALL_LEVELS.map((lvl) => {
              const isSel = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-full text-xs font-hud tracking-wide cursor-pointer transition-all ${
                    isSel
                      ? 'bg-accent-action text-white shadow-sm font-semibold'
                      : 'bg-paper/5 border border-structural hover:bg-paper/10 text-text-secondary'
                  }`}
                  aria-label={`Filter by ${lvl} level`}
                  aria-pressed={isSel}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => initializeDeck(selectedLevel)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-structural bg-paper/5 font-hud text-[10px] uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all cursor-pointer"
          aria-label="Reshuffle deck"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Reshuffle
        </button>
      </div>

      {/* ── Header bar with progress ── */}
      <div className="w-full px-4 py-3 rounded-xl border border-structural/40 bg-paper/5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-1">
            <span className="font-hud text-[10px] text-text-secondary uppercase tracking-[0.15em] leading-none">
              REVIEWING SHUFFLED DECK ({levelLabel})
            </span>
            <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
          </div>
          <span className="font-hud text-[12px] text-text-primary font-bold tabular-nums">
            {index + 1} / {deck.length} words
          </span>
        </div>
        <div className="w-full h-1.5 bg-structural/40 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
            className={`h-full rounded-full ${accent.bar}`}
          />
        </div>
      </div>

      {/* ── Stacked deck view ── */}
      <div className="relative w-full flex items-center justify-center mt-2 mb-2" style={{ minHeight: '460px' }}>
        {deck.length === 0 || !currentItem ? (
          <p className="text-sm font-body text-text-secondary">Loading words...</p>
        ) : (
          <motion.div
            key={`card-${currentItem.id}-${index}`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 26 }}
            className="w-full flex items-center justify-center"
          >
            <VocabCard
              item={currentItem}
              flipped={isFlipped}
              onFlip={handleCardClick}
              status="idle"
              stackItems={stackItems}
            />
          </motion.div>
        )}
      </div>

      {/* ── Player controls ── */}
      <div className="mx-auto max-w-sm w-full flex flex-col items-center gap-3">
        {/* State message */}
        <p className="font-hud text-[9px] uppercase tracking-widest text-text-tertiary">
          {isPaused ? 'Auto-play paused · Interact manually' : 'Auto-playing hands-free...'}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleManualPrev}
            className="p-3 rounded-full border border-structural bg-paper/5 text-text-secondary hover:text-text-primary hover:border-text-primary transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className={`p-4 rounded-full text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center ${
              isPaused ? 'bg-accent-action hover:bg-accent-action-hover' : 'bg-success hover:bg-success/90'
            }`}
            aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          >
            {isPaused ? <Play className="h-6 w-6 fill-white" /> : <Pause className="h-6 w-6 fill-white" />}
          </button>

          <button
            onClick={handleManualNext}
            className="p-3 rounded-full border border-structural bg-paper/5 text-text-secondary hover:text-text-primary hover:border-text-primary transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoFlashcardsPlayer;
