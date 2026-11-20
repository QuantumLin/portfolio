/*
 * Hero background split: a calm, warm panel behind the text that dissolves
 * into the cool "galaxy" side. The curve is only an invisible guide – the
 * panel edge is heavily blurred, so there is no visible line, just a soft
 * transition (the dot grid behind fades in towards the galaxy side).
 *
 * - Desktop (lg+): vertical S-curve around the center that wraps the portrait orbit.
 * - Stacked (< lg): horizontal wave anchored to the bottom of the text block.
 */

const panelFrom = '#fbf8f2' // warm cream
const panelTo = '#f4ede1' // light sand

/*
 * Desktop: the SVG box extends 10% beyond the section on every side so the
 * blur never fades the outer edges. viewBox units = % of the section.
 */
const desktopFill = 'M55 -10C54 22 45 35 47 55C49 75 53 86 51 110H-10V-10Z'

/** Vertical split for the side-by-side layout (lg+). */
export function HeroSplitDesktop() {
  return (
    <svg
      aria-hidden
      viewBox="-10 -10 120 120"
      preserveAspectRatio="none"
      className="absolute -inset-[10%] hidden h-[120%] w-[120%] blur-3xl lg:block"
    >
      <defs>
        <linearGradient id="hero-split-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: panelFrom }} />
          <stop offset="1" style={{ stopColor: panelTo }} />
        </linearGradient>
      </defs>
      <path d={desktopFill} fill="url(#hero-split-panel)" />
    </svg>
  )
}

// viewBox 0 0 100 24, wave across the full width
const stackedFill = 'M0 4C18 26 36 -4 56 12S86 26 100 4V0H0Z'

/**
 * Horizontal split for the stacked layout (< lg). Place inside the text block
 * (which must be `relative`): it covers everything above the block's bottom
 * edge and ends in a blurred wave below it. It is wider than the viewport so
 * the blur never shows at the screen edges.
 */
export function HeroSplitStacked() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-[100vh] -bottom-14 left-1/2 -z-10 w-[calc(100vw+12rem)] -translate-x-1/2 blur-2xl md:-bottom-20 lg:hidden"
    >
      <div
        className="absolute inset-x-0 top-0 bottom-12 md:bottom-[4.5rem]"
        style={{ background: `linear-gradient(to bottom, ${panelFrom}, ${panelTo})` }}
      />
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-14 w-full md:h-20">
        <path d={stackedFill} fill={panelTo} />
      </svg>
    </div>
  )
}
