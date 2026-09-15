import { Clock3 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CONDUCT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function Conduct() {
  const { t } = useLanguage();

  return (
    <Section id="conduct" tone="light">
      <div className="shell">
        <SectionHeading
          id="conduct"
          eyebrow={t(CONDUCT.eyebrow)}
          title={t(CONDUCT.title)}
          lead={t(CONDUCT.lead)}
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONDUCT.items.map((item) => (
            <TechnicalCard key={item.id} item={item} />
          ))}
        </RevealGroup>

        <Reveal delay={0.2}>
          <aside className="mt-12 flex flex-col gap-6 rounded-lg border border-navy/10 bg-neutralx-50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-green/15 text-green-700">
                <Clock3 className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <TechnicalLabel tone="green">{t(CONDUCT.hoursLabel)}</TechnicalLabel>
                <p className="mt-1 text-h3 text-navy-900">{t(CONDUCT.hoursDays)}</p>
              </div>
            </div>
            <p className="text-h3 text-navy-900" dir="ltr">
              {t(CONDUCT.hoursTime)}
            </p>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
