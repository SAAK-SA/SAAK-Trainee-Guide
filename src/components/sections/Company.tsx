import { useLanguage } from '@/i18n/LanguageContext';
import { COMPANY } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { MetricGrid } from '@/components/ui/MetricGrid';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

/**
 * 02 — The company.
 * The first dark plate. Two overlapping photographs establish depth on one
 * side, the statement holds the other, and the figures run full width beneath.
 */
export function Company() {
  const { t } = useLanguage();

  return (
    <Section id="company" tone="dark" index="02" grid="fine" decoration="corner" decorationClassName="end-0 top-16 h-44 w-72 text-white/50">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="relative lg:col-span-6">
            <ImagePanel image={IMAGES.building} variant="plain" ratio={4 / 3} parallax />
            {/* Overlapping secondary crop — layered depth, not a second row. */}
            <div className="absolute -bottom-12 end-[-6%] hidden w-[44%] md:block">
              <ImagePanel
                image={IMAGES.machinery}
                variant="plain"
                ratio={1}
                caption={false}
                className="shadow-panel ring-1 ring-white/15"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:ps-6">
            <SectionHeading
              id="company"
              tone="dark"
              eyebrow={t(COMPANY.eyebrow)}
              title={t(COMPANY.title)}
              lead={t(COMPANY.lead)}
            />
            {COMPANY.body.map((paragraph, index) => (
              <Reveal key={index} distance={20} delay={0.16}>
                <p className="mt-6 max-w-prose text-body text-white/60">{t(paragraph)}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <MetricGrid metrics={COMPANY.metrics} tone="dark" className="mt-24 md:mt-28" />

        <RevealGroup className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {COMPANY.capabilities.map((item) => (
            <TechnicalCard key={item.id} item={item} tone="dark" />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
