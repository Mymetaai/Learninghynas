# Interactive Flashcard Shuffle Area — Training Grounds

## Placement
Add to the **Training Grounds** tab, as its own section (not replacing
anything currently there — check what's already in that tab before
Antigravity builds, so this is additive, not a rewrite).

## Visual concept

A diagonal fanned "hand of cards" — 4-5 flashcards visible at once,
overlapping, each rotated at a slightly different angle to read as a fan
spread diagonally across the section, not a flat vertical stack:

```
card 1: rotate(-8deg), z-index 1
card 2: rotate(-4deg), z-index 2
card 3: rotate(0deg),  z-index 3   <- front/active card
card 4: rotate(4deg),  z-index 2
card 5: rotate(8deg),  z-index 1
```

Every 2-3 seconds, the deck cycles: the front card animates out toward the
back of the fan (slide + rotate + fade), and the next card animates into
the front position. This should feel like a continuous shuffle, not a
slideshow cut — use spring physics (not linear easing) so it has a bit of
natural overshoot/settle, like a real card being placed down.

Clicking/tapping a card should flip it (Spanish word front, English +
example sentence back) rather than only auto-advancing — the auto-shuffle
is ambient/idle behavior, not the only way to interact.

## Prompt for Antigravity

```
Build an interactive flashcard shuffle component for the Training Grounds
tab, as a new section — do not remove or replace existing content there.

Visual design: a diagonal fanned hand of cards, 4-5 flashcards visible at
once, overlapping, each at a slightly different rotation angle (e.g. -8deg
to +8deg across the fan) so it reads as a spread hand of cards, not a flat
stack.

Behavior:
- Auto-shuffle every 2-3 seconds: the front card animates to the back of
  the fan, the next card animates into the front position. Use spring
  physics for this motion (natural overshoot/settle), not linear easing.
- Tapping/clicking any card flips it in place (Spanish word on front,
  English translation + example sentence on the back) — this should work
  independent of the auto-shuffle timer, and should pause the auto-shuffle
  briefly while a card is flipped so it doesn't shuffle away mid-read.
- Pull vocabulary for the cards from the same data source as the rest of
  the app (whatever the lesson/vocab data structure currently is) — this
  is a new *view* of existing vocab data, not a new content source.

Implementation approach:
- Use the motion-framer skill (.agents/skills/motion-framer/ if installed,
  otherwise follow Motion/Framer Motion patterns directly) for the shuffle
  animation and the flip transition — this needs real spring-physics
  animation, not CSS transitions.
- Before building the card component from scratch, check 21st.dev (via
  the MCP tool or `21st-cli`) for an existing flashcard, card-stack, or
  swipeable-card component — search terms: "flashcard", "card stack",
  "card carousel". If something close exists, use it as the structural
  base and restyle it rather than building fully from scratch.
- As with all UI work in this project: restyle anything pulled from
  21st.dev or generated via ui-ux-pro-max to match our existing
  cream/navy/terracotta tokens. Do not adopt a different color palette or
  font from either tool's defaults.

Build and show me this one section only — don't touch any other tab while
implementing this.
```
