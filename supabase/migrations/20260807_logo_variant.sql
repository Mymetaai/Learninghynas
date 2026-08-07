-- Migration: Add logo_variant column to user_entitlements for dynamic logo selection
ALTER TABLE public.user_entitlements
ADD COLUMN IF NOT EXISTS logo_variant TEXT DEFAULT 'executive';
