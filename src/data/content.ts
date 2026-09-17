import type { Localized } from '@/i18n/types';

/**
 * ── CONTENT SOURCE OF TRUTH ────────────────────────────────────────────────
 * All wording rendered by the site lives here, authored in English + Arabic.
 * Components never hard-code copy, so the final approved text can be dropped
 * in without touching a single component.
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
  | 'map'
  | 'target'
  | 'award'
  | 'sparkle'
  | 'handshake'
  | 'lightbulb'
  | 'lock'
  | 'camera'
  | 'monitor'
  | 'briefcase'
  | 'graduation'
  | 'search'
  | 'message'
  | 'check'
  | 'user';

export interface SectionMeta {
  /** DOM id and scroll anchor. */
  id: string;
  /** Two-digit index rendered as a technical marker. */
  index: string;
  /** Short navigation label. */
  nav: Localized;
  /** Icon used in the mobile menu and step marker. */
  icon: IconName;
  /** Whether the section appears in the primary navigation. */
  inNav: boolean;
  /** Visual register of the section — drives the rhythm of the page. */
  tone: 'light' | 'dark' | 'muted';
}

export type NavPriority = 'primary' | 'secondary';

/** Ordered section registry — drives navigation and the section rhythm. */
export const SECTIONS: readonly (SectionMeta & { navPriority?: NavPriority })[] = [
  { id: 'hero', index: '00', nav: { en: 'Welcome', ar: 'الترحيب' }, icon: 'sparkle', inNav: false, tone: 'dark' },
  { id: 'about', index: '01', nav: { en: 'About', ar: 'عن الشركة' }, icon: 'building', inNav: true, navPriority: 'primary', tone: 'light' },
  { id: 'starting', index: '02', nav: { en: 'Starting', ar: 'بداية التدريب' }, icon: 'compass', inNav: true, navPriority: 'primary', tone: 'light' },
  { id: 'experience', index: '03', nav: { en: 'Experience', ar: 'التجربة' }, icon: 'graduation', inNav: true, navPriority: 'secondary', tone: 'dark' },
  { id: 'conduct', index: '04', nav: { en: 'Conduct', ar: 'السلوك' }, icon: 'handshake', inNav: true, navPriority: 'primary', tone: 'light' },
  { id: 'safety', index: '05', nav: { en: 'Safety', ar: 'السلامة' }, icon: 'hardhat', inNav: true, navPriority: 'primary', tone: 'muted' },
  { id: 'confidentiality', index: '06', nav: { en: 'Confidentiality', ar: 'السرية' }, icon: 'lock', inNav: true, navPriority: 'secondary', tone: 'light' },
  { id: 'property', index: '07', nav: { en: 'Property', ar: 'الممتلكات' }, icon: 'wrench', inNav: true, navPriority: 'secondary', tone: 'muted' },
  { id: 'compliance', index: '08', nav: { en: 'Compliance', ar: 'الالتزام' }, icon: 'scale', inNav: true, navPriority: 'secondary', tone: 'light' },
  { id: 'contact', index: '09', nav: { en: 'Contact', ar: 'التواصل' }, icon: 'phone', inNav: true, navPriority: 'primary', tone: 'dark' },
  { id: 'completion', index: '10', nav: { en: 'Completion', ar: 'الختام' }, icon: 'award', inNav: true, navPriority: 'secondary', tone: 'light' },
  { id: 'acknowledgement', index: '11', nav: { en: 'Acknowledgement', ar: 'الإقرار' }, icon: 'check', inNav: true, navPriority: 'primary', tone: 'muted' },
] as const;

export const SECTION_IDS = SECTIONS.map((section) => section.id);
export const SECTION_TOTAL = SECTIONS.filter((s) => s.inNav).length;

/* ── Hero / Welcome (01) ───────────────────────────────────────────────── */

