'use client'

import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { CountdownBar } from '@/components/pack/CountdownBar'
import { CTAButton } from '@/components/pack/CTAButton'
import { Scene, Kicker, H2, Lead, sceneStagger, sceneRise } from '@/components/pack/Scene'
import { PhoneMockup } from '@/components/pack/PhoneMockup'
import { FolderCard } from '@/components/pack/FolderCard'
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

const FOLDERS = [
  { title: 'Debates', subtitle: 'cenas de confronto' },
  { title: 'Discursos', subtitle: 'falas fortes' },
  { title: 'Reações', subtitle: 'momentos de impacto' },
  { title: 'Polêmicas', subtitle: 'assuntos do dia' },
  { title: 'Bastidores', subtitle: 'cenas de bastidor' },
  { title: 'Entrevistas', subtitle: 'trechos para cortar' },
]

export default function PackPoliticaPage() {
  const { scrollY } = useScroll()
  const [showFloating, setShowFloating] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    // show floating CTA after the user scrolls past the hero CTA
    setShowFloating(y > 600)
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-[#f3efe8] pp-grain">
      <CountdownBar />

      {/* 1. HERO */}
      <Scene image={IMG.hero} mobileImage={IMG.heroM} variant="hero">
        <motion.div variants={sceneStagger} initial="hidden" animate="show" className="max-w-[11.5em] max-[820px]:max-w-none">
          <Kicker>Pack Política · acesso vitalício</Kicker>
          <motion.h1
            variants={sceneRise}
            className="font-display text-[clamp(40px,7.2vw,92px)] font-bold leading-[1.02] tracking-[0.01em] max-[820px]:text-[clamp(34px,10.4vw,48px)] max-[360px]:text-[32px]"
          >
            +5 mil cortes de política para criar conteúdo e{' '}
            <em className="not-italic text-[#e11d2e]">buscar suas primeiras vendas</em>
          </motion.h1>
          <Lead>
            Escolha os cortes, monte seus vídeos e siga o treinamento para criar sua conta, oferecer
            um infoproduto ou vender como afiliado. Você recebe o material <b>e</b> o caminho para
            começar.
          </Lead>
          <motion.div variants={sceneRise} className="mt-7 max-[820px]:mt-6">
            <CTAButton href="#planos">Quero acesso ao pack</CTAButton>
          </motion.div>
          <motion.p variants={sceneRise} className="mt-3.5 text-[13px] text-[#9a948a]">
            Entrega por link do Google Drive · garantia de 7 dias
          </motion.p>
        </motion.div>
      </Scene>

      {/* 2. A virada */}
      <Scene image={IMG.lados}>
        <motion.div variants={sceneStagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <Kicker>Enquanto todo mundo escolhe um lado</Kicker>
          <H2>
            O sistema precisa que você <em className="not-italic text-[#e11d2e]">brigue</em>. A atenção
            gerada vira <em className="not-italic text-[#e11d2e]">audiência</em>.
          </H2>
          <Lead>
            Política mexe com paixão e prende gente. De quatro em quatro anos o assunto toma conta do
            feed, e quem tem vídeo pronto na hora publica enquanto os outros ainda estão procurando
            material.
          </Lead>
        </motion.div>
      </Scene>

      {/* 2b. ENTREGÁVEL TANGÍVEL */}
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
              Nada de garimpar live de 3 horas. Os cortes já vêm separados por tema e momento, em
              vertical, prontos para editar.
            </Lead>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {FOLDERS.map((f, i) => (
              <FolderCard key={f.title} title={f.title} subtitle={f.subtitle} index={i} />
            ))}
          </div>

          <BadgesMarquee />
        </div>
      </section>

      {/* 3. O que vem dentro — split com mockup */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <PhoneMockup />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          >
            <Kicker>O que você recebe</Kicker>
            <H2>
              Cortes prontos. Você só <em className="not-italic text-[#e11d2e]">arrasta e publica</em>.
            </H2>
            <div className="mt-5">
              <AnimatedChecklist
                items={[
                  'Mais de 5 mil cortes verticais organizados por tema e momento',
                  'Pastas no Google Drive: ache a cena em segundos',
                  'Funciona no CapCut, Premiere, DaVinci ou qualquer editor',
                  'Acesso vitalício: compre uma vez',
                  'Treinamento passo a passo (abaixo)',
                ]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3b. ANTES x DEPOIS */}
      <section className="bg-[#0d0d11] py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <Kicker>Por que o pack</Kicker>
          <H2>
            A diferença entre <em className="not-italic text-[#e11d2e]">garimpar</em> e{' '}
            <em className="not-italic text-[#e11d2e]">editar hoje mesmo</em>
          </H2>
          <VsBeforeAfter />
        </div>
      </section>

      {/* 3c. A OPORTUNIDADE */}
      <section className="py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <Kicker>A oportunidade</Kicker>
          <H2>
            Um público <em className="not-italic text-[#e11d2e]">engajado</em>. Três jeitos de
            transformar atenção em renda.
          </H2>
          <Lead>
            Política mobiliza gente de verdade, e a cada eleição o assunto toma conta do feed. Quem tem
            material pronto na hora publica mais e aparece primeiro.
          </Lead>
          <Paths />
          <p className="mt-3.5 text-[13px] text-[#9a948a]">
            O pack entrega o material e o treinamento mostra o caminho. Os resultados dependem da sua
            execução e do mercado, e não há garantia de ganhos.
          </p>
          <div className="mt-7">
            <CTAButton href="#planos">Quero começar agora</CTAButton>
          </div>
        </div>
      </section>

      {/* 4. Treinamento */}
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
            Do corte à <em className="not-italic text-[#e11d2e]">primeira venda</em>: o caminho completo
          </H2>
          <TrainingModules />
        </motion.div>
      </Scene>

      {/* 5. Escassez */}
      <Scene image={IMG.fios} variant="center" minH="70vh">
        <motion.div
          variants={sceneStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <Kicker>A janela não é eterna</Kicker>
          <motion.h2
            variants={sceneRise}
            className="mx-auto font-display text-[clamp(32px,5.4vw,66px)] font-bold leading-[1.02] tracking-[0.01em]"
          >
            Fanatismo dá audiência. E <em className="not-italic text-[#e11d2e]">só volta em 4 anos</em>.
          </motion.h2>
          <Lead className="mx-auto">
            O 2º turno é em 25/10/2026. Depois disso, a atenção cai. Quem quiser aproveitar o momento
            precisa começar agora.
          </Lead>
          <motion.div variants={sceneRise} className="mt-7 flex justify-center">
            <CTAButton href="#planos" variant="red">
              Ver os planos
            </CTAButton>
          </motion.div>
        </motion.div>
      </Scene>

      {/* 6. Planos */}
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

      {/* 7. Como recebo */}
      <section className="bg-[#0d0d11] py-24 max-[820px]:py-14">
        <div className="pp-wrap">
          <Kicker>Como funciona</Kicker>
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

      {/* 8. FAQ */}
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

      {/* Floating CTA on mobile — appears after hero, hides at plans */}
      <motion.div
        initial={false}
        animate={{ y: showFloating ? 0 : 120, opacity: showFloating ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f5a524]/20 bg-[#07070a]/95 px-4 py-3 backdrop-blur-sm md:hidden"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <CTAButton href="#planos" variant="amber" className="w-full justify-center text-sm" withArrow={false}>
          Quero acesso vitalício
        </CTAButton>
      </motion.div>
    </div>
  )
}
