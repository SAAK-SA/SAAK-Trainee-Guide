import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ListItem } from '@/data/content';

interface PolicyPanelProps {
  /** Number shown in the gold-green circle on the navy header. */
  index: number;
  title: string;
  items: readonly ListItem[];
  className?: string;
  /** Optional extra content above the list (e.g. lead paragraph). */
  intro?: ReactNode;
}

/**
 * Policy panel — navy header with a green numbered badge and the section
 * title, followed by a list of items each with a small green tick.
 * Directly mirrors the SAAK Team policies pattern.
 */
export function PolicyPanel({ index, title, items, className, intro }: PolicyPanelProps) {
  const { t } = useLanguage();

  return (
    <section
      className={cn(
        'overflow-hidden rounded-lg border border-neutralx-200 bg-white shadow-sm',
        className,
      )}
    >
      <header className="flex items-center gap-4 bg-navy-900 px-6 py-4 text-white">
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill font-bold text-navy-900"
          style={{ background: 'var(--saak-green-400)' }}
          aria-hidden="true"
        >
          {index}
        </span>
        <h3 className="text-small font-bold uppercase tracking-[0.06em]">{title}</h3>
      </header>

      <div className="px-6 py-5">
        {intro ? <div className="mb-4 text-body text-neutralx-500">{intro}</div> : null}
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-green/15 text-green-700"
                aria-hidden="true"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-small text-navy-900/85">{t(item.text)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
