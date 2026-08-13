import React, { useState, useMemo } from 'react';
import { Coins, Sparkles } from 'lucide-react';
import { useStatsStore } from '../../state/statsStore';
import { useShopStore } from '../../state/shopStore';
import { useUserData } from '../../hooks/useUserData';
import { ONE_PIECE_CARDS } from '../../content/onePieceCards';
import { DEMON_SLAYER_CARDS } from '../../content/demonSlayerCards';
import Lightning from '../effects/Lightning';
import CardRevealModal, { type CardRevealItem } from './CardRevealModal';

const DRAW_COST = 20;

export interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isAccent?: boolean;
  highlightColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit = '',
  isAccent = false,
  highlightColor = 'text-slate-100',
}) => {
  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg transition-all hover:border-amber-500/40">
      <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
        {label}
      </span>
      <div className={`font-mono text-2xl font-extrabold ${isAccent ? 'text-emerald-400' : highlightColor}`}>
        {value}
        {unit && <span className="text-xs font-normal text-slate-400 ml-0.5">{unit}</span>}
      </div>
    </div>
  );
};

export const SummoningAltar: React.FC = () => {
  const localCoins = useStatsStore((s) => s.coins);
  const collectedCardIds = useStatsStore((s) => s.collectedCardIds);
  const shopInventory = useShopStore((s) => s.inventory);
  const drawCardBooster = useShopStore((s) => s.drawCardBooster);

  const { userData, spendCoins: userSpendCoins } = useUserData();
  const coins = userData?.kitsune_coins ?? localCoins;

  const [selectedSeries, setSelectedSeries] = useState<'one-piece' | 'demon-slayer'>('one-piece');
  const [revealedCard, setRevealedCard] = useState<CardRevealItem | null>(null);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const [lastDrawDuplicate, setLastDrawDuplicate] = useState(false);

  const activeCards = useMemo(() => {
    return selectedSeries === 'one-piece' ? ONE_PIECE_CARDS : DEMON_SLAYER_CARDS;
  }, [selectedSeries]);

  const ownedCardIds = useMemo(() => {
    const fromStats = collectedCardIds || [];
    const fromShop = shopInventory.ownedCards || [];
    return Array.from(new Set([...fromStats, ...fromShop]));
  }, [collectedCardIds, shopInventory.ownedCards]);

  const totalCardsInSet = activeCards.length;

  const userOwnedSetCards = useMemo(() => {
    return activeCards.filter((card) => ownedCardIds.includes(card.id));
  }, [activeCards, ownedCardIds]);

  const ownedCardsCount = userOwnedSetCards.length;
  const completionPercentage = Math.round((ownedCardsCount / totalCardsInSet) * 100) || 0;

  const legendariesCount = useMemo(() => {
    return userOwnedSetCards.filter(
      (c) => (c as any).rarity === 'legendary' || (c as any).rarity === 'UR' || (c as any).rank === 'UR'
    ).length;
  }, [userOwnedSetCards]);

  const epicsCount = useMemo(() => {
    return userOwnedSetCards.filter(
      (c) => (c as any).rarity === 'epic' || (c as any).rarity === 'SSR' || (c as any).rank === 'SSR'
    ).length;
  }, [userOwnedSetCards]);

  const handleDrawCard = async () => {
    if (coins < DRAW_COST) {
      alert('Not enough Kitsune Coins!');
      return;
    }

    const spent = await userSpendCoins(DRAW_COST);
    if (!spent && localCoins < DRAW_COST) {
      alert('Not enough Kitsune Coins!');
      return;
    }

    // Select random card based on weighted drop rates
    const roll = Math.random() * 100;
    let targetRarity: 'legendary' | 'epic' | 'rare' | 'common' = 'common';
    if (roll < 5) targetRarity = 'legendary';
    else if (roll < 25) targetRarity = 'epic';
    else if (roll < 60) targetRarity = 'rare';

    const matchingCards = activeCards.filter((c) => {
      const r = ((c as any).rarity || 'common').toLowerCase();
      return r === targetRarity;
    });

    const pool = matchingCards.length > 0 ? matchingCards : activeCards;
    const drawn = pool[Math.floor(Math.random() * pool.length)];

    const isDup = ownedCardIds.includes(drawn.id);
    setLastDrawDuplicate(isDup);

    // Save to stores
    useStatsStore.getState().collectCard(drawn.id);
    drawCardBooster(
      selectedSeries === 'one-piece' ? 'one_piece' : 'demon_slayer',
      activeCards.map((c) => c.id),
      0
    );

    const revealItem: CardRevealItem = {
      id: drawn.id,
      name: drawn.name,
      rarity: (drawn as any).rarity,
      rarity_code: (drawn as any).rarityCode || (drawn as any).rank || ((drawn as any).rarity === 'legendary' ? 'UR' : 'SSR'),
      imageUrl: (drawn as any).imageUrl || (drawn as any).image_url,
      attack: (drawn as any).bounty || (drawn as any).attack,
      defense: (drawn as any).specialMove || (drawn as any).defense,
      quote: (drawn as any).description || (drawn as any).quote,
      anime: selectedSeries === 'one-piece' ? 'One Piece' : 'Demon Slayer',
    };

    setRevealedCard(revealItem);
    setIsRevealOpen(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-28 flex flex-col gap-6 relative z-10 select-none">
      {/* Series Selector Pills */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedSeries('one-piece')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
              selectedSeries === 'one-piece'
                ? 'bg-amber-600 text-white border-amber-400/60 shadow-md'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            🏴‍☠️ One Piece Set ({ONE_PIECE_CARDS.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedSeries('demon-slayer')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
              selectedSeries === 'demon-slayer'
                ? 'bg-purple-600 text-white border-purple-400/60 shadow-md'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            ⚔️ Demon Slayer Set ({DEMON_SLAYER_CARDS.length})
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 px-3 py-1.5 rounded-full font-mono text-xs font-bold text-amber-400 shadow-sm">
          <Coins className="h-4 w-4 text-amber-400" />
          <span>{coins} KC</span>
        </div>
      </div>

      {/* Main Summoning Altar Box */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-slate-700/60 bg-[#0F141C] shadow-2xl">
        {/* Background Shader Layer */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <Lightning backgroundColor="#0F141C" intensity={50} lightningColor="#593C0C" speed={40} />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Pack Visual Frame */}
          <div className="w-56 sm:w-64 aspect-[2.5/3.5] rounded-2xl overflow-hidden border-2 border-amber-500/80 ring-2 ring-amber-500/30 shadow-2xl relative group transition-transform hover:scale-105 cursor-pointer bg-slate-950 shrink-0">
            <img
              src={selectedSeries === 'one-piece' ? '/cards/op_pack_clean.jpg' : '/cards/ds_pack_clean.jpg'}
              alt={selectedSeries === 'one-piece' ? 'One Piece Pack' : 'Demon Slayer Pack'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-200/20 pointer-events-none" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-md text-amber-400 border border-amber-500/60 font-mono text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
              Cost: {DRAW_COST} KC
            </div>
          </div>

          {/* Summon Altar Details & Controls */}
          <div className="flex-1 space-y-4 max-w-lg">
            <div>
              <h2 className="font-serif text-3xl font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-amber-400" />
                Summoning Altar
              </h2>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Unlock {totalCardsInSet} mystical cards from the {selectedSeries === 'one-piece' ? 'One Piece' : 'Demon Slayer'} universe.
              </p>
            </div>

            {/* Drop Rates Breakdown */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-3.5 font-mono text-xs text-slate-300">
              <div className="flex justify-between px-2 py-1 bg-slate-950/50 rounded-lg">
                <span>Legendary:</span>
                <span className="text-amber-400 font-bold">5%</span>
              </div>
              <div className="flex justify-between px-2 py-1 bg-slate-950/50 rounded-lg">
                <span>Epic:</span>
                <span className="text-purple-400 font-bold">20%</span>
              </div>
              <div className="flex justify-between px-2 py-1 bg-slate-950/50 rounded-lg">
                <span>Rare:</span>
                <span className="text-sky-400 font-bold">35%</span>
              </div>
              <div className="flex justify-between px-2 py-1 bg-slate-950/50 rounded-lg">
                <span>Common:</span>
                <span className="text-slate-200 font-bold">40%</span>
              </div>
            </div>

            {/* Draw Button */}
            <button
              type="button"
              onClick={handleDrawCard}
              disabled={coins < DRAW_COST}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs border-none flex items-center justify-center gap-2"
            >
              <Coins className="h-4 w-4" />
              ✦ DRAW x1 ({DRAW_COST} COINS)
            </button>
          </div>
        </div>
      </div>

      {/* 4-Column Bottom Stats Grid - Aligned max-w-5xl */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <StatCard label="OWNED CARDS" value={ownedCardsCount} />
        <StatCard isAccent label="COMPLETION RATE" unit="%" value={completionPercentage} />
        <StatCard highlightColor="text-amber-400" label="LEGENDARIES FOUND" value={legendariesCount} />
        <StatCard highlightColor="text-purple-400" label="EPICS FOUND" value={epicsCount} />
      </div>

      {/* Card Reveal Modal */}
      <CardRevealModal
        card={revealedCard}
        isOpen={isRevealOpen}
        onClose={() => setIsRevealOpen(false)}
        isDuplicate={lastDrawDuplicate}
        refundedCoins={5}
      />
    </div>
  );
};

export default SummoningAltar;
