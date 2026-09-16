import { useEffect, useRef } from 'react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ABOUT } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { SmartImage } from '@/components/ui/SmartImage';
import { ICONS } from '@/lib/icons';

/**
 * Photo path for each area card. Drop matching files in `public/images/`
 * and the placeholders swap out on load — no code change needed.
 *
 *   public/images/about-design.jpg
 *   public/images/about-manufacturing.jpg
 *   public/images/about-repair.jpg
 *   public/images/about-engineering.jpg
 */
const AREA_IMAGES: Record<string, string> = {
  'area-design': 'images/about-design.jpg',
  'area-manufacturing': 'images/about-manufacturing.jpg',
  'area-repair': 'images/about-repair.jpg',
  'area-engineering': 'images/about-engineering.jpg',
};

/** Auto-drift the carousel left/right in whole-pixel steps. */
function useAutoDrift(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let direction = 1;
    let paused = false;
    let resumeTimer: number | undefined;
    let frame = 0;
    let raf: number;

    const step = () => {
      frame++;
      if (!paused && frame % 2 === 0) {
        const before = el.scrollLeft;
        el.scrollLeft = before + direction;
        if (el.scrollLeft === before) {
          direction *= -1;
          el.scrollLeft = before + direction;
        }
      }
      raf = requestAnimationFrame(step);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resumeLater = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 1500);
    };

    (['mouseenter', 'touchstart', 'focusin', 'wheel'] as const).forEach((evt) =>
      el.addEventListener(evt, pause, { passive: true }),
    );
    (['mouseleave', 'touchend', 'focusout'] as const).forEach((evt) =>
      el.addEventListener(evt, resumeLater, { passive: true }),
    );

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      (['mouseenter', 'touchstart', 'focusin', 'wheel'] as const).forEach((evt) =>
        el.removeEventListener(evt, pause),
      );
      (['mouseleave', 'touchend', 'focusout'] as const).forEach((evt) =>
        el.removeEventListener(evt, resumeLater),
      );
    };
  }, [ref]);
}

export function About() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  useAutoDrift(carouselRef);

  return (
    <div id="about" aria-labelledby="about-heading">
      <SectionHeading
        id="about"
        eyebrow={t(ABOUT.eyebrow)}
        title={t(ABOUT.title)}
        lead={t(ABOUT.lead)}
        icon={Building2}
      />

      <p className="mt-4 max-w-2xl text-body text-neutralx-500">{t(ABOUT.body)}</p>

      <div className="mt-10">
        <TechnicalLabel tone="muted">{t(ABOUT.areasTitle)}</TechnicalLabel>

        {/* Horizontal photo carousel — auto-drifts, pauses on hover. */}
        <div
          ref={carouselRef}
          className="scrollbar-none mt-6 flex gap-4 overflow-x-auto pb-4 pt-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {ABOUT.areas.map((area) => {
            const Icon = ICONS[area.icon];
            const image = `${import.meta.env.BASE_URL}${AREA_IMAGES[area.id] ?? ''}`;
            return (
              <article
                key={area.id}
                className="group relative h-[340px] w-[260px] shrink-0 overflow-hidden rounded-xl shadow-sm transition-transform duration-base ease-technical hover:-translate-y-2 hover:shadow-lg"
              >
                <SmartImage
                  src={image}
                  alt={t(area.title)}
                  icon={Icon}
                  ratio="fill"
                  className="!absolute !inset-0 !rounded-none"
                />
                {/* Gradient overlay for legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(8,24,45,0.15) 0%, rgba(8,24,45,0.55) 55%, rgba(8,24,45,0.94) 100%)',
                  }}
                />
                <div className="absolute inset-0 z-[2] flex flex-col justify-end gap-2 p-6 text-white">
                  <Icon
                    className="h-7 w-7 text-green-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <h3 className="text-h3 text-white">{t(area.title)}</h3>
                  <p className="text-small text-white/85">{t(area.body)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
