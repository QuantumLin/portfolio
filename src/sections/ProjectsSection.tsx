import { useCallback, useState } from 'react'
import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import ProjectCard from '../components/ui/ProjectCard.tsx'
import ProjectModal from '../components/ui/ProjectModal.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { projects, type Project } from '../data/projects.ts'
import { useLanguage } from '../i18n/languageContext.ts'
import { translations } from '../i18n/translations.ts'

function ProjectsSection() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])
  // Placeholder cards (no content yet) show a generic title in each language.
  const placeholderTitle = { en: translations.en.projects.placeholderTitle, de: translations.de.projects.placeholderTitle }

  return (
    <Section id="projects" tone="ivory-flip">
      {/* Divider to Skills (same background colour): a beige line that fades out
          gently towards both ends, broken in the middle by three dots in the
          accent colours. The line halves are mirrored copies of one gradient. */}
      <Container className="absolute inset-x-0 top-0">
        <div
          aria-hidden
          className="flex items-center gap-5 [--divider:color-mix(in_oklab,var(--color-line),var(--color-ink)_12%)] *:data-line:h-0.5 *:data-line:flex-1 *:data-line:rounded-full *:data-line:bg-[linear-gradient(to_right,transparent,color-mix(in_oklab,var(--divider)_45%,transparent)_12%,var(--divider)_45%)]"
        >
          <span data-line />
          {/* Short, darker and more saturated beige segment in the middle */}
          <span className="block h-0.5 w-14 rounded-full bg-[color-mix(in_oklab,#a8875a,var(--color-ink)_15%)]" />
          <span data-line className="-scale-x-100" />
        </div>
      </Container>

      <Container>
        <Reveal>
          <SectionHeading id="projects" title={t.projects.title} align="center" />
        </Reveal>

        {/* Uniform grid: one card per row on phones, two per row from tablet up.
            Desktop: 5 columns per card, centered in columns 2–11. */}
        <Grid className="mt-14 gap-y-8 lg:mt-16 lg:gap-y-10">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 2) * 0.1}
              className={`col-span-4 lg:col-span-5 ${index % 2 === 0 ? 'lg:col-start-2' : ''}`}
            >
              <ProjectCard
                title={project.content?.title ?? placeholderTitle}
                thumbnailLabel={t.projects.thumbnail}
                onOpen={() => setSelected(project)}
              />
            </Reveal>
          ))}
        </Grid>
      </Container>

      <ProjectModal project={selected} onClose={close} />
    </Section>
  )
}

export default ProjectsSection
