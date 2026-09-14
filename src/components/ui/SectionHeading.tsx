import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { TechnicalLabel } from './TechnicalLabel';
import { AnimatedLine } from '@/components/circuit/AnimatedLine';

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
  /** Draws the short connector trace between eyebrow and title. */
  trace?: boolean;
}

/**
 * The standard entry into a section: technical eyebrow, a connector trace,
 * the headline, then an optional lead paragraph at a readable measure.
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
  trace = true,
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
        <TechnicalLabel marker tone={isDark ? 'inverse' : 'muted'}>
          {eyebrow}
        </TechnicalLabel>
      </Reveal>

      {trace ? (
        <div
          className={cn(
            'mt-5 h-6 w-full max-w-[320px]',
            isDark ? 'text-white/35' : 'text-navy/30',
            align === 'center' && 'mx-auto',
          )}
          aria-hidden="true"
        >
          <AnimatedLine
            className="h-full w-full"
            viewBox="0 0 320 24"
            d="M0 6 H210 L228 22 H320"
            accentD="M0 6 H120"
            nodes={[{ cx: 210, cy: 6, r: 2.5, accent: true }]}
            duration={0.9}
            preserveAspectRatio="none"
          />
        </div>
      ) : null}

      <Reveal distance={22} delay={0.05}>
        <h2
          id={`${id}-heading`}
          className={cn('mt-4 text-h1', isDark ? 'text-white' : 'text-navy-900')}
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
              isDark ? 'text-white/70' : 'text-navy/75',
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
