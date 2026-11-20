import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import { PlaceholderLines, PlaceholderMedia } from '../components/ui/Placeholder.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import RichText from '../components/ui/RichText.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { useLanguage } from '../i18n/languageContext.ts'

function AboutSection() {
  const { t } = useLanguage()
  const { studying, background, focus } = t.about.facts
  const facts: { label: string; value?: string; detail?: string }[] = [studying, background, focus]

  return (
    <Section id="about" tone="sand">
      <Container>
        {/* Heading and text share the right half; the heading is centered over the text.
            Mirrors the contact heading, which is centered over the left half. */}
        <Grid className="gap-y-6">
          <Reveal className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-7">
            <SectionHeading id="about" title={t.about.title} align="center" />
          </Reveal>

          <Reveal delay={0.1} className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-7">
            <p className="font-display text-xl leading-snug font-medium text-galaxy md:text-2xl">{t.about.lead}</p>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/80">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </Reveal>
        </Grid>

        <Grid className="mt-16 gap-y-6 lg:mt-20">
          {facts.map(({ label, value, detail }, index) => (
            <Reveal
              key={label}
              delay={index * 0.08}
              className={`col-span-4 md:col-span-4 lg:col-span-3 ${index === 0 ? 'lg:col-start-2' : ''} ${
                index === 1 ? 'lg:translate-y-10' : ''
              }`}
            >
              <article
                className={`h-full rounded-2xl border border-galaxy/10 bg-ivory/70 p-6 shadow-sm shadow-galaxy/5 ${
                  index === 2 ? 'lg:-rotate-2' : ''
                }`}
              >
                <h3 className="mb-4 font-sans text-xs font-medium tracking-[0.2em] text-teal uppercase">{label}</h3>
                {value ? (
                  <>
                    <p className="font-display text-xl leading-snug font-semibold text-galaxy hyphens-auto">{value}</p>
                    {detail && <p className="mt-1 text-sm text-muted">{detail}</p>}
                  </>
                ) : (
                  <PlaceholderLines lines={2} className="mt-6" />
                )}
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.24} className="col-span-4 md:col-span-4 lg:col-span-2 lg:col-start-11 lg:self-end">
            <PlaceholderMedia label={t.about.detailImage} className="aspect-square rotate-3 bg-sand" />
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

export default AboutSection
