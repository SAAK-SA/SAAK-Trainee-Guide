export type Locale = 'en' | 'ar';

/** A string authored in both supported languages. */
export type Localized = Record<Locale, string>;

export interface LocaleMeta {
  code: Locale;
  dir: 'ltr' | 'rtl';
  /** The label shown on the toggle, always written in the target language. */
  label: string;
  htmlLang: string;
}

export const LOCALES: Record<Locale, LocaleMeta> = {
  en: { code: 'en', dir: 'ltr', label: 'English', htmlLang: 'en' },
  ar: { code: 'ar', dir: 'rtl', label: 'العربية', htmlLang: 'ar' },
};
