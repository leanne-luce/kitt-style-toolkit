# Database Migration Guide

## Adding Viewed Vogue Items Tracking

This migration adds per-user tracking of viewed Vogue archive items to prevent showing the same items repeatedly.

### Steps to Apply Migration

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project
   - Go to the SQL Editor

2. **Run the Migration SQL**
   - Copy the contents of `supabase-migration-viewed-items.sql`
   - Paste into the SQL Editor
   - Click "Run"

3. **Verify the Migration**
   - Go to Table Editor
   - Select the `profiles` table
   - Verify that the `viewed_vogue_items` column exists with type `jsonb`

### What This Does

- Adds a `viewed_vogue_items` column to the `profiles` table
- Stores an array of viewed items with timestamps for each user
- Items older than 7 days are automatically filtered out
- This enables cross-device tracking - users won't see the same items on different devices within a week

### Testing

After running the migration:
1. View some Vogue archive items in the app
2. They should disappear from the results
3. After 7 days, they'll reappear in search results
4. Log in on a different device - the same items will be filtered out there too
