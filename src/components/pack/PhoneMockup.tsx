'use client'

import { motion } from 'framer-motion'
import { CTAButton } from './CTAButton'

const IMAGES = {
  heroM:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223934_ef3d11c0-93fd-4885-9ab6-2da04917f71b.png',
  lados:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223935_85b1c577-135a-41ab-b956-db9142ff0892.png',
}

/**
 * Phone mockup with two cuts stacked. Animations:
 *  - subtle floating Y oscillation
 *  - red "split line" sweeping vertically (every 3.6s) — emulates a cut transition
 *  - play button pulse
 *  - shine sweep across glass every 4s
 */
export function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      className="relative mx-auto w-full max-w-[300px] self-center max-[820px]:max-w-[260px] max-[820px]:w-[76vw]"
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[48px] bg-[#e11d2e]/30 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative aspect-[9/19] w-full overflow-hidden rounded-[38px] border-[7px] border-[#1b1b20] bg-black shadow-[0_30px_90px_rgba(225,29,46,0.35)]"
      >
        {/* two cuts stacked */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url("${IMAGES.heroM}")`, backgroundPosition: 'center 70%' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url("${IMAGES.lados}")`, backgroundPosition: 'center' }}
        />

        {/* red split line sweeping */}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 h-[3px] bg-[#e11d2e] shadow-[0_0_24px_4px_rgba(225,29,46,0.65)]"
          initial={{ top: '50%' }}
          animate={{ top: ['50%', '6%', '50%', '94%', '50%'] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.32, 0.5, 0.82, 1],
          }}
        />

        {/* caption — honest about being a preview, not a real cut */}
        <div className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 text-center font-display text-[22px] font-bold uppercase leading-none text-white [text-shadow:0_2px_8px_#000] max-[820px]:text-[18px]">
          Prévia do <span className="text-[#f5a524]">arquivo</span>
        </div>

        {/* shine sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          initial={{ background: 'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%, transparent 100%)', backgroundPosition: '200% 0' }}
          animate={{ backgroundPosition: ['200% 0', '-50% 0'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
        />

        {/* play button */}
        <motion.div
          aria-hidden
          className="absolute bottom-3.5 right-3.5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-black"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="pl-[3px] text-[18px]">▶</span>
        </motion.div>
      </motion.div>

      {/* floating "9:16" chip */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-6 top-10 hidden rounded-full border border-[#f5a524]/40 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#f5a524] sm:block"
      >
        9:16 vertical
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute -right-4 bottom-16 hidden rounded-full border border-[#e11d2e]/40 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#e11d2e] sm:block"
      >
        CapCut · Premiere
      </motion.div>
    </motion.div>
  )
}
