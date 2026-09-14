import { cn } from '@/lib/cn';
import { AnimatedLine, type TraceNode } from './AnimatedLine';

export type CircuitVariant = 'corner' | 'branch' | 'field' | 'bracket' | 'ladder';

interface Preset {
  viewBox: string;
  d: string;
  accentD?: string;
  nodes: TraceNode[];
  preserveAspectRatio?: string;
}

/**
 * Trace presets. Every path is built from horizontal runs, vertical runs and
 * right-angle turns only — no curves — so the geometry reads as routed copper
 * rather than decoration drawn by hand.
 */
const PRESETS: Record<CircuitVariant, Preset> = {
  // A corner bracket that turns twice and branches once.
  corner: {
    viewBox: '0 0 200 140',
    d: 'M200 16 H132 L112 36 H58 L38 56 V116 M112 36 V88 H150 M58 56 V20',
    accentD: 'M200 16 H132 L112 36 H58',
    nodes: [
      { cx: 112, cy: 36, r: 3, accent: true },
      { cx: 58, cy: 56, r: 2.5 },
      { cx: 150, cy: 88, r: 2.5 },
      { cx: 58, cy: 20, r: 2 },
    ],
    preserveAspectRatio: 'xMaxYMin meet',
  },
  // A spine with drops — used to connect a heading block to the content beneath it.
  branch: {
    viewBox: '0 0 320 90',
    d: 'M0 24 H86 L104 42 H210 L228 24 H320 M104 42 V78 M210 42 V70 H262',
    accentD: 'M0 24 H86 L104 42 H210',
    nodes: [
      { cx: 86, cy: 24, r: 2.5 },
      { cx: 210, cy: 42, r: 3, accent: true },
      { cx: 262, cy: 70, r: 2.5 },
    ],
    preserveAspectRatio: 'xMinYMid meet',
  },
  // A sparse routed field for large empty panel areas.
  field: {
    viewBox: '0 0 260 260',
    d: 'M20 0 V64 L48 92 V168 M96 0 V40 L124 68 H196 L224 96 V200 M20 168 H72 L96 192 V260 M124 68 V128 H60 M224 96 H260 M196 200 H124 L96 228',
    nodes: [
      { cx: 48, cy: 92, r: 2.5 },
      { cx: 124, cy: 68, r: 3, accent: true },
      { cx: 224, cy: 96, r: 2.5 },
      { cx: 96, cy: 192, r: 2.5 },
      { cx: 60, cy: 128, r: 2 },
    ],
    preserveAspectRatio: 'xMidYMid slice',
  },
  // An L-bracket that frames the corner of a panel or an image.
  bracket: {
    viewBox: '0 0 120 120',
    d: 'M0 40 H40 V0 M0 72 H20 M72 0 V20',
    nodes: [{ cx: 40, cy: 40, r: 3, accent: true }],
    preserveAspectRatio: 'xMinYMin meet',
  },
  // Parallel runs with rungs — a dense, contained technical texture.
  ladder: {
    viewBox: '0 0 180 60',
    d: 'M0 12 H180 M0 48 H180 M36 12 V48 M84 12 V48 M132 12 V48',
    accentD: 'M0 12 H84',
    nodes: [
      { cx: 36, cy: 12, r: 2 },
      { cx: 84, cy: 48, r: 2.5, accent: true },
      { cx: 132, cy: 12, r: 2 },
    ],
    preserveAspectRatio: 'none',
  },
};

interface CircuitDecorationProps {
  variant?: CircuitVariant;
  className?: string;
  /** Overall opacity of the trace — decorations stay behind the content. */
  opacity?: number;
  delay?: number;
  strokeWidth?: number;
}

/**
 * Decorative circuitry. Purely presentational and always hidden from assistive
 * technology; it carries no information the content does not already state.
 */
export function CircuitDecoration({
  variant = 'corner',
  className,
  opacity = 0.5,
  delay = 0,
  strokeWidth = 1,
}: CircuitDecorationProps) {
  const preset = PRESETS[variant];

  return (
    <div className={cn('pointer-events-none absolute', className)} style={{ opacity }} aria-hidden="true">
      <AnimatedLine
        className="h-full w-full"
        viewBox={preset.viewBox}
        d={preset.d}
        accentD={preset.accentD}
        nodes={preset.nodes}
        delay={delay}
        strokeWidth={strokeWidth}
        preserveAspectRatio={preset.preserveAspectRatio}
      />
    </div>
  );
}
