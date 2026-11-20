import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import { PlaceholderLines } from '../components/ui/Placeholder.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'

const fields = ['Name', 'Email', 'Message']

function ContactSection() {
  return (
    <Section id="contact" tone="sand" className="min-h-[80dvh]">
      <Container>
        <Grid className="gap-y-16">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-6">
            <SectionHeading id="contact" index={4} eyebrow="Contact" title="Let's work together" />
            <PlaceholderLines lines={3} className="mt-10 max-w-md" />

            <ul className="mt-12 space-y-4" aria-hidden>
              {['Email', 'GitHub', 'LinkedIn'].map((channel) => (
                <li key={channel} className="flex items-center gap-6 border-b border-galaxy/10 pb-4">
                  <span className="w-24 font-sans text-xs tracking-[0.2em] text-teal uppercase">{channel}</span>
                  <span className="h-2.5 w-40 rounded-full bg-galaxy/10" />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form card: rotated slightly, sits in the right 5 columns */}
          <Reveal delay={0.15} className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <div className="relative">
              <div aria-hidden className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-galaxy opacity-90" />
              <div className="relative -rotate-1 rounded-3xl bg-ivory p-8 shadow-xl shadow-galaxy/10 md:p-10">
                <div className="space-y-6" aria-hidden>
                  {fields.map((field) => (
                    <div key={field}>
                      <p className="mb-2 font-sans text-xs tracking-[0.2em] text-muted uppercase">{field}</p>
                      <div
                        className={`rounded-xl border border-galaxy/15 bg-sand/40 ${field === 'Message' ? 'h-32' : 'h-12'}`}
                      />
                    </div>
                  ))}
                  <div className="h-12 w-40 rounded-full bg-galaxy" />
                </div>
              </div>
            </div>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}

export default ContactSection
