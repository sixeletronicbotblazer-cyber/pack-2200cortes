'use client'

import { motion } from 'framer-motion'

type Props = {
  items: string[]
  /** stagger delay between items in seconds */
  stagger?: number
  className?: string
}

/** Checklist with red check glyphs and staggered entrance */
export function AnimatedChecklist({ items, stagger = 0.1, className }: Props) {
  return (
    <ul className={`grid gap-3.5 ${className ?? ''}`}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            type: 'spring',
            stiffness: 110,
            damping: 18,
            delay: i * stagger,
          }}
          className="relative flex items-start gap-3 pl-[34px] text-[18px] max-[820px]:text-[15px]"
        >
          <span className="absolute left-0 top-[-1px] grid h-6 w-6 place-items-center rounded-full bg-[#e11d2e] text-[14px] font-bold text-white max-[820px]:h-5 max-[820px]:w-5 max-[820px]:text-[12px]">
            ✓
          </span>
          <span className="text-[#e7e2d8]">{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}
