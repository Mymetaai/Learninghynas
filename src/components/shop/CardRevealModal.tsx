import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCw, X } from 'lucide-react';
import Lightning from '../effects/Lightning';
import Vortex from '../effects/Vortex';
import { audioFeedback } from '../../utils/audioFeedback';

export interface CardRevealItem {
  id: string;
  name: string;
  rarity?: string; // 'legendary' | 'epic' | 'rare' | 'common'
  rarity_code?: string; // 'UR' | 'SSR' | 'SR' | 'R' | 'C'
  rank?: string;
  imageUrl?: string;
  image_url?: string;
  attack?: string | number;
  defense?: string | number;
  bounty?: string | number;
  specialMove?: string;
  quote?: string;
  description?: string;
  anime?: string;
}

export interface CardRevealModalProps {
  card: CardRevealItem | null;
  isOpen: boolean;
  onClose: () => void;
  isDuplicate?: boolean;
  refundedCoins?: number;
}

export const CardRevealModal: React.FC<CardRevealModalProps> = ({
  card,
  isOpen,
  onClose,
  isDuplicate = false,
  refundedCoins = 0,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
      audioFeedback.playFeedback('correct');
      // Auto flip card after 600ms if user hasn't clicked
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, card?.id]);

  if (!isOpen || !card) return null;

  // Tap anywhere handler: if flipped, close modal. If not flipped, flip to front.
  const handleOverlayTap = () => {
    if (isFlipped) {
      audioFeedback.playFeedback('click');
      onClose();
    } else {
      setIsFlipped(true);
      audioFeedback.playFeedback('click');
    }
  };

  const name = card.name || 'Mystic Card';
  const rarity = (card.rarity || card.rank || 'common').toLowerCase();
  const rarityCode =
    card.rarity_code ||
    card.rank ||
    (rarity === 'legendary' ? 'UR' : rarity === 'epic' ? 'SSR' : rarity === 'rare' ? 'SR' : 'R');
  
  const imageUrl = card.imageUrl || card.image_url || '/assets/gacha/op1.png';
  const attack = card.attack ?? card.bounty ?? '850';
  const defense = card.defense ?? card.specialMove ?? '720';
  const quote = card.quote || card.description || 'A legendary card forged in the heat of battle.';

  // Determine authentic booster pack cover artwork for card back
  const isOnePiece = (card.anime && card.anime.toLowerCase().includes('one piece')) || card.id.startsWith('op');
  const packImageCover = isOnePiece ? '/cards/op_pack_clean.jpg' : '/cards/ds_pack_clean.jpg';

  const isHighRarity = rarity === 'legendary' || rarity === 'epic' || rarityCode === 'UR' || rarityCode === 'SSR';

  const getRarityBadgeColor = () => {
    if (rarity === 'legendary' || rarityCode === 'UR') return 'bg-amber-500 text-slate-950 border-amber-300';
    if (rarity === 'epic' || rarityCode === 'SSR') return 'bg-purple-600 text-white border-purple-300';
    if (rarity === 'rare' || rarityCode === 'SR') return 'bg-sky-600 text-white border-sky-300';
    return 'bg-slate-700 text-slate-200 border-slate-500';
  };

  const getCardBorderGlow = () => {
    if (rarity === 'legendary' || rarityCode === 'UR') return 'border-amber-400 shadow-[0_0_45px_rgba(245,158,11,0.7)]';
    if (rarity === 'epic' || rarityCode === 'SSR') return 'border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.6)]';
    if (rarity === 'rare' || rarityCode === 'SR') return 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.5)]';
    return 'border-slate-600 shadow-xl';
  };

  return (
    <AnimatePresence>
      <div
        onClick={handleOverlayTap}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none font-sans overflow-hidden cursor-pointer"
      >
        {/* 1. LIGHTNING THUNDERSTORM BACKGROUND LAYER (Z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <Lightning
            backgroundColor="#000000"
            intensity={isHighRarity ? 90 : 65}
            lightningColor="#EBA301"
            speed={60}
          />
        </div>

        {/* 2. TORNADO VORTEX PARTICLE LAYER (Z-10) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-80 overflow-hidden">
          <div className="w-[600px] h-[600px] relative">
            <Vortex
              background="transparent"
              bottomRadius={900}
              topRadius={350}
              waistRadius={60}
              zoom={70}
              speed={12}
              direction="right"
              cometOptions={{ comets: true, count: 7, color: '#EBA301', speed: 8 }}
              dotOptions={{ dots: true, count: 200, color: '#FFFFFF', glow: 8 }}
              lineOptions={{ count: 6000, color: '#7D927D', speed: 9 }}
            />
          </div>
        </div>

        {/* Close Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 z-30 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-full border border-slate-700 backdrop-blur-md shadow-xl transition-all cursor-pointer"
          title="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 3. SUMMONED CARD CONTENT CONTAINER (Z-20) */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative z-20 flex flex-col items-center max-w-sm w-full pointer-events-auto"
          onClick={(e) => {
            // Stop propagation only if not flipped yet, so user can tap card to flip it
            if (!isFlipped) {
              e.stopPropagation();
              handleOverlayTap();
            }
            // If already flipped, let event bubble up to overlay tap to close
          }}
        >
          {/* Top Title Banner */}
          <div className="mb-4 text-center">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-slate-900/90 px-4 py-1.5 rounded-full border border-amber-500/40 shadow-lg inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
              {isDuplicate ? 'DUPLICATE CARD REVEALED' : 'NEW CARD SUMMONED!'}
            </span>
          </div>

          {/* 3D FLIP CARD CONTAINER */}
          <div className="w-80 h-[480px] relative cursor-pointer [perspective:1000px] group">
            <motion.div
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-full relative [transform-style:preserve-3d]"
            >
              {/* ── CARD BACK (0° FACE) — HIGH-FIDELITY BOOSTER PACK ARTWORK ── */}
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border-4 border-amber-500/80 bg-slate-950 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
                  {/* Authentic One Piece / Demon Slayer Booster Pack Cover */}
                  <img
                    src={packImageCover}
                    alt={isOnePiece ? 'One Piece Booster Pack' : 'Demon Slayer Booster Pack'}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Metallic Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Bottom Tap Prompt Pill */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/60 shadow-xl whitespace-nowrap">
                    <p className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <RotateCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
                      Tap to Flip & Reveal
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD FRONT (180° FACE) — CHARACTER ARTWORK & STATS ── */}
              <div
                className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border-4 bg-[#0F141C] overflow-hidden flex flex-col items-center transition-all ${getCardBorderGlow()}`}
              >
                {/* Rarity Badge (Top Right Pill) */}
                <div className={`absolute top-3 right-3 z-20 font-mono font-extrabold px-3 py-1 rounded-full text-xs shadow-md border ${getRarityBadgeColor()}`}>
                  {rarityCode}
                </div>

                {/* Duplicate Refund Pill */}
                {isDuplicate && (
                  <div className="absolute top-3 left-3 z-20 bg-slate-950/90 text-amber-400 font-mono font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-amber-500/50 shadow-md">
                    +{refundedCoins} KC Refund
                  </div>
                )}

                {/* Card Artwork Image Container */}
                <div className="w-full h-80 relative overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = isOnePiece ? '/assets/gacha/op1.png' : '/assets/gacha/ds1.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>

                {/* Bottom Text Panel */}
                <div className="w-full bg-[#F9F7F2] p-4 text-center border-t border-[#7D927D]/30 flex flex-col gap-1.5 shrink-0 grow justify-center">
                  <h3 className="font-serif text-xl font-bold text-[#2F353B] leading-tight truncate px-1">
                    {name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-3 font-mono text-xs text-[#777775]">
                    <span>
                      ATK: <strong className="text-[#2F353B]">{attack}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>
                      DEF: <strong className="text-[#2F353B]">{defense}</strong>
                    </span>
                  </div>

                  <p className="font-serif italic text-xs text-[#777775] leading-snug line-clamp-2 px-2">
                    "{quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Close / Collect Button & Tap Anywhere Hint */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border-none"
            >
              <Trophy className="h-4 w-4" />
              Collect & Continue
            </button>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest opacity-80">
              (Tap anywhere to close)
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CardRevealModal;
