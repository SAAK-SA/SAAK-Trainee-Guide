import { useLanguage } from '@/i18n/LanguageContext';
import { ABOUT } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';

export function About() {
  const { t } = useLanguage();

  return (
    <div id="about" aria-labelledby="about-heading">
      <SectionHeading
        id="about"
        eyebrow={t(ABOUT.eyebrow)}
        title={t(ABOUT.title)}
        lead={t(ABOUT.lead)}
      />

      <p className="mt-4 max-w-2xl text-body text-neutralx-500">{t(ABOUT.body)}</p>

      <div className="mt-10">
        <TechnicalLabel tone="muted">{t(ABOUT.areasTitle)}</TechnicalLabel>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {ABOUT.areas.map((area) => (
            <TechnicalCard key={area.id} item={area} />
          ))}
        </div>
      </div>
    </div>
  );
}
