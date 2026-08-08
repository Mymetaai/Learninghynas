import { useState, useMemo, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Sparkles,
  Award,
  Layers,
  Users,
  Compass,
  Menu,
  X,
  Check,
  Trophy,
  GraduationCap,
  BookOpenCheck,
  Clock,
  Calendar,
  Zap,
  Shield,
  Star,
  Crown,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Quote,
  Target,
  FileText
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';
import { ALL_SYLLABUS_LESSONS, type SyllabusLessonData } from '../data/syllabusLessonsData';
import SentenceBuilderExercise from '../components/SentenceBuilderExercise';
import { generateLessonExercises, getCEFRLevel } from '../lib/sentenceBuilder';
import { SENTENCE_BUILDER_EXERCISES } from '../data/sentenceBuilderExercises';
import SpotlightCards from '../components/SpotlightCards';

// Types
export type CoursePart = 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'part6' | 'part7' | 'part8';
export type ActiveSection =
  | 'overview'
  | 'lesson1' | 'lesson2' | 'lesson3' | 'lesson4' | 'exam'
  | 'lesson5' | 'lesson6' | 'lesson7' | 'lesson8' | 'exam2'
  | 'lesson9' | 'lesson10' | 'lesson11' | 'lesson12' | 'exam3'
  | 'lesson13' | 'lesson14' | 'lesson15' | 'lesson16' | 'exam4'
  | 'lesson17' | 'lesson18' | 'lesson19' | 'lesson20' | 'lesson21' | 'exam5'
  | 'lesson22' | 'lesson23' | 'lesson24' | 'lesson25' | 'lesson26' | 'exam6'
  | 'lesson27' | 'lesson28' | 'lesson29' | 'lesson30' | 'exam7'
  | 'lesson31' | 'lesson32' | 'lesson33' | 'lesson34' | 'lesson35' | 'lesson36' | 'lesson37' | 'exam8';

interface ExamQuestion {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const PART_OPTIONS: { id: CoursePart; label: string; desc: string }[] = [
  { id: 'part1', label: 'Part 1: Greetings & -AR Verbs', desc: 'Pronunciation, Articles, SER & -AR Verbs' },
  { id: 'part2', label: 'Part 2: Estar, Ir & Numbers', desc: 'Indefinite Articles, ESTAR, -ER/-IR Verbs & IR' },
  { id: 'part3', label: 'Part 3: Dates, Time, Tener & Hacer', desc: 'Calendar, Telling Time, Tener Idioms & Weather' },
  { id: 'part4', label: 'Part 4: Stem Changers & Progressive', desc: 'Boot Verbs, Yo-Go Verbs & Present Progressive' },
  { id: 'part5', label: 'Part 5: Pronouns & Affirmatives', desc: 'Possessives, Demonstratives, DOPs, IOPs & Gustar' },
  { id: 'part6', label: 'Part 6: Double Objects & Preterite', desc: 'Double Objects, Reflexives, Commands & Preterite' },
  { id: 'part7', label: 'Part 7: Imperfect & Comparisons', desc: 'Imperfect Tense, Preterite vs Imperfect & Superlatives' },
  { id: 'part8', label: 'Part 8: C1 Advanced Mastery', desc: 'Idioms, Register Shifts, Academic Debate, Subjunctive & Regional Variants' },
];

const PART_BADGES: Record<CoursePart, { title: string; badge: string; xp: number; coins: number }> = {
  part1: { title: 'Part 1 Master', badge: 'Dominio de Fundamentos 🏅', xp: 100, coins: 50 },
  part2: { title: 'Part 2 Master', badge: 'Explorador de Verbos 🏅', xp: 120, coins: 60 },
  part3: { title: 'Part 3 Master', badge: 'Maestro del Tiempo 🏅', xp: 140, coins: 70 },
  part4: { title: 'Part 4 Master', badge: 'Maestro del Presente 🏅', xp: 180, coins: 80 },
  part5: { title: 'Part 5 Master', badge: 'Afirmativo y Objetos 🎖️', xp: 200, coins: 85 },
  part6: { title: 'Part 6 Master', badge: 'Comandante del Pasado 🎖️', xp: 220, coins: 90 },
  part7: { title: 'Part 7 Master', badge: 'Maestro Comparativo 🏆', xp: 250, coins: 100 },
  part8: { title: 'Part 8 Master', badge: 'Gran Maestro C1 👑', xp: 300, coins: 150 },
};

// Master Exams (Parts 1 - 7)
const EXAM_QUESTIONS_PART1: ExamQuestion[] = [
  { id: 1, lessonId: 1, question: 'Which Spanish vowel is pronounced like the "ee" in the English word "machine"?', options: ['A', 'E', 'I', 'O', 'U'], correctAnswer: 'I', explanation: 'The letter "I" in Spanish represents a pure "ee" sound.' },
  { id: 2, lessonId: 1, question: 'Which phrase is the standard way to say "Good afternoon" in Spanish?', options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'], correctAnswer: 'Buenas tardes', explanation: '"Buenas tardes" means "Good afternoon" and is used from noon until dark.' },
  { id: 3, lessonId: 2, question: 'The noun "mapa" (map) ends in "-a". What is its correct definite article?', options: ['el', 'la', 'los', 'las'], correctAnswer: 'el', explanation: '"El mapa" is a masculine exception noun.' },
  { id: 4, lessonId: 2, question: 'According to the stressed "a" rule, what is the correct singular and plural form for "water"?', options: ['la agua / las aguas', 'el agua / los aguas', 'el agua / las aguas', 'la agua / los aguas'], correctAnswer: 'el agua / las aguas', explanation: 'Feminine singular nouns starting with stressed "a" use "el", but remain feminine in plural.' },
  { id: 5, lessonId: 3, question: 'If you refer to a mixed group of 10 girls and 1 boy as "they", which pronoun is correct?', options: ['ellas', 'ellos', 'nosotros', 'nosotras'], correctAnswer: 'ellos', explanation: 'Any mixed-gender group uses the masculine plural subject pronoun ("ellos").' },
  { id: 6, lessonId: 3, question: 'Choose the correct conjugation of "ser": "Tú y yo ___ de España."', options: ['soy', 'eres', 'es', 'somos'], correctAnswer: 'somos', explanation: '"Tú y yo" is equivalent to "we" (nosotros), which conjugates to "somos".' },
  { id: 7, lessonId: 4, question: 'What is the correct conjugation of the regular "-ar" verb "hablar" for "tú"?', options: ['hablo', 'hablas', 'habla', 'hablamos'], correctAnswer: 'hablas', explanation: 'Regular "-ar" verbs add "-as" for "tú": hablas.' },
  { id: 8, lessonId: 4, question: 'Which translates "the Spanish universities" correctly? (universidad = fem)', options: ['las universidad españolas', 'las universidades españolas', 'los universidades españoles', 'las universidades español'], correctAnswer: 'las universidades españolas', explanation: '"Universidad" is feminine plural: las universidades españolas.' }
];

const EXAM_QUESTIONS_PART2: ExamQuestion[] = [
  { id: 1, lessonId: 5, question: 'Which is the correct indefinite article for "chicas" (girls)?', options: ['un', 'una', 'unos', 'unas'], correctAnswer: 'unas', explanation: '"Chicas" is feminine plural, requiring "unas".' },
  { id: 2, lessonId: 5, question: 'What is the Spanish word for the number 35?', options: ['treinta cinco', 'treinta y cinco', 'veinticinco', 'cuarenta y cinco'], correctAnswer: 'treinta y cinco', explanation: 'Numbers 31-99 use "tens + y + units".' },
  { id: 3, lessonId: 6, question: 'What is the correct conjugation of the verb "estar" for "nosotros" (we)?', options: ['estoy', 'estás', 'está', 'estamos'], correctAnswer: 'estamos', explanation: 'Conjugation of "estar" for "nosotros" is "estamos".' },
  { id: 4, lessonId: 6, question: 'Which acronym summarizes when you MUST use ESTAR instead of SER?', options: ['DOCTOR', 'PLACE', 'SNACKS', 'MARCH'], correctAnswer: 'PLACE', explanation: 'PLACE = Position, Location, Action, Condition, Emotion.' },
  { id: 5, lessonId: 6, question: 'What is the Spanish word for 500?', options: ['cincocientos', 'quinientos', 'doscientos', 'cincuenta'], correctAnswer: 'quinientos', explanation: '500 is irregular in Spanish: quinientos.' },
  { id: 6, lessonId: 7, question: 'How do you conjugate regular "-er" verb "comer" for "nosotros"?', options: ['comemos', 'comimos', 'comen', 'como'], correctAnswer: 'comemos', explanation: 'Regular "-er" verbs take "-emos" for nosotros.' },
  { id: 7, lessonId: 7, question: 'What is the "tú" conjugation for regular "-ir" verb "escribir"?', options: ['escribo', 'escribes', 'escribe', 'escribimos'], correctAnswer: 'escribes', explanation: 'Regular "-ir" verbs take "-es" for tú.' },
  { id: 8, lessonId: 8, question: 'What is the "yo" conjugation for irregular verb "ir" (to go)?', options: ['ir', 'va', 'voy', 'vamos'], correctAnswer: 'voy', explanation: '"yo voy" means I go / I am going.' },
  { id: 9, lessonId: 8, question: 'How do you form the near-future in Spanish?', options: ['ir + infinitive', 'ir + a + infinitive', 'estar + a + infinitive', 'ser + infinitive'], correctAnswer: 'ir + a + infinitive', explanation: 'Near-future is ir + a + infinitive (e.g. vamos a estudiar).' },
  { id: 10, lessonId: 8, question: 'Which Spanish question word means "Where to"?', options: ['¿Dónde?', '¿Adónde?', '¿Cuándo?', '¿Por qué?'], correctAnswer: '¿Adónde?', explanation: '¿Adónde? means "where to" (destination).' }
];

const EXAM_QUESTIONS_PART3: ExamQuestion[] = [
  { id: 1, lessonId: 9, question: 'How do you say "It is 1:15" in Spanish?', options: ['Son las una y cuarto', 'Es la una y cuarto', 'Son las dos menos cuarto', 'Es la una y media'], correctAnswer: 'Es la una y cuarto', explanation: '1:00 uses "Es la" plus "y cuarto" for 15 mins.' },
  { id: 2, lessonId: 9, question: 'Which is the correct way to write "May 5th" in Spanish?', options: ['el 5 de Mayo', 'el cinco de mayo', 'el quinto de mayo', 'el mayo 5'], correctAnswer: 'el cinco de mayo', explanation: 'Dates use cardinal numbers and lowercase months: el 5 de mayo.' },
  { id: 3, lessonId: 10, question: 'How do you express "I am very hungry" in Spanish?', options: ['Estoy muy hambre', 'Tengo mucha hambre', 'Tengo muy hambre', 'Soy mucha hambre'], correctAnswer: 'Tengo mucha hambre', explanation: 'Tener idioms take noun modifiers: tener mucha hambre.' },
  { id: 4, lessonId: 10, question: 'What does "tener ganas de + infinitive" express?', options: ['External obligation', 'Physical illness', 'Desire or inclination', 'Telling time'], correctAnswer: 'Desire or inclination', explanation: '"Tener ganas de" means to feel like doing something.' },
  { id: 5, lessonId: 11, question: 'Which verb is used to say "It is cold weather outside"?', options: ['Hace frío', 'Está frío', 'Tiene frío', 'Es frío'], correctAnswer: 'Hace frío', explanation: 'Weather conditions use impersonal hacer: Hace frío.' },
  { id: 6, lessonId: 11, question: 'What is the "yo" form of the verb "hacer"?', options: ['haco', 'hago', 'hace', 'haco-go'], correctAnswer: 'hago', explanation: 'Hacer has an irregular yo-go form: hago.' },
  { id: 7, lessonId: 12, question: 'Which verb should be used for knowing a person or place?', options: ['saber', 'conocer', 'entender', 'poder'], correctAnswer: 'conocer', explanation: 'Conocer is used for familiarity with people, places, or complex things.' },
  { id: 8, lessonId: 12, question: 'When is the "personal a" required?', options: ['Before any object', 'Before a specific person as direct object', 'After verbs of motion only', 'Before all verbs'], correctAnswer: 'Before a specific person as direct object', explanation: 'Personal "a" precedes specific human direct objects (e.g. Conozco a María).' },
  { id: 9, lessonId: 12, question: 'What is the "yo" form of "saber"?', options: ['sabo', 'sé', 'sabe', 'conozco'], correctAnswer: 'sé', explanation: 'Saber has an irregular yo form: sé.' },
  { id: 10, lessonId: 11, question: 'Which question word is used when asking for specific selection or phone number?', options: ['¿Qué es tu número?', '¿Cuál es tu número?', '¿Cómo es tu número?', '¿Dónde es tu número?'], correctAnswer: '¿Cuál es tu número?', explanation: '¿Cuál? is used to request specific identifying information.' }
];

const EXAM_QUESTIONS_PART4: ExamQuestion[] = [
  { id: 1, lessonId: 13, question: 'Which stem change category does "querer" belong to in the present tense?', options: ['e -> i', 'o -> ue', 'e -> ie', 'u -> ue'], correctAnswer: 'e -> ie', explanation: 'Querer changes e -> ie (quiero, quieres, quiere, quieren).' },
  { id: 2, lessonId: 13, question: 'Which forms DO NOT undergo stem change in present boot verbs?', options: ['yo and tú', 'nosotros and vosotros', 'él and ellos', 'tú and usted'], correctAnswer: 'nosotros and vosotros', explanation: 'Stem changes occur in all forms EXCEPT nosotros and vosotros.' },
  { id: 3, lessonId: 14, question: 'What is the "yo" form of "poner"?', options: ['pono', 'pongo', 'poni', 'puegno'], correctAnswer: 'pongo', explanation: 'Poner is a Yo-Go verb: pongo.' },
  { id: 4, lessonId: 14, question: 'What is the "yo" form of "salir"?', options: ['salo', 'salgo', 'sale', 'saligo'], correctAnswer: 'salgo', explanation: 'Salir is a Yo-Go verb: salgo.' },
  { id: 5, lessonId: 15, question: 'How is the present progressive tense formed in Spanish?', options: ['ser + gerundio', 'estar + gerundio', 'ir + gerundio', 'haber + gerundio'], correctAnswer: 'estar + gerundio', explanation: 'Present progressive is formed with estar + gerundio (-ando / -iendo).' },
  { id: 6, lessonId: 15, question: 'What is the irregular gerund of "leer"?', options: ['leiendo', 'leyendo', 'leando', 'leido'], correctAnswer: 'leyendo', explanation: 'Vowel-ending roots take -yendo: leyendo, oyendo, trayendo.' },
  { id: 7, lessonId: 16, question: 'How do you say "I know how to swim" in Spanish?', options: ['Conozco nadar', 'Sé nadar', 'Puedo swimming', 'Tengo nadar'], correctAnswer: 'Sé nadar', explanation: 'Saber + infinitive expresses knowing how to perform a skill.' },
  { id: 8, lessonId: 16, question: 'Which preposition means "behind"?', options: ['delante de', 'detrás de', 'al lado de', 'cerca de'], correctAnswer: 'detrás de', explanation: 'Detrás de means behind.' },
  { id: 9, lessonId: 13, question: 'What is the "yo" form of "jugar" (u->ue)?', options: ['jugo', 'juego', 'jigo', 'juego-go'], correctAnswer: 'juego', explanation: 'Jugar is the only u->ue stem-changer: juego.' },
  { id: 10, lessonId: 14, question: 'What is the "yo" form of "traer"?', options: ['trao', 'traigo', 'trajo', 'trogo'], correctAnswer: 'traigo', explanation: 'Traer has the irregular yo form: traigo.' }
];

const EXAM_QUESTIONS_PART5: ExamQuestion[] = [
  { id: 1, lessonId: 17, question: 'Which possessive adjective form agrees in BOTH gender and number with the noun?', options: ['mi / mis', 'tu / tus', 'su / sus', 'nuestro / nuestra / nuestros / nuestras'], correctAnswer: 'nuestro / nuestra / nuestros / nuestras', explanation: 'Nuestro and vuestro agree in both gender and number.' },
  { id: 2, lessonId: 18, question: 'Which demonstrative refers to an object CLOSE to the speaker ("this")?', options: ['este / esta', 'ese / esa', 'aquel / aquella', 'mío / mía'], correctAnswer: 'este / esta', explanation: 'Este/esta means "this" (near speaker).' },
  { id: 3, lessonId: 18, question: 'Which demonstrative refers to an object FAR away from both speaker and listener ("that over there")?', options: ['este', 'ese', 'aquel', 'tuyo'], correctAnswer: 'aquel', explanation: 'Aquel/aquella means "that over there" (far distance).' },
  { id: 4, lessonId: 19, question: 'What is the opposite negative word for "alguien" (someone)?', options: ['nada', 'nadie', 'nunca', 'ninguno'], correctAnswer: 'nadie', explanation: 'Alguien (someone) <-> Nadie (no one).' },
  { id: 5, lessonId: 19, question: 'What is the opposite negative word for "algo" (something)?', options: ['nada', 'nadie', 'siempre', 'tampoco'], correctAnswer: 'nada', explanation: 'Algo (something) <-> Nada (nothing).' },
  { id: 6, lessonId: 20, question: 'Which direct object pronoun replaces masculine plural nouns like "libros"?', options: ['lo', 'la', 'los', 'las'], correctAnswer: 'los', explanation: 'Direct object pronoun for masculine plural is "los".' },
  { id: 7, lessonId: 20, question: 'Where are object pronouns placed relative to a single conjugated verb?', options: ['After the verb', 'BEFORE the conjugated verb', 'At the end of the sentence', 'Inside the verb stem'], correctAnswer: 'BEFORE the conjugated verb', explanation: 'Pronouns precede single conjugated verbs: Lo tengo.' },
  { id: 8, lessonId: 21, question: 'Which indirect object pronoun is used for "he / she / you (formal)"?', options: ['me', 'te', 'le', 'nos'], correctAnswer: 'le', explanation: 'Indirect object pronoun for 3rd person singular is "le".' },
  { id: 9, lessonId: 21, question: 'How do you say "I like books" (plural noun)?', options: ['Me gusta libros', 'Me gustan los libros', 'Yo gusto los libros', 'Me gustas libros'], correctAnswer: 'Me gustan los libros', explanation: 'Verbs like gustar match the plural subject: Me gustan los libros.' },
  { id: 10, lessonId: 21, question: 'Which verb means "to love / delight in" functioning like gustar?', options: ['encantar', 'querer', 'amar', 'preferir'], correctAnswer: 'encantar', explanation: 'Encantar functions like gustar (Me encanta / Me encantan).' }
];

const EXAM_QUESTIONS_PART6: ExamQuestion[] = [
  { id: 1, lessonId: 22, question: 'When indirect pronoun "le" comes before direct pronoun "lo", what does "le" change to?', options: ['me', 'te', 'se', 'nos'], correctAnswer: 'se', explanation: 'The "se la" rule: le/les changes to "se" before lo/la/los/las.' },
  { id: 2, lessonId: 22, question: 'How do you say "I give it to him" (book = lo, to him = le->se)?', options: ['Le lo doy', 'Se lo doy', 'Lo le doy', 'Se le doy'], correctAnswer: 'Se lo doy', explanation: 'Indirect "le" becomes "se" before direct "lo": Se lo doy.' },
  { id: 3, lessonId: 23, question: 'What is the reflexive pronoun for "nosotros"?', options: ['me', 'te', 'se', 'nos'], correctAnswer: 'nos', explanation: 'Reflexive pronouns: me, te, se, nos, os, se.' },
  { id: 4, lessonId: 23, question: 'What is the "yo" form of reflexive verb "lavarse" (to wash oneself)?', options: ['lavo', 'me lavo', 'se lavo', 'te lavo'], correctAnswer: 'me lavo', explanation: 'Reflexive actions require matching pronoun: Yo me lavo.' },
  { id: 5, lessonId: 24, question: 'What is the affirmative informal command (tú) for "hacer"?', options: ['hace', 'haz', 'haga', 'hazas'], correctAnswer: 'haz', explanation: 'Irregular tú command for hacer is "haz".' },
  { id: 6, lessonId: 24, question: 'What is the affirmative informal command (tú) for "poner"?', options: ['pone', 'pon', 'ponga', 'pones'], correctAnswer: 'pon', explanation: 'Irregular tú command for poner is "pon".' },
  { id: 7, lessonId: 25, question: 'What is the preterite ending for regular "-ar" verbs in the "yo" form?', options: ['-ó', '-é', '-í', '-aste'], correctAnswer: '-é', explanation: 'Regular "-ar" preterite yo ending is "-é" (hablé, hablé).' },
  { id: 8, lessonId: 25, question: 'What is the preterite ending for regular "-er/-ir" verbs in the "yo" form?', options: ['-é', '-í', '-ió', '-iste'], correctAnswer: '-í', explanation: 'Regular "-er/-ir" preterite yo ending is "-í" (comí, viví).' },
  { id: 9, lessonId: 26, question: 'What is the preterite form of "ir / ser" for "yo"?', options: ['iba', 'fui', 'fueron', 'estuve'], correctAnswer: 'fui', explanation: 'Ir and Ser share the preterite forms: fui, fuiste, fue, fuimos, fuisteis, fueron.' },
  { id: 10, lessonId: 26, question: 'What is the preterite "yo" form of "tener"?', options: ['tenía', 'tuve', 'tuviera', 'tení'], correctAnswer: 'tuve', explanation: 'Tener has irregular preterite stem tuv-: tuve.' }
];

const EXAM_QUESTIONS_PART7: ExamQuestion[] = [
  { id: 1, lessonId: 27, question: 'Which ending set belongs to regular "-ar" verbs in the imperfect tense?', options: ['-aba, -abas, -aba, -ábamos, -abais, -aban', '-ía, -ías, -ía, -íamos, -íais, -ían', '-é, -aste, -ó, -amos, -aron', '-o, -as, -a, -amos, -an'], correctAnswer: '-aba, -abas, -aba, -ábamos, -abais, -aban', explanation: 'Imperfect "-ar" verbs use the "-aba" endings.' },
  { id: 2, lessonId: 27, question: 'How many irregular verbs exist in the Spanish imperfect tense?', options: ['None', 'Only 3 (ser, ir, ver)', '12 verbs', 'Over 50 verbs'], correctAnswer: 'Only 3 (ser, ir, ver)', explanation: 'Only 3 verbs are irregular in imperfect: ser (era), ir (iba), ver (veía).' },
  { id: 3, lessonId: 28, question: 'Which tense is used for ongoing background descriptions and past habits?', options: ['Preterite Tense', 'Imperfect Tense', 'Present Progressive', 'Future Tense'], correctAnswer: 'Imperfect Tense', explanation: 'Imperfect sets background, age, weather, and habitual actions in the past.' },
  { id: 4, lessonId: 28, question: 'Which tense is used for specific, completed actions at a definite point in time?', options: ['Preterite Tense', 'Imperfect Tense', 'Present Tense', 'Conditional Tense'], correctAnswer: 'Preterite Tense', explanation: 'Preterite narrates completed past events.' },
  { id: 5, lessonId: 29, question: 'How do you form a comparison of equality for adjectives ("as... as")?', options: ['más... que', 'tan... como', 'tanto... que', 'menos... como'], correctAnswer: 'tan... como', explanation: 'Equal comparison for adjectives: tan + adjective + como.' },
  { id: 6, lessonId: 29, question: 'How do you form a comparison of inequality ("more... than")?', options: ['tan... como', 'más... que', 'menos... como', 'tanto... como'], correctAnswer: 'más... que', explanation: 'Inequality comparison: más + adjective/noun + que.' },
  { id: 7, lessonId: 30, question: 'What suffix is added to adjectives to form absolute superlatives ("extremely / super")?', options: ['-ísimo / -ísima', '-mente', '-ando', '-ción'], correctAnswer: '-ísimo / -ísima', explanation: 'Adding -ísimo/a creates absolute superlatives (altísimo = super tall).' },
  { id: 8, lessonId: 30, question: 'What is the irregular comparative form for "good" (bueno &rarr; better)?', options: ['más bueno', 'mejor', 'peor', 'mayor'], correctAnswer: 'mejor', explanation: 'Bueno becomes "mejor" (better).' },
  { id: 9, lessonId: 30, question: 'What is the irregular comparative form for "bad" (malo &rarr; worse)?', options: ['más malo', 'peor', 'menos malo', 'menor'], correctAnswer: 'peor', explanation: 'Malo becomes "peor" (worse).' },
  { id: 10, lessonId: 28, question: 'In the sentence "Cuando llovía (A), sonó el teléfono (B)", which verb is in the preterite?', options: ['llovía', 'sonó', 'Both A and B', 'Neither'], correctAnswer: 'sonó', explanation: 'Sonó (rang) is the interrupting completed event in preterite.' }
];

const EXAM_QUESTIONS_PART8: ExamQuestion[] = [
  { id: 1, lessonId: 31, question: 'What does the idiom "hacer borrón y cuenta nueva" mean?', options: ['To make a smudge on paper', 'To start fresh / turn over a new leaf', 'To count money twice', 'To cancel a contract'], correctAnswer: 'To start fresh / turn over a new leaf', explanation: '"Hacer borrón y cuenta nueva" means making a clean fresh start.' },
  { id: 2, lessonId: 31, question: 'What does the C1 idiom "dorar la píldora" express?', options: ['To take medicine', 'To sugarcoat unpleasant news', 'To paint gold', 'To cook dinner'], correctAnswer: 'To sugarcoat unpleasant news', explanation: '"Dorar la píldora" means to sugarcoat bad news.' },
  { id: 3, lessonId: 32, question: 'Which formal phrase replaces casual "decir claramente"?', options: ['poner de manifiesto', 'dar la lata', 'quedarse en blanco', 'hacer el oso'], correctAnswer: 'poner de manifiesto', explanation: '"Poner de manifiesto" is the formal diplomatic register shift.' },
  { id: 4, lessonId: 32, question: 'What does "a tenor de lo dispuesto" mean in administrative prose?', options: ['According to regulations / Pursuant to', 'In spite of', 'Before long', 'On the contrary'], correctAnswer: 'According to regulations / Pursuant to', explanation: '"A tenor de lo dispuesto" means pursuant to or in accordance with regulations.' },
  { id: 5, lessonId: 33, question: 'Which discourse marker requires the Subjunctive mood?', options: ['de ahí que', 'no obstante', 'por consiguiente', 'en resumidas cuentas'], correctAnswer: 'de ahí que', explanation: '"De ahí que" always requires the subjunctive mood.' },
  { id: 6, lessonId: 34, question: 'Which academic verb means to disprove a claim using empirical evidence?', options: ['refutar', 'corroborar', 'extrapolar', 'suponer'], correctAnswer: 'refutar', explanation: '"Refutar" means to disprove counter-claims.' },
  { id: 7, lessonId: 35, question: 'What is the Peninsular Spanish (Spain) word for "computer"?', options: ['el ordenador', 'la computadora', 'el computador', 'el equipo'], correctAnswer: 'el ordenador', explanation: '"El ordenador" is Peninsular Spanish (regional:Spain).' },
  { id: 8, lessonId: 36, question: 'Which mood must follow "como si" in counterfactual statements?', options: ['Imperfecto de Subjuntivo', 'Presente de Indicativo', 'Futuro', 'Gerundio'], correctAnswer: 'Imperfecto de Subjuntivo', explanation: '"Como si" triggers the imperfect subjunctive.' },
  { id: 9, lessonId: 37, question: 'What does the false friend "pretender" mean in Spanish?', options: ['To intend / claim', 'To pretend (fingir)', 'To protect', 'To prefer'], correctAnswer: 'To intend / claim', explanation: '"Pretender" means to intend or claim, NOT to pretend.' },
  { id: 10, lessonId: 37, question: 'How do you say "file folders" in Spanish without using false friends?', options: ['carpetas', 'alfombras', 'cartas', 'cuadernos'], correctAnswer: 'carpetas', explanation: '"Carpetas" means file folders or binders.' }
];

const BasicEspanolScreen: FC = () => {
  // Navigation states
  const [coursePart, setCoursePart] = useState<CoursePart>('part1');
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Lesson progression checklist across lessons (stored in Zustand store & Supabase)
  const completedLessons = useStatsStore((s) => s.completedLessons);
  const toggleLessonComplete = useStatsStore((s) => s.toggleLessonComplete);

  // Earned Master Badges & Claimed Exams (stored in Zustand store & Supabase)
  const earnedBadges = useStatsStore((s) => s.earnedBadges);
  const claimedExamIds = useStatsStore((s) => s.claimedExamIds);
  const claimExamReward = useStatsStore((s) => s.claimExamReward);

  // Interactive Quick Practice state per lesson
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<string, string>>({});

  // Sentence Builder Carousel state
  const [sentenceExerciseIndex, setSentenceExerciseIndex] = useState(0);

  // Memoized & shuffled exercises for current lesson
  const lessonSentenceExercises = useMemo(() => {
    const filtered = SENTENCE_BUILDER_EXERCISES.filter((e) => e.lessonId === activeSection);
    if (filtered.length === 0) {
      // Fallback: generate 1 exercise on the fly
      const fallback = generateLessonExercises(activeSection, getCEFRLevel(activeSection), 'Lesson', 1);
      return fallback;
    }
    // Shuffle using Fisher-Yates
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [activeSection]);

  // Reset carousel index when lesson changes
  useEffect(() => {
    setSentenceExerciseIndex(0);
  }, [activeSection]);

  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const handleLessonComplete = (lessonKey: string) => {
    toggleLessonComplete(lessonKey);
  };

  // Active Questions for current Master Exam
  const getActiveQuestions = (): ExamQuestion[] => {
    switch (activeSection) {
      case 'exam': return EXAM_QUESTIONS_PART1;
      case 'exam2': return EXAM_QUESTIONS_PART2;
      case 'exam3': return EXAM_QUESTIONS_PART3;
      case 'exam4': return EXAM_QUESTIONS_PART4;
      case 'exam5': return EXAM_QUESTIONS_PART5;
      case 'exam6': return EXAM_QUESTIONS_PART6;
      case 'exam7': return EXAM_QUESTIONS_PART7;
      case 'exam8': return EXAM_QUESTIONS_PART8;
      default: return EXAM_QUESTIONS_PART1;
    }
  };

  const activeQuestions = getActiveQuestions();

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    setShowExplanation(true);
    if (option === activeQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setScore(0);
    setShowExplanation(false);
    setRewardClaimed(false);
  };

  const claimQuizRewards = () => {
    if (rewardClaimed) return;
    const examId = `${coursePart}-exam`;
    const isAlreadyClaimed = claimedExamIds.includes(examId) || claimedExamIds.includes(coursePart);

    if (isAlreadyClaimed) {
      setRewardClaimed(true);
      return;
    }

    const badgeInfo = PART_BADGES[coursePart];
    const passRate = score / activeQuestions.length;
    
    if (passRate >= 0.6) {
      claimExamReward(examId, badgeInfo.xp, badgeInfo.coins, coursePart);
    }
    setRewardClaimed(true);
  };

  // Part Section lists
  const part1SectionsList = [
    { id: 'overview', title: 'Course Overview', icon: BookOpen, sub: 'Parts 1-8 Curriculum' },
    { id: 'lesson1', title: 'Lesson 1: Greetings & Vowels', icon: GraduationCap, sub: 'A, E, I, O, U & Greetings' },
    { id: 'lesson2', title: 'Lesson 2: Nouns & Articles', icon: Layers, sub: 'Definite Articles & Gender Rules' },
    { id: 'lesson3', title: 'Lesson 3: Pronouns & Verb Ser', icon: Users, sub: 'Subject Pronouns & DOCTOR rules' },
    { id: 'lesson4', title: 'Lesson 4: Regular -AR Verbs', icon: Sparkles, sub: 'Hablar, Estudiar, Trabajar' },
    { id: 'exam', title: 'Part 1 Master Exam', icon: Trophy, sub: '8-Question Master Test' },
  ];

  const part2SectionsList = [
    { id: 'lesson5', title: 'Lesson 5: Indefinite Articles & Numbers 0-100', icon: Layers, sub: 'Un/Una & Numbers 0-100' },
    { id: 'lesson6', title: 'Lesson 6: Verb Estar & Numbers >100', icon: Compass, sub: 'Conjugation, PLACE & Numbers >100' },
    { id: 'lesson7', title: 'Lesson 7: Regular -ER/-IR Verbs', icon: Sparkles, sub: 'Comer, Beber, Vivir, Escribir' },
    { id: 'lesson8', title: 'Lesson 8: Verb Ir & Questions', icon: Zap, sub: 'Voy/Vas/Va, Ir + a + Inf, Question Words' },
    { id: 'exam2', title: 'Part 2 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part3SectionsList = [
    { id: 'lesson9', title: 'Lesson 9: Days, Months & Dates', icon: Calendar, sub: 'Days of week, Months, Seasons, Date format' },
    { id: 'lesson10', title: 'Lesson 10: Telling Time', icon: Clock, sub: 'Es la una, Son las dos, y cuarto, menos diez' },
    { id: 'lesson11', title: 'Lesson 11: Verb Tener & Idioms', icon: Shield, sub: 'Tener frío/hambre/miedo, tener que + inf' },
    { id: 'lesson12', title: 'Lesson 12: Hacer, Weather & Saber/Conocer', icon: Sparkles, sub: 'Hace frío/sol, Saber vs Conocer' },
    { id: 'exam3', title: 'Part 3 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part4SectionsList = [
    { id: 'lesson13', title: 'Lesson 13: Stem-Changing Boot Verbs', icon: Zap, sub: 'e->ie, o->ue, e->i, u->ue' },
    { id: 'lesson14', title: 'Lesson 14: Yo-Go Verbs & Irregulars', icon: Crown, sub: 'Pongo, salgo, traigo, hago, conozco' },
    { id: 'lesson15', title: 'Lesson 15: Present Progressive', icon: Clock, sub: 'Estar + gerundio (-ando, -iendo)' },
    { id: 'lesson16', title: 'Lesson 16: Direct Object Pronouns & Adverbs', icon: Layers, sub: 'me, te, lo, la, los, las & -mente' },
    { id: 'exam4', title: 'Part 4 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part5SectionsList = [
    { id: 'lesson17', title: 'Lesson 17: Possessives & Demonstratives', icon: Compass, sub: 'este, ese, aquel, mío, tuyo' },
    { id: 'lesson18', title: 'Lesson 18: Affirmatives & Negatives', icon: Shield, sub: 'algo/nada, alguien/nadie, siempre/nunca' },
    { id: 'lesson19', title: 'Lesson 19: Indirect Objects & Gustar', icon: Star, sub: 'le/les, me gusta, te gusta, encantar' },
    { id: 'lesson20', title: 'Lesson 20: Double Object Pronouns', icon: Layers, sub: 'Double object order & "se la" rule' },
    { id: 'lesson21', title: 'Lesson 21: Reflexive Verbs & Routine', icon: Clock, sub: 'lavarse, levantarse, vestirse, me/te/se' },
    { id: 'exam5', title: 'Part 5 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part6SectionsList = [
    { id: 'lesson22', title: 'Lesson 22: Recent Past & Duration', icon: Calendar, sub: 'Acabar de + inf & Hace + time + que' },
    { id: 'lesson23', title: 'Lesson 23: Present Duration & Time Queries', icon: Clock, sub: '¿Desde cuándo...? & desde hace' },
    { id: 'lesson24', title: 'Lesson 24: Formal Commands & Comparisons', icon: Shield, sub: 'Usted commands & más... que' },
    { id: 'lesson25', title: 'Lesson 25: Informal Tú Commands', icon: Zap, sub: 'haz, ve, ten, pon, sal, di, ven, sé' },
    { id: 'lesson26', title: 'Lesson 26: Preterite Past Regulars', icon: Crown, sub: '-é, -aste, -ó, -í, -iste, -ió' },
    { id: 'exam6', title: 'Part 6 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part7SectionsList = [
    { id: 'lesson27', title: 'Lesson 27: Imperfect Tense', icon: Calendar, sub: '-aba, -ía, era, iba, veía' },
    { id: 'lesson28', title: 'Lesson 28: Preterite Irregulars', icon: Crown, sub: 'fui, tuve, estuve, hice, pude, dije' },
    { id: 'lesson29', title: 'Lesson 29: Preterite vs Imperfect', icon: Shield, sub: 'SIMBA vs WATERS / Completed vs Background' },
    { id: 'lesson30', title: 'Lesson 30: Superlatives & Synthesis', icon: Trophy, sub: 'el más..., -ísimo, Grand Master Synthesis' },
    { id: 'exam7', title: 'Part 7 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part8SectionsList = [
    { id: 'lesson31', title: 'Lesson 31: Advanced Idiomatic Expressions', icon: Sparkles, sub: 'Cultured idioms & metaphorical nuance' },
    { id: 'lesson32', title: 'Lesson 32: Formal & Diplomatic Register Shifts', icon: FileText, sub: 'Administrative & official prose' },
    { id: 'lesson33', title: 'Lesson 33: Nuanced Discourse Markers', icon: Layers, sub: 'Advanced connectors & subjunctive cause-effect' },
    { id: 'lesson34', title: 'Lesson 34: Academic Argumentation', icon: GraduationCap, sub: 'Research synthesis & debate vocabulary' },
    { id: 'lesson35', title: 'Lesson 35: Regional Lexical Variations', icon: Compass, sub: 'Spain (regional:Spain) vs LatAm (regional:LatAm)' },
    { id: 'lesson36', title: 'Lesson 36: Complex Subjunctive Clauses', icon: Shield, sub: 'Concessive & counterfactual triggers' },
    { id: 'lesson37', title: 'Lesson 37: Advanced Deceptive Cognates', icon: Crown, sub: 'False friends precision & C1 Graduation' },
    { id: 'exam8', title: 'Part 8 Master Exam (C1)', icon: Trophy, sub: '10-Question Grand Master C1 Test' },
  ];

  const getSectionsList = () => {
    switch (coursePart) {
      case 'part1': return part1SectionsList;
      case 'part2': return part2SectionsList;
      case 'part3': return part3SectionsList;
      case 'part4': return part4SectionsList;
      case 'part5': return part5SectionsList;
      case 'part6': return part6SectionsList;
      case 'part7': return part7SectionsList;
      case 'part8': return part8SectionsList;
    }
  };

  const sectionsList = getSectionsList();

  // Progress metrics
  const totalLessonsInPart = sectionsList.filter(s => s.id.startsWith('lesson')).length;
  const completedInPart = sectionsList.filter(s => s.id.startsWith('lesson') && completedLessons[s.id]).length;
  const progressPercent = Math.round((completedInPart / Math.max(1, totalLessonsInPart)) * 100);

  // Lesson order array and map for next/prev navigation
  // Section order array and map for seamless next/prev navigation (including exams)
  const ALL_SECTIONS_ORDERED: ActiveSection[] = [
    'overview',
    'lesson1', 'lesson2', 'lesson3', 'lesson4', 'exam',
    'lesson5', 'lesson6', 'lesson7', 'lesson8', 'exam2',
    'lesson9', 'lesson10', 'lesson11', 'lesson12', 'exam3',
    'lesson13', 'lesson14', 'lesson15', 'lesson16', 'exam4',
    'lesson17', 'lesson18', 'lesson19', 'lesson20', 'lesson21', 'exam5',
    'lesson22', 'lesson23', 'lesson24', 'lesson25', 'lesson26', 'exam6',
    'lesson27', 'lesson28', 'lesson29', 'lesson30', 'exam7',
    'lesson31', 'lesson32', 'lesson33', 'lesson34', 'lesson35', 'lesson36', 'lesson37', 'exam8'
  ];

  const SECTION_PART_MAP: Record<ActiveSection, CoursePart> = {
    overview: 'part1',
    lesson1: 'part1', lesson2: 'part1', lesson3: 'part1', lesson4: 'part1', exam: 'part1',
    lesson5: 'part2', lesson6: 'part2', lesson7: 'part2', lesson8: 'part2', exam2: 'part2',
    lesson9: 'part3', lesson10: 'part3', lesson11: 'part3', lesson12: 'part3', exam3: 'part3',
    lesson13: 'part4', lesson14: 'part4', lesson15: 'part4', lesson16: 'part4', exam4: 'part4',
    lesson17: 'part5', lesson18: 'part5', lesson19: 'part5', lesson20: 'part5', lesson21: 'part5', exam5: 'part5',
    lesson22: 'part6', lesson23: 'part6', lesson24: 'part6', lesson25: 'part6', lesson26: 'part6', exam6: 'part6',
    lesson27: 'part7', lesson28: 'part7', lesson29: 'part7', lesson30: 'part7', exam7: 'part7',
    lesson31: 'part8', lesson32: 'part8', lesson33: 'part8', lesson34: 'part8', lesson35: 'part8', lesson36: 'part8', lesson37: 'part8', exam8: 'part8'
  };

  const handleNextLesson = () => {
    const currentIndex = ALL_SECTIONS_ORDERED.indexOf(activeSection);
    if (currentIndex >= 0 && currentIndex < ALL_SECTIONS_ORDERED.length - 1) {
      const nextSection = ALL_SECTIONS_ORDERED[currentIndex + 1];
      const nextPart = SECTION_PART_MAP[nextSection];
      if (nextPart && nextPart !== coursePart) {
        setCoursePart(nextPart);
      }
      setActiveSection(nextSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = ALL_SECTIONS_ORDERED.indexOf(activeSection);
    if (currentIndex > 0) {
      const prevSection = ALL_SECTIONS_ORDERED[currentIndex - 1];
      const prevPart = SECTION_PART_MAP[prevSection];
      if (prevPart && prevPart !== coursePart) {
        setCoursePart(prevPart);
      }
      setActiveSection(prevSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to retrieve structured lesson data with safe fallback
  const defaultLessonData: SyllabusLessonData = {
    lessonNumber: parseInt(activeSection.replace('lesson', '')) || 1,
    partNumber: 1,
    title: sectionsList.find(s => s.id === activeSection)?.title || `Lesson ${activeSection.replace('lesson', '')}`,
    subtitle: sectionsList.find(s => s.id === activeSection)?.sub || 'Spanish Grammar & Practice',
    professorNote: 'Welcome to this Spanish lesson! Review the concepts and practice below.',
    objectives: ['Master key vocabulary and grammar rules', 'Practice sentence construction', 'Complete the interactive exercise'],
    grammarSections: [
      {
        title: 'Lesson Guide',
        explanation: 'Study the essential rules and examples for this topic.',
        rules: ['Pay attention to word order and gender agreement.', 'Practice speaking sentences aloud.']
      }
    ],
    vocabularyTable: [
      { spanish: 'el español', phonetic: 'ehl ehs-pah-NYOHL', english: 'Spanish language', usage: 'Noun' }
    ],
    exampleSentences: [
      { spanish: 'Estudio español cada día.', english: 'I study Spanish every day.', breakdown: 'Subject + Verb + Object' }
    ],
    dialogue: [
      { speaker: 'Estudiante', spanish: '¡Hola! Me gusta aprender español.', english: 'Hello! I like learning Spanish.' }
    ],
    quickPractice: {
      question: 'How do you say "Spanish" in Spanish?',
      options: ['El español', 'El inglés', 'El francés', 'El alemán'],
      correctAnswer: 'El español',
      explanation: 'El español means Spanish.'
    }
  };

  const currentLessonData: SyllabusLessonData | undefined = activeSection.startsWith('lesson')
    ? (ALL_SYLLABUS_LESSONS[activeSection] || defaultLessonData)
    : undefined;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary relative overflow-x-hidden font-sans pb-16">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7D927D]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#7D927D]/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Responsive Grid Layout */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[22rem_1fr] min-h-[calc(100vh-3.5rem)]">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-[#7D927D]/15 bg-bg-base/40 backdrop-blur-md p-5 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto z-20">
          <div className="space-y-5">
            
            {/* Title / Logo */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="h-5 w-5 text-[#7D927D]" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#777775]">
                  Spanish Course (Parts 1-8)
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-[#2F353B]">
                Básico Español 🇪🇸
              </h2>
              <p className="text-[11px] text-[#777775] mt-0.5">Lessons 1–37 & Master Exams</p>
            </div>

            {/* Course Part Selector Dropdown Menu */}
            <div className="space-y-1.5 bg-white/5 border border-[#7D927D]/15 p-3 rounded-2xl">
              <label htmlFor="course-part-select-desktop" className="text-[10px] font-mono uppercase tracking-wider text-[#7D927D] font-bold flex items-center justify-between">
                <span>Select Course Part:</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#7D927D]" />
              </label>
              <select
                id="course-part-select-desktop"
                value={coursePart}
                onChange={(e) => {
                  const p = e.target.value as CoursePart;
                  setCoursePart(p);
                  const list = p === 'part1' ? part1SectionsList : p === 'part2' ? part2SectionsList : p === 'part3' ? part3SectionsList : p === 'part4' ? part4SectionsList : p === 'part5' ? part5SectionsList : p === 'part6' ? part6SectionsList : p === 'part7' ? part7SectionsList : part8SectionsList;
                  setActiveSection(list[0].id as ActiveSection);
                }}
                className="w-full bg-bg-elevated text-text-primary text-xs font-bold py-2.5 px-3 rounded-xl border border-[#7D927D]/20 focus:outline-none focus:border-[#7D927D] cursor-pointer transition-all shadow-sm"
              >
                {PART_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-bg-elevated text-text-primary py-2 font-semibold">
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#777775]/80 italic mt-1">
                {PART_OPTIONS.find(o => o.id === coursePart)?.desc}
              </p>
            </div>

            {/* Earned Badge Display */}
            {earnedBadges[coursePart] && (
              <div className="bg-[#7D927D]/10 border border-[#7D927D]/30 rounded-xl p-2.5 flex items-center gap-2.5">
                <Trophy className="h-4 w-4 text-[#7D927D] shrink-0" />
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#7D927D] block font-bold">Badge Unlocked</span>
                  <span className="text-xs font-bold text-text-primary">{PART_BADGES[coursePart].badge}</span>
                </div>
              </div>
            )}

            {/* Section List / Lessons */}
            <nav className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#777775] font-bold block mb-2 px-1">
                Modules & Master Exam
              </span>
              {sectionsList.map((sec) => {
                const IconComponent = sec.icon;
                const isActive = activeSection === sec.id;
                const isLesson = sec.id.startsWith('lesson');
                const isCompleted = isLesson && completedLessons[sec.id];
                
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id as ActiveSection)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'bg-[#7D927D]/15 border-[#7D927D]/40 text-text-primary shadow-sm'
                        : 'bg-transparent border-transparent text-[#777775] hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#7D927D]' : 'text-[#777775]'}`} />
                      <div className="truncate">
                        <span className="text-xs font-semibold block truncate">{sec.title}</span>
                        <span className="text-[10px] text-[#777775]/70 block truncate">{sec.sub}</span>
                      </div>
                    </div>
                    {isCompleted && (
                      <Check className="h-3.5 w-3.5 text-[#7D927D] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Part Progress Bar */}
          <div className="pt-4 border-t border-[#7D927D]/15 space-y-2">
            <div className="flex justify-between items-center text-xs text-[#777775]">
              <span>{PART_OPTIONS.find(o => o.id === coursePart)?.label.split(':')[0]} Progress</span>
              <span className="font-bold text-text-primary">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-[#7D927D] h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </aside>

        {/* MOBILE HEADER & DRAWER */}
        <div className="lg:hidden p-4 border-b border-[#7D927D]/15 bg-bg-base/80 backdrop-blur-md sticky top-14 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#7D927D]" />
            <div>
              <h2 className="font-serif text-sm font-bold text-text-primary">Básico Español</h2>
              <span className="text-[10px] text-[#777775]">{PART_OPTIONS.find(o => o.id === coursePart)?.label.split(':')[0]}</span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/10 border border-[#7D927D]/15 text-text-primary flex items-center gap-1 text-xs font-semibold"
          >
            <Menu className="h-4 w-4" />
            <span>Menu</span>
          </button>
        </div>

        {/* MOBILE DRAWER OVERLAY */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed top-0 left-0 bottom-0 w-80 bg-bg-base border-r border-[#7D927D]/15 p-5 z-50 overflow-y-auto flex flex-col justify-between lg:hidden"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#2F353B]">Básico Español 🇪🇸</h2>
                      <p className="text-[10px] text-[#777775]">Lessons 1–37 & Master Exams</p>
                    </div>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg bg-white/5 border border-[#7D927D]/10 text-[#777775] hover:text-text-primary"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Course Part Selector Dropdown (Mobile) */}
                  <div className="space-y-1.5 bg-white/5 border border-[#7D927D]/15 p-3 rounded-2xl">
                    <label htmlFor="course-part-select-mobile" className="text-[10px] font-mono uppercase tracking-wider text-[#7D927D] font-bold flex items-center justify-between">
                      <span>Select Course Part:</span>
                      <ChevronDown className="h-3.5 w-3.5 text-[#7D927D]" />
                    </label>
                    <select
                      id="course-part-select-mobile"
                      value={coursePart}
                      onChange={(e) => {
                        const p = e.target.value as CoursePart;
                        setCoursePart(p);
                        const list = p === 'part1' ? part1SectionsList : p === 'part2' ? part2SectionsList : p === 'part3' ? part3SectionsList : p === 'part4' ? part4SectionsList : p === 'part5' ? part5SectionsList : p === 'part6' ? part6SectionsList : p === 'part7' ? part7SectionsList : part8SectionsList;
                        setActiveSection(list[0].id as ActiveSection);
                        setMobileSidebarOpen(false);
                      }}
                      className="w-full bg-bg-elevated text-text-primary text-xs font-bold py-2.5 px-3 rounded-xl border border-[#7D927D]/20 focus:outline-none focus:border-[#7D927D] cursor-pointer"
                    >
                      {PART_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-bg-elevated text-text-primary py-2 font-semibold">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <nav className="space-y-1">
                    {sectionsList.map((sec) => {
                      const IconComponent = sec.icon;
                      const isActive = activeSection === sec.id;
                      const isLesson = sec.id.startsWith('lesson');
                      const isCompleted = isLesson && completedLessons[sec.id];
                      
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setActiveSection(sec.id as ActiveSection);
                            setMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left cursor-pointer ${
                            isActive
                              ? 'bg-[#7D927D]/15 border-[#7D927D]/40 text-text-primary'
                              : 'bg-transparent border-transparent text-[#777775] hover:text-text-primary'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className="h-4 w-4 text-[#7D927D]" />
                            <span className="text-xs font-semibold">{sec.title}</span>
                          </div>
                          {isCompleted && (
                            <Check className="h-3.5 w-3.5 text-[#7D927D]" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-4 border-t border-[#7D927D]/15 space-y-2">
                  <div className="flex justify-between items-center text-xs text-[#777775]">
                    <span>Part Progress</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#7D927D] h-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN DISPLAY CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between max-w-5xl w-full mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >

              {/* OVERVIEW SECTION */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#7D927D]/20 shadow-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="relative z-10 space-y-3">
                      <div className="inline-flex items-center gap-1.5 bg-[#7D927D]/10 border border-[#7D927D]/30 text-[#7D927D] rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-bold">
                        <Sparkles className="h-3 w-3" />
                        Complete Spanish Curriculum (Parts 1–8)
                      </div>
                      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2F353B] leading-tight">
                        Master All 37 Spanish Lessons 🇪🇸
                      </h1>
                      <p className="font-sans text-sm text-[#777775] max-w-2xl leading-relaxed">
                        Welcome to your complete interactive workbook guide. Progress through all 8 curriculum parts covering greetings, articles, verbs, time, stem-changers, pronouns, commands, preterite, imperfect, and C1 advanced tenses.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
                      <BookOpenCheck className="h-5 w-5 text-[#7D927D]" />
                      Curriculum Parts Index
                    </h3>
                    
                    <SpotlightCards
                      earnedBadges={earnedBadges}
                      onSelectPart={(partId) => {
                        setCoursePart(partId);
                        const list =
                          partId === 'part1'
                            ? part1SectionsList
                            : partId === 'part2'
                            ? part2SectionsList
                            : partId === 'part3'
                            ? part3SectionsList
                            : partId === 'part4'
                            ? part4SectionsList
                            : partId === 'part5'
                            ? part5SectionsList
                            : partId === 'part6'
                            ? part6SectionsList
                            : partId === 'part7'
                            ? part7SectionsList
                            : part8SectionsList;
                        setActiveSection(list[0].id as ActiveSection);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* RICH TEXTBOOK-GRADE LESSON PAGE RENDERER (ALL LESSONS 1 TO 30) */}
              {activeSection.startsWith('lesson') && currentLessonData && (
                <div className="space-y-8">
                  
                  {/* 1. LESSON HEADER BANNER */}
                  <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="font-mono text-xs text-[#7D927D] font-bold uppercase tracking-widest block mb-1">
                          PART {currentLessonData.partNumber} • LESSON {currentLessonData.lessonNumber}
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2F353B] tracking-tight">
                          {currentLessonData.title}
                        </h1>
                        <p className="text-xs text-[#777775] mt-1 font-semibold">
                          {currentLessonData.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => handleLessonComplete(activeSection)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          completedLessons[activeSection]
                            ? 'bg-[#7D927D]/15 text-[#7D927D] border border-[#7D927D]/30'
                            : 'bg-[#7D927D] text-white hover:bg-[#6B806B] shadow-sm hover:-translate-y-0.5'
                        }`}
                      >
                        {completedLessons[activeSection] ? 'Completed ✓' : 'Mark Lesson Completed'}
                      </button>
                    </div>

                    {/* Professor Note Box */}
                    <div className="bg-[#F9F7F2] border-l-4 border-[#7D927D] p-4 rounded-r-2xl space-y-1.5 text-xs text-[#2F353B]">
                      <div className="flex items-center gap-2 text-[#7D927D] font-bold font-mono uppercase">
                        <Quote className="h-4 w-4" />
                        <span>Professor Bill Worden's Key Teaching Note</span>
                      </div>
                      <p className="italic text-[#777775] leading-relaxed">{currentLessonData.professorNote}</p>
                    </div>

                    {/* Objectives */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#777775] font-bold block mb-2">Lesson Learning Objectives:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {currentLessonData.objectives.map((obj, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-[#F9F7F2] p-2.5 rounded-xl border border-[#7D927D]/15 text-xs text-[#2F353B]">
                            <Target className="h-3.5 w-3.5 text-[#7D927D] shrink-0" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. GRAMMAR & STRUCTURAL SECTIONS */}
                  {currentLessonData.grammarSections.map((section, idx) => (
                    <div key={idx} className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[#2F353B] font-bold text-lg font-serif">
                        <Sparkles className="h-5 w-5 text-[#7D927D]" />
                        <span>{section.title}</span>
                      </div>

                      <p className="text-xs text-[#777775] leading-relaxed font-sans">
                        {section.explanation}
                      </p>

                      {/* Rules Bullet List */}
                      {section.rules && section.rules.length > 0 && (
                        <div className="bg-[#F9F7F2] p-5 rounded-2xl border border-[#7D927D]/20 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7D927D] font-bold block">Key Rules & Syntax:</span>
                          <ul className="space-y-2 text-xs text-[#2F353B]">
                            {section.rules.map((rule, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2">
                                <span className="text-[#7D927D] font-bold">•</span>
                                <span className="leading-relaxed font-sans">{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tables */}
                      {section.table && (
                        <div className="overflow-x-auto rounded-2xl border border-[#7D927D]/20 shadow-sm">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead className="bg-[#F9F7F2] font-serif text-[#2F353B] uppercase text-[10px] tracking-wider border-b border-[#7D927D]/20">
                              <tr>
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3.5 font-bold">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#7D927D]/15 font-sans text-[#2F353B]">
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-[#F9F7F2]/40' : 'bg-white'}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className={`p-3.5 leading-relaxed ${cIdx === 0 ? 'font-bold text-[#7D927D]' : ''}`}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Acronym Breakdown */}
                      {section.acronym && (
                        <div className="bg-[#F9F7F2] border border-[#7D927D]/20 rounded-2xl p-5 space-y-3">
                          <span className="text-xs font-mono uppercase font-bold text-[#7D927D] tracking-wider block">
                            The {section.acronym.name} Memory Framework:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {section.acronym.items.map((item, aIdx) => (
                              <div key={aIdx} className="bg-white p-3.5 rounded-xl border border-[#7D927D]/20 space-y-1 shadow-sm">
                                <div className="flex items-center gap-1.5 font-bold text-xs text-[#2F353B]">
                                  <span className="bg-[#7D927D] text-white rounded-md px-1.5 py-0.5 text-[10px] font-mono">{item.letter}</span>
                                  <span>{item.meaning}</span>
                                </div>
                                <p className="text-[11px] font-sans text-[#777775] italic">{item.example}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Callouts */}
                      {section.callout && (
                        <div className="bg-[#C4796B]/10 border border-[#C4796B]/30 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-[#2F353B]">
                          <AlertCircle className="h-4 w-4 text-[#C4796B] shrink-0 mt-0.5" />
                          <span className="font-semibold">{section.callout}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* 3. VOCABULARY & PHONETICS REFERENCE TABLE */}
                  {currentLessonData.vocabularyTable && currentLessonData.vocabularyTable.length > 0 && (
                    <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[#2F353B] font-bold text-lg font-serif">
                        <BookOpen className="h-5 w-5 text-[#7D927D]" />
                        <span>Lesson Vocabulary & Phonetic Pronunciation</span>
                      </div>
                      <div className="overflow-x-auto rounded-2xl border border-[#7D927D]/20">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead className="bg-[#F9F7F2] font-serif text-[#2F353B] uppercase text-[10px] tracking-wider border-b border-[#7D927D]/20">
                            <tr>
                              <th className="p-3.5 font-bold">Spanish Expression</th>
                              <th className="p-3.5 font-bold">Phonetic Guide</th>
                              <th className="p-3.5 font-bold">English Meaning</th>
                              <th className="p-3.5 font-bold">Context & Usage</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#7D927D]/15 font-sans">
                            {currentLessonData.vocabularyTable.map((v, vIdx) => (
                              <tr key={vIdx} className={vIdx % 2 === 0 ? 'bg-[#F9F7F2]/40' : 'bg-white'}>
                                <td className="p-3.5 font-bold text-[#7D927D]">{v.spanish}</td>
                                <td className="p-3.5 font-mono text-[#777775] text-[11px]">{v.phonetic}</td>
                                <td className="p-3.5 font-semibold text-[#2F353B]">{v.english}</td>
                                <td className="p-3.5 text-[#777775] italic">{v.usage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 4. REAL CONVERSATION DIALOGUE */}
                  {currentLessonData.dialogue && currentLessonData.dialogue.length > 0 && (
                    <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[#2F353B] font-bold text-lg font-serif">
                        <MessageSquare className="h-5 w-5 text-[#7D927D]" />
                        <span>Practical Conversation Dialogue</span>
                      </div>
                      <div className="bg-[#F9F7F2] p-6 rounded-2xl border border-[#7D927D]/20 space-y-3.5 text-xs">
                        {currentLessonData.dialogue.map((d, dIdx) => (
                          <div key={dIdx} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#7D927D] font-mono text-xs uppercase">{d.speaker}:</span>
                              <span className="font-bold text-[#2F353B] text-sm">{d.spanish}</span>
                            </div>
                            <p className="text-[11px] text-[#777775] italic pl-4 font-sans">({d.english})</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. EXAMPLE SENTENCES WITH BREAKDOWN */}
                  {currentLessonData.exampleSentences && currentLessonData.exampleSentences.length > 0 && (
                    <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[#2F353B] font-bold text-lg font-serif">
                        <FileText className="h-5 w-5 text-[#7D927D]" />
                        <span>Sentence Structure Analysis</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {currentLessonData.exampleSentences.map((ex, sIdx) => (
                          <div key={sIdx} className="bg-[#F9F7F2] p-5 rounded-2xl border border-[#7D927D]/20 space-y-2 text-xs">
                            <div className="flex justify-between items-center gap-4">
                              <span className="font-bold text-[#2F353B] text-sm leading-snug">{ex.spanish}</span>
                              <span className="text-[10px] font-mono text-[#7D927D] uppercase font-bold whitespace-nowrap shrink-0 bg-[#7D927D]/10 px-2 py-0.5 rounded-md">Example {sIdx + 1}</span>
                            </div>
                            <p className="text-[#777775] font-semibold text-[13px]">{ex.english}</p>
                            <p className="text-[11px] text-[#777775]/80 italic pt-2 border-t border-[#7D927D]/15">Grammar breakdown: {ex.breakdown}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. INTERACTIVE QUICK PRACTICE CHECK */}
                  {currentLessonData.quickPractice && (
                    <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[#2F353B] font-bold text-lg font-serif">
                        <HelpCircle className="h-5 w-5 text-[#7D927D]" />
                        <span>Interactive Knowledge Check</span>
                      </div>

                      <div className="bg-[#F9F7F2] p-5 rounded-2xl border border-[#7D927D]/20 space-y-4">
                        <p className="font-bold text-sm text-[#2F353B]">
                          {currentLessonData.quickPractice.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentLessonData.quickPractice.options.map((opt) => {
                            const isSelected = userPracticeAnswers[activeSection] === opt;
                            const isCorrect = opt === currentLessonData.quickPractice.correctAnswer;
                            
                            let btnStyle = 'bg-white border-[#7D927D]/20 text-[#2F353B] hover:bg-[#F9F7F2] hover:border-[#7D927D]/50';
                            if (userPracticeAnswers[activeSection]) {
                              if (isCorrect) {
                                btnStyle = 'bg-[#7D927D] border-[#7D927D] text-white font-bold shadow-md scale-[1.02]';
                              } else if (isSelected) {
                                btnStyle = 'bg-[#C4796B] border-[#C4796B] text-white font-bold shadow-md animate-shake';
                              } else {
                                btnStyle = 'bg-white border-[#7D927D]/20 text-[#2F353B] opacity-40';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                onClick={() => setUserPracticeAnswers(prev => ({ ...prev, [activeSection]: opt }))}
                                className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer shadow-sm flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {userPracticeAnswers[activeSection] && isCorrect && <Check className="h-4 w-4 text-white shrink-0 ml-2" />}
                                {userPracticeAnswers[activeSection] && isSelected && !isCorrect && <X className="h-4 w-4 text-white shrink-0 ml-2" />}
                              </button>
                            );
                          })}
                        </div>

                        {userPracticeAnswers[activeSection] && (
                          <div className="p-3.5 rounded-xl bg-white border border-[#7D927D]/20 text-xs space-y-1">
                            {userPracticeAnswers[activeSection] === currentLessonData.quickPractice.correctAnswer ? (
                              <span className="text-[#7D927D] font-bold flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Correct! {currentLessonData.quickPractice.explanation}
                              </span>
                            ) : (
                              <span className="text-[#7D927D] font-bold block">
                                Incorrect. {currentLessonData.quickPractice.explanation}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 6.5 INTERACTIVE SENTENCE BUILDER WORKSHOP (Carousel) */}
                  <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#2F353B] font-bold text-lg font-serif">
                        <Layers className="h-5 w-5 text-[#7D927D]" />
                        <span>Sentence Builder Workshop</span>
                      </div>
                      {lessonSentenceExercises.length > 1 && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#777775] font-bold bg-[#F9F7F2] px-2.5 py-1 rounded-full border border-[#7D927D]/20">
                          Exercise {sentenceExerciseIndex + 1} of {lessonSentenceExercises.length}
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    {lessonSentenceExercises.length > 1 && (
                      <div className="w-full bg-[#F9F7F2] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#7D927D] h-full transition-all duration-300 rounded-full"
                          style={{ width: `${((sentenceExerciseIndex + 1) / lessonSentenceExercises.length) * 100}%` }}
                        />
                      </div>
                    )}

                    {lessonSentenceExercises.length > 0 && (
                      <SentenceBuilderExercise
                        key={lessonSentenceExercises[sentenceExerciseIndex]?.id || `${activeSection}-${sentenceExerciseIndex}`}
                        exercise={lessonSentenceExercises[sentenceExerciseIndex]}
                        showHints={true}
                        onCompleted={(correct) => {
                          if (correct) {
                            useStatsStore.getState().addRewards(15, 5);
                          }
                        }}
                        onNext={() => {
                          if (sentenceExerciseIndex < lessonSentenceExercises.length - 1) {
                            setSentenceExerciseIndex((prev) => prev + 1);
                          } else {
                            handleNextLesson();
                          }
                        }}
                        onPrevious={
                          sentenceExerciseIndex > 0
                            ? () => setSentenceExerciseIndex((prev) => prev - 1)
                            : undefined
                        }
                      />
                    )}

                    {/* Carousel navigation */}
                    {lessonSentenceExercises.length > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                          onClick={() => setSentenceExerciseIndex((prev) => Math.max(0, prev - 1))}
                          disabled={sentenceExerciseIndex === 0}
                          className="px-3 py-1.5 rounded-xl text-[10px] font-bold border border-[#7D927D]/20 text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2] cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ← Prev
                        </button>
                        <div className="flex gap-1">
                          {lessonSentenceExercises.slice(
                            Math.max(0, sentenceExerciseIndex - 3),
                            Math.min(lessonSentenceExercises.length, sentenceExerciseIndex + 4)
                          ).map((_, i) => {
                            const actualIdx = Math.max(0, sentenceExerciseIndex - 3) + i;
                            return (
                              <button
                                key={actualIdx}
                                onClick={() => setSentenceExerciseIndex(actualIdx)}
                                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                  actualIdx === sentenceExerciseIndex
                                    ? 'bg-[#7D927D] scale-125'
                                    : 'bg-[#777775]/30 hover:bg-[#777775]/50'
                                }`}
                              />
                            );
                          })}
                        </div>
                        <button
                          onClick={() => setSentenceExerciseIndex((prev) => Math.min(lessonSentenceExercises.length - 1, prev + 1))}
                          disabled={sentenceExerciseIndex === lessonSentenceExercises.length - 1}
                          className="px-3 py-1.5 rounded-xl text-[10px] font-bold border border-[#7D927D]/20 text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2] cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-6 border-t border-[#7D927D]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      {ALL_SECTIONS_ORDERED.indexOf(activeSection) > 0 && (
                        <button
                          onClick={handlePrevLesson}
                          className="px-4 py-2.5 rounded-full text-xs font-bold border border-[#7D927D]/20 text-[#777775] hover:text-[#2F353B] hover:bg-[#F9F7F2] cursor-pointer transition-all flex items-center gap-1"
                        >
                          ← Previous Section
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleLessonComplete(activeSection)}
                        className={`px-6 py-3 rounded-full text-xs font-bold shadow-sm cursor-pointer transition-all ${
                          completedLessons[activeSection]
                            ? 'bg-[#7D927D]/15 text-[#7D927D] border border-[#7D927D]/30'
                            : 'bg-[#7D927D] text-white hover:bg-[#6B806B]'
                        }`}
                      >
                        {completedLessons[activeSection] ? 'Lesson Completed ✓' : 'Mark Lesson Completed'}
                      </button>

                      {ALL_SECTIONS_ORDERED.indexOf(activeSection) < ALL_SECTIONS_ORDERED.length - 1 && (
                        <button
                          onClick={handleNextLesson}
                          className="px-6 py-3 rounded-full text-xs font-bold bg-[#7D927D] text-white hover:bg-[#6B806B] shadow-sm cursor-pointer transition-all flex items-center gap-1 font-serif"
                        >
                          Next Lesson →
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* MASTER EXAMS (Parts 1 - 8) */}
              {activeSection.startsWith('exam') && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#7D927D]/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-start mb-6 border-b border-[#7D927D]/20 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#7D927D] font-bold block mb-1">
                          {PART_BADGES[coursePart].title}
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-[#2F353B]">
                          {PART_OPTIONS.find(o => o.id === coursePart)?.label.split(':')[0]} Master Exam 🏆
                        </h2>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#7D927D]/10 border border-[#7D927D]/30 text-[#7D927D] rounded-full px-3.5 py-1.5 text-xs font-bold font-mono">
                        <Award className="h-4 w-4" />
                        <span>+{PART_BADGES[coursePart].coins} Coins / +{PART_BADGES[coursePart].xp} XP</span>
                      </div>
                    </div>

                    {!quizFinished ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs text-[#777775] font-mono">
                          <span>Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
                          <span>Score: {score}</span>
                        </div>

                        <div className="bg-[#F9F7F2] p-5.5 rounded-2xl border border-[#7D927D]/20 space-y-4">
                          <h3 className="font-serif text-base font-bold text-[#2F353B] leading-relaxed">
                            {activeQuestions[currentQuestionIndex].question}
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {activeQuestions[currentQuestionIndex].options.map((option) => {
                              const isSelected = selectedAnswer === option;
                              const isCorrect = option === activeQuestions[currentQuestionIndex].correctAnswer;
                              
                              let btnStyle = 'bg-white border-[#7D927D]/20 text-[#2F353B] hover:bg-[#F9F7F2] hover:border-[#7D927D]/50';
                              if (selectedAnswer !== null) {
                                if (isCorrect) {
                                  btnStyle = 'bg-[#7D927D] border-[#7D927D] text-white font-bold shadow-md scale-[1.02]';
                                } else if (isSelected) {
                                  btnStyle = 'bg-[#C4796B] border-[#C4796B] text-white font-bold shadow-md animate-shake';
                                } else {
                                  btnStyle = 'bg-white border-[#7D927D]/20 text-[#2F353B] opacity-40';
                                }
                              }

                              return (
                                <button
                                  key={option}
                                  onClick={() => handleAnswerClick(option)}
                                  className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer shadow-sm flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{option}</span>
                                  {selectedAnswer !== null && isCorrect && <Check className="h-4 w-4 text-white shrink-0 ml-2" />}
                                  {selectedAnswer !== null && isSelected && !isCorrect && <X className="h-4 w-4 text-white shrink-0 ml-2" />}
                                </button>
                              );
                            })}
                          </div>

                          {showExplanation && (
                            <div className="p-3.5 rounded-xl bg-white border border-[#7D927D]/20 text-xs text-[#777775] space-y-1 animate-fadeIn">
                              <span className="font-bold text-[#2F353B] block">Explanation:</span>
                              <p>{activeQuestions[currentQuestionIndex].explanation}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                            className="px-6 py-3 rounded-full bg-[#7D927D] text-white font-bold text-xs shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#6B806B] cursor-pointer transition-all"
                          >
                            {currentQuestionIndex < activeQuestions.length - 1 ? 'Next Question →' : 'Finish Exam'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-[#7D927D]/15 text-[#7D927D] mb-2">
                          <Trophy className="h-12 w-12" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#2F353B]">Exam Completed!</h3>
                        <p className="text-sm text-[#777775]">
                          You scored <strong className="text-[#2F353B] font-bold">{score} / {activeQuestions.length}</strong> ({Math.round((score / activeQuestions.length) * 100)}%).
                        </p>

                        {(score / activeQuestions.length) >= 0.7 ? (
                          <div className="bg-[#7D927D]/10 border border-[#7D927D]/30 rounded-2xl p-4 max-w-md mx-auto space-y-2">
                            <span className="font-mono text-xs text-[#7D927D] font-bold uppercase tracking-wider block">Passing Grade Reached!</span>
                            <p className="text-xs text-[#2F353B]">
                              You unlocked the <strong className="text-[#7D927D]">{PART_BADGES[coursePart].badge}</strong>!
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-[#C4796B] font-semibold">
                            You need at least 70% to claim rewards and unlock the badge. Try again!
                          </p>
                        )}

                        <div className="flex justify-center gap-3 pt-2">
                          <button
                            onClick={resetQuiz}
                            className="px-4 py-2.5 rounded-full bg-[#F9F7F2] border border-[#7D927D]/20 text-xs font-bold text-[#777775] hover:text-[#2F353B] cursor-pointer"
                          >
                            Retake Exam
                          </button>
                          {(score / activeQuestions.length) >= 0.7 && !rewardClaimed && (
                            <button
                              onClick={claimQuizRewards}
                              className="px-6 py-2.5 rounded-full bg-[#7D927D] text-white font-bold text-xs shadow-sm hover:bg-[#6B806B] cursor-pointer"
                            >
                              Claim Rewards 🪙
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
};

export default BasicEspanolScreen;
