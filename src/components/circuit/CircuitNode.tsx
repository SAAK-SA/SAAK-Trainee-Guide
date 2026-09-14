import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { transition } from '@/lib/motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';

export type NodeSize = 'xs' | 'sm' | 'md' | 'lg';

interface CircuitNodeProps {
  size?: NodeSize;
  /** An active node is filled green and carries a halo — it marks the live point. */
  active?: boolean;
  /** Continuous low-amplitude pulse, used sparingly on hero and key junctions. */
  pulse?: boolean;
  className?: string;
  title?: string;
}

const CORE: Record<NodeSize, string> = {
  xs: 'h-1 w-1',
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

const RING: Record<NodeSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

/**
 * A connection node in the circuit system.
 * Idle nodes read as navy hairline junctions; activation switches them to green
 * with an expanding halo, which is how the interface signals "you are here".
 */
export function CircuitNode({
  size = 'md',
  active = false,
  pulse = false,
  className,
  title,
}: CircuitNodeProps) {
  const { reduced } = useMotionPreference();

  return (
    <span
      className={cn('relative inline-flex items-center justify-center', RING[size], className)}
      aria-hidden="true"
      title={title}
    >
      {/* Halo — only drawn when the node is live. */}
      <motion.span
        className="absolute inset-0 rounded-full border border-green/40"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.55,
        }}
        transition={reduced ? { duration: 0.15 } : transition.base}
      />
      <motion.span
        className={cn(
          'absolute inset-0 rounded-full',
          active ? 'bg-green/10' : 'bg-transparent',
        )}
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={transition.base}
      />
      {/* Idle ring keeps the junction visible even when inactive. */}
      <span
        className={cn(
          'absolute rounded-full border transition-colors duration-base ease-technical',
          RING[size],
          active ? 'border-green/25' : 'border-current opacity-25',
        )}
        style={{ transform: 'scale(0.55)' }}
      />
      <motion.span
        className={cn(
          'relative rounded-full transition-colors duration-base ease-technical',
          CORE[size],
          active ? 'bg-green' : 'bg-current',
          pulse && !reduced && !active && 'animate-node-pulse',
        )}
        initial={false}
        animate={{ scale: active ? 1.15 : 1 }}
        transition={transition.base}
      />
    </span>
  );
}
