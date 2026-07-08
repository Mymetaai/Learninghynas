import { useState, useMemo, useEffect, type FC } from 'react';
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

const ROTATIONS = [-10, -5, 0, 5, 10];
const Z_INDICES = [10, 20, 30, 20, 10];
const X_OFFSETS = [-70, -35, 0, 35, 70];

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

  // Load and shuffle deck based on level selection
  const initializeDeck = (level: string) => {
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

    // Shuffle Fisher-Yates
    const shuffled = [...sourceItems].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setIndex(0);
    setIsFlipped(false);
  };

  // Initialize deck on mount or level change
  useEffect(() => {
    initializeDeck(selectedLevel);
  }, [selectedLevel]);

  // Hands-free auto-advance / flip loop:
  // Shows front for 1.5s -> Flips and shows back for 2.5s -> Advances to next card
  useEffect(() => {
    if (isPaused || deck.length === 0) return;

    let timer: any;

    if (isFlipped) {
      // Show translation, then advance and flip back (Hold for 2.5 seconds)
      timer = setTimeout(() => {
        setIsFlipped(false);
        setIndex((prev) => (prev + 1) % deck.length);
      }, 2500);
    } else {
      // Show Spanish word for 1.5 seconds, then reveal translation
      timer = setTimeout(() => {
        setIsFlipped(true);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isFlipped, isPaused, index, deck.length]);

  // Get the 5 visible cards in the fan centered around the current index
  const visibleCards = useMemo(() => {
    if (deck.length === 0) return [];
    const cards: VocabItem[] = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (index + offset + deck.length) % deck.length;
      cards.push(deck[idx]);
    }
    return cards;
  }, [deck, index]);

  const handleCardClick = (fanPos: number) => {
    // Resume auto-play when user interacts, restarting loop
    setIsPaused(false);

    if (fanPos === 2) {
      setIsFlipped((prev) => !prev);
    } else {
      const diff = fanPos - 2;
      const targetIndex = (index + diff + deck.length) % deck.length;
      setIndex(targetIndex);
      setIsFlipped(false);
    }
  };

  const handleManualNext = () => {
    setIsPaused(true);
    setIsFlipped(false);
    setIndex((prev) => (prev + 1) % deck.length);
  };

  const handleManualPrev = () => {
    setIsPaused(true);
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const progressPercent = deck.length > 0 ? Math.round(((index + 1) / deck.length) * 100) : 0;

  const LEVEL_ACCENTS: Record<string, string> = {
    All: 'bg-accent-action',
    A1: 'bg-emerald-500',
    A2: 'bg-sky-500',
    B1: 'bg-amber-500',
    B2: 'bg-orange-500',
    C1: 'bg-purple-500',
  };

  const activeAccent = LEVEL_ACCENTS[selectedLevel] || LEVEL_ACCENTS.All;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Level selector header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-structural/45 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-paper/10 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
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
        >
          <Shuffle className="h-3.5 w-3.5" />
          Reshuffle
        </button>
      </div>

      {/* Progress tracker */}
      <div className="w-full p-4 rounded-xl border border-structural/40 bg-paper/5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-hud text-[10px] text-text-secondary uppercase tracking-wider">
            Reviewing Shuffled Deck ({selectedLevel === 'All' ? 'All Levels' : `${selectedLevel} Level`})
          </span>
          <span className="font-hud text-[11px] text-text-primary font-bold tabular-nums">
            {index + 1} / {deck.length} words
          </span>
        </div>
        <div className="w-full h-1.5 bg-structural/40 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
            className={`h-full ${activeAccent}`}
          />
        </div>
      </div>

      {/* Fanned stack view */}
      <div className="relative w-full h-[23rem] sm:h-[27rem] flex items-center justify-center overflow-visible mt-2">
        {deck.length === 0 ? (
          <p className="text-sm font-body text-text-secondary">Loading words...</p>
        ) : (
          visibleCards.map((item, idx) => {
            const fanPos = idx;
            const isFront = fanPos === 2;
            const isItemFlipped = isFront && isFlipped;

            return (
              <VocabCard
                key={`${item.id}-${index}-${fanPos}`}
                item={item}
                flipped={isItemFlipped}
                onFlip={() => handleCardClick(fanPos)}
                status="idle"
                rotation={ROTATIONS[fanPos]}
                zIndex={Z_INDICES[fanPos]}
                xOffset={X_OFFSETS[fanPos]}
                isFront={isFront}
              />
            );
          })
        )}
      </div>

      {/* Player Controller UI */}
      <div className="mx-auto max-w-sm w-full flex flex-col items-center gap-3 mt-4">
        {/* Play/Pause state message */}
        <p className="font-hud text-[9px] uppercase tracking-widest text-text-tertiary">
          {isPaused ? 'Auto-play paused · Interact manually' : 'Auto-playing hands-free...'}
        </p>

        {/* Buttons Row */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleManualPrev}
            className="p-3 rounded-full border border-structural bg-paper/5 text-text-secondary hover:text-text-primary hover:border-text-primary transition-all cursor-pointer shadow-sm active:scale-95"
            title="Previous Card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className={`p-4 rounded-full text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center ${
              isPaused ? 'bg-accent-action hover:bg-accent-action-hover' : 'bg-success hover:bg-success/90'
            }`}
            title={isPaused ? 'Resume Auto-Play' : 'Pause Auto-Play'}
          >
            {isPaused ? <Play className="h-6 w-6 fill-white" /> : <Pause className="h-6 w-6 fill-white" />}
          </button>

          <button
            onClick={handleManualNext}
            className="p-3 rounded-full border border-structural bg-paper/5 text-text-secondary hover:text-text-primary hover:border-text-primary transition-all cursor-pointer shadow-sm active:scale-95"
            title="Next Card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoFlashcardsPlayer;
