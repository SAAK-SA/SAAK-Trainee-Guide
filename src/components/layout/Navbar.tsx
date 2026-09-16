import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { useWizardCtx } from '@/wizard/WizardContext';

interface NavbarProps {
  onOpenMenu: () => void;
}

const NAV_STEPS = SECTIONS.filter((s) => s.inNav);
const PRIMARY = NAV_STEPS.filter((s) => s.navPriority === 'primary');

/**
 * Sticky glass header. Logo · pill nav (primary steps) · lang switch.
 * Nav items call goTo() on the wizard so navigating jumps to that step.
 */
export function Navbar({ onOpenMenu }: NavbarProps) {
  const { t } = useLanguage();
  const { step, goTo } = useWizardCtx();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeStepId = NAV_STEPS[step]?.id;

  return (
    <header
      id="site-header"
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-base ease-technical',
        'border-b bg-white/72 backdrop-blur-md',
        scrolled ? 'border-neutralx-200 shadow-sm' : 'border-transparent',
      )}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="shell flex h-full items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo(0)}
          className="rounded-md"
          aria-label={`${t(UI.brandName)} ${t(UI.productName)}`}
        >
          <Logo tone="light" compact />
        </button>

        <nav aria-label={t(UI.sections)} className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {PRIMARY.map((section) => {
              const index = NAV_STEPS.findIndex((s) => s.id === section.id);
              const active = section.id === activeStepId;
              return (
                <li key={section.id} className="relative">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-pill px-4 py-2 text-small font-medium transition-colors duration-base',
                      active
                        ? 'text-navy-900'
                        : 'text-neutralx-500 hover:text-navy',
                    )}
                  >
                    {t(section.nav)}
                    {active ? (
                      <span
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-pill bg-green"
                        aria-hidden="true"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle tone="light" className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t(UI.openMenu)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-neutralx-200 bg-white text-navy transition-colors duration-base hover:border-green hover:text-green-700"
          >
            <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
