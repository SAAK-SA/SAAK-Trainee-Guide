import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LOCALES, type Locale, type Localized } from './types';

interface LanguageContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Resolves a bilingual string for the active locale. */
  t: (value: Localized) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'saak.locale';

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'ar';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') return stored;
  } catch {
    /* private mode / blocked storage — fall through to the default */
  }
  return 'ar';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const meta = LOCALES[locale];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = meta.htmlLang;
    root.dir = meta.dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* storage unavailable — the choice simply does not persist */
    }
  }, [locale, meta]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleLocale = useCallback(
    () => setLocaleState((current) => (current === 'ar' ? 'en' : 'ar')),
    [],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: meta.dir,
      isRTL: meta.dir === 'rtl',
      setLocale,
      toggleLocale,
      t: (entry: Localized) => entry[locale] ?? entry.en,
    }),
    [locale, meta.dir, setLocale, toggleLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
