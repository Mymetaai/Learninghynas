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

  // Interactive Quick Practice state per lesson
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<string, string>>({});

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

  // Helper to retrieve structured lesson data
  const currentLessonData: SyllabusLessonData | undefined = activeSection.startsWith('lesson') ? ALL_SYLLABUS_LESSONS[activeSection] : undefined;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary relative overflow-x-hidden font-body pb-16">
      
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

              {/* RICH TEXTBOOK-GRADE LESSON PAGE RENDERER (ALL LESSONS 1 TO 30) */}
              {activeSection.startsWith('lesson') && currentLessonData && (
                <div className="space-y-8">
                  
                  {/* 1. LESSON HEADER BANNER */}
                  <div className="bg-gradient-to-r from-terracotta/10 via-paper/5 to-marigold/10 border border-pencil/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="font-hud text-xs text-marigold font-bold uppercase tracking-widest block mb-1">
                          PART {currentLessonData.partNumber} • LESSON {currentLessonData.lessonNumber}
                        </span>
                        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                          {currentLessonData.title}
                        </h1>
                        <p className="text-xs text-pencil mt-1 font-semibold">
                          {currentLessonData.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => handleLessonComplete(activeSection)}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 ${
                          completedLessons[activeSection]
                            ? 'bg-teal-deep/20 text-teal-deep border border-teal-deep/30'
                            : 'bg-terracotta text-white hover:bg-terracotta/90'
                        }`}
                      >
                        {completedLessons[activeSection] ? 'Completed ✓' : 'Mark Lesson Completed'}
                      </button>
                    </div>

                    {/* Professor Note Box */}
                    <div className="bg-bg-elevated border-l-4 border-marigold p-4 rounded-r-2xl space-y-1.5 text-xs text-text-primary">
                      <div className="flex items-center gap-2 text-marigold font-bold font-hud uppercase">
                        <Quote className="h-4 w-4" />
                        <span>Professor Bill Worden's Key Teaching Note</span>
                      </div>
                      <p className="italic text-pencil leading-relaxed">{currentLessonData.professorNote}</p>
                    </div>

                    {/* Objectives */}
                    <div className="pt-2">
                      <span className="text-[10px] font-hud uppercase tracking-wider text-pencil font-bold block mb-2">Lesson Learning Objectives:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {currentLessonData.objectives.map((obj, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-paper/5 p-2.5 rounded-xl border border-pencil/10 text-xs text-text-primary">
                            <Target className="h-3.5 w-3.5 text-terracotta shrink-0" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. GRAMMAR & STRUCTURAL SECTIONS */}
                  {currentLessonData.grammarSections.map((section, idx) => (
                    <div key={idx} className="bg-paper/5 border border-pencil/15 rounded-3xl p-6 sm:p-7 space-y-4">
                      <div className="flex items-center gap-2 text-terracotta font-bold text-base font-display">
                        <Sparkles className="h-5 w-5 text-terracotta" />
                        <span>{section.title}</span>
                      </div>

                      <p className="text-xs text-pencil leading-relaxed font-body">
                        {section.explanation}
                      </p>

                      {/* Rules Bullet List */}
                      {section.rules && section.rules.length > 0 && (
                        <div className="bg-bg-elevated p-4 rounded-2xl border border-structural space-y-2">
                          <span className="text-[10px] font-hud uppercase tracking-wider text-marigold font-bold block">Key Rules & Syntax:</span>
                          <ul className="space-y-1.5 text-xs text-text-primary">
                            {section.rules.map((rule, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2">
                                <span className="text-terracotta font-bold">•</span>
                                <span className="leading-normal">{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tables */}
                      {section.table && (
                        <div className="overflow-x-auto rounded-2xl border border-pencil/15 shadow-sm">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead className="bg-paper/10 font-hud text-terracotta uppercase text-[10px] tracking-wider border-b border-pencil/15">
                              <tr>
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3 font-bold">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-pencil/10 font-mono text-text-primary">
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-bg-elevated/40' : 'bg-transparent'}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 leading-relaxed">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Acronym Breakdown */}
                      {section.acronym && (
                        <div className="bg-marigold/10 border border-marigold/30 rounded-2xl p-5 space-y-3">
                          <span className="text-xs font-hud uppercase font-bold text-marigold tracking-wider block">
                            The {section.acronym.name} Memory Framework:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {section.acronym.items.map((item, aIdx) => (
                              <div key={aIdx} className="bg-bg-elevated p-3 rounded-xl border border-structural space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-xs text-terracotta">
                                  <span className="bg-terracotta text-white rounded-md px-1.5 py-0.5 text-[10px] font-mono">{item.letter}</span>
                                  <span>{item.meaning}</span>
                                </div>
                                <p className="text-[11px] font-mono text-pencil italic">{item.example}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Callouts */}
                      {section.callout && (
                        <div className="bg-terracotta/10 border border-terracotta/30 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-text-primary">
                          <AlertCircle className="h-4 w-4 text-terracotta shrink-0 mt-0.5" />
                          <span className="font-semibold">{section.callout}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* 3. VOCABULARY & PHONETICS REFERENCE TABLE */}
                  {currentLessonData.vocabularyTable && currentLessonData.vocabularyTable.length > 0 && (
                    <div className="bg-paper/5 border border-pencil/15 rounded-3xl p-6 sm:p-7 space-y-4">
                      <div className="flex items-center gap-2 text-marigold font-bold text-base font-display">
                        <BookOpen className="h-5 w-5 text-marigold" />
                        <span>Lesson Vocabulary & Phonetic Pronunciation</span>
                      </div>
                      <div className="overflow-x-auto rounded-2xl border border-pencil/15">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead className="bg-paper/10 font-hud text-marigold uppercase text-[10px] tracking-wider border-b border-pencil/15">
                            <tr>
                              <th className="p-3 font-bold">Spanish Expression</th>
                              <th className="p-3 font-bold">Phonetic Guide</th>
                              <th className="p-3 font-bold">English Meaning</th>
                              <th className="p-3 font-bold">Context & Usage</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-pencil/10">
                            {currentLessonData.vocabularyTable.map((v, vIdx) => (
                              <tr key={vIdx} className={vIdx % 2 === 0 ? 'bg-bg-elevated/40' : 'bg-transparent'}>
                                <td className="p-3 font-bold text-terracotta">{v.spanish}</td>
                                <td className="p-3 font-mono text-pencil text-[11px]">{v.phonetic}</td>
                                <td className="p-3 font-semibold text-text-primary">{v.english}</td>
                                <td className="p-3 text-pencil italic">{v.usage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 4. REAL CONVERSATION DIALOGUE */}
                  {currentLessonData.dialogue && currentLessonData.dialogue.length > 0 && (
                    <div className="bg-paper/5 border border-pencil/15 rounded-3xl p-6 sm:p-7 space-y-4">
                      <div className="flex items-center gap-2 text-terracotta font-bold text-base font-display">
                        <MessageSquare className="h-5 w-5 text-terracotta" />
                        <span>Practical Conversation Dialogue</span>
                      </div>
                      <div className="bg-bg-elevated p-5 rounded-2xl border border-structural space-y-3 text-xs">
                        {currentLessonData.dialogue.map((d, dIdx) => (
                          <div key={dIdx} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-terracotta font-hud uppercase">{d.speaker}:</span>
                              <span className="font-bold text-text-primary">{d.spanish}</span>
                            </div>
                            <p className="text-[11px] text-pencil italic pl-4">({d.english})</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. EXAMPLE SENTENCES WITH BREAKDOWN */}
                  {currentLessonData.exampleSentences && currentLessonData.exampleSentences.length > 0 && (
                    <div className="bg-paper/5 border border-pencil/15 rounded-3xl p-6 sm:p-7 space-y-4">
                      <div className="flex items-center gap-2 text-marigold font-bold text-base font-display">
                        <FileText className="h-5 w-5 text-marigold" />
                        <span>Sentence Structure Analysis</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {currentLessonData.exampleSentences.map((ex, sIdx) => (
                          <div key={sIdx} className="bg-bg-elevated p-4 rounded-2xl border border-structural space-y-1.5 text-xs">
                            <div className="flex justify-between items-start">
                              <span className="font-bold text-text-primary text-sm">{ex.spanish}</span>
                              <span className="text-[10px] font-hud text-terracotta uppercase font-bold">Example {sIdx + 1}</span>
                            </div>
                            <p className="text-pencil font-semibold">{ex.english}</p>
                            <p className="text-[11px] text-pencil/80 italic pt-1 border-t border-pencil/10">Grammar breakdown: {ex.breakdown}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. INTERACTIVE QUICK PRACTICE CHECK */}
                  {currentLessonData.quickPractice && (
                    <div className="bg-paper/5 border border-pencil/15 rounded-3xl p-6 sm:p-7 space-y-4">
                      <div className="flex items-center gap-2 text-terracotta font-bold text-base font-display">
                        <HelpCircle className="h-5 w-5 text-terracotta" />
                        <span>Interactive Knowledge Check</span>
                      </div>

                      <div className="bg-bg-elevated p-5 rounded-2xl border border-structural space-y-4">
                        <p className="font-bold text-sm text-text-primary">
                          {currentLessonData.quickPractice.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentLessonData.quickPractice.options.map((opt) => {
                            const isSelected = userPracticeAnswers[activeSection] === opt;
                            const isCorrect = opt === currentLessonData.quickPractice.correctAnswer;
                            
                            let btnStyle = 'bg-paper/5 border-pencil/15 text-text-primary hover:border-terracotta/40';
                            if (userPracticeAnswers[activeSection]) {
                              if (isCorrect) {
                                btnStyle = 'bg-teal-deep/20 border-teal-deep text-teal-deep font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-terracotta/20 border-terracotta text-terracotta font-bold';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                onClick={() => setUserPracticeAnswers(prev => ({ ...prev, [activeSection]: opt }))}
                                className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {userPracticeAnswers[activeSection] && (
                          <div className="p-3.5 rounded-xl bg-paper/10 border border-pencil/15 text-xs space-y-1">
                            {userPracticeAnswers[activeSection] === currentLessonData.quickPractice.correctAnswer ? (
                              <span className="text-teal-deep font-bold flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Correct! {currentLessonData.quickPractice.explanation}
                              </span>
                            ) : (
                              <span className="text-terracotta font-bold block">
                                Incorrect. {currentLessonData.quickPractice.explanation}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-4 border-t border-pencil/15 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-pencil">
                      Done reading? Mark this lesson completed to track your progress towards the Part Master Exam!
                    </span>
                    <button
                      onClick={() => handleLessonComplete(activeSection)}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all ${
                        completedLessons[activeSection]
                          ? 'bg-teal-deep/20 text-teal-deep border border-teal-deep/30'
                          : 'bg-terracotta text-white hover:bg-terracotta/90'
                      }`}
                    >
                      {completedLessons[activeSection] ? 'Lesson Completed ✓' : 'Mark Lesson Completed'}
                    </button>
                  </div>

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
