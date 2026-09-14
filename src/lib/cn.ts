type ClassValue = string | false | null | undefined;

/** Minimal class-name joiner — no runtime dependency for a 6-line utility. */
export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ');
}
