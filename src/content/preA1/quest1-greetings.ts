// STEP 3 — Pre-A1 Quest 1: "First Words in the Village"
// Topic focus: greetings + alphabet/pronunciation foundation.
// A new traveler arrives at the village of La Aldea and meets the locals.
import type { Quest } from '../types';

export const preA1Quest1: Quest = {
  id: 'pre-a1-q1',
  title: 'First Words in the Village',
  subtitle: 'Greet the people of La Aldea',
  estimatedMinutes: 6,
  topicFocus: ['greetings', 'alphabet-pronunciation'],

  storyLines: [
    '¡Hola! TheLearningHyena arrives at the village.',
    'A woman smiles and says: "¡Hola! ¡Buenos días!"',
    'You answer: "¡Hola! ¿Cómo estás?"',
    'She laughs: "Muy bien, gracias. ¿Y tú?"',
    'You say: "Bien." Then you add: "¡Adiós!"',
    'The villagers wave. "¡Hasta mañana!" they call.',
  ],

  vocabulary: [
    {
      word: 'hola',
      meaning: 'hello',
      pronunciation: 'OH-lah',
      example: '¡Hola! ¿Cómo estás?',
      exampleTranslation: 'Hello! How are you?',
      audioCue: 'Stress the first syllable: OH-lah.',
      levelIntroduced: 'Pre-A1',
      topic: 'greetings',
    },
    {
      word: 'adiós',
      meaning: 'goodbye',
      pronunciation: 'ah-DYOHS',
      example: '¡Adiós! Hasta mañana.',
      exampleTranslation: 'Goodbye! See you tomorrow.',
      audioCue: 'The "d" is soft, almost like "th" in "this".',
      levelIntroduced: 'Pre-A1',
      topic: 'greetings',
    },
    {
      word: 'gracias',
      meaning: 'thank you',
      pronunciation: 'GRAH-syahs',
      example: 'Muy bien, gracias.',
      exampleTranslation: 'Very well, thank you.',
      audioCue: 'The "c" (before i/e) sounds like "s" in Latin America.',
      levelIntroduced: 'Pre-A1',
      topic: 'greetings',
    },
    {
      word: 'bien',
      meaning: 'well / good',
      pronunciation: 'byehn',
      example: 'Estoy bien.',
      exampleTranslation: 'I am well.',
      audioCue: 'The "ie" glides like "ye" in "yes".',
      levelIntroduced: 'Pre-A1',
      topic: 'greetings',
    },
    {
      word: 'mañana',
      meaning: 'tomorrow / morning',
      pronunciation: 'mah-NYAH-nah',
      example: '¡Hasta mañana!',
      exampleTranslation: 'See you tomorrow!',
      audioCue: 'The "ñ" sounds like "ny" in "canyon".',
      levelIntroduced: 'Pre-A1',
      topic: 'greetings',
    },
    {
      word: 'días',
      meaning: 'days',
      pronunciation: 'DEE-ahs',
      example: '¡Buenos días!',
      exampleTranslation: 'Good morning! (Good days!)',
      audioCue: 'An accent mark means stress that syllable: DEE-ahs.',
      levelIntroduced: 'Pre-A1',
      topic: 'alphabet-pronunciation',
    },
  ],

  grammarNotes: [
    {
      title: 'Accent marks = stress that syllable',
      explanation:
        'A written accent tells you which syllable to emphasize. Without it, Spanish words follow default stress rules (usually the second-to-last syllable if the word ends in a vowel, n, or s).',
      exampleFromStory: '“mañana” → mah-NYAH-nah (accent on the “ña”).',
    },
    {
      title: 'The letter ñ',
      explanation:
        'The "ñ" is a separate letter in Spanish and sounds like "ny" in "canyon".',
      exampleFromStory: '“mañana” has a "ñ" right under the accent.',
    },
  ],

  exercises: [
    {
      id: 'q1-mc-1',
      type: 'multiple-choice',
      prompt: 'How do you say "hello"?',
      answer: 'hola',
      options: ['hola', 'adiós', 'gracias', 'bien'],
      distractorPool: ['hasta', 'muy', 'tú'],
    },
    {
      id: 'q1-mc-2',
      type: 'multiple-choice',
      prompt: 'Someone says "¡Buenos días!". What time of day is it?',
      answer: 'Morning',
      options: ['Morning', 'Night', 'Afternoon dinner', 'Bedtime'],
    },
    {
      id: 'q1-fill-1',
      type: 'fill-blank',
      prompt: 'Muy bien, ___. (thank you)',
      answer: 'gracias',
      distractorPool: ['hola', 'adiós', 'bien'],
    },
    {
      id: 'q1-match-1',
      type: 'match',
      prompt: 'Match each greeting to its meaning',
      answer: 'hola↔hello|adiós↔goodbye|gracias↔thank you|bien↔well',
      options: ['hola', 'adiós', 'gracias', 'bien', 'hello', 'goodbye', 'thank you', 'well'],
    },
    {
      id: 'q1-tr-1',
      type: 'translation',
      direction: 'en-es',
      prompt: 'goodbye',
      answer: 'adiós',
      distractorPool: ['hola', 'gracias'],
    },
    {
      id: 'q1-listen-1',
      type: 'listening',
      prompt: 'You hear: "mah-NYAH-nah". Which word is it?',
      answer: 'mañana',
      options: ['mañana', 'adiós', 'días', 'gracias'],
      context: 'Listen for the "ñ" sound.',
    },
  ],

  rewards: { xp: 40, coins: 10 },
};
