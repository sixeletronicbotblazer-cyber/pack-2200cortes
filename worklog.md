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
