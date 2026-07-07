// AUTO-GENERATED Pre-A1 Quest 12: "Pets and Farm Animals"
import type { Quest } from '../types';

export const preA1Quest12: Quest = {
  id: 'pre-a1-q12',
  title: 'Pets and Farm Animals',
  subtitle: 'Talk about domestic animals',
  estimatedMinutes: 6,
  topicFocus: ["animals"],

  storyLines: [
  "El perro es de Tom.",
  "Tom no es un gato.",
  "Él se cayó del caballo.",
  "De la vaca viene la leche.",
  "Cada oveja con su pareja.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "perro",
    "meaning": "dog",
    "pronunciation": "PEH-rroh",
    "example": "El perro es de Tom.",
    "exampleTranslation": "The dog is Tom's.",
    "audioCue": "The double 'rr' is rolled/trilled.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "gato",
    "meaning": "cat",
    "pronunciation": "GAH-toh",
    "example": "Tom no es un gato.",
    "exampleTranslation": "Tom isn't a cat.",
    "audioCue": "A single 't' — crisp, not like English.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "caballo",
    "meaning": "horse",
    "pronunciation": "kah-BAH-yoh",
    "example": "Él se cayó del caballo.",
    "exampleTranslation": "He fell off the horse.",
    "audioCue": "The double 'll' makes a 'y' sound.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "vaca",
    "meaning": "cow",
    "pronunciation": "BAH-kah",
    "example": "De la vaca viene la leche.",
    "exampleTranslation": "Milk comes from cows.",
    "audioCue": "The 'v' sounds exactly like 'b' in Spanish.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "oveja",
    "meaning": "sheep",
    "pronunciation": "oh-BEH-hah",
    "example": "Cada oveja con su pareja.",
    "exampleTranslation": "Birds of a feather flock together.",
    "audioCue": "The 'v' is soft like 'b'; 'j' is breathy.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "gallina",
    "meaning": "hen / chicken",
    "pronunciation": "gah-YEE-nah",
    "example": "Él atrapó a la gallina.",
    "exampleTranslation": "He caught the chicken.",
    "audioCue": "The double 'll' makes a 'y' sound.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "ratón",
    "meaning": "mouse",
    "pronunciation": "rah-TOHN",
    "example": "La niña tiene un ratón.",
    "exampleTranslation": "The girl has a mouse.",
    "audioCue": "Roll the starting 'r'; stress final 'o'.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "pájaro",
    "meaning": "bird",
    "pronunciation": "PAH-hah-roh",
    "example": "Él le apuntó al pájaro.",
    "exampleTranslation": "He aimed at the bird.",
    "audioCue": "Accent on the first 'á': PAH-hah-roh.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  },
  {
    "word": "animal",
    "meaning": "animal",
    "pronunciation": "ah-nee-MAHL",
    "example": "Un león es un animal.",
    "exampleTranslation": "A lion is an animal.",
    "audioCue": "Stress the final syllable: ah-nee-MAHL.",
    "levelIntroduced": "Pre-A1",
    "topic": "animals"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'perro (PEH-rroh)'
    }
  ],

  exercises: [
  {
    "id": "q12-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"dog\"?",
    "answer": "perro",
    "options": [
      "perro",
      "gato",
      "caballo",
      "vaca"
    ]
  },
  {
    "id": "q12-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"gato\" mean?",
    "answer": "cat",
    "options": [
      "cat",
      "dog",
      "horse",
      "cow"
    ]
  },
  {
    "id": "q12-fill-1",
    "type": "fill-blank",
    "prompt": "Él se cayó del ___. (horse)",
    "answer": "caballo",
    "distractorPool": [
      "perro",
      "gato",
      "vaca"
    ]
  },
  {
    "id": "q12-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "perro↔dog|gato↔cat|caballo↔horse|vaca↔cow",
    "options": [
      "perro",
      "gato",
      "caballo",
      "vaca",
      "dog",
      "cat",
      "horse",
      "cow"
    ]
  },
  {
    "id": "q12-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "De la vaca viene la leche.",
    "answer": "Milk comes from cows.",
    "distractorPool": [
      "The dog is Tom's.",
      "Tom isn't a cat."
    ]
  },
  {
    "id": "q12-listen-1",
    "type": "listening",
    "prompt": "You hear: \"oh-BEH-hah\". Which word is it?",
    "answer": "oveja",
    "options": [
      "oveja",
      "perro",
      "gato",
      "caballo"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
