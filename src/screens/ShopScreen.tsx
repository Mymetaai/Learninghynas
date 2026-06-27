import { useState, useMemo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStatsStore } from '../state/statsStore';
import { ONE_PIECE_CARDS, type OnePieceCard } from '../content/onePieceCards';
import { DEMON_SLAYER_CARDS, type DemonSlayerCard } from '../content/demonSlayerCards';
import {
  ShoppingBag,
  Sparkles,
  Lock,
  Coins,
  X,
  Trophy,
  RefreshCw,
  Info
} from 'lucide-react';

const HOTSPOTS = {
  series: {
    title: "OP Franchise Designation",
    explanation: "Stands for 'One Piece'. This watermark designates that this card belongs to the official One Piece series set, validating its compatibility in standard cross-franchise matches and deck construction rules."
  },
  faction: {
    title: "Faction & Card Type",
    explanation: "Represents the pirate crew or group affiliation. In the official rule manual (Page 3), the card type determines what synergies, crew effects, and searcher abilities apply to it in deck building."
  },
  rarity: {
    title: "Rarity Designation",
    explanation: "Defines the collection value. Epic (purple) and Legendary (gold) cards feature special holographic frames and glowing borders."
  },
  portrait: {
    title: "Illustration Portrait",
    explanation: "A high-fidelity transparent render of the character. The rule manual defines this as the character artwork. Tapping a legendary card triggers a unique Conqueror's Haki animation."
  },
  name: {
    title: "Pirate Name",
    explanation: "The official name registered by the World Government Marine Headquarters, denoting their identity in the pirate age."
  },
  bounty: {
    title: "Bounty Valuation (Belly)",
    explanation: "The capture reward offered by the Marines. Higher bounties indicate greater power levels and threat to the World Government."
  },
  attack: {
    title: "Signature Combat Technique",
    explanation: "The character's primary combat move, showcasing their unique Devil Fruit powers, sword techniques, or Haki strikes."
  }
};

const DRAW_COST = 20;
const DUP_REFUND = 5;

