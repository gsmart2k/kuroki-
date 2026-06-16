import { supabase } from './supabase';

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;

export async function checkRateLimit(ip: string): Promise<boolean> {
  const { error } = await supabase
    .from('rate_limits')
    .upsert(
      { ip_address: ip, attempt_count: 0, window_start: new Date().toISOString() },
      { onConflict: 'ip_address', ignoreDuplicates: true },
    );

  if (error && error.code !== '23505') {
    console.error('Rate limit upsert error:', error);
    return true; // fail open
  }

  const { data: row, error: fetchErr } = await supabase
    .from('rate_limits')
    .select('attempt_count, window_start')
    .eq('ip_address', ip)
    .single();

  if (fetchErr || !row) return true;

  const windowStart = new Date(row.window_start as string).getTime();
  const now = Date.now();

  if (now - windowStart > WINDOW_MS) {
    await supabase
      .from('rate_limits')
      .update({ attempt_count: 1, window_start: new Date().toISOString() })
      .eq('ip_address', ip);
    return true;
  }

  if ((row.attempt_count as number) >= MAX_ATTEMPTS) return false;

  await supabase
    .from('rate_limits')
    .update({ attempt_count: (row.attempt_count as number) + 1 })
    .eq('ip_address', ip);

  return true;
}
