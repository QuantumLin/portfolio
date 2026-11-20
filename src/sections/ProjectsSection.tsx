import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import ProjectCard from '../components/ui/ProjectCard.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { useLanguage } from '../i18n/languageContext.ts'

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
  const { t } = useLanguage()

  return (
    <Section id="projects" tone="ivory" divider={{}}>
      <div aria-hidden className="absolute top-1/3 -left-40 -z-10 size-120 rounded-full bg-violet/10 blur-3xl" />

      <Container>
        <Reveal className="flex flex-col gap-6 md:items-center">
          <SectionHeading id="projects" title={t.projects.title} align="center" />
          <div className="flex flex-wrap gap-2 md:justify-center" aria-hidden>
            {t.projects.tags.map((tag, i) => (
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

        <Grid className="mt-14 gap-y-10 lg:mt-16 lg:gap-y-16">
          {slots.map((slot, index) => (
            <Reveal key={slot} delay={(index % 2) * 0.1} className={`col-span-4 md:col-span-4 ${slot}`}>
              <ProjectCard index={index + 1} wide={slot.includes('col-span-7')} previewLabel={t.projects.preview} />
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default ProjectsSection
