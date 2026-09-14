import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { drawVariants, viewport } from '@/lib/motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';

interface SectionConnectorProps {
  /** Background of the strip — set it to the tone of the section it flows into. */
  tone?: 'light' | 'muted' | 'dark';
  className?: string;
  /** Mirrors the jog so consecutive connectors do not repeat the same shape. */
  flip?: boolean;
}

const TONE: Record<NonNullable<SectionConnectorProps['tone']>, string> = {
  light: 'bg-neutralx-0 text-navy',
  muted: 'bg-neutralx-100 text-navy',
  dark: 'bg-navy-900 text-white',
};

/**
 * The transition between two major sections.
 * A trace leaves the section above, steps sideways through a junction and
 * enters the section below — the page reads as one continuous board rather
 * than a stack of unrelated blocks.
 */
export function SectionConnector({ tone = 'light', className, flip = false }: SectionConnectorProps) {
  const { reduced } = useMotionPreference();
  const d = flip
    ? 'M70 0 V26 H30 V74 H62 V120'
    : 'M30 0 V26 H70 V74 H38 V120';
  const junction = flip ? { cx: 30, cy: 50 } : { cx: 70, cy: 50 };

  return (
    <div
      className={cn('relative w-full overflow-hidden', TONE[tone], className)}
      aria-hidden="true"
    >
      <div className="shell relative h-24 md:h-32">
        <svg
          className="absolute inset-y-0 start-0 h-full w-[100px]"
          viewBox="0 0 100 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d={d}
            stroke="currentColor"
            strokeOpacity={0.22}
            strokeWidth={1}
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
            variants={drawVariants(reduced, 0.9)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          />
          <motion.circle
            cx={junction.cx}
            cy={junction.cy}
            r={3}
            fill="var(--saak-green)"
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.35, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        {/* A long hairline runs off to the far edge, tying the strip to the grid. */}
        <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-current opacity-[0.10]" />
      </div>
    </div>
  );
}
