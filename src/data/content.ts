import type { Localized } from '@/i18n/types';
import type { ImageKey } from './images';

/**
 * ── CONTENT SOURCE OF TRUTH ────────────────────────────────────────────────
 * All wording rendered by the site lives here, authored in English + Arabic.
 * Components never hard-code copy, so the final approved text can be dropped
 * in without touching a single component.
 *
 * NOTE: every body string below is deliberate PLACEHOLDER copy. No company
 * facts, figures, names, policies or contact details have been invented.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type IconName =
  | 'compass'
  | 'cpu'
  | 'route'
  | 'building'
  | 'scale'
  | 'shield'
  | 'info'
  | 'mail'
  | 'flag'
  | 'clock'
  | 'badge'
  | 'users'
  | 'wrench'
  | 'clipboard'
  | 'zap'
  | 'hardhat'
  | 'eye'
  | 'phone'
  | 'map';

export interface SectionMeta {
  /** DOM id and scroll anchor. */
  id: string;
  /** Two-digit index rendered as a technical marker. */
  index: string;
  /** Short navigation label. */
  nav: Localized;
  /** Whether the section appears in the primary navigation. */
  inNav: boolean;
  /** Visual register of the section — drives the rhythm of the page. */
  tone: 'light' | 'dark' | 'muted' | 'media';
}

const PLACEHOLDER_PARAGRAPH: Localized = {
  en: 'Placeholder paragraph. This block establishes the typographic rhythm, measure and spacing of the final approved copy so the layout can be reviewed before the content is written. Replace this text in src/data/content.ts.',
  ar: 'فقرة نصية مؤقتة. تهدف هذه الكتلة إلى ضبط الإيقاع الطباعي وعرض السطر والمسافات للنص النهائي المعتمد، بحيث يمكن مراجعة التصميم قبل كتابة المحتوى. استبدل هذا النص في الملف src/data/content.ts.',
};

const PLACEHOLDER_SHORT: Localized = {
  en: 'Short placeholder line describing what this block will contain.',
  ar: 'سطر مؤقت قصير يوضّح ما سيحتويه هذا الجزء.',
};

/** Ordered section registry — drives navigation, the rail and the circuit spine. */
export const SECTIONS: readonly SectionMeta[] = [
  { id: 'hero', index: '00', nav: { en: 'Start', ar: 'البداية' }, inNav: false, tone: 'dark' },
  { id: 'introduction', index: '01', nav: { en: 'Introduction', ar: 'المقدمة' }, inNav: true, tone: 'light' },
  { id: 'company', index: '02', nav: { en: 'Company', ar: 'الشركة' }, inNav: true, tone: 'dark' },
  { id: 'journey', index: '03', nav: { en: 'Journey', ar: 'المسار' }, inNav: true, tone: 'muted' },
  { id: 'facility', index: '04', nav: { en: 'Facility', ar: 'المنشأة' }, inNav: true, tone: 'media' },
  { id: 'guidelines', index: '05', nav: { en: 'Guidelines', ar: 'الإرشادات' }, inNav: true, tone: 'light' },
  { id: 'safety', index: '06', nav: { en: 'Safety', ar: 'السلامة' }, inNav: true, tone: 'dark' },
  { id: 'information', index: '07', nav: { en: 'Information', ar: 'معلومات' }, inNav: false, tone: 'muted' },
  { id: 'contact', index: '08', nav: { en: 'Contact', ar: 'التواصل' }, inNav: true, tone: 'light' },
  { id: 'closing', index: '09', nav: { en: 'Closing', ar: 'الختام' }, inNav: false, tone: 'dark' },
] as const;

