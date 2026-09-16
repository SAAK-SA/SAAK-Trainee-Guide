import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { UI } from '@/data/ui';
import { useWizardCtx } from './WizardContext';
import { cn } from '@/lib/cn';

/** Prev / Next buttons under the active step. */
export function WizardNav() {
  const { t, isRTL } = useLanguage();
  const { prev, next, isFirst, isLast } = useWizardCtx();

  const NextIcon = isRTL ? ArrowLeft : ArrowRight;
  const PrevIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="mx-auto mt-10 flex max-w-3xl items-center justify-between gap-4">
      <button
        type="button"
        onClick={prev}
        disabled={isFirst}
        className={cn(
          'inline-flex items-center gap-2 rounded-pill border border-neutralx-200 bg-white px-6 py-3 text-small font-semibold text-navy transition-all duration-base ease-technical',
          isFirst
            ? 'cursor-not-allowed opacity-40'
            : 'hover:-translate-y-0.5 hover:border-green hover:text-green-700 hover:shadow-sm',
        )}
      >
        <PrevIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        {t(UI.prev)}
      </button>
      <button
        type="button"
        onClick={next}
        aria-hidden={isLast}
        className={cn(
          'inline-flex items-center gap-2 rounded-pill bg-navy px-7 py-3 text-small font-semibold text-white shadow-sm transition-all duration-base ease-technical',
          isLast
            ? 'invisible pointer-events-none'
            : 'hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-md',
        )}
      >
        {t(UI.next)}
        <NextIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
