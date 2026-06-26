// STEP 3 — Pre-A1 Quest 3: "Dinner with the Family"
// Topic focus: family members. The traveler is invited to a family dinner.
import type { Quest } from '../types';

export const preA1Quest3: Quest = {
  id: 'pre-a1-q3',
  title: 'Dinner with the Family',
  subtitle: 'Meet the family at dinner',
  estimatedMinutes: 7,
  topicFocus: ['family'],

  storyLines: [
    'Sofía invites you to dinner with her family.',
    'At the door: her mother. "Mi mamá," says Sofía.',
    'Inside, her father smiles: "mi papá".',
    'A small boy runs in: "¡Mi hermano!" he is Sofía\'s brother.',
    'Sofía\'s sister waves: "mi hermana".',
    'Grandmother brings food: "la abuela". Grandfather laughs: "el abuelo".',
    'Sofía points to everyone: "Mi familia."',
  ],

  vocabulary: [
    {
      word: 'familia',
      meaning: 'family',
      pronunciation: 'fah-MEE-lyah',
      example: 'Mi familia.',
      exampleTranslation: 'My family.',
      audioCue: 'The "li" glides into a "y" sound: fah-MEE-lyah.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
    {
      word: 'mamá',
      meaning: 'mom / mother',
      pronunciation: 'mah-MAH',
      example: 'mi mamá',
      exampleTranslation: 'my mom',
      audioCue: 'Accent on the final syllable: mah-MAH.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
    {
      word: 'papá',
      meaning: 'dad / father',
      pronunciation: 'pah-PAH',
      example: 'mi papá',
      exampleTranslation: 'my dad',
      audioCue: 'Accent on the final syllable: pah-PAH.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
    {
      word: 'hermano',
      meaning: 'brother',
      pronunciation: 'ehr-MAH-noh',
      example: 'mi hermano',
      exampleTranslation: 'my brother',
      audioCue: 'The "h" is silent.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
    {
      word: 'hermana',
      meaning: 'sister',
      pronunciation: 'ehr-MAH-nah',
      example: 'mi hermana',
      exampleTranslation: 'my sister',
      audioCue: 'The "h" is silent.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
    {
      word: 'abuela',
      meaning: 'grandmother',
      pronunciation: 'ah-BWEH-lah',
      example: 'la abuela',
      exampleTranslation: 'the grandmother',
      audioCue: 'The "u" is silent before "e": ah-BWEH-lah.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
    {
      word: 'abuelo',
      meaning: 'grandfather',
      pronunciation: 'ah-BWEH-loh',
      example: 'el abuelo',
      exampleTranslation: 'the grandfather',
      audioCue: 'The "u" is silent before "e": ah-BWEH-loh.',
      levelIntroduced: 'Pre-A1',
      topic: 'family',
    },
  ],

  grammarNotes: [
    {
      title: 'The silent "h"',
      explanation:
        'The letter "h" is almost always silent in Spanish — you just skip over it when pronouncing the word.',
      exampleFromStory: '“hermano” sounds like "ehr-MAH-noh" (no "h" sound).',
    },
    {
      title: 'Masculine vs. feminine (–o / –a)',
      explanation:
        'Many family words come in pairs: ending in "-o" for male, "-a" for female. The article matches too ("el"/"la").',
      exampleFromStory: '“el abuelo” (grandfather) vs. “la abuela” (grandmother).',
    },
  ],

  exercises: [
    {
      id: 'q3-mc-1',
      type: 'multiple-choice',
      prompt: 'What does "hermana" mean?',
      answer: 'sister',
      options: ['sister', 'brother', 'mother', 'grandmother'],
    },
    {
      id: 'q3-mc-2',
      type: 'multiple-choice',
      prompt: 'Which word means "grandfather"?',
      answer: 'abuelo',
      options: ['abuelo', 'abuela', 'papá', 'hermano'],
    },
    {
      id: 'q3-fill-1',
      type: 'fill-blank',
      prompt: 'mi ___ (dad)',
      answer: 'papá',
      distractorPool: ['mamá', 'hermano', 'abuela'],
    },
    {
      id: 'q3-match-1',
      type: 'match',
      prompt: 'Match each family word to its meaning',
      answer: 'mamá↔mom|papá↔dad|hermano↔brother|hermana↔sister',
      options: ['mamá', 'papá', 'hermano', 'hermana', 'mom', 'dad', 'brother', 'sister'],
    },
    {
      id: 'q3-tr-1',
      type: 'translation',
      direction: 'es-en',
      prompt: 'la abuela',
      answer: 'the grandmother',
    },
    {
      id: 'q3-drag-1',
      type: 'drag-drop',
      prompt: 'Group the masculine words (drop together)',
      answer: 'hermano|abuelo|papá',
      options: ['hermano', 'hermana', 'abuelo', 'abuela', 'papá', 'mamá'],
    },
  ],

  rewards: { xp: 45, coins: 12 },
};
