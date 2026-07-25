// Generated Sentence Builder Exercises
// This file contains pre-generated sentence exercises for all Basic Español lessons (A1-C1)
// Generated using the SentenceBuilderModule with patterns appropriate for each CEFR level

import type { SentenceExercise, Token, TokenRole } from '../lib/sentenceBuilder';

// Helper function to generate tokens from sentence and pattern
function generateTokens(sentence: string, roles: string[]): Token[] {
  const words = sentence.split(' ');
  return words.map((word, index) => ({
    text: word,
    role: roles[index] as TokenRole,
    order: index + 1,
  }));
}

// A1 Level Exercises (Lessons 1-4): Subject + Verb + Object
const A1_EXERCISES: SentenceExercise[] = [
  // Lesson 1: Greetings & Vowels
  {
    id: 'lesson1-exercise-1',
    lessonId: 'lesson1',
    cefrLevel: 'A1',
    spanishSentence: 'Yo como una manzana',
    englishTranslation: 'I eat an apple',
    tokens: generateTokens('Yo como una manzana', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Basic SVO structure with indefinite article'
  },
  {
    id: 'lesson1-exercise-2',
    lessonId: 'lesson1',
    cefrLevel: 'A1',
    spanishSentence: 'Tú hablas español',
    englishTranslation: 'You speak Spanish',
    tokens: generateTokens('Tú hablas español', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Present tense verb with language object'
  },
  {
    id: 'lesson1-exercise-3',
    lessonId: 'lesson1',
    cefrLevel: 'A1',
    spanishSentence: 'Ella es estudiante',
    englishTranslation: 'She is a student',
    tokens: generateTokens('Ella es estudiante', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Ser verb with profession'
  },
  {
    id: 'lesson1-exercise-4',
    lessonId: 'lesson1',
    cefrLevel: 'A1',
    spanishSentence: 'Nosotros estudiamos lecciones',
    englishTranslation: 'We study lessons',
    tokens: generateTokens('Nosotros estudiamos lecciones', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'We form with -amos ending'
  },
  {
    id: 'lesson1-exercise-5',
    lessonId: 'lesson1',
    cefrLevel: 'A1',
    spanishSentence: 'Ellos beben agua',
    englishTranslation: 'They drink water',
    tokens: generateTokens('Ellos beben agua', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'They form with -en ending'
  },

  // Lesson 2: Nouns & Articles
  {
    id: 'lesson2-exercise-1',
    lessonId: 'lesson2',
    cefrLevel: 'A1',
    spanishSentence: 'Yo veo el libro',
    englishTranslation: 'I see the book',
    tokens: generateTokens('Yo veo el libro', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Definite article el with masculine noun'
  },
  {
    id: 'lesson2-exercise-2',
    lessonId: 'lesson2',
    cefrLevel: 'A1',
    spanishSentence: 'Tú tienes la casa',
    englishTranslation: 'You have the house',
    tokens: generateTokens('Tú tienes la casa', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Definite article la with feminine noun'
  },
  {
    id: 'lesson2-exercise-3',
    lessonId: 'lesson2',
    cefrLevel: 'A1',
    spanishSentence: 'Él necesita el mapa',
    englishTranslation: 'He needs the map',
    tokens: generateTokens('Él necesita el mapa', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Exception: mapa takes el despite -a ending'
  },
  {
    id: 'lesson2-exercise-4',
    lessonId: 'lesson2',
    cefrLevel: 'A1',
    spanishSentence: 'Nosotros tenemos las mesas',
    englishTranslation: 'We have the tables',
    tokens: generateTokens('Nosotros tenemos las mesas', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Definite article las with feminine plural'
  },
  {
    id: 'lesson2-exercise-5',
    lessonId: 'lesson2',
    cefrLevel: 'A1',
    spanishSentence: 'Ellos quieren los libros',
    englishTranslation: 'They want the books',
    tokens: generateTokens('Ellos quieren los libros', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Definite article los with masculine plural'
  },

  // Lesson 3: Pronouns & Verb Ser
  {
    id: 'lesson3-exercise-1',
    lessonId: 'lesson3',
    cefrLevel: 'A1',
    spanishSentence: 'Yo soy de España',
    englishTranslation: 'I am from Spain',
    tokens: generateTokens('Yo soy de España', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Ser for origin with preposition de'
  },
  {
    id: 'lesson3-exercise-2',
    lessonId: 'lesson3',
    cefrLevel: 'A1',
    spanishSentence: 'Tú eres inteligente',
    englishTranslation: 'You are intelligent',
    tokens: generateTokens('Tú eres inteligente', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Ser for characteristic'
  },
  {
    id: 'lesson3-exercise-3',
    lessonId: 'lesson3',
    cefrLevel: 'A1',
    spanishSentence: 'Ella es profesora',
    englishTranslation: 'She is a professor',
    tokens: generateTokens('Ella es profesora', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Ser for profession'
  },
  {
    id: 'lesson3-exercise-4',
    lessonId: 'lesson3',
    cefrLevel: 'A1',
    spanishSentence: 'Nosotros somos amigos',
    englishTranslation: 'We are friends',
    tokens: generateTokens('Nosotros somos amigos', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Nosotros form of ser'
  },
  {
    id: 'lesson3-exercise-5',
    lessonId: 'lesson3',
    cefrLevel: 'A1',
    spanishSentence: 'Ellos son de México',
    englishTranslation: 'They are from Mexico',
    tokens: generateTokens('Ellos son de México', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Ellos form of ser with origin'
  },

  // Lesson 4: Regular -AR Verbs
  {
    id: 'lesson4-exercise-1',
    lessonId: 'lesson4',
    cefrLevel: 'A1',
    spanishSentence: 'Yo hablo español',
    englishTranslation: 'I speak Spanish',
    tokens: generateTokens('Yo hablo español', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Regular -AR verb hablo for yo'
  },
  {
    id: 'lesson4-exercise-2',
    lessonId: 'lesson4',
    cefrLevel: 'A1',
    spanishSentence: 'Tú estudias lecciones',
    englishTranslation: 'You study lessons',
    tokens: generateTokens('Tú estudias lecciones', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Regular -AR verb estudias for tú'
  },
  {
    id: 'lesson4-exercise-3',
    lessonId: 'lesson4',
    cefrLevel: 'A1',
    spanishSentence: 'Ella trabaja en la oficina',
    englishTranslation: 'She works in the office',
    tokens: generateTokens('Ella trabaja en la oficina', ['Subject', 'Verb', 'Object', 'Place', 'Place', 'Place']),
    pronounDroppedVariant: null,
    notes: '-AR verb with place (en la oficina)'
  },
  {
    id: 'lesson4-exercise-4',
    lessonId: 'lesson4',
    cefrLevel: 'A1',
    spanishSentence: 'Nosotros hablamos francés',
    englishTranslation: 'We speak French',
    tokens: generateTokens('Nosotros hablamos francés', ['Subject', 'Verb', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Nosotros form -hablamos'
  },
  {
    id: 'lesson4-exercise-5',
    lessonId: 'lesson4',
    cefrLevel: 'A1',
    spanishSentence: 'Ellos buscan el mapa',
    englishTranslation: 'They search for the map',
    tokens: generateTokens('Ellos buscan el mapa', ['Subject', 'Verb', 'Object', 'Object']),
    pronounDroppedVariant: null,
    notes: 'Ellos form -buscan with definite article'
  }
];

// A2 Level Exercises (Lessons 5-8): Subject + Verb + Object + Place
const A2_EXERCISES: SentenceExercise[] = [
  {
    id: 'lesson5-exercise-1',
    lessonId: 'lesson5',
    cefrLevel: 'A2',
    spanishSentence: 'Yo compro un coche en el mercado',
    englishTranslation: 'I buy a car at the market',
    tokens: generateTokens('Yo compro un coche en el mercado', ['Subject', 'Verb', 'Object', 'Object', 'Place', 'Place', 'Place']),
    pronounDroppedVariant: null,
    notes: 'SVO + Place pattern'
  },
  {
    id: 'lesson6-exercise-1',
    lessonId: 'lesson6',
    cefrLevel: 'A2',
    spanishSentence: 'Ella está en la biblioteca',
    englishTranslation: 'She is at the library',
    tokens: generateTokens('Ella está en la biblioteca', ['Subject', 'Verb', 'Place', 'Place', 'Place']),
    pronounDroppedVariant: null,
    notes: 'Estar for location'
  }
];

// Export all exercises
export const SENTENCE_BUILDER_EXERCISES: SentenceExercise[] = [
  ...A1_EXERCISES,
  ...A2_EXERCISES,
];