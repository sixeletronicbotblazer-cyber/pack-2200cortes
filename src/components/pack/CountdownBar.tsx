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

/** Digit box that flips on change — bigger now to "destacar o cronômetro" */
function FlipDigit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className="relative inline-flex h-[36px] w-[30px] items-center justify-center overflow-hidden rounded-[5px] border border-white/20 bg-black/35 tabular-nums shadow-[0_2px_8px_rgba(0,0,0,0.25)] max-[820px]:h-[28px] max-[820px]:w-[23px]">
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="font-display text-[20px] font-bold leading-none text-white max-[820px]:text-[15px]"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </span>
      <span className="mt-[3px] text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75 max-[820px]:text-[8px]">
        {label}
      </span>
    </span>
  )
}

/**
 * Sticky top countdown bar.
 * Stacked vertically (always — not flex-wrap):
 *   Row 1: headline (bigger, white, bold) "2º TURNO EM 25/10/2026 · A JANELA FECHA EM"
 *   Row 2: subheadline "só volta daqui a 4 anos" (clearly visible)
 *   Row 3: cronometro (bigger digits + boxes, highlighted)
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
      <div className="pp-wrap flex flex-col items-center gap-1.5 py-2.5 text-center max-[820px]:py-2 max-[820px]:gap-1">
        {/* Row 1: HEADLINE — bigger, white, bold */}
        <span className="inline-flex items-center gap-2 text-[14px] font-bold tracking-[0.05em] text-white max-[820px]:text-[11.5px]">
          <motion.span
            animate={{ rotate: [0, 10, -8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⚡
          </motion.span>
          2º TURNO EM 25/10/2026 · A JANELA FECHA EM
        </span>

        {/* Row 2: SUBHEADLINE — clearly visible */}
        <span className="text-[12px] font-semibold tracking-[0.04em] text-white/90 max-[820px]:text-[10.5px]">
          só volta daqui a 4 anos
        </span>

        {/* Row 3: CRONÔMETRO — bigger digits, highlighted boxes */}
        <span className="inline-flex items-end gap-2.5 max-[820px]:gap-1.5">
          <FlipDigit value={t.days} label="dias" />
          <FlipDigit value={t.hours} label="horas" />
          <FlipDigit value={t.minutes} label="min" />
          <FlipDigit value={t.seconds} label="seg" />
        </span>
      </div>

      {/* prominent centered progress indicator that depletes as you scroll toward CTA */}
      <div className="relative h-[5px] w-full bg-black/25">
        <motion.div
          style={{ width }}
          className="absolute left-0 top-0 h-full origin-left bg-gradient-to-r from-[#f5a524] via-white to-[#f5a524] shadow-[0_0_10px_2px_rgba(245,165,36,0.7)]"
          aria-hidden
        />
        {/* glowing marker that travels with the leading edge */}
        <motion.div
          style={{
            left: width,
            translateX: '-50%',
          }}
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.85)]"
          aria-hidden
        />
      </div>
    </motion.div>
  )
}
