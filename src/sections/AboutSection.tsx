import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import LangStack from '../components/ui/LangStack.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import RichText from '../components/ui/RichText.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import type { Translation } from '../i18n/translations.ts'
import { useLanguage } from '../i18n/languageContext.ts'

const factsOf = (t: Translation) => [t.about.facts.studying, t.about.facts.background]

/** Timeline order: older entry first; the current one is highlighted. */
const timeline = [
  { index: 1, current: false }, // background: training
  { index: 0, current: true }, // studying (current)
]

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
    <Section id="about" tone="sand">
      <Container>
        <Grid className="items-center gap-y-12">
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-7 lg:row-start-1">
            <Reveal>
              <SectionHeading id="about" title={t.about.title} align="center" />
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

          {/* Timeline: training (past) on top, current studies below and highlighted.
              The line fades in towards the current node. */}
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-2 lg:row-start-1">
            <ol className="relative pl-10">
              {timeline.map(({ index, current }, i) => (
                <Reveal key={index} delay={0.15 + i * 0.1} className={i > 0 ? 'mt-12' : ''}>
                  <li className="relative">
                    {/* Connector from this node down to the next one (ends at the current node).
                        Spans this entry plus the mt-12 gap; x = node centre (0.75rem from the list edge). */}
                    {i < timeline.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-3 -bottom-[3.75rem] -left-[1.8125rem] w-0.5 rounded-full bg-linear-to-b from-galaxy/20 to-violet"
                      />
                    )}
                    {/* Node */}
                    <span
                      aria-hidden
                      className={
                        current
                          ? 'absolute top-0.5 -left-10 grid size-6 place-items-center rounded-full bg-gradient-galaxy shadow-[0_0_0_6px] shadow-violet/15'
                          : 'absolute top-1 -left-9 size-4 rounded-full border-2 border-galaxy/30 bg-ivory'
                      }
                    >
                      {current && <span className="size-2 rounded-full bg-ivory" />}
                    </span>

                    <LangStack itemClassName="self-center">
                      {(tr) => {
                        const { label, value, detail, period } = factsOf(tr)[index]
                        return current ? (
                          <>
                            <p className="font-sans text-xs font-medium tracking-[0.2em] text-teal-deep uppercase">
                              {period} · {label}
                            </p>
                            <h3 className="mt-2 font-display text-2xl leading-tight font-semibold text-galaxy hyphens-auto md:text-3xl">
                              {value}
                            </h3>
                            <p className="mt-1.5 text-base text-ink/80">{detail}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-sans text-xs font-medium tracking-[0.2em] text-muted uppercase">
                              {period} · {label}
                            </p>
                            <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold text-galaxy/75 hyphens-auto">
                              {value}
                            </h3>
                            <p className="mt-0.5 text-sm text-muted">{detail}</p>
                          </>
                        )
                      }}
                    </LangStack>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}

export default AboutSection
