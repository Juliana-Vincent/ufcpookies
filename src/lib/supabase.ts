import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("CRITICAL: Supabase URL is missing from .env.local");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("CRITICAL: Supabase Anon Key is missing from .env.local");
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("API keys missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);