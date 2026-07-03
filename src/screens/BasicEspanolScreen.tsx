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
  Compass
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';

// ── Types ────────────────────────────────────────────────────────────────────

type LearningTab = 'articles' | 'pronouns' | 'ser' | 'quiz';

interface QuizQuestion {
  id: number;
  question: string;
  explanation: string;
  options: string[];
  correctAnswer: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Add the appropriate definite article for: "___ universidad" (university)',
    options: ['el', 'la', 'los', 'las'],
    correctAnswer: 'la',
    explanation: 'Nouns ending in "-ad" (like universidad) are feminine and take the article "la".',
  },
  {
    id: 2,
    question: 'Add the appropriate definite article for: "___ mapa" (map)',
    options: ['el', 'la', 'los', 'las'],
    correctAnswer: 'el',
    explanation: 'Although it ends in "-a", "el mapa" is an exception and is masculine.',
  },
  {
    id: 3,
    question: 'What is the correct plural form of "el lápiz" (the pencil)?',
    options: ['los lápizs', 'los lápices', 'los lápizces', 'las lápices'],
    correctAnswer: 'los lápices',
    explanation: 'For nouns ending in "-z", you change the "z" to "c" and add "-es". "Lápiz" is masculine, so it becomes "los lápices".',
  },
  {
    id: 4,
    question: 'Choose the correct conjugation of the verb "ser": "Carlos ___ mi esposo" (Carlos is my husband).',
    options: ['soy', 'eres', 'es', 'somos'],
    correctAnswer: 'es',
    explanation: '"Carlos" is third-person singular (él/he), which takes the verb form "es".',
  },
  {
    id: 5,
    question: 'If you meet a random person at the supermarket, should you address them in a formal or informal way?',
    options: ['Formal (usted)', 'Informal (tú)'],
    correctAnswer: 'Formal (usted)',
    explanation: 'You should use the formal "usted" with people you do not know well or in formal situations to be polite.',
  },
  {
    id: 6,
    question: 'What subject pronoun would you use to refer to "Erica y Felipe"?',
    options: ['ellas', 'ellos', 'nosotros', 'nosotras'],
    correctAnswer: 'ellos',
    explanation: '"ellos" (they) is used for a group of all men or a mixed group containing both men and women (Erica and Felipe).',
  },
];

