import type { ReactNode } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost-light';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  type?: 'button' | 'submit';
}

const BASE =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-pill px-7 py-3.5 text-small font-semibold whitespace-nowrap transition-all duration-base ease-technical hover:-translate-y-0.5';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-navy text-white shadow-sm hover:bg-navy-700 hover:shadow-md',
  accent: 'bg-green text-white shadow-sm hover:bg-green-600 hover:shadow-md',
  outline:
    'border border-neutralx-200 bg-white text-navy hover:border-green hover:text-green-700 hover:shadow-sm',
  'ghost-light': 'border border-white/50 text-white hover:bg-white/12',
};

/** Pill-shaped button — the primary action language of the SAAK Team style. */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  arrow = false,
  type = 'button',
}: ButtonProps) {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <Arrow
          className={cn(
            'h-4 w-4 transition-transform duration-base ease-technical',
            isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5',
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);

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
