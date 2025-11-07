# Supabase Setup Instructions

Follow these steps to set up your Supabase database and storage for the profile feature:

## 1. Create the Profiles Table

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to the **SQL Editor** (in the left sidebar)
4. Click **New Query**
5. Copy and paste the contents of `supabase-setup.sql`
6. Click **Run** to execute the SQL

This will create:
- The `profiles` table with columns for first_name, last_name, profile_image_url, and gender_preference
- Row Level Security (RLS) policies so users can only access their own profile
- An automatic updated_at trigger

**If you already have the profiles table:** Run `supabase-migration-gender-preference.sql` instead to add the gender_preference column to your existing table.

## 2. Create the Storage Bucket

1. In your Supabase dashboard, go to **Storage** (in the left sidebar)
2. Click **New Bucket**
3. Set the bucket name: `user-uploads`
4. Make it **Public** (so profile images can be accessed)
5. Click **Create bucket**

## 3. Set Storage Policies

After creating the bucket:

1. Click on the `user-uploads` bucket
2. Go to **Policies** tab
3. Click **New Policy**
4. Create these policies:

### Policy 1: Upload and Update Policy
- **Policy Name:** Users can upload and update their own files
- **Allowed operations:** INSERT, UPDATE
- **Target roles:** authenticated
- **Policy definition:**
```sql
(bucket_id = 'user-uploads'::text)
```

**Note:** This allows all authenticated users to upload to the bucket. For stricter security where users can only upload to their own folder, use:
```sql
((bucket_id = 'user-uploads'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))
```
But this requires uploading files to folders named after the user ID (e.g., `{user-id}/profile.jpg`)

### Policy 2: Read Policy
- **Policy Name:** Public files are readable
- **Allowed operation:** SELECT
- **Target roles:** anon, authenticated
- **Policy definition:**
```sql
(bucket_id = 'user-uploads'::text)
```

### Policy 3: Delete Policy
- **Policy Name:** Users can delete their own files
- **Allowed operation:** DELETE
- **Target roles:** authenticated
- **Policy definition:**
```sql
(bucket_id = 'user-uploads'::text)
```

**Note:** This allows all authenticated users to delete from the bucket. For stricter security, use the folder-based approach mentioned in Policy 1.

## 4. Verify Setup

Once complete, you should be able to:
- Create and edit your profile with first/last name
- Upload a profile image
- See your profile image displayed in the app
