// STEP 3 — Pre-A1 Quest 4: "A Day at the Village School"
// Topic focus: animals + classroom/basic objects. The traveler spends a day
// at the village school. This quest completes coverage of all Pre-A1 topics.
import type { Quest } from '../types';

export const preA1Quest4: Quest = {
  id: 'pre-a1-q4',
  title: 'A Day at the Village School',
  subtitle: 'Animals and objects at the school',
  estimatedMinutes: 8,
  topicFocus: ['animals', 'classroom-objects'],

  storyLines: [
    'At the village school, the teacher points to a picture.',
    '"¡Un perro!" she says. A dog. The children laugh.',
    'Outside, a cat walks by: "un gato."',
    'A bird sings in the tree: "un pájaro." A fish swims in a bowl: "un pez."',
    'Back inside, the teacher holds up objects.',
    '"El libro," she says — a book. "El lápiz" — a pencil.',
    '"La mesa" — the table. "La silla" — the chair.',
    'You sit and open your book. School has begun!',
  ],

  vocabulary: [
    {
      word: 'perro',
      meaning: 'dog',
      pronunciation: 'PEH-rroh',
      example: 'un perro',
      exampleTranslation: 'a dog',
      audioCue: 'The double "rr" is rolled/trilled.',
      levelIntroduced: 'Pre-A1',
      topic: 'animals',
    },
    {
      word: 'gato',
      meaning: 'cat',
      pronunciation: 'GAH-toh',
      example: 'un gato',
      exampleTranslation: 'a cat',
      audioCue: 'A single "t" — crisp, not like English "cat".',
      levelIntroduced: 'Pre-A1',
      topic: 'animals',
    },
    {
      word: 'pájaro',
      meaning: 'bird',
      pronunciation: 'PAH-hah-roh',
      example: 'un pájaro',
      exampleTranslation: 'a bird',
      audioCue: 'Accent on the first "á": PAH-hah-roh.',
      levelIntroduced: 'Pre-A1',
      topic: 'animals',
    },
    {
      word: 'pez',
      meaning: 'fish',
      pronunciation: 'pehs',
      example: 'un pez',
      exampleTranslation: 'a fish',
      audioCue: 'Short and clipped: "pehs".',
      levelIntroduced: 'Pre-A1',
      topic: 'animals',
    },
    {
      word: 'libro',
      meaning: 'book',
      pronunciation: 'LEE-broh',
      example: 'el libro',
      exampleTranslation: 'the book',
      audioCue: 'The "br" blends smoothly: LEE-broh.',
      levelIntroduced: 'Pre-A1',
      topic: 'classroom-objects',
    },
    {
      word: 'lápiz',
      meaning: 'pencil',
      pronunciation: 'LAH-peeth',
      example: 'el lápiz',
      exampleTranslation: 'the pencil',
      audioCue: 'Accent on the first syllable. The "z" = "th" in Spain, "s" in Latin America.',
      levelIntroduced: 'Pre-A1',
      topic: 'classroom-objects',
    },
    {
      word: 'mesa',
      meaning: 'table',
      pronunciation: 'MEH-sah',
      example: 'la mesa',
      exampleTranslation: 'the table',
      audioCue: 'Even stress on both syllables: MEH-sah.',
      levelIntroduced: 'Pre-A1',
      topic: 'classroom-objects',
    },
    {
      word: 'silla',
      meaning: 'chair',
      pronunciation: 'SEE-yah',
      example: 'la silla',
      exampleTranslation: 'the chair',
      audioCue: 'The "ll" = "y" sound: SEE-yah.',
      levelIntroduced: 'Pre-A1',
      topic: 'classroom-objects',
    },
  ],

  grammarNotes: [
    {
      title: 'The rolled "rr"',
      explanation:
        'A double "rr" (only found inside words) is rolled or trilled — the tongue vibrates. A single "r" at the start of a word is also trilled; a single "r" inside a word is a soft tap.',
      exampleFromStory: '“perro” has a trilled "rr": PEH-rroh.',
    },
    {
      title: '"el" and "la" — the definite articles',
      explanation:
        '"el" means "the" for masculine nouns, "la" for feminine ones. Nouns ending in "-o" are usually masculine; "-a" usually feminine.',
      exampleFromStory: '“el libro” (the book) vs. “la silla” (the chair).',
    },
  ],

  exercises: [
    {
      id: 'q4-mc-1',
      type: 'multiple-choice',
      prompt: 'What is a "perro"?',
      answer: 'dog',
      options: ['dog', 'cat', 'bird', 'fish'],
    },
    {
      id: 'q4-mc-2',
      type: 'multiple-choice',
      prompt: 'Which object is "la silla"?',
      answer: 'chair',
      options: ['chair', 'table', 'book', 'pencil'],
    },
    {
      id: 'q4-fill-1',
      type: 'fill-blank',
      prompt: 'el ___ (book)',
      answer: 'libro',
      distractorPool: ['lápiz', 'mesa', 'silla'],
    },
    {
      id: 'q4-fill-2',
      type: 'fill-blank',
      prompt: 'un ___ (cat)',
      answer: 'gato',
      distractorPool: ['perro', 'pájaro', 'pez'],
    },
    {
      id: 'q4-match-1',
      type: 'match',
      prompt: 'Match each animal to its meaning',
      answer: 'perro↔dog|gato↔cat|pájaro↔bird|pez↔fish',
      options: ['perro', 'gato', 'pájaro', 'pez', 'dog', 'cat', 'bird', 'fish'],
    },
    {
      id: 'q4-match-2',
      type: 'match',
      prompt: 'Match each object to its meaning',
      answer: 'libro↔book|lápiz↔pencil|mesa↔table|silla↔chair',
      options: ['libro', 'lápiz', 'mesa', 'silla', 'book', 'pencil', 'table', 'chair'],
    },
    {
      id: 'q4-tr-1',
      type: 'translation',
      direction: 'en-es',
      prompt: 'the pencil',
      answer: 'el lápiz',
    },
    {
      id: 'q4-listen-1',
      type: 'listening',
      prompt: 'You hear: "PEH-rroh". Which animal?',
      answer: 'perro',
      options: ['perro', 'gato', 'pájaro', 'pez'],
      context: 'Listen for the rolled "rr".',
    },
  ],

  rewards: { xp: 55, coins: 14 },
};
