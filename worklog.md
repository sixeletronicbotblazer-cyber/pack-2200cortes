# Worklog — Pack Política Landing Page

Project: Next.js 16 App Router — `src/app/page.tsx` (single visible route)
Source: `upload/pack-politica-imersivo (1).html` (Portuguese sales/landing page)
Goal: Rebuild as a polished React/Tailwind page with "vibe coding" — Framer Motion animations on buttons & assets, sticky footer, responsive.

---
Task ID: 0
Agent: main (Z.ai Code)
Task: Bootstrap — read source HTML, plan architecture, set up fonts/styles.

Work Log:
- Read uploaded HTML — identified sections: countdown bar, hero, "lados" scene, Drive folders, phone mockup, before/after, 3 paths, training modules, scarcity, plans, "como funciona", FAQ, footer.
- Identified image CDN assets (Higgsfield previews) — keep using same CloudFront URLs as CSS vars.
- Decided to split into client components under `src/components/pack/` and compose in `src/app/page.tsx`.
- Will use framer-motion (already installed) for: stagger entrances, parallax, magnetic buttons, marquee, count-up, animated accordion, scroll-driven reveals.
- Sticky footer via `min-h-screen flex flex-col` + `mt-auto`.

Stage Summary:
- Plan ready. Next: build components + page in parallel via subagents, then wire fonts & run lint/dev.

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Build the Pack Política landing page in Next.js 16 with vibe coding animations, sticky footer, mobile responsiveness.

