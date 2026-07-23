// STEP 3 & Step 18 — World assembly for Kitsune's Path.
// Expands ALL_WORLDS to include 7 full adventure worlds corresponding to Parts 1 through 7 of the curriculum.
// Each world contains 3 chapters, sentinel boss encounters, guardian bosses, coin rewards, and story dialogues.

import type { World, Quest } from './types';
import { preA1Quest1 } from './preA1/quest1-greetings';
import { preA1Quest2 } from './preA1/quest2-colors-numbers';
import { preA1Quest3 } from './preA1/quest3-family';
import { preA1Quest4 } from './preA1/quest4-animals-objects';
import { preA1Quest5 } from './preA1/quest5-gen';

// ── WORLD 1: Pueblo Inicial (Part 1: Greetings, Vowels, Nouns, Ser, -AR) ──
const world1Quests: Quest[] = [
  preA1Quest1,
  preA1Quest2,
  preA1Quest3,
  preA1Quest4,
  preA1Quest5,
  {
    id: 'part1-q6',
    title: 'Greetings & Formal Dialogue',
    subtitle: 'Learn to greet elders and professors with ¿Cómo está usted?',
    estimatedMinutes: 5,
    topicFocus: ['greetings'],
    storyLines: [
      'Entras al pueblo y ves al anciano del pueblo.',
      '-- Buenos días, joven viajero -- dice el anciano.',
      '-- ¿Cómo está usted? -- respondes con respeto.',
      'El anciano sonríe y te da un mapa inicial.'
    ],
    vocabulary: [
      {
        word: 'Buenos días',
        meaning: 'Good morning',
        pronunciation: 'BWEH-nohs DEE-ahs',
        example: 'Buenos días, anciano.',
        exampleTranslation: 'Good morning, elder.',
        audioCue: 'Stress DEE',
        levelIntroduced: 'Pre-A1',
        topic: 'greetings'
      },
      {
        word: '¿Cómo está usted?',
        meaning: 'How are you? (formal)',
        pronunciation: 'KOH-moh ehs-TAH oo-STEHD',
        example: '¿Cómo está usted hoy?',
        exampleTranslation: 'How are you today?',
        audioCue: 'Formal register USTED',
        levelIntroduced: 'Pre-A1',
        topic: 'greetings'
      }
    ],
    grammarNotes: [
      {
        title: 'Formal vs Informal Greetings',
        explanation: 'Use "¿Cómo estás?" with friends, and "¿Cómo está usted?" with professors and elders.',
        exampleFromStory: '¿Cómo está usted? (Formal)'
      }
    ],
    exercises: [
      {
        id: 'p1-q6-ex1',
        type: 'multiple-choice',
        prompt: 'How do you address a professor formally?',
        answer: '¿Cómo está usted?',
        options: ['¿Cómo está usted?', '¿Qué tal, bro?', '¿Cómo estás tú?', '¡Hola amigo!']
      }
    ],
    rewards: { xp: 50, coins: 15 }
  }
];

