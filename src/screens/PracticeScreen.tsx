// Training Grounds — Practice Hub screen.
// Functional 6-tile drill hub covering all 30 lessons across Parts 1 to 7.
// Tiles: Grammar Blitz, Conjugation Blitz, Listening Reps, Speaking Reps, Vocab Drill, Weak Spots, Auto Flashcards.

import { useState, useMemo, useCallback, type FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getQuest, ALL_WORLDS } from '../content';
import { useProgressStore } from '../state/progressStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  BookOpen,
  Headphones,
  Mic,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Zap,
  Flame
} from 'lucide-react';
import { useStatsStore } from '../state/statsStore';
import { useTrainingStore } from '../state/trainingStore';
import { BOOK_LEVELS } from '../content';
import { COMPANION_DICTIONARY } from '../content/dictionary';
import type { Exercise } from '../content/types';
import ExerciseEngine from '../components/exercises/ExerciseEngine';
import UnifiedVocabTrainer from '../components/UnifiedVocabTrainer';
import AutoFlashcardsPlayer from '../components/AutoFlashcardsPlayer';

// ── Types ────────────────────────────────────────────────────────────────────

type DrillMode =
  | 'weak-spots'
  | 'vocab-drill'
  | 'listening-reps'
  | 'speaking-reps'
  | 'grammar-blitz'
  | 'conjugation'
  | 'quest'
  | 'flashcards';

type ScreenView = 'hub' | 'session';

