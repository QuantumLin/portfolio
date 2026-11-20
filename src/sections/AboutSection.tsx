import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import { PlaceholderLines, PlaceholderMedia } from '../components/ui/Placeholder.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'

const facts = ['Focus', 'Stack', 'Based in']

function AboutSection() {
  return (
    <Section id="about" tone="sand">
      <Container>
        <Grid className="gap-y-12">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-4">
            <SectionHeading id="about" title="About me" />
          </Reveal>

          {/* Text block starts one column later → asymmetric gutter */}
          <Reveal delay={0.1} className="col-span-4 md:col-span-7 lg:col-span-6 lg:col-start-6 lg:pt-20">
            <PlaceholderLines lines={4} className="[&>div]:h-3.5" />
            <PlaceholderLines lines={5} className="mt-10" />
          </Reveal>
        </Grid>

        <Grid className="mt-20 gap-y-6 lg:mt-28">
          {facts.map((label, index) => (
            <Reveal
              key={label}
              delay={index * 0.08}
              className={`col-span-4 md:col-span-4 lg:col-span-3 ${index === 0 ? 'lg:col-start-2' : ''} ${
                index === 1 ? 'lg:translate-y-10' : ''
              }`}
            >
              <article
                className={`rounded-2xl border border-galaxy/10 bg-ivory/70 p-6 shadow-sm shadow-galaxy/5 ${
                  index === 2 ? 'lg:-rotate-2' : ''
                }`}
              >
                <h3 className="mb-6 font-sans text-xs font-medium tracking-[0.2em] text-teal uppercase">{label}</h3>
                <PlaceholderLines lines={2} />
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.24} className="col-span-4 md:col-span-4 lg:col-span-2 lg:col-start-11 lg:self-end">
            <PlaceholderMedia label="Detail" className="aspect-square rotate-3 bg-sand" />
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

export default AboutSection
