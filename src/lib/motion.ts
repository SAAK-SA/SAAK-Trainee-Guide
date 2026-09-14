import type { Transition, Variants } from 'framer-motion';

/** Motion timing tokens — mirrors --dur-* / --ease-* in styles/tokens.css. */
export const DURATION = {
  fast: 0.18,
  base: 0.32,
  slow: 0.64,
  draw: 1.1,
} as const;

export const EASE = {
  technical: [0.22, 1, 0.36, 1],
  precise: [0.65, 0, 0.35, 1],
} as const;

export const transition = {
  base: { duration: DURATION.base, ease: EASE.technical } satisfies Transition,
  slow: { duration: DURATION.slow, ease: EASE.technical } satisfies Transition,
  precise: { duration: DURATION.base, ease: EASE.precise } satisfies Transition,
};

/** Viewport config shared by every scroll-triggered reveal. */
export const viewport = { once: true, amount: 0.25, margin: '0px 0px -8% 0px' } as const;

/**
 * Builds the reveal variants for a subject.
 * When `reduced` is true every transform is dropped and only opacity remains,
 * which keeps the choreography legible without any movement.
 */
export function revealVariants(reduced: boolean, distance = 24): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: DURATION.base } : transition.slow,
    },
  };
}

/** Staggered container for grouped reveals (cards, list items, labels). */
export function staggerVariants(reduced: boolean, stagger = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced ? { staggerChildren: 0 } : { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };
}

/** Geometric mask reveal used for imagery — a wipe, not a fade-in-from-nowhere. */
export function maskVariants(reduced: boolean): Variants {
  if (reduced) {
    // clipPath is named in both states on purpose: if the preference resolves
    // after the first paint, an omitted property would leave the previously
    // applied clip on the element and strand it in its hidden state.
    return {
      hidden: { opacity: 0, clipPath: 'inset(0 0 0% 0)' },
      visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: DURATION.base } },
    };
  }
  return {
    hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
    visible: {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      transition: { duration: 0.95, ease: EASE.technical },
    },
  };
}

/** SVG path draw-on used across the circuit system. */
export function drawVariants(reduced: boolean, duration: number = DURATION.draw, delay = 0): Variants {
  return {
    hidden: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : { pathLength: { duration, ease: EASE.precise, delay }, opacity: { duration: 0.2, delay } },
    },
  };
}