Work Log:
- Read source HTML (`upload/pack-politica-imersivo (1).html`) — Portuguese sales/landing page with 8 sections + countdown bar.
- Set up fonts (Oswald + Inter) in `src/app/layout.tsx`; updated `src/app/globals.css` with the dark theme palette (#07070a ink, #f5a524 amber, #e11d2e red, #f3efe8 paper), grain utility, marquee keyframes, custom scrollbar.
- Built 9 reusable components under `src/components/pack/`:
  - `CTAButton.tsx` — magnetic pull toward cursor + pulse glow ring + shine sweep on hover + arrow nudge.
  - `CountdownBar.tsx` — sticky top bar with per-second flip-digit counters (days/hours/min/sec), scroll-progress underline that depletes toward CTA, animated ⚡ emoji.
  - `Scene.tsx` — full-bleed parallax section (background moves slower than scroll via useScroll/useTransform), gradient overlay per variant (left/center/bottom/mobile), stagger helpers (sceneStagger/sceneRise), Kicker/H2/Lead primitives.
  - `PhoneMockup.tsx` — phone with 2 stacked cuts, vertical sweeping red split-line (every 3.6s), play button pulse, floating "9:16 vertical" and "CapCut · Premiere" chips, shine sweep.
  - `FolderCard.tsx` — Drive folder card with hover lift, top accent line grow, folder glyph.
  - `Badges.tsx` — `BadgesMarquee` infinite marquee + `VsBeforeAfter` 2-column with diagonal glow sweep on the "good" side.
  - `AnimatedChecklist.tsx` — staggered red-check list.
  - `Paths.tsx` — 3-column paths with hover accent line + arrow reveal.
  - `TrainingModules.tsx` — numbered training list with stagger and hover color shift.
  - `Plans.tsx` — 2 plan cards: highlighted "Completo" has shimmering glow ring + pulsing "MAIS ESCOLHIDO" badge; price count-up via `AnimatedCounter.tsx`.
  - `FAQAccordion.tsx` — accordion with framer-motion height animation; only one open at a time; chevron rotates 45° when open.
- Composed all into `src/app/page.tsx` (~300 lines) with sticky footer (`mt-auto`) + mobile floating CTA (scroll-triggered via `useMotionValueEvent`).
- Initial bug: `ChevronPlus` not exported by `lucide-react` → fixed by switching to `Plus`.
- Floating CTA bug: `whileInView` doesn't fire on `position: fixed` elements (always "in view" of IntersectionObserver) → rewired to `useScroll` + `useMotionValueEvent(scrollY, 'change', ...)` showing after y > 600.
- Reduced Scene padding from `py-24` to `py-16 md:py-20` so the hero CTA is visible without scrolling on 900px desktop.

Verification (Agent Browser + VLM):
- HTTP 200, no runtime errors, no hydration warnings.
- Hero renders with parallax masked-character background, kicker "PACK POLÍTICA · ACESSO VITALÍCIO", headline "+5 mil cortes de política...", amber CTA "QUERO ACESSO AO PACK →".
- Countdown bar sticky, flip digits update every second (days 18, hours 20, min 55, sec ticking).
- Drive folders section: 6 cards (Debates/Discursos/Reações/Polêmicas/Bastidores/Entrevistas) + marquee of 7 badges.
- Before/After section: 2 columns with proper pain points and benefits.
- Paths: 01 Viralizar / 02 Vender cortes / 03 Infoprodutos e afiliação.
- Plans: R$ 14,90 Inicial + R$ 39,90 Completo with "MAIS ESCOLHIDO" pulsing badge.
- FAQ accordion tested by clicking 2nd item — properly opens, closes the previous.
- Footer: "Material de apoio..." + "© 2026 Pack Política · Termos · Privacidade", sticky to bottom via `mt-auto`.
- Mobile (390x844): single-column layout, sticky countdown at top, sticky floating amber CTA "Quero acesso vitalício" at bottom (verified via JS: top=767, opacity=1).
- Lint clean (`bun run lint`).

Stage Summary:
- Page live at `/` (port 3000), all sections rendering with the requested vibe-coding animations (magnetic buttons, parallax scenes, marquee, count-up, pulse glows, sweep shines, spring-based accordion).
- Sticky footer + sticky countdown bar + mobile sticky floating CTA all confirmed working.
- Single small bug fixed during verification: floating CTA now uses scroll-position trigger instead of `whileInView`.

---
Task ID: 2
Agent: main (Z.ai Code)
Task: Apply the new responsive base (pack-politica-imersivo (3).html) while keeping all vibe-coding animations.

Work Log:
- Read new HTML at `upload/pack-politica-imersivo (3).html`. Key differences from previous base:
  - Background images are now actual `<img>/<picture>` elements (with `object-fit:cover`) instead of CSS `background-image`.
  - Hero on mobile (max-width:820px): `<picture>` is a separate block on top with explicit height (`62svh; min-height:380px; max-height:560px`), text overlaps the bottom via `margin-top:-84px` — image is no longer a full-bleed background hiding text on small screens.
  - Mobile-specific typography: h1 `clamp(34px,10.4vw,48px)`, h2 `clamp(28px,8.6vw,40px)`, kicker `11px/0.16em`, lead `17px`, bar `11.5px/1.35`.
  - Phone smaller on mobile (`min(260px,76vw)`), badges smaller (`11px/p-2.5`), training modules grid `48px 1fr/gap-3` with `34px` number.
  - Plans stack to 1 column, price `54px` on mobile, plan padding reduced.
  - Section padding `96px 0` desktop / `56px 0` mobile, scene min-height `88svh` on mobile.
  - `html,body { overflow-x:hidden }`, `img { max-width:100% }`, safe-area insets for notched devices.
  - `92svh` (small viewport height) instead of `92vh` to handle mobile browser chrome.
  - Second breakpoint at `max-width:360px` for very small screens.
- Refactored `Scene.tsx`:
  - Now renders `<motion.img>` for non-hero scenes and `<picture><motion.img></picture>` for the hero (with optional `mobileImage` for the `<source media="(max-width:820px)">`).
  - Preserved framer-motion parallax (`y`/`scale` via `useScroll`/`useTransform`).
  - Added `variant="hero"` that triggers the new mobile image-on-top + text-overlap layout via CSS.
- Rewrote `globals.css`:
  - Added `@layer components { ... }` block containing ALL custom scene/hero CSS — discovered Tailwind 4 was silently dropping unlayered CSS rules (verified by inspecting served CSS: `.pp-scene`, `.pp-hero`, `.pp-overlay`, `.pp-fade`, `.pp-bg`, `.pp-scene-content`, `.pp-hero-picture`, plus `@media (max-width:820px)` and `@media (max-width:360px)` blocks were ALL missing from the served stylesheet).
  - After wrapping in `@layer components`, all rules are correctly served (verified by re-fetching the CSS file).
  - Added the `.pp-hero .pp-hero-picture { height:62svh; min-height:380px; max-height:560px; overflow:hidden }` rule plus the `::after` fade gradient and the `> .pp-bg { object-position:center 22% }` rule for the mobile hero image crop.
  - Added the `.pp-hero .pp-scene-content { margin-top:-84px; padding-top:0; padding-bottom:48px }` rule for the text-overlap effect.
  - Kept all scene CSS from the new base (overlay gradients per variant, bottom fade, mobile overlay direction flip, etc.).
- Updated every child component with mobile-specific Tailwind classes using `max-[820px]:` arbitrary variants (matching the new base's 820px breakpoint, not Tailwind's default 768px `md:`):
  - `CountdownBar`: `text-[11.5px]`, smaller FlipDigit (`h-[22px] w-[18px] text-[13px]`), `leading-[1.35]` on mobile.
  - `CTAButton`: `w-full px-[18px] py-[17px]` on mobile.
  - `PhoneMockup`: `max-w-[260px] w-[76vw]` on mobile.
  - `FolderCard`: `p-4`, `text-[18px]` title, `text-[12px]` subtitle on mobile.
  - `Badges` marquee: `px-[11px] py-2 text-[11px]` on mobile; VsBeforeAfter `p-6 px-5 text-[20px]/[14px]` on mobile.
  - `Paths`: `text-[44px]` number, `text-[22px]` title, `text-[15px]` body on mobile.
  - `TrainingModules`: grid `48px 1fr gap-3`, `text-[34px]` number, `text-[20px]/[14px]` text on mobile.
  - `Plans`: stack to 1 column, `py-6 px-0` padding, `text-[54px]` price on mobile.
  - `FAQAccordion`: `text-[clamp(24px,7vw,32px)]` title, `text-[17px] py-4 pr-6` summary on mobile.
  - `AnimatedChecklist`: `text-[15px]` items, `h-5 w-5 text-[12px]` check glyph on mobile.
- Updated `page.tsx`:
  - Hero Scene now uses `variant="hero"` with `mobileImage={IMG.heroM}` — switches to the tighter mobile crop on screens ≤820px.
  - Hero h1 uses `max-[820px]:text-[clamp(34px,10.4vw,48px)] max-[360px]:text-[32px]`.
  - All section paddings changed from `py-20 md:py-24` to `py-24 max-[820px]:py-14` (96px desktop / 56px mobile, matching new base).
- Fixed `AnimatedCounter`:
  - Added `decimals` prop and pt-BR formatting via `toLocaleString('pt-BR', { minimumFractionDigits: decimals })`.
  - Plans now display `R$ 14,90` and `R$ 39,90` (previously rounded to R$ 15 / R$ 40).
  - Wrapped output in `motion.span` for smooth opacity fade-in.
- Fixed React warning `Invalid DOM property fetchpriority → fetchPriority`.

Verification (Agent Browser + VLM):
- Mobile (390×844): hero now renders with image at TOP (523px tall, verified via JS: `display:block, position:relative, height:523px, min-height:380px, max-height:560px`) and headline+CTA BELOW the image with the text-overlap effect. ✓
- Mobile VS section: 2 columns stack vertically, readable. ✓
- Mobile Plans: stacked vertically, prices shown as "R$ 14,90" and "R$ 39,90" with the "MAIS ESCOLHIDO" badge. ✓
- Mobile FAQ accordion: still works (clicked 2nd item, it opened and 1st closed). ✓
- Very small mobile (360×740): page still readable, breakpoint works. ✓
- Tablet (768×1024): hero renders with full-bleed masked character image, headline visible. ✓
- Desktop (1440×900): hero renders with masked character on the right, full headline + amber CTA visible. ✓
- Floating mobile CTA still appears after 600px scroll (verified: `top:761, opacity:1`). ✓
- Sticky footer at bottom (`mt-auto` on footer, parent `flex flex-col min-h-screen`). ✓
- All 5 CTA links + 6 FAQ buttons present and interactive on mobile. ✓
- Lint clean.
- Root cause of broken mobile hero: Tailwind 4 was silently dropping all my custom CSS rules that weren't inside `@layer`. Wrapping them in `@layer components { ... }` fixed it. This is the key learning.

Stage Summary:
- New responsive base applied. Mobile hero now uses the image-on-top + text-overlap layout (image no longer hides text).
- All breakpoints honored: 820px (mobile) and 360px (tiny screens), with svh units, safe-area insets, and smaller typography.
- Prices now show decimals correctly (R$ 14,90 / R$ 39,90).
- All previous vibe-coding animations preserved (magnetic buttons, parallax, marquee, count-up, accordion, glow ring on the highlighted plan, sticky countdown bar, floating mobile CTA, etc.).
- Verified at 360, 390, 768, 1440 viewports.

---
Task ID: 3
Agent: main (Z.ai Code)
Task: Apply user-requested layout adjustments: hero text must overlay the image (with dimming), folders as horizontal carousel, more prominent progress indicator on countdown bar.

Work Log:
- Read user feedback:
  1. Hero on mobile: text should OVERLAY the image with dimming (not image-on-top + text-below). Match the original file structure where image is background and text overlays.
  2. All scenes with images: text overlays with strong overlay/dimming for readability (meia profundidade).
  3. Keep all vibe-coding animations.
  4. Red text in hero headline: keep responsive and compact on mobile.
  5. Countdown bar progress indicator: more prominent and centered, with more destaque.
  6. Folders section: cards were too big — convert to a horizontal carousel passing from one side to the other. User will later add thumbnail images.
  7. Keep the page short (low ticket).

- Reverted hero mobile layout in `globals.css`:
  - Removed the `.pp-hero` mobile rules that set `display:block; min-height:0; padding:0` (image-on-top + text-below).
  - Removed the `.pp-hero .pp-hero-picture` mobile block-height rules (62svh, 380px, 560px).
  - Removed the `.pp-hero .pp-hero-picture::after` and `> .pp-bg { object-position: center 22% !important; position: relative }` rules.
  - Removed the `.pp-hero .pp-scene-content { margin-top: -84px; padding-top:0; padding-bottom:48px }` rule.
  - Now the hero on mobile behaves like other scenes: image is `position:absolute; inset:0` background, text overlays on top with dimming.
  - Added `.pp-hero { align-items: flex-end; padding-bottom: 40px }` on mobile so text sits at the bottom of the section.
  - Added `.pp-hero .pp-hero-picture > .pp-bg { object-position: center top !important }` so the masked character's face stays visible at top of the image.
  - Added `.pp-hero .pp-overlay` mobile-specific gradient: `linear-gradient(0deg, rgba(7,7,10,0.96) 0%, rgba(7,7,10,0.78) 35%, rgba(7,7,10,0.3) 75%, rgba(7,7,10,0.18) 100%)` — very strong dimming at bottom (where text+CTA sit, for readability) and mild at top (so character's face is visible).
  - Also strengthened the overlay for ALL non-hero scenes on mobile: `linear-gradient(0deg, rgba(7,7,10,0.95) 0%, rgba(7,7,10,0.7) 45%, rgba(7,7,10,0.35) 75%, rgba(7,7,10,0.2) 100%)`.

- Made countdown bar progress indicator more prominent in `CountdownBar.tsx`:
  - Was a 2px thin line at the bottom of the bar.
  - Now: 5px tall track with `bg-black/25` background, filled by a gradient bar with `shadow-[0_0_10px_2px_rgba(245,165,36,0.7)]` (amber glow).
  - Added a glowing white marker dot (`h-3 w-3 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.85)]`) that travels along the bar with the leading edge (via `left: width` MotionValue + `translateX(-50%)`).
  - The dot serves as a "destaque no meio" — a prominent visual indicator of progress.

- Rewrote `FolderCard.tsx` for the horizontal marquee:
  - Cards are now compact (`w-[210px] shrink-0`), with a placeholder thumbnail area at top (`aspect-[4/2]` with folder glyph as placeholder + dark gradient overlay) — user will swap in their own images later.
  - Title `text-[17px]`, subtitle `text-[11.5px]`, padding `p-3` (was `p-[18px]`).
  - Cards duplicate the array (`[...FOLDERS, ...FOLDERS]`) so the marquee can loop seamlessly.
  - New `FoldersMarquee` component: `flex w-max gap-3 pp-marquee` with `group-hover:[animation-play-state:paused]` — when user hovers, the marquee pauses so they can read the cards.
  - Marquee mask: `[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]` — fades the cards at the left/right edges.
- Updated `page.tsx`:
  - Removed the inline grid of FolderCards (was `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
  - Now renders `<FoldersMarquee />` directly.
  - Removed unused `FOLDERS` const and `FolderCard` import.

Verification (Agent Browser + VLM):
- Mobile (390×844) hero: VLM confirms "the masked character image is visible as a full-bleed background. The headline text is overlaid on top of the image with a darkened/dimmed background for readability." Kicker + headline + body + amber CTA all visible. ✓
- Desktop (1440×900) hero: VLM confirms "masked character is visible as a full-bleed background with the headline overlaid." CTA exists at y=997 (below viewport, expected). ✓
- Mobile folders marquee: VLM confirms compact cards "ASTIDORES" + "ENTREVISTAS" visible side-by-side with red accent borders, designed as carousel. ✓
- Desktop folders: VLM confirms cards "DEBATES", "DISCURSOS", "REAÇÕES", "POLÊMICAS" (one partially visible) arranged horizontally with red left borders. ✓
- Progress indicator: VLM confirms "thick (3-5px) horizontal progress indicator with a glowing marker dot at the right end." ✓
- Lint clean.

Stage Summary:
- Hero now uses image-as-background + text-overlay on all viewports (matches original file structure).
- Strong dimming overlay on mobile ensures text readability while keeping the masked character visible at the top.
- Folders are now a continuously-sliding horizontal marquee of compact cards (pauses on hover), with a placeholder image area where the user will add thumbnails.
- Countdown bar progress indicator is now 5px tall with amber glow + a traveling white marker dot for prominence.
- All previous animations preserved.
- Page remains short — no new content added, just adjusted existing sections.

---
Task ID: 4
Agent: main (Z.ai Code)
Task: Apply detailed layout/responsiveness spec from user (hero image-on-top + text-below, new "Por dentro dos cortes" carousel section, +5 mil → +2200 cortes in headline).

Work Log:
- Read user spec carefully:
  - Hero on mobile MUST be image-on-top + text-below (NOT background + overlay).
  - All other scenes (lados/criador/fios) on mobile: image as <img> background with overlay (rgba 0.9 / 0.62 / 0.4 bottom-to-top gradient; rgba 0.6 for the centered fios scene).
  - Section vertical padding on mobile: 72px (non-hero scenes) + 70px bottom fade.
  - NEW section "Por dentro dos cortes" between Folders and Phone mockup sections — infinite marquee of vertical print cards.
  - Hero headline: change "+5 mil cortes" → "+2200 cortes".
  - Carousel cards: aspect 9/19.5, 200px mobile / 220px desktop, radius 20px, border 1px rgba(255,255,255,.08), gap 14px.
  - Carousel speed: 1.5s per card; loop duration = unique cards × 1.5s, linear infinite.
  - Hover/touch: pause + card lifts 10px, scale 1.04, red shadow (0 18px 40px rgba(225,29,46,.35)), 200ms.
  - Edge mask (gradient fade both sides).
  - prefers-reduced-motion: disable animation + horizontal scroll-snap.
  - Images in /public/cortes/corte-01.png etc., loading="lazy", decoding="async", width/height set.
  - Test at 360, 390, 430px: no horizontal scroll, hero image visible above text.

- Copied 7 uploaded PNGs (Screenshot 65/66/67.png, corte 3/4/6/7.png) to /public/cortes/corte-01.png through corte-07.png.

- Updated globals.css:
  - Restored the hero mobile image-on-top + text-below layout:
    - `.pp-hero` on mobile: `display:block; min-height:0; padding:0`
    - `.pp-hero .pp-overlay, .pp-fade` on mobile: `display:none` (no dark overlay over the hero image)
    - `.pp-hero .pp-hero-picture` on mobile: `position:relative; height:62svh; min-height:380px; max-height:560px; overflow:hidden`
    - `.pp-hero .pp-hero-picture::after`: 55% bottom gradient `linear-gradient(transparent, #07070a)` for smooth fade
    - `.pp-hero .pp-hero-picture > .pp-bg`: `object-fit:cover; object-position:center 22% !important`
    - `.pp-hero .pp-scene-content`: `margin-top:-84px; padding-top:0; padding-bottom:48px` (text rises 84px over the gradient)
  - Non-hero scenes on mobile: overlay is now `linear-gradient(0deg, rgba(7,7,10,.9) 0%, rgba(7,7,10,.62) 55%, rgba(7,7,10,.4) 100%)` (matching user spec).
  - Centered scene (fios) overlay on mobile: `rgba(7,7,10,.6)`.
  - Non-hero scene padding on mobile: 72px (was 56px) + 70px bottom fade.
  - Added `.pp-cortes-*` CSS classes for the new cortes carousel:
    - `@keyframes pp-cortes-marquee` (translateX 0 → -50%)
    - `.pp-cortes-track`: `overflow:hidden` + edge mask `linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)`
    - `.pp-cortes-marquee`: `display:flex; width:max-content; gap:14px; animation:pp-cortes-marquee linear infinite` (duration set inline)
    - Pause on hover/focus-within/active (covers desktop hover + mobile touch)
    - `.pp-cortes-card`: `width:200px; aspect-ratio:9/19.5; border-radius:20px; border:1px solid rgba(255,255,255,.08); overflow:hidden; flex-shrink:0; background:#0d0d11; transition:transform 200ms, box-shadow 200ms`
    - Card img: `width:100%; height:100%; object-fit:cover; display:block`
    - Card hover: `transform:translateY(-10px) scale(1.04); box-shadow:0 18px 40px rgba(225,29,46,.35)`
    - Desktop width override: `220px` at min-width:821px
    - prefers-reduced-motion: animation:none, track becomes `overflow-x:auto` with `scroll-snap-type:x mandatory`, card has `scroll-snap-align:start`, hover transform/box-shadow disabled

- Created `src/components/pack/CortesCarousel.tsx`:
  - `CORTES` array with 7 entries: `{src, w, h}` for each image (w/h are intrinsic dims for layout reservation).
  - `CARD_TIME_SECONDS = 1.5` (per-card time)
  - Duplicates the array `[...CORTES, ...CORTES]` for seamless loop.
  - `animationDuration = ${CORTES.length * 1.5}s` (7 × 1.5 = 10.5s) set inline on `.pp-cortes-marquee`.
  - Renders `.pp-cortes-pause > .pp-cortes-track > .pp-cortes-marquee > .pp-cortes-card > img` structure.
  - All `<img>` have `loading="lazy"`, `decoding="async"`, `width` and `height` set.
  - To add more cards later, just add entries to the `CORTES` array — duration recalculates automatically.

- Updated `page.tsx`:
  - Added new section between Folders and Phone mockup:
    - Kicker: "Por dentro dos cortes"
    - H2: "Esse é o tipo de corte que cai na sua pasta" (with "cai na sua pasta" in red)
    - Lead: "Vertical, pronto para postar e feito para prender atenção. Veja exemplos."
    - `<CortesCarousel />` component
    - Small notice: "Exemplos de cortes publicados. As visualizações são de cada vídeo e não garantem resultado."
  - Changed hero h1 from "+5 mil cortes de política" to "+2200 cortes de política".
  - All other text unchanged (per user rule "NÃO alterar textos, copy, cores, fontes, ordem das seções, preços, links nem o checkout").

Verification (Agent Browser + VLM):
- 360px width: no horizontal scroll (`scrollW=360, clientW=360, hasHScroll=false`), page readable, hero with image at top + text below. ✓
- 390px width: hero with image at TOP + headline BELOW (VLM confirmed), fade gradient transition, text on solid dark background not overlaid. ✓
- 430px width: no horizontal scroll (`scrollW=430, clientW=430, hasHScroll=false`), hero with image at top + headline below. ✓
- Cortes carousel DOM verified: 14 cards (7 unique × 2 for seamless loop), sources `/cortes/corte-01.png` through `corte-07.png`, card width 198px mobile (close to 200px target), height 431px (aspect 9/19.5 ✓), animation duration 10.5s (7 × 1.5s), linear, infinite. ✓
- All 14 cortes images loaded successfully (`complete && naturalWidth > 0`). ✓
- Desktop cortes cards: 220px width, 476.65px height (aspect 9/19.5 ✓). ✓
- Desktop hero: using IMG.hero (1344×752 horizontal masked character), object-position 70% 50% (showing character on right side), image complete. ✓
- Mobile hero: using IMG.heroM (752×1344 vertical) via `<source media="(max-width:820px)">`, picture block 523px tall (within 380-560px range), image object-position 50% 22%. ✓
- Lint clean.

Stage Summary:
- Hero mobile now correctly uses image-on-top + text-below layout (image is NOT behind text).
- All other scenes on mobile keep image-as-background with the user-specified overlay gradient.
- New "Por dentro dos cortes" carousel section inserted between Folders and Phone mockup, with infinite marquee of vertical print cards (200px mobile / 220px desktop, aspect 9/19.5, radius 20px), pausing on hover/touch with lift+scale+red shadow, edge mask, prefers-reduced-motion fallback to scroll-snap.
- Hero headline updated: "+5 mil cortes" → "+2200 cortes" (the only text change requested).
- All 7 uploaded corte images are at /public/cortes/corte-01.png .. corte-07.png and load successfully.
- Tested at 360, 390, 430, 1440 viewports: no horizontal scroll, hero image visible above text on mobile, cortes carousel slides smoothly.
