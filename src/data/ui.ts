import type { Localized } from '@/i18n/types';

/**
 * Interface chrome strings (navigation, controls, states).
 * Section body content lives in data/content.ts.
 */
export const UI = {
  brandName: { en: 'SAAK', ar: 'SAAK' } satisfies Localized,
  brandSuffix: { en: 'INTERNATIONAL', ar: 'INTERNATIONAL' } satisfies Localized,
  productName: { en: 'Trainee Guide', ar: 'دليل المتدرب' } satisfies Localized,
  skipToContent: { en: 'Skip to content', ar: 'تخطٍ إلى المحتوى' } satisfies Localized,
  openMenu: { en: 'Open navigation menu', ar: 'فتح قائمة التنقل' } satisfies Localized,
  closeMenu: { en: 'Close navigation menu', ar: 'إغلاق قائمة التنقل' } satisfies Localized,
  menu: { en: 'Menu', ar: 'القائمة' } satisfies Localized,
  sections: { en: 'Sections', ar: 'الأقسام' } satisfies Localized,
  sectionProgress: { en: 'Section progress', ar: 'تقدّم الأقسام' } satisfies Localized,
  languageToggle: { en: 'Switch language', ar: 'تغيير اللغة' } satisfies Localized,
  scrollHint: { en: 'Scroll to begin', ar: 'مرّر للبدء' } satisfies Localized,
  placeholderNotice: {
    en: 'Placeholder content — final text pending',
    ar: 'محتوى مؤقت — النص النهائي قيد الإعداد',
  } satisfies Localized,
  imagePending: { en: 'IMAGE PENDING', ar: 'الصورة قيد الإعداد' } satisfies Localized,
  imageDropHint: {
    en: 'Place the photograph at /images/',
    ar: 'أضف الصورة إلى مسار ‎/images/‎',
  } satisfies Localized,
  systemStatus: { en: 'SYSTEM ACTIVE', ar: 'النظام نشط' } satisfies Localized,
  copyright: {
    en: 'SAAK International. Internal training material.',
    ar: 'SAAK International — مادة تدريبية داخلية.',
  } satisfies Localized,
  documentRef: { en: 'DOC. REF', ar: 'مرجع المستند' } satisfies Localized,
  revision: { en: 'REV', ar: 'المراجعة' } satisfies Localized,
  backToTop: { en: 'Back to top', ar: 'العودة إلى الأعلى' } satisfies Localized,
} as const;
