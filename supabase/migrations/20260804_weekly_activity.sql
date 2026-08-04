-- Migration to add weekly_activity column to user_progress table
ALTER TABLE public.user_progress
ADD COLUMN IF NOT EXISTS weekly_activity JSONB DEFAULT '[]'::jsonb;
