import { Clock, HandHeart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CONDUCT } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';

export function Conduct() {
  const { t } = useLanguage();

  return (
    <div id="conduct" aria-labelledby="conduct-heading">
      <SectionHeading
        id="conduct"
        eyebrow={t(CONDUCT.eyebrow)}
        title={t(CONDUCT.title)}
        lead={t(CONDUCT.lead)}
        icon={HandHeart}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CONDUCT.items.map((item) => (
          <TechnicalCard key={item.id} item={item} />
        ))}
      </div>

      <aside className="mt-8 flex flex-col gap-4 rounded-lg border border-neutralx-200 bg-cream-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-white shadow-sm"
            style={{
              background: 'linear-gradient(135deg, var(--saak-green), var(--saak-green-600))',
            }}
            aria-hidden="true"
          >
            <Clock className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <TechnicalLabel tone="green">{t(CONDUCT.hoursLabel)}</TechnicalLabel>
            <p className="mt-1 text-h3 text-navy-900">{t(CONDUCT.hoursDays)}</p>
          </div>
        </div>
        <p className="text-h3 text-navy-900">{t(CONDUCT.hoursTime)}</p>
      </aside>
    </div>
  );
}