export const HERO = {
  eyebrow: { en: 'TRAINEE GUIDE', ar: 'دليل المتدرب' } satisfies Localized,
  titleLead: { en: 'Welcome to', ar: 'مرحبًا بك في' } satisfies Localized,
  titleAccent: { en: 'SAAK International', ar: 'ساك الدولية' } satisfies Localized,
  lead: {
    en: 'We are pleased to welcome you to SAAK International, where engineering, technical, and administrative expertise come together to create a professional environment for learning and development.',
    ar: 'نرحب بك في ساك الدولية، ونسعد بانضمامك إلى بيئة عمل تجمع بين الخبرات الهندسية والفنية والإدارية، وتتيح لك فرصة التعلّم واكتساب الخبرة العملية والتعرّف على بيئة العمل المهنية.',
  } satisfies Localized,
  leadSecondary: {
    en: 'During your training, you will have the opportunity to experience the workplace, interact with different teams, apply your knowledge in a practical environment, and develop skills that support your professional growth.',
    ar: 'خلال فترة تدريبك، ستتاح لك فرصة التعرّف على طبيعة العمل في ساك الدولية، والتفاعل مع فرق العمل، وتطبيق ما تعلمته في بيئة عملية، بما يسهم في تطوير مهاراتك وبناء خبرتك المهنية.',
  } satisfies Localized,
  primaryAction: { en: 'Begin the guide', ar: 'ابدأ الدليل' } satisfies Localized,
  secondaryAction: { en: 'About SAAK', ar: 'عن ساك' } satisfies Localized,
} as const;

/* ── Shared item types ─────────────────────────────────────────────────── */

export interface CardItem {
  id: string;
  icon: IconName;
  title: Localized;
  body: Localized;
}

export interface FactRow {
  id: string;
  label: Localized;
  value: Localized;
}

export interface ListItem {
  id: string;
  text: Localized;
}

/* ── About (02) ────────────────────────────────────────────────────────── */

export const ABOUT = {
  eyebrow: { en: 'SECTION 02 · ABOUT SAAK INTERNATIONAL', ar: 'القسم ٠٢ · عن ساك الدولية' } satisfies Localized,
  title: { en: 'Who we are.', ar: 'من نحن.' } satisfies Localized,
  lead: {
    en: 'SAAK International is a Saudi company specializing in electronics and engineering, with activities covering design, manufacturing, assembly, repair, and maintenance of precision electronic systems.',
    ar: 'ساك الدولية شركة سعودية متخصصة في مجالات الإلكترونيات والهندسة، وتشمل أنشطتها التصميم والتصنيع والتجميع، إضافة إلى خدمات الإصلاح والصيانة للأنظمة الإلكترونية الدقيقة.',
  } satisfies Localized,
  body: {
    en: 'We are committed to delivering integrated solutions with high quality and precision, while supporting national talent development and the growth of Saudi Arabia’s electronics and technology sector.',
    ar: 'نسعى إلى تقديم حلول متكاملة بجودة ودقة عالية، مع دعم تطوير الكفاءات الوطنية والمساهمة في نمو قطاع الإلكترونيات والتكنولوجيا في المملكة.',
  } satisfies Localized,
  areasTitle: { en: 'Areas of Work', ar: 'مجالات العمل' } satisfies Localized,
  areas: [
    {
      id: 'area-design',
      icon: 'compass',
      title: { en: 'Design', ar: 'التصميم' },
      body: {
        en: 'Engineering-led design of precision electronic systems.',
        ar: 'تصميم هندسي للأنظمة الإلكترونية الدقيقة.',
      },
    },
    {
      id: 'area-manufacturing',
      icon: 'cpu',
      title: { en: 'Manufacturing & Assembly', ar: 'التصنيع والتجميع' },
      body: {
        en: 'Manufacturing and assembly to high quality standards.',
        ar: 'التصنيع والتجميع وفق أعلى معايير الجودة.',
      },
    },
    {
      id: 'area-repair',
      icon: 'wrench',
      title: { en: 'Repair & Maintenance', ar: 'الإصلاح والصيانة' },
      body: {
        en: 'Repair and maintenance for precision electronic systems.',
        ar: 'خدمات الإصلاح والصيانة للأنظمة الإلكترونية الدقيقة.',
      },
    },
    {
      id: 'area-engineering',
      icon: 'zap',
      title: { en: 'Engineering & Electronics', ar: 'الهندسة والإلكترونيات' },
      body: {
        en: 'Integrated engineering and electronics solutions.',
        ar: 'حلول متكاملة في الهندسة والإلكترونيات.',
      },
    },
  ] satisfies CardItem[],
} as const;

/* ── Vision & Values (03) ──────────────────────────────────────────────── */

