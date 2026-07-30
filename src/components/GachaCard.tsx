import { useState, type FC } from 'react';
import type { GachaCardData, RarityRank } from '../data/gachaData';

interface GachaCardProps {
  card: GachaCardData;
  onClick?: () => void;
  isUnlocked?: boolean;
}

export const getRarityBorderClass = (rank: RarityRank): string => {
  switch (rank) {
    case 'UR':
      return 'border-[#FFD700] shadow-[0_0_22px_rgba(255,215,0,0.65)]';
    case 'SSR':
      return 'border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.55)]';
    case 'SR':
      return 'border-[#C0C0C0] shadow-[0_0_14px_rgba(192,192,192,0.45)]';
    case 'Rare':
      return 'border-[#7D927D] shadow-[0_0_10px_rgba(125,146,125,0.35)]';
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
        border: 'border-[#FFFDF5]/90 shadow-[0_0_10px_rgba(255,215,0,0.8)]'
      };
    case 'SSR':
      return {
        bg: 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]',
        text: 'text-[#FFFDF5]',
        border: 'border-[#FFFDF5]/80 shadow-[0_0_8px_rgba(212,175,55,0.6)]'
      };
    case 'SR':
      return {
        bg: 'bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8]',
        text: 'text-[#1E293B]',
        border: 'border-white/90 shadow-[0_0_6px_rgba(226,232,240,0.5)]'
      };
    case 'Rare':
      return {
        bg: 'bg-gradient-to-br from-[#7D927D] to-[#4D614E]',
        text: 'text-[#F9F7F2]',
        border: 'border-[#99AF99]/80'
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

// Helper for elemental background themes
const getElementalGradient = (card: GachaCardData): string => {
  const move = (card.specialMove || '').toLowerCase();
  const name = card.name.toLowerCase();

  if (move.includes('sun') || move.includes('hinokami') || name.includes('yoriichi') || name.includes('tanjiro')) {
    return 'from-amber-600 via-red-600 to-yellow-500';
  }
  if (move.includes('thunder') || move.includes('lightning') || name.includes('zenitsu')) {
    return 'from-amber-500 via-yellow-400 to-amber-700';
  }
  if (move.includes('water') || move.includes('dead calm') || name.includes('giyu') || name.includes('jinbe')) {
    return 'from-blue-700 via-sky-600 to-indigo-900';
  }
  if (move.includes('flame') || move.includes('fire') || name.includes('rengoku') || name.includes('ace')) {
    return 'from-orange-600 via-amber-500 to-red-700';
  }
  if (move.includes('exploding blood') || name.includes('nezuko')) {
    return 'from-rose-600 via-pink-500 to-purple-900';
  }
  if (move.includes('moon') || name.includes('kokushibo')) {
    return 'from-purple-900 via-indigo-900 to-black';
  }
  if (move.includes('beast') || name.includes('inosuke')) {
    return 'from-cyan-700 via-sky-600 to-slate-800';
  }
  if (name.includes('luffy') || name.includes('roger') || name.includes('shanks')) {
    return 'from-red-700 via-amber-600 to-yellow-600';
  }
  if (name.includes('zoro') || move.includes('santoryu') || move.includes('wind')) {
    return 'from-emerald-700 via-teal-600 to-green-900';
  }
  return 'from-slate-800 via-[#2F353B] to-zinc-900';
};

export const GachaCard: FC<GachaCardProps> = ({ card, onClick, isUnlocked = true }) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const borderClass = getRarityBorderClass(card.rank);
  const badgeStyle = getRarityBadgeStyle(card.rank);
  const elementalGradient = getElementalGradient(card);

  return (
    <div
      onClick={onClick}
      className={`aspect-[2.5/3.5] w-full rounded-xl overflow-hidden relative border-[3px] shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer select-none bg-[#111111] flex flex-col justify-between ${borderClass} ${
        !isUnlocked ? 'grayscale opacity-60' : ''
      }`}
    >
      {/* ── BACKGROUND ART / ELEMENTAL ILLUSTRATION ──────────────────────── */}
      <div className="absolute inset-0 transition-transform duration-500 hover:scale-105">
        {/* Dynamic Image or Elemental Backdrop */}
        {card.imageUrl && !imgError ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-b ${elementalGradient} relative overflow-hidden flex flex-col items-center justify-center p-4`}>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/60 pointer-events-none" />
            
            {/* Center Character Emblem / Emoji */}
            <div className="relative z-10 text-center space-y-2 my-auto">
              <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto shadow-2xl">
                <span className="text-4xl drop-shadow-md">{card.emoji || '⚔️'}</span>
              </div>

              {card.specialMove && (
                <span className="inline-block bg-black/60 backdrop-blur-sm text-[#F9F7F2] text-[9px] font-sans font-semibold px-2.5 py-1 rounded-full border border-white/20 max-w-[180px] truncate">
                  {card.specialMove}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Glowing Radial Overlay for UR/SSR */}
        {(card.rank === 'UR' || card.rank === 'SSR') && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/40 via-transparent to-amber-300/15 pointer-events-none" />
        )}

        {/* Edge Vignette Shadow for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none" />
      </div>

      {/* ── CARD HEADER: TITLE & RANK BADGE ────────────────────────────────── */}
      <div className="relative z-10 p-2.5 flex items-start justify-between gap-1">
        {/* Character Name Top Center */}
        <div className="flex-1 text-center pr-6">
          <h3 className="font-serif text-sm sm:text-base font-extrabold text-[#FFFDF5] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] leading-tight">
            {card.name}
          </h3>
          <span className="text-[9px] font-sans font-semibold text-[#D4AF37] uppercase tracking-wider block drop-shadow-sm mt-0.5">
            {card.anime}
          </span>
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
        <div className="bg-[#FFFDF5]/95 backdrop-blur-sm border border-[#D4AF37]/60 rounded-lg p-2 shadow-inner text-center space-y-1">
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
