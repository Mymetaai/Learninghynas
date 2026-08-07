import { useState, useMemo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStatsStore } from '../state/statsStore';
import { useShopStore } from '../state/shopStore';
import { useUserData } from '../hooks/useUserData';
import { audioFeedback } from '../utils/audioFeedback';
import { ONE_PIECE_CARDS, type OnePieceCard } from '../content/onePieceCards';
import { DEMON_SLAYER_CARDS, type DemonSlayerCard } from '../content/demonSlayerCards';
import GachaCard from '../components/GachaCard';
import PackOpeningOverlay from '../components/PackOpeningOverlay';
import { gachaData, GACHA_CARDS, getRandomGachaCard, type GachaCardData } from '../data/gachaData';
import {
  ShoppingBag,
  Coins,
  X,
  Trophy,
  Info,
  Volume2,
  Palette,
  Play,
  CheckCircle2
} from 'lucide-react';

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

export const THEMES_LIST = [
  { id: 'default', name: 'Original Serene Sage (Default)', price: 0, category: 'Original', color: '#7D927D', accent2: '#9BB39B', bg: '#FAF6F0', desc: 'The original serene sage & warm cream default app theme.' },
  { id: 'madrid-midnight', name: 'Madrid Midnight', price: 150, category: 'Executive Dark', color: '#1D4ED8', accent2: '#F59E0B', bg: '#121214', desc: 'Midnight dark background (#121214), Midnight Blue accent (#1D4ED8), Warm Amber accent (#F59E0B).' },
  { id: 'ibiza-sunset', name: 'Ibiza Sunset', price: 150, category: 'Gradient', color: '#F43F5E', accent2: '#FB7185', bg: '#FAF9F6', desc: 'Warm pink-rose sunrise & sunset glow.' },
  { id: 'andalusia-olive', name: 'Andalusia Olive', price: 150, category: 'Minimalist', color: '#606C38', accent2: '#D4A373', bg: '#FEFAE0', desc: 'Warm earthy olive green & terracotta tones.' },
  { id: 'caribbean-coral', name: 'Caribbean Coral', price: 200, category: 'Tropical', color: '#4ECDC4', accent2: '#FF6B6B', bg: '#F7FFF7', desc: 'High-energy tropical teal & coral aesthetics.' },
  { id: 'barcelona-gaudi', name: 'Barcelona Gaudi', price: 200, category: 'Mosaic', color: '#2A9D8F', accent2: '#E76F51', bg: '#FAFAFA', desc: 'Creative architectural mosaic palette.' },
  { id: 'fiesta-neon', name: 'Fiesta Neon', price: 250, category: 'Cyberpunk', color: '#00F5D4', accent2: '#7B2CBF', bg: '#0B0F19', desc: 'Cyberpunk neon electric glow.' },
  { id: 'matador-crimson', name: 'Matador Crimson', price: 250, category: 'Dynamic', color: '#DC2626', accent2: '#991B1B', bg: '#F9FAFB', desc: 'Bold crimson & deep graphite accents.' },
  { id: 'siesta-mint', name: 'Siesta Mint', price: 150, category: 'Chill', color: '#2E8B57', accent2: '#3CB371', bg: '#F4FBF7', desc: 'Chill pastel mint study environment.' },
  { id: 'tulum-teal', name: 'Tulum Teal', price: 200, category: 'Coastal', color: '#008080', accent2: '#20B2AA', bg: '#F0F8FF', desc: 'Fresh coastal aqua & seafoam tones.' },
  { id: 'aztec-gold', name: 'Aztec Gold', price: 300, category: 'Premium Executive', color: '#D97706', accent2: '#10B981', bg: '#0F172A', desc: 'Deep Midnight Slate background (#0F172A), Emerald Gold accent (#D97706), Emerald Green accent (#10B981).' },
];

export const SOUND_PACKS_LIST = [
  { id: 'default', name: 'Classic Serene Chimes', price: 0, icon: '🔔', desc: 'Warm gentle bells & soft sage audio feedback.' },
  { id: 'anime-hero', name: 'Anime Hero Fanfare', price: 180, icon: '⚔️', desc: 'High-energy battle chimes & victory synth fanfares.' },
  { id: 'latin-salsa', name: 'Latin Salsa Brass', price: 180, icon: '🎺', desc: 'Vibrant trumpet stabs & rhythmic percussion feedback.' },
  { id: 'chibi-yuki', name: 'Chibi Yuki Sparkles', price: 220, icon: '🦊', desc: 'Magical Kitsune sparkles & cheerful companion sounds.' },
];

