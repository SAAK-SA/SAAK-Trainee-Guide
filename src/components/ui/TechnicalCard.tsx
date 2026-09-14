import { useState } from 'react';
import { cn } from '@/lib/cn';
import { ICONS } from '@/lib/icons';
import { useLanguage } from '@/i18n/LanguageContext';
import type { CardItem } from '@/data/content';
import { CircuitNode } from '@/components/circuit/CircuitNode';
import { RevealItem } from './Reveal';

interface TechnicalCardProps {
  item: CardItem;
  /** Printed reference, e.g. "03". */
  index?: string;
  tone?: 'light' | 'dark';
  className?: string;
  /** Compact cards drop the body copy and read as a dense index. */
  dense?: boolean;
}

/**
 * The standard content block: clean geometry, a hairline border, a small
 * radius and one green accent. Hover raises the card 2px, warms the border to
 * green and activates its connection node — the same activation language the
 * circuit rail uses.
 */
export function TechnicalCard({
  item,
  index,
  tone = 'light',
  className,
  dense = false,
}: TechnicalCardProps) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[item.icon];
  const isDark = tone === 'dark';

  return (
    <RevealItem as="article" className={cn('h-full', className)}>
      <div
        className={cn(
          'group relative flex h-full flex-col rounded-md border p-6 transition-all duration-base ease-technical md:p-7',
          isDark
            ? 'border-white/10 bg-white/[0.035] hover:border-green/50 hover:bg-white/[0.06]'
            : 'border-navy/10 bg-neutralx-0 shadow-card hover:-translate-y-0.5 hover:border-green/45 hover:shadow-card-hover',
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* Connection node, top-trailing corner. */}
        <span className={cn('absolute end-4 top-4', isDark ? 'text-white' : 'text-navy')}>
          <CircuitNode size="sm" active={hovered} />
        </span>

        <span
          className={cn(
            'mb-6 inline-flex h-11 w-11 items-center justify-center rounded-sm border transition-colors duration-base ease-technical',
            isDark
              ? 'border-white/15 text-white group-hover:border-green group-hover:text-green'
              : 'border-navy/12 text-navy group-hover:border-green group-hover:text-green-700',
          )}
        >
          <Icon
            className="h-5 w-5 transition-transform duration-base ease-technical group-hover:-translate-y-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>

        {index ? (
          <span
            className={cn(
              'font-mono text-meta uppercase tracking-[0.24em]',
              isDark ? 'text-white/55' : 'text-navy/70',
            )}
          >
            {index}
          </span>
        ) : null}

        <h3 className={cn('mt-2 text-h3', isDark ? 'text-white' : 'text-navy-900')}>
          {t(item.title)}
        </h3>

        {!dense ? (
          <p className={cn('mt-3 text-small', isDark ? 'text-white/65' : 'text-navy/75')}>
            {t(item.body)}
          </p>
        ) : null}

        {/* Base trace grows on hover. */}
        <span
          className="pointer-events-none absolute bottom-0 start-0 h-px w-0 bg-green transition-[width] duration-slow ease-technical group-hover:w-full"
          aria-hidden="true"
        />
      </div>
    </RevealItem>
  );
}
