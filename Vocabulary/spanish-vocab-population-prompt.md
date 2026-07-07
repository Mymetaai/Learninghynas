# Populating Full Pre-A1 → C1 Spanish Vocabulary — Sources + Prompt

## Sources (use each for its actual job)

| Source | URL | Use for |
|---|---|---|
| Instituto Cervantes PCIC | cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/ | Deciding which topics/categories belong at each CEFR level. Reference only — do not scrape its text verbatim. |
| doozan/spanish_data | github.com/doozan/spanish_data | The actual word list + translations + example sentences to ingest. Openly licensed (CC-BY-SA / CC-BY). |
| hermitdave/FrequencyWords | github.com/hermitdave/FrequencyWords | Fallback: raw frequency-ranked word list only, no dictionary/sentences attached. |

## Rough frequency-rank-to-CEFR mapping (starting point, not gospel)

| CEFR level | Approx. frequency rank range | Approx. word count |
|---|---|---|
| Pre-A1 / A1 | 1–800 | ~500–800 |
| A2 | 800–2,000 | ~1,000–1,500 |
| B1 | 2,000–4,500 | ~2,000–3,000 |
| B2 | 4,500–9,000 | ~4,000–6,000 |
| C1 | 9,000–18,000+ | ~8,000+ |

**Important caveat**: raw frequency rank alone is a bad sole filter. High-frequency
function words (de, que, el) dominate the top of any frequency list, while
genuinely useful A1 topical words (colores, familia, animales) rank lower
than pure frequency would suggest. Cross-check against PCIC's topic
categories so each level actually covers the right *themes*, not just the
most statistically common words.

---

## The prompt for Antigravity

```
We need to fill out the vocabulary content for our Spanish course, which
currently only has a fraction of the words each CEFR level actually needs
(e.g. A1 currently has only ~53 words across the whole level — it needs
roughly 500-800).

Use these two sources together, not interchangeably:
1. github.com/doozan/spanish_data — clone this and use its frequency data,
   dictionary entries, and example sentences as the actual vocabulary
   content source. It's openly licensed (CC-BY-SA / CC-BY), safe to use.
2. The Instituto Cervantes PCIC (cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/)
   as a topic checklist only — use it to verify each level covers the right
   THEMES (greetings, family, food, daily routines, etc. for A1; past
   tense narration, opinions, travel for B1; and so on), not as a text
   source to copy from.

Process, one region/level at a time — do NOT attempt all six levels in one
pass:

1. Start with Pre-A1 (Pueblo Inicial) only.
2. Pull candidate words from spanish_data's frequency list in the
   appropriate rank range for this level.
3. Cross-check coverage against PCIC's Pre-A1 topic list — if a required
   theme (e.g. numbers 1-20, basic greetings) is underrepresented in the
   frequency-selected words, manually add those specific words even if
   their raw frequency rank is lower.
4. Deduplicate against whatever vocabulary already exists in this region
   so we don't create duplicate entries.
5. For each word, populate: the Spanish word, English translation, an
   example sentence (pull from spanish_data's Tatoeba-sourced sentences
   where available, otherwise flag for manual review rather than
   inventing one), and the existing data fields our schema already uses
   (region id, difficulty tag, audio placeholder if applicable).
6. Output the result in whatever format our existing vocabulary data file
   uses — match the existing schema exactly, don't invent a new one.
7. Report back: final word count for this level, and a list of any PCIC
   topics you weren't able to find good frequency-list matches for, so I
   can review those manually.

Stop after Pre-A1 is done and reviewed. Do not proceed to A1 until I
confirm the Pre-A1 output looks right.
```

Run this once per level, reviewing each batch before moving to the next —
generating 15,000+ words in one shot with no review checkpoint is exactly
the kind of task where quality silently degrades partway through.
