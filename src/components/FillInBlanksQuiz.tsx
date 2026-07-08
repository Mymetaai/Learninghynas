// FillInBlanksQuiz.tsx — Interactive Fill-in-the-Blanks Quiz for Training Grounds.
// Covers Greetings, Daily Verbs, Household Items, Telling Time, and Weather.
// Styled in the glassmorphism theme using premium micro-animations.

import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle, RefreshCw, Award, Sparkles } from 'lucide-react';

interface Question {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: string;
  hint: string;
  translation: string;
}

interface QuizCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  questions: Question[];
}

const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'greetings',
    name: 'Greetings',
    emoji: '👋',
    description: 'Essential starters and self-introductions',
    questions: [
      {
        id: 'greet-1',
        sentenceBefore: '¡',
        sentenceAfter: '! ¿Cómo está usted?',
        correctAnswer: 'hola',
        hint: 'Standard Spanish word for "hello".',
        translation: 'Hello! How are you (formal)?',
      },
      {
        id: 'greet-2',
        sentenceBefore: 'Me ',
        sentenceAfter: ' Elena, mucho gusto.',
        correctAnswer: 'llamo',
        hint: 'Verb form of "llamarse" for "I am called".',
        translation: 'My name is Elena, nice to meet you.',
      },
      {
        id: 'greet-3',
        sentenceBefore: '¿Cómo está ',
        sentenceAfter: '?',
        correctAnswer: 'usted',
        hint: 'Formal pronoun for "you".',
        translation: 'How are you (formal)?',
      },
    ],
  },
  {
    id: 'daily-verbs',
    name: 'Action Verbs',
    emoji: '🏃',
    description: 'High-frequency verbs for daily routines',
    questions: [
      {
        id: 'verb-1',
        sentenceBefore: 'Yo tengo que ',
        sentenceAfter: ' en la oficina hoy.',
        correctAnswer: 'trabajar',
        hint: 'Infinitive verb for "to work".',
        translation: 'I have to work in the office today.',
      },
      {
        id: 'verb-2',
        sentenceBefore: 'Nosotros vamos a ',
        sentenceAfter: ' tacos para la cena.',
        correctAnswer: 'comer',
        hint: 'Infinitive verb for "to eat".',
        translation: 'We are going to eat tacos for dinner.',
      },
      {
        id: 'verb-3',
        sentenceBefore: 'Ella quiere ',
        sentenceAfter: ' español todos los días.',
        correctAnswer: 'estudiar',
        hint: 'Infinitive verb for "to study".',
        translation: 'She wants to study Spanish every day.',
      },
    ],
  },
  {
    id: 'household',
    name: 'Household',
    emoji: '🏠',
    description: 'Common items found around the home',
    questions: [
      {
        id: 'house-1',
        sentenceBefore: 'Pon los vasos sobre la ',
        sentenceAfter: ' de la cocina.',
        correctAnswer: 'mesa',
        hint: 'Noun for "table".',
        translation: 'Put the glasses on the kitchen table.',
      },
      {
        id: 'house-2',
        sentenceBefore: 'Por favor, siéntate en la ',
        sentenceAfter: ' libre.',
        correctAnswer: 'silla',
        hint: 'Noun for "chair".',
        translation: 'Please, sit in the empty chair.',
      },
      {
        id: 'house-3',
        sentenceBefore: 'Voy a dormir en mi ',
        sentenceAfter: ' porque estoy cansado.',
        correctAnswer: 'cama',
        hint: 'Noun for "bed".',
        translation: 'I am going to sleep in my bed because I am tired.',
      },
    ],
  },
  {
    id: 'time',
    name: 'Telling Time',
    emoji: '⏰',
    description: 'Asking for time and periods of the day',
    questions: [
      {
        id: 'time-1',
        sentenceBefore: '¿Qué ',
        sentenceAfter: ' es? Son las tres de la tarde.',
        correctAnswer: 'hora',
        hint: 'Noun for "hour/time".',
        translation: 'What time is it? It is three in the afternoon.',
      },
      {
        id: 'time-2',
        sentenceBefore: 'Siempre bebo café por la ',
        sentenceAfter: '.',
        correctAnswer: 'mañana',
        hint: 'Noun for "morning". Remember the ñ!',
        translation: 'I always drink coffee in the morning.',
      },
      {
        id: 'time-3',
        sentenceBefore: 'Las estrellas brillan por la ',
        sentenceAfter: '.',
        correctAnswer: 'noche',
        hint: 'Noun for "night".',
        translation: 'The stars shine at night.',
      },
    ],
  },
  {
    id: 'weather',
    name: 'Weather',
    emoji: '☀️',
    description: 'Describing atmospheric conditions',
    questions: [
      {
        id: 'weather-1',
        sentenceBefore: 'Hoy hace ',
        sentenceAfter: ' y vamos a la piscina.',
        correctAnswer: 'sol',
        hint: 'Noun for "sun". Used with "hacer" for sunny weather.',
        translation: 'Today it is sunny and we are going to the pool.',
      },
      {
        id: 'weather-2',
        sentenceBefore: 'Usa una chaqueta porque hace ',
        sentenceAfter: ' afuera.',
        correctAnswer: 'frío',
        hint: 'Noun for "cold". Remember the accent on the í!',
        translation: 'Wear a jacket because it is cold outside.',
      },
      {
        id: 'weather-3',
        sentenceBefore: 'Lleva un paraguas porque ',
        sentenceAfter: ' mucho.',
        correctAnswer: 'llueve',
        hint: 'Verb form of "llover" for "it rains/it is raining".',
        translation: 'Take an umbrella because it is raining a lot.',
      },
    ],
  },
];

