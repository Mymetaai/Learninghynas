# Handoff Report - Guardian Progression and Routing Integration

## 1. Observation
We analyzed `src/state/progressStore.ts` and `src/screens/WorldMapScreen.tsx` for integrating guardian victories, world unlocking, boss routing, and tail counting.

* In `src/state/progressStore.ts` (lines 59–70):
```typescript
      isWorldUnlocked: (worldId) => {
        const world = getWorld(worldId);
        if (!world) return false;
        if (world.unlockRequirement === 'first') return true;
        // Unlock requirement is the previous world's id; unlocked when the
        // previous world's last quest is completed.
        const prevWorld = getWorld(world.unlockRequirement);
        if (!prevWorld) return false;
        const lastQuestId = prevWorld.quests.at(-1)?.id;
        if (!lastQuestId) return false;
        return get().completedQuestIds.includes(lastQuestId);
      },
```
* In `src/screens/WorldMapScreen.tsx` (lines 12–23):
```typescript
// ── Tail counter helper ──────────────────────────────────────────────────
const useTailCount = () => {
  const completed = useProgressStore((s) => s.completedQuestIds);
  let earned = 0;
  for (const world of ALL_WORLDS) {
    if (world.quests.length === 0) continue;
    const lastQuest = world.quests.at(-1);
    if (lastQuest && completed.includes(lastQuest.id)) {
      earned += world.tailsAwarded;
    }
  }
  return { earned, total: 9 };
};
```
* In `src/screens/WorldMapScreen.tsx` (lines 357–385):
```typescript
                  {/* Render Guardian Battle Node */}
                  {(() => {
                    const coord = coordinates[coordinates.length - 1];
                    if (!coord) return null;
                    const isSelected = activePinIdx === pins.length; // guardian node index

                    return (
                      <g
                        className="cursor-pointer group"
                        onClick={() => setSelectedPinIdx(pins.length)}
                      >
                        <rect
                          x={coord.x - 22}
                          y={coord.y - 22}
                          width="44"
                          height="44"
                          rx="10"
                          fill={allDone ? "var(--success)" : isSelected ? "var(--accent-action)" : "var(--bg-elevated)"}
                          stroke={allDone ? "var(--success)" : "var(--accent-action)"}
                          strokeWidth="2.5"
                          className="transition-transform group-hover:scale-110"
                          opacity={allDone ? 1 : 0.6}
                        />
                        <text x={coord.x} y={coord.y + 6} textAnchor="middle" fontSize="18" fill={allDone || isSelected ? "white" : "var(--accent-action)"}>
                          ⚔️
                        </text>
                      </g>
                    );
                  })()}
```
* In `src/screens/WorldMapScreen.tsx` (lines 415–439):
```typescript
              ) : (
                // Guardian Node Details Card
                <div className="bg-bg-elevated border border-structural rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-hud text-[9px] uppercase tracking-wider text-accent-action font-bold bg-accent-action/10 px-2 py-0.5 rounded">
                      Guardian Battle
                    </span>
                    <h3 className="font-display text-sm font-bold text-text-primary mt-1.5">{world.guardian}</h3>
                    <p className="font-body text-xs text-text-secondary mt-0.5">
                      {allDone ? 'You defeated the guardian and secured this tail!' : 'Challenge the guardian in a timed boss fight.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!allDone}
                    onClick={() => allDone && onPinTap(pins[pins.length - 1].quest.id)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl font-body text-xs font-bold transition-all shadow-sm border-none ${
                      allDone
                        ? 'bg-success hover:bg-success-hover text-white cursor-pointer hover:scale-103'
                        : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
                    }`}
                  >
                    {allDone ? 'Challenge Again' : 'Locked'}
                  </button>
                </div>
              )}