interface SessionResult {
  correct: number;
  total: number;
  xp: number;
  coins: number;
  mode: DrillMode;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Collect all listening exercises from worlds and book levels across Parts 1-7. */
function getListeningExercises(): Exercise[] {
  const worldExercises = ALL_WORLDS.flatMap((w) =>
    w.quests.flatMap((q) => q.exercises.filter((ex) => ex.type === 'listening'))
  );
  const bookExercises = BOOK_LEVELS.flatMap((level) =>
    level.exercises.filter((ex) => ex.type === 'listening')
  );
  const combined = [...worldExercises, ...bookExercises];
  if (combined.length > 0) return combined;

  // Fallback listening exercises covering Parts 1-7
  return [
    { id: 'list-fallback-1', type: 'listening', prompt: 'Listen and select: ¿Cómo estás?', answer: 'How are you?', options: ['How are you?', 'Good morning', 'My name is John', 'Goodbye'], context: 'Part 1: Greetings' },
    { id: 'list-fallback-2', type: 'listening', prompt: 'Listen and select: Voy al supermercado', answer: 'I am going to the supermarket', options: ['I am going to the supermarket', 'I am at the store', 'I eat apples', 'We study Spanish'], context: 'Part 2: Verb Ir' },
    { id: 'list-fallback-3', type: 'listening', prompt: 'Listen and select: Son las tres de la tarde', answer: 'It is three in the afternoon', options: ['It is three in the afternoon', 'It is one in the morning', 'Today is Monday', 'It is very cold'], context: 'Part 3: Time' },
    { id: 'list-fallback-4', type: 'listening', prompt: 'Listen and select: Estoy comiendo una manzana', answer: 'I am eating an apple', options: ['I am eating an apple', 'I want an apple', 'I bought an apple', 'I like apples'], context: 'Part 4: Progressive' },
    { id: 'list-fallback-5', type: 'listening', prompt: 'Listen and select: Me gustan los libros antiguos', answer: 'I like old books', options: ['I like old books', 'I have old books', 'These books are mine', 'He gave me books'], context: 'Part 5: Gustar' },
    { id: 'list-fallback-6', type: 'listening', prompt: 'Listen and select: Se lo entregué ayer', answer: 'I handed it to him yesterday', options: ['I handed it to him yesterday', 'I will give it to her', 'I wash my hands', 'Do the homework!'], context: 'Part 6: Double Objects' },
    { id: 'list-fallback-7', type: 'listening', prompt: 'Listen and select: Cuando era joven vivía en Madrid', answer: 'When I was young I lived in Madrid', options: ['When I was young I lived in Madrid', 'I went to Madrid yesterday', 'Madrid is bigger than Paris', 'It was raining in Madrid'], context: 'Part 7: Imperfect' }
  ];
}

/** Generate review exercises from recorded mistakes or fallback dictionary terms. */
function generateWeakSpotExercises(
  mistakes: { word: string; correctAnswer: string }[],
): Exercise[] {
  if (mistakes.length > 0) {
    const pool = shuffle(mistakes).slice(0, 8);
    return pool.map((m, i) => {
      const otherAnswers = mistakes.filter((o) => o.correctAnswer !== m.correctAnswer).map((o) => o.correctAnswer);
      const dictWords = Object.values(COMPANION_DICTIONARY).map((d) => d.meaning);
      const allDistractors = shuffle([...new Set([...otherAnswers, ...dictWords])]).filter((d) => d !== m.correctAnswer);
      const distractors = allDistractors.slice(0, 3);
      const options = shuffle([m.correctAnswer, ...distractors]);

      return {
        id: `weak-spot-${i}`,
        type: 'multiple-choice' as const,
        prompt: `Translate: "${m.word}"`,
        answer: m.correctAnswer,
        options,
        context: 'Review — Practice your recorded weak spots!',
      };
    });
  }

  // Fallback weak spot review items
  const dictKeys = Object.keys(COMPANION_DICTIONARY);
  const sampleKeys = shuffle(dictKeys).slice(0, 6);
  return sampleKeys.map((key, i) => {
    const entry = COMPANION_DICTIONARY[key];
    const distractors = shuffle(Object.values(COMPANION_DICTIONARY).map((d) => d.meaning).filter((m) => m !== entry.meaning)).slice(0, 3);
    return {
      id: `weak-fallback-${i}`,
      type: 'multiple-choice' as const,
      prompt: `Translate: "${entry.word}"`,
      answer: entry.meaning,
      options: shuffle([entry.meaning, ...distractors]),
      context: 'Weak Spot Review Drill',
    };
  });
}

/** Generate vocab exercises from learned vocabulary across Parts 1-7. */
function generateVocabExercises(
  learnedVocab: { word: string }[],
): Exercise[] {
  const dictList = Object.values(COMPANION_DICTIONARY);
  const pool = learnedVocab.length >= 4 
    ? learnedVocab.map((v) => {
        const entry = COMPANION_DICTIONARY[v.word.toLowerCase()];
        return entry ? { word: v.word, meaning: entry.meaning } : null;
      }).filter(Boolean) as { word: string; meaning: string }[]
    : shuffle(dictList).slice(0, 8).map((d) => ({ word: d.word, meaning: d.meaning }));

  const exercises: Exercise[] = [];
  const mcPool = shuffle(pool).slice(0, 8);
  mcPool.forEach((item, idx) => {
    const otherMeanings = dictList.filter((v) => v.meaning !== item.meaning).map((v) => v.meaning);
    const distractors = shuffle(otherMeanings).slice(0, 3);
    const options = shuffle([item.meaning, ...distractors]);

    exercises.push({
      id: `vocab-mc-${idx}`,
      type: 'multiple-choice',
      prompt: `What does "${item.word}" mean?`,
      answer: item.meaning,
      options,
      context: 'Vocabulary Master Drill (Parts 1–7)',
    });
  });

  return shuffle(exercises).slice(0, 8);
}

/** Generate Grammar Blitz exercises covering Parts 1–7. */
function generateGrammarExercises(): Exercise[] {
  return shuffle([
    { id: 'g-1', type: 'multiple-choice', prompt: 'Which article is correct for "el mapa"?', answer: 'el', options: ['el', 'la', 'los', 'las'], context: 'Part 1: Masculine Noun Exception' },
    { id: 'g-2', type: 'multiple-choice', prompt: 'Choose the correct form of ESTAR: "Ellos ___ en la biblioteca."', answer: 'están', options: ['estoy', 'estás', 'está', 'están'], context: 'Part 2: Verb Estar Location' },
    { id: 'g-3', type: 'multiple-choice', prompt: 'How do you say "It is 2:00" in Spanish?', answer: 'Son las dos', options: ['Es la dos', 'Son las dos', 'Son dos horas', 'Es dos'], context: 'Part 3: Telling Time' },
    { id: 'g-4', type: 'multiple-choice', prompt: 'Which stem-change category does "poder" belong to?', answer: 'o -> ue', options: ['e -> ie', 'o -> ue', 'e -> i', 'u -> ue'], context: 'Part 4: Boot Verbs' },
    { id: 'g-5', type: 'multiple-choice', prompt: 'Which demonstrative means "this" (close to speaker)?', answer: 'este', options: ['este', 'ese', 'aquel', 'mío'], context: 'Part 5: Demonstratives' },
    { id: 'g-6', type: 'multiple-choice', prompt: 'When "le" comes before "lo", what does "le" change to?', answer: 'se', options: ['me', 'te', 'se', 'nos'], context: 'Part 6: Double Objects' },
    { id: 'g-7', type: 'multiple-choice', prompt: 'Which tense is used for ongoing background habits in the past?', answer: 'Imperfect Tense', options: ['Preterite Tense', 'Imperfect Tense', 'Present Tense', 'Future Tense'], context: 'Part 7: Preterite vs Imperfect' },
    { id: 'g-8', type: 'multiple-choice', prompt: 'How do you form equal comparisons for adjectives ("as... as")?', answer: 'tan... como', options: ['más... que', 'tan... como', 'menos... que', 'tanto... como'], context: 'Part 7: Comparisons' }
  ]);
}

/** Generate Conjugation Blitz exercises across Parts 1–7. */
function generateConjugationExercises(): Exercise[] {
  return shuffle([
    { id: 'c-1', type: 'multiple-choice', prompt: 'Conjugate "hablar" (-AR) for "tú":', answer: 'hablas', options: ['hablo', 'hablas', 'habla', 'hablamos'], context: 'Part 1: Present Regular' },
    { id: 'c-2', type: 'multiple-choice', prompt: 'Conjugate "comer" (-ER) for "nosotros":', answer: 'comemos', options: ['como', 'comes', 'comemos', 'comen'], context: 'Part 2: Present -ER' },
    { id: 'c-3', type: 'multiple-choice', prompt: 'Conjugate "tener" for "yo":', answer: 'tengo', options: ['tienes', 'tengo', 'tiene', 'tenemos'], context: 'Part 3: Tener Conjugation' },
    { id: 'c-4', type: 'multiple-choice', prompt: 'Conjugate "poner" (Yo-Go verb) for "yo":', answer: 'pongo', options: ['pono', 'pongo', 'poni', 'puegno'], context: 'Part 4: Yo-Go Irregular' },
    { id: 'c-5', type: 'multiple-choice', prompt: 'Conjugate "vestirse" (reflexive) for "yo":', answer: 'me visto', options: ['vesto', 'me visto', 'se visto', 'te visto'], context: 'Part 6: Reflexives' },
    { id: 'c-6', type: 'multiple-choice', prompt: 'What is the informal affirmative command (tú) for "hacer"?', answer: 'haz', options: ['hace', 'haz', 'haga', 'hazas'], context: 'Part 6: Imperatives' },
    { id: 'c-7', type: 'multiple-choice', prompt: 'What is the preterite form of "ir / ser" for "yo"?', answer: 'fui', options: ['iba', 'fui', 'fueron', 'estuve'], context: 'Part 6: Preterite Irregular' },
    { id: 'c-8', type: 'multiple-choice', prompt: 'What is the imperfect form of "ser" for "yo / él"?', answer: 'era', options: ['fui', 'era', 'iba', 'veía'], context: 'Part 7: Imperfect Irregular' }
  ]);
}

/** Generate Speaking Reps exercises across Parts 1–7. */
function generateSpeakingExercises(): Exercise[] {
  return shuffle([
    { id: 'sp-1', type: 'multiple-choice', prompt: 'Repeat aloud: "¡Hola, buenas tardes!"', answer: 'Good afternoon!', options: ['Good afternoon!', 'Good morning!', 'See you tomorrow!', 'My name is John'], context: 'Speaking Reps — Part 1' },
    { id: 'sp-2', type: 'multiple-choice', prompt: 'Repeat aloud: "¿Adónde vas ahora?"', answer: 'Where are you going now?', options: ['Where are you going now?', 'Where are you from?', 'How much does it cost?', 'What is your name?'], context: 'Speaking Reps — Part 2' },
    { id: 'sp-3', type: 'multiple-choice', prompt: 'Repeat aloud: "Tengo mucho frío hoy."', answer: 'I am very cold today.', options: ['I am very cold today.', 'I am hungry.', 'I am in a hurry.', 'It is sunny today.'], context: 'Speaking Reps — Part 3' },
    { id: 'sp-4', type: 'multiple-choice', prompt: 'Repeat aloud: "Quiero estudiar español todos los días."', answer: 'I want to study Spanish every day.', options: ['I want to study Spanish every day.', 'I can speak Spanish well.', 'I leave at six oclock.', 'I setting the table.'], context: 'Speaking Reps — Part 4' },
    { id: 'sp-5', type: 'multiple-choice', prompt: 'Repeat aloud: "Me encantan los libros de aventuras."', answer: 'I love adventure books.', options: ['I love adventure books.', 'This book is mine.', 'Nobody came today.', 'I give it to him.'], context: 'Speaking Reps — Part 5' },
    { id: 'sp-6', type: 'multiple-choice', prompt: 'Repeat aloud: "¡Haz la tarea y ven aquí!"', answer: 'Do the homework and come here!', options: ['Do the homework and come here!', 'I washed my hands.', 'He went to Spain.', 'I have just arrived.'], context: 'Speaking Reps — Part 6' },
    { id: 'sp-7', type: 'multiple-choice', prompt: 'Repeat aloud: "Cuando era niño vivía en la ciudad."', answer: 'When I was a child I lived in the city.', options: ['When I was a child I lived in the city.', 'Yesterday I went to school.', 'This statue is extremely tall.', 'It is better than before.'], context: 'Speaking Reps — Part 7' }
  ]);
}

// ── Main Component ───────────────────────────────────────────────────────────

const PracticeScreen: FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const questId = params.get('quest');
  const quest = useMemo(() => (questId ? getQuest(questId) : null), [questId]);

