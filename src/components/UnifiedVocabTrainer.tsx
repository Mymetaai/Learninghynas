import { useState, useMemo, useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, X, HelpCircle, RefreshCw, Sparkles, Shuffle, ArrowRight } from 'lucide-react';
import { useVocabDeck } from '../hooks/useVocabDeck';
import { getVocabCategories, getVocabByLevelAndCategory } from '../data/vocab';
import type { VocabItem } from '../content/types';

const CEFR_LEVELS: VocabItem['level'][] = ['A1', 'A2', 'B1', 'B2', 'C1'];

const UnifiedVocabTrainer: FC = () => {
  const [activeLevel, setActiveLevel] = useState<VocabItem['level']>('A1');
  
  // Dynamically load categories for selected level
  const categories = useMemo(() => getVocabCategories(activeLevel), [activeLevel]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // Sync category selection when level changes
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  // Load items based on level & category
  const deckItems = useMemo(() => {
    if (!activeCategory) return [];
    return getVocabByLevelAndCategory(activeLevel, activeCategory);
  }, [activeLevel, activeCategory]);

  const {
    current,
    index,
    deck,
    status,
    advance,
    reveal,
    shuffle: shuffleDeck,
    reset: resetDeck,
  } = useVocabDeck(deckItems);

  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scrollbar sliding logic for category tabs
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<'left' | 'right' | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    if (!scrollDir || !scrollRef.current) return;
    
    let active = true;
    const scrollContainer = scrollRef.current;
    
    const tick = () => {
      if (!active) return;
      if (scrollDir === 'left') {
        scrollContainer.scrollLeft -= scrollSpeed;
      } else if (scrollDir === 'right') {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      requestAnimationFrame(tick);
    };
    
    requestAnimationFrame(tick);
    return () => {
      active = false;
    };
  }, [scrollDir, scrollSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const width = rect.width;
    
    const edgeSize = 100; // Trigger distance in pixels from left/right edge
    const maxSpeed = 7;   // Maximum speed of scrolling
    
    if (relativeX < edgeSize) {
      setScrollDir('left');
      const ratio = (edgeSize - relativeX) / edgeSize;
      setScrollSpeed(ratio * maxSpeed);
    } else if (width - relativeX < edgeSize) {
      setScrollDir('right');
      const ratio = (edgeSize - (width - relativeX)) / edgeSize;
      setScrollSpeed(ratio * maxSpeed);
    } else {
      setScrollDir(null);
      setScrollSpeed(0);
    }
  };

  const handleMouseLeave = () => {
    setScrollDir(null);
    setScrollSpeed(0);
  };

  // Reset answer/hint states on item change
  useEffect(() => {
    setUserAnswer('');
    setShowHint(false);
    // Focus input automatically if not on mobile/tablet or just generally for UX
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [current]);

  // Handle auto-advance on correct answer
  useEffect(() => {
    if (status === 'correct') {
      const timer = setTimeout(() => {
        advance();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [status, advance]);

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white/90 backdrop-blur-sm border border-[#7D927D]/20 rounded-2xl bg-white/5">
        <p className="font-sans text-sm text-text-secondary">
          No vocabulary words found for this category.
        </p>
      </div>
    );
  }

  // Handle checking the user's input
  const handleCheck = () => {
    if (status === 'correct') return;
    reveal(userAnswer);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const handleInputFocus = () => {
    if (status === 'incorrect') {
      reveal(undefined); // Reset status to idle
    }
  };

  const progressPercent = deck.length > 0 ? Math.round(((index + 1) / deck.length) * 100) : 0;

  // Render question text helper
  const renderQuestion = () => {
    const hasExample = current.example && current.example.trim().length > 0;
    
    if (hasExample && current.example) {
      const target = current.es.toLowerCase().trim();
      const sentence = current.example;
      const indexWord = sentence.toLowerCase().indexOf(target);
      
      if (indexWord !== -1) {
        const before = sentence.substring(0, indexWord);
        const after = sentence.substring(indexWord + current.es.length);
        return (
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-sans text-base font-semibold text-text-primary text-center">
            <span>{before}</span>
            <span className="inline-block border-b border-accent-action px-2 py-0.5 text-accent-action min-w-[5rem]">
              {status === 'correct' || status === 'revealed' ? current.es : '_____'}
            </span>
            <span>{after}</span>
          </div>
        );
      }
    }

    return (
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
          Translate English to Spanish
        </span>
        <p className="font-serif text-xl sm:text-2xl font-bold text-text-primary italic">
          &ldquo;{current.en}&rdquo;
        </p>
        {(status === 'revealed') && (
          <p className="mt-2 font-serif text-lg font-bold text-accent-action">
            Answer: {current.es}
          </p>
        )}
      </div>
    );
  };

  const getHintContent = () => {
    if (current.exampleTranslation) {
      return `Sentence Translation: "${current.exampleTranslation}"`;
    }
    const cleanWord = current.es.replace(/[¿?¡!...]/g, '').trim();
    return `Starts with letter "${cleanWord[0].toUpperCase()}" · Contains ${cleanWord.length} letters`;
  };

  // Color tokens per CEFR Level for border accents
  const LEVEL_ACCENTS: Record<VocabItem['level'], string> = {
    'Pre-A1': 'bg-slate-500',
    A1: 'bg-emerald-500',
    A2: 'bg-sky-500',
    B1: 'bg-amber-500',
    B2: 'bg-orange-500',
    C1: 'bg-purple-500',
    C2: 'bg-rose-500',
    'Part 1': 'bg-emerald-500',
    'Part 2': 'bg-sky-500',
    'Part 3': 'bg-amber-500',
    'Part 4': 'bg-orange-500',
    'Part 5': 'bg-purple-500',
    'Part 6': 'bg-rose-500',
    'Part 7': 'bg-indigo-500',
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Level & Category Selector Tabs */}
      <div className="flex flex-col gap-4">
        {/* Level Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-structural/40 pb-3 justify-center md:justify-start">
          {CEFR_LEVELS.map((lvl) => {
            const isActive = activeLevel === lvl;
            const accentBg = LEVEL_ACCENTS[lvl];
            return (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`relative px-4 py-1.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-sm font-semibold'
                    : 'bg-white/5 border border-structural hover:bg-white/10 text-text-secondary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeLevelBg"
                    className={`absolute inset-0 rounded-lg -z-10 ${accentBg}`}
                    transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {lvl} Level
              </button>
            );
          })}
        </div>

        {/* Category Tabs: Slidable on mouse hover left/right */}
        <div
          ref={scrollRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-accent-action text-white shadow-sm'
                    : 'bg-white/5 border border-structural hover:bg-white/10 text-text-secondary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Unified Header: Deck Progress Bar & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-structural/50 bg-white/5">
        {/* Progress Tracker */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
              Deck Progress
            </span>
            <span className="font-mono text-[11px] text-text-primary font-bold tabular-nums">
              {index + 1} / {deck.length} words
            </span>
          </div>
          <div className="w-full h-2 bg-structural/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
              className={`h-full ${LEVEL_ACCENTS[activeLevel]}`}
            />
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={shuffleDeck}
            title="Shuffle Deck"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-structural/60 bg-white/5 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-text-primary transition-all cursor-pointer"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </button>
          <button
            onClick={resetDeck}
            title="Reset Deck Progress"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-structural/60 bg-white/5 font-mono text-[10px] uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-text-primary transition-all cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* 3. Training Area: Fill-in-the-Blanks full-width centered */}
      <div className="max-w-3xl mx-auto w-full flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="text-base">✍️</span>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
            Sentence Practice
          </p>
        </div>

        <section className="w-full min-h-[18rem] bg-white/90 backdrop-blur-sm border border-[#7D927D]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between bg-white/5 transition-all duration-300">
          <div>
            <h3 className="font-serif text-lg font-bold text-text-primary mb-1">
              Fill in the Blank
            </h3>
            <p className="font-sans text-xs text-text-secondary mb-6">
              Type the correct Spanish vocabulary item to complete the translation.
            </p>

            {/* The Sentence Prompt */}
            <div className="my-6 p-4 rounded-xl border border-structural/35 bg-white/5 min-h-[4rem] flex items-center justify-center">
              {renderQuestion()}
            </div>

            {/* Input Area */}
            <div className="flex flex-col gap-2 relative">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyPress}
                  placeholder="Type Spanish here..."
                  disabled={status === 'correct'}
                  className={`flex-1 font-target rounded-xl px-4 py-2.5 text-base focus:outline-none transition-all duration-200 ${
                    status === 'correct'
                      ? 'border-2 border-[#7D927D] bg-[#7D927D] text-white font-bold shadow-md scale-[1.01]'
                      : status === 'incorrect'
                      ? 'border-2 border-[#C4796B] bg-[#C4796B] text-white font-bold shadow-md animate-shake'
                      : 'border-structural border bg-white focus:border-[#7D927D] text-[#2F353B]'
                  }`}
                />
                {status !== 'correct' && (
                  <button
                    onClick={handleCheck}
                    disabled={!userAnswer.trim()}
                    className={`px-5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                      userAnswer.trim()
                        ? 'bg-[#7D927D] text-white hover:bg-[#6B826B] shadow-sm'
                        : 'bg-structural/30 text-[#777775]/50 cursor-not-allowed'
                    }`}
                  >
                    Check
                  </button>
                )}
                {(status === 'correct' || status === 'revealed') && (
                  <button
                    onClick={advance}
                    className="px-5 bg-[#7D927D] text-white hover:bg-[#6B826B] rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Validation Feedback message */}
              <AnimatePresence>
                {status === 'incorrect' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[#C4796B] font-bold mt-1 pl-1 flex items-center gap-1"
                  >
                    <X className="h-4 w-4 text-[#C4796B]" /> Incorrect, try again! Or click "Reveal Answer" below.
                  </motion.p>
                )}
                {status === 'correct' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[#7D927D] font-bold mt-1 pl-1 flex items-center gap-1"
                  >
                    <Check className="h-4 w-4 text-[#7D927D]" /> Correct! Moving to next card...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Hint & Control panel */}
          <div className="mt-8 pt-4 border-t border-structural/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-text-tertiary hover:text-accent-action transition-colors cursor-pointer"
              >
                <HelpCircle className="h-4 w-4" />
                {showHint ? 'Hide Hint' : 'Need Hint?'}
              </button>

              {status !== 'correct' && (
                <button
                  onClick={() => reveal()}
                  className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary hover:text-accent-action transition-colors cursor-pointer"
                >
                  Reveal Answer
                </button>
              )}
            </div>

            {/* Hint Content Display */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden rounded-xl border border-structural/40 bg-white/5 p-3 text-xs font-sans text-text-secondary"
                >
                  <div className="flex gap-2">
                    <Sparkles className="h-4 w-4 text-[#7D927D] shrink-0 mt-0.5" />
                    <div>
                      <p>{getHintContent()}</p>
                      {status === 'incorrect' && (
                        <p className="text-[10px] text-error font-semibold mt-1">
                          Answer contains letter: &ldquo;{current.es[0]}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UnifiedVocabTrainer;
