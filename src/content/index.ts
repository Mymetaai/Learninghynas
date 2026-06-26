// STEP 3 — Curriculum index.
// Single export point for all content + lookup helpers consumed by later
// steps (World Map, Quest Preview, Story, Practice, Home suggestions).
import type {
  Curriculum,
  Level,
  Quest,
  TopicTag,
  VocabWord,
  World,
} from './types';
import { LEVEL_ORDER, PRE_A1_TOPICS } from './types';
import { ALL_WORLDS } from './worlds';
import { BOOK_LEVELS } from './bookLevels';

export * from './types';
export { ALL_WORLDS } from './worlds';
export { BOOK_LEVELS, BOOK_LEVEL_IDS, TOTAL_BOOK_LEVELS } from './bookLevels';

export const curriculum: Curriculum = { worlds: ALL_WORLDS };

// ── Lookup helpers ───────────────────────────────────────────────────────

export const getWorld = (id: string): World | undefined =>
  ALL_WORLDS.find((w) => w.id === id);

export const getWorldByLevel = (level: Level): World | undefined =>
  ALL_WORLDS.find((w) => w.level === level);

export const getQuest = (id: string): Quest | undefined => {
  // Search worlds first, then book levels (Quest Journey tab content).
  return (
    ALL_WORLDS.flatMap((w) => w.quests).find((q) => q.id === id) ??
    BOOK_LEVELS.find((q) => q.id === id)
  );
};

/** Every vocab word across authored quests (skips empty stub worlds). */
export const allVocabulary = (): VocabWord[] =>
  ALL_WORLDS.flatMap((w) => w.quests.flatMap((q) => q.vocabulary));

/** Index of the level that contains a given quest (for map positioning). */
export const levelIndexOf = (level: Level): number =>
  LEVEL_ORDER.indexOf(level);

// ── Topic coverage (drives Step 3 acceptance check) ─────────────────────

/** Which topic tags are represented by a level's vocabulary. */
export const topicsCoveredIn = (level: Level): TopicTag[] => {
  const world = getWorldByLevel(level);
  if (!world) return [];
  const tags = new Set<TopicTag>();
  world.quests.forEach((q) => q.vocabulary.forEach((v) => tags.add(v.topic)));
  return [...tags];
};

/**
 * Returns the Pre-A1 topic clusters NOT yet covered by authored vocabulary.
 * Empty array ⇒ all Pre-A1 topics are covered (Step 3 acceptance check).
 */
export const missingPreA1Topics = (): TopicTag[] =>
  PRE_A1_TOPICS.filter((t) => !topicsCoveredIn('Pre-A1').includes(t));
