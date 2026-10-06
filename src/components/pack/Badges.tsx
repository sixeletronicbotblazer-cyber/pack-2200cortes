'use client'

import { motion } from 'framer-motion'

const BADGES = [
  '+5 mil cortes',
  'Vertical 9:16',
  'Sem marca d\'água',
  'Download no celular ou PC',
  'CapCut · Premiere · DaVinci',
  'Acesso vitalício',
  'Garantia de 7 dias',
]

/** Infinite marquee of feature badges */
export function BadgesMarquee() {
  const items = [...BADGES, ...BADGES]
  return (
    <div className="relative mt-6 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max gap-3 pp-marquee">
        {items.map((b, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-[#f5a524] px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#f5a524] max-[820px]:px-[11px] max-[820px]:py-2 max-[820px]:text-[11px]"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

export function VsBeforeAfter() {
  return (
    <div className="mt-9 grid grid-cols-1 overflow-hidden rounded-[6px] md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
        className="border-t-[3px] border-[#4a4a52] bg-[#0f0f13] p-7 max-[820px]:p-6 max-[820px]:px-5"
      >
        <h3 className="mb-3 font-display text-[24px] font-bold uppercase max-[820px]:text-[20px]">
          Do jeito difícil
        </h3>
        <ul className="grid gap-3 text-[#b9b3a9] max-[820px]:text-[14px]">
          {[
            'Baixar live de horas para aproveitar 3 segundos',
            'Garimpar material bruto antes de começar a editar',
            'Converter, recortar e ajustar cada arquivo',
            'Perder o dia inteiro para entregar um vídeo',
          ].map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-start gap-2"
            >
              <span className="mt-[2px] text-[#777]">✕</span>
              <span>{s}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
        className="relative border-t-[3px] border-[#e11d2e] bg-[#1a0b0e] p-7 max-[820px]:p-6 max-[820px]:px-5"
      >
        {/* diagonal glow sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, transparent 30%, rgba(245,165,36,0.10) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <h3 className="relative mb-3 font-display text-[24px] font-bold uppercase max-[820px]:text-[20px]">
          Com o Pack Política
        </h3>
        <ul className="relative grid gap-3 text-[#d8d3ca] max-[820px]:text-[14px]">
          {[
            'Abre a pasta do tema e escolhe o corte',
            'Cena já em vertical, pronta para a timeline',
            'Edita, legenda e posta no mesmo dia',
            'Mais vídeos publicados na mesma semana',
          ].map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-start gap-2"
            >
              <span className="mt-[2px] grid h-4 w-4 place-items-center rounded-full bg-[#f5a524] text-[10px] font-bold text-[#150d00]">
                ✓
              </span>
              <span>{s}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
