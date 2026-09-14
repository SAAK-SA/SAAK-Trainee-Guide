import { cn } from '@/lib/cn';

interface TechnicalGridProps {
  tone?: 'light' | 'dark';
  /** Grid pitch. `fine` is 32px, `default` is 64px. */
  density?: 'fine' | 'default';
  className?: string;
  /** Corner tick marks and coordinate labels — engineering-drawing detail. */
  markers?: boolean;
  /** Fades the grid out towards the bottom so it never fights the content. */
  fade?: boolean;
}

/**
 * The substrate grid. It sits at very low opacity underneath selected sections
 * and is meant to be felt rather than seen — depth without decoration.
 */
export function TechnicalGrid({
  tone = 'light',
  density = 'default',
  className,
  markers = false,
  fade = true,
}: TechnicalGridProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          'absolute inset-0',
          tone === 'dark' ? 'bg-grid-fine-dark' : 'bg-grid-fine',
          density === 'fine' ? 'bg-grid-sm' : 'bg-grid',
          fade && 'mask-fade-b',
        )}
      />
      {markers ? (
        <div
          className={cn(
            'absolute inset-0 font-mono text-meta uppercase',
            tone === 'dark' ? 'text-white/25' : 'text-navy/25',
          )}
        >
          <span className="absolute start-gutter top-6 tracking-[0.22em]">X—00</span>
          <span className="absolute end-gutter top-6 tracking-[0.22em]">X—64</span>
          <span className="absolute start-gutter bottom-6 tracking-[0.22em]">Y—00</span>
          <span className="absolute end-gutter bottom-6 tracking-[0.22em]">Y—64</span>
        </div>
      ) : null}
    </div>
  );
}
