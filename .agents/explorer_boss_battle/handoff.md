# Handoff Report: Playable Boss Battle "HP Duel" Screen Design

This report outlines the read-only investigation, architectural strategy, and proposed code layout to transform the placeholder `src/screens/BossBattleScreen.tsx` into a playable, gamified "HP Duel" screen.

---

## 1. Observation

During our codebase investigation, we observed the following configuration and files:

1. **Current Screen Placeholder**:
   - Path: `src/screens/BossBattleScreen.tsx`
   - Content: A minimal placeholder utilizing `ScreenPlaceholder` (lines 3-9):
     ```typescript
     const BossBattleScreen = () => (
       <ScreenPlaceholder
         title="Boss Battle"
         builtIn="Step 16"
         description="Full-screen boss with a wax-seal health bar that cracks on correct answers; wrong answers trigger a harder counter, not a penalty."
       />
     );
     ```

2. **Routes and Navigation**:
   - Path: `src/screens/WorldMapScreen.tsx`
   - The boss battle is initiated using parameters specifying the region:
     - Line 371: `navigate(\`/boss?region=\${world.id}\`);`
     - Line 436: `navigate(\`/boss?region=\${world.id}\`);`
   - Path: `src/app/routes.ts`
     - Line 180: The boss route matches path `/boss` with ID `boss`.

3. **Curriculum and Worlds Data**:
   - Path: `src/content/worlds.ts`
     - Line 15: `worldPreA1` has ID `world-pre-a1`, level `'Pre-A1'`, quests `[preA1Quest1, preA1Quest2, preA1Quest3, preA1Quest4]`, and guardian `'The Gatekeeper'`.
     - Lines 26-84: Stubs for A1–C1 worlds (`worldA1` to `worldC1`) with empty `quests` arrays.
   - Path: `src/content/index.ts`
     - Line 25: `getWorld(id)` retrieves the world definition by ID.

4. **Quest and Exercise Formats**:
   - Path: `src/content/types.ts`
     - Lines 44-51: `ExerciseType` includes `'match' | 'drag-drop' | 'fill-blank' | 'reorder' | 'listening' | 'multiple-choice' | 'translation'`.
     - Lines 60-75: Interface `Exercise` contains fields `id`, `type`, `prompt`, `answer`, `options`, `distractorPool`, and `context`.
   - Path: `src/components/exercises/ExerciseCard.tsx`
     - Lines 69-150: Inner `ExerciseRenderer` component delegates rendering to specific components: `MultipleChoice`, `FillBlank`, `MatchPairs`, `ReorderList`, `TranslationInput`, `ListeningExercise`, and `DragDrop`.
     - Lines 39-42: `onAnswer` is wrapped in a 1.2-second delay:
       ```typescript
       const handleAnswer = (correct: boolean) => {
         setTimeout(() => onAnswer(correct), 1200);
       };
       ```

5. **State Stores**:
   - Path: `src/state/statsStore.ts`
     - Line 71: Defines `useStatsStore` managing coins and XP.
     - Line 97: `addRewards: (xp: number, coins: number) => void` updates XP and spendable coins.
   - Path: `src/state/progressStore.ts`
     - Line 33: Defines `useProgressStore` managing completed quests and defeated guardians.
     - Line 45: `defeatGuardian: (worldId: string) => void` marks a world's guardian as defeated.

6. **Design Tokens and Themes**:
   - Path: `src/index.css`
     - Cream background: `var(--bg-base)` (`#FBE9D0`)
     - Elevated background (white card): `var(--bg-elevated)` (`#FFFFFF`)
     - Terracotta accent action: `var(--accent-action)` (`#E64833`)
     - Slate navy text: `var(--text-primary)` (`#244855`)
     - Success green: `var(--success)` (`#2E7D32`)
     - Error red: `var(--error)` (`#C62828`)
     - Glass surfaces: Class `.glass-surface` for translucency.

