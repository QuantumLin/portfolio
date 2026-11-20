import type { Skill } from '../../data/skills.ts'
import { glyphs } from '../../data/skillGlyphs.ts'

type SkillIconProps = {
  skill: Skill
  className?: string
}

/**
 * Icon of a skill (24×24 grid, decorative – the name is shown next to it):
 * - brand logo in its original colour, as the brand guidelines expect
 * - otherwise a line icon in the current text colour
 */
function SkillIcon({ skill, className = '' }: SkillIconProps) {
  if ('logo' in skill) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" fill={`#${skill.logo.hex}`} className={className}>
        {skill.knockout && <rect x="1" y="1" width="22" height="22" fill={skill.knockout} />}
        <path d={skill.logo.path} />
      </svg>
    )
  }

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
      <path d={glyphs[skill.glyph]} />
    </svg>
  )
}

export default SkillIcon
