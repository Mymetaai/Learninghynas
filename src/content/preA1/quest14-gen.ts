// AUTO-GENERATED Pre-A1 Quest 14: "Inside the Classroom"
import type { Quest } from '../types';

export const preA1Quest14: Quest = {
  id: 'pre-a1-q14',
  title: 'Inside the Classroom',
  subtitle: 'Name common school items',
  estimatedMinutes: 6,
  topicFocus: ["classroom-objects"],

  storyLines: [
  "Ese no es tu libro.",
  "Se te cayó el lápiz.",
  "Ese no es mi bolígrafo.",
  "Se le acabó el papel.",
  "Hay algo en la mesa.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "libro",
    "meaning": "book",
    "pronunciation": "LEE-broh",
    "example": "Ese no es tu libro.",
    "exampleTranslation": "That isn't your book.",
    "audioCue": "Stress the first syllable: LEE-broh.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "lápiz",
    "meaning": "pencil",
    "pronunciation": "LAH-pees",
    "example": "Se te cayó el lápiz.",
    "exampleTranslation": "You dropped your pencil.",
    "audioCue": "Accent on the 'á'; 'z' sounds like 's'.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "bolígrafo",
    "meaning": "bolígrafo",
    "pronunciation": "BOLÍGRAFO",
    "example": "Ese no es mi bolígrafo.",
    "exampleTranslation": "That is not my pen.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "papel",
    "meaning": "papel",
    "pronunciation": "PAPEL",
    "example": "Se le acabó el papel.",
    "exampleTranslation": "She ran out of paper.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "mesa",
    "meaning": "table",
    "pronunciation": "MEH-sah",
    "example": "Hay algo en la mesa.",
    "exampleTranslation": "There's something on the table.",
    "audioCue": "Stress the first syllable: MEH-sah.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "silla",
    "meaning": "chair",
    "pronunciation": "SEE-yah",
    "example": "Se sentó en la silla.",
    "exampleTranslation": "He sat in the chair.",
    "audioCue": "The double 'll' makes a 'y' sound.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "escuela",
    "meaning": "escuela",
    "pronunciation": "ESCUELA",
    "example": "Tom va a la escuela.",
    "exampleTranslation": "Tom goes to school.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "profesor",
    "meaning": "profesor",
    "pronunciation": "PROFESOR",
    "example": "Ya no soy tu profesor.",
    "exampleTranslation": "I'm not your teacher anymore.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  },
  {
    "word": "clase",
    "meaning": "clase",
    "pronunciation": "CLASE",
    "example": "Voy a ir a clase.",
    "exampleTranslation": "I'll go to class.",
    "audioCue": "Stress is on the phonetic syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "classroom-objects"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'libro (LEE-broh)'
    }
  ],

  exercises: [
  {
    "id": "q14-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"book\"?",
    "answer": "libro",
    "options": [
      "libro",
      "lápiz",
      "bolígrafo",
      "papel"
    ]
  },
  {
    "id": "q14-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"lápiz\" mean?",
    "answer": "pencil",
    "options": [
      "pencil",
      "book",
      "bolígrafo",
      "papel"
    ]
  },
  {
    "id": "q14-fill-1",
    "type": "fill-blank",
    "prompt": "Ese no es mi ___. (bolígrafo)",
    "answer": "bolígrafo",
    "distractorPool": [
      "libro",
      "lápiz",
      "papel"
    ]
  },
  {
    "id": "q14-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "libro↔book|lápiz↔pencil|bolígrafo↔bolígrafo|papel↔papel",
    "options": [
      "libro",
      "lápiz",
      "bolígrafo",
      "papel",
      "book",
      "pencil",
      "bolígrafo",
      "papel"
    ]
  },
  {
    "id": "q14-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Se le acabó el papel.",
    "answer": "She ran out of paper.",
    "distractorPool": [
      "That isn't your book.",
      "You dropped your pencil."
    ]
  },
  {
    "id": "q14-listen-1",
    "type": "listening",
    "prompt": "You hear: \"MEH-sah\". Which word is it?",
    "answer": "mesa",
    "options": [
      "mesa",
      "libro",
      "lápiz",
      "bolígrafo"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
