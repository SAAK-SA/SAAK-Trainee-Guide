import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Full-screen loading overlay shown on first paint.
 *
 * Pulsing SAAK mark on white with a navy → green progress bar.
 * Fades out ~350ms after the window "load" event; if load never fires
 * (dev preview, cached start) it also fades after a hard cap so the page
 * is never stuck behind it.
 */
export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => {
      window.setTimeout(() => setHidden(true), 350);
    };

    if (document.readyState === 'complete') {
      hide();
      return;
    }

    window.addEventListener('load', hide, { once: true });
    // Hard fallback so the loader never traps the page.
    const failsafe = window.setTimeout(hide, 4000);

    return () => {
      window.removeEventListener('load', hide);
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-white transition-[opacity,visibility] duration-slow ease-technical',
        hidden ? 'invisible opacity-0' : 'visible opacity-100',
      )}
    >
      {/* SAAK typographic mark — larger than the header logo. */}
      <div className="loading-logo flex items-center gap-4" dir="ltr">
        <svg
          viewBox="0 0 56 56"
          className="h-14 w-14 shrink-0"
          fill="none"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="56" height="56" rx="12" fill="var(--saak-navy)" />
          <path
            d="M14 43 L24 43 L32 22 L42 22"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="14" cy="43" r="4" fill="var(--saak-green)" />
          <circle cx="42" cy="22" r="3.5" fill="var(--saak-green)" />
        </svg>
        <span
          className="text-navy-900"
          style={{
            fontFamily: 'Inter, "IBM Plex Sans Arabic", sans-serif',
            fontSize: '32px',
            fontWeight: 800,
            letterSpacing: '0.14em',
          }}
        >
          SAAK
        </span>
      </div>

      <div className="h-1 w-52 overflow-hidden rounded-pill bg-neutralx-200">
        <span
          className="block h-full w-1/3 rounded-pill"
          style={{
            background: 'linear-gradient(90deg, var(--saak-navy), var(--saak-green))',
            animation: 'saak-loading-bar 1.2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes saak-loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        .loading-logo {
          animation: saak-pulse-logo 1.6s ease-in-out infinite;
        }
        @keyframes saak-pulse-logo {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
        [dir='rtl'] .loading-logo {
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-logo { animation: none; }
        }
      `}</style>
    </div>
  );
}
