export interface StoryLine {
  text: string;
  formula: string; // Slot-machine formula breakdown (Subject, Verb, Object, Place, Time, Other)
}

export interface StoryVocab {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface StoryGrammarNote {
  term: string;
  translation: string;
  explanation: string;
  example: string;
}

export interface Story {
  id: string;
  lesson?: number; // 1-37
  cefr_badge?: 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'C1';
  title: string;
  description: string;
  lines?: StoryLine[];
  vocabulary: StoryVocab[];
  new_grammar_point?: string;
  grammar_note?: StoryGrammarNote;
  mascot_asset_id?: string;
  // Optional backward compatibility / metadata fields
  level?: string;
  levelLabel?: string;
  tier?: number;
  mascot_line?: string;
  word_encounters_seed?: string[];
  storyLines?: string[];
  storyTranslations?: string[];
  grammarNotes?: any[];
  new_vocab?: string[];
  recycled_vocab?: string[];
}

export type LibraryStory = Story;
