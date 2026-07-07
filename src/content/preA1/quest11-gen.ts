// AUTO-GENERATED Pre-A1 Quest 11: "My Extended Family"
import type { Quest } from '../types';

export const preA1Quest11: Quest = {
  id: 'pre-a1-q11',
  title: 'My Extended Family',
  subtitle: 'Name grandparents and relatives',
  estimatedMinutes: 6,
  topicFocus: ["family"],

  storyLines: [
  "Soy el abuelo de Tom.",
  "Mary es la abuela de Tom.",
  "Es el tío de Tom.",
  "Él vivía con su tía.",
  "Soy el primo de Tom.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "abuelo",
    "meaning": "grandfather",
    "pronunciation": "ah-BWEH-loh",
    "example": "Soy el abuelo de Tom.",
    "exampleTranslation": "I'm Tom's grandfather.",
    "audioCue": "The 'ue' glides like 'we' in 'well'.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "abuela",
    "meaning": "grandmother",
    "pronunciation": "ah-BWEH-lah",
    "example": "Mary es la abuela de Tom.",
    "exampleTranslation": "Mary is Tom's grandmother.",
    "audioCue": "The 'ue' glides like 'we' in 'well'.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "tío",
    "meaning": "uncle",
    "pronunciation": "TEE-oh",
    "example": "Es el tío de Tom.",
    "exampleTranslation": "He's Tom's uncle.",
    "audioCue": "Stress the 'i' clearly.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "tía",
    "meaning": "aunt",
    "pronunciation": "TEE-ah",
    "example": "Él vivía con su tía.",
    "exampleTranslation": "He was living with his aunt.",
    "audioCue": "Stress the 'i' clearly.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "primo",
    "meaning": "cousin (male)",
    "pronunciation": "PREE-moh",
    "example": "Soy el primo de Tom.",
    "exampleTranslation": "I'm Tom's cousin.",
    "audioCue": "Stress the first syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "prima",
    "meaning": "cousin (female)",
    "pronunciation": "PREE-mah",
    "example": "Soy la prima de Tom.",
    "exampleTranslation": "I'm Tom's cousin.",
    "audioCue": "Stress the first syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "bebé",
    "meaning": "baby",
    "pronunciation": "beh-BEH",
    "example": "Ya no soy un bebé.",
    "exampleTranslation": "I'm not a baby anymore.",
    "audioCue": "Accent on the final syllable: beh-BEH.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "niño",
    "meaning": "boy / child",
    "pronunciation": "NEEN-yoh",
    "example": "Él no es un niño.",
    "exampleTranslation": "He isn't a child.",
    "audioCue": "The 'ñ' sounds like 'ny' in 'canyon'.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "niña",
    "meaning": "girl / child",
    "pronunciation": "NEEN-yah",
    "example": "La niña bebe el té.",
    "exampleTranslation": "The girl is drinking tea.",
    "audioCue": "The 'ñ' sounds like 'ny' in 'canyon'.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'abuelo (ah-BWEH-loh)'
    }
  ],

  exercises: [
  {
    "id": "q11-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"grandfather\"?",
    "answer": "abuelo",
    "options": [
      "abuelo",
      "abuela",
      "tío",
      "tía"
    ]
  },
  {
    "id": "q11-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"abuela\" mean?",
    "answer": "grandmother",
    "options": [
      "grandmother",
      "grandfather",
      "uncle",
      "aunt"
    ]
  },
  {
    "id": "q11-fill-1",
    "type": "fill-blank",
    "prompt": "Es el ___ de Tom. (uncle)",
    "answer": "tío",
    "distractorPool": [
      "abuelo",
      "abuela",
      "tía"
    ]
  },
  {
    "id": "q11-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "abuelo↔grandfather|abuela↔grandmother|tío↔uncle|tía↔aunt",
    "options": [
      "abuelo",
      "abuela",
      "tío",
      "tía",
      "grandfather",
      "grandmother",
      "uncle",
      "aunt"
    ]
  },
  {
    "id": "q11-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Él vivía con su tía.",
    "answer": "He was living with his aunt.",
    "distractorPool": [
      "I'm Tom's grandfather.",
      "Mary is Tom's grandmother."
    ]
  },
  {
    "id": "q11-listen-1",
    "type": "listening",
    "prompt": "You hear: \"PREE-moh\". Which word is it?",
    "answer": "primo",
    "options": [
      "primo",
      "abuelo",
      "abuela",
      "tío"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
