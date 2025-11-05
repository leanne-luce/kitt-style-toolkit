import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Use hardcoded values if env vars are not set or contain placeholder text
const envUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const envKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = (envUrl && envUrl.startsWith('https://'))
  ? envUrl
  : 'https://bcohnxfrzzfvgodzddah.supabase.co';

const supabaseAnonKey = (envKey && envKey.startsWith('eyJ'))
  ? envKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjb2hueGZyenpmdmdvZHpkZGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg1OTMsImV4cCI6MjA3NzkzNDU5M30.7uNRnLDTqZ34y4gPzRfRppZAhPJt3V_RKTkdsEHQPmA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