export const worldPart1: World = {
  id: 'world-part-1',
  name: 'Pueblo Inicial',
  description: 'A quiet starting village (Part 1: Greetings, Vowels, Nouns, Ser, -AR).',
  level: 'Pre-A1',
  quests: world1Quests,
  chapters: [
    {
      id: 'part1-ch1',
      chapterNumber: 1,
      name: 'The Village Outskirts',
      description: 'First steps: basic greetings, pronunciation, and village introduction.',
      quests: world1Quests.slice(0, 2),
      endBoss: {
        type: 'sentinel',
        id: 'part1-ch1-boss',
        name: 'Forest Sentinel',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'part1-ch2',
      chapterNumber: 2,
      name: 'The Whispering Pathways',
      description: 'Nouns, Articles, and talking to villagers.',
      quests: world1Quests.slice(2, 4),
      endBoss: {
        type: 'sentinel',
        id: 'part1-ch2-boss',
        name: 'Path Warden',
        hp: 5,
        coinReward: 50
      }
    },
    {
      id: 'part1-ch3',
      chapterNumber: 3,
      name: 'The Gates of Flow',
      description: 'Master Ser and -AR verbs before challenging the Gatekeeper.',
      quests: world1Quests.slice(4),
      endBoss: {
        type: 'guardian',
        id: 'world-part1-boss',
        name: 'The Gatekeeper',
        hp: 8,
        coinReward: 100,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'first',
  guardian: 'The Gatekeeper',
  tailsAwarded: 1
};

export const worldPreA1 = worldPart1;

// ── WORLD 2: Bosque de Verbos (Part 2: Estar, Ir, -ER/-IR, Numbers, Questions) ──
const world2Quests: Quest[] = [
  {
    id: 'part2-q1',
    title: 'Indefinite Articles & Numbers 0-100',
    subtitle: 'Learn un, una, unos, unas and numbers up to cien',
    estimatedMinutes: 6,
    topicFocus: ['numbers', 'articles'],
    storyLines: [
      'Entras al Bosque de Verbos y ves árboles numerados.',
      'Un búho sabio te dice: -- Tengo veinte manzanas y cien hojas --.',
      'Cuentas los objetos: uno, dos, tres... hasta diez.',
      '¡Has aprendido los números e artículos indefinidos!'
    ],
    vocabulary: [
      {
        word: 'un',
        meaning: 'a / an (masculine)',
        pronunciation: 'oon',
        example: 'Tengo un libro verde.',
        exampleTranslation: 'I have a green book.',
        audioCue: 'Short UN',
        levelIntroduced: 'A1',
        topic: 'articles'
      },
      {
        word: 'veinte',
        meaning: 'twenty',
        pronunciation: 'BAYN-teh',
        example: 'Hay veinte árboles en el camino.',
        exampleTranslation: 'There are twenty trees on the path.',
        audioCue: 'Diphthong BAYN',
        levelIntroduced: 'A1',
        topic: 'numbers'
      }
    ],
    grammarNotes: [
      {
        title: 'Indefinite Articles',
        explanation: 'Un (masculine singular), Una (feminine singular), Unos (masculine plural), Unas (feminine plural).',
        exampleFromStory: 'Un búho sabio (A wise owl)'
      }
    ],
    exercises: [
      {
        id: 'p2-q1-ex1',
        type: 'multiple-choice',
        prompt: 'What is the indefinite article for a feminine singular noun like "manzana"?',
        answer: 'una',
        options: ['un', 'una', 'unos', 'unas']
      }
    ],
    rewards: { xp: 60, coins: 20 }
  },
  {
    id: 'part2-q2',
    title: 'Verb Estar & Numbers >100',
    subtitle: 'Express location, feeling, and count beyond 100',
    estimatedMinutes: 6,
    topicFocus: ['estar', 'numbers'],
    storyLines: [
      'Caminas más profundo en el bosque. ¿Dónde estás?',
      '-- Estoy cerca del río -- le dices a Yuki.',
      'Ves quinientas mariposas volando juntas.',
      'El río está tranquilo hoy.'
    ],
    vocabulary: [
      {
        word: 'estoy',
        meaning: 'I am (ESTAR - state/location)',
        pronunciation: 'ehs-TOY',
        example: 'Estoy en el bosque.',
        exampleTranslation: 'I am in the forest.',
        audioCue: 'Stress TOY',
        levelIntroduced: 'A1',
        topic: 'estar'
      },
      {
        word: 'quinientos',
        meaning: 'five hundred',
        pronunciation: 'kee-NYEHN-tohs',
        example: 'Hay quinientos pasos hasta la torre.',
        exampleTranslation: 'There are five hundred steps to the tower.',
        audioCue: 'Irregular quinientos',
        levelIntroduced: 'A1',
        topic: 'numbers'
      }
    ],
    grammarNotes: [
      {
        title: 'ESTAR for PLACE',
        explanation: 'Position, Location, Action (progressive), Condition, Emotion/Health.',
        exampleFromStory: 'Estoy cerca del río.'
      }
    ],
    exercises: [
      {
        id: 'p2-q2-ex1',
        type: 'fill-blank',
        prompt: 'Yo ___ en el bosque. (I am - location)',
        answer: 'estoy',
        options: ['estoy', 'soy', 'voy', 'tengo']
      }
    ],
    rewards: { xp: 60, coins: 20 }
  },
  {
    id: 'part2-q3',
    title: 'Regular -ER & -IR Verbs',
    subtitle: 'Master comer, beber, vivir, and escribir',
    estimatedMinutes: 6,
    topicFocus: ['er-verbs', 'ir-verbs'],
    storyLines: [
      'Encuentras una pequeña cabaña en el bosque.',
      '-- ¿Quieres comer pan y beber agua? -- pregunta el guardián.',
      '-- Sí, y me gusta escribir en mi diario mientras vivo aquí --.',
      'Practicas la conjugación de verbos en -ER e -IR.'
    ],
    vocabulary: [
      {
        word: 'comer',
        meaning: 'to eat',
        pronunciation: 'koh-MEHR',
        example: 'Nosotros comemos fruta.',
        exampleTranslation: 'We eat fruit.',
        audioCue: 'End -ER',
        levelIntroduced: 'A1',
        topic: 'er-verbs'
      },
      {
        word: 'vivir',
        meaning: 'to live',
        pronunciation: 'bee-BEER',
        example: 'Yo vivo en una casa pequeña.',
        exampleTranslation: 'I live in a small house.',
        audioCue: 'End -IR',
        levelIntroduced: 'A1',
        topic: 'ir-verbs'
      }
    ],
    grammarNotes: [
      {
        title: '-ER and -IR Endings',
        explanation: '-ER: -o, -es, -e, -emos, -éis, -en. -IR: -o, -es, -e, -imos, -ís, -en.',
        exampleFromStory: 'comemos (-emos), vivimos (-imos)'
      }
    ],
    exercises: [
      {
        id: 'p2-q3-ex1',
        type: 'multiple-choice',
        prompt: 'What is the "nosotros" form of comer?',
        answer: 'comemos',
        options: ['como', 'comes', 'comemos', 'comen']
      }
    ],
    rewards: { xp: 60, coins: 20 }
  },
  {
    id: 'part2-q4',
    title: 'Verb Ir & Question Words',
    subtitle: 'Learn voy, vas, va, vamos, van and ¿Qué?, ¿Dónde?, ¿Cuándo?',
    estimatedMinutes: 6,
    topicFocus: ['verb-ir', 'question-words'],
    storyLines: [
      'Te encuentras en una encrucijada en el bosque.',
      '-- ¿Adónde vas? -- te pregunta Yuki.',
      '-- Voy hacia el claro del bosque -- respondes.',
      '-- ¿Por qué vas allí? -- pregunta Yuki.',
      '-- Para hablar con el Espíritu de la Conjugación --.'
    ],
    vocabulary: [
      {
        word: 'voy',
        meaning: 'I go / I am going',
        pronunciation: 'boy',
        example: 'Voy al centro.',
        exampleTranslation: 'I am going downtown.',
        audioCue: 'Soft V sound BOY',
        levelIntroduced: 'A1',
        topic: 'verb-ir'
      },
      {
        word: 'dónde',
        meaning: 'where',
        pronunciation: 'DOHN-deh',
        example: '¿Dónde está la salida?',
        exampleTranslation: 'Where is the exit?',
        audioCue: 'Accent DOHN',
        levelIntroduced: 'A1',
        topic: 'question-words'
      }
    ],
    grammarNotes: [
      {
        title: 'IR + A + Infinitive',
        explanation: 'Express future actions: "Voy a estudiar" (I am going to study).',
        exampleFromStory: 'Voy a hablar con el espíritu.'
      }
    ],
    exercises: [
      {
        id: 'p2-q4-ex1',
        type: 'multiple-choice',
        prompt: 'How do you say "Where are you going?" in Spanish?',
        answer: '¿Adónde vas?',
        options: ['¿Adónde vas?', '¿Dónde estás?', '¿Qué haces?', '¿Quién eres?']
      }
    ],
    rewards: { xp: 70, coins: 25 }
  }
];

export const worldPart2: World = {
  id: 'world-part-2',
  name: 'Bosque de Verbos',
  description: 'A leafy forest where verbs conjugate in motion (Part 2: Estar, Ir, -ER/-IR, Numbers, Questions).',
  level: 'A1',
  quests: world2Quests,
  chapters: [
    {
      id: 'part2-ch1',
      chapterNumber: 1,
      name: 'Path of Quantities',
      description: 'Master indefinite articles and numbers up to 1000.',
      quests: world2Quests.slice(0, 1),
      endBoss: {
        type: 'sentinel',
        id: 'part2-ch1-boss',
        name: 'Number Guardian',
        hp: 6,
        coinReward: 60
      }
    },
    {
      id: 'part2-ch2',
      chapterNumber: 2,
      name: 'The Grove of Estar & Ir',
      description: 'Practice state, location, and motion with IR.',
      quests: world2Quests.slice(1, 3),
      endBoss: {
        type: 'sentinel',
        id: 'part2-ch2-boss',
        name: 'Grove Warden',
        hp: 6,
        coinReward: 60
      }
    },
    {
      id: 'part2-ch3',
      chapterNumber: 3,
      name: 'Conjugation Clearing',
      description: '-ER/-IR verbs and question words before the boss.',
      quests: world2Quests.slice(3),
      endBoss: {
        type: 'guardian',
        id: 'world-part2-boss',
        name: 'The Conjugation Spirit',
        hp: 10,
        coinReward: 120,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'world-part-1',
  guardian: 'The Conjugation Spirit',
  tailsAwarded: 1
};

export const worldA1 = worldPart2;

// ── WORLD 3: El Reloj del Tiempo (Part 3: Dates, Time, Seasons, Weather, Tener, Hacer) ──
const world3Quests: Quest[] = [
  {
    id: 'part3-q1',
    title: 'Expressing Time & Dates',
    subtitle: 'Learn hours, days of the week, months, and seasons',
    estimatedMinutes: 6,
    topicFocus: ['time-dates', 'seasons-weather'],
    storyLines: [
      'Llegas a la torre del Gran Reloj.',
      '-- ¿Qué hora es? -- le preguntas al relojero.',
      '-- Son las tres de la tarde del lunes catorce de mayo -- responde.',
      '-- En primavera el clima es perfecto -- sonríes.'
    ],
    vocabulary: [
      {
        word: 'hora',
        meaning: 'hour / time',
        pronunciation: 'OH-rah',
        example: '¿Qué hora es?',
        exampleTranslation: 'What time is it?',
        audioCue: 'Silent H',
        levelIntroduced: 'A2',
        topic: 'time-dates'
      },
      {
        word: 'primavera',
        meaning: 'spring',
        pronunciation: 'pree-mah-BEH-rah',
        example: 'La primavera es hermosa.',
        exampleTranslation: 'Spring is beautiful.',
        audioCue: 'Stress BEH',
        levelIntroduced: 'A2',
        topic: 'seasons-weather'
      }
    ],
    grammarNotes: [
      {
        title: 'Telling Time',
        explanation: 'Use "Es la una" for 1 o\'clock, and "Son las + number" for 2-12.',
        exampleFromStory: 'Son las tres de la tarde.'
      }
    ],
    exercises: [
      {
        id: 'p3-q1-ex1',
        type: 'multiple-choice',
        prompt: 'How do you say "It is 2:00" in Spanish?',
        answer: 'Son las dos.',
        options: ['Es las dos.', 'Son las dos.', 'Es la dos.', 'Son dos horas.']
      }
    ],
    rewards: { xp: 70, coins: 25 }
  },
  {
    id: 'part3-q2',
    title: 'Tener Expressions & Weather with Hacer',
    subtitle: 'Master tener hambre/sed/frío/calor/prisa and hace frío/calor/sol',
    estimatedMinutes: 6,
    topicFocus: ['tener-idioms', 'weather-hacer'],
    storyLines: [
      'Subes a la cima de la torre del reloj donde sopla viento helado.',
      '-- Tengo mucho frío -- tiemblas.',
      '-- Hace frío aquí arriba, pero abajo hace sol -- dice Yuki.',
      'Sacas tu abrigo porque tienes prisa por bajar.'
    ],
    vocabulary: [
      {
        word: 'tengo',
        meaning: 'I have (TENER)',
        pronunciation: 'TEHN-goh',
        example: 'Tengo frío.',
        exampleTranslation: 'I am cold.',
        audioCue: 'Stress TEHN',
        levelIntroduced: 'A2',
        topic: 'tener-idioms'
      },
      {
        word: 'hace',
        meaning: 'it makes / it is (weather)',
        pronunciation: 'AH-theh',
        example: 'Hace sol hoy.',
        exampleTranslation: 'It is sunny today.',
        audioCue: 'Silent H',
        levelIntroduced: 'A2',
        topic: 'weather-hacer'
      }
    ],
    grammarNotes: [
      {
        title: 'TENER Idioms vs HACER Weather',
        explanation: 'Use TENER for physical feelings (tengo frío = I am cold), and HACER for atmospheric weather (hace frío = it is cold outside).',
        exampleFromStory: 'Tengo frío (I feel cold) vs Hace frío (Weather is cold)'
      }
    ],
    exercises: [
      {
        id: 'p3-q2-ex1',
        type: 'multiple-choice',
        prompt: 'How do you say "I am hungry" in Spanish?',
        answer: 'Tengo hambre.',
        options: ['Estoy hambre.', 'Tengo hambre.', 'Hago hambre.', 'Soy hambre.']
      }
    ],
    rewards: { xp: 75, coins: 30 }
  },
  {
    id: 'part3-q3',
    title: 'Saber vs Conocer',
    subtitle: 'Distinguish facts/skills (saber) from people/places (conocer)',
    estimatedMinutes: 6,
    topicFocus: ['saber-conocer'],
    storyLines: [
      'Al pie de la torre encuentras al Guardián del Tiempo.',
      '-- ¿Sabes tocar la campana? -- pregunta el guardián.',
      '-- Sé cómo hacerlo, y conozco muy bien este lugar -- respondes con firmeza.',
      'El guardián te permite avanzar.'
    ],
    vocabulary: [
      {
        word: 'sé',
        meaning: 'I know (SABER - fact/skill)',
        pronunciation: 'seh',
        example: 'Sé la respuesta.',
        exampleTranslation: 'I know the answer.',
        audioCue: 'Accent SEH',
        levelIntroduced: 'A2',
        topic: 'saber-conocer'
      },
      {
        word: 'conozco',
        meaning: 'I know / am familiar with (CONOCER - person/place)',
        pronunciation: 'koh-NOTH-koh',
        example: 'Conozco a Yuki.',
        exampleTranslation: 'I know Yuki.',
        audioCue: 'ZCO sound',
        levelIntroduced: 'A2',
        topic: 'saber-conocer'
      }
    ],
    grammarNotes: [
      {
        title: 'SABER vs CONOCER',
        explanation: 'Saber: facts, information, skills (Saber + infinitive). Conocer: people, places, familiarity (Conocer + a + person).',
        exampleFromStory: 'Sé la hora (fact) vs Conozco al guardián (person)'
      }
    ],
    exercises: [
      {
        id: 'p3-q3-ex1',
        type: 'multiple-choice',
        prompt: 'Which verb is used for knowing a person?',
        answer: 'conocer',
        options: ['saber', 'conocer', 'tener', 'hacer']
      }
    ],
    rewards: { xp: 80, coins: 30 }
  }
];

export const worldPart3: World = {
  id: 'world-part-3',
  name: 'El Reloj del Tiempo',
  description: 'A mystical clocktower realm (Part 3: Dates, Time, Seasons, Weather, Tener, Hacer).',
  level: 'A2',
  quests: world3Quests,
  chapters: [
    {
      id: 'part3-ch1',
      chapterNumber: 1,
      name: 'Chamber of Hours',
      description: 'Master time expressions, days, and months.',
      quests: world3Quests.slice(0, 1),
      endBoss: {
        type: 'sentinel',
        id: 'part3-ch1-boss',
        name: 'Clockwork Sentinel',
        hp: 7,
        coinReward: 70
      }
    },
    {
      id: 'part3-ch2',
      chapterNumber: 2,
      name: 'The Weather Spire',
      description: 'Practice Tener physical feelings and Hacer weather.',
      quests: world3Quests.slice(1, 2),
      endBoss: {
        type: 'sentinel',
        id: 'part3-ch2-boss',
        name: 'Storm Warden',
        hp: 7,
        coinReward: 70
      }
    },
    {
      id: 'part3-ch3',
      chapterNumber: 3,
      name: 'Sanctum of Knowledge',
      description: 'Saber vs Conocer before the boss battle.',
      quests: world3Quests.slice(2),
      endBoss: {
        type: 'guardian',
        id: 'world-part3-boss',
        name: 'The Chrono Kitsune',
        hp: 12,
        coinReward: 140,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'world-part-2',
  guardian: 'The Chrono Kitsune',
  tailsAwarded: 1
};

export const worldA2 = worldPart3;

// ── WORLD 4: El Mercado del Progreso (Part 4: Stem Changers, Yo-Go, Present Progressive, Object Pronouns) ──
const world4Quests: Quest[] = [
  {
    id: 'part4-q1',
    title: 'Stem-Changing Boot Verbs',
    subtitle: 'Master e->ie (querer), o->ue (poder, dormir), e->i (pedir, servir)',
    estimatedMinutes: 6,
    topicFocus: ['stem-changers'],
    storyLines: [
      'Entras al ruidoso Mercado del Progreso.',
      'Un comerciante grita: -- ¡Quiero vender mis frutas! ¿Puedes comprar algo? --',
      '-- Puedo comprar manzanas y pido dos naranjas -- respondes.',
      '-- Te las sirvo con gusto -- dice el vendedor.'
    ],
    vocabulary: [
      {
        word: 'quiero',
        meaning: 'I want (QUERER e->ie)',
        pronunciation: 'KYEH-roh',
        example: 'Quiero pan.',
        exampleTranslation: 'I want bread.',
        audioCue: 'Stem change E to IE',
        levelIntroduced: 'B1',
        topic: 'stem-changers'
      },
      {
        word: 'puedo',
        meaning: 'I can (PODER o->ue)',
        pronunciation: 'PWEH-doh',
        example: 'Puedo cantar.',
        exampleTranslation: 'I can sing.',
        audioCue: 'Stem change O to UE',
        levelIntroduced: 'B1',
        topic: 'stem-changers'
      }
    ],
    grammarNotes: [
      {
        title: 'Stem-Changing Boot Verbs',
        explanation: 'Change stem in yo, tú, él/ella, ellos/ellas (NOT nosotros/vosotros): e->ie (quiero), o->ue (puedo), e->i (pido).',
        exampleFromStory: 'Quiero (e->ie) vs Queremos (no change)'
      }
    ],
    exercises: [
      {
        id: 'p4-q1-ex1',
        type: 'multiple-choice',
        prompt: 'What is the "yo" form of "poder" (o->ue)?',
        answer: 'puedo',
        options: ['podo', 'puedo', 'piedo', 'pudo']
      }
    ],
    rewards: { xp: 80, coins: 30 }
  },
  {
    id: 'part4-q2',
    title: 'Yo-Go Irregular Verbs & Ver/Dar',
    subtitle: 'Master pongo, salgo, traigo, hago, pongo, veo, doy',
    estimatedMinutes: 6,
    topicFocus: ['yo-go-verbs', 'irregular-verbs'],
    storyLines: [
      'En el puesto central del mercado, ayudas al mercader.',
      '-- Pongo los sacos de grano en el mostrador -- dices.',
      '-- Traigo agua fresca y salgo a buscar más suministros --.',
      '-- Veo que trabajas duro, te doy un premio -- sonríe el comerciante.'
    ],
    vocabulary: [
      {
        word: 'pongo',
        meaning: 'I put / set (PONER)',
        pronunciation: 'POHN-goh',
        example: 'Pongo la mesa.',
        exampleTranslation: 'I set the table.',
        audioCue: 'Yo-Go ending -NGO',
        levelIntroduced: 'B1',
        topic: 'yo-go-verbs'
      },
      {
        word: 'salgo',
        meaning: 'I leave / go out (SALIR)',
        pronunciation: 'SAHL-goh',
        example: 'Salgo temprano.',
        exampleTranslation: 'I leave early.',
        audioCue: 'Yo-Go ending -LGO',
        levelIntroduced: 'B1',
        topic: 'yo-go-verbs'
      }
    ],
    grammarNotes: [
      {
        title: 'Yo-Go Verbs',
        explanation: 'Verbs irregular only in the "yo" form with -go: pongo (poner), salgo (salir), traigo (traer), hago (hacer), tengo (tener).',
        exampleFromStory: 'Yo pongo, tú pones'
      }
    ],
    exercises: [
      {
        id: 'p4-q2-ex1',
        type: 'multiple-choice',
        prompt: 'What is the "yo" form of "traer"?',
        answer: 'traigo',
        options: ['trao', 'traigo', 'trajo', 'trogo']
      }
    ],
    rewards: { xp: 85, coins: 35 }
  },
  {
    id: 'part4-q3',
    title: 'Present Progressive & Direct Object Pronouns',
    subtitle: 'Use estar + -ando/-iendo and pronouns me, te, lo, la, nos, los, las',
    estimatedMinutes: 6,
    topicFocus: ['present-progressive', 'direct-objects'],
    storyLines: [
      'Miras alrededor del mercado lleno de actividad.',
      '-- ¿Qué estás haciendo? -- pregunta Yuki.',
      '-- Estoy comprando una fruta deliciosa y la estoy comiendo -- respondes.',
      '-- Veo a los guardias, ¿los ves tú también? --'
    ],
    vocabulary: [
      {
        word: 'comiendo',
        meaning: 'eating (ESTAR + gerund)',
        pronunciation: 'koh-MYEHN-doh',
        example: 'Estoy comiendo.',
        exampleTranslation: 'I am eating.',
        audioCue: 'Gerund -IENDO',
        levelIntroduced: 'B1',
        topic: 'present-progressive'
      },
      {
        word: 'lo',
        meaning: 'him / it (direct object pronoun)',
        pronunciation: 'loh',
        example: 'Lo veo en el mercado.',
        exampleTranslation: 'I see it in the market.',
        audioCue: 'Direct object LO',
        levelIntroduced: 'B1',
        topic: 'direct-objects'
      }
    ],
    grammarNotes: [
      {
        title: 'Present Progressive',
        explanation: 'Formed with ESTAR + Gerund (-ando for -AR, -iendo for -ER/-IR). Example: Estoy hablando.',
        exampleFromStory: 'Estoy comiendo (I am eating)'
      }
    ],
    exercises: [
      {
        id: 'p4-q3-ex1',
        type: 'fill-blank',
        prompt: 'Ella está ___ (hablar) con el cliente.',
        answer: 'hablando',
        options: ['hablando', 'hablando', 'comiendo', 'viviendo']
      }
    ],
    rewards: { xp: 90, coins: 35 }
  }
];

export const worldPart4: World = {
  id: 'world-part-4',
  name: 'El Mercado del Progreso',
  description: 'A bustling trade market of ongoing action (Part 4: Stem Changers, Yo-Go, Present Progressive, Saber/Conocer).',
  level: 'B1',
  quests: world4Quests,
  chapters: [
    {
      id: 'part4-ch1',
      chapterNumber: 1,
      name: 'Stalls of Change',
      description: 'Master stem-changing verbs in the market stalls.',
      quests: world4Quests.slice(0, 1),
      endBoss: {
        type: 'sentinel',
        id: 'part4-ch1-boss',
        name: 'Market Merchant',
        hp: 8,
        coinReward: 80
      }
    },
    {
      id: 'part4-ch2',
      chapterNumber: 2,
      name: 'Bazaar of Actions',
      description: 'Practice Yo-Go irregular verbs and Ver/Dar.',
      quests: world4Quests.slice(1, 2),
      endBoss: {
        type: 'sentinel',
        id: 'part4-ch2-boss',
        name: 'Bazaar Keeper',
        hp: 8,
        coinReward: 80
      }
    },
    {
      id: 'part4-ch3',
      chapterNumber: 3,
      name: 'Plaza of Ongoing Motion',
      description: 'Present progressive and direct objects before the boss.',
      quests: world4Quests.slice(2),
      endBoss: {
        type: 'guardian',
        id: 'world-part4-boss',
        name: 'The Trade Spirit',
        hp: 14,
        coinReward: 160,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'world-part-3',
  guardian: 'The Trade Spirit',
  tailsAwarded: 1
};

export const worldB1 = worldPart4;

// ── WORLD 5: La Ciudad del Pronombre (Part 5: Possessives, Demonstratives, Negatives, Direct/Indirect Object Pronouns, Gustar) ──
const world5Quests: Quest[] = [
  {
    id: 'part5-q1',
    title: 'Demonstratives & Affirmative/Negative Pairs',
    subtitle: 'Master este/ese/aquel, algo/nada, alguien/nadie, siempre/nunca',
    estimatedMinutes: 6,
    topicFocus: ['demonstratives', 'affirmatives-negatives'],
    storyLines: [
      'Entras a la elegante Ciudad del Pronombre.',
      'Miras un edificio cercano: -- Este edificio es nuevo, pero aquel edificio a lo lejos es antiguo --.',
      '-- ¿Hay alguien en la plaza? -- preguntas.',
      '-- No hay nadie aquí, y nunca viene nadie de noche -- responde el guardia.'
    ],
    vocabulary: [
      {
        word: 'este',
        meaning: 'this (masculine singular)',
        pronunciation: 'EHS-teh',
        example: 'Este libro es genial.',
        exampleTranslation: 'This book is great.',
        audioCue: 'Demonstrative ESTE',
        levelIntroduced: 'B2',
        topic: 'demonstratives'
      },
      {
        word: 'nadie',
        meaning: 'nobody / no one',
        pronunciation: 'NAH-dyeh',
        example: 'Nadie vino hoy.',
        exampleTranslation: 'Nobody came today.',
        audioCue: 'Negative NADIE',
        levelIntroduced: 'B2',
        topic: 'affirmatives-negatives'
      }
    ],
    grammarNotes: [
      {
        title: 'Demonstrative Distance',
        explanation: 'Este (here/close), Ese (there/medium), Aquel (over there/far).',
        exampleFromStory: 'Este edificio (here) vs Aquel edificio (far)'
      }
    ],
    exercises: [
      {
        id: 'p5-q1-ex1',
        type: 'multiple-choice',
        prompt: 'What is the negative counterpart of "alguien" (someone)?',
        answer: 'nadie',
        options: ['nada', 'nadie', 'nunca', 'tampoco']
      }
    ],
    rewards: { xp: 90, coins: 35 }
  },
  {
    id: 'part5-q2',
    title: 'Indirect Objects & Verbs like Gustar',
    subtitle: 'Learn me/te/le/nos/les and gustar, encantar, interesar, faltar',
    estimatedMinutes: 6,
    topicFocus: ['indirect-objects', 'verbs-like-gustar'],
    storyLines: [
      'Te sientas en un café de la ciudad.',
      '-- Me encanta este café y me interesan los libros antiguos -- le dices a Yuki.',
      '-- A ella le gusta la música, pero le falta tiempo para escucharla --.',
      'El mesero te trae la cuenta.'
    ],
    vocabulary: [
      {
        word: 'le',
        meaning: 'to him / to her (indirect object pronoun)',
        pronunciation: 'leh',
        example: 'Le gusta el té.',
        exampleTranslation: 'He/she likes tea.',
        audioCue: 'Indirect LE',
        levelIntroduced: 'B2',
        topic: 'indirect-objects'
      },
      {
        word: 'encantar',
        meaning: 'to love / to delight',
        pronunciation: 'ehn-kan-TAR',
        example: 'Me encanta viajar.',
        exampleTranslation: 'I love to travel.',
        audioCue: 'Verb like GUSTAR',
        levelIntroduced: 'B2',
        topic: 'verbs-like-gustar'
      }
    ],
    grammarNotes: [
      {
        title: 'Verbs like Gustar',
        explanation: 'Subject is the thing liked, object is the person: Me gusta (singular) / Me gustan (plural).',
        exampleFromStory: 'Me gusta el café (singular)'
      }
    ],
    exercises: [
      {
        id: 'p5-q2-ex1',
        type: 'multiple-choice',
        prompt: 'How do you say "She likes fruits" (plural)?',
        answer: 'A ella le gustan las frutas.',
        options: ['Ella gusta frutas.', 'A ella le gusta las frutas.', 'A ella le gustan las frutas.', 'Ella le gusta frutas.']
      }
    ],
    rewards: { xp: 95, coins: 40 }
  },
  {
    id: 'part5-q3',
    title: 'Double Object Pronouns',
    subtitle: 'Combine Indirect + Direct pronouns: me lo, te lo, se lo',
    estimatedMinutes: 6,
    topicFocus: ['double-objects'],
    storyLines: [
      'Llegas al Palacio del Pronombre Archón.',
      '-- ¿Tienes la carta para el rey? -- pregunta el ministro.',
      '-- Sí, se la entrego ahora mismo -- respondes.',
      '-- Él me lo pidió ayer y yo se lo doy hoy --.'
    ],
    vocabulary: [
      {
        word: 'se',
        meaning: 'indirect pronoun replacement (le -> se before lo/la)',
        pronunciation: 'seh',
        example: 'Se lo doy.',
        exampleTranslation: 'I give it to him.',
        audioCue: 'LE becomes SE before LO/LA',
        levelIntroduced: 'B2',
        topic: 'double-objects'
      }
    ],
    grammarNotes: [
      {
        title: 'Double Object Order & Rule',
        explanation: 'Indirect Object FIRST, then Direct Object (People before Things). When le/les precedes lo/la/los/las, change le/les to SE: "se lo doy".',
        exampleFromStory: 'Se lo entrego (Indirect SE + Direct LO)'
      }
    ],
    exercises: [
      {
        id: 'p5-q3-ex1',
        type: 'multiple-choice',
        prompt: 'What happens when "le" (to him) and "lo" (it) are used together?',
        answer: 'le changes to se: se lo',
        options: ['le lo', 'se lo', 'lo le', 'me lo']
      }
    ],
    rewards: { xp: 100, coins: 40 }
  }
];

export const worldPart5: World = {
  id: 'world-part-5',
  name: 'La Ciudad del Pronombre',
  description: 'A grand metropolis governed by relationships (Part 5: Possessives, Demonstratives, Negatives, Direct/Indirect Object Pronouns, Gustar).',
  level: 'B2',
  quests: world5Quests,
  chapters: [
    {
      id: 'part5-ch1',
      chapterNumber: 1,
      name: 'Avenue of Pointers',
      description: 'Demonstratives and affirmative/negative pairs.',
      quests: world5Quests.slice(0, 1),
      endBoss: {
        type: 'sentinel',
        id: 'part5-ch1-boss',
        name: 'City Magistrate',
        hp: 9,
        coinReward: 90
      }
    },
    {
      id: 'part5-ch2',
      chapterNumber: 2,
      name: 'District of Feelings',
      description: 'Indirect object pronouns and Gustar-type verbs.',
      quests: world5Quests.slice(1, 2),
      endBoss: {
        type: 'sentinel',
        id: 'part5-ch2-boss',
        name: 'Pronoun Protector',
        hp: 9,
        coinReward: 90
      }
    },
    {
      id: 'part5-ch3',
      chapterNumber: 3,
      name: 'Palace of Substitution',
      description: 'Double object pronoun combinations before the Archon.',
      quests: world5Quests.slice(2),
      endBoss: {
        type: 'guardian',
        id: 'world-part5-boss',
        name: 'The Pronominal Archon',
        hp: 16,
        coinReward: 180,
        tailsAwarded: 1
      }
    }
  ],
  unlockRequirement: 'world-part-4',
  guardian: 'The Pronominal Archon',
  tailsAwarded: 1
};

export const worldB2 = worldPart5;

// ── WORLD 6: La Rutina Diaria y Comandos (Part 6: Double Objects, Reflexive Routine, Informal Commands, Preterite Intro) ──
const world6Quests: Quest[] = [
  {
    id: 'part6-q1',
    title: 'Reflexive Verbs & Daily Routine',
    subtitle: 'Master lavarse, levantarse, vestirse, acostarse',
    estimatedMinutes: 6,
    topicFocus: ['reflexives'],
    storyLines: [
      'Entras al Santuario de Entrenamiento de la Rutina.',
      'El maestro de entrenamiento te despierta al amanecer.',
      '-- Primero me levanto, luego me lavo las manos y me visto -- explicas.',
      '-- Por la noche me acuesto temprano para descansar --.'
    ],
    vocabulary: [
      {
        word: 'levanto',
        meaning: 'I get up (me levanto)',
        pronunciation: 'leh-BAN-toh',
        example: 'Me levanto a las seis.',
        exampleTranslation: 'I get up at six.',
        audioCue: 'Reflexive pronoun ME',
        levelIntroduced: 'C1',
        topic: 'reflexives'
      },
      {
        word: 'acuesto',
        meaning: 'I go to bed (me acuesto o->ue)',
        pronunciation: 'ah-KWEHS-toh',
        example: 'Me acuesto temprano.',
        exampleTranslation: 'I go to bed early.',
        audioCue: 'Reflexive + stem change',
        levelIntroduced: 'C1',
        topic: 'reflexives'
      }
    ],
    grammarNotes: [
      {
        title: 'Reflexive Pronouns',
        explanation: 'Me, te, se, nos, os, se. Subject performs and receives the action: Me lavo (I wash myself).',
        exampleFromStory: 'Me levanto, te levantas, se levanta'
      }
    ],
    exercises: [
      {
        id: 'p6-q1-ex1',
        type: 'multiple-choice',
        prompt: 'What is the "yo" reflexive form of "vestirse" (e->i)?',
        answer: 'me visto',
        options: ['me vesto', 'me visto', 'se visto', 'te visto']
      }
    ],
    rewards: { xp: 100, coins: 40 }
  },
  {
    id: 'part6-q2',
    title: 'Acabar de + Infinitive & Time Expressions',
    subtitle: 'Express recent past (acabo de comer) and duration (hace dos años)',
    estimatedMinutes: 6,
    topicFocus: ['past-expressions'],
    storyLines: [
      'Conversas con el Guardián del Tiempo Reciente.',
      '-- Acabo de terminar mi entrenamiento -- dices orgulloso.',
      '-- Estudio español desde hace seis meses y progresé mucho --.',
      'El guardián asiente con aprobación.'
    ],
    vocabulary: [
      {
        word: 'acabar',
        meaning: 'to finish (acabar de = to have just done)',
        pronunciation: 'ah-kah-BAR',
        example: 'Acabo de llegar.',
        exampleTranslation: 'I have just arrived.',
        audioCue: 'ACABAR DE + infinitive',
        levelIntroduced: 'C1',
        topic: 'past-expressions'
      },
      {
        word: 'desde',
        meaning: 'since / for (time duration)',
        pronunciation: 'DEHS-deh',
        example: 'Desde hace años.',
        exampleTranslation: 'For years.',
        audioCue: 'Duration marker DESDE',
        levelIntroduced: 'C1',
        topic: 'past-expressions'
      }
    ],
    grammarNotes: [
      {
        title: 'Recent Past with ACABAR DE',
        explanation: 'Acabar (present) + de + Infinitive = action just completed. "Acabo de comer" = I have just eaten.',
        exampleFromStory: 'Acabo de terminar mi entrenamiento.'
      }
    ],
    exercises: [
      {
        id: 'p6-q2-ex1',
        type: 'multiple-choice',
        prompt: 'How do you say "I have just eaten"?',
        answer: 'Acabo de comer.',
        options: ['Comí recién.', 'Acabo de comer.', 'Tengo comido.', 'Hago comer.']
      }
    ],
    rewards: { xp: 105, coins: 45 }
  },
  {
    id: 'part6-q3',
    title: 'Commands (Imperatives) - Formal & Informal',
    subtitle: 'Master irregular Tú commands (haz, ten, pon, sal, ve, di, ven, sé) and formal Usted',
    estimatedMinutes: 6,
    topicFocus: ['informal-commands', 'formal-commands'],
    storyLines: [
      'Llegas ante el Shogun de los Comandos.',
      '-- ¡Haz el esfuerzo, ten paciencia y ven aquí! -- te ordena el Shogun.',
      '-- Y para Usted, estimado profesor, ¡hable despacio! -- añade.',
      'Demuestras tu dominio de los mandatos.'
    ],
    vocabulary: [
      {
        word: 'haz',
        meaning: 'do / make! (informal command Tú for hacer)',
        pronunciation: 'ahs',
        example: '¡Haz la tarea!',
        exampleTranslation: 'Do the homework!',
        audioCue: 'Irregular command HAZ',
        levelIntroduced: 'C1',
        topic: 'informal-commands'
      },
      {
        word: 'hable',
        meaning: 'speak! (formal command Usted for hablar)',
        pronunciation: 'AH-bleh',
        example: 'Hable con calma.',
        exampleTranslation: 'Speak calmly.',
        audioCue: 'Formal command ending -E',
        levelIntroduced: 'C1',
        topic: 'formal-commands'
      }
    ],
    grammarNotes: [
      {
        title: 'Irregular Informal (Tú) Commands',
        explanation: '8 irregular affirmative Tú commands: Haz (hacer), Ten (tener), Pon (poner), Sal (salir), Ve (ir), Di (decir), Ven (venir), Sé (ser).',
        exampleFromStory: 'Haz, Ten, Pon, Sal, Ve, Di, Ven, Sé'
      }
    ],
    exercises: [
      {
        id: 'p6-q3-ex1',
        type: 'multiple-choice',
        prompt: 'What is the informal affirmative command (tú) for "hacer"?',
        answer: 'haz',
        options: ['hace', 'haz', 'haga', 'hazas']
      }
    ],
    rewards: { xp: 110, coins: 50 }
  }
];

export const worldPart6: World = {
  id: 'world-part-6',
  name: 'La Rutina Diaria y Comandos',
  description: 'A disciplined training sanctuary (Part 6: Double Objects, Reflexive Routine, Informal Commands, Preterite Intro).',
  level: 'C1',
  quests: world6Quests,
  chapters: [
    {
      id: 'part6-ch1',
      chapterNumber: 1,
      name: 'Courtyard of Routines',
      description: 'Reflexive verbs for daily habits.',
      quests: world6Quests.slice(0, 1),
      endBoss: {
        type: 'sentinel',
        id: 'part6-ch1-boss',
        name: 'Routine Master',
        hp: 10,
        coinReward: 100
      }
    },
    {
      id: 'part6-ch2',
      chapterNumber: 2,
      name: 'Hall of Recent Past',
      description: 'Acabar de + infinitive and time expressions.',
      quests: world6Quests.slice(1, 2),
      endBoss: {
        type: 'sentinel',
        id: 'part6-ch2-boss',
        name: 'Time Keeper',
        hp: 10,
        coinReward: 100
      }
    },
    {
      id: 'part6-ch3',
      chapterNumber: 3,
      name: 'Dojo of Imperatives',
      description: 'Formal and informal commands before the Shogun.',
      quests: world6Quests.slice(2),
      endBoss: {
        type: 'guardian',
        id: 'world-part6-boss',
        name: 'The Command Shogun',
        hp: 18,
        coinReward: 200,
        tailsAwarded: 2
      }
    }
  ],
  unlockRequirement: 'world-part-5',
  guardian: 'The Command Shogun',
  tailsAwarded: 2
};

export const worldC1 = worldPart6;

// ── WORLD 7: El Templo del Pasado (Part 7: Imperfect Tense, Preterite vs Imperfect, Comparisons, Superlatives) ──
const world7Quests: Quest[] = [
  {
    id: 'part7-q1',
    title: 'Superlatives & Equal Comparisons',
    subtitle: 'Master tan... como, tanto... como, y el más... / -ísimo',
    estimatedMinutes: 6,
    topicFocus: ['comparisons', 'superlatives'],
    storyLines: [
      'Entras al sagrado Templo del Pasado.',
      'Contemplas los monumentos ancestrales.',
      '-- Esta estatua es tan alta como la torre, y es el monumento más altísimo de la región -- dices.',
      '-- Es mejor que cualquiera que haya visto antes --.'
    ],
    vocabulary: [
      {
        word: 'tan',
        meaning: 'as (tan... como equal comparison)',
        pronunciation: 'tahn',
        example: 'Tan grande como.',
        exampleTranslation: 'As big as.',
        audioCue: 'Equal comparison TAN',
        levelIntroduced: 'Part 7',
        topic: 'comparisons'
      },
      {
        word: 'altísimo',
        meaning: 'extremely tall (absolute superlative)',
        pronunciation: 'ahl-TEE-see-moh',
        example: 'Es altísimo.',
        exampleTranslation: 'It is extremely tall.',
        audioCue: 'Superlative suffix -ÍSIMO',
        levelIntroduced: 'Part 7',
        topic: 'superlatives'
      }
    ],
    grammarNotes: [
      {
        title: 'Comparisons & Superlatives',
        explanation: 'Equal: tan + adj + como / tanto(s) + noun + como. Superlative: el/la más + adj / -ísimo.',
        exampleFromStory: 'Tan alta como (Equal) & El más altísimo (Superlative)'
      }
    ],
    exercises: [
      {
        id: 'p7-q1-ex1',
        type: 'multiple-choice',
        prompt: 'How do you say "She is as tall as Maria"?',
        answer: 'Ella es tan alta como María.',
        options: ['Ella es más alta como María.', 'Ella es tan alta como María.', 'Ella es tanto alta que María.', 'Ella es altísima como María.']
      }
    ],
    rewards: { xp: 110, coins: 50 }
  },
  {
    id: 'part7-q2',
    title: 'Preterite Tense - Regular & Irregular',
    subtitle: 'Master hablé, comí, fui, hice, tuve, estuve, pude, dije',
    estimatedMinutes: 6,
    topicFocus: ['preterite-ar', 'preterite-er-ir', 'irregular-preterite'],
    storyLines: [
      'Lees las inscripciones en los muros del templo.',
      '-- Ayer hablé con los sabios, comí en el palacio y fui al altar -- lees en alta voz.',
      '-- Hice una promesa, tuve valor y estuve aquí en el momento crucial --.',
      'Las puertas del santuario interior se abren.'
    ],
    vocabulary: [
      {
        word: 'hablé',
        meaning: 'I spoke (preterite -AR)',
        pronunciation: 'ah-BLEH',
        example: 'Hablé con él.',
        exampleTranslation: 'I spoke with him.',
        audioCue: 'Preterite accent -É',
        levelIntroduced: 'Part 7',
        topic: 'preterite-ar'
      },
      {
        word: 'fui',
        meaning: 'I went / I was (irregular preterite)',
        pronunciation: 'fwee',
        example: 'Fui al templo.',
        exampleTranslation: 'I went to the temple.',
        audioCue: 'Irregular preterite FUI',
        levelIntroduced: 'Part 7',
        topic: 'irregular-preterite'
      }
    ],
    grammarNotes: [
      {
        title: 'Preterite Endings',
        explanation: '-AR: -é, -aste, -ó, -amos, -asteis, -aron. -ER/-IR: -í, -iste, -ió, -imos, -isteis, -ieron. Irregulars: fui (ser/ir), hice (hacer), tuve (tener), estuve (estar).',
        exampleFromStory: 'Hablé (-é), comí (-í), fui (irregular)'
      }
    ],
    exercises: [
      {
        id: 'p7-q2-ex1',
        type: 'multiple-choice',
        prompt: 'What is the "yo" preterite form of "hacer"?',
        answer: 'hice',
        options: ['hago', 'hice', 'hizo', 'hicí']
      }
    ],
    rewards: { xp: 120, coins: 50 }
  },
  {
    id: 'part7-q3',
    title: 'Preterite vs Imperfect & Grand Fluency',
    subtitle: 'Distinguish completed events (Preterite) from ongoing background (Imperfect)',
    estimatedMinutes: 6,
    topicFocus: ['preterite-vs-imperfect'],
    storyLines: [
      'Te enfrentas al Gran Maestro del Pasado Ancestral.',
      '-- Cuando yo era joven y vivía en la montaña (imperfecto), un día vi una luz dorada y entré al templo (pretérito) -- narras con fluidez.',
      'El Gran Maestro sonríe: -- Has alcanzado la verdadera fluidez narrativa en español --.',
      '¡Reclamas las últimas colas sagradas del Kitsune!'
    ],
    vocabulary: [
      {
        word: 'era',
        meaning: 'I was / used to be (imperfect ser)',
        pronunciation: 'EH-rah',
        example: 'Cuando era niño.',
        exampleTranslation: 'When I was a child.',
        audioCue: 'Imperfect background ERA',
        levelIntroduced: 'Part 7',
        topic: 'preterite-vs-imperfect'
      },
      {
        word: 'entré',
        meaning: 'I entered (preterite entrar)',
        pronunciation: 'ehn-TREH',
        example: 'Entré al templo.',
        exampleTranslation: 'I entered the temple.',
        audioCue: 'Preterite completed event',
        levelIntroduced: 'Part 7',
        topic: 'preterite-vs-imperfect'
      }
    ],
    grammarNotes: [
      {
        title: 'Preterite vs Imperfect Rule',
        explanation: 'Imperfect sets the background scene / habit (What was happening: "era joven, llovía"). Preterite interrupts or marks completed action (What happened: "vi la luz, entré").',
        exampleFromStory: 'Cuando vivía allí (Imperfect) -> entré al templo (Preterite)'
      }
    ],
    exercises: [
      {
        id: 'p7-q3-ex1',
        type: 'multiple-choice',
        prompt: 'Which tense is used for ongoing background description in stories?',
        answer: 'Imperfect Tense (Imperfecto)',
        options: ['Preterite Tense (Pretérito)', 'Imperfect Tense (Imperfecto)', 'Present Tense (Presente)', 'Future Tense (Futuro)']
      }
    ],
    rewards: { xp: 150, coins: 60 }
  }
];

export const worldPart7: World = {
  id: 'world-part-7',
  name: 'El Templo del Pasado',
  description: 'The sacred ancient temple of historical narratives (Part 7: Imperfect Tense, Preterite vs Imperfect, Comparisons, Superlatives).',
  level: 'Part 7',
  quests: world7Quests,
  chapters: [
    {
      id: 'part7-ch1',
      chapterNumber: 1,
      name: 'Hall of Scales',
      description: 'Superlatives and equal comparisons.',
      quests: world7Quests.slice(0, 1),
      endBoss: {
        type: 'sentinel',
        id: 'part7-ch1-boss',
        name: 'Temple Examiner',
        hp: 12,
        coinReward: 110
      }
    },
    {
      id: 'part7-ch2',
      chapterNumber: 2,
      name: 'Gallery of Past Deeds',
      description: 'Preterite tense conjugations and irregulars.',
      quests: world7Quests.slice(1, 2),
      endBoss: {
        type: 'sentinel',
        id: 'part7-ch2-boss',
        name: 'Chronicle Keeper',
        hp: 12,
        coinReward: 110
      }
    },
    {
      id: 'part7-ch3',
      chapterNumber: 3,
      name: 'Sanctum of Dual Pasts',
      description: 'Preterite vs Imperfect narrative mastery before the Master.',
      quests: world7Quests.slice(2),
      endBoss: {
        type: 'guardian',
        id: 'world-part7-boss',
        name: 'The Ancestral Past Master',
        hp: 20,
        coinReward: 250,
        tailsAwarded: 2
      }
    }
  ],
  unlockRequirement: 'world-part-6',
  guardian: 'The Ancestral Past Master',
  tailsAwarded: 2
};

// ── ALL_WORLDS ARRAY (WORLDS 1 THROUGH 7) ──
export const ALL_WORLDS: World[] = [
  worldPart1,
  worldPart2,
  worldPart3,
  worldPart4,
  worldPart5,
  worldPart6,
  worldPart7
];
