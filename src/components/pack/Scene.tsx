'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SceneProps = {
  image: string
  children: ReactNode
  variant?: 'left' | 'center' | 'bottom' | 'mobile'
  className?: string
  minH?: string
  /** optional: floating chip on the side */
  floatingChip?: ReactNode
}

/**
 * Full-bleed scene section. The background image IS the section; text lives on top.
 *  - parallax background (slower than scroll)
 *  - gradient overlay that adapts per variant
 *  - fade-in / rise content via stagger
 */
export function Scene({
  image,
  children,
  variant = 'left',
  className,
  minH = '92vh',
  floatingChip,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // background parallax — moves slower than the page
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12])

  const overlay =
    variant === 'center'
      ? 'bg-[radial-gradient(ellipse_at_center,rgba(7,7,10,0.55),rgba(7,7,10,0.92))]'
      : variant === 'bottom'
      ? 'bg-[linear-gradient(0deg,rgba(7,7,10,0.95)_15%,rgba(7,7,10,0.2)_100%)]'
      : variant === 'mobile'
      ? 'bg-[linear-gradient(0deg,rgba(7,7,10,0.95)_25%,rgba(7,7,10,0.2)_100%)]'
      : 'bg-[linear-gradient(90deg,rgba(7,7,10,0.92)_0%,rgba(7,7,10,0.55)_55%,rgba(7,7,10,0.15)_100%)]'

  return (
    <section
      ref={ref}
      className={cn('relative isolate flex items-center overflow-hidden', className)}
      style={{ minHeight: minH }}
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[-2] bg-cover bg-center"
        style={{ backgroundImage: `url("${image}")`, y: bgY, scale: bgScale }}
      />
      {/* Gradient overlay */}
      <div className={cn('absolute inset-0 z-[-1]', overlay)} />
      {/* Bottom fade-out to background ink */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[-1] h-[140px] bg-gradient-to-b from-transparent to-[#07070a]"
      />

      {/* Floating chip (optional) */}
      {floatingChip && (
        <div className="pointer-events-none absolute inset-0 z-0">{floatingChip}</div>
      )}

      <div className="pp-wrap relative z-10 w-full py-16 md:py-20">{children}</div>
    </section>
  )
}

/* Stagger helpers exported for child use */
export const sceneStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

export const sceneRise = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 90, damping: 16 },
  },
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <motion.span
      variants={sceneRise}
      className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f5a524]"
    >
      {children}
    </motion.span>
  )
}

export function H2({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.h2
      variants={sceneRise}
      className={cn(
        'max-w-[12em] text-balance font-display text-[clamp(32px,5.4vw,66px)] font-bold leading-[1.02] tracking-[0.01em]',
        className,
      )}
    >
      {children}
    </motion.h2>
  )
}

export function Lead({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.p
      variants={sceneRise}
      className={cn(
        'mt-5 max-w-[34em] text-[clamp(17px,2vw,21px)] leading-relaxed text-[#d8d3ca]',
        className,
      )}
    >
      {children}
    </motion.p>
  )
}
