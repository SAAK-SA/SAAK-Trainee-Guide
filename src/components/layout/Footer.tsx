import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { UI } from '@/data/ui';
import { SECTIONS } from '@/data/content';
import { Logo } from './Logo';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';

/** Closing chrome: brand mark, quick links, document reference, back-to-top. */
export function Footer() {
  const { t } = useLanguage();
  const { reduced } = useMotionPreference();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  const links = SECTIONS.filter((section) => section.inNav);

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white">
      <div className="shell relative z-10 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-small text-white/60">
              {t({
                en: 'SAAK International — engineering, technical, and administrative expertise for the next generation.',
                ar: 'ساك الدولية — خبرات هندسية وفنية وإدارية لتأهيل الجيل القادم.',
              })}
            </p>
          </div>

          <nav aria-label={t(UI.quickLinks)} className="min-w-0 lg:col-span-6">
            <TechnicalLabel tone="inverse">{t(UI.quickLinks)}</TechnicalLabel>
            <ul className="mt-5 grid list-none grid-cols-2 gap-x-8 gap-y-2 p-0 md:grid-cols-3">
              {links.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex items-baseline gap-2 rounded-xs py-1 text-small text-white/70 transition-colors duration-base hover:text-green"
                  >
                    <span className="font-mono text-meta tracking-[0.2em] text-white/50">
                      {section.index}
                    </span>
                    {t(section.nav)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2 lg:justify-self-end">
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-3 rounded-md border border-white/20 px-5 py-3 text-small text-white transition-colors duration-base hover:border-green hover:text-green"
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
          <div className="flex items-center gap-6 text-small text-white/50">
            <span>
              {t(UI.documentRef)}: <span className="text-white/70">SAAK—TG—INT</span>
            </span>
            <span>
              {t(UI.revision)}: <span className="text-white/70">01</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
