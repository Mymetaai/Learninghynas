-- setup.sql: Table user_progress for tracking Clerk user progress in Supabase

CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id TEXT PRIMARY KEY, -- Matches Clerk user.id (e.g., 'user_2xyz...')
    xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    kitsune_coins INTEGER NOT NULL DEFAULT 500,
    streak_days INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can read own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;

-- Policy: Users can select their own row based on auth.uid() or Clerk JWT 'sub' claim
CREATE POLICY "Users can read own progress"
    ON public.user_progress FOR SELECT
    USING (
        user_id = auth.uid()::text 
        OR user_id = (auth.jwt() ->> 'sub')
        OR user_id = (auth.jwt() ->> 'user_id')
    );

-- Policy: Users can insert their own row
CREATE POLICY "Users can insert own progress"
    ON public.user_progress FOR INSERT
    WITH CHECK (
        user_id = auth.uid()::text 
        OR user_id = (auth.jwt() ->> 'sub')
        OR user_id = (auth.jwt() ->> 'user_id')
    );

-- Policy: Users can update their own row
CREATE POLICY "Users can update own progress"
    ON public.user_progress FOR UPDATE
    USING (
        user_id = auth.uid()::text 
        OR user_id = (auth.jwt() ->> 'sub')
        OR user_id = (auth.jwt() ->> 'user_id')
    )
    WITH CHECK (
        user_id = auth.uid()::text 
        OR user_id = (auth.jwt() ->> 'sub')
        OR user_id = (auth.jwt() ->> 'user_id')
    );
