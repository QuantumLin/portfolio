import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import HeroBackdrop from '../components/decor/HeroBackdrop.tsx'
import { HeroSplitStacked } from '../components/decor/HeroSplit.tsx'
import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Button from '../components/ui/Button.tsx'
import LangStack from '../components/ui/LangStack.tsx'
import RichText from '../components/ui/RichText.tsx'
import { PlaceholderMedia } from '../components/ui/Placeholder.tsx'
import { useScrolled } from '../hooks/useScrolled.ts'
import { useLanguage } from '../i18n/languageContext.ts'

const ease = [0.22, 1, 0.36, 1] as const

function HeroSection() {
  const { t } = useLanguage()
  // The looping scroll cue only runs at the very top: once the visitor scrolls it has done
  // its job, and animating it while scrolling is costly without GPU acceleration.
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)
  const scrolled = useScrolled()

  return (
    <section
      ref={sectionRef}
      data-offscreen={inView && !scrolled ? undefined : true}
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden bg-ivory pt-[calc(var(--spacing-nav)+3rem)] pb-20 lg:pt-[calc(var(--spacing-nav)+4rem)] lg:pb-20"
    >
      <HeroBackdrop />

      <Container>
        {/* Columns 2–7 (text) and 8–11 (portrait): one empty column on each side keeps the pair centered */}
        <Grid className="items-center gap-y-16">
          <motion.div
            className="relative col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-2"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <HeroSplitStacked />

            {/* Block as wide as the widest tagline of ALL languages, so the name sits at the
                same position in every language; the active tagline is centered below it
                (from md – phones stay left-aligned because the tagline wraps there). */}
            <div className="w-fit max-w-full">
              <h1 id="home-title" className="font-wonky text-display font-semibold text-galaxy md:text-center">
                Daniel
                <br />
                <span className="text-gradient">Dang</span>
              </h1>

              <LangStack className="mt-8 max-w-xl" itemClassName="md:justify-self-center md:text-center">
                {(tr) => (
                  <p className="text-lg leading-relaxed text-balance text-muted md:text-xl">
                    <RichText text={tr.hero.tagline} />
                  </p>
                )}
              </LangStack>
            </div>

            {/* Button labels differ in length – on narrow phones one language may wrap to two rows */}
            <LangStack className="mt-12">
              {(tr) => (
                <div className="flex flex-wrap gap-4">
                  <Button href="#projects">{tr.hero.primaryCta}</Button>
                  <Button href="#contact" variant="outline">
                    {tr.hero.secondaryCta}
                  </Button>
                </div>
              )}
            </LangStack>
          </motion.div>

          <motion.div
            className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-8"
            initial={{ opacity: 0, y: 32, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <div className="relative mx-auto max-w-56 sm:max-w-64 lg:max-w-xs">
              {/* Orbit: dashed ring with two planets behind the portrait (static – a rotating ring this
                  large is expensive to redraw without GPU acceleration) */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-1/2 rotate-45 rounded-full border border-dashed border-violet/35"
              >
                <span className="absolute top-[14.6%] left-[14.6%] size-4 -translate-1/2 rounded-full bg-teal shadow-[0_0_0_6px] shadow-teal/15" />
                <span className="absolute right-[14.6%] bottom-[14.6%] size-2.5 translate-1/2 rounded-full bg-violet" />
              </div>
              {/* Offset frame, rotated against the image */}
              <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 -rotate-5 rounded-3xl border-2 border-teal/60" />
              <div className="relative rounded-3xl bg-ivory p-2 shadow-2xl shadow-galaxy/15 ring-1 ring-galaxy/10">
                <PlaceholderMedia label={t.hero.portrait} className="aspect-4/5 rounded-[1.25rem]" />
              </div>
              {/* Sticker badge */}
              <div className="absolute -bottom-6 -left-6 -rotate-8 rounded-xl bg-galaxy px-4 py-3 font-sans text-xs font-semibold tracking-[0.2em] text-ivory uppercase shadow-lg shadow-galaxy/30">
                <span className="text-teal-soft">{'</>'}</span> Dev
              </div>
            </div>
          </motion.div>
        </Grid>
      </Container>

      {/* Scroll cue: label + bouncing chevron */}
      <a
        href="#about"
        aria-label={t.a11y.scrollToAbout}
        className="group absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-sans text-[0.65rem] tracking-[0.3em] text-muted uppercase transition-colors hover:text-violet md:flex"
      >
        {t.hero.scroll}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 animate-nudge text-violet motion-reduce:animate-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>

    </section>
  )
}

export default HeroSection
