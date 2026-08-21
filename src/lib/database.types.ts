export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      daily_quests: {
        Row: {
          all_completed: boolean
          completed_task_ids: string[]
          created_at: string
          generated_at: string
          id: string
          quest_date: string
          tasks: Json
          total_xp_reward: number
          updated_at: string
          user_id: string
        }
        Insert: {
          all_completed?: boolean
          completed_task_ids?: string[]
          created_at?: string
          generated_at?: string
          id?: string
          quest_date: string
          tasks?: Json
          total_xp_reward?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          all_completed?: boolean
          completed_task_ids?: string[]
          created_at?: string
          generated_at?: string
          id?: string
          quest_date?: string
          tasks?: Json
          total_xp_reward?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      immersion_chat_messages: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          mode: string
          new_vocab_words: Json
          quick_replies: Json
          sender: string
          session_key: string
          structured_content: Json | null
          text: string
          timestamp: string
          topic: string
          translation: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          mode: string
          new_vocab_words?: Json
          quick_replies?: Json
          sender: string
          session_key: string
          structured_content?: Json | null
          text: string
          timestamp?: string
          topic: string
          translation?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          mode?: string
          new_vocab_words?: Json
          quick_replies?: Json
          sender?: string
          session_key?: string
          structured_content?: Json | null
          text?: string
          timestamp?: string
          topic?: string
          translation?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      learned_vocabulary: {
        Row: {
          created_at: string
          date: string | null
          date_learned: string
          id: string
          last_reviewed_at: string | null
          meaning: string | null
          next_review_date: string | null
          quest_id: string | null
          review_count: number | null
          updated_at: string
          user_id: string
          word: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          date_learned?: string
          id?: string
          last_reviewed_at?: string | null
          meaning?: string | null
          next_review_date?: string | null
          quest_id?: string | null
          review_count?: number | null
          updated_at?: string
          user_id: string
          word: string
        }
        Update: {
          created_at?: string
          date?: string | null
          date_learned?: string
          id?: string
          last_reviewed_at?: string | null
          meaning?: string | null
          next_review_date?: string | null
          quest_id?: string | null
          review_count?: number | null
          updated_at?: string
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      user_entitlements: {
        Row: {
          active_aura: string | null
          active_sound_pack: string | null
          active_theme: string | null
          boss_retry: number | null
          hint_token: number | null
          logo_variant: string | null
          owned_cards: Json | null
          streak_freeze: number | null
          unlocked_auras: Json | null
          unlocked_packs: Json | null
          unlocked_sound_packs: Json | null
          unlocked_themes: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active_aura?: string | null
          active_sound_pack?: string | null
          active_theme?: string | null
          boss_retry?: number | null
          hint_token?: number | null
          logo_variant?: string | null
          owned_cards?: Json | null
          streak_freeze?: number | null
          unlocked_auras?: Json | null
          unlocked_packs?: Json | null
          unlocked_sound_packs?: Json | null
          unlocked_themes?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active_aura?: string | null
          active_sound_pack?: string | null
          active_theme?: string | null
          boss_retry?: number | null
          hint_token?: number | null
          logo_variant?: string | null
          owned_cards?: Json | null
          streak_freeze?: number | null
          unlocked_auras?: Json | null
          unlocked_packs?: Json | null
          unlocked_sound_packs?: Json | null
          unlocked_themes?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          active_study_minutes: number | null
          created_at: string
          daily_history: Json | null
          kitsune_coins: number
          last_active_date: string | null
          level: number
          streak_days: number
          updated_at: string | null
          user_id: string
          weekly_activity: Json | null
          xp: number
        }
        Insert: {
          active_study_minutes?: number | null
          created_at?: string
          daily_history?: Json | null
          kitsune_coins?: number
          last_active_date?: string | null
          level?: number
          streak_days?: number
          updated_at?: string | null
          user_id: string
          weekly_activity?: Json | null
          xp?: number
        }
        Update: {
          active_study_minutes?: number | null
          created_at?: string
          daily_history?: Json | null
          kitsune_coins?: number
          last_active_date?: string | null
          level?: number
          streak_days?: number
          updated_at?: string | null
          user_id?: string
          weekly_activity?: Json | null
          xp?: number
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          claimed_exam_ids: string[]
          claimed_quest_rewards: string[]
          coins: number
          collected_card_ids: string[]
          completed_lessons: Json
          created_at: string
          earned_badges: Json
          id: string
          last_active_date: string | null
          streak: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          claimed_exam_ids?: string[]
          claimed_quest_rewards?: string[]
          coins?: number
          collected_card_ids?: string[]
          completed_lessons?: Json
          created_at?: string
          earned_badges?: Json
          id?: string
          last_active_date?: string | null
          streak?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          claimed_exam_ids?: string[]
          claimed_quest_rewards?: string[]
          coins?: number
          collected_card_ids?: string[]
          completed_lessons?: Json
          created_at?: string
          earned_badges?: Json
          id?: string
          last_active_date?: string | null
          streak?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
