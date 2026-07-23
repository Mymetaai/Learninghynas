// STEP 3 — Content data model.
// Generic across all six CEFR levels so another language could be added
// later without touching these types. All real content is Spanish for now.

/** CEFR & Course Part levels. */
export type Level =
  | 'Pre-A1'
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2'
  | 'Part 1'
  | 'Part 2'
  | 'Part 3'
  | 'Part 4'
  | 'Part 5'
  | 'Part 6'
  | 'Part 7';

export const LEVEL_ORDER: Level[] = [
  'Pre-A1',
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
  'Part 1',
  'Part 2',
  'Part 3',
  'Part 4',
  'Part 5',
  'Part 6',
  'Part 7',
];

/** Topic tag groups vocabulary into the curriculum's topic clusters. */
export type TopicTag =
  // Pre-A1 clusters
  | 'alphabet-pronunciation'
  | 'greetings'
  | 'numbers'
  | 'colors'
  | 'family'
  | 'animals'
  | 'classroom-objects'
  // (later levels add more tags as content is authored in Step 18)
  | string;

/** A single vocabulary entry. */
export interface VocabWord {
  /** The Spanish word/phrase, e.g. "hola". */
  word: string;
  /** English meaning. */
  meaning: string;
  /** Pronunciation guide (approximate, plain-language), e.g. "OH-lah". */
  pronunciation: string;
  /** Example sentence in Spanish using the word. */
  example: string;
  /** English translation of the example sentence. */
  exampleTranslation: string;
  /** Short audio cue hint — which syllable is stressed, or a sound mnemonic. */
  audioCue: string;
  /** Level at which the word is introduced. */
  levelIntroduced: Level;
  /** Topic cluster this word belongs to. */
  topic: TopicTag;
}

export interface VocabItem {
  id: string;                    // stable slug, e.g. "a1-042"
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;               // e.g. "Saludos", "Subjuntivo"
  es: string;                     // Spanish term or phrase
  en: string;                     // English translation
  example?: string;               // Spanish example sentence
  exampleTranslation?: string;    // English translation of the example
  tags?: string[];                // e.g. ["verb", "irregular", "regional:Spain"]
}


/** Supported exercise types (rendered by the Step 8 engine). */
export type ExerciseType =
  | 'match'
  | 'drag-drop'
  | 'fill-blank'
  | 'reorder'
  | 'listening'
  | 'multiple-choice'
  | 'translation';

/**
 * One exercise. The shape is flexible because exercise types differ:
 *  - multiple-choice / listening: `prompt`, `answer`, `options`
 *  - fill-blank: `prompt` (with a `___`), `answer`
 *  - match / drag-drop / reorder: `prompt` + `options` (items to act on)
 *  - translation: `prompt` (source text), `answer` (target), `direction`
 */
export interface Exercise {
  id: string;
  type: ExerciseType;
  /** Instructions or the question text. */
  prompt: string;
  /** For translation, which way: 'es-en' or 'en-es'. */
  direction?: 'es-en' | 'en-es';
  /** Correct answer (string for single-answer types). */
  answer: string;
  /** Selectable / draggable items. For multiple-choice, includes the answer. */
  options?: string[];
  /** Pool of extra distractors the Step 17 generator can draw from. */
  distractorPool?: string[];
  /** Optional context line shown above the exercise (in-world framing). */
  context?: string;
}

/** A grammatical note drawn from the story itself. */
export interface GrammarNote {
  title: string;
  /** The pattern, explained simply with an example from the story. */
  explanation: string;
  exampleFromStory: string;
}

/** Rewards granted on quest completion (consumed by Step 10). */
export interface QuestRewards {
  xp: number;
  coins: number;
}

/** One quest = a story chapter + its vocab, grammar, and exercises. */
export interface Quest {
  id: string;
  title: string;
  /** One-line teaser shown on the World Map / Quest Preview. */
  subtitle: string;
  /** Estimated minutes to complete (drives the Quest Preview). */
  estimatedMinutes: number;
  /** The story chapter, split into lines for progressive reveal (Step 6). */
  storyLines: string[];
  /** Vocabulary introduced/used in this quest. */
  vocabulary: VocabWord[];
  /** Grammar note(s) drawn from the story. */
  grammarNotes: GrammarNote[];
  /** Practice exercises for this quest. */
  exercises: Exercise[];
  /** Reward granted on completion. */
  rewards: QuestRewards;
  /**
   * Which vocabulary topic clusters this quest covers (drives the Step 3
   * acceptance check that every Pre-A1 cluster is represented across the world).
   */
  topicFocus: TopicTag[];
}

export interface Boss {
  type: 'sentinel' | 'guardian';
  id: string;
  name: string;
  hp: number;
  coinReward: number;
  tailsAwarded?: number;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  name: string;
  description: string;
  quests: Quest[];
  endBoss: Boss;
}

/** A region on the World Map — one per level. */
export interface World {
  id: string;
  /** Display name, e.g. "Pueblo Inicial". */
  name: string;
  /** Flavor line describing the region. */
  description: string;
  level: Level;
  /** Quests in the order they unlock along the map path. */
  quests: Quest[];
  /** Chapter grouping inside this world. */
  chapters?: Chapter[];
  /**
   * Unlock requirement: 'first' = always unlocked, otherwise the id of the
   * previous world whose boss (Step 16) must be beaten.
   */
  unlockRequirement: 'first' | string;
  /** Guardian boss name for this region's final battle. */
  guardian: string;
  /** Number of kitsune tails earned by completing this region (total across all = 9). */
  tailsAwarded: number;
}

/** The full curriculum. */
export interface Curriculum {
  worlds: World[];
}

// ── Topic-tag → human label map (for UI display) ──────────────────────────
export const TOPIC_LABELS: Record<string, string> = {
  'alphabet-pronunciation': 'Alphabet & Pronunciation',
  greetings: 'Greetings',
  numbers: 'Numbers',
  colors: 'Colors',
  family: 'Family Members',
  animals: 'Animals',
  'classroom-objects': 'Classroom & Objects',
};

/** The Pre-A1 topic clusters that must all be covered. */
export const PRE_A1_TOPICS: TopicTag[] = [
  'alphabet-pronunciation',
  'greetings',
  'numbers',
  'colors',
  'family',
  'animals',
  'classroom-objects',
];