  const [view, setView] = useState<ScreenView>(quest ? 'session' : 'hub');
  const [activeMode, setActiveMode] = useState<DrillMode | null>(quest ? 'quest' : null);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  // Data sources
  const learnedVocab = useStatsStore((s) => s.learnedVocab);
  const mistakes = useTrainingStore((s) => s.mistakes);
  const grantTrainingRewards = useTrainingStore((s) => s.grantTrainingRewards);
  const markReviewedCorrectly = useTrainingStore((s) => s.markReviewedCorrectly);

  // Derived metrics
  const mistakeCount = mistakes.length;
  const vocabCount = learnedVocab.length > 0 ? learnedVocab.length : Object.keys(COMPANION_DICTIONARY).length;
  const listeningExercises = useMemo(() => getListeningExercises(), []);
  const listeningCount = listeningExercises.length;

  // Session exercises dispatcher
  const sessionExercises = useMemo<Exercise[]>(() => {
    if (quest) return quest.exercises;
    if (!activeMode) return [];
    switch (activeMode) {
      case 'weak-spots':
        return generateWeakSpotExercises(mistakes);
      case 'vocab-drill':
        return generateVocabExercises(learnedVocab);
      case 'listening-reps':
        return shuffle(listeningExercises).slice(0, 6);
      case 'grammar-blitz':
        return generateGrammarExercises();
      case 'conjugation':
        return generateConjugationExercises();
      case 'speaking-reps':
        return generateSpeakingExercises();
      default:
        return [];
    }
  }, [activeMode, mistakes, learnedVocab, listeningExercises, quest]);