export const VISION = {
  eyebrow: { en: 'SECTION 03 · VISION & VALUES', ar: 'القسم ٠٣ · الرؤية والقيم' } satisfies Localized,
  title: { en: 'Our vision, mission and values.', ar: 'رؤيتنا ورسالتنا وقيمنا.' } satisfies Localized,

  visionLabel: { en: 'Our Vision', ar: 'رؤيتنا' } satisfies Localized,
  vision: {
    en: 'To lead locally and globally in electronics by providing smart, effective solutions with high quality and precision.',
    ar: 'الريادة على الصعيدين المحلي والعالمي في مجال الإلكترونيات من خلال تقديم حلول ذكية وفعّالة بجودة ودقة عالية.',
  } satisfies Localized,

  missionLabel: { en: 'Our Mission', ar: 'مهمتنا' } satisfies Localized,
  mission: {
    en: 'To continuously develop our products and services to meet our clients’ aspirations, focusing on performance, quality, and commitment to international standards, leading to sustainable success and partnerships built on trust.',
    ar: 'أن نعمل بشكل مستمر على تطوير منتجاتنا وخدماتنا لتلبية تطلعات عملائنا بشكل يركز على الأداء والجودة والالتزام بالمعايير العالمية، ويقود لتحقيق النجاح المستدام وبناء شراكات قائمة على الثقة والتفاهم المتبادل.',
  } satisfies Localized,

  valuesLabel: { en: 'Our Values', ar: 'قيمنا' } satisfies Localized,
  values: [
    {
      id: 'value-quality',
      icon: 'award',
      title: { en: 'Quality', ar: 'الجودة' },
      body: {
        en: 'We deliver our work to the highest standards of quality and precision.',
        ar: 'نلتزم بتقديم أعمال وفق أعلى مستويات الجودة والدقة.',
      },
    },
    {
      id: 'value-commitment',
      icon: 'check',
      title: { en: 'Commitment', ar: 'الالتزام' },
      body: {
        en: 'We honor our responsibilities and duties, and strive to achieve the required results.',
        ar: 'نلتزم بمسؤولياتنا وواجباتنا ونسعى إلى تحقيق النتائج المطلوبة.',
      },
    },
    {
      id: 'value-innovation',
      icon: 'lightbulb',
      title: { en: 'Innovation', ar: 'الابتكار' },
      body: {
        en: 'We encourage creative thinking and the development of new solutions and ideas.',
        ar: 'نشجع التفكير الإبداعي وتطوير الحلول والأفكار الجديدة.',
      },
    },
    {
      id: 'value-integrity',
      icon: 'shield',
      title: { en: 'Integrity', ar: 'النزاهة' },
      body: {
        en: 'We believe in transparency, professionalism, and responsible practices.',
        ar: 'نؤمن بالشفافية والمهنية والالتزام بالممارسات المسؤولة.',
      },
    },
  ] satisfies CardItem[],
} as const;

/* ── Starting Your Training (04) ───────────────────────────────────────── */

export const STARTING = {
  eyebrow: { en: 'SECTION 04 · STARTING YOUR TRAINING', ar: 'القسم ٠٤ · بداية التدريب' } satisfies Localized,
  title: { en: 'Begin your experience with confidence.', ar: 'ابدأ تجربتك بثقة.' } satisfies Localized,
  lead: {
    en: 'Starting your training is your opportunity to get to know the workplace, your team, and the tasks connected to your field.',
    ar: 'تمثل بداية التدريب فرصة للتعرف على بيئة العمل وفريقك والمهام المرتبطة بتخصصك.',
  } satisfies Localized,
  items: [
    {
      id: 'start-workplace',
      icon: 'building',
      title: { en: 'Get to Know the Workplace', ar: 'التعرف على بيئة العمل' },
      body: {
        en: 'Learn about the company, its activities, and the departments you will be working with.',
        ar: 'تعرّف على الشركة، طبيعة أعمالها، والأقسام التي تعمل ضمنها.',
      },
    },
    {
      id: 'start-team',
      icon: 'users',
      title: { en: 'Meet the Team', ar: 'التعرف على الفريق' },
      body: {
        en: 'Get to know your colleagues and the people you will interact with during your training.',
        ar: 'تعرّف على زملائك والأشخاص الذين ستتواصل معهم خلال فترة التدريب.',
      },
    },
    {
      id: 'start-role',
      icon: 'briefcase',
      title: { en: 'Understand Your Role', ar: 'فهم مهامك' },
      body: {
        en: 'Understand the tasks, responsibilities, and expectations related to your training.',
        ar: 'تعرّف على المهام والمسؤوليات المرتبطة بتدريبك والتوقعات المطلوبة منك.',
      },
    },
    {
      id: 'start-ask',
      icon: 'search',
      title: { en: 'Ask & Learn', ar: 'اسأل وتعلّم' },
      body: {
        en: 'Do not hesitate to ask questions and learn from the experience of those around you.',
        ar: 'لا تتردد في طرح الأسئلة والاستفادة من خبرات من حولك.',
      },
    },
    {
      id: 'start-feedback',
      icon: 'message',
      title: { en: 'Seek Feedback', ar: 'اطلب التغذية الراجعة' },
      body: {
        en: 'Use feedback and guidance to improve your performance and develop your skills.',
        ar: 'استفد من الملاحظات والتوجيهات لتطوير أدائك ومهاراتك.',
      },
    },
  ] satisfies CardItem[],
} as const;

