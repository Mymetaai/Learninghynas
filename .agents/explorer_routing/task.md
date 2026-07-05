# Task: Milestone 2 - Guardian Routing and progressStore Update Analysis
Investigate:
1. `src/state/progressStore.ts` - How to add `defeatedGuardianWorldIds` (an array of world IDs) and a method to update it (`defeatGuardian(worldId)`). Ensure that `isWorldUnlocked` is updated to check if the prerequisite world's guardian is defeated.
2. `src/screens/WorldMapScreen.tsx` - How to:
   - Route the Guardian Battle node (⚔️) click and details card button click to `/boss?region={worldId}` instead of `/quests?quest={questId}` or Quest 4.
   - Enable the details card button only if `allDone` is true (all lessons in the region completed).
   - Display "Challenge Again" on the map details card button if the guardian is already defeated.
   - Update the tail counter helper to count tails based on defeated guardians (`defeatedGuardianWorldIds`).

Provide a detailed recommendation and proposed patch in `handoff.md` in this directory.
Make sure you respect the non-negotiable constraint: no new colors/fonts/design token changes.
