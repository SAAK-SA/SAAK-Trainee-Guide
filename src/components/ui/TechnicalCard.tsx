import { cn } from '@/lib/cn';
import { ICONS } from '@/lib/icons';
import { useLanguage } from '@/i18n/LanguageContext';
import type { CardItem } from '@/data/content';

interface CardProps {
  item: CardItem;
  tone?: 'light' | 'dark';
  className?: string;
  /** Compact cards drop the body copy. */
  dense?: boolean;
}

/**
 * The standard card: icon plaque with a navy → green gradient, title, body.
 * Rounded 24px corners and a soft lift on hover — SAAK Team's card language.
 */
export function TechnicalCard({ item, tone = 'light', className, dense = false }: CardProps) {
  const { t } = useLanguage();
  const Icon = ICONS[item.icon];
  const isDark = tone === 'dark';

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-lg border p-6 transition-all duration-base ease-technical md:p-7',
        isDark
          ? 'border-white/10 bg-white/[0.04] hover:border-green/50 hover:bg-white/[0.06]'
          : 'border-neutralx-200 bg-white shadow-sm hover:-translate-y-1 hover:border-green/40 hover:shadow-lg',
        className,
      )}
    >
      <span
        className="mb-4 inline-flex h-13 w-13 items-center justify-center rounded-md text-white shadow-sm"
        style={{
          width: 52,
          height: 52,
          background: 'linear-gradient(135deg, var(--saak-green), var(--saak-green-600))',
        }}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>

      <h3 className={cn('text-h3', isDark ? 'text-white' : 'text-navy-900')}>
        {t(item.title)}
      </h3>

      {!dense ? (
        <p
          className={cn(
            'mt-2 text-small',
            isDark ? 'text-white/70' : 'text-neutralx-500',
          )}
        >
          {t(item.body)}
        </p>
      ) : null}
    </article>
  );
}
