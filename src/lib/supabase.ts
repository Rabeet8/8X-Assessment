import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in a .env.local file.
// If they are missing, we pass empty strings just to prevent immediate build crashes,
// but Supabase will throw an error when used until you add your keys.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
