# Adventure Tab Concept — "Kitsune's Path"

## Core idea

Turn the Adventure tab from a flat lesson list into a story-driven world map.
The nine-tailed kitsune framing gives a built-in collectible mechanic: the
user starts with a one-tailed Yuki and earns tails back — one per region
mastered — becoming a full Nine-Tailed Kitsune Master at the end of the
Spanish course.

## Structure

- **World map** with 5 regions, one per CEFR level, laid out as a winding
  trail (like a path through a forest/mountain/city), not a grid.
- Each region contains 6-10 **lesson nodes** as stepping stones along the
  trail. Completed nodes glow; the current node pulses; locked nodes are
  fogged out until reached.
- Every region ends in a **Guardian Battle**: a timed, higher-stakes quiz
  boss fight. Winning it awards a Kitsune Tail, a badge, and a large coin
  bonus, and unlocks the next region.
- A **fog-of-war** effect over unexplored regions creates curiosity and a
  reason to keep progressing, rather than seeing the whole map on day one.

## Regions

| Region | Level | Theme | Guardian |
|---|---|---|---|
| Pueblo Inicial | A1 | A quiet starting village | "The Gatekeeper" |
| Bosque de Verbos | A2 | A forest where verbs conjugate as you walk | "The Conjugation Spirit" |
| Ciudad Fluida | B1 | A bustling city of conversation | "The Chatterbox Oni" |
| Montana Avanzada | B2 | A steep mountain of subjunctive and idiom | "The Mountain Sage" |
| Templo Maestro | C1 | A temple of fluency and nuance | "The Nine-Tailed Elder" |

## What makes it feel interactive (not just a progress bar)

1. **Animated Yuki avatar** physically walks along the trail as lessons are
   completed — small idle animation (tail sway) while waiting on the current
   node, matching the 3D kitsune character already built for the chatbot.
2. **Daily Quest Board** floats over the map: 2-3 rotating micro-challenges
   ("Get 3 perfect quizzes today," "Practice for 10 minutes") for bonus coins
   — gives a reason to open Adventure even without a scheduled lesson.
3. **Tail Counter UI** — a persistent "3/9 tails" indicator in the header, so
   progress toward the overarching goal is always visible, separate from
   any single region's percentage.
4. **Guardian Battles as set-pieces** — different visual treatment from
   regular nodes (a distinct boss icon, a short pre-battle animation line
   from Yuki like "This one's tough, traveler — ready?"), so they feel like
   milestones, not just "lesson #10."
5. **Parallax background per region** — even a simple 2-3 layer parallax
   (far mountains, mid trees, near path) makes the map feel alive when
   scrolling, without needing full 3D rendering.
6. **Region completion reward reveal** — a short full-screen moment when a
   tail is earned (Yuki gains a visible tail in its model/avatar), rather
   than a silent badge addition. This is the single highest-leverage
   "make it feel more alive" change if only one thing gets built first.

## Data shape suggestion

```json
{
  "regions": [
    {
      "id": "pueblo_inicial",
      "level": "A1",
      "guardian": "The Gatekeeper",
      "nodes": [
        { "id": "a1_01", "type": "lesson", "status": "completed" },
        { "id": "a1_02", "type": "lesson", "status": "current" },
        { "id": "a1_boss", "type": "guardian_battle", "status": "locked" }
      ]
    }
  ],
  "tails_earned": 1,
  "tails_total": 9
}
```

## Build priority if time-boxed

1. Tail counter + region completion reveal (cheapest, highest emotional payoff)
2. Trail layout with fog-of-war (visual restructure of existing lesson list)
3. Daily Quest Board (drives daily opens)
4. Guardian Battle distinct treatment
5. Parallax backgrounds (polish pass, do last)
