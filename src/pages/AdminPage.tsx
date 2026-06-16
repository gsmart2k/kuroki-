import { useState } from 'react';
import { CIPHER } from '../cipher';
import HankoSeal from '../components/decorative/HankoSeal';

function encodeToCipher(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => CIPHER[char] ?? char)
    .join('');
}

export default function AdminPage() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const encoded = encodeToCipher(input);

  async function copyEncoded() {
    if (!encoded) return;
    await navigator.clipboard.writeText(encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyBoth() {
    if (!input) return;
    const text = `Original: ${input}\nCipher:   ${encoded}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-wood-radial bg-wood flex items-start justify-center py-12 px-4">
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #0a0603 100%)' }} />

      <div className="relative z-10 w-full max-w-3xl animate-archive-rise">
        {/* Card */}
        <div className="relative bg-parchment rounded-sm overflow-hidden"
          style={{ boxShadow: '0 25px 80px rgba(5,3,1,0.95), inset 0 0 60px rgba(10,5,2,0.2)' }}>

          {/* Burned edges overlay */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            background: `
              radial-gradient(ellipse 140px 120px at 0% 0%, rgba(8,4,2,0.75) 0%, transparent 70%),
              radial-gradient(ellipse 140px 120px at 100% 0%, rgba(8,4,2,0.65) 0%, transparent 70%),
              radial-gradient(ellipse 140px 120px at 0% 100%, rgba(8,4,2,0.75) 0%, transparent 70%),
              radial-gradient(ellipse 140px 120px at 100% 100%, rgba(8,4,2,0.8) 0%, transparent 70%),
              linear-gradient(to bottom, rgba(8,4,2,0.4) 0%, transparent 7%),
              linear-gradient(to top, rgba(8,4,2,0.4) 0%, transparent 7%)
            `
          }} />

          {/* Authority seal */}
          <div className="absolute top-5 right-5 z-20 opacity-80">
            <HankoSeal className="w-16 h-16" />
          </div>

          <div className="relative z-10 p-8 md:p-12">

            {/* Header */}
            <div className="text-center mb-8">
              <p className="font-mincho text-ink-faded text-sm tracking-widest mb-1" lang="ja">管理者専用</p>
              <h1 className="font-cinzel text-2xl md:text-3xl font-semibold tracking-widest text-ink uppercase">
                Admin — Cipher Encoder
              </h1>
              <p className="font-garamond italic text-ink-faded text-sm mt-1">
                Type plaintext below. The cipher output is ready to paste into your Twitter image.
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-gold opacity-40" />
                <span className="text-vermilion text-xs tracking-widest font-cinzel">◈ ENCODE ◈</span>
                <div className="flex-1 h-px bg-gold opacity-40" />
              </div>
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="block font-cinzel text-xs tracking-widest text-ink-faded uppercase mb-2">
                Plaintext / 平文
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="KUROKI IS ALPHA"
                rows={3}
                className="w-full bg-parchment-light border border-gold/30 rounded-sm px-4 py-3
                  font-garamond text-lg text-ink placeholder-ink-ghost/50
                  focus:outline-none focus:border-gold/70 focus:ring-1 focus:ring-gold/30
                  resize-none transition-colors"
              />
              <p className="font-garamond text-xs text-ink-ghost mt-1">
                Letters A–Z are encoded. Spaces, numbers, and punctuation pass through unchanged.
              </p>
            </div>

            {/* Output */}
            <div className="mb-8">
              <label className="block font-cinzel text-xs tracking-widest text-ink-faded uppercase mb-2">
                Cipher Output / 暗号出力
              </label>
              <div
                className="w-full min-h-[80px] bg-ink/5 border border-gold/30 rounded-sm px-4 py-3
                  font-garamond text-2xl text-ink leading-relaxed tracking-widest break-all select-all"
              >
                {encoded || <span className="text-ink-ghost/40 text-base font-garamond italic">Cipher symbols will appear here…</span>}
              </div>
            </div>

            {/* Letter-by-letter breakdown */}
            {input.trim() && (
              <div className="mb-8">
                <label className="block font-cinzel text-xs tracking-widest text-ink-faded uppercase mb-3">
                  Character Map / 文字対応
                </label>
                <div className="flex flex-wrap gap-2">
                  {input
                    .toUpperCase()
                    .split('')
                    .map((char, i) => {
                      const symbol = CIPHER[char];
                      if (!symbol) {
                        return (
                          <div key={i} className="flex flex-col items-center bg-ink/5 rounded-sm px-2 py-1 min-w-[36px]">
                            <span className="font-garamond text-xl text-ink-faded">{char === ' ' ? '␣' : char}</span>
                            <span className="text-[10px] font-cinzel text-ink-ghost/60">—</span>
                          </div>
                        );
                      }
                      return (
                        <div key={i}
                          className="flex flex-col items-center bg-parchment-light border border-gold/20
                            rounded-sm px-2 py-1 min-w-[36px] hover:border-gold/50 transition-colors">
                          <span className="font-garamond text-xl text-ink">{symbol}</span>
                          <span className="text-[10px] font-cinzel text-ink-faded">{char}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyEncoded}
                disabled={!encoded}
                className="flex-1 font-cinzel text-xs tracking-widest uppercase py-3 px-4
                  bg-vermilion text-parchment-light border border-vermilion-deep
                  hover:bg-vermilion-deep disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors rounded-sm"
              >
                {copied ? '✓ Copied' : 'Copy Cipher Symbols'}
              </button>
              <button
                onClick={copyBoth}
                disabled={!input}
                className="flex-1 font-cinzel text-xs tracking-widest uppercase py-3 px-4
                  bg-transparent text-ink border border-gold/40
                  hover:bg-ink/5 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors rounded-sm"
              >
                Copy Both (Original + Cipher)
              </button>
              <button
                onClick={() => { setInput(''); setCopied(false); }}
                disabled={!input}
                className="font-cinzel text-xs tracking-widest uppercase py-3 px-4
                  bg-transparent text-ink-ghost border border-ink/10
                  hover:bg-ink/5 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors rounded-sm"
              >
                Clear
              </button>
            </div>

            {/* Footer nav */}
            <div className="mt-10 pt-6 border-t border-gold/20 text-center">
              <a
                href="/"
                className="font-cinzel text-xs tracking-widest text-ink-faded hover:text-ink
                  uppercase transition-colors"
              >
                ← Return to Archive
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
