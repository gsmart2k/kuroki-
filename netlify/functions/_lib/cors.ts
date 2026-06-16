export function corsHeaders(origin?: string): Record<string, string> {
  const allowed = process.env.ALLOWED_ORIGIN || origin || '*';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}
