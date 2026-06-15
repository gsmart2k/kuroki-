import { supabase } from './supabase';

const WINDOW_MS = 60_000; // 1 minute
const MAX_ATTEMPTS = 10;

/**
 * Check and increment rate-limit for an IP address.
 * Returns true when the request is allowed, false when rate-limited.
 * Uses the `rate_limits` table with atomic upsert.
 */
export async function checkRateLimit(ip: string): Promise<boolean> {
  // Upsert ensures the row exists; we then read + conditionally update
  const { data, error } = await supabase
    .from('rate_limits')
    .upsert(
      { ip_address: ip, attempt_count: 0, window_start: new Date().toISOString() },
      { onConflict: 'ip_address', ignoreDuplicates: true },
    )
    .select('attempt_count, window_start')
    .single();

  if (error && error.code !== '23505') {
    // Non-duplicate error — fail open (don't block the user due to DB issues)
    console.error('Rate limit DB error:', error);
    return true;
  }

  // Re-fetch current state after upsert
  const { data: row, error: fetchErr } = await supabase
    .from('rate_limits')
    .select('attempt_count, window_start')
    .eq('ip_address', ip)
    .single();

  if (fetchErr || !row) return true; // fail open

  const windowStart = new Date(row.window_start as string).getTime();
  const now = Date.now();

  if (now - windowStart > WINDOW_MS) {
    // Window expired — reset
    await supabase
      .from('rate_limits')
      .update({ attempt_count: 1, window_start: new Date().toISOString() })
      .eq('ip_address', ip);
    return true;
  }

  if ((row.attempt_count as number) >= MAX_ATTEMPTS) {
    return false; // rate-limited
  }

  // Increment within window
  await supabase
    .from('rate_limits')
    .update({ attempt_count: (row.attempt_count as number) + 1 })
    .eq('ip_address', ip);

  return true;
}
