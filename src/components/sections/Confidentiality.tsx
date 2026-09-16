import { Lock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CONFIDENTIALITY } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PolicyPanel } from '@/components/ui/PolicyPanel';

export function Confidentiality() {
  const { t } = useLanguage();

  return (
    <div id="confidentiality" aria-labelledby="confidentiality-heading">
      <SectionHeading
        id="confidentiality"
        eyebrow={t(CONFIDENTIALITY.eyebrow)}
        title={t(CONFIDENTIALITY.title)}
        lead={t(CONFIDENTIALITY.lead)}
        icon={Lock}
      />

      <PolicyPanel
        className="mt-10 max-w-3xl"
        index={1}
        title={t(CONFIDENTIALITY.listIntro)}
        items={CONFIDENTIALITY.items}
      />
    </div>
  );
}
