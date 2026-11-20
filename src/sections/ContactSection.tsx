import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
import ContactIcon from '../components/ui/ContactIcon.tsx'
import LangStack from '../components/ui/LangStack.tsx'
import Reveal from '../components/ui/Reveal.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { contact } from '../data/contact.ts'
import { useLanguage } from '../i18n/languageContext.ts'

type Channel = {
  key: 'email' | 'github' | 'linkedin'
  href: string | null
  display: string | null
  external: boolean
}

/** "https://www.github.com/name/" → "github.com/name" */
const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/*
 * Mirrors the About layout (point-symmetric): heading + intro on the left
 * (cols 2–6, heading centered over the text), contact links on the right (cols 8–11).
 */
function ContactSection() {
  const { t } = useLanguage()

  // Channels without a value in contact.ts are simply not shown.
  const allChannels: Channel[] = [
    { key: 'email', href: contact.email && `mailto:${contact.email}`, display: contact.email, external: false },
    { key: 'github', href: contact.github, display: contact.github && prettyUrl(contact.github), external: true },
    { key: 'linkedin', href: contact.linkedin, display: contact.linkedin && prettyUrl(contact.linkedin), external: true },
  ]
  const channels = allChannels.filter(
    (channel): channel is Channel & { href: string; display: string } => Boolean(channel.href && channel.display),
  )

  return (
    // Last section: at least "screen − navbar − footer" tall, so that jumping here via
    // the navigation can put its top edge right below the navbar. lvh = largest
    // viewport height (mobile address bar hidden), so it also holds on phones.
    <Section id="contact" tone="sand" className="min-h-[calc(100lvh-var(--spacing-nav)-var(--footer-height,0px))]">
      <Container>
        <Grid className="items-center gap-y-12">
          <Reveal className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-2">
            <SectionHeading id="contact" title={t.contact.title} align="center" />
            {/* Same size in every language (see LangStack) */}
            <LangStack className="mt-6" itemClassName="self-center">
              {(tr) => <p className="text-base leading-relaxed text-ink/80 md:text-lg">{tr.contact.intro}</p>}
            </LangStack>
          </Reveal>

          {channels.length > 0 && (
            <Reveal delay={0.1} className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-7 xl:col-span-4 xl:col-start-8">
              <ul className="divide-y divide-galaxy/10 border-y border-galaxy/10">
                {channels.map(({ key, href, display, external }) => (
                  <li key={key}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center py-5"
                    >
                      {/* Hover nudges the content via transform – no layout change, so the text never re-wraps */}
                      <span className="flex min-w-0 items-center gap-4 transition-transform duration-300 group-hover:translate-x-1.5">
                        <span
                          aria-hidden
                          className="grid size-11 shrink-0 place-items-center rounded-xl bg-ivory/70 text-galaxy shadow-sm shadow-galaxy/5 ring-1 ring-galaxy/10 transition duration-300 group-hover:bg-galaxy group-hover:text-ivory"
                        >
                          <ContactIcon channel={key} />
                        </span>
                        <span className="flex min-w-0 flex-col gap-1">
                          <span className="font-sans text-xs font-medium tracking-[0.2em] text-teal-deep uppercase">
                            {t.contact.channels[key]}
                          </span>
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
