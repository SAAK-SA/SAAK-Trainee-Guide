import { useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { useWizardCtx } from '@/wizard/WizardContext';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

const NAV_STEPS = SECTIONS.filter((s) => s.inNav);

/**
 * Full-screen drawer nav. Every step is listed here so viewers on smaller
 * screens (or anyone who wants the full index) can jump directly.
 */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const { t, isRTL } = useLanguage();
  const { step, goTo } = useWizardCtx();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    });

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  const jump = (index: number) => {
    onClose();
    goTo(index);
  };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t(UI.menu)}
      className="fixed inset-0 z-[60] flex flex-col bg-navy-950 text-white"
    >
      <div
        className="relative flex items-center justify-between px-gutter"
        style={{ height: 'var(--nav-height)' }}
      >
        <Logo tone="dark" />
        <button
          type="button"
          onClick={onClose}
          aria-label={t(UI.closeMenu)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-white/25 text-white transition-colors duration-base hover:border-green hover:text-green"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label={t(UI.sections)}
        className="relative flex-1 overflow-y-auto px-gutter pb-10 pt-6"
      >
        <ul className="m-0 list-none p-0">
          {NAV_STEPS.map((section, index) => {
            const active = index === step;
            return (
              <li key={section.id} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => jump(index)}
                  aria-current={active ? 'true' : undefined}
                  className="group flex w-full items-center gap-4 py-4 text-start"
                >
                  <span className="w-8 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    {section.index}
                  </span>
                  <span
                    className={cn(
                      'flex-1 text-h3 transition-colors duration-base',
                      active ? 'text-green' : 'text-white group-hover:text-green',
                    )}
                  >
                    {t(section.nav)}
                  </span>
                  <ArrowIcon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors duration-base',
                      active ? 'text-green' : 'text-white/40 group-hover:text-green',
                    )}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex items-center gap-4">
          <LanguageToggle tone="dark" />
          <span className="text-small text-white/60">{t(UI.languageToggle)}</span>
        </div>
      </nav>
    </div>
  );
}
