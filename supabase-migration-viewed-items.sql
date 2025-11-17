-- Migration: Add viewed_vogue_items column to profiles table
-- Run this on your existing Supabase database

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS viewed_vogue_items JSONB DEFAULT '[]'::jsonb;
