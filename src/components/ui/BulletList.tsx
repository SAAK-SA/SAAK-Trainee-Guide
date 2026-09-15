import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ListItem } from '@/data/content';
import { RevealGroup, RevealItem } from './Reveal';

interface BulletListProps {
  items: readonly ListItem[];
  tone?: 'light' | 'dark';
  className?: string;
}

/** Ordered principles list with a small green tick and a hairline separator. */
export function BulletList({ items, tone = 'light', className }: BulletListProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <RevealGroup as="ul" className={cn('m-0 list-none p-0', className)} stagger={0.06}>
      {items.map((item, index) => (
        <RevealItem
          as="li"
          key={item.id}
          className={cn(
            'flex items-start gap-4 py-4',
            index === 0 && (isDark ? 'border-t border-white/10' : 'border-t border-navy/10'),
            isDark ? 'border-b border-white/10' : 'border-b border-navy/10',
          )}
        >
          <span
            className={cn(
              'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
              isDark ? 'bg-green/20 text-green' : 'bg-green/15 text-green-700',
            )}
            aria-hidden="true"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <span className={cn('text-body', isDark ? 'text-white/80' : 'text-navy-900/85')}>
            {t(item.text)}
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
