import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import ProjectCard from '../components/ui/ProjectCard.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'

/**
 * Asymmetric 7/5 – 5/7 layout. The second column is pushed down so the cards
 * form a staggered rhythm instead of a rigid table.
 */
const slots = [
  'lg:col-span-7',
  'md:mt-16 lg:col-span-5 lg:mt-24',
  'lg:col-span-5',
  'md:mt-16 lg:col-span-7 lg:mt-24',
] as const

function ProjectsSection() {
  return (
    <Section id="projects" tone="ivory">
      <div aria-hidden className="absolute top-1/3 -left-40 -z-10 size-120 rounded-full bg-violet/10 blur-3xl" />

      <Container>
        <Grid className="items-end gap-y-8">
          <Reveal className="col-span-4 md:col-span-6 lg:col-span-6">
            <SectionHeading id="projects" index={3} eyebrow="Work" title="Selected projects" />
          </Reveal>
          <Reveal delay={0.1} className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
            <div className="flex flex-wrap gap-2" aria-hidden>
              {['Software', 'Web', 'Design', 'Media'].map((tag, i) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 font-sans text-xs tracking-wide ${
                    i === 0 ? 'border-galaxy bg-galaxy text-ivory' : 'border-galaxy/20 text-muted'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </Grid>

        <Grid className="mt-16 gap-y-10 lg:mt-20 lg:gap-y-16">
          {slots.map((slot, index) => (
            <Reveal key={slot} delay={(index % 2) * 0.1} className={`col-span-4 md:col-span-4 ${slot}`}>
              <ProjectCard index={index + 1} wide={slot.includes('col-span-7')} />
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default ProjectsSection
