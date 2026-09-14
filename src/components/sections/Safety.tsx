import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SAFETY } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

/**
 * 06 — Safety.
 * Dark plate again, but weighted differently to section 02: the imagery is
 * narrow and vertical, the cards sit in a two-column block, and a single
 * notice bar closes the section.
 */
export function Safety() {
  const { t } = useLanguage();

  return (
    <Section id="safety" tone="dark" index="06" grid="default">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="safety"
              tone="dark"
              eyebrow={t(SAFETY.eyebrow)}
              title={t(SAFETY.title)}
              lead={t(SAFETY.lead)}
            />
            <div className="mt-12">
              <ImagePanel image={IMAGES.safety} variant="plain" ratio={4 / 3} label="06 / PPE" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.08}>
              {SAFETY.items.map((item, index) => (
                <TechnicalCard
                  key={item.id}
                  item={item}
                  tone="dark"
                  index={`${index + 1}`.padStart(2, '0')}
                />
              ))}
            </RevealGroup>

            <Reveal distance={20} delay={0.1}>
              <div className="mt-8 flex items-start gap-4 rounded-md border border-green/35 bg-green/[0.07] p-6">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-green"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="m-0 text-small text-white/75">{t(SAFETY.notice)}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
