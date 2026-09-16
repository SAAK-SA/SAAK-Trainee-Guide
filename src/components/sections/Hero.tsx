import { useLanguage } from '@/i18n/LanguageContext';
import { HERO } from '@/data/content';
import { UI } from '@/data/ui';
import { Button } from '@/components/ui/Button';
import { useWizardCtx } from '@/wizard/WizardContext';
import { ChevronDown } from 'lucide-react';

/**
 * Welcoming hero — SAAK Team style.
 * Full-viewport navy → green gradient, centered content, big title,
 * pill CTA button, and a scroll-hint indicator at the bottom.
 */
export function Hero() {
  const { t } = useLanguage();
  const { goTo } = useWizardCtx();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden text-white"
    >
      {/* Base gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(135deg, var(--saak-navy-900) 0%, var(--saak-navy-700) 55%, var(--saak-green-700) 145%)',
        }}
      />
      {/* Overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(8,24,45,0.35) 0%, rgba(8,24,45,0.78) 100%)',
        }}
      />

      <div className="shell relative z-10 flex flex-col items-center gap-6 py-24 text-center">
        <span className="rounded-pill border border-white/20 bg-white/10 px-4 py-1.5 text-label uppercase text-white/85 backdrop-blur-sm">
          {t(HERO.eyebrow)}
        </span>

        <h1
          id="hero-heading"
          className="max-w-3xl text-display-xl text-white"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
        >
          <span className="block text-white/90">{t(HERO.titleLead)}</span>
          <span className="block text-white">{t(HERO.titleAccent)}</span>
        </h1>

        <p className="max-w-2xl text-body-lg text-white/85">{t(HERO.lead)}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Button variant="accent" arrow onClick={() => goTo(0)}>
            {t(HERO.primaryAction)}
          </Button>
          <Button variant="ghost-light" onClick={() => goTo(0)}>
            {t(HERO.secondaryAction)}
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#wizard"
        aria-label={t(UI.scrollHint)}
        className="absolute bottom-8 start-1/2 -translate-x-1/2 rounded-pill border border-white/40 p-2 text-white/70 transition-colors duration-base hover:border-green hover:text-green"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </a>
    </section>
  );
}
