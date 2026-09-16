import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ListItem } from '@/data/content';

interface BulletListProps {
  items: readonly ListItem[];
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Checklist-style list with a green check for each item.
 * Used for principles / requirements / expectations across the wizard.
 */
export function BulletList({ items, tone = 'light', className }: BulletListProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <ul className={cn('m-0 list-none p-0', className)}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            'flex items-start gap-4 py-4',
            index !== items.length - 1 &&
              (isDark ? 'border-b border-white/10' : 'border-b border-neutralx-200'),
          )}
        >
          <span
            className={cn(
              'mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill',
              isDark ? 'bg-green/20 text-green-400' : 'bg-green/12 text-green-700',
            )}
            aria-hidden="true"
          >
            <Check className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span
            className={cn(
              'text-body',
              isDark ? 'text-white/85' : 'text-navy-900/90',
            )}
          >
            {t(item.text)}
          </span>
        </li>
      ))}
    </ul>
  );
}
