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

/*
 * Desktop layout (12 columns): fact cards on the left (cols 2–5), heading and
 * text on the right (cols 7–11) – one free column on the outer edge keeps the
 * text away from the border. Phones/tablets: heading → text → cards.
 *
 * Text and cards use LangStack: they always take the space of the longest
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

          {/* Fact cards: stacked, the second one offset and slightly rotated */}
          <div className="col-span-4 grid gap-6 md:col-span-8 md:grid-cols-2 lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:grid-cols-1">
            {[0, 1].map((index) => (
              <Reveal key={index} delay={0.15 + index * 0.08} className={index === 1 ? 'lg:ml-12' : 'lg:mr-12'}>
                <article
                  className={`h-full rounded-2xl border border-galaxy/10 bg-ivory/70 p-6 shadow-sm shadow-galaxy/5 ${
                    index === 1 ? 'lg:-rotate-2' : ''
                  }`}
                >
                  <LangStack className="h-full" itemClassName="self-center">
                    {(tr) => {
                      const { label, value, detail, period } = factsOf(tr)[index]
                      return (
                        <>
                          <h3 className="mb-4 font-sans text-xs font-medium tracking-[0.2em] text-teal-deep uppercase">{label}</h3>
                          <p className="font-display text-xl leading-snug font-semibold text-galaxy hyphens-auto">{value}</p>
                          <p className="mt-1 text-sm text-muted">{detail}</p>
                          <p className="mt-4 border-t border-galaxy/10 pt-3 font-sans text-xs text-muted/90 tabular-nums">
                            {period}
                          </p>
                        </>
                      )
                    }}
                  </LangStack>
                </article>
              </Reveal>
            ))}
          </div>
        </Grid>
      </Container>
    </Section>
  )
}

export default AboutSection
