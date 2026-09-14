import { useCallback, useState } from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { SECTION_IDS } from '@/data/content';
import { UI } from '@/data/ui';

import { Navbar } from '@/components/layout/Navbar';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { Footer } from '@/components/layout/Footer';
import { CircuitRail } from '@/components/circuit/CircuitRail';
import { SectionConnector } from '@/components/circuit/SectionConnector';

import { Hero } from '@/components/sections/Hero';
import { Introduction } from '@/components/sections/Introduction';
import { Company } from '@/components/sections/Company';
import { Journey } from '@/components/sections/Journey';
import { Facility } from '@/components/sections/Facility';
import { Guidelines } from '@/components/sections/Guidelines';
import { Safety } from '@/components/sections/Safety';
import { Information } from '@/components/sections/Information';
import { Contact } from '@/components/sections/Contact';
import { Closing } from '@/components/sections/Closing';

/**
 * Page composition.
 *
 * The order below is also the visual rhythm of the guide:
 * dark → light → dark → muted → media → light → dark → muted → light → dark,
 * with a circuit connector carrying the trace across each tonal change.
 */
function Page() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutralx-0">
      <a
        href="#introduction"
        className="sr-only rounded-sm bg-navy px-4 py-3 font-mono text-tech uppercase text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70]"
      >
        {t(UI.skipToContent)}
      </a>

      <Navbar activeId={activeId} onOpenMenu={() => setMenuOpen(true)} />
      <MobileNavigation open={menuOpen} activeId={activeId} onClose={closeMenu} />
      <CircuitRail activeId={activeId} />

      <main id="main">
        <Hero />

        <Introduction />
        <SectionConnector tone="dark" />
        <Company />
        <SectionConnector tone="muted" flip />
        <Journey />

        <Facility />
        <SectionConnector tone="light" />
        <Guidelines />
        <SectionConnector tone="dark" flip />
        <Safety />
        <SectionConnector tone="muted" />
        <Information />
        <SectionConnector tone="light" flip />
        <Contact />
        <SectionConnector tone="dark" />
        <Closing />
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
