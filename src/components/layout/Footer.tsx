import Container from './Container.tsx'

/** Dark galaxy footer that closes the page. */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-galaxy-deep text-ivory/70">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-galaxy" />
      <Container className="flex flex-col items-start justify-between gap-4 py-10 font-sans text-xs tracking-[0.15em] uppercase sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Daniel Dang</p>
        <a href="#home" className="transition-colors hover:text-teal-soft">
          Back to top ↑
        </a>
      </Container>
    </footer>
  )
}

export default Footer
