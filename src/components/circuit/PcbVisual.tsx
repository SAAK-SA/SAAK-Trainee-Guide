import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useMotionPreference } from '@/hooks/useMotionPreference';

interface PcbVisualProps {
  className?: string;
}

/**
 * A lightweight 3D printed-circuit board.
 *
 * Built entirely from CSS 3D transforms and inline SVG — no 3D runtime, no
 * model files, a few kilobytes in total. The board sits on an isometric plane
 * with a raised microchip package, routed copper and populated pads.
 */
export function PcbVisual({ className }: PcbVisualProps) {
  const { reduced, allowDecorative } = useMotionPreference();

  return (
    <div
      className={cn('relative select-none', className)}
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, rotateX: 62, rotateZ: -38, y: 30 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, rotateX: 54, rotateZ: -32, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {/* Board substrate */}
        <div
          className="absolute inset-0 rounded-md border border-white/10"
          style={{
            background:
              'linear-gradient(135deg, #0f2f59 0%, #14396b 45%, #0c2342 100%)',
            boxShadow:
              '0 40px 80px -30px rgba(5, 15, 29, 0.85), inset 0 0 0 1px rgba(255,255,255,0.05)',
            transform: 'translateZ(0px)',
          }}
        >
          {/* Copper routing */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none">
            <g stroke="rgba(18,161,80,0.55)" strokeWidth="1.5" strokeLinecap="square">
              <path d="M24 40 H120 L150 70 H236" />
              <path d="M24 92 H96 L128 124 V212" />
              <path d="M376 60 H300 L268 92 H236" />
              <path d="M376 150 H316 V236 H214" />
              <path d="M150 70 V110" />
              <path d="M268 92 V150 H214" />
            </g>
            <g stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="square">
              <path d="M24 140 H80 V260 H160" />
              <path d="M376 210 H340 V268 H250" />
              <path d="M60 40 V20 H200" />
            </g>
            <g fill="rgba(18,161,80,0.9)">
              <circle cx="24" cy="40" r="3.5" />
              <circle cx="150" cy="70" r="3.5" />
              <circle cx="268" cy="92" r="3.5" />
              <circle cx="128" cy="212" r="3.5" />
            </g>
            {/* Pad arrays */}
            <g fill="rgba(255,255,255,0.22)">
              {Array.from({ length: 8 }).map((_, i) => (
                <rect key={`pad-l-${i}`} x={40} y={170 + i * 12} width={14} height={5} rx={1} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <rect key={`pad-r-${i}`} x={330} y={40 + i * 12} width={14} height={5} rx={1} />
              ))}
            </g>
          </svg>

          {/* Silkscreen markings */}
          <span className="absolute bottom-3 start-4 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
            SAAK · REV —
          </span>
          <span className="absolute top-3 end-4 font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
            PCB / PLACEHOLDER
          </span>
        </div>

        {/* Raised microchip package */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[26%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-sm"
          style={{
            transform: 'translate(-50%, -50%) translateZ(26px)',
            background: 'linear-gradient(150deg, #1b1f26 0%, #0d1016 60%, #05070a 100%)',
            boxShadow: '0 18px 34px -14px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)',
          }}
          animate={allowDecorative ? { y: [0, -4, 0] } : undefined}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-[18%] rounded-[2px] border border-white/10" />
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] uppercase tracking-[0.28em] text-white/40">
            MCU
          </span>
          {/* Package pins */}
          <div className="absolute -top-1 start-[12%] flex w-[76%] justify-between">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={`pin-t-${i}`} className="h-1 w-[3px] bg-white/25" />
            ))}
          </div>
          <div className="absolute -bottom-1 start-[12%] flex w-[76%] justify-between">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={`pin-b-${i}`} className="h-1 w-[3px] bg-white/25" />
            ))}
          </div>
        </motion.div>

        {/* Passive components */}
        <div
          className="absolute start-[14%] top-[62%] h-[7%] w-[12%] rounded-[2px] bg-gradient-to-b from-white/25 to-white/5"
          style={{ transform: 'translateZ(12px)' }}
        />
        <div
          className="absolute end-[16%] top-[24%] h-[9%] w-[9%] rounded-[2px] bg-gradient-to-b from-green/50 to-green/10"
          style={{ transform: 'translateZ(14px)' }}
        />
      </motion.div>
    </div>
  );
}
