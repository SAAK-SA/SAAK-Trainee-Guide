import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'start' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}

/**
 * The standard entry to a step: eyebrow (small green uppercase label),
 * title, and an optional lead paragraph. Text-forward, no ornament.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
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
      <span
        className={cn(
          'inline-block text-label uppercase',
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
