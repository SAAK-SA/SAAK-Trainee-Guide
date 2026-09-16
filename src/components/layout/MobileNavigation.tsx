import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';

interface MobileNavigationProps {
  open: boolean;
  activeId: string;
  onClose: () => void;
}

/**
 * Full-screen navigation for tablet / small screens.
 * Large touch targets, one item per row, staggered entrance, focus trapped
 * while open and restored to the trigger on close.
 */
export function MobileNavigation({ open, activeId, onClose }: MobileNavigationProps) {
  const { t, isRTL } = useLanguage();
  const { reduced } = useMotionPreference();
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

  const jump = (id: string) => {
    onClose();
    const target = document.getElementById(id);
    if (!target) return;
    window.setTimeout(
      () => target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }),
      reduced ? 0 : 220,
    );
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t(UI.menu)}
          className="on-dark fixed inset-0 z-[60] flex flex-col bg-navy-950"
          initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white transition-colors duration-base hover:border-green hover:text-green"
            >
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={t(UI.sections)}
            className="relative flex-1 overflow-y-auto px-gutter pb-10 pt-6"
          >
            <ul className="m-0 list-none p-0">
              {SECTIONS.filter((section) => section.inNav).map((section, index) => {
                const active = section.id === activeId;
                return (
                  <motion.li
                    key={section.id}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0.15 : 0.4,
                      delay: reduced ? 0 : 0.08 + index * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-white/10"
                  >
                    <button
                      type="button"
                      onClick={() => jump(section.id)}
                      aria-current={active ? 'true' : undefined}
                      className="group flex w-full items-center gap-4 py-5 text-start"
                    >
                      <span className="font-mono text-meta uppercase tracking-[0.2em] text-white/55">
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
                        aria-hidden="true"
                      />
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-10 flex items-center gap-4">
              <LanguageToggle tone="dark" />
              <span className="text-small text-white/60">{t(UI.languageToggle)}</span>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
