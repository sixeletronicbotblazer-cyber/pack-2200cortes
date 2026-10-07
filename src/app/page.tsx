'use client'

import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { CountdownBar } from '@/components/pack/CountdownBar'
import { CTAButton } from '@/components/pack/CTAButton'
import { Scene, Kicker, H2, Lead, sceneStagger, sceneRise } from '@/components/pack/Scene'
import { PhoneMockup } from '@/components/pack/PhoneMockup'
import { FoldersMarquee } from '@/components/pack/FolderCard'
import { CortesCarousel } from '@/components/pack/CortesCarousel'
import { BadgesMarquee, VsBeforeAfter } from '@/components/pack/Badges'
import { AnimatedChecklist } from '@/components/pack/AnimatedChecklist'
import { Paths } from '@/components/pack/Paths'
import { TrainingModules } from '@/components/pack/TrainingModules'
import { Plans } from '@/components/pack/Plans'
import { FAQAccordion } from '@/components/pack/FAQAccordion'

const IMG = {
  hero:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223935_4102cda4-738f-467e-94c3-227b39d1d1a0.png',
  heroM:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223934_ef3d11c0-93fd-4885-9ab6-2da04917f71b.png',
  lados:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223935_85b1c577-135a-41ab-b956-db9142ff0892.png',
  fios:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223933_de1bb94d-b21d-4849-b914-9482ef3e77c9.png',
  criador:
    'https://d8j0ntlcm91z4.cloudfront.net/user_36U380bZTAtVPkVynbGYAmiPX5F/hf_20261006_223934_63580822-f1cc-4da4-8f3c-ec8769f31276.png',
}