/* ── Training Experience (05) ──────────────────────────────────────────── */

export const EXPERIENCE = {
  eyebrow: { en: 'SECTION 05 · YOUR TRAINING EXPERIENCE', ar: 'القسم ٠٥ · تجربة التدريب' } satisfies Localized,
  title: { en: 'Learn from the workplace.', ar: 'تعلّم من بيئة العمل.' } satisfies Localized,
  lead: {
    en: 'Training at SAAK International is an opportunity to experience a real workplace environment and connect academic knowledge with practical application.',
    ar: 'التدريب في ساك الدولية هو فرصة للتعرّف على بيئة العمل الحقيقية وربط المعرفة الأكاديمية بالتطبيق العملي.',
  } satisfies Localized,
  listIntro: {
    en: 'During your training:',
    ar: 'خلال فترة التدريب، احرص على:',
  } satisfies Localized,
  items: [
    {
      id: 'exp-follow',
      text: {
        en: 'Follow the tasks and guidance related to your training.',
        ar: 'الالتزام بالمهام والتوجيهات المرتبطة بتدريبك.',
      },
    },
    {
      id: 'exp-team',
      text: {
        en: 'Learn from the experience of the team.',
        ar: 'الاستفادة من خبرات فريق العمل.',
      },
    },
    {
      id: 'exp-engage',
      text: {
        en: 'Participate and engage positively.',
        ar: 'المشاركة والتفاعل بشكل إيجابي.',
      },
    },
    {
      id: 'exp-skills',
      text: {
        en: 'Develop your technical and professional skills.',
        ar: 'تطوير مهاراتك الفنية والمهنية.',
      },
    },
    {
      id: 'exp-document',
      text: {
        en: 'Make the most of what you learn.',
        ar: 'توثيق ما تتعلمه والاستفادة منه.',
      },
    },
    {
      id: 'exp-clarify',
      text: {
        en: 'Ask questions and seek clarification when needed.',
        ar: 'المبادرة بطرح الأسئلة وطلب التوضيح عند الحاجة.',
      },
    },
  ] satisfies ListItem[],
} as const;

/* ── Workplace Conduct (06) ────────────────────────────────────────────── */

export const CONDUCT = {
  eyebrow: { en: 'SECTION 06 · WORKPLACE CONDUCT', ar: 'القسم ٠٦ · بيئة العمل والسلوك المهني' } satisfies Localized,
  title: { en: 'Be part of a professional environment.', ar: 'كن جزءًا من بيئة عمل احترافية.' } satisfies Localized,
  lead: {
    en: 'The workplace at SAAK International is built on respect, professionalism, and collaboration. These are the standards we all uphold.',
    ar: 'تقوم بيئة العمل في ساك الدولية على الاحترام والمهنية والتعاون. هذه هي المعايير التي نلتزم بها جميعًا.',
  } satisfies Localized,
  items: [
    {
      id: 'conduct-respect',
      icon: 'handshake',
      title: { en: 'Respect', ar: 'الاحترام' },
      body: {
        en: 'Treat all employees and colleagues with respect and professionalism.',
        ar: 'التزم بالتعامل باحترام ومهنية مع جميع الموظفين والزملاء.',
      },
    },
    {
      id: 'conduct-punctuality',
      icon: 'clock',
      title: { en: 'Punctuality', ar: 'الالتزام بالمواعيد' },
      body: {
        en: 'Be punctual and follow the designated working and training hours.',
        ar: 'احرص على الحضور والانصراف وفق أوقات الدوام المحددة والالتزام بجدول تدريبك.',
      },
    },
    {
      id: 'conduct-appearance',
      icon: 'user',
      title: { en: 'Professional Appearance', ar: 'المظهر المهني' },
      body: {
        en: 'Maintain a professional and appropriate appearance suited to the workplace and your responsibilities.',
        ar: 'التزم بمظهر مهني لائق ومحتشم يتناسب مع بيئة العمل وطبيعة المهام.',
      },
    },
    {
      id: 'conduct-responsibility',
      icon: 'target',
      title: { en: 'Responsibility', ar: 'المسؤولية' },
      body: {
        en: 'Take responsibility for assigned tasks and complete them according to the given instructions.',
        ar: 'تعامل مع المهام والتكليفات بمسؤولية، واحرص على إنجازها وفق التوجيهات.',
      },
    },
    {
      id: 'conduct-collaboration',
      icon: 'users',
      title: { en: 'Collaboration', ar: 'التعاون' },
      body: {
        en: 'Collaborate with your team and maintain positive, professional communication.',
        ar: 'تعاون مع فريق العمل وحافظ على تواصل مهني وإيجابي.',
      },
    },
  ] satisfies CardItem[],
  hoursLabel: { en: 'Working Hours', ar: 'أوقات الدوام' } satisfies Localized,
  hoursDays: { en: 'Sunday – Thursday', ar: 'الأحد – الخميس' } satisfies Localized,
  hoursTime: {
    en: 'From 9:00 AM to 5:00 PM',
    ar: 'من 9:00 صباحًا إلى 5:00 مساءً',
  } satisfies Localized,
} as const;

