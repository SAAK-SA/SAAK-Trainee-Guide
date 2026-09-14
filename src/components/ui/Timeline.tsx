import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import type { JourneyStep } from '@/data/content';
import { CircuitNode } from '@/components/circuit/CircuitNode';
import { Reveal } from './Reveal';

/** Latches to true once the tracked progress crosses the activation threshold. */
function useActivation(progress: MotionValue<number>, threshold = 0.6) {
  const { reduced } = useMotionPreference();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) setActive(true);
  }, [reduced]);

  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= threshold) setActive(true);
  });

  return active;
}

interface TimelineProps {
  steps: readonly JourneyStep[];
  className?: string;
}

/**
 * The training journey as a routed bus.
 * A single trace runs through every stage; it energises from the top as the
 * block is scrolled, and each stage node lights up as the trace reaches it.
 */
export function Timeline({ steps, className }: TimelineProps) {
  const { reduced } = useMotionPreference();
  const containerRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });

  return (
    <ol ref={containerRef} className={cn('relative m-0 list-none p-0', className)}>
      <span
        className="absolute inset-y-0 start-[15px] w-px bg-navy/12 md:start-[23px]"
        aria-hidden="true"
      />
      <motion.span
        className="absolute inset-y-0 start-[15px] w-px origin-top bg-green md:start-[23px]"
        style={{ scaleY: reduced ? 1 : progress }}
        aria-hidden="true"
      />

      {steps.map((step, index) => (
        <TimelineRow key={step.id} step={step} last={index === steps.length - 1} />
      ))}
    </ol>
  );
}

function TimelineRow({ step, last }: { step: JourneyStep; last: boolean }) {
  const { t } = useLanguage();
  const rowRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 72%', 'start 45%'],
  });
  const active = useActivation(scrollYProgress);

  return (
    <li ref={rowRef} className={cn('relative ps-12 md:ps-20', last ? 'pb-0' : 'pb-12 md:pb-16')}>
      {/* The node sits on the bus; its plate masks the trace behind it. */}
      <span className="absolute start-0 top-0 flex h-8 w-8 items-center justify-center bg-neutralx-100 text-navy md:w-12">
        <CircuitNode size="md" active={active} />
      </span>

      <span
        className="absolute start-[15px] top-4 hidden h-px w-6 bg-navy/15 md:block md:start-[23px]"
        aria-hidden="true"
      />

      <Reveal distance={18}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-tech uppercase text-green-700">{t(step.phase)}</span>
          <span className="font-mono text-meta uppercase tracking-[0.2em] text-navy/70">
            {t(step.duration)}
          </span>
        </div>
        <h3 className="mt-2 text-h2 text-navy-900">{t(step.title)}</h3>
        <p className="mt-3 max-w-prose text-body text-navy/75">{t(step.body)}</p>
      </Reveal>
    </li>
  );
}
