import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase';
import { checkRateLimit } from './_lib/ratelimit';
import { handlePreflight, setCors } from './_lib/cors';

const MAX_CODE_LENGTH = 64;

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress ?? 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);

  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Too many attempts. Please wait before trying again.' });
  }

  const body = req.body as { code?: unknown };
  if (!body || typeof body.code !== 'string') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const rawCode = body.code.trim().toUpperCase();
  if (!rawCode || rawCode.length > MAX_CODE_LENGTH) {
    return res.status(400).json({ error: 'Code is missing or too long.' });
  }

  const { data, error } = await supabase
    .from('codes')
    .select('code, is_used')
    .eq('code', rawCode)
    .maybeSingle();

  if (error) {
    console.error('verify DB error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }

  if (!data) return res.status(200).json({ status: 'invalid' });
  if (data.is_used) return res.status(200).json({ status: 'already_used' });
  return res.status(200).json({ status: 'valid' });
}
