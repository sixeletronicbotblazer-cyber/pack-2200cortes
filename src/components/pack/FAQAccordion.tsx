'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'Qual a diferença entre o Inicial e o Completo?',
    a: 'O Inicial traz 300 cortes de uma seleção reduzida. O Completo traz mais de 5 mil cortes, recursos extras e atualizações previstas. Os dois incluem os seis módulos.',
  },
  {
    q: 'Como recebo?',
    a: 'Por link do Google Drive, liberado após a confirmação do pagamento.',
  },
  {
    q: 'Posso usar em qualquer editor?',
    a: 'Sim. Os arquivos funcionam no CapCut, Premiere, DaVinci ou qualquer outro editor de vídeo.',
  },
  {
    q: 'Isso garante que vou vender?',
    a: 'Não. O pack entrega o material e o treinamento mostra o caminho. O resultado depende da sua execução e do mercado.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Você tem 7 dias de garantia incondicional. Não ficou satisfeito? Devolvemos seu dinheiro.',
  },
  {
    q: 'Por quanto tempo tenho acesso?',
    a: 'Acesso vitalício. O material fica disponível no seu Google Drive mesmo após a eleição.',
  },
  {
    q: 'O acesso acaba depois do segundo turno?',
    a: 'Não. O acesso é vitalício e continua após 25/10/2026. O que acaba é o pico de atenção da eleição.',
  },
]

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-[760px]">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 16 }}
        className="mb-7 font-display text-[clamp(28px,4vw,48px)] font-bold leading-tight max-[820px]:text-[clamp(24px,7vw,32px)]"
      >
        Dúvidas
      </motion.h2>

      <div className="divide-y divide-[#2a2a30] border-y border-[#2a2a30]">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className="overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left max-[820px]:py-4"
                aria-expanded={isOpen}
              >
                <span className="text-[19px] font-semibold text-[#f3efe8] max-[820px]:pr-6 max-[820px]:text-[17px]">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#f5a524]/50 text-[#f5a524]"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-10 text-[#b9b3a9]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
