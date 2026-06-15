import { useState } from 'react';
import { decodeSymbols } from '../../cipher';

/** Live decoder — paste symbols, see plaintext. Secondary tool for winners. */
export default function InlineDecoder() {
  const [input, setInput] = useState('');
  const decoded = input ? decodeSymbols(input) : '';

  return (
    <div className="mt-6 border border-ink/20 p-4 bg-parchment/30">
      <div className="flex items-baseline gap-2 mb-3">
        <p className="font-mincho text-sm text-ink-faded" lang="ja">解読器</p>
        <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-ink-ghost">
          / INLINE DECODER
        </p>
      </div>

      <p className="font-garamond text-sm italic text-ink-ghost mb-3">
        Paste cipher symbols from the archive image to reveal the hidden words.
      </p>

      {/* Symbol input */}
      <div className="space-y-3">
        <div>
          <label className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-ink-ghost block mb-1">
            Cipher symbols
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="☰☷☿ ☲☵…"
            className="archive-input font-mincho text-xl"
            aria-label="Paste cipher symbols here"
          />
        </div>

        {/* Decoded output */}
        {decoded && (
          <div className="animate-fade-in">
            <label className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-ink-ghost block mb-1">
              Decoded record
            </label>
            <div
              className="
                border border-gold/30 bg-parchment-light/50 px-4 py-3
                font-cinzel text-base tracking-[0.2em] uppercase text-ink
              "
              aria-live="polite"
              aria-label="Decoded text"
            >
              {decoded}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
