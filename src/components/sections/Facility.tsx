import { useLanguage } from '@/i18n/LanguageContext';
import { FACILITY } from '@/data/content';
import { IMAGES } from '@/data/images';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePanel } from '@/components/ui/ImagePanel';
import { DataList } from '@/components/ui/DataList';
import { CircuitDecoration } from '@/components/circuit/CircuitDecoration';

/**
 * 04 — Facility.
 * The photographic plate. A full-bleed environment shot carries the section
 * header, then two differently-cropped panels and the zone index below it.
 */
export function Facility() {
  const { t } = useLanguage();

  return (
    <Section id="facility" tone="deep" index="04" padding="none" bleed>
      {/* Full-bleed establishing image with the heading laid over it. */}
      <div className="relative min-h-[70svh] w-full overflow-hidden md:min-h-[82svh]">
        {/* The positioning box is plain; the panel just fills it. Putting the
            absolute placement on the panel itself would fight its own
            `relative` base class. */}
        <div className="absolute inset-0">
          <ImagePanel
            image={IMAGES.factory}
            variant="full"
            fill
            caption={false}
            interactive={false}
            parallax
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-grid-fine-dark bg-grid opacity-25" aria-hidden="true" />
        <CircuitDecoration
          variant="corner"
          className="end-0 top-24 hidden h-44 w-72 text-white/70 md:block"
          opacity={0.45}
        />

        <div className="shell relative flex min-h-[70svh] items-end pb-16 pt-[calc(var(--nav-height)+4rem)] md:min-h-[82svh] md:pb-24">
          <SectionHeading
            id="facility"
            tone="dark"
            eyebrow={t(FACILITY.eyebrow)}
            title={t(FACILITY.title)}
            lead={t(FACILITY.lead)}
          />
        </div>
      </div>

      {/* Composition row: a wide crop beside a tall portrait crop. */}
      <div className="shell relative z-10 py-section-sm">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <ImagePanel image={IMAGES.workspace} variant="plain" ratio={3 / 2} label="04 / WORKSPACE" />
          </div>
          <div className="md:col-span-5">
            <ImagePanel image={IMAGES.technicians} variant="plain" ratio={4 / 5} />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="text-h2 text-white">{t({ en: 'Zones', ar: 'المناطق' })}</h3>
            <p className="mt-4 max-w-prose text-small text-white/55">
              {t({
                en: 'Placeholder note about how the zones relate to one another.',
                ar: 'ملاحظة مؤقتة حول العلاقة بين المناطق.',
              })}
            </p>
          </div>
          <div className="lg:col-span-7">
            <DataList rows={FACILITY.zones} tone="dark" />
          </div>
        </div>
      </div>
    </Section>
  );
}
