# Task: Milestone 2 - Implement Guardian Click Routing & Progress Store Update
You are tasked with implementing the progress store changes and map routing updates.
Refer to the Explorer's findings and proposed patches at `.agents/explorer_routing/handoff.md`.

## Objective:
1. In `src/state/progressStore.ts`:
   - Add `defeatedGuardianWorldIds` string array and `defeatGuardian(worldId)` action to the state.
   - Update `isWorldUnlocked(worldId)` so a world is unlocked only if its prerequisite world's guardian is defeated (i.e. `defeatedGuardianWorldIds` contains `world.unlockRequirement`).
   - Update `reset` to clear `defeatedGuardianWorldIds`.
   - Update `partialize` to persist `defeatedGuardianWorldIds`.
2. In `src/screens/WorldMapScreen.tsx`:
   - Update `useTailCount` helper to count tails based on defeated guardians rather than quest completions.
   - In `RegionCard`, call `useNavigate()` hook. Get `defeatedGuardianWorldIds` and check if the current world's guardian is defeated.
   - Modify the Guardian Battle node (⚔️) click handler: select the node, and if `allDone` is true, navigate to `/boss?region=${world.id}`.
   - Update the details card button for the Guardian Battle: enable it when `allDone` is true.
   - Make the details card button route to `/boss?region=${world.id}` when clicked.
   - If `allDone` is true, the button label should be "Challenge Again" if the guardian is defeated, and "Challenge Guardian" if not. If `allDone` is false, it should show "Locked".
3. Ensure the project compiles successfully (run `npm run build` and `npm run lint`).
4. Document your changes and verification command/results in `handoff.md` in your working directory.

## MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
