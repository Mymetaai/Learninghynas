import { useState, useMemo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStatsStore } from '../state/statsStore';
import { useShopStore } from '../state/shopStore';
import { useUserData } from '../hooks/useUserData';
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
  Info
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

interface ShopInventory {
  streak_freeze: number;
  hint_token: number;
  boss_retry: number;
  auras: string[];
  themes: string[];
}

const initialInventory: ShopInventory = {
  streak_freeze: 0,
  hint_token: 0,
  boss_retry: 0,
  auras: [],
  themes: [],
};

const SHOP_CATEGORIES = [
  {
    id: "power_ups",
    label: "Power-Ups",
    description: "Consumable boosts that help with lessons and streaks.",
    items: [
      { id: "streak_freeze", name: "Streak Freeze", price: 80, effect: "Protects your streak for one missed day", icon: "🔥", consumableKey: "streak_freeze" as const },
      { id: "hint_token", name: "Hint Token", price: 30, effect: "Reveals one letter/word in a quiz question", icon: "💡", consumableKey: "hint_token" as const },
      { id: "boss_retry", name: "Guardian Retry Token", price: 100, effect: "Immediately retry a failed Guardian Battle", icon: "🛡️", consumableKey: "boss_retry" as const },
    ]
  },
  {
    id: "yuki_auras",
    label: "Yuki's Auras",
    description: "Cosmetic tail-flame colors for your Yuki companion.",
    items: [
      { id: "aura_sakura", name: "Sakura Bloom Aura", price: 150, effect: "Pink petal tail-glow effect for Yuki", icon: "🌸", auraId: "aura_sakura" },
      { id: "aura_ocean", name: "Ocean Mist Aura", price: 150, effect: "Blue wave tail-glow effect for Yuki", icon: "🌊", auraId: "aura_ocean" },
      { id: "aura_shadow", name: "Shadow Flame Aura", price: 400, effect: "Purple void tail-glow effect for Yuki", icon: "💜", auraId: "aura_shadow" },
    ]
  },
  {
    id: "themes",
    label: "App Themes",
    description: "Recolor the whole app interface.",
    items: [
      { id: "theme_midnight", name: "Midnight Kitsune Theme", price: 300, effect: "Deep dark indigo UI theme override", icon: "🌌", themeId: "theme_midnight" },
      { id: "theme_sakura", name: "Sakura Season Theme", price: 300, effect: "Soft pastel pink UI theme override", icon: "🌸", themeId: "theme_sakura" },
    ]
  }
];

