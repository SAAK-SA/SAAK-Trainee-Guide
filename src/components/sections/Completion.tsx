import { GraduationCap, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { COMPLETION } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Completion() {
  const { t } = useLanguage();

  return (
    <div id="completion" aria-labelledby="completion-heading">
      <SectionHeading
        id="completion"
        eyebrow={t(COMPLETION.eyebrow)}
        title={t(COMPLETION.title)}
        lead={t(COMPLETION.lead)}
      />

      <section
        className="mt-10 flex flex-col gap-6 rounded-lg p-8 text-white md:flex-row md:items-start md:p-10"
        style={{
          background:
            'linear-gradient(135deg, var(--saak-navy-900), var(--saak-navy-700))',
        }}
      >
        <span
          className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-md text-navy-900"
          style={{ background: 'var(--saak-green-400)' }}
          aria-hidden="true"
        >
          <GraduationCap className="h-9 w-9" strokeWidth={1.8} />
        </span>
        <div>
          <h3 className="text-h2 text-white">{t(COMPLETION.listIntro)}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {COMPLETION.items.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-body text-white/85">
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-green/25 text-green-400"
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span>{t(item.text)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
