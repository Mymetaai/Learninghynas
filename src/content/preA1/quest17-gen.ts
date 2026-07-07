// AUTO-GENERATED Pre-A1 Quest 17: "Drinks and Breakfast"
import type { Quest } from '../types';

export const preA1Quest17: Quest = {
  id: 'pre-a1-q17',
  title: 'Drinks and Breakfast',
  subtitle: 'Talk about beverages',
  estimatedMinutes: 6,
  topicFocus: ["food"],

  storyLines: [
  "Sin agua no hay vida.",
  "Me dio pan y leche.",
  "Se te cayó el café.",
  "Es la hora del té.",
  "Voy a hacer un jugo.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "agua",
    "meaning": "water",
    "pronunciation": "AH-gwah",
    "example": "Sin agua no hay vida.",
    "exampleTranslation": "No water, no life.",
    "audioCue": "The 'g' is soft; stress first syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "leche",
    "meaning": "leche",
    "pronunciation": "LESE",
    "example": "Me dio pan y leche.",
    "exampleTranslation": "He gave me bread and milk.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "café",
    "meaning": "café",
    "pronunciation": "CAFÉ",
    "example": "Se te cayó el café.",
    "exampleTranslation": "You've spilt your coffee.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "té",
    "meaning": "té",
    "pronunciation": "TÉ",
    "example": "Es la hora del té.",
    "exampleTranslation": "It's tea time.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "jugo",
    "meaning": "jugo",
    "pronunciation": "HUGO",
    "example": "Voy a hacer un jugo.",
    "exampleTranslation": "I am going to make a juice.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "bebida",
    "meaning": "bebida",
    "pronunciation": "BEBIDA",
    "example": "Dale una bebida a Tom.",
    "exampleTranslation": "Give Tom a drink.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "azúcar",
    "meaning": "azúcar",
    "pronunciation": "ASÚCAR",
    "example": "Bebo el té sin azúcar.",
    "exampleTranslation": "I drink tea without sugar.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "sal",
    "meaning": "sal",
    "pronunciation": "SAL",
    "example": "Yo tomo pan sin sal.",
    "exampleTranslation": "I eat bread without salt.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  },
  {
    "word": "desayuno",
    "meaning": "desayuno",
    "pronunciation": "DESAYUNO",
    "example": "El desayuno se paga extra.",
    "exampleTranslation": "There's an extra charge for breakfast.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "food"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'agua (AH-gwah)'
    }
  ],

  exercises: [
  {
    "id": "q17-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"water\"?",
    "answer": "agua",
    "options": [
      "agua",
      "leche",
      "café",
      "té"
    ]
  },
  {
    "id": "q17-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"leche\" mean?",
    "answer": "leche",
    "options": [
      "leche",
      "water",
      "café",
      "té"
    ]
  },
  {
    "id": "q17-fill-1",
    "type": "fill-blank",
    "prompt": "Se te cayó el ___. (café)",
    "answer": "café",
    "distractorPool": [
      "agua",
      "leche",
      "té"
    ]
  },
  {
    "id": "q17-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "agua↔water|leche↔leche|café↔café|té↔té",
    "options": [
      "agua",
      "leche",
      "café",
      "té",
      "water",
      "leche",
      "café",
      "té"
    ]
  },
  {
    "id": "q17-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Es la hora del té.",
    "answer": "It's tea time.",
    "distractorPool": [
      "No water, no life.",
      "He gave me bread and milk."
    ]
  },
  {
    "id": "q17-listen-1",
    "type": "listening",
    "prompt": "You hear: \"HUGO\". Which word is it?",
    "answer": "jugo",
    "options": [
      "jugo",
      "agua",
      "leche",
      "café"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
