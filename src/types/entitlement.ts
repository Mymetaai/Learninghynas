export type EntitlementType = 'consumable' | 'theme' | 'companion_aura' | 'gacha_card' | 'content_pack';

export type ConsumableKey = 'streak_freeze' | 'hint_token' | 'boss_retry';

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type ShopCategory = 'powerups' | 'themes' | 'auras' | 'gacha' | 'packs';

export type GachaSet = 'one_piece' | 'demon_slayer';

export interface ShopCatalogItem {
  id: string;
  name: string;
  description: string;
  category: ShopCategory;
  type: EntitlementType;
  priceInCoins: number;
  rarity: ItemRarity;
  icon: string;
  previewColor?: string;
  cssVariables?: Record<string, string>;
  auraEffect?: {
    particleColor: string;
    glowIntensity: number;
    type: 'sakura' | 'spirit_flame' | 'stardust';
  };
  consumableKey?: ConsumableKey;
  franchise?: GachaSet;
  effect?: string;
}

export interface Entitlement {
  id: string;
  type: EntitlementType;
  quantity: number;
  acquiredAt: string;
}

export interface UserEntitlements {
  consumables: Record<ConsumableKey, number>;
  unlockedThemes: string[];
  unlockedAuras: string[];
  ownedCards: string[];
  unlockedPacks: string[];
  activeThemeId: string;
  activeAuraId: string | null;
  unlockedSoundPacks?: string[];
  activeSoundPackId?: string;
}

export type ShopInventory = UserEntitlements;