7. **Yuki Companion Character**:
   - Path: `src/components/Kitsune3D.tsx`
     - Renders Yuki in 3D using Three.js.
     - Takes props: `direction: 'left' | 'right'` and `mode: 'idle' | 'walk' | 'wag'`.

---

## 2. Logic Chain

From these observations, we formulate the layout and logic design:

1. **Question Retrieval**:
   - We extract the query parameter `region` using standard `useSearchParams`.
   - We query the world using `getWorld(regionId)`.
   - We extract all exercises: `const rawExercises = world.quests.flatMap(q => q.exercises)`.
   - Since stub worlds (A1–C1) have empty quests, we fall back to `world-pre-a1` exercises if `rawExercises` is empty, ensuring the screen is always playable.

2. **Exercise Rendering & Answer Handler**:
   - By rendering `ExerciseCard` directly, we leverage the prebuilt multiple choice, match pairs, fill-in-blank, translation, and listening templates.
   - The 1.2-second delay built into `ExerciseCard` allows the card to animate correct/incorrect answers visually before our `onAnswer` handler is called.
   - When our `onAnswer` handler fires:
     - If correct: increment combo. If combo $\ge 3$, deal 2 damage to the guardian (else deal 1). Mark hit flash on the guardian.
     - If incorrect: reset combo. Decrement player lives. Mark shake on the player life panel.
     - If guardian HP $\le 0$, transition to `victory`.
     - If player lives $\le 0$, transition to `defeat`.
     - If the game is still playing, we advance the exercise index.

3. **Soft Timer & Toggle**:
   - A timer is run inside a `useEffect` using `setInterval` that counts down from 20 seconds.
   - If the timer hits 0, it counts as an incorrect answer, deducting a player life and moving to the next exercise.
   - A toggle button in the HUD lets the user turn `timerEnabled` on or off. If off, the timer interval is cleared and not displayed.

4. **Victory Flow**:
   - Call `useStatsStore.getState().addRewards(0, 100)` to grant 100 coins.
   - Call `useProgressStore.getState().defeatGuardian(world.id)` to mark the guardian defeated.
   - Play Yuki's tail-reveal animation: Animate a staggered grid of 9 tail components fading/scaling in sequentially to celebrate Yuki's full power.
   - Show a success summary with coins granted, a "Challenge Again" button (resets state), and a button to return to `/map`.

5. **Defeat Flow**:
   - Display a supportive message: *"Don't worry! Every battle brings you closer to Spanish mastery. Yuki is ready to train with you again!"*
   - Provide a "Try Again" button (resets state) and a button to return to `/map` with no penalty.

6. **Styling and Tokens Compliance**:
   - Strictly apply Tailwind colors matching `--bg-base`, `--text-primary`, and `--accent-action`. Avoid introducing any custom hex codes or external fonts.

---

## 3. Caveats

- **Exercise Bank Size**: If a world has very few exercises, the index loop might recycle questions. Shuffling on battle start is recommended.
- **Kitsune3D Mode**: During victory, we use `mode="wag"` for the 3D Kitsune component to reflect celebration. Any physical tail animation inside the 3D model itself is handled by `Kitsune3D`, but we supplement it with a stunning 2D tail-reveal animation in the overlay.
- **Soft Timer**: Since the timer is soft, it triggers a normal incorrect penalty (losing 1 fox life) but does not immediately end the battle unless the player runs out of lives.

---

## 4. Conclusion

We can successfully implement theplayable "HP Duel" screen by completely replacing the placeholder in `src/screens/BossBattleScreen.tsx` with a dual-pane interface: a top pane showcasing the boss duel metrics (8-segment HP bar, 3 fox lives, soft timer ring, combo badge) and a bottom pane rendering the current active quest exercise.

---

## 5. Remaining Work (Handoff to Implementer)

The implementer must rewrite `src/screens/BossBattleScreen.tsx` with the following proposed code structure.

### Proposed Code Layout

```tsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Coins, Flame, ArrowLeft, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
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
  const exercises = useMemo(() => {
    let raw = world.quests.flatMap((q) => q.exercises);
    // Fallback to pre-a1 questions if stub region has no exercises
    if (raw.length === 0) {
      const defaultWorld = getWorld('world-pre-a1');
      raw = defaultWorld ? defaultWorld.quests.flatMap((q) => q.exercises) : [];
    }
    return shuffle(raw);
  }, [world]);

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
  }, [gameState, timerEnabled, currentIndex, isAnswered]);

  const handleTimeout = () => {
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
  };

  const triggerHitFlash = () => {
    setIsHitFlashing(true);
    setTimeout(() => setIsHitFlashing(false), 500);
  };

  const triggerPlayerShake = () => {
    setIsPlayerShaking(true);
    setTimeout(() => setIsPlayerShaking(false), 500);
  };

  const goToNextExercise = () => {
    setCurrentIndex((prev) => (prev + 1) % exercises.length);
    setTimeLeft(20);
    setIsAnswered(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (gameState !== 'playing' || isAnswered) return;
    setIsAnswered(true);

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
  };

  const triggerVictory = () => {
    setGameState('victory');
    // Grant rewards
    addRewards(0, 100);
    // Mark world guardian defeated
    defeatGuardian(world.id);
  };

  const resetBattle = () => {
    setGuardianHp(8);
    setPlayerLives(3);
    setCurrentIndex(0);
    setComboCount(0);
    setTimeLeft(20);
    setIsAnswered(false);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] px-4 py-8 flex flex-col items-center justify-center font-body">
      {/* HUD Top Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--structural)] bg-white text-sm font-semibold hover:bg-[var(--bg-elevated-2)] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Map
        </button>
        <h1 className="font-display text-xl font-bold">{world.name} Boss Battle</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span>Soft Timer</span>
            <button
              onClick={() => setTimerEnabled((prev) => !prev)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                timerEnabled ? 'bg-[var(--accent-action)]' : 'bg-[var(--structural)]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
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
            className="w-full max-w-md p-6 rounded-xl border border-[var(--structural)] bg-white shadow-xl text-center"
          >
            <div className="h-32 w-32 mx-auto mb-4">
              <Kitsune3D direction="right" mode="idle" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Challenge {world.guardian}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Test your Spanish skills in an HP Duel! Beat the guardian to unlock the next region.
            </p>
            <button
              onClick={() => setGameState('playing')}
              className="w-full py-3 bg-[var(--accent-action)] text-white font-semibold rounded-xl hover:bg-[var(--accent-action-hover)] shadow-md cursor-pointer border-none"
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
                animate={isHitFlashing ? { backgroundColor: ['#FFFFFF', '#C62828', '#FFFFFF'], scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl border border-[var(--structural)] bg-white shadow-md relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-base font-bold">{world.guardian}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-800">BOSS</span>
                </div>

                {/* 8-segment Guardian HP bar */}
                <div className="grid grid-cols-8 gap-1 mb-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isHitFlashing && i >= guardianHp ? { scale: [1, 0, 1] } : {}}
                      className={`h-4 rounded-sm transition-all ${
                        i < guardianHp
                          ? 'bg-[var(--accent-action)] shadow-sm'
                          : 'bg-[var(--bg-elevated-2)] border border-[var(--structural)]'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-right text-xs text-[var(--text-secondary)] font-bold">
                  HP: {guardianHp}/8
                </div>
              </motion.div>

              {/* Player Fox Lives Panel */}
              <motion.div
                animate={isPlayerShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-xl border border-[var(--structural)] bg-white shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-base font-bold">Yuki's Fox Lives</span>
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
                <div className="text-xs text-[var(--text-secondary)]">
                  Don't let Yuki lose all her spirit lives!
                </div>
              </motion.div>

              {/* Soft Timer Ring & Combo Status */}
              <div className="p-4 rounded-xl border border-[var(--structural)] bg-white shadow-md flex items-center justify-around">
                {/* Draining Ring Timer */}
                {timerEnabled ? (
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="var(--structural)"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="var(--accent-action)"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 * (1 - timeLeft / 20)}
                        transition={{ duration: 1, ease: 'linear' }}
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-[var(--text-primary)]">
                      {timeLeft}s
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl text-[var(--text-secondary)]">∞</span>
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase">Timer Paused</span>
                  </div>
                )}

                <div className="h-10 w-px bg-[var(--structural)]" />

                {/* Combo Fire Indicator */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Flame className={`h-5 w-5 ${comboCount >= 3 ? 'text-[var(--accent-action)] animate-pulse' : 'text-gray-300'}`} />
                    <span className="font-display font-bold text-lg">{comboCount}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase">Combo Streak</span>
                </div>
              </div>

              {/* Fox Fire Combo Toast/Badge */}
              <AnimatePresence>
                {showComboToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3 bg-[var(--accent-action)] text-white text-center font-display font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
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
                  />
                  {isAnswered && (
                    <div className="absolute inset-0 bg-transparent cursor-not-allowed z-50" />
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
            className="w-full max-w-lg p-8 rounded-xl border border-[var(--structural)] bg-white shadow-2xl text-center"
          >
            <h2 className="font-display text-3xl font-bold text-[var(--success)] mb-2">Victory!</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              You defeated {world.guardian} and proved your Spanish mastery!
            </p>

            {/* Yuki's Tail Reveal Animation */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mb-3">
                Yuki's Power Unleashed: 9 Tails Revealed!
              </p>
              <div className="flex justify-center gap-1.5 mb-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: (idx) => ({
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
            <div className="p-4 rounded-xl bg-[var(--bg-elevated-2)] border border-[var(--structural)] flex items-center justify-around mb-6">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-amber-500" />
                <span className="font-display font-bold">+100 Coins</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-display font-bold">Region Unlocked</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetBattle}
                className="flex-1 py-3 border border-[var(--structural)] text-[var(--text-primary)] font-semibold rounded-xl hover:bg-[var(--bg-elevated-2)] cursor-pointer bg-white"
              >
                Challenge Again
              </button>
              <button
                onClick={() => navigate('/map')}
                className="flex-1 py-3 bg-[var(--accent-action)] text-white font-semibold rounded-xl hover:bg-[var(--accent-action-hover)] shadow-md cursor-pointer border-none"
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
            className="w-full max-w-md p-8 rounded-xl border border-[var(--structural)] bg-white shadow-2xl text-center"
          >
            <h2 className="font-display text-2xl font-bold text-[var(--error)] mb-2">Defeated</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              The guardian's counter-attack was too strong this time! Don't worry, there are no penalties. Review your vocabulary and try again.
            </p>
            <div className="h-32 w-32 mx-auto mb-6 opacity-60">
              <Kitsune3D direction="left" mode="idle" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/map')}
                className="flex-1 py-3 border border-[var(--structural)] text-[var(--text-primary)] font-semibold rounded-xl hover:bg-[var(--bg-elevated-2)] cursor-pointer bg-white"
              >
                Return to Map
              </button>
              <button
                onClick={resetBattle}
                className="flex-1 py-3 bg-[var(--accent-action)] text-white font-semibold rounded-xl hover:bg-[var(--accent-action-hover)] shadow-md cursor-pointer border-none"
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
```

---

## 6. Verification Method

To verify the integration independently:

1. **Static compilation check**:
   Run the TypeScript compiler build target to verify there are no import errors or typings mismatch:
   ```bash
   npm run build
   ```
2. **Linter conformance**:
   Verify code adheres to the project guidelines with no unused variables or formatting deviations:
   ```bash
   npm run lint
   ```
3. **Execution inspect**:
   Open a browser to `/boss?region=world-pre-a1` and verify:
   - HP bar segments match the 8 points and correctly subtract 1 (or 2 on combo).
   - Lives are represented as fox emoji and shake when a mistake is made.
   - The 20-second timer circle drains smoothly and pauses/resumes correctly when the toggle is clicked.
   - Victory grants 100 coins in `statsStore` and registers completion.
