import { useLanguage } from '@/i18n/LanguageContext';
import { PROPERTY } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PolicyPanel } from '@/components/ui/PolicyPanel';

export function Property() {
  const { t } = useLanguage();

  return (
    <div id="property" aria-labelledby="property-heading">
      <SectionHeading
        id="property"
        eyebrow={t(PROPERTY.eyebrow)}
        title={t(PROPERTY.title)}
        lead={t(PROPERTY.lead)}
      />

      <PolicyPanel
        className="mt-10 max-w-3xl"
        index={2}
        title={t(PROPERTY.listIntro)}
        items={PROPERTY.items}
      />
    </div>
  );
}
