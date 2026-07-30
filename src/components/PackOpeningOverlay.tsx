import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { GachaCard } from './GachaCard';
import type { GachaCardData, RarityRank } from '../data/gachaData';

interface PackOpeningOverlayProps {
  isOpen: boolean;
  drawnCard: GachaCardData | null;
  onClose: () => void;
}

export const getRarityGlowColor = (rank?: RarityRank): string => {
  switch (rank) {
    case 'SSR':
      return 'rgba(212, 175, 55, 0.45)';
    case 'SS':
    case 'S':
      return 'rgba(192, 192, 192, 0.4)';
    case 'Epic':
      return 'rgba(138, 121, 175, 0.4)';
    case 'Rare':
      return 'rgba(125, 146, 125, 0.4)';
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111]/95 backdrop-blur-md p-4 cursor-pointer select-none"
      >
        {/* ── RADIAL RARITY GLOW BURST ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isFlipped ? 1 : 0.2,
            scale: isFlipped ? 1.3 : 1
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
          }}
        />

        {/* ── CARD REVEAL CONTAINER ─────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xs sm:max-w-sm w-full">
          {/* Top Status Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 space-y-1"
          >
            <span className="font-serif italic text-xs text-[#7D927D]">
              The Unearthly Vault Altar
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              {isFlipped ? 'Mystical Card Summoned!' : 'Summoning Secret Lore...'}
            </h3>
          </motion.div>

          {/* 3D Flip Card Shell */}
          <div className="w-64 sm:w-72 perspective-1000">
            <motion.div
              animate={{
                rotateY: isFlipped ? 180 : 0,
                scale: isFlipped ? 1.15 : 1,
                y: isFlipped ? 0 : [0, -10, 0]
              }}
              transition={
                isFlipped
                  ? { duration: 0.8, type: 'spring', stiffness: 120, damping: 14 }
                  : { y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } }
              }
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-[2.5/3.5] w-full"
            >
              {/* ── PHASE 1: CARD BACK (FRONT FACE) ─────────────────────────── */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden border-2 border-[#7D927D]/40 bg-[#2F353B] p-6 flex flex-col items-center justify-between shadow-2xl backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-full flex justify-between items-center text-[#7D927D]">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#777775]">
                    VAULT SUMMON
                  </span>
                  <Sparkles className="h-4 w-4" />
                </div>

                <div className="flex flex-col items-center justify-center my-auto space-y-3">
                  <div className="h-16 w-16 rounded-full bg-[#7D927D]/10 border border-[#7D927D]/30 flex items-center justify-center text-[#7D927D]">
                    <ShieldAlert className="h-8 w-8 animate-pulse" />
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7D927D]/50 to-transparent" />
                </div>

                <div className="text-center space-y-1">
                  <p className="font-serif italic text-xs text-white/70">
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

          {/* ── BOTTOM DISMISS INSTRUCTION ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFlipped ? 1 : 0.5 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 space-y-1"
          >
            <p className="font-sans text-xs text-[#777775] animate-pulse">
              {isFlipped ? 'Click anywhere to continue' : 'Awakening the mystical cards...'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PackOpeningOverlay;
