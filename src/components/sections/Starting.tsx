import { useLanguage } from '@/i18n/LanguageContext';
import { STARTING } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';

export function Starting() {
  const { t } = useLanguage();

  return (
    <div id="starting" aria-labelledby="starting-heading">
      <SectionHeading
        id="starting"
        eyebrow={t(STARTING.eyebrow)}
        title={t(STARTING.title)}
        lead={t(STARTING.lead)}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STARTING.items.map((item) => (
          <TechnicalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
