'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TARGET = new Date('2026-10-25T17:00:00-03:00').getTime()

function diff() {
  const d = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  }
}

/** Tiny digit that flips on change */
function FlipDigit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className="relative inline-flex h-[26px] w-[22px] items-center justify-center overflow-hidden rounded-[3px] bg-black/30 tabular-nums max-[820px]:h-[22px] max-[820px]:w-[18px]">
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="font-display text-[15px] font-bold leading-none text-white max-[820px]:text-[13px]"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </span>
      <span className="mt-[2px] text-[8px] uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
    </span>
  )
}

/**
 * Sticky top countdown bar.
 * - red bar at the very top of the page
 * - turns into a sticky floating pill after scrolling past hero
 */
export function CountdownBar() {
  const [t, setT] = useState(diff)
  const { scrollY } = useScroll()
  const width = useTransform(scrollY, [0, 400], ['100%', '0%'])

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-[#e11d2e] text-white"
    >
      <div className="pp-wrap flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[13px] font-semibold tracking-[0.04em] max-[820px]:py-2 max-[820px]:px-3.5 max-[820px]:text-[11.5px] max-[820px]:leading-[1.35]">
        <span className="inline-flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 10, -8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⚡
          </motion.span>
          2º TURNO EM 25/10/2026 · A JANELA FECHA EM
        </span>

        <span className="inline-flex items-end gap-[6px]">
          <FlipDigit value={t.days} label="dias" />
          <FlipDigit value={t.hours} label="horas" />
          <FlipDigit value={t.minutes} label="min" />
          <FlipDigit value={t.seconds} label="seg" />
        </span>

        <span className="text-white/70">· só volta daqui a 4 anos</span>
      </div>

      {/* thin progress bar that depletes as you scroll toward CTA */}
      <motion.div
        style={{ width }}
        className="h-[2px] bg-gradient-to-r from-[#f5a524] via-white to-transparent"
        aria-hidden
      />
    </motion.div>
  )
}
