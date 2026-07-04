// STEP 3 — World assembly.
// Builds the Pre-A1 world from the four fully-authored quests, and defines
// structural stubs for A1–C1. The type system already supports all six
// levels (see types.ts); full A1–C1 content is authored in Step 18.
//
// Region names follow the "Kitsune's Path" narrative. Each region awards
// kitsune tails (total = 9) and has a Guardian boss.
import type { World } from './types';
import { preA1Quest1 } from './preA1/quest1-greetings';
import { preA1Quest2 } from './preA1/quest2-colors-numbers';
import { preA1Quest3 } from './preA1/quest3-family';
import { preA1Quest4 } from './preA1/quest4-animals-objects';

/** Pre-A1 — fully authored. Region: "Pueblo Inicial" (the starting village). */
export const worldPreA1: World = {
  id: 'world-pre-a1',
  name: 'Pueblo Inicial',
  description: 'A quiet starting village where your first Spanish words begin.',
  level: 'Pre-A1',
  quests: [preA1Quest1, preA1Quest2, preA1Quest3, preA1Quest4],
  unlockRequirement: 'first',
  guardian: 'The Gatekeeper',
  tailsAwarded: 1,
};

// ── Structural stubs (A1–C1) ─────────────────────────────────────────────
// These exist so the World Map and progression can be planned and so the
// type system demonstrably supports every level. Their `quests` are empty
// for now — Step 18 fills them with full content using the SAME data model.

export const worldA1: World = {
  id: 'world-a1',
  name: 'Bosque de Verbos',
  description: 'A forest where verbs conjugate as you walk — daily life, food, and friends.',
  level: 'A1',
  quests: [],
  unlockRequirement: 'world-pre-a1',
  guardian: 'The Conjugation Spirit',
  tailsAwarded: 1,
};

export const worldA2: World = {
  id: 'world-a2',
  name: 'Ciudad Fluida',
  description: 'A bustling city of conversation — travel, markets, and small mysteries.',
  level: 'A2',
  quests: [],
  unlockRequirement: 'world-a1',
  guardian: 'The Chatterbox Oni',
  tailsAwarded: 1,
};

export const worldB1: World = {
  id: 'world-b1',
  name: 'Montaña Avanzada',
  description: 'A steep mountain of subjunctive and idiom — opinions, feelings, and challenges.',
  level: 'B1',
  quests: [],
  unlockRequirement: 'world-a2',
  guardian: 'The Mountain Sage',
  tailsAwarded: 2,
};

export const worldB2: World = {
  id: 'world-b2',
  name: 'Templo del Fluir',
  description: 'A temple of flowing speech — work, debate, and social dynamics.',
  level: 'B2',
  quests: [],
  unlockRequirement: 'world-b1',
  guardian: 'The Nine-Tailed Elder',
  tailsAwarded: 2,
};

export const worldC1: World = {
  id: 'world-c1',
  name: 'Templo Maestro',
  description: 'The grand temple of fluency and nuance — literature, rhetoric, and mastery.',
  level: 'C1',
  quests: [],
  unlockRequirement: 'world-b2',
  guardian: 'The Ancestral Fox King',
  tailsAwarded: 2,
};

export const ALL_WORLDS: World[] = [
  worldPreA1,
  worldA1,
  worldA2,
  worldB1,
  worldB2,
  worldC1,
];
