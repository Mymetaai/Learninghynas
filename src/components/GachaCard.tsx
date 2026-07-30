import { type FC } from 'react';
import type { GachaCardData, RarityRank } from '../data/gachaData';

interface GachaCardProps {
  card: GachaCardData;
  onClick?: () => void;
  isUnlocked?: boolean;
}

export const getRarityBorder = (rank: RarityRank): string => {
  switch (rank) {
    case 'SSR':
      return 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]';
    case 'SS':
    case 'S':
      return 'border-[#C0C0C0] shadow-[0_0_12px_rgba(192,192,192,0.25)]';
    case 'Epic':
      return 'border-[#8A79AF] shadow-[0_0_10px_rgba(138,121,175,0.25)]';
    case 'Rare':
      return 'border-[#7D927D] shadow-[0_0_10px_rgba(125,146,125,0.2)]';
    case 'Common':
    default:
      return 'border-[#2F353B]';
  }
};

export const getRarityBadgeStyle = (rank: RarityRank): { bg: string; text: string; border: string } => {
  switch (rank) {
    case 'SSR':
      return { bg: 'bg-[#D4AF37]/20', text: 'text-[#D4AF37]', border: 'border-[#D4AF37]/40' };
    case 'SS':
    case 'S':
      return { bg: 'bg-[#C0C0C0]/20', text: 'text-[#E5E5E5]', border: 'border-[#C0C0C0]/40' };
    case 'Epic':
      return { bg: 'bg-[#8A79AF]/20', text: 'text-[#B4A7D6]', border: 'border-[#8A79AF]/40' };
    case 'Rare':
      return { bg: 'bg-[#7D927D]/20', text: 'text-[#95AC95]', border: 'border-[#7D927D]/40' };
    case 'Common':
    default:
      return { bg: 'bg-[#2F353B]/60', text: 'text-[#999999]', border: 'border-[#444444]' };
  }
};

export const GachaCard: FC<GachaCardProps> = ({ card, onClick, isUnlocked = true }) => {
  const borderStyle = getRarityBorder(card.rank);
  const badgeStyle = getRarityBadgeStyle(card.rank);

  return (
    <div
      onClick={onClick}
      className={`aspect-[2.5/3.5] w-full rounded-xl overflow-hidden relative border-2 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer select-none ${borderStyle} ${
        !isUnlocked ? 'grayscale opacity-60' : ''
      }`}
    >
      {/* ── BACKGROUND ART / COLOR BLOCK ──────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-500 hover:scale-105"
        style={{
          backgroundColor: card.imagePlaceholderColor || '#2F353B'
        }}
      >
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={(e) => {
              // Fallback to solid color block if image URL fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : null}

        {/* Subtle Gold Gradient Overlay for SSR */}
        {card.rank === 'SSR' && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/30 via-transparent to-amber-300/10 pointer-events-none" />
        )}
      </div>

      {/* Top Tag: Anime Name */}
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-[#2F353B]/80 backdrop-blur-md text-[#F9F7F2] text-[9px] font-sans font-semibold px-2 py-0.5 rounded-full border border-white/10">
          {card.anime}
        </span>
      </div>

      {/* Emoji Top Right */}
      {card.emoji && (
        <div className="absolute top-2 right-2 z-10 text-xs">
          <span>{card.emoji}</span>
        </div>
      )}

      {/* ── NAMEPLATE (BOTTOM BANNER) ─────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 bg-[#2F353B]/90 backdrop-blur-sm p-2.5 flex items-center justify-between gap-1 border-t border-white/10 z-10">
        <div className="min-w-0 flex-1">
          <h4 className="font-serif text-white text-xs sm:text-sm font-bold truncate leading-tight">
            {card.name}
          </h4>
          <p className="font-sans text-[10px] text-[#777775] truncate mt-0.5">
            {card.quote}
          </p>
        </div>

        {/* Rank Badge */}
        <span
          className={`shrink-0 text-[10px] font-sans font-extrabold px-2 py-0.5 rounded-full border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
        >
          {card.rank}
        </span>
      </div>
    </div>
  );
};

export default GachaCard;
