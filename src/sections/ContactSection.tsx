import Container from '../components/layout/Container.tsx'
import Grid from '../components/layout/Grid.tsx'
import Section from '../components/layout/Section.tsx'
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
    <Section id="contact" tone="sand" className="min-h-[60dvh]">
      <Container>
        <Grid className="items-center gap-y-12">
          <Reveal className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-2">
            <SectionHeading id="contact" title={t.contact.title} align="center" />
            <p className="mt-6 text-base leading-relaxed text-ink/80 md:text-lg">{t.contact.intro}</p>
          </Reveal>

          {channels.length > 0 && (
            <Reveal delay={0.1} className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-8">
              <ul className="divide-y divide-galaxy/10 border-y border-galaxy/10">
                {channels.map(({ key, href, display, external }) => (
                  <li key={key}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center justify-between gap-6 py-5 transition-[padding] duration-300 hover:px-2"
                    >
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-sans text-xs font-medium tracking-[0.2em] text-teal uppercase">
                          {t.contact.channels[key]}
                        </span>
                        <span className="font-display text-lg font-semibold break-words text-galaxy md:text-xl">{display}</span>
                      </span>
                      <span
                        aria-hidden
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-galaxy/15 text-galaxy transition duration-300 group-hover:border-violet group-hover:bg-violet group-hover:text-ivory"
                      >
                        ↗
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
