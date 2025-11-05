# Supabase Database Setup for Kitt Style Toolkit

Follow these steps to set up your Supabase database for storing user wardrobe items.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Click on **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure the bucket:
   - **Name**: `wardrobe-images`
   - **Public bucket**: Toggle ON (so users can view their images)
   - Click **"Create bucket"**

5. Set up storage policies:
   - Click on the `wardrobe-images` bucket
   - Click **"Policies"** tab
   - Click **"New Policy"**

   **Policy 1: Allow authenticated users to upload**
   - Policy name: `Users can upload their own images`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - Policy definition (copy everything AFTER this line, do NOT include the backticks):

   `(bucket_id = 'wardrobe-images'::text) AND (auth.uid()::text = (storage.foldername(name))[1])`

   **Policy 2: Allow authenticated users to read their own images**
   - Policy name: `Users can read their own images`
   - Allowed operation: `SELECT`
   - Target roles: `authenticated`, `anon`
   - Policy definition (copy everything AFTER this line, do NOT include the backticks):

   `bucket_id = 'wardrobe-images'::text`

   **Policy 3: Allow authenticated users to delete their own images**
   - Policy name: `Users can delete their own images`
   - Allowed operation: `DELETE`
   - Target roles: `authenticated`
   - Policy definition (copy everything AFTER this line, do NOT include the backticks):

   `(bucket_id = 'wardrobe-images'::text) AND (auth.uid()::text = (storage.foldername(name))[1])`

## Step 2: Create Database Table

1. Go to **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create wardrobe_items table
CREATE TABLE wardrobe_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  name TEXT,
  color TEXT,
  slot_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX wardrobe_items_user_id_idx ON wardrobe_items(user_id);

-- Enable Row Level Security
ALTER TABLE wardrobe_items ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own items
CREATE POLICY "Users can view their own wardrobe items"
  ON wardrobe_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own items
CREATE POLICY "Users can insert their own wardrobe items"
  ON wardrobe_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own items
CREATE POLICY "Users can update their own wardrobe items"
  ON wardrobe_items
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own items
CREATE POLICY "Users can delete their own wardrobe items"
  ON wardrobe_items
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_wardrobe_items_updated_at
  BEFORE UPDATE ON wardrobe_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"** to execute the SQL
5. You should see "Success. No rows returned"

## Step 3: Verify Setup

1. Go to **Table Editor** in the left sidebar
2. You should see the `wardrobe_items` table
3. Go to **Storage** and verify the `wardrobe-images` bucket exists

That's it! Your database is ready for the app to use.
