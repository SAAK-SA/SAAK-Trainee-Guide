import { cn } from '@/lib/cn';
import { ICONS } from '@/lib/icons';
import { useLanguage } from '@/i18n/LanguageContext';
import type { CardItem } from '@/data/content';
import { RevealItem } from './Reveal';

interface TechnicalCardProps {
  item: CardItem;
  tone?: 'light' | 'dark';
  className?: string;
  /** Compact cards drop the body copy and read as a dense index. */
  dense?: boolean;
}

/**
 * Standard content card: icon plaque, title, body. Rounded corners, a hairline
 * border and a subtle lift on hover — no circuit motifs.
 */
export function TechnicalCard({
  item,
  tone = 'light',
  className,
  dense = false,
}: TechnicalCardProps) {
  const { t } = useLanguage();
  const Icon = ICONS[item.icon];
  const isDark = tone === 'dark';

  return (
    <RevealItem as="article" className={cn('h-full', className)}>
      <div
        className={cn(
          'group relative flex h-full flex-col rounded-lg border p-6 transition-all duration-base ease-technical md:p-7',
          isDark
            ? 'border-white/10 bg-white/[0.04] hover:border-green/50 hover:bg-white/[0.06]'
            : 'border-navy/10 bg-neutralx-0 shadow-card hover:-translate-y-0.5 hover:border-green/40 hover:shadow-card-hover',
        )}
      >
        <span
          className={cn(
            'mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md transition-colors duration-base ease-technical',
            isDark
              ? 'bg-white/8 text-white group-hover:bg-green/20 group-hover:text-green'
              : 'bg-green/10 text-green-700 group-hover:bg-green group-hover:text-white',
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
        </span>

        <h3 className={cn('text-h3', isDark ? 'text-white' : 'text-navy-900')}>
          {t(item.title)}
        </h3>

        {!dense ? (
          <p className={cn('mt-3 text-small', isDark ? 'text-white/70' : 'text-navy/75')}>
            {t(item.body)}
          </p>
        ) : null}
      </div>
    </RevealItem>
  );
}
