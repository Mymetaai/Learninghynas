// AUTO-GENERATED Pre-A1 Quest 16: "Basic Food"
import type { Quest } from '../types';

export const preA1Quest16: Quest = {
  id: 'pre-a1-q16',
  title: 'Basic Food',
  subtitle: 'Talk about staple foods',
  estimatedMinutes: 6,
  topicFocus: ["food"],

  storyLines: [
  "Se me quemó el pan.",
  "No me gusta el queso.",
  "Esa carne es de pollo.",
  "Ya se quemó el arroz.",
  "El huevo es un zigoto.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "pan",
    "meaning": "bread",
    "pronunciation": "pahn",
    "example": "Se me quemó el pan.",
    "exampleTranslation": "I burned the bread.",
    "audioCue": "Short, crisp 'a' sound, like 'ah'.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "queso",
    "meaning": "queso",
    "pronunciation": "KESO",
    "example": "No me gusta el queso.",
    "exampleTranslation": "I don't like cheese.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "carne",
    "meaning": "carne",
    "pronunciation": "CARNE",
    "example": "Esa carne es de pollo.",
    "exampleTranslation": "That meat is chicken.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "arroz",
    "meaning": "arroz",
    "pronunciation": "ARROS",
    "example": "Ya se quemó el arroz.",
    "exampleTranslation": "The rice is already burnt.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "huevo",
    "meaning": "huevo",
    "pronunciation": "UEBO",
    "example": "El huevo es un zigoto.",
    "exampleTranslation": "An egg is a zygote.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "fruta",
    "meaning": "fruta",
    "pronunciation": "FRUTA",
    "example": "La fruta es muy sana.",
    "exampleTranslation": "Fruit is very healthy.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "manzana",
    "meaning": "manzana",
    "pronunciation": "MANSANA",
    "example": "Es la manzana de John.",
    "exampleTranslation": "It's John's apple.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "plátano",
    "meaning": "plátano",
    "pronunciation": "PLÁTANO",
    "example": "Solo me comí un plátano.",
    "exampleTranslation": "I only ate one banana.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "comida",
    "meaning": "comida",
    "pronunciation": "COMIDA",
    "example": "La comida no es amor.",
    "exampleTranslation": "Food is not love.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'pan (pahn)'
    }
  ],

  exercises: [
  {
    "id": "q16-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"bread\"?",
    "answer": "pan",
    "options": [
      "pan",
      "queso",
      "carne",
      "arroz"
    ]
  },
  {
    "id": "q16-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"queso\" mean?",
    "answer": "queso",
    "options": [
      "queso",
      "bread",
      "carne",
      "arroz"
    ]
  },
  {
    "id": "q16-fill-1",
    "type": "fill-blank",
    "prompt": "Esa ___ es de pollo. (carne)",
    "answer": "carne",
    "distractorPool": [
      "pan",
      "queso",
      "arroz"
    ]
  },
  {
    "id": "q16-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "pan↔bread|queso↔queso|carne↔carne|arroz↔arroz",
    "options": [
      "pan",
      "queso",
      "carne",
      "arroz",
      "bread",
      "queso",
      "carne",
      "arroz"
    ]
  },
  {
    "id": "q16-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Ya se quemó el arroz.",
    "answer": "The rice is already burnt.",
    "distractorPool": [
      "I burned the bread.",
      "I don't like cheese."
    ]
  },
  {
    "id": "q16-listen-1",
    "type": "listening",
    "prompt": "You hear: \"UEBO\". Which word is it?",
    "answer": "huevo",
    "options": [
      "huevo",
      "pan",
      "queso",
      "carne"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
