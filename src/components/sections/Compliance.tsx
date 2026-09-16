import { useLanguage } from '@/i18n/LanguageContext';
import { COMPLIANCE } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PolicyPanel } from '@/components/ui/PolicyPanel';

export function Compliance() {
  const { t } = useLanguage();

  return (
    <div id="compliance" aria-labelledby="compliance-heading">
      <SectionHeading
        id="compliance"
        eyebrow={t(COMPLIANCE.eyebrow)}
        title={t(COMPLIANCE.title)}
        lead={t(COMPLIANCE.lead)}
      />

      <PolicyPanel
        className="mt-10 max-w-3xl"
        index={3}
        title={t(COMPLIANCE.listIntro)}
        items={COMPLIANCE.items}
      />
    </div>
  );
}
