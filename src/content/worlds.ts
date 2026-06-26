// STEP 3 — World assembly.
// Builds the Pre-A1 world from the four fully-authored quests, and defines
// structural stubs for A1–C1. The type system already supports all six
// levels (see types.ts); full A1–C1 content is authored in Step 18.
import type { World } from './types';
import { preA1Quest1 } from './preA1/quest1-greetings';
import { preA1Quest2 } from './preA1/quest2-colors-numbers';
import { preA1Quest3 } from './preA1/quest3-family';
import { preA1Quest4 } from './preA1/quest4-animals-objects';

/** Pre-A1 — fully authored. Region: "La Aldea" (the village). */
export const worldPreA1: World = {
  id: 'world-pre-a1',
  name: 'La Aldea',
  description: 'A sunlit village square where your first Spanish words begin.',
  level: 'Pre-A1',
  quests: [preA1Quest1, preA1Quest2, preA1Quest3, preA1Quest4],
  unlockRequirement: 'first',
};

// ── Structural stubs (A1–C1) ─────────────────────────────────────────────
// These exist so the World Map and progression can be planned and so the
// type system demonstrably supports every level. Their `quests` are empty
// for now — Step 18 fills them with full content using the SAME data model.

export const worldA1: World = {
  id: 'world-a1',
  name: 'El Camino',
  description: 'The road out of the village — daily life, food, and friends.',
  level: 'A1',
  quests: [],
  unlockRequirement: 'world-pre-a1',
};

export const worldA2: World = {
  id: 'world-a2',
  name: 'El Puerto',
  description: 'A bustling port — travel, markets, and small mysteries.',
  level: 'A2',
  quests: [],
  unlockRequirement: 'world-a1',
};

export const worldB1: World = {
  id: 'world-b1',
  name: 'La Sierra',
  description: 'Mountain journeys — opinions, feelings, and challenges.',
  level: 'B1',
  quests: [],
  unlockRequirement: 'world-a2',
};

export const worldB2: World = {
  id: 'world-b2',
  name: 'La Ciudad',
  description: 'The big city — work, debate, and social dynamics.',
  level: 'B2',
  quests: [],
  unlockRequirement: 'world-b1',
};

export const worldC1: World = {
  id: 'world-c1',
  name: 'La Biblioteca',
  description: 'The great library — literature, nuance, and rhetoric.',
  level: 'C1',
  quests: [],
  unlockRequirement: 'world-b2',
};

export const ALL_WORLDS: World[] = [
  worldPreA1,
  worldA1,
  worldA2,
  worldB1,
  worldB2,
  worldC1,
];
