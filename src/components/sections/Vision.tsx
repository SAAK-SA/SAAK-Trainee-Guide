import { useLanguage } from '@/i18n/LanguageContext';
import { VISION } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function Vision() {
  const { t } = useLanguage();

  return (
    <Section id="vision" tone="muted">
      <div className="shell">
        <SectionHeading id="vision" eyebrow={t(VISION.eyebrow)} title={t(VISION.title)} />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-lg border border-navy/10 bg-white p-8 shadow-card">
              <TechnicalLabel tone="green">{t(VISION.visionLabel)}</TechnicalLabel>
              <p className="mt-4 text-h3 leading-snug text-navy-900">{t(VISION.vision)}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-lg border border-navy/10 bg-navy p-8 text-white shadow-card">
              <span className="tech-label inline-flex items-center gap-2 text-white/70">
                <span className="h-1 w-1 shrink-0 bg-green" aria-hidden="true" />
                {t(VISION.missionLabel)}
              </span>
              <p className="mt-4 text-h3 leading-snug text-white">{t(VISION.mission)}</p>
            </article>
          </Reveal>
        </div>

        <div className="mt-16">
          <TechnicalLabel>{t(VISION.valuesLabel)}</TechnicalLabel>
          <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {VISION.values.map((value) => (
              <TechnicalCard key={value.id} item={value} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
