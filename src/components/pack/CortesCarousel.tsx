'use client'

/**
 * "Por dentro dos cortes" carousel.
 *
 * - Infinite marquee, right-to-left, list duplicated for seamless loop.
 * - Each card: <img> aspect 9/19.5, 200px mobile / 220px desktop, radius 20px,
 *   border 1px rgba(255,255,255,.08), gap 14px.
 * - Each card takes ~1.5s to pass; loop duration = unique cards × 1.5s.
 * - Hover/touch: pause + card lifts 10px, scale 1.04, red shadow, 200ms.
 * - Edge mask fades both sides.
 * - prefers-reduced-motion: animation off + horizontal scroll-snap.
 *
 * Images live in /public/cortes/. To add more cards, just drop files into the
 * array below — the duration recalculates automatically.
 */
const CORTES = [
  { src: '/cortes/corte-01.png', w: 257, h: 339 },
  { src: '/cortes/corte-02.png', w: 572, h: 941 },
  { src: '/cortes/corte-03.png', w: 276, h: 347 },
  { src: '/cortes/corte-04.png', w: 267, h: 351 },
  { src: '/cortes/corte-05.png', w: 267, h: 355 },
  { src: '/cortes/corte-06.png', w: 266, h: 351 },
  { src: '/cortes/corte-07.png', w: 281, h: 357 },
]

const CARD_TIME_SECONDS = 1.5

export function CortesCarousel() {
  const items = [...CORTES, ...CORTES] // duplicate for seamless loop
  const duration = `${CORTES.length * CARD_TIME_SECONDS}s`

  return (
    <div className="pp-cortes-pause">
      <div className="pp-cortes-track">
        <div
          className="pp-cortes-marquee"
          style={{ animationDuration: duration }}
        >
          {items.map((c, i) => (
            <div key={`${c.src}-${i}`} className="pp-cortes-card">
              <img
                src={c.src}
                alt=""
                width={c.w}
                height={c.h}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
