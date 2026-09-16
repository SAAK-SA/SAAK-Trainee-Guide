import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TechnicalLabelProps {
  children: ReactNode;
  className?: string;
  tone?: 'green' | 'navy' | 'muted' | 'inverse';
}

const TONE = {
  green: 'text-green-600',
  navy: 'text-navy',
  muted: 'text-neutralx-500',
  inverse: 'text-white/70',
} as const;

/** Uppercase eyebrow label — the smallest identity unit above titles. */
export function TechnicalLabel({
  children,
  className,
  tone = 'green',
}: TechnicalLabelProps) {
  return (
    <span className={cn('inline-block text-label uppercase', TONE[tone], className)}>
      {children}
    </span>
  );
}
