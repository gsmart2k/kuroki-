import { CIPHER } from '../../cipher';
import CipherCell from './CipherCell';
import InlineDecoder from './InlineDecoder';

/** Section 1 — 鏡の鍵 / THE MIRROR KEY */
export default function CipherDictionary() {
  const entries = Object.entries(CIPHER);

  return (
    <section aria-labelledby="cipher-heading">
      {/* Section heading */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-gold/30" />
          <span className="text-gold text-xs">❀</span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>

        <div className="text-center">
          <p className="font-mincho text-2xl text-ink mb-1" lang="ja" id="cipher-heading">
            鏡の鍵
          </p>
          <h2 className="font-cinzel text-xs tracking-[0.4em] uppercase text-ink-faded">
            THE MIRROR KEY
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <div className="flex-1 h-px bg-gold/30" />
          <span className="text-gold text-xs">❀</span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>
      </div>

      {/* Intro copy */}
      <p className="font-garamond text-base italic text-ink-faded text-center mb-1">
        A cipher image is released on Twitter. Use this key to decode the hidden words and claim victory.
      </p>
      <p className="font-mincho text-sm text-ink-ghost text-center mb-6" lang="ja">
        Twitterに公開された暗号画像を、以下の鍵で解読せよ。勝者には別途、合言葉が送られる。
      </p>

      {/* Cipher grid — 6 columns desktop, 4 mobile */}
      <div
        className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 md:gap-2"
        role="table"
        aria-label="Cipher key: letter to symbol mapping"
      >
        {entries.map(([letter, symbol]) => (
          <CipherCell key={letter} letter={letter} symbol={symbol} />
        ))}
      </div>

      {/* Inline decoder */}
      <InlineDecoder />
    </section>
  );
}
