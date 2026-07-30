import { useState, type FC } from 'react';
import type { GachaCardData } from '../data/gachaData';

interface GachaCardProps {
  card: GachaCardData;
  onClick?: () => void;
  isUnlocked?: boolean;
}

export const getRarityBorderColor = (rank: string): string => {
  switch (rank.toUpperCase()) {
    case 'UR':
      return 'border-[#FFD700]';
    case 'SSR':
      return 'border-[#E5C158]';
    case 'SR':
      return 'border-[#C0C0C0]';
    case 'R':
    case 'RARE':
      return 'border-[#7D927D]';
    case 'C':
    case 'COMMON':
    default:
      return 'border-[#777775]';
  }
};

export const getRaritySealStyle = (rank: string): string => {
  switch (rank.toUpperCase()) {
    case 'UR':
      return 'bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] text-[#2F353B] border-2 border-white';
    case 'SSR':
      return 'bg-gradient-to-br from-[#E5C158] to-[#B8860B] text-white border-2 border-white';
    case 'SR':
      return 'bg-gradient-to-br from-[#E2E8F0] to-[#94A3B8] text-[#1E293B] border-2 border-white';
    case 'R':
    case 'RARE':
      return 'bg-gradient-to-br from-[#7D927D] to-[#4D614E] text-white border-2 border-white';
    case 'C':
    case 'COMMON':
    default:
      return 'bg-gradient-to-br from-[#777775] to-[#2F353B] text-white border-2 border-white';
  }
};

export const GachaCard: FC<GachaCardProps> = ({ card, onClick, isUnlocked = true }) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const borderColor = getRarityBorderColor(card.rank);
  const sealStyle = getRaritySealStyle(card.rank);

  return (
    <div
      onClick={onClick}
      className={`relative aspect-[2.5/3.5] w-full max-w-[240px] rounded-xl overflow-visible shadow-lg transition-transform hover:-translate-y-2 cursor-pointer select-none ${
        !isUnlocked ? 'grayscale opacity-60' : ''
      }`}
    >
      {/* ── THE ART LAYER ────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 rounded-xl overflow-hidden border-[3px] ${borderColor} bg-[#111111] z-0`}>
        {/* Fallback Gradient Background (Behind Image) */}
        <div className={`w-full h-full bg-gradient-to-br ${card.themeColor || 'from-slate-800 to-slate-900'} absolute inset-0 z-0 flex flex-col items-center justify-center p-4`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/60 pointer-events-none" />
          <div className="relative z-10 text-center space-y-2 my-auto">
            <span className="font-serif text-2xl font-black text-white/30 tracking-widest uppercase block">
              {card.anime === 'Demon Slayer' ? 'KIMETSU' : 'ONE PIECE'}
            </span>
            <div className="w-16 h-0.5 bg-white/30 mx-auto" />
          </div>
        </div>

        {/* Character Image (Layered on top of gradient) */}
        {card.imageUrl && !imgError && (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover object-top rounded-xl absolute inset-0 z-10"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}

        {/* Subtle Vignette Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />
      </div>

      {/* ── TOP-RIGHT RARITY SEAL ────────────────────────────────────────── */}
      <div
        className={`absolute -top-3 -right-3 w-[45px] h-[45px] rounded-full flex items-center justify-center font-serif font-bold text-sm shadow-md z-20 ${sealStyle}`}
      >
        {card.rank}
      </div>

      {/* ── FLOATING NAMEPLATE ───────────────────────────────────────────── */}
      <div className="absolute bottom-3 left-3 right-3 bg-[#F9F7F2]/95 backdrop-blur-md border border-amber-200/50 p-2 rounded-md shadow-inner flex flex-col items-center text-center z-20">
        <h3 className="font-serif text-[#2F353B] font-bold text-sm leading-tight mb-1">
          {card.name}
        </h3>
        <div className="font-sans text-[10px] text-[#2F353B] font-semibold border-b border-[#777775]/20 pb-1 w-full">
          Attack: {card.attack} | Defense: {card.defense}
        </div>
        <p className="font-serif italic text-[10px] text-[#777775] mt-1 line-clamp-2">
          &ldquo;{card.quote}&rdquo;
        </p>
      </div>
    </div>
  );
};

export default GachaCard;
