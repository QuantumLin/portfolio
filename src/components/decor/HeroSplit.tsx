import panelDesktop from '../../assets/hero-panel-desktop.svg'
import panelWave from '../../assets/hero-panel-wave.svg'

/*
 * Hero background split: a calm, bluish off-white panel behind the text that dissolves
 * into the violet "galaxy" side. The curve is only an invisible guide – its edge
 * is soft, so there is no visible line (the dot grid behind fades in towards the
 * galaxy side).
 *
 * Colours: --color-hero-panel-from / --color-hero-panel-to in src/styles/index.css.
 *
 * Performance: the soft edges come from pre-blurred SVG masks (see src/assets),
 * rasterized once. A CSS `filter: blur()` on these large areas would be
 * recomputed on every repaint – very slow without GPU acceleration.
 *
 * - Desktop (lg+): vertical S-curve around the center that wraps the portrait orbit.
 * - Stacked (< lg): horizontal wave anchored to the bottom of the text block.
 */

const mask = (url: string) => ({
  maskImage: `url("${url}")`,
  WebkitMaskImage: `url("${url}")`,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
})

/** Vertical split for the side-by-side layout (lg+). */
export function HeroSplitDesktop() {
  return (
    <div
      aria-hidden
      className="absolute -inset-[10%] hidden bg-linear-to-br from-hero-panel-from to-hero-panel-to lg:block"
      style={mask(panelDesktop)}
    />
  )
}

/**
 * Horizontal split for the stacked layout (< lg). Place inside the text block
 * (which must be `relative`): a plain gradient covers everything above the
 * block, and a pre-blurred wave mask forms the soft edge below it.
 */
export function HeroSplitStacked() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-[100vh] -bottom-20 left-1/2 -z-10 w-[calc(100vw+4rem)] -translate-x-1/2 md:-bottom-24 lg:hidden"
    >
      <div className="absolute inset-x-0 top-0 bottom-40 bg-linear-to-b from-hero-panel-from to-hero-panel-to md:bottom-48" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-hero-panel-to md:h-48" style={mask(panelWave)} />
    </div>
  )
}
