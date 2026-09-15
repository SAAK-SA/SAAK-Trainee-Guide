import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type SectionTone = 'light' | 'muted' | 'dark' | 'deep';

interface SectionProps {
  id: string;
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  padding?: 'default' | 'compact' | 'none';
  /** Set on the outer element so full-bleed children can escape the shell. */
  bleed?: boolean;
}

const TONES: Record<SectionTone, string> = {
  light: 'bg-neutralx-0 text-navy-900',
  muted: 'bg-neutralx-50 text-navy-900',
  dark: 'on-dark bg-navy-900 text-white',
  deep: 'on-dark bg-navy-950 text-white',
};

const PADDING = {
  default: 'py-section',
  compact: 'py-section-sm',
  none: '',
} as const;

/**
 * Structural section.
 * Owns the tone (which drives the whole colour cascade through `on-dark`) and
 * the vertical rhythm — no decoration by itself, so each section reads clean.
 */
export function Section({
  id,
  children,
  tone = 'light',
  className,
  padding = 'default',
  bleed = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate w-full',
        TONES[tone],
        !bleed && 'overflow-hidden',
        className,
      )}
      aria-labelledby={`${id}-heading`}
    >
      <div className={cn('relative z-10', PADDING[padding])}>{children}</div>
    </section>
  );
}
