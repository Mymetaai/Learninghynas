-- Migration: 20260723_sentence_builder.sql
-- Description: Add sentence_builder_exercises table for interactive sentence builder exercise in Basic Español tab

-- 1. Create table: sentence_builder_exercises
CREATE TABLE public.sentence_builder_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    cefr_level TEXT NOT NULL CHECK (cefr_level IN ('A1','A2','B1','B2','C1')),
    spanish_sentence TEXT NOT NULL,
    english_translation TEXT NOT NULL,
    tokens JSONB NOT NULL,
    pronoun_dropped_variant TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Add comments
COMMENT ON TABLE public.sentence_builder_exercises IS 'Stores generated sentence builder exercises for Basic Español tab';

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sentence_builder_exercises_user_id ON public.sentence_builder_exercises(user_id);
CREATE INDEX IF NOT EXISTS idx_sentence_builder_exercises_lesson_id ON public.sentence_builder_exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_sentence_builder_exercises_cefr_level ON public.sentence_builder_exercises(cefr_level);
CREATE INDEX IF NOT EXISTS idx_sentence_builder_exercises_user_lesson ON public.sentence_builder_exercises(user_id, lesson_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.sentence_builder_exercises ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for authenticated role
-- Policy: Users can view their own sentence builder exercises
DROP POLICY IF EXISTS "Users can view own sentence_builder_exercises" ON public.sentence_builder_exercises;
CREATE POLICY "Users can view own sentence_builder_exercises"
    ON public.sentence_builder_exercises FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own sentence builder exercises
DROP POLICY IF EXISTS "Users can insert own sentence_builder_exercises" ON public.sentence_builder_exercises;
CREATE POLICY "Users can insert own sentence_builder_exercises"
    ON public.sentence_builder_exercises FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own sentence builder exercises
DROP POLICY IF EXISTS "Users can update own sentence_builder_exercises" ON public.sentence_builder_exercises;
CREATE POLICY "Users can update own sentence_builder_exercises"
    ON public.sentence_builder_exercises FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own sentence builder exercises
DROP POLICY IF EXISTS "Users can delete own sentence_builder_exercises" ON public.sentence_builder_exercises;
CREATE POLICY "Users can delete own sentence_builder_exercises"
    ON public.sentence_builder_exercises FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);