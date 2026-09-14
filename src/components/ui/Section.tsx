import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { TechnicalGrid } from '@/components/circuit/TechnicalGrid';
import { CircuitDecoration, type CircuitVariant } from '@/components/circuit/CircuitDecoration';

export type SectionTone = 'light' | 'muted' | 'dark' | 'deep';

interface SectionProps {
  id: string;
  children: ReactNode;
  tone?: SectionTone;
  /** Two-digit marker printed in the section gutter. */
  index?: string;
  className?: string;
  /** Substrate grid density; `none` leaves the surface plain. */
  grid?: 'none' | 'default' | 'fine';
  gridMarkers?: boolean;
  decoration?: CircuitVariant;
  decorationClassName?: string;
  padding?: 'default' | 'compact' | 'none';
  /** Set on the outer element so full-bleed children can escape the shell. */
  bleed?: boolean;
}

const TONES: Record<SectionTone, string> = {
  light: 'bg-neutralx-0 text-navy-900',
  muted: 'bg-neutralx-100 text-navy-900',
  dark: 'on-dark bg-navy-900 text-white',
  deep: 'on-dark bg-navy-950 text-white',
};

const PADDING = {
  default: 'py-section',
  compact: 'py-section-sm',
  none: '',
} as const;

/**
 * The page's structural unit.
 * Owns the tone (which drives the whole colour cascade through `on-dark`),
 * the substrate grid, the section marker and the optional circuit decoration —
 * so no section has to re-implement any of it.
 */
export function Section({
  id,
  children,
  tone = 'light',
  index,
  className,
  grid = 'none',
  gridMarkers = false,
  decoration,
  decorationClassName,
  padding = 'default',
  bleed = false,
}: SectionProps) {
  const isDark = tone === 'dark' || tone === 'deep';

  return (
    <section
      id={id}
      className={cn('relative isolate w-full', TONES[tone], !bleed && 'overflow-hidden', className)}
      aria-labelledby={`${id}-heading`}
    >
      {grid !== 'none' ? (
        <TechnicalGrid
          tone={isDark ? 'dark' : 'light'}
          density={grid === 'fine' ? 'fine' : 'default'}
          markers={gridMarkers}
        />
      ) : null}

      {decoration ? (
        <CircuitDecoration
          variant={decoration}
          className={cn('hidden md:block', decorationClassName)}
          opacity={isDark ? 0.45 : 0.55}
        />
      ) : null}

      {/* Section marker — a printed reference rather than a headline. */}
      {index ? (
        <span
          className={cn(
            // Trailing edge: the leading edge belongs to the circuit rail.
            'pointer-events-none absolute top-16 end-gutter font-mono text-meta uppercase tracking-[0.28em]',
            isDark ? 'text-white/30' : 'text-navy/30',
          )}
          // "01 / 09" is a Latin reference: without an explicit direction the
          // bidi algorithm reorders it to "09 / 01" inside an RTL paragraph.
          dir="ltr"
          aria-hidden="true"
        >
          {index} / 09
        </span>
      ) : null}

      <div className={cn('relative z-10', PADDING[padding])}>{children}</div>

      {/* Closing hairline keeps the vertical rhythm legible between tones. */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-px',
          isDark ? 'bg-white/10' : 'bg-navy/8',
        )}
        aria-hidden="true"
      />
    </section>
  );
}
