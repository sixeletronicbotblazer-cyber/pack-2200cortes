'use client'

import { motion } from 'framer-motion'

type FolderProps = {
  title: string
  subtitle: string
}

/**
 * Compact folder card sized for the horizontal marquee.
 * Has a placeholder image area at the top — the user will swap in their own thumbnails.
 */
export function FolderCard({ title, subtitle }: FolderProps) {
  return (
    <div className="group relative w-[210px] shrink-0 overflow-hidden rounded-[6px] border border-[#2f2f36] border-l-[4px] border-l-[#e11d2e] bg-gradient-to-b from-[#101015] to-[#0a0a0d] transition-colors hover:border-[#f5a524]/40">
      {/* placeholder thumbnail area — user will replace with real image */}
      <div className="relative aspect-[4/2] w-full overflow-hidden bg-[linear-gradient(135deg,#1a1a22_0%,#0e0e12_60%,#1a0b0e_100%)]">
        {/* folder glyph as placeholder */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex h-7 w-10 items-end gap-[2px]">
            <div className="h-2.5 w-3 rounded-t-[2px] bg-[#f5a524]/70" />
            <div className="h-6 w-10 rounded-t-[2px] border border-b-0 border-[#f5a524]/30 bg-[#161619]" />
          </div>
        </div>
        {/* hover accent sweep */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#f5a524] transition-transform duration-500 group-hover:scale-x-100" />
        {/* subtle gradient overlay for image legibility (when image is added later) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0d]/60 to-transparent" />
      </div>

      {/* title + subtitle */}
      <div className="p-3">
        <b className="block font-display text-[17px] font-bold uppercase leading-none">
          {title}
        </b>
        <span className="mt-1 block text-[11.5px] text-[#9a948a]">{subtitle}</span>
      </div>
    </div>
  )
}

const FOLDERS = [
  { title: 'Debates', subtitle: 'cenas de confronto' },
  { title: 'Discursos', subtitle: 'falas fortes' },
  { title: 'Reações', subtitle: 'momentos de impacto' },
  { title: 'Polêmicas', subtitle: 'assuntos do dia' },
  { title: 'Bastidores', subtitle: 'cenas de bastidor' },
  { title: 'Entrevistas', subtitle: 'trechos para cortar' },
]

/**
 * Horizontal marquee of compact folder cards — passes from one side to the other.
 * Pauses on hover so users can read each card.
 */
export function FoldersMarquee() {
  const items = [...FOLDERS, ...FOLDERS]
  return (
    <div className="group relative mt-7 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className="flex w-max gap-3 pp-marquee group-hover:[animation-play-state:paused]">
        {items.map((f, i) => (
          <FolderCard key={`${f.title}-${i}`} title={f.title} subtitle={f.subtitle} />
        ))}
      </div>
    </div>
  )
}