/* ── Safety & Security (07) ────────────────────────────────────────────── */

export const SAFETY = {
  eyebrow: { en: 'SECTION 07 · SAFETY & SECURITY', ar: 'القسم ٠٧ · السلامة والأمن' } satisfies Localized,
  title: { en: 'Your safety is our shared responsibility.', ar: 'سلامتك مسؤوليتنا جميعًا.' } satisfies Localized,
  lead: {
    en: 'Safety is an essential part of the workplace at SAAK International. Make sure you understand and follow the instructions throughout your training.',
    ar: 'تُعد السلامة جزءًا أساسيًا من بيئة العمل في ساك الدولية. احرص على فهم التعليمات والالتزام بها طوال فترة التدريب.',
  } satisfies Localized,
  items: [
    {
      id: 'safety-instructions',
      icon: 'shield',
      title: { en: 'Follow Safety Instructions', ar: 'اتبع تعليمات السلامة' },
      body: {
        en: 'Follow all safety instructions and procedures within the facility.',
        ar: 'التزم بجميع تعليمات وإرشادات السلامة المعتمدة داخل المنشأة.',
      },
    },
    {
      id: 'safety-ppe',
      icon: 'hardhat',
      title: { en: 'Personal Protective Equipment', ar: 'معدات الوقاية' },
      body: {
        en: 'Wear the required personal protective equipment when entering work areas or performing tasks that require it.',
        ar: 'استخدم معدات الوقاية الشخصية المطلوبة عند دخول مناطق العمل أو تنفيذ المهام التي تستدعي استخدامها.',
      },
    },
    {
      id: 'safety-areas',
      icon: 'map',
      title: { en: 'Authorized Areas', ar: 'المناطق المصرح بها' },
      body: {
        en: 'Do not enter restricted or unauthorized areas without approval or guidance from the responsible person.',
        ar: 'لا تدخل المناطق أو المساحات التي لا يسمح لك بالدخول إليها إلا بتصريح أو توجيه من المسؤول.',
      },
    },
    {
      id: 'safety-emergency',
      icon: 'flag',
      title: { en: 'Emergency Procedures', ar: 'حالات الطوارئ' },
      body: {
        en: 'Familiarize yourself with emergency procedures and evacuation routes, and follow the instructions of the safety and security team when required.',
        ar: 'تعرّف على إجراءات الطوارئ ومخارج الإخلاء واتبع تعليمات فريق الأمن والسلامة عند الحاجة.',
      },
    },
  ] satisfies CardItem[],
} as const;

/* ── Confidentiality (08) ──────────────────────────────────────────────── */

