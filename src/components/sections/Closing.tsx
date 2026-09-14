import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { CLOSING } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { AnimatedLine } from '@/components/circuit/AnimatedLine';
import { CircuitNode } from '@/components/circuit/CircuitNode';

/**
 * 09 — Closing.
 * The circuit terminates here: a final trace runs into a single live node
 * beneath a centred statement. The deepest plate on the page.
 */
export function Closing() {
  const { t } = useLanguage();
  const { reduced } = useMotionPreference();

  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <Section id="closing" tone="deep" index="09" grid="fine">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal distance={16}>
            <TechnicalLabel marker tone="inverse" className="justify-center">
              {t(CLOSING.eyebrow)}
            </TechnicalLabel>
          </Reveal>

          <Reveal distance={24} delay={0.06}>
            <h2 id="closing-heading" className="mt-8 text-display text-white">
              {t(CLOSING.title)}
            </h2>
          </Reveal>

          <Reveal distance={22} delay={0.12}>
            <p className="mx-auto mt-7 max-w-prose text-body-lg text-white/60">
              {t(CLOSING.lead)}
            </p>
          </Reveal>

          {/* Terminating trace */}
          <div className="mx-auto mt-14 h-16 w-full max-w-md text-white/45" aria-hidden="true">
            <AnimatedLine
              className="h-full w-full"
              viewBox="0 0 400 64"
              d="M0 12 H140 L170 42 H230 L260 12 H400"
              accentD="M140 12 L170 42 H230 L260 12"
              nodes={[{ cx: 200, cy: 42, r: 4, accent: true }]}
              duration={1.2}
              preserveAspectRatio="none"
            />
          </div>

          <Reveal distance={18} delay={0.18}>
            <div className="mt-2 flex justify-center text-white">
              <CircuitNode size="lg" active pulse />
            </div>
          </Reveal>

          <Reveal distance={20} delay={0.24}>
            <div className="mt-12 flex justify-center">
              <Button variant="outline" tone="dark" onClick={toTop}>
                {t(CLOSING.action)}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
