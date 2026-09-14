import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { drawVariants, viewport } from '@/lib/motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';

export interface TraceNode {
  cx: number;
  cy: number;
  r?: number;
  /** Green, filled nodes mark junctions; open navy nodes mark pass-through points. */
  accent?: boolean;
  delay?: number;
}

interface AnimatedLineProps {
  /** SVG path data, expressed in the coordinate space of `viewBox`. */
  d: string;
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  /** Secondary path stroked in green — the "live" trace over the base trace. */
  accentD?: string;
  nodes?: TraceNode[];
  delay?: number;
  duration?: number;
  dashed?: boolean;
  preserveAspectRatio?: string;
}

/**
 * A circuit trace that draws itself when scrolled into view.
 * Colour comes from `currentColor`, so a parent sets the tone once and the
 * whole trace follows it on light and dark sections alike.
 */
export function AnimatedLine({
  d,
  viewBox,
  className,
  strokeWidth = 1,
  accentD,
  nodes = [],
  delay = 0,
  duration = 1.1,
  dashed = false,
  preserveAspectRatio = 'none',
}: AnimatedLineProps) {
  const { reduced } = useMotionPreference();

  return (
    <svg
      className={cn('pointer-events-none select-none overflow-visible', className)}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeDasharray={dashed ? '3 5' : undefined}
        vectorEffect="non-scaling-stroke"
        variants={drawVariants(reduced, duration, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      />
      {accentD ? (
        <motion.path
          d={accentD}
          stroke="var(--saak-green)"
          strokeWidth={strokeWidth + 0.4}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          variants={drawVariants(reduced, duration * 0.8, delay + 0.25)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        />
      ) : null}
      {nodes.map((node, index) => (
        <motion.circle
          key={`${node.cx}-${node.cy}-${index}`}
          cx={node.cx}
          cy={node.cy}
          r={node.r ?? 2.5}
          fill={node.accent ? 'var(--saak-green)' : 'transparent'}
          stroke={node.accent ? 'var(--saak-green)' : 'currentColor'}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.4, delay: delay + (node.delay ?? 0.6 + index * 0.1), ease: [0.22, 1, 0.36, 1] }
          }
        />
      ))}
    </svg>
  );
}
