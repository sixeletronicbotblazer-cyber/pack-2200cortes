'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, X, Zap } from 'lucide-react'
import { CTAButton } from './CTAButton'

type UpsellModalProps = {
  isOpen: boolean
  onClose: () => void
  /** Navigate to the COMPLETE checkout (upsell accepted) */
  onAccept?: () => void
  /** Navigate to the INICIAL checkout (upsell declined) */
  onDecline?: () => void
}

/** Tiny countdown timer for the scarcity element (5:00 minutes) */
function ScarcityTimer() {
  const [seconds, setSeconds] = useState(5 * 60)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return (
    <span className="inline-flex items-center gap-1.5 text-[#f5a524]">
      <Clock className="h-3.5 w-3.5" />
      <span className="font-display text-[16px] font-bold tabular-nums">
        {mm}:{ss}
      </span>
    </span>
  )
}

/**
 * Order-bump / upsell popup.
 *
 * Flow:
 *   user clicks "Quero o Inicial (R$ 14,90)" → this popup opens (no navigation yet)
 *   → user clicks the big CTA → navigate to COMPLETE checkout (R$ 24,90 — discounted)
 *   → user clicks the small decline link → navigate to INICIAL checkout (R$ 14,90)
 *
 * Content:
 *   - Red "ESPERA!" kicker + live countdown timer
 *   - Headline: "Pega o COMPLETO por mais R$ 10"
 *   - Short copy explaining what they get extra
 *   - Scarcity spots indicator (animated ping dot)
 *   - Strikethrough old price R$ 39,90 → new price R$ 24,90 (large)
 *   - -37% badge
 *   - Big affirming amber CTA button
 *   - Very small decline link below
 */
export function UpsellModal({ isOpen, onClose, onAccept, onDecline }: UpsellModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="upsell-title"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* popup card */}
          <motion.div
            className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-[10px] border border-[#f5a524]/40 bg-[#0d0d11] p-6 shadow-[0_30px_80px_rgba(225,29,46,0.45)] max-[820px]:p-5"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            {/* top glow */}
            <div className="pointer-events-none absolute -inset-px rounded-[10px] bg-gradient-to-b from-[#f5a524]/15 to-transparent" />

            {/* close */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 grid h-7 w-7 place-items-center rounded-full border border-white/15 text-white/60 transition hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="relative">
              {/* kicker + timer */}
              <div className="mb-3 flex items-center gap-3">
                <motion.span
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#e11d2e] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Zap className="h-3 w-3" /> espera!
                </motion.span>
                <ScarcityTimer />
              </div>

              {/* headline */}
              <h3
                id="upsell-title"
                className="font-display text-[clamp(24px,6vw,32px)] font-bold uppercase leading-[1.05] tracking-[0.01em]"
              >
                pega o <span className="text-[#f5a524]">completo</span> por mais{' '}
                <span className="text-[#e11d2e]">R$ 10</span>
              </h3>

              {/* copy */}
              <p className="mt-3 text-[14px] leading-relaxed text-[#d8d3ca]">
                Você estava levando 300 cortes. Por mais <b className="text-white">R$ 10</b> você
                recebe <b className="text-white">+2200 cortes</b>, o treinamento completo e os vídeos
                com IA no Flow. Oferta única — não aparece depois.
              </p>

              {/* scarcity spots */}
              <div className="mt-3 flex items-center gap-2 text-[12px] text-[#9a948a]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e11d2e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e11d2e]" />
                </span>
                restam <b className="text-[#f3efe8]">17</b> vagas com esse preço
              </div>

              {/* price block */}
              <div className="mt-5 flex items-end gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a948a] line-through">
                    R$ 39,90
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-[18px] text-[#9a948a]">R$</span>
                    <span className="font-display text-[clamp(40px,11vw,52px)] font-bold leading-none text-white tabular-nums">
                      24,90
                    </span>
                  </div>
                </div>
                <div className="mb-1 inline-block rounded-[4px] bg-[#1a0b0e] px-2 py-1 text-[11px] font-bold uppercase text-[#e11d2e]">
                  -37%
                </div>
              </div>

              {/* CTA — big affirming button */}
              <div className="mt-5">
                <CTAButton
                  href="https://go.perfectpay.com.br/PPU38CQGPUL"
                  variant="amber"
                  className="w-full justify-center text-[15px]"
                  onClick={(e) => {
                    e.preventDefault()
                    onAccept?.()
                  }}
                  withArrow={false}
                >
                  Quero o Completo por R$ 24,90
                </CTAButton>
              </div>

              {/* decline link — very small */}
              <button
                onClick={onDecline}
                className="mt-3 w-full text-center text-[11px] text-[#7d786f] underline-offset-2 transition hover:text-[#9a948a] hover:underline"
              >
                Não, quero só o Inicial por R$ 14,90
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
