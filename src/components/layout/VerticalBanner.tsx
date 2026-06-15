/**
 * Left-side tall parchment strip with large vertical Japanese text.
 * Hidden on narrow screens (collapses gracefully).
 */
export default function VerticalBanner() {
  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-14 items-center justify-center z-20"
      aria-label="Archive designation banner"
    >
      {/* Parchment strip */}
      <div
        className="h-[80vh] w-10 flex flex-col items-center justify-center gap-2 py-6"
        style={{
          background: 'linear-gradient(to right, #b89c6e, #cdb88f, #b89c6e)',
          boxShadow: '2px 0 12px rgba(5,3,1,0.6), -1px 0 4px rgba(5,3,1,0.4)',
        }}
      >
        {/* Primary vertical label */}
        <p
          className="writing-vertical font-mincho text-sm font-bold text-ink tracking-widest"
          lang="ja"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          黒木記録
        </p>

        {/* Hairline */}
        <div className="w-5 h-px bg-gold/50 my-2" />

        {/* Secondary vertical label */}
        <p
          className="writing-vertical font-mincho text-xs text-ink-faded tracking-widest"
          lang="ja"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          機密文書
        </p>

        {/* Hairline */}
        <div className="w-5 h-px bg-gold/50 my-2" />

        {/* Small decorative rune */}
        <p className="writing-vertical font-mincho text-[10px] text-gold/80 tracking-[0.3em]"
           style={{ writingMode: 'vertical-rl' }}>
          第一記録
        </p>
      </div>
    </aside>
  );
}