const ShopScreen: FC = () => {
  const coins = useStatsStore((s) => s.coins);
  const spendCoins = useStatsStore((s) => s.spendCoins);
  const collectCard = useStatsStore((s) => s.collectCard);
  const collectedCardIds = useStatsStore((s) => s.collectedCardIds);
  
  // Add direct reward cheat button for testing
  const addRewards = useStatsStore((s) => s.addRewards);

  // Gacha states
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCard, setDrawnCard] = useState<OnePieceCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawResult, setDrawResult] = useState<'new' | 'duplicate' | null>(null);
  
  // Series selector state
  const [selectedSeries, setSelectedSeries] = useState<'one-piece' | 'demon-slayer'>('one-piece');

  // Modal states
  const [selectedCard, setSelectedCard] = useState<OnePieceCard | DemonSlayerCard | null>(null);
  const [filterRarity, setFilterRarity] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedHotspot, setSelectedHotspot] = useState<'series' | 'faction' | 'rarity' | 'portrait' | 'name' | 'bounty' | 'attack' | null>(null);
  const [gachaOpTooltip, setGachaOpTooltip] = useState(false);

  // Rarity distribution count
  const stats = useMemo(() => {
    const currentPool = selectedSeries === 'one-piece' ? ONE_PIECE_CARDS : DEMON_SLAYER_CARDS;
    const total = currentPool.length;
    
    // filter collectedCardIds that belong to the current pool
    const poolIds = currentPool.map(c => c.id);
    const currentCollected = collectedCardIds.filter(id => poolIds.includes(id));
    const collectedCount = currentCollected.length;
    const rate = total > 0 ? Math.round((collectedCount / total) * 100) : 0;
    
    let legendaryCount = 0;
    let epicCount = 0;
    
    currentCollected.forEach(id => {
      const card = currentPool.find(c => c.id === id);
      if (card) {
        if (card.rarity === 'legendary') legendaryCount++;
        if (card.rarity === 'epic') epicCount++;
      }
    });

    return { total, collectedCount, rate, legendaryCount, epicCount };
  }, [collectedCardIds, selectedSeries]);

  const filteredCards = useMemo(() => {
    const currentPool = selectedSeries === 'one-piece' ? ONE_PIECE_CARDS : DEMON_SLAYER_CARDS;
    if (filterRarity === 'all') return currentPool;
    return currentPool.filter(c => c.rarity === filterRarity);
  }, [filterRarity, selectedSeries]);

  // Main summon / draw action
  const handleDraw = () => {
    if (coins < DRAW_COST) {
      alert("Not enough coins! Practice vocabulary or complete daily quests to earn more.");
      return;
    }

    setIsDrawing(true);
    setDrawnCard(null);
    setIsFlipped(false);
    setDrawResult(null);
    setGachaOpTooltip(false);

    // Deduct coins
    spendCoins(DRAW_COST);

    // Determine random card
    const rand = Math.random() * 100;
    let rarity: 'common' | 'rare' | 'epic' | 'legendary';
    if (rand < 5) {
      rarity = 'legendary';
    } else if (rand < 25) {
      rarity = 'epic';
    } else if (rand < 60) {
      rarity = 'rare';
    } else {
      rarity = 'common';
    }

    const currentPool = selectedSeries === 'one-piece' ? ONE_PIECE_CARDS : DEMON_SLAYER_CARDS;
    const pool = currentPool.filter(c => c.rarity === rarity);
    const chosenCard = pool[Math.floor(Math.random() * pool.length)];

    // Simulate summon delay
    setTimeout(() => {
      setDrawnCard(chosenCard);
      setIsDrawing(false);
      
      // Determine if new or duplicate
      const isNew = !collectedCardIds.includes(chosenCard.id);
      if (isNew) {
        collectCard(chosenCard.id);
        setDrawResult('new');
      } else {
        setDrawResult('duplicate');
        // Refund duplicate coins
        addRewards(0, DUP_REFUND);
      }

      // Flip card open
      setTimeout(() => {
        setIsFlipped(true);
      }, 300);
    }, 1500);
  };

  const claimCheatCoins = () => {
    addRewards(0, 100); // Add 100 cheat coins for convenience
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink text-paper p-4 sm:p-6 lg:p-8 font-body pb-20">
      <div className="mx-auto max-w-5xl">
        
        {/* ── HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-paper flex items-center gap-2">
              <ShoppingBag className="text-terracotta h-8 w-8" />
              Anime Card Shop
            </h1>
            <p className="text-pencil text-sm mt-1">
              {selectedSeries === 'one-piece'
                ? 'Spend your hard-earned coins to summon mystical One Piece character cards!'
                : 'Spend your hard-earned coins to summon powerful Demon Slayer corps & demon cards!'}
            </p>

            {/* Series Dropdown Selector */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] uppercase font-hud text-pencil tracking-wider">Series:</span>
              <select
                value={selectedSeries}
                onChange={(e) => {
                  setSelectedSeries(e.target.value as 'one-piece' | 'demon-slayer');
                  setSelectedCard(null);
                  setSelectedHotspot(null);
                }}
                className="bg-paper/10 hover:bg-paper/15 border border-pencil/30 text-paper font-hud text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-marigold transition-all cursor-pointer font-bold"
              >
                <option value="one-piece" className="bg-ink text-paper">🏴‍☠️ One Piece Set</option>
                <option value="demon-slayer" className="bg-ink text-paper">⚔️ Demon Slayer Set</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins indicator */}
            <div className="flex items-center gap-2 bg-paper/5 border border-pencil/20 rounded-xl px-4 py-2.5 shadow-md">
              <Coins className="h-5 w-5 text-marigold" />
              <div className="flex flex-col">
                <span className="font-hud text-lg font-bold leading-none text-marigold">
                  {coins}
                </span>
                <span className="font-body text-[9px] uppercase tracking-wider text-pencil mt-0.5">
                  Your Coins
                </span>
              </div>
            </div>

            {/* Dev Coin Booster */}
            <button
              onClick={claimCheatCoins}
              className="bg-teal-deep/10 hover:bg-teal-deep/20 border border-teal-deep/30 text-teal-deep font-hud text-[9px] uppercase px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              title="Get free coins for quick testing"
            >
              +100 Coins (Test)
            </button>
          </div>
        </div>

        {/* ── SUMMONING ALTAR (GACHA PANEL) ─────────────────────────── */}
        <div className="bg-paper/5 border border-pencil/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-center gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 via-transparent to-teal-deep/5 pointer-events-none" />
          
          {/* Card Showcase Frame with 3D Flip */}
          <div className="relative w-64 h-96 flex items-center justify-center">
            {/* Inner card wrapper */}
            <div 
              style={{ perspective: 1000 }} 
              className={`w-full h-full transition-transform duration-700 transform-gpu ${isDrawing ? 'animate-bounce' : ''}`}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-gpu preserve-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* CARD BACK */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-terracotta via-amber-600 to-ink border-4 border-marigold/70 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="h-16 w-16 rounded-full bg-paper/10 border-2 border-paper/30 flex items-center justify-center text-3xl mb-4 animate-pulse">
                    🏴‍☠️
                  </div>
                  <h3 className="font-display text-lg font-bold text-paper tracking-wider text-center">
                    ONE PIECE
                  </h3>
                  <p className="font-hud text-[10px] text-marigold uppercase tracking-[0.2em] mt-1">
                    Mystery Card
                  </p>
                  <span className="absolute bottom-4 font-body text-[10px] text-paper/40">
                    Cost: {DRAW_COST} Coins
                  </span>
                </div>

                {/* CARD FRONT */}
                <div 
                  className={`absolute inset-0 bg-ink border-4 rounded-2xl p-4 flex flex-col justify-between shadow-2xl backface-hidden rotate-y-180 ${
                    drawnCard ? drawnCard.glowColor : 'border-pencil/20'
                  }`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {drawnCard && (
                    <>
                      {/* Card Rarity Badge & Rarity Name */}
                      <div className="flex items-center justify-between border-b border-pencil/10 pb-2">
                        <span className="font-hud text-[9px] uppercase tracking-wider text-pencil font-semibold">
                          {selectedSeries === 'one-piece' ? 'Wanted' : 'Kimetsu'}
                        </span>
                        <span className={`font-hud text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                          drawnCard.rarity === 'legendary' ? 'bg-amber-500 text-ink' :
                          drawnCard.rarity === 'epic' ? 'bg-purple-600 text-paper' :
                          drawnCard.rarity === 'rare' ? 'bg-sky-500 text-paper' : 'bg-pencil/20 text-pencil'
                        }`}>
                          {drawnCard.rarity}
                        </span>
                      </div>

                      {/* Card Illustration */}
                      <div className={`my-3 h-32 w-full rounded-xl bg-gradient-to-tr ${drawnCard.color} flex items-center justify-center text-6xl shadow-inner relative overflow-hidden select-none`}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGachaOpTooltip(!gachaOpTooltip);
                          }}
                          className="absolute top-0 right-0 p-1 opacity-20 hover:opacity-60 hover:scale-105 transition-all font-black text-4xl select-none cursor-pointer text-paper leading-none z-20"
                          title={`${selectedSeries === 'one-piece' ? 'OP' : 'DS'} Series Info`}
                        >
                          {selectedSeries === 'one-piece' ? 'OP' : 'DS'}
                        </button>

                        {/* OP/DS Series Tooltip */}
                        {gachaOpTooltip && (
                          <div className="absolute inset-0 bg-ink/95 text-paper p-3 flex flex-col justify-center items-center text-center z-40 border border-pencil/20 rounded-xl">
                            <h4 className="font-hud text-xs font-bold text-marigold uppercase tracking-wider flex items-center gap-1">
                              <Sparkles size={12} className="text-marigold animate-spin-slow" /> {selectedSeries === 'one-piece' ? 'OP' : 'DS'} Series
                            </h4>
                            <p className="text-[10px] leading-relaxed text-pencil mt-1.5 px-2 font-body">
                              Stands for <strong>{selectedSeries === 'one-piece' ? 'One Piece' : 'Demon Slayer'}</strong>. This card belongs to the official core {selectedSeries === 'one-piece' ? 'One Piece' : 'Demon Slayer'} series dataset.
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setGachaOpTooltip(false);
                              }}
                              className="mt-3 bg-marigold hover:bg-marigold/90 text-ink font-hud text-[8px] uppercase font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Got it
                            </button>
                          </div>
                        )}

                        {imageErrors[drawnCard.id] ? (
                          drawnCard.emoji
                        ) : (
                          <img
                            src={drawnCard.imageUrl}
                            alt={drawnCard.name}
                            className="h-full object-contain filter drop-shadow-md py-1"
                            referrerPolicy="no-referrer"
                            onError={() => setImageErrors(prev => ({ ...prev, [drawnCard.id]: true }))}
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h4 className="font-display text-base font-extrabold text-paper leading-tight">
                          {drawnCard.name}
                        </h4>
                        <p className="font-hud text-[10px] text-marigold font-bold mt-1">
                          {drawnCard.bounty}
                        </p>
                        <p className="text-[10px] text-pencil line-clamp-2 mt-2 leading-relaxed italic">
                          "{drawnCard.description}"
                        </p>
                      </div>

                      {/* Special Move Footer */}
                      <div className="border-t border-pencil/10 pt-2 flex flex-col">
                        <span className="text-[8px] uppercase font-hud text-pencil tracking-wider">Special Move</span>
                        <span className="text-[10px] text-paper font-semibold truncate mt-0.5">
                          {drawnCard.specialMove}
                        </span>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Summoning Actions Panel */}
          <div className="flex-1 max-w-sm space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-paper">Summoning Altar</h2>
              <p className="text-pencil text-xs mt-2 leading-relaxed">
                Unlock {selectedSeries === 'one-piece' ? ONE_PIECE_CARDS.length : DEMON_SLAYER_CARDS.length} mystical cards from this set. Epic and Legendary cards contain brilliant glowing borders and unique Haki/Aura features!
              </p>
            </div>

            <div className="space-y-2 border-y border-pencil/10 py-4 font-hud text-xs text-pencil">
              <div className="flex justify-between">
                <span>Legendary Drop Rate:</span>
                <span className="text-marigold font-bold">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Epic Drop Rate:</span>
                <span className="text-purple-400 font-bold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Rare Drop Rate:</span>
                <span className="text-sky-400 font-bold">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Common Drop Rate:</span>
                <span className="text-paper/60 font-bold">40%</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDraw}
                disabled={isDrawing || coins < DRAW_COST}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-terracotta to-amber-500 hover:from-terracotta/90 hover:to-amber-500/90 text-paper font-hud text-sm font-bold uppercase py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-terracotta/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                {isDrawing ? (
                  <>
                    <RefreshCw className="animate-spin h-4 w-4" />
                    Summoning...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Summon Card (-{DRAW_COST} Coins)
                  </>
                )}
              </button>

              {/* Status Banner */}
              <AnimatePresence mode="wait">
                {drawResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-3 rounded-xl border text-center font-hud text-xs ${
                      drawResult === 'new'
                        ? 'bg-teal-deep/10 border-teal-deep/30 text-teal-deep'
                        : 'bg-paper/5 border-pencil/20 text-pencil'
                    }`}
                  >
                    {drawResult === 'new' ? (
                      <span className="font-bold flex items-center justify-center gap-1.5 animate-bounce">
                        ✨ NEW CARD COLLECTED! ✨
                      </span>
                    ) : (
                      <span>
                        Duplicate Card! Refunded <span className="text-marigold font-bold">+{DUP_REFUND} Coins</span>
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── CARD STATS ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="Collected Count" value={`${stats.collectedCount} / ${stats.total}`} color="text-teal-deep" icon={<Trophy size={16} />} />
          <StatBox label="Collection Rate" value={`${stats.rate}%`} color="text-marigold" icon={<Sparkles size={16} />} />
          <StatBox label="Epic Cards" value={stats.epicCount} color="text-purple-400" />
          <StatBox label="Legendary Cards" value={stats.legendaryCount} color="text-amber-500" />
        </div>

        {/* ── BESTIARY / COLLECTION GALLERY ─────────────────────────── */}
        <div className="border border-pencil/20 bg-paper/5 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-pencil/10 pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-paper flex items-center gap-1.5">
                🏴‍☠️ Card Collection Gallery
              </h3>
              <p className="text-pencil text-xs mt-0.5">
                Review your collected One Piece crew. Tap any card to inspect full details and abilities!
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'common', 'rare', 'epic', 'legendary'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRarity(r)}
                  className={`px-3 py-1 rounded-lg font-hud text-[10px] uppercase border tracking-wider transition-colors cursor-pointer ${
                    filterRarity === r
                      ? 'bg-terracotta border-terracotta text-paper font-semibold'
                      : 'border-pencil/20 hover:border-pencil/50 text-pencil bg-transparent'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCards.map((card) => {
              const isCollected = true; // Unlock all cards for review
              
              if (isCollected) {
                return (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`group relative flex flex-col p-2.5 rounded-xl bg-ink border transition-all duration-300 hover:scale-105 cursor-pointer text-left ${card.glowColor}`}
                  >
                    <div className="absolute top-1 right-1 text-[8px] uppercase tracking-wider font-hud text-pencil font-bold">
                      {card.rarity[0]}
                    </div>
                    {/* Art thumbnail */}
                    <div className={`h-20 w-full rounded-lg bg-gradient-to-tr ${card.color} flex items-center justify-center text-4xl shadow-inner relative overflow-hidden select-none`}>
                      {imageErrors[card.id] ? (
                        card.emoji
                      ) : (
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="h-full object-contain filter drop-shadow-md py-0.5"
                          referrerPolicy="no-referrer"
                          onError={() => setImageErrors(prev => ({ ...prev, [card.id]: true }))}
                        />
                      )}
                    </div>
                    <p className="mt-2 font-display text-[11px] font-bold text-paper truncate leading-tight group-hover:text-marigold">
                      {card.name}
                    </p>
                    <p className="font-hud text-[9px] text-marigold mt-0.5">
                      {card.bounty}
                    </p>
                  </button>
                );
              }

              // Locked Placeholder
              return (
                <div
                  key={card.id}
                  className="relative flex flex-col p-2.5 rounded-xl bg-ink/50 border border-pencil/10 opacity-40 select-none items-center justify-center h-[142px]"
                >
                  <div className="h-10 w-10 rounded-full bg-paper/5 border border-pencil/20 flex items-center justify-center text-pencil">
                    <Lock size={14} />
                  </div>
                  <p className="mt-3 font-display text-[10px] font-medium text-pencil/80 text-center truncate w-full">
                    {card.name.replace(/[a-zA-Z]/g, '•')}
                  </p>
                  <p className="font-hud text-[8px] uppercase tracking-wider text-pencil/40 mt-1">
                    Locked
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── CARD DETAILED MODAL OVERLAY ─────────────────────────────── */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm overflow-hidden bg-paper border border-[#D5C0A0] rounded-2xl shadow-2xl p-6 text-ink font-body"
            >
              <button
                onClick={() => { setSelectedCard(null); setSelectedHotspot(null); }}
                className="absolute top-4 right-4 text-pencil hover:text-ink transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Rarity & Header */}
              <div className="flex items-center gap-1.5 border-b border-[#DDD0B5] pb-3 mb-4">
                <Trophy size={16} className="text-terracotta" />
                <span className="font-hud text-[10px] uppercase tracking-wider text-pencil font-bold">
                  Card Anatomy & Lore
                </span>
              </div>

              {/* WANTED Poster style */}
              <div className={`p-4 rounded-xl bg-ink text-paper border-4 ${selectedCard.glowColor} flex flex-col items-center justify-center text-center shadow-lg relative`}>
                
                {/* Hotspot Faction */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'faction' ? null : 'faction')}
                  className={`absolute top-1.5 left-14 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-marigold border border-ink text-ink shadow-md transition-all cursor-pointer ${
                    selectedHotspot === 'faction' ? 'scale-125 bg-terracotta text-paper ring-1 ring-marigold' : 'animate-pulse hover:scale-110'
                  }`}
                  title="Faction Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Portrait */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'portrait' ? null : 'portrait')}
                  className={`absolute top-20 left-[50%] -translate-x-[50%] z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-marigold border border-ink text-ink shadow-md transition-all cursor-pointer ${
                    selectedHotspot === 'portrait' ? 'scale-125 bg-terracotta text-paper ring-1 ring-marigold' : 'animate-pulse hover:scale-110'
                  }`}
                  title="Portrait Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Name */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'name' ? null : 'name')}
                  className={`absolute bottom-[94px] right-6 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-marigold border border-ink text-ink shadow-md transition-all cursor-pointer ${
                    selectedHotspot === 'name' ? 'scale-125 bg-terracotta text-paper ring-1 ring-marigold' : 'animate-pulse hover:scale-110'
                  }`}
                  title="Name Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Bounty */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'bounty' ? null : 'bounty')}
                  className={`absolute bottom-[68px] right-6 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-marigold border border-ink text-ink shadow-md transition-all cursor-pointer ${
                    selectedHotspot === 'bounty' ? 'scale-125 bg-terracotta text-paper ring-1 ring-marigold' : 'animate-pulse hover:scale-110'
                  }`}
                  title="Bounty Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Rarity */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'rarity' ? null : 'rarity')}
                  className={`absolute bottom-2.5 left-4 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-marigold border border-ink text-ink shadow-md transition-all cursor-pointer ${
                    selectedHotspot === 'rarity' ? 'scale-125 bg-terracotta text-paper ring-1 ring-marigold' : 'animate-pulse hover:scale-110'
                  }`}
                  title="Rarity Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Special Attack */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'attack' ? null : 'attack')}
                  className={`absolute bottom-2.5 right-4 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-marigold border border-ink text-ink shadow-md transition-all cursor-pointer ${
                    selectedHotspot === 'attack' ? 'scale-125 bg-terracotta text-paper ring-1 ring-marigold' : 'animate-pulse hover:scale-110'
                  }`}
                  title="Attack Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Left Header label (OP-Card / DS-Card) - now clickable for series details */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'series' ? null : 'series')}
                  className={`absolute top-2 left-2 text-[8px] font-hud text-pencil uppercase font-bold tracking-widest transition-all cursor-pointer hover:text-marigold ${
                    selectedHotspot === 'series' ? 'text-marigold scale-105 ring-2 ring-marigold rounded px-1.5 py-0.5 bg-marigold/10' : ''
                  }`}
                >
                  {selectedCard.id.startsWith('ds-') ? 'DS-Card' : 'OP-Card'}
                </button>
                
                <div className={`h-36 w-full rounded-lg bg-gradient-to-tr ${selectedCard.color} flex items-center justify-center text-7xl shadow-inner relative overflow-hidden select-none mb-4 transition-all ${
                  selectedHotspot === 'portrait' ? 'ring-4 ring-marigold scale-95 shadow-lg' : ''
                }`}>
                  {/* Franchise series watermark inside portrait - clickable */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(selectedHotspot === 'series' ? null : 'series');
                    }}
                    className={`absolute top-0 right-0 p-1.5 opacity-20 hover:opacity-60 hover:scale-105 transition-all font-black text-5xl select-none cursor-pointer text-paper leading-none z-20 ${
                      selectedHotspot === 'series' ? 'opacity-85 text-marigold scale-110' : ''
                    }`}
                    title={`Click for ${selectedCard.id.startsWith('ds-') ? 'DS' : 'OP'} Series Info`}
                  >
                    {selectedCard.id.startsWith('ds-') ? 'DS' : 'OP'}
                  </button>

                  {imageErrors[selectedCard.id] ? (
                    selectedCard.emoji
                  ) : (
                    <img
                      src={selectedCard.imageUrl}
                      alt={selectedCard.name}
                      className="h-full object-contain filter drop-shadow-md py-1"
                      referrerPolicy="no-referrer"
                      onError={() => setImageErrors(prev => ({ ...prev, [selectedCard.id]: true }))}
                    />
                  )}
                </div>

                <h3 className={`font-display text-lg font-black text-paper tracking-wide transition-all ${
                  selectedHotspot === 'name' ? 'text-marigold scale-105 ring-2 ring-marigold rounded px-2 bg-marigold/10' : ''
                }`}>
                  {selectedCard.name}
                </h3>
                <p className={`font-hud text-xs text-marigold font-extrabold tracking-wider mt-1.5 transition-all ${
                  selectedHotspot === 'bounty' ? 'text-terracotta scale-105 ring-2 ring-terracotta rounded px-2 bg-terracotta/10' : ''
                }`}>
                  {selectedCard.bounty}
                </p>
                <span className={`mt-2 font-hud text-[9px] uppercase px-2 py-0.5 rounded-full font-bold bg-paper/10 text-paper/80 transition-all ${
                  selectedHotspot === 'rarity' ? 'bg-marigold text-ink scale-105 font-extrabold shadow-md' : ''
                }`}>
                  {selectedCard.rarity}
                </span>
              </div>

              {/* Interactive Anatomy Guide Parchment Box */}
              <AnimatePresence mode="wait">
                {selectedHotspot ? (
                  <motion.div
                    key={selectedHotspot}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-4 p-3 bg-terracotta/10 border border-terracotta/30 rounded-xl font-body text-ink text-left relative"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedHotspot(null)}
                      className="absolute top-2 right-2 text-pencil hover:text-ink cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                    <h4 className="font-hud text-[10px] uppercase font-bold text-terracotta tracking-wider flex items-center gap-1">
                      <Sparkles size={10} /> {HOTSPOTS[selectedHotspot].title}
                    </h4>
                    <p className="mt-1 leading-relaxed text-ink/80 text-[11px]">
                      {selectedHotspot === 'series'
                        ? (selectedCard.id.startsWith('ds-')
                            ? "Stands for 'Demon Slayer'. This watermark designates that this card belongs to the official Demon Slayer series set, validating its compatibility in standard cross-franchise matches and deck construction rules."
                            : HOTSPOTS.series.explanation)
                        : HOTSPOTS[selectedHotspot].explanation}
                    </p>
                  </motion.div>
                ) : (
                  <div className="mt-4 p-3 bg-paper/5 border border-pencil/10 rounded-xl font-body text-[11px] text-pencil text-center flex items-center justify-center flex-wrap gap-1">
                    <span>💡 Tip: Tap any pulsing</span>
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-marigold border border-ink text-ink"><Info size={8} className="stroke-[3.5]" /></span>
                    <span>dot or the <strong>{selectedCard.id.startsWith('ds-') ? 'DS' : 'OP'}</strong> label to inspect the card anatomy!</span>
                  </div>
                )}
              </AnimatePresence>

              {/* Details & Lore */}
              <div className="mt-5 space-y-4">
                <div>
                  <h4 className="font-hud text-[9px] uppercase tracking-wider text-pencil font-bold flex items-center gap-1">
                    <Info size={10} /> Character Bio
                  </h4>
                  <p className="text-xs text-ink/80 mt-1 leading-relaxed italic">
                    "{selectedCard.description}"
                  </p>
                </div>

                <div className={`border-t border-[#DDD0B5] pt-3 transition-all ${
                  selectedHotspot === 'attack' ? 'ring-2 ring-terracotta rounded p-2 bg-terracotta/5' : ''
                }`}>
                  <h4 className="font-hud text-[9px] uppercase tracking-wider text-pencil font-bold">
                    Signature Attack
                  </h4>
                  <p className="text-xs font-bold text-terracotta mt-1">
                    {selectedCard.specialMove}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => { setSelectedCard(null); setSelectedHotspot(null); }}
                className="mt-6 w-full bg-ink hover:bg-ink/90 text-paper font-hud text-xs uppercase py-2.5 rounded-xl transition-colors cursor-pointer font-bold"
              >
                Close Inspect
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* CSS flip properties injected directly */}
      <style>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}

const StatBox: FC<StatBoxProps> = ({ label, value, color = "text-paper", icon }) => (
  <div className="bg-paper/5 border border-pencil/20 rounded-xl p-4 text-center flex flex-col justify-center items-center shadow-md">
    {icon && <div className="text-pencil/70 mb-1">{icon}</div>}
    <div className={`text-xl font-bold font-hud leading-none ${color}`}>{value}</div>
    <div className="text-[9px] uppercase tracking-wider text-pencil mt-1.5 leading-none">{label}</div>
  </div>
);

export default ShopScreen;
