// AUTO-GENERATED Pre-A1 Quest 24: "Weather and Nature"
import type { Quest } from '../types';

export const preA1Quest24: Quest = {
  id: 'pre-a1-q24',
  title: 'Weather and Nature',
  subtitle: 'Describe weather and outdoor environments',
  estimatedMinutes: 6,
  topicFocus: ["nature"],

  storyLines: [
  "Me quemé con el sol.",
  "No hay aire en la Luna.",
  "El límite es el cielo.",
  "Me bañé en el mar.",
  "Ve a lamer un árbol.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "sol",
    "meaning": "sun",
    "pronunciation": "sohl",
    "example": "Me quemé con el sol.",
    "exampleTranslation": "I got sunburned.",
    "audioCue": "Single crisp syllable: sohl.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "luna",
    "meaning": "moon",
    "pronunciation": "LOO-nah",
    "example": "No hay aire en la Luna.",
    "exampleTranslation": "There's no air on the moon.",
    "audioCue": "Stress the first syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "cielo",
    "meaning": "sky / heaven",
    "pronunciation": "SYEH-loh",
    "example": "El límite es el cielo.",
    "exampleTranslation": "The sky's the limit.",
    "audioCue": "The 'c' is soft; 'ie' glides.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "mar",
    "meaning": "sea",
    "pronunciation": "mahr",
    "example": "Me bañé en el mar.",
    "exampleTranslation": "I bathed in the sea.",
    "audioCue": "Single crisp syllable: mahr.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "árbol",
    "meaning": "tree",
    "pronunciation": "AHR-bohl",
    "example": "Ve a lamer un árbol.",
    "exampleTranslation": "Go lick a tree.",
    "audioCue": "Accent on the first 'á': AHR-bohl.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "flor",
    "meaning": "flower",
    "pronunciation": "flohr",
    "example": "La flor no es negra.",
    "exampleTranslation": "The flower isn't black.",
    "audioCue": "Single crisp syllable: flohr.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "lluvia",
    "meaning": "lluvia",
    "pronunciation": "YUBIA",
    "example": "La lluvia al fin paró.",
    "exampleTranslation": "The rain stopped at last.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "viento",
    "meaning": "viento",
    "pronunciation": "BIENTO",
    "example": "Hay un poco de viento.",
    "exampleTranslation": "There's a little wind.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "calor",
    "meaning": "calor",
    "pronunciation": "CALOR",
    "example": "No me gusta el calor.",
    "exampleTranslation": "I don't like the heat.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  },
  {
    "word": "frío",
    "meaning": "frío",
    "pronunciation": "FRÍO",
    "example": "El hielo es muy frío.",
    "exampleTranslation": "Ice is very cold.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "nature"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'sol (sohl)'
    }
  ],

  exercises: [
  {
    "id": "q24-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"sun\"?",
    "answer": "sol",
    "options": [
      "sol",
      "luna",
      "cielo",
      "mar"
    ]
  },
  {
    "id": "q24-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"luna\" mean?",
    "answer": "moon",
    "options": [
      "moon",
      "sun",
      "sky / heaven",
      "sea"
    ]
  },
  {
    "id": "q24-fill-1",
    "type": "fill-blank",
    "prompt": "El límite es el ___. (sky / heaven)",
    "answer": "cielo",
    "distractorPool": [
      "sol",
      "luna",
      "mar"
    ]
  },
  {
    "id": "q24-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "sol↔sun|luna↔moon|cielo↔sky / heaven|mar↔sea",
    "options": [
      "sol",
      "luna",
      "cielo",
      "mar",
      "sun",
      "moon",
      "sky / heaven",
      "sea"
    ]
  },
  {
    "id": "q24-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Me bañé en el mar.",
    "answer": "I bathed in the sea.",
    "distractorPool": [
      "I got sunburned.",
      "There's no air on the moon."
    ]
  },
  {
    "id": "q24-listen-1",
    "type": "listening",
    "prompt": "You hear: \"AHR-bohl\". Which word is it?",
    "answer": "árbol",
    "options": [
      "árbol",
      "sol",
      "luna",
      "cielo"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
