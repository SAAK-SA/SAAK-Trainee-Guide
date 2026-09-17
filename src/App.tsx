import { useCallback, useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';

import { Navbar } from '@/components/layout/Navbar';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { ComingSoon } from '@/components/layout/ComingSoon';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Starting } from '@/components/sections/Starting';
import { Experience } from '@/components/sections/Experience';
import { Conduct } from '@/components/sections/Conduct';
import { Safety } from '@/components/sections/Safety';
import { Confidentiality } from '@/components/sections/Confidentiality';
import { Property } from '@/components/sections/Property';
import { Compliance } from '@/components/sections/Compliance';
import { Contact } from '@/components/sections/Contact';
import { Completion } from '@/components/sections/Completion';
import { Acknowledgement } from '@/components/sections/Acknowledgement';

import { WizardProvider } from '@/wizard/WizardContext';
import { WizardProgress } from '@/wizard/WizardProgress';
import { WizardNav } from '@/wizard/WizardNav';
import { Step } from '@/wizard/Step';

const STEP_COMPONENTS = [
  About,
  Starting,
  Experience,
  Conduct,
  Safety,
  Confidentiality,
  Property,
  Compliance,
  Contact,
  Completion,
  Acknowledgement,
];

const STEP_IDS = SECTIONS.filter((s) => s.inNav).map((s) => s.id);

/**
 * True when the guide is still being finalized and the public should see
 * only the "coming soon" holding page.
 *
 * Set VITE_COMING_SOON="true" at build time (already set in the deploy
 * workflow) to gate the site. Remove that env var — or set it to "false" —
 * and re-deploy to reveal the real guide.
 *
 * Preview bypass: appending `?preview=1` (or `#preview`) to the URL sets a
 * sessionStorage flag that shows the real site to that visitor only,
 * without changing what everyone else sees.
 */
function useComingSoon(): boolean {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (import.meta.env.VITE_COMING_SOON !== 'true') return false;
    try {
      if (window.sessionStorage.getItem('saak.preview') === '1') return false;
    } catch {
      /* ignore */
    }
    const search = window.location.search;
    const hash = window.location.hash;
    if (/[?&]preview(=1|=true)?\b/.test(search) || /#preview\b/.test(hash)) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (import.meta.env.VITE_COMING_SOON !== 'true') return;
    const search = window.location.search;
    const hash = window.location.hash;
    if (/[?&]preview(=1|=true)?\b/.test(search) || /#preview\b/.test(hash)) {
      try {
        window.sessionStorage.setItem('saak.preview', '1');
      } catch {
        /* ignore */
      }
      setEnabled(false);
    }
  }, []);

  return enabled;
}

function Page() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <LoadingScreen />

      <a
        href="#wizard"
        className="sr-only rounded-sm bg-navy px-4 py-3 text-tech uppercase text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70]"
      >
        {t(UI.skipToContent)}
      </a>

      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileNavigation open={menuOpen} onClose={closeMenu} />

      <main>
        <Hero />

        <section id="wizard" className="bg-cream-50 py-section">
          <div className="shell">
            <WizardProgress />
            {STEP_COMPONENTS.map((StepComponent, index) => (
              <Step key={STEP_IDS[index]} index={index} id={STEP_IDS[index]}>
                <StepComponent />
              </Step>
            ))}
            <WizardNav />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Site() {
  const comingSoon = useComingSoon();

  if (comingSoon) {
    return <ComingSoon />;
  }

  return (
    <WizardProvider total={STEP_COMPONENTS.length}>
      <Page />
    </WizardProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}
