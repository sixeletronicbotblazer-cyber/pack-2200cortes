'use client'

import { motion } from 'framer-motion'

const MODULES = [
  {
    title: 'Como criar um infoproduto',
    desc: 'Do zero, com o que você já tem em mãos.',
  },
  {
    title: 'Página de vendas simples',
    desc: 'O que oferecer e como apresentar.',
  },
  {
    title: 'O que vender nesta reta final',
    desc: 'Ideias de oferta e de afiliação ligadas ao tema.',
  },
  {
    title: 'Contas no Instagram, TikTok e YouTube Shorts',
    desc: 'Como abrir e organizar sua presença.',
  },
  {
    title: 'Como divulgar seus links',
    desc: 'Onde colocar e como chamar para a ação.',
  },
  {
    title: 'Vídeos animados com IA no Flow',
    desc: 'Crie cenas próprias para complementar os cortes.',
  },
]

export function TrainingModules() {
  return (
    <div className="mt-10">
      {MODULES.map((m, i) => (
        <motion.div
          key={m.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 16,
            delay: i * 0.05,
          }}
          className="group grid grid-cols-[64px_1fr] gap-[18px] border-t border-[#2a2a30] py-[22px] first:border-t-0 max-[820px]:grid-cols-[48px_1fr] max-[820px]:gap-3"
        >
          <motion.div
            className="font-display text-[44px] font-bold leading-none text-[#e11d2e] transition-colors group-hover:text-[#f5a524] max-[820px]:text-[34px]"
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            0{i + 1}
          </motion.div>
          <div>
            <h3 className="mb-1 font-display text-[24px] font-bold uppercase leading-tight max-[820px]:text-[20px]">
              {m.title}
            </h3>
            <p className="text-[#b9b3a9] max-[820px]:text-[14px]">{m.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
