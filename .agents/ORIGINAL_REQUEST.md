# Original User Request

## 2026-07-05T09:28:51Z

Implement Guardian Battle node fixes and Boss Battle "HP Duel" gameplay, and resolve the match-pairs quiz shuffle issue on the Kitsune's Path web application.

Working directory: `c:\Users\ROHITGUPTA\OneDrive - Bar Code India Ltd\Desktop\Web`
Integrity mode: development

## Requirements

### R1. Fix Guardian Battle Node Click Routing
- Clicking on the Guardian Battle (sword ⚔️) node in `WorldMapScreen.tsx` must navigate to the Boss Battle screen (`/boss?region={worldId}`) instead of routing to Quest/Node 4.
- In `WorldMapScreen.tsx`, ensure the Guardian Node details card button enables when all lessons in the region are completed (`allDone` is true), and clicking it routes to the Boss Battle screen.

### R2. Implement Boss Battle "HP Duel" Screen
- Replace the placeholder `BossBattleScreen.tsx` with a fully playable boss battle mini-game.
- **Guardian HP Bar**: Display a health bar with hit segments equal to the number of questions (8 segments).
- **Player Hearts**: Display 3 Fox Lives (hearts) using Yuki's fox theme.
- **Turn Loop**: 
  1. Show quiz questions (match pairs, multiple choice, fill-in-blank) randomly selected from the region's/world's vocabulary/exercise pool (e.g., world.quests.flatMap(q => q.exercises)).
  2. Correct answer: Guardian loses 1 HP segment, with a visual hit effect and a small particle/motion effect.
  3. Wrong answer: Player loses 1 Fox Life (heart), with a damage shake effect. No hints are shown.
- **Combo Bonus**: 3+ correct answers in a row deals +1 extra HP segment of damage on the next hit, displaying a "Fox Fire Combo!" toast/badge.
- **Timer**: 20-second soft timer shown as a draining ring. Provide a toggle to turn the timer off (practice/accessibility mode).
- **Victory Flow**: Trigger Yuki's tail-reveal animation (Yuki gains a tail), reward 100 coins in `statsStore`, mark the region's guardian as defeated by adding it to `defeatedGuardianWorldIds` in `progressStore`, and return to the map. The map should now display "Challenge Again" and unlock the next world.
- **Defeat Flow**: Return to the map with no penalties; the node stays unlocked for retry. Yuki says an encouraging line.

### R3. Fix Match-the-Pairs Shuffling Bug
- Modify the Match Pairs exercise (`MatchPairs.tsx`) to shuffle the left-hand and right-hand columns independently on mount and retry using a stable Fisher-Yates algorithm.
- Ensure the correctness logic uses unique IDs (like `pairId` or word strings) rather than array indices to check matches.

### R4. Premium Visuals and Motion
- Utilize Framer Motion and modern Tailwind styling to make the Boss Battle feel high-end, responsive, and animated (e.g. hearts shaking, boss flashing, combo popup, tail-reveal animations). Use the locally created design skills (`motion-framer` and `ui-ux-pro-max`) to inform styling and interaction choices.

## Acceptance Criteria

### Shuffling
- [ ] Spanish words and English meanings in Match Pairs do not appear in the same visual order; columns are shuffled independently.
- [ ] Matching pairs works correctly after shuffling.

### Routing
- [ ] Clicking the Guardian Battle node/button on the World Map routes to `/boss?region=world-pre-a1`.

### Boss Battle Gameplay
- [ ] Boss Battle screen correctly displays Yuki's 3 Fox Lives and the Guardian's 8-segment HP bar.
- [ ] Correct answers reduce Guardian HP; wrong answers reduce Player Lives without displaying hints.
- [ ] 3 consecutive correct answers trigger a combo bonus (+1 extra damage on the next hit).
- [ ] Draining soft timer displays; toggling practice mode disables it.
- [ ] Defeating the boss displays Yuki gaining a tail, rewards 100 coins, unlocks the next region on the map, and lets the user "Challenge Again".
- [ ] Defeat displays an encouraging message and returns to the map without locking the node.

## Verification Plan

### Manual Verification
- Start the application locally using `npm run dev`.
- Complete the exercises in the first region to unlock the Guardian node.
- Select the Guardian Battle node, verify details show "Guardian Battle: The Gatekeeper" and the button says "Challenge Guardian".
- Play the Boss Battle: verify the lives, HP bar, timer, and practice mode toggle.
- Verify correct/wrong answers trigger the corresponding effects (HP depletion vs life loss).
- Verify combo trigger.
- Complete victory: verify tail count incremented, coins increased, next region unlocked, and "Challenge Again" shown.
- Verify Match Pairs exercises in standard lessons are properly shuffled.

## Follow-up — 2026-07-05T09:40:06Z

The user has added a setup file: `antigravity-ui-skills-setup-and-prompt.md` in the workspace root. Ensure that you and the team adhere to it:
1. Use the local `ui-ux-pro-max` and `motion-framer` skills for every UI/UX and animation task (especially for the Boss Battle HP Duel screen).
2. Do not introduce a new color palette, font, or design language. Use the existing cream/navy/terracotta light theme tokens (`bg-base`, `bg-elevated`, `text-primary`, `accent-action`, `info`, `success`, `structural`).
3. For animations and micro-interactions (hearts shaking, boss flashing, combo popup, tail-reveal), use Motion (Framer Motion) components.
4. Keep us updated on the implementation progress of the Match Pairs shuffle fix, Guardian node routing, and Boss Battle screen.

## Follow-up — 2026-07-05T09:42:39Z

Important update from the user:
The user emphasized that the 'non-negotiable constraint' section is the most important constraint. Since `ui-ux-pro-max` and `21st.dev` are built to suggest their own colors/fonts/styles by default, they must be explicitly overridden. We risk swapping out the entire visual identity of the app. Ensure that you point the team at one screen at a time, check the output/design carefully, and strictly enforce the existing cream/navy/terracotta light theme tokens (no new colors/fonts). Do not proceed to the next screen until the output has been verified.