export const SECTION_IDS = SECTIONS.map((section) => section.id);

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: { en: 'TRAINEE GUIDE / 2026', ar: 'دليل المتدرب / ٢٠٢٦' } satisfies Localized,
  titleLead: { en: 'Engineering', ar: 'الهندسة' } satisfies Localized,
  titleAccent: { en: 'the signal', ar: 'مسار الإشارة' } satisfies Localized,
  titleTail: { en: 'of your first steps.', ar: 'في خطواتك الأولى.' } satisfies Localized,
  lead: {
    en: 'Placeholder introduction line for the trainee guide. Replace with the approved opening statement.',
    ar: 'سطر افتتاحي مؤقت لدليل المتدرب. استبدله بالنص الافتتاحي المعتمد.',
  } satisfies Localized,
  primaryAction: { en: 'Begin the guide', ar: 'ابدأ الدليل' } satisfies Localized,
  secondaryAction: { en: 'Training journey', ar: 'مسار التدريب' } satisfies Localized,
  disciplines: [
    { en: 'ELECTRONICS', ar: 'الإلكترونيات' },
    { en: 'ENGINEERING', ar: 'الهندسة' },
    { en: 'MANUFACTURING', ar: 'التصنيع' },
    { en: 'TECHNOLOGY', ar: 'التقنية' },
  ] satisfies Localized[],
  coordinates: { en: 'KSA · SITE COORD —', ar: 'KSA · إحداثيات الموقع —' } satisfies Localized,
} as const;

/* ── Section bodies ────────────────────────────────────────────────────── */

export interface CardItem {
  id: string;
  icon: IconName;
  title: Localized;
  body: Localized;
}

export interface JourneyStep {
  id: string;
  phase: Localized;
  title: Localized;
  body: Localized;
  duration: Localized;
}

export interface MetricItem {
  id: string;
  /** Intentionally a dash: no figures are invented. */
  value: string;
  label: Localized;
}

export interface FactRow {
  id: string;
  label: Localized;
  value: Localized;
}

