-- ─── KUROKI ARCHIVE — Supabase Schema ───────────────────────────────────────
-- Run this in the Supabase SQL editor or via `supabase db push`.

-- Stores valid passcodes (managed by you, never shipped to the client).
create table if not exists codes (
  id          uuid        primary key default gen_random_uuid(),
  code        text        unique not null,       -- uppercase, e.g. "KUROKI-2024-A7"
  is_used     boolean     not null default false,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);

-- Whitelist entries — one row per successfully redeemed code.
create table if not exists whitelist (
  id             uuid        primary key default gen_random_uuid(),
  code           text        not null references codes(code),
  wallet_address text        unique not null,   -- ERC-20 checksummed address
  created_at     timestamptz not null default now()
);

-- Rate-limit tracking per IP address.
create table if not exists rate_limits (
  ip_address    text        primary key,
  attempt_count integer     not null default 0,
  window_start  timestamptz not null default now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
create index if not exists idx_codes_code     on codes (code);
create index if not exists idx_whitelist_code on whitelist (code);
create index if not exists idx_whitelist_addr on whitelist (wallet_address);

-- ─── Atomic redemption RPC ───────────────────────────────────────────────────
-- Called by api/redeem.ts. Marks the code used and inserts the whitelist
-- entry in a single transaction, preventing double-claims under race conditions.

create or replace function redeem_code(
  p_code           text,
  p_wallet_address text
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_is_used     boolean;
  v_code_exists boolean;
  v_wallet_exists boolean;
begin
  -- 1. Check code exists
  select exists(select 1 from codes where code = p_code),
         coalesce((select is_used from codes where code = p_code), false)
  into v_code_exists, v_is_used;

  if not v_code_exists then
    return jsonb_build_object('status', 'invalid_code');
  end if;

  if v_is_used then
    return jsonb_build_object('status', 'already_used');
  end if;

  -- 2. Check wallet uniqueness
  select exists(select 1 from whitelist where wallet_address = p_wallet_address)
  into v_wallet_exists;

  if v_wallet_exists then
    return jsonb_build_object('status', 'duplicate_wallet');
  end if;

  -- 3. Atomically mark the code used (guard against concurrent requests)
  update codes
  set    is_used = true, used_at = now()
  where  code = p_code
    and  is_used = false;   -- only update if still unused

  if not found then
    -- Lost the race — another request claimed it a millisecond earlier
    return jsonb_build_object('status', 'already_used');
  end if;

  -- 4. Insert whitelist entry
  insert into whitelist (code, wallet_address)
  values (p_code, p_wallet_address);

  return jsonb_build_object('status', 'success');

exception
  when unique_violation then
    -- wallet_address UNIQUE constraint fired between our check and insert
    return jsonb_build_object('status', 'duplicate_wallet');
end;
$$;

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- The service-role key used in API routes bypasses RLS.
-- Enable RLS so anon/user roles can't read the tables directly.

alter table codes       enable row level security;
alter table whitelist   enable row level security;
alter table rate_limits enable row level security;

-- No policies granted to anon — all access goes through serverless functions.
