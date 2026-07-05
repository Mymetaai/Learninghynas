import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Coins, Flame, ArrowLeft } from 'lucide-react';
import { useStatsStore } from '../state/statsStore';
import { useProgressStore } from '../state/progressStore';
import { getWorld } from '../content';
import ExerciseCard from '../components/exercises/ExerciseCard';
import Kitsune3D from '../components/Kitsune3D';
import type { Exercise } from '../content/types';

// Simple helper to shuffle exercises at the start of a duel
const shuffle = (array: Exercise[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const BossBattleScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const regionId = searchParams.get('region') ?? 'world-pre-a1';

  // Load World & Exercises
  const world = useMemo(() => getWorld(regionId) ?? getWorld('world-pre-a1')!, [regionId]);
  
  // Track reset count to reshuffle exercises when the battle is restarted
  const [resetCount, setResetCount] = useState(0);

  const exercises = useMemo(() => {
    void resetCount;
    let raw = world.quests.flatMap((q) => q.exercises);
    // Fallback to pre-a1 questions if stub region has no exercises
    if (raw.length === 0) {
      const defaultWorld = getWorld('world-pre-a1');
      raw = defaultWorld ? defaultWorld.quests.flatMap((q) => q.exercises) : [];
    }
    return shuffle(raw);
  }, [world, resetCount]);

  // Stores
  const addRewards = useStatsStore((s) => s.addRewards);
  const defeatGuardian = useProgressStore((s) => s.defeatGuardian);

  // Gameplay State
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'victory' | 'defeat'>('intro');
  const [guardianHp, setGuardianHp] = useState(8);
  const [playerLives, setPlayerLives] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comboCount, setComboCount] = useState(0);

  // Timer State
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);

  // Animation States
  const [isHitFlashing, setIsHitFlashing] = useState(false);
  const [isPlayerShaking, setIsPlayerShaking] = useState(false);
  const [showComboToast, setShowComboToast] = useState(false);

  const currentExercise = exercises[currentIndex];

  const triggerPlayerShake = useCallback(() => {
    setIsPlayerShaking(true);
    setTimeout(() => setIsPlayerShaking(false), 500);
  }, []);

  const goToNextExercise = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % exercises.length);
    setTimeLeft(20);
    setIsAnswered(false);
  }, [exercises.length]);

  const handleTimeout = useCallback(() => {
    setIsAnswered(true);
    setComboCount(0);
    setPlayerLives((prev) => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setGameState('defeat');
      } else {
        triggerPlayerShake();
        setTimeout(goToNextExercise, 1500);
      }
      return nextLives;
    });
  }, [goToNextExercise, triggerPlayerShake]);

  // Soft Timer Countdown Effect
  useEffect(() => {
    if (gameState !== 'playing' || !timerEnabled || isAnswered) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, timerEnabled, currentIndex, isAnswered, handleTimeout]);

  const triggerHitFlash = () => {
    setIsHitFlashing(true);
    setTimeout(() => setIsHitFlashing(false), 500);
  };

  const triggerVictory = useCallback(() => {
    setGameState('victory');
    // Grant rewards
    addRewards(0, 100);
    // Mark world guardian defeated
    defeatGuardian(world.id);
  }, [addRewards, defeatGuardian, world.id]);

  const handleAnswerStart = useCallback(() => {
    setIsAnswered(true);
  }, []);

  const handleAnswer = useCallback((correct: boolean) => {
    if (gameState !== 'playing') return;

    if (correct) {
      const newCombo = comboCount + 1;
      setComboCount(newCombo);
      
      // Calculate damage: 3+ correct answers in a row deals +1 extra damage (+2 total)
      const isComboHit = newCombo >= 3;
      const damage = isComboHit ? 2 : 1;

      if (isComboHit) {
        setShowComboToast(true);
        setTimeout(() => setShowComboToast(false), 2000);
      }

      setGuardianHp((prev) => {
        const nextHp = prev - damage;
        if (nextHp <= 0) {
          triggerVictory();
          return 0;
        }
        triggerHitFlash();
        setTimeout(goToNextExercise, 1500);
        return nextHp;
      });
    } else {
      setComboCount(0);
      setPlayerLives((prev) => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setGameState('defeat');
        } else {
          triggerPlayerShake();
          setTimeout(goToNextExercise, 1500);
        }
        return nextLives;
      });
    }
  }, [comboCount, gameState, goToNextExercise, triggerPlayerShake, triggerVictory]);

  const resetBattle = () => {
    setGuardianHp(8);
    setPlayerLives(3);
    setCurrentIndex(0);
    setComboCount(0);
    setTimeLeft(20);
    setIsAnswered(false);
    setResetCount((prev) => prev + 1);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary px-4 py-8 flex flex-col items-center justify-center font-body">
      {/* HUD Top Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-structural bg-bg-elevated text-sm font-semibold hover:bg-bg-elevated-2 text-text-primary cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Map
        </button>
        <h1 className="font-display text-xl font-bold text-text-primary">{world.name} Boss Battle</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Soft Timer</span>
            <button
              onClick={() => setTimerEnabled((prev) => !prev)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                timerEnabled ? 'bg-accent-action' : 'bg-structural'
              }`}
            >
              <div
                className={`w-4 h-4 bg-bg-elevated rounded-full transition-transform ${
                  timerEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md p-6 rounded-xl border border-structural bg-bg-elevated shadow-xl text-center"
          >
            <div className="h-32 w-32 mx-auto mb-4">
              <Kitsune3D direction="right" mode="idle" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2 text-text-primary">Challenge {world.guardian}</h2>
            <p className="text-sm text-text-secondary mb-6">
              Test your Spanish skills in an HP Duel! Beat the guardian to unlock the next region.
            </p>
            <button
              onClick={() => setGameState('playing')}
              className="w-full py-3 bg-accent-action text-bg-elevated font-semibold rounded-xl hover:bg-accent-action-hover shadow-md cursor-pointer border-none transition-colors"
            >
              Enter Duel
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            {/* Left Column: Duel Status Panel */}
            <div className="md:col-span-4 flex flex-col gap-4">
              {/* Guardian Panel */}
              <motion.div
                animate={isHitFlashing ? { backgroundColor: ['var(--bg-elevated)', 'var(--error)', 'var(--bg-elevated)'], scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl border border-structural bg-bg-elevated shadow-md relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-base font-bold text-text-primary">{world.guardian}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-error/10 text-error">BOSS</span>
                </div>

                {/* 8-segment Guardian HP bar */}
                <div className="grid grid-cols-8 gap-1 mb-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isHitFlashing && i >= guardianHp ? { scale: [1, 0, 1] } : {}}
                      className={`h-4 rounded-sm transition-all ${
                        i < guardianHp
                          ? 'bg-accent-action shadow-sm'
                          : 'bg-bg-elevated-2 border border-structural'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-right text-xs text-text-secondary font-bold font-hud">
                  HP: {guardianHp}/8
                </div>
              </motion.div>

              {/* Player Fox Lives Panel */}
              <motion.div
                animate={isPlayerShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-xl border border-structural bg-bg-elevated shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-base font-bold text-text-primary">Yuki's Fox Lives</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 1 }}
                        animate={i >= playerLives ? { scale: [1, 1.4, 0], opacity: 0 } : {}}
                        transition={{ duration: 0.4 }}
                        className="text-xl"
                      >
                        🦊
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-text-secondary">
                  Don't let Yuki lose all her spirit lives!
                </div>
              </motion.div>

              {/* Soft Timer Ring & Combo Status */}
              <div className="p-4 rounded-xl border border-structural bg-bg-elevated shadow-md flex items-center justify-around">
                {/* Draining Ring Timer */}
                {timerEnabled ? (
                  <div className="relative w-16 h-16 flex items-center justify-center font-hud">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        className="text-structural"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        className="text-accent-action"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 * (1 - timeLeft / 20)}
                        transition={{ duration: 1, ease: 'linear' }}
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-text-primary">
                      {timeLeft}s
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center font-hud">
                    <span className="text-2xl text-text-secondary">∞</span>
                    <span className="text-[10px] text-text-secondary uppercase">Timer Paused</span>
                  </div>
                )}

                <div className="h-10 w-px bg-structural" />

                {/* Combo Fire Indicator */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 font-hud">
                    <Flame className={`h-5 w-5 ${comboCount >= 3 ? 'text-accent-action animate-pulse' : 'text-text-tertiary'}`} />
                    <span className="font-display font-bold text-lg text-text-primary">{comboCount}</span>
                  </div>
                  <span className="text-[10px] text-text-secondary uppercase">Combo Streak</span>
                </div>
              </div>

              {/* Fox Fire Combo Toast/Badge */}
              <AnimatePresence>
                {showComboToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3 bg-accent-action text-bg-elevated text-center font-display font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    🔥 Fox Fire Combo! Double Damage! 🔥
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Active Exercise */}
            <div className="md:col-span-8">
              {currentExercise && (
                <div className="relative">
                  <ExerciseCard
                    key={currentExercise.id}
                    exercise={currentExercise}
                    index={currentIndex + 1}
                    total={exercises.length}
                    onAnswer={handleAnswer}
                    onAnswerStart={handleAnswerStart}
                  />
                  {isAnswered && (
                    <div className="absolute inset-0 bg-transparent cursor-not-allowed z-50 animate-pulse" />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {gameState === 'victory' && (
          <motion.div
            key="victory"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg p-8 rounded-xl border border-structural bg-bg-elevated shadow-2xl text-center"
          >
            <h2 className="font-display text-3xl font-bold text-success mb-2">Victory!</h2>
            <p className="text-sm text-text-secondary mb-6">
              You defeated {world.guardian} and proved your Spanish mastery!
            </p>

            {/* Yuki's Tail Reveal Animation */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-text-secondary font-bold mb-3">
                Yuki's Power Unleashed: 9 Tails Revealed!
              </p>
              <div className="flex justify-center gap-1.5 mb-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: (idx: number) => ({
                        scale: [0, 1.3, 1],
                        opacity: 1,
                        transition: { delay: idx * 0.15, type: 'spring' }
                      })
                    }}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl"
                  >
                    🔥
                  </motion.div>
                ))}
              </div>
              <div className="h-32 w-32 mx-auto">
                <Kitsune3D direction="right" mode="wag" />
              </div>
            </div>

            {/* Rewards */}
            <div className="p-4 rounded-xl bg-bg-elevated-2 border border-structural flex items-center justify-around mb-6 font-hud">
              <div className="flex items-center gap-2 text-text-primary">
                <Coins className="h-5 w-5 text-accent-action" />
                <span className="font-display font-bold">+100 Coins</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <Trophy className="h-5 w-5 text-success" />
                <span className="font-display font-bold">Region Unlocked</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetBattle}
                className="flex-1 py-3 border border-structural text-text-primary font-semibold rounded-xl hover:bg-bg-elevated-2 cursor-pointer bg-bg-elevated transition-colors"
              >
                Challenge Again
              </button>
              <button
                onClick={() => navigate('/map')}
                className="flex-1 py-3 bg-accent-action text-bg-elevated font-semibold rounded-xl hover:bg-accent-action-hover shadow-md cursor-pointer border-none transition-colors"
              >
                Continue Map
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'defeat' && (
          <motion.div
            key="defeat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md p-8 rounded-xl border border-structural bg-bg-elevated shadow-2xl text-center"
          >
            <h2 className="font-display text-2xl font-bold text-error mb-2">Defeated</h2>
            <p className="text-sm text-text-secondary mb-6">
              The guardian's counter-attack was too strong this time! Don't worry, there are no penalties. Review your vocabulary and try again.
            </p>
            <div className="h-32 w-32 mx-auto mb-6 opacity-60">
              <Kitsune3D direction="left" mode="idle" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/map')}
                className="flex-1 py-3 border border-structural text-text-primary font-semibold rounded-xl hover:bg-bg-elevated-2 cursor-pointer bg-bg-elevated transition-colors"
              >
                Return to Map
              </button>
              <button
                onClick={resetBattle}
                className="flex-1 py-3 bg-accent-action text-bg-elevated font-semibold rounded-xl hover:bg-accent-action-hover shadow-md cursor-pointer border-none transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BossBattleScreen;
