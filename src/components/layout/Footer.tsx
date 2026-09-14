import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { UI } from '@/data/ui';
import { HERO, SECTIONS } from '@/data/content';
import { Logo } from './Logo';
import { TechnicalGrid } from '@/components/circuit/TechnicalGrid';
import { CircuitDecoration } from '@/components/circuit/CircuitDecoration';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';

/** Closing chrome: document reference, section index and a return path. */
export function Footer() {
  const { t } = useLanguage();
  const { reduced } = useMotionPreference();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white">
      <TechnicalGrid tone="dark" density="fine" fade={false} className="opacity-60" />
      <CircuitDecoration
        variant="branch"
        className="start-0 top-0 h-16 w-80 text-white/40"
        opacity={0.4}
      />

      <div className="shell relative z-10 py-16 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-6 text-small text-white/55">{t(UI.placeholderNotice)}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-status-blink" aria-hidden="true" />
              <TechnicalLabel tone="inverse">{t(UI.systemStatus)}</TechnicalLabel>
            </div>
          </div>

          <nav aria-label={t(UI.sections)} className="min-w-0">
            <TechnicalLabel tone="inverse">{t(UI.sections)}</TechnicalLabel>
            <ul className="mt-5 grid list-none grid-cols-2 gap-x-10 gap-y-2 p-0 sm:grid-cols-3">
              {SECTIONS.filter((section) => section.id !== 'hero').map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group inline-flex items-baseline gap-2 rounded-xs py-1 text-small text-white/65 transition-colors duration-base hover:text-green"
                  >
                    <span className="font-mono text-meta tracking-[0.2em] text-white/55">
                      {section.index}
                    </span>
                    {t(section.nav)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4">
            <dl className="m-0 grid grid-cols-[auto_auto] gap-x-6 gap-y-2 font-mono text-meta uppercase tracking-[0.2em]">
              <dt className="text-white/55">{t(UI.documentRef)}</dt>
              <dd className="m-0 text-white/70">SAAK—TG—000</dd>
              <dt className="text-white/55">{t(UI.revision)}</dt>
              <dd className="m-0 text-white/70">—</dd>
            </dl>
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-3 rounded-sm border border-white/20 px-5 py-3 font-mono text-tech uppercase text-white transition-colors duration-base hover:border-green hover:text-green"
            >
              {t(UI.backToTop)}
              <ArrowUp
                className="h-4 w-4 transition-transform duration-base ease-technical group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-small text-white/60">
            © {new Date().getFullYear()} {t(UI.copyright)}
          </p>
          <span className="font-mono text-meta uppercase tracking-[0.22em] text-white/55">
            {t(HERO.coordinates)}
          </span>
        </div>
      </div>
    </footer>
  );
}