const ShopScreen: FC = () => {
  const localCoins = useStatsStore((s) => s.coins);
  const collectAllCards = useStatsStore((s) => s.collectAllCards);
  const collectedCardIds = useStatsStore((s) => s.collectedCardIds);
  
  // Hook for Clerk + Supabase live user data mutations
  const { userData, spendCoins: userSpendCoins } = useUserData();
  const coins = userData?.kitsune_coins ?? localCoins;

  // Add direct reward cheat button for testing
  const addRewards = useStatsStore((s) => s.addRewards);

  const [activeShopTab, setActiveShopTab] = useState<'gacha' | 'powerups' | 'themes' | 'soundpacks'>('gacha');
  const [chestReward, setChestReward] = useState<{ title: string; detail: string } | null>(null);
  const [purchaseCelebration, setPurchaseCelebration] = useState<{ name: string; cost: number; desc?: string } | null>(null);
  const [showCoinTips, setShowCoinTips] = useState(false);

  const shopStore = useShopStore();

  const handleBuyStreakFreeze = async () => {
    const success = await userSpendCoins(80);
    if (!success) {
      alert("Not enough Kitsune Coins!");
      return;
    }
    shopStore.buyPowerUp('streak_freeze', 0);
    setPurchaseCelebration({ name: 'Streak Freeze', cost: 80, desc: 'Protects your streak for one missed day' });
  };

  const handleBuyStreakRepair = async () => {
    const success = await userSpendCoins(120);
    if (!success) {
      alert("Not enough Kitsune Coins!");
      return;
    }
    useStatsStore.setState((s) => ({ streak: s.streak + 1 }));
    setPurchaseCelebration({ name: 'Streak Repair', cost: 120, desc: 'Restored +1 day to your study streak!' });
  };

  const handleBuyHintTokens = async () => {
    const success = await userSpendCoins(80);
    if (!success) {
      alert("Not enough Kitsune Coins!");
      return;
    }
    shopStore.buyPowerUp('hint_token', 0);
    shopStore.buyPowerUp('hint_token', 0);
    shopStore.buyPowerUp('hint_token', 0);
    setPurchaseCelebration({ name: '3x Hint Tokens', cost: 80, desc: 'Added 3 Hint Tokens to use during quizzes' });
  };

  const handleBuyThemeItem = async (theme: typeof THEMES_LIST[0]) => {
    if (theme.id === 'default' || theme.price === 0) {
      shopStore.setActiveTheme('');
      setPurchaseCelebration({ name: 'Original Serene Sage', cost: 0, desc: 'Restored the original default app theme!' });
      return;
    }
    const isOwned = shopStore.hasTheme(theme.id);
    if (isOwned) {
      shopStore.setActiveTheme(theme.id);
      return;
    }
    const success = await userSpendCoins(theme.price);
    if (!success) {
      alert("Not enough Kitsune Coins!");
      return;
    }
    shopStore.buyTheme(theme.id);
    shopStore.setActiveTheme(theme.id);
    setPurchaseCelebration({ name: theme.name, cost: theme.price, desc: `Applied ${theme.name} UI Theme!` });
  };

  const handleBuySoundPackItem = async (pack: typeof SOUND_PACKS_LIST[0]) => {
    const isOwned = pack.price === 0 || (shopStore.inventory?.unlockedSoundPacks || []).includes(pack.id);
    if (isOwned) {
      shopStore.setActiveSoundPack(pack.id);
      audioFeedback.playFeedback('correct');
      return;
    }
    const success = await userSpendCoins(pack.price);
    if (!success) {
      alert("Not enough Kitsune Coins!");
      return;
    }
    shopStore.buySoundPack(pack.id, 0);
    shopStore.setActiveSoundPack(pack.id);
    audioFeedback.playFeedback('success');
    setPurchaseCelebration({ name: pack.name, cost: pack.price, desc: `Equipped ${pack.name} audio feedback!` });
  };

  // ── PACK OPENING OVERLAY STATE ───────────────────────────────────────────
  const [isPackDrawing, setIsPackDrawing] = useState<boolean>(false);
  const [drawnPackCard, setDrawnPackCard] = useState<GachaCardData | null>(null);
  const [unlockedGachaIds, setUnlockedGachaIds] = useState<string[]>(() => [
    'op-luffy', 'op-zoro', 'ds-tanjiro', 'ds-nezuko', 'ds-zenitsu'
  ]);
  const [gachaFilterRank, setGachaFilterRank] = useState<'all' | 'UR' | 'SSR' | 'SR' | 'R' | 'C' | 'Rare' | 'Common'>('all');
  const [selectedSetFilter, setSelectedSetFilter] = useState<'all' | 'Demon Slayer' | 'One Piece'>('all');

  const handleDrawPackCard = async () => {
    const success = await userSpendCoins(DRAW_COST);
    if (!success) {
      alert("Not enough Kitsune Coins! Complete practice quizzes to earn more coins.");
      return;
    }
    playThunderSound(true);
    spawnBolt();
    spawnParticles(12);

    const card = getRandomGachaCard();
    setDrawnPackCard(card);
    setIsPackDrawing(true);
    if (!unlockedGachaIds.includes(card.id)) {
      setUnlockedGachaIds(prev => [...prev, card.id]);
    }
  };
  
  // Series selector state
  const [selectedSeries, setSelectedSeries] = useState<'one-piece' | 'demon-slayer'>('one-piece');

  // Modal states
  const [selectedCard, setSelectedCard] = useState<OnePieceCard | DemonSlayerCard | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedHotspot, setSelectedHotspot] = useState<'series' | 'faction' | 'rarity' | 'portrait' | 'name' | 'bounty' | 'attack' | null>(null);

  // Cinematic states
  const summonPhase = 's-altar';
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

  const claimCheatCoins = () => {
    addRewards(0, 100); // Add 100 cheat coins for convenience
  };

  const handleUnlockAll = () => {
    const opIds = ONE_PIECE_CARDS.map(c => c.id);
    const dsIds = DEMON_SLAYER_CARDS.map(c => c.id);
    collectAllCards([...opIds, ...dsIds]);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary p-4 sm:p-6 lg:p-8 font-sans pb-20">
      <div className="mx-auto max-w-5xl">
        
        {/* ── HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 p-6 rounded-2xl">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-100 flex items-center gap-2">
              <ShoppingBag className="text-amber-500 h-8 w-8" />
              Gacha Shrine
            </h1>
            <p className="text-slate-300 text-xs mt-1">
              Spend your hard-earned Kitsune Coins at the Gacha Shrine on boosts, companion auras, and card summonings!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins indicator */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-950/60 to-slate-900/90 text-amber-400 border border-amber-500/40 rounded-full px-5 py-2 shadow-lg backdrop-blur-md">
              <Coins className="h-5 w-5 text-amber-400" />
              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold leading-none">
                  {coins} KC
                </span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-amber-500/80 font-bold">
                  Balance
                </span>
              </div>
            </div>

            {/* Dev Coin Booster */}
            <button
              onClick={claimCheatCoins}
              className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-sans text-xs font-bold px-3.5 py-2 rounded-full shadow-sm transition-all cursor-pointer"
              title="Get free coins for quick testing"
            >
              +100 KC
            </button>
            <button
              onClick={handleUnlockAll}
              className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-amber-400 font-sans text-xs font-bold px-3.5 py-2 rounded-full shadow-sm transition-all cursor-pointer"
              title="Unlock all collectible cards"
            >
              Unlock All
            </button>
          </div>
        </div>

        {/* ── SHOP NAV TABS ────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveShopTab('gacha')}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all border cursor-pointer ${
              activeShopTab === 'gacha'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 border-amber-500'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-500'
            }`}
          >
            ✦ Summoning Altar & Cards
          </button>

          <button
            onClick={() => setActiveShopTab('powerups')}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all border cursor-pointer ${
              activeShopTab === 'powerups'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 border-amber-500'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-500'
            }`}
          >
            🔥 Streak Protection & Boosts
          </button>

          <button
            onClick={() => setActiveShopTab('themes')}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all border cursor-pointer ${
              activeShopTab === 'themes'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 border-amber-500'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-500'
            }`}
          >
            🎨 UI Themes (10 Themes)
          </button>

          <button
            onClick={() => setActiveShopTab('soundpacks')}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all border cursor-pointer ${
              activeShopTab === 'soundpacks'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 border-amber-500'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-500'
            }`}
          >
            🎙️ Voice & Sound Packs
          </button>
        </div>

        {/* ── TAB 1: GACHA SHRINE ─────────────────────────────────── */}
        {activeShopTab === 'gacha' && (
          <>
            {/* Series Dropdown Selector inside the Gacha Altar */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-bold">Set:</span>
              <select
                value={selectedSeries}
                onChange={(e) => {
                  setSelectedSeries(e.target.value as 'one-piece' | 'demon-slayer');
                  setSelectedCard(null);
                  setSelectedHotspot(null);
                }}
                className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-100 font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none transition-all cursor-pointer font-bold"
              >
                <option value="one-piece">🏴‍☠️ One Piece Set</option>
                <option value="demon-slayer">⚔️ Demon Slayer Set</option>
              </select>
            </div>

            <div className={`gacha-stage-panel stage rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-center gap-8 shadow-2xl relative overflow-hidden transition-all duration-700 ${summonPhase} ${
              summonPhase !== 's-altar' ? 'bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 min-h-[620px]' : 'bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 min-h-[460px]'
            }`}>
              {/* Grain overlay */}
              <div className="grain-overlay pointer-events-none absolute inset-0 z-5 opacity-[0.02]" />
              <div className="vignette-overlay pointer-events-none absolute inset-0 z-5" />

              {/* Background Summoning Circle */}
              <div className="glyph-wrap pointer-events-none absolute z-1">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <g className="glyph-ring r1" transform="translate(100,100)">
                    <circle r="92" fill="none" stroke="#F5A991" strokeOpacity="0.6" strokeWidth="1" />
                    <g stroke="#FBBF24" strokeOpacity="0.7" strokeWidth="1">
                      <line x1="0" y1="-92" x2="0" y2="-82" /><line x1="0" y1="92" x2="0" y2="82" />
                      <line x1="-92" y1="0" x2="-82" y2="0" /><line x1="92" y1="0" x2="82" y2="0" />
                      <line x1="-65" y1="-65" x2="-58" y2="-58" /><line x1="65" y1="-65" x2="58" y2="-58" />
                      <line x1="-65" y1="65" x2="-58" y2="58" /><line x1="65" y1="65" x2="58" y2="58" />
                    </g>
                  </g>
                  <g className="glyph-ring r2" transform="translate(100,100)">
                    <circle r="70" fill="none" stroke="#FBBF24" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" />
                  </g>
                  <g className="glyph-ring r3" transform="translate(100,100)">
                    <circle r="46" fill="none" stroke="#C084FC" strokeOpacity="0.6" strokeWidth="1" />
                    <path d="M0,-46 L13,-13 L46,0 L13,13 L0,46 L-13,13 L-46,0 L-13,-13 Z" fill="none" stroke="#F5A991" strokeOpacity="0.5" strokeWidth="1" />
                  </g>
                </svg>
              </div>

              {/* Lightning SVG Layer */}
              <div className="fx-layer absolute inset-0 z-4 pointer-events-none">
                {lightningFlash && (
                  <div className="absolute inset-0 bg-amber-200/20 z-4 pointer-events-none" />
                )}
                <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="none">
                  {lightningBolts.map((bolt) => (
                    <path
                      key={bolt.id}
                      d={bolt.path}
                      className="bolt-path"
                      stroke="#F5A991"
                      strokeWidth="3.5"
                      fill="none"
                      filter="drop-shadow(0 0 10px #FBBF24)"
                    />
                  ))}
                </svg>
              </div>

              {/* Particle Layer */}
              <div className="particles-layer absolute inset-0 z-3 pointer-events-none overflow-hidden">
                {gachaParticles.map((p) => (
                  <div
                    key={p.id}
                    className={`gacha-particle absolute rounded-full ${p.gold ? 'gold' : ''}`}
                    style={{
                      left: `${p.left}%`,
                      '--drift': `${p.drift}px`,
                      animationDuration: `${p.duration}s`,
                    } as React.CSSProperties}
                  />
                ))}
              </div>

              {/* STEP 0: INITIAL VIEW (s-altar) */}
              {summonPhase === 's-altar' && (
                <>
                  <div className="card-static-wrap z-10 relative flex items-center justify-center">
                    <div className="w-56 sm:w-64 aspect-[2.5/3.5] rounded-2xl overflow-hidden border-2 border-amber-500/80 ring-2 ring-amber-500/30 shadow-2xl relative group transition-transform hover:scale-105 cursor-pointer bg-slate-950">
                      {/* High-Fidelity Stitch Pack Image */}
                      <img
                        src={selectedSeries === 'one-piece' ? '/cards/op_pack_clean.jpg' : '/cards/ds_pack_clean.jpg'}
                        alt={selectedSeries === 'one-piece' ? 'One Piece Pack' : 'Demon Slayer Pack'}
                        className="w-full h-full object-cover"
                      />
                      {/* Metallic Foil Reflection Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-200/20 pointer-events-none" />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-md text-amber-400 border border-amber-500/60 font-mono text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                        Cost: {DRAW_COST} KC
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-sm space-y-5 z-10 relative">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-slate-100">Summoning Altar</h2>
                      <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                        Unlock {selectedSeries === 'one-piece' ? ONE_PIECE_CARDS.length : DEMON_SLAYER_CARDS.length} mystical cards from this set.
                      </p>
                      
                      <div className="mt-3.5 p-3.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-start gap-2.5 shadow-sm">
                        <span className="text-xl select-none mt-0.5">
                          {selectedSeries === 'one-piece' ? '🏴‍☠️' : '⚔️'}
                        </span>
                        <div>
                          <h4 className="font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider leading-none">
                            {selectedSeries === 'one-piece' ? 'Pirate King Lore' : 'Corps Motto'}
                          </h4>
                          <p className="text-xs italic text-slate-200 leading-relaxed mt-1">
                            {selectedSeries === 'one-piece'
                              ? '"Inherited Will, the Destiny of Age, and the Dreams of People. As long as people continue to pursue Freedom, these things will never cease to be!"'
                              : '"No matter how many people you lose, set your heart ablaze and surpass your limits!"'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 border-y border-slate-700/60 py-3.5 font-mono text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span>Legendary Drop Rate:</span>
                        <span className="text-amber-400 font-bold">5%</span>
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
                        <span className="text-slate-200 font-bold">40%</span>
                      </div>
                    </div>

                    <button
                      onClick={handleDrawPackCard}
                      disabled={coins < DRAW_COST}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs border-none"
                    >
                      ✦ DRAW x1 ({DRAW_COST} COINS)
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatBox label="Owned Cards" value={stats.collectedCount} color="text-slate-100" />
              <StatBox label="Completion Rate" value={`${stats.rate}%`} color="text-emerald-400" />
              <StatBox label="Legendaries Found" value={stats.legendaryCount} color="text-amber-400" />
              <StatBox label="Epics Found" value={stats.epicCount} color="text-purple-400" />
            </div>

            {/* Your Collection (Gacha Cards Grid) */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-700/60 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Trophy className="text-amber-500 h-6 w-6" />
                    Your Collection
                  </h2>
                  <p className="font-sans text-xs text-slate-300 mt-1">
                    Demon Slayer & One Piece card collection ({unlockedGachaIds.length}/{GACHA_CARDS.length} unlocked)
                  </p>
                </div>

                {/* Set Dropdown Filter & Rank Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedSetFilter}
                    onChange={(e) => setSelectedSetFilter(e.target.value as 'all' | 'Demon Slayer' | 'One Piece')}
                    className="bg-slate-800/80 border border-slate-700 text-slate-100 font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer font-bold shadow-sm"
                  >
                    <option value="all">All Sets</option>
                    <option value="Demon Slayer">Demon Slayer</option>
                    <option value="One Piece">One Piece</option>
                  </select>

                  <div className="flex flex-wrap gap-1.5">
                    {(['all', 'UR', 'SSR', 'SR', 'R', 'C'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setGachaFilterRank(r as any)}
                        className={`px-3 py-1 rounded-full font-sans text-[10px] font-bold transition-all cursor-pointer border ${
                          gachaFilterRank === r || (gachaFilterRank === 'Rare' && r === 'R') || (gachaFilterRank === 'Common' && r === 'C')
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 border-amber-500'
                            : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid of Gacha Cards (Developer Review Mode: All Unlocked) */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-2">
                {gachaData
                  .filter((c) => selectedSetFilter === 'all' || c.anime === selectedSetFilter)
                  .filter((c) => {
                    if (gachaFilterRank === 'all') return true;
                    if (gachaFilterRank === 'R' || gachaFilterRank === 'Rare') return c.rank === 'R' || c.rank === 'Rare';
                    if (gachaFilterRank === 'C' || gachaFilterRank === 'Common') return c.rank === 'C' || c.rank === 'Common';
                    return c.rank === gachaFilterRank;
                  })
                  .map((card) => (
                    <GachaCard
                      key={card.id}
                      card={card}
                      isUnlocked={true}
                      onClick={() => {
                        setDrawnPackCard(card);
                        setIsPackDrawing(true);
                      }}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        {/* ── TAB 2: POWER-UPS & STREAK PROTECTION ──────────────── */}
        {activeShopTab === 'powerups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Streak Freeze */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl" role="img" aria-label="Streak Freeze">🧊</span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 mt-2">Streak Freeze</h3>
                  <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                    Equip a freeze shield that automatically preserves your active study streak if you miss a day.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  80 KC
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
                <span className="font-mono text-xs text-slate-400">
                  Owned: <strong className="text-slate-200">{shopStore.inventory?.consumables?.streak_freeze || 0}</strong>
                </span>
                <button
                  onClick={handleBuyStreakFreeze}
                  disabled={coins < 80}
                  className={`px-4 py-2 rounded-xl font-sans text-xs font-bold border-none transition-all cursor-pointer ${
                    coins >= 80 ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110' : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  }`}
                >
                  Buy Streak Freeze
                </button>
              </div>
            </div>

            {/* Streak Repair */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl" role="img" aria-label="Streak Repair">🔥</span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 mt-2">Streak Repair</h3>
                  <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                    Restore +1 lost day to your study streak when life got busy. Keep your streak flame burning bright!
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  120 KC
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
                <span className="font-mono text-xs text-slate-400">
                  Current Streak: <strong className="text-slate-200">{useStatsStore.getState().streak} Days</strong>
                </span>
                <button
                  onClick={handleBuyStreakRepair}
                  disabled={coins < 120}
                  className={`px-4 py-2 rounded-xl font-sans text-xs font-bold border-none transition-all cursor-pointer ${
                    coins >= 120 ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110' : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  }`}
                >
                  Buy Streak Repair
                </button>
              </div>
            </div>

            {/* Hint Tokens Pack */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl" role="img" aria-label="Hint Tokens">💡</span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 mt-2">3x Hint Tokens Pack</h3>
                  <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                    Consumable tokens that eliminate wrong choices or reveal word hints during grammar and vocabulary quizzes.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  80 KC
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
                <span className="font-mono text-xs text-slate-400">
                  Owned: <strong className="text-slate-200">{shopStore.inventory?.consumables?.hint_token || 0} Tokens</strong>
                </span>
                <button
                  onClick={handleBuyHintTokens}
                  disabled={coins < 80}
                  className={`px-4 py-2 rounded-xl font-sans text-xs font-bold border-none transition-all cursor-pointer ${
                    coins >= 80 ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110' : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  }`}
                >
                  Buy 3x Pack
                </button>
              </div>
            </div>

            {/* Guardian Retry Token */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl" role="img" aria-label="Guardian Retry">🛡️</span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 mt-2">Guardian Retry Token</h3>
                  <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                    Immediately retry a failed Region Guardian Boss Battle without waiting.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  100 KC
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
                <span className="font-mono text-xs text-slate-400">
                  Owned: <strong className="text-slate-200">{shopStore.inventory?.consumables?.boss_retry || 0} Tokens</strong>
                </span>
                <button
                  onClick={async () => {
                    const success = await userSpendCoins(100);
                    if (success) {
                      shopStore.buyPowerUp('boss_retry', 0);
                      setPurchaseCelebration({ name: 'Guardian Retry Token', cost: 100, desc: 'Retry boss battles anytime!' });
                    } else {
                      alert("Not enough Kitsune Coins!");
                    }
                  }}
                  disabled={coins < 100}
                  className={`px-4 py-2 rounded-xl font-sans text-xs font-bold border-none transition-all cursor-pointer ${
                    coins >= 100 ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110' : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  }`}
                >
                  Buy Retry Token
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: UI THEMES (10 THEMES) ────────────────────────── */}
        {activeShopTab === 'themes' && (
          <div className="space-y-6 mb-8">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Palette className="h-6 w-6 text-amber-500" />
                  Visual Theme Overrides (10 Aesthetic Styles)
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Customize the entire application color scheme! Equipped themes change the site data-theme dynamically.
                </p>
              </div>
              {shopStore.inventory?.activeThemeId && (
                <button
                  onClick={() => shopStore.setActiveTheme('')}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-bold text-slate-300 hover:text-slate-100 hover:border-slate-500 cursor-pointer transition-all"
                >
                  Reset Default
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {THEMES_LIST.map((t) => {
                const isOwned = t.id === 'default' || t.price === 0 || shopStore.hasTheme(t.id);
                const isActive = t.id === 'default'
                  ? !shopStore.inventory?.activeThemeId || shopStore.inventory?.activeThemeId === 'default' || shopStore.inventory?.activeThemeId === ''
                  : shopStore.inventory?.activeThemeId === t.id;

                const isAztecGold = t.id === 'aztec-gold';
                const isMadridMidnight = t.id === 'madrid-midnight';

                return (
                  <div
                    key={t.id}
                    className={`rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4 transition-all relative overflow-hidden ${
                      isAztecGold
                        ? 'bg-[#0F172A]/90 backdrop-blur-xl border border-amber-500/60 ring-1 ring-amber-500/40 shadow-amber-500/10 text-slate-100'
                        : isMadridMidnight
                        ? 'bg-[#121214]/90 backdrop-blur-xl border border-blue-600/60 ring-1 ring-blue-500/40 shadow-blue-600/10 text-slate-100'
                        : `bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 text-slate-100 ${
                            isActive ? 'border-amber-500 ring-2 ring-amber-500/30' : ''
                          }`
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded ${
                            isAztecGold
                              ? 'text-amber-400 bg-amber-500/20 border border-amber-500/40 shadow-sm'
                              : isMadridMidnight
                              ? 'text-blue-400 bg-blue-500/20 border border-blue-500/40 shadow-sm'
                              : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                          }`}
                        >
                          {t.category}
                        </span>
                        {isActive && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Active
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-slate-100 mt-2">{t.name}</h3>
                      <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">{t.desc}</p>

                      {/* Color Swatch Preview */}
                      {isAztecGold ? (
                        <div className="flex items-center justify-between mt-3 p-3 rounded-xl border border-amber-500/40 bg-[#0F172A] shadow-inner">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-amber-400 shadow-sm" style={{ backgroundColor: '#D97706' }} title="Emerald Gold (#D97706)" />
                            <div className="w-5 h-5 rounded-full border border-emerald-400 shadow-sm" style={{ backgroundColor: '#10B981' }} title="Emerald Green (#10B981)" />
                            <span className="font-mono text-[11px] font-bold text-amber-300 ml-1">
                              Emerald Gold & Green
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-slate-400 font-semibold">#0F172A</span>
                        </div>
                      ) : isMadridMidnight ? (
                        <div className="flex items-center justify-between mt-3 p-3 rounded-xl border border-blue-500/40 bg-[#121214] shadow-inner">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-blue-400 shadow-sm" style={{ backgroundColor: '#1D4ED8' }} title="Midnight Blue (#1D4ED8)" />
                            <div className="w-5 h-5 rounded-full border border-amber-400 shadow-sm" style={{ backgroundColor: '#F59E0B' }} title="Warm Amber (#F59E0B)" />
                            <span className="font-mono text-[11px] font-bold text-blue-300 ml-1">
                              Midnight Blue & Amber
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-slate-400 font-semibold">#121214</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mt-3 p-3 rounded-xl border border-slate-700/60 shadow-inner" style={{ backgroundColor: t.bg }}>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: t.color }} />
                            {t.accent2 && (
                              <div className="w-4 h-4 rounded-full border border-white/30 shadow-sm -ml-1.5" style={{ backgroundColor: t.accent2 }} />
                            )}
                            <span className="font-mono text-[11px] font-bold" style={{ color: t.color }}>
                              Preview Swatch
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-slate-400 font-semibold">{t.bg}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-700/60 pt-3">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {isOwned ? 'Unlocked' : `${t.price} KC`}
                      </span>

                      <button
                        onClick={() => handleBuyThemeItem(t)}
                        disabled={!isOwned && coins < t.price}
                        className={`px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                            : isOwned
                            ? 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 cursor-pointer'
                            : coins >= t.price
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 cursor-pointer border-none'
                            : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                        }`}
                      >
                        {isActive ? 'Equipped' : isOwned ? 'Equip Theme' : 'Buy Theme'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 4: VOICE & SOUND PACKS (OmniVoice Inspired) ───── */}
        {activeShopTab === 'soundpacks' && (
          <div className="space-y-6 mb-8">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold text-slate-100 flex items-center gap-2">
                <Volume2 className="h-6 w-6 text-amber-500" />
                Companion Voice & Sound Feedback Packs
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Unlock custom audio feedback packs for quiz success and failure sound effects, powered by Web Audio synthesis!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOUND_PACKS_LIST.map((sp) => {
                const isOwned = sp.price === 0 || (shopStore.inventory?.unlockedSoundPacks || []).includes(sp.id);
                const isActive = (shopStore.inventory?.activeSoundPackId || 'default') === sp.id;

                return (
                  <div
                    key={sp.id}
                    className={`bg-slate-900/80 backdrop-blur-xl border rounded-2xl p-5 shadow-2xl text-slate-100 flex flex-col justify-between space-y-4 transition-all ${
                      isActive ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 items-center">
                        <span className="text-3xl" role="img" aria-label={sp.name}>{sp.icon}</span>
                        <div>
                          <h3 className="font-serif text-base font-bold text-slate-100">{sp.name}</h3>
                          <p className="font-sans text-xs text-slate-300 mt-0.5">{sp.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          useShopStore.setState((s) => ({
                            inventory: { ...s.inventory, activeSoundPackId: sp.id },
                          }));
                          audioFeedback.playFeedback('correct');
                        }}
                        className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-amber-400 hover:bg-slate-700 transition-all cursor-pointer"
                        title="Test Sample Sound"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-700/60 pt-3">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {sp.price === 0 ? 'Free' : isOwned ? 'Unlocked' : `${sp.price} KC`}
                      </span>

                      <button
                        onClick={() => handleBuySoundPackItem(sp)}
                        disabled={!isOwned && coins < sp.price}
                        className={`px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                            : isOwned
                            ? 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 cursor-pointer'
                            : coins >= sp.price
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 cursor-pointer border-none'
                            : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                        }`}
                      >
                        {isActive ? 'Equipped' : isOwned ? 'Equip Sound Pack' : 'Buy Pack'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ── MODALS & OVERLAYS ─────────────────────────────────────────── */}
      
      {/* Gacha Card Spotlight Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="ios-glass-panel rounded-2xl max-w-2xl w-full p-5 shadow-sm relative flex flex-col md:flex-row gap-6"
            >
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setSelectedHotspot(null);
                }}
                className="absolute top-4 right-4 bg-transparent border-none text-slate-400 hover:text-slate-100 cursor-pointer focus:outline-none"
              >
                <X size={20} />
              </button>

              <div className="flex-1 flex flex-col items-center">
                <div
                  className={`w-[200px] h-[300px] rounded-2xl border p-4 text-center flex flex-col justify-between relative overflow-hidden glow-${selectedCard.rarity} pulse-glow-${selectedCard.rarity}`}
                  style={{
                    background: selectedCard.rarity === 'legendary' ? 'linear-gradient(135deg, rgba(58, 42, 8, 0.8) 0%, rgba(31, 21, 5, 0.9) 100%)' :
                                selectedCard.rarity === 'epic' ? 'linear-gradient(135deg, rgba(36, 19, 56, 0.8) 0%, rgba(21, 11, 34, 0.9) 100%)' :
                                selectedCard.rarity === 'rare' ? 'linear-gradient(135deg, rgba(12, 36, 56, 0.8) 0%, rgba(6, 21, 31, 0.9) 100%)' : 'linear-gradient(135deg, rgba(33, 29, 24, 0.8) 0%, rgba(21, 18, 14, 0.9) 100%)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                  }}
                >
                  <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] font-mono font-semibold text-slate-300">
                    <span>Card Registry</span>
                    <span className="text-slate-950 font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: selectedCard.rarity === 'legendary' ? '#f3c969' :
                                                     selectedCard.rarity === 'epic' ? '#b388ff' :
                                                     selectedCard.rarity === 'rare' ? '#5fb6ff' : '#bfb6a8' }}>
                      {selectedCard.rarity}
                    </span>
                  </div>

                  <div className={`my-2 h-32 w-full rounded-xl bg-gradient-to-tr ${selectedCard.color} flex items-center justify-center text-5xl shadow-inner relative overflow-hidden select-none`}>
                    {imageErrors[selectedCard.id] ? (
                      selectedCard.emoji
                    ) : (
                      <img
                        src={selectedCard.imageUrl}
                        alt={selectedCard.name}
                        onError={() => setImageErrors((prev) => ({ ...prev, [selectedCard.id]: true }))}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>

                  <div className="text-left space-y-1">
                    <h3 className="font-serif text-sm font-bold text-white truncate">{selectedCard.name}</h3>
                    <p className="font-sans text-[10px] text-slate-300 italic line-clamp-2">"{selectedCard.description}"</p>
                  </div>

                  <div className="w-full border-t border-white/10 pt-1.5 grid grid-cols-2 gap-2 font-mono text-[8px] text-amber-400 font-semibold">
                    <div className="flex flex-col text-left">
                      <span className="text-white/40 text-[7px] uppercase tracking-wider">Power</span>
                      <span className="truncate">{selectedCard.bounty}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-white/40 text-[7px] uppercase tracking-wider">Special Move</span>
                      <span className="truncate" title={selectedCard.specialMove}>{selectedCard.specialMove}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-100">Card Hotspot Analyzer</h3>
                  <p className="text-xs text-slate-300 mt-1">Tap a section header below to analyze its design mechanics and gameplay synergy details.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {Object.entries(activeHotspots).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedHotspot(key as any)}
                        className={`text-left p-2.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                          selectedHotspot === key
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold shadow-md'
                            : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {value.title}
                      </button>
                    ))}
                  </div>

                  {selectedHotspot && (
                    <div className="mt-4 p-3 bg-slate-800/80 border border-slate-700 rounded-2xl">
                      <h4 className="font-serif text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        <Info size={13} className="text-amber-400" />
                        {activeHotspots[selectedHotspot].title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {activeHotspots[selectedHotspot].explanation}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-700/60 pt-3 mt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    Card ID: {selectedCard.id}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCard(null);
                      setSelectedHotspot(null);
                    }}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold font-sans text-xs px-4 py-2 rounded-xl transition-all cursor-pointer border-none shadow-md"
                  >
                    Close Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chest Reward Modal */}
      <AnimatePresence>
        {chestReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900/90 border border-slate-700/80 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative space-y-4 text-slate-100"
            >
              <span className="text-5xl block animate-bounce" role="img" aria-label="Gift">🎁</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">Chest Opened!</h3>
                <p className="font-sans text-xs text-slate-300 mt-1">Here is the random reward you pulled:</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
                <h4 className="font-serif text-base font-extrabold text-amber-400">{chestReward.title}</h4>
                <p className="font-sans text-xs text-slate-300 mt-1.5 leading-relaxed">{chestReward.detail}</p>
              </div>

              <button
                onClick={() => setChestReward(null)}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-sans text-xs font-bold py-2.5 rounded-xl border-none cursor-pointer hover:scale-103 transition-transform shadow-lg shadow-amber-500/20"
              >
                Claim Reward
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Celebration Modal */}
      <AnimatePresence>
        {purchaseCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900/90 border border-slate-700/80 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4 text-slate-100"
            >
              <span className="text-5xl block animate-pulse" role="img" aria-label="Celebration">🎉</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">Purchase Successful!</h3>
                <p className="font-sans text-xs text-slate-300 mt-1">Thank you for your purchase!</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
                <h4 className="font-serif text-sm font-extrabold text-emerald-400">{purchaseCelebration.name}</h4>
                <p className="font-sans text-[11px] text-slate-300 mt-1">Cost: {purchaseCelebration.cost} KC</p>
                {purchaseCelebration.desc && (
                  <p className="font-sans text-xs text-slate-300/90 italic mt-2 border-t border-slate-700/60 pt-2">{purchaseCelebration.desc}</p>
                )}
              </div>

              <button
                onClick={() => setPurchaseCelebration(null)}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-sans text-xs font-bold py-2.5 rounded-xl border-none cursor-pointer hover:scale-103 transition-transform shadow-lg shadow-emerald-500/20"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coin Tips Modal */}
      <AnimatePresence>
        {showCoinTips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900/90 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 text-slate-100"
            >
              <button
                onClick={() => setShowCoinTips(false)}
                className="absolute top-4 right-4 bg-transparent border-none text-slate-400 hover:text-slate-100 cursor-pointer focus:outline-none"
              >
                <X size={18} />
              </button>

              <h3 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-700/60 pb-2">
                💰 How to Earn Kitsune Coins Faster
              </h3>

              <div className="space-y-3.5 font-sans text-xs text-slate-300 leading-relaxed">
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">📅</span>
                  <div>
                    <h4 className="font-bold text-slate-100">Daily Streaks</h4>
                    <p>Maintain your daily log streak! The higher your streak, the higher your coin multiplier becomes when doing general activities.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">📋</span>
                  <div>
                    <h4 className="font-bold text-slate-100">Daily Quest Board</h4>
                    <p>Complete your daily rotating quest (visible on the Adventure tab) to secure huge bonus payments like +30 KC.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">📖</span>
                  <div>
                    <h4 className="font-bold text-slate-100">Mastering Vocabulary</h4>
                    <p>Learn and review new words in the dictionary. Reviewing weak words awards random coin drops!</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">⚔️</span>
                  <div>
                    <h4 className="font-bold text-slate-100">Guardian Battles</h4>
                    <p>Beating a region guardian boss fight awards a large lump sum of coins and secures your kitsune tails!</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCoinTips(false)}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-sans text-xs font-bold py-2.5 rounded-xl border-none cursor-pointer mt-4 shadow-lg shadow-amber-500/20"
              >
                Understood
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Executive Dark Glassmorphism Styles */
        .ios-glass-panel {
          background: rgba(15, 23, 42, 0.85) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
          border: 1px solid rgba(51, 65, 85, 0.8) !important;
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.45),
            0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 -1px 0 rgba(0, 0, 0, 0.5) inset !important;
          color: #F8FAFC !important;
        }

        .ios-glass-card {
          background: rgba(30, 41, 59, 0.8) !important;
          backdrop-filter: blur(16px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
          border: 1px solid rgba(51, 65, 85, 0.8) !important;
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.35),
            0 1px 0 rgba(255, 255, 255, 0.1) inset !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #F8FAFC !important;
        }

        .ios-glass-button {
          background: rgba(30, 41, 59, 0.8) !important;
          border: 1px solid rgba(51, 65, 85, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          color: #CBD5E1 !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ios-glass-button:hover {
          background: rgba(51, 65, 85, 0.9) !important;
          border-color: rgba(148, 163, 184, 0.6) !important;
          color: #F8FAFC !important;
          transform: translateY(-1px);
        }
        .ios-glass-button-active {
          background: linear-gradient(135deg, #D97706, #F59E0B) !important;
          border-color: #F59E0B !important;
          color: #020617 !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.35) !important;
        }

        .ios-glass-inner-panel {
          background: rgba(15, 23, 42, 0.7) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(51, 65, 85, 0.6) !important;
          color: #F8FAFC !important;
        }

        /* ── CSS STYLES FOR GACHA COMPONENT ─────────────────────────── */
        .gacha-stage-panel {
          min-height: 440px;
          perspective: 1200px;
        }
        
        .vignette-overlay {
          background: radial-gradient(circle at center, transparent 40%, rgba(15, 23, 42, 0.85));
        }

        .stage.s-transition { background: #0F172A; }
        .stage.s-rise { background: #0F172A; }
        .stage.s-begin { background: #0F172A; }
        .stage.s-intensity { background: #020617; }

        .stage.s-transition,
        .stage.s-rise,
        .stage.s-begin,
        .stage.s-intensity,
        .stage.s-reveal {
          background: radial-gradient(circle at 50% 40%, #1E293B 0%, #0F172A 60%, #020617 100%) !important;
        }

        .glyph-wrap {
          width: 340px;
          height: 340px;
          opacity: 0.35;
          transition: opacity 0.8s ease;
        }
        .stage.s-transition .glyph-wrap { opacity: 0.55; }
        .stage.s-rise .glyph-wrap { opacity: 0.7; }
        .stage.s-begin .glyph-wrap { opacity: 0.85; }
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
          stroke: #F5A991;
          stroke-width: 3.5;
          fill: none;
          filter: drop-shadow(0 0 10px #FBBF24);
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
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #F5A991;
          box-shadow: 0 0 10px #F5A991;
          animation: particleRise linear forwards;
        }
        .gacha-particle.gold {
          background: #FBBF24;
          box-shadow: 0 0 12px #FBBF24;
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
          border-radius: 24px;
          background: linear-gradient(160deg, #FFFFFF, #FAF6F0 55%, #E6E1F7);
          border: 2px solid #5C524E;
          box-shadow: 0 4px 0 #5C524E, 0 10px 25px rgba(0,0,0,0.06);
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
          transform: rotateY(180deg);
          background: linear-gradient(135deg, rgba(20, 10, 35, 0.75) 0%, rgba(10, 5, 20, 0.85) 100%);
          border: 2px solid #8b3ffb;
          box-shadow: 0 10px 30px rgba(139, 63, 251, 0.2), 0 0 50px rgba(139, 63, 251, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          justify-content: center;
        }
        .card-face-custom.front {
          transform: rotateY(0deg);
          background: linear-gradient(135deg, color-mix(in srgb, var(--bg1) 75%, transparent) 0%, color-mix(in srgb, var(--bg2) 85%, transparent) 100%);
          border: 2px solid var(--rarity-color);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 45px color-mix(in srgb, var(--rarity-color) 40%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          animation: pulse-reveal 2.5s infinite ease-in-out;
        }

        @keyframes pulse-reveal {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 45px color-mix(in srgb, var(--rarity-color) 40%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
          50% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 65px color-mix(in srgb, var(--rarity-color) 70%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          }
        }

        /* Unified Rarity Glow styles */
        .glow-legendary {
          border: 2px solid #f3c969 !important;
          box-shadow: 0 0 15px rgba(243, 201, 105, 0.25), 0 0 5px rgba(243, 201, 105, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        .glow-epic {
          border: 2px solid #b388ff !important;
          box-shadow: 0 0 15px rgba(179, 136, 255, 0.25), 0 0 5px rgba(179, 136, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        .glow-rare {
          border: 2px solid #5fb6ff !important;
          box-shadow: 0 0 15px rgba(95, 182, 255, 0.25), 0 0 5px rgba(95, 182, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        .glow-common {
          border: 2px solid #cbd5e1 !important;
          box-shadow: 0 0 10px rgba(203, 213, 225, 0.15), 0 0 3px rgba(203, 213, 225, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }

        /* Pulsing animation for the spotlight and reveal cards */
        @keyframes pulse-legendary {
          0%, 100% { box-shadow: 0 0 15px rgba(243, 201, 105, 0.25), 0 0 5px rgba(243, 201, 105, 0.15); }
          50% { box-shadow: 0 0 25px rgba(243, 201, 105, 0.5), 0 0 12px rgba(243, 201, 105, 0.35); }
        }
        @keyframes pulse-epic {
          0%, 100% { box-shadow: 0 0 15px rgba(179, 136, 255, 0.25), 0 0 5px rgba(179, 136, 255, 0.15); }
          50% { box-shadow: 0 0 25px rgba(179, 136, 255, 0.5), 0 0 12px rgba(179, 136, 255, 0.35); }
        }
        @keyframes pulse-rare {
          0%, 100% { box-shadow: 0 0 15px rgba(95, 182, 255, 0.25), 0 0 5px rgba(95, 182, 255, 0.15); }
          50% { box-shadow: 0 0 25px rgba(95, 182, 255, 0.5), 0 0 12px rgba(95, 182, 255, 0.35); }
        }
        @keyframes pulse-common {
          0%, 100% { box-shadow: 0 0 10px rgba(203, 213, 225, 0.15), 0 0 3px rgba(203, 213, 225, 0.1); }
          50% { box-shadow: 0 0 18px rgba(203, 213, 225, 0.3), 0 0 8px rgba(203, 213, 225, 0.2); }
        }

        .pulse-glow-legendary { animation: pulse-legendary 2.5s infinite ease-in-out; }
        .pulse-glow-epic { animation: pulse-epic 2.5s infinite ease-in-out; }
        .pulse-glow-rare { animation: pulse-rare 2.5s infinite ease-in-out; }
        .pulse-glow-common { animation: pulse-common 2.5s infinite ease-in-out; }

        /* Binder card hover effects */
        .binder-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .binder-card.glow-legendary:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(243, 201, 105, 0.4), 0 0 16px rgba(243, 201, 105, 0.3) !important;
        }
        .binder-card.glow-epic:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(179, 136, 255, 0.4), 0 0 16px rgba(179, 136, 255, 0.3) !important;
        }
        .binder-card.glow-rare:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(95, 182, 255, 0.4), 0 0 16px rgba(95, 182, 255, 0.3) !important;
        }
        .binder-card.glow-common:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(203, 213, 225, 0.25), 0 0 12px rgba(203, 213, 225, 0.18) !important;
        }

        /* Reveal panel at step 5 */
        .reveal-panel-custom {
          position: relative;
          z-index: 15;
          text-align: center;
          margin-top: 24px;
          animation: revealPanelFadeIn 0.6s ease-out forwards;
        }
        @keyframes revealPanelFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
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

      {/* 3D Pack Opening Overlay */}
      <PackOpeningOverlay
        isOpen={isPackDrawing}
        drawnCard={drawnPackCard}
        onClose={() => setIsPackDrawing(false)}
      />
    </div>
  );
};

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}

const StatBox: FC<StatBoxProps> = ({ label, value, color = "text-slate-100", icon }) => (
  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-xl p-4 text-center flex flex-col justify-center items-center shadow-2xl text-slate-100">
    {icon && <div className="text-slate-400 mb-1">{icon}</div>}
    <div className={`text-xl font-bold font-mono leading-none ${color}`}>{value}</div>
    <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-1.5 leading-none">{label}</div>
  </div>
);

export default ShopScreen;