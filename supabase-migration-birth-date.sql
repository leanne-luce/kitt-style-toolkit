-- Migration: Add birth_date column to profiles table
-- Run this if you already have a profiles table and need to add the birth_date field

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS birth_date TEXT;