export const INTRODUCTION = {
  eyebrow: { en: 'SECTION 01 / INTRODUCTION', ar: 'القسم ٠١ / المقدمة' } satisfies Localized,
  title: { en: 'A guided entry into how we build.', ar: 'مدخل موجَّه إلى طريقة عملنا.' } satisfies Localized,
  lead: {
    en: 'Placeholder lead paragraph. Two or three lines that set the tone of the guide and orient the trainee before the detailed sections begin.',
    ar: 'فقرة تمهيدية مؤقتة. سطران أو ثلاثة تحدّد نبرة الدليل وتوجّه المتدرب قبل بدء الأقسام التفصيلية.',
  } satisfies Localized,
  body: [PLACEHOLDER_PARAGRAPH] satisfies Localized[],
  highlights: [
    {
      id: 'intro-purpose',
      icon: 'compass',
      title: { en: 'Purpose', ar: 'الغرض' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'intro-scope',
      icon: 'clipboard',
      title: { en: 'Scope', ar: 'النطاق' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'intro-audience',
      icon: 'users',
      title: { en: 'Who this is for', ar: 'لمن هذا الدليل' },
      body: PLACEHOLDER_SHORT,
    },
  ] satisfies CardItem[],
} as const;

export const COMPANY = {
  eyebrow: { en: 'SECTION 02 / THE COMPANY', ar: 'القسم ٠٢ / الشركة' } satisfies Localized,
  title: { en: 'Precision as a standing discipline.', ar: 'الدقة بوصفها انضباطًا دائمًا.' } satisfies Localized,
  lead: {
    en: 'Placeholder company overview line. The approved description of SAAK International will be inserted here.',
    ar: 'سطر تعريفي مؤقت عن الشركة. سيُدرج هنا الوصف المعتمد لشركة SAAK International.',
  } satisfies Localized,
  body: [PLACEHOLDER_PARAGRAPH] satisfies Localized[],
  metrics: [
    { id: 'metric-1', value: '—', label: { en: 'Metric label', ar: 'عنوان المؤشر' } },
    { id: 'metric-2', value: '—', label: { en: 'Metric label', ar: 'عنوان المؤشر' } },
    { id: 'metric-3', value: '—', label: { en: 'Metric label', ar: 'عنوان المؤشر' } },
    { id: 'metric-4', value: '—', label: { en: 'Metric label', ar: 'عنوان المؤشر' } },
  ] satisfies MetricItem[],
  capabilities: [
    {
      id: 'cap-electronics',
      icon: 'cpu',
      title: { en: 'Electronics', ar: 'الإلكترونيات' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'cap-engineering',
      icon: 'wrench',
      title: { en: 'Engineering', ar: 'الهندسة' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'cap-manufacturing',
      icon: 'zap',
      title: { en: 'Manufacturing', ar: 'التصنيع' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'cap-technology',
      icon: 'badge',
      title: { en: 'Technology', ar: 'التقنية' },
      body: PLACEHOLDER_SHORT,
    },
  ] satisfies CardItem[],
} as const;

export const JOURNEY = {
  eyebrow: { en: 'SECTION 03 / TRAINING JOURNEY', ar: 'القسم ٠٣ / مسار التدريب' } satisfies Localized,
  title: { en: 'The path, stage by stage.', ar: 'المسار، مرحلة تلو الأخرى.' } satisfies Localized,
  lead: {
    en: 'Placeholder description of the training programme structure. Each stage below is a layout placeholder.',
    ar: 'وصف مؤقت لهيكل البرنامج التدريبي. كل مرحلة أدناه هي عنصر تصميمي مؤقت.',
  } satisfies Localized,
  steps: [
    {
      id: 'stage-01',
      phase: { en: 'STAGE 01', ar: 'المرحلة ٠١' },
      title: { en: 'Orientation', ar: 'التهيئة' },
      body: PLACEHOLDER_SHORT,
      duration: { en: 'Duration TBD', ar: 'المدة لاحقًا' },
    },
    {
      id: 'stage-02',
      phase: { en: 'STAGE 02', ar: 'المرحلة ٠٢' },
      title: { en: 'Foundations', ar: 'الأساسيات' },
      body: PLACEHOLDER_SHORT,
      duration: { en: 'Duration TBD', ar: 'المدة لاحقًا' },
    },
    {
      id: 'stage-03',
      phase: { en: 'STAGE 03', ar: 'المرحلة ٠٣' },
      title: { en: 'Workshop practice', ar: 'التطبيق العملي' },
      body: PLACEHOLDER_SHORT,
      duration: { en: 'Duration TBD', ar: 'المدة لاحقًا' },
    },
    {
      id: 'stage-04',
      phase: { en: 'STAGE 04', ar: 'المرحلة ٠٤' },
      title: { en: 'Supervised assignment', ar: 'مهمة تحت الإشراف' },
      body: PLACEHOLDER_SHORT,
      duration: { en: 'Duration TBD', ar: 'المدة لاحقًا' },
    },
    {
      id: 'stage-05',
      phase: { en: 'STAGE 05', ar: 'المرحلة ٠٥' },
      title: { en: 'Assessment', ar: 'التقييم' },
      body: PLACEHOLDER_SHORT,
      duration: { en: 'Duration TBD', ar: 'المدة لاحقًا' },
    },
    {
      id: 'stage-06',
      phase: { en: 'STAGE 06', ar: 'المرحلة ٠٦' },
      title: { en: 'Completion', ar: 'الإتمام' },
      body: PLACEHOLDER_SHORT,
      duration: { en: 'Duration TBD', ar: 'المدة لاحقًا' },
    },
  ] satisfies JourneyStep[],
} as const;

export const FACILITY = {
  eyebrow: { en: 'SECTION 04 / FACILITY', ar: 'القسم ٠٤ / المنشأة' } satisfies Localized,
  title: { en: 'Inside the environment.', ar: 'داخل بيئة العمل.' } satisfies Localized,
  lead: {
    en: 'Placeholder description of the working environment, the areas a trainee will move through and how they connect.',
    ar: 'وصف مؤقت لبيئة العمل والمناطق التي سيتنقل بينها المتدرب وكيفية ارتباطها ببعضها.',
  } satisfies Localized,
  zones: [
    { id: 'zone-a', label: { en: 'Zone A', ar: 'المنطقة أ' }, value: PLACEHOLDER_SHORT },
    { id: 'zone-b', label: { en: 'Zone B', ar: 'المنطقة ب' }, value: PLACEHOLDER_SHORT },
    { id: 'zone-c', label: { en: 'Zone C', ar: 'المنطقة ج' }, value: PLACEHOLDER_SHORT },
  ] satisfies FactRow[],
} as const;

export const GUIDELINES = {
  eyebrow: { en: 'SECTION 05 / GUIDELINES', ar: 'القسم ٠٥ / الإرشادات' } satisfies Localized,
  title: { en: 'How we work together.', ar: 'كيف نعمل معًا.' } satisfies Localized,
  lead: {
    en: 'Placeholder introduction to the conduct and workplace guidelines. Each card below is a layout placeholder.',
    ar: 'مقدمة مؤقتة لإرشادات السلوك وبيئة العمل. كل بطاقة أدناه عنصر تصميمي مؤقت.',
  } satisfies Localized,
  items: [
    {
      id: 'g-attendance',
      icon: 'clock',
      title: { en: 'Attendance', ar: 'الحضور' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'g-conduct',
      icon: 'scale',
      title: { en: 'Conduct', ar: 'السلوك' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'g-identification',
      icon: 'badge',
      title: { en: 'Identification', ar: 'بطاقة التعريف' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'g-workspace',
      icon: 'wrench',
      title: { en: 'Workspace', ar: 'مساحة العمل' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'g-communication',
      icon: 'users',
      title: { en: 'Communication', ar: 'التواصل' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 'g-confidentiality',
      icon: 'eye',
      title: { en: 'Confidentiality', ar: 'السرية' },
      body: PLACEHOLDER_SHORT,
    },
  ] satisfies CardItem[],
} as const;

export const SAFETY = {
  eyebrow: { en: 'SECTION 06 / SAFETY', ar: 'القسم ٠٦ / السلامة' } satisfies Localized,
  title: { en: 'Safety is the first system.', ar: 'السلامة هي النظام الأول.' } satisfies Localized,
  lead: {
    en: 'Placeholder safety statement. The approved health and safety requirements will be inserted here.',
    ar: 'بيان سلامة مؤقت. ستُدرج هنا متطلبات الصحة والسلامة المعتمدة.',
  } satisfies Localized,
  items: [
    {
      id: 's-ppe',
      icon: 'hardhat',
      title: { en: 'Protective equipment', ar: 'معدات الحماية' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 's-electrical',
      icon: 'zap',
      title: { en: 'Electrical safety', ar: 'السلامة الكهربائية' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 's-emergency',
      icon: 'flag',
      title: { en: 'Emergency procedure', ar: 'إجراءات الطوارئ' },
      body: PLACEHOLDER_SHORT,
    },
    {
      id: 's-reporting',
      icon: 'shield',
      title: { en: 'Incident reporting', ar: 'الإبلاغ عن الحوادث' },
      body: PLACEHOLDER_SHORT,
    },
  ] satisfies CardItem[],
  notice: {
    en: 'Placeholder notice line — reserved for the mandatory safety statement.',
    ar: 'سطر تنبيه مؤقت — مخصص لبيان السلامة الإلزامي.',
  } satisfies Localized,
} as const;

export const INFORMATION = {
  eyebrow: { en: 'SECTION 07 / IMPORTANT INFORMATION', ar: 'القسم ٠٧ / معلومات مهمة' } satisfies Localized,
  title: { en: 'Things worth keeping close.', ar: 'معلومات يجدر الاحتفاظ بها.' } satisfies Localized,
  lead: {
    en: 'Placeholder introduction for practical information a trainee refers back to.',
    ar: 'مقدمة مؤقتة للمعلومات العملية التي يعود إليها المتدرب.',
  } satisfies Localized,
  rows: [
    { id: 'info-1', label: { en: 'Working hours', ar: 'ساعات العمل' }, value: { en: 'To be confirmed', ar: 'سيتم تأكيدها' } },
    { id: 'info-2', label: { en: 'Reporting line', ar: 'جهة الإشراف' }, value: { en: 'To be confirmed', ar: 'سيتم تأكيدها' } },
    { id: 'info-3', label: { en: 'Required documents', ar: 'المستندات المطلوبة' }, value: { en: 'To be confirmed', ar: 'سيتم تأكيدها' } },
    { id: 'info-4', label: { en: 'Facilities access', ar: 'الدخول إلى المرافق' }, value: { en: 'To be confirmed', ar: 'سيتم تأكيدها' } },
    { id: 'info-5', label: { en: 'Equipment handling', ar: 'التعامل مع المعدات' }, value: { en: 'To be confirmed', ar: 'سيتم تأكيدها' } },
  ] satisfies FactRow[],
} as const;

export const CONTACT = {
  eyebrow: { en: 'SECTION 08 / CONTACT', ar: 'القسم ٠٨ / التواصل' } satisfies Localized,
  title: { en: 'Where to direct a question.', ar: 'إلى أين توجّه سؤالك.' } satisfies Localized,
  lead: {
    en: 'Placeholder contact introduction. Approved channels and details will be added here.',
    ar: 'مقدمة تواصل مؤقتة. ستُضاف هنا القنوات والتفاصيل المعتمدة.',
  } satisfies Localized,
  channels: [
    {
      id: 'c-training',
      icon: 'users',
      title: { en: 'Training supervisor', ar: 'مشرف التدريب' },
      body: { en: 'Contact details to be provided.', ar: 'تفاصيل التواصل ستُضاف لاحقًا.' },
    },
    {
      id: 'c-hr',
      icon: 'clipboard',
      title: { en: 'Human resources', ar: 'الموارد البشرية' },
      body: { en: 'Contact details to be provided.', ar: 'تفاصيل التواصل ستُضاف لاحقًا.' },
    },
    {
      id: 'c-safety',
      icon: 'shield',
      title: { en: 'Safety officer', ar: 'مسؤول السلامة' },
      body: { en: 'Contact details to be provided.', ar: 'تفاصيل التواصل ستُضاف لاحقًا.' },
    },
    {
      id: 'c-facility',
      icon: 'map',
      title: { en: 'Facility desk', ar: 'مكتب المنشأة' },
      body: { en: 'Contact details to be provided.', ar: 'تفاصيل التواصل ستُضاف لاحقًا.' },
    },
  ] satisfies CardItem[],
} as const;

export const CLOSING = {
  eyebrow: { en: 'SECTION 09 / CLOSING', ar: 'القسم ٠٩ / الختام' } satisfies Localized,
  title: { en: 'End of the guide. Start of the work.', ar: 'نهاية الدليل. بداية العمل.' } satisfies Localized,
  lead: {
    en: 'Placeholder closing statement. Replace with the approved closing message.',
    ar: 'بيان ختامي مؤقت. استبدله بالرسالة الختامية المعتمدة.',
  } satisfies Localized,
  action: { en: 'Back to top', ar: 'العودة إلى الأعلى' } satisfies Localized,
} as const;

/** Images used by each section, kept beside the copy for easy swapping. */
export const SECTION_IMAGES: Record<string, ImageKey[]> = {
  hero: ['electronicsAssembly', 'pcb'],
  introduction: ['training'],
  company: ['building', 'machinery'],
  journey: ['engineers'],
  facility: ['factory', 'workspace', 'technicians'],
  guidelines: ['inspection'],
  safety: ['safety'],
  information: ['testing'],
  contact: ['workspace'],
  closing: ['pcb'],
};
