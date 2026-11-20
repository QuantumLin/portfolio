import { useLanguage } from '../../i18n/languageContext.ts'
import { legalHrefs, type LegalPageId } from '../../i18n/legal.ts'
import Container from './Container.tsx'

type FooterProps = {
  /** Target of "Back to top" (the start section on the portfolio, page top elsewhere). */
  backHref?: string
  /** Marks the current legal page, if any. */
  current?: LegalPageId
}

/** Dark galaxy footer with copyright, legal links and "back to top". */
function Footer({ backHref = '#home', current }: FooterProps) {
  const { t } = useLanguage()
  const links: { id: LegalPageId; label: string }[] = [
    { id: 'imprint', label: t.footer.imprint },
    { id: 'privacy', label: t.footer.privacy },
  ]

  return (
    <footer className="bg-galaxy-deep text-ivory/70">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 font-sans text-xs tracking-[0.15em] uppercase md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Daniel Dang</p>

        <nav aria-label={`${t.footer.imprint} / ${t.footer.privacy}`}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={legalHrefs[id]}
                  aria-current={current === id ? 'page' : undefined}
                  className={`transition-colors hover:text-teal-soft ${current === id ? 'text-ivory' : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={backHref} className="transition-colors hover:text-teal-soft">
          {t.footer.backToTop} ↑
        </a>
      </Container>
    </footer>
  )
}

export default Footer
