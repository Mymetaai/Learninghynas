import { type FC } from 'react';
import type { GachaCardData, RarityRank } from '../data/gachaData';

interface GachaCardProps {
  card: GachaCardData;
  onClick?: () => void;
  isUnlocked?: boolean;
}

export const getRarityBorderClass = (rank: RarityRank): string => {
  switch (rank) {
    case 'UR':
      return 'border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.6)]';
    case 'SSR':
      return 'border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.5)]';
    case 'SR':
      return 'border-[#C0C0C0] shadow-[0_0_14px_rgba(192,192,192,0.4)]';
    case 'Rare':
      return 'border-[#7D927D] shadow-[0_0_10px_rgba(125,146,125,0.3)]';
    case 'Common':
    default:
      return 'border-[#2F353B] shadow-md';
  }
};

export const getRarityBadgeStyle = (rank: RarityRank): { bg: string; text: string; border: string } => {
  switch (rank) {
    case 'UR':
      return {
        bg: 'bg-gradient-to-br from-[#FFD700] via-[#F59E0B] to-[#D97706]',
        text: 'text-[#FFFDF5] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
        border: 'border-[#FFFDF5]/80 shadow-[0_0_10px_rgba(255,215,0,0.8)]'
      };
    case 'SSR':
      return {
        bg: 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]',
        text: 'text-[#FFFDF5]',
        border: 'border-[#FFFDF5]/70 shadow-[0_0_8px_rgba(212,175,55,0.6)]'
      };
    case 'SR':
      return {
        bg: 'bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8]',
        text: 'text-[#1E293B]',
        border: 'border-white/80 shadow-[0_0_6px_rgba(226,232,240,0.5)]'
      };
    case 'Rare':
      return {
        bg: 'bg-gradient-to-br from-[#7D927D] to-[#556B55]',
        text: 'text-[#F9F7F2]',
        border: 'border-[#99AF99]/60'
      };
    case 'Common':
    default:
      return {
        bg: 'bg-[#2F353B]',
        text: 'text-[#D1D5DB]',
        border: 'border-[#4B5563]'
      };
  }
};

export const GachaCard: FC<GachaCardProps> = ({ card, onClick, isUnlocked = true }) => {
  const borderClass = getRarityBorderClass(card.rank);
  const badgeStyle = getRarityBadgeStyle(card.rank);

  return (
    <div
      onClick={onClick}
      className={`aspect-[2.5/3.5] w-full rounded-xl overflow-hidden relative border-[3px] shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer select-none bg-[#111111] flex flex-col justify-between ${borderClass} ${
        !isUnlocked ? 'grayscale opacity-60' : ''
      }`}
    >
      {/* ── BACKGROUND ART / COLOR OVERLAY ────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-500 hover:scale-105"
        style={{
          backgroundColor: card.imagePlaceholderColor || '#1E1E1E'
        }}
      >
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : null}

        {/* Dynamic Glowing Radial Overlay for UR/SSR */}
        {(card.rank === 'UR' || card.rank === 'SSR') && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/35 via-transparent to-amber-300/15 pointer-events-none" />
        )}

        {/* Decorative Dark Vignette & Edge Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* ── CARD HEADER: TITLE & RANK BADGE ────────────────────────────────── */}
      <div className="relative z-10 p-2.5 flex items-start justify-between gap-1">
        {/* Character Name Top Center */}
        <div className="flex-1 text-center pr-6">
          <h3 className="font-serif text-sm sm:text-base font-extrabold text-[#FFFDF5] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight">
            {card.name}
          </h3>
        </div>

        {/* Ornate Circular Rank Seal Badge */}
        <div
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border-2 font-serif text-xs font-black shrink-0 ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
        >
          {card.rank}
        </div>
      </div>

      {/* ── CARD FOOTER: FLOATING PARCHMENT NAMEPLATE ─────────────────────── */}
      <div className="relative z-10 p-2">
        <div className="bg-[#FFFDF5]/95 backdrop-blur-sm border border-[#D4AF37]/50 rounded-lg p-2 shadow-inner text-center space-y-1">
          {/* Stats Display */}
          <div className="font-sans text-[11px] font-extrabold text-[#2F353B] flex items-center justify-center gap-3 tracking-tight">
            <span>Attack: <span className="text-[#C4796B]">{card.attack}</span></span>
            <span className="text-stone-300">|</span>
            <span>Defense: <span className="text-[#7D927D]">{card.defense}</span></span>
          </div>

          {/* Character Quote */}
          <p className="font-serif italic text-[10px] text-[#5C524E] leading-tight line-clamp-2 px-1">
            Quote: &ldquo;{card.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default GachaCard;
