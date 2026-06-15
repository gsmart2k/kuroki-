interface HankoSealProps {
  variant?: 'authority' | 'square';
  className?: string;
  stamped?: boolean;
}

/** Circular imperial chrysanthemum hanko seal, drawn as inline SVG. */
export default function HankoSeal({
  variant = 'authority',
  className = '',
  stamped = false,
}: HankoSealProps) {
  if (variant === 'square') {
    return (
      <svg
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        className={`${stamped ? 'seal-stamped' : ''} ${className}`}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="54" height="54" fill="none" stroke="#9c2b25" strokeWidth="2.5" />
        <rect x="7" y="7" width="46" height="46" fill="none" stroke="#9c2b25" strokeWidth="1" />
        <text
          x="30"
          y="22"
          textAnchor="middle"
          fontFamily="Shippori Mincho, serif"
          fontSize="10"
          fill="#9c2b25"
          fontWeight="600"
        >
          黒木
        </text>
        <text
          x="30"
          y="36"
          textAnchor="middle"
          fontFamily="Shippori Mincho, serif"
          fontSize="10"
          fill="#9c2b25"
          fontWeight="600"
        >
          記録
        </text>
        <text
          x="30"
          y="50"
          textAnchor="middle"
          fontFamily="Shippori Mincho, serif"
          fontSize="8"
          fill="#9c2b25"
        >
          承認
        </text>
      </svg>
    );
  }

  // Authority — circular chrysanthemum
  const PETALS = 16;
  const PETAL_ANGLE = 360 / PETALS;

  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={`${stamped ? 'seal-stamped' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="#9c2b25" strokeWidth="3" />
      {/* Inner ring */}
      <circle cx="60" cy="60" r="47" fill="none" stroke="#9c2b25" strokeWidth="1.2" />

      {/* Chrysanthemum petals */}
      {Array.from({ length: PETALS }).map((_, i) => {
        const angle = i * PETAL_ANGLE - 90;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 32 * Math.cos(rad);
        const cy = 60 + 32 * Math.sin(rad);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5"
            ry="14"
            fill="#9c2b25"
            opacity="0.82"
            transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
          />
        );
      })}

      {/* Center disc */}
      <circle cx="60" cy="60" r="12" fill="#9c2b25" />
      <circle cx="60" cy="60" r="8" fill="none" stroke="#c8453e" strokeWidth="1.2" />

      {/* Radial spokes inside center */}
      {[0, 45, 90, 135].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={60 + 3 * Math.cos(rad)}
            y1={60 + 3 * Math.sin(rad)}
            x2={60 + 7 * Math.cos(rad)}
            y2={60 + 7 * Math.sin(rad)}
            stroke="#c8453e"
            strokeWidth="1"
          />
        );
      })}

      {/* Archive text around ring */}
      <defs>
        <path
          id="topArc"
          d={`M ${60 - 40} 60 A 40 40 0 0 1 ${60 + 40} 60`}
        />
        <path
          id="bottomArc"
          d={`M ${60 - 38} 60 A 38 38 0 0 0 ${60 + 38} 60`}
        />
      </defs>
      <text fontFamily="Cinzel, serif" fontSize="7.5" fill="#9c2b25" fontWeight="600" letterSpacing="3">
        <textPath href="#topArc" startOffset="12%">
          KUROKI ARCHIVE
        </textPath>
      </text>
      <text fontFamily="Shippori Mincho, serif" fontSize="7" fill="#9c2b25" letterSpacing="2">
        <textPath href="#bottomArc" startOffset="15%">
          黒木記録・承認印
        </textPath>
      </text>
    </svg>
  );
}
