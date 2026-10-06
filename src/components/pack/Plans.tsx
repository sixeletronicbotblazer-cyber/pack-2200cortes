'use client'

import { motion } from 'framer-motion'
import { CTAButton } from './CTAButton'
import { AnimatedCounter } from './AnimatedCounter'

type Plan = {
  name: string
  tag: string
  price: number
  features: string[]
  variant: 'amber' | 'red'
  highlighted?: boolean
  href: string
}

const PLANS: Plan[] = [
  {
    name: 'Inicial',
    tag: 'Inicial',
    price: 14.9,
    features: [
      '300 cortes de política',
      'Acesso pelo Google Drive',
      'Formato vertical pronto',
      'Acesso vitalício',
    ],
    variant: 'red',
    href: '#CHECKOUT_INICIAL',
  },
  {
    name: 'Completo',
    tag: 'Completo · mais escolhido',
    price: 39.9,
    features: [
      '+5 mil cortes de política',
      'Treinamento completo: infoproduto, página, afiliação, contas e divulgação',
      'Vídeos com IA no Flow',
      'Acesso vitalício',
    ],
    variant: 'amber',
    highlighted: true,
    href: '#CHECKOUT_COMPLETO',
  },
]

export function Plans() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
      {PLANS.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            type: 'spring',
            stiffness: 90,
            damping: 16,
            delay: i * 0.12,
          }}
          className={`group relative overflow-hidden border-t-[3px] p-7 ${
            plan.highlighted
              ? 'border-t-[#f5a524] bg-gradient-to-b from-[#1a0b0e] to-[#0d0d11]'
              : 'border-t-[#3a3a42] bg-[#0d0d11]'
          }`}
        >
          {/* glow ring on highlighted */}
          {plan.highlighted && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[2px]"
                style={{
                  background:
                    'linear-gradient(120deg, transparent 30%, rgba(245,165,36,0.25) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2px] shadow-[inset_0_0_60px_rgba(245,165,36,0.18)]"
              />
            </>
          )}

          <div className="relative">
            {plan.highlighted ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5a524] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#150d00]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e11d2e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e11d2e]" />
                </span>
                {plan.tag}
              </span>
            ) : (
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9a948a]">
                {plan.tag}
              </span>
            )}

            <div className="my-2 flex items-end gap-1">
              <span className="font-display text-[18px] text-[#9a948a]">R$</span>
              <AnimatedCounter
                to={plan.price}
                duration={1.6}
                className="font-display text-[64px] font-bold leading-none tabular-nums"
              />
            </div>

            <ul className="my-4 grid gap-2 pl-4 text-[#cfc9bf]">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5a524]" />
                  <span className={plan.highlighted && f.includes('5 mil') ? 'font-bold text-white' : ''}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <CTAButton
                href={plan.href}
                variant={plan.variant}
                className="w-full justify-center"
              >
                Quero o {plan.name}
              </CTAButton>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
