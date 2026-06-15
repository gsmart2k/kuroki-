/**
 * A–Z cipher mapping. Each letter maps to a unique symbol drawn from
 * I Ching trigrams, classical alchemical/astronomical glyphs, and
 * archaic geometric signs — visually consistent with the archive theme.
 *
 * To distribute a Twitter clue written in these symbols, winners decode
 * each glyph against this key and enter the resulting plaintext passphrase
 * into the Ledger Gate (Section 2).
 */
export const CIPHER: Record<string, string> = {
  A: '☰', // I Ching — Heaven
  B: '☱', // I Ching — Lake
  C: '☲', // I Ching — Fire
  D: '☳', // I Ching — Thunder
  E: '☴', // I Ching — Wind
  F: '☵', // I Ching — Water
  G: '☶', // I Ching — Mountain
  H: '☷', // I Ching — Earth
  I: '☿', // Alchemical — Mercury
  J: '♀', // Alchemical — Venus
  K: '♂', // Alchemical — Mars
  L: '♃', // Alchemical — Jupiter
  M: '♄', // Alchemical — Saturn
  N: '♅', // Alchemical — Uranus
  O: '♆', // Alchemical — Neptune
  P: '☉', // Alchemical — Sun / Gold
  Q: '☽', // Astronomical — Crescent Moon
  R: '⊕', // Geometric — Circled Plus / Earth
  S: '⊗', // Geometric — Circled Times
  T: '⊙', // Geometric — Bullseye / Sun point
  U: '⌖', // Geometric — Position indicator
  V: '✦', // Ornamental — Black four-pointed star
  W: '✧', // Ornamental — White four-pointed star
  X: '⌘', // Archaic — Place of interest
  Y: '❧', // Typographic — Floral heart / hedera
  Z: '⍟', // Mathematical — APL star diaeresis
};

/** Reverse map: symbol → letter, for the live decoder */
export const REVERSE_CIPHER: Record<string, string> = Object.fromEntries(
  Object.entries(CIPHER).map(([letter, symbol]) => [symbol, letter]),
);

/** Decode a string of symbols back to plaintext letters */
export function decodeSymbols(input: string): string {
  return [...input]
    .map((char) => REVERSE_CIPHER[char] ?? (char === ' ' ? ' ' : '·'))
    .join('');
}
