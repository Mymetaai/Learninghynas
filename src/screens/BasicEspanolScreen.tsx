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
  Volume2,
  Check,
  Trophy,
  GraduationCap,
  BookOpenCheck,
  Clock,
  Calendar,
  Zap,
  Shield,
  Star,
  Crown
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';

// ── Types & Data ────────────────────────────────────────────────────────────

type CoursePart = 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'part6' | 'part7';

type ActiveSection =
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

interface PartBadgeInfo {
  title: string;
  badge: string;
  xp: number;
  coins: number;
}

const PART_BADGES: Record<CoursePart, PartBadgeInfo> = {
  part1: { title: 'Part 1 Master', badge: 'Básico Principiante 🥇', xp: 100, coins: 50 },
  part2: { title: 'Part 2 Master', badge: 'Explorador Elemental 🥈', xp: 120, coins: 60 },
  part3: { title: 'Part 3 Master', badge: 'Cronista del Tiempo 🥉', xp: 150, coins: 70 },
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
  { letter: 'I', sound: 'ee', englishLike: 'like the "ee" in machine', examples: [{ spanish: 'sí', english: 'yes' }, { spanish: 'libro', english: 'book' }] },
  { letter: 'O', sound: 'oh', englishLike: 'like the "o" in boat', examples: [{ spanish: 'hola', english: 'hello' }, { spanish: 'perro', english: 'dog' }] },
  { letter: 'U', sound: 'oo', englishLike: 'like the "oo" in boot', examples: [{ spanish: 'uno', english: 'one' }, { spanish: 'música', english: 'music' }] },
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
    
    let earnedXP = Math.round(badgeInfo.xp * Math.max(0.5, passRate));
    let earnedCoins = Math.round(badgeInfo.coins * Math.max(0.5, passRate));
    
    // Add XP and Coins via store
    useStatsStore.getState().addRewards(earnedXP, earnedCoins);

    // Award badge if passing (score >= 60%)
    if (passRate >= 0.6) {
      setEarnedBadges(prev => {
        const next = { ...prev, [coursePart]: true };
        localStorage.setItem('wayfarer-basic-espanol-badges', JSON.stringify(next));
        return next;
      });
    }

    setRewardClaimed(true);
  };

  // Nav Items Lists for Parts 1 to 7
  const part1SectionsList = [
    { id: 'overview', title: 'Course Overview', icon: BookOpen },
    { id: 'lesson1', title: 'Lesson 1: Greetings & Vowels', icon: Volume2, sub: 'Greetings, Vowels & Dialogue' },
    { id: 'lesson2', title: 'Lesson 2: Articles & Nouns', icon: Layers, sub: 'Gender, Plurals & Exceptions' },
    { id: 'lesson3', title: 'Lesson 3: Pronouns & Ser', icon: Users, sub: 'Pronoun Matrix & Verb Ser' },
    { id: 'lesson4', title: 'Lesson 4: Regular -ar Verbs', icon: Sparkles, sub: 'AR Conjugation & Adjectives' },
    { id: 'exam', title: 'Part 1 Master Exam', icon: Award, sub: '8-Question Knowledge Test' },
  ];

  const part2SectionsList = [
    { id: 'lesson5', title: 'Lesson 5: Indefinite Articles & Numbers', icon: Layers, sub: 'Un/Una & Numbers 0–100' },
    { id: 'lesson6', title: 'Lesson 6: Verb Estar & Numbers >100', icon: Compass, sub: 'Conjugation, PLACE & Numbers >100' },
    { id: 'lesson7', title: 'Lesson 7: Regular -er/-ir Verbs', icon: Sparkles, sub: 'Conjugations & Key Verbs' },
    { id: 'lesson8', title: 'Lesson 8: Verb Ir & Question Words', icon: GraduationCap, sub: 'Ir + A, Near Future & Interrogativos' },
    { id: 'exam2', title: 'Part 2 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part3SectionsList = [
    { id: 'lesson9', title: 'Lesson 9: Days, Months & Dates', icon: Calendar, sub: 'Days of Week, Months, Formatting' },
    { id: 'lesson10', title: 'Lesson 10: Telling Time', icon: Clock, sub: 'Es la una, Son las dos, Time of Day' },
    { id: 'lesson11', title: 'Lesson 11: Verb Tener & Idioms', icon: Zap, sub: 'Tengo hambre/frío, Tener que + inf' },
    { id: 'lesson12', title: 'Lesson 12: Hacer & Weather', icon: Compass, sub: 'Hace frío/calor, Saber vs Conocer' },
    { id: 'exam3', title: 'Part 3 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part4SectionsList = [
    { id: 'lesson13', title: 'Lesson 13: Stem-Changing Boot Verbs', icon: Zap, sub: 'e->ie, o->ue, e->i, u->ue' },
    { id: 'lesson14', title: 'Lesson 14: Yo-Go Verbs & Irregulars', icon: Sparkles, sub: 'pongo, salgo, traigo, hago, sé' },
    { id: 'lesson15', title: 'Lesson 15: Present Progressive', icon: Clock, sub: 'estar + -ando/-iendo' },
    { id: 'lesson16', title: 'Lesson 16: Saber vs Conocer', icon: Shield, sub: 'Facts vs People, Personal A' },
    { id: 'exam4', title: 'Part 4 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part5SectionsList = [
    { id: 'lesson17', title: 'Lesson 17: Possessives', icon: Users, sub: 'mi/tu/su/nuestro, mío/tuyo/suyo' },
    { id: 'lesson18', title: 'Lesson 18: Demonstratives', icon: Compass, sub: 'este, ese, aquel distance rules' },
    { id: 'lesson19', title: 'Lesson 19: Affirmative & Negative', icon: Shield, sub: 'algo/nada, alguien/nadie, siempre' },
    { id: 'lesson20', title: 'Lesson 20: Direct Object Pronouns', icon: Layers, sub: 'me, te, lo, la, nos, los, las' },
    { id: 'lesson21', title: 'Lesson 21: Indirect Objects & Gustar', icon: Star, sub: 'le/les, me gusta, te gusta' },
    { id: 'exam5', title: 'Part 5 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part6SectionsList = [
    { id: 'lesson22', title: 'Lesson 22: Double Object Pronouns', icon: Layers, sub: 'la "se la" rule (se lo digo)' },
    { id: 'lesson23', title: 'Lesson 23: Reflexive Verbs & Routine', icon: Clock, sub: 'lavarse, vestirse, me/te/se' },
    { id: 'lesson24', title: 'Lesson 24: Informal Commands', icon: Zap, sub: 'haz, ve, ten, pon, sal, di' },
    { id: 'lesson25', title: 'Lesson 25: Preterite Regulars', icon: Calendar, sub: '-é, -aste, -ó, -í, -iste, -ió' },
    { id: 'lesson26', title: 'Lesson 26: Preterite Irregulars', icon: Crown, sub: 'fui, tuve, estuve, hice, pude' },
    { id: 'exam6', title: 'Part 6 Master Exam', icon: Trophy, sub: '10-Question Master Test' },
  ];

  const part7SectionsList = [
    { id: 'lesson27', title: 'Lesson 27: Imperfect Tense', icon: Calendar, sub: '-aba, -ía, era, iba, veía' },
    { id: 'lesson28', title: 'Lesson 28: Preterite vs Imperfect', icon: Shield, sub: 'Completed events vs background' },
    { id: 'lesson29', title: 'Lesson 29: Comparisons', icon: Sparkles, sub: 'más... que, tan... como, mejor/peor' },
    { id: 'lesson30', title: 'Lesson 30: Superlatives & Review', icon: Crown, sub: 'el más..., -ísimo, Grand Synthesis' },
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
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[20rem_1fr] min-h-[calc(100vh-3.5rem)]">
        
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

            {/* Course Part Selector Header (Parts 1 to 7) */}
            <div className="space-y-1">
              <span className="text-[10px] font-hud uppercase tracking-wider text-pencil font-bold block mb-1">Select Part:</span>
              <div className="grid grid-cols-4 gap-1 bg-bg-elevated p-1 rounded-xl border border-structural">
                {(['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'] as CoursePart[]).map((p, idx) => (
                  <button
                    key={p}
                    onClick={() => {
                      setCoursePart(p);
                      const list = p === 'part1' ? part1SectionsList : p === 'part2' ? part2SectionsList : p === 'part3' ? part3SectionsList : p === 'part4' ? part4SectionsList : p === 'part5' ? part5SectionsList : p === 'part6' ? part6SectionsList : part7SectionsList;
                      setActiveSection(list[0].id as ActiveSection);
                    }}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-hud uppercase tracking-wider font-bold transition-all cursor-pointer border-none text-center ${
                      coursePart === p
                        ? 'bg-accent-action text-bg-base shadow-sm'
                        : 'text-text-secondary hover:text-text-primary bg-transparent'
                    }`}
                  >
                    P{idx + 1}
                  </button>
                ))}
              </div>
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

            {/* Navigation Options */}
            <nav className="space-y-1">
              {sectionsList.map((sec) => {
                const IconComponent = sec.icon;
                const isActive = activeSection === sec.id;
                const isLesson = sec.id.startsWith('lesson');
                const isCompleted = isLesson && completedLessons[sec.id];
                
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id as ActiveSection)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-terracotta/15 border-terracotta/40 text-text-primary shadow-[0_0_15px_rgba(193,80,46,0.15)]'
                        : 'bg-transparent border-transparent text-pencil hover:text-text-primary hover:bg-paper/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1 rounded-lg shrink-0 ${isActive ? 'bg-terracotta/20 text-terracotta' : 'bg-paper/5 text-pencil'}`}>
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{sec.title}</div>
                        {sec.sub && <div className="text-[9px] text-pencil/80 font-normal truncate">{sec.sub}</div>}
                      </div>
                    </div>

                    {isCompleted && (
                      <div className="bg-teal-deep/20 text-teal-deep p-0.5 rounded-full border border-teal-deep/30 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer & Syllabus Progress */}
          <div className="pt-4 border-t border-pencil/15 space-y-2">
            <div className="flex justify-between items-center text-xs text-pencil">
              <span>Part Progress</span>
              <span className="font-semibold text-text-primary">{progressPercent}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-paper/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-terracotta to-marigold h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </aside>

        {/* MOBILE HEADER */}
        <header className="lg:hidden flex items-center justify-between sticky top-14 bg-bg-base/90 backdrop-blur-md px-4 py-3 border-b border-pencil/15 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg bg-paper/5 border border-pencil/10 text-text-primary"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <span className="font-hud text-[9px] tracking-[0.2em] uppercase text-pencil block">Básico Español</span>
              <span className="font-display text-sm font-bold text-text-primary">
                {sectionsList.find(s => s.id === activeSection)?.title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-paper/5 border border-pencil/15 rounded-full px-2.5 py-1 text-xs text-marigold font-semibold">
            <Trophy className="h-3.5 w-3.5" />
            <span>{completedInPart}/{totalLessonsInPart}</span>
          </div>
        </header>

        {/* MOBILE SIDEBAR DRAWER OVERLAY */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
              />

              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-0 bottom-0 left-0 w-80 bg-bg-base border-r border-pencil/15 p-5 z-50 overflow-y-auto lg:hidden flex flex-col justify-between"
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

                  {/* Course Part Selector (Mobile) */}
                  <div className="grid grid-cols-4 gap-1 bg-bg-elevated p-1 rounded-xl border border-structural">
                    {(['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'] as CoursePart[]).map((p, idx) => (
                      <button
                        key={p}
                        onClick={() => {
                          setCoursePart(p);
                          const list = p === 'part1' ? part1SectionsList : p === 'part2' ? part2SectionsList : p === 'part3' ? part3SectionsList : p === 'part4' ? part4SectionsList : p === 'part5' ? part5SectionsList : p === 'part6' ? part6SectionsList : part7SectionsList;
                          setActiveSection(list[0].id as ActiveSection);
                          setMobileSidebarOpen(false);
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-hud uppercase tracking-wider font-bold transition-all cursor-pointer border-none text-center ${
                          coursePart === p
                            ? 'bg-accent-action text-bg-base shadow-sm'
                            : 'text-text-secondary hover:text-text-primary bg-transparent'
                        }`}
                      >
                        P{idx + 1}
                      </button>
                    ))}
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
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left cursor-pointer ${
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
                      {([
                        { part: 'part1', title: 'Part 1: Greetings & Basics (L1-4)', desc: 'Vowels, Greetings, Nouns, Pronouns & SER, -AR Verbs' },
                        { part: 'part2', title: 'Part 2: Estar, Ir & Numbers (L5-8)', desc: 'Indefinite Articles, ESTAR, -ER/-IR Verbs, IR & Questions' },
                        { part: 'part3', title: 'Part 3: Dates, Time & Tener (L9-12)', desc: 'Days, Months, Time, Tener Idioms, Weather & Saber/Conocer' },
                        { part: 'part4', title: 'Part 4: Stem Changers & Yo-Go (L13-16)', desc: 'Boot Verbs, Yo-Go Verbs, Present Progressive, Prepositions' },
                        { part: 'part5', title: 'Part 5: Pronouns & Gustar (L17-21)', desc: 'Possessives, Demonstratives, Negatives, DOPs, IOPs & Gustar' },
                        { part: 'part6', title: 'Part 6: Double Objects & Preterite (L22-26)', desc: 'Double Objects, Reflexives, Commands, Preterite Regular & Irregular' },
                        { part: 'part7', title: 'Part 7: Imperfect & Comparisons (L27-30)', desc: 'Imperfect Tense, Preterite vs Imperfect, Comparisons, Superlatives' },
                      ] as { part: CoursePart; title: string; desc: string }[]).map((item) => (
                        <div
                          key={item.part}
                          onClick={() => {
                            setCoursePart(item.part);
                            const list = item.part === 'part1' ? part1SectionsList : item.part === 'part2' ? part2SectionsList : item.part === 'part3' ? part3SectionsList : item.part === 'part4' ? part4SectionsList : item.part === 'part5' ? part5SectionsList : item.part === 'part6' ? part6SectionsList : part7SectionsList;
                            setActiveSection(list[0].id as ActiveSection);
                          }}
                          className="bg-paper/5 border border-pencil/10 hover:border-pencil/35 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] space-y-2 group"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-hud tracking-wider text-pencil uppercase font-bold">{item.title.split(':')[0]}</span>
                            {earnedBadges[item.part] && <Trophy className="h-4 w-4 text-marigold" />}
                          </div>
                          <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-terracotta transition-colors">
                            {item.title}
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

              {/* LESSON 1 - 4 (Part 1 Views) */}
              {activeSection === 'lesson1' && (
                <div className="space-y-6">
                  <div>
                    <span className="font-hud text-xs text-terracotta font-semibold tracking-wider block">LESSON 1</span>
                    <h2 className="font-display text-2xl font-bold text-text-primary">Intro to Spanish & Greetings</h2>
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
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center">
                    <span className="text-xs text-pencil">Mark lesson completed when done.</span>
                    <button onClick={() => handleLessonComplete('lesson1')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson1 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson1 ? 'Completed ✓' : 'Mark Completed'}</button>
                  </div>
                </div>
              )}

              {activeSection === 'lesson2' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 2</span><h2 className="font-display text-2xl font-bold text-text-primary">Definite Articles & Nouns</h2></div>
                  <p className="text-xs text-pencil">Definite articles: el, la, los, las. Exceptions: el mapa, la mano, el agua.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson2')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson2 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson2 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson3' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 3</span><h2 className="font-display text-2xl font-bold text-text-primary">Subject Pronouns & Verb Ser</h2></div>
                  <p className="text-xs text-pencil">Conjugations of Ser: yo soy, tú eres, él/ella/Ud. es, nosotros somos, vosotros sois, ellos son.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson3')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson3 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson3 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson4' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 4</span><h2 className="font-display text-2xl font-bold text-text-primary">Regular -AR Verbs</h2></div>
                  <p className="text-xs text-pencil">-AR Endings: -o, -as, -a, -amos, -áis, -an. Examples: hablar, estudiar, trabajar.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson4')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson4 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson4 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 5 - 8 (Part 2 Views) */}
              {activeSection === 'lesson5' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 5</span><h2 className="font-display text-2xl font-bold text-text-primary">Indefinite Articles & Numbers 0–100</h2></div>
                  <p className="text-xs text-pencil">Indefinite articles: un, una, unos, unas. Numbers: cero, uno, diez, veinte, treinta, cien.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson5')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson5 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson5 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson6' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 6</span><h2 className="font-display text-2xl font-bold text-text-primary">Verb Estar & Numbers &gt;100</h2></div>
                  <p className="text-xs text-pencil">Estar for PLACE: estoy, estás, está, estamos, estáis, están. Numbers: ciento, quinientos, mil.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson6')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson6 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson6 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson7' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 7</span><h2 className="font-display text-2xl font-bold text-text-primary">Regular -ER & -IR Verbs</h2></div>
                  <p className="text-xs text-pencil">-ER: -o, -es, -e, -emos, -éis, -en. -IR: -o, -es, -e, -imos, -ís, -en. Key verbs: comer, beber, vivir.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson7')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson7 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson7 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson8' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 8</span><h2 className="font-display text-2xl font-bold text-text-primary">Verb Ir & Question Words</h2></div>
                  <p className="text-xs text-pencil">Ir: voy, vas, va, vamos, vais, van. Formula: ir + a + infinitive. Interrogativos: ¿Qué?, ¿Dónde?, ¿Adónde?</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson8')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson8 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson8 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 9 - 12 (Part 3 Views) */}
              {activeSection === 'lesson9' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 9</span><h2 className="font-display text-2xl font-bold text-text-primary">Days, Months, Seasons & Dates</h2></div>
                  <p className="text-xs text-pencil">lunes, martes, miércoles... enero, febrero... primavera, verano. Dates: el 5 de mayo.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson9')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson9 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson9 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson10' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 10</span><h2 className="font-display text-2xl font-bold text-text-primary">Telling Time</h2></div>
                  <p className="text-xs text-pencil">¿Qué hora es? Es la una (1:00). Son las dos (2:00+). Add minutes with "y", subtract with "menos".</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson10')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson10 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson10 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson11' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 11</span><h2 className="font-display text-2xl font-bold text-text-primary">Verb Tener & Idioms</h2></div>
                  <p className="text-xs text-pencil">Tener: tengo, tienes, tiene, tenemos, tenéis, tienen. Idioms: tener hambre/frío/miedo/prisa, tener que + inf.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson11')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson11 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson11 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson12' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 12</span><h2 className="font-display text-2xl font-bold text-text-primary">Hacer, Weather & Saber vs Conocer</h2></div>
                  <p className="text-xs text-pencil">Hacer: hago, haces... Weather: Hace frío/calor/sol. Saber (facts/skills: sé) vs Conocer (people/places: conozco).</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson12')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson12 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson12 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 13 - 16 (Part 4 Views) */}
              {activeSection === 'lesson13' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 13</span><h2 className="font-display text-2xl font-bold text-text-primary">Stem-Changing Boot Verbs</h2></div>
                  <p className="text-xs text-pencil">Categories: e &rarr; ie (querer), o &rarr; ue (poder), e &rarr; i (pedir), u &rarr; ue (jugar). No change in nosotros/vosotros.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson13')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson13 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson13 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson14' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 14</span><h2 className="font-display text-2xl font-bold text-text-primary">Yo-Go Verbs & Irregulars</h2></div>
                  <p className="text-xs text-pencil">Yo-Go forms: pongo (poner), salgo (salir), traigo (traer), hago (hacer), digo (decir), sé (saber).</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson14')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson14 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson14 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson15' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 15</span><h2 className="font-display text-2xl font-bold text-text-primary">Present Progressive</h2></div>
                  <p className="text-xs text-pencil">Formula: estar + gerundio (-ando / -iendo). Irregulars: leyendo, oyendo, trayendo.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson15')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson15 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson15 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson16' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 16</span><h2 className="font-display text-2xl font-bold text-text-primary">Saber vs Conocer & Prepositions</h2></div>
                  <p className="text-xs text-pencil">Saber (sé) for facts/skills. Conocer (conozco) for familiarity. Prepositions: encima de, debajo de, detrás de.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson16')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson16 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson16 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 17 - 21 (Part 5 Views) */}
              {activeSection === 'lesson17' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 17</span><h2 className="font-display text-2xl font-bold text-text-primary">Possessives</h2></div>
                  <p className="text-xs text-pencil">Adjectives: mi/mis, tu/tus, su/sus, nuestro/a/os/as. Long form: mío, tuyo, suyo, nuestro.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson17')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson17 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson17 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson18' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 18</span><h2 className="font-display text-2xl font-bold text-text-primary">Demonstratives</h2></div>
                  <p className="text-xs text-pencil">Distance rules: este/esta (here), ese/esa (there), aquel/aquella (far away over there).</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson18')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson18 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson18 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson19' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 19</span><h2 className="font-display text-2xl font-bold text-text-primary">Affirmatives & Negatives</h2></div>
                  <p className="text-xs text-pencil">Pairs: algo &harr; nada, alguien &harr; nadie, siempre &harr; nunca, también &harr; tampoco.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson19')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson19 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson19 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson20' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 20</span><h2 className="font-display text-2xl font-bold text-text-primary">Direct Object Pronouns</h2></div>
                  <p className="text-xs text-pencil">Pronouns: me, te, lo, la, nos, os, los, las. Placed BEFORE conjugated verbs (e.g. Lo veo).</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson20')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson20 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson20 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson21' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 21</span><h2 className="font-display text-2xl font-bold text-text-primary">Indirect Objects & Gustar</h2></div>
                  <p className="text-xs text-pencil">IOPs: me, te, le, nos, os, les. Verb gustar: me gusta (sing.) / me gustan (plural).</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson21')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson21 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson21 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 22 - 26 (Part 6 Views) */}
              {activeSection === 'lesson22' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 22</span><h2 className="font-display text-2xl font-bold text-text-primary">Double Object Pronouns</h2></div>
                  <p className="text-xs text-pencil">Order: Indirect before Direct (People before Things). "Se La" rule: le/les becomes SE before lo/la.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson22')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson22 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson22 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson23' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 23</span><h2 className="font-display text-2xl font-bold text-text-primary">Reflexive Verbs & Routine</h2></div>
                  <p className="text-xs text-pencil">Reflexive pronouns: me, te, se, nos, os, se. Daily routine: lavarse, levantarse, vestirse, acostarse.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson23')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson23 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson23 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson24' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 24</span><h2 className="font-display text-2xl font-bold text-text-primary">Informal Commands (Mandatos)</h2></div>
                  <p className="text-xs text-pencil">Affirmative Tú commands: 8 irregulars — haz, ten, pon, sal, ve, di, ven, sé.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson24')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson24 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson24 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson25' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 25</span><h2 className="font-display text-2xl font-bold text-text-primary">Preterite Tense Regulars</h2></div>
                  <p className="text-xs text-pencil">-AR endings: -é, -aste, -ó, -amos, -aron. -ER/-IR endings: -í, -iste, -ió, -imos, -ieron.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson25')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson25 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson25 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson26' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-marigold font-semibold block">LESSON 26</span><h2 className="font-display text-2xl font-bold text-text-primary">Preterite Tense Irregulars</h2></div>
                  <p className="text-xs text-pencil">Irregulars: ir/ser = fui, tener = tuve, estar = estuve, hacer = hice, poder = pude, decir = dije.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson26')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson26 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson26 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* LESSON 27 - 30 (Part 7 Views) */}
              {activeSection === 'lesson27' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 27</span><h2 className="font-display text-2xl font-bold text-text-primary">Imperfect Tense</h2></div>
                  <p className="text-xs text-pencil">-AR: -aba, -abas, -aba... -ER/-IR: -ía, -ías, -ía... Irregulars (only 3!): era (ser), iba (ir), veía (ver).</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson27')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson27 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson27 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson28' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 28</span><h2 className="font-display text-2xl font-bold text-text-primary">Preterite vs Imperfect</h2></div>
                  <p className="text-xs text-pencil">Imperfect = background, habit, ongoing. Preterite = completed event, specific point, interruption.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson28')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson28 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson28 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson29' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 29</span><h2 className="font-display text-2xl font-bold text-text-primary">Comparisons of Equality & Inequality</h2></div>
                  <p className="text-xs text-pencil">Equality: tan... como (adj), tanto... como (noun). Inequality: más... que, menos... que, mejor/peor.</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson29')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson29 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson29 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {activeSection === 'lesson30' && (
                <div className="space-y-6">
                  <div><span className="font-hud text-xs text-terracotta font-semibold block">LESSON 30</span><h2 className="font-display text-2xl font-bold text-text-primary">Superlatives & Grand Synthesis</h2></div>
                  <p className="text-xs text-pencil">Relative: el/la más... Absolute: -ísimo / -ísima. Grand Review of all 30 Spanish curriculum lessons!</p>
                  <div className="pt-4 border-t border-pencil/15 flex justify-between items-center"><button onClick={() => handleLessonComplete('lesson30')} className={`px-4 py-2 rounded-xl text-xs font-bold ${completedLessons.lesson30 ? 'bg-teal-deep/15 text-teal-deep' : 'bg-terracotta text-white'}`}>{completedLessons.lesson30 ? 'Completed ✓' : 'Mark Completed'}</button></div>
                </div>
              )}

              {/* MASTER EXAMS VIEW (Exam 1 - 7) */}
              {activeSection.startsWith('exam') && (
                <div className="space-y-6">
                  {!quizFinished ? (
                    <div className="bg-bg-elevated border border-structural rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                      <div className="flex justify-between items-center border-b border-structural pb-4">
                        <div>
                          <span className="font-hud text-[10px] uppercase tracking-wider text-accent-action font-bold">
                            {PART_BADGES[coursePart].title}
                          </span>
                          <h3 className="font-display text-xl font-bold text-text-primary">
                            Master Exam — Question {currentQuestionIndex + 1} of {activeQuestions.length}
                          </h3>
                        </div>
                        <div className="bg-marigold/10 border border-marigold/30 text-marigold rounded-full px-3 py-1 text-xs font-bold font-hud">
                          Score: {score}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="font-display text-base font-semibold text-text-primary">
                          {activeQuestions[currentQuestionIndex].question}
                        </p>

                        <div className="grid grid-cols-1 gap-2.5">
                          {activeQuestions[currentQuestionIndex].options.map((opt, idx) => {
                            const isSelected = selectedAnswer === opt;
                            const isCorrect = opt === activeQuestions[currentQuestionIndex].correctAnswer;
                            
                            let btnStyle = 'bg-bg-base/60 border-structural text-text-primary hover:border-accent-action';
                            if (selectedAnswer !== null) {
                              if (isCorrect) btnStyle = 'bg-success/20 border-success text-success font-bold';
                              else if (isSelected) btnStyle = 'bg-error/20 border-error text-error font-bold';
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleAnswerClick(opt)}
                                disabled={selectedAnswer !== null}
                                className={`w-full p-4 rounded-2xl border text-left text-xs transition-all duration-200 cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {showExplanation && (
                        <div className="p-4 rounded-2xl bg-bg-base/80 border border-structural space-y-3">
                          <p className="text-xs text-text-secondary">
                            {activeQuestions[currentQuestionIndex].explanation}
                          </p>
                          <button
                            onClick={handleNextQuestion}
                            className="bg-accent-action text-bg-base font-bold text-xs uppercase px-4 py-2 rounded-xl border-none shadow cursor-pointer ml-auto block"
                          >
                            {currentQuestionIndex < activeQuestions.length - 1 ? 'Next Question →' : 'Finish Exam'}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Exam Finished Results View */
                    <div className="bg-bg-elevated border border-structural rounded-3xl p-8 text-center space-y-6 shadow-2xl">
                      <div className="text-5xl">🏆</div>
                      <h3 className="font-display text-2xl font-bold text-text-primary">
                        {PART_BADGES[coursePart].title} Completed!
                      </h3>
                      <p className="text-xs text-pencil">
                        You scored <strong>{score}</strong> / <strong>{activeQuestions.length}</strong> ({Math.round((score / activeQuestions.length) * 100)}%).
                      </p>

                      {/* Badge awarded card */}
                      <div className="bg-gradient-to-r from-terracotta/15 to-marigold/15 border border-marigold/40 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                        <span className="text-xs font-hud uppercase tracking-wider text-marigold font-bold block">Part Badge Awarded</span>
                        <div className="text-2xl font-bold text-text-primary">{PART_BADGES[coursePart].badge}</div>
                        <div className="flex justify-around text-xs font-hud pt-2 border-t border-pencil/15">
                          <span className="text-marigold font-bold">+{PART_BADGES[coursePart].xp} XP</span>
                          <span className="text-marigold font-bold">+{PART_BADGES[coursePart].coins} Coins</span>
                        </div>
                      </div>

                      <button
                        onClick={claimQuizRewards}
                        disabled={rewardClaimed}
                        className={`px-8 py-3.5 rounded-xl font-hud text-xs uppercase tracking-wider font-bold border-none transition-all cursor-pointer shadow-lg ${
                          rewardClaimed ? 'bg-pencil/20 text-pencil/50 cursor-not-allowed' : 'bg-accent-action text-bg-base hover:bg-accent-action-hover'
                        }`}
                      >
                        {rewardClaimed ? 'Rewards & Badge Claimed ✓' : 'Claim XP, Coins & Badge'}
                      </button>

                      <div className="pt-4 border-t border-structural">
                        <button onClick={resetQuiz} className="text-xs font-hud uppercase text-accent-action hover:underline cursor-pointer bg-transparent border-none">
                          Retry Exam 🔄
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation Bottom Footer */}
          <div className="mt-10 pt-4 border-t border-pencil/15 flex justify-between items-center text-xs">
            <button
              disabled={activeSection === 'overview'}
              onClick={() => {
                const idx = sectionsList.findIndex(s => s.id === activeSection);
                if (idx > 0) setActiveSection(sectionsList[idx - 1].id as ActiveSection);
              }}
              className="px-3 py-1.5 border border-pencil/10 rounded-xl bg-paper/5 text-pencil hover:text-text-primary disabled:opacity-30 cursor-pointer"
            >
              &larr; Back
            </button>
            <span className="text-pencil font-hud text-[10px] uppercase">
              Section {sectionsList.findIndex(s => s.id === activeSection) + 1} of {sectionsList.length}
            </span>
            <button
              disabled={activeSection.startsWith('exam')}
              onClick={() => {
                const idx = sectionsList.findIndex(s => s.id === activeSection);
                if (idx < sectionsList.length - 1) setActiveSection(sectionsList[idx + 1].id as ActiveSection);
              }}
              className="px-3 py-1.5 border border-pencil/10 rounded-xl bg-paper/5 text-pencil hover:text-text-primary disabled:opacity-30 cursor-pointer"
            >
              Next &rarr;
            </button>
          </div>

        </main>
      </div>

    </div>
  );
};

export default BasicEspanolScreen;
