import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { UI } from '@/data/ui';

interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
  /** Hides the "Trainee Guide" descriptor on tight layouts. */
  compact?: boolean;
}

/**
 * SAAK lockup.
 *
 * The mark below is a neutral typographic lockup built from the circuit
 * language — it is a stand-in, not a reproduction of the corporate logo.
 * To use the official asset, drop it at /public/logo.svg and swap the <svg>
 * for <img src="/logo.svg" alt="SAAK International" />.
 */
export function Logo({ tone = 'light', className, compact = false }: LogoProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          rx="4"
          className={isDark ? 'fill-white/5 stroke-white/25' : 'fill-navy stroke-navy'}
          strokeWidth="1.5"
        />
        <path
          d="M8 21h5.5L18 11h6"
          className={isDark ? 'stroke-white' : 'stroke-white'}
          strokeWidth="1.6"
          strokeLinecap="square"
        />
        <circle cx="8" cy="21" r="2.4" fill="var(--saak-green)" />
        <circle cx="24" cy="11" r="2" fill="var(--saak-green)" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-sans text-[17px] font-semibold tracking-[0.16em]',
            isDark ? 'text-white' : 'text-navy-900',
          )}
        >
          {t(UI.brandName)}
        </span>
        {!compact ? (
          <span
            className={cn(
              'mt-1 font-mono text-[9px] uppercase tracking-[0.28em]',
              isDark ? 'text-white/60' : 'text-navy/70',
            )}
          >
            {t(UI.productName)}
          </span>
        ) : null}
      </span>
    </span>
  );
}
