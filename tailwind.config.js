/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wood: {
          DEFAULT: '#1c130b',
          dark: '#0f0a06',
        },
        parchment: {
          DEFAULT: '#cdb88f',
          shadow: '#a8916a',
          light: '#ddd0b0',
        },
        ink: {
          DEFAULT: '#211a12',
          faded: '#4a3d2c',
          ghost: '#6b5a45',
        },
        vermilion: {
          DEFAULT: '#9c2b25',
          deep: '#7a201b',
        },
        gold: {
          DEFAULT: '#8a6d3b',
          light: '#b89a5a',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        garamond: ['"EB Garamond"', 'Georgia', 'serif'],
        mincho: ['"Shippori Mincho"', 'serif'],
      },
      backgroundImage: {
        'wood-radial':
          'radial-gradient(ellipse at center, #1c130b 0%, #0f0a06 100%)',
      },
      keyframes: {
        'archive-rise': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'seal-stamp': {
          '0%': { opacity: '0', transform: 'scale(1.6) rotate(-5deg)' },
          '55%': { opacity: '0.9', transform: 'scale(0.93) rotate(-3deg)' },
          '75%': { opacity: '0.95', transform: 'scale(1.04) rotate(-3deg)' },
          '100%': { opacity: '0.85', transform: 'scale(1) rotate(-3deg)' },
        },
        'ink-reveal': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'archive-rise': 'archive-rise 0.9s ease-out both',
        'seal-stamp': 'seal-stamp 0.55s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        'ink-reveal': 'ink-reveal 0.7s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
      maxWidth: {
        document: '880px',
      },
    },
  },
  plugins: [],
};
