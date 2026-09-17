import { useEffect, useState } from 'react';
import { ChevronDown, Building2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { HERO } from '@/data/content';
import { UI } from '@/data/ui';
import { Button } from '@/components/ui/Button';
import { useWizardCtx } from '@/wizard/WizardContext';

/**
 * Path to the hero background photograph, relative to the public/ folder.
 * The image sits BEHIND the navy overlay so the headline stays legible
 * either way. GitHub Pages URLs are case-sensitive — match the filename
 * exactly (extension included).
 */
const HERO_IMAGE = 'hero-bg.JPG';

export function Hero() {
  const { t } = useLanguage();
  const { goTo } = useWizardCtx();
  const [heroImageOk, setHeroImageOk] = useState(false);

  useEffect(() => {
    // Import.meta.env.BASE_URL is Vite's runtime base — respects our
    // BASE_PATH under GitHub Pages, plain "/" locally.
    const url = `${import.meta.env.BASE_URL}${HERO_IMAGE}`;
    const probe = new Image();
    probe.onload = () => setHeroImageOk(true);
    probe.src = url;
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden text-white"
    >
      {/* Background image (fades in when present) */}
      {heroImageOk ? (
        <img
          src={`${import.meta.env.BASE_URL}${HERO_IMAGE}`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20"
          style={{
            background:
              'linear-gradient(135deg, var(--saak-navy-900) 0%, var(--saak-navy-700) 55%, var(--saak-green-700) 145%)',
          }}
        />
      )}

      {/* Navy overlay for legibility — sits between the image and content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: heroImageOk
            ? 'linear-gradient(135deg, rgba(8,24,45,0.78) 0%, rgba(20,57,107,0.72) 55%, rgba(11,105,54,0.55) 145%)'
            : 'radial-gradient(ellipse at center, rgba(8,24,45,0.35) 0%, rgba(8,24,45,0.78) 100%)',
        }}
      />

      {/* Placeholder icon watermark shown when no photograph is uploaded */}
      {!heroImageOk ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.06]"
        >
          <Building2 className="h-72 w-72 text-white" strokeWidth={1} />
        </div>
      ) : null}

      <div className="shell relative z-10 flex flex-col items-center gap-6 py-24 text-center">
        <span className="rounded-pill border border-white/30 bg-white/10 px-5 py-1.5 text-label uppercase text-white/90 backdrop-blur-sm">
          {t(HERO.eyebrow)}
        </span>

        <h1
          id="hero-heading"
          className="max-w-none text-display font-extrabold text-white"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
        >
          <span className="text-white/90">{t(HERO.titleLead)}</span>{' '}
          <span className="text-white">{t(HERO.titleAccent)}</span>
        </h1>

        <p className="max-w-2xl text-body-lg text-white/90">{t(HERO.lead)}</p>

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
