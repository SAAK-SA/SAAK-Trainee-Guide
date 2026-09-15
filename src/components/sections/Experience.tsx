import { useLanguage } from '@/i18n/LanguageContext';
import { EXPERIENCE } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BulletList } from '@/components/ui/BulletList';
import { Reveal } from '@/components/ui/Reveal';

export function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" tone="dark">
      <div className="shell">
        <SectionHeading
          id="experience"
          eyebrow={t(EXPERIENCE.eyebrow)}
          title={t(EXPERIENCE.title)}
          lead={t(EXPERIENCE.lead)}
          tone="dark"
        />

        <div className="mt-12 max-w-3xl">
          <Reveal>
            <p className="text-body font-medium text-white/85">{t(EXPERIENCE.listIntro)}</p>
          </Reveal>
          <BulletList tone="dark" items={EXPERIENCE.items} className="mt-6" />
        </div>
      </div>
    </Section>
  );
}
