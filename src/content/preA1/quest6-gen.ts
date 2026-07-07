// AUTO-GENERATED Pre-A1 Quest 6: "Counting to Ten"
import type { Quest } from '../types';

export const preA1Quest6: Quest = {
  id: 'pre-a1-q6',
  title: 'Counting to Ten',
  subtitle: 'Count objects from one to ten',
  estimatedMinutes: 6,
  topicFocus: ["numbers"],

  storyLines: [
  "Mi cuenta está a cero.",
  "Ni uno ni lo otro.",
  "Las amo a las dos.",
  "Son las tres y diez.",
  "Me voy a las cuatro.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "cero",
    "meaning": "zero",
    "pronunciation": "SEH-roh",
    "example": "Mi cuenta está a cero.",
    "exampleTranslation": "My account is at zero.",
    "audioCue": "The 'c' before 'e' is a soft 's' sound.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "uno",
    "meaning": "one",
    "pronunciation": "OO-noh",
    "example": "Ni uno ni lo otro.",
    "exampleTranslation": "Neither the one nor the other.",
    "audioCue": "Stress the first syllable: OO-noh.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "dos",
    "meaning": "two",
    "pronunciation": "dohs",
    "example": "Las amo a las dos.",
    "exampleTranslation": "I love you both.",
    "audioCue": "Short and crisp 'o' sound.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "tres",
    "meaning": "three",
    "pronunciation": "trehs",
    "example": "Son las tres y diez.",
    "exampleTranslation": "It's 3:10.",
    "audioCue": "Roll the 'tr' slightly.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "cuatro",
    "meaning": "four",
    "pronunciation": "KWAH-troh",
    "example": "Me voy a las cuatro.",
    "exampleTranslation": "I am leaving at four.",
    "audioCue": "The 'cu' glides like English 'w'.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "cinco",
    "meaning": "five",
    "pronunciation": "SEEN-koh",
    "example": "Son las cinco y pico.",
    "exampleTranslation": "It's 5 something.",
    "audioCue": "The first 'c' is soft, second 'c' is hard.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "seis",
    "meaning": "six",
    "pronunciation": "sayss",
    "example": "Los veré a las seis.",
    "exampleTranslation": "I'll meet them at six.",
    "audioCue": "Glides from 'eh' to 'ee'.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "siete",
    "meaning": "seven",
    "pronunciation": "SYEH-teh",
    "example": "Él cena a las siete.",
    "exampleTranslation": "He has dinner at six.",
    "audioCue": "Stress the first syllable: SYEH-teh.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "ocho",
    "meaning": "eight",
    "pronunciation": "OH-choh",
    "example": "Se va a las ocho.",
    "exampleTranslation": "He leaves at eight.",
    "audioCue": "The 'ch' is identical to English 'ch'.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "nueve",
    "meaning": "nine",
    "pronunciation": "NWEH-beh",
    "example": "Son las nueve y media.",
    "exampleTranslation": "It's nine-thirty.",
    "audioCue": "The 'v' is soft, sounding like 'b'.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  },
  {
    "word": "diez",
    "meaning": "ten",
    "pronunciation": "dyehss",
    "example": "Son las tres y diez.",
    "exampleTranslation": "It's 3:10.",
    "audioCue": "The 'z' sounds like 's'.",
    "levelIntroduced": "Pre-A1",
    "topic": "numbers"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'cero (SEH-roh)'
    }
  ],

  exercises: [
  {
    "id": "q6-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"zero\"?",
    "answer": "cero",
    "options": [
      "cero",
      "uno",
      "dos",
      "tres"
    ]
  },
  {
    "id": "q6-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"uno\" mean?",
    "answer": "one",
    "options": [
      "one",
      "zero",
      "two",
      "three"
    ]
  },
  {
    "id": "q6-fill-1",
    "type": "fill-blank",
    "prompt": "Las amo a las ___. (two)",
    "answer": "dos",
    "distractorPool": [
      "cero",
      "uno",
      "tres"
    ]
  },
  {
    "id": "q6-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "cero↔zero|uno↔one|dos↔two|tres↔three",
    "options": [
      "cero",
      "uno",
      "dos",
      "tres",
      "zero",
      "one",
      "two",
      "three"
    ]
  },
  {
    "id": "q6-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Son las tres y diez.",
    "answer": "It's 3:10.",
    "distractorPool": [
      "My account is at zero.",
      "Neither the one nor the other."
    ]
  },
  {
    "id": "q6-listen-1",
    "type": "listening",
    "prompt": "You hear: \"KWAH-troh\". Which word is it?",
    "answer": "cuatro",
    "options": [
      "cuatro",
      "cero",
      "uno",
      "dos"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
