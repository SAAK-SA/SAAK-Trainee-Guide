import { useCallback, useState } from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { SECTIONS } from '@/data/content';
import { UI } from '@/data/ui';

import { Navbar } from '@/components/layout/Navbar';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { Footer } from '@/components/layout/Footer';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Vision } from '@/components/sections/Vision';
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
  Vision,
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

function Page() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
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

export default function App() {
  return (
    <LanguageProvider>
      <WizardProvider total={STEP_COMPONENTS.length}>
        <Page />
      </WizardProvider>
    </LanguageProvider>
  );
}