export const CONFIDENTIALITY = {
  eyebrow: { en: 'SECTION 08 · CONFIDENTIALITY', ar: 'القسم ٠٨ · السرية وحماية المعلومات' } satisfies Localized,
  title: { en: 'Keep what you learn confidential.', ar: 'حافظ على سرية ما تتعلمه.' } satisfies Localized,
  lead: {
    en: 'As part of a specialized workplace, you may have access to company or client information, documents, processes, or technologies during your training.',
    ar: 'بحكم وجودك داخل بيئة عمل متخصصة، قد تطّلع خلال فترة التدريب على معلومات أو مستندات أو عمليات أو تقنيات تخص الشركة أو عملاءها.',
  } satisfies Localized,
  listIntro: {
    en: 'You are therefore expected to:',
    ar: 'لذلك يجب عليك:',
  } satisfies Localized,
  items: [
    {
      id: 'conf-maintain',
      text: {
        en: 'Maintain the confidentiality of information accessed during your training.',
        ar: 'المحافظة على سرية المعلومات التي تطّلع عليها خلال فترة التدريب.',
      },
    },
    {
      id: 'conf-share',
      text: {
        en: 'Do not share company documents or information outside the workplace.',
        ar: 'عدم مشاركة مستندات أو معلومات الشركة خارج نطاق العمل.',
      },
    },
    {
      id: 'conf-record',
      text: {
        en: 'Do not photograph or record work areas, equipment, or documents without approval.',
        ar: 'عدم تصوير أو تسجيل مواقع العمل أو الأجهزة أو المستندات إلا بعد الحصول على موافقة.',
      },
    },
    {
      id: 'conf-projects',
      text: {
        en: 'Do not share information related to company projects or clients.',
        ar: 'عدم مشاركة أي معلومات تخص مشاريع أو عملاء الشركة.',
      },
    },
    {
      id: 'conf-access',
      text: {
        en: 'Use only the information and systems you are authorized to access.',
        ar: 'استخدام المعلومات والأنظمة المصرح لك بالوصول إليها فقط.',
      },
    },
  ] satisfies ListItem[],
} as const;

/* ── Company Property (09) ─────────────────────────────────────────────── */

export const PROPERTY = {
  eyebrow: { en: 'SECTION 09 · USE OF COMPANY PROPERTY', ar: 'القسم ٠٩ · استخدام ممتلكات الشركة' } satisfies Localized,
  title: { en: 'Handle it responsibly.', ar: 'تعامل معها بمسؤولية.' } satisfies Localized,
  lead: {
    en: 'Equipment, devices, or tools may be provided to you during your training.',
    ar: 'قد يتم توفير أجهزة أو أدوات أو معدات لاستخدامها خلال فترة التدريب.',
  } satisfies Localized,
  listIntro: {
    en: 'Trainees are expected to:',
    ar: 'يلتزم المتدرب بـ:',
  } satisfies Localized,
  items: [
    {
      id: 'prop-care',
      text: {
        en: 'Take care of all assigned equipment, devices, and tools.',
        ar: 'المحافظة على الأجهزة والمعدات والأدوات المسلّمة له.',
      },
    },
    {
      id: 'prop-purpose',
      text: {
        en: 'Use them only for their intended purposes.',
        ar: 'استخدامها للأغراض المخصصة لها.',
      },
    },
    {
      id: 'prop-instructions',
      text: {
        en: 'Follow the responsible person’s instructions.',
        ar: 'اتباع تعليمات المسؤول عند استخدامها.',
      },
    },
    {
      id: 'prop-report',
      text: {
        en: 'Report any damage, malfunction, or loss immediately.',
        ar: 'الإبلاغ عن أي عطل أو تلف أو فقدان فورًا.',
      },
    },
    {
      id: 'prop-authorization',
      text: {
        en: 'Do not move or use equipment without authorization.',
        ar: 'عدم نقل أو استخدام أي معدات دون تصريح.',
      },
    },
  ] satisfies ListItem[],
} as const;

/* ── Guidelines & Compliance (10) ──────────────────────────────────────── */

