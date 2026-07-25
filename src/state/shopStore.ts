// Shop Store — Power-ups, Card Booster Packs, Duplicate Coin Refunds & Inventory Management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';

export interface ShopInventory {
  streak_freeze: number;
  hint_token: number;
  boss_retry: number;
  owned_cards: string[]; // Card IDs from One Piece & Demon Slayer sets
  unlocked_bonus_packs: string[];
}

export interface ShopState {
  inventory: ShopInventory;
  totalCardsDrawn: number;
  lastDrawResult: {
    cardId: string;
    franchise: 'one_piece' | 'demon_slayer';
    isDuplicate: boolean;
    refundedCoins: number;
  } | null;

  // Actions
  buyPowerUp: (itemKey: 'streak_freeze' | 'hint_token' | 'boss_retry', cost: number) => boolean;
  drawCardBooster: (franchise: 'one_piece' | 'demon_slayer', availableCardIds: string[], cost?: number) => { cardId: string; isDuplicate: boolean } | null;
  unlockBonusPack: (packId: string, cost: number) => boolean;
  hasCard: (cardId: string) => boolean;
  usePowerUpItem: (itemKey: 'streak_freeze' | 'hint_token' | 'boss_retry') => boolean;
  resetShopInventory: () => void;
}

const DRAW_COST = 20;
const DUP_REFUND = 5;

const initialInventory: ShopInventory = {
  streak_freeze: 0,
  hint_token: 0,
  boss_retry: 0,
  owned_cards: [],
  unlocked_bonus_packs: [],
};

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
            [itemKey]: (state.inventory[itemKey] || 0) + 1,
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

        // Random roll
        const randomIndex = Math.floor(Math.random() * availableCardIds.length);
        const cardId = availableCardIds[randomIndex];
        const isDuplicate = get().inventory.owned_cards.includes(cardId);

        let refundedCoins = 0;
        if (isDuplicate) {
          refundedCoins = DUP_REFUND;
          stats.addRewards(0, DUP_REFUND);
        } else {
          set((state) => ({
            inventory: {
              ...state.inventory,
              owned_cards: [...state.inventory.owned_cards, cardId],
            },
          }));
        }

        const drawResult = {
          cardId,
          franchise,
          isDuplicate,
          refundedCoins,
        };

        set((state) => ({
          totalCardsDrawn: state.totalCardsDrawn + 1,
          lastDrawResult: drawResult,
        }));

        return { cardId, isDuplicate };
      },

      unlockBonusPack: (packId, cost) => {
        const stats = useStatsStore.getState();
        if (stats.coins < cost) return false;
        if (get().inventory.unlocked_bonus_packs.includes(packId)) return true;

        const success = stats.spendCoins(cost);
        if (!success) return false;

        set((state) => ({
          inventory: {
            ...state.inventory,
            unlocked_bonus_packs: [...state.inventory.unlocked_bonus_packs, packId],
          },
        }));

        // Reward XP for unlocking bonus exercise pack
        stats.addRewards(100, 0);
        return true;
      },

      hasCard: (cardId) => get().inventory.owned_cards.includes(cardId),

      usePowerUpItem: (itemKey) => {
        const currentCount = get().inventory[itemKey] || 0;
        if (currentCount <= 0) return false;

        set((state) => ({
          inventory: {
            ...state.inventory,
            [itemKey]: state.inventory[itemKey] - 1,
          },
        }));
        return true;
      },

      resetShopInventory: () => {
        set({
          inventory: initialInventory,
          totalCardsDrawn: 0,
          lastDrawResult: null,
        });
      },
    }),
    {
      name: 'hyena-shop-store',
    }
  )
);
