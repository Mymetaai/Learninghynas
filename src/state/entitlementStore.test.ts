import { describe, it, expect, beforeEach } from 'vitest';
import { useEntitlementStore } from './entitlementStore';
import { useStatsStore } from './statsStore';

describe('useEntitlementStore', () => {
  beforeEach(() => {
    useEntitlementStore.setState({
      consumables: { streak_freeze: 0, hint_token: 0, boss_retry: 0 },
      unlockedThemes: ['theme_parchment'],
      unlockedAuras: [],
      ownedCards: [],
      unlockedPacks: [],
      activeThemeId: 'theme_parchment',
      activeAuraId: null,
    });
    useStatsStore.setState({
      coins: 500,
      xp: 1000,
      streak: 5,
    });
  });

  it('initializes with default parchment theme unlocked', () => {
    const store = useEntitlementStore.getState();
    expect(store.unlockedThemes).toContain('theme_parchment');
    expect(store.activeThemeId).toBe('theme_parchment');
    expect(store.activeAuraId).toBeNull();
  });

  it('purchases consumable power-ups and deducts coins correctly', () => {
    const initialCoins = useStatsStore.getState().coins; // 500
    const purchased = useEntitlementStore.getState().purchaseItem('streak_freeze'); // 80 coins

    expect(purchased).toBe(true);
    expect(useEntitlementStore.getState().consumables.streak_freeze).toBe(1);
    expect(useStatsStore.getState().coins).toBe(initialCoins - 80);
  });

  it('purchases and auto-equips new theme cosmetic', () => {
    const purchased = useEntitlementStore.getState().purchaseItem('theme_midnight'); // 300 coins

    expect(purchased).toBe(true);
    expect(useEntitlementStore.getState().unlockedThemes).toContain('theme_midnight');
    expect(useEntitlementStore.getState().activeThemeId).toBe('theme_midnight');
  });

  it('purchases and auto-equips companion aura', () => {
    const purchased = useEntitlementStore.getState().purchaseItem('aura_sakura'); // 100 coins

    expect(purchased).toBe(true);
    expect(useEntitlementStore.getState().unlockedAuras).toContain('aura_sakura');
    expect(useEntitlementStore.getState().activeAuraId).toBe('aura_sakura');
  });

  it('safely decrements consumable items', () => {
    useEntitlementStore.getState().purchaseItem('hint_token'); // 30 coins
    const countBefore = useEntitlementStore.getState().consumables.hint_token;
    expect(countBefore).toBeGreaterThan(0);

    const used = useEntitlementStore.getState().useConsumable('hint_token');
    expect(used).toBe(true);
    expect(useEntitlementStore.getState().consumables.hint_token).toBe(countBefore - 1);
  });

  it('handles gacha booster pack draws and duplicate coin refunds', () => {
    const cards = ['card-1', 'card-2'];
    
    // First draw - new card
    const res1 = useEntitlementStore.getState().purchaseGachaCard('one_piece', cards);
    expect(res1).not.toBeNull();
    expect(res1?.isDuplicate).toBe(false);
    expect(useEntitlementStore.getState().ownedCards).toContain(res1?.cardId);

    // Force duplicate draw
    const cardId = res1!.cardId;
    const res2 = useEntitlementStore.getState().purchaseGachaCard('one_piece', [cardId]);
    expect(res2?.isDuplicate).toBe(true);
    expect(res2?.refundedCoins).toBe(5);
  });
});
