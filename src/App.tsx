import { useCallback, useState } from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { SECTION_IDS } from '@/data/content';
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

/**
 * Page composition.
 * The tonal rhythm alternates light/muted/dark to keep the scroll legible
 * without heavy dividers between sections.
 */
function Page() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutralx-0">
      <a
        href="#about"
        className="sr-only rounded-sm bg-navy px-4 py-3 font-mono text-tech uppercase text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70]"
      >
        {t(UI.skipToContent)}
      </a>

      <Navbar activeId={activeId} onOpenMenu={() => setMenuOpen(true)} />
      <MobileNavigation open={menuOpen} activeId={activeId} onClose={closeMenu} />

      <main id="main">
        <Hero />
        <About />
        <Vision />
        <Starting />
        <Experience />
        <Conduct />
        <Safety />
        <Confidentiality />
        <Property />
        <Compliance />
        <Contact />
        <Completion />
        <Acknowledgement />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
