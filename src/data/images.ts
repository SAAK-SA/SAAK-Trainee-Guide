import type { Localized } from '@/i18n/types';

/**
 * Image manifest.
 *
 * Every photograph in the interface is referenced through this manifest and
 * nothing else. Drop a real SAAK photograph into /public/images/ using the
 * exact `file` name below and it appears automatically — no component changes.
 * Until then, ImagePanel renders an engineered placeholder in its place.
 *
 * See public/images/README.md for the shot list and recommended dimensions.
 */
export interface ImageAsset {
  /** Stable key used by components. */
  id: string;
  /** File expected under /public/images/. */
  file: string;
  /** Alt text — replace alongside the photograph. */
  alt: Localized;
  /** Short technical caption rendered on the image frame. */
  caption: Localized;
  /** Intrinsic aspect ratio, used to reserve layout space before load. */
  ratio: number;
}

function asset(
  id: string,
  file: string,
  alt: Localized,
  caption: Localized,
  ratio: number,
): ImageAsset {
  return { id, file, alt, caption, ratio };
}

export const IMAGES = {
  building: asset(
    'building',
    'saak-building.jpg',
    { en: 'SAAK International headquarters building', ar: 'مبنى المقر الرئيسي للشركة' },
    { en: 'HEADQUARTERS', ar: 'المقر الرئيسي' },
    4 / 3,
  ),
  factory: asset(
    'factory',
    'saak-factory.jpg',
    { en: 'SAAK manufacturing facility interior', ar: 'داخل منشأة التصنيع' },
    { en: 'MANUFACTURING', ar: 'التصنيع' },
    16 / 9,
  ),
  electronicsAssembly: asset(
    'electronics-assembly',
    'electronics-assembly.jpg',
    { en: 'Electronics assembly line', ar: 'خط تجميع الإلكترونيات' },
    { en: 'ASSEMBLY LINE', ar: 'خط التجميع' },
    3 / 2,
  ),
  pcb: asset(
    'pcb',
    'pcb-assembly.jpg',
    { en: 'Printed circuit board assembly close-up', ar: 'لقطة قريبة لتجميع لوحة الدوائر المطبوعة' },
    { en: 'PCB / CLOSE-UP', ar: 'لوحة الدوائر' },
    1,
  ),
  engineers: asset(
    'engineers',
    'engineers.jpg',
    { en: 'Engineers reviewing technical documentation', ar: 'مهندسون يراجعون الوثائق الفنية' },
    { en: 'ENGINEERING', ar: 'الهندسة' },
    3 / 2,
  ),
  technicians: asset(
    'technicians',
    'technicians.jpg',
    { en: 'Technicians at a workstation', ar: 'فنيون في محطة العمل' },
    { en: 'TECHNICAL TEAM', ar: 'الفريق الفني' },
    4 / 5,
  ),
  machinery: asset(
    'machinery',
    'machinery.jpg',
    { en: 'Precision manufacturing machinery', ar: 'آلات تصنيع دقيقة' },
    { en: 'MACHINERY', ar: 'الآلات' },
    4 / 3,
  ),
  testing: asset(
    'testing',
    'testing.jpg',
    { en: 'Electronic testing and measurement', ar: 'الاختبار والقياس الإلكتروني' },
    { en: 'TEST & MEASURE', ar: 'الاختبار والقياس' },
    3 / 2,
  ),
  inspection: asset(
    'inspection',
    'inspection.jpg',
    { en: 'Quality inspection station', ar: 'محطة فحص الجودة' },
    { en: 'INSPECTION', ar: 'الفحص' },
    1,
  ),
  training: asset(
    'training',
    'training.jpg',
    { en: 'Trainees in a technical training session', ar: 'متدربون في جلسة تدريب فني' },
    { en: 'TRAINING', ar: 'التدريب' },
    16 / 9,
  ),
  workspace: asset(
    'workspace',
    'technical-workspace.jpg',
    { en: 'Technical workspace and benches', ar: 'مساحة العمل الفنية' },
    { en: 'WORKSPACE', ar: 'مساحة العمل' },
    3 / 2,
  ),
  safety: asset(
    'safety',
    'safety.jpg',
    { en: 'Personal protective equipment in the facility', ar: 'معدات الحماية الشخصية في المنشأة' },
    { en: 'SAFETY', ar: 'السلامة' },
    4 / 3,
  ),
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;

export const IMAGE_BASE_PATH = '/images/';

export function imageSrc(asset: ImageAsset) {
  return `${IMAGE_BASE_PATH}${asset.file}`;
}
