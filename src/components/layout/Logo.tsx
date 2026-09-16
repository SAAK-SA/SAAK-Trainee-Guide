import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { UI } from '@/data/ui';

interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
  compact?: boolean;
}

/**
 * SAAK lockup — a typographic mark on a navy tile with a green connection
 * accent. Neutral stand-in for the official logo; drop /public/logo.svg
 * and swap the <svg> for an <img> when the real asset arrives.
 */
export function Logo({ tone = 'light', className, compact = false }: LogoProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 32 32"
        className="h-9 w-9 shrink-0"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="8"
          className={isDark ? 'fill-white/8 stroke-white/25' : 'fill-navy stroke-navy'}
          strokeWidth="1"
        />
        <path
          d="M8 21h5.5L18 11h6"
          className="stroke-white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="8" cy="21" r="2.4" fill="var(--saak-green)" />
        <circle cx="24" cy="11" r="2" fill="var(--saak-green)" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[18px] font-bold tracking-[0.14em]',
            isDark ? 'text-white' : 'text-navy-900',
          )}
        >
          {t(UI.brandName)}
        </span>
        {!compact ? (
          <span
            className={cn(
              'mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]',
              isDark ? 'text-white/60' : 'text-neutralx-500',
            )}
          >
            {t(UI.productName)}
          </span>
        ) : null}
      </span>
    </span>
  );
}
