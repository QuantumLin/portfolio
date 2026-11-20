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
    <Section id="projects" tone="sand">
      <div aria-hidden className="absolute top-1/4 -left-56 -z-10 size-160 bg-glow-violet" />

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
