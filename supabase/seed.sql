-- ─── KUROKI ARCHIVE — Whitelist Passcodes (Batch 1 of 50) ───────────────────
-- Generated: 2026-06-15
-- Insert these into Supabase via the SQL editor, or run:
--   supabase db push  (if using Supabase CLI)
--
-- These are the PLAINTEXT codes. Distribute the CIPHER-ENCODED versions
-- on Twitter so winners have to use Section 1 of the archive to decode them.
-- Use scripts/generate-codes.ts to produce more batches at any time.

insert into codes (code) values
  ('724639'),
  ('353383'),
  ('734968'),
  ('158968'),
  ('879944'),
  ('942277'),
  ('858526'),
  ('133764'),
  ('130589'),
  ('408052'),
  ('194899'),
  ('608846'),
  ('158067'),
  ('880151'),
  ('100271'),
  ('342339'),
  ('726423'),
  ('787792'),
  ('319816'),
  ('954989'),
  ('886170'),
  ('458157'),
  ('705572'),
  ('642629'),
  ('589727'),
  ('477363'),
  ('712698'),
  ('368777'),
  ('271795'),
  ('349560'),
  ('766510'),
  ('641679'),
  ('204867'),
  ('299769'),
  ('528212'),
  ('845972'),
  ('519867'),
  ('309688'),
  ('765952'),
  ('198887'),
  ('470694'),
  ('248128'),
  ('304090'),
  ('373902'),
  ('804209'),
  ('511293'),
  ('602489'),
  ('866684'),
  ('852726'),
  ('627514')
on conflict (code) do nothing;

-- These codes are sent privately to game winners (e.g. via Twitter DM).
-- They are NOT distributed publicly and are unrelated to the cipher puzzle.
-- The cipher puzzle is a separate game played via Twitter images.
