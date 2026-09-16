import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Optional icon rendered as a green plaque above the eyebrow. */
  icon?: LucideIcon;
  align?: 'start' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}

/**
 * The standard entry to a step: optional icon plaque, eyebrow label,
 * title, and an optional lead paragraph.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  icon: Icon,
  align = 'start',
  tone = 'light',
  className,
  children,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <header
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {Icon ? (
        <span
          className={cn(
            'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md text-white shadow-sm',
            align === 'center' && 'mx-auto',
          )}
          style={{
            background:
              'linear-gradient(135deg, var(--saak-green), var(--saak-green-600))',
          }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
      ) : null}

      <span
        className={cn(
          'block text-label uppercase',
          isDark ? 'text-green-400' : 'text-green-600',
        )}
      >
        {eyebrow}
      </span>
      <h2
        id={`${id}-heading`}
        className={cn('mt-3 text-h1', isDark ? 'text-white' : 'text-navy-900')}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            'mt-4 text-body-lg',
            align === 'center' && 'mx-auto',
            isDark ? 'text-white/80' : 'text-neutralx-500',
          )}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </header>
  );
}
