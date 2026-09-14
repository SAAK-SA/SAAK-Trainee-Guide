import { useLanguage } from '@/i18n/LanguageContext';
import { INFORMATION } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataList } from '@/components/ui/DataList';
import { ImagePanel } from '@/components/ui/ImagePanel';

/**
 * 07 — Important information.
 * A split plate: a datasheet of label/value rows against a single technical
 * photograph. Nothing decorative competes with the rows.
 */
export function Information() {
  const { t } = useLanguage();

  return (
    <Section id="information" tone="muted" index="07">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
              <SectionHeading
                id="information"
                eyebrow={t(INFORMATION.eyebrow)}
                title={t(INFORMATION.title)}
                lead={t(INFORMATION.lead)}
              />
              <div className="mt-12 hidden lg:block">
                <ImagePanel image={IMAGES.testing} variant="circuit" ratio={3 / 2} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <DataList rows={INFORMATION.rows} />
          </div>
        </div>
      </div>
    </Section>
  );
}
