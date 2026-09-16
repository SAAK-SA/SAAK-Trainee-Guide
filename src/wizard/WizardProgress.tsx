import { useLanguage } from '@/i18n/LanguageContext';
import { SECTIONS } from '@/data/content';
import { useWizardCtx } from './WizardContext';

/**
 * Progress track + step counter + current step title.
 * Anchors the wizard so trainees always know where they are.
 */
export function WizardProgress() {
  const { t } = useLanguage();
  const { step, total, progress } = useWizardCtx();

  // The registry's inNav items are the wizard steps (hero is not a step).
  const steps = SECTIONS.filter((s) => s.inNav);
  const currentTitle = steps[step]?.nav ?? { en: '', ar: '' };

  return (
    <div className="mx-auto mb-10 max-w-3xl">
      <div className="h-1.5 w-full overflow-hidden rounded-pill bg-neutralx-200">
        <span
          className="block h-full rounded-pill bg-gradient-to-r from-navy to-green transition-[width] duration-slow ease-technical"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-small text-neutralx-500">
        <span>
          <span className="font-bold text-navy">{step + 1}</span>
          <span className="mx-1" dir="ltr">
            /
          </span>
          <span>{total}</span>
        </span>
        <span className="text-end font-semibold text-navy-900">{t(currentTitle)}</span>
      </div>
    </div>
  );
}
