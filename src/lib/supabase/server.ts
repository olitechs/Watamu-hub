import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the public anon key. Writes are
 * protected by Row Level Security (see
 * supabase/migrations/0002_property_enquiries.sql) — anyone may INSERT an
 * enquiry, only admins may SELECT.
 *
 * Returns null when env vars are missing so the form degrades gracefully
 * (still shows success + the WhatsApp fallback) in local/dev setups.
 */
export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
