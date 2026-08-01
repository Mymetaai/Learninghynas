import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';
import type { ConsumableKey, UserEntitlements } from '../types/entitlement';
import { SHOP_CATALOG } from '../data/shopCatalog';

export interface ShopState {
  inventory: UserEntitlements;
  totalCardsDrawn: number;
  lastDrawResult: {
    cardId: string;
    franchise: 'one_piece' | 'demon_slayer';
    isDuplicate: boolean;
    refundedCoins: number;
  } | null;

  buyPowerUp: (itemKey: ConsumableKey, cost: number) => boolean;
  buyConsumable: (itemId: string) => boolean;
  buyAura: (itemId: string) => boolean;
  buyTheme: (itemId: string) => boolean;
  drawCardBooster: (franchise: 'one_piece' | 'demon_slayer', availableCardIds: string[], cost?: number) => { cardId: string; isDuplicate: boolean } | null;
  unlockBonusPack: (packId: string, cost: number) => boolean;
  hasCard: (cardId: string) => boolean;
  usePowerUpItem: (itemKey: ConsumableKey) => boolean;
  hasAura: (auraId: string) => boolean;
  hasTheme: (themeId: string) => boolean;
  resetShopInventory: () => void;
}

const DRAW_COST = 20;
const DUP_REFUND = 5;

const initialInventory: UserEntitlements = {
  consumables: { streak_freeze: 0, hint_token: 0, boss_retry: 0 },
  unlockedThemes: [],
  unlockedAuras: [],
  ownedCards: [],
  unlockedPacks: [],
  activeThemeId: '',
  activeAuraId: null,
};

const findCatalogItem = (id: string) => SHOP_CATALOG.find((item) => item.id === id);

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      inventory: initialInventory,
      totalCardsDrawn: 0,
      lastDrawResult: null,

      buyPowerUp: (itemKey, cost) => {
        const stats = useStatsStore.getState();
        if (stats.coins < cost) return false;
        const success = stats.spendCoins(cost);
        if (!success) return false;
        set((state) => ({
          inventory: {
            ...state.inventory,
            consumables: {
              ...state.inventory.consumables,
              [itemKey]: (state.inventory.consumables[itemKey] || 0) + 1,
            },
          },
        }));
        return true;
      },

      buyConsumable: (itemId) => {
        const item = findCatalogItem(itemId);
        if (!item || item.type !== 'consumable' || !item.consumableKey) return false;
        return get().buyPowerUp(item.consumableKey, item.priceInCoins);
      },

      buyAura: (itemId) => {
        const item = findCatalogItem(itemId);
        if (!item || item.type !== 'companion_aura') return false;
        const stats = useStatsStore.getState();
        if (stats.coins < item.priceInCoins) return false;
        const success = stats.spendCoins(item.priceInCoins);
        if (!success) return false;
        set((state) => ({
          inventory: {
            ...state.inventory,
            unlockedAuras: [...new Set([...state.inventory.unlockedAuras, itemId])],
            activeAuraId: itemId,
          },
        }));
        return true;
      },

      buyTheme: (itemId) => {
        const item = findCatalogItem(itemId);
        if (!item || item.type !== 'theme') return false;
        const stats = useStatsStore.getState();
        if (stats.coins < item.priceInCoins) return false;
        const success = stats.spendCoins(item.priceInCoins);
        if (!success) return false;
        set((state) => ({
          inventory: {
            ...state.inventory,
            unlockedThemes: [...new Set([...state.inventory.unlockedThemes, itemId])],
            activeThemeId: itemId,
          },
        }));
        return true;
      },

      drawCardBooster: (franchise, availableCardIds, cost = DRAW_COST) => {
        if (!availableCardIds || availableCardIds.length === 0) return null;
        const stats = useStatsStore.getState();
        if (stats.coins < cost) return null;
        const spent = stats.spendCoins(cost);
        if (!spent) return null;
        const randomIndex = Math.floor(Math.random() * availableCardIds.length);
        const cardId = availableCardIds[randomIndex];
        const isDuplicate = get().inventory.ownedCards.includes(cardId);
        let refundedCoins = 0;
        if (isDuplicate) {
          refundedCoins = DUP_REFUND;
          stats.addRewards(0, DUP_REFUND);
        } else {
          set((state) => ({
            inventory: {
              ...state.inventory,
              ownedCards: [...new Set([...state.inventory.ownedCards, cardId])],
            },
          }));
        }
        const drawResult = { cardId, franchise, isDuplicate, refundedCoins };
        set((state) => ({
          totalCardsDrawn: state.totalCardsDrawn + 1,
          lastDrawResult: drawResult,
        }));
        return { cardId, isDuplicate };
      },

      unlockBonusPack: (packId, cost) => {
        const stats = useStatsStore.getState();
        if (stats.coins < cost) return false;
        if (get().inventory.unlockedPacks.includes(packId)) return true;
        const success = stats.spendCoins(cost);
        if (!success) return false;
        set((state) => ({
          inventory: {
            ...state.inventory,
            unlockedPacks: [...new Set([...state.inventory.unlockedPacks, packId])],
          },
        }));
        stats.addRewards(100, 0);
        return true;
      },

      hasCard: (cardId) => get().inventory.ownedCards.includes(cardId),

      hasAura: (auraId) => get().inventory.unlockedAuras.includes(auraId),

      hasTheme: (themeId) => get().inventory.unlockedThemes.includes(themeId),

      usePowerUpItem: (itemKey) => {
        const currentCount = get().inventory.consumables[itemKey] || 0;
        if (currentCount <= 0) return false;
        set((state) => ({
          inventory: {
            ...state.inventory,
            consumables: {
              ...state.inventory.consumables,
              [itemKey]: state.inventory.consumables[itemKey] - 1,
            },
          },
        }));
        return true;
      },

      resetShopInventory: () => {
        set({ inventory: initialInventory, totalCardsDrawn: 0, lastDrawResult: null });
      },
    }),
    {
      name: 'hyena-shop-store',
      partialize: (state) => ({
        inventory: state.inventory,
        totalCardsDrawn: state.totalCardsDrawn,
        lastDrawResult: state.lastDrawResult,
      }),
    }
  )
);