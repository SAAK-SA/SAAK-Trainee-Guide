import { Lock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CONFIDENTIALITY } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BulletList } from '@/components/ui/BulletList';
import { Reveal } from '@/components/ui/Reveal';

export function Confidentiality() {
  const { t } = useLanguage();

  return (
    <Section id="confidentiality" tone="light">
      <div className="shell">
        <SectionHeading
          id="confidentiality"
          eyebrow={t(CONFIDENTIALITY.eyebrow)}
          title={t(CONFIDENTIALITY.title)}
          lead={t(CONFIDENTIALITY.lead)}
        >
          <Reveal delay={0.15}>
            <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-md bg-green/10 text-green-700">
              <Lock className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
          </Reveal>
        </SectionHeading>

        <div className="mt-12 max-w-3xl">
          <Reveal>
            <p className="text-body font-medium text-navy-900">{t(CONFIDENTIALITY.listIntro)}</p>
          </Reveal>
          <BulletList items={CONFIDENTIALITY.items} className="mt-4" />
        </div>
      </div>
    </Section>
  );
}
