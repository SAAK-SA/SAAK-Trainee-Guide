import type { Localized } from '@/i18n/types';

/** Interface chrome strings. Body content lives in data/content.ts. */
export const UI = {
  brandName: { en: 'SAAK', ar: 'SAAK' } satisfies Localized,
  brandSuffix: { en: 'INTERNATIONAL', ar: 'INTERNATIONAL' } satisfies Localized,
  productName: { en: 'Trainee Guide', ar: 'دليل المتدرب' } satisfies Localized,
  skipToContent: { en: 'Skip to content', ar: 'تخطٍ إلى المحتوى' } satisfies Localized,
  openMenu: { en: 'Open navigation menu', ar: 'فتح قائمة التنقل' } satisfies Localized,
  closeMenu: { en: 'Close navigation menu', ar: 'إغلاق قائمة التنقل' } satisfies Localized,
  menu: { en: 'Menu', ar: 'القائمة' } satisfies Localized,
  sections: { en: 'Sections', ar: 'الأقسام' } satisfies Localized,
  languageToggle: { en: 'Switch language', ar: 'تغيير اللغة' } satisfies Localized,
  scrollHint: { en: 'Start the guide', ar: 'ابدأ الدليل' } satisfies Localized,
  copyright: {
    en: 'SAAK International.',
    ar: 'ساك الدولية.',
  } satisfies Localized,
  backToTop: { en: 'Back to top', ar: 'العودة إلى الأعلى' } satisfies Localized,
  quickLinks: { en: 'Quick links', ar: 'روابط سريعة' } satisfies Localized,
  prev: { en: 'Previous', ar: 'السابق' } satisfies Localized,
  next: { en: 'Next', ar: 'التالي' } satisfies Localized,
  tagline: {
    en: 'Engineering, technical, and administrative expertise for the next generation.',
    ar: 'خبرات هندسية وفنية وإدارية لتأهيل الجيل القادم.',
  } satisfies Localized,
} as const;
