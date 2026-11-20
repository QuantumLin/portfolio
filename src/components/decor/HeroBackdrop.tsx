import { HeroSplitDesktop } from './HeroSplit.tsx'
import Sparkle from './Sparkle.tsx'

/**
 * Decorative hero background in two parts:
 * - right/bottom ("galaxy"): gradient mesh, dot grid and geometric shapes behind the portrait
 * - left: a calm warm panel behind the text (HeroSplitDesktop; stacked layouts use HeroSplitStacked in the text block)
 * The dot grid fades in towards the galaxy side (left → right, or top → bottom when
 * stacked); the blurred panel edge on top of it makes the transition follow the curve.
 * All shapes sit on the galaxy side so the text panel stays plain.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_bottom,transparent_30%,black_80%)] lg:[mask-image:linear-gradient(to_right,transparent_40%,black_95%)]" />

      {/* Large planet, cut by the section edge. Planet + ring share a center per breakpoint (offset + size / 2) */}
      <div className="absolute -right-24 -bottom-40 size-80 rounded-full bg-gradient-galaxy opacity-90 shadow-[inset_-24px_-24px_60px_rgb(14_17_51/0.35)] md:-right-32 md:-bottom-64 md:size-104 lg:-right-20 lg:-bottom-64 lg:size-96" />
      <div className="absolute -right-32 -bottom-48 size-96 rounded-full border border-galaxy/15 md:-right-40 md:-bottom-72 md:size-120 lg:-right-28 lg:-bottom-72 lg:size-112" />

      {/* Outlined, rotated square just right of the curve */}
      <div className="absolute top-[10%] left-[71%] hidden size-14 rotate-12 rounded-2xl border-2 border-violet/30 lg:block" />

      {/* Sparkles */}
      <Sparkle className="absolute top-[26%] right-[6%] size-6 animate-twinkle text-violet motion-reduce:animate-none" />
      <Sparkle className="absolute top-[84%] left-[60%] hidden size-4 animate-twinkle text-teal [animation-delay:1.5s] motion-reduce:animate-none lg:block" />

      <HeroSplitDesktop />
    </div>
  )
}

export default HeroBackdrop
