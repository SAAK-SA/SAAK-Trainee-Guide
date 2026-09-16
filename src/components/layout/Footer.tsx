import { useLanguage } from '@/i18n/LanguageContext';
import { UI } from '@/data/ui';
import { SECTIONS } from '@/data/content';
import { Logo } from './Logo';
import { useWizardCtx } from '@/wizard/WizardContext';

const NAV_STEPS = SECTIONS.filter((s) => s.inNav);
const PRIMARY = NAV_STEPS.filter((s) => s.navPriority === 'primary').slice(0, 5);

/** Closing chrome — brand mark, quick links, copyright. */
export function Footer() {
  const { t } = useLanguage();
  const { goTo } = useWizardCtx();

  return (
    <footer className="bg-navy-950 py-16 text-white/85 md:py-20">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-3 md:items-start md:gap-6">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-small text-white/60">{t(UI.tagline)}</p>
          </div>

          <nav aria-label={t(UI.quickLinks)} className="min-w-0">
            <span className="text-label uppercase text-white/50">{t(UI.quickLinks)}</span>
            <ul className="mt-4 flex flex-col gap-2 p-0">
              {PRIMARY.map((section) => {
                const index = NAV_STEPS.findIndex((s) => s.id === section.id);
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className="text-small text-white/75 transition-colors duration-fast hover:text-green"
                    >
                      {t(section.nav)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="text-small text-white/50 md:text-end">
            <p>© {new Date().getFullYear()} {t(UI.copyright)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
