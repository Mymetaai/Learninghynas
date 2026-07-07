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
import { preA1Quest5 } from './preA1/quest5-gen';
import { preA1Quest6 } from './preA1/quest6-gen';
import { preA1Quest7 } from './preA1/quest7-gen';
import { preA1Quest8 } from './preA1/quest8-gen';
import { preA1Quest9 } from './preA1/quest9-gen';
import { preA1Quest10 } from './preA1/quest10-gen';
import { preA1Quest11 } from './preA1/quest11-gen';
import { preA1Quest12 } from './preA1/quest12-gen';
import { preA1Quest13 } from './preA1/quest13-gen';
import { preA1Quest14 } from './preA1/quest14-gen';
import { preA1Quest15 } from './preA1/quest15-gen';
import { preA1Quest16 } from './preA1/quest16-gen';
import { preA1Quest17 } from './preA1/quest17-gen';
import { preA1Quest18 } from './preA1/quest18-gen';
import { preA1Quest19 } from './preA1/quest19-gen';
import { preA1Quest20 } from './preA1/quest20-gen';
import { preA1Quest21 } from './preA1/quest21-gen';
import { preA1Quest22 } from './preA1/quest22-gen';
import { preA1Quest23 } from './preA1/quest23-gen';
import { preA1Quest24 } from './preA1/quest24-gen';
import { preA1Quest25 } from './preA1/quest25-gen';
import { BOOK_LEVELS } from './bookLevels';

const preA1Quests = [
  preA1Quest1, preA1Quest2, preA1Quest3, preA1Quest4,
  preA1Quest5, preA1Quest6, preA1Quest7, preA1Quest8, preA1Quest9, preA1Quest10,
  preA1Quest11, preA1Quest12, preA1Quest13, preA1Quest14, preA1Quest15, preA1Quest16,
  preA1Quest17, preA1Quest18, preA1Quest19, preA1Quest20, preA1Quest21, preA1Quest22,
  preA1Quest23, preA1Quest24, preA1Quest25
];

/** Pre-A1 — fully authored. Region: "Pueblo Inicial" (the starting village). */
export const worldPreA1: World = {
  id: 'world-pre-a1',
  name: 'Pueblo Inicial',
  description: 'A quiet starting village where your first Spanish words begin.',
  level: 'Pre-A1',
  quests: preA1Quests,
  chapters: [
    {
      id: 'pre-a1-ch1',
      chapterNumber: 1,
      name: 'The Village Outskirts',
      description: 'First steps: basic greetings, numbers, and colors around the village.',
      quests: preA1Quests.slice(0, 10),
      endBoss: {
        type: 'sentinel',
        id: 'pre-a1-ch1-boss',
        name: 'Forest Sentinel',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'pre-a1-ch2',
      chapterNumber: 2,
      name: 'The Whispering Pathways',
      description: 'Meet family members, talk to animals, and explore the schoolhouse.',
      quests: preA1Quests.slice(10, 20),
      endBoss: {
        type: 'sentinel',
        id: 'pre-a1-ch2-boss',
        name: 'Path Warden',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'pre-a1-ch3',
      chapterNumber: 3,
      name: 'The Gates of Flow',
      description: 'Acquire time and place vocabulary before challenging the guardian.',
      quests: preA1Quests.slice(20, 25),
      endBoss: {
        type: 'guardian',
        id: 'world-pre-a1-boss',
        name: 'The Gatekeeper',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'first',
  guardian: 'The Gatekeeper',
  tailsAwarded: 1,
};

// ── Structural stubs (A1–C1) populated from BOOK_LEVELS ─────────────────────────────────────────────

export const worldA1: World = {
  id: 'world-a1',
  name: 'Bosque de Verbos',
  description: 'A forest where verbs conjugate as you walk — daily life, food, and friends.',
  level: 'A1',
  quests: BOOK_LEVELS.slice(0, 5),
  chapters: [
    {
      id: 'a1-ch1',
      chapterNumber: 1,
      name: 'Verbal Paths',
      description: 'A forest where verbs conjugate as you walk.',
      quests: BOOK_LEVELS.slice(0, 5),
      endBoss: {
        type: 'guardian',
        id: 'world-a1-boss',
        name: 'The Conjugation Spirit',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'world-pre-a1',
  guardian: 'The Conjugation Spirit',
  tailsAwarded: 1,
};

export const worldA2: World = {
  id: 'world-a2',
  name: 'Ciudad Fluida',
  description: 'A bustling city of conversation — travel, markets, and small mysteries.',
  level: 'A2',
  quests: BOOK_LEVELS.slice(5, 10),
  chapters: [
    {
      id: 'a2-ch1',
      chapterNumber: 1,
      name: 'Conversational Boulevards',
      description: 'A bustling city of conversation.',
      quests: BOOK_LEVELS.slice(5, 10),
      endBoss: {
        type: 'guardian',
        id: 'world-a2-boss',
        name: 'The Chatterbox Oni',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'world-a1',
  guardian: 'The Chatterbox Oni',
  tailsAwarded: 1,
};

export const worldB1: World = {
  id: 'world-b1',
  name: 'Montaña Avanzada',
  description: 'A steep mountain of subjunctive and idiom — opinions, feelings, and challenges.',
  level: 'B1',
  quests: BOOK_LEVELS.slice(10, 15),
  chapters: [
    {
      id: 'b1-ch1',
      chapterNumber: 1,
      name: 'Subjunctive Heights',
      description: 'A steep mountain of subjunctive and idiom.',
      quests: BOOK_LEVELS.slice(10, 15),
      endBoss: {
        type: 'guardian',
        id: 'world-b1-boss',
        name: 'The Mountain Sage',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 2
      }
    }
  ],
  unlockRequirement: 'world-a2',
  guardian: 'The Mountain Sage',
  tailsAwarded: 2,
};

export const worldB2: World = {
  id: 'world-b2',
  name: 'Templo del Fluir',
  description: 'A temple of flowing speech — work, debate, and social dynamics.',
  level: 'B2',
  quests: BOOK_LEVELS.slice(15, 20),
  chapters: [
    {
      id: 'b2-ch1',
      chapterNumber: 1,
      name: 'Social Streams',
      description: 'A temple of flowing speech.',
      quests: BOOK_LEVELS.slice(15, 20),
      endBoss: {
        type: 'guardian',
        id: 'world-b2-boss',
        name: 'The Nine-Tailed Elder',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 2
      }
    }
  ],
  unlockRequirement: 'world-b1',
  guardian: 'The Nine-Tailed Elder',
  tailsAwarded: 2,
};

export const worldC1: World = {
  id: 'world-c1',
  name: 'Templo Maestro',
  description: 'The grand temple of fluency and nuance — literature, rhetoric, and mastery.',
  level: 'C1',
  quests: BOOK_LEVELS.slice(20, 24),
  chapters: [
    {
      id: 'c1-ch1',
      chapterNumber: 1,
      name: 'Mastery Halls',
      description: 'The grand temple of fluency and nuance.',
      quests: BOOK_LEVELS.slice(20, 24),
      endBoss: {
        type: 'guardian',
        id: 'world-c1-boss',
        name: 'The Ancestral Fox King',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 2
      }
    }
  ],
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
