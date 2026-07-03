import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Info,
  Layers,
  Users,
  Compass,
  Menu,
  X,
  Volume2,
  Check,
  Trophy,
  GraduationCap,
  Languages,
  BookOpenCheck
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';

// ── Types & Data ────────────────────────────────────────────────────────────

type ActiveSection = 'overview' | 'lesson1' | 'lesson2' | 'lesson3' | 'lesson4' | 'exam';

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

const GREETINGS_VOCAB: VocabularyWord[] = [
  { word: '¡Hola!', phonetic: 'OH-lah', translation: 'Hello! / Hi!', context: 'Used anytime, very common.' },
  { word: 'Buenos días', phonetic: 'BWEH-nos DEE-ahs', translation: 'Good morning', context: 'Used from sunrise to noon.' },
  { word: 'Buenas tardes', phonetic: 'BWEH-nahs TAR-dehs', translation: 'Good afternoon', context: 'Used from noon to dark.' },
  { word: 'Buenas noches', phonetic: 'BWEH-nahs NOH-chehs', translation: 'Good evening / Good night', context: 'Used after dark.' },
];

const INTRODUCTIONS_VOCAB: VocabularyWord[] = [
  { word: '¿Cómo te llamas?', phonetic: 'KOH-moh teh YAH-mahs', translation: 'What is your name? (informal)', context: 'To peers or kids.' },
  { word: '¿Cómo se llama usted?', phonetic: 'KOH-moh seh YAH-mah oos-TEHD', translation: 'What is your name? (formal)', context: 'To authority or elders.' },
  { word: 'Me llamo...', phonetic: 'Meh YAH-moh', translation: 'My name is...', context: 'Followed by your name.' },
  { word: 'Mucho gusto', phonetic: 'MOO-choh GOOS-toh', translation: 'Nice to meet you', context: 'Standard polite reply.' },
  { word: 'Encantado / Encantada', phonetic: 'ehn-kahn-TAH-doh / -dah', translation: 'Delighted to meet you', context: '-doh for males, -dah for females.' },
  { word: '¿De dónde eres?', phonetic: 'Deh DOHN-deh EH-rehs', translation: 'Where are you from? (informal)', context: 'Asking origin.' },
  { word: 'Soy de...', phonetic: 'Soy deh', translation: 'I am from...', context: 'Followed by country or city.' },
];

const GOODBYES_VOCAB: VocabularyWord[] = [
  { word: 'Adiós', phonetic: 'ah-DYOHS', translation: 'Goodbye', context: 'Formal or permanent farewell.' },
  { word: 'Hasta luego', phonetic: 'AHS-tah LWEH-goh', translation: 'See you later', context: 'Most common farewell.' },
  { word: 'Hasta mañana', phonetic: 'AHS-tah mah-NYAH-nah', translation: 'See you tomorrow', context: 'If seeing them tomorrow.' },
  { word: 'Nos vemos', phonetic: 'nohs VEH-mohs', translation: 'See you / We see each other', context: 'Friendly and casual.' },
  { word: 'Chao', phonetic: 'CHOW', translation: 'Bye', context: 'Borrowed from Italian, very common in LA.' },
];

const VOWELS_GUIDE: VowelGuide[] = [
  {
    letter: 'A',
    sound: 'ah',
    englishLike: 'like the "a" in father',
    examples: [
      { spanish: 'casa', english: 'house' },
      { spanish: 'cantar', english: 'to sing' }
    ]
  },
  {
    letter: 'E',
    sound: 'eh',
    englishLike: 'like the "e" in met',
    examples: [
      { spanish: 'mesa', english: 'table' },
      { spanish: 'el', english: 'the (masculine)' }
    ]
  },
  {
    letter: 'I',
    sound: 'ee',
    englishLike: 'like the "ee" in machine',
    examples: [
      { spanish: 'sí', english: 'yes' },
      { spanish: 'libro', english: 'book' }
    ]
  },
  {
    letter: 'O',
    sound: 'oh',
    englishLike: 'like the "o" in boat (but shorter/purer)',
    examples: [
      { spanish: 'hola', english: 'hello' },
      { spanish: 'perro', english: 'dog' }
    ]
  },
  {
    letter: 'U',
    sound: 'oo',
    englishLike: 'like the "oo" in boot',
    examples: [
      { spanish: 'uno', english: 'one' },
      { spanish: 'música', english: 'music' }
    ]
  }
];

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    lessonId: 1,
    question: 'Which Spanish vowel is pronounced like the "ee" in the English word "machine"?',
    options: ['A', 'E', 'I', 'O', 'U'],
    correctAnswer: 'I',
    explanation: 'The letter "I" in Spanish represents a pure "ee" sound. For example, "libro" sounds like "lee-bro".',
  },
  {
    id: 2,
    lessonId: 1,
    question: 'Which of the following phrases is the standard way to say "Good afternoon" in Spanish?',
    options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'],
    correctAnswer: 'Buenas tardes',
    explanation: '"Buenas tardes" means "Good afternoon" and is used from noon until nightfall. "Buenos días" is for the morning.',
  },
  {
    id: 3,
    lessonId: 2,
    question: 'The noun "mapa" (map) ends in "-a". What is its correct definite article?',
    options: ['el', 'la', 'los', 'las'],
    correctAnswer: 'el',
    explanation: '"El mapa" is a masculine exception noun. Despite ending in "-a", it takes the masculine article "el".',
  },
  {
    id: 4,
    lessonId: 2,
    question: 'According to the stressed "a" rule, what is the correct singular and plural form for "water"?',
    options: [
      'la agua / las aguas',
      'el agua / los aguas',
      'el agua / las aguas',
      'la agua / los aguas'
    ],
    correctAnswer: 'el agua / las aguas',
    explanation: 'Singular feminine nouns starting with a stressed "a" or "ha" sound use "el" to avoid vocal friction (el agua), but remain feminine in the plural (las aguas).',
  },
  {
    id: 5,
    lessonId: 3,
    question: 'If you are referring to a mixed group of 10 girls and 1 boy as "they", which pronoun is correct?',
    options: ['ellas', 'ellos', 'nosotros', 'nosotras'],
    correctAnswer: 'ellos',
    explanation: 'In Spanish, any mixed-gender group (even 99% female) uses the masculine plural subject pronoun ("ellos").',
  },
  {
    id: 6,
    lessonId: 3,
    question: 'Choose the correct conjugation of the verb "ser": "Tú y yo ___ de España."',
    options: ['soy', 'eres', 'es', 'somos'],
    correctAnswer: 'somos',
    explanation: '"Tú y yo" (You and I) is equivalent to "we" (nosotros/as), which conjugates to "somos" for the verb "ser".',
  },
  {
    id: 7,
    lessonId: 4,
    question: 'What is the correct conjugation of the regular "-ar" verb "hablar" for the pronoun "tú"?',
    options: ['hablo', 'hablas', 'habla', 'hablamos'],
    correctAnswer: 'hablas',
    explanation: 'To conjugate regular "-ar" verbs for "tú", drop "-ar" and add "-as", giving "hablas".',
  },
  {
    id: 8,
    lessonId: 4,
    question: 'Which of the following translates "the Spanish universities" correctly? (university = universidad, Spanish = español)',
    options: [
      'las universidad españolas',
      'las universidades españolas',
      'los universidades españoles',
      'las universidades español'
    ],
    correctAnswer: 'las universidades españolas',
    explanation: '"Universidad" is feminine, so its plural is "las universidades". The adjective must agree in gender and number, becoming "españolas", and is placed after the noun.',
  }
];

