import { useLanguage } from '../../i18n/languageContext.ts'
import Container from './Container.tsx'

/** Dark galaxy footer that closes the page (the contact wave flows into it). */
function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-galaxy-deep text-ivory/70">
      <Container className="flex flex-col items-start justify-between gap-4 py-10 font-sans text-xs tracking-[0.15em] uppercase sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Daniel Dang</p>
        <a href="#home" className="transition-colors hover:text-teal-soft">
          {t.footer.backToTop} ↑
        </a>
      </Container>
    </footer>
  )
}

export default Footer