  const handleStartSession = useCallback((mode: DrillMode) => {
    setActiveMode(mode);
    setSessionResult(null);
    setView('session');
  }, []);

  const completeQuest = useProgressStore((s) => s.completeQuest);
  const grantQuestRewards = useStatsStore((s) => s.grantQuestRewards);
  const learnVocab = useStatsStore((s) => s.learnVocab);

  const handleSessionComplete = useCallback(
    (score: { correct: number; total: number }) => {
      if (quest && questId) {
        completeQuest(questId);
        grantQuestRewards(questId, quest.rewards.xp, quest.rewards.coins);
        const vocabWords = quest.vocabulary.map((v) => v.word);
        learnVocab(vocabWords, questId);

        setSessionResult({
          ...score,
          xp: quest.rewards.xp,
          coins: quest.rewards.coins,
          mode: 'quest',
        });
      } else {
        const { xp, coins } = grantTrainingRewards(score.correct, score.total);

        if (activeMode === 'weak-spots') {
          mistakes.forEach((m) => {
            markReviewedCorrectly(m.word);
          });
        }

        setSessionResult({
          ...score,
          xp,
          coins,
          mode: activeMode!,
        });
      }
    },
    [activeMode, grantTrainingRewards, markReviewedCorrectly, mistakes, quest, questId, completeQuest, grantQuestRewards, learnVocab],
  );

