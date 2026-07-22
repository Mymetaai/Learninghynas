-- Migration: 20260722_init_schema.sql
-- Description: Create initial database schema for user_stats, learned_vocabulary, and immersion_chat_messages with indexes and RLS policies for Supabase project szctbtxwzffnvnoqugyy.

-- 1. Helper Function & Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Drop Existing Tables (Cascade) if re-creating
DROP TABLE IF EXISTS public.immersion_chat_messages CASCADE;
DROP TABLE IF EXISTS public.learned_vocabulary CASCADE;
DROP TABLE IF EXISTS public.user_stats CASCADE;

-- 3. Create Table: user_stats
CREATE TABLE public.user_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    streak INTEGER NOT NULL DEFAULT 1,
    coins INTEGER NOT NULL DEFAULT 100,
    xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    completed_lessons JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Comments & Trigger
COMMENT ON TABLE public.user_stats IS 'Stores user stats: streak, coins, xp, level, and completed lessons.';

DROP TRIGGER IF EXISTS trg_user_stats_updated_at ON public.user_stats;
CREATE TRIGGER trg_user_stats_updated_at
    BEFORE UPDATE ON public.user_stats
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Create Table: learned_vocabulary
CREATE TABLE public.learned_vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    word TEXT NOT NULL,
    meaning TEXT,
    learned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_learned_vocabulary_user_word UNIQUE (user_id, word)
);

COMMENT ON TABLE public.learned_vocabulary IS 'Stores vocabulary items learned by users.';

-- 5. Create Table: immersion_chat_messages
CREATE TABLE public.immersion_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_key TEXT NOT NULL,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
    text TEXT NOT NULL,
    translation TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.immersion_chat_messages IS 'Stores immersion chat session message logs.';

-- 6. Create Required Indexes
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_learned_vocabulary_user_id ON public.learned_vocabulary(user_id);
CREATE INDEX IF NOT EXISTS idx_immersion_chat_messages_user_session ON public.immersion_chat_messages(user_id, session_key);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learned_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.immersion_chat_messages ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS Policies for authenticated role (SELECT, INSERT, UPDATE, DELETE)

-- Policies for user_stats
DROP POLICY IF EXISTS "Authenticated users can view own user_stats" ON public.user_stats;
CREATE POLICY "Authenticated users can view own user_stats"
    ON public.user_stats FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert own user_stats" ON public.user_stats;
CREATE POLICY "Authenticated users can insert own user_stats"
    ON public.user_stats FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can update own user_stats" ON public.user_stats;
CREATE POLICY "Authenticated users can update own user_stats"
    ON public.user_stats FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can delete own user_stats" ON public.user_stats;
CREATE POLICY "Authenticated users can delete own user_stats"
    ON public.user_stats FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policies for learned_vocabulary
DROP POLICY IF EXISTS "Authenticated users can view own learned_vocabulary" ON public.learned_vocabulary;
CREATE POLICY "Authenticated users can view own learned_vocabulary"
    ON public.learned_vocabulary FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert own learned_vocabulary" ON public.learned_vocabulary;
CREATE POLICY "Authenticated users can insert own learned_vocabulary"
    ON public.learned_vocabulary FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can update own learned_vocabulary" ON public.learned_vocabulary;
CREATE POLICY "Authenticated users can update own learned_vocabulary"
    ON public.learned_vocabulary FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can delete own learned_vocabulary" ON public.learned_vocabulary;
CREATE POLICY "Authenticated users can delete own learned_vocabulary"
    ON public.learned_vocabulary FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policies for immersion_chat_messages
DROP POLICY IF EXISTS "Authenticated users can view own immersion_chat_messages" ON public.immersion_chat_messages;
CREATE POLICY "Authenticated users can view own immersion_chat_messages"
    ON public.immersion_chat_messages FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert own immersion_chat_messages" ON public.immersion_chat_messages;
CREATE POLICY "Authenticated users can insert own immersion_chat_messages"
    ON public.immersion_chat_messages FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can update own immersion_chat_messages" ON public.immersion_chat_messages;
CREATE POLICY "Authenticated users can update own immersion_chat_messages"
    ON public.immersion_chat_messages FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can delete own immersion_chat_messages" ON public.immersion_chat_messages;
CREATE POLICY "Authenticated users can delete own immersion_chat_messages"
    ON public.immersion_chat_messages FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
