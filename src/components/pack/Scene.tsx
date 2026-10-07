'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SceneProps = {
  /** Desktop image URL (also used as <img> fallback inside <picture>) */
  image: string
  /** Optional alternative image for mobile (e.g. tighter crop of the hero) */
  mobileImage?: string
  children: ReactNode
  /** 'hero' = image-on-top layout on mobile; 'center' = radial overlay; 'left' = default left-to-right overlay */
  variant?: 'left' | 'center' | 'hero'
  className?: string
  minH?: string
  /** optional: floating chip on the side */
  floatingChip?: ReactNode
}

/**
 * Full-bleed scene section. Background is an actual <img>/<picture> (better responsive than CSS bg).
 *  - parallax background (slower than scroll) — kept from previous version
 *  - gradient overlay per variant (left/center/hero)
 *  - fade-out to ink at the bottom
 *  - on mobile (max-width:820px) the `hero` variant switches to image-on-top + text-overlap layout
 */
export function Scene({
  image,
  mobileImage,
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

  const isHero = variant === 'hero'
  const isCenter = variant === 'center'

  return (
    <section
      ref={ref}
      className={cn(
        'pp-scene',
        isHero && 'pp-hero',
        isCenter && 'pp-center',
        className,
      )}
      style={!isHero ? { minHeight: minH } : undefined}
    >
      {/* Background image */}
      {isHero ? (
        <picture className="pp-hero-picture">
          {mobileImage && (
            <source media="(max-width:820px)" srcSet={mobileImage} />
          )}
          <motion.img
            src={image}
            alt=""
            className="pp-bg"
            style={{ y: bgY, scale: bgScale }}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      ) : (
        <motion.img
          src={image}
          alt=""
          className="pp-bg"
          style={{ y: bgY, scale: bgScale }}
          loading="eager"
          decoding="async"
        />
      )}

      {/* Overlay + fade */}
      <div className="pp-overlay" aria-hidden />
      <div className="pp-fade" aria-hidden />

      {/* Floating chip (optional) */}
      {floatingChip && (
        <div className="pointer-events-none absolute inset-0 z-0">{floatingChip}</div>
      )}

      <div className="pp-wrap pp-scene-content">{children}</div>
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
      className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f5a524] max-[820px]:text-[11px] max-[820px]:tracking-[0.16em] max-[820px]:mb-3"
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
        'max-w-[12em] text-balance font-display text-[clamp(32px,5.4vw,66px)] font-bold leading-[1.02] tracking-[0.01em] max-[820px]:max-w-none max-[820px]:text-[clamp(28px,8.6vw,40px)]',
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
        'mt-5 max-w-[34em] text-[clamp(17px,2vw,21px)] leading-relaxed text-[#d8d3ca] max-[820px]:mt-4 max-[820px]:mb-6 max-[820px]:text-[17px]',
        className,
      )}
    >
      {children}
    </motion.p>
  )
}
