import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Apply CORS headers to every response.
 * Origin is restricted to ALLOWED_ORIGIN env var when set,
 * otherwise falls back to the request's own origin (same-site).
 */
export function setCors(req: VercelRequest, res: VercelResponse): void {
  const allowed = process.env.ALLOWED_ORIGIN;
  const origin = allowed || req.headers.origin || '*';

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

/**
 * Handle OPTIONS preflight and return true if the caller should stop.
 * Usage: if (handlePreflight(req, res)) return;
 */
export function handlePreflight(req: VercelRequest, res: VercelResponse): boolean {
  setCors(req, res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
