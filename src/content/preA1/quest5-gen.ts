// AUTO-GENERATED Pre-A1 Quest 5: "Meeting Friends"
import type { Quest } from '../types';

export const preA1Quest5: Quest = {
  id: 'pre-a1-q5',
  title: 'Meeting Friends',
  subtitle: 'Learn basic social terms',
  estimatedMinutes: 6,
  topicFocus: ["greetings"],

  storyLines: [
  "Él no es mi amigo.",
  "Ya no es mi amiga.",
  "Es el día del Señor.",
  "No conozco a esa señora.",
  "Mi por favor.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "amigo",
    "meaning": "amigo",
    "pronunciation": "AMIGO",
    "example": "Él no es mi amigo.",
    "exampleTranslation": "He is not my friend.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "amiga",
    "meaning": "amiga",
    "pronunciation": "AMIGA",
    "example": "Ya no es mi amiga.",
    "exampleTranslation": "She is no longer my friend.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "señor",
    "meaning": "señor",
    "pronunciation": "SENYOR",
    "example": "Es el día del Señor.",
    "exampleTranslation": "It's the day of the Lord.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "señora",
    "meaning": "señora",
    "pronunciation": "SENYORA",
    "example": "No conozco a esa señora.",
    "exampleTranslation": "I don't know that lady.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "por favor",
    "meaning": "por favor",
    "pronunciation": "POR FABOR",
    "example": "Mi por favor.",
    "exampleTranslation": "My por favor.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "de nada",
    "meaning": "de nada",
    "pronunciation": "DE NADA",
    "example": "Mi de nada.",
    "exampleTranslation": "My de nada.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "cómo",
    "meaning": "cómo",
    "pronunciation": "CÓMO",
    "example": "¿Cómo de alto es él?",
    "exampleTranslation": "How tall is he?",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "estás",
    "meaning": "estás",
    "pronunciation": "ESTÁS",
    "example": "Y tú, ¿qué tal estás?",
    "exampleTranslation": "And you, how's it going?",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "bien",
    "meaning": "well / good",
    "pronunciation": "byehn",
    "example": "A él le va bien.",
    "exampleTranslation": "He is doing well.",
    "audioCue": "The 'ie' glides like 'ye' in 'yes'.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  },
  {
    "word": "mal",
    "meaning": "mal",
    "pronunciation": "MAL",
    "example": "No es un mal tipo.",
    "exampleTranslation": "He's not a bad guy.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "greetings"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'amigo (AMIGO)'
    }
  ],

  exercises: [
  {
    "id": "q5-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"amigo\"?",
    "answer": "amigo",
    "options": [
      "amigo",
      "amiga",
      "señor",
      "señora"
    ]
  },
  {
    "id": "q5-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"amiga\" mean?",
    "answer": "amiga",
    "options": [
      "amiga",
      "amigo",
      "señor",
      "señora"
    ]
  },
  {
    "id": "q5-fill-1",
    "type": "fill-blank",
    "prompt": "Es el día del ___. (señor)",
    "answer": "señor",
    "distractorPool": [
      "amigo",
      "amiga",
      "señora"
    ]
  },
  {
    "id": "q5-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "amigo↔amigo|amiga↔amiga|señor↔señor|señora↔señora",
    "options": [
      "amigo",
      "amiga",
      "señor",
      "señora",
      "amigo",
      "amiga",
      "señor",
      "señora"
    ]
  },
  {
    "id": "q5-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "No conozco a esa señora.",
    "answer": "I don't know that lady.",
    "distractorPool": [
      "He is not my friend.",
      "She is no longer my friend."
    ]
  },
  {
    "id": "q5-listen-1",
    "type": "listening",
    "prompt": "You hear: \"POR FABOR\". Which word is it?",
    "answer": "por favor",
    "options": [
      "por favor",
      "amigo",
      "amiga",
      "señor"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
