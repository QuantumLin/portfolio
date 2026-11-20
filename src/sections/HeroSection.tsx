import { motion } from 'motion/react'
import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Button from '../components/ui/Button.tsx'
import { PlaceholderMedia } from '../components/ui/Placeholder.tsx'

const ease = [0.22, 1, 0.36, 1] as const

function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden bg-ivory pt-[calc(var(--spacing-nav)+3rem)] pb-20 lg:pt-(--spacing-nav) lg:pb-16"
    >
      {/* Background: dot grid fading out + two soft galaxy glows */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-dot-grid mask-radial-from-10% mask-radial-to-70% mask-radial-at-top-right"
      />
      <div aria-hidden className="absolute -top-40 -right-32 -z-10 size-136 rounded-full bg-violet/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-48 -left-40 -z-10 size-120 rounded-full bg-teal/10 blur-3xl" />

      <Container>
        <Grid className="items-center gap-y-16">
          {/* Text: 7 of 12 columns */}
          <motion.div
            className="col-span-4 md:col-span-8 lg:col-span-7"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-galaxy/15 bg-ivory/70 px-4 py-1.5 font-display text-xs font-medium tracking-[0.2em] text-muted uppercase">
              <span className="size-1.5 rounded-full bg-teal" />
              Portfolio
            </p>

            <h1 id="home-title" className="text-display font-bold text-galaxy">
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
                Get in touch
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
              {/* Offset frame, rotated against the image */}
              <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 -rotate-5 rounded-3xl border-2 border-teal/60" />
              <div className="relative rounded-3xl bg-ivory p-2 shadow-2xl shadow-galaxy/15 ring-1 ring-galaxy/10">
                <PlaceholderMedia label="Portrait" className="aspect-4/5 rounded-[1.25rem]" />
              </div>
              {/* Sticker badge */}
              <div className="absolute -bottom-6 -left-6 -rotate-8 rounded-xl bg-galaxy px-4 py-3 font-display text-xs font-semibold tracking-[0.2em] text-ivory uppercase shadow-lg shadow-galaxy/30">
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
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-display text-[0.65rem] tracking-[0.3em] text-muted uppercase md:flex"
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
