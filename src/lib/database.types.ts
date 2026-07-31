export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      user_progress: {
        Row: {
          user_id: string;
          xp: number;
          level: number;
          kitsune_coins: number;
          streak_days: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          xp?: number;
          level?: number;
          kitsune_coins?: number;
          streak_days?: number;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          xp?: number;
          level?: number;
          kitsune_coins?: number;
          streak_days?: number;
          created_at?: string;
        };
      };
      immersion_chat_messages: {
        Row: {
          created_at: string;
          id: string;
          metadata: Json;
          mode: string;
          new_vocab_words: Json;
          quick_replies: Json;
          sender: string;
          session_key: string;
          structured_content: Json | null;
          text: string;
          timestamp: string;
          topic: string;
          translation: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          metadata?: Json;
          mode: string;
          new_vocab_words?: Json;
          quick_replies?: Json;
          sender: string;
          session_key: string;
          structured_content?: Json | null;
          text: string;
          timestamp?: string;
          topic: string;
          translation?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          metadata?: Json;
          mode?: string;
          new_vocab_words?: Json;
          quick_replies?: Json;
          sender?: string;
          session_key?: string;
          structured_content?: Json | null;
          text?: string;
          timestamp?: string;
          topic?: string;
          translation?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      learned_vocabulary: {
        Row: {
          created_at: string;
          date: string | null;
          date_learned: string;
          id: string;
          meaning: string | null;
          quest_id: string | null;
          updated_at: string;
          user_id: string;
          word: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          date_learned?: string;
          id?: string;
          meaning?: string | null;
          quest_id?: string | null;
          updated_at?: string;
          user_id: string;
          word: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          date_learned?: string;
          id?: string;
          meaning?: string | null;
          quest_id?: string | null;
          updated_at?: string;
          user_id?: string;
          word?: string;
        };
        Relationships: [];
      };
      user_stats: {
        Row: {
          claimed_exam_ids: string[];
          claimed_quest_rewards: string[];
          coins: number;
          collected_card_ids: string[];
          completed_lessons: Json;
          created_at: string;
          earned_badges: Json;
          id: string;
          last_active_date: string | null;
          streak: number;
          updated_at: string;
          user_id: string;
          xp: number;
        };
        Insert: {
          claimed_exam_ids?: string[];
          claimed_quest_rewards?: string[];
          coins?: number;
          collected_card_ids?: string[];
          completed_lessons?: Json;
          created_at?: string;
          earned_badges?: Json;
          id?: string;
          last_active_date?: string | null;
          streak?: number;
          updated_at?: string;
          user_id: string;
          xp?: number;
        };
        Update: {
          claimed_exam_ids?: string[];
          claimed_quest_rewards?: string[];
          coins?: number;
          collected_card_ids?: string[];
          completed_lessons?: Json;
          created_at?: string;
          earned_badges?: Json;
          id?: string;
          last_active_date?: string | null;
          streak?: number;
          updated_at?: string;
          user_id?: string;
          xp?: number;
        };
        Relationships: [];
      };
      sentence_builder_exercises: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          cefr_level: string;
          spanish_sentence: string;
          english_translation: string;
          tokens: Json;
          pronoun_dropped_variant: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          cefr_level: string;
          spanish_sentence: string;
          english_translation: string;
          tokens: Json;
          pronoun_dropped_variant?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          cefr_level?: string;
          spanish_sentence?: string;
          english_translation?: string;
          tokens?: Json;
          pronoun_dropped_variant?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
