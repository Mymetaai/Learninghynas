// STEP 3 — Pre-A1 Quest 2: "Colors at the Market"
// Topic focus: colors + numbers 0–20. The traveler visits the village market.
import type { Quest } from '../types';

export const preA1Quest2: Quest = {
  id: 'pre-a1-q2',
  title: 'Colors at the Market',
  subtitle: 'Count and name colors at the village market',
  estimatedMinutes: 8,
  topicFocus: ['colors', 'numbers'],

  storyLines: [
    'The market is bright. There are red apples and blue flowers.',
    'A vendor holds up one apple: "¡Una manzana roja!"',
    'You count: "uno, dos, tres." Three green pears!',
    'The vendor points: "Cuatro flores amarillas." Four yellow flowers.',
    'You see five blue birds above: "cinco pájaros azules."',
    'You buy ten red apples: "¡Diez manzanas rojas, por favor!"',
  ],

  vocabulary: [
    {
      word: 'rojo',
      meaning: 'red',
      pronunciation: 'ROH-hoh',
      example: 'una manzana roja',
      exampleTranslation: 'a red apple',
      audioCue: 'The "j" is a breathy sound, like "h" but raspier.',
      levelIntroduced: 'Pre-A1',
      topic: 'colors',
    },
    {
      word: 'azul',
      meaning: 'blue',
      pronunciation: 'ah-SOOL',
      example: 'cinco pájaros azules',
      exampleTranslation: 'five blue birds',
      audioCue: 'Stress the last syllable: ah-SOOL.',
      levelIntroduced: 'Pre-A1',
      topic: 'colors',
    },
    {
      word: 'verde',
      meaning: 'green',
      pronunciation: 'BEHR-deh',
      example: 'tres peras verdes',
      exampleTranslation: 'three green pears',
      audioCue: 'The "v" sounds close to a soft English "b".',
      levelIntroduced: 'Pre-A1',
      topic: 'colors',
    },
    {
      word: 'amarillo',
      meaning: 'yellow',
      pronunciation: 'ah-mah-REE-yoh',
      example: 'cuatro flores amarillas',
      exampleTranslation: 'four yellow flowers',
      audioCue: 'The double "ll" sounds like "y" in "yes".',
      levelIntroduced: 'Pre-A1',
      topic: 'colors',
    },
    {
      word: 'uno',
      meaning: 'one',
      pronunciation: 'OO-noh',
      example: 'uno, dos, tres',
      exampleTranslation: 'one, two, three',
      audioCue: '"u" is short and crisp, like "oo" in "book".',
      levelIntroduced: 'Pre-A1',
      topic: 'numbers',
    },
    {
      word: 'cinco',
      meaning: 'five',
      pronunciation: 'SEEN-koh',
      example: 'cinco pájaros',
      exampleTranslation: 'five birds',
      audioCue: 'Roll the feeling of the "n" before "c".',
      levelIntroduced: 'Pre-A1',
      topic: 'numbers',
    },
    {
      word: 'diez',
      meaning: 'ten',
      pronunciation: 'dyehs',
      example: 'diez manzanas',
      exampleTranslation: 'ten apples',
      audioCue: 'The "ie" is a glide: "dyehs".',
      levelIntroduced: 'Pre-A1',
      topic: 'numbers',
    },
    {
      word: 'veinte',
      meaning: 'twenty',
      pronunciation: 'BAYN-teh',
      example: 'veinte flores',
      exampleTranslation: 'twenty flowers',
      audioCue: 'Stress the first syllable: BAYN-teh.',
      levelIntroduced: 'Pre-A1',
      topic: 'numbers',
    },
  ],

  grammarNotes: [
    {
      title: 'Adjectives come AFTER the noun',
      explanation:
        'In Spanish, descriptive adjectives usually follow the noun they describe — the opposite of English.',
      exampleFromStory: '“manzana roja” (apple red) = “red apple”.',
    },
    {
      title: 'Adjectives agree in number',
      explanation:
        'An adjective changes to match how many things it describes: singular "-o/-a", plural "-os/-as".',
      exampleFromStory: '“manzana roja” (one) vs. “manzanas rojas” (many).',
    },
  ],

  exercises: [
    {
      id: 'q2-mc-1',
      type: 'multiple-choice',
      prompt: 'What color is "rojo"?',
      answer: 'red',
      options: ['red', 'blue', 'green', 'yellow'],
      distractorPool: ['black', 'white'],
    },
    {
      id: 'q2-mc-2',
      type: 'multiple-choice',
      prompt: 'Which word means "five"?',
      answer: 'cinco',
      options: ['cinco', 'diez', 'uno', 'veinte'],
    },
    {
      id: 'q2-fill-1',
      type: 'fill-blank',
      prompt: 'una manzana ___ (red)',
      answer: 'roja',
      distractorPool: ['rojo', 'azul', 'verde'],
    },
    {
      id: 'q2-reorder-1',
      type: 'reorder',
      prompt: 'Arrange the numbers from smallest to largest: ten, five, one, twenty',
      answer: 'uno|cinco|diez|veinte',
      options: ['diez', 'cinco', 'uno', 'veinte'],
    },
    {
      id: 'q2-tr-1',
      type: 'translation',
      direction: 'es-en',
      prompt: 'cinco pájaros azules',
      answer: 'five blue birds',
    },
    {
      id: 'q2-match-1',
      type: 'match',
      prompt: 'Match each color to its meaning',
      answer: 'rojo↔red|azul↔blue|verde↔green|amarillo↔yellow',
      options: ['rojo', 'azul', 'verde', 'amarillo', 'red', 'blue', 'green', 'yellow'],
    },
    {
      id: 'q2-listen-1',
      type: 'listening',
      prompt: 'You hear: "ah-mah-REE-yoh". Which color?',
      answer: 'amarillo',
      options: ['amarillo', 'rojo', 'verde', 'azul'],
    },
  ],

  rewards: { xp: 50, coins: 12 },
};
