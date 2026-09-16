import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'header' | 'article' | 'ul' | 'ol';
}

/**
 * The wizard already plays a step-in animation on the active step, so
 * per-block scroll reveals stay off. These are pass-through wrappers kept
 * for API compatibility with earlier sections.
 */
export function Reveal({ children, className, as = 'div' }: RevealProps) {
  const Component = (as ?? 'div') as 'div';
  return <Component className={cn(className)}>{children}</Component>;
}

export function RevealGroup({ children, className, as = 'div' }: RevealProps) {
  const Component = (as ?? 'div') as 'div';
  return <Component className={cn(className)}>{children}</Component>;
}

export function RevealItem({ children, className, as = 'div' }: RevealProps) {
  const Component = (as ?? 'div') as 'div';
  return <Component className={cn(className)}>{children}</Component>;
}
