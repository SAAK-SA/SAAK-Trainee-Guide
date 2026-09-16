import type { Config } from 'tailwindcss';

/**
 * SAAK International — design tokens.
 * Layout, radii and typography borrow from the SAAK Team trainee guide;
 * the palette keeps SAAK International's own navy + green identity.
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
        cream: {
          50: '#FAF8F4',
          100: '#F3EFE6',
        },
        neutralx: {
          0: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E4E8EE',
          300: '#CDD4DE',
          400: '#AEB8C6',
          500: '#6B7686',
          600: '#3C4657',
          700: '#3E4756',
          900: '#16202E',
        },
      },
      fontFamily: {
        sans: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6.4vw, 5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' }],
        display: ['clamp(2.5rem, 5.4vw, 4.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }],
        h1: ['clamp(2rem, 3.8vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.018em', fontWeight: '800' }],
        h2: ['clamp(1.55rem, 2.7vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.012em', fontWeight: '700' }],
        h3: ['1.2rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '700' }],
        body: ['1rem', { lineHeight: '1.72' }],
        'body-lg': ['clamp(1.05rem, 1.25vw, 1.22rem)', { lineHeight: '1.7' }],
        small: ['0.9rem', { lineHeight: '1.55' }],
        label: ['0.78rem', { lineHeight: '1.35', letterSpacing: '0.1em', fontWeight: '700' }],
      },
      spacing: {
        gutter: 'var(--space-gutter)',
        section: 'var(--space-section)',
        'section-sm': 'var(--space-section-sm)',
      },
      maxWidth: {
        shell: '1200px',
        prose: '62ch',
      },
      borderRadius: {
        none: '0',
        sm: '8px',
        DEFAULT: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(12, 36, 64, 0.06)',
        card: '0 2px 8px rgba(12, 36, 64, 0.06)',
        md: '0 8px 24px rgba(12, 36, 64, 0.10)',
        lg: '0 20px 48px rgba(12, 36, 64, 0.14)',
        glow: '0 0 0 6px rgba(18, 161, 80, 0.14)',
        'card-hover': '0 20px 48px rgba(12, 36, 64, 0.14)',
      },
      transitionTimingFunction: {
        technical: 'cubic-bezier(0.16, 1, 0.3, 1)',
        precise: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '180ms',
        base: '320ms',
        slow: '600ms',
      },
      keyframes: {
        stepIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        successIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'step-in': 'stepIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'success-in': 'successIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
