import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { HERO } from '@/data/content';
import { UI } from '@/data/ui';
import { EASE } from '@/lib/motion';
import { Button } from '@/components/ui/Button';

/**
 * Welcoming hero — no ornament for its own sake.
 *
 * A soft radial glow on navy, a warm eyebrow, the title with a green accent,
 * two lead paragraphs (welcome + opportunity), and two CTAs. Entrance runs
 * once and settles.
 */
export function Hero() {
  const { t } = useLanguage();
  const { reduced } = useMotionPreference();

  const entrance = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.3 : 0.75, delay: reduced ? 0 : delay, ease: EASE.technical },
  });

  return (
    <section
      id="hero"
      className="on-dark relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-navy-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* Soft depth: two ambient glows so the plate is not flat. */}
      <div
        className="pointer-events-none absolute -top-1/4 end-[-15%] h-[80vh] w-[80vh] rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(18,161,80,0.20) 0%, rgba(20,57,107,0.30) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 start-[-10%] h-[60vh] w-[60vh] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(20,57,107,0.55) 0%, rgba(8,24,45,0.25) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-16 pt-[calc(var(--nav-height)+2rem)] md:pb-24">
        <div className="max-w-3xl">
          <motion.div {...entrance(0.05)} className="inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
            <span className="font-mono text-tech uppercase text-green">{t(HERO.eyebrow)}</span>
          </motion.div>

          <h1 id="hero-heading" className="mt-6 text-display-xl">
            <motion.span {...entrance(0.14)} className="block text-white/90">
              {t(HERO.titleLead)}
            </motion.span>
            <motion.span {...entrance(0.22)} className="block text-white">
              {t(HERO.titleAccent)}
            </motion.span>
          </h1>

          <motion.p {...entrance(0.32)} className="mt-8 max-w-2xl text-body-lg text-white/80">
            {t(HERO.lead)}
          </motion.p>

          <motion.p {...entrance(0.4)} className="mt-4 max-w-2xl text-body text-white/60">
            {t(HERO.leadSecondary)}
          </motion.p>

          <motion.div {...entrance(0.5)} className="mt-10 flex flex-wrap gap-4">
            <Button href="#about" variant="primary" tone="dark" arrow>
              {t(HERO.primaryAction)}
            </Button>
            <Button href="#about" variant="outline" tone="dark">
              {t(HERO.secondaryAction)}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Base strip — scroll affordance. */}
      <div className="relative z-10 border-t border-white/10">
        <div className="shell flex items-center justify-between py-5">
          <span className="font-mono text-meta uppercase tracking-[0.24em] text-white/55">
            {t(UI.brandName)} {t(UI.brandSuffix)}
          </span>
          <a
            href="#about"
            className="group inline-flex items-center gap-3 rounded-xs text-small text-white/70 transition-colors duration-base hover:text-green"
          >
            {t(UI.scrollHint)}
            <ChevronDown
              className="h-4 w-4 transition-transform duration-base ease-technical group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