```

## 2. Logic Chain
1. To track guardian battles across worlds, `defeatedGuardianWorldIds` (string[]) needs to be kept in the persisted progress store. The action `defeatGuardian(worldId)` will append new victories to this list.
2. Under the new rules, `isWorldUnlocked(worldId)` should unlock a world only when the prerequisite world's guardian is defeated. In the content module (`src/content/worlds.ts`), `world.unlockRequirement` contains the string ID of the prerequisite world. Thus, checking `defeatedGuardianWorldIds.includes(world.unlockRequirement)` achieves this logic.
3. In `WorldMapScreen.tsx`, clicking the Guardian Battle node (⚔️) or details card button currently routes to `onPinTap(questId)` of the last lesson (Node 4). We must change this to route to `/boss?region={worldId}` via `useNavigate()`.
4. The details card button for the Guardian Battle must enable when all lessons are completed (`allDone` is true), and should display "Challenge Again" if already defeated (`isGuardianDefeated` is true) or "Challenge" if unlocked but not yet defeated.
5. In `WorldMapScreen.tsx`, tail counts are calculated by the `useTailCount` hook. Rather than summing tails based on the completion of the last quest in a world, we should check whether the world's ID is in `defeatedGuardianWorldIds`.

## 3. Caveats
* The investigation is read-only. We are proposing patches to be applied by the implementer.
* The `/boss` page is currently a placeholder (`BossBattleScreen.tsx`). The actual gameplay and victory triggers calling `defeatGuardian` will be wired up during boss battle implementation.

## 4. Conclusion
Integrating guardian progression requires adding state and actions to `useProgressStore` and refactoring `WorldMapScreen.tsx` (the tail counter hook, Guardian Battle node styling, click handlers, and Details Card display/actions) to consume `defeatedGuardianWorldIds`.

### Proposed Changes

#### Proposed Patch for `src/state/progressStore.ts`
```diff
diff --git a/src/state/progressStore.ts b/src/state/progressStore.ts
--- a/src/state/progressStore.ts
+++ b/src/state/progressStore.ts
@@ -9,4 +9,6 @@
 interface ProgressState {
   /** Quest ids the player has completed (set, but stored as array). */
   completedQuestIds: string[];
+  /** World ids where the guardian has been defeated. */
+  defeatedGuardianWorldIds: string[];
   /** Mark a quest complete and unlock the next one in its world. */
   completeQuest: (questId: string) => void;
+  /** Mark a guardian defeated for a world. */
+  defeatGuardian: (worldId: string) => void;
   /** Is this quest playable (unlocked) right now? */
   isQuestUnlocked: (questId: string) => boolean;
   /** Is this world's first quest accessible (its prerequisite world beaten)? */
   isWorldUnlocked: (worldId: string) => boolean;
   /** Reset all progress (fresh account / testing). */
   reset: () => void;
 }
 
 export const useProgressStore = create<ProgressState>()(
   persist(
     (set, get) => ({
       completedQuestIds: [],
+      defeatedGuardianWorldIds: [],
 
       completeQuest: (questId) =>
         set((state) => {
           if (state.completedQuestIds.includes(questId)) return state;
           return { completedQuestIds: [...state.completedQuestIds, questId] };
         }),
 
+      defeatGuardian: (worldId) =>
+        set((state) => {
+          if (state.defeatedGuardianWorldIds.includes(worldId)) return state;
+          return { defeatedGuardianWorldIds: [...state.defeatedGuardianWorldIds, worldId] };
+        }),
+
       isQuestUnlocked: (questId) => {
@@ -59,9 +65,5 @@
       isWorldUnlocked: (worldId) => {
         const world = getWorld(worldId);
         if (!world) return false;
         if (world.unlockRequirement === 'first') return true;
-        // Unlock requirement is the previous world's id; unlocked when the
-        // previous world's last quest is completed.
-        const prevWorld = getWorld(world.unlockRequirement);
-        if (!prevWorld) return false;
-        const lastQuestId = prevWorld.quests.at(-1)?.id;
-        if (!lastQuestId) return false;
-        return get().completedQuestIds.includes(lastQuestId);
+        // Unlock requirement is the previous world's id; unlocked when the
+        // previous world's guardian has been defeated.
+        return get().defeatedGuardianWorldIds.includes(world.unlockRequirement);
       },
 
-      reset: () => set({ completedQuestIds: [] }),
+      reset: () => set({ completedQuestIds: [], defeatedGuardianWorldIds: [] }),
     }),
     {
       name: 'wayfarer-progress',
       // Only persist the raw data, not the functions.
-      partialize: (state) => ({ completedQuestIds: state.completedQuestIds }),
+      partialize: (state) => ({
+        completedQuestIds: state.completedQuestIds,
+        defeatedGuardianWorldIds: state.defeatedGuardianWorldIds,
+      }),
     },
   ),
 );
```

#### Proposed Patch for `src/screens/WorldMapScreen.tsx`
```diff
diff --git a/src/screens/WorldMapScreen.tsx b/src/screens/WorldMapScreen.tsx
--- a/src/screens/WorldMapScreen.tsx
+++ b/src/screens/WorldMapScreen.tsx
@@ -12,11 +12,9 @@
 const useTailCount = () => {
-  const completed = useProgressStore((s) => s.completedQuestIds);
+  const defeatedGuardians = useProgressStore((s) => s.defeatedGuardianWorldIds);
   let earned = 0;
   for (const world of ALL_WORLDS) {
-    if (world.quests.length === 0) continue;
-    const lastQuest = world.quests.at(-1);
-    if (lastQuest && completed.includes(lastQuest.id)) {
-      earned += world.tailsAwarded;
-    }
+    if (defeatedGuardians.includes(world.id)) {
+      earned += world.tailsAwarded;
+    }
   }
   return { earned, total: 9 };
 };
@@ -123,4 +121,6 @@
 const RegionCard = ({
   world,
   pins,
   unlocked,
   regionIndex,
   onPinTap,
 }: RegionCardProps) => {
+  const navigate = useNavigate();
+  const defeatedGuardians = useProgressStore((s) => s.defeatedGuardianWorldIds);
+  const isGuardianDefeated = defeatedGuardians.includes(world.id);
+
   const allDone = pins.length > 0 && pins.every((p) => p.done);
@@ -358,25 +358,28 @@
                   {/* Render Guardian Battle Node */}
                   {(() => {
                     const coord = coordinates[coordinates.length - 1];
                     if (!coord) return null;
                     const isSelected = activePinIdx === pins.length; // guardian node index
 
                     return (
                       <g
                         className="cursor-pointer group"
-                        onClick={() => setSelectedPinIdx(pins.length)}
+                        onClick={() => {
+                          setSelectedPinIdx(pins.length);
+                          if (allDone) {
+                            navigate(`/boss?region=${world.id}`);
+                          }
+                        }}
                       >
                         <rect
                           x={coord.x - 22}
                           y={coord.y - 22}
                           width="44"
                           height="44"
                           rx="10"
-                          fill={allDone ? "var(--success)" : isSelected ? "var(--accent-action)" : "var(--bg-elevated)"}
-                          stroke={allDone ? "var(--success)" : "var(--accent-action)"}
+                          fill={isGuardianDefeated ? "var(--success)" : isSelected ? "var(--accent-action)" : "var(--bg-elevated)"}
+                          stroke={isGuardianDefeated ? "var(--success)" : "var(--accent-action)"}
                           strokeWidth="2.5"
                           className="transition-transform group-hover:scale-110"
                           opacity={allDone ? 1 : 0.6}
                         />
-                        <text x={coord.x} y={coord.y + 6} textAnchor="middle" fontSize="18" fill={allDone || isSelected ? "white" : "var(--accent-action)"}>
+                        <text x={coord.x} y={coord.y + 6} textAnchor="middle" fontSize="18" fill={isGuardianDefeated || isSelected ? "white" : "var(--accent-action)"}>
                           ⚔️
                         </text>
                       </g>
                     );
                   })()}
@@ -415,25 +418,25 @@
               ) : (
                 // Guardian Node Details Card
                 <div className="bg-bg-elevated border border-structural rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                   <div className="min-w-0">
                     <span className="font-hud text-[9px] uppercase tracking-wider text-accent-action font-bold bg-accent-action/10 px-2 py-0.5 rounded">
                       Guardian Battle
                     </span>
                     <h3 className="font-display text-sm font-bold text-text-primary mt-1.5">{world.guardian}</h3>
                     <p className="font-body text-xs text-text-secondary mt-0.5">
-                      {allDone ? 'You defeated the guardian and secured this tail!' : 'Challenge the guardian in a timed boss fight.'}
+                      {isGuardianDefeated ? 'You defeated the guardian and secured this tail!' : 'Challenge the guardian in a timed boss fight.'}
                     </p>
                   </div>
                   <button
                     type="button"
                     disabled={!allDone}
-                    onClick={() => allDone && onPinTap(pins[pins.length - 1].quest.id)}
+                    onClick={() => allDone && navigate(`/boss?region=${world.id}`)}
                     className={`shrink-0 px-4 py-2.5 rounded-xl font-body text-xs font-bold transition-all shadow-sm border-none ${
                       allDone
                         ? 'bg-success hover:bg-success-hover text-white cursor-pointer hover:scale-103'
                         : 'bg-structural/35 text-text-secondary/65 cursor-not-allowed'
                     }`}
                   >
-                    {allDone ? 'Challenge Again' : 'Locked'}
+                    {allDone ? (isGuardianDefeated ? 'Challenge Again' : 'Challenge') : 'Locked'}
                   </button>
                 </div>
               )}
```

## 5. Verification Method
1. Verify syntax and compilation by running:
   ```cmd
   cmd.exe /c "npm run build"
   ```
2. Run linter to ensure code style compliance:
   ```cmd
   cmd.exe /c "npm run lint"
   ```
3. To manually test the progression:
   * Play and complete all quests in a region (e.g. World 1, Pueblo Inicial).
   * Verify that the Guardian Battle node (⚔️) is unlocked, green outlines/fills represent completion only if defeated, and text changes to "Challenge" when lessons are completed.
   * Click either the ⚔️ node or the "Challenge" button and confirm redirection to `/boss?region=world-pre-a1`.
   * Simulate defeating the guardian (which adds `world-pre-a1` to `defeatedGuardianWorldIds`), and check that the "Kitsune's Path" tail counter increments by `world.tailsAwarded` (e.g. `1/9` tails).
   * Confirm that World 2 (Bosque de Verbos) is now unlocked.
