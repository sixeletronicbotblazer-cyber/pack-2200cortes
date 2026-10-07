'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Props = {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  /** Number of decimal places to show (default 0). */
  decimals?: number
  className?: string
}

/** Count-up that triggers when scrolled into view */
export function AnimatedCounter({
  to,
  duration = 1.4,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(eased * to)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  const formatted =
    decimals > 0
      ? val.toLocaleString('pt-BR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(val).toLocaleString('pt-BR')

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: inView ? 1 : 0.6 }}
      transition={{ duration: 0.4 }}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  )
}
