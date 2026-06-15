/**
 * KUROKI — Whitelist Code Generator
 *
 * Usage:
 *   npx tsx scripts/generate-codes.ts           # default: 50 codes
 *   npx tsx scripts/generate-codes.ts 100       # custom count
 *
 * Outputs a ready-to-paste SQL INSERT block. Paste it into the Supabase
 * SQL editor (or append to supabase/seed.sql and run `supabase db push`).
 */

const count = parseInt(process.argv[2] ?? '50', 10);
if (isNaN(count) || count < 1 || count > 10_000) {
  console.error('Usage: npx tsx scripts/generate-codes.ts [count]  (1–10000)');
  process.exit(1);
}

function generate6DigitCode(): string {
  // 100000–999999 — no leading zero, always 6 digits
  return String(Math.floor(Math.random() * 900_000) + 100_000);
}

const codes = new Set<string>();
while (codes.size < count) {
  codes.add(generate6DigitCode());
}

const today = new Date().toISOString().slice(0, 10);
const values = [...codes].map((c) => `  ('${c}')`).join(',\n');

console.log(`-- KUROKI codes — generated ${today} — batch of ${count}`);
console.log(`insert into codes (code) values`);
console.log(`${values}`);
console.log(`on conflict (code) do nothing;`);
