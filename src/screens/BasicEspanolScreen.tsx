import { useState, type FC } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';

// Types
export type CoursePart = 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'part6' | 'part7';
export type ActiveSection =
  | 'overview'
  | 'lesson1' | 'lesson2' | 'lesson3' | 'lesson4' | 'exam'
  | 'lesson5' | 'lesson6' | 'lesson7' | 'lesson8' | 'exam2'
  | 'lesson9' | 'lesson10' | 'lesson11' | 'lesson12' | 'exam3'
  | 'lesson13' | 'lesson14' | 'lesson15' | 'lesson16' | 'exam4'
  | 'lesson17' | 'lesson18' | 'lesson19' | 'lesson20' | 'lesson21' | 'exam5'
  | 'lesson22' | 'lesson23' | 'lesson24' | 'lesson25' | 'lesson26' | 'exam6'
  | 'lesson27' | 'lesson28' | 'lesson29' | 'lesson30' | 'exam7';

interface VocabularyWord {
  word: string;
  phonetic: string;
  translation: string;
  context: string;
}

interface VowelGuide {
  letter: string;
  sound: string;
  englishLike: string;
  examples: { spanish: string; english: string }[];
}

interface ExamQuestion {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const PART_OPTIONS: { id: CoursePart; label: string; desc: string }[] = [
  { id: 'part1', label: 'Part 1: Greetings & -AR Verbs (Lessons 1-4)', desc: 'Pronunciation, Articles, SER & -AR Verbs' },
  { id: 'part2', label: 'Part 2: Estar, Ir & Numbers (Lessons 5-8)', desc: 'Indefinite Articles, ESTAR, -ER/-IR Verbs & IR' },
  { id: 'part3', label: 'Part 3: Dates, Time, Tener & Hacer (Lessons 9-12)', desc: 'Calendar, Telling Time, Tener Idioms & Weather' },
  { id: 'part4', label: 'Part 4: Stem Changers & Progressive (Lessons 13-16)', desc: 'Boot Verbs, Yo-Go Verbs & Present Progressive' },
  { id: 'part5', label: 'Part 5: Pronouns & Affirmatives (Lessons 17-21)', desc: 'Possessives, Demonstratives, DOPs, IOPs & Gustar' },
  { id: 'part6', label: 'Part 6: Double Objects & Preterite (Lessons 22-26)', desc: 'Double Objects, Reflexives, Commands & Preterite' },
  { id: 'part7', label: 'Part 7: Imperfect & Comparisons (Lessons 27-30)', desc: 'Imperfect Tense, Preterite vs Imperfect & Superlatives' },
];

const PART_BADGES: Record<CoursePart, { title: string; badge: string; xp: number; coins: number }> = {
  part1: { title: 'Part 1 Master', badge: 'Dominio de Fundamentos 🏅', xp: 100, coins: 50 },
  part2: { title: 'Part 2 Master', badge: 'Explorador de Verbos 🏅', xp: 120, coins: 60 },
  part3: { title: 'Part 3 Master', badge: 'Maestro del Tiempo 🏅', xp: 140, coins: 70 },
  part4: { title: 'Part 4 Master', badge: 'Maestro del Presente 🏅', xp: 180, coins: 80 },
  part5: { title: 'Part 5 Master', badge: 'Afirmativo y Objetos 🎖️', xp: 200, coins: 85 },
  part6: { title: 'Part 6 Master', badge: 'Comandante del Pasado 🎖️', xp: 220, coins: 90 },
  part7: { title: 'Part 7 Master', badge: 'Maestro Comparativo 🏆', xp: 250, coins: 100 },
};

// Vocabulary lists
export const GREETINGS_VOCAB: VocabularyWord[] = [
  { word: '¡Hola!', phonetic: 'OH-lah', translation: 'Hello! / Hi!', context: 'Used anytime, very common.' },
  { word: 'Buenos días', phonetic: 'BWEH-nos DEE-ahs', translation: 'Good morning', context: 'Used from sunrise to noon.' },
  { word: 'Buenas tardes', phonetic: 'BWEH-nahs TAR-dehs', translation: 'Good afternoon', context: 'Used from noon to dark.' },
  { word: 'Buenas noches', phonetic: 'BWEH-nahs NOH-chehs', translation: 'Good evening / Good night', context: 'Used after dark.' },
];

export const INTRODUCTIONS_VOCAB: VocabularyWord[] = [
  { word: '¿Cómo te llamas?', phonetic: 'KOH-moh teh YAH-mahs', translation: 'What is your name? (informal)', context: 'To peers or kids.' },
  { word: '¿Cómo se llama usted?', phonetic: 'KOH-moh seh YAH-mah oos-TEHD', translation: 'What is your name? (formal)', context: 'To authority or elders.' },
  { word: 'Me llamo...', phonetic: 'Meh YAH-moh', translation: 'My name is...', context: 'Followed by your name.' },
  { word: 'Mucho gusto', phonetic: 'MOO-choh GOOS-toh', translation: 'Nice to meet you', context: 'Standard polite reply.' },
];

export const GOODBYES_VOCAB: VocabularyWord[] = [
  { word: 'Adiós', phonetic: 'ah-DYOHS', translation: 'Goodbye', context: 'Formal or permanent farewell.' },
  { word: 'Hasta luego', phonetic: 'AHS-tah LWEH-goh', translation: 'See you later', context: 'Most common farewell.' },
  { word: 'Hasta mañana', phonetic: 'AHS-tah mah-NYAH-nah', translation: 'See you tomorrow', context: 'If seeing them tomorrow.' },
  { word: 'Nos vemos', phonetic: 'nohs VEH-mohs', translation: 'See you / We see each other', context: 'Friendly and casual.' },
];

const VOWELS_GUIDE: VowelGuide[] = [
  { letter: 'A', sound: 'ah', englishLike: 'like the "a" in father', examples: [{ spanish: 'casa', english: 'house' }, { spanish: 'cantar', english: 'to sing' }] },
  { letter: 'E', sound: 'eh', englishLike: 'like the "e" in met', examples: [{ spanish: 'mesa', english: 'table' }, { spanish: 'el', english: 'the (masculine)' }] },
  { letter: 'I', sound: 'ee', englishLike: 'like the "ee" in machine', examples: [{ spanish: 'isla', english: 'island' }, { spanish: 'libro', english: 'book' }] },
  { letter: 'O', sound: 'oh', englishLike: 'like the "o" in door', examples: [{ spanish: 'sol', english: 'sun' }, { spanish: 'gato', english: 'cat' }] },
  { letter: 'U', sound: 'oo', englishLike: 'like the "oo" in boot', examples: [{ spanish: 'uno', english: 'one' }, { spanish: 'luna', english: 'moon' }] },
];

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

const BasicEspanolScreen: FC = () => {
  // Navigation states
  const [coursePart, setCoursePart] = useState<CoursePart>('part1');
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Lesson progression checklist across 30 lessons
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('wayfarer-basic-espanol-completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Earned Master Badges
  const [earnedBadges, setEarnedBadges] = useState<Record<CoursePart, boolean>>(() => {
    try {
      const saved = localStorage.getItem('wayfarer-basic-espanol-badges');
      return saved ? JSON.parse(saved) : { part1: false, part2: false, part3: false, part4: false, part5: false, part6: false, part7: false };
    } catch {
      return { part1: false, part2: false, part3: false, part4: false, part5: false, part6: false, part7: false };
    }
  });

  // Interactive UI Helpers
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);

  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const handleLessonComplete = (lessonKey: string) => {
    setCompletedLessons(prev => {
      const next = { ...prev, [lessonKey]: !prev[lessonKey] };
      localStorage.setItem('wayfarer-basic-espanol-completed', JSON.stringify(next));
      return next;
    });
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
    const badgeInfo = PART_BADGES[coursePart];
    const passRate = score / activeQuestions.length;
    
    if (passRate >= 0.7) {
      useStatsStore.getState().addRewards(badgeInfo.coins, badgeInfo.xp);
      setEarnedBadges(prev => {
        const next = { ...prev, [coursePart]: true };
        localStorage.setItem('wayfarer-basic-espanol-badges', JSON.stringify(next));
        return next;
      });
    }
    setRewardClaimed(true);
  };

  // Part Section lists
  const part1SectionsList = [
    { id: 'overview', title: 'Course Overview', icon: BookOpen, sub: 'Parts 1-7 Curriculum' },
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

  const getSectionsList = () => {
    switch (coursePart) {
      case 'part1': return part1SectionsList;
      case 'part2': return part2SectionsList;
      case 'part3': return part3SectionsList;
      case 'part4': return part4SectionsList;
      case 'part5': return part5SectionsList;
      case 'part6': return part6SectionsList;
      case 'part7': return part7SectionsList;
    }
  };

  const sectionsList = getSectionsList();

  // Progress metrics
  const totalLessonsInPart = sectionsList.filter(s => s.id.startsWith('lesson')).length;
  const completedInPart = sectionsList.filter(s => s.id.startsWith('lesson') && completedLessons[s.id]).length;
  const progressPercent = Math.round((completedInPart / Math.max(1, totalLessonsInPart)) * 100);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary relative overflow-x-hidden font-body">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-marigold/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Responsive Grid Layout */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[22rem_1fr] min-h-[calc(100vh-3.5rem)]">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-pencil/15 bg-bg-base/40 backdrop-blur-md p-5 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto z-20">
          <div className="space-y-5">
            
            {/* Title / Logo */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="h-5 w-5 text-marigold" />
                <span className="font-hud text-[9px] tracking-[0.25em] uppercase text-pencil">
                  Spanish Course (Parts 1-7)
                </span>
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight text-text-primary">
                Básico Español 🇪🇸
              </h2>
              <p className="text-[11px] text-pencil mt-0.5">Lessons 1–30 & Master Exams</p>
            </div>

            {/* Course Part Selector Dropdown Menu */}
            <div className="space-y-1.5 bg-paper/5 border border-pencil/15 p-3 rounded-2xl">
              <label htmlFor="course-part-select-desktop" className="text-[10px] font-hud uppercase tracking-wider text-marigold font-bold flex items-center justify-between">
                <span>Select Course Part:</span>
                <ChevronDown className="h-3.5 w-3.5 text-marigold" />
              </label>
              <select
                id="course-part-select-desktop"
                value={coursePart}
                onChange={(e) => {
                  const p = e.target.value as CoursePart;
                  setCoursePart(p);
                  const list = p === 'part1' ? part1SectionsList : p === 'part2' ? part2SectionsList : p === 'part3' ? part3SectionsList : p === 'part4' ? part4SectionsList : p === 'part5' ? part5SectionsList : p === 'part6' ? part6SectionsList : part7SectionsList;
                  setActiveSection(list[0].id as ActiveSection);
                }}
                className="w-full bg-bg-elevated text-text-primary text-xs font-bold py-2.5 px-3 rounded-xl border border-pencil/20 focus:outline-none focus:border-terracotta cursor-pointer transition-all shadow-sm"
              >
                {PART_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-bg-elevated text-text-primary py-2 font-semibold">
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-pencil/80 italic mt-1">
                {PART_OPTIONS.find(o => o.id === coursePart)?.desc}
              </p>
            </div>

            {/* Earned Badge Display */}
            {earnedBadges[coursePart] && (
              <div className="bg-marigold/10 border border-marigold/30 rounded-xl p-2.5 flex items-center gap-2.5">
                <Trophy className="h-4 w-4 text-marigold shrink-0" />
                <div>
                  <span className="text-[9px] font-hud uppercase tracking-wider text-marigold block font-bold">Badge Unlocked</span>
                  <span className="text-xs font-bold text-text-primary">{PART_BADGES[coursePart].badge}</span>
                </div>
              </div>
            )}

            {/* Section List / Lessons */}
            <nav className="space-y-1">
              <span className="text-[10px] font-hud uppercase tracking-wider text-pencil font-bold block mb-2 px-1">
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
                        ? 'bg-terracotta/15 border-terracotta/40 text-text-primary shadow-sm'
                        : 'bg-transparent border-transparent text-pencil hover:text-text-primary hover:bg-paper/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent className={`h-4 w-4 shrink-0 ${isActive ? 'text-terracotta' : 'text-pencil'}`} />
                      <div className="truncate">
                        <span className="text-xs font-semibold block truncate">{sec.title}</span>
                        <span className="text-[10px] text-pencil/70 block truncate">{sec.sub}</span>
                      </div>
                    </div>
                    {isCompleted && (
                      <Check className="h-3.5 w-3.5 text-teal-deep shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Part Progress Bar */}
          <div className="pt-4 border-t border-pencil/15 space-y-2">
            <div className="flex justify-between items-center text-xs text-pencil">
              <span>{PART_OPTIONS.find(o => o.id === coursePart)?.label.split(':')[0]} Progress</span>
              <span className="font-bold text-text-primary">{progressPercent}%</span>
            </div>
            <div className="w-full bg-paper/10 h-2 rounded-full overflow-hidden">
              <div className="bg-terracotta h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </aside>

        {/* MOBILE HEADER & DRAWER */}
        <div className="lg:hidden p-4 border-b border-pencil/15 bg-bg-base/80 backdrop-blur-md sticky top-14 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-terracotta" />
            <div>
              <h2 className="font-display text-sm font-bold text-text-primary">Básico Español</h2>
              <span className="text-[10px] text-pencil">{PART_OPTIONS.find(o => o.id === coursePart)?.label.split(':')[0]}</span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-paper/10 border border-pencil/15 text-text-primary flex items-center gap-1 text-xs font-semibold"
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
                className="fixed top-0 left-0 bottom-0 w-80 bg-bg-base border-r border-pencil/15 p-5 z-50 overflow-y-auto flex flex-col justify-between lg:hidden"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-bold text-text-primary">Básico Español 🇪🇸</h2>
                      <p className="text-[10px] text-pencil">Lessons 1–30 & Master Exams</p>
                    </div>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg bg-paper/5 border border-pencil/10 text-pencil hover:text-text-primary"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Course Part Selector Dropdown (Mobile) */}
                  <div className="space-y-1.5 bg-paper/5 border border-pencil/15 p-3 rounded-2xl">
                    <label htmlFor="course-part-select-mobile" className="text-[10px] font-hud uppercase tracking-wider text-marigold font-bold flex items-center justify-between">
                      <span>Select Course Part:</span>
                      <ChevronDown className="h-3.5 w-3.5 text-marigold" />
                    </label>
                    <select
                      id="course-part-select-mobile"
                      value={coursePart}
                      onChange={(e) => {
                        const p = e.target.value as CoursePart;
                        setCoursePart(p);
                        const list = p === 'part1' ? part1SectionsList : p === 'part2' ? part2SectionsList : p === 'part3' ? part3SectionsList : p === 'part4' ? part4SectionsList : p === 'part5' ? part5SectionsList : p === 'part6' ? part6SectionsList : part7SectionsList;
                        setActiveSection(list[0].id as ActiveSection);
                        setMobileSidebarOpen(false);
                      }}
                      className="w-full bg-bg-elevated text-text-primary text-xs font-bold py-2.5 px-3 rounded-xl border border-pencil/20 focus:outline-none focus:border-terracotta cursor-pointer"
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
                              ? 'bg-terracotta/15 border-terracotta/40 text-text-primary'
                              : 'bg-transparent border-transparent text-pencil hover:text-text-primary'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className="h-4 w-4 text-terracotta" />
                            <span className="text-xs font-semibold">{sec.title}</span>
                          </div>
                          {isCompleted && (
                            <Check className="h-3.5 w-3.5 text-teal-deep" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-4 border-t border-pencil/15 space-y-2">
                  <div className="flex justify-between items-center text-xs text-pencil">
                    <span>Part Progress</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-paper/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-terracotta h-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN DISPLAY CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between max-w-4xl w-full mx-auto">
          
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
                  <div className="bg-gradient-to-r from-terracotta/10 to-marigold/10 border border-pencil/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="relative z-10 space-y-3">
                      <div className="inline-flex items-center gap-1.5 bg-marigold/10 border border-marigold/30 text-marigold rounded-full px-3 py-1 text-[10px] font-hud uppercase tracking-wider font-bold">
                        <Sparkles className="h-3 w-3" />
                        Complete Spanish Curriculum (Parts 1–7)
                      </div>
                      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
                        Master All 30 Spanish Lessons 🇪🇸
                      </h1>
                      <p className="font-body text-sm text-pencil max-w-2xl leading-relaxed">
                        Welcome to your complete interactive workbook guide. Progress through all 7 curriculum parts covering greetings, articles, verbs, time, stem-changers, pronouns, commands, preterite, and imperfect tenses.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
                      <BookOpenCheck className="h-5 w-5 text-terracotta" />
                      Curriculum Parts Index
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {PART_OPTIONS.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setCoursePart(item.id);
                            const list = item.id === 'part1' ? part1SectionsList : item.id === 'part2' ? part2SectionsList : item.id === 'part3' ? part3SectionsList : item.id === 'part4' ? part4SectionsList : item.id === 'part5' ? part5SectionsList : item.id === 'part6' ? part6SectionsList : part7SectionsList;
                            setActiveSection(list[0].id as ActiveSection);
                          }}
                          className="bg-paper/5 border border-pencil/10 hover:border-pencil/35 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] space-y-2 group"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-hud tracking-wider text-pencil uppercase font-bold">{item.label.split(':')[0]}</span>
                            {earnedBadges[item.id] && <Trophy className="h-4 w-4 text-marigold" />}
                          </div>
                          <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-terracotta transition-colors">
                            {item.label}
                          </h4>
                          <p className="text-xs text-pencil leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LESSON 1 */}
              {activeSection === 'lesson1' && (
                <div className="space-y-6">
                  <div>
                    <span className="font-hud text-xs text-terracotta font-semibold tracking-wider block">LESSON 1</span>
                    <h2 className="font-display text-2xl font-bold text-text-primary">Intro to Spanish & Vowels</h2>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-text-primary flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-marigold" /> Vowel Pronunciation Guide (A, E, I, O, U)
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {VOWELS_GUIDE.map((v) => (
                        <button key={v.letter} onClick={() => setSelectedVowel(v.letter === selectedVowel ? null : v.letter)} className={`p-3 rounded-xl border text-center cursor-pointer ${selectedVowel === v.letter ? 'bg-marigold/20 border-marigold text-marigold' : 'bg-paper/5 border-pencil/10 text-text-primary'}`}>
                          <span className="font-display text-2xl font-bold block">{v.letter}</span>
                          <span className="text-[10px] text-pencil/80 block mt-0.5">{v.sound}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Greetings & Polite Phrases</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {GREETINGS_VOCAB.map(g => (
                        <div key={g.word} className="bg-bg-elevated p-3 rounded-xl border border-structural">
                          <span className="font-bold text-sm text-terracotta block">{g.word}</span>
                          <span className="text-[11px] text-pencil block">{g.phonetic} — {g.translation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center">
                    <span className="text-xs text-pencil">Mark lesson completed when done.</span>
                    <button onClick={() => handleLessonComplete('lesson1')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson1 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson1 ? 'Completed ✓' : 'Mark Completed'}</button>
                  </div>
                </div>
              )}

              {/* LESSON 2 */}
              {activeSection === 'lesson2' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 2</span><h2 className="font-display text-2xl font-bold text-text-primary">Definite Articles & Gender Rules</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15">
                      <span className="text-xs font-bold text-marigold uppercase font-hud block mb-2">Masculine Nouns</span>
                      <p className="text-xs text-pencil mb-2">Use article <strong>EL</strong> (plural <strong>LOS</strong>). Usually end in -o.</p>
                      <ul className="text-xs space-y-1 font-mono text-text-primary">
                        <li>• el libro (the book)</li>
                        <li>• el chico (the boy)</li>
                        <li>• el mapa (exception!)</li>
                      </ul>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15">
                      <span className="text-xs font-bold text-terracotta uppercase font-hud block mb-2">Feminine Nouns</span>
                      <p className="text-xs text-pencil mb-2">Use article <strong>LA</strong> (plural <strong>LAS</strong>). Usually end in -a, -ción, -dad.</p>
                      <ul className="text-xs space-y-1 font-mono text-text-primary">
                        <li>• la casa (the house)</li>
                        <li>• la chica (the girl)</li>
                        <li>• la mano (exception!)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson2')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson2 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson2 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 3 */}
              {activeSection === 'lesson3' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 3</span><h2 className="font-display text-2xl font-bold text-text-primary">Subject Pronouns & Verb SER</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4">
                    <h4 className="font-bold text-sm text-text-primary mb-3">Conjugation Matrix of SER (Identity & Origin)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Yo</span><span className="font-bold text-terracotta">soy</span> (I am)</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Tú</span><span className="font-bold text-terracotta">eres</span> (You are)</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Él / Ella</span><span className="font-bold text-terracotta">es</span> (He/She is)</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Nosotros</span><span className="font-bold text-terracotta">somos</span> (We are)</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Vosotros</span><span className="font-bold text-terracotta">sois</span> (You all are)</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Ellos / Ellas</span><span className="font-bold text-terracotta">son</span> (They are)</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson3')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson3 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson3 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 4 */}
              {activeSection === 'lesson4' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 4</span><h2 className="font-display text-2xl font-bold text-text-primary">Regular -AR Verbs in Present</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">-AR Verb Endings & Example: Hablar (to speak)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Yo (-o)</span><span className="font-bold text-marigold">hablo</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Tú (-as)</span><span className="font-bold text-marigold">hablas</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Él (-a)</span><span className="font-bold text-marigold">habla</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Nosotros (-amos)</span><span className="font-bold text-marigold">hablamos</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Vosotros (-áis)</span><span className="font-bold text-marigold">habláis</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Ellos (-an)</span><span className="font-bold text-marigold">hablan</span></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson4')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson4 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson4 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 5 */}
              {activeSection === 'lesson5' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 5</span><h2 className="font-display text-2xl font-bold text-text-primary">Indefinite Articles & Numbers 0–100</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-terracotta uppercase font-hud block">Indefinite Articles</span>
                      <ul className="text-xs space-y-1.5 text-pencil">
                        <li><strong className="text-text-primary">un libro</strong> (a book - masc. sing.)</li>
                        <li><strong className="text-text-primary">una casa</strong> (a house - fem. sing.)</li>
                        <li><strong className="text-text-primary">unos libros</strong> (some books - masc. pl.)</li>
                        <li><strong className="text-text-primary">unas casas</strong> (some houses - fem. pl.)</li>
                      </ul>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-marigold uppercase font-hud block">Numbers Key Terms</span>
                      <div className="grid grid-cols-2 text-xs font-mono text-text-primary gap-1">
                        <span>1: uno</span><span>10: diez</span>
                        <span>20: veinte</span><span>30: treinta</span>
                        <span>40: cuarenta</span><span>50: cincuenta</span>
                        <span>100: cien</span><span>105: ciento cinco</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson5')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson5 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson5 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 6 */}
              {activeSection === 'lesson6' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 6</span><h2 className="font-display text-2xl font-bold text-text-primary">Verb ESTAR & Numbers &gt;100</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-text-primary">Verb ESTAR (Location & Temporary States)</h4>
                      <span className="text-[10px] font-hud bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full font-bold">P.L.A.C.E. Rule</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Yo</span><span className="font-bold text-terracotta">estoy</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Tú</span><span className="font-bold text-terracotta">estás</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Él / Ella</span><span className="font-bold text-terracotta">está</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Nosotros</span><span className="font-bold text-terracotta">estamos</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Vosotros</span><span className="font-bold text-terracotta">estáis</span></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-pencil block">Ellos / Ellas</span><span className="font-bold text-terracotta">están</span></div>
                    </div>
                    <p className="text-xs text-pencil">PLACE = Position, Location, Action (progressive), Condition, Emotion. E.g. "Estoy en Madrid" / "Ella está feliz".</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson6')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson6 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson6 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 7 */}
              {activeSection === 'lesson7' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 7</span><h2 className="font-display text-2xl font-bold text-text-primary">Regular -ER & -IR Verbs</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-marigold font-hud block uppercase">-ER Verbs: Comer (to eat)</span>
                      <div className="text-xs font-mono space-y-1 text-text-primary">
                        <div>yo com<strong>o</strong></div>
                        <div>tú com<strong>es</strong></div>
                        <div>él com<strong>e</strong></div>
                        <div>nosotros com<strong>emos</strong></div>
                        <div>ellos com<strong>en</strong></div>
                      </div>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-terracotta font-hud block uppercase">-IR Verbs: Vivir (to live)</span>
                      <div className="text-xs font-mono space-y-1 text-text-primary">
                        <div>yo viv<strong>o</strong></div>
                        <div>tú viv<strong>es</strong></div>
                        <div>él viv<strong>e</strong></div>
                        <div>nosotros viv<strong>imos</strong></div>
                        <div>ellos viv<strong>en</strong></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson7')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson7 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson7 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 8 */}
              {activeSection === 'lesson8' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 8</span><h2 className="font-display text-2xl font-bold text-text-primary">Verb IR & Near Future</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Irregular Verb IR (to go) & Near Future Formula</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural text-center"><span className="text-pencil block">Yo</span><span className="font-bold text-terracotta">voy</span></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural text-center"><span className="text-pencil block">Tú</span><span className="font-bold text-terracotta">vas</span></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural text-center"><span className="text-pencil block">Él</span><span className="font-bold text-terracotta">va</span></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural text-center"><span className="text-pencil block">Nosotros</span><span className="font-bold text-terracotta">vamos</span></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural text-center"><span className="text-pencil block">Vosotros</span><span className="font-bold text-terracotta">vais</span></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural text-center"><span className="text-pencil block">Ellos</span><span className="font-bold text-terracotta">van</span></div>
                    </div>
                    <div className="bg-marigold/10 p-3 rounded-xl border border-marigold/30 text-xs text-text-primary font-bold">
                      Near Future Formula: IR + A + INFINITIVE (e.g., "Voy a estudiar" = I am going to study).
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson8')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson8 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson8 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 9 */}
              {activeSection === 'lesson9' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 9</span><h2 className="font-display text-2xl font-bold text-text-primary">Days, Months, Seasons & Dates</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-terracotta uppercase font-hud block">Days of the Week</span>
                      <p className="text-xs text-pencil">lunes, martes, miércoles, jueves, viernes, sábado, domingo. (All masculine & lowercase).</p>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-marigold uppercase font-hud block">Seasons (Estaciones)</span>
                      <p className="text-xs text-pencil">la primavera (spring), el verano (summer), el otoño (autumn), el invierno (winter).</p>
                    </div>
                  </div>
                  <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 text-xs text-pencil">
                    Date Formula: <strong className="text-text-primary">Es el [number] de [month]</strong> (e.g. "Es el 15 de mayo").
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson9')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson9 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson9 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 10 */}
              {activeSection === 'lesson10' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 10</span><h2 className="font-display text-2xl font-bold text-text-primary">Telling Time with SER</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">¿Qué hora es? (What time is it?)</h4>
                    <ul className="text-xs space-y-1.5 text-pencil">
                      <li>• <strong className="text-text-primary">Es la una</strong> = It is 1:00 (singular).</li>
                      <li>• <strong className="text-text-primary">Son las dos</strong> = It is 2:00 (plural for 2:00-12:00).</li>
                      <li>• <strong className="text-text-primary">Son las tres y cuarto</strong> = It is 3:15 (quarter past).</li>
                      <li>• <strong className="text-text-primary">Son las cuatro y media</strong> = It is 4:30 (half past).</li>
                      <li>• <strong className="text-text-primary">Son las cinco menos diez</strong> = It is 4:50 (ten to five).</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson10')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson10 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson10 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 11 */}
              {activeSection === 'lesson11' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 11</span><h2 className="font-display text-2xl font-bold text-text-primary">Verb TENER & Idiomatic Expressions</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Tener Idioms (States & Physical Sensations)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-text-primary">
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener frío (cold)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener calor (hot)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener hambre (hungry)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener sed (thirsty)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener prisa (hurry)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener miedo (afraid)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener razón (right)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener X años (age)</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson11')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson11 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson11 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 12 */}
              {activeSection === 'lesson12' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 12</span><h2 className="font-display text-2xl font-bold text-text-primary">Hacer Weather & Saber vs Conocer</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-terracotta font-hud uppercase block">SABER (Facts & Skills)</span>
                      <p className="text-xs text-pencil">Sé, sabes, sabe... Used for information, data, or how to do something (saber + inf).</p>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-marigold font-hud uppercase block">CONOCER (People & Places)</span>
                      <p className="text-xs text-pencil">Conozco, conoces, conoce... Used for being familiar with a person, city, or complex topic.</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson12')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson12 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson12 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 13 */}
              {activeSection === 'lesson13' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 13</span><h2 className="font-display text-2xl font-bold text-text-primary">Stem-Changing Boot Verbs</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Present Stem Changes (All forms EXCEPT nosotros/vosotros)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-marigold font-bold block">E &rarr; IE</span>querer &rarr; quiero</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-marigold font-bold block">O &rarr; UE</span>poder &rarr; puedo</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-marigold font-bold block">E &rarr; I</span>pedir &rarr; pido</div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural"><span className="text-marigold font-bold block">U &rarr; UE</span>jugar &rarr; juego</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson13')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson13 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson13 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 14 */}
              {activeSection === 'lesson14' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 14</span><h2 className="font-display text-2xl font-bold text-text-primary">Yo-Go Verbs & Irregular Yo Forms</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Irregular -GO Yo Forms in Present Tense</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-text-primary">
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">poner &rarr; <strong className="text-terracotta">pongo</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">salir &rarr; <strong className="text-terracotta">salgo</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">traer &rarr; <strong className="text-terracotta">traigo</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">hacer &rarr; <strong className="text-terracotta">hago</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">decir &rarr; <strong className="text-terracotta">digo</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">venir &rarr; <strong className="text-terracotta">vengo</strong></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson14')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson14 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson14 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 15 */}
              {activeSection === 'lesson15' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 15</span><h2 className="font-display text-2xl font-bold text-text-primary">Present Progressive Tense</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Formula: ESTAR + Gerundio (-ando / -iendo)</h4>
                    <p className="text-xs text-pencil">Examples: estoy hablando (I am talking), están comiendo (they are eating), estamos viviendo (we are living).</p>
                    <div className="bg-marigold/10 p-3 rounded-xl border border-marigold/30 text-xs text-text-primary font-mono">
                      Vowel Root Irregulars: leer &rarr; leyendo, oír &rarr; oyendo, traer &rarr; trayendo.
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson15')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson15 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson15 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 16 */}
              {activeSection === 'lesson16' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 16</span><h2 className="font-display text-2xl font-bold text-text-primary">Direct Object Pronouns & Adverbs</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Direct Object Pronouns (DOPs)</h4>
                    <p className="text-xs font-mono text-terracotta font-bold">me, te, lo, la, nos, os, los, las</p>
                    <p className="text-xs text-pencil">DOPs replace direct object nouns and sit BEFORE single conjugated verbs (e.g. "Lo tengo" = I have it).</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson16')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson16 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson16 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 17 */}
              {activeSection === 'lesson17' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 17</span><h2 className="font-display text-2xl font-bold text-text-primary">Possessives & Demonstratives</h2></div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-paper/5 p-3 rounded-xl border border-pencil/15"><strong className="text-terracotta font-hud block mb-1">CLOSE (this/these)</strong>este, esta, estos, estas</div>
                    <div className="bg-paper/5 p-3 rounded-xl border border-pencil/15"><strong className="text-marigold font-hud block mb-1">MEDIUM (that/those)</strong>ese, esa, esos, esas</div>
                    <div className="bg-paper/5 p-3 rounded-xl border border-pencil/15"><strong className="text-teal-deep font-hud block mb-1">FAR (that over there)</strong>aquel, aquella, aquellos</div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson17')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson17 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson17 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 18 */}
              {activeSection === 'lesson18' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 18</span><h2 className="font-display text-2xl font-bold text-text-primary">Affirmatives & Negatives</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Affirmative vs Negative Word Pairs</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-text-primary">
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">algo &harr; nada</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">alguien &harr; nadie</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">siempre &harr; nunca</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">también &harr; tampoco</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson18')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson18 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson18 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 19 */}
              {activeSection === 'lesson19' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 19</span><h2 className="font-display text-2xl font-bold text-text-primary">Indirect Objects & Verb Gustar</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Gustar Formula: [IOP] + gusta/gustan + [Subject]</h4>
                    <p className="text-xs text-pencil font-mono text-terracotta">IOPs: me, te, le, nos, os, les</p>
                    <p className="text-xs text-pencil">Use <strong>gusta</strong> for singular nouns/infinitives ("Me gusta cantar"). Use <strong>gustan</strong> for plural nouns ("Me gustan los libros").</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson19')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson19 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson19 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 20 */}
              {activeSection === 'lesson20' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 20</span><h2 className="font-display text-2xl font-bold text-text-primary">Double Object Pronouns</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Order: Indirect before Direct (People before Things)</h4>
                    <p className="text-xs text-pencil font-bold">The "Se La" Rule: When indirect pronoun "le/les" comes before "lo/la/los/las", change "le/les" to SE. (e.g., "Se lo doy" = I give it to him).</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson20')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson20 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson20 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 21 */}
              {activeSection === 'lesson21' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 21</span><h2 className="font-display text-2xl font-bold text-text-primary">Reflexive Verbs & Daily Routine</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Reflexive Pronouns (me, te, se, nos, os, se)</h4>
                    <p className="text-xs text-pencil">Actions performed on oneself. E.g. lavarse las manos (wash hands), levantarse (get up), vestirse (dress oneself).</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson21')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson21 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson21 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 22 */}
              {activeSection === 'lesson22' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 22</span><h2 className="font-display text-2xl font-bold text-text-primary">Recent Past & Duration</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Acabar de + Infinitive (Recent Past)</h4>
                    <p className="text-xs text-pencil font-mono">"Acabo de comer" = I have just eaten.</p>
                    <h4 className="font-bold text-sm text-text-primary pt-2">Hace + time + que + Present (Duration)</h4>
                    <p className="text-xs text-pencil font-mono">"Hace dos años que estudio" = I have been studying for two years.</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson22')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson22 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson22 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 23 */}
              {activeSection === 'lesson23' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 23</span><h2 className="font-display text-2xl font-bold text-text-primary">Present Duration & Time Queries</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 text-xs text-pencil space-y-2">
                    <p><strong className="text-text-primary">¿Desde cuándo...?</strong> = Since when...?</p>
                    <p><strong className="text-text-primary">desde hace 3 años</strong> = for 3 years.</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson23')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson23 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson23 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 24 */}
              {activeSection === 'lesson24' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 24</span><h2 className="font-display text-2xl font-bold text-text-primary">Formal Commands & Comparisons</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Formal Commands (Usted / Ustedes) Vowel Swap</h4>
                    <p className="text-xs text-pencil">-AR verbs &rarr; -e / -en (hablar &rarr; hable). -ER/-IR verbs &rarr; -a / -an (comer &rarr; coma).</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson24')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson24 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson24 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 25 */}
              {activeSection === 'lesson25' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 25</span><h2 className="font-display text-2xl font-bold text-text-primary">Informal Tú Commands (Mandatos)</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">8 Irregular Affirmative Tú Commands</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-terracotta font-bold">
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Haz (hacer)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Ten (tener)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Pon (poner)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Sal (salir)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Ve (ir)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Di (decir)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Ven (venir)</div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">Sé (ser)</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson25')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson25 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson25 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 26 */}
              {activeSection === 'lesson26' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 26</span><h2 className="font-display text-2xl font-bold text-text-primary">Preterite Tense Regulars</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-terracotta font-hud uppercase block">-AR Preterite: Hablar</span>
                      <div className="text-xs font-mono text-text-primary space-y-1">
                        <div>habl<strong>é</strong>, habl<strong>aste</strong>, habl<strong>ó</strong></div>
                        <div>habl<strong>amos</strong>, habl<strong>aron</strong></div>
                      </div>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-marigold font-hud uppercase block">-ER/-IR Preterite: Comer</span>
                      <div className="text-xs font-mono text-text-primary space-y-1">
                        <div>com<strong>í</strong>, com<strong>iste</strong>, com<strong>ió</strong></div>
                        <div>com<strong>imos</strong>, com<strong>ieron</strong></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson26')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson26 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson26 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 27 */}
              {activeSection === 'lesson27' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 27</span><h2 className="font-display text-2xl font-bold text-text-primary">Imperfect Tense</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Only 3 Irregular Verbs in Imperfect!</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono text-text-primary">
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural">ser &rarr; <strong className="text-marigold">era</strong></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural">ir &rarr; <strong className="text-marigold">iba</strong></div>
                      <div className="bg-bg-elevated p-2.5 rounded-xl border border-structural">ver &rarr; <strong className="text-marigold">veía</strong></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson27')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson27 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson27 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 28 */}
              {activeSection === 'lesson28' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 28</span><h2 className="font-display text-2xl font-bold text-text-primary">Preterite Irregulars</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Key Irregular Preterite Yo Forms</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-text-primary">
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">ser / ir &rarr; <strong>fui</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">estar &rarr; <strong>estuve</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">tener &rarr; <strong>tuve</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">hacer &rarr; <strong>hice</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">poder &rarr; <strong>pude</strong></div>
                      <div className="bg-bg-elevated p-2 rounded-xl border border-structural">decir &rarr; <strong>dije</strong></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson28')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson28 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson28 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 29 */}
              {activeSection === 'lesson29' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 29</span><h2 className="font-display text-2xl font-bold text-text-primary">Preterite vs Imperfect Master Rules</h2></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-terracotta font-hud uppercase block">Preterite (Completed Event)</span>
                      <p className="text-xs text-pencil">Specific start & end time, single action, interrupting event. (What happened!).</p>
                    </div>
                    <div className="bg-paper/5 p-4 rounded-2xl border border-pencil/15 space-y-2">
                      <span className="text-xs font-bold text-marigold font-hud uppercase block">Imperfect (Ongoing Setting)</span>
                      <p className="text-xs text-pencil">Background scene, ongoing habits, age, time, weather in past. (What was happening!).</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson29')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson29 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson29 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 30 */}
              {activeSection === 'lesson30' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 30</span><h2 className="font-display text-2xl font-bold text-text-primary">Superlatives & Grand Synthesis</h2></div>
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-sm text-text-primary">Superlatives & Irregular Comparatives</h4>
                    <p className="text-xs text-pencil">Formulas: el/la más... (the most), -ísimo/a (super/extremely). Irregulars: bueno &rarr; <strong>mejor</strong>, malo &rarr; <strong>peor</strong>.</p>
                  </div>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson30')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson30 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson30 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* MASTER EXAMS (Part 1 - 7) */}
              {(activeSection === 'exam' || activeSection === 'exam2' || activeSection === 'exam3' || activeSection === 'exam4' || activeSection === 'exam5' || activeSection === 'exam6' || activeSection === 'exam7') && (
                <div className="space-y-6">
                  <div className="bg-paper/5 border border-pencil/15 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-hud uppercase tracking-wider text-marigold font-bold block mb-1">
                          {PART_BADGES[coursePart].title}
                        </span>
                        <h2 className="font-display text-2xl font-bold text-text-primary">
                          {PART_OPTIONS.find(o => o.id === coursePart)?.label.split(':')[0]} Master Exam 🏆
                        </h2>
                      </div>
                      <div className="flex items-center gap-1.5 bg-marigold/10 border border-marigold/30 text-marigold rounded-full px-3 py-1 text-xs font-bold font-hud">
                        <Award className="h-4 w-4" />
                        <span>+{PART_BADGES[coursePart].coins} Coins / +{PART_BADGES[coursePart].xp} XP</span>
                      </div>
                    </div>

                    {!quizFinished ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs text-pencil font-hud">
                          <span>Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
                          <span>Score: {score}</span>
                        </div>

                        <div className="bg-bg-elevated p-5 rounded-2xl border border-structural space-y-4">
                          <h3 className="font-display text-base font-bold text-text-primary leading-relaxed">
                            {activeQuestions[currentQuestionIndex].question}
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {activeQuestions[currentQuestionIndex].options.map((option) => {
                              const isSelected = selectedAnswer === option;
                              const isCorrect = option === activeQuestions[currentQuestionIndex].correctAnswer;
                              
                              let btnStyle = 'bg-paper/5 border-pencil/15 text-text-primary hover:border-terracotta/40';
                              if (selectedAnswer !== null) {
                                if (isCorrect) {
                                  btnStyle = 'bg-teal-deep/20 border-teal-deep text-teal-deep font-bold';
                                } else if (isSelected) {
                                  btnStyle = 'bg-terracotta/20 border-terracotta text-terracotta font-bold';
                                }
                              }

                              return (
                                <button
                                  key={option}
                                  onClick={() => handleAnswerClick(option)}
                                  className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>

                          {showExplanation && (
                            <div className="p-3.5 rounded-xl bg-paper/10 border border-pencil/15 text-xs text-pencil space-y-1 animate-fadeIn">
                              <span className="font-bold text-text-primary block">Explanation:</span>
                              <p>{activeQuestions[currentQuestionIndex].explanation}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                            className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-bold text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-terracotta/90 cursor-pointer"
                          >
                            {currentQuestionIndex < activeQuestions.length - 1 ? 'Next Question &rarr;' : 'Finish Exam'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-marigold/15 text-marigold mb-2">
                          <Trophy className="h-12 w-12" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-text-primary">Exam Completed!</h3>
                        <p className="text-sm text-pencil">
                          You scored <strong className="text-text-primary font-bold">{score} / {activeQuestions.length}</strong> ({Math.round((score / activeQuestions.length) * 100)}%).
                        </p>

                        {(score / activeQuestions.length) >= 0.7 ? (
                          <div className="bg-teal-deep/10 border border-teal-deep/30 rounded-2xl p-4 max-w-md mx-auto space-y-2">
                            <span className="font-hud text-xs text-teal-deep font-bold uppercase tracking-wider block">Passing Grade Reached!</span>
                            <p className="text-xs text-text-primary">
                              You unlocked the <strong className="text-marigold">{PART_BADGES[coursePart].badge}</strong>!
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-terracotta font-semibold">
                            You need at least 70% to claim rewards and unlock the badge. Try again!
                          </p>
                        )}

                        <div className="flex justify-center gap-3 pt-2">
                          <button
                            onClick={resetQuiz}
                            className="px-4 py-2 rounded-xl bg-paper/10 border border-pencil/20 text-xs font-bold text-pencil hover:text-text-primary cursor-pointer"
                          >
                            Retake Exam
                          </button>
                          {(score / activeQuestions.length) >= 0.7 && !rewardClaimed && (
                            <button
                              onClick={claimQuizRewards}
                              className="px-5 py-2.5 rounded-xl bg-marigold text-bg-base font-bold text-xs shadow-md hover:bg-marigold/90 cursor-pointer"
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
