// STEP 3 & Step 18 — World assembly for Kitsune's Path.
// Fully restores all original hand-crafted CEFR worlds (worldPreA1, worldA1, worldA2, worldB1, worldB2, worldC1)
// AND includes the 6 course syllabus adventure worlds (worldPart2 through worldPart7).

import type { World, Quest } from './types';
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

import { a1Quests } from './a1/quests';
import { a2Quests } from './a2/quests';
import { b1Quests } from './b1/quests';
import { b2Quests } from './b2/quests';
import { c1Quests } from './c1/quests';

const preA1Quests: Quest[] = [
  preA1Quest1, preA1Quest2, preA1Quest3, preA1Quest4, preA1Quest5,
  preA1Quest6, preA1Quest7, preA1Quest8, preA1Quest9, preA1Quest10,
  preA1Quest11, preA1Quest12, preA1Quest13, preA1Quest14, preA1Quest15,
  preA1Quest16, preA1Quest17, preA1Quest18, preA1Quest19, preA1Quest20,
  preA1Quest21, preA1Quest22, preA1Quest23, preA1Quest24, preA1Quest25,
];

// ── WORLD 1 / Pre-A1: Pueblo Inicial ─────────────────────────────────────────
export const worldPreA1: World = {
  id: 'world-pre-a1',
  name: 'Pueblo Inicial',
  description: 'A quiet starting village (Part 1: Greetings, Vowels, Nouns, Ser, -AR).',
  level: 'Pre-A1',
  quests: preA1Quests,
  chapters: [
    {
      id: 'pre-a1-ch1',
      chapterNumber: 1,
      name: 'The Village Outskirts',
      description: 'First steps: basic greetings, pronunciation, and village introduction.',
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

export const worldPart1 = worldPreA1;

// ── WORLD A1: Bosque de Verbos ───────────────────────────────────────────────
export const worldA1: World = {
  id: 'world-a1',
  name: 'Bosque de Verbos',
  description: 'A forest where verbs conjugate as you walk — daily life, food, and friends.',
  level: 'A1',
  quests: a1Quests,
  chapters: [
    {
      id: 'a1-ch1',
      chapterNumber: 1,
      name: 'Verbal Paths',
      description: 'A forest where verbs conjugate as you walk.',
      quests: a1Quests.slice(0, 10),
      endBoss: {
        type: 'sentinel',
        id: 'a1-ch1-boss',
        name: 'Forest Sentinel',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'a1-ch2',
      chapterNumber: 2,
      name: 'The Whispering Trees',
      description: 'Narration, nouns, and vocabulary relating to your surroundings.',
      quests: a1Quests.slice(10, 20),
      endBoss: {
        type: 'sentinel',
        id: 'a1-ch2-boss',
        name: 'Path Warden',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'a1-ch3',
      chapterNumber: 3,
      name: 'Conjugation Clearing',
      description: 'Deepen your knowledge of verbs and challenge the Guardian of the Forest.',
      quests: a1Quests.slice(20, 25),
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

// ── WORLD A2: Ciudad Fluida ──────────────────────────────────────────────────
export const worldA2: World = {
  id: 'world-a2',
  name: 'Ciudad Fluida',
  description: 'A bustling city of conversation — travel, markets, and small mysteries.',
  level: 'A2',
  quests: a2Quests,
  chapters: [
    {
      id: 'a2-ch1',
      chapterNumber: 1,
      name: 'Conversational Boulevards',
      description: 'A bustling city of conversation.',
      quests: a2Quests.slice(0, 10),
      endBoss: {
        type: 'sentinel',
        id: 'a2-ch1-boss',
        name: 'City Watch',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'a2-ch2',
      chapterNumber: 2,
      name: 'The Market Square',
      description: 'Explore active city life, shops, and transport.',
      quests: a2Quests.slice(10, 20),
      endBoss: {
        type: 'sentinel',
        id: 'a2-ch2-boss',
        name: 'Market Warden',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'a2-ch3',
      chapterNumber: 3,
      name: 'Oni District',
      description: 'Solve local mysteries before confronting the main guardian.',
      quests: a2Quests.slice(20, 25),
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

// ── WORLD B1: Montaña Avanzada ───────────────────────────────────────────────
export const worldB1: World = {
  id: 'world-b1',
  name: 'Montaña Avanzada',
  description: 'A steep mountain of subjunctive and idiom — opinions, feelings, and challenges.',
  level: 'B1',
  quests: b1Quests,
  chapters: [
    {
      id: 'b1-ch1',
      chapterNumber: 1,
      name: 'Subjunctive Heights',
      description: 'A steep mountain of subjunctive and idiom.',
      quests: b1Quests.slice(0, 10),
      endBoss: {
        type: 'sentinel',
        id: 'b1-ch1-boss',
        name: 'Peak Sentinel',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'b1-ch2',
      chapterNumber: 2,
      name: 'Mist Valleys',
      description: 'Express emotions, doubts, and opinions clearly.',
      quests: b1Quests.slice(10, 20),
      endBoss: {
        type: 'sentinel',
        id: 'b1-ch2-boss',
        name: 'Valley Keeper',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'b1-ch3',
      chapterNumber: 3,
      name: 'Sage Sanctuary',
      description: 'Reach the summit and meet the mountain guardian.',
      quests: b1Quests.slice(20, 25),
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

// ── WORLD B2: Templo del Fluir ───────────────────────────────────────────────
export const worldB2: World = {
  id: 'world-b2',
  name: 'Templo del Fluir',
  description: 'A temple of flowing speech — work, debate, and social dynamics.',
  level: 'B2',
  quests: b2Quests,
  chapters: [
    {
      id: 'b2-ch1',
      chapterNumber: 1,
      name: 'Social Streams',
      description: 'A temple of flowing speech.',
      quests: b2Quests.slice(0, 10),
      endBoss: {
        type: 'sentinel',
        id: 'b2-ch1-boss',
        name: 'Stream Guard',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'b2-ch2',
      chapterNumber: 2,
      name: 'Hall of Debates',
      description: 'Conduct abstract discussions, conditional logic, and formal debates.',
      quests: b2Quests.slice(10, 20),
      endBoss: {
        type: 'sentinel',
        id: 'b2-ch2-boss',
        name: 'Hall Warden',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'b2-ch3',
      chapterNumber: 3,
      name: 'Inner Sanctum',
      description: 'Demonstrate natural flowing speech before challenging the elder.',
      quests: b2Quests.slice(20, 25),
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

// ── WORLD C1: Templo Maestro ─────────────────────────────────────────────────
export const worldC1: World = {
  id: 'world-c1',
  name: 'Templo Maestro',
  description: 'The grand temple of fluency and nuance — literature, rhetoric, and mastery.',
  level: 'C1',
  quests: c1Quests,
  chapters: [
    {
      id: 'c1-ch1',
      chapterNumber: 1,
      name: 'Mastery Halls',
      description: 'The grand temple of fluency and nuance.',
      quests: c1Quests.slice(0, 10),
      endBoss: {
        type: 'sentinel',
        id: 'c1-ch1-boss',
        name: 'Hall Sentinel',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'c1-ch2',
      chapterNumber: 2,
      name: 'Chamber of Scrolls',
      description: 'Explore literary styles, idioms, and subtle nuance registers.',
      quests: c1Quests.slice(10, 20),
      endBoss: {
        type: 'sentinel',
        id: 'c1-ch2-boss',
        name: 'Scroll Warden',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'c1-ch3',
      name: 'Ancestral Throne',
      chapterNumber: 3,
      description: 'Display absolute mastery of rhetoric to claim the final fox tails.',
      quests: c1Quests.slice(20, 25),
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

// ── SYLLABUS COURSE WORLDS (Parts 2 to 7) ──────────────────────────────────
export const worldPart2: World = {
  id: 'world-part-2',
  name: 'El Reloj del Tiempo',
  description: 'Master time, calendar dates, weather, and the verbs Tener and Hacer (Part 3).',
  level: 'A1',
  quests: a1Quests.slice(0, 5),
  chapters: [
    {
      id: 'p2-ch1',
      chapterNumber: 1,
      name: 'The Sundial Plaza',
      description: 'Learn telling time, days of the week, and calendar date expressions.',
      quests: a1Quests.slice(0, 2),
      endBoss: { type: 'sentinel', id: 'p2-ch1-boss', name: 'Chronos Sentinel', hp: 5, coinReward: 60 }
    },
    {
      id: 'p2-ch2',
      chapterNumber: 2,
      name: 'The Four Seasons Grove',
      description: 'Weather expressions with Hacer and physical condition idioms with Tener.',
      quests: a1Quests.slice(2, 4),
      endBoss: { type: 'sentinel', id: 'p2-ch2-boss', name: 'Weather Warden', hp: 6, coinReward: 70 }
    },
    {
      id: 'p2-ch3',
      chapterNumber: 3,
      name: 'Tower of Knowing',
      description: 'Distinguish Saber vs Conocer before confronting the Time Dragon.',
      quests: a1Quests.slice(4, 5),
      endBoss: { type: 'guardian', id: 'p2-ch3-boss', name: 'The Time Dragon', hp: 10, coinReward: 120, tailsAwarded: 1 }
    }
  ],
  unlockRequirement: 'world-pre-a1',
  guardian: 'The Time Dragon',
  tailsAwarded: 1
};

export const worldPart3: World = {
  id: 'world-part-3',
  name: 'El Mercado del Progreso',
  description: 'Navigate stem-changing boot verbs, Yo-Go verbs, and Present Progressive (Part 4).',
  level: 'A2',
  quests: a2Quests.slice(0, 5),
  chapters: [
    {
      id: 'p3-ch1',
      chapterNumber: 1,
      name: 'Boot Maker Alley',
      description: 'Master e->ie, o->ue, e->i stem changes in the lively market.',
      quests: a2Quests.slice(0, 2),
      endBoss: { type: 'sentinel', id: 'p3-ch1-boss', name: 'Cobbler Sentinel', hp: 6, coinReward: 70 }
    },
    {
      id: 'p3-ch2',
      chapterNumber: 2,
      name: 'The Yo-Go Bazaar',
      description: 'Practice pongo, salgo, traigo, and hago in rapid dialogue exchanges.',
      quests: a2Quests.slice(2, 4),
      endBoss: { type: 'sentinel', id: 'p3-ch2-boss', name: 'Bazaar Warden', hp: 7, coinReward: 80 }
    },
    {
      id: 'p3-ch3',
      chapterNumber: 3,
      name: 'The Flowing Fountain',
      description: 'Express ongoing actions right now with Estar + Gerundio.',
      quests: a2Quests.slice(4, 5),
      endBoss: { type: 'guardian', id: 'p3-ch3-boss', name: 'The Market Merchant King', hp: 12, coinReward: 140, tailsAwarded: 1 }
    }
  ],
  unlockRequirement: 'world-part-2',
  guardian: 'The Market Merchant King',
  tailsAwarded: 1
};

export const worldPart4: World = {
  id: 'world-part-4',
  name: 'La Ciudad del Pronombre',
  description: 'Master direct and indirect object pronouns, possessives, and gustar (Part 5).',
  level: 'A2',
  quests: a2Quests.slice(5, 10),
  chapters: [
    {
      id: 'p4-ch1',
      chapterNumber: 1,
      name: 'Distants & Possessions',
      description: 'Use este, ese, aquel, and possessive adjectives mi, tu, su, nuestro.',
      quests: a2Quests.slice(5, 7),
      endBoss: { type: 'sentinel', id: 'p4-ch1-boss', name: 'Beacon Sentinel', hp: 7, coinReward: 75 }
    },
    {
      id: 'p4-ch2',
      chapterNumber: 2,
      name: 'The Negation Vaults',
      description: 'Contrast algo/nada, alguien/nadie, siempre/nunca in dark halls.',
      quests: a2Quests.slice(7, 9),
      endBoss: { type: 'sentinel', id: 'p4-ch2-boss', name: 'Vault Keeper', hp: 8, coinReward: 85 }
    },
    {
      id: 'p4-ch3',
      chapterNumber: 3,
      name: 'The Gustar Palace',
      description: 'Master me gusta / me gustan and object pronouns before the Royal Archon.',
      quests: a2Quests.slice(9, 10),
      endBoss: { type: 'guardian', id: 'p4-ch3-boss', name: 'The Pronoun Archon', hp: 14, coinReward: 160, tailsAwarded: 1 }
    }
  ],
  unlockRequirement: 'world-part-3',
  guardian: 'The Pronoun Archon',
  tailsAwarded: 1
};

export const worldPart5: World = {
  id: 'world-part-5',
  name: 'La Rutina Diaria y Comandos',
  description: 'Reflexive verbs, daily routines, informal commands, and double object pronouns (Part 6).',
  level: 'B1',
  quests: b1Quests.slice(0, 5),
  chapters: [
    {
      id: 'p5-ch1',
      chapterNumber: 1,
      name: 'The Double Object Nexus',
      description: 'Master "Se La" rule when indirect and direct pronouns meet.',
      quests: b1Quests.slice(0, 2),
      endBoss: { type: 'sentinel', id: 'p5-ch1-boss', name: 'Nexus Sentinel', hp: 8, coinReward: 90 }
    },
    {
      id: 'p5-ch2',
      chapterNumber: 2,
      name: 'The Mirror Citadel',
      description: 'Conjugate reflexive verbs (me lavo, te levantas) throughout the day.',
      quests: b1Quests.slice(2, 4),
      endBoss: { type: 'sentinel', id: 'p5-ch2-boss', name: 'Mirror Sentinel', hp: 9, coinReward: 100 }
    },
    {
      id: 'p5-ch3',
      chapterNumber: 3,
      name: 'Commander Peak',
      description: 'Give firm informal commands (haz, pon, sal, di) to clear the path.',
      quests: b1Quests.slice(4, 5),
      endBoss: { type: 'guardian', id: 'p5-ch3-boss', name: 'The Daily Commander', hp: 16, coinReward: 180, tailsAwarded: 1 }
    }
  ],
  unlockRequirement: 'world-part-4',
  guardian: 'The Daily Commander',
  tailsAwarded: 1
};

export const worldPart6: World = {
  id: 'world-part-6',
  name: 'El Templo del Pasado',
  description: 'Conquer preterite regular and irregular past tense conjugations (Part 7).',
  level: 'B2',
  quests: b2Quests.slice(0, 5),
  chapters: [
    {
      id: 'p6-ch1',
      chapterNumber: 1,
      name: 'Hall of Recent Memory',
      description: 'Conjugate regular -AR, -ER, -IR verbs in the preterite past tense.',
      quests: b2Quests.slice(0, 2),
      endBoss: { type: 'sentinel', id: 'p6-ch1-boss', name: 'Memory Guard', hp: 10, coinReward: 110 }
    },
    {
      id: 'p6-ch2',
      chapterNumber: 2,
      name: 'Chamber of Irregular Echoes',
      description: 'Master fui, tuve, estuve, hice, pude, and dije in past combat.',
      quests: b2Quests.slice(2, 4),
      endBoss: { type: 'sentinel', id: 'p6-ch2-boss', name: 'Echo Warden', hp: 12, coinReward: 130 }
    },
    {
      id: 'p6-ch3',
      chapterNumber: 3,
      name: 'The Preterite Sanctum',
      description: 'Synthesize all past actions before taking on the Spirit of Yesterday.',
      quests: b2Quests.slice(4, 5),
      endBoss: { type: 'guardian', id: 'p6-ch3-boss', name: 'Spirit of Yesterday', hp: 20, coinReward: 220, tailsAwarded: 1 }
    }
  ],
  unlockRequirement: 'world-part-5',
  guardian: 'Spirit of Yesterday',
  tailsAwarded: 1
};

export const worldPart7: World = {
  id: 'world-part-7',
  name: 'El Gran Templo Comparativo',
  description: 'Master imperfect tense, preterite vs imperfect, and superlatives (Part 7 Master).',
  level: 'C1',
  quests: c1Quests.slice(0, 5),
  chapters: [
    {
      id: 'p7-ch1',
      chapterNumber: 1,
      name: 'Imperfect Horizon',
      description: 'Master ongoing past habits with -aba, -ía, era, iba, and veía.',
      quests: c1Quests.slice(0, 2),
      endBoss: { type: 'sentinel', id: 'p7-ch1-boss', name: 'Horizon Sentinel', hp: 12, coinReward: 140 }
    },
    {
      id: 'p7-ch2',
      chapterNumber: 2,
      name: 'The Dual Realm',
      description: 'Distinguish completed preterite events from background imperfect scenes.',
      quests: c1Quests.slice(2, 4),
      endBoss: { type: 'sentinel', id: 'p7-ch2-boss', name: 'Dual Warden', hp: 15, coinReward: 160 }
    },
    {
      id: 'p7-ch3',
      chapterNumber: 3,
      name: 'The Superlative Pinnacle',
      description: 'Master comparisons and absolute superlatives to conquer the Grand Master.',
      quests: c1Quests.slice(4, 5),
      endBoss: { type: 'guardian', id: 'p7-ch3-boss', name: 'Grand Master Kitsune', hp: 25, coinReward: 300, tailsAwarded: 2 }
    }
  ],
  unlockRequirement: 'world-part-6',
  guardian: 'Grand Master Kitsune',
  tailsAwarded: 2
};

export const ALL_WORLDS: World[] = [
  worldPreA1,
  worldA1,
  worldA2,
  worldB1,
  worldB2,
  worldC1,
  worldPart2,
  worldPart3,
  worldPart4,
  worldPart5,
  worldPart6,
  worldPart7
];
