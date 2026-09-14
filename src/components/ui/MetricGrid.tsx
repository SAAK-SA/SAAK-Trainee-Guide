import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import type { MetricItem } from '@/data/content';
import { RevealGroup, RevealItem } from './Reveal';

interface MetricGridProps {
  metrics: readonly MetricItem[];
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Figure blocks. Values are intentionally placeholders — no company numbers
 * have been invented — but the typographic scale is final.
 */
export function MetricGrid({ metrics, tone = 'dark', className }: MetricGridProps) {
  const { t } = useLanguage();
  const isDark = tone === 'dark';

  return (
    <RevealGroup
      className={cn('grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4', className)}
      stagger={0.07}
    >
      {metrics.map((metric) => (
        <RevealItem
          key={metric.id}
          className={cn(
            'group relative p-6 transition-colors duration-base ease-technical md:p-8',
            isDark
              ? 'bg-white/[0.04] hover:bg-white/[0.07]'
              : 'bg-neutralx-100 hover:bg-neutralx-50',
          )}
        >
          <span
            className={cn(
              'block font-sans text-h1 tabular-nums',
              isDark ? 'text-white' : 'text-navy-900',
            )}
          >
            {metric.value}
          </span>
          <span
            className={cn(
              'mt-3 block font-mono text-meta uppercase tracking-[0.22em]',
              isDark ? 'text-white/55' : 'text-navy/70',
            )}
          >
            {t(metric.label)}
          </span>
          <span
            className="absolute bottom-0 start-0 h-px w-0 bg-green transition-[width] duration-slow ease-technical group-hover:w-full"
            aria-hidden="true"
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
