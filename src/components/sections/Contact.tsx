import { useLanguage } from '@/i18n/LanguageContext';
import { CONTACT } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { RevealGroup } from '@/components/ui/Reveal';

/**
 * 08 — Contact.
 * Centred heading, a four-up channel index, then a wide closing photograph
 * that hands the page over to the closing plate.
 */
export function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact" tone="light" index="08" grid="default" decoration="branch" decorationClassName="start-0 top-24 h-20 w-80 text-navy/40">
      <div className="shell">
        <SectionHeading
          id="contact"
          align="center"
          eyebrow={t(CONTACT.eyebrow)}
          title={t(CONTACT.title)}
          lead={t(CONTACT.lead)}
        />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {CONTACT.channels.map((item, index) => (
            <TechnicalCard key={item.id} item={item} index={`${index + 1}`.padStart(2, '0')} />
          ))}
        </RevealGroup>

        <div className="mt-20">
          <ImagePanel
            image={IMAGES.workspace}
            variant="plain"
            ratio={21 / 9}
            parallax
            label="08 / CONTACT"
          />
        </div>
      </div>
    </Section>
  );
}
