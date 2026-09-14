import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TechnicalLabelProps {
  children: ReactNode;
  className?: string;
  /** Prepends a small square node marker. */
  marker?: boolean;
  tone?: 'navy' | 'green' | 'muted' | 'inverse';
}

const TONE = {
  navy: 'text-navy',
  green: 'text-green-700',
  muted: 'text-navy/70',
  inverse: 'text-white/60',
} as const;

/** Monospaced metadata label — the smallest unit of the technical language. */
export function TechnicalLabel({
  children,
  className,
  marker = false,
  tone = 'muted',
}: TechnicalLabelProps) {
  return (
    <span className={cn('tech-label inline-flex items-center gap-2', TONE[tone], className)}>
      {marker ? <span className="h-1 w-1 shrink-0 bg-green" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
