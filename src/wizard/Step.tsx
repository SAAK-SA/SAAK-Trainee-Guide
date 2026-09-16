import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useWizardCtx } from './WizardContext';

interface StepProps {
  index: number;
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * A single wizard step. Only renders visibly when its index matches the
 * active step; other steps are hidden entirely so DOM stays quiet and
 * screen readers announce the current step only.
 */
export function Step({ index, id, children, className }: StepProps) {
  const { step } = useWizardCtx();
  const isActive = index === step;

  return (
    <article
      id={id}
      hidden={!isActive}
      aria-hidden={!isActive}
      className={cn(
        'rounded-xl border border-neutralx-200 bg-white p-6 shadow-sm md:p-10',
        isActive && 'animate-step-in',
        className,
      )}
    >
      {children}
    </article>
  );
}
