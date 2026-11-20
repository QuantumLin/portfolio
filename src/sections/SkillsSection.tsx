import Container from '../components/layout/Container.tsx'
import Section from '../components/layout/Section.tsx'
import LangLabel from '../components/ui/LangLabel.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import SkillIcon from '../components/ui/SkillIcon.tsx'
import { skillCategories, skillName } from '../data/skills.ts'
import { useLanguage } from '../i18n/languageContext.ts'

/**
 * Skills grouped by category (data: src/data/skills.ts).
 * Desktop: two categories side by side; phones: stacked.
 * Labels use LangLabel, so the section has the same size in every language.
 */
function SkillsSection() {
  const { lang, t } = useLanguage()

  return (
    <Section id="skills" tone="ivory">
      <Container>
        <Reveal>
          <SectionHeading id="skills" title={t.skills.title} />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-x-16 gap-y-12 md:mt-14 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            // Categories side by side (left/right column) fade in slightly one after the other
            <Reveal key={category.id} delay={0.05 + (index % 2) * 0.1}>
              <section aria-label={category.title[lang]}>
                <h3 className="mb-6 flex items-center gap-4 text-label text-teal-deep">
                  <LangLabel text={category.title} className="text-left" />
                  <span aria-hidden className="h-px flex-1 bg-galaxy/15" />
                </h3>

                <ul className="flex flex-wrap gap-x-1 gap-y-5">
                  {category.skills.map((skill) => {
                    const name = skillName(skill)
                    return (
                      <li key={name.en} className="group flex w-20 flex-col items-center gap-2 md:w-24">
                        <span className="grid size-10 place-items-center text-galaxy transition duration-300 group-hover:-translate-y-0.5 group-hover:text-violet md:size-11">
                          <SkillIcon skill={skill} className="size-9 md:size-10" />
                        </span>
                        <span className="text-center text-xs leading-tight font-medium hyphens-auto text-ink/80 md:text-sm">
                          <LangLabel text={name} />
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default SkillsSection
