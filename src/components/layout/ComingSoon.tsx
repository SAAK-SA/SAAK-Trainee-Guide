import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Full-screen holding page shown to the public while the guide is
 * still being finalized. Uses the official SAAK International logo when
 * a file exists at `public/logo.png` (or `public/logo.svg`); falls back
 * to the neutral SAAK mark until it is uploaded.
 *
 * The real site can be previewed by loading the page with `?preview=1`
 * appended to the URL — the flag is stored in sessionStorage so links
 * inside the guide keep working without needing the query string.
 */
export function ComingSoon() {
  const { t } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-white px-6 text-center"
      role="status"
      aria-live="polite"
    >
      {logoFailed ? (
        <div className="flex items-center gap-4" dir="ltr">
          <svg
            viewBox="0 0 56 56"
            className="h-16 w-16 shrink-0"
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
              fontSize: '38px',
              fontWeight: 800,
              letterSpacing: '0.14em',
            }}
          >
            SAAK
          </span>
        </div>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="SAAK International"
          onError={() => setLogoFailed(true)}
          className="saak-pulse h-auto w-full max-w-[520px]"
        />
      )}

      <p
        className="text-navy-900"
        style={{
          fontFamily: '"IBM Plex Sans Arabic", Inter, sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 700,
          letterSpacing: '-0.005em',
        }}
      >
        {t({ en: 'Trainee Guide', ar: 'دليل المتدرب' })}
      </p>

      <style>{`
        .saak-pulse {
          animation: saak-coming-soon-pulse 2.4s ease-in-out infinite;
        }
        @keyframes saak-coming-soon-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.035); opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .saak-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
}
