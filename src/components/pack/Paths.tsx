'use client'

import { motion } from 'framer-motion'

const PATHS = [
  {
    num: '01',
    title: 'Viralizar',
    desc: 'Poste cortes em Instagram, TikTok e Shorts e construa audiência com volume e velocidade.',
  },
  {
    num: '02',
    title: 'Vender cortes',
    desc: 'Use o material para criar e oferecer conteúdo para páginas, perfis e criadores do nicho.',
  },
  {
    num: '03',
    title: 'Infoprodutos e afiliação',
    desc: 'Leve essa audiência para uma oferta sua ou para produtos de afiliado ligados ao tema.',
  },
]

export function Paths() {
  return (
    <div className="mt-10 grid grid-cols-1 border-t border-[#2a2a30] md:grid-cols-3">
      {PATHS.map((p, i) => (
        <motion.div
          key={p.num}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            type: 'spring',
            stiffness: 90,
            damping: 16,
            delay: i * 0.12,
          }}
          className={`group relative p-6 md:p-7 ${
            i > 0 ? 'md:border-l md:border-[#2a2a30]' : ''
          } ${i > 0 ? 'border-t md:border-t-0' : ''} border-[#2a2a30]`}
        >
          {/* hover accent line */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#e11d2e] to-[#f5a524] transition-transform duration-500 group-hover:scale-x-100" />

          <motion.div
            className="font-display text-[54px] font-bold leading-none text-[#e11d2e] transition-colors group-hover:text-[#f5a524]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          >
            {p.num}
          </motion.div>
          <h3 className="mb-2 mt-1 font-display text-[25px] font-bold uppercase leading-tight">
            {p.title}
          </h3>
          <p className="text-[#b9b3a9]">{p.desc}</p>

          {/* arrow on hover */}
          <motion.div
            className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#f5a524]/30 text-[#f5a524] opacity-0 transition-opacity group-hover:opacity-100"
            initial={false}
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
