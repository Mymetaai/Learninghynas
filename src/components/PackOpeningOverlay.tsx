import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Flame, ShieldAlert } from 'lucide-react';
import { GachaCard } from './GachaCard';
import type { GachaCardData, RarityRank } from '../data/gachaData';

interface PackOpeningOverlayProps {
  isOpen: boolean;
  drawnCard: GachaCardData | null;
  onClose: () => void;
}

export const getRarityGlowColor = (rank?: RarityRank): string => {
  switch (rank) {
    case 'UR':
      return 'rgba(255, 215, 0, 0.75)';
    case 'SSR':
      return 'rgba(212, 175, 55, 0.65)';
    case 'SR':
      return 'rgba(192, 192, 192, 0.55)';
    case 'Rare':
      return 'rgba(125, 146, 125, 0.45)';
    case 'Common':
    default:
      return 'rgba(47, 53, 59, 0.4)';
  }
};

export const PackOpeningOverlay: FC<PackOpeningOverlayProps> = ({ isOpen, drawnCard, onClose }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
      // Phase 1 -> Phase 2 transition after 1.5 seconds
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !drawnCard) return null;

  const glowColor = getRarityGlowColor(drawnCard.rank);
  const isHighRarity = drawnCard.rank === 'UR' || drawnCard.rank === 'SSR';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#111111]/95 backdrop-blur-md p-6 cursor-pointer select-none overflow-hidden"
      >
        {/* ── TOP HEADER / CARD NAME TITLE ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 z-20 space-y-1"
        >
          <span className="font-serif italic text-xs text-[#D4AF37] tracking-widest uppercase">
            {isFlipped ? `${drawnCard.rank} Card Summoned` : 'Summoning Secret Lore...'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFFDF5] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {isFlipped ? drawnCard.name : 'The Summoning Altar'}
          </h2>
        </motion.div>

        {/* ── CENTER ANIMATION & GLOW STAGE ─────────────────────────────────── */}
        <div className="relative z-10 flex items-center justify-center my-auto w-full max-w-md">
          {/* RADIAL RARITY GLOW BURST */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: isFlipped ? 1 : 0.25,
              scale: isFlipped ? 1.4 : 1
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
            }}
          />

          {/* LIGHTNING & AURA PARTICLES FOR UR / SSR REVEAL */}
          {isFlipped && isHighRarity && (
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
              {/* Lightning vectors */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.8, 1], scale: 1.2 }}
                transition={{ duration: 0.4, repeat: 3 }}
                className="absolute text-amber-300/80 -top-12 -left-12"
              >
                <Zap className="w-16 h-16 transform -rotate-45" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.8, 1], scale: 1.2 }}
                transition={{ duration: 0.4, delay: 0.1, repeat: 3 }}
                className="absolute text-amber-400/80 -bottom-10 -right-10"
              >
                <Zap className="w-20 h-20 transform rotate-12" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.8, 1], scale: 1.1 }}
                transition={{ duration: 0.5, delay: 0.2, repeat: 3 }}
                className="absolute text-amber-200/70 -top-10 -right-12"
              >
                <Sparkles className="w-14 h-14" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.8, 1], scale: 1.1 }}
                transition={{ duration: 0.5, delay: 0.3, repeat: 3 }}
                className="absolute text-amber-300/70 -bottom-12 -left-10"
              >
                <Flame className="w-16 h-16" />
              </motion.div>
            </div>
          )}

          {/* 3D FLIP CARD SHELL */}
          <div className="w-64 sm:w-72 perspective-1000">
            <motion.div
              animate={{
                rotateY: isFlipped ? 180 : 0,
                scale: isFlipped ? 1.25 : 1,
                y: isFlipped ? 0 : [0, -10, 0]
              }}
              transition={
                isFlipped
                  ? { duration: 0.8, type: 'spring', stiffness: 110, damping: 14 }
                  : { y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } }
              }
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-[2.5/3.5] w-full"
            >
              {/* ── PHASE 1: CARD BACK (FRONT FACE) ─────────────────────────── */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#1E1E1E] p-6 flex flex-col items-center justify-between shadow-2xl backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-full flex justify-between items-center text-[#D4AF37]">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]/80">
                    MYSTERY CARD
                  </span>
                  <Sparkles className="h-4 w-4" />
                </div>

                <div className="flex flex-col items-center justify-center my-auto space-y-3">
                  <div className="h-20 w-20 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <ShieldAlert className="h-10 w-10 animate-pulse" />
                  </div>
                  <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                </div>

                <div className="text-center space-y-1">
                  <p className="font-serif italic text-xs text-[#FFFDF5]/80">
                    The Altar Awakens
                  </p>
                </div>
              </div>

              {/* ── PHASE 2: CARD REVEAL (BACK FACE, ROTATED 180 DEG) ───────── */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <GachaCard card={drawnCard} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM DISMISS & ACTION FOOTER ───────────────────────────────── */}
        <div className="w-full max-w-4xl flex items-center justify-between z-20 mb-4">
          <div className="flex-1 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isFlipped ? 1 : 0.6 }}
              transition={{ delay: 0.4 }}
              className="font-serif italic text-sm text-[#FFFDF5]/80 animate-pulse"
            >
              {isFlipped ? 'Tap anywhere to continue' : 'Awakening mystical powers...'}
            </motion.p>
          </div>

          {isFlipped && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:opacity-90 text-[#FFFDF5] font-serif text-xs font-bold px-5 py-2.5 rounded-full shadow-lg border border-[#FFFDF5]/40 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              Share Card
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PackOpeningOverlay;
