import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { revealVariants, staggerVariants, viewport } from '@/lib/motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px; ignored under reduced motion. */
  distance?: number;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'header' | 'article';
}

/** Scroll-triggered entrance for a single block. */
export function Reveal({ children, className, distance = 24, delay = 0, as = 'div' }: RevealProps) {
  const { reduced } = useMotionPreference();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={revealVariants(reduced, distance)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol';
}

/** Parent that staggers the reveal of its `RevealItem` children. */
export function RevealGroup({ children, className, stagger = 0.08, as = 'div' }: RevealGroupProps) {
  const { reduced } = useMotionPreference();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={staggerVariants(reduced, stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: 'div' | 'li' | 'article';
}

export function RevealItem({ children, className, distance = 18, as = 'div' }: RevealItemProps) {
  const { reduced } = useMotionPreference();
  const Component = motion[as];

  return (
    <Component className={cn(className)} variants={revealVariants(reduced, distance)}>
      {children}
    </Component>
  );
}
