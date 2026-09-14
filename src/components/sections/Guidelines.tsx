import { useLanguage } from '@/i18n/LanguageContext';
import { GUIDELINES } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { RevealGroup } from '@/components/ui/Reveal';

/**
 * 05 — Guidelines.
 * A dense card index. The heading shares its row with a square inspection
 * crop so the grid does not open with an empty band.
 */
export function Guidelines() {
  const { t } = useLanguage();

  return (
    <Section id="guidelines" tone="light" index="05" grid="fine" gridMarkers>
      <div className="shell">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="guidelines"
              eyebrow={t(GUIDELINES.eyebrow)}
              title={t(GUIDELINES.title)}
              lead={t(GUIDELINES.lead)}
            />
          </div>
          <div className="lg:col-span-5">
            <ImagePanel image={IMAGES.inspection} variant="framed" ratio={1} label="05 / INSPECTION" />
          </div>
        </div>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {GUIDELINES.items.map((item, index) => (
            <TechnicalCard
              key={item.id}
              item={item}
              index={`${index + 1}`.padStart(2, '0')}
            />
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
