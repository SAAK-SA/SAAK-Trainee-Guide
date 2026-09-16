import { useLanguage } from '@/i18n/LanguageContext';
import { COMPLETION } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BulletList } from '@/components/ui/BulletList';
import { Reveal } from '@/components/ui/Reveal';

export function Completion() {
  const { t } = useLanguage();

  return (
    <Section id="completion" tone="light">
      <div className="shell">
        <SectionHeading
          id="completion"
          eyebrow={t(COMPLETION.eyebrow)}
          title={t(COMPLETION.title)}
          lead={t(COMPLETION.lead)}
        />

        <div className="mt-12 max-w-3xl">
          <Reveal>
            <p className="text-body font-medium text-navy-900">{t(COMPLETION.listIntro)}</p>
          </Reveal>
          <BulletList items={COMPLETION.items} className="mt-4" />
        </div>
      </div>
    </Section>
  );
}
