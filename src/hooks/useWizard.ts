import { useCallback, useEffect, useState } from 'react';

interface WizardOptions {
  total: number;
  storageKey?: string;
}

/**
 * Wizard step controller.
 * Tracks the active step, persists it to sessionStorage (so a page refresh
 * keeps the reader in place), reads/writes the URL hash so links to
 * specific steps still work, and exposes go/prev/next helpers.
 */
export function useWizard({ total, storageKey = 'saak.step' }: WizardOptions) {
  const [step, setStep] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    // URL hash wins on first paint so deep links land on the right step.
    const hash = window.location.hash.replace('#step-', '');
    const fromHash = Number.parseInt(hash, 10);
    if (Number.isFinite(fromHash) && fromHash >= 0 && fromHash < total) {
      return fromHash;
    }
    try {
      const stored = window.sessionStorage.getItem(storageKey);
      const n = stored ? Number.parseInt(stored, 10) : NaN;
      if (Number.isFinite(n) && n >= 0 && n < total) return n;
    } catch {
      /* private mode / blocked storage — fall through */
    }
    return 0;
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey, String(step));
    } catch {
      /* ignore */
    }
    // Update the hash without triggering another scroll.
    const hash = `#step-${step}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [step, storageKey]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setStep(clamped);
      // Give the DOM a beat to render the new step before scrolling.
      window.requestAnimationFrame(() => {
        const target = document.getElementById('wizard');
        if (!target) return;
        const nav = document.querySelector<HTMLElement>('#site-header');
        const offset = nav?.offsetHeight ?? 76;
        const y = target.getBoundingClientRect().top + window.scrollY - offset - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    },
    [total],
  );

  const next = useCallback(() => goTo(step + 1), [goTo, step]);
  const prev = useCallback(() => goTo(step - 1), [goTo, step]);

  return {
    step,
    total,
    next,
    prev,
    goTo,
    isFirst: step === 0,
    isLast: step === total - 1,
    progress: (step + 1) / total,
  };
}
