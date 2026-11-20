import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import RichText from '../components/ui/RichText.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { useLanguage } from '../i18n/languageContext.ts'

/*
 * Desktop layout (12 columns): fact cards on the left (cols 2–5), heading and
 * text on the right (cols 7–11) – one free column on the outer edge keeps the
 * text away from the border. Phones/tablets: heading → text → cards.
 */
function AboutSection() {
  const { t } = useLanguage()
  const { studying, background } = t.about.facts
  const facts = [studying, background]

  return (
    <Section id="about" tone="sand">
      <Container>
        <Grid className="items-center gap-y-12">
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-7 lg:row-start-1">
            <Reveal>
              <SectionHeading id="about" title={t.about.title} align="center" />
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <p className="font-display text-xl leading-snug font-medium text-galaxy md:text-2xl">{t.about.lead}</p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/80">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Fact cards: stacked, the second one offset and slightly rotated */}
          <div className="col-span-4 grid gap-6 md:col-span-8 md:grid-cols-2 lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:grid-cols-1">
            {facts.map(({ label, value, detail, period }, index) => (
              <Reveal key={label} delay={0.15 + index * 0.08} className={index === 1 ? 'lg:ml-12' : 'lg:mr-12'}>
                <article
                  className={`h-full rounded-2xl border border-galaxy/10 bg-ivory/70 p-6 shadow-sm shadow-galaxy/5 ${
                    index === 1 ? 'lg:-rotate-2' : ''
                  }`}
                >
                  <h3 className="mb-4 font-sans text-xs font-medium tracking-[0.2em] text-teal uppercase">{label}</h3>
                  <p className="font-display text-xl leading-snug font-semibold text-galaxy hyphens-auto">{value}</p>
                  <p className="mt-1 text-sm text-muted">{detail}</p>
                  <p className="mt-4 border-t border-galaxy/10 pt-3 font-sans text-xs text-muted/90 tabular-nums">{period}</p>
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