const BasicEspanolScreen: FC = () => {
  // Navigation states
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Lesson progression checklist
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    lesson1: false,
    lesson2: false,
    lesson3: false,
    lesson4: false,
  });

  // Interactive UI Helpers
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [showDialogueTranslation, setShowDialogueTranslation] = useState(false);

  // Lesson 2 Interactive sorting states
  const [genderMatcherAnswers, setGenderMatcherAnswers] = useState<Record<string, string>>({});
  const genderMatcherNouns = [
    { word: 'libro', correct: 'el', rule: 'Ends in -o (Masculine)' },
    { word: 'universidad', correct: 'la', rule: 'Ends in -dad (Feminine)' },
    { word: 'mapa', correct: 'el', rule: 'Masculine Exception!' },
    { word: 'mano', correct: 'la', rule: 'Feminine Exception!' },
    { word: 'agua', correct: 'el', rule: 'Stressed "a-" Singular Exception! (Plural: las aguas)' },
    { word: 'canción', correct: 'la', rule: 'Ends in -ción (Feminine)' },
  ];

  // Lesson 3 Interactive Ser board
  const [selectedSerPronoun, setSelectedSerPronoun] = useState<string | null>(null);
  const serDetails: Record<string, { conjugation: string; example: string; english: string }> = {
    'Yo': { conjugation: 'soy', example: 'Yo soy estudiante de español.', english: 'I am a Spanish student.' },
    'Tú': { conjugation: 'eres', example: 'Tú eres una persona inteligente.', english: 'You are an intelligent person.' },
    'Él / Ella / Usted': { conjugation: 'es', example: 'Usted es el profesor de música.', english: 'You (formal) are the music teacher.' },
    'Nosotros / Nosotras': { conjugation: 'somos', example: 'Nosotras somos de Argentina.', english: 'We are from Argentina.' },
    'Vosotros / Vosotras': { conjugation: 'sois', example: 'Vosotros sois muy amigables.', english: 'You all (Spain) are very friendly.' },
    'Ellos / Ellas / Ustedes': { conjugation: 'son', example: 'Ellos son doctores en el hospital.', english: 'They are doctors in the hospital.' },
  };

  // Lesson 4 Verb Conjugator builder
  const [builderVerb, setBuilderVerb] = useState<'hablar' | 'ayudar'>('hablar');
  const [builderPronoun, setBuilderPronoun] = useState<string>('Yo');
  const arEndings: Record<string, { ending: string; explanation: string }> = {
    'Yo': { ending: '-o', explanation: 'First-person singular' },
    'Tú': { ending: '-as', explanation: 'Second-person singular (informal)' },
    'Él / Ella / Usted': { ending: '-a', explanation: 'Third-person singular (or formal you)' },
    'Nosotros / Nosotras': { ending: '-amos', explanation: 'First-person plural (we)' },
    'Vosotros / Vosotras': { ending: '-áis', explanation: 'Second-person plural (you all - Spain)' },
    'Ellos / Ellas / Ustedes': { ending: '-an', explanation: 'Third-person plural (or you all)' },
  };

  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Record<number, string>>({});

  const addRewards = useStatsStore((s) => s.addRewards);

  // Computed properties
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 4) * 100);

  const handleLessonComplete = (lessonKey: string) => {
    setCompletedLessons(prev => ({
      ...prev,
      [lessonKey]: !prev[lessonKey]
    }));
  };

  const handleGenderMatch = (word: string, selectedArticle: string) => {
    setGenderMatcherAnswers(prev => ({
      ...prev,
      [word]: selectedArticle
    }));
  };

  const getConjugationResult = (verb: 'hablar' | 'ayudar', pronoun: string) => {
    const stem = verb === 'hablar' ? 'habl' : 'ayud';
    const endingInfo = arEndings[pronoun];
    if (!endingInfo) return { stem: '', ending: '', conjugated: '', english: '' };
    const conjugated = stem + endingInfo.ending.replace('-', '');
    
    let engTranslation = '';
    if (verb === 'hablar') {
      if (pronoun === 'Yo') engTranslation = 'I speak';
      else if (pronoun === 'Tú') engTranslation = 'You speak';
      else if (pronoun.includes('Él')) engTranslation = 'He / She speaks or You (formal) speak';
      else if (pronoun.includes('Nosotros')) engTranslation = 'We speak';
      else if (pronoun.includes('Vosotros')) engTranslation = 'You all (informal Spain) speak';
      else engTranslation = 'They speak or You all speak';
    } else {
      if (pronoun === 'Yo') engTranslation = 'I help';
      else if (pronoun === 'Tú') engTranslation = 'You help';
      else if (pronoun.includes('Él')) engTranslation = 'He / She helps or You (formal) help';
      else if (pronoun.includes('Nosotros')) engTranslation = 'We help';
      else if (pronoun.includes('Vosotros')) engTranslation = 'You all (informal Spain) help';
      else engTranslation = 'They help or You all help';
    }

    return {
      stem,
      ending: endingInfo.ending,
      conjugated,
      english: engTranslation
    };
  };

  // Quiz Handlers
  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    setShowExplanation(true);
    setAnswersHistory(prev => ({ ...prev, [EXAM_QUESTIONS[currentQuestionIndex].id]: option }));
    if (option === EXAM_QUESTIONS[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestionIndex < EXAM_QUESTIONS.length - 1) {
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
    setAnswersHistory({});
  };

  const claimQuizRewards = () => {
    if (rewardClaimed) return;
    const finalXP = score * 5; // 5 XP per correct answer (max 40 XP)
    const finalCoins = score >= 6 ? 15 : score >= 4 ? 8 : 3; // 15 coins for passing, 8 for average, 3 for effort
    addRewards(finalXP, finalCoins);
    setRewardClaimed(true);
  };

  // Nav Items List
  const sectionsList = [
    { id: 'overview', title: 'Course Overview', icon: BookOpen },
    { id: 'lesson1', title: 'Lesson 1: Greetings & Vowels', icon: Volume2, sub: 'Greetings, Vowels & Dialogue' },
    { id: 'lesson2', title: 'Lesson 2: Articles & Nouns', icon: Layers, sub: 'Gender, Plurals & Exceptions' },
    { id: 'lesson3', title: 'Lesson 3: Pronouns & Ser', icon: Users, sub: 'Pronoun Matrix & Verb Ser' },
    { id: 'lesson4', title: 'Lesson 4: Regular -ar Verbs', icon: Sparkles, sub: 'AR Conjugation & Adjectives' },
    { id: 'exam', title: 'Consolidated Exam', icon: Award, sub: '8-Question Knowledge Test' },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink text-paper relative overflow-x-hidden font-body">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-marigold/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Responsive Grid Layout */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[19rem_1fr] min-h-[calc(100vh-3.5rem)]">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-pencil/15 bg-ink/40 backdrop-blur-md p-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto z-20">
          <div className="space-y-6">
            
            {/* Title / Logo */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Compass className="h-5 w-5 text-marigold" />
                <span className="font-hud text-[9px] tracking-[0.25em] uppercase text-pencil">
                  Spanish Part 1
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-paper">
                Básico Español 🇪🇸
              </h2>
              <p className="text-[11px] text-pencil mt-1">Workbook Study Guide & Exam</p>
            </div>

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
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-terracotta/15 border-terracotta/40 text-paper shadow-[0_0_15px_rgba(193,80,46,0.15)]'
                        : 'bg-transparent border-transparent text-pencil hover:text-paper hover:bg-paper/5 hover:border-pencil/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-terracotta/20 text-terracotta' : 'bg-paper/5 text-pencil'}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{sec.title}</div>
                        {sec.sub && <div className="text-[10px] text-pencil/80 font-normal">{sec.sub}</div>}
                      </div>
                    </div>

                    {isCompleted && (
                      <div className="bg-teal-deep/20 text-teal-deep p-1 rounded-full border border-teal-deep/30">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer & Syllabus Progress */}
          <div className="pt-6 border-t border-pencil/15 space-y-3">
            <div className="flex justify-between items-center text-xs text-pencil">
              <span>Syllabus Progress</span>
              <span className="font-semibold text-paper">{progressPercent}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-paper/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-terracotta to-marigold h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="text-[10px] text-pencil/70 text-center leading-relaxed">
              Read all lessons to prepare for the Consolidated Exam.
            </div>
          </div>
        </aside>

        {/* MOBILE HEADER */}
        <header className="lg:hidden flex items-center justify-between sticky top-14 bg-ink/90 backdrop-blur-md px-4 py-3.5 border-b border-pencil/15 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg bg-paper/5 border border-pencil/10 text-paper"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <span className="font-hud text-[9px] tracking-[0.2em] uppercase text-pencil block">Básico Español</span>
              <span className="font-display text-sm font-bold text-paper">
                {sectionsList.find(s => s.id === activeSection)?.title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-paper/5 border border-pencil/15 rounded-full px-2.5 py-1 text-xs text-marigold font-semibold">
            <Trophy className="h-3.5 w-3.5" />
            <span>{completedCount}/4</span>
          </div>
        </header>

        {/* MOBILE SIDEBAR DRAWER OVERLAY */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              {/* Dim Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
              />

              {/* Slider Panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-0 bottom-0 left-0 w-80 bg-ink border-r border-pencil/15 p-6 z-50 overflow-y-auto lg:hidden flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-bold text-paper">Básico Español 🇪🇸</h2>
                      <p className="text-[10px] text-pencil">Workbook Study Guide</p>
                    </div>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg bg-paper/5 border border-pencil/10 text-pencil hover:text-paper"
                    >
                      <X className="h-5 w-5" />
                    </button>
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
                              ? 'bg-terracotta/15 border-terracotta/40 text-paper'
                              : 'bg-transparent border-transparent text-pencil hover:text-paper hover:bg-paper/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
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

                <div className="pt-6 border-t border-pencil/15 space-y-3">
                  <div className="flex justify-between items-center text-xs text-pencil">
                    <span>Course Progress</span>
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
        <main className="p-4 sm:p-6 lg:p-10 flex flex-col justify-between max-w-4xl w-full mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >

              {/* ────────────────────────────────────────────────────────────
                  SECTION: COURSE OVERVIEW
                  ──────────────────────────────────────────────────────────── */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  {/* Hero Board */}
                  <div className="bg-gradient-to-r from-terracotta/10 to-marigold/10 border border-pencil/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-10 text-[10rem] select-none">🇪🇸</div>
                    <div className="relative z-10 space-y-3">
                      <div className="inline-flex items-center gap-1.5 bg-marigold/10 border border-marigold/30 text-marigold rounded-full px-3 py-1 text-[10px] font-hud uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" />
                        Complete Spanish Part 1 Course
                      </div>
                      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-paper leading-tight">
                        Master the Spanish Fundamentals
                      </h1>
                      <p className="font-body text-sm text-pencil max-w-2xl leading-relaxed">
                        Welcome to the basic training ground. This workbook course guides you step-by-step through vowel sounds, essential greetings, grammatical gender with articles, subject pronouns, the core verb <span className="italic text-marigold font-semibold">ser</span>, and conjugating regular <span className="font-mono bg-paper/5 px-1 py-0.5 rounded text-terracotta font-semibold">-ar</span> verbs in the present tense.
                      </p>
                    </div>
                  </div>

                  {/* Course Syllabus Steps */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-paper flex items-center gap-2">
                      <BookOpenCheck className="h-5 w-5 text-terracotta" />
                      Course Syllabus Table of Contents
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Lesson 1 Card */}
                      <div
                        onClick={() => setActiveSection('lesson1')}
                        className="bg-paper/5 border border-pencil/10 hover:border-pencil/35 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] space-y-2 group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-hud tracking-wider text-pencil uppercase">Lesson 1</span>
                          {completedLessons.lesson1 && <CheckCircle2 className="h-4 w-4 text-teal-deep" />}
                        </div>
                        <h4 className="font-display font-bold text-sm text-paper group-hover:text-terracotta transition-colors">
                          Intro to Spanish & Greetings
                        </h4>
                        <p className="text-xs text-pencil leading-normal">
                          Complete greetings vocabulary, vowel pronunciation matrix (A, E, I, O, U), introductions, and goodbyes.
                        </p>
                      </div>

                      {/* Lesson 2 Card */}
                      <div
                        onClick={() => setActiveSection('lesson2')}
                        className="bg-paper/5 border border-pencil/10 hover:border-pencil/35 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] space-y-2 group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-hud tracking-wider text-pencil uppercase">Lesson 2</span>
                          {completedLessons.lesson2 && <CheckCircle2 className="h-4 w-4 text-teal-deep" />}
                        </div>
                        <h4 className="font-display font-bold text-sm text-paper group-hover:text-terracotta transition-colors">
                          Definite Articles & Nouns
                        </h4>
                        <p className="text-xs text-pencil leading-normal">
                          Gender rules (-o vs -a), plural nouns, contractions (del/al), and exceptions like mapa, mano, and agua.
                        </p>
                      </div>

                      {/* Lesson 3 Card */}
                      <div
                        onClick={() => setActiveSection('lesson3')}
                        className="bg-paper/5 border border-pencil/10 hover:border-pencil/35 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] space-y-2 group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-hud tracking-wider text-pencil uppercase">Lesson 3</span>
                          {completedLessons.lesson3 && <CheckCircle2 className="h-4 w-4 text-teal-deep" />}
                        </div>
                        <h4 className="font-display font-bold text-sm text-paper group-hover:text-terracotta transition-colors">
                          Subject Pronouns & The Verb Ser
                        </h4>
                        <p className="text-xs text-pencil leading-normal">
                          Singular/plural pronouns, formal vs informal rules, mixed gender groups, and conjugating & using "ser".
                        </p>
                      </div>

                      {/* Lesson 4 Card */}
                      <div
                        onClick={() => setActiveSection('lesson4')}
                        className="bg-paper/5 border border-pencil/10 hover:border-pencil/35 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:translate-y-[-2px] space-y-2 group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-hud tracking-wider text-pencil uppercase">Lesson 4</span>
                          {completedLessons.lesson4 && <CheckCircle2 className="h-4 w-4 text-teal-deep" />}
                        </div>
                        <h4 className="font-display font-bold text-sm text-paper group-hover:text-terracotta transition-colors">
                          Regular -ar Verbs in Present
                        </h4>
                        <p className="text-xs text-pencil leading-normal">
                          Stem and endings, conjugating hablar & ayudar, pronoun dropping, nationalities, and adjective placement.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Status Dashboard */}
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-display font-bold text-sm text-paper">Ready to Test Your Skill?</h4>
                      <p className="text-xs text-pencil">Take the 8-question Consolidated Exam covering all 4 lessons to earn XP and coins.</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveSection('exam');
                        resetQuiz();
                      }}
                      className="bg-marigold text-ink hover:bg-amber-400 font-hud text-xs uppercase tracking-wider font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="h-4 w-4 animate-spin-slow" />
                      Start Final Exam
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  SECTION: LESSON 1 — INTRO TO SPANISH & GREETINGS
                  ──────────────────────────────────────────────────────────── */}
              {activeSection === 'lesson1' && (
                <div className="space-y-8">
                  <div>
                    <span className="font-hud text-xs text-terracotta font-semibold tracking-wider block">LESSON 1</span>
                    <h2 className="font-display text-2xl font-bold text-paper">Intro to Spanish & Greetings</h2>
                    <p className="text-sm text-pencil mt-1">
                      Start your journey by learning how to greet people, introduce yourself, goodbye customs, and pronounce Spanish vowels perfectly.
                    </p>
                  </div>

                  {/* Vowel Pronunciation Guide */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <GraduationCap className="h-5 w-5 text-marigold" />
                      1. Vowel Pronunciation Guide (A, E, I, O, U)
                    </h3>
                    <p className="text-xs text-pencil">
                      Unlike English vowels, which shift and slide, Spanish vowels are **short, pure, and constant**. Click each vowel below to reveal its sound and examples.
                    </p>
                    
                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                      {VOWELS_GUIDE.map((v) => (
                        <button
                          key={v.letter}
                          onClick={() => setSelectedVowel(v.letter === selectedVowel ? null : v.letter)}
                          className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                            selectedVowel === v.letter
                              ? 'bg-marigold/20 border-marigold text-marigold shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                              : 'bg-paper/5 border-pencil/10 hover:border-pencil/30 text-paper'
                          }`}
                        >
                          <span className="font-display text-2xl font-bold block">{v.letter}</span>
                          <span className="text-[10px] text-pencil/80 block mt-0.5">{v.sound}</span>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedVowel && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-paper/5 border border-pencil/15 rounded-xl p-4 space-y-2.5 overflow-hidden"
                        >
                          {(() => {
                            const vg = VOWELS_GUIDE.find(v => v.letter === selectedVowel)!;
                            return (
                              <>
                                <div className="text-xs text-paper">
                                  Pronounced: <strong className="text-marigold">{vg.englishLike}</strong>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-[10px] text-pencil font-hud uppercase">Example Words:</div>
                                  <div className="grid grid-cols-2 gap-3">
                                    {vg.examples.map((ex, i) => (
                                      <div key={i} className="flex justify-between items-center bg-ink/50 px-3 py-1.5 rounded-lg border border-pencil/10">
                                        <span className="font-semibold text-paper italic">{ex.spanish}</span>
                                        <span className="text-[10px] text-pencil">({ex.english})</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Greetings Vocabulary */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <Volume2 className="h-5 w-5 text-terracotta" />
                      2. Greetings Vocabulary
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-pencil/20 text-pencil font-hud text-[10px]">
                            <th className="py-2.5 px-3">Spanish Word</th>
                            <th className="py-2.5 px-3">Phonetic Guide</th>
                            <th className="py-2.5 px-3">English Translation</th>
                            <th className="py-2.5 px-3">Context / Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {GREETINGS_VOCAB.map((item, idx) => (
                            <tr key={idx} className="border-b border-pencil/10 hover:bg-paper/5 transition-colors">
                              <td className="py-3 px-3 font-semibold text-marigold">{item.word}</td>
                              <td className="py-3 px-3 font-mono text-pencil/95">[{item.phonetic}]</td>
                              <td className="py-3 px-3 text-paper font-semibold">{item.translation}</td>
                              <td className="py-3 px-3 text-pencil">{item.context}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Introductions & Goodbyes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Introductions */}
                    <div className="space-y-3 bg-paper/5 border border-pencil/15 rounded-2xl p-5">
                      <h4 className="font-display font-bold text-sm text-paper flex items-center gap-2">
                        <Users className="h-4 w-4 text-marigold" />
                        3. Introductions
                      </h4>
                      <div className="space-y-2">
                        {INTRODUCTIONS_VOCAB.map((item, idx) => (
                          <div key={idx} className="flex flex-col border-b border-pencil/10 pb-2 last:border-b-0">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-marigold text-xs">{item.word}</span>
                              <span className="text-[10px] text-pencil/80 font-mono">[{item.phonetic}]</span>
                            </div>
                            <div className="flex justify-between items-center mt-0.5">
                              <span className="text-paper text-xs">{item.translation}</span>
                              <span className="text-[10px] text-pencil italic">({item.context})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Goodbyes */}
                    <div className="space-y-3 bg-paper/5 border border-pencil/15 rounded-2xl p-5">
                      <h4 className="font-display font-bold text-sm text-paper flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-terracotta" />
                        4. Goodbyes
                      </h4>
                      <div className="space-y-2">
                        {GOODBYES_VOCAB.map((item, idx) => (
                          <div key={idx} className="flex flex-col border-b border-pencil/10 pb-2 last:border-b-0">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-terracotta text-xs">{item.word}</span>
                              <span className="text-[10px] text-pencil/80 font-mono">[{item.phonetic}]</span>
                            </div>
                            <div className="flex justify-between items-center mt-0.5">
                              <span className="text-paper text-xs">{item.translation}</span>
                              <span className="text-[10px] text-pencil italic">({item.context})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Interactive Dialogue Practice */}
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className="font-display font-bold text-sm text-paper flex items-center gap-2">
                          <Languages className="h-4.5 w-4.5 text-marigold" />
                          Dialogue Simulation: Meeting a Friend
                        </h4>
                        <p className="text-[11px] text-pencil">Read the interaction between Sofia and Diego. Try pronouncing it aloud!</p>
                      </div>
                      <button
                        onClick={() => setShowDialogueTranslation(!showDialogueTranslation)}
                        className="bg-paper/5 border border-pencil/15 hover:bg-paper/10 text-xs font-semibold px-4 py-2 rounded-xl transition-all text-paper cursor-pointer self-start sm:self-center"
                      >
                        {showDialogueTranslation ? 'Hide Translations' : 'Show Translations'}
                      </button>
                    </div>

                    <div className="space-y-3.5 pt-2">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center font-bold text-xs text-terracotta flex-shrink-0">D</div>
                        <div className="bg-ink/50 rounded-xl p-3 border border-pencil/10 flex-grow">
                          <p className="text-xs font-semibold text-paper italic">"¡Hola! ¿Cómo te llamas?"</p>
                          {showDialogueTranslation && <p className="text-[10px] text-pencil mt-1">("Hello! What is your name?")</p>}
                        </div>
                      </div>

                      <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-marigold/20 border border-marigold/40 flex items-center justify-center font-bold text-xs text-marigold flex-shrink-0">S</div>
                        <div className="bg-ink/50 rounded-xl p-3 border border-pencil/10 flex-grow text-right">
                          <p className="text-xs font-semibold text-paper italic">"Hola. Me llamo Sofia. ¿Y tú?"</p>
                          {showDialogueTranslation && <p className="text-[10px] text-pencil mt-1">("Hello. My name is Sofia. And you?")</p>}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center font-bold text-xs text-terracotta flex-shrink-0">D</div>
                        <div className="bg-ink/50 rounded-xl p-3 border border-pencil/10 flex-grow">
                          <p className="text-xs font-semibold text-paper italic">"Me llamo Diego. Mucho gusto."</p>
                          {showDialogueTranslation && <p className="text-[10px] text-pencil mt-1">("My name is Diego. Nice to meet you.")</p>}
                        </div>
                      </div>

                      <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-marigold/20 border border-marigold/40 flex items-center justify-center font-bold text-xs text-marigold flex-shrink-0">S</div>
                        <div className="bg-ink/50 rounded-xl p-3 border border-pencil/10 flex-grow text-right">
                          <p className="text-xs font-semibold text-paper italic">"Encantada. ¿De dónde eres?"</p>
                          {showDialogueTranslation && <p className="text-[10px] text-pencil mt-1">("Pleased to meet you. Where are you from?")</p>}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center font-bold text-xs text-terracotta flex-shrink-0">D</div>
                        <div className="bg-ink/50 rounded-xl p-3 border border-pencil/10 flex-grow">
                          <p className="text-xs font-semibold text-paper italic">"Soy de España. ¿Y tú?"</p>
                          {showDialogueTranslation && <p className="text-[10px] text-pencil mt-1">("I am from Spain. And you?")</p>}
                        </div>
                      </div>

                      <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-marigold/20 border border-marigold/40 flex items-center justify-center font-bold text-xs text-marigold flex-shrink-0">S</div>
                        <div className="bg-ink/50 rounded-xl p-3 border border-pencil/10 flex-grow text-right">
                          <p className="text-xs font-semibold text-paper italic">"Soy de México. ¡Hasta luego!"</p>
                          {showDialogueTranslation && <p className="text-[10px] text-pencil mt-1">("I am from Mexico. See you later!")</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Completion and Action */}
                  <div className="pt-6 border-t border-pencil/15 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-pencil font-body">
                      Once you understand all terms and vowels, mark this lesson completed!
                    </p>
                    <button
                      onClick={() => handleLessonComplete('lesson1')}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        completedLessons.lesson1
                          ? 'bg-teal-deep/15 border-teal-deep/30 text-teal-deep'
                          : 'bg-terracotta text-paper border-transparent hover:bg-rose-600'
                      }`}
                    >
                      {completedLessons.lesson1 ? 'Completed ✓ (Click to Undo)' : 'Mark Lesson as Completed'}
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  SECTION: LESSON 2 — DEFINITE ARTICLES & NOUNS
                  ──────────────────────────────────────────────────────────── */}
              {activeSection === 'lesson2' && (
                <div className="space-y-8">
                  <div>
                    <span className="font-hud text-xs text-terracotta font-semibold tracking-wider block">LESSON 2</span>
                    <h2 className="font-display text-2xl font-bold text-paper">Definite Articles & Nouns</h2>
                    <p className="text-sm text-pencil mt-1">
                      Learn how Spanish nouns are categorised by gender, pluralisation rules, contractions, and critical exception words.
                    </p>
                  </div>

                  {/* Definite Articles Grid */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <Layers className="h-5 w-5 text-marigold" />
                      1. Definite Articles ("The")
                    </h3>
                    <p className="text-xs text-pencil">
                      In Spanish, the word for "the" must match the **gender** (masculine or feminine) and **number** (singular or plural) of the noun it modifies.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-hud text-pencil uppercase block mb-1">Masculine Singular</span>
                        <span className="text-3xl font-display font-black text-marigold">el</span>
                        <span className="text-[10px] text-pencil/80 block mt-2 font-semibold italic">el libro (the book)</span>
                      </div>
                      <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-hud text-pencil uppercase block mb-1">Feminine Singular</span>
                        <span className="text-3xl font-display font-black text-terracotta">la</span>
                        <span className="text-[10px] text-pencil/80 block mt-2 font-semibold italic">la mesa (the table)</span>
                      </div>
                      <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-hud text-pencil uppercase block mb-1">Masculine Plural</span>
                        <span className="text-3xl font-display font-black text-marigold">los</span>
                        <span className="text-[10px] text-pencil/80 block mt-2 font-semibold italic">los libros (the books)</span>
                      </div>
                      <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 text-center">
                        <span className="text-[10px] font-hud text-pencil uppercase block mb-1">Feminine Plural</span>
                        <span className="text-3xl font-display font-black text-terracotta">las</span>
                        <span className="text-[10px] text-pencil/80 block mt-2 font-semibold italic">las mesas (the tables)</span>
                      </div>
                    </div>
                  </div>

                  {/* Gender Rules & Plurals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Gender Clues */}
                    <div className="space-y-4 bg-paper/5 border border-pencil/15 rounded-2xl p-5">
                      <h4 className="font-display font-bold text-sm text-paper flex items-center gap-2 border-b border-pencil/10 pb-2">
                        <Info className="h-4.5 w-4.5 text-marigold" />
                        2. General Gender Rules
                      </h4>
                      <div className="space-y-3 text-xs text-pencil">
                        <div>
                          <strong className="text-paper block mb-1">Generally Masculine:</strong>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Nouns ending in <span className="text-marigold font-bold">-o</span> (e.g., <span className="italic">el chico, el carro</span>)</li>
                            <li>Nouns ending in <span className="text-marigold font-bold">-r</span> or <span className="text-marigold font-bold">-l</span> (e.g., <span className="italic">el profesor, el papel</span>)</li>
                            <li>Nouns ending in <span className="text-marigold font-bold">-ma</span> of Greek origin (e.g., <span className="italic">el problema, el sistema, el idioma</span>)</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-paper block mb-1">Generally Feminine:</strong>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Nouns ending in <span className="text-terracotta font-bold">-a</span> (e.g., <span className="italic">la chica, la silla</span>)</li>
                            <li>Nouns ending in <span className="text-terracotta font-bold">-ción</span> / <span className="text-terracotta font-bold">-sión</span> (e.g., <span className="italic">la lección, la televisión</span>)</li>
                            <li>Nouns ending in <span className="text-terracotta font-bold">-dad</span> / <span className="text-terracotta font-bold">-tad</span> (e.g., <span className="italic">la universidad, la libertad</span>)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Plural Rules */}
                    <div className="space-y-4 bg-paper/5 border border-pencil/15 rounded-2xl p-5">
                      <h4 className="font-display font-bold text-sm text-paper flex items-center gap-2 border-b border-pencil/10 pb-2">
                        <Sparkles className="h-4.5 w-4.5 text-terracotta" />
                        3. Rules for Pluralisation
                      </h4>
                      <div className="space-y-3.5 text-xs text-pencil">
                        <div>
                          <strong className="text-paper block">Rule A: Ends in a vowel &rarr; Add -s</strong>
                          <p className="mt-0.5">Example: <span className="italic">el libro &rarr; los libros</span> | <span className="italic">la mesa &rarr; las mesas</span></p>
                        </div>
                        <div>
                          <strong className="text-paper block">Rule B: Ends in a consonant &rarr; Add -es</strong>
                          <p className="mt-0.5">Example: <span className="italic">el papel &rarr; los papeles</span> | <span className="italic">el televisor &rarr; los televisores</span></p>
                        </div>
                        <div>
                          <strong className="text-paper block">Rule C: Ends in -z &rarr; Change -z to -c and add -es</strong>
                          <p className="mt-0.5">Example: <span className="italic">el lápiz (pencil) &rarr; los lápices</span> | <span className="italic">la actriz &rarr; las actrices</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contractions & Critical Exceptions */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <AlertCircle className="h-5 w-5 text-terracotta" />
                      4. Contractions & Critical Exceptions
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contractions */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3 text-xs text-pencil">
                        <h4 className="font-display font-semibold text-paper">Grammatical Contractions</h4>
                        <p>Unlike English which has many contractions, Spanish has only two mandatory written contractions:</p>
                        <div className="space-y-2">
                          <div className="bg-ink/50 p-3 rounded-xl border border-pencil/10">
                            <span className="font-bold text-marigold">de + el &rarr; del</span>
                            <p className="text-[11px] mt-1">E.g., <span className="italic text-paper font-semibold">El carro del profesor</span> (The teacher's car). Not "de el".</p>
                          </div>
                          <div className="bg-ink/50 p-3 rounded-xl border border-pencil/10">
                            <span className="font-bold text-marigold">a + el &rarr; al</span>
                            <p className="text-[11px] mt-1">E.g., <span className="italic text-paper font-semibold">Vamos al supermercado</span> (We go to the supermarket). Not "a el".</p>
                          </div>
                        </div>
                      </div>

                      {/* Exceptions */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3 text-xs text-pencil">
                        <h4 className="font-display font-semibold text-paper">Key Exceptions to Watch Out For</h4>
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-start border-b border-pencil/10 pb-2 last:border-0 last:pb-0">
                            <div>
                              <strong className="text-paper">el mapa</strong> <span className="text-pencil">(the map)</span>
                            </div>
                            <span className="text-[10px] bg-marigold/10 text-marigold px-2 py-0.5 rounded border border-marigold/20">Masculine ends in -a</span>
                          </div>
                          
                          <div className="flex justify-between items-start border-b border-pencil/10 pb-2 last:border-0 last:pb-0">
                            <div>
                              <strong className="text-paper">la mano</strong> <span className="text-pencil">(the hand)</span>
                            </div>
                            <span className="text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded border border-terracotta/20">Feminine ends in -o</span>
                          </div>

                          <div className="flex flex-col border-b border-pencil/10 pb-2 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong className="text-paper">el agua</strong> <span className="text-pencil">(the water)</span>
                              </div>
                              <span className="text-[10px] bg-amber-600/10 text-amber-500 px-2 py-0.5 rounded border border-amber-600/20">Stressed "A" rule</span>
                            </div>
                            <p className="text-[10px] text-pencil/80 mt-1 leading-normal">
                              Singular feminine nouns beginning with a stressed **a** or **ha** take the article **el** to prevent vocal clash. In plural, they stay feminine: <strong className="text-paper">las aguas</strong>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive selector tool */}
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-4">
                    <div>
                      <h4 className="font-display font-bold text-sm text-paper">Interactive Tool: Noun Gender Matcher</h4>
                      <p className="text-[11px] text-pencil">Test your gender knowledge! Click the correct article (el or la) for each word below.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {genderMatcherNouns.map((item) => {
                        const userAns = genderMatcherAnswers[item.word];
                        const isCorrect = userAns === item.correct;
                        const hasAnswered = !!userAns;

                        return (
                          <div key={item.word} className="bg-ink/50 border border-pencil/10 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-paper italic text-sm">___ {item.word}</span>
                              {hasAnswered && (
                                <span className={`text-[10px] font-hud uppercase px-2 py-0.5 rounded ${isCorrect ? 'bg-teal-deep/15 text-teal-deep border border-teal-deep/30' : 'bg-terracotta/15 text-terracotta border border-terracotta/30'}`}>
                                  {isCorrect ? 'Correct ✓' : 'Incorrect'}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              {['el', 'la'].map((art) => (
                                <button
                                  key={art}
                                  onClick={() => handleGenderMatch(item.word, art)}
                                  className={`flex-1 py-1 rounded text-xs font-hud transition-all cursor-pointer ${
                                    userAns === art
                                      ? art === 'el' ? 'bg-marigold text-ink font-bold' : 'bg-terracotta text-paper font-bold'
                                      : 'bg-paper/5 border border-pencil/10 text-pencil hover:text-paper hover:bg-paper/10'
                                  }`}
                                >
                                  {art}
                                </button>
                              ))}
                            </div>
                            
                            {hasAnswered && (
                              <p className="text-[10px] text-pencil/80 leading-normal border-t border-pencil/10 pt-1.5 mt-0.5">
                                Rule: {item.rule} (Correct: <strong className="text-paper">{item.correct} {item.word}</strong>)
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Completion Action */}
                  <div className="pt-6 border-t border-pencil/15 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-pencil font-body">
                      Read all the definite article gender guidelines? Mark this lesson completed!
                    </p>
                    <button
                      onClick={() => handleLessonComplete('lesson2')}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        completedLessons.lesson2
                          ? 'bg-teal-deep/15 border-teal-deep/30 text-teal-deep'
                          : 'bg-terracotta text-paper border-transparent hover:bg-rose-600'
                      }`}
                    >
                      {completedLessons.lesson2 ? 'Completed ✓ (Click to Undo)' : 'Mark Lesson as Completed'}
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  SECTION: LESSON 3 — SUBJECT PRONOUNS & THE VERB SER
                  ──────────────────────────────────────────────────────────── */}
              {activeSection === 'lesson3' && (
                <div className="space-y-8">
                  <div>
                    <span className="font-hud text-xs text-terracotta font-semibold tracking-wider block">LESSON 3</span>
                    <h2 className="font-display text-2xl font-bold text-paper">Subject Pronouns & The Verb Ser</h2>
                    <p className="text-sm text-pencil mt-1">
                      Study Spanish subject pronouns, formal vs informal greetings settings, mixed groups, and conjugate the vital verb "ser" (to be).
                    </p>
                  </div>

                  {/* Pronoun Matrix */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <Users className="h-5 w-5 text-marigold" />
                      1. Subject Pronouns Matrix
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Singular */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                        <span className="text-[10px] font-hud text-pencil uppercase block border-b border-pencil/10 pb-1">Singular (One Person)</span>
                        <div className="grid grid-cols-[100px_1fr] gap-y-2 text-xs">
                          <span className="font-bold text-marigold">yo</span>
                          <span className="text-paper">I</span>
                          <span className="font-bold text-marigold">tú</span>
                          <span className="text-paper">you (singular, informal / friendly)</span>
                          <span className="font-bold text-marigold">usted (Ud.)</span>
                          <span className="text-paper">you (singular, formal / polite)</span>
                          <span className="font-bold text-marigold">él</span>
                          <span className="text-paper">he</span>
                          <span className="font-bold text-marigold">ella</span>
                          <span className="text-paper">she</span>
                        </div>
                      </div>

                      {/* Plural */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-3">
                        <span className="text-[10px] font-hud text-pencil uppercase block border-b border-pencil/10 pb-1">Plural (Multiple People)</span>
                        <div className="grid grid-cols-[130px_1fr] gap-y-2 text-xs">
                          <span className="font-bold text-terracotta">nosotros</span>
                          <span className="text-paper">we (masc. or mixed group)</span>
                          <span className="font-bold text-terracotta">nosotras</span>
                          <span className="text-paper">we (fem. only)</span>
                          <span className="font-bold text-terracotta">vosotros / as</span>
                          <span className="text-paper">you all (informal, used only in Spain)</span>
                          <span className="font-bold text-terracotta">ustedes (Uds.)</span>
                          <span className="text-paper">you all (standard plural, formal in Spain)</span>
                          <span className="font-bold text-terracotta">ellos</span>
                          <span className="text-paper">they (masc. or mixed group)</span>
                          <span className="font-bold text-terracotta">ellas</span>
                          <span className="text-paper">they (fem. only)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informal vs Formal & Mixed Groups */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3 text-xs text-pencil">
                      <h4 className="font-display font-bold text-sm text-paper flex items-center gap-1.5">
                        <Info className="h-4.5 w-4.5 text-marigold" />
                        Tú vs Usted & Vosotros vs Ustedes
                      </h4>
                      <p>
                        Use <strong className="text-paper">tú</strong> for friends, relatives, children, and peers. Use <strong className="text-paper">usted</strong> for elders, strangers, doctors, or to show professional respect.
                      </p>
                      <p>
                        In Spain, <strong className="text-paper">vosotros</strong> is the informal plural (you guys). In all of Latin America, <strong className="text-paper">ustedes</strong> is used for *both* formal and informal plural situations.
                      </p>
                    </div>

                    <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3 text-xs text-pencil">
                      <h4 className="font-display font-bold text-sm text-paper flex items-center gap-1.5">
                        <AlertCircle className="h-4.5 w-4.5 text-terracotta" />
                        Mixed Gender Rule
                      </h4>
                      <p>
                        If a group contains even one male, you must use the masculine plural forms: <strong className="text-paper">nosotros</strong>, <strong className="text-paper">vosotros</strong>, or <strong className="text-paper">ellos</strong>.
                      </p>
                      <p className="bg-ink/50 p-3 rounded-lg border border-pencil/10 leading-normal">
                        E.g. 50 female students and 1 male teacher talking collectively refers to themselves as <strong className="text-paper">nosotros</strong>. They are referred to as <strong className="text-paper">ellos</strong> (they).
                      </p>
                    </div>
                  </div>

                  {/* Verb Ser Conjugations */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <Sparkles className="h-5 w-5 text-terracotta" />
                      2. Present Tense Conjugation of SER (To Be)
                    </h3>
                    <p className="text-xs text-pencil">
                      The verb **ser** is irregular and is used for identity, jobs, origins, and permanent traits.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(serDetails).map(([pronoun, details]) => (
                        <div
                          key={pronoun}
                          onClick={() => setSelectedSerPronoun(selectedSerPronoun === pronoun ? null : pronoun)}
                          className={`p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                            selectedSerPronoun === pronoun
                              ? 'bg-terracotta/20 border-terracotta shadow-[0_0_15px_rgba(193,80,46,0.2)]'
                              : 'bg-paper/5 border-pencil/10 hover:border-pencil/25'
                          }`}
                        >
                          <span className="text-[10px] text-pencil font-hud uppercase block">{pronoun}</span>
                          <span className="text-xl font-display font-black text-paper block mt-1">{details.conjugation}</span>
                          <span className="text-[9px] text-pencil mt-1 block">Click to reveal example</span>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedSerPronoun && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-paper/5 border border-pencil/15 rounded-xl p-4 text-xs space-y-2 overflow-hidden"
                        >
                          <div className="font-hud uppercase text-[9px] text-pencil">Example Sentence:</div>
                          <p className="italic text-marigold font-semibold text-sm">
                            "{serDetails[selectedSerPronoun].example}"
                          </p>
                          <p className="text-pencil">
                            Translation: "{serDetails[selectedSerPronoun].english}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 3 Main Uses of Ser */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper border-b border-pencil/15 pb-2">
                      3. The 3 Main Uses of Ser
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-paper/5 border border-pencil/10 rounded-xl p-4 space-y-2">
                        <div className="h-7 w-7 rounded-lg bg-marigold/10 border border-marigold/20 text-marigold flex items-center justify-center font-bold">1</div>
                        <h4 className="font-display font-bold text-paper text-sm">Identity & Description</h4>
                        <p className="text-pencil leading-relaxed">
                          To say who or what someone/something is inherently.
                          <br /><span className="text-paper italic block mt-1">Yo soy estudiante. (I am a student.)</span>
                          <span className="text-paper italic block">El libro es grande. (The book is big.)</span>
                        </p>
                      </div>

                      <div className="bg-paper/5 border border-pencil/10 rounded-xl p-4 space-y-2">
                        <div className="h-7 w-7 rounded-lg bg-terracotta/10 border border-terracotta/20 text-terracotta flex items-center justify-center font-bold">2</div>
                        <h4 className="font-display font-bold text-paper text-sm">Origin & Nationality</h4>
                        <p className="text-pencil leading-relaxed">
                          To tell where a person or item is originally from.
                          <br /><span className="text-paper italic block mt-1">Ustedes son de México. (You are from Mexico.)</span>
                          <span className="text-paper italic block">Él es español. (He is Spanish.)</span>
                        </p>
                      </div>

                      <div className="bg-paper/5 border border-pencil/10 rounded-xl p-4 space-y-2">
                        <div className="h-7 w-7 rounded-lg bg-teal-deep/10 border border-teal-deep/20 text-teal-deep flex items-center justify-center font-bold">3</div>
                        <h4 className="font-display font-bold text-paper text-sm">Occupation & Relationships</h4>
                        <p className="text-pencil leading-relaxed">
                          Jobs or social/family connections.
                          <br /><span className="text-paper italic block mt-1">Ellas son médicas. (They are doctors.)</span>
                          <span className="text-paper italic block">Sofía es mi amiga. (Sofia is my friend.)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Completion Action */}
                  <div className="pt-6 border-t border-pencil/15 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-pencil font-body">
                      Completed subject pronouns and the verb "ser"? Mark this lesson completed!
                    </p>
                    <button
                      onClick={() => handleLessonComplete('lesson3')}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        completedLessons.lesson3
                          ? 'bg-teal-deep/15 border-teal-deep/30 text-teal-deep'
                          : 'bg-terracotta text-paper border-transparent hover:bg-rose-600'
                      }`}
                    >
                      {completedLessons.lesson3 ? 'Completed ✓ (Click to Undo)' : 'Mark Lesson as Completed'}
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  SECTION: LESSON 4 — REGULAR -AR VERBS IN PRESENT
                  ──────────────────────────────────────────────────────────── */}
              {activeSection === 'lesson4' && (
                <div className="space-y-8">
                  <div>
                    <span className="font-hud text-xs text-terracotta font-semibold tracking-wider block">LESSON 4</span>
                    <h2 className="font-display text-2xl font-bold text-paper">Regular -ar Verbs in Present</h2>
                    <p className="text-sm text-pencil mt-1">
                      Understand how to conjugate regular -ar verbs in the present tense, how to handle adjective placement, and nationalities agreement.
                    </p>
                  </div>

                  {/* Understanding Verb Stems */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper flex items-center gap-2 border-b border-pencil/15 pb-2">
                      <Layers className="h-5 w-5 text-marigold" />
                      1. Verb Stems & Regular -ar Present Tense Endings
                    </h3>
                    <p className="text-xs text-pencil leading-relaxed">
                      Every Spanish verb consists of a **stem** and an **ending** (either <span className="text-terracotta font-bold">-ar</span>, <span className="text-terracotta font-bold">-er</span>, or <span className="text-terracotta font-bold">-ir</span>). To conjugate in the present tense, you drop the ending and add the appropriate subject ending.
                    </p>

                    <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-around gap-4 text-center items-center">
                        <div className="space-y-1">
                          <span className="text-[10px] text-pencil font-hud uppercase">Infinitive Verb</span>
                          <span className="text-lg font-bold text-paper block">hablar <span className="text-pencil font-normal font-body text-xs">(to speak)</span></span>
                        </div>
                        <div className="text-2xl text-pencil">&rarr;</div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-pencil font-hud uppercase">Stem</span>
                          <span className="text-lg font-bold text-marigold block">habl-</span>
                        </div>
                        <div className="text-2xl text-pencil">+</div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-pencil font-hud uppercase">Endings (Present)</span>
                          <span className="text-xs text-pencil block">-o, -as, -a, -amos, -áis, -an</span>
                        </div>
                      </div>
                    </div>

                    {/* Endings Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(arEndings).map(([pronoun, info]) => (
                        <div key={pronoun} className="bg-paper/5 border border-pencil/10 rounded-xl p-3 text-center">
                          <span className="text-[10px] text-pencil font-hud uppercase block">{pronoun}</span>
                          <span className="text-xl font-display font-black text-terracotta block my-1">{info.ending}</span>
                          <span className="text-[10px] text-pencil/80 italic">{info.explanation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conjugation Tables (hablar & ayudar) */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper border-b border-pencil/15 pb-2">
                      2. Conjugation Examples: Hablar & Ayudar
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Hablar */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-2">
                        <h4 className="font-display font-bold text-sm text-paper border-b border-pencil/10 pb-1.5">
                          hablar <span className="text-pencil font-normal font-body text-xs">(to speak)</span>
                        </h4>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Yo</span>
                            <span className="font-bold text-paper">hablo</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Tú</span>
                            <span className="font-bold text-paper">hablas</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Él / Ella / Usted</span>
                            <span className="font-bold text-paper">habla</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Nosotros / as</span>
                            <span className="font-bold text-paper">hablamos</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Vosotros / as</span>
                            <span className="font-bold text-paper">habláis</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-pencil">Ellos / Ellas / Ustedes</span>
                            <span className="font-bold text-paper">hablan</span>
                          </div>
                        </div>
                      </div>

                      {/* Ayudar */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-2">
                        <h4 className="font-display font-bold text-sm text-paper border-b border-pencil/10 pb-1.5">
                          ayudar <span className="text-pencil font-normal font-body text-xs">(to help)</span>
                        </h4>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Yo</span>
                            <span className="font-bold text-paper">ayudo</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Tú</span>
                            <span className="font-bold text-paper">ayudas</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Él / Ella / Usted</span>
                            <span className="font-bold text-paper">ayuda</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Nosotros / as</span>
                            <span className="font-bold text-paper">ayudamos</span>
                          </div>
                          <div className="flex justify-between border-b border-pencil/5 py-1">
                            <span className="text-pencil">Vosotros / as</span>
                            <span className="font-bold text-paper">ayudáis</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-pencil">Ellos / Ellas / Ustedes</span>
                            <span className="font-bold text-paper">ayudan</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Subject Pronoun Drop rule */}
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3 text-xs text-pencil">
                    <h4 className="font-display font-bold text-sm text-paper flex items-center gap-1.5">
                      <Info className="h-4.5 w-4.5 text-marigold" />
                      When to Use Subject Pronouns (Pronoun Dropping)
                    </h4>
                    <p>
                      Because each verb conjugation has a distinct ending, Spanish speakers **regularly drop** the subject pronouns (yo, tú, etc.).
                    </p>
                    <p className="bg-ink/50 p-3 rounded-lg border border-pencil/10 leading-normal">
                      Instead of saying "Yo hablo español", say <strong className="text-paper">"Hablo español"</strong>. The pronoun is only included for emphasis, contrast, or when the 3rd person conjugation (<span className="italic font-bold">habla / hablan</span>) needs clarification (e.g. distinguishing between él, ella, or usted).
                    </p>
                  </div>

                  {/* Nationalities Adjectives & Adjective Placement */}
                  <div className="space-y-4">
                    <h3 className="font-display text-base font-bold text-paper border-b border-pencil/15 pb-2">
                      3. Nationalities and Adjective Placement
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-pencil">
                      
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-2">
                        <h4 className="font-display font-bold text-paper text-sm">Nationalities Agreement</h4>
                        <p>
                          Nationalities are adjectives in Spanish. They **are not capitalized** (unlike English). They must agree in gender and number with the noun they describe.
                        </p>
                        <div className="space-y-1.5 mt-2 bg-ink/50 p-3 rounded-lg border border-pencil/10">
                          <div>&bull; Masc Singular: <span className="italic text-paper font-semibold">el chico español / mexicano</span></div>
                          <div>&bull; Fem Singular: <span className="italic text-paper font-semibold">la chica española / mexicana</span></div>
                          <div>&bull; Masc Plural: <span className="italic text-paper font-semibold">los chicos españoles / mexicanos</span></div>
                          <div>&bull; Fem Plural: <span className="italic text-paper font-semibold">las chicas españolas / mexicanas</span></div>
                        </div>
                      </div>

                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-2">
                        <h4 className="font-display font-bold text-paper text-sm">Adjective Placement</h4>
                        <p>
                          In Spanish, descriptive adjectives almost always go **after** the noun they modify (unlike English where adjectives go before the noun).
                        </p>
                        <div className="space-y-1.5 mt-2 bg-ink/50 p-3 rounded-lg border border-pencil/10">
                          <div>&bull; <span className="italic text-paper font-semibold">el libro interesante</span> (the interesting book)</div>
                          <div>&bull; <span className="italic text-paper font-semibold">la casa roja</span> (the red house)</div>
                          <div>&bull; <span className="italic text-paper font-semibold">el estudiante inteligente</span> (the intelligent student)</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Interactive conjugation constructor */}
                  <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-4">
                    <div>
                      <h4 className="font-display font-bold text-sm text-paper">Interactive Tool: Present Tense Verb Builder</h4>
                      <p className="text-[11px] text-pencil">Combine a regular verb and subject pronoun to see the step-by-step conjugation.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      
                      {/* Inputs */}
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-pencil font-hud uppercase">1. Select Verb</label>
                          <div className="flex gap-2">
                            {['hablar', 'ayudar'].map((v) => (
                              <button
                                key={v}
                                onClick={() => setBuilderVerb(v as 'hablar' | 'ayudar')}
                                className={`flex-1 py-2 rounded-xl text-xs font-hud transition-all cursor-pointer ${
                                  builderVerb === v
                                    ? 'bg-terracotta text-paper font-bold'
                                    : 'bg-paper/5 border border-pencil/10 text-pencil hover:text-paper hover:bg-paper/10'
                                }`}
                              >
                                {v === 'hablar' ? 'hablar (speak)' : 'ayudar (help)'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-pencil font-hud uppercase">2. Select Subject Pronoun</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {Object.keys(arEndings).map((pron) => (
                              <button
                                key={pron}
                                onClick={() => setBuilderPronoun(pron)}
                                className={`py-1.5 px-1 rounded-lg text-[10px] font-hud transition-all cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis ${
                                  builderPronoun === pron
                                    ? 'bg-marigold text-ink font-bold'
                                    : 'bg-paper/5 border border-pencil/10 text-pencil hover:text-paper hover:bg-paper/10'
                                }`}
                                title={pron}
                              >
                                {pron}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Output Box */}
                      <div className="bg-ink/50 rounded-xl p-4 border border-pencil/10 flex flex-col justify-between min-h-[140px]">
                        <div>
                          <span className="text-[10px] text-pencil font-hud uppercase block border-b border-pencil/10 pb-1 mb-2">Conjugated Result</span>
                          {(() => {
                            const res = getConjugationResult(builderVerb, builderPronoun);
                            return (
                              <div className="space-y-2">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-paper text-sm">{builderPronoun}</span>
                                  <span className="font-display text-2xl font-black text-marigold">{res.conjugated}</span>
                                </div>
                                <p className="text-[11px] text-pencil leading-normal">
                                  Formed by: Stem (<span className="font-mono text-paper">{res.stem}</span>) + Ending (<span className="font-mono text-terracotta">{res.ending}</span>)
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                        {(() => {
                          const res = getConjugationResult(builderVerb, builderPronoun);
                          return (
                            <div className="bg-paper/5 px-3 py-1.5 rounded-lg border border-pencil/10 text-xs font-semibold text-paper italic">
                              "{res.english}"
                            </div>
                          );
                        })()}
                      </div>

                    </div>
                  </div>

                  {/* Completion Action */}
                  <div className="pt-6 border-t border-pencil/15 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-pencil font-body">
                      Finished reading regular -ar verb conjugations? Mark this lesson completed!
                    </p>
                    <button
                      onClick={() => handleLessonComplete('lesson4')}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        completedLessons.lesson4
                          ? 'bg-teal-deep/15 border-teal-deep/30 text-teal-deep'
                          : 'bg-terracotta text-paper border-transparent hover:bg-rose-600'
                      }`}
                    >
                      {completedLessons.lesson4 ? 'Completed ✓ (Click to Undo)' : 'Mark Lesson as Completed'}
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  SECTION: CONSOLIDATED COURSE EXAM
                  ──────────────────────────────────────────────────────────── */}
              {activeSection === 'exam' && (
                <div className="space-y-6">
                  {!quizFinished ? (
                    <div className="space-y-6">
                      
                      {/* Exam Header */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-pencil/15 pb-4">
                        <div>
                          <span className="font-hud text-[10px] text-marigold uppercase tracking-wider">CONSOLIDATED FINAL EXAM</span>
                          <h2 className="font-display text-xl font-bold text-paper">Spanish Part 1 Test</h2>
                        </div>
                        <div className="font-hud text-[11px] text-pencil">
                          QUESTION {currentQuestionIndex + 1} OF {EXAM_QUESTIONS.length}
                        </div>
                      </div>

                      {/* Progress Line */}
                      <div className="w-full bg-paper/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-marigold h-full transition-all duration-300"
                          style={{ width: `${((currentQuestionIndex) / EXAM_QUESTIONS.length) * 100}%` }}
                        />
                      </div>

                      {/* Question Content */}
                      <div className="space-y-4 pt-2">
                        <h3 className="font-display text-lg font-bold text-paper leading-snug">
                          {EXAM_QUESTIONS[currentQuestionIndex].question}
                        </h3>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-3">
                          {EXAM_QUESTIONS[currentQuestionIndex].options.map((option) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === EXAM_QUESTIONS[currentQuestionIndex].correctAnswer;
                            const hasSelected = selectedAnswer !== null;

                            let btnStyle = 'bg-paper/5 border-pencil/15 text-paper hover:bg-paper/10 hover:border-pencil/30';
                            
                            if (hasSelected) {
                              if (isSelected) {
                                btnStyle = isCorrect
                                  ? 'bg-teal-deep/20 border-teal-deep text-teal-deep'
                                  : 'bg-terracotta/20 border-terracotta text-terracotta';
                              } else if (isCorrect) {
                                btnStyle = 'bg-teal-deep/20 border-teal-deep/50 text-teal-deep';
                              } else {
                                btnStyle = 'bg-paper/2 border-pencil/10 text-pencil/40 cursor-not-allowed';
                              }
                            }

                            return (
                              <button
                                key={option}
                                onClick={() => handleAnswerClick(option)}
                                disabled={hasSelected}
                                className={`w-full text-left rounded-xl p-4 font-hud text-xs border transition-all duration-200 cursor-pointer ${btnStyle}`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {hasSelected && isCorrect && <CheckCircle2 className="h-4 w-4 text-teal-deep" />}
                                  {hasSelected && isSelected && !isCorrect && <AlertCircle className="h-4 w-4 text-terracotta" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation Feedback Block */}
                      <AnimatePresence>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 space-y-3"
                          >
                            <div className="flex items-center gap-2 font-display text-sm font-bold">
                              {selectedAnswer === EXAM_QUESTIONS[currentQuestionIndex].correctAnswer ? (
                                <span className="text-teal-deep flex items-center gap-1.5">🎉 Correct!</span>
                              ) : (
                                <span className="text-terracotta flex items-center gap-1.5">❌ Incorrect</span>
                              )}
                            </div>
                            <p className="text-xs text-pencil leading-relaxed">
                              {EXAM_QUESTIONS[currentQuestionIndex].explanation}
                            </p>
                            
                            <button
                              onClick={handleNextQuestion}
                              className="bg-terracotta hover:bg-rose-600 text-paper font-hud text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all ml-auto flex items-center gap-1.5 cursor-pointer font-bold"
                            >
                              {currentQuestionIndex < EXAM_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Exam'}
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  ) : (
                    
                    /* Exam Finished Results View */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 pt-4 text-center"
                    >
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-marigold/10 border border-marigold/30 text-marigold text-3xl animate-bounce">
                        🏆
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-display text-2xl font-bold text-paper">Exam Completed!</h3>
                        <p className="text-xs text-pencil max-w-sm mx-auto">
                          You answered <strong className="text-paper">{score}</strong> out of <strong className="text-paper">{EXAM_QUESTIONS.length}</strong> questions correctly.
                        </p>
                      </div>

                      {/* Reward Card */}
                      <div className="bg-paper/5 border border-pencil/15 rounded-2xl p-5 max-w-sm mx-auto space-y-4">
                        <h4 className="font-hud text-xs text-pencil uppercase tracking-wider">Rewards Earned</h4>
                        
                        <div className="flex justify-around font-hud text-sm">
                          <div className="flex flex-col items-center">
                            <span className="text-paper font-bold">+{score * 5} XP</span>
                            <span className="text-[9px] text-pencil/80">Experience</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-marigold font-bold">+{score >= 6 ? 15 : score >= 4 ? 8 : 3} Coins</span>
                            <span className="text-[9px] text-pencil/80">Gold Coins</span>
                          </div>
                        </div>

                        <button
                          onClick={claimQuizRewards}
                          disabled={rewardClaimed}
                          className={`w-full py-3 font-hud text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
                            rewardClaimed
                              ? 'bg-pencil/15 border border-pencil/20 text-pencil/40 cursor-not-allowed font-medium'
                              : 'bg-teal-deep text-paper hover:bg-emerald-700 font-bold border border-teal-deep/20'
                          }`}
                        >
                          {rewardClaimed ? 'Rewards Claimed ✓' : 'Claim Rewards'}
                        </button>
                      </div>

                      {/* Detailed Questions Review */}
                      <div className="space-y-3 text-left max-w-xl mx-auto pt-4 border-t border-pencil/15">
                        <h4 className="font-display font-bold text-sm text-paper mb-2">Review Questions:</h4>
                        {EXAM_QUESTIONS.map((q) => {
                          const userAns = answersHistory[q.id];
                          const isCorrect = userAns === q.correctAnswer;

                          return (
                            <div key={q.id} className="bg-paper/5 border border-pencil/10 rounded-xl p-3.5 space-y-2 text-xs">
                              <div className="flex justify-between items-start gap-2">
                                <span className="font-bold text-paper">{q.id}. {q.question}</span>
                                <span className={`text-[9px] font-hud uppercase px-2 py-0.5 rounded flex-shrink-0 ${isCorrect ? 'bg-teal-deep/15 text-teal-deep border border-teal-deep/20' : 'bg-terracotta/15 text-terracotta border border-terracotta/20'}`}>
                                  {isCorrect ? 'Correct' : 'Incorrect'}
                                </span>
                              </div>
                              <div className="text-pencil leading-normal">
                                <div>Your Answer: <strong className={isCorrect ? 'text-teal-deep' : 'text-terracotta'}>{userAns || 'None'}</strong></div>
                                {!isCorrect && <div>Correct Answer: <strong className="text-paper">{q.correctAnswer}</strong></div>}
                                <div className="text-[10px] text-pencil/80 italic mt-1">{q.explanation}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Retry Button */}
                      <div className="flex justify-center gap-4 pt-4">
                        <button
                          onClick={resetQuiz}
                          className="flex items-center gap-1.5 bg-paper/5 border border-pencil/15 text-pencil hover:text-paper hover:bg-paper/10 font-hud text-[11px] uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Retry Exam
                        </button>
                      </div>

                    </motion.div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Screen Navigation Bottom Helpers */}
          <div className="mt-12 pt-6 border-t border-pencil/15 flex justify-between items-center text-xs">
            <button
              disabled={activeSection === 'overview'}
              onClick={() => {
                const idx = sectionsList.findIndex(s => s.id === activeSection);
                if (idx > 0) setActiveSection(sectionsList[idx - 1].id as ActiveSection);
              }}
              className="px-3.5 py-2 border border-pencil/10 rounded-xl bg-paper/5 hover:bg-paper/10 text-pencil hover:text-paper disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              &larr; Back
            </button>
            <span className="text-pencil font-hud text-[10px] uppercase">
              Section {sectionsList.findIndex(s => s.id === activeSection) + 1} of {sectionsList.length}
            </span>
            <button
              disabled={activeSection === 'exam'}
              onClick={() => {
                const idx = sectionsList.findIndex(s => s.id === activeSection);
                if (idx < sectionsList.length - 1) setActiveSection(sectionsList[idx + 1].id as ActiveSection);
              }}
              className="px-3.5 py-2 border border-pencil/10 rounded-xl bg-paper/5 hover:bg-paper/10 text-pencil hover:text-paper disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
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
