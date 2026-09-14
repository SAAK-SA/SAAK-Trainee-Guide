import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { LOCALES } from '@/i18n/types';
import { UI } from '@/data/ui';

interface LanguageToggleProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * English / Arabic switch.
 * Each label is written in its own language and the control announces the
 * active locale, so it works without relying on colour alone.
 */
export function LanguageToggle({ tone = 'light', className }: LanguageToggleProps) {
  const { locale, setLocale, t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-sm border p-0.5',
        isDark ? 'border-white/20' : 'border-navy/15',
        className,
      )}
      role="group"
      aria-label={t(UI.languageToggle)}
    >
      {(Object.keys(LOCALES) as Array<keyof typeof LOCALES>).map((code) => {
        const meta = LOCALES[code];
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={meta.htmlLang}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              'rounded-xs px-2.5 py-1.5 font-mono text-meta uppercase tracking-[0.14em] transition-colors duration-fast',
              active
                ? 'bg-green text-white'
                : isDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-navy/70 hover:text-navy',
            )}
          >
            {code === 'ar' ? meta.label : 'EN'}
          </button>
        );
      })}
    </div>
  );
}
