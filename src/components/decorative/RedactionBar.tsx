interface RedactionBarProps {
  label?: string;
}

/**
 * Irregular sumi-e brush-stroke redaction bar.
 * Used for error states and decorative redacted passages.
 */
export default function RedactionBar({ label }: RedactionBarProps) {
  return (
    <div className="relative my-3 flex items-center gap-3">
      {/* Brush stroke — SVG irregular rectangle */}
      <svg
        viewBox="0 0 260 28"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-1 h-6 opacity-90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="
            M 2,6 C 10,2 25,0 45,1 L 220,2 C 238,1 255,3 258,7
            L 257,22 C 254,26 240,28 218,27 L 42,26 C 22,27 5,25 2,21
            Z
          "
          fill="#1a1108"
        />
        {/* Ink-bleed fringe marks */}
        <path d="M 30,1 L 28,0 L 32,0 Z" fill="#1a1108" opacity="0.7" />
        <path d="M 180,2 L 178,0 L 182,1 Z" fill="#1a1108" opacity="0.5" />
        <path d="M 90,27 L 88,28 L 94,28 Z" fill="#1a1108" opacity="0.6" />
        <path d="M 240,26 L 238,28 L 244,27 Z" fill="#1a1108" opacity="0.4" />
      </svg>

      {/* Label beside the stroke */}
      {label && (
        <span className="shrink-0 font-cinzel text-[10px] tracking-widest text-vermilion uppercase whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
