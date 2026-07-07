# Adventure Path Restructure — Chapters + Sentinel Fights

Extends adventure-tab-design.md and guardian-battle-and-shuffle-fix.md.
Do not re-litigate the 9-tail total — this spec preserves it.

## Problem being solved

Each CEFR level previously showed only 4 lesson nodes + 1 boss. With the
vocabulary population project bringing each level up to its real word
count (hundreds to thousands of words), 4 nodes per level is nowhere near
enough. But a boss fight every 10 lessons, if each one awarded a tail,
would produce 30+ tails total — breaking the "Nine-Tailed Kitsune"
identity, which depends on there being exactly 9.

## The fix: two tiers of boss encounter

### Tier 1 — Sentinel fights (NEW)
- Occur every 10 lesson nodes, within a level.
- Smaller than a Guardian fight: same "HP Duel" mechanic from
  guardian-battle-and-shuffle-fix.md, but shorter (recommend 5 questions
  instead of 8, Guardian HP scaled down accordingly).
- Reward: coins only (recommend 50 KC) + a small chapter-completion badge
  icon. No tail. No name like "The Gatekeeper" — keep these nameless or
  give them a minor title like "Forest Sentinel," "Path Warden" — lower
  narrative weight than a named Guardian on purpose.
- If a level has 10 or fewer total lessons, skip the Sentinel entirely —
  go straight from lesson nodes to the level's main Guardian. Don't force
  a Sentinel fight into a level too short to need one.

### Tier 2 — Guardian fights (EXISTING, unchanged)
- Exactly one per CEFR level, after the last lesson node in that level.
- Already-named bosses (The Gatekeeper, The Conjugation Spirit, etc.)
  stay exactly as previously specified.
- Tail reward per level is UNCHANGED from the existing distribution:

| Level | Tails |
|---|---|
| Pre-A1 | 1 |
| A1 | 1 |
| A2 | 1 |
| B1 | 2 |
| B2 | 2 |
| C1 | 2 |

Total = 9. This number does not change regardless of how many Sentinel
fights are added within a level.

## Chapter chunking (new organizational layer)

Introduce a "chapter" grouping within each level so the trail doesn't
render 100+ nodes on one endless scroll:

- Each chapter = up to 10 lesson nodes + 1 Sentinel fight at the end
  (except the level's final chapter, which ends in the Guardian instead
  of a Sentinel).
- Only the chapter the user is currently in renders its full node trail.
  Completed and locked chapters render as collapsed summary cards
  (chapter number, completion %, badge earned) — same collapse behavior
  already specified for regions in adventure-tab-design.md, just applied
  one level deeper.

## Data shape

```json
{
  "levelId": "a1_bosque_de_verbos",
  "chapters": [
    {
      "chapterNumber": 1,
      "nodes": ["a1_ch1_01", "a1_ch1_02", "...", "a1_ch1_10"],
      "endBoss": { "type": "sentinel", "name": "Forest Sentinel", "hp": 5, "coinReward": 50 }
    },
    {
      "chapterNumber": 2,
      "nodes": ["a1_ch2_01", "...", "a1_ch2_05"],
      "endBoss": { "type": "guardian", "name": "The Conjugation Spirit", "hp": 8, "coinReward": 100, "tailsAwarded": 1 }
    }
  ]
}
```

## What NOT to change

- The 9-tail total and per-level tail distribution table above.
- The existing Guardian names and the HP Duel mechanic itself — Sentinels
  reuse it at smaller scale, they don't need a new mechanic invented.
- Existing routing/click-handler fixes already applied — verify this
  restructure doesn't reintroduce the "nothing is clickable" bug when the
  chapter-collapse logic is added.