const BasicEspanolScreen: FC = () => {
  const [activeTab, setActiveTab] = useState<LearningTab>('articles');
  
  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const addRewards = useStatsStore((s) => s.addRewards);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    setShowExplanation(true);
    if (option === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
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
    const finalXP = score * 5; // 5 XP per correct answer
    const finalCoins = score >= 4 ? 10 : 3; // 10 coins for high score, 3 for trying
    addRewards(finalXP, finalCoins);
    setRewardClaimed(true);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink text-paper p-4 sm:p-6 lg:p-8 relative">
      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="h-5 w-5 text-marigold" />
              <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
                Fundamentals Course
              </p>
            </div>
            <h1 className="font-display text-3xl font-bold text-paper">
              Basic Español 🇪🇸
            </h1>
            <p className="mt-2 font-body text-sm text-pencil max-w-xl">
              Master the core elements of the Spanish language. Toggle between tabs to learn definite articles, pronouns, and the verb <span className="italic text-marigold">ser</span>, then test your knowledge!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-paper/5 border border-pencil/20 rounded-xl px-4 py-2 self-start font-hud text-xs text-pencil">
            <BookOpen className="h-4 w-4 text-teal-deep" />
            Workbook Excerpt Part 1
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mb-8 glass-nav-capsule">
          <div className="relative flex overflow-x-auto px-2 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-around">
            <button
              onClick={() => setActiveTab('articles')}
              className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-hud text-xs transition-colors duration-200 cursor-pointer ${
                activeTab === 'articles' ? 'text-paper bg-terracotta/20 border border-terracotta/30' : 'text-pencil hover:text-paper'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              Definite Articles & Nouns
            </button>
            <button
              onClick={() => setActiveTab('pronouns')}
              className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-hud text-xs transition-colors duration-200 cursor-pointer ${
                activeTab === 'pronouns' ? 'text-paper bg-terracotta/20 border border-terracotta/30' : 'text-pencil hover:text-paper'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Subject Pronouns
            </button>
            <button
              onClick={() => setActiveTab('ser')}
              className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-hud text-xs transition-colors duration-200 cursor-pointer ${
                activeTab === 'ser' ? 'text-paper bg-terracotta/20 border border-terracotta/30' : 'text-pencil hover:text-paper'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              The Verb Ser
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                resetQuiz();
              }}
              className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-hud text-xs transition-colors duration-200 cursor-pointer ${
                activeTab === 'quiz' ? 'text-paper bg-terracotta/20 border border-terracotta/30' : 'text-pencil hover:text-paper'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              Interactive Quiz
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-paper/5 border border-pencil/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: ARTICLES & NOUNS */}
            {activeTab === 'articles' && (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-xl font-bold text-paper mb-2">Definite Articles in Spanish</h2>
                  <p className="font-body text-sm text-pencil">
                    In Spanish, nouns are either **masculine** or **feminine**, and can be **singular** or **plural**. The definite article ("the") must match both gender and number.
                  </p>
                </div>

                {/* Table of Articles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-4 text-center">
                    <span className="font-hud text-[10px] text-pencil uppercase block mb-1">Masculine Singular</span>
                    <span className="font-display text-2xl font-bold text-marigold">el</span>
                    <span className="font-body text-xs text-pencil/80 block mt-1 font-semibold">el libro (the book)</span>
                  </div>
                  <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-4 text-center">
                    <span className="font-hud text-[10px] text-pencil uppercase block mb-1">Feminine Singular</span>
                    <span className="font-display text-2xl font-bold text-terracotta">la</span>
                    <span className="font-body text-xs text-pencil/80 block mt-1 font-semibold">la mesa (the table)</span>
                  </div>
                  <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-4 text-center">
                    <span className="font-hud text-[10px] text-pencil uppercase block mb-1">Masculine Plural</span>
                    <span className="font-display text-2xl font-bold text-marigold">los</span>
                    <span className="font-body text-xs text-pencil/80 block mt-1 font-semibold">los libros (the books)</span>
                  </div>
                  <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-4 text-center">
                    <span className="font-hud text-[10px] text-pencil uppercase block mb-1">Feminine Plural</span>
                    <span className="font-display text-2xl font-bold text-terracotta">las</span>
                    <span className="font-body text-xs text-pencil/80 block mt-1 font-semibold">las mesas (the tables)</span>
                  </div>
                </div>

                {/* Rules Section */}
                <div className="space-y-4 pt-4 border-t border-pencil/10">
                  <h3 className="font-display text-lg font-bold text-paper flex items-center gap-2">
                    <Info className="h-5 w-5 text-teal-deep" />
                    How to determine Noun Gender
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 space-y-2">
                      <h4 className="font-display font-semibold text-sm text-paper border-b border-pencil/10 pb-1.5">Generally Masculine:</h4>
                      <ul className="list-disc pl-5 font-body text-xs text-pencil space-y-1">
                        <li>Nouns ending in <span className="text-marigold font-bold">-o</span> (e.g. <span className="italic text-paper font-semibold">el libro</span>)</li>
                        <li>Nouns ending in <span className="text-marigold font-bold">-r</span> or <span className="text-marigold font-bold">-l</span> (e.g. <span className="italic text-paper font-semibold">el televisor</span>, <span className="italic text-paper font-semibold">el hotel</span>)</li>
                        <li>Nouns ending in <span className="text-marigold font-bold">-ma</span> of Greek origin (e.g. <span className="italic text-paper font-semibold">el sistema</span>, <span className="italic text-paper font-semibold">el problema</span>)</li>
                        <li><span className="text-marigold font-bold">Exceptions:</span> <span className="italic text-paper font-semibold">el día</span> (day), <span className="italic text-paper font-semibold">el mapa</span> (map)</li>
                      </ul>
                    </div>
                    <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 space-y-2">
                      <h4 className="font-display font-semibold text-sm text-paper border-b border-pencil/10 pb-1.5">Generally Feminine:</h4>
                      <ul className="list-disc pl-5 font-body text-xs text-pencil space-y-1">
                        <li>Nouns ending in <span className="text-terracotta font-bold">-a</span> (e.g. <span className="italic text-paper font-semibold">la silla</span>, <span className="italic text-paper font-semibold">la casa</span>)</li>
                        <li>Nouns ending in suffixes <span className="text-terracotta font-bold">-ión</span>, <span className="text-terracotta font-bold">-ad</span>, <span className="text-terracotta font-bold">-tud</span> (e.g. <span className="italic text-paper font-semibold">la lección</span>, <span className="italic text-paper font-semibold">la universidad</span>, <span className="italic text-paper font-semibold">la virtud</span>)</li>
                        <li>Nouns ending in <span className="text-terracotta font-bold">-ista</span> can be either depending on person (e.g. <span className="italic text-paper font-semibold">el futbolista</span> / <span className="italic text-paper font-semibold">la futbolista</span>)</li>
                        <li><span className="text-terracotta font-bold">Exceptions:</span> <span className="italic text-paper font-semibold">la mano</span> (hand)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-teal-deep/5 border border-teal-deep/20 rounded-2xl p-4 space-y-2">
                  <h4 className="font-display text-sm font-semibold text-paper flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-teal-deep" />
                    Special Rules
                  </h4>
                  <ul className="list-disc pl-5 font-body text-xs text-pencil space-y-2">
                    <li>
                      <strong>Contraction (del):</strong> When the preposition <span className="font-mono bg-paper/5 px-1 py-0.5 rounded">de</span> (of/from) is followed by the masculine article <span className="font-mono bg-paper/5 px-1 py-0.5 rounded">el</span>, they contract to <strong>del</strong>. E.g., <span className="italic text-paper font-semibold">El cuaderno del curso</span> (The course notebook).
                    </li>
                    <li>
                      <strong>Feminine Stressed "a-":</strong> Feminine singular nouns starting with a stressed "a" or "ha" sound use the masculine article <strong>el</strong> to prevent the vowels from running together, but stay feminine in the plural. E.g., <strong>el agua</strong> (the water) &rarr; <strong>las aguas</strong>.
                    </li>
                    <li>
                      <strong>Making Nouns Plural:</strong> 
                      <br />1. Ends in a vowel &rarr; Add <strong>-s</strong> (<span className="italic text-paper font-semibold">la silla &rarr; las sillas</span>)
                      <br />2. Ends in a consonant other than z &rarr; Add <strong>-es</strong> (<span className="italic text-paper font-semibold">el papel &rarr; los papeles</span>)
                      <br />3. Ends in a z &rarr; Change <strong>z to c</strong> and add <strong>-es</strong> (<span className="italic text-paper font-semibold">el lápiz &rarr; los lápices</span>)
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SUBJECT PRONOUNS */}
            {activeTab === 'pronouns' && (
              <motion.div
                key="pronouns"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-xl font-bold text-paper mb-2">Subject Pronouns in Spanish</h2>
                  <p className="font-body text-sm text-pencil">
                    Subject pronouns replace nouns as the subject of a verb. Spanish distinguishes between masculine, feminine, formal, and informal pronouns.
                  </p>
                </div>

                {/* Pronoun Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Singular */}
                  <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-5 space-y-3">
                    <h3 className="font-hud text-xs text-pencil uppercase tracking-wider border-b border-pencil/10 pb-2">Singular (One Person)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">yo</span>
                        <span className="text-pencil font-body">I</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">tú</span>
                        <span className="text-pencil font-body">you (informal / singular)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">usted</span>
                        <span className="text-pencil font-body">you (formal / singular)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">él</span>
                        <span className="text-pencil font-body">he</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">ella</span>
                        <span className="text-pencil font-body">she</span>
                      </div>
                    </div>
                  </div>

                  {/* Plural */}
                  <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-5 space-y-3">
                    <h3 className="font-hud text-xs text-pencil uppercase tracking-wider border-b border-pencil/10 pb-2">Plural (Multiple People)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">nosotros / nosotras</span>
                        <span className="text-pencil font-body">we (masc. / fem.)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">vosotros / vosotras</span>
                        <span className="text-pencil font-body">you all (informal - Spain only)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">ustedes</span>
                        <span className="text-pencil font-body">you all (formal / plural)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-paper font-display">ellos / ellas</span>
                        <span className="text-pencil font-body">they (masc. / fem.)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cultural and Grammatical Details */}
                <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-5 space-y-4">
                  <h3 className="font-display text-base font-bold text-paper flex items-center gap-2">
                    <Info className="h-5 w-5 text-marigold" />
                    Crucial Usage Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body text-pencil space-y-0">
                    <div className="space-y-2 bg-ink/30 p-4 rounded-xl border border-pencil/10">
                      <h4 className="font-display font-semibold text-paper border-b border-pencil/10 pb-1">tú vs. usted</h4>
                      <p>
                        Use <strong>tú</strong> with family members, friends, or children. Use <strong>usted</strong> if you have a formal relationship (boss, professor) or are speaking to someone you do not know well. In case of doubt, use <strong>usted</strong> to be safe.
                      </p>
                    </div>
                    <div className="space-y-2 bg-ink/30 p-4 rounded-xl border border-pencil/10">
                      <h4 className="font-display font-semibold text-paper border-b border-pencil/10 pb-1">vosotros vs. ustedes</h4>
                      <p>
                        In Latin America, the plural "you" is always <strong>ustedes</strong>, regardless of how formal/informal you are. The informal plural <strong>vosotros/as</strong> is only used in Spain.
                      </p>
                    </div>
                    <div className="space-y-2 bg-ink/30 p-4 rounded-xl border border-pencil/10 md:col-span-2">
                      <h4 className="font-display font-semibold text-paper border-b border-pencil/10 pb-1">Mixed Gender Groups</h4>
                      <p>
                        The masculine pronouns (<strong>nosotros</strong>, <strong>vosotros</strong>, <strong>ellos</strong>) are used when referring to a group of all men or a mixed group of men and women. Even if there are 100 women and only 1 man in a group, you must use <strong>nosotros</strong> or <strong>ellos</strong>. Feminine pronouns (<strong>nosotras</strong>, <strong>ellas</strong>) are used only when every single member of the group is female.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: THE VERB SER */}
            {activeTab === 'ser' && (
              <motion.div
                key="ser"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-xl font-bold text-paper mb-2">The Verb Ser (To Be)</h2>
                  <p className="font-body text-sm text-pencil">
                    In Spanish, there are two verbs that mean "to be". The verb **ser** is used for identity, origin, occupation, and permanent characteristics.
                  </p>
                </div>

                {/* Conjugation Table */}
                <div className="bg-ink/50 border border-pencil/25 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-base text-paper mb-4 text-center">Ser Conjugations (Present Tense)</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="border border-pencil/10 p-3 rounded-xl bg-paper/5">
                      <div className="font-hud text-[10px] text-pencil uppercase">yo (I)</div>
                      <div className="font-display text-xl font-bold text-marigold">soy</div>
                      <div className="text-[10px] text-pencil/80 italic font-semibold">Yo soy estudiante.</div>
                    </div>
                    <div className="border border-pencil/10 p-3 rounded-xl bg-paper/5">
                      <div className="font-hud text-[10px] text-pencil uppercase">nosotros/as (we)</div>
                      <div className="font-display text-xl font-bold text-marigold">somos</div>
                      <div className="text-[10px] text-pencil/80 italic font-semibold">Nosotros somos amigos.</div>
                    </div>
                    <div className="border border-pencil/10 p-3 rounded-xl bg-paper/5">
                      <div className="font-hud text-[10px] text-pencil uppercase">tú (you - informal)</div>
                      <div className="font-display text-xl font-bold text-marigold">eres</div>
                      <div className="text-[10px] text-pencil/80 italic font-semibold">Tú eres simpático.</div>
                    </div>
                    <div className="border border-pencil/10 p-3 rounded-xl bg-paper/5">
                      <div className="font-hud text-[10px] text-pencil uppercase">vosotros/as (you all)</div>
                      <div className="font-display text-xl font-bold text-marigold">sois</div>
                      <div className="text-[10px] text-pencil/80 italic font-semibold">Vosotros sois altos.</div>
                    </div>
                    <div className="border border-pencil/10 p-3 rounded-xl bg-paper/5">
                      <div className="font-hud text-[10px] text-pencil uppercase">él / ella / usted (he/she/you-form)</div>
                      <div className="font-display text-xl font-bold text-marigold">es</div>
                      <div className="text-[10px] text-pencil/80 italic font-semibold">Ella es profesora.</div>
                    </div>
                    <div className="border border-pencil/10 p-3 rounded-xl bg-paper/5">
                      <div className="font-hud text-[10px] text-pencil uppercase">ellos / ellas / ustedes (they/you-all)</div>
                      <div className="font-display text-xl font-bold text-marigold">son</div>
                      <div className="text-[10px] text-pencil/80 italic font-semibold">Ellos son simpáticos.</div>
                    </div>
                  </div>
                </div>

                {/* Uses of Ser */}
                <div className="space-y-4 pt-4 border-t border-pencil/10">
                  <h3 className="font-display text-base font-bold text-paper">When to use "Ser"</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 space-y-2">
                      <div className="h-8 w-8 rounded-lg bg-teal-deep/15 flex items-center justify-center text-teal-deep font-bold text-sm">1</div>
                      <h4 className="font-display font-semibold text-xs text-paper">Identity</h4>
                      <p className="font-body text-[11px] text-pencil">
                        To identify a person or thing.
                        <br /><span className="italic text-paper font-semibold block mt-1">Ella es Claudia.</span>
                        <span className="text-[10px] text-pencil/80">(She is Claudia.)</span>
                      </p>
                    </div>
                    <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 space-y-2">
                      <div className="h-8 w-8 rounded-lg bg-terracotta/15 flex items-center justify-center text-terracotta font-bold text-sm">2</div>
                      <h4 className="font-display font-semibold text-xs text-paper">Profession / Origin</h4>
                      <p className="font-body text-[11px] text-pencil">
                        To speak about jobs, origin, or nationality.
                        <br /><span className="italic text-paper font-semibold block mt-1">Roberto es de Chile.</span>
                        <span className="text-[10px] text-pencil/80">(Roberto is from Chile.)</span>
                        <span className="italic text-paper font-semibold block mt-1">Son doctores.</span>
                        <span className="text-[10px] text-pencil/80">(They are doctors.)</span>
                      </p>
                    </div>
                    <div className="bg-paper/5 border border-pencil/10 rounded-2xl p-4 space-y-2">
                      <div className="h-8 w-8 rounded-lg bg-marigold/15 flex items-center justify-center text-marigold font-bold text-sm">3</div>
                      <h4 className="font-display font-semibold text-xs text-paper">Inherent Traits</h4>
                      <p className="font-body text-[11px] text-pencil">
                        To describe inherent characteristics of a person or thing.
                        <br /><span className="italic text-paper font-semibold block mt-1">El hotel es elegante.</span>
                        <span className="text-[10px] text-pencil/80">(The hotel is elegant.)</span>
                        <span className="italic text-paper font-semibold block mt-1">Carla es inteligente.</span>
                        <span className="text-[10px] text-pencil/80">(Carla is intelligent.)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: INTERACTIVE QUIZ */}
            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {!quizFinished ? (
                  <div className="space-y-6">
                    {/* Progress indicator */}
                    <div className="flex items-center justify-between font-hud text-[11px] text-pencil border-b border-pencil/10 pb-3">
                      <span>QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
                      <span>Score: {score}</span>
                    </div>

                    {/* Question Card */}
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-bold text-paper leading-snug">
                        {QUIZ_QUESTIONS[currentQuestionIndex].question}
                      </h3>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-3">
                        {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option) => {
                          const isSelected = selectedAnswer === option;
                          const isCorrect = option === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer;
                          const showCorrectness = selectedAnswer !== null;

                          let btnStyle = 'bg-paper/5 border-pencil/20 text-paper hover:bg-paper/[0.08] hover:border-pencil/40';
                          if (showCorrectness) {
                            if (isSelected) {
                              btnStyle = isCorrect
                                ? 'bg-teal-deep/20 border-teal-deep text-teal-deep shadow-[0_0_15px_rgba(28,92,92,0.2)]'
                                : 'bg-terracotta/20 border-terracotta text-terracotta shadow-[0_0_15px_rgba(193,80,46,0.2)]';
                            } else if (isCorrect) {
                              // Always highlight the correct answer if the user got it wrong
                              btnStyle = 'bg-teal-deep/25 border-teal-deep/50 text-teal-deep';
                            } else {
                              btnStyle = 'bg-paper/2 border-pencil/10 text-pencil/40 cursor-not-allowed';
                            }
                          }

                          return (
                            <button
                              key={option}
                              onClick={() => handleAnswerClick(option)}
                              disabled={showCorrectness}
                              className={`w-full text-left rounded-xl p-4 font-hud text-xs border transition-all duration-200 cursor-pointer ${btnStyle}`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {showCorrectness && isCorrect && <CheckCircle2 className="h-4 w-4 text-teal-deep" />}
                                {showCorrectness && isSelected && !isCorrect && <AlertCircle className="h-4 w-4 text-terracotta" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback & Explanation */}
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-paper/5 border border-pencil/15 rounded-2xl p-4 space-y-2"
                      >
                        <h4 className="font-display font-semibold text-xs text-paper flex items-center gap-1.5">
                          {selectedAnswer === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer ? (
                            <span className="text-teal-deep flex items-center gap-1 font-bold">🎉 Correct!</span>
                          ) : (
                            <span className="text-terracotta flex items-center gap-1 font-bold">❌ Incorrect</span>
                          )}
                        </h4>
                        <p className="font-body text-xs text-pencil">
                          {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                        </p>
                        
                        <button
                          onClick={handleNextQuestion}
                          className="mt-2 flex items-center gap-1.5 bg-terracotta/15 border border-terracotta/30 text-terracotta hover:bg-terracotta/25 hover:border-terracotta/50 font-hud text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg ml-auto cursor-pointer"
                        >
                          {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // Quiz Completed Screen
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-marigold/10 border border-marigold/30 text-marigold text-3xl animate-bounce">
                      🏆
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-paper">Quiz Completed!</h3>
                      <p className="font-body text-sm text-pencil">
                        You scored <span className="font-semibold text-paper">{score}</span> out of <span className="font-semibold text-paper">{QUIZ_QUESTIONS.length}</span> correct answers.
                      </p>
                    </div>

                    {/* Rewards Card */}
                    <div className="bg-ink/60 border border-pencil/25 rounded-2xl p-5 max-w-sm mx-auto space-y-4 shadow-xl">
                      <h4 className="font-hud text-xs text-pencil uppercase tracking-wider">Rewards Earned</h4>
                      <div className="flex justify-center gap-8 font-hud text-sm">
                        <div className="flex flex-col items-center">
                          <span className="text-paper font-semibold">+{score * 5} XP</span>
                          <span className="text-[10px] text-pencil/80">Experience</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-marigold font-semibold">+{score >= 4 ? 10 : 3} Coins</span>
                          <span className="text-[10px] text-pencil/80">Coins</span>
                        </div>
                      </div>

                      <button
                        onClick={claimQuizRewards}
                        disabled={rewardClaimed}
                        className={`w-full py-2.5 font-hud text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
                          rewardClaimed
                            ? 'bg-pencil/10 border border-pencil/20 text-pencil/50 cursor-not-allowed font-medium'
                            : 'bg-teal-deep/15 border border-teal-deep/30 text-teal-deep hover:bg-teal-deep/25 hover:border-teal-deep/50 font-bold'
                        }`}
                      >
                        {rewardClaimed ? 'Rewards Claimed ✓' : 'Claim Rewards'}
                      </button>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                      <button
                        onClick={resetQuiz}
                        className="flex items-center gap-1.5 bg-paper/5 border border-pencil/20 text-pencil hover:text-paper hover:bg-paper/10 font-hud text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default BasicEspanolScreen;
