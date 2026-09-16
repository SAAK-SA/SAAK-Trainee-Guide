import { useLanguage } from '@/i18n/LanguageContext';
import { EXPERIENCE } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BulletList } from '@/components/ui/BulletList';

export function Experience() {
  const { t } = useLanguage();

  return (
    <div id="experience" aria-labelledby="experience-heading">
      <SectionHeading
        id="experience"
        eyebrow={t(EXPERIENCE.eyebrow)}
        title={t(EXPERIENCE.title)}
        lead={t(EXPERIENCE.lead)}
      />

      <div className="mt-8 max-w-3xl">
        <p className="text-body font-semibold text-navy-900">{t(EXPERIENCE.listIntro)}</p>
        <BulletList items={EXPERIENCE.items} className="mt-4" />
      </div>
    </div>
  );
}
