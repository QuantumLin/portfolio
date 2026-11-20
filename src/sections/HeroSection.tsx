import { motion } from 'motion/react'
import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Button from '../components/ui/Button.tsx'
import { PlaceholderMedia } from '../components/ui/Placeholder.tsx'
import HeroBackdrop from '../components/decor/HeroBackdrop.tsx'

const ease = [0.22, 1, 0.36, 1] as const

function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden bg-ivory pt-[calc(var(--spacing-nav)+3rem)] pb-20 lg:pt-(--spacing-nav) lg:pb-16"
    >
      <HeroBackdrop />

      <Container>
        <Grid className="items-center gap-y-16">
          {/* Text: 7 of 12 columns */}
          <motion.div
            className="col-span-4 md:col-span-8 lg:col-span-7"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-galaxy/15 bg-ivory/70 px-4 py-1.5 font-sans text-xs font-medium tracking-[0.2em] text-muted uppercase">
              <span className="size-1.5 rounded-full bg-teal" />
              Portfolio
            </p>

            <h1 id="home-title" className="font-wonky text-display font-semibold text-galaxy">
              Daniel
              <br />
              <span className="text-gradient">Dang</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-balance text-muted md:text-xl">
              Software Developer · Web · Design · Media
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="#projects">View projects</Button>
              <Button href="#contact" variant="outline">
                Find me
              </Button>
            </div>
          </motion.div>

          {/* Image: offset start column for a deliberate asymmetry */}
          <motion.div
            className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, y: 32, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <div className="relative mx-auto max-w-64 sm:max-w-xs lg:max-w-sm">
              {/* Orbit: dashed ring with two planets, slowly rotating behind the portrait */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-1/2 animate-orbit rounded-full border border-dashed border-violet/35 motion-reduce:animate-none"
              >
                <span className="absolute top-[14.6%] left-[14.6%] size-4 -translate-1/2 rounded-full bg-teal shadow-[0_0_0_6px] shadow-teal/15" />
                <span className="absolute right-[14.6%] bottom-[14.6%] size-2.5 translate-1/2 rounded-full bg-violet" />
              </div>
              {/* Offset frame, rotated against the image */}
              <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 -rotate-5 rounded-3xl border-2 border-teal/60" />
              <div className="relative rounded-3xl bg-ivory p-2 shadow-2xl shadow-galaxy/15 ring-1 ring-galaxy/10">
                <PlaceholderMedia label="Portrait" className="aspect-4/5 rounded-[1.25rem]" />
              </div>
              {/* Sticker badge */}
              <div className="absolute -bottom-6 -left-6 -rotate-8 rounded-xl bg-galaxy px-4 py-3 font-sans text-xs font-semibold tracking-[0.2em] text-ivory uppercase shadow-lg shadow-galaxy/30">
                <span className="text-teal-soft">{'</>'}</span> Dev
              </div>
            </div>
          </motion.div>
        </Grid>
      </Container>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-sans text-[0.65rem] tracking-[0.3em] text-muted uppercase md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-galaxy/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-violet motion-reduce:animate-none" />
        </span>
      </a>
    </section>
  )
}

export default HeroSection
