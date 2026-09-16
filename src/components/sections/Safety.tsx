import { useLanguage } from '@/i18n/LanguageContext';
import { SAFETY } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { RevealGroup } from '@/components/ui/Reveal';

export function Safety() {
  const { t } = useLanguage();

  return (
    <Section id="safety" tone="muted">
      <div className="shell">
        <SectionHeading
          id="safety"
          eyebrow={t(SAFETY.eyebrow)}
          title={t(SAFETY.title)}
          lead={t(SAFETY.lead)}
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {SAFETY.items.map((item) => (
            <TechnicalCard key={item.id} item={item} />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
