import Container from '../layout/Container.tsx'

/**
 * Divider at the top edge of a section, for two neighbouring sections with
 * the same background: a beige line that fades out towards both ends, with a
 * short, darker segment in the middle. Colours: --color-divider(-accent) in
 * src/styles/index.css. Place it as the first child of a <Section>.
 */
function SectionDivider() {
  return (
    <Container className="absolute inset-x-0 top-0">
      <div aria-hidden className="flex items-center gap-5">
        <span className="h-0.5 flex-1 rounded-full bg-divider-fade" />
        <span className="h-0.5 w-14 rounded-full bg-divider-accent" />
        {/* Same fading line, mirrored so it fades out to the right */}
        <span className="h-0.5 flex-1 -scale-x-100 rounded-full bg-divider-fade" />
      </div>
    </Container>
  )
}

export default SectionDivider
