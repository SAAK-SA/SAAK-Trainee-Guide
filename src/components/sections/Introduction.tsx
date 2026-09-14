import { useLanguage } from '@/i18n/LanguageContext';
import { INTRODUCTION } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

/**
 * 01 — Introduction.
 * Asymmetric opening: a narrow text column against a tall editorial image,
 * then a three-card index of what the guide covers.
 */
export function Introduction() {
  const { t } = useLanguage();

  return (
    <Section id="introduction" tone="light" index="01" grid="default" padding="default">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="introduction"
              eyebrow={t(INTRODUCTION.eyebrow)}
              title={t(INTRODUCTION.title)}
              lead={t(INTRODUCTION.lead)}
            />
            {INTRODUCTION.body.map((paragraph, index) => (
              <Reveal key={index} distance={20} delay={0.16}>
                <p className="mt-6 max-w-prose text-body text-navy/75">{t(paragraph)}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="relative lg:ps-10">
              <ImagePanel
                image={IMAGES.training}
                variant="circuit"
                ratio={4 / 3}
                parallax
                label="01 / TRAINING"
              />
            </div>
          </div>
        </div>

        <RevealGroup className="mt-20 grid gap-6 md:grid-cols-3" stagger={0.09}>
          {INTRODUCTION.highlights.map((item, index) => (
            <TechnicalCard key={item.id} item={item} index={`0${index + 1}`} />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
