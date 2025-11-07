-- Migration: Add gender_preference column to profiles table
-- Run this in Supabase SQL Editor if you already have the profiles table

-- Add the gender_preference column
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS gender_preference TEXT
CHECK (gender_preference IN ('womens', 'mens', 'both'));

-- Set default value for existing rows (optional)
UPDATE profiles
SET gender_preference = 'both'
WHERE gender_preference IS NULL;
