import { useLanguage } from '@/i18n/LanguageContext';
import { COMPLIANCE } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BulletList } from '@/components/ui/BulletList';
import { Reveal } from '@/components/ui/Reveal';

export function Compliance() {
  const { t } = useLanguage();

  return (
    <Section id="compliance" tone="light">
      <div className="shell">
        <SectionHeading
          id="compliance"
          eyebrow={t(COMPLIANCE.eyebrow)}
          title={t(COMPLIANCE.title)}
          lead={t(COMPLIANCE.lead)}
        />

        <div className="mt-12 max-w-3xl">
          <Reveal>
            <p className="text-body font-medium text-navy-900">{t(COMPLIANCE.listIntro)}</p>
          </Reveal>
          <BulletList items={COMPLIANCE.items} className="mt-4" />
        </div>
      </div>
    </Section>
  );
}
