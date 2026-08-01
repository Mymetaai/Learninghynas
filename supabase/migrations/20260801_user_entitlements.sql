-- DDL Migration: User Entitlements Schema
CREATE TABLE IF NOT EXISTS public.user_entitlements (
  user_id TEXT PRIMARY KEY,
  streak_freeze INT DEFAULT 0,
  hint_token INT DEFAULT 0,
  boss_retry INT DEFAULT 0,
  owned_cards JSONB DEFAULT '[]'::jsonb,
  unlocked_themes JSONB DEFAULT '["theme_parchment"]'::jsonb,
  unlocked_auras JSONB DEFAULT '[]'::jsonb,
  unlocked_packs JSONB DEFAULT '[]'::jsonb,
  active_theme TEXT DEFAULT 'theme_parchment',
  active_aura TEXT DEFAULT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;

-- Allow public/authenticated read/write based on user_id
CREATE POLICY "Allow individual entitlement read" ON public.user_entitlements FOR SELECT USING (true);
CREATE POLICY "Allow individual entitlement insert/update" ON public.user_entitlements FOR ALL USING (true);
