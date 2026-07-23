// Dictionary of Spanish-to-English translations for words used in AI Companion dialogues & lessons.
// Fully expanded to cover Parts 1 through 7 (Lessons 1 to 30) of the Spanish Syllabus.

import type { Level, TopicTag } from './types';

export interface DictionaryEntry {
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  audioCue: string;
  levelIntroduced: Level;
  topic: TopicTag;
}

export const COMPANION_DICTIONARY: Record<string, DictionaryEntry> = {
  // ==========================================
  // PART 1 (Lessons 1-4): Greetings, Vowels, Nouns, Ser, -AR
  // ==========================================
  hola: {
    word: 'hola',
    meaning: 'hello',
    pronunciation: 'OH-lah',
    example: '¡Hola! ¿Cómo estás?',
    exampleTranslation: 'Hello! How are you?',
    audioCue: 'Silent H, stress OH',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  buenos: {
    word: 'buenos',
    meaning: 'good (masculine plural)',
    pronunciation: 'BWEH-nohs',
    example: 'Buenos días, profesor.',
    exampleTranslation: 'Good morning, professor.',
    audioCue: 'Diphthong BWEH',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  buenas: {
    word: 'buenas',
    meaning: 'good / hello (feminine plural)',
    pronunciation: 'BWEH-nahs',
    example: 'Buenas tardes a todos.',
    exampleTranslation: 'Good afternoon everyone.',
    audioCue: 'Diphthong BWEH',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  días: {
    word: 'días',
    meaning: 'days / morning',
    pronunciation: 'DEE-ahs',
    example: 'Buenos días por la mañana.',
    exampleTranslation: 'Good morning in the early day.',
    audioCue: 'Accent on DEE',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  tardes: {
    word: 'tardes',
    meaning: 'afternoons',
    pronunciation: 'TAR-dehs',
    example: 'Buenas tardes, amigo.',
    exampleTranslation: 'Good afternoon, friend.',
    audioCue: 'Stress TAR',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  noches: {
    word: 'noches',
    meaning: 'nights / evening',
    pronunciation: 'NOH-chehs',
    example: 'Buenas noches y descansa.',
    exampleTranslation: 'Good night and rest.',
    audioCue: 'Stress NOH',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  adiós: {
    word: 'adiós',
    meaning: 'goodbye',
    pronunciation: 'ah-DYOHS',
    example: '¡Adiós y buena suerte!',
    exampleTranslation: 'Goodbye and good luck!',
    audioCue: 'Accent on DYOHS',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  hasta: {
    word: 'hasta',
    meaning: 'until / see you',
    pronunciation: 'AHS-tah',
    example: 'Hasta luego, amigo.',
    exampleTranslation: 'See you later, friend.',
    audioCue: 'Silent H, stress AHS',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  luego: {
    word: 'luego',
    meaning: 'later',
    pronunciation: 'LWEH-goh',
    example: 'Nos vemos luego.',
    exampleTranslation: 'We will see each other later.',
    audioCue: 'Diphthong LWEH',
    levelIntroduced: 'Pre-A1',
    topic: 'greetings'
  },
  yo: {
    word: 'yo',
    meaning: 'I (subject pronoun)',
    pronunciation: 'yoh',
    example: 'Yo soy estudiante.',
    exampleTranslation: 'I am a student.',
    audioCue: 'Soft Y sound',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  tú: {
    word: 'tú',
    meaning: 'you (informal)',
    pronunciation: 'too',
    example: 'Tú eres muy amable.',
    exampleTranslation: 'You are very kind.',
    audioCue: 'Accent on TOO',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  él: {
    word: 'él',
    meaning: 'he',
    pronunciation: 'ehl',
    example: 'Él es el maestro de español.',
    exampleTranslation: 'He is the Spanish teacher.',
    audioCue: 'Accent on EHL',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  ella: {
    word: 'ella',
    meaning: 'she',
    pronunciation: 'EH-yah',
    example: 'Ella vive en Madrid.',
    exampleTranslation: 'She lives in Madrid.',
    audioCue: 'Double L sound EH-yah',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  nosotros: {
    word: 'nosotros',
    meaning: 'we (masculine/mixed)',
    pronunciation: 'noh-SOH-trohs',
    example: 'Nosotros somos amigos.',
    exampleTranslation: 'We are friends.',
    audioCue: 'Stress SOH',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  vosotros: {
    word: 'vosotros',
    meaning: 'you all (informal, Spain)',
    pronunciation: 'boh-SOH-trohs',
    example: 'Vosotros habláis español.',
    exampleTranslation: 'You all speak Spanish.',
    audioCue: 'Stress SOH',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  ellos: {
    word: 'ellos',
    meaning: 'they (masculine/mixed)',
    pronunciation: 'EH-yohs',
    example: 'Ellos son estudiantes.',
    exampleTranslation: 'They are students.',
    audioCue: 'Double L sound EH-yohs',
    levelIntroduced: 'Pre-A1',
    topic: 'pronouns'
  },
  soy: {
    word: 'soy',
    meaning: 'I am (SER)',
    pronunciation: 'soy',
    example: 'Yo soy de México.',
    exampleTranslation: 'I am from Mexico.',
    audioCue: 'Single syllable SOY',
    levelIntroduced: 'Pre-A1',
    topic: 'ser'
  },
  eres: {
    word: 'eres',
    meaning: 'you are (SER)',
    pronunciation: 'EH-rehs',
    example: '¿Tú eres de España?',
    exampleTranslation: 'Are you from Spain?',
    audioCue: 'Stress EH',
    levelIntroduced: 'Pre-A1',
    topic: 'ser'
  },
  es: {
    word: 'es',
    meaning: 'is / he is / she is (SER)',
    pronunciation: 'ehs',
    example: 'Es una buena idea.',
    exampleTranslation: 'It is a good idea.',
    audioCue: 'Single syllable EHS',
    levelIntroduced: 'Pre-A1',
    topic: 'ser'
  },
  somos: {
    word: 'somos',
    meaning: 'we are (SER)',
    pronunciation: 'SOH-mohs',
    example: 'Somos estudiantes de idiomas.',
    exampleTranslation: 'We are language students.',
    audioCue: 'Stress SOH',
    levelIntroduced: 'Pre-A1',
    topic: 'ser'
  },
  son: {
    word: 'son',
    meaning: 'they are / you all are (SER)',
    pronunciation: 'sohn',
    example: 'Ellos son mis profesores.',
    exampleTranslation: 'They are my teachers.',
    audioCue: 'Single syllable SOHN',
    levelIntroduced: 'Pre-A1',
    topic: 'ser'
  },
  hablar: {
    word: 'hablar',
    meaning: 'to speak / to talk',
    pronunciation: 'ah-BLAR',
    example: 'Me gusta hablar español.',
    exampleTranslation: 'I like to speak Spanish.',
    audioCue: 'Silent H, stress BLAR',
    levelIntroduced: 'Pre-A1',
    topic: 'ar-verbs'
  },
  estudiar: {
    word: 'estudiar',
    meaning: 'to study',
    pronunciation: 'ehs-too-DYAR',
    example: 'Voy a estudiar para el examen.',
    exampleTranslation: 'I am going to study for the exam.',
    audioCue: 'Stress DYAR',
    levelIntroduced: 'Pre-A1',
    topic: 'ar-verbs'
  },
  trabajar: {
    word: 'trabajar',
    meaning: 'to work',
    pronunciation: 'trah-bah-HAR',
    example: 'Ellos trabajan en el hospital.',
    exampleTranslation: 'They work at the hospital.',
    audioCue: 'J sound HAR',
    levelIntroduced: 'Pre-A1',
    topic: 'ar-verbs'
  },
  casa: {
    word: 'casa',
    meaning: 'house / home',
    pronunciation: 'KAH-sah',
    example: 'La casa es grande y azul.',
    exampleTranslation: 'The house is big and blue.',
    audioCue: 'Stress KAH',
    levelIntroduced: 'Pre-A1',
    topic: 'nouns'
  },
  libro: {
    word: 'libro',
    meaning: 'book',
    pronunciation: 'LEE-broh',
    example: 'El libro de español es interesante.',
    exampleTranslation: 'The Spanish book is interesting.',
    audioCue: 'Stress LEE',
    levelIntroduced: 'Pre-A1',
    topic: 'nouns'
  },

  // ==========================================
  // PART 2 (Lessons 5-8): Estar, Ir, -ER/-IR, Numbers, Questions
  // ==========================================
  un: {
    word: 'un',
    meaning: 'a / an (masculine)',
    pronunciation: 'oon',
    example: 'Tengo un gato negro.',
    exampleTranslation: 'I have a black cat.',
    audioCue: 'Short UN',
    levelIntroduced: 'A1',
    topic: 'articles'
  },
  una: {
    word: 'una',
    meaning: 'a / an (feminine)',
    pronunciation: 'OO-nah',
    example: 'Quiero una manzana roja.',
    exampleTranslation: 'I want a red apple.',
    audioCue: 'Stress OO',
    levelIntroduced: 'A1',
    topic: 'articles'
  },
  unos: {
    word: 'unos',
    meaning: 'some / a few (masculine)',
    pronunciation: 'OO-nohs',
    example: 'Compré unos libros ayer.',
    exampleTranslation: 'I bought a few books yesterday.',
    audioCue: 'Stress OO',
    levelIntroduced: 'A1',
    topic: 'articles'
  },
  unas: {
    word: 'unas',
    meaning: 'some / a few (feminine)',
    pronunciation: 'OO-nahs',
    example: 'Hay unas flores en la mesa.',
    exampleTranslation: 'There are some flowers on the table.',
    audioCue: 'Stress OO',
    levelIntroduced: 'A1',
    topic: 'articles'
  },
  diez: {
    word: 'diez',
    meaning: 'ten',
    pronunciation: 'dyehth',
    example: 'Son las diez en punto.',
    exampleTranslation: 'It is ten o\'clock sharp.',
    audioCue: 'Z like TH in thin',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  veinte: {
    word: 'veinte',
    meaning: 'twenty',
    pronunciation: 'BAYN-teh',
    example: 'Tengo veinte años.',
    exampleTranslation: 'I am twenty years old.',
    audioCue: 'Diphthong BAYN',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  treinta: {
    word: 'treinta',
    meaning: 'thirty',
    pronunciation: 'TRAYN-tah',
    example: 'El libro cuesta treinta pesos.',
    exampleTranslation: 'The book costs thirty pesos.',
    audioCue: 'Diphthong TRAYN',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  cien: {
    word: 'cien',
    meaning: 'one hundred',
    pronunciation: 'thyehn',
    example: 'Hay cien personas aquí.',
    exampleTranslation: 'There are one hundred people here.',
    audioCue: 'Soft TH sound',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  ciento: {
    word: 'ciento',
    meaning: 'one hundred (used in compound numbers)',
    pronunciation: 'THYEHN-toh',
    example: 'Ciento uno estudiantes asistieron.',
    exampleTranslation: 'One hundred and one students attended.',
    audioCue: 'Stress THYEHN',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  doscientos: {
    word: 'doscientos',
    meaning: 'two hundred',
    pronunciation: 'dohs-THYEHN-tohs',
    example: 'El mapa cuesta doscientos dólares.',
    exampleTranslation: 'The map costs two hundred dollars.',
    audioCue: 'Stress THYEHN',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  quinientos: {
    word: 'quinientos',
    meaning: 'five hundred',
    pronunciation: 'kee-NYEHN-tohs',
    example: 'Escribió quinientos versos.',
    exampleTranslation: 'He wrote five hundred verses.',
    audioCue: 'Irregular root QUIN',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  mil: {
    word: 'mil',
    meaning: 'one thousand',
    pronunciation: 'meel',
    example: 'Hace mil años que ocurrió.',
    exampleTranslation: 'It happened a thousand years ago.',
    audioCue: 'Single syllable MEEL',
    levelIntroduced: 'A1',
    topic: 'numbers'
  },
  estoy: {
    word: 'estoy',
    meaning: 'I am (ESTAR - location/state)',
    pronunciation: 'ehs-TOY',
    example: 'Estoy en la biblioteca.',
    exampleTranslation: 'I am in the library.',
    audioCue: 'Stress TOY',
    levelIntroduced: 'A1',
    topic: 'estar'
  },
  estás: {
    word: 'estás',
    meaning: 'you are (ESTAR)',
    pronunciation: 'ehs-TAS',
    example: '¿Dónde estás tú?',
    exampleTranslation: 'Where are you?',
    audioCue: 'Accent on TAS',
    levelIntroduced: 'A1',
    topic: 'estar'
  },
  está: {
    word: 'está',
    meaning: 'is / located (ESTAR)',
    pronunciation: 'ehs-TAH',
    example: 'El profesor está en clase.',
    exampleTranslation: 'The professor is in class.',
    audioCue: 'Accent on TAH',
    levelIntroduced: 'A1',
    topic: 'estar'
  },
  estamos: {
    word: 'estamos',
    meaning: 'we are (ESTAR)',
    pronunciation: 'ehs-TAH-mohs',
    example: 'Estamos muy felices hoy.',
    exampleTranslation: 'We are very happy today.',
    audioCue: 'Stress TAH',
    levelIntroduced: 'A1',
    topic: 'estar'
  },
  están: {
    word: 'están',
    meaning: 'they are / you all are (ESTAR)',
    pronunciation: 'ehs-TAN',
    example: 'Los libros están en la mesa.',
    exampleTranslation: 'The books are on the table.',
    audioCue: 'Accent on TAN',
    levelIntroduced: 'A1',
    topic: 'estar'
  },
  comer: {
    word: 'comer',
    meaning: 'to eat',
    pronunciation: 'koh-MEHR',
    example: 'Vamos a comer tacos.',
    exampleTranslation: 'We are going to eat tacos.',
    audioCue: 'Stress MEHR',
    levelIntroduced: 'A1',
    topic: 'er-verbs'
  },
  beber: {
    word: 'beber',
    meaning: 'to drink',
    pronunciation: 'beh-BEHR',
    example: 'Debes beber más agua.',
    exampleTranslation: 'You should drink more water.',
    audioCue: 'Stress BEHR',
    levelIntroduced: 'A1',
    topic: 'er-verbs'
  },
  aprender: {
    word: 'aprender',
    meaning: 'to learn',
    pronunciation: 'ah-prehn-DEHR',
    example: 'Quiero aprender español rápido.',
    exampleTranslation: 'I want to learn Spanish quickly.',
    audioCue: 'Stress DEHR',
    levelIntroduced: 'A1',
    topic: 'er-verbs'
  },
  comprender: {
    word: 'comprender',
    meaning: 'to understand',
    pronunciation: 'kohm-prehn-DEHR',
    example: 'Yo comprendo la lección.',
    exampleTranslation: 'I understand the lesson.',
    audioCue: 'Stress DEHR',
    levelIntroduced: 'A1',
    topic: 'er-verbs'
  },
  vivir: {
    word: 'vivir',
    meaning: 'to live',
    pronunciation: 'bee-BEER',
    example: 'Ellos viven en la ciudad.',
    exampleTranslation: 'They live in the city.',
    audioCue: 'Stress BEER',
    levelIntroduced: 'A1',
    topic: 'ir-verbs'
  },
  escribir: {
    word: 'escribir',
    meaning: 'to write',
    pronunciation: 'ehs-kree-BEER',
    example: 'Me gusta escribir en mi diario.',
    exampleTranslation: 'I like writing in my diary.',
    audioCue: 'Stress BEER',
    levelIntroduced: 'A1',
    topic: 'ir-verbs'
  },
  abrir: {
    word: 'abrir',
    meaning: 'to open',
    pronunciation: 'ah-BREER',
    example: 'Por favor abre la puerta.',
    exampleTranslation: 'Please open the door.',
    audioCue: 'Stress BREER',
    levelIntroduced: 'A1',
    topic: 'ir-verbs'
  },
  ir: {
    word: 'ir',
    meaning: 'to go',
    pronunciation: 'eer',
    example: 'Voy a ir al mercado.',
    exampleTranslation: 'I am going to go to the market.',
    audioCue: 'Single syllable EER',
    levelIntroduced: 'A1',
    topic: 'verb-ir'
  },
  voy: {
    word: 'voy',
    meaning: 'I go / I am going',
    pronunciation: 'boy',
    example: 'Voy a la escuela ahora.',
    exampleTranslation: 'I am going to school now.',
    audioCue: 'Single syllable BOY',
    levelIntroduced: 'A1',
    topic: 'verb-ir'
  },
  vas: {
    word: 'vas',
    meaning: 'you go / you are going',
    pronunciation: 'bahs',
    example: '¿Vas al parque esta tarde?',
    exampleTranslation: 'Are you going to the park this afternoon?',
    audioCue: 'Soft B/V sound',
    levelIntroduced: 'A1',
    topic: 'verb-ir'
  },
  va: {
    word: 'va',
    meaning: 'goes / he goes / she goes',
    pronunciation: 'bah',
    example: 'Ella va a estudiar español.',
    exampleTranslation: 'She is going to study Spanish.',
    audioCue: 'Soft B/V sound',
    levelIntroduced: 'A1',
    topic: 'verb-ir'
  },
  vamos: {
    word: 'vamos',
    meaning: 'we go / let\'s go',
    pronunciation: 'BAH-mohs',
    example: '¡Vamos a la fiesta!',
    exampleTranslation: 'Let\'s go to the party!',
    audioCue: 'Stress BAH',
    levelIntroduced: 'A1',
    topic: 'verb-ir'
  },
  van: {
    word: 'van',
    meaning: 'they go / you all go',
    pronunciation: 'bahn',
    example: 'Ellos van al centro comercial.',
    exampleTranslation: 'They are going to the mall.',
    audioCue: 'Soft B/V sound',
    levelIntroduced: 'A1',
    topic: 'verb-ir'
  },
  qué: {
    word: 'qué',
    meaning: 'what',
    pronunciation: 'keh',
    example: '¿Qué haces aquí?',
    exampleTranslation: 'What are you doing here?',
    audioCue: 'Accent on KEH',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  quién: {
    word: 'quién',
    meaning: 'who',
    pronunciation: 'kyehn',
    example: '¿Quién es ese hombre?',
    exampleTranslation: 'Who is that man?',
    audioCue: 'Accent on KYEHN',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  dónde: {
    word: 'dónde',
    meaning: 'where',
    pronunciation: 'DOHN-deh',
    example: '¿Dónde está mi cuaderno?',
    exampleTranslation: 'Where is my notebook?',
    audioCue: 'Accent DOHN',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  adónde: {
    word: 'adónde',
    meaning: 'where to',
    pronunciation: 'ah-DOHN-deh',
    example: '¿Adónde vas con tanta prisa?',
    exampleTranslation: 'Where are you going in such a hurry?',
    audioCue: 'Accent DOHN',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  cuándo: {
    word: 'cuándo',
    meaning: 'when',
    pronunciation: 'KWAN-doh',
    example: '¿Cuándo empieza la clase?',
    exampleTranslation: 'When does the class start?',
    audioCue: 'Accent KWAN',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  porqué: {
    word: 'porqué',
    meaning: 'why / the reason',
    pronunciation: 'por-KEH',
    example: '¿Por qué no vienes hoy?',
    exampleTranslation: 'Why are you not coming today?',
    audioCue: 'Accent KEH',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  cómo: {
    word: 'cómo',
    meaning: 'how',
    pronunciation: 'KOH-moh',
    example: '¿Cómo te sientes hoy?',
    exampleTranslation: 'How do you feel today?',
    audioCue: 'Accent KOH',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },
  cuánto: {
    word: 'cuánto',
    meaning: 'how much',
    pronunciation: 'KWAN-toh',
    example: '¿Cuánto cuesta este sombrero?',
    exampleTranslation: 'How much does this hat cost?',
    audioCue: 'Accent KWAN',
    levelIntroduced: 'A1',
    topic: 'question-words'
  },

  // ==========================================
  // PART 3 (Lessons 9-12): Time, Dates, Weather, Tener, Hacer, Saber/Conocer
  // ==========================================
  hora: {
    word: 'hora',
    meaning: 'hour / time',
    pronunciation: 'OH-rah',
    example: '¿Qué hora es en este momento?',
    exampleTranslation: 'What time is it right now?',
    audioCue: 'Silent H, stress OH',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  minuto: {
    word: 'minuto',
    meaning: 'minute',
    pronunciation: 'mee-NOO-toh',
    example: 'Espera un minuto, por favor.',
    exampleTranslation: 'Wait a minute, please.',
    audioCue: 'Stress NOO',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  lunes: {
    word: 'lunes',
    meaning: 'Monday',
    pronunciation: 'LOO-nehs',
    example: 'El lunes tengo examen.',
    exampleTranslation: 'On Monday I have an exam.',
    audioCue: 'Stress LOO',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  martes: {
    word: 'martes',
    meaning: 'Tuesday',
    pronunciation: 'MAR-tehs',
    example: 'El martes voy al médico.',
    exampleTranslation: 'On Tuesday I am going to the doctor.',
    audioCue: 'Stress MAR',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  miércoles: {
    word: 'miércoles',
    meaning: 'Wednesday',
    pronunciation: 'MYEHR-koh-lehs',
    example: 'El miércoles jugamos al fútbol.',
    exampleTranslation: 'On Wednesday we play soccer.',
    audioCue: 'Accent MYEHR',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  jueves: {
    word: 'jueves',
    meaning: 'Thursday',
    pronunciation: 'HWEH-behs',
    example: 'El jueves cenamos juntos.',
    exampleTranslation: 'On Thursday we have dinner together.',
    audioCue: 'J sound HWEH',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  viernes: {
    word: 'viernes',
    meaning: 'Friday',
    pronunciation: 'BYEHR-nehs',
    example: '¡Por fin es viernes!',
    exampleTranslation: 'Finally it is Friday!',
    audioCue: 'Stress BYEHR',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  sábado: {
    word: 'sábado',
    meaning: 'Saturday',
    pronunciation: 'SAH-bah-doh',
    example: 'El sábado descanso todo el día.',
    exampleTranslation: 'On Saturday I rest all day.',
    audioCue: 'Accent SAH',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  domingo: {
    word: 'domingo',
    meaning: 'Sunday',
    pronunciation: 'doh-MEEN-goh',
    example: 'El domingo voy a la iglesia.',
    exampleTranslation: 'On Sunday I go to church.',
    audioCue: 'Stress MEEN',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  enero: {
    word: 'enero',
    meaning: 'January',
    pronunciation: 'eh-NEH-roh',
    example: 'Enero es el primer mes del año.',
    exampleTranslation: 'January is the first month of the year.',
    audioCue: 'Stress NEH',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  febrero: {
    word: 'febrero',
    meaning: 'February',
    pronunciation: 'feh-BREH-roh',
    example: 'Febrero tiene veintiocho días.',
    exampleTranslation: 'February has twenty-eight days.',
    audioCue: 'Stress BREH',
    levelIntroduced: 'A2',
    topic: 'time-dates'
  },
  primavera: {
    word: 'primavera',
    meaning: 'spring',
    pronunciation: 'pree-mah-BEH-rah',
    example: 'En primavera florecen los árboles.',
    exampleTranslation: 'In spring the trees bloom.',
    audioCue: 'Stress BEH',
    levelIntroduced: 'A2',
    topic: 'seasons-weather'
  },
  verano: {
    word: 'verano',
    meaning: 'summer',
    pronunciation: 'beh-RAH-noh',
    example: 'Hace calor durante el verano.',
    exampleTranslation: 'It is hot during the summer.',
    audioCue: 'Stress RAH',
    levelIntroduced: 'A2',
    topic: 'seasons-weather'
  },
  otoño: {
    word: 'otoño',
    meaning: 'autumn / fall',
    pronunciation: 'oh-TOH-nyoh',
    example: 'El otoño trae hojas secas.',
    exampleTranslation: 'Autumn brings dry leaves.',
    audioCue: 'Ñ sound NYOH',
    levelIntroduced: 'A2',
    topic: 'seasons-weather'
  },
  invierno: {
    word: 'invierno',
    meaning: 'winter',
    pronunciation: 'een-BYEHR-noh',
    example: 'Nevará bastante este invierno.',
    exampleTranslation: 'It will snow a lot this winter.',
    audioCue: 'Stress BYEHR',
    levelIntroduced: 'A2',
    topic: 'seasons-weather'
  },
  tengo: {
    word: 'tengo',
    meaning: 'I have (TENER)',
    pronunciation: 'TEHN-goh',
    example: 'Tengo hambre y mucha sed.',
    exampleTranslation: 'I am hungry and very thirsty.',
    audioCue: 'Stress TEHN',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  tiene: {
    word: 'tiene',
    meaning: 'has / he has / she has (TENER)',
    pronunciation: 'TYEH-neh',
    example: 'Mi hermana tiene quince años.',
    exampleTranslation: 'My sister is fifteen years old.',
    audioCue: 'Diphthong TYEH',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  tenemos: {
    word: 'tenemos',
    meaning: 'we have (TENER)',
    pronunciation: 'teh-NEH-mohs',
    example: 'Tenemos prisa por llegar.',
    exampleTranslation: 'We are in a hurry to arrive.',
    audioCue: 'Stress NEH',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  tienen: {
    word: 'tienen',
    meaning: 'they have (TENER)',
    pronunciation: 'TYEH-nehn',
    example: 'Ellos tienen miedo de la oscuridad.',
    exampleTranslation: 'They are afraid of the dark.',
    audioCue: 'Diphthong TYEH',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  hambre: {
    word: 'hambre',
    meaning: 'hunger (tener hambre = to be hungry)',
    pronunciation: 'AHM-breh',
    example: 'Tengo hambre, quiero cenar.',
    exampleTranslation: 'I am hungry, I want to eat dinner.',
    audioCue: 'Silent H, stress AHM',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  sed: {
    word: 'sed',
    meaning: 'thirst (tener sed = to be thirsty)',
    pronunciation: 'sehd',
    example: 'Bebo agua porque tengo sed.',
    exampleTranslation: 'I drink water because I am thirsty.',
    audioCue: 'Soft D ending',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  frío: {
    word: 'frío',
    meaning: 'cold (tener frío / hacer frío)',
    pronunciation: 'FREE-oh',
    example: 'Tengo frío, abre la calefacción.',
    exampleTranslation: 'I am cold, turn on the heating.',
    audioCue: 'Accent FREE',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  calor: {
    word: 'calor',
    meaning: 'heat / hot (hacer calor)',
    pronunciation: 'kah-LOR',
    example: 'Hace mucho calor en julio.',
    exampleTranslation: 'It is very hot in July.',
    audioCue: 'Stress LOR',
    levelIntroduced: 'A2',
    topic: 'weather-hacer'
  },
  prisa: {
    word: 'prisa',
    meaning: 'hurry (tener prisa = to be in a hurry)',
    pronunciation: 'PREE-sah',
    example: 'No puedo hablar, tengo prisa.',
    exampleTranslation: 'I cannot talk, I am in a hurry.',
    audioCue: 'Stress PREE',
    levelIntroduced: 'A2',
    topic: 'tener-idioms'
  },
  hacer: {
    word: 'hacer',
    meaning: 'to make / to do',
    pronunciation: 'ah-THEHR',
    example: 'Voy a hacer la tarea ahora.',
    exampleTranslation: 'I am going to do my homework now.',
    audioCue: 'Silent H, soft TH',
    levelIntroduced: 'A2',
    topic: 'hacer-verbs'
  },
  hago: {
    word: 'hago',
    meaning: 'I do / I make (HACER)',
    pronunciation: 'AH-goh',
    example: 'Yo hago la comida todos los días.',
    exampleTranslation: 'I make the meals every day.',
    audioCue: 'Silent H, stress AH',
    levelIntroduced: 'A2',
    topic: 'hacer-verbs'
  },
  haces: {
    word: 'haces',
    meaning: 'you do / you make (HACER)',
    pronunciation: 'AH-thehs',
    example: '¿Qué haces este fin de semana?',
    exampleTranslation: 'What are you doing this weekend?',
    audioCue: 'Silent H, stress AH',
    levelIntroduced: 'A2',
    topic: 'hacer-verbs'
  },
  hace: {
    word: 'hace',
    meaning: 'does / makes / it is (weather)',
    pronunciation: 'AH-theh',
    example: 'Hace buen tiempo hoy.',
    exampleTranslation: 'The weather is good today.',
    audioCue: 'Silent H, stress AH',
    levelIntroduced: 'A2',
    topic: 'weather-hacer'
  },
  saber: {
    word: 'saber',
    meaning: 'to know (facts, skills, information)',
    pronunciation: 'sah-BEHR',
    example: 'Quiero saber la verdad.',
    exampleTranslation: 'I want to know the truth.',
    audioCue: 'Stress BEHR',
    levelIntroduced: 'A2',
    topic: 'saber-conocer'
  },
  sé: {
    word: 'sé',
    meaning: 'I know (SABER)',
    pronunciation: 'seh',
    example: 'Yo sé hablar español.',
    exampleTranslation: 'I know how to speak Spanish.',
    audioCue: 'Accent SEH',
    levelIntroduced: 'A2',
    topic: 'saber-conocer'
  },
  conocer: {
    word: 'conocer',
    meaning: 'to know / to meet (people, places)',
    pronunciation: 'koh-noh-THEHR',
    example: 'Quiero conocer a tu hermano.',
    exampleTranslation: 'I want to meet your brother.',
    audioCue: 'Soft TH sound',
    levelIntroduced: 'A2',
    topic: 'saber-conocer'
  },
  conozco: {
    word: 'conozco',
    meaning: 'I know / am familiar with (CONOCER)',
    pronunciation: 'koh-NOTH-koh',
    example: 'Conozco muy bien Madrid.',
    exampleTranslation: 'I know Madrid very well.',
    audioCue: 'ZCO sound NOTH-koh',
    levelIntroduced: 'A2',
    topic: 'saber-conocer'
  },

  // ==========================================
  // PART 4 (Lessons 13-16): Stem-Changers, Yo-Go, Present Progressive, Object Pronouns
  // ==========================================
  querer: {
    word: 'querer',
    meaning: 'to want / to love (e->ie)',
    pronunciation: 'keh-REHR',
    example: 'Quiero comprar un coche nuevo.',
    exampleTranslation: 'I want to buy a new car.',
    audioCue: 'Stress REHR',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  quiero: {
    word: 'quiero',
    meaning: 'I want (QUERER)',
    pronunciation: 'KYEH-roh',
    example: 'Quiero aprender más palabras.',
    exampleTranslation: 'I want to learn more words.',
    audioCue: 'Diphthong KYEH',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  quiere: {
    word: 'quiere',
    meaning: 'wants / he wants (QUERER)',
    pronunciation: 'KYEH-reh',
    example: 'Ella quiere viajar a Perú.',
    exampleTranslation: 'She wants to travel to Peru.',
    audioCue: 'Diphthong KYEH',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  poder: {
    word: 'poder',
    meaning: 'to be able to / can (o->ue)',
    pronunciation: 'poh-DEHR',
    example: '¿Puedes ayudarme un momento?',
    exampleTranslation: 'Can you help me for a moment?',
    audioCue: 'Stress DEHR',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  puedo: {
    word: 'puedo',
    meaning: 'I can / I am able (PODER)',
    pronunciation: 'PWEH-doh',
    example: 'Puedo hablar dos idiomas.',
    exampleTranslation: 'I can speak two languages.',
    audioCue: 'Diphthong PWEH',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  dormir: {
    word: 'dormir',
    meaning: 'to sleep (o->ue)',
    pronunciation: 'dor-MEER',
    example: 'Necesito dormir ocho horas.',
    exampleTranslation: 'I need to sleep eight hours.',
    audioCue: 'Stress MEER',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  duermo: {
    word: 'duermo',
    meaning: 'I sleep (DORMIR)',
    pronunciation: 'DWER-moh',
    example: 'Duermo profundamente por la noche.',
    exampleTranslation: 'I sleep deeply at night.',
    audioCue: 'Diphthong DWER',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  pedir: {
    word: 'pedir',
    meaning: 'to ask for / to order (e->i)',
    pronunciation: 'peh-DEER',
    example: 'Voy a pedir la cuenta.',
    exampleTranslation: 'I am going to ask for the check.',
    audioCue: 'Stress DEER',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  pido: {
    word: 'pido',
    meaning: 'I ask for / order (PEDIR)',
    pronunciation: 'PEE-doh',
    example: 'Pido un café con leche.',
    exampleTranslation: 'I order a coffee with milk.',
    audioCue: 'Stress PEE',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  servir: {
    word: 'servir',
    meaning: 'to serve (e->i)',
    pronunciation: 'sehr-BEER',
    example: 'El camarero nos sirve la comida.',
    exampleTranslation: 'The waiter serves us the food.',
    audioCue: 'Stress BEER',
    levelIntroduced: 'B1',
    topic: 'stem-changers'
  },
  poner: {
    word: 'poner',
    meaning: 'to put / to place',
    pronunciation: 'poh-NEHR',
    example: 'Voy a poner las llaves en la mesa.',
    exampleTranslation: 'I will put the keys on the table.',
    audioCue: 'Stress NEHR',
    levelIntroduced: 'B1',
    topic: 'yo-go-verbs'
  },
  pongo: {
    word: 'pongo',
    meaning: 'I put / I place (PONER)',
    pronunciation: 'POHN-goh',
    example: 'Pongo la mesa antes de cenar.',
    exampleTranslation: 'I set the table before dinner.',
    audioCue: 'Stress POHN',
    levelIntroduced: 'B1',
    topic: 'yo-go-verbs'
  },
  salir: {
    word: 'salir',
    meaning: 'to go out / to leave',
    pronunciation: 'sah-LEER',
    example: 'Salgo con mis amigos el viernes.',
    exampleTranslation: 'I go out with my friends on Friday.',
    audioCue: 'Stress LEER',
    levelIntroduced: 'B1',
    topic: 'yo-go-verbs'
  },
  salgo: {
    word: 'salgo',
    meaning: 'I go out / leave (SALIR)',
    pronunciation: 'SAHL-goh',
    example: 'Salgo de la oficina a las seis.',
    exampleTranslation: 'I leave the office at six.',
    audioCue: 'Stress SAHL',
    levelIntroduced: 'B1',
    topic: 'yo-go-verbs'
  },
  traer: {
    word: 'traer',
    meaning: 'to bring',
    pronunciation: 'trah-EHR',
    example: '¿Puedes traer el agua, por favor?',
    exampleTranslation: 'Can you bring the water, please?',
    audioCue: 'Stress EHR',
    levelIntroduced: 'B1',
    topic: 'yo-go-verbs'
  },
  traigo: {
    word: 'traigo',
    meaning: 'I bring (TRAER)',
    pronunciation: 'TRY-goh',
    example: 'Traigo buenas noticias para todos.',
    exampleTranslation: 'I bring good news for everyone.',
    audioCue: 'Diphthong TRY',
    levelIntroduced: 'B1',
    topic: 'yo-go-verbs'
  },
  ver: {
    word: 'ver',
    meaning: 'to see / to watch',
    pronunciation: 'behr',
    example: 'Quiero ver la televisión tonight.',
    exampleTranslation: 'I want to watch TV tonight.',
    audioCue: 'Single syllable BEHR',
    levelIntroduced: 'B1',
    topic: 'irregular-verbs'
  },
  veo: {
    word: 'veo',
    meaning: 'I see (VER)',
    pronunciation: 'BEH-oh',
    example: 'Veo un pájaro en el árbol.',
    exampleTranslation: 'I see a bird in the tree.',
    audioCue: 'Stress BEH',
    levelIntroduced: 'B1',
    topic: 'irregular-verbs'
  },
  dar: {
    word: 'dar',
    meaning: 'to give',
    pronunciation: 'dahr',
    example: 'Me gusta dar regalos a mi familia.',
    exampleTranslation: 'I like to give gifts to my family.',
    audioCue: 'Single syllable DAHR',
    levelIntroduced: 'B1',
    topic: 'irregular-verbs'
  },
  doy: {
    word: 'doy',
    meaning: 'I give (DAR)',
    pronunciation: 'doy',
    example: 'Te doy las gracias por todo.',
    exampleTranslation: 'I thank you for everything.',
    audioCue: 'Single syllable DOY',
    levelIntroduced: 'B1',
    topic: 'irregular-verbs'
  },
  hablando: {
    word: 'hablando',
    meaning: 'speaking / talking (present progressive)',
    pronunciation: 'ah-BLAN-doh',
    example: 'Estoy hablando con el profesor.',
    exampleTranslation: 'I am talking with the professor.',
    audioCue: 'Gerund ending -ANDO',
    levelIntroduced: 'B1',
    topic: 'present-progressive'
  },
  comiendo: {
    word: 'comiendo',
    meaning: 'eating (present progressive)',
    pronunciation: 'koh-MYEHN-doh',
    example: 'Ellos están comiendo en la cocina.',
    exampleTranslation: 'They are eating in the kitchen.',
    audioCue: 'Gerund ending -IENDO',
    levelIntroduced: 'B1',
    topic: 'present-progressive'
  },
  viviendo: {
    word: 'viviendo',
    meaning: 'living (present progressive)',
    pronunciation: 'bee-BYEHN-doh',
    example: 'Estamos viviendo en Madrid.',
    exampleTranslation: 'We are living in Madrid.',
    audioCue: 'Gerund ending -IENDO',
    levelIntroduced: 'B1',
    topic: 'present-progressive'
  },
  lo: {
    word: 'lo',
    meaning: 'him / it (direct object pronoun, masculine)',
    pronunciation: 'loh',
    example: 'El libro es bueno, lo quiero leer.',
    exampleTranslation: 'The book is good, I want to read it.',
    audioCue: 'Short LOH',
    levelIntroduced: 'B1',
    topic: 'direct-objects'
  },
  la: {
    word: 'la',
    meaning: 'her / it (direct object pronoun, feminine)',
    pronunciation: 'lah',
    example: 'La carta llegó y la leí inmediatamente.',
    exampleTranslation: 'The letter arrived and I read it immediately.',
    audioCue: 'Short LAH',
    levelIntroduced: 'B1',
    topic: 'direct-objects'
  },
  los: {
    word: 'los',
    meaning: 'them (direct object pronoun, masculine)',
    pronunciation: 'lohs',
    example: 'Compré los libros y los guardé.',
    exampleTranslation: 'I bought the books and stored them.',
    audioCue: 'Short LOHS',
    levelIntroduced: 'B1',
    topic: 'direct-objects'
  },
  las: {
    word: 'las',
    meaning: 'them (direct object pronoun, feminine)',
    pronunciation: 'lahs',
    example: 'Vi las flores y las compré.',
    exampleTranslation: 'I saw the flowers and bought them.',
    audioCue: 'Short LAHS',
    levelIntroduced: 'B1',
    topic: 'direct-objects'
  },
  rápidamente: {
    word: 'rápidamente',
    meaning: 'quickly / rapidly',
    pronunciation: 'RAH-pee-dah-mehn-teh',
    example: 'Corrió rápidamente para no perder el tren.',
    exampleTranslation: 'He ran quickly so as not to miss the train.',
    audioCue: 'Adverb ending -MENTE',
    levelIntroduced: 'B1',
    topic: 'adverbs'
  },

  // ==========================================
  // PART 5 (Lessons 17-20): Possessives, Demonstratives, Negatives, Object Pronouns, Gustar
  // ==========================================
  este: {
    word: 'este',
    meaning: 'this (masculine singular)',
    pronunciation: 'EHS-teh',
    example: 'Este libro es muy fascinante.',
    exampleTranslation: 'This book is very fascinating.',
    audioCue: 'Stress EHS',
    levelIntroduced: 'B2',
    topic: 'demonstratives'
  },
  esta: {
    word: 'esta',
    meaning: 'this (feminine singular)',
    pronunciation: 'EHS-tah',
    example: 'Esta casa es muy acogedora.',
    exampleTranslation: 'This house is very cozy.',
    audioCue: 'Stress EHS',
    levelIntroduced: 'B2',
    topic: 'demonstratives'
  },
  ese: {
    word: 'ese',
    meaning: 'that (masculine singular)',
    pronunciation: 'EH-seh',
    example: 'Ese coche me gusta mucho.',
    exampleTranslation: 'I like that car very much.',
    audioCue: 'Stress EH',
    levelIntroduced: 'B2',
    topic: 'demonstratives'
  },
  esa: {
    word: 'esa',
    meaning: 'that (feminine singular)',
    pronunciation: 'EH-sah',
    example: 'Esa canción es hermosa.',
    exampleTranslation: 'That song is beautiful.',
    audioCue: 'Stress EH',
    levelIntroduced: 'B2',
    topic: 'demonstratives'
  },
  aquel: {
    word: 'aquel',
    meaning: 'that over there (masculine)',
    pronunciation: 'ah-KEHL',
    example: 'Aquel edificio a lo lejos es antiguo.',
    exampleTranslation: 'That building over there in the distance is ancient.',
    audioCue: 'Stress KEHL',
    levelIntroduced: 'B2',
    topic: 'demonstratives'
  },
  aquella: {
    word: 'aquella',
    meaning: 'that over there (feminine)',
    pronunciation: 'ah-KEH-yah',
    example: 'Aquella montaña tiene nieve.',
    exampleTranslation: 'That mountain over there has snow.',
    audioCue: 'Stress KEH',
    levelIntroduced: 'B2',
    topic: 'demonstratives'
  },
  algo: {
    word: 'algo',
    meaning: 'something / anything',
    pronunciation: 'AHL-goh',
    example: '¿Quieres comer algo delicioso?',
    exampleTranslation: 'Do you want to eat something delicious?',
    audioCue: 'Stress AHL',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  nada: {
    word: 'nada',
    meaning: 'nothing / not anything',
    pronunciation: 'NAH-dah',
    example: 'No tengo nada en el bolsillo.',
    exampleTranslation: 'I have nothing in my pocket.',
    audioCue: 'Stress NAH',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  alguien: {
    word: 'alguien',
    meaning: 'someone / somebody',
    pronunciation: 'AHL-gyehn',
    example: '¿Alguien tocó la puerta?',
    exampleTranslation: 'Did someone knock on the door?',
    audioCue: 'Accent AHL',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  nadie: {
    word: 'nadie',
    meaning: 'no one / nobody',
    pronunciation: 'NAH-dyeh',
    example: 'Nadie sabe la respuesta.',
    exampleTranslation: 'Nobody knows the answer.',
    audioCue: 'Stress NAH',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  siempre: {
    word: 'siempre',
    meaning: 'always',
    pronunciation: 'SYEHM-preh',
    example: 'Siempre llego a tiempo a clase.',
    exampleTranslation: 'I always arrive on time to class.',
    audioCue: 'Stress SYEHM',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  nunca: {
    word: 'nunca',
    meaning: 'never',
    pronunciation: 'NOON-kah',
    example: 'Nunca he visto una aurora boreal.',
    exampleTranslation: 'I have never seen a northern light.',
    audioCue: 'Stress NOON',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  jamás: {
    word: 'jamás',
    meaning: 'never ever',
    pronunciation: 'hah-MAS',
    example: '¡Jamás olvidaré esta aventura!',
    exampleTranslation: 'I will never ever forget this adventure!',
    audioCue: 'Accent MAS',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  también: {
    word: 'también',
    meaning: 'also / too',
    pronunciation: 'tahm-BYEHN',
    example: 'Yo también quiero ir a España.',
    exampleTranslation: 'I also want to go to Spain.',
    audioCue: 'Accent BYEHN',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  tampoco: {
    word: 'tampoco',
    meaning: 'neither / not either',
    pronunciation: 'tahm-POH-koh',
    example: 'Yo tampoco tengo dinero.',
    exampleTranslation: 'I don\'t have money either.',
    audioCue: 'Stress POH',
    levelIntroduced: 'B2',
    topic: 'affirmatives-negatives'
  },
  le: {
    word: 'le',
    meaning: 'to him / to her / to you (indirect object pronoun)',
    pronunciation: 'leh',
    example: 'Le envié una carta ayer.',
    exampleTranslation: 'I sent a letter to him yesterday.',
    audioCue: 'Short LEH',
    levelIntroduced: 'B2',
    topic: 'indirect-objects'
  },
  les: {
    word: 'les',
    meaning: 'to them / to you all (indirect object pronoun)',
    pronunciation: 'lehs',
    example: 'Les regalé flores a mis abuelos.',
    exampleTranslation: 'I gave flowers to my grandparents.',
    audioCue: 'Short LEHS',
    levelIntroduced: 'B2',
    topic: 'indirect-objects'
  },
  gustar: {
    word: 'gustar',
    meaning: 'to please / to like',
    pronunciation: 'goos-TAR',
    example: 'Me gusta la música clásica.',
    exampleTranslation: 'I like classical music.',
    audioCue: 'Stress TAR',
    levelIntroduced: 'B2',
    topic: 'verbs-like-gustar'
  },
  gusta: {
    word: 'gusta',
    meaning: 'is pleasing to (singular object)',
    pronunciation: 'GOOS-tah',
    example: 'Me gusta este libro.',
    exampleTranslation: 'I like this book.',
    audioCue: 'Stress GOOS',
    levelIntroduced: 'B2',
    topic: 'verbs-like-gustar'
  },
  gustan: {
    word: 'gustan',
    meaning: 'are pleasing to (plural objects)',
    pronunciation: 'GOOS-tahn',
    example: 'Me gustan las frutas frescas.',
    exampleTranslation: 'I like fresh fruits.',
    audioCue: 'Stress GOOS',
    levelIntroduced: 'B2',
    topic: 'verbs-like-gustar'
  },
  encantar: {
    word: 'encantar',
    meaning: 'to love / to delight',
    pronunciation: 'ehn-kan-TAR',
    example: 'Me encanta viajar por el mundo.',
    exampleTranslation: 'I love traveling around the world.',
    audioCue: 'Stress TAR',
    levelIntroduced: 'B2',
    topic: 'verbs-like-gustar'
  },
  interesar: {
    word: 'interesar',
    meaning: 'to interest',
    pronunciation: 'een-teh-reh-SAR',
    example: 'Me interesa la historia antigua.',
    exampleTranslation: 'Ancient history interests me.',
    audioCue: 'Stress SAR',
    levelIntroduced: 'B2',
    topic: 'verbs-like-gustar'
  },
  faltar: {
    word: 'faltar',
    meaning: 'to lack / to be missing',
    pronunciation: 'fahl-TAR',
    example: 'Me falta un ingrediente.',
    exampleTranslation: 'I am missing one ingredient.',
    audioCue: 'Stress TAR',
    levelIntroduced: 'B2',
    topic: 'verbs-like-gustar'
  },
  se: {
    word: 'se',
    meaning: 'reflexive / indirect object replacement (se lo)',
    pronunciation: 'seh',
    example: 'Se lo dije claramente.',
    exampleTranslation: 'I told it to him clearly.',
    audioCue: 'Short SEH',
    levelIntroduced: 'B2',
    topic: 'double-objects'
  },

  // ==========================================
  // PART 6 (Lessons 21-25): Reflexive Routine, Commands, Past Expressions
  // ==========================================
  lavarse: {
    word: 'lavarse',
    meaning: 'to wash oneself (reflexive)',
    pronunciation: 'lah-BAR-seh',
    example: 'Debes lavarte las manos.',
    exampleTranslation: 'You must wash your hands.',
    audioCue: 'Reflexive suffix -SE',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  lavo: {
    word: 'lavo',
    meaning: 'I wash (me lavo = I wash myself)',
    pronunciation: 'LAH-boh',
    example: 'Me lavo la cara cada mañana.',
    exampleTranslation: 'I wash my face every morning.',
    audioCue: 'Stress LAH',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  levantarse: {
    word: 'levantarse',
    meaning: 'to get up / stand up (reflexive)',
    pronunciation: 'leh-bahn-TAR-seh',
    example: 'Suelo levantarme a las seis.',
    exampleTranslation: 'I usually get up at six.',
    audioCue: 'Reflexive suffix -SE',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  levanto: {
    word: 'levanto',
    meaning: 'I get up (me levanto)',
    pronunciation: 'leh-BAN-toh',
    example: 'Me levanto temprano todos los días.',
    exampleTranslation: 'I get up early every day.',
    audioCue: 'Stress BAN',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  vestirse: {
    word: 'vestirse',
    meaning: 'to get dressed (reflexive e->i)',
    pronunciation: 'behs-TEER-seh',
    example: 'Me visto rápidamente para salir.',
    exampleTranslation: 'I get dressed quickly to head out.',
    audioCue: 'Reflexive suffix -SE',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  visto: {
    word: 'visto',
    meaning: 'I dress myself (me visto)',
    pronunciation: 'BEES-toh',
    example: 'Me visto con ropa elegante.',
    exampleTranslation: 'I dress in elegant clothes.',
    audioCue: 'Stress BEES',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  acostarse: {
    word: 'acostarse',
    meaning: 'to go to bed (reflexive o->ue)',
    pronunciation: 'ah-kohs-TAR-seh',
    example: 'Es hora de acostarse.',
    exampleTranslation: 'It is time to go to bed.',
    audioCue: 'Reflexive suffix -SE',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  acuesto: {
    word: 'acuesto',
    meaning: 'I go to bed (me acuesto)',
    pronunciation: 'ah-KWEHS-toh',
    example: 'Me acuesto a las diez.',
    exampleTranslation: 'I go to bed at ten.',
    audioCue: 'Diphthong KWEHS',
    levelIntroduced: 'C1',
    topic: 'reflexives'
  },
  acabar: {
    word: 'acabar',
    meaning: 'to finish (acabar de + inf = to have just done)',
    pronunciation: 'ah-kah-BAR',
    example: 'Acabo de comer un sándwich.',
    exampleTranslation: 'I have just eaten a sandwich.',
    audioCue: 'Idiom ACABAR DE',
    levelIntroduced: 'C1',
    topic: 'past-expressions'
  },
  hace_time: {
    word: 'hace',
    meaning: 'ago (hace dos años = two years ago)',
    pronunciation: 'AH-theh',
    example: 'Llegué hace tres horas.',
    exampleTranslation: 'I arrived three hours ago.',
    audioCue: 'Time phrase HACE + time',
    levelIntroduced: 'C1',
    topic: 'past-expressions'
  },
  desde: {
    word: 'desde',
    meaning: 'since / from (¿Desde cuándo...?)',
    pronunciation: 'DEHS-deh',
    example: 'Estudio español desde enero.',
    exampleTranslation: 'I have been studying Spanish since January.',
    audioCue: 'Stress DEHS',
    levelIntroduced: 'C1',
    topic: 'past-expressions'
  },
  hable: {
    word: 'hable',
    meaning: 'speak (formal command Usted for hablar)',
    pronunciation: 'AH-bleh',
    example: 'Hable despacio, por favor.',
    exampleTranslation: 'Speak slowly, please.',
    audioCue: 'Silent H, stress AH',
    levelIntroduced: 'C1',
    topic: 'formal-commands'
  },
  coma: {
    word: 'coma',
    meaning: 'eat (formal command Usted for comer)',
    pronunciation: 'KOH-mah',
    example: 'Coma más verduras para la salud.',
    exampleTranslation: 'Eat more vegetables for health.',
    audioCue: 'Stress KOH',
    levelIntroduced: 'C1',
    topic: 'formal-commands'
  },
  escriba: {
    word: 'escriba',
    meaning: 'write (formal command Usted for escribir)',
    pronunciation: 'ehs-KREE-bah',
    example: 'Escriba su nombre aquí.',
    exampleTranslation: 'Write your name here.',
    audioCue: 'Stress KREE',
    levelIntroduced: 'C1',
    topic: 'formal-commands'
  },
  habla: {
    word: 'habla',
    meaning: 'speak (informal affirmative command Tú)',
    pronunciation: 'AH-blah',
    example: '¡Habla más fuerte!',
    exampleTranslation: 'Speak louder!',
    audioCue: 'Silent H, stress AH',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  come: {
    word: 'come',
    meaning: 'eat (informal affirmative command Tú)',
    pronunciation: 'KOH-meh',
    example: '¡Come tu manzana!',
    exampleTranslation: 'Eat your apple!',
    audioCue: 'Stress KOH',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  haz: {
    word: 'haz',
    meaning: 'do / make (informal command Tú for hacer)',
    pronunciation: 'ahs',
    example: '¡Haz la tarea ahora mismo!',
    exampleTranslation: 'Do your homework right now!',
    audioCue: 'Irregular command HAZ',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  ten: {
    word: 'ten',
    meaning: 'have / hold (informal command Tú for tener)',
    pronunciation: 'tehn',
    example: '¡Ten paciencia con el proceso!',
    exampleTranslation: 'Have patience with the process!',
    audioCue: 'Irregular command TEN',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  pon: {
    word: 'pon',
    meaning: 'put / place (informal command Tú for poner)',
    pronunciation: 'pohn',
    example: '¡Pon el vaso en la mesa!',
    exampleTranslation: 'Put the glass on the table!',
    audioCue: 'Irregular command PON',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  sal: {
    word: 'sal',
    meaning: 'leave / go out (informal command Tú for salir)',
    pronunciation: 'sahl',
    example: '¡Sal de la habitación ahora!',
    exampleTranslation: 'Leave the room now!',
    audioCue: 'Irregular command SAL',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  ve: {
    word: 've',
    meaning: 'go (informal command Tú for ir)',
    pronunciation: 'beh',
    example: '¡Ve a la tienda a comprar leche!',
    exampleTranslation: 'Go to the store to buy milk!',
    audioCue: 'Irregular command VE',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  di: {
    word: 'di',
    meaning: 'say / tell (informal command Tú for decir)',
    pronunciation: 'dee',
    example: '¡Di la verdad siempre!',
    exampleTranslation: 'Tell the truth always!',
    audioCue: 'Irregular command DI',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  ven: {
    word: 'ven',
    meaning: 'come (informal command Tú for venir)',
    pronunciation: 'behn',
    example: '¡Ven aquí conmigo!',
    exampleTranslation: 'Come here with me!',
    audioCue: 'Irregular command VEN',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },
  se_ser: {
    word: 'sé',
    meaning: 'be (informal command Tú for ser)',
    pronunciation: 'seh',
    example: '¡Sé valiente y honesto!',
    exampleTranslation: 'Be brave and honest!',
    audioCue: 'Accent SEH',
    levelIntroduced: 'C1',
    topic: 'informal-commands'
  },

  // ==========================================
  // PART 7 (Lessons 26-30): Comparisons, Preterite Tense, Preterite vs Imperfect
  // ==========================================
  más: {
    word: 'más',
    meaning: 'more (más... que)',
    pronunciation: 'mas',
    example: 'Él es más alto que su hermano.',
    exampleTranslation: 'He is taller than his brother.',
    audioCue: 'Accent MAS',
    levelIntroduced: 'Part 7',
    topic: 'comparisons'
  },
  menos: {
    word: 'menos',
    meaning: 'less (menos... que)',
    pronunciation: 'MEH-nohs',
    example: 'Tengo menos tiempo que ayer.',
    exampleTranslation: 'I have less time than yesterday.',
    audioCue: 'Stress MEH',
    levelIntroduced: 'Part 7',
    topic: 'comparisons'
  },
  que: {
    word: 'que',
    meaning: 'than / that',
    pronunciation: 'keh',
    example: 'Soy más rápido que el viento.',
    exampleTranslation: 'I am faster than the wind.',
    audioCue: 'Single syllable KEH',
    levelIntroduced: 'Part 7',
    topic: 'comparisons'
  },
  tan: {
    word: 'tan',
    meaning: 'as (tan... como)',
    pronunciation: 'tahn',
    example: 'Ella es tan inteligente como tú.',
    exampleTranslation: 'She is as smart as you.',
    audioCue: 'Single syllable TAHN',
    levelIntroduced: 'Part 7',
    topic: 'comparisons'
  },
  como: {
    word: 'como',
    meaning: 'as / like',
    pronunciation: 'KOH-moh',
    example: 'Corre como un leopardo.',
    exampleTranslation: 'He runs like a leopard.',
    audioCue: 'Stress KOH',
    levelIntroduced: 'Part 7',
    topic: 'comparisons'
  },
  tanto: {
    word: 'tanto',
    meaning: 'as much (tanto... como)',
    pronunciation: 'TAHN-toh',
    example: 'Tengo tanto trabajo como él.',
    exampleTranslation: 'I have as much work as him.',
    audioCue: 'Stress TAHN',
    levelIntroduced: 'Part 7',
    topic: 'comparisons'
  },
  mejor: {
    word: 'mejor',
    meaning: 'better / best',
    pronunciation: 'meh-HOR',
    example: 'Este libro es mejor que el otro.',
    exampleTranslation: 'This book is better than the other.',
    audioCue: 'J sound HOR',
    levelIntroduced: 'Part 7',
    topic: 'superlatives'
  },
  peor: {
    word: 'peor',
    meaning: 'worse / worst',
    pronunciation: 'peh-OR',
    example: 'El clima de hoy es peor que el de ayer.',
    exampleTranslation: 'Today\'s weather is worse than yesterday\'s.',
    audioCue: 'Stress OR',
    levelIntroduced: 'Part 7',
    topic: 'superlatives'
  },
  altísimo: {
    word: 'altísimo',
    meaning: 'extremely tall / absolute superlative',
    pronunciation: 'ahl-TEE-see-moh',
    example: 'El edificio es altísimo.',
    exampleTranslation: 'The building is extremely tall.',
    audioCue: 'Suffix -ÍSIMO',
    levelIntroduced: 'Part 7',
    topic: 'superlatives'
  },
  hablé: {
    word: 'hablé',
    meaning: 'I spoke (preterite -AR)',
    pronunciation: 'ah-BLEH',
    example: 'Hablé con el director ayer.',
    exampleTranslation: 'I spoke with the director yesterday.',
    audioCue: 'Accent BLEH',
    levelIntroduced: 'Part 7',
    topic: 'preterite-ar'
  },
  habló: {
    word: 'habló',
    meaning: 'he/she spoke (preterite -AR)',
    pronunciation: 'ah-BLOH',
    example: 'Él habló en la reunión.',
    exampleTranslation: 'He spoke at the meeting.',
    audioCue: 'Accent BLOH',
    levelIntroduced: 'Part 7',
    topic: 'preterite-ar'
  },
  hablaron: {
    word: 'hablaron',
    meaning: 'they spoke (preterite -AR)',
    pronunciation: 'ah-BLAH-rohn',
    example: 'Ellos hablaron sobre el proyecto.',
    exampleTranslation: 'They spoke about the project.',
    audioCue: 'Stress BLAH',
    levelIntroduced: 'Part 7',
    topic: 'preterite-ar'
  },
  comí: {
    word: 'comí',
    meaning: 'I ate (preterite -ER)',
    pronunciation: 'koh-MEE',
    example: 'Comí una paella riquísima.',
    exampleTranslation: 'I ate a delicious paella.',
    audioCue: 'Accent MEE',
    levelIntroduced: 'Part 7',
    topic: 'preterite-er-ir'
  },
  comió: {
    word: 'comió',
    meaning: 'he/she ate (preterite -ER)',
    pronunciation: 'koh-MYOH',
    example: 'Ella comió la fruta fresca.',
    exampleTranslation: 'She ate the fresh fruit.',
    audioCue: 'Accent MYOH',
    levelIntroduced: 'Part 7',
    topic: 'preterite-er-ir'
  },
  comieron: {
    word: 'comieron',
    meaning: 'they ate (preterite -ER)',
    pronunciation: 'koh-MYEH-rohn',
    example: 'Ellos comieron en el restaurante.',
    exampleTranslation: 'They ate at the restaurant.',
    audioCue: 'Diphthong MYEH',
    levelIntroduced: 'Part 7',
    topic: 'preterite-er-ir'
  },
  viví: {
    word: 'viví',
    meaning: 'I lived (preterite -IR)',
    pronunciation: 'bee-BEE',
    example: 'Viví cinco años en España.',
    exampleTranslation: 'I lived five years in Spain.',
    audioCue: 'Accent BEE',
    levelIntroduced: 'Part 7',
    topic: 'preterite-er-ir'
  },
  vivió: {
    word: 'vivió',
    meaning: 'he/she lived (preterite -IR)',
    pronunciation: 'bee-BYOH',
    example: 'Él vivió en México.',
    exampleTranslation: 'He lived in Mexico.',
    audioCue: 'Accent BYOH',
    levelIntroduced: 'Part 7',
    topic: 'preterite-er-ir'
  },
  fui: {
    word: 'fui',
    meaning: 'I went / I was (irregular preterite ir/ser)',
    pronunciation: 'fwee',
    example: 'Fui al museo el fin de semana.',
    exampleTranslation: 'I went to the museum over the weekend.',
    audioCue: 'Single syllable FWEE',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  fue: {
    word: 'fue',
    meaning: 'he/she went / was (irregular preterite ir/ser)',
    pronunciation: 'fweh',
    example: 'La película fue fantástica.',
    exampleTranslation: 'The movie was fantastic.',
    audioCue: 'Single syllable FWEH',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  fuimos: {
    word: 'fuimos',
    meaning: 'we went / were (irregular preterite ir/ser)',
    pronunciation: 'FWEE-mohs',
    example: 'Fuimos a la playa juntos.',
    exampleTranslation: 'We went to the beach together.',
    audioCue: 'Diphthong FWEE',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  fueron: {
    word: 'fueron',
    meaning: 'they went / were (irregular preterite ir/ser)',
    pronunciation: 'FWEH-rohn',
    example: 'Ellos fueron los ganadores.',
    exampleTranslation: 'They were the winners.',
    audioCue: 'Diphthong FWEH',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  hice: {
    word: 'hice',
    meaning: 'I did / made (irregular preterite hacer)',
    pronunciation: 'EE-theh',
    example: 'Hice la tarea a tiempo.',
    exampleTranslation: 'I did the homework on time.',
    audioCue: 'Silent H, stress EE',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  hizo: {
    word: 'hizo',
    meaning: 'he/she did / made (irregular preterite hacer)',
    pronunciation: 'EE-thoh',
    example: 'Él hizo una obra de arte.',
    exampleTranslation: 'He made a work of art.',
    audioCue: 'Silent H, stress EE',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  tuve: {
    word: 'tuve',
    meaning: 'I had (irregular preterite tener)',
    pronunciation: 'TOO-beh',
    example: 'Tuve una gran idea.',
    exampleTranslation: 'I had a great idea.',
    audioCue: 'Stress TOO',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  tuvo: {
    word: 'tuvo',
    meaning: 'he/she had (irregular preterite tener)',
    pronunciation: 'TOO-boh',
    example: 'Ella tuvo suerte hoy.',
    exampleTranslation: 'She was lucky today.',
    audioCue: 'Stress TOO',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  estuve: {
    word: 'estuve',
    meaning: 'I was (irregular preterite estar)',
    pronunciation: 'ehs-TOO-beh',
    example: 'Estuve enfermo ayer.',
    exampleTranslation: 'I was sick yesterday.',
    audioCue: 'Stress TOO',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  estuvo: {
    word: 'estuvo',
    meaning: 'he/she was (irregular preterite estar)',
    pronunciation: 'ehs-TOO-boh',
    example: 'Él estuvo en Madrid tres días.',
    exampleTranslation: 'He was in Madrid for three days.',
    audioCue: 'Stress TOO',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  pude: {
    word: 'pude',
    meaning: 'I managed to / could (irregular preterite poder)',
    pronunciation: 'POO-deh',
    example: 'Pude terminar el examen.',
    exampleTranslation: 'I managed to finish the exam.',
    audioCue: 'Stress POO',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  dije: {
    word: 'dije',
    meaning: 'I said / told (irregular preterite decir)',
    pronunciation: 'DEE-heh',
    example: 'Le dije la verdad a mi amigo.',
    exampleTranslation: 'I told the truth to my friend.',
    audioCue: 'J sound DEE-heh',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  },
  dijo: {
    word: 'dijo',
    meaning: 'he/she said / told (irregular preterite decir)',
    pronunciation: 'DEE-hoh',
    example: 'Él dijo que vendría pronto.',
    exampleTranslation: 'He said he would come soon.',
    audioCue: 'J sound DEE-hoh',
    levelIntroduced: 'Part 7',
    topic: 'irregular-preterite'
  }
};

/**
 * Sanitizes a word by removing common Spanish punctuation marks
 * and converts it to lower case.
 */
export const sanitizeWordForLookup = (word: string): string => {
  return word
    .toLowerCase()
    .replace(/[¿?¡!,\.:;\(\)"']/g, '')
    .trim();
};

/**
 * Looks up a word translation in our curated companion dictionary.
 */
export const lookupCompanionWord = (word: string): DictionaryEntry | null => {
  const clean = sanitizeWordForLookup(word);
  return COMPANION_DICTIONARY[clean] || null;
};
