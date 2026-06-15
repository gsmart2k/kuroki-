import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase';
import { handlePreflight, setCors } from './_lib/cors';

const MAX_CODE_LENGTH = 64;
const WALLET_RE = /^0x[a-fA-F0-9]{40}$/;

function isValidAddress(addr: string): boolean {
  return WALLET_RE.test(addr);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as { code?: unknown; walletAddress?: unknown };
  if (!body || typeof body.code !== 'string' || typeof body.walletAddress !== 'string') {
    return res.status(400).json({ status: 'error', reason: 'bad_request' });
  }

  const code = body.code.trim().toUpperCase();
  const walletAddress = body.walletAddress.trim();

  if (!code || code.length > MAX_CODE_LENGTH) {
    return res.status(400).json({ status: 'error', reason: 'bad_request' });
  }

  if (!isValidAddress(walletAddress)) {
    return res.status(400).json({ status: 'error', reason: 'bad_address' });
  }

  const { data, error } = await supabase.rpc('redeem_code', {
    p_code: code,
    p_wallet_address: walletAddress,
  });

  if (error) {
    console.error('redeem RPC error:', error);
    return res.status(500).json({ status: 'error', reason: 'server_error' });
  }

  const result = data as {
    status: 'success' | 'invalid_code' | 'already_used' | 'duplicate_wallet';
  };

  if (result.status === 'success') {
    return res.status(200).json({ status: 'success', wallet: walletAddress });
  }

  const httpStatus =
    result.status === 'invalid_code' || result.status === 'already_used' ? 400 : 409;

  return res.status(httpStatus).json({ status: 'error', reason: result.status });
}
