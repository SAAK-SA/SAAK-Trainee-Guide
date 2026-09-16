import { useLanguage } from '@/i18n/LanguageContext';
import { SAFETY } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';

export function Safety() {
  const { t } = useLanguage();

  return (
    <div id="safety" aria-labelledby="safety-heading">
      <SectionHeading
        id="safety"
        eyebrow={t(SAFETY.eyebrow)}
        title={t(SAFETY.title)}
        lead={t(SAFETY.lead)}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {SAFETY.items.map((item) => (
          <TechnicalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
