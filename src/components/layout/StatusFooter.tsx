import HankoSeal from '../decorative/HankoSeal';

const ROWS = [
  { label: 'STATUS', labelJa: '状態', value: 'ACTIVE — ACCEPTING SUBMISSIONS' },
  { label: 'ACCESS LEVEL', labelJa: 'アクセス区分', value: 'CIPHER-HOLDERS ONLY' },
  { label: 'ORIGIN', labelJa: '発行元', value: 'KUROKI ARCHIVE — TSUKIHARA DIVISION' },
  { label: 'PROTOCOL', labelJa: 'プロトコル', value: 'SINGLE-USE PASSPHRASE · ERC-20 ENTRY' },
] as const;

/** Archive-style bordered status box at the bottom of the document */
export default function StatusFooter() {
  return (
    <footer className="mt-12 border border-ink/20 relative">
      {/* Corner marks */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} w-3 h-3 border-ink/40 ${
            pos.includes('top-0 left-0')    ? 'border-t border-l' :
            pos.includes('top-0 right-0')   ? 'border-t border-r' :
            pos.includes('bottom-0 left-0') ? 'border-b border-l' :
                                               'border-b border-r'
          }`}
        />
      ))}

      <div className="p-4 md:p-6 flex items-start gap-6">
        {/* Data rows */}
        <div className="flex-1 space-y-3">
          {ROWS.map(({ label, labelJa, value }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <dt className="flex items-baseline gap-2 shrink-0">
                <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-ink-ghost">
                  {label}
                </span>
                <span className="font-mincho text-[10px] text-ink-ghost/70" lang="ja">
                  / {labelJa}
                </span>
              </dt>
              <div className="flex-1 border-b border-dotted border-ink/20" />
              <dd className="font-garamond text-sm text-ink-faded italic shrink-0">
                {value}
              </dd>
            </div>
          ))}
        </div>

        {/* Corner seal */}
        <div className="shrink-0 opacity-75 rotate-[8deg]">
          <HankoSeal variant="square" className="w-14 h-14" />
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-t border-ink/10 px-6 py-2 flex items-center justify-between">
        <p className="font-cinzel text-[9px] tracking-widest uppercase text-ink-ghost/60">
          黒木記録 · KUROKI ARCHIVE · 月原文書館
        </p>
        <p className="font-mincho text-[9px] text-ink-ghost/50" lang="ja">
          無断複製禁止
        </p>
      </div>
    </footer>
  );
}
