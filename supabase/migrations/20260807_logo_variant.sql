-- Migration: Add logo_variant to user_entitlements
ALTER TABLE public.user_entitlements
ADD COLUMN IF NOT EXISTS logo_variant TEXT DEFAULT 'executive';
