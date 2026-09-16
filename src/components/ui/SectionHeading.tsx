import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { TechnicalLabel } from './TechnicalLabel';

interface SectionHeadingProps {
  /** DOM id target for the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: 'light' | 'dark';
  align?: 'start' | 'center';
  className?: string;
  children?: ReactNode;
}

/**
 * The standard entry into a section: a small eyebrow label, a short accent
 * rule in the brand green, the headline, then an optional lead paragraph.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'start',
  className,
  children,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <header
      className={cn(
        'relative max-w-4xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal distance={16}>
        <TechnicalLabel tone={isDark ? 'inverse' : 'muted'}>{eyebrow}</TechnicalLabel>
      </Reveal>

      <Reveal distance={12} delay={0.04}>
        <span
          className={cn('mt-4 block h-0.5 w-12 bg-green', align === 'center' && 'mx-auto')}
          aria-hidden="true"
        />
      </Reveal>

      <Reveal distance={22} delay={0.06}>
        <h2
          id={`${id}-heading`}
          className={cn('mt-5 text-h1', isDark ? 'text-white' : 'text-navy-900')}
        >
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal distance={22} delay={0.12}>
          <p
            className={cn(
              'mt-6 max-w-prose text-body-lg',
              align === 'center' && 'mx-auto',
              isDark ? 'text-white/75' : 'text-navy/80',
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </header>
  );
}
