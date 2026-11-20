import Sparkle from './Sparkle.tsx'

/**
 * Decorative hero background: gradient mesh, dot grid and a few geometric
 * "galaxy" shapes. Shapes sit on a loose diagonal (top-left → bottom-right)
 * so the composition stays ordered while feeling slightly asymmetric.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-0 bg-dot-grid mask-radial-from-5% mask-radial-to-65% mask-radial-at-top-right" />

      {/* Large planet, cut by the section edge. Planet + ring share a center per breakpoint (offset + size / 2) */}
      <div className="absolute -right-24 -bottom-40 size-80 rounded-full bg-gradient-galaxy opacity-90 shadow-[inset_-24px_-24px_60px_rgb(14_17_51/0.35)] md:-right-32 md:-bottom-64 md:size-104 lg:-right-20 lg:-bottom-64 lg:size-96" />
      <div className="absolute -right-32 -bottom-48 size-96 rounded-full border border-galaxy/15 md:-right-40 md:-bottom-72 md:size-120 lg:-right-28 lg:-bottom-72 lg:size-112" />

      {/* Outlined, rotated square between text and portrait */}
      <div className="absolute top-[17%] left-[47%] hidden size-16 rotate-12 rounded-2xl border-2 border-violet/30 lg:block" />

      {/* Small solid dots */}
      <div className="absolute top-[14%] left-[8%] hidden size-3 rounded-full bg-violet/60 md:block" />
      <div className="absolute bottom-[16%] left-[44%] hidden size-4 rounded-full bg-teal lg:block" />

      {/* Sparkles */}
      <Sparkle className="absolute top-[26%] right-[6%] size-6 animate-twinkle text-violet motion-reduce:animate-none" />
      <Sparkle className="absolute top-[72%] left-[47%] hidden size-4 animate-twinkle text-teal [animation-delay:1.5s] motion-reduce:animate-none lg:block" />
      <Sparkle className="absolute top-[12%] left-[38%] hidden size-3 animate-twinkle md:block text-galaxy/60 [animation-delay:2.5s] motion-reduce:animate-none" />
    </div>
  )
}

export default HeroBackdrop
