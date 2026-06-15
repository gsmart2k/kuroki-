/** Gold hairline divider with centered diamond ornaments. */
export default function OrnamentalDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-8" aria-hidden="true">
      <div className="flex-1 h-px bg-gold/40" />
      <div className="flex items-center gap-2 text-gold text-xs">
        <span>❖</span>
        {label && (
          <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-ink-faded">
            {label}
          </span>
        )}
        <span>❖</span>
      </div>
      <div className="flex-1 h-px bg-gold/40" />
    </div>
  );
}
