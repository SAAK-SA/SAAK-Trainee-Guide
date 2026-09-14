import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import type { FactRow } from '@/data/content';
import { RevealGroup, RevealItem } from './Reveal';

interface DataListProps {
  rows: readonly FactRow[];
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Label / value rows rendered as a specification table.
 * Hairline dividers and monospaced labels give it the character of a datasheet
 * without the weight of an actual table.
 */
export function DataList({ rows, tone = 'light', className }: DataListProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <RevealGroup as="ul" className={cn('m-0 list-none p-0', className)} stagger={0.06}>
      {rows.map((row, index) => (
        <RevealItem
          as="li"
          key={row.id}
          className={cn(
            'group flex flex-col gap-1 border-t py-5 transition-colors duration-base ease-technical sm:flex-row sm:items-baseline sm:justify-between sm:gap-8',
            isDark ? 'border-white/10 hover:border-green/40' : 'border-navy/10 hover:border-green/40',
            index === rows.length - 1 && (isDark ? 'border-b border-b-white/10' : 'border-b border-b-navy/10'),
          )}
        >
          <span className="flex items-center gap-3">
            <span
              className={cn(
                'h-1 w-1 shrink-0 transition-colors duration-base',
                isDark ? 'bg-white/30 group-hover:bg-green' : 'bg-navy/25 group-hover:bg-green',
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                'font-mono text-tech uppercase',
                isDark ? 'text-white/70' : 'text-navy/75',
              )}
            >
              {t(row.label)}
            </span>
          </span>
          <span
            className={cn(
              'ps-4 text-small sm:ps-0 sm:text-end',
              isDark ? 'text-white/60' : 'text-navy/75',
            )}
          >
            {t(row.value)}
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
