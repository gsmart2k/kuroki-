import type { Handler } from '@netlify/functions';
import { supabase } from './_lib/supabase';
import { corsHeaders } from './_lib/cors';

const MAX_CODE_LENGTH = 64;
const WALLET_RE = /^0x[a-fA-F0-9]{40}$/;

export const handler: Handler = async (event) => {
  const headers = corsHeaders(event.headers['origin']);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body: { code?: unknown; walletAddress?: unknown };
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ status: 'error', reason: 'bad_request' }) };
  }

  if (typeof body.code !== 'string' || typeof body.walletAddress !== 'string') {
    return { statusCode: 400, headers, body: JSON.stringify({ status: 'error', reason: 'bad_request' }) };
  }

  const code = body.code.trim().toUpperCase();
  const walletAddress = body.walletAddress.trim();

  if (!code || code.length > MAX_CODE_LENGTH) {
    return { statusCode: 400, headers, body: JSON.stringify({ status: 'error', reason: 'bad_request' }) };
  }

  if (!WALLET_RE.test(walletAddress)) {
    return { statusCode: 400, headers, body: JSON.stringify({ status: 'error', reason: 'bad_address' }) };
  }

  const { data, error } = await supabase.rpc('redeem_code', {
    p_code: code,
    p_wallet_address: walletAddress,
  });

  if (error) {
    console.error('redeem RPC error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ status: 'error', reason: 'server_error' }) };
  }

  const result = data as {
    status: 'success' | 'invalid_code' | 'already_used' | 'duplicate_wallet';
  };

  if (result.status === 'success') {
    return { statusCode: 200, headers, body: JSON.stringify({ status: 'success', wallet: walletAddress }) };
  }

  const statusCode = result.status === 'invalid_code' || result.status === 'already_used' ? 400 : 409;
  return { statusCode, headers, body: JSON.stringify({ status: 'error', reason: result.status }) };
};
