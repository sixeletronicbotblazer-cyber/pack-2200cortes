'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TARGET = new Date('2026-10-25T17:00:00-03:00').getTime()

function diff() {
  const d = Math.max(0, TARGET - Date.now())
  return {
    total: d,
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  }
}

/** Single counter column — number + label, no individual card background */
function CounterColumn({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-[28px] font-bold leading-none text-white tabular-nums max-[820px]:text-[26px] max-[430px]:text-[24px]">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/75 whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

/**
 * Sticky top countdown bar.
 *
 * Copy:
 *   "RETA FINAL DAS ELEIÇÕES" (small)
 *   "25 DE OUTUBRO" (big, white, condensed bold — the focus)
 *   "Prepare seus cortes e sua oferta antes do 2º turno." (support line)
 *   "FALTAM PARA A VOTAÇÃO" (small, above counter)
 *   4 columns: DIAS / HORAS / MIN / SEG
 *
 * Removed: "a janela fecha" and "só volta daqui a 4 anos".
 * The counter marks the arrival of the 2nd round (25/10/2026), NOT the end
 * of pack access or a price expiration.
 *
 * Layout:
 *   Mobile (≤820px): centered vertical stack, enough height to breathe.
 *   Desktop (>820px): two areas — date+phrase left, counter right (compact).
 *
 * When the date passes: shows "A votação do 2º turno já aconteceu." instead
 * of the counter (no negative numbers).
 */
export function CountdownBar() {
  const [t, setT] = useState(diff)
  const { scrollY } = useScroll()
  const width = useTransform(scrollY, [0, 400], ['100%', '0%'])

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000)
    return () => clearInterval(id)
  }, [])

  const hasPassed = t.total <= 0

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-[#e11d2e] text-white"
    >
      <div className="pp-wrap flex flex-col items-center gap-2.5 py-4 text-center max-[820px]:py-3.5 max-[820px]:gap-2 md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
        {/* LEFT: date + phrase (desktop: left; mobile: top, centered) */}
        <div className="flex flex-col items-center gap-0.5 md:items-start md:gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 max-[820px]:text-[9px]">
            Reta final das eleições
          </span>
          <span className="font-display text-[34px] font-bold leading-none text-white whitespace-nowrap max-[820px]:text-[32px] max-[430px]:text-[30px] max-[375px]:text-[27px] max-[360px]:text-[25px]">
            25 de outubro
          </span>
          <span className="text-[13px] leading-snug text-white/85 max-[820px]:text-[12.5px] max-w-[22em]">
            Prepare seus cortes e sua oferta antes do 2º turno.
          </span>
        </div>

        {/* RIGHT: counter (desktop: right; mobile: below, centered) */}
        {hasPassed ? (
          <div className="text-center text-[14px] font-semibold text-white/90 md:text-right">
            A votação do 2º turno já aconteceu.
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 md:items-end">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">
              Faltam para a votação
            </span>
            {/* Darker red strip behind all 4 columns (single container, no individual cards) */}
            <div className="grid grid-cols-4 gap-2 rounded-[6px] bg-[#b21624] px-4 py-2.5 max-[820px]:gap-1.5 max-[820px]:px-3.5 max-[820px]:py-2">
              <CounterColumn value={t.days} label="dias" />
              <CounterColumn value={t.hours} label="horas" />
              <CounterColumn value={t.minutes} label="min" />
              <CounterColumn value={t.seconds} label="seg" />
            </div>
          </div>
        )}
      </div>

      {/* Yellow bottom progress line (filete amarelo inferior) */}
      <div className="relative h-[4px] w-full bg-black/25">
        <motion.div
          style={{ width }}
          className="absolute left-0 top-0 h-full origin-left bg-gradient-to-r from-[#f5a524] via-white to-[#f5a524] shadow-[0_0_10px_2px_rgba(245,165,36,0.7)]"
          aria-hidden
        />
      </div>
    </motion.div>
  )
}
