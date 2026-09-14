import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn';
import { maskVariants, viewport } from '@/lib/motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useLanguage } from '@/i18n/LanguageContext';
import { imageSrc, type ImageAsset } from '@/data/images';
import { UI } from '@/data/ui';
import { CircuitDecoration } from '@/components/circuit/CircuitDecoration';
import { CircuitNode } from '@/components/circuit/CircuitNode';

export type ImageVariant = 'plain' | 'framed' | 'circuit' | 'portrait' | 'full';

interface ImagePanelProps {
  image: ImageAsset;
  variant?: ImageVariant;
  className?: string;
  /** Overrides the asset's intrinsic ratio for this composition. */
  ratio?: number;
  /** Loads eagerly and reveals immediately — above-the-fold imagery only. */
  priority?: boolean;
  /** Prints the asset caption on the frame. */
  caption?: boolean;
  /** Slow vertical drift as the panel crosses the viewport. */
  parallax?: boolean;
  /** Extra floating technical label. */
  label?: string;
  /** Slight zoom on hover (1–3%), used for interactive compositions. */
  interactive?: boolean;
  /** Fills the parent instead of holding a ratio — for full-bleed plates. */
  fill?: boolean;
}

/**
 * Every photograph in the interface passes through this component.
 *
 * Until a real photograph exists at the manifest path, an engineered
 * placeholder is shown in its place — substrate, grid, routed trace and the
 * expected file name — so the composition can be judged now and the asset
 * dropped in later with no code change.
 */
export function ImagePanel({
  image,
  variant = 'framed',
  className,
  ratio,
  priority = false,
  caption = true,
  parallax = false,
  label,
  interactive = true,
  fill = false,
}: ImagePanelProps) {
  const { t } = useLanguage();
  const { reduced, allowDecorative } = useMotionPreference();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const showPlaceholder = failed || !loaded;
  const aspect = ratio ?? image.ratio;

  return (
    // The wrapper owns the scroll trigger and the parallax target; the figure
    // owns the mask. They must stay separate: the mask clips the figure to zero
    // height in its hidden state, which would zero its own intersection rect and
    // leave the reveal permanently stuck in `hidden`.
    <motion.div
      ref={containerRef}
      className={cn('relative', fill && 'h-full', className)}
      initial="hidden"
      // Above the fold there is nothing to scroll into — reveal on mount.
      {...(priority ? { animate: 'visible' } : { whileInView: 'visible', viewport })}
    >
      {/* Both of these sit outside the figure on purpose: the reveal mask
          clips the figure to its own box. */}
      {variant === 'circuit' ? (
        <CircuitDecoration
          variant="bracket"
          className="-start-4 -top-4 h-20 w-20 text-navy/40"
          opacity={0.7}
        />
      ) : null}

      {label ? (
        <span className="absolute -bottom-3 end-4 z-10 hidden items-center gap-2 rounded-xs border border-navy/10 bg-neutralx-0 px-3 py-1.5 font-mono text-meta uppercase tracking-[0.2em] text-navy shadow-card md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
          {label}
        </span>
      ) : null}

      <motion.figure
        className={cn(
          'group relative m-0 h-full',
          variant === 'framed' && 'p-2 ring-1 ring-navy/10',
          variant === 'circuit' && 'p-3',
        )}
        variants={maskVariants(reduced)}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-navy-900',
            fill && 'h-full',
            variant === 'full' ? 'rounded-none' : 'rounded-sm',
          )}
          style={fill ? undefined : { aspectRatio: String(aspect) }}
        >
          {/* Engineered placeholder — also the loading state for real assets. */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-slow ease-technical',
              showPlaceholder ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[linear-gradient(140deg,#102e57_0%,#14396b_45%,#08182d_100%)]" />
            <div className="absolute inset-0 bg-grid-fine-dark bg-grid-sm opacity-60" />
            <CircuitDecoration
              variant="field"
              className="inset-0 h-full w-full text-white/40"
              opacity={0.35}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <CircuitNode size="md" className="text-white/60" pulse />
              <span className="font-mono text-meta uppercase tracking-[0.28em] text-white/55">
                {t(UI.imagePending)}
              </span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-white/35">
                {t(UI.imageDropHint)}
                {image.file}
              </span>
            </div>
          </div>

          {/* The real photograph. Replaced simply by adding the file. */}
          <motion.img
            src={imageSrc(image)}
            alt={t(image.alt)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-slow ease-technical',
              loaded && !failed ? 'opacity-100' : 'opacity-0',
              interactive && !reduced && 'group-hover:scale-[1.02]',
            )}
            style={parallax && allowDecorative ? { y: parallaxY, scale: 1.08 } : undefined}
          />

          {/* Legibility gradient for overlaid labels. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent"
            aria-hidden="true"
          />

          {caption ? (
            <figcaption className="pointer-events-none absolute bottom-3 start-3 flex items-center gap-2 font-mono text-meta uppercase tracking-[0.22em] text-white/80">
              <span className="h-1 w-1 bg-green" aria-hidden="true" />
              {t(image.caption)}
            </figcaption>
          ) : null}
        </div>

      </motion.figure>
    </motion.div>
  );
}
