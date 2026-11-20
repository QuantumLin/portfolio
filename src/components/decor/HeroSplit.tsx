import panelDesktop from '../../assets/hero-panel-desktop.svg'
import panelWave from '../../assets/hero-panel-wave.svg'

/*
 * Hero background split: a calm, warm panel behind the text that dissolves into
 * the cool "galaxy" side. The curve is only an invisible guide – its edge is
 * soft, so there is no visible line (the dot grid behind fades in towards the
 * galaxy side).
 *
 * Performance: the soft edges are pre-blurred inside SVG images (see src/assets)
 * and used as stretched backgrounds. A CSS `filter: blur()` on these large areas
 * would be recomputed on every repaint – very slow without GPU acceleration.
 *
 * - Desktop (lg+): vertical S-curve around the center that wraps the portrait orbit.
 * - Stacked (< lg): horizontal wave anchored to the bottom of the text block.
 */

const panelFrom = '#fbf8f2' // warm cream – keep in sync with the SVGs
const panelTo = '#f4ede1' // light sand

/** Vertical split for the side-by-side layout (lg+). */
export function HeroSplitDesktop() {
  return (
    <div
      aria-hidden
      className="absolute -inset-[10%] hidden bg-no-repeat lg:block"
      style={{ backgroundImage: `url("${panelDesktop}")`, backgroundSize: '100% 100%' }}
    />
  )
}

/**
 * Horizontal split for the stacked layout (< lg). Place inside the text block
 * (which must be `relative`): a plain gradient covers everything above the
 * block, and a pre-blurred wave image forms the soft edge below it.
 */
export function HeroSplitStacked() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-[100vh] -bottom-20 left-1/2 -z-10 w-[calc(100vw+4rem)] -translate-x-1/2 md:-bottom-24 lg:hidden"
    >
      <div
        className="absolute inset-x-0 top-0 bottom-40 md:bottom-48"
        style={{ background: `linear-gradient(to bottom, ${panelFrom}, ${panelTo})` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-no-repeat md:h-48"
        style={{ backgroundImage: `url("${panelWave}")`, backgroundSize: '100% 100%' }}
      />
    </div>
  )
}
