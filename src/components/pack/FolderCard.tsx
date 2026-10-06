'use client'

import { motion } from 'framer-motion'

type FolderProps = {
  title: string
  subtitle: string
  index: number
}

/** Drive folder card with hover lift and accent line grow */
export function FolderCard({ title, subtitle, index }: FolderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 16,
        delay: (index % 3) * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden border border-[#2f2f36] border-l-[4px] border-l-[#e11d2e] bg-gradient-to-b from-[#101015] to-[#0a0a0d] p-[18px] transition-colors hover:border-[#f5a524]/40 max-[820px]:p-4"
    >
      {/* hover accent sweep */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#f5a524] transition-transform duration-500 group-hover:scale-x-100" />

      {/* folder glyph */}
      <div className="mb-3 flex h-9 w-12 items-end gap-[2px]">
        <div className="h-3 w-4 rounded-t-[3px] bg-[#f5a524]/80" />
        <div className="h-7 w-12 rounded-t-[3px] border border-b-0 border-[#f5a524]/30 bg-[#161619]" />
      </div>

      <b className="block font-display text-[22px] font-bold uppercase leading-none max-[820px]:text-[18px]">
        {title}
      </b>
      <span className="mt-1 block text-[13px] text-[#9a948a] max-[820px]:text-[12px]">
        {subtitle}
      </span>

      {/* arrow nudge */}
      <motion.span
        className="mt-3 inline-block text-[#f5a524]"
        initial={false}
      >
        <motion.span
          className="inline-block"
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          →
        </motion.span>
      </motion.span>
    </motion.div>
  )
}
