import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Flame, Compass, Sword } from 'lucide-react';
import { GachaCard } from './GachaCard';
import type { GachaCardData } from '../data/gachaData';

interface PackOpeningOverlayProps {
  isOpen: boolean;
  drawnCard: GachaCardData | null;
  onClose: () => void;
}

export const getRarityGlowColor = (rank?: string): string => {
  switch ((rank || '').toUpperCase()) {
    case 'UR':
      return 'rgba(255, 215, 0, 0.85)';
    case 'SSR':
      return 'rgba(212, 175, 55, 0.75)';
    case 'SR':
      return 'rgba(192, 192, 192, 0.65)';
    case 'R':
    case 'RARE':
      return 'rgba(125, 146, 125, 0.55)';
    case 'C':
    case 'COMMON':
    default:
      return 'rgba(47, 53, 59, 0.45)';
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
  const isDs = drawnCard.anime === 'Demon Slayer';
  const packImage = isDs ? '/cards/ds_pack_clean.jpg' : '/cards/op_pack_clean.jpg';

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
            {isFlipped ? `${drawnCard.rank} Card Summoned` : 'Opening Mystical Pack...'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFFDF5] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {isFlipped ? drawnCard.name : `${drawnCard.anime} Collection`}
          </h2>
        </motion.div>

        {/* ── CENTER ANIMATION & GLOW STAGE ─────────────────────────────────── */}
        <div className="relative z-10 flex items-center justify-center my-auto w-full max-w-md">
          {/* RADIAL RARITY GLOW BURST */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: isFlipped ? 1 : 0.35,
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
              {/* ── PHASE 1: STITCH SERENE LEXICON CARD PACK FOIL (FRONT FACE) ── */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden border-2 border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-2xl backface-hidden select-none"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Check if local Stitch Pack Image exists */}
                {packImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={packImage}
                      alt={`${drawnCard.anime} Pack`}
                      className="w-full h-full object-cover"
                    />
                    {/* Metallic sheen over pack illustration */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-amber-200/20 pointer-events-none" />
                  </div>
                ) : (
                  /* Stylized Split Sage / Charcoal Foil Design Fallback */
                  <div className="relative w-full h-full bg-[#2F353B] flex flex-col justify-between p-4 overflow-hidden">
                    {/* Diagonal Split Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7D927D] via-[#7D927D] to-transparent w-[140%] h-[140%] -top-1/4 -left-1/4 transform -rotate-12 pointer-events-none opacity-90" />

                    {/* Top Left Kanji/Emblem Flag */}
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="bg-[#2F353B] border border-[#D4AF37]/80 text-[#D4AF37] px-2 py-1 rounded-b-md shadow-md text-xs font-serif font-bold">
                        {isDs ? '滅' : '海賊'}
                      </div>
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#FFFDF5]">
                          MYSTERY CARD
                        </span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Center Iconography */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-2 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] border-2 border-[#FFFDF5] flex items-center justify-center text-[#FFFDF5] shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse">
                        {isDs ? <Sword className="w-8 h-8" /> : <Compass className="w-8 h-8" />}
                      </div>
                      <h3 className="font-serif text-lg font-extrabold text-[#FFFDF5] tracking-wide drop-shadow-md">
                        {isDs ? 'DEMON SLAYER' : 'ONE PIECE'}
                      </h3>
                      <span className="bg-[#2F353B]/90 text-[#D4AF37] text-[9px] font-sans font-bold px-3 py-0.5 rounded-full border border-[#D4AF37]/40 uppercase tracking-widest shadow-sm">
                        Premium Card Pack
                      </span>
                    </div>

                    {/* Footer Lore */}
                    <div className="relative z-10 text-center space-y-0.5">
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-1" />
                      <p className="font-serif italic text-[11px] text-[#FFFDF5]/90">
                        The Altar Awakens
                      </p>
                    </div>
                  </div>
                )}
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
