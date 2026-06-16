import type { Handler, HandlerEvent } from '@netlify/functions';
import { supabase } from './_lib/supabase';
import { checkRateLimit } from './_lib/ratelimit';
import { corsHeaders } from './_lib/cors';

const MAX_CODE_LENGTH = 64;

function getClientIp(event: HandlerEvent): string {
  return (
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0].trim() ||
    'unknown'
  );
}

export const handler: Handler = async (event) => {
  const headers = corsHeaders(event.headers['origin']);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const ip = getClientIp(event);
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Too many attempts. Please wait before trying again.' }),
    };
  }

  let body: { code?: unknown };
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  if (typeof body.code !== 'string') {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const rawCode = body.code.trim().toUpperCase();
  if (!rawCode || rawCode.length > MAX_CODE_LENGTH) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Code is missing or too long.' }) };
  }

  const { data, error } = await supabase
    .from('codes')
    .select('code, is_used')
    .eq('code', rawCode)
    .maybeSingle();

  if (error) {
    console.error('verify DB error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error.' }) };
  }

  if (!data)        return { statusCode: 200, headers, body: JSON.stringify({ status: 'invalid' }) };
  if (data.is_used) return { statusCode: 200, headers, body: JSON.stringify({ status: 'already_used' }) };
  return { statusCode: 200, headers, body: JSON.stringify({ status: 'valid' }) };
};
