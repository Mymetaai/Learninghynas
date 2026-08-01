import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStatsStore } from './statsStore';
import { getCatalogItem } from '../data/shopCatalog';
import type { ConsumableKey, UserEntitlements } from '../types/entitlement';

export interface EntitlementState extends UserEntitlements {
  // Actions
  purchaseItem: (itemId: string) => boolean;
  purchaseGachaCard: (
    franchise: 'one_piece' | 'demon_slayer',
    availableCardIds: string[]
  ) => { cardId: string; isDuplicate: boolean; refundedCoins: number } | null;
  useConsumable: (key: ConsumableKey) => boolean;
  setActiveTheme: (themeId: string) => boolean;
  setActiveAura: (auraId: string | null) => boolean;
  hasCard: (cardId: string) => boolean;
  hasEntitlement: (itemId: string) => boolean;
  resetEntitlements: () => void;
  syncFromSupabase: (remote: Partial<UserEntitlements>) => void;
}

const DEFAULT_ENTITLEMENTS: UserEntitlements = {
  consumables: {
    streak_freeze: 0,
    hint_token: 0,
    boss_retry: 0,
  },
  unlockedThemes: ['theme_parchment'],
  unlockedAuras: [],
  ownedCards: [],
  unlockedPacks: [],
  activeThemeId: 'theme_parchment',
  activeAuraId: null,
};

const spendCoinsFromStats = (amount: number): boolean => {
  const stats = useStatsStore.getState();
  if (typeof stats.spendCoins === 'function') {
    return stats.spendCoins(amount);
  }
  if (stats.coins >= amount) {
    useStatsStore.setState((s: any) => ({ coins: (s.coins || 0) - amount }));
    return true;
  }
  return false;
};

export const useEntitlementStore = create<EntitlementState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_ENTITLEMENTS,

      purchaseItem: (itemId: string) => {
        const item = getCatalogItem(itemId);
        if (!item) return false;

        const stats = useStatsStore.getState();

        // Check if already owned non-consumable
        if (item.type === 'theme' && get().unlockedThemes.includes(itemId)) return true;
        if (item.type === 'companion_aura' && get().unlockedAuras.includes(itemId)) return true;
        if (item.type === 'content_pack' && get().unlockedPacks.includes(itemId)) return true;

        // Check coin balance
        if (stats.coins < item.priceInCoins) return false;

        const spent = spendCoinsFromStats(item.priceInCoins);
        if (!spent) return false;

        set((state) => {
          if (item.type === 'consumable' && item.consumableKey) {
            const key = item.consumableKey;
            return {
              consumables: {
                ...state.consumables,
                [key]: (state.consumables[key] || 0) + 1,
              },
            };
          }

          if (item.type === 'theme') {
            return {
              unlockedThemes: [...new Set([...state.unlockedThemes, itemId])],
              activeThemeId: itemId, // Auto-equip on purchase
            };
          }

          if (item.type === 'companion_aura') {
            return {
              unlockedAuras: [...new Set([...state.unlockedAuras, itemId])],
              activeAuraId: itemId, // Auto-equip on purchase
            };
          }

          if (item.type === 'content_pack') {
            // Reward XP bonus for content pack unlock
            stats.addRewards(100, 0);
            return {
              unlockedPacks: [...new Set([...state.unlockedPacks, itemId])],
            };
          }

          return state;
        });

        return true;
      },

      purchaseGachaCard: (_franchise, availableCardIds) => {
        if (!availableCardIds || availableCardIds.length === 0) return null;

        const GACHA_COST = 20;
        const DUP_REFUND = 5;

        const stats = useStatsStore.getState();
        if (stats.coins < GACHA_COST) return null;

        const spent = spendCoinsFromStats(GACHA_COST);
        if (!spent) return null;

        const randomIndex = Math.floor(Math.random() * availableCardIds.length);
        const cardId = availableCardIds[randomIndex];
        const isDuplicate = get().ownedCards.includes(cardId);

        let refundedCoins = 0;
        if (isDuplicate) {
          refundedCoins = DUP_REFUND;
          stats.addRewards(0, DUP_REFUND);
        } else {
          set((state) => ({
            ownedCards: [...new Set([...state.ownedCards, cardId])],
          }));
        }

        return { cardId, isDuplicate, refundedCoins };
      },

      useConsumable: (key) => {
        const count = get().consumables[key] || 0;
        if (count <= 0) return false;

        set((state) => ({
          consumables: {
            ...state.consumables,
            [key]: state.consumables[key] - 1,
          },
        }));
        return true;
      },

      setActiveTheme: (themeId) => {
        if (!get().unlockedThemes.includes(themeId)) return false;
        set({ activeThemeId: themeId });
        return true;
      },

      setActiveAura: (auraId) => {
        if (auraId !== null && !get().unlockedAuras.includes(auraId)) return false;
        set({ activeAuraId: auraId });
        return true;
      },

      hasCard: (cardId) => get().ownedCards.includes(cardId),

      hasEntitlement: (itemId) => {
        const state = get();
        return (
          state.unlockedThemes.includes(itemId) ||
          state.unlockedAuras.includes(itemId) ||
          state.unlockedPacks.includes(itemId) ||
          state.ownedCards.includes(itemId)
        );
      },

      resetEntitlements: () => {
        set(DEFAULT_ENTITLEMENTS);
      },

      syncFromSupabase: (remote) => {
        set((state) => ({
          consumables: {
            ...state.consumables,
            ...(remote.consumables || {}),
          },
          unlockedThemes: [...new Set([...state.unlockedThemes, ...(remote.unlockedThemes || [])])],
          unlockedAuras: [...new Set([...state.unlockedAuras, ...(remote.unlockedAuras || [])])],
          ownedCards: [...new Set([...state.ownedCards, ...(remote.ownedCards || [])])],
          unlockedPacks: [...new Set([...state.unlockedPacks, ...(remote.unlockedPacks || [])])],
          activeThemeId: remote.activeThemeId || state.activeThemeId,
          activeAuraId: remote.activeAuraId !== undefined ? remote.activeAuraId : state.activeAuraId,
        }));
      },
    }),
    {
      name: 'wayfarer-canonical-entitlements',
    }
  )
);
