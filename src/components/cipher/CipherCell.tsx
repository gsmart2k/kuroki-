interface CipherCellProps {
  letter: string;
  symbol: string;
}

/** One letter→symbol pair in the cipher key grid */
export default function CipherCell({ letter, symbol }: CipherCellProps) {
  return (
    <div
      className="
        cipher-cell group relative flex flex-col items-center justify-center
        border border-ink/15 bg-parchment-light/30 p-2 md:p-3
        cursor-default select-none
        transition-all duration-200
        hover:bg-parchment-light/60 hover:-translate-y-0.5
      "
      title={`${letter} = ${symbol}`}
    >
      {/* Symbol — large, prominent */}
      <span
        className="
          text-2xl md:text-3xl text-ink leading-none mb-1
          transition-transform duration-200 group-hover:scale-110
        "
        aria-label={`Symbol for ${letter}`}
      >
        {symbol}
      </span>

      {/* Hairline */}
      <div className="w-5 h-px bg-gold/40 mb-1" />

      {/* Letter — small, faded */}
      <span className="font-cinzel text-[11px] font-semibold tracking-widest uppercase text-ink-ghost">
        {letter}
      </span>
    </div>
  );
}
