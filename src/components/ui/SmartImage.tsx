import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Building2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLanguage } from '@/i18n/LanguageContext';

interface SmartImageProps {
  /** Public path to the real image. If it fails to load, the placeholder shows. */
  src: string;
  /** Alt text — should describe the real photograph. */
  alt: string;
  /** Icon shown inside the placeholder while the file is missing. */
  icon?: LucideIcon;
  /** Optional short label rendered inside the placeholder. */
  label?: string;
  /**
   * aspect-ratio value, e.g. '4 / 3'. Defaults to '4 / 3'.
   * Pass 'fill' to let the parent size it (used inside absolute-positioned wrappers).
   */
  ratio?: string | 'fill';
  className?: string;
  /** Above-the-fold images should load eagerly; the rest stay lazy. */
  priority?: boolean;
}

/**
 * Image that renders itself with a branded placeholder until the real
 * file exists. Drop a photograph at the given `src` path and it appears
 * automatically — no code changes needed.
 */
export function SmartImage({
  src,
  alt,
  icon: Icon = Building2,
  label,
  ratio = '4 / 3',
  className,
  priority = false,
}: SmartImageProps) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Probe the URL so a 404 flips to the placeholder without ever
    // painting the broken-image icon.
    let cancelled = false;
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) {
        setLoaded(true);
        setFailed(false);
      }
    };
    probe.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  const showImage = loaded && !failed;

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-md text-white',
        className,
      )}
      style={{
        aspectRatio: ratio === 'fill' ? undefined : ratio,
        background:
          'linear-gradient(135deg, var(--saak-navy-800), var(--saak-navy-600))',
      }}
    >
      {/* Faint grid so the placeholder reads as "reserved space" not blank */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-white/85">
          <Icon className="h-10 w-10 opacity-85" strokeWidth={1.5} aria-hidden="true" />
          {label ? (
            <span className="max-w-[220px] text-small font-medium opacity-85">
              {label}
            </span>
          ) : (
            <span className="max-w-[220px] text-small font-medium opacity-60">
              {t({ en: 'IMAGE PENDING', ar: 'الصورة قيد الإعداد' })}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { ImageIcon };
