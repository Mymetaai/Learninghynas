import type { ShopCatalogItem } from '../types/entitlement';

export const SHOP_CATALOG: ShopCatalogItem[] = [
  // Consumables / Power-ups
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    description: 'Protects your daily streak if you miss a day of practice.',
    category: 'powerups',
    type: 'consumable',
    priceInCoins: 80,
    rarity: 'rare',
    icon: '🔥',
    consumableKey: 'streak_freeze',
    effect: 'Protects your streak for one missed day',
  },
  {
    id: 'hint_token',
    name: 'Hint Token',
    description: 'Provides an instant contextual hint during challenging exercises.',
    category: 'powerups',
    type: 'consumable',
    priceInCoins: 30,
    rarity: 'common',
    icon: '💡',
    consumableKey: 'hint_token',
    effect: 'Reveals one letter/word in a quiz question',
  },
  {
    id: 'boss_retry',
    name: 'Guardian Retry Token',
    description: 'Grants an extra attempt when challenging boss levels.',
    category: 'powerups',
    type: 'consumable',
    priceInCoins: 100,
    rarity: 'epic',
    icon: '🛡️',
    consumableKey: 'boss_retry',
    effect: 'Immediately retry a failed Guardian Battle',
  },

  // Companion Auras
  {
    id: 'aura_sakura',
    name: 'Sakura Bloom Aura',
    description: 'Pink petal tail-glow effect for your Kitsune companion.',
    category: 'auras',
    type: 'companion_aura',
    priceInCoins: 150,
    rarity: 'rare',
    icon: '🌸',
    previewColor: '#F472B6',
    auraEffect: {
      particleColor: '#F472B6',
      glowIntensity: 0.6,
      type: 'sakura',
    },
    effect: 'Pink petal tail-glow effect for Yuki',
  },
  {
    id: 'aura_ocean',
    name: 'Ocean Mist Aura',
    description: 'Blue wave tail-glow effect for your Kitsune companion.',
    category: 'auras',
    type: 'companion_aura',
    priceInCoins: 150,
    rarity: 'rare',
    icon: '🌊',
    previewColor: '#38BDF8',
    auraEffect: {
      particleColor: '#38BDF8',
      glowIntensity: 0.6,
      type: 'sakura',
    },
    effect: 'Blue wave tail-glow effect for Yuki',
  },
  {
    id: 'aura_shadow',
    name: 'Shadow Flame Aura',
    description: 'Purple void tail-glow effect for your Kitsune companion.',
    category: 'auras',
    type: 'companion_aura',
    priceInCoins: 400,
    rarity: 'epic',
    icon: '💜',
    previewColor: '#A855F7',
    auraEffect: {
      particleColor: '#A855F7',
      glowIntensity: 0.8,
      type: 'spirit_flame',
    },
    effect: 'Purple void tail-glow effect for Yuki',
  },
  {
    id: 'aura_golden',
    name: 'Golden Nine-Tail Aura',
    description: 'Volumetric golden aura effect for your Kitsune companion.',
    category: 'auras',
    type: 'companion_aura',
    priceInCoins: 720,
    rarity: 'legendary',
    icon: '🌟',
    previewColor: '#FBBF24',
    auraEffect: {
      particleColor: '#FBBF24',
      glowIntensity: 1.0,
      type: 'stardust',
    },
    effect: 'Legendary golden aura effect for Yuki',
  },

  // Themes (CSS Variable driven)
  {
    id: 'theme_midnight',
    name: 'Midnight Kitsune Theme',
    description: 'Deep dark indigo UI theme override.',
    category: 'themes',
    type: 'theme',
    priceInCoins: 300,
    rarity: 'epic',
    icon: '🌌',
    previewColor: '#1E1B4B',
    cssVariables: {
      '--bg-base': '#0F0A1A',
      '--bg-elevated': '#1A1428',
      '--bg-elevated-2': '#251E3A',
      '--structural': '#3B2D5E',
      '--text-primary': '#F3E8FF',
      '--text-secondary': '#A78BFA',
      '--accent-action': '#8B5CF6',
      '--accent-action-hover': '#7C3AED',
      '--accent-mint': '#A78BFA',
      '--accent-lavender': '#3B2D5E',
      '--success': '#10B981',
      '--error': '#F87171',
      '--info': '#60A5FA',
      '--streak-warm': '#FBBF24',
    },
    effect: 'Deep dark indigo UI theme override',
  },
  {
    id: 'theme_sakura',
    name: 'Sakura Season Theme',
    description: 'Soft pastel pink UI theme override.',
    category: 'themes',
    type: 'theme',
    priceInCoins: 300,
    rarity: 'epic',
    icon: '🌸',
    previewColor: '#FCE7F3',
    cssVariables: {
      '--bg-base': '#FDF2F8',
      '--bg-elevated': '#FFF1F2',
      '--bg-elevated-2': '#FCE7F3',
      '--structural': '#FBCFE8',
      '--text-primary': '#4C1D95',
      '--text-secondary': '#A78BFA',
      '--accent-action': '#EC4899',
      '--accent-action-hover': '#DB2777',
      '--accent-mint': '#F472B6',
      '--accent-lavender': '#FBCFE8',
      '--success': '#10B981',
      '--error': '#F87171',
      '--info': '#60A5FA',
      '--streak-warm': '#FB923C',
    },
    effect: 'Soft pastel pink UI theme override',
  },

  // Gacha Booster Packs
  {
    id: 'gacha_one_piece',
    name: 'One Piece Card Booster Pack',
    description: 'Draw 1 collectible anime card from the One Piece universe.',
    category: 'gacha',
    type: 'gacha_card',
    priceInCoins: 20,
    rarity: 'epic',
    icon: '🃏',
    franchise: 'one_piece',
  },
  {
    id: 'gacha_demon_slayer',
    name: 'Demon Slayer Card Booster Pack',
    description: 'Draw 1 collectible anime card from the Demon Slayer universe.',
    category: 'gacha',
    type: 'gacha_card',
    priceInCoins: 20,
    rarity: 'epic',
    icon: '🃏',
    franchise: 'demon_slayer',
  },

  // Bonus Content Packs
  {
    id: 'pack_bonus_grammar',
    name: 'Advanced Grammar Pack',
    description: 'Unlocks 25+ extra specialized practice drills and sentence builder scenarios.',
    category: 'packs',
    type: 'content_pack',
    priceInCoins: 100,
    rarity: 'rare',
    icon: '📖',
  },
  {
    id: 'pack_bonus_stories',
    name: 'Immersive Story Expansion',
    description: 'Unlocks exclusive interactive dialogue scenarios in the Story mode.',
    category: 'packs',
    type: 'content_pack',
    priceInCoins: 100,
    rarity: 'epic',
    icon: '✨',
  },
];

export function getCatalogItem(id: string): ShopCatalogItem | undefined {
  return SHOP_CATALOG.find((item) => item.id === id);
}

export function getCatalogByCategory(category: ShopCatalogItem['category']): ShopCatalogItem[] {
  return SHOP_CATALOG.filter((item) => item.category === category);
}

export function getConsumableCatalog(): ShopCatalogItem[] {
  return SHOP_CATALOG.filter((item) => item.type === 'consumable');
}

export function getAuraCatalog(): ShopCatalogItem[] {
  return SHOP_CATALOG.filter((item) => item.type === 'companion_aura');
}

export function getThemeCatalog(): ShopCatalogItem[] {
  return SHOP_CATALOG.filter((item) => item.type === 'theme');
}

export function getGachaCatalog(): ShopCatalogItem[] {
  return SHOP_CATALOG.filter((item) => item.type === 'gacha_card');
}