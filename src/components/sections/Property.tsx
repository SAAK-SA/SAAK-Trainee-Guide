import { useLanguage } from '@/i18n/LanguageContext';
import { PROPERTY } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BulletList } from '@/components/ui/BulletList';
import { Reveal } from '@/components/ui/Reveal';

export function Property() {
  const { t } = useLanguage();

  return (
    <Section id="property" tone="muted">
      <div className="shell">
        <SectionHeading
          id="property"
          eyebrow={t(PROPERTY.eyebrow)}
          title={t(PROPERTY.title)}
          lead={t(PROPERTY.lead)}
        />

        <div className="mt-12 max-w-3xl">
          <Reveal>
            <p className="text-body font-medium text-navy-900">{t(PROPERTY.listIntro)}</p>
          </Reveal>
          <BulletList items={PROPERTY.items} className="mt-4" />
        </div>
      </div>
    </Section>
  );
}
