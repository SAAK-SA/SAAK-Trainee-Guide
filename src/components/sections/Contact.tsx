import { useLanguage } from '@/i18n/LanguageContext';
import { CONTACT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataList } from '@/components/ui/DataList';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { Reveal } from '@/components/ui/Reveal';

export function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact" tone="dark">
      <div className="shell">
        <SectionHeading
          id="contact"
          eyebrow={t(CONTACT.eyebrow)}
          title={t(CONTACT.title)}
          lead={t(CONTACT.lead)}
          tone="dark"
        />

        <Reveal delay={0.15}>
          <div className="mt-12 max-w-2xl rounded-lg border border-white/10 bg-white/[0.04] p-8">
            <TechnicalLabel tone="inverse">{t(CONTACT.cardLabel)}</TechnicalLabel>
            <DataList tone="dark" rows={CONTACT.rows} className="mt-6" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