export default function PackPoliticaPage() {
  const { scrollY } = useScroll()
  const [showFloating, setShowFloating] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    setShowFloating(y > 600)
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-[#f3efe8] pp-grain">
      <CountdownBar />

      {/* 1. HERO */}
      <Scene image={IMG.hero} mobileImage={IMG.heroM} variant="hero">
        <motion.div variants={sceneStagger} initial="hidden" animate="show" className="max-w-[12em] max-[820px]:max-w-none">
          <Kicker>Pack Política · acesso vitalício</Kicker>
          <motion.h1
            variants={sceneRise}
            className="font-display text-[clamp(40px,7.2vw,88px)] font-bold leading-[1.02] tracking-[0.01em] max-[820px]:text-[clamp(32px,9.6vw,44px)] max-[430px]:text-[clamp(30px,9vw,40px)] max-[360px]:text-[28px]"
          >
            Mais de 5 mil cortes de política para criar conteúdo.
          </motion.h1>
          <Lead>
            Acesse o acervo, escolha seus vídeos e siga seis módulos para montar sua conta, criar uma
            oferta ou divulgar como afiliado.
          </Lead>
          <motion.div variants={sceneRise} className="mt-7 max-[820px]:mt-6">
            <CTAButton href="#planos">Quero ver o pack</CTAButton>
          </motion.div>
          <motion.p variants={sceneRise} className="mt-3.5 text-[13px] text-[#9a948a]">
            Entrega por link do Google Drive · garantia de 7 dias
          </motion.p>
        </motion.div>
      </Scene>

      {/* 2. FRASE CONTEXTUAL logo abaixo do hero */}
      <section className="bg-[#07070a] py-7 max-[820px]:py-5">
        <div className="pp-wrap">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
            className="mx-auto max-w-[40em] text-center text-[16px] leading-relaxed text-[#d8d3ca] max-[820px]:text-[14.5px] max-[820px]:leading-[1.55]"
          >
            O segundo turno é em 25 de outubro. Se você quer publicar durante essa conversa, comece
            a preparar seu conteúdo e sua oferta agora.
          </motion.p>
        </div>
      </section>

      {/* 3. ACERVO TANGÍVEL — Veja o que cai no seu Drive */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          >
            <Kicker>Veja o que cai no seu Drive</Kicker>
            <H2>
              Abriu o Drive, achou o corte, <em className="not-italic text-[#e11d2e]">arrastou pra timeline.</em>
            </H2>
            <Lead>
              Nada de baixar live de 3 horas para aproveitar 3 segundos. Os cortes chegam separados
              por tema e momento, no formato vertical, direto no editor.
            </Lead>
          </motion.div>

          <div className="mt-2">
            <FoldersMarquee />
          </div>

          <BadgesMarquee />
        </div>
      </section>

      {/* 4. POR QUE POLÍTICA AGORA */}
      <Scene image={IMG.lados}>
        <motion.div variants={sceneStagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <Kicker>Por que política agora</Kicker>
          <H2>
            O segundo turno coloca o assunto <em className="not-italic text-[#e11d2e]">no feed de todo mundo.</em>
          </H2>
          <Lead>
            Quem tem vídeo pronto publica enquanto os outros ainda procuram material. O pack encurta
            o caminho entre a ideia e o post.
          </Lead>
        </motion.div>
      </Scene>

      {/* 5. COMO SÃO OS CORTES — carrossel de prints */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          >
            <Kicker>Por dentro dos cortes</Kicker>
            <H2>
              Esse é o tipo de corte que <em className="not-italic text-[#e11d2e]">cai na sua pasta</em>
            </H2>
            <Lead>
              Vertical, no formato que posta, com gancho desde o primeiro segundo. Veja exemplos.
            </Lead>
          </motion.div>

          <div className="mt-7">
            <CortesCarousel />
          </div>

          <p className="mt-6 text-[13px] text-[#9a948a]">
            Exemplos de cortes publicados. As visualizações são de cada vídeo e não garantem resultado.
          </p>
        </div>
      </section>

      {/* 6. DEMONSTRAÇÃO — Como funciona o arquivo (mockup do celular) */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <PhoneMockup />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          >
            <Kicker>Como funciona o arquivo</Kicker>
            <H2>
              Abra a pasta, escolha o corte, leve para o editor e{' '}
              <em className="not-italic text-[#e11d2e]">publique com sua abordagem.</em>
            </H2>
            <div className="mt-5">
              <AnimatedChecklist
                items={[
                  'Pastas no Google Drive: ache a cena em segundos',
                  'Funciona no CapCut, Premiere, DaVinci ou qualquer editor',
                  'Acesso vitalício, sem assinatura',
                  'Treinamento passo a passo (abaixo)',
                ]}
              />
            </div>
            <p className="mt-4 text-[12px] text-[#7d786f]">
              Prévia ilustrativa. Os cortes reais estão no Drive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. COMPARAÇÃO — Com pack vs. sem pack */}
      <section className="bg-[#0d0d11] py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <Kicker>Por que o pack</Kicker>
          <H2>
            Com o pack vs. <em className="not-italic text-[#e11d2e]">sem o pack</em>
          </H2>
          <VsBeforeAfter />
        </div>
      </section>

      {/* 8. O QUE FAZER COM OS CORTES — três caminhos */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <Kicker>O que fazer com os cortes</Kicker>
          <H2>
            Três caminhos para <em className="not-italic text-[#e11d2e]">usar o material.</em>
          </H2>
          <Lead>
            O pack entrega o arquivo. O treinamento mostra como publicar, oferecer ou afiliar.
          </Lead>
          <Paths />
          <p className="mt-3.5 text-[13px] text-[#9a948a]">
            O resultado depende da sua execução e do mercado. Não há garantia de ganhos.
          </p>
          <div className="mt-7">
            <CTAButton href="#planos">Quero começar agora</CTAButton>
          </div>
        </div>
      </section>

      {/* 9. TREINAMENTO — seis módulos */}
      <Scene image={IMG.criador}>
        <motion.div
          variants={sceneStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl"
        >
          <Kicker>Treinamento incluso</Kicker>
          <H2>
            Seis módulos do corte à <em className="not-italic text-[#e11d2e]">oferta</em>
          </H2>
          <TrainingModules />
        </motion.div>
      </Scene>

      {/* 10. ACESSO PELO DRIVE — Como você recebe */}
      <section className="bg-[#0d0d11] py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <Kicker>Como você recebe</Kicker>
          <H2>
            Pagou, recebeu o <em className="not-italic text-[#e11d2e]">link do Drive</em>
          </H2>
          <div className="mt-5">
            <AnimatedChecklist
              items={[
                'Pagamento confirmado: o acesso é liberado',
                'Abra o link do Google Drive no celular ou no computador',
                'Escolha os cortes e monte seu vídeo',
              ]}
            />
          </div>
        </div>
      </section>

      {/* 11. PRAZO ELEITORAL */}
      <Scene image={IMG.fios} variant="center" minH="70vh">
        <motion.div
          variants={sceneStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <Kicker>O prazo é real</Kicker>
          <motion.h2
            variants={sceneRise}
            className="mx-auto font-display text-[clamp(32px,5.4vw,66px)] font-bold leading-[1.02] tracking-[0.01em]"
          >
            O segundo turno é em 25/10/2026. <em className="not-italic text-[#e11d2e]">A conversa acaba depois.</em>
          </motion.h2>
          <Lead className="mx-auto">
            O acesso ao pack é vitalício e continua após a eleição. Mas o pico de atenção acontece
            agora — quem for publicar durante o ciclo precisa começar antes.
          </Lead>
          <motion.div variants={sceneRise} className="mt-7 flex justify-center">
            <CTAButton href="#planos" variant="red">
              Ver os planos
            </CTAButton>
          </motion.div>
        </motion.div>
      </Scene>

      {/* 12. PLANOS */}
      <section id="planos" className="scroll-mt-20 py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          >
            <Kicker>Ofertas</Kicker>
            <H2>
              Pagamento único. <em className="not-italic text-[#e11d2e]">Acesso vitalício.</em>
            </H2>
          </motion.div>
          <Plans />
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] text-[#9a948a]">
            Garantia incondicional de 7 dias. Não garantimos resultado financeiro: o resultado depende
            do seu esforço, da sua divulgação e do mercado.
          </p>
        </div>
      </section>

      {/* 13. DÚVIDAS — FAQ */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <FAQAccordion />
        </div>
      </section>

      {/* Footer — sticky to bottom */}
      <footer className="mt-auto border-t border-[#2a2a30] bg-[#07070a] py-12 pb-20 text-center text-[13px] text-[#7d786f]">
        <div className="pp-wrap">
          <p>
            Material de apoio para criação de conteúdo. Sem vínculo com partidos, candidatos ou órgãos
            públicos. Sem promessa de ganho.
          </p>
          <p className="mt-2">© 2026 Pack Política · Termos · Privacidade</p>
        </div>
      </footer>

      {/* Floating CTA on mobile */}
      <motion.div
        initial={false}
        animate={{ y: showFloating ? 0 : 120, opacity: showFloating ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f5a524]/20 bg-[#07070a]/95 px-4 py-3 backdrop-blur-sm md:hidden"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <CTAButton href="#planos" variant="amber" className="w-full justify-center text-sm" withArrow={false}>
          Quero ver o pack
        </CTAButton>
      </motion.div>
    </div>
  )
}
