import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  activeId: string;
  onOpenMenu: () => void;
}

const NAV_SECTIONS = SECTIONS.filter(
  (section) => section.inNav && section.navPriority === 'primary',
);

/**
 * Primary navigation.
 * Transparent over the hero, then it condenses onto a solid surface with the
 * navigation list, language toggle, and a hairline scroll-progress bar.
 */
export function Navbar({ activeId, onOpenMenu }: NavbarProps) {
  const { t } = useLanguage();
  const { reduced } = useMotionPreference();
  const [condensed, setCondensed] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleJump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-base ease-technical',
        condensed
          ? 'border-b border-navy/10 bg-neutralx-0/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <a
          href="#hero"
          onClick={(event) => handleJump(event, 'hero')}
          className="rounded-xs"
          aria-label={`${t(UI.brandName)} ${t(UI.productName)}`}
        >
          <Logo tone={condensed ? 'light' : 'dark'} compact={!condensed} />
        </a>

        <nav aria-label={t(UI.sections)} className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {NAV_SECTIONS.map((section) => {
              const active = section.id === activeId;
              return (
                <li key={section.id} className="relative">
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleJump(event, section.id)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-xs px-3 py-2 text-small font-medium transition-colors duration-base',
                      condensed
                        ? active
                          ? 'text-navy-900'
                          : 'text-navy/70 hover:text-navy'
                        : active
                          ? 'text-white'
                          : 'text-white/70 hover:text-white',
                    )}
                  >
                    {t(section.nav)}
                    {active ? (
                      <motion.span
                        layoutId="nav-active-trace"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-green"
                        transition={
                          reduced ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                        }
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle tone={condensed ? 'light' : 'dark'} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t(UI.openMenu)}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-md border transition-colors duration-base',
              condensed
                ? 'border-navy/15 text-navy hover:border-green hover:text-green-700'
                : 'border-white/25 text-white hover:border-green hover:text-green',
            )}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-green"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
    </header>
  );
}
