-- Migration: Add unlocked_sound_packs and active_sound_pack to user_entitlements
ALTER TABLE public.user_entitlements
ADD COLUMN IF NOT EXISTS unlocked_sound_packs JSONB DEFAULT '["default"]'::jsonb,
ADD COLUMN IF NOT EXISTS active_sound_pack TEXT DEFAULT 'default';
