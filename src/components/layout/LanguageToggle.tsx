import { Globe } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { UI } from '@/data/ui';

interface LanguageToggleProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Pill-shaped globe + language label — click to switch between EN and AR.
 * Matches SAAK Team's language switch: one button, not a two-segment radio.
 */
export function LanguageToggle({ tone = 'light', className }: LanguageToggleProps) {
  const { locale, toggleLocale, t } = useLanguage();
  const isDark = tone === 'dark';
  const label = locale === 'ar' ? 'EN' : 'العربية';

  return (
    <button
      type="button"
      onClick={toggleLocale}
      lang={locale === 'ar' ? 'en' : 'ar'}
      aria-label={t(UI.languageToggle)}
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-small font-semibold transition-all duration-fast',
        isDark
          ? 'border-white/30 text-white hover:border-green hover:bg-white/10'
          : 'border-neutralx-200 bg-white text-navy hover:border-green hover:bg-cream-50',
        className,
      )}
    >
      <Globe className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
