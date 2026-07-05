# Guardian Battle — Bug Fixes + Boss Battle Game Design

For Antigravity. Covers: (1) the sword-icon routing bug, (2) a fully
specified boss battle mini-game to replace the current placeholder,
(3) the matching-quiz shuffle bug.

---

## 1. BUG: Clicking the Guardian (sword) node returns to Node 4 instead of opening a battle

### Symptom
On the Pueblo Inicial region card, tapping the sword icon (Guardian Battle
node) navigates back to Node 4 instead of launching a battle screen.

### Most likely root causes (check in this order)

1. **The sword node's onClick reuses the same handler as regular lesson
   nodes**, which navigates to `/quests?quest={lastNodeId}` instead of a
   distinct `/battle?region={regionId}` route. If the Guardian node's `id`
   was generated as `node_4` internally (off-by-one from being "the node
   after node 4") rather than its own `guardian` type, the shared handler
   will route to node 4's quest by accident.
2. **No dedicated route exists yet for battles**, so whatever `onClick`
   was wired up silently falls back to the last valid node.
3. **The node's `type` field is missing or mistyped** (e.g. `"type": "lesson"`
   instead of `"type": "guardian_battle"`), so the render/click logic
   can't tell it apart from a normal node and defaults to lesson behavior.

### Fix pattern

```ts
// In whatever renders the node list, each node needs an explicit type
// and its own navigation target — don't let it inherit the previous
// node's handler.

function handleNodeClick(node: PathNode) {
  if (node.type === "guardian_battle") {
    navigate(`/battle/${node.regionId}`);
    return;
  }
  if (node.status === "locked") return; // no-op, or show a toast
  navigate(`/quests?quest=${node.questId}`);
}
```

```ts
// Route registration — add this if it doesn't exist
<Route path="/battle/:regionId" element={<GuardianBattleScreen />} />
```

Verify: log `node.type` and `node.id` on click for the sword icon
specifically. If it logs a lesson-shaped id instead of a guardian-shaped
one, the data model is the bug, not the router.

---

## 2. Boss Battle Game Design — "HP Duel"

### Why this format specifically

Two real, tested precedents back this design:

- Duolingo's Legendary challenges succeed with a simple constraint: a
  fixed mistake budget (3 mistakes and you're out), the same for every
  user, with no hints. It's proven at massive scale and is trivial to
  implement.
- An indie Pokémon-style quiz RPG (LennyRPG, built and documented
  publicly) used 3 questions per opponent, XP tied directly to
  correctness, and occasional bonus questions for variance — and reported
  it "fun and low-stress but still competitive" in actual playtesting.

Both point the same direction: **small, fixed question count + a visible
health/mistake budget + light randomness**, not a long timed exam.

### The mechanic

**Setup**
- Guardian has an HP bar with a fixed number of "hit segments" equal to
  the number of questions in the battle (recommend 8, matching your
  existing quiz length shown in the Quest Quiz screen).
- Player has 3 Fox Lives (hearts) — matches Yuki's fox theme directly,
  reuse the existing fox icon from the tail counter.

**Turn loop**
1. Question appears (reuse existing quiz question types — match pairs,
   multiple choice, fill-in-blank — pulled from the region's vocabulary
   pool, not the whole course).
2. Correct answer → Guardian loses 1 HP segment, with a brief "hit" flash
   and a small fox-fire particle effect on the Guardian sprite.
3. Wrong answer → player loses 1 Fox Life, brief "damage" shake on the
   player's health icons. No hint is given (matches Legendary's no-hint
   rule — this is the "boss fight," lessons are where hints belong).
4. **Combo bonus**: 3+ correct answers in a row deals +1 extra HP segment
   of damage on the next hit ("Fox Fire Combo!" toast). This rewards
   accuracy without requiring a hard timer.
5. Battle ends when either Guardian HP hits 0 (victory) or all 3 Fox
   Lives are lost (defeat, no penalty beyond "review and retry").

**Timing**
- Soft per-question timer (recommend 20 seconds) that shows as a slowly
  draining ring around the question card, not a harsh countdown. Add a
  "no-timer practice mode" toggle for accessibility and for anxious users
  — timed pressure should be optional, not mandatory, given how much
  Duolingo's own forums complain about strict timers causing users to
  quit mid-challenge.
- No timer at all on Fox Lives — losing a life is about correctness, not
  speed.

**Victory flow**
- Guardian defeat animation → this is where the existing "tail-reveal
  moment" from the Adventure design doc should trigger (Yuki visibly
  gains a tail) → coin reward (100 KC per the existing economy) → return
  to region card, which now shows "Challenge Again" as in your screenshot.

**Defeat flow**
- No punishment. Short encouraging line from Yuki in-voice ("¡Casi! That
  guardian's tough — go polish up in the lessons and try again.") →
  return to region card, Guardian node stays unlocked for retry.

### Data shape

```json
{
  "battleId": "guardian_pueblo_inicial",
  "guardianName": "The Gatekeeper",
  "guardianMaxHP": 8,
  "playerLives": 3,
  "questionPool": ["a1_01_q3", "a1_02_q1", "a1_02_q5", "..."],
  "comboThreshold": 3,
  "comboBonusDamage": 1,
  "timerSecondsPerQuestion": 20,
  "practiceModeAvailable": true,
  "rewards": { "coins": 100, "tailsAwarded": 1 }
}
```

---

## 3. BUG: Match-the-pairs quiz isn't shuffled

### Symptom
In the screenshot, Spanish words and English meanings are in the exact
same visual row order (perro/dog, gato/cat, pájaro/bird, pez/fish),
making the exercise trivial — the user can match by position, not by
actually recalling the word.

### Root cause
The right-hand column is almost certainly rendered directly from the same
array as the left-hand column, in the same order, with no shuffle applied
before render.

### Fix

Shuffle the right-hand column independently, every time the exercise
loads or is retried — using Fisher-Yates, not `Array.sort(() => Math.random() - 0.5)`
(the sort-random trick is a known biased shuffle, don't use it):

```ts
function fisherYatesShuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// On exercise mount (and again on every retry, not just once):
const leftColumn = fisherYatesShuffle(pairs.map(p => p.word));
const rightColumn = fisherYatesShuffle(pairs.map(p => p.meaning));
```

**Important data-modeling note**: make sure the "correct answer" check is
based on a stable `pairId` stored on each item, not on array index or
visual position. If correctness is currently checked by comparing
positions, shuffling will break the exercise instead of fixing it —
each word/meaning needs an id that survives the shuffle, e.g.:

```ts
type Pair = { pairId: string; word: string; meaning: string };
// check: selectedWord.pairId === selectedMeaning.pairId
```

Apply the same shuffle-on-every-attempt fix to any other pool-based
exercise type that reuses a fixed pair list (this bug pattern likely
isn't unique to just this one quiz).

---

## Sources reviewed
- Duolingo Legendary Levels — mistake-limit and no-hint mechanics (duoplanet.com, duolingo.fandom.com)
- "How I built LennyRPG" — real build log of a quiz-based Pokémon-style RPG, HP/XP/combo design (lennysnewsletter.com)
- Quizlet gamification breakdown — competitive timed matching modes (yukaichou.com)
