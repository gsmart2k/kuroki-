/** Mon crest + archive title block */
export default function ArchiveHeader() {
  return (
    <header className="text-center mb-6">
      {/* Mon crest — stylized kanji in a double circle */}
      <div className="inline-flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 opacity-80"
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="37" fill="none" stroke="#4a3d2c" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="31" fill="none" stroke="#4a3d2c" strokeWidth="0.8" />
          {/* Stylized 黒 character in the center */}
          <text
            x="40"
            y="47"
            textAnchor="middle"
            fontFamily="Shippori Mincho, serif"
            fontSize="24"
            fill="#211a12"
            fontWeight="700"
          >
            黒
          </text>
          {/* Four cardinal marks */}
          {[0, 90, 180, 270].map((a) => {
            const rad = ((a - 90) * Math.PI) / 180;
            const x1 = 40 + 33 * Math.cos(rad);
            const y1 = 40 + 33 * Math.sin(rad);
            const x2 = 40 + 37 * Math.cos(rad);
            const y2 = 40 + 37 * Math.sin(rad);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4a3d2c" strokeWidth="1.5" />;
          })}
        </svg>
      </div>

      {/* Entry designation */}
      <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-ink-faded mb-1">
        ◈ &nbsp; ARCHIVE ENTRY №&nbsp;001 &nbsp; ◈
      </p>

      {/* Main title */}
      <h1 className="font-cinzel text-3xl md:text-4xl font-bold tracking-widest uppercase text-ink leading-none mb-2">
        KUROKI&nbsp;ARCHIVE
      </h1>
      <p
        className="font-mincho text-xl md:text-2xl text-ink-faded tracking-wider"
        lang="ja"
      >
        黒木記録 — 月原文書館
      </p>
    </header>
  );
}