export const COMPLIANCE = {
  eyebrow: { en: 'SECTION 10 · GUIDELINES & COMPLIANCE', ar: 'القسم ١٠ · التعليمات والالتزام' } satisfies Localized,
  title: { en: 'Your responsibility during training.', ar: 'مسؤوليتك خلال فترة التدريب.' } satisfies Localized,
  lead: {
    en: 'Trainees are expected to comply with SAAK International policies and instructions throughout their time with the company.',
    ar: 'يلتزم المتدرب بالأنظمة والتعليمات المعمول بها في ساك الدولية طوال فترة وجوده في الشركة.',
  } satisfies Localized,
  listIntro: {
    en: 'This includes:',
    ar: 'ويشمل ذلك:',
  } satisfies Localized,
  items: [
    {
      id: 'comp-attendance',
      text: {
        en: 'Following designated attendance and working hours.',
        ar: 'الالتزام بالحضور والانصراف والمواعيد المحددة.',
      },
    },
    {
      id: 'comp-supervisor',
      text: {
        en: 'Following the instructions of the supervisor or training coordinator.',
        ar: 'الالتزام بتعليمات المشرف والمسؤول المباشر عن التدريب.',
      },
    },
    {
      id: 'comp-safety',
      text: {
        en: 'Complying with safety and security procedures.',
        ar: 'الالتزام بإجراءات الأمن والسلامة.',
      },
    },
    {
      id: 'comp-confidentiality',
      text: {
        en: 'Maintaining the confidentiality of company and client information.',
        ar: 'المحافظة على سرية معلومات الشركة والعملاء.',
      },
    },
    {
      id: 'comp-property',
      text: {
        en: 'Taking care of company property and facilities.',
        ar: 'المحافظة على ممتلكات الشركة ومرافقها.',
      },
    },
    {
      id: 'comp-conduct',
      text: {
        en: 'Maintaining professional conduct.',
        ar: 'الالتزام بالسلوك المهني داخل بيئة العمل.',
      },
    },
    {
      id: 'comp-authorization',
      text: {
        en: 'Not performing activities or using facilities without authorization.',
        ar: 'عدم القيام بأي نشاط أو استخدام لأي مرفق دون تصريح.',
      },
    },
  ] satisfies ListItem[],
} as const;

/* ── Contact & Support (11) ────────────────────────────────────────────── */

export const CONTACT = {
  eyebrow: { en: 'SECTION 11 · CONTACT & SUPPORT', ar: 'القسم ١١ · التواصل والدعم' } satisfies Localized,
  title: { en: 'We’re here to help.', ar: 'نحن هنا لمساعدتك.' } satisfies Localized,
  lead: {
    en: 'During your training, you may have questions about your tasks, procedures, or any aspect of your training experience. Do not hesitate to ask for support or clarification when needed.',
    ar: 'خلال فترة التدريب، قد تحتاج إلى الاستفسار عن المهام أو الإجراءات أو أي جانب يتعلق بتجربتك التدريبية. لا تتردد في طلب المساعدة أو التوضيح عند الحاجة.',
  } satisfies Localized,
  cardLabel: { en: 'Trainee Contact & Support', ar: 'جهة التواصل والدعم للمتدربين' } satisfies Localized,
  rows: [
    {
      id: 'contact-name',
      label: { en: 'Contact Name', ar: 'الاسم' },
      value: { en: 'Abdulaziz Alotaibi', ar: 'عبدالعزيز العتيبي' },
    },
    {
      id: 'contact-phone',
      label: { en: 'Phone', ar: 'رقم التواصل' },
      value: { en: '+966 55 168 8938', ar: '+٩٦٦ ٥٥ ١٦٨ ٨٩٣٨' },
    },
    {
      id: 'contact-email',
      label: { en: 'Email', ar: 'البريد الإلكتروني' },
      value: { en: 'AbdulazizA@saaksa.com', ar: 'AbdulazizA@saaksa.com' },
    },
  ] satisfies FactRow[],
} as const;

/* ── Completing Your Training (12) ─────────────────────────────────────── */

export const COMPLETION = {
  eyebrow: { en: 'SECTION 12 · COMPLETING YOUR TRAINING', ar: 'القسم ١٢ · ختام فترة التدريب' } satisfies Localized,
  title: { en: 'Make your experience a starting point.', ar: 'اجعل تجربتك نقطة انطلاق.' } satisfies Localized,
  lead: {
    en: 'Completing your training is not the end of the experience, but a step toward your professional journey. Take the knowledge, feedback, and skills you gained during your time at SAAK International and carry them forward into your career.',
    ar: 'انتهاؤك من فترة التدريب ليس نهاية التجربة، بل خطوة نحو مسيرتك المهنية. استفد من الخبرات التي اكتسبتها، والملاحظات التي تلقيتها، والمهارات التي طورتها خلال فترة وجودك في ساك الدولية.',
  } satisfies Localized,
  listIntro: {
    en: 'Before You Complete Your Training',
    ar: 'قبل انتهاء التدريب',
  } satisfies Localized,
  items: [
    {
      id: 'complete-tasks',
      text: {
        en: 'Complete your assigned tasks.',
        ar: 'استكمال المهام المطلوبة.',
      },
    },
    {
      id: 'complete-review',
      text: {
        en: 'Review what you have accomplished and learned.',
        ar: 'مراجعة ما تم إنجازه وما تم تعلمه.',
      },
    },
    {
      id: 'complete-feedback',
      text: {
        en: 'Make use of the feedback you received.',
        ar: 'الاستفادة من التغذية الراجعة.',
      },
    },
    {
      id: 'complete-return',
      text: {
        en: 'Return any assigned equipment, devices, or assets.',
        ar: 'إعادة أي عهد أو أجهزة أو أدوات تم تسليمها لك.',
      },
    },
    {
      id: 'complete-procedures',
      text: {
        en: 'Complete any required training procedures.',
        ar: 'استكمال أي إجراءات مطلوبة من جهة التدريب.',
      },
    },
  ] satisfies ListItem[],
} as const;

