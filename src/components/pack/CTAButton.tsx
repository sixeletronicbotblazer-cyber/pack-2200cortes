'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type CTAButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'amber' | 'red' | 'ghost'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  withArrow?: boolean
}

/**
 * Magnetic CTA button with:
 *  - subtle magnetic pull toward the cursor
 *  - pulse glow ring (infinite)
 *  - shine sweep on hover
 *  - arrow nudge on hover
 */
export function CTAButton({
  children,
  href = '#planos',
  variant = 'amber',
  className,
  onClick,
  withArrow = true,
}: CTAButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) / r.width
    const y = (e.clientY - (r.top + r.height / 2)) / r.height
    setPos({ x: x * 0.35, y: y * 0.35 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  const palette =
    variant === 'red'
      ? 'bg-[#e11d2e] text-white'
      : variant === 'ghost'
      ? 'bg-transparent border border-[#f5a524]/40 text-[#f5a524] hover:bg-[#f5a524]/10'
      : 'bg-[#f5a524] text-[#150d00]'

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[4px] px-8 py-4 font-display text-base font-bold uppercase tracking-[0.06em] no-underline max-[820px]:w-full max-[820px]:px-[18px] max-[820px]:py-[17px] max-[820px]:text-base',
        palette,
        className,
      )}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* pulse glow */}
      {variant !== 'ghost' && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[4px]"
          animate={{
            boxShadow:
              variant === 'red'
                ? [
                    '0 0 0 0 rgba(225,29,46,0.55)',
                    '0 0 0 18px rgba(225,29,46,0)',
                    '0 0 0 0 rgba(225,29,46,0)',
                  ]
                : [
                    '0 0 0 0 rgba(245,165,36,0.55)',
                    '0 0 0 18px rgba(245,165,36,0)',
                    '0 0 0 0 rgba(245,165,36,0)',
                  ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* shine sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <motion.span
            aria-hidden
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            →
          </motion.span>
        )}
      </span>
    </motion.a>
  )
}
