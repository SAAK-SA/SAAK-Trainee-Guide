import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { HERO } from '@/data/content';
import { IMAGES } from '@/data/images';
import { UI } from '@/data/ui';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { TechnicalGrid } from '@/components/circuit/TechnicalGrid';
import { CircuitDecoration } from '@/components/circuit/CircuitDecoration';
import { CircuitNode } from '@/components/circuit/CircuitNode';
import { PcbVisual } from '@/components/circuit/PcbVisual';

/**
 * The landing composition.
 *
 * Four layers build the depth: substrate grid, routed circuitry, the raised
 * PCB object, and the content plate on top. Everything enters once, in
 * sequence, and then stops — the hero settles rather than loops.
 */
export function Hero() {
  const { t, isRTL } = useLanguage();
  const { reduced } = useMotionPreference();

  const entrance = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.3 : 0.85, delay: reduced ? 0 : delay, ease: EASE.technical },
  });

  return (
    <section
      id="hero"
      className="on-dark relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-navy-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* Layer 1 — substrate */}
      <TechnicalGrid tone="dark" markers fade={false} className="opacity-70" />

      {/* Layer 2 — a single wide glow keeps the plate from going flat */}
      <div
        className="pointer-events-none absolute -top-1/4 end-[-10%] h-[70vh] w-[70vh] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(18,161,80,0.16) 0%, rgba(20,57,107,0.18) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 3 — routed circuitry */}
      <CircuitDecoration
        variant="field"
        className="bottom-0 start-0 hidden h-[46%] w-[30%] text-white/50 lg:block"
        opacity={0.16}
        delay={0.4}
      />
      <CircuitDecoration
        variant="corner"
        className="end-0 top-24 h-40 w-72 text-white/60 lg:h-56 lg:w-96"
        opacity={0.4}
        delay={0.6}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-12 pt-[calc(var(--nav-height)+2rem)] md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Content plate */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div {...entrance(0.1)} className="flex items-center gap-3">
              <CircuitNode size="sm" active pulse className="text-white" />
              <span className="font-mono text-tech uppercase text-green">{t(HERO.eyebrow)}</span>
            </motion.div>

            <h1 id="hero-heading" className="mt-7 text-display-xl">
              <motion.span {...entrance(0.18)} className="block text-white">
                {t(HERO.titleLead)}
              </motion.span>
              <motion.span {...entrance(0.26)} className="block text-green">
                {t(HERO.titleAccent)}
              </motion.span>
              <motion.span {...entrance(0.34)} className="block text-white/85">
                {t(HERO.titleTail)}
              </motion.span>
            </h1>

            <motion.p {...entrance(0.44)} className="mt-7 max-w-prose text-body-lg text-white/65">
              {t(HERO.lead)}
            </motion.p>

            <motion.div {...entrance(0.52)} className="mt-9 flex flex-wrap gap-4">
              <Button href="#introduction" variant="primary" tone="dark" arrow>
                {t(HERO.primaryAction)}
              </Button>
              <Button href="#journey" variant="outline" tone="dark">
                {t(HERO.secondaryAction)}
              </Button>
            </motion.div>

            {/* Discipline index */}
            <motion.ul
              {...entrance(0.62)}
              className="mt-10 flex list-none flex-wrap gap-x-8 gap-y-3 border-t border-white/10 p-0 pt-5"
            >
              {HERO.disciplines.map((discipline) => (
                <li key={discipline.en} className="flex items-center gap-2.5">
                  <span className="h-1 w-1 bg-green" aria-hidden="true" />
                  <span className="font-mono text-meta uppercase tracking-[0.24em] text-white/55">
                    {t(discipline)}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Object plate — the PCB with an overlapping photographic crop */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
              <PcbVisual className="absolute inset-0 z-0 hidden h-full w-full md:block" />

              {/* On phones the board is replaced by the photograph alone. */}
              <div className="absolute inset-0 md:hidden">
                <ImagePanel
                  image={IMAGES.electronicsAssembly}
                  variant="framed"
                  ratio={4 / 3}
                  priority
                  className="h-full"
                />
              </div>

              <motion.div
                className={cn(
                  'absolute -bottom-10 z-20 hidden w-[46%] md:block',
                  isRTL ? '-right-4' : '-left-4',
                )}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75, ease: EASE.technical }}
              >
                <ImagePanel
                  image={IMAGES.pcb}
                  variant="plain"
                  ratio={1}
                  priority
                  caption={false}
                  className="shadow-panel ring-1 ring-white/10"
                />
              </motion.div>

              <motion.span
                className={cn(
                  'absolute top-6 z-20 hidden items-center gap-2 rounded-xs border border-white/15 bg-navy-950/80 px-3 py-2 font-mono text-meta uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm md:inline-flex',
                  isRTL ? 'left-0' : 'right-0',
                )}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: isRTL ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.95, ease: EASE.technical }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green animate-status-blink" aria-hidden="true" />
                {t(UI.systemStatus)}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Base strip — coordinates and the scroll affordance */}
      <div className="relative z-10 border-t border-white/10">
        <div className="shell flex items-center justify-between py-5">
          <span className="font-mono text-meta uppercase tracking-[0.24em] text-white/60">
            {t(HERO.coordinates)}
          </span>
          <a
            href="#introduction"
            className="group inline-flex items-center gap-3 rounded-xs font-mono text-meta uppercase tracking-[0.24em] text-white/55 transition-colors duration-base hover:text-green"
          >
            {t(UI.scrollHint)}
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-base ease-technical group-hover:translate-y-1',
                !reduced && 'motion-safe:animate-node-pulse',
              )}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
