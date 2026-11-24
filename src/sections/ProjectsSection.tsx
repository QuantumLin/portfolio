import { useCallback, useState } from 'react'
import SectionDivider from '../components/decor/SectionDivider.tsx'
import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import ProjectCard from '../components/ui/ProjectCard.tsx'
import ProjectModal from '../components/ui/ProjectModal.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { projects, type Project } from '../data/projects.ts'
import { useLanguage } from '../i18n/languageContext.ts'
import { localized } from '../i18n/translations.ts'

/** Generic title for placeholder cards that have no content yet. */
const placeholderTitle = localized((t) => t.projects.placeholderTitle)

/**
 * Grid of project cards; clicking a card opens the project window (ProjectModal).
 * Uses the mirrored light background, because Skills above is light as well;
 * the divider marks the border between the two.
 */
function ProjectsSection() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Project | null>(null)
  // Stable function, so the modal's effect doesn't re-run on every render
  const closeModal = useCallback(() => setSelected(null), [])

  return (
    <Section id="projects" tone="ivory-flip" compact>
      <SectionDivider />

      <Container>
        <Reveal>
          <SectionHeading id="projects" title={t.projects.title} />
        </Reveal>

        {/* One card per row on phones, two per row from tablet up.
            Desktop: 5 columns per card, centered in columns 2–11. */}
        <Grid className="mt-14 gap-y-8 lg:mt-16 lg:gap-y-10">
          {projects.map((project, index) => {
            const isLeftCard = index % 2 === 0
            return (
              <Reveal
                key={project.id}
                delay={isLeftCard ? 0 : 0.1}
                className={`col-span-4 lg:col-span-5 ${isLeftCard ? 'lg:col-start-2' : ''}`}
              >
                <ProjectCard
                  title={project.content?.title ?? placeholderTitle}
                  thumbnailLabel={t.projects.thumbnail}
                  onOpen={() => setSelected(project)}
                />
              </Reveal>
            )
          })}
        </Grid>
      </Container>

      <ProjectModal project={selected} onClose={closeModal} />
    </Section>
  )
}

export default ProjectsSection