const ShopScreen: FC = () => {
  const localCoins = useStatsStore((s) => s.coins);
  const collectAllCards = useStatsStore((s) => s.collectAllCards);
  const collectedCardIds = useStatsStore((s) => s.collectedCardIds);
  
  // Hook for Clerk + Supabase live user data mutations
  const { userData, spendCoins: userSpendCoins, addCoins: userAddCoins } = useUserData();
  const coins = userData?.kitsune_coins ?? localCoins;

  // Add direct reward cheat button for testing
  const addRewards = useStatsStore((s) => s.addRewards);

  // Kitsune Shop tabs & state
  const [activeTab, setActiveTab] = useState<'kitsune' | 'anime-gacha'>('kitsune');
  const [inventory, setInventory] = useState<ShopInventory>(() => {
    const saved = localStorage.getItem('wayfarer_shop_inventory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialInventory;
  });
  const [chestReward, setChestReward] = useState<{ title: string; detail: string } | null>(null);
  const [purchaseCelebration, setPurchaseCelebration] = useState<{ name: string; cost: number; desc?: string } | null>(null);
  const [showCoinTips, setShowCoinTips] = useState(false);

  const saveInventory = (newInv: ShopInventory) => {
    setInventory(newInv);
    localStorage.setItem('wayfarer_shop_inventory', JSON.stringify(newInv));
  };

  const addAura = (auraId: string) => {
    if (inventory.auras.includes(auraId)) return;
    const newInv = { ...inventory, auras: [...inventory.auras, auraId] };
    saveInventory(newInv);
  };

  const addTheme = (themeId: string) => {
    if (inventory.themes.includes(themeId)) return;
    const newInv = { ...inventory, themes: [...inventory.themes, themeId] };
    saveInventory(newInv);
  };

  const addConsumable = (key: 'streak_freeze' | 'hint_token' | 'boss_retry', amount: number) => {
    const newInv = { ...inventory, [key]: (inventory[key] || 0) + amount };
    saveInventory(newInv);
  };

  const handleBuyItem = async (item: any) => {
    const success = await userSpendCoins(item.price);
    if (!success) return;

    if (item.consumableKey) {
      addConsumable(item.consumableKey, 1);
      useShopStore.getState().buyPowerUp(item.consumableKey, 0);
    } else if (item.auraId) {
      addAura(item.auraId);
    } else if (item.themeId) {
      addTheme(item.themeId);
    }

    setPurchaseCelebration({ name: item.name, cost: item.price, desc: item.effect });
  };

  const handleBuyFeatured = async () => {
    const price = 720;
    const success = await userSpendCoins(price);
    if (!success) return;
    addAura('aura_golden');
    setPurchaseCelebration({ name: 'Golden Nine-Tail Aura', cost: price, desc: 'Volumetric golden aura effect for your Kitsune companion' });
  };

  const handleOpenChest = async () => {
    const price = 200;
    const success = await userSpendCoins(price);
    if (!success) return;

    const rand = Math.random() * 100;
    let rewardTitle = '';
    let rewardDetail = '';

    if (rand < 40) {
      const refund = 50 + Math.floor(Math.random() * 101);
      userAddCoins(refund);
      rewardTitle = refund + ' KC Refund';
      rewardDetail = 'You opened the chest and found a refund of ' + refund + ' Kitsune Coins inside!';
    } else if (rand < 65) {
      const auras = ['Sakura Bloom Aura', 'Ocean Mist Aura'];
      const chosen = auras[Math.floor(Math.random() * auras.length)];
      const auraId = chosen.indexOf('Sakura') !== -1 ? 'aura_sakura' : 'aura_ocean';
      addAura(auraId);
      rewardTitle = chosen;
      rewardDetail = 'You unlocked the cosmetic ' + chosen + ' for Yuki!';
    } else if (rand < 85) {
      addConsumable('hint_token', 2);
      rewardTitle = '2x Hint Tokens';
      rewardDetail = 'You found 2 consumable Hint Tokens to reveal difficult quiz letters!';
    } else if (rand < 95) {
      addAura('aura_shadow');
      rewardTitle = 'Shadow Flame Aura';
      rewardDetail = 'A rare cosmic purple tail-glow effect for Yuki!';
    } else {
      addAura('aura_golden');
      rewardTitle = 'Golden Nine-Tail Aura';
      rewardDetail = 'JACKPOT! You obtained the legendary Golden Nine-Tail Aura!';
    }

    setChestReward({ title: rewardTitle, detail: rewardDetail });
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-bg-elevated p-6 rounded-2xl border border-text-primary shadow-sm">
          <div>
            <h1 className="font-serif text-3xl font-bold text-text-primary flex items-center gap-2">
              <ShoppingBag className="text-[#7D927D] h-8 w-8" />
              Gacha Shrine
            </h1>
            <p className="text-text-secondary text-xs mt-1">
              Spend your hard-earned Kitsune Coins at the Gacha Shrine on boosts, companion auras, and card summonings!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins indicator */}
            <div className="flex items-center gap-2 bg-[#7D927D] text-[#2C1E11] border border-[#2C1E11] rounded-full px-5 py-2 shadow-sm">
              <Coins className="h-5 w-5 text-[#2C1E11]" />
              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold leading-none">
                  {coins} KC
                </span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-[#2C1E11] font-bold">
                  Balance
                </span>
              </div>
            </div>

            {/* Dev Coin Booster */}
            <button
              onClick={claimCheatCoins}
              className="bg-bg-elevated hover:bg-bg-elevated-2 border border-text-primary text-text-primary font-sans text-xs font-bold px-3 py-2 rounded-full shadow-sm transition-all cursor-pointer"
              title="Get free coins for quick testing"
            >
              +100 KC
            </button>
            <button
              onClick={handleUnlockAll}
              className="bg-accent-mint hover:bg-accent-mint/90 border border-text-primary text-text-primary font-sans text-xs font-bold px-3 py-2 rounded-full shadow-sm transition-all cursor-pointer"
              title="Unlock all collectible cards"
            >
              Unlock All
            </button>
          </div>
        </div>

        {/* ── TAB SWITCHER ───────────────────────────────────────────── */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('kitsune')}
            className={`px-6 py-2.5 rounded-full font-sans text-xs font-bold border transition-all cursor-pointer ${
              activeTab === 'kitsune'
                ? 'bg-[#F5A991] text-[#2C1E11] hover:bg-[#EAA088] border-[#2C1E11] shadow-sm'
                : 'bg-bg-elevated text-text-secondary border-structural hover:border-text-primary'
            }`}
          >
            🦊 Kitsune Store
          </button>
          <button
            onClick={() => setActiveTab('anime-gacha')}
            className={`px-6 py-2.5 rounded-full font-sans text-xs font-bold border transition-all cursor-pointer ${
              activeTab === 'anime-gacha'
                ? 'bg-[#F5A991] text-[#2C1E11] hover:bg-[#EAA088] border-[#2C1E11] shadow-sm'
                : 'bg-bg-elevated text-text-secondary border-structural hover:border-text-primary'
            }`}
          >
            ✦ Summoning Altar & Card Album
          </button>
        </div>

        {/* ── TAB CONTENT: KITSUNE SHOP ──────────────────────────────── */}
        {activeTab === 'kitsune' ? (
          <div className="space-y-6">
            
            {/* Featured Daily Deal */}
            <div className="relative overflow-hidden rounded-2xl border border-accent-action bg-bg-elevated p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="absolute top-0 right-0 bg-accent-action text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl font-bold">
                Featured Deal • 24h Left
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent-action font-bold bg-accent-action/10 px-2 py-0.5 rounded">
                  Daily Special
                </span>
                <h3 className="font-serif text-lg font-bold text-text-primary mt-2">Golden Nine-tail Aura</h3>
                <p className="font-sans text-xs text-text-secondary">Volumetric golden aura effect for your Kitsune companion, Yuki.</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-mono text-base font-bold text-accent-action">720 KC</span>
                  <span className="font-mono text-xs text-text-secondary/65 line-through">900 KC</span>
                </div>
              </div>
              <button
                onClick={handleBuyFeatured}
                disabled={coins < 720 || inventory.auras.includes('aura_golden')}
                className={`px-6 py-3 rounded-xl font-sans text-xs font-bold shadow-sm transition-all border-none ${
                  inventory.auras.includes('aura_golden')
                    ? 'bg-success/15 text-success cursor-default'
                    : coins >= 720
                      ? 'bg-accent-action hover:bg-accent-action-hover text-white cursor-pointer hover:scale-103'
                      : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
                }`}
              >
                {inventory.auras.includes('aura_golden') ? 'Owned' : 'Buy Deal'}
              </button>
            </div>

            {/* Main Item Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Render Standard Categories */}
              {SHOP_CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-bg-elevated border border-structural rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-text-primary border-b border-structural pb-2 mb-2">
                      {cat.label}
                    </h3>
                    <p className="text-text-secondary text-xs mb-4 leading-relaxed">
                      {cat.description}
                    </p>
                    
                    <div className="space-y-4">
                      {cat.items.map((item: any) => {
                        const isOwned = (item.auraId && inventory.auras.includes(item.auraId)) || 
                                        (item.themeId && inventory.themes.includes(item.themeId));
                        const consumableKey = item.consumableKey as 'streak_freeze' | 'hint_token' | 'boss_retry' | undefined;
                        const quantity = consumableKey ? inventory[consumableKey] || 0 : 0;
                        const affordable = coins >= item.price;

                        return (
                          <div key={item.id} className="border border-structural bg-bg-base/15 rounded-xl p-3 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="text-xl" role="img" aria-label={item.name}>{item.icon}</span>
                                {consumableKey && quantity > 0 && (
                                  <span className="font-mono text-[9px] uppercase tracking-wider text-success font-bold bg-success/10 px-2 py-0.5 rounded">
                                    Owned: {quantity}
                                  </span>
                                )}
                                {isOwned && (
                                  <span className="font-mono text-[9px] uppercase tracking-wider text-success font-bold bg-success/10 px-2 py-0.5 rounded">
                                    Owned
                                  </span>
                                )}
                              </div>
                              <h4 className="font-serif text-sm font-bold text-text-primary mt-1.5">{item.name}</h4>
                              <p className="font-sans text-[11px] text-text-secondary mt-0.5">{item.effect}</p>
                            </div>
                            
                            <div className="mt-3 pt-2 border-t border-structural/20 flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-accent-action">{item.price} KC</span>
                              <button
                                onClick={() => handleBuyItem(item)}
                                disabled={isOwned || !affordable}
                                className={`px-3 py-1.5 rounded-lg font-sans text-[11px] font-bold border-none transition-all ${
                                  isOwned
                                    ? 'bg-success/10 text-success cursor-default'
                                    : affordable
                                      ? 'bg-accent-action hover:bg-accent-action-hover text-white cursor-pointer hover:scale-103'
                                      : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
                                }`}
                              >
                                {isOwned ? 'Owned' : 'Buy'}
                              </button>
                            </div>

                            {/* Almost There Progress Bar */}
                            {!isOwned && !affordable && (
                              (() => {
                                const pct = Math.round((coins / item.price) * 100);
                                const needed = item.price - coins;
                                return (
                                  <div className="mt-2 pt-2 border-t border-structural/10">
                                    <div className="flex justify-between text-[9px] font-sans font-semibold text-text-secondary">
                                      <span>Almost there! ({pct}%)</span>
                                      <span>Need {needed} KC</span>
                                    </div>
                                    <div className="w-full h-1 bg-structural/30 rounded-full overflow-hidden mt-1">
                                      <div className="h-full bg-accent-action rounded-full" style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>
                                );
                              })()
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Mystery Kitsune Chest Box (Categorized on its own) */}
              <div className="bg-bg-elevated border border-accent-action/30 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-text-primary border-b border-structural pb-2 mb-2">
                    Mystery Chest
                  </h3>
                  <p className="text-text-secondary text-xs mb-4 leading-relaxed">
                    Weighted random reward. The engagement centerpiece of the shop!
                  </p>
                  
                  <div className="border border-dashed border-accent-action/25 bg-accent-action/5 rounded-xl p-4 text-center space-y-3">
                    <span className="text-4xl block animate-bounce" role="img" aria-label="Chest">🎁</span>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-text-primary">Kitsune Chest</h4>
                      <p className="font-sans text-[11px] text-text-secondary mt-1">Random aura, refunds, or hint tokens! Jackpot rate: 5%</p>
                    </div>

                    <div className="border-t border-structural/25 pt-2 text-[10px] text-text-secondary/70 font-mono text-left space-y-1">
                      <div className="flex justify-between">
                        <span>Pouch Refund (50-150 KC):</span>
                        <span className="font-semibold text-text-primary">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Common Aura:</span>
                        <span className="font-semibold text-text-primary">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2x Hint Tokens:</span>
                        <span className="font-semibold text-text-primary">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rare Aura:</span>
                        <span className="font-semibold text-text-primary">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Epic Aura (Jackpot):</span>
                        <span className="font-semibold text-text-primary">5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-structural/20 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent-action">200 KC</span>
                  <button
                    onClick={handleOpenChest}
                    disabled={coins < 200}
                    className={`px-4 py-2 rounded-xl font-sans text-xs font-bold border-none transition-all shadow-sm ${
                      coins >= 200
                        ? 'bg-accent-action hover:bg-accent-action-hover text-white cursor-pointer hover:scale-103'
                        : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
                    }`}
                  >
                    Open Chest
                  </button>
                </div>

                {/* Almost There Progress Bar for Chest */}
                {coins < 200 && (
                  (() => {
                    const pct = Math.round((coins / 200) * 100);
                    const needed = 200 - coins;
                    return (
                      <div className="mt-2 pt-2 border-t border-structural/10">
                        <div className="flex justify-between text-[9px] font-sans font-semibold text-text-secondary">
                          <span>Almost there! ({pct}%)</span>
                          <span>Need {needed} KC</span>
                        </div>
                        <div className="w-full h-1 bg-structural/30 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-accent-action rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>

            </div>

            {/* Help / Tip Link */}
            <p className="text-center font-sans text-xs text-text-secondary pt-4">
              Need more coins?{' '}
              <button
                onClick={() => setShowCoinTips(true)}
                className="text-accent-action font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
              >
                How do I earn coins faster? ↗
              </button>
            </p>
          </div>
        ) : (
          /* ── TAB CONTENT: ORIGINAL ANIME GACHA ALTAR ────────────────── */
          <>
            {/* Series Dropdown Selector inside the Gacha Altar tab */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-text-secondary tracking-wider font-bold">Set:</span>
              <select
                value={selectedSeries}
                onChange={(e) => {
                  setSelectedSeries(e.target.value as 'one-piece' | 'demon-slayer');
                  setSelectedCard(null);
                  setSelectedHotspot(null);
                }}
                className="bg-bg-elevated hover:bg-bg-elevated/80 border border-structural text-text-primary font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none transition-all cursor-pointer font-bold"
              >
                <option value="one-piece">🏴‍☠️ One Piece Set</option>
                <option value="demon-slayer">⚔️ Demon Slayer Set</option>
              </select>
            </div>

            <div className={`gacha-stage-panel stage rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-center gap-8 shadow-sm relative overflow-hidden transition-all duration-700 ${summonPhase} ${
              summonPhase !== 's-altar' ? 'bg-gradient-to-b from-white via-[#FAF6F0] to-[#E6E1F7]/40 border border-text-primary min-h-[620px]' : 'bg-gradient-to-b from-white via-[#FAF6F0] to-[#FAF6F0] border border-text-primary min-h-[460px]'
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
                    <div className="w-56 sm:w-64 aspect-[2.5/3.5] rounded-2xl overflow-hidden border-2 border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-xl relative group transition-transform hover:scale-105 cursor-pointer bg-[#111111]">
                      {/* High-Fidelity Stitch Pack Image */}
                      <img
                        src={selectedSeries === 'one-piece' ? '/cards/op_pack.png' : '/cards/ds_pack.png'}
                        alt={selectedSeries === 'one-piece' ? 'One Piece Pack' : 'Demon Slayer Pack'}
                        className="w-full h-full object-cover"
                      />
                      {/* Metallic Foil Reflection Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-amber-200/20 pointer-events-none" />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-[#FFFDF5] border border-[#D4AF37]/60 font-mono text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                        Cost: {DRAW_COST} KC
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-sm space-y-5 z-10 relative">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-text-primary">Summoning Altar</h2>
                      <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                        Unlock {selectedSeries === 'one-piece' ? ONE_PIECE_CARDS.length : DEMON_SLAYER_CARDS.length} mystical cards from this set.
                      </p>
                      
                      <div className="mt-3.5 p-3.5 bg-bg-elevated/70 border border-text-primary rounded-2xl flex items-start gap-2.5 shadow-sm">
                        <span className="text-xl select-none mt-0.5">
                          {selectedSeries === 'one-piece' ? '🏴‍☠️' : '⚔️'}
                        </span>
                        <div>
                          <h4 className="font-mono text-[10px] uppercase font-bold text-accent-action tracking-wider leading-none">
                            {selectedSeries === 'one-piece' ? 'Pirate King Lore' : 'Corps Motto'}
                          </h4>
                          <p className="text-xs italic text-text-primary leading-relaxed mt-1">
                            {selectedSeries === 'one-piece'
                              ? '"Inherited Will, the Destiny of Age, and the Dreams of People. As long as people continue to pursue Freedom, these things will never cease to be!"'
                              : '"No matter how many people you lose, set your heart ablaze and surpass your limits!"'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 border-y border-text-primary/20 py-3.5 font-mono text-xs text-text-secondary">
                      <div className="flex justify-between">
                        <span>Legendary Drop Rate:</span>
                        <span className="text-[#C4796B] font-bold">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Epic Drop Rate:</span>
                        <span className="text-[#7D927D] font-bold">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rare Drop Rate:</span>
                        <span className="text-[#5A7D8B] font-bold">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Common Drop Rate:</span>
                        <span className="text-text-primary font-bold">40%</span>
                      </div>
                    </div>

                    <button
                      onClick={handleDrawPackCard}
                      disabled={coins < DRAW_COST}
                      className="w-full py-3.5 px-6 rounded-full bg-[#7D927D] hover:bg-[#6B826B] text-white font-sans text-xs font-bold border border-[#2F353B] shadow-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
                      ✦ DRAW x1 ({DRAW_COST} COINS)
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatBox label="Owned Cards" value={stats.collectedCount} color="text-text-primary" />
              <StatBox label="Completion Rate" value={`${stats.rate}%`} color="text-accent-mint" />
              <StatBox label="Legendaries Found" value={stats.legendaryCount} color="text-[#C4796B]" />
              <StatBox label="Epics Found" value={stats.epicCount} color="text-[#7D927D]" />
            </div>

            {/* Your Collection (Gacha Cards Grid) */}
            <div className="bg-bg-elevated border border-text-primary/20 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-text-primary/20 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-text-primary flex items-center gap-2">
                    <Trophy className="text-accent-action h-6 w-6" />
                    Your Collection
                  </h2>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    Demon Slayer & One Piece card collection ({unlockedGachaIds.length}/{GACHA_CARDS.length} unlocked)
                  </p>
                </div>

                {/* Set Dropdown Filter & Rank Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedSetFilter}
                    onChange={(e) => setSelectedSetFilter(e.target.value as 'all' | 'Demon Slayer' | 'One Piece')}
                    className="bg-[#F9F7F2] border border-[#7D927D]/20 text-[#2F353B] font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer font-bold shadow-sm"
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
                            ? 'bg-[#7D927D] text-white border-[#2F353B]'
                            : 'bg-bg-base text-text-secondary border-structural hover:border-text-primary'
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
                className="absolute top-4 right-4 bg-transparent border-none text-text-secondary hover:text-text-primary cursor-pointer focus:outline-none"
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
                  <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 text-[8px] font-mono font-semibold text-text-secondary/80">
                    <span>Card Registry</span>
                    <span className="text-[#2F353B] px-2 py-0.5 rounded-full"
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
                    <p className="font-sans text-[10px] text-text-secondary italic line-clamp-2">"{selectedCard.description}"</p>
                  </div>

                  <div className="w-full border-t border-white/10 pt-1.5 grid grid-cols-2 gap-2 font-mono text-[8px] text-[#ff7a3c] font-semibold">
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
                  <h3 className="font-serif text-lg font-bold text-text-primary">Card Hotspot Analyzer</h3>
                  <p className="text-xs text-text-secondary mt-1">Tap a section header below to analyze its design mechanics and gameplay synergy details.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {Object.entries(activeHotspots).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedHotspot(key as any)}
                        className={`text-left p-2.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                          selectedHotspot === key
                            ? 'ios-glass-button-active'
                            : 'ios-glass-button text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {value.title}
                      </button>
                    ))}
                  </div>

                  {selectedHotspot && (
                    <div className="mt-4 p-3 ios-glass-inner-panel rounded-2xl">
                      <h4 className="font-serif text-xs font-bold text-text-primary flex items-center gap-1.5">
                        <Info size={13} className="text-accent-action" />
                        {activeHotspots[selectedHotspot].title}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        {activeHotspots[selectedHotspot].explanation}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-structural pt-3 mt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-secondary">
                    Card ID: {selectedCard.id}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCard(null);
                      setSelectedHotspot(null);
                    }}
                    className="bg-accent-action hover:bg-accent-action-hover text-white font-sans text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer border-none"
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
            className="fixed inset-0 bg-black/25 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="ios-glass-panel rounded-2xl max-w-sm w-full p-6 text-center shadow-sm relative space-y-4"
            >
              <span className="text-5xl block animate-bounce" role="img" aria-label="Gift">🎁</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-text-primary">Chest Opened!</h3>
                <p className="font-sans text-xs text-text-secondary mt-1">Here is the random reward you pulled:</p>
              </div>

              <div className="ios-glass-inner-panel rounded-2xl p-4">
                <h4 className="font-serif text-base font-extrabold text-accent-action">{chestReward.title}</h4>
                <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed">{chestReward.detail}</p>
              </div>

              <button
                onClick={() => setChestReward(null)}
                className="w-full bg-accent-action hover:bg-accent-action-hover text-white font-sans text-xs font-bold py-2.5 rounded-xl border-none cursor-pointer hover:scale-103 transition-transform"
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
            className="fixed inset-0 bg-black/25 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="ios-glass-panel rounded-2xl max-w-sm w-full p-6 text-center shadow-sm space-y-4"
            >
              <span className="text-5xl block animate-pulse" role="img" aria-label="Celebration">🎉</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-text-primary">Purchase Successful!</h3>
                <p className="font-sans text-xs text-text-secondary mt-1">Thank you for your purchase!</p>
              </div>

              <div className="ios-glass-inner-panel rounded-2xl p-4">
                <h4 className="font-serif text-sm font-extrabold text-success">{purchaseCelebration.name}</h4>
                <p className="font-sans text-[11px] text-text-secondary mt-1">Cost: {purchaseCelebration.cost} KC</p>
                {purchaseCelebration.desc && (
                  <p className="font-sans text-xs text-text-secondary/90 italic mt-2 border-t border-structural/20 pt-2">{purchaseCelebration.desc}</p>
                )}
              </div>

              <button
                onClick={() => setPurchaseCelebration(null)}
                className="w-full bg-success hover:bg-success-hover text-white font-sans text-xs font-bold py-2.5 rounded-xl border-none cursor-pointer hover:scale-103 transition-transform"
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
            className="fixed inset-0 bg-black/25 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="ios-glass-panel rounded-2xl max-w-md w-full p-6 shadow-sm relative space-y-4"
            >
              <button
                onClick={() => setShowCoinTips(false)}
                className="absolute top-4 right-4 bg-transparent border-none text-text-secondary hover:text-text-primary cursor-pointer focus:outline-none"
              >
                <X size={18} />
              </button>

              <h3 className="font-serif text-lg font-bold text-text-primary border-b border-white/20 pb-2">
                💰 How to Earn Kitsune Coins Faster
              </h3>

              <div className="space-y-3.5 font-sans text-xs text-text-secondary leading-relaxed">
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">📅</span>
                  <div>
                    <h4 className="font-bold text-text-primary">Daily Streaks</h4>
                    <p>Maintain your daily log streak! The higher your streak, the higher your coin multiplier becomes when doing general activities.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">📋</span>
                  <div>
                    <h4 className="font-bold text-text-primary">Daily Quest Board</h4>
                    <p>Complete your daily rotating quest (visible on the Adventure tab) to secure huge bonus payments like +30 KC.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">📖</span>
                  <div>
                    <h4 className="font-bold text-text-primary">Mastering Vocabulary</h4>
                    <p>Learn and review new words in the dictionary. Reviewing weak words awards random coin drops!</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-base select-none">⚔️</span>
                  <div>
                    <h4 className="font-bold text-text-primary">Guardian Battles</h4>
                    <p>Beating a region guardian boss fight awards a large lump sum of coins and secures your kitsune tails!</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCoinTips(false)}
                className="w-full bg-accent-action hover:bg-accent-action-hover text-white font-sans text-xs font-bold py-2.5 rounded-xl border-none cursor-pointer mt-4"
              >
                Understood
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* iOS 27 Glassmorphism Styles */
        .ios-glass-panel {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(40px) saturate(210%) !important;
          -webkit-backdrop-filter: blur(40px) saturate(210%) !important;
          border: 1px solid rgba(255, 255, 255, 0.45) !important;
          box-shadow: 
            0 12px 40px rgba(31, 38, 135, 0.08),
            0 1px 0 rgba(255, 255, 255, 0.5) inset,
            0 -1px 0 rgba(0, 0, 0, 0.05) inset !important;
        }

        .ios-glass-card {
          background: rgba(255, 255, 255, 0.35) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.06),
            0 1px 0 rgba(255, 255, 255, 0.4) inset !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ios-glass-button {
          background: rgba(255, 255, 255, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ios-glass-button:hover {
          background: rgba(255, 255, 255, 0.55) !important;
          border-color: rgba(255, 255, 255, 0.5) !important;
          transform: translateY(-1px);
        }
        .ios-glass-button-active {
          background: var(--accent-action, #ff7a3c) !important;
          border-color: var(--accent-action, #ff7a3c) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(255, 122, 60, 0.25) !important;
        }

        .ios-glass-inner-panel {
          background: rgba(255, 255, 255, 0.25) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        /* ── CSS STYLES FOR GACHA COMPONENT ─────────────────────────── */
        .gacha-stage-panel {
          min-height: 440px;
          perspective: 1200px;
        }
        
        .vignette-overlay {
          background: radial-gradient(circle, transparent 50%, rgba(0,0,0,0.85));
        }

        .stage.s-transition { background: #0c0814; }
        .stage.s-rise { background: #0c0814; }
        .stage.s-begin { background: #0c0814; }
        .stage.s-intensity { background: #12091f; }
        .vignette-overlay {
          background: radial-gradient(circle at center, transparent 40%, rgba(250, 246, 240, 0.4));
        }

        .stage.s-transition,
        .stage.s-rise,
        .stage.s-begin,
        .stage.s-intensity,
        .stage.s-reveal {
          background: radial-gradient(circle at 50% 40%, #FFFFFF 0%, #FAF6F0 60%, rgba(217, 188, 242, 0.3) 100%) !important;
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

const StatBox: FC<StatBoxProps> = ({ label, value, color = "text-text-primary", icon }) => (
  <div className="bg-white/5 border border-[#7D927D]/20 rounded-xl p-4 text-center flex flex-col justify-center items-center shadow-sm">
    {icon && <div className="text-[#777775]/70 mb-1">{icon}</div>}
    <div className={`text-xl font-bold font-mono leading-none ${color}`}>{value}</div>
    <div className="text-[9px] uppercase tracking-wider text-[#777775] mt-1.5 leading-none">{label}</div>
  </div>
);

export default ShopScreen;