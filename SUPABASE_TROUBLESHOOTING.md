# Supabase RLS Policy Troubleshooting

If you're getting "new row violates row-level security policy" error, follow these steps:

## 1. Verify the Policies Were Created

Go to your Supabase dashboard:
1. Navigate to **Authentication** → **Policies** (in left sidebar under Tables)
2. Find the `profiles` table
3. You should see 4 policies:
   - "Users can view their own profile" (SELECT)
   - "Users can insert their own profile" (INSERT)
   - "Users can update their own profile" (UPDATE)
   - "Users can delete their own profile" (DELETE)

## 2. Test the Policy Manually

In the Supabase SQL Editor, run this test query while logged in as a user:

```sql
-- Check if auth.uid() is working
SELECT auth.uid();
```

This should return your current user's UUID. If it returns `null`, you're not authenticated.

## 3. Check if Policies Exist

Run this in SQL Editor:

```sql
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

You should see 4 rows (one for each policy).

## 4. Verify User ID Match

The error occurs when `auth.uid()` doesn't match the `user_id` being inserted. Add console logging to verify:

In your app, check the console logs when you try to save:
- The `user.id` should be logged in `handleSaveProfile`
- Make sure this matches your authenticated user's ID in Supabase

## 5. Alternative: Temporarily Disable RLS for Testing

**⚠️ ONLY FOR TESTING - DO NOT USE IN PRODUCTION**

If you want to test if the issue is with RLS:

```sql
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

Try creating a profile. If it works, the issue is with the policies. Re-enable RLS:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

## 6. Recreate Policies

If policies are incorrect, drop and recreate them:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- Recreate policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id);
```

## 7. Common Issues

### Issue: auth.uid() returns NULL
**Solution**: Make sure you're logged in and the Supabase client is configured with the JWT token.

### Issue: Wrong user_id being passed
**Solution**: Check that `user.id` in your React Native app matches the authenticated user in Supabase.

### Issue: Policy syntax error
**Solution**: Make sure the SQL was run without errors. Check the Supabase dashboard logs.

## 8. Add Debug Logging

Add this to your `handleSaveProfile` function to debug:

```typescript
console.log('Current user ID:', user.id);
console.log('Attempting to save profile for user:', user.id);
```

Check the console output when you try to save your profile.
