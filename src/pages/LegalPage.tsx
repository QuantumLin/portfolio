import Container from '../components/layout/Container.tsx'
import Footer from '../components/layout/Footer.tsx'
import LanguageSwitch from '../components/navigation/LanguageSwitch.tsx'
import RichText from '../components/ui/RichText.tsx'
import { contact } from '../data/contact.ts'
import { useLanguage } from '../i18n/languageContext.ts'
import { getLegalDocument, type LegalPageId } from '../i18n/legal.ts'

type LegalPageProps = {
  page: LegalPageId
}

/** Standalone page for the legal notice (Impressum) or the privacy policy. */
function LegalPage({ page }: LegalPageProps) {
  const { lang, t } = useLanguage()
  const doc = getLegalDocument(page, lang, contact)

  return (
    <div className="flex min-h-dvh flex-col bg-ivory">
      <header className="border-b border-line/70">
        <Container className="flex h-(--spacing-nav) items-center justify-between">
          <a href="./" className="group flex items-center gap-3" aria-label={t.a11y.homeLink}>
            <span className="grid size-10 -rotate-6 place-items-center rounded-lg bg-galaxy font-display text-base font-bold text-ivory transition-transform duration-300 group-hover:rotate-0">
              DD
            </span>
            <span className="hidden font-display text-lg font-semibold text-galaxy sm:inline">Daniel Dang</span>
          </a>
          <LanguageSwitch />
        </Container>
      </header>

      <main className="flex-1 py-16 md:py-20">
        <Container>
          <article className="mx-auto max-w-3xl">
            <a
              href="./"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted transition-colors hover:text-violet"
            >
              <span aria-hidden>←</span>
              {t.legal.backToPortfolio}
            </a>

            <h1 className="mt-8 text-heading font-semibold text-galaxy">{doc.title}</h1>
            {doc.intro && <p className="mt-4 text-sm text-muted italic">{doc.intro}</p>}

            <div className="mt-12 space-y-10">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-xl font-semibold text-galaxy md:text-2xl">{section.heading}</h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-ink/80">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>
                        <RichText text={paragraph} />
                      </p>
                    ))}
                    {section.lines && (
                      <p>
                        {section.lines.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
              {t.legal.lastUpdated}: {doc.updated}
            </p>
          </article>
        </Container>
      </main>

      <Footer backHref="#" current={page} />
    </div>
  )
}

export default LegalPage
