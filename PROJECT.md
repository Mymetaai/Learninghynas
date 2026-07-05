# Project: Kitsune's Path - Boss Battle, Routing, and Match Pairs Fixes

## Architecture
- `src/components/exercises/MatchPairs.tsx`: The Match Pairs component renders two columns of words for matching exercises. Correctness is verified using word strings.
- `src/screens/WorldMapScreen.tsx`: The Adventure Map screen. It renders winding SVG paths of quest nodes and a Guardian Battle (⚔️) node at the end. Clicking the Guardian Battle details button navigates to the Boss Battle screen.
- `src/screens/BossBattleScreen.tsx`: A new playable screen showing a boss fight ("HP Duel") with Yuki, drawing questions from the region's exercises, using state stores for progress/rewards/lives, and displaying animations.
- `src/state/progressStore.ts`: Tracks completed quest IDs and now must support tracking defeated guardians.
- `src/state/statsStore.ts`: Tracks XP, coins, and streak.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| 1 | Match Pairs Shuffle Fix | Fix independent column shuffling in MatchPairs.tsx using Fisher-Yates and verify match logic works. | None | DONE |
| 2 | Guardian Click Routing & Progress Store Update | Update progressStore.ts to track defeated guardians; update WorldMapScreen.tsx to route Guardian node/details button to Boss Battle screen; enable button when all region quests are done. | None | DONE |
| 3 | Boss Battle HP Duel Implementation | Replace BossBattleScreen.tsx placeholder with full game: 8-HP Guardian bar, 3-life Player theme, combo system, timer, practice mode, victory/defeat flows, and Framer Motion effects. | Milestone 2 | DONE |
| 4 | Final E2E Verification & Audit | Verify all requirements manually or with automated verification scripts and pass the Forensic Audit. | Milestone 1, 2, 3 | DONE |

## Interface Contracts
### `progressStore` API Extension
- `defeatedGuardianWorldIds: string[]` - list of world IDs where the guardian has been defeated.
- `defeatGuardian: (worldId: string) => void` - adds a world ID to the defeated guardians list and saves state.
- `isWorldUnlocked: (worldId: string) => boolean` - updated to check if the prerequisite world's guardian is defeated.

### `BossBattleScreen` Navigation Interface
- Route: `/boss?region={worldId}`
- Query parameter: `region` matches the `id` of a `World` defined in `src/content/worlds.ts`.
