// AUTO-GENERATED Pre-A1 Quest 9: "Cool Colors"
import type { Quest } from '../types';

export const preA1Quest9: Quest = {
  id: 'pre-a1-q9',
  title: 'Cool Colors',
  subtitle: 'Describe cool-colored objects',
  estimatedMinutes: 6,
  topicFocus: ["colors"],

  storyLines: [
  "Esa es una casa azul.",
  "Me gusta el té verde.",
  "Tom tiene un ojo morado.",
  "Hoy el día está gris.",
  "¿De qué color es esto?",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "azul",
    "meaning": "blue",
    "pronunciation": "ah-SOOL",
    "example": "Esa es una casa azul.",
    "exampleTranslation": "That's a blue house.",
    "audioCue": "Stress the last syllable: ah-SOOL.",
    "levelIntroduced": "Pre-A1",
    "topic": "colors"
  },
  {
    "word": "verde",
    "meaning": "green",
    "pronunciation": "BEHR-deh",
    "example": "Me gusta el té verde.",
    "exampleTranslation": "I like green tea.",
    "audioCue": "The 'v' sounds close to a soft 'b'.",
    "levelIntroduced": "Pre-A1",
    "topic": "colors"
  },
  {
    "word": "morado",
    "meaning": "purple",
    "pronunciation": "moh-RAH-doh",
    "example": "Tom tiene un ojo morado.",
    "exampleTranslation": "Tom has a black eye.",
    "audioCue": "Stress the middle syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "colors"
  },
  {
    "word": "gris",
    "meaning": "gray",
    "pronunciation": "greess",
    "example": "Hoy el día está gris.",
    "exampleTranslation": "Today, it's gray outside.",
    "audioCue": "One short syllable: greess.",
    "levelIntroduced": "Pre-A1",
    "topic": "colors"
  },
  {
    "word": "color",
    "meaning": "color",
    "pronunciation": "koh-LOHR",
    "example": "¿De qué color es esto?",
    "exampleTranslation": "What color is this?",
    "audioCue": "Stress the last syllable: koh-LOHR.",
    "levelIntroduced": "Pre-A1",
    "topic": "colors"
  },
  {
    "word": "colores",
    "meaning": "colors",
    "pronunciation": "koh-LOH-rehs",
    "example": "El sol destiñe los colores.",
    "exampleTranslation": "The sun fades colors.",
    "audioCue": "Stress the middle syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "colors"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'azul (ah-SOOL)'
    }
  ],

  exercises: [
  {
    "id": "q9-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"blue\"?",
    "answer": "azul",
    "options": [
      "azul",
      "verde",
      "morado",
      "gris"
    ]
  },
  {
    "id": "q9-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"verde\" mean?",
    "answer": "green",
    "options": [
      "green",
      "blue",
      "purple",
      "gray"
    ]
  },
  {
    "id": "q9-fill-1",
    "type": "fill-blank",
    "prompt": "Tom tiene un ojo ___. (purple)",
    "answer": "morado",
    "distractorPool": [
      "azul",
      "verde",
      "gris"
    ]
  },
  {
    "id": "q9-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "azul↔blue|verde↔green|morado↔purple|gris↔gray",
    "options": [
      "azul",
      "verde",
      "morado",
      "gris",
      "blue",
      "green",
      "purple",
      "gray"
    ]
  },
  {
    "id": "q9-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Hoy el día está gris.",
    "answer": "Today, it's gray outside.",
    "distractorPool": [
      "That's a blue house.",
      "I like green tea."
    ]
  },
  {
    "id": "q9-listen-1",
    "type": "listening",
    "prompt": "You hear: \"koh-LOHR\". Which word is it?",
    "answer": "color",
    "options": [
      "color",
      "azul",
      "verde",
      "morado"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
