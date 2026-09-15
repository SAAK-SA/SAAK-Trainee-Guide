import { useLanguage } from '@/i18n/LanguageContext';
import { ABOUT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" tone="light">
      <div className="shell">
        <SectionHeading
          id="about"
          eyebrow={t(ABOUT.eyebrow)}
          title={t(ABOUT.title)}
          lead={t(ABOUT.lead)}
        />

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-prose text-body text-navy/75">{t(ABOUT.body)}</p>
        </Reveal>

        <div className="mt-14">
          <TechnicalLabel>{t(ABOUT.areasTitle)}</TechnicalLabel>
          <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ABOUT.areas.map((area) => (
              <TechnicalCard key={area.id} item={area} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
