import { useEffect, useState } from 'react';

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const LIGHT_QUERY = '(max-width: 767px), (pointer: coarse)';

/** Reads a media query during the first render so no animation starts from the
 *  wrong preference and then has to be corrected. */
function matches(query: string) {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

/**
 * Single source of truth for "should this interface move?".
 * Combines the OS-level prefers-reduced-motion setting with a coarse-pointer /
 * small-viewport check, so phones run a deliberately lighter motion system.
 */
export function useMotionPreference() {
  const [reduced, setReduced] = useState(() => matches(MOTION_QUERY));
  const [lightweight, setLightweight] = useState(() => matches(LIGHT_QUERY));

  useEffect(() => {
    const motionQuery = window.matchMedia(MOTION_QUERY);
    const lightQuery = window.matchMedia(LIGHT_QUERY);

    const sync = () => {
      setReduced(motionQuery.matches);
      setLightweight(lightQuery.matches);
    };

    sync();
    motionQuery.addEventListener('change', sync);
    lightQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      lightQuery.removeEventListener('change', sync);
    };
  }, []);

  return {
    /** OS-level reduced motion. Collapses all choreography to opacity. */
    reduced,
    /** Phones / touch devices: decorative circuitry and parallax are trimmed. */
    lightweight,
    /** Decorative, non-informational motion (parallax, travelling signal). */
    allowDecorative: !reduced && !lightweight,
  };
}
