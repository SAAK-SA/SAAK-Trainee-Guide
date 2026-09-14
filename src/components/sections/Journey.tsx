import { useLanguage } from '@/i18n/LanguageContext';
import { JOURNEY } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { Timeline } from '@/components/ui/Timeline';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { CircuitDecoration } from '@/components/circuit/CircuitDecoration';

/**
 * 03 — Training journey.
 * The signal section: one trace runs the length of the stages and energises
 * with scroll, lighting each stage node as it is reached.
 */
export function Journey() {
  const { t } = useLanguage();

  return (
    <Section id="journey" tone="muted" index="03" grid="default">
      <div className="shell">
        <SectionHeading
          id="journey"
          eyebrow={t(JOURNEY.eyebrow)}
          title={t(JOURNEY.title)}
          lead={t(JOURNEY.lead)}
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Timeline steps={JOURNEY.steps} />
          </div>

          {/* Sticky companion panel — holds the eye while the trace advances. */}
          <aside className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
              <ImagePanel image={IMAGES.engineers} variant="framed" ratio={3 / 4} label="03 / STAGES" />
              <CircuitDecoration
                variant="branch"
                className="-bottom-10 start-0 hidden h-16 w-full text-navy/50 lg:block"
                opacity={0.5}
              />
              <div className="mt-10 border-t border-navy/10 pt-5">
                <TechnicalLabel marker>
                  {JOURNEY.steps.length} · {t({ en: 'STAGES', ar: 'مراحل' })}
                </TechnicalLabel>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
