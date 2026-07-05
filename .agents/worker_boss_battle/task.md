# Task: Milestone 3 - Implement Boss Battle HP Duel Screen
You are tasked with implementing the Boss Battle game screen in `src/screens/BossBattleScreen.tsx`.
Refer to the Explorer's findings and proposed code layout at `.agents/explorer_boss_battle/handoff.md`.

## Objective:
1. Replace the placeholder in `src/screens/BossBattleScreen.tsx` with a fully playable boss battle mini-game.
2. Implement:
   - **Guardian HP Bar**: 8 segments. Correct answer reduces HP.
   - **Player Lives**: 3 hearts (using Yuki's fox theme: e.g. 🦊 emoji or custom theme). Wrong answer reduces lives. No hints.
   - **Turn Loop**: Retrieve exercises randomly from the world's vocabulary/exercise pool (`world.quests.flatMap(q => q.exercises)`). Display the matching, multiple choice, or fill-in-blank questions using `<ExerciseCard>`.
   - **Combo Bonus**: 3+ correct answers in a row -> next hit deals +1 extra damage (+2 total), showing "Fox Fire Combo!" toast/badge.
   - **Timer**: 20-second soft timer shown as a draining ring, and a toggle to turn it off (practice/accessibility).
   - **Victory Flow**: Tail-reveal animation (Yuki gains 9 tails sequentially), reward 100 coins in `statsStore`, mark guardian defeated in `progressStore`, return to map (unlocking next region).
   - **Defeat Flow**: Return to map without penalties, node stays unlocked, encouraging line from Yuki.
3. Apply Tailwind classes using existing tokens (`bg-bg-base`, `bg-bg-elevated`, `bg-bg-elevated-2`, `text-text-primary`, `text-text-secondary`, `bg-accent-action`, `hover:bg-accent-action-hover`, `border-structural`, `bg-success`, `bg-error`) instead of hardcoded hex codes or arbitrary `[var(...)]` where possible.
4. Implement all animations (hearts shaking, boss flashing, combo popup, tail-reveal) using Framer Motion components as guided by `motion-framer/SKILL.md`.
5. Ensure the project compiles successfully (run `npm run build` and `npm run lint`).
6. Document your changes and verification command/results in `handoff.md` in your working directory.

## MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
