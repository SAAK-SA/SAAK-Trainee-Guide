import type { ReactNode } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  /** Anchor target id; when present the button renders as a link. */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  /** Shows a direction-aware arrow that shifts on hover. */
  arrow?: boolean;
  tone?: 'light' | 'dark';
  type?: 'button' | 'submit';
}

const BASE =
  'group relative inline-flex items-center justify-center gap-3 rounded-sm px-6 py-3.5 font-mono text-tech uppercase transition-all duration-base ease-technical focus-visible:outline-none';

const VARIANTS: Record<Variant, Record<'light' | 'dark', string>> = {
  primary: {
    light: 'bg-navy text-white hover:bg-navy-700 hover:-translate-y-0.5 hover:shadow-card-hover',
    dark: 'bg-white text-navy-900 hover:bg-green hover:text-white hover:-translate-y-0.5',
  },
  outline: {
    light: 'border border-navy/20 text-navy hover:border-green hover:text-green-700 hover:-translate-y-0.5',
    dark: 'border border-white/25 text-white hover:border-green hover:text-green hover:-translate-y-0.5',
  },
  ghost: {
    light: 'text-navy hover:text-green-700',
    dark: 'text-white/80 hover:text-green',
  },
};

/**
 * Technical action control.
 * Default state is navy; hover introduces the green accent and a 2px lift, and
 * a green trace grows under the label to mark the active connection.
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  arrow = false,
  tone = 'light',
  type = 'button',
}: ButtonProps) {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <Arrow
          className={cn(
            'relative z-10 h-4 w-4 transition-transform duration-base ease-technical',
            isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1',
          )}
          aria-hidden="true"
        />
      ) : null}
      {/* Connection trace revealed on hover. */}
      <span
        className="pointer-events-none absolute bottom-0 start-0 h-px w-0 bg-green transition-[width] duration-base ease-technical group-hover:w-full"
        aria-hidden="true"
      />
    </>
  );

  const classes = cn(BASE, VARIANTS[variant][tone], className);

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
