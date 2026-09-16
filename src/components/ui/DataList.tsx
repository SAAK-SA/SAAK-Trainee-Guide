import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import type { FactRow } from '@/data/content';

interface DataListProps {
  rows: readonly FactRow[];
  tone?: 'light' | 'dark';
  className?: string;
}

/** Label / value spec-table style, aligned start/end. */
export function DataList({ rows, tone = 'light', className }: DataListProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <ul className={cn('m-0 list-none p-0', className)}>
      {rows.map((row, index) => (
        <li
          key={row.id}
          className={cn(
            'flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6',
            index !== rows.length - 1 &&
              (isDark ? 'border-b border-white/10' : 'border-b border-neutralx-200'),
          )}
        >
          <span
            className={cn(
              'text-small font-semibold',
              isDark ? 'text-white/80' : 'text-navy-900',
            )}
          >
            {t(row.label)}
          </span>
          <span
            className={cn(
              'text-small sm:text-end',
              isDark ? 'text-white/65' : 'text-neutralx-500',
            )}
          >
            {t(row.value)}
          </span>
        </li>
      ))}
    </ul>
  );
}
