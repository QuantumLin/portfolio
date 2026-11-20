import { motion } from 'motion/react'
import HeroBackdrop from '../components/decor/HeroBackdrop.tsx'
import { HeroSplitStacked } from '../components/decor/HeroSplit.tsx'
import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Button from '../components/ui/Button.tsx'
import LangLabel from '../components/ui/LangLabel.tsx'
import LangStack from '../components/ui/LangStack.tsx'
import RichText from '../components/ui/RichText.tsx'
import { PlaceholderMedia } from '../components/ui/Placeholder.tsx'
import { useLanguage } from '../i18n/languageContext.ts'
import { translations } from '../i18n/translations.ts'

const ease = [0.22, 1, 0.36, 1] as const

function HeroSection() {
  const { t } = useLanguage()
  const cta = {
    primary: { en: translations.en.hero.primaryCta, de: translations.de.hero.primaryCta },
    secondary: { en: translations.en.hero.secondaryCta, de: translations.de.hero.secondaryCta },
  }

  return (
    <section
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

              {/* Centered under the tagline (from md). Each label is as wide as its longest
                  translation (LangLabel), so the buttons sit at the same spot in every language. */}
              <div className="mt-12 flex flex-wrap gap-4 md:justify-center">
                <Button href="#projects">
                  <LangLabel text={cta.primary} />
                </Button>
                <Button href="#contact" variant="outline">
                  <LangLabel text={cta.secondary} />
                </Button>
              </div>
            </div>
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

      {/* Static scroll arrow along the left screen edge (no animation – cheap to render) */}
      <a
        href="#about"
        aria-label={t.a11y.scrollToAbout}
        className="group absolute bottom-4 left-3 hidden flex-col items-center text-violet md:flex xl:left-6"
      >
        <span aria-hidden className="h-32 w-0.5 rounded-full bg-linear-to-b from-violet/0 via-violet/80 to-violet lg:h-44" />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-mt-3.5 size-6 transition-transform duration-300 group-hover:translate-y-1"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}

export default HeroSection
