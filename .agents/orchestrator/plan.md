# Kitsune's Path Implementation & Verification Plan

## Task Decomposition
We will address the task through 3 main development milestones and 1 final verification milestone.

### Milestone 1: Match Pairs Shuffle Fix
- **File to Edit**: `src/components/exercises/MatchPairs.tsx`
- **Objective**:
  - Shuffle the left-hand and right-hand columns independently on mount and retry.
  - Use a stable, correct Fisher-Yates algorithm.
  - Maintain correct matching logic using word strings (avoid index-based checks).
- **Subagents**:
  - **Explorer**: Analyze current file, recommend changes.
  - **Worker**: Implement shuffling logic, run compilation/checks.
  - **Reviewer**: Verify visual and logical isolation, test matches.
  - **Auditor**: Integrity verification.

### Milestone 2: Guardian Click Routing & Progress Store Update
- **Files to Edit**: `src/state/progressStore.ts`, `src/screens/WorldMapScreen.tsx`
- **Objective**:
  - Add `defeatedGuardianWorldIds` array and `defeatGuardian` action to `ProgressState` in `progressStore.ts`.
  - Update `isWorldUnlocked` logic to depend on the prerequisite world's guardian being defeated.
  - In `WorldMapScreen.tsx`, make the Guardian node (⚔️) route to `/boss?region={worldId}` on click instead of Quest/Node 4.
  - Ensure the Guardian details card button is disabled unless `allDone` is true, and routes to `/boss?region={worldId}`.
  - Display "Challenge Again" if the guardian is already defeated.
  - Update tail counter helper to count tails based on defeated guardians instead of quest completion.
- **Subagents**:
  - **Explorer**: Determine exact store edits and details card button properties.
  - **Worker**: Implement store and routing changes, compile checks.
  - **Reviewer**: Review routing correctness, typescript typing, and state logic.

### Milestone 3: Boss Battle HP Duel Screen
- **File to Edit**: `src/screens/BossBattleScreen.tsx`
- **Objective**:
  - Implement full gameplay screen.
  - **Guardian HP Bar**: 8 segments.
  - **Player Lives**: 3 hearts (using Yuki's fox theme).
  - **Turn Loop**:
    1. Retrieve exercises randomly from the world's vocabulary/exercise pool (`world.quests.flatMap(q => q.exercises)`).
    2. Display matching, multiple choice, or fill-in-blank questions.
    3. Correct: Boss loses 1 HP segment, visual hit effect, motion/particles.
    4. Wrong: Player loses 1 heart, shake effect. No hints.
  - **Combo Bonus**: 3+ consecutive correct answers -> +1 extra damage on the next hit, displaying "Fox Fire Combo!" toast/badge.
  - **Timer**: 20-second soft timer shown as a draining ring. Toggle to disable (practice/accessibility).
  - **Victory Flow**: Tail-reveal animation (Yuki gains a tail), reward 100 coins in `statsStore`, mark guardian defeated in `progressStore`, return to map (unlocking next region).
  - **Defeat Flow**: Return to map without penalties, node stays unlocked, encouraging line from Yuki.
  - **Premium visuals**: Framer motion animations for hearts shaking, boss flashing, combo popup, tail-reveal.
- **Subagents**:
  - **Explorer**: Inspect layout, styles, and store interactions.
  - **Worker**: Implement complete screen UI, states, game loop, and animations.
  - **Reviewer**: Code review, testing game scenarios (victory/defeat/combo/timer/practice toggle).

### Milestone 4: Final E2E Verification & Audit
- Perform final integrity audit and full verification check.

## Visual Theme & Design Constraints (Non-Negotiable)
- **NO New Colors/Fonts**: Do not introduce any new visual styling or themes. Ensure we strictly use the existing cream/navy/terracotta light theme tokens:
  - `bg-base`, `bg-elevated`, `text-primary`, `accent-action`, `info`, `success`, `structural`.
- **Framer Motion ONLY**: Implement all micro-interactions and transitions (e.g. hearts shaking, boss flashing, combo badge popup, tail-reveal) using Framer Motion components as guided by `motion-framer/SKILL.md`.
- **Sequential Verification**: Point the team at one screen/component at a time. The next screen will NOT be started until the current screen's changes are verified against the design tokens and functionality constraints.

## Verification Protocol
All worker deliverables must be verified by running `npm run build` and checking console logs.
Challengers will test edge cases.
Auditors will run integrity checks.

