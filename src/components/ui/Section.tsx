import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Content wrapper inside a wizard step. No background of its own — the
 * wizard step card owns the plate. Kept for API compatibility with the
 * individual section components.
 */
export function Section({ id, children, className }: SectionProps) {
  return (
    <div id={id} className={cn(className)} aria-labelledby={`${id}-heading`}>
      {children}
    </div>
  );
}
