import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import LangStack from '../components/ui/LangStack.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import RichText from '../components/ui/RichText.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { useLanguage } from '../i18n/languageContext.ts'
import type { Translation } from '../i18n/translations.ts'

type FactKey = keyof Translation['about']['facts']

/** Timeline from top to bottom: the older entry first, the current one last (highlighted). */
const timeline: { fact: FactKey; current: boolean }[] = [
  { fact: 'background', current: false },
  { fact: 'studying', current: true },
]

/** Text styles of a timeline entry: the current one is larger and more colourful. */
const entryStyles = {
  current: {
    label: 'text-teal-deep',
    title: 'mt-2 text-2xl leading-tight text-galaxy md:text-3xl',
    detail: 'mt-1.5 text-base text-ink/80',
  },
  past: {
    label: 'text-muted',
    title: 'mt-1.5 text-lg leading-snug text-galaxy/75',
    detail: 'mt-0.5 text-sm text-muted',
  },
}

/*
 * Desktop layout (12 columns): timeline on the left (cols 2–5), heading and
 * text on the right (cols 7–11) – one free column on the outer edge keeps the
 * text away from the border. Phones/tablets: heading → text → timeline.
 *
 * Text and timeline use LangStack: they always take the space of the longest
 * translation, so the section has the same size in every language; shorter
 * text is centered vertically inside that space.
 */
function AboutSection() {
  const { t } = useLanguage()

  return (
    <Section id="about" tone="sand" compact>
      <Container>
        <Grid className="items-center gap-y-12">
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-7 lg:row-start-1">
            <Reveal>
              <SectionHeading id="about" title={t.about.title} />
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <LangStack itemClassName="self-center">
                {(tr) => (
                  <>
                    <p className="font-display text-xl leading-snug font-medium text-galaxy md:text-2xl">{tr.about.lead}</p>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/80">
                      {tr.about.paragraphs.map((paragraph) => (
                        <p key={paragraph}>
                          <RichText text={paragraph} />
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </LangStack>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-2 lg:row-start-1">
            <ol className="relative pl-10">
              {timeline.map(({ fact, current }, i) => {
                const isLast = i === timeline.length - 1
                const styles = current ? entryStyles.current : entryStyles.past
                return (
                  <Reveal key={fact} delay={0.15 + i * 0.1} className={i > 0 ? 'mt-12' : ''}>
                    <li className="relative">
                      {/* Line from this node down to the next one, fading in towards it.
                          It spans this entry plus the mt-12 gap; x = node centre. */}
                      {!isLast && (
                        <span
                          aria-hidden
                          className="absolute top-3 -bottom-[3.75rem] -left-[1.8125rem] w-0.5 rounded-full bg-linear-to-b from-galaxy/20 to-violet"
                        />
                      )}
                      <TimelineNode current={current} />

                      <LangStack itemClassName="self-center">
                        {(tr) => {
                          const { label, value, detail, period } = tr.about.facts[fact]
                          return (
                            <>
                              <p className={`text-label ${styles.label}`}>
                                {period} · {label}
                              </p>
                              <h3 className={`font-display font-semibold hyphens-auto ${styles.title}`}>{value}</h3>
                              <p className={styles.detail}>{detail}</p>
                            </>
                          )
                        }}
                      </LangStack>
                    </li>
                  </Reveal>
                )
              })}
            </ol>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}

/** Dot on the timeline: a large gradient dot for the current entry, a small ring otherwise. */
function TimelineNode({ current }: { current: boolean }) {
  if (current) {
    return (
      <span
        aria-hidden
        className="absolute top-0.5 -left-10 grid size-6 place-items-center rounded-full bg-gradient-galaxy shadow-[0_0_0_6px] shadow-violet/15"
      >
        <span className="size-2 rounded-full bg-ivory" />
      </span>
    )
  }
  return <span aria-hidden className="absolute top-1 -left-9 size-4 rounded-full border-2 border-galaxy/30 bg-ivory" />
}

export default AboutSection
