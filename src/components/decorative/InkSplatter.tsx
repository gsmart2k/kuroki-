/** Subtle ink-spatter glyphs scattered for grime/authenticity. */
export default function InkSplatter() {
  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      {/* Top-left spatter */}
      <svg
        viewBox="0 0 80 60"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-12 left-8 w-16 opacity-[0.07]"
      >
        <circle cx="20" cy="20" r="8" fill="#211a12" />
        <circle cx="35" cy="12" r="3" fill="#211a12" />
        <circle cx="14" cy="32" r="2" fill="#211a12" />
        <circle cx="45" cy="25" r="1.5" fill="#211a12" />
        <circle cx="28" cy="38" r="1" fill="#211a12" />
        <ellipse cx="10" cy="22" rx="2" ry="4" fill="#211a12" transform="rotate(30 10 22)" />
        <ellipse cx="30" cy="8"  rx="1.5" ry="3" fill="#211a12" transform="rotate(-20 30 8)" />
      </svg>

      {/* Bottom-right spatter */}
      <svg
        viewBox="0 0 80 60"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-20 right-10 w-14 opacity-[0.06] rotate-[160deg]"
      >
        <circle cx="20" cy="20" r="6" fill="#211a12" />
        <circle cx="32" cy="14" r="2.5" fill="#211a12" />
        <circle cx="12" cy="30" r="1.8" fill="#211a12" />
        <circle cx="42" cy="22" r="1.2" fill="#211a12" />
        <ellipse cx="8"  cy="18" rx="1.5" ry="3.5" fill="#211a12" transform="rotate(20 8 18)" />
      </svg>

      {/* Mid-left micro spatter */}
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-6 w-8 opacity-[0.05]"
      >
        <circle cx="15" cy="15" r="4" fill="#211a12" />
        <circle cx="25" cy="10" r="1.5" fill="#211a12" />
        <circle cx="10" cy="25" r="1"   fill="#211a12" />
      </svg>
    </div>
  );
}
