import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import ContactIcon from '../components/ui/ContactIcon.tsx'
import LangStack from '../components/ui/LangStack.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { contact } from '../data/contact.ts'
import { useLanguage } from '../i18n/languageContext.ts'
import { externalLinkProps } from '../utils/links.ts'

type Channel = {
  key: 'email' | 'github' | 'linkedin'
  href: string
  /** Text shown on the page */
  display: string
  external: boolean
}

/** "https://www.github.com/name/" → "github.com/name" */
const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** Contact channels with a value in the environment (see src/data/contact.ts); empty ones are left out. */
function getChannels(): Channel[] {
  const channels: Channel[] = []
  if (contact.email) {
    channels.push({ key: 'email', href: `mailto:${contact.email}`, display: contact.email, external: false })
  }
  if (contact.github) {
    channels.push({ key: 'github', href: contact.github, display: prettyUrl(contact.github), external: true })
  }
  if (contact.linkedin) {
    channels.push({ key: 'linkedin', href: contact.linkedin, display: prettyUrl(contact.linkedin), external: true })
  }
  return channels
}

const channels = getChannels()

/*
 * Mirrors the About layout (point-symmetric): heading + intro on the left
 * (cols 2–6, heading centered over the text), contact links on the right (cols 8–11).
 */
function ContactSection() {
  const { t } = useLanguage()

  return (
    // Last section: at least "screen − navbar − footer" tall, so that jumping here via
    // the navigation can put its top edge right below the navbar. lvh = largest
    // viewport height (mobile address bar hidden), so it also holds on phones.
    // --footer-height is set by the Footer component.
    <Section id="contact" tone="sand" compact>
      <Container>
        <Grid className="items-center gap-y-12">
          <Reveal className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-2">
            <SectionHeading id="contact" title={t.contact.title} />
            <LangStack className="mt-6" itemClassName="self-center">
              {(tr) => <p className="text-base leading-relaxed text-ink/80 md:text-lg">{tr.contact.intro}</p>}
            </LangStack>
          </Reveal>

          {channels.length > 0 && (
            <Reveal delay={0.1} className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-7 xl:col-span-4 xl:col-start-8">
              <ul className="divide-y divide-galaxy/10 border-y border-galaxy/10">
                {channels.map(({ key, href, display, external }) => (
                  <li key={key}>
                    <a href={href} {...(external ? externalLinkProps : {})} className="group flex items-center py-5">
                      {/* Hover nudges the content via transform – no layout change, so the text never re-wraps */}
                      <span className="flex min-w-0 items-center gap-4 transition-transform duration-300 group-hover:translate-x-1.5">
                        <span
                          aria-hidden
                          className="grid size-11 shrink-0 place-items-center rounded-xl bg-ivory/70 text-galaxy shadow-sm shadow-galaxy/5 ring-1 ring-galaxy/10 transition duration-300 group-hover:bg-galaxy group-hover:text-ivory"
                        >
                          <ContactIcon channel={key} />
                        </span>
                        <span className="flex min-w-0 flex-col gap-1">
                          <span className="text-label text-teal-deep">{t.contact.channels[key]}</span>
                          <span className="truncate font-display text-base font-semibold text-galaxy sm:text-lg">{display}</span>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </Grid>
      </Container>
    </Section>
  )
}

export default ContactSection