  const handleBackToHub = useCallback(() => {
    if (quest) {
      navigate('/map');
    } else {
      setView('hub');
      setActiveMode(null);
      setSessionResult(null);
    }
  }, [quest, navigate]);

  // ── Session View ─────────────────────────────────────────────────────────

  if (view === 'session' && activeMode) {
    if (activeMode === 'flashcards') {
      return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
          <div className="mx-auto max-w-4xl">
            <AutoFlashcardsPlayer onBack={handleBackToHub} />
          </div>
        </div>
      );
    }

    if (sessionResult) {
      return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
          <div className="mx-auto max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="rounded-2xl border border-pencil/20 bg-paper/5 p-8 text-center shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-marigold/60 bg-marigold/10 text-3xl"
              >
                🎉
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-text-primary">
                {quest ? 'Quest Complete!' : 'Session Complete!'}
              </h2>
              <p className="mt-1 font-body text-sm text-pencil">
                {quest ? quest.title : TILE_CONFIG[sessionResult.mode].title}
              </p>

              <div className="mt-6 flex items-center justify-center gap-6">
                <div>
                  <p className="font-hud text-3xl font-semibold tabular-nums text-teal-deep">
                    {sessionResult.total > 0
                      ? Math.round((sessionResult.correct / sessionResult.total) * 100)
                      : 0}%
                  </p>
                  <p className="font-body text-xs text-pencil">accuracy</p>
                </div>
                <div className="h-8 w-px bg-pencil/20" />
                <div>
                  <p className="font-hud text-3xl font-semibold tabular-nums text-marigold">
                    +{sessionResult.xp}
                  </p>
                  <p className="font-body text-xs text-pencil">XP earned</p>
                </div>
                <div className="h-8 w-px bg-pencil/20" />
                <div>
                  <p className="font-hud text-3xl font-semibold tabular-nums text-marigold">
                    +{sessionResult.coins}
                  </p>
                  <p className="font-body text-xs text-pencil">coins</p>
                </div>
              </div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToHub}
                className="mt-6 w-full rounded-xl bg-terracotta px-4 py-3 font-display text-base font-semibold text-text-primary shadow-lg transition-colors hover:bg-terracotta/90 cursor-pointer border-none"
              >
                {quest ? 'Back to Adventure Map' : 'Back to Training Grounds'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      );
    }

    if (sessionExercises.length === 0) {
      return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
          <div className="mx-auto max-w-lg text-center">
            <p className="font-body text-sm text-pencil mt-12">
              No exercises available for this session right now.
            </p>
            <button
              onClick={handleBackToHub}
              className="mt-4 font-hud text-xs text-terracotta hover:text-terracotta/80 cursor-pointer bg-transparent border-none"
            >
              ← Back to Training Grounds
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base px-4 py-6">
        <div className="mx-auto max-w-lg mb-4">
          <button
            onClick={handleBackToHub}
            className="flex items-center gap-1.5 font-hud text-[11px] text-pencil hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {quest ? 'Back to Adventure Map' : 'Back to Training Grounds'}
          </button>
          <h2 className="font-display text-lg font-bold text-text-primary mt-2">
            {TILE_CONFIG[activeMode].title}
          </h2>
        </div>

        <ExerciseEngine
          exercises={sessionExercises}
          questId={`training-${activeMode}`}
          questTitle={TILE_CONFIG[activeMode].title}
          onSessionComplete={handleSessionComplete}
          trackMistakes={activeMode !== 'weak-spots'}
        />
      </div>
    );
  }

  // ── Hub View ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-base text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-marigold" />
            <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
              Training Grounds (Parts 1–7)
            </p>
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Interactive Practice Drills 💪
          </h1>
          <p className="mt-2 font-body text-sm text-pencil">
            Sharpen your Spanish skills across all 30 lessons (Parts 1 to 7). Select a drill mode below!
          </p>
        </div>

        {/* Interactive Training Area */}
        <div className="mb-12">
          <UnifiedVocabTrainer />
        </div>

        {/* Drill Tiles Grid (6 Active Tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {/* 1. Grammar Blitz */}
            <DrillTile
              mode="grammar-blitz"
              icon={<Zap className="h-6 w-6" />}
              iconColor="text-marigold"
              iconBg="bg-marigold/10 border-marigold/20"
              title="Grammar Blitz"
              subtitle="Rapid-fire grammar rules across Parts 1–7"
              ctaLabel="Start Grammar Blitz"
              onStart={() => handleStartSession('grammar-blitz')}
              index={0}
            />

            {/* 2. Conjugation Blitz */}
            <DrillTile
              mode="conjugation"
              icon={<Flame className="h-6 w-6" />}
              iconColor="text-terracotta"
              iconBg="bg-terracotta/10 border-terracotta/20"
              title="Conjugation Blitz"
              subtitle="-AR, -ER, -IR, Ser, Estar, Ir, Yo-Go & Preterite"
              ctaLabel="Start Conjugation"
              onStart={() => handleStartSession('conjugation')}
              index={1}
            />

            {/* 3. Listening Reps */}
            <DrillTile
              mode="listening-reps"
              icon={<Headphones className="h-6 w-6" />}
              iconColor="text-teal-deep"
              iconBg="bg-teal-deep/10 border-teal-deep/20"
              title="Listening Reps"
              subtitle={`${listeningCount} audio listening clips across Lessons 1–30`}
              ctaLabel="Start Listening"
              onStart={() => handleStartSession('listening-reps')}
              index={2}
            />

            {/* 4. Speaking Reps */}
            <DrillTile
              mode="speaking-reps"
              icon={<Mic className="h-6 w-6" />}
              iconColor="text-marigold"
              iconBg="bg-marigold/10 border-marigold/20"
              title="Speaking Reps"
              subtitle="Practice spoken phrases aloud across Parts 1–7"
              ctaLabel="Start Speaking"
              onStart={() => handleStartSession('speaking-reps')}
              index={3}
            />

            {/* 5. Vocab Drill */}
            <DrillTile
              mode="vocab-drill"
              icon={<BookOpen className="h-6 w-6" />}
              iconColor="text-teal-deep"
              iconBg="bg-teal-deep/10 border-teal-deep/20"
              title="Vocab Drill"
              subtitle={`${vocabCount} vocabulary words from Parts 1–7`}
              ctaLabel="Drill Vocab"
              onStart={() => handleStartSession('vocab-drill')}
              index={4}
            />

            {/* 6. Weak Spots */}
            <DrillTile
              mode="weak-spots"
              icon={<Target className="h-6 w-6" />}
              iconColor="text-terracotta"
              iconBg="bg-terracotta/10 border-terracotta/20"
              title="Weak Spots"
              subtitle={mistakeCount > 0 ? `${mistakeCount} active mistake(s) to review` : 'Review target vocabulary'}
              ctaLabel="Start Review"
              onStart={() => handleStartSession('weak-spots')}
              index={5}
            />

            {/* 7. Auto Flashcards */}
            <DrillTile
              mode="flashcards"
              icon={<Sparkles className="h-6 w-6" />}
              iconColor="text-marigold"
              iconBg="bg-marigold/10 border-marigold/20"
              title="Auto Flashcards"
              subtitle="Hands-free auto-play flashcard deck player"
              ctaLabel="Start Flashcards"
              onStart={() => handleStartSession('flashcards')}
              index={6}
            />
          </AnimatePresence>
        </div>

        {/* Quick stats footer */}
        <div className="mt-8 flex items-center justify-center gap-6 font-hud text-[11px] text-pencil">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-deep" />
            {useTrainingStore.getState().trainingSessionsCompleted} sessions completed
          </span>
          <span className="h-3 w-px bg-pencil/30" />
          <span className="flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-terracotta" />
            {mistakeCount} active weak spots
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Tile Configuration ───────────────────────────────────────────────────────

