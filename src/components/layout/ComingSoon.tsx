import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Full-screen "coming soon" holding page.
 *
 * Shown to the public while the guide is still being finalized. Only the
 * SAAK mark, a short "coming soon" line and a soft pulse are visible.
 *
 * The real site can be previewed by loading the page with `?preview=1`
 * appended to the URL — the flag is stored in sessionStorage so links
 * inside the guide keep working without needing the query string.
 */
export function ComingSoon() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-white text-center"
      role="status"
      aria-live="polite"
    >
      <div className="saak-pulse flex items-center gap-4" dir="ltr">
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

      <p className="max-w-md px-6 text-body text-neutralx-500">
        {t({
          en: 'The trainee guide is almost ready. Come back shortly.',
          ar: 'دليل المتدرب قيد الإعداد. عودوا إلينا قريبًا.',
        })}
      </p>

      <span className="mt-2 inline-block rounded-pill border border-neutralx-200 bg-neutralx-50 px-4 py-1.5 text-label uppercase tracking-[0.14em] text-neutralx-500">
        {t({ en: 'Coming soon', ar: 'قريبًا' })}
      </span>

      <style>{`
        .saak-pulse {
          animation: saak-coming-soon-pulse 2.2s ease-in-out infinite;
        }
        @keyframes saak-coming-soon-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.75; }
        }
        @media (prefers-reduced-motion: reduce) {
          .saak-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
}
