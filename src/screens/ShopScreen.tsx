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
  Info
} from 'lucide-react';

const getCardSparkleColors = (rarity: 'common' | 'rare' | 'epic' | 'legendary') => {
  if (rarity === 'legendary') {
    return {
      '--glow-color': 'rgba(251, 191, 36, 0.8)',
      '--border-color': '#fbbf24',
      '--border-color-bright': '#fef08a',
      '--border-color-dim': '#ca8a04'
    };
  }
  if (rarity === 'epic') {
    return {
      '--glow-color': 'rgba(168, 85, 247, 0.8)',
      '--border-color': '#a855f7',
      '--border-color-bright': '#e9d5ff',
      '--border-color-dim': '#7e22ce'
    };
  }
  if (rarity === 'rare') {
    return {
      '--glow-color': 'rgba(59, 130, 246, 0.8)',
      '--border-color': '#3b82f6',
      '--border-color-bright': '#93c5fd',
      '--border-color-dim': '#1d4ed8'
    };
  }
  // Common
  return {
    '--glow-color': 'rgba(148, 163, 184, 0.4)',
    '--border-color': '#94a3b8',
    '--border-color-bright': '#cbd5e1',
    '--border-color-dim': '#64748b'
  };
};

const ONE_PIECE_HOTSPOTS = {
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

const DEMON_SLAYER_HOTSPOTS = {
  series: {
    title: "DS Franchise Designation",
    explanation: "Stands for 'Demon Slayer'. This watermark designates that this card belongs to the official Demon Slayer series set, validating its compatibility in standard cross-franchise matches and deck construction rules."
  },
  faction: {
    title: "Faction & Character Type",
    explanation: "Represents their faction (Demon Slayer Corps or Twelve Kizuki). Determines what synergies, breathing style enhancements, or blood demon art effects apply in battle."
  },
  rarity: {
    title: "Rarity Designation",
    explanation: "Defines the collection value. Epic (purple) and Legendary (gold) cards feature special holographic frames and glowing borders."
  },
  portrait: {
    title: "Illustration Portrait",
    explanation: "A high-fidelity transparent render of the character. Tapping a legendary card triggers a unique breathing style aura animation."
  },
  name: {
    title: "Character Name",
    explanation: "The name of the character, registered in either the Demon Slayer Corps registry or recognized as one of the Demon King's Twelve Kizuki."
  },
  bounty: {
    title: "Slayer Rank / Level",
    explanation: "Denotes their slayer rank (Hashira, Mizunoto) or demon tier (Upper/Lower Moon). Higher ranks denote exceptional skill, breathing forms, or dangerous blood demon arts."
  },
  attack: {
    title: "Signature Combat Technique",
    explanation: "The character's primary combat technique, showcasing their breathing forms or unique Blood Demon Art."
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
  const [drawResult, setDrawResult] = useState<'new' | 'duplicate' | null>(null);
  
  // Series selector state
  const [selectedSeries, setSelectedSeries] = useState<'one-piece' | 'demon-slayer'>('one-piece');

  // Modal states
  const [selectedCard, setSelectedCard] = useState<OnePieceCard | DemonSlayerCard | null>(null);
  const [filterRarity, setFilterRarity] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedHotspot, setSelectedHotspot] = useState<'series' | 'faction' | 'rarity' | 'portrait' | 'name' | 'bounty' | 'attack' | null>(null);

  // Cinematic states
  const [summonPhase, setSummonPhase] = useState<'s-altar' | 's-transition' | 's-rise' | 's-begin' | 's-intensity' | 's-reveal'>('s-altar');
  const [lightningFlash, setLightningFlash] = useState(false);
  const [lightningBolts, setLightningBolts] = useState<{ id: number; path: string }[]>([]);
  const [gachaParticles, setGachaParticles] = useState<{ id: number; gold: boolean; left: number; drift: number; duration: number }[]>([]);

  const spawnBolt = () => {
    const id = Math.random();
    const startX = 20 + Math.random() * 60;
    let d = `M ${startX}% 0%`;
    let x = startX;
    let y = 0;
    while (y < 100) {
      y += 10 + Math.random() * 15;
      x += (Math.random() - 0.5) * 16;
      d += ` L ${x}% ${y}%`;
    }
    setLightningBolts(prev => [...prev, { id, path: d }]);
    setLightningFlash(true);
    setTimeout(() => setLightningFlash(false), 150);
    setTimeout(() => {
      setLightningBolts(prev => prev.filter(b => b.id !== id));
    }, 420);
  };

  const spawnParticles = (count: number) => {
    const newParticles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      gold: Math.random() > 0.5,
      left: 42 + Math.random() * 16,
      drift: Math.random() * 120 - 60,
      duration: 0.9 + Math.random() * 0.9
    }));
    setGachaParticles(prev => [...prev, ...newParticles]);
    newParticles.forEach(p => {
      setTimeout(() => {
        setGachaParticles(prev => prev.filter(item => item.id !== p.id));
      }, p.duration * 1000);
    });
  };

  const playThunderSound = (isExplosion = false) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const bufferSize = ctx.sampleRate * (isExplosion ? 1.2 : 2.2);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isExplosion ? 110 : 75, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + (isExplosion ? 0.8 : 1.8));
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isExplosion ? 0.35 : 0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (isExplosion ? 1.1 : 2.1));
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (err) {
      console.warn("Audio Context blocked or failed:", err);
    }
  };

  const isDs = selectedCard?.id.startsWith('ds-');
  const activeHotspots = isDs ? DEMON_SLAYER_HOTSPOTS : ONE_PIECE_HOTSPOTS;

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
    setDrawResult(null);

    // Deduct coins
    spendCoins(DRAW_COST);

    // Roll card
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

    // STEP 1 — transition
    setSummonPhase('s-transition');

    // STEP 2 — altar rises (900ms)
    setTimeout(() => {
      setSummonPhase('s-rise');
    }, 900);

    // STEP 3 — summoning begins (2300ms)
    setTimeout(() => {
      setSummonPhase('s-begin');
      playThunderSound(false);
      let count = 0;
      const boltLoop = setInterval(() => {
        spawnBolt();
        spawnParticles(4);
        count++;
        if (count >= 5) clearInterval(boltLoop);
      }, 360);
    }, 2300);

    // STEP 4 — building intensity (4100ms)
    setTimeout(() => {
      setSummonPhase('s-intensity');
      playThunderSound(false);
      let count = 0;
      const boltLoop = setInterval(() => {
        spawnBolt();
        spawnParticles(8);
        count++;
        if (count >= 7) clearInterval(boltLoop);
      }, 180);
    }, 4100);

    // STEP 5 — reveal (5900ms)
    setTimeout(() => {
      setSummonPhase('s-reveal');
      playThunderSound(true);
      spawnBolt();
      spawnBolt();
      spawnParticles(15);
      
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
    }, 5900);
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
        <div className={`gacha-stage-panel stage border rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-center gap-8 shadow-xl relative overflow-hidden transition-all duration-700 ${summonPhase} ${
          summonPhase !== 's-altar' ? 'bg-[#07060a] border-purple/30 shadow-[0_0_50px_rgba(139,63,251,0.25)] min-h-[500px]' : 'bg-paper/5 border-pencil/20'
        }`}>
          {/* Grain overlay */}
          <div className="grain-overlay pointer-events-none absolute inset-0 z-5 opacity-[0.03]" />
          <div className="vignette-overlay pointer-events-none absolute inset-0 z-5" />

          {/* Background Summoning Circle (glyph-wrap) */}
          <div className="glyph-wrap pointer-events-none absolute z-1">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <g className="glyph-ring r1" transform="translate(100,100)">
                <circle r="92" fill="none" stroke="#8b3ffb" strokeOpacity="0.4" strokeWidth="0.8" />
                <g stroke="#f3c969" strokeOpacity="0.5" strokeWidth="0.8">
                  <line x1="0" y1="-92" x2="0" y2="-82" /><line x1="0" y1="92" x2="0" y2="82" />
                  <line x1="-92" y1="0" x2="-82" y2="0" /><line x1="92" y1="0" x2="82" y2="0" />
                  <line x1="-65" y1="-65" x2="-58" y2="-58" /><line x1="65" y1="-65" x2="58" y2="-58" />
                  <line x1="-65" y1="65" x2="-58" y2="58" /><line x1="65" y1="65" x2="58" y2="58" />
                </g>
              </g>
              <g className="glyph-ring r2" transform="translate(100,100)">
                <circle r="70" fill="none" stroke="#f3c969" strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="2 4" />
              </g>
              <g className="glyph-ring r3" transform="translate(100,100)">
                <circle r="46" fill="none" stroke="#8b3ffb" strokeOpacity="0.4" strokeWidth="0.8" />
                <path d="M0,-46 L13,-13 L46,0 L13,13 L0,46 L-13,13 L-46,0 L-13,-13 Z" fill="none" stroke="#f3c969" strokeOpacity="0.35" strokeWidth="0.8" />
              </g>
            </svg>
          </div>

          {/* Lightning SVG Layer */}
          <div className="fx-layer absolute inset-0 z-4 pointer-events-none">
            {lightningFlash && (
              <div className="absolute inset-0 bg-white/10 z-4 pointer-events-none" />
            )}
            <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="none">
              {lightningBolts.map((bolt) => (
                <path
                  key={bolt.id}
                  d={bolt.path}
                  className="bolt-path"
                  stroke="#8b3ffb"
                  strokeWidth="3.5"
                  fill="none"
                  filter="drop-shadow(0 0 8px #8b3ffb)"
                />
              ))}
            </svg>
          </div>

          {/* Particle Layer */}
          <div className="particles-layer absolute inset-0 z-3 pointer-events-none overflow-hidden">
            {gachaParticles.map((p) => (
              <div
                key={p.id}
                className={`gacha-particle absolute rounded-sm ${p.gold ? 'gold' : ''}`}
                style={{
                  left: `${p.left}%`,
                  '--drift': `${p.drift}px`,
                  animationDuration: `${p.duration}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* ── STEP 0: INITIAL VIEW (s-altar) ─────────────────────────── */}
          {summonPhase === 's-altar' && (
            <>
              {/* Static Card Back Showcase */}
              <div className="card-static-wrap z-10 relative flex items-center justify-center">
                <div className="card-custom">
                  <div className="card-emblem">
                    <div className="text-4xl mb-2 select-none">
                      {selectedSeries === 'one-piece' ? '🏴‍☠️' : '⚔️'}
                    </div>
                  </div>
                  <div>
                    <div className="card-title select-none font-display text-sm tracking-wider text-paper">
                      {selectedSeries === 'one-piece' ? 'ONE PIECE CARD' : 'KIMETSU CARD'}
                    </div>
                    <div className="card-subtitle select-none font-mono text-[9px] tracking-widest text-[#ff7a3c] mt-1">
                      MYSTERY CARD
                    </div>
                  </div>
                  <div className="card-cost select-none font-mono text-[10px] text-pencil/60">
                    Cost: {DRAW_COST} Coins
                  </div>
                </div>
              </div>

              {/* Actions Panel */}
              <div className="flex-1 max-w-sm space-y-6 z-10 relative">
                <div>
                  <h2 className="font-display text-xl font-bold text-paper">Summoning Altar</h2>
                  <p className="text-pencil text-xs mt-2 leading-relaxed">
                    Unlock {selectedSeries === 'one-piece' ? ONE_PIECE_CARDS.length : DEMON_SLAYER_CARDS.length} mystical cards from this set.
                  </p>
                  
                  {/* Dynamic Series Lore Box */}
                  <div className="mt-3.5 p-3 bg-paper/5 border border-pencil/15 rounded-xl flex items-start gap-2.5 shadow-md">
                    <span className="text-xl select-none mt-0.5">
                      {selectedSeries === 'one-piece' ? '🏴‍☠️' : '⚔️'}
                    </span>
                    <div>
                      <h4 className="font-hud text-[9px] uppercase font-bold text-marigold tracking-wider leading-none">
                        {selectedSeries === 'one-piece' ? 'Pirate King Lore' : 'Corps Motto'}
                      </h4>
                      <p className="text-[11px] italic text-paper/85 leading-relaxed mt-1">
                        {selectedSeries === 'one-piece'
                          ? '"Inherited Will, the Destiny of Age, and the Dreams of People. As long as people continue to pursue the meaning of Freedom, these things will never cease to be!"'
                          : '"No matter how many people you lose, you have no choice but to go on living. Set your heart ablaze and surpass your limits!"'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-y border-pencil/10 py-4 font-hud text-xs text-pencil">
                  <div className="flex justify-between">
                    <span>Legendary Drop Rate:</span>
                    <span className="text-[#f3c969] font-bold">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Epic Drop Rate:</span>
                    <span className="text-[#b388ff] font-bold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rare Drop Rate:</span>
                    <span className="text-[#5fb6ff] font-bold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Common Drop Rate:</span>
                    <span className="text-paper/60 font-bold">40%</span>
                  </div>
                </div>

                <button
                  onClick={handleDraw}
                  disabled={isDrawing || coins < DRAW_COST}
                  className="w-full summon-btn"
                >
                  ✦ Summon Card ({DRAW_COST} Coins)
                </button>
              </div>
            </>
          )}

          {/* ── STEPS 1-5: ACTIVE RITUAL STAGE ─────────────────────────── */}
          {summonPhase !== 's-altar' && (
            <div className={`ritual-stage-wrap z-10 relative flex flex-col items-center justify-center w-full min-h-[460px] ${
              summonPhase === 's-intensity' ? 'stage-shake' : ''
            }`}>
              {/* Altar Pedestal Platform */}
              <div className="platform-custom" />

              {/* Floating Card Wrapper */}
              <div className="card-wrap-custom">
                <div className={`card-3d-custom ${summonPhase}`}>
                  
                  {/* Card Face Back */}
                  <div className="card-face-custom back">
                    <div className="h-16 w-16 rounded-full bg-paper/5 border border-purple-500/20 flex items-center justify-center text-4xl mb-4 select-none animate-pulse">
                      {selectedSeries === 'one-piece' ? '🏴‍☠️' : '⚔️'}
                    </div>
                    <h3 className="font-display text-base font-bold text-purple-300 tracking-wider text-center">
                      {selectedSeries === 'one-piece' ? 'ONE PIECE' : 'DEMON SLAYER'}
                    </h3>
                  </div>

                  {/* Card Face Front */}
                  {drawnCard && (
                    <div 
                      className="card-face-custom front"
                      style={{
                        '--rarity-color': drawnCard.rarity === 'legendary' ? '#f3c969' :
                                         drawnCard.rarity === 'epic' ? '#b388ff' :
                                         drawnCard.rarity === 'rare' ? '#5fb6ff' : '#bfb6a8',
                        '--bg1': drawnCard.rarity === 'legendary' ? '#3a2a08' :
                                 drawnCard.rarity === 'epic' ? '#241338' :
                                 drawnCard.rarity === 'rare' ? '#0c2438' : '#211d18',
                        '--bg2': drawnCard.rarity === 'legendary' ? '#1f1505' :
                                 drawnCard.rarity === 'epic' ? '#150b22' :
                                 drawnCard.rarity === 'rare' ? '#06151f' : '#15120e',
                      } as React.CSSProperties}
                    >
                      {/* Card Rarity Header */}
                      <div className="w-full flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-hud text-[9px] uppercase tracking-wider text-[#a89b8a] font-semibold">
                          {selectedSeries === 'one-piece' ? 'Wanted' : 'Kimetsu'}
                        </span>
                        <span className="font-hud text-[9px] uppercase text-ink font-bold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: 'var(--rarity-color)' }}>
                          {drawnCard.rarity}
                        </span>
                      </div>

                      {/* Card Illustration */}
                      <div className={`my-3 h-32 w-full rounded-xl bg-gradient-to-tr ${drawnCard.color} flex items-center justify-center text-6xl shadow-inner relative overflow-hidden select-none`}>
                        <div className="absolute inset-0 animate-shimmer pointer-events-none z-10" />
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

                      {/* Character Info */}
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h4 className="font-display text-base font-extrabold text-paper leading-tight">
                          {drawnCard.name}
                        </h4>
                        <p className="font-hud text-[10px] font-bold mt-1" style={{ color: 'var(--rarity-color)' }}>
                          {drawnCard.bounty}
                        </p>
                      </div>

                      {/* Special Move Footer */}
                      <div className="w-full border-t border-white/10 pt-2 flex flex-col text-left">
                        <span className="text-[7px] uppercase font-hud text-[#a89b8a] tracking-wider">Signature Attack</span>
                        <span className="text-[10px] text-paper font-semibold truncate mt-0.5">
                          {drawnCard.specialMove}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
          )}
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
                    style={getCardSparkleColors(card.rarity) as React.CSSProperties}
                    className="group relative flex flex-col p-2.5 rounded-xl bg-ink border transition-all duration-300 hover:scale-105 cursor-pointer text-left animate-sparkle-border"
                  >
                    <div className={`absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider font-hud px-1.5 py-0.5 rounded font-black z-20 ${
                      card.rarity === 'legendary' ? 'bg-amber-500 text-ink shadow-[0_0_5px_rgba(245,158,11,0.4)]' :
                      card.rarity === 'epic' ? 'bg-purple-600 text-paper shadow-[0_0_5px_rgba(147,51,234,0.4)]' :
                      card.rarity === 'rare' ? 'bg-blue-600 text-paper shadow-[0_0_5px_rgba(37,99,235,0.4)]' :
                      'bg-stone-500 text-paper/90'
                    }`}>
                      {card.rarity[0]}
                    </div>
                    {/* Art thumbnail */}
                    <div className={`h-20 w-full rounded-lg bg-gradient-to-tr ${card.color} flex items-center justify-center text-4xl shadow-inner relative overflow-hidden select-none`}>
                      <div className="absolute inset-0 animate-shimmer pointer-events-none z-10" />
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
          <div 
            onClick={() => { setSelectedCard(null); setSelectedHotspot(null); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm cursor-pointer"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto modal-scroll bg-paper border border-[#D5C0A0] rounded-2xl shadow-2xl p-4 sm:p-6 text-ink font-body cursor-default"
            >
              <button
                onClick={() => { setSelectedCard(null); setSelectedHotspot(null); }}
                className="absolute top-4 right-4 text-pencil hover:text-ink transition-colors cursor-pointer z-30"
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
              <div 
                style={getCardSparkleColors(selectedCard.rarity) as React.CSSProperties}
                className="p-4 rounded-xl bg-ink text-paper border-4 animate-sparkle-border flex flex-col items-center justify-center text-center shadow-lg relative"
              >
                
                {/* Hotspot Faction */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'faction' ? null : 'faction')}
                  className={`absolute top-1.5 left-14 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer ${
                    selectedHotspot === 'faction' 
                      ? 'scale-125 bg-marigold text-ink border-marigold ring-2 ring-marigold/40 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-paper/20 backdrop-blur-sm border-paper/30 text-paper animate-pulse hover:scale-110 hover:bg-paper/40'
                  }`}
                  title="Faction Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Portrait */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'portrait' ? null : 'portrait')}
                  className={`absolute top-20 left-[50%] -translate-x-[50%] z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer ${
                    selectedHotspot === 'portrait' 
                      ? 'scale-125 bg-marigold text-ink border-marigold ring-2 ring-marigold/40 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-paper/20 backdrop-blur-sm border-paper/30 text-paper animate-pulse hover:scale-110 hover:bg-paper/40'
                  }`}
                  title="Portrait Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Name */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'name' ? null : 'name')}
                  className={`absolute bottom-[94px] right-6 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer ${
                    selectedHotspot === 'name' 
                      ? 'scale-125 bg-marigold text-ink border-marigold ring-2 ring-marigold/40 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-paper/20 backdrop-blur-sm border-paper/30 text-paper animate-pulse hover:scale-110 hover:bg-paper/40'
                  }`}
                  title="Name Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Bounty */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'bounty' ? null : 'bounty')}
                  className={`absolute bottom-[68px] right-6 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer ${
                    selectedHotspot === 'bounty' 
                      ? 'scale-125 bg-marigold text-ink border-marigold ring-2 ring-marigold/40 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-paper/20 backdrop-blur-sm border-paper/30 text-paper animate-pulse hover:scale-110 hover:bg-paper/40'
                  }`}
                  title="Bounty Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Rarity */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'rarity' ? null : 'rarity')}
                  className={`absolute bottom-2.5 left-4 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer ${
                    selectedHotspot === 'rarity' 
                      ? 'scale-125 bg-marigold text-ink border-marigold ring-2 ring-marigold/40 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-paper/20 backdrop-blur-sm border-paper/30 text-paper animate-pulse hover:scale-110 hover:bg-paper/40'
                  }`}
                  title="Rarity Info"
                >
                  <Info size={10} className="stroke-[3.5]" />
                </button>

                {/* Hotspot Special Attack */}
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(selectedHotspot === 'attack' ? null : 'attack')}
                  className={`absolute bottom-2.5 right-4 z-30 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer ${
                    selectedHotspot === 'attack' 
                      ? 'scale-125 bg-marigold text-ink border-marigold ring-2 ring-marigold/40 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                      : 'bg-paper/20 backdrop-blur-sm border-paper/30 text-paper animate-pulse hover:scale-110 hover:bg-paper/40'
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
                  <div className="absolute inset-0 animate-shimmer pointer-events-none z-10" />
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
                <span className={`mt-2 font-hud text-[9px] uppercase px-2.5 py-0.5 rounded-full font-bold transition-all ${
                  selectedCard.rarity === 'legendary' ? 'bg-amber-500 text-ink font-black shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                  selectedCard.rarity === 'epic' ? 'bg-purple-600 text-paper font-extrabold shadow-[0_0_10px_rgba(147,51,234,0.5)]' :
                  selectedCard.rarity === 'rare' ? 'bg-blue-600 text-paper font-extrabold shadow-[0_0_10px_rgba(37,99,235,0.5)]' :
                  'bg-stone-500 text-paper/90 font-medium'
                } ${
                  selectedHotspot === 'rarity' ? 'scale-110 ring-2 ring-marigold' : ''
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
                      <Sparkles size={10} /> {activeHotspots[selectedHotspot].title}
                    </h4>
                    <p className="mt-1 leading-relaxed text-ink/80 text-[11px]">
                      {activeHotspots[selectedHotspot].explanation}
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

      {/* ── GACHA DRAW REVEAL MODAL OVERLAY ─────────────────────────── */}
      <AnimatePresence>
        {drawnCard && (
          <div 
            onClick={() => { setDrawnCard(null); setDrawResult(null); setSummonPhase('s-altar'); }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-ink/90 backdrop-blur-md cursor-pointer"
          >
            {/* Reveal Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6 pointer-events-none select-none"
            >
              {drawResult === 'new' ? (
                <div>
                  <h2 className="font-display text-3xl font-extrabold text-marigold tracking-widest drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] flex items-center justify-center gap-2 animate-bounce">
                    <Sparkles className="animate-spin-slow" /> NEW CARD UNLOCKED!
                  </h2>
                  <p className="text-pencil text-xs mt-2 font-hud tracking-widest uppercase">Added to your collection</p>
                </div>
              ) : (
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-paper tracking-wider flex items-center justify-center gap-2">
                    🔄 DUPLICATE DRAW
                  </h2>
                  <p className="text-pencil text-xs mt-2 font-hud tracking-wider uppercase text-marigold">Converted: +15 XP & +10 Coins</p>
                </div>
              )}
            </motion.div>

            {/* Magnificent Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotateY: 180 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              style={getCardSparkleColors(drawnCard.rarity) as React.CSSProperties}
              className="relative w-72 h-[450px] bg-ink border-4 rounded-3xl p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-default overflow-hidden animate-sparkle-border"
            >
              {/* Backglow element */}
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-tr ${drawnCard.color} pointer-events-none`} />

              {/* Card Rarity Badge & Rarity Name */}
              <div className="flex items-center justify-between border-b border-pencil/10 pb-3 z-10">
                <span className="font-hud text-[10px] uppercase tracking-wider text-pencil font-bold">
                  {selectedSeries === 'one-piece' ? 'Wanted Poster' : 'Kimetsu Card'}
                </span>
                <span className={`font-hud text-[10px] uppercase px-2.5 py-0.5 rounded-full font-black ${
                  drawnCard.rarity === 'legendary' ? 'bg-amber-500 text-ink animate-pulse' :
                  drawnCard.rarity === 'epic' ? 'bg-purple-600 text-paper' :
                  drawnCard.rarity === 'rare' ? 'bg-sky-500 text-paper' : 'bg-pencil/20 text-pencil'
                }`}>
                  {drawnCard.rarity}
                </span>
              </div>

              {/* Left Header label (OP-Card / DS-Card) */}
              <div className="absolute top-16 left-6 text-[8px] font-hud text-pencil uppercase font-bold tracking-widest opacity-80 z-10">
                {drawnCard.id.startsWith('ds-') ? 'DS-Card' : 'OP-Card'}
              </div>

              {/* Card Illustration */}
              <div className={`my-4 h-48 w-full rounded-2xl bg-gradient-to-tr ${drawnCard.color} flex items-center justify-center text-8xl shadow-inner relative overflow-hidden select-none z-10`}>
                <div className="absolute inset-0 animate-shimmer pointer-events-none z-10" />
                {/* Series Watermark */}
                <div className="absolute top-1 right-2 opacity-15 font-black text-5xl select-none text-paper leading-none">
                  {drawnCard.id.startsWith('ds-') ? 'DS' : 'OP'}
                </div>

                {imageErrors[drawnCard.id] ? (
                  drawnCard.emoji
                ) : (
                  <img
                    src={drawnCard.imageUrl}
                    alt={drawnCard.name}
                    className="h-full object-contain filter drop-shadow-lg py-2 hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={() => setImageErrors(prev => ({ ...prev, [drawnCard.id]: true }))}
                  />
                )}
              </div>

              {/* Details & Lore */}
              <div className="flex-1 flex flex-col justify-center text-center z-10 px-2">
                <h3 className="font-display text-xl font-black text-paper leading-tight tracking-wide">
                  {drawnCard.name}
                </h3>
                <p className="font-hud text-xs text-marigold font-extrabold tracking-wider mt-1">
                  {drawnCard.bounty}
                </p>
                <p className="text-[11px] text-pencil line-clamp-3 mt-2.5 leading-relaxed italic px-1">
                  "{drawnCard.description}"
                </p>
              </div>

              {/* Special Move Footer */}
              <div className="border-t border-pencil/10 pt-3 flex flex-col z-10 mt-2">
                <span className="text-[8px] uppercase font-hud text-pencil tracking-widest">Signature Attack</span>
                <span className="text-xs text-paper font-bold truncate mt-0.5 text-terracotta">
                  {drawnCard.specialMove}
                </span>
              </div>
            </motion.div>

            {/* Click to Continue Help */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="text-pencil text-xs mt-6 font-hud tracking-widest uppercase animate-pulse pointer-events-none select-none"
            >
              Tap anywhere on screen to continue
            </motion.p>
          </div>
        )}
      </AnimatePresence>
      
      {/* CSS flip and scrollbar properties injected directly */}
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
        /* Custom scrollbar for constrained height modals */
        .modal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(144, 144, 144, 0.3);
          border-radius: 4px;
        }
        .modal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(144, 144, 144, 0.5);
        }
        
        /* Sparkle Border Glow Keyframes */
        @keyframes sparkleGlow {
          0%, 100% {
            box-shadow: 0 0 15px var(--glow-color, rgba(251, 191, 36, 0.6)), inset 0 0 5px var(--glow-color, rgba(251, 191, 36, 0.3));
            border-color: var(--border-color, #fbbf24);
            filter: brightness(1);
          }
          20% {
            box-shadow: 0 0 25px var(--glow-color, rgba(251, 191, 36, 0.9)), inset 0 0 10px var(--glow-color, rgba(251, 191, 36, 0.5));
            border-color: var(--border-color-bright, #fef08a);
            filter: brightness(1.15);
          }
          40% {
            box-shadow: 0 0 12px var(--glow-color, rgba(251, 191, 36, 0.4)), inset 0 0 4px var(--glow-color, rgba(251, 191, 36, 0.2));
            border-color: var(--border-color-dim, #ca8a04);
            filter: brightness(0.95);
          }
          60% {
            box-shadow: 0 0 28px var(--glow-color, rgba(251, 191, 36, 1)), inset 0 0 12px var(--glow-color, rgba(251, 191, 36, 0.6));
            border-color: var(--border-color-bright, #fef08a);
            filter: brightness(1.2);
          }
          80% {
            box-shadow: 0 0 18px var(--glow-color, rgba(251, 191, 36, 0.7)), inset 0 0 6px var(--glow-color, rgba(251, 191, 36, 0.35));
            border-color: var(--border-color, #fbbf24);
            filter: brightness(1.05);
          }
        }
        .animate-sparkle-border {
          animation: sparkleGlow 2.5s infinite ease-in-out;
          border-width: 4px;
        }

        /* Diagonal Foil Gloss Shimmer Sweep */
        @keyframes shimmerSweep {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background-image: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 60%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmerSweep 5s infinite linear;
        }

        /* CSS Summoning Ritual Stage Stylesheet */
        .stage {
          --void: #07060a;
          --gold: #f3c969;
          --gold-deep: #b8842e;
          --gold-dim: #6e5326;
          --purple: #8b3ffb;
          --purple-deep: #4a1d96;
          --ember: #ff7a3c;
          --text-bright: #f3ecdc;
          --text-muted: #a89b8a;
          --text-faint: #6b6058;
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }

        .vignette-overlay {
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%);
        }

        /* Summoning Circle Rotating Glyphs */
        .glyph-wrap {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 520px;
          height: 520px;
          opacity: 0.2;
          transition: all 1.2s ease;
        }
        .stage.s-transition .glyph-wrap { opacity: 0.18; }
        .stage.s-rise .glyph-wrap { opacity: 0.55; }
        .stage.s-begin .glyph-wrap { opacity: 0.8; }
        .stage.s-intensity .glyph-wrap { opacity: 1.0; }
        .stage.s-reveal .glyph-wrap { opacity: 0.6; }

        .glyph-ring { transform-origin: 50% 50%; }
        .glyph-ring.r1 { animation: spinRunesR1 60s linear infinite; }
        .glyph-ring.r2 { animation: spinRunesR2 40s linear infinite reverse; }
        .glyph-ring.r3 { animation: spinRunesR3 90s linear infinite; }

        @keyframes spinRunesR1 { to { transform: rotate(360deg); } }
        @keyframes spinRunesR2 { to { transform: rotate(-360deg); } }
        @keyframes spinRunesR3 { to { transform: rotate(360deg); } }

        /* Lightning Bolts Flash overlay */
        .fx-layer {
          transform: scale(1.02);
        }
        .bolt-path {
          stroke: #8b3ffb;
          stroke-width: 3.5;
          fill: none;
          filter: drop-shadow(0 0 6px #8b3ffb);
          animation: boltFlashEffect 0.42s ease-out forwards;
        }
        @keyframes boltFlashEffect {
          0% { opacity: 0; }
          8% { opacity: 1; }
          18% { opacity: 0.3; }
          26% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Gold/Ember Particles */
        .gacha-particle {
          bottom: 30%;
          width: 6px;
          height: 6px;
          background: #ff7a3c;
          box-shadow: 0 0 8px #ff7a3c;
          animation: particleRise linear forwards;
        }
        .gacha-particle.gold {
          background: #f3c969;
          box-shadow: 0 0 8px #f3c969;
        }
        @keyframes particleRise {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-340px) translateX(var(--drift, 0px)) rotate(220deg); opacity: 0; }
        }

        /* Camera Shake on intensity */
        .stage-shake {
          animation: shakeKfEffect 0.22s ease-in-out infinite;
        }
        @keyframes shakeKfEffect {
          0%, 100% { transform: translate(0,0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(3px, -2px); }
          60% { transform: translate(-2px, -3px); }
          80% { transform: translate(2px, 3px); }
        }

        /* Step 0: Static Card Back style */
        .card-static-wrap {
          perspective: 1200px;
        }
        .card-custom {
          width: 210px;
          height: 310px;
          border-radius: 14px;
          background: linear-gradient(160deg, #2c1608, #1a0d05 55%, #0d0703);
          border: 2px solid #6e5326;
          box-shadow: 0 0 0 1px rgba(243, 201, 105, 0.15), 0 18px 50px rgba(0,0,0,0.6), 0 0 40px rgba(255, 122, 60, 0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 22px 16px 18px;
          text-align: center;
        }
        .card-custom .card-emblem {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Summon Button styling matching the theme */
        .summon-btn {
          width: 100%;
          padding: 14px 0;
          border-radius: 8px;
          border: 1px solid #ff7a3c;
          background: linear-gradient(135deg, #ff7a3c, #c2410c);
          color: #1a0900;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          letter-spacing: 0.08em;
          font-size: 13px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(255, 122, 60, 0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .summon-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(255, 122, 60, 0.45);
        }
        .summon-btn:active {
          transform: translateY(0);
        }
        .summon-btn:disabled {
          opacity: 0.5;
          cursor: default;
          transform: none;
        }

        /* Altar Pedestal Platform */
        .platform-custom {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 90px;
          background: radial-gradient(ellipse at center, rgba(243, 201, 105, 0.35) 0%, rgba(255, 122, 60, 0.12) 45%, transparent 75%);
          box-shadow: 0 0 80px 10px rgba(255, 122, 60, 0.25);
          border-radius: 50%;
          transition: all 0.9s ease;
          pointer-events: none;
          z-index: 2;
        }

        /* Card 3D Wrap and tumble animations */
        .card-wrap-custom {
          perspective: 1400px;
          position: relative;
          z-index: 10;
        }
        .card-3d-custom {
          width: 220px;
          height: 320px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.6, 0.1, 0.2, 1);
        }
        .card-3d-custom.s-transition {
          transform: rotateY(90deg) scale(0.95);
        }
        .card-3d-custom.s-rise {
          transform: rotateY(180deg) scale(1);
        }
        .card-3d-custom.s-begin {
          animation: cardTumbleBegin 1.8s ease-in-out forwards;
        }
        .card-3d-custom.s-intensity {
          animation: cardTumbleFast 0.9s linear infinite;
        }
        .card-3d-custom.s-reveal {
          transform: rotateY(360deg) scale(1.05);
          animation: none;
        }

        @keyframes cardTumbleBegin {
          0% { transform: rotateY(180deg) rotate(0deg) scale(1); }
          50% { transform: rotateY(540deg) rotate(8deg) scale(1.04); }
          100% { transform: rotateY(900deg) rotate(-4deg) scale(1.02); }
        }
        @keyframes cardTumbleFast {
          0% { transform: rotateY(0deg) rotate(-6deg) scale(1.05); }
          50% { transform: rotateY(180deg) rotate(6deg) scale(1.1); }
          100% { transform: rotateY(360deg) rotate(-6deg) scale(1.05); }
        }

        /* Card Faces inside 3D environment */
        .card-face-custom {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 22px 16px 18px;
          text-align: center;
        }
        .card-face-custom.back {
          background: linear-gradient(160deg, #1c1426, #110a18 55%, #07050b);
          border: 2px solid #4a1d96;
          box-shadow: 0 0 0 1px rgba(139, 63, 251, 0.25), 0 0 50px rgba(139, 63, 251, 0.25);
          justify-content: center;
        }
        .card-face-custom.front {
          transform: rotateY(180deg);
          background: linear-gradient(160deg, var(--bg1, #2c1608), var(--bg2, #1a0d05) 55%, #0d0703);
          border: 2px solid var(--rarity-color);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--rarity-color) 40%, transparent), 0 0 60px color-mix(in srgb, var(--rarity-color) 45%, transparent);
        }

        /* Reveal panel at step 5 */
        .reveal-panel-custom {
          position: absolute;
          bottom: 3%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          text-align: center;
          animation: revealPanelFadeIn 0.6s ease-out forwards;
        }
        @keyframes revealPanelFadeIn {
          from { opacity: 0; transform: translate(-50%, 15px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .again-btn-custom {
          padding: 10px 24px;
          border-radius: 8px;
          border: 1px solid #2a2230;
          background: rgba(255, 255, 255, 0.04);
          color: #f3ecdc;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .again-btn-custom:hover {
          border-color: #b8842e;
          background: rgba(243, 201, 105, 0.08);
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