const TILE_CONFIG: Record<DrillMode, { title: string }> = {
  'weak-spots': { title: 'Weak Spots Review' },
  'vocab-drill': { title: 'Vocabulary Drill (Parts 1–7)' },
  'listening-reps': { title: 'Listening Reps' },
  'speaking-reps': { title: 'Speaking Reps' },
  'grammar-blitz': { title: 'Grammar Blitz (Parts 1–7)' },
  'conjugation': { title: 'Conjugation Blitz' },
  'quest': { title: 'Quest Quiz' },
  'flashcards': { title: 'Auto Flashcards' },
};

// ── DrillTile Component ──────────────────────────────────────────────────────

interface DrillTileProps {
  mode: DrillMode;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle?: string;
  emptyState?: string;
  ctaLabel: string;
  disabled?: boolean;
  comingSoon?: boolean;
  onStart: () => void;
  index: number;
}

const DrillTile: FC<DrillTileProps> = ({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  emptyState,
  ctaLabel,
  disabled,
  comingSoon,
  onStart,
  index,
}) => {
  const hasData = !!subtitle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`relative bg-paper/5 border border-pencil/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between min-h-[210px] transition-all duration-200 group ${
        comingSoon ? 'opacity-70' : 'hover:border-pencil/40 hover:bg-paper/[0.07]'
      }`}
    >
      {comingSoon && (
        <div className="absolute top-3 right-3 bg-marigold/15 border border-marigold/30 text-marigold font-hud text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
          Coming Soon
        </div>
      )}

      <div>
        <div className={`h-11 w-11 rounded-xl border ${iconBg} flex items-center justify-center ${iconColor} mb-3`}>
          {icon}
        </div>
        <h3 className="font-display text-lg font-bold text-text-primary">{title}</h3>

        <p className="mt-1 font-body text-xs text-pencil min-h-[2em]">
          {hasData ? subtitle : emptyState ?? ''}
        </p>
      </div>

      <button
        type="button"
        onClick={onStart}
        disabled={disabled}
        className={`mt-4 w-full rounded-xl py-2.5 font-hud text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border-none ${
          disabled
            ? 'bg-pencil/10 border border-pencil/20 text-pencil/50 cursor-not-allowed'
            : 'bg-terracotta/15 border border-terracotta/30 text-terracotta hover:bg-terracotta/25 hover:border-terracotta/50 active:scale-[0.98]'
        }`}
      >
        {ctaLabel}
      </button>
    </motion.div>
  );
};

export default PracticeScreen;
