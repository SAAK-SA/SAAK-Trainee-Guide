import { useLanguage } from '@/i18n/LanguageContext';
import { VISION } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';

export function Vision() {
  const { t } = useLanguage();

  return (
    <div id="vision" aria-labelledby="vision-heading">
      <SectionHeading
        id="vision"
        eyebrow={t(VISION.eyebrow)}
        title={t(VISION.title)}
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-lg border border-neutralx-200 bg-cream-50 p-7">
          <TechnicalLabel tone="green">{t(VISION.visionLabel)}</TechnicalLabel>
          <p className="mt-3 text-h3 leading-snug text-navy-900">{t(VISION.vision)}</p>
        </article>
        <article
          className="rounded-lg p-7 text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--saak-navy-900), var(--saak-navy-700))',
          }}
        >
          <span className="text-label uppercase text-green-400">{t(VISION.missionLabel)}</span>
          <p className="mt-3 text-h3 leading-snug text-white">{t(VISION.mission)}</p>
        </article>
      </div>

      <div className="mt-10">
        <TechnicalLabel tone="muted">{t(VISION.valuesLabel)}</TechnicalLabel>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {VISION.values.map((value) => (
            <TechnicalCard key={value.id} item={value} />
          ))}
        </div>
      </div>
    </div>
  );
}
