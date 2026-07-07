// AUTO-GENERATED Pre-A1 Quest 10: "My Close Family"
import type { Quest } from '../types';

export const preA1Quest10: Quest = {
  id: 'pre-a1-q10',
  title: 'My Close Family',
  subtitle: 'Name parents and siblings',
  estimatedMinutes: 6,
  topicFocus: ["family"],

  storyLines: [
  "Él no es mi padre.",
  "Yo amo a mi madre.",
  "Mi papá me lo dio.",
  "Se lo di a mi mamá.",
  "Es el de mi hermano.",
  "¡Hola! Vamos a practicar."
],

  vocabulary: [
  {
    "word": "padre",
    "meaning": "father",
    "pronunciation": "PAH-dreh",
    "example": "Él no es mi padre.",
    "exampleTranslation": "He's not my father.",
    "audioCue": "Stress the first syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "madre",
    "meaning": "mother",
    "pronunciation": "MAH-dreh",
    "example": "Yo amo a mi madre.",
    "exampleTranslation": "I love my mother.",
    "audioCue": "Stress the first syllable.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "papá",
    "meaning": "dad / father",
    "pronunciation": "pah-PAH",
    "example": "Mi papá me lo dio.",
    "exampleTranslation": "My dad gave it to me.",
    "audioCue": "Accent on the final syllable: pah-PAH.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "mamá",
    "meaning": "mom / mother",
    "pronunciation": "mah-MAH",
    "example": "Se lo di a mi mamá.",
    "exampleTranslation": "I gave it to my mommy.",
    "audioCue": "Accent on the final syllable: mah-MAH.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "hermano",
    "meaning": "brother",
    "pronunciation": "ehr-MAH-noh",
    "example": "Es el de mi hermano.",
    "exampleTranslation": "It's my brother's.",
    "audioCue": "The 'h' is silent.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "hermana",
    "meaning": "sister",
    "pronunciation": "ehr-MAH-nah",
    "example": "Vi allí a mi hermana.",
    "exampleTranslation": "I saw my sister there.",
    "audioCue": "The 'h' is silent.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "hijo",
    "meaning": "son",
    "pronunciation": "EE-hoh",
    "example": "Tom no es mi hijo.",
    "exampleTranslation": "Tom isn't my son.",
    "audioCue": "The 'h' is silent; 'j' is breathy.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "hija",
    "meaning": "daughter",
    "pronunciation": "EE-hah",
    "example": "Yo no soy tu hija.",
    "exampleTranslation": "I'm not your daughter.",
    "audioCue": "The 'h' is silent; 'j' is breathy.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  },
  {
    "word": "familia",
    "meaning": "family",
    "pronunciation": "fah-MEE-lyah",
    "example": "Lo leí a mi familia.",
    "exampleTranslation": "I read it to my family.",
    "audioCue": "The 'li' glides into a 'y' sound.",
    "levelIntroduced": "Pre-A1",
    "topic": "family"
  }
],

  grammarNotes: [
    {
      title: 'Pronunciation and Stress',
      explanation: 'Listen closely to the audio cues for syllable emphasis.',
      exampleFromStory: 'padre (PAH-dreh)'
    }
  ],

  exercises: [
  {
    "id": "q10-mc-1",
    "type": "multiple-choice",
    "prompt": "How do you say \"father\"?",
    "answer": "padre",
    "options": [
      "padre",
      "madre",
      "papá",
      "mamá"
    ]
  },
  {
    "id": "q10-mc-2",
    "type": "multiple-choice",
    "prompt": "What does \"madre\" mean?",
    "answer": "mother",
    "options": [
      "mother",
      "father",
      "dad / father",
      "mom / mother"
    ]
  },
  {
    "id": "q10-fill-1",
    "type": "fill-blank",
    "prompt": "Mi ___ me lo dio. (dad / father)",
    "answer": "papá",
    "distractorPool": [
      "padre",
      "madre",
      "mamá"
    ]
  },
  {
    "id": "q10-match-1",
    "type": "match",
    "prompt": "Match the words to their meanings",
    "answer": "padre↔father|madre↔mother|papá↔dad / father|mamá↔mom / mother",
    "options": [
      "padre",
      "madre",
      "papá",
      "mamá",
      "father",
      "mother",
      "dad / father",
      "mom / mother"
    ]
  },
  {
    "id": "q10-tr-1",
    "type": "translation",
    "direction": "es-en",
    "prompt": "Se lo di a mi mamá.",
    "answer": "I gave it to my mommy.",
    "distractorPool": [
      "He's not my father.",
      "I love my mother."
    ]
  },
  {
    "id": "q10-listen-1",
    "type": "listening",
    "prompt": "You hear: \"ehr-MAH-noh\". Which word is it?",
    "answer": "hermano",
    "options": [
      "hermano",
      "padre",
      "madre",
      "papá"
    ]
  }
],

  rewards: { xp: 40, coins: 10 }
};
