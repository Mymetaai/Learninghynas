-- setup.sql: Full unified schema for Serene Lexicon / Wayfarer with Clerk Auth integration

-- 1. Table: user_progress
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id TEXT PRIMARY KEY,
    xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    kitsune_coins INTEGER NOT NULL DEFAULT 100,
    streak_days INTEGER NOT NULL DEFAULT 0,
    weekly_activity JSONB DEFAULT '[]'::jsonb,
    daily_history JSONB DEFAULT '{}'::jsonb,
    active_study_minutes INT DEFAULT 0,
    last_active_date TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Table: user_stats
CREATE TABLE IF NOT EXISTS public.user_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    streak INTEGER NOT NULL DEFAULT 0,
    coins INTEGER NOT NULL DEFAULT 100,
    xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    last_active_date DATE,
    collected_card_ids TEXT[] DEFAULT '{}',
    claimed_quest_rewards TEXT[] DEFAULT '{}',
    claimed_exam_ids TEXT[] DEFAULT '{}',
    earned_badges JSONB DEFAULT '{}'::jsonb,
    completed_lessons JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Table: user_entitlements
CREATE TABLE IF NOT EXISTS public.user_entitlements (
    user_id TEXT PRIMARY KEY,
    streak_freeze INT DEFAULT 0,
    hint_token INT DEFAULT 0,
    boss_retry INT DEFAULT 0,
    owned_cards JSONB DEFAULT '[]'::jsonb,
    unlocked_themes JSONB DEFAULT '["theme_parchment"]'::jsonb,
    unlocked_auras JSONB DEFAULT '[]'::jsonb,
    unlocked_packs JSONB DEFAULT '[]'::jsonb,
    unlocked_sound_packs JSONB DEFAULT '[]'::jsonb,
    active_theme TEXT DEFAULT 'theme_parchment',
    active_aura TEXT DEFAULT NULL,
    active_sound_pack TEXT DEFAULT NULL,
    logo_variant TEXT DEFAULT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. Table: learned_vocabulary
CREATE TABLE IF NOT EXISTS public.learned_vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    word TEXT NOT NULL,
    meaning TEXT,
    quest_id TEXT,
    date_learned DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_learned_vocabulary_user_word UNIQUE (user_id, word)
);

-- 5. Table: daily_quests
CREATE TABLE IF NOT EXISTS public.daily_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    quest_date DATE NOT NULL,
    tasks JSONB NOT NULL,
    total_xp_reward INTEGER NOT NULL DEFAULT 0,
    completed_task_ids TEXT[] DEFAULT '{}',
    all_completed BOOLEAN NOT NULL DEFAULT false,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT daily_quests_user_id_quest_date_key UNIQUE (user_id, quest_date)
);

-- 6. Table: immersion_chat_messages
CREATE TABLE IF NOT EXISTS public.immersion_chat_messages (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    session_key TEXT NOT NULL,
    mode TEXT NOT NULL,
    topic TEXT NOT NULL,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    translation TEXT,
    quick_replies JSONB DEFAULT '[]'::jsonb,
    new_vocab_words JSONB DEFAULT '[]'::jsonb,
    structured_content JSONB,
    metadata JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learned_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.immersion_chat_messages ENABLE ROW LEVEL SECURITY;

-- 8. Policies
CREATE POLICY "Allow user progress all" ON public.user_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow user entitlements all" ON public.user_entitlements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow user stats all" ON public.user_stats FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow learned vocabulary all" ON public.learned_vocabulary FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow daily quests all" ON public.daily_quests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow immersion chat messages all" ON public.immersion_chat_messages FOR ALL USING (true) WITH CHECK (true);
