import type { Config } from 'tailwindcss';

/**
 * SAAK International — central design tokens.
 * Colour, spacing, radius, typography and motion timing all originate here
 * (mirrored as CSS custom properties in src/styles/tokens.css) so that a single
 * edit propagates through the whole interface.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14396B',
          50: '#F2F6FC',
          100: '#E2EAF5',
          200: '#C2D2E9',
          300: '#8FAAD1',
          400: '#5479AF',
          500: '#2E578F',
          600: '#14396B',
          700: '#102E57',
          800: '#0C2342',
          900: '#08182D',
          950: '#050F1D',
        },
        green: {
          DEFAULT: '#12A150',
          50: '#F0FBF4',
          100: '#DBF5E5',
          200: '#B3E9C7',
          300: '#79D69F',
          400: '#3CBD74',
          500: '#12A150',
          600: '#0D8442',
          700: '#0B6936',
          800: '#0A522C',
          900: '#084324',
        },
        neutralx: {
          0: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E8ECF1',
          300: '#D6DCE5',
          400: '#AEB8C6',
          500: '#7C8798',
          600: '#5A6575',
          700: '#3E4756',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 6.4vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '600' }],
        display: ['clamp(2.25rem, 5.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        h1: ['clamp(1.95rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        h2: ['clamp(1.55rem, 2.9vw, 2.35rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        h3: ['clamp(1.15rem, 1.7vw, 1.4rem)', { lineHeight: '1.28', letterSpacing: '-0.012em', fontWeight: '600' }],
        body: ['1.0625rem', { lineHeight: '1.68' }],
        'body-lg': ['clamp(1.0625rem, 1.35vw, 1.3rem)', { lineHeight: '1.62' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        label: ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.16em', fontWeight: '500' }],
        tech: ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.22em', fontWeight: '500' }],
        meta: ['0.625rem', { lineHeight: '1.3', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      opacity: {
        /* Hairline and plate alphas used across the circuit system. */
        8: '0.08',
        12: '0.12',
        14: '0.14',
        92: '0.92',
      },
      spacing: {
        gutter: 'var(--space-gutter)',
        section: 'var(--space-section)',
        'section-sm': 'var(--space-section-sm)',
      },
      maxWidth: {
        shell: '1440px',
        prose: '62ch',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '10px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(8, 24, 45, 0.04), 0 8px 24px -12px rgba(8, 24, 45, 0.14)',
        'card-hover': '0 2px 4px rgba(8, 24, 45, 0.05), 0 20px 44px -18px rgba(8, 24, 45, 0.24)',
        panel: '0 24px 70px -30px rgba(8, 24, 45, 0.45)',
        'inset-line': 'inset 0 0 0 1px rgba(20, 57, 107, 0.10)',
      },
      transitionTimingFunction: {
        technical: 'cubic-bezier(0.22, 1, 0.36, 1)',
        precise: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        fast: '180ms',
        base: '320ms',
        slow: '640ms',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(to right, rgba(20,57,107,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,57,107,0.055) 1px, transparent 1px)',
        'grid-fine-dark':
          'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
        'grid-sm': '32px 32px',
      },
      keyframes: {
        'node-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
        'status-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        'node-pulse': 'node-pulse 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'status-blink': 'status-blink 2.4s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
