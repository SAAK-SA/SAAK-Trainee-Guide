import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';

const VIEW_W = 56;
const VIEW_H = 620;

/**
 * The spine of the circuit system.
 *
 * A single routed trace runs down the side of the page. As the document is
 * scrolled the green trace draws itself over the idle navy trace and a signal
 * travels along it; when the signal reaches a junction, that junction — and the
 * section it belongs to — becomes active. The rail doubles as navigation:
 * every junction is a button that scrolls to its section.
 */
export function CircuitRail({ activeId }: { activeId: string }) {
  const { t, isRTL } = useLanguage();
  const { reduced } = useMotionPreference();
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const signalX = useMotionValue(20);
  const signalY = useMotionValue(8);
  const [signalVisible, setSignalVisible] = useState(false);

  // A routed trace: two long vertical runs joined by right-angle jogs.
  const spine = `M20 8 V132 H36 V300 H20 V452 H36 V612`;

  // The rail is fixed, so it crosses light and dark plates alike. It takes its
  // tone from whichever section currently owns the viewport.
  const activeTone = SECTIONS.find((section) => section.id === activeId)?.tone ?? 'light';
  const onDark = activeTone === 'dark' || activeTone === 'media';

  // One junction per section, spaced evenly down the rail. Spacing by path
  // length would bunch them wherever the trace jogs sideways, so each junction
  // is placed at a target y and snapped onto the nearest point of the trace.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const SAMPLES = 400;
    const samples = Array.from({ length: SAMPLES + 1 }, (_, i) => {
      const point = path.getPointAtLength((i / SAMPLES) * length);
      return { x: point.x, y: point.y };
    });

    const top = 24;
    const bottom = VIEW_H - 24;
    const count = SECTIONS.length;

    setPoints(
      SECTIONS.map((_, index) => {
        const targetY = top + ((bottom - top) * index) / (count - 1);
        return samples.reduce((best, candidate) =>
          Math.abs(candidate.y - targetY) < Math.abs(best.y - targetY) ? candidate : best,
        );
      }),
    );
  }, []);

  useMotionValueEvent(smooth, 'change', (value) => {
    const path = pathRef.current;
    if (!path || reduced) return;
    const point = path.getPointAtLength(Math.min(1, Math.max(0, value)) * path.getTotalLength());
    signalX.set(point.x);
    signalY.set(point.y);
    setSignalVisible(value > 0.005 && value < 0.995);
  });

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label={t(UI.sectionProgress)}
      className={cn(
        'fixed top-1/2 z-40 hidden -translate-y-1/2 xl:block',
        isRTL ? 'right-5' : 'left-5',
      )}
      style={{ height: 'min(68vh, 620px)', width: VIEW_W }}
    >
      <svg
        className={cn(
          'absolute inset-0 h-full w-full transition-colors duration-slow ease-technical',
          onDark ? 'text-white' : 'text-navy',
        )}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {/* Idle trace */}
        <path
          ref={pathRef}
          d={spine}
          stroke="currentColor"
          strokeOpacity={onDark ? 0.28 : 0.18}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="square"
        />
        {/* Energised trace — draws in step with document scroll */}
        <motion.path
          d={spine}
          stroke="var(--saak-green)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="square"
          style={{ pathLength: reduced ? 1 : smooth }}
          initial={{ pathLength: 0 }}
        />
        {/* The travelling signal */}
        {!reduced ? (
          <motion.g style={{ x: signalX, y: signalY }} animate={{ opacity: signalVisible ? 1 : 0 }}>
            <circle r={7} fill="var(--saak-green)" opacity={0.14} />
            <circle r={3} fill="var(--saak-green)" />
          </motion.g>
        ) : null}
      </svg>

      {/* Junctions — positioned from the measured path, so geometry and
          interaction can never drift apart. */}
      <ul className="absolute inset-0 m-0 list-none p-0">
        {SECTIONS.map((section, index) => {
          const point = points[index];
          if (!point) return null;
          const isActive = section.id === activeId;
          return (
            <li
              key={section.id}
              className="absolute"
              style={{
                left: `${(point.x / VIEW_W) * 100}%`,
                top: `${(point.y / VIEW_H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button
                type="button"
                onClick={() => goTo(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className="group relative flex h-8 w-8 items-center justify-center rounded-full"
              >
                <span className="sr-only">{t(section.nav)}</span>
                <span
                  className={cn(
                    'block rounded-full border transition-all duration-base ease-technical',
                    isActive
                      ? 'h-2.5 w-2.5 border-green bg-green'
                      : onDark
                        ? 'h-1.5 w-1.5 border-white/40 bg-navy-900 group-hover:border-green group-hover:bg-green/40'
                        : 'h-1.5 w-1.5 border-navy/30 bg-neutralx-0 group-hover:border-green group-hover:bg-green/40',
                  )}
                />
                {/* Junction label — revealed on hover / keyboard focus only. */}
                <span
                  className={cn(
                    'pointer-events-none absolute whitespace-nowrap rounded-xs border px-2 py-1 font-mono text-meta uppercase tracking-[0.18em] shadow-card',
                    onDark
                      ? 'border-white/15 bg-navy-900/95 text-white'
                      : 'border-navy/10 bg-neutralx-0/95 text-navy',
                    'opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100',
                    isRTL ? 'right-9' : 'left-9',
                  )}
                >
                  <span dir="ltr">{section.index}</span> · {t(section.nav)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