/* ── Acknowledgement (13) ──────────────────────────────────────────────── */

export const ACKNOWLEDGEMENT = {
  eyebrow: { en: 'SECTION 13 · ACKNOWLEDGEMENT', ar: 'القسم ١٣ · الإقرار والتعهد' } satisfies Localized,
  title: { en: 'The final step.', ar: 'الخطوة الأخيرة.' } satisfies Localized,
  statement: {
    en: 'I acknowledge that I have read the SAAK International Trainee Guide and agree to comply with the applicable policies, regulations, and instructions, including safety, security, and confidentiality requirements throughout my training period.',
    ar: 'أقرّ بأنني اطلعت على دليل المتدرب في ساك الدولية، وأوافق على الالتزام بالسياسات والأنظمة والتعليمات المعمول بها، بما في ذلك تعليمات الأمن والسلامة والمحافظة على سرية المعلومات طوال فترة تدريبي في الشركة.',
  } satisfies Localized,
  regulationsLabel: {
    en: 'Work Regulations',
    ar: 'لائحة العمل',
  } satisfies Localized,
  regulationsHint: {
    en: 'Please read the work regulations document before you sign the acknowledgement.',
    ar: 'يرجى الاطلاع على لائحة العمل قبل التوقيع على الإقرار.',
  } satisfies Localized,
  regulationsAction: {
    en: 'Open work regulations',
    ar: 'عرض لائحة العمل',
  } satisfies Localized,
  informationLabel: { en: 'Information', ar: 'البيانات' } satisfies Localized,
  fullNameLabel: { en: 'Full Name', ar: 'الاسم الكامل' } satisfies Localized,
  fullNamePlaceholder: { en: 'Enter your full name', ar: 'أدخل اسمك الكامل' } satisfies Localized,
  periodLabel: { en: 'Training Period', ar: 'فترة التدريب' } satisfies Localized,
  periodPlaceholder: { en: 'e.g. Jan 2026 – Apr 2026', ar: 'مثال: يناير ٢٠٢٦ – أبريل ٢٠٢٦' } satisfies Localized,
  consent: {
    en: 'I have read and agree to this acknowledgement',
    ar: 'لقد قرأت هذا الإقرار وأوافق عليه',
  } satisfies Localized,
  submit: { en: 'Submit Acknowledgement', ar: 'إرسال الإقرار' } satisfies Localized,
  submitting: { en: 'Sending…', ar: 'جارٍ الإرسال…' } satisfies Localized,
  successTitle: {
    en: 'Your acknowledgement has been successfully recorded.',
    ar: 'تم تسجيل إقرارك بنجاح.',
  } satisfies Localized,
  successBody: {
    en: 'We wish you a valuable and successful training experience at SAAK International.',
    ar: 'نتمنى لك تجربة تدريبية ثرية وموفقة في ساك الدولية.',
  } satisfies Localized,
  errorNotConfigured: {
    en: 'The form endpoint has not been configured yet. Please contact your training coordinator.',
    ar: 'لم يتم ربط نموذج الإرسال بعد. يرجى التواصل مع منسق التدريب.',
  } satisfies Localized,
  errorGeneric: {
    en: 'Something went wrong. Please try again or contact your training coordinator.',
    ar: 'حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل مع منسق التدريب.',
  } satisfies Localized,
  requiredFields: {
    en: 'Please complete all fields and check the acknowledgement box.',
    ar: 'يرجى تعبئة جميع الحقول والموافقة على الإقرار.',
  } satisfies Localized,
} as const;
