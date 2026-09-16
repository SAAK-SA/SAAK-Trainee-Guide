import { useLanguage } from '@/i18n/LanguageContext';
import { STARTING } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { RevealGroup } from '@/components/ui/Reveal';

export function Starting() {
  const { t } = useLanguage();

  return (
    <Section id="starting" tone="light">
      <div className="shell">
        <SectionHeading
          id="starting"
          eyebrow={t(STARTING.eyebrow)}
          title={t(STARTING.title)}
          lead={t(STARTING.lead)}
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STARTING.items.map((item) => (
            <TechnicalCard key={item.id} item={item} />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
