import { glyphs, type GlyphName } from '../../data/skillGlyphs.ts'

/** Line icon for a skill without a brand logo (paths in src/data/skillGlyphs.ts). */
function SkillGlyph({ name, className = '' }: { name: GlyphName; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={glyphs[name]} />
    </svg>
  )
}

export default SkillGlyph
