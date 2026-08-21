-- Migration: 20260821_fix_clerk_user_id_types.sql
-- Description: Convert user_id columns to TEXT across all tables and update RLS policies for Clerk auth compatibility

-- 1. Drop foreign keys referencing auth.users
ALTER TABLE IF EXISTS public.daily_quests DROP CONSTRAINT IF EXISTS daily_quests_user_id_fkey;
ALTER TABLE IF EXISTS public.immersion_chat_messages DROP CONSTRAINT IF EXISTS immersion_chat_messages_user_id_fkey;
ALTER TABLE IF EXISTS public.learned_vocabulary DROP CONSTRAINT IF EXISTS learned_vocabulary_user_id_fkey;
ALTER TABLE IF EXISTS public.user_stats DROP CONSTRAINT IF EXISTS user_stats_user_id_fkey;

-- 2. Alter user_id column types from UUID to TEXT
ALTER TABLE IF EXISTS public.daily_quests ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE IF EXISTS public.immersion_chat_messages ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE IF EXISTS public.learned_vocabulary ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE IF EXISTS public.user_stats ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE IF EXISTS public.user_progress ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE IF EXISTS public.user_entitlements ALTER COLUMN user_id TYPE TEXT;

-- 3. Ensure columns exist
ALTER TABLE IF EXISTS public.user_progress ADD COLUMN IF NOT EXISTS daily_history JSONB DEFAULT '{}'::jsonb;
ALTER TABLE IF EXISTS public.user_progress ADD COLUMN IF NOT EXISTS active_study_minutes INT DEFAULT 0;
ALTER TABLE IF EXISTS public.user_progress ADD COLUMN IF NOT EXISTS last_active_date TEXT;
ALTER TABLE IF EXISTS public.user_progress ADD COLUMN IF NOT EXISTS weekly_activity JSONB DEFAULT '[]'::jsonb;
ALTER TABLE IF EXISTS public.user_progress ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS streak_freeze INT DEFAULT 0;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS hint_token INT DEFAULT 0;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS boss_retry INT DEFAULT 0;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS owned_cards JSONB DEFAULT '[]'::jsonb;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS unlocked_themes JSONB DEFAULT '["theme_parchment"]'::jsonb;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS unlocked_auras JSONB DEFAULT '[]'::jsonb;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS unlocked_packs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS unlocked_sound_packs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS active_theme TEXT DEFAULT 'theme_parchment';
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS active_aura TEXT DEFAULT NULL;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS active_sound_pack TEXT DEFAULT NULL;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS logo_variant TEXT DEFAULT NULL;
ALTER TABLE IF EXISTS public.user_entitlements ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- 4. Enable RLS and Create Policies
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learned_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.immersion_chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow user progress all" ON public.user_progress;
CREATE POLICY "Allow user progress all" ON public.user_progress FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow user entitlements all" ON public.user_entitlements;
CREATE POLICY "Allow user entitlements all" ON public.user_entitlements FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow user stats all" ON public.user_stats;
CREATE POLICY "Allow user stats all" ON public.user_stats FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow learned vocabulary all" ON public.learned_vocabulary;
CREATE POLICY "Allow learned vocabulary all" ON public.learned_vocabulary FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow daily quests all" ON public.daily_quests;
CREATE POLICY "Allow daily quests all" ON public.daily_quests FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow immersion chat messages all" ON public.immersion_chat_messages;
CREATE POLICY "Allow immersion chat messages all" ON public.immersion_chat_messages FOR ALL USING (true) WITH CHECK (true);