const FillInBlanksQuiz: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(QUIZ_CATEGORIES[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const currentCategory = QUIZ_CATEGORIES.find((cat) => cat.id === activeTab) ?? QUIZ_CATEGORIES[0];

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    // Reset status when user starts re-typing
    if (results[id]) {
      setResults((prev) => ({ ...prev, [id]: null }));
    }
  };

  // Standardize inputs to match common variations (e.g. casing, spacing, accents)
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // strip accents

  const handleCheckAnswer = (q: Question) => {
    const userAnswer = answers[q.id] ?? '';
    const normUser = normalize(userAnswer);
    const normCorrect = normalize(q.correctAnswer);

    const isMatch = normUser === normCorrect;
    setResults((prev) => ({
      ...prev,
      [q.id]: isMatch ? 'correct' : 'incorrect',
    }));
  };

  const handleToggleHint = (id: string) => {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetQuiz = () => {
    const categoryQuestionIds = currentCategory.questions.map((q) => q.id);
    setAnswers((prev) => {
      const next = { ...prev };
      categoryQuestionIds.forEach((id) => delete next[id]);
      return next;
    });
    setResults((prev) => {
      const next = { ...prev };
      categoryQuestionIds.forEach((id) => delete next[id]);
      return next;
    });
    setShowHints((prev) => {
      const next = { ...prev };
      categoryQuestionIds.forEach((id) => delete next[id]);
      return next;
    });
  };

  const correctCount = currentCategory.questions.filter(
    (q) => results[q.id] === 'correct',
  ).length;

  const isCompleted = correctCount === currentCategory.questions.length;

  return (
    <section className="glass-surface border border-pencil/20 rounded-2xl p-6 shadow-xl flex flex-col h-full bg-paper/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">✍️</span>
          <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            Sentence Practice
          </p>
        </div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 bg-success/10 border border-success/30 text-success text-[10px] uppercase tracking-wider font-hud px-2.5 py-1 rounded-full"
          >
            <Award className="h-3 w-3" />
            Perfect Score!
          </motion.div>
        )}
      </div>

      <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-1">
        Fill in the Blanks
      </h2>
      <p className="font-body text-xs text-[var(--text-secondary)] mb-6">
        Complete the sentences using appropriate conversational terms.
      </p>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-structural/30 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {QUIZ_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-hud tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === cat.id
                ? 'bg-[var(--accent-action)] text-white shadow-md'
                : 'bg-[var(--bg-elevated)] hover:bg-[var(--bg-elevated-2)] border border-structural text-[var(--text-secondary)]'
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Questions list */}
      <div className="flex-1 space-y-6">
        {currentCategory.questions.map((q) => {
          const status = results[q.id];
          const hasAnswer = !!answers[q.id]?.trim();

          return (
            <div key={q.id} className="relative flex flex-col gap-2">
              {/* Question Text with input inside */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-body text-sm font-semibold text-[var(--text-primary)]">
                <span>{q.sentenceBefore}</span>
                <input
                  type="text"
                  value={answers[q.id] ?? ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer(q)}
                  placeholder="..."
                  disabled={status === 'correct'}
                  className={`w-28 text-center bg-[var(--bg-elevated)] border font-target rounded-lg px-2.5 py-1 text-sm focus:outline-none transition-all duration-250 ${
                    status === 'correct'
                      ? 'border-success bg-success/5 text-success font-bold'
                      : status === 'incorrect'
                      ? 'border-error bg-error/5 text-error animate-shake'
                      : 'border-structural focus:border-[var(--accent-action)]/50 focus:shadow-[0_0_8px_rgba(230,72,51,0.15)] text-[var(--text-primary)]'
                  }`}
                />
                <span>{q.sentenceAfter}</span>

                {/* Validation icon */}
                {status && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="ml-1"
                  >
                    {status === 'correct' ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-error" />
                    )}
                  </motion.span>
                )}
              </div>

              {/* Translation/context */}
              <p className="font-body text-[11px] text-[var(--text-secondary)] italic leading-relaxed">
                Translation: &ldquo;{q.translation}&rdquo;
              </p>

              {/* Hint & Check Controls */}
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => handleToggleHint(q.id)}
                  className="flex items-center gap-1 text-[10px] font-hud uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--accent-action)] transition-colors cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  {showHints[q.id] ? 'Hide Hint' : 'Need Hint?'}
                </button>

                {status !== 'correct' && (
                  <button
                    onClick={() => handleCheckAnswer(q)}
                    disabled={!hasAnswer}
                    className={`px-3 py-1 rounded-lg font-hud text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      hasAnswer
                        ? 'bg-[var(--accent-action)]/15 border border-[var(--accent-action)]/30 text-[var(--accent-action)] hover:bg-[var(--accent-action)]/25'
                        : 'bg-pencil/5 border border-pencil/10 text-pencil/40 cursor-not-allowed'
                    }`}
                  >
                    Check
                  </button>
                )}
              </div>

              {/* Hint Content display */}
              <AnimatePresence>
                {showHints[q.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[var(--bg-elevated-2)] border border-structural/40 rounded-xl mt-1.5 p-3 text-xs font-body text-[var(--text-secondary)]"
                  >
                    <div className="flex gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-marigold shrink-0 mt-0.5" />
                      <div>
                        <p>{q.hint}</p>
                        {status === 'incorrect' && (
                          <p className="text-[10px] text-error font-semibold mt-1">
                            Tip: Answer is: &ldquo;{q.correctAnswer}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="mt-8 pt-4 border-t border-structural/30 flex items-center justify-between">
        <span className="font-hud text-[10px] text-[var(--text-secondary)]">
          Completed: {correctCount} / {currentCategory.questions.length}
        </span>
        <button
          onClick={handleResetQuiz}
          className="flex items-center gap-1 text-[10px] font-hud uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" />
          Reset Quiz
        </button>
      </div>
    </section>
  );
};

export default FillInBlanksQuiz;
