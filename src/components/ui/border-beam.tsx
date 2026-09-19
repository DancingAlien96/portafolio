// Basado en "Border Beam" (Magic UI / 21st.dev): un haz de luz recorre el borde
// del contenedor padre. El padre debe tener position: relative y border-radius.
import type { CSSProperties } from 'react'

type BorderBeamProps = {
  size?: number
  duration?: number
  delay?: number
  radius?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
}

export function BorderBeam({
  size = 120,
  duration = 8,
  delay = 0,
  radius = 10,
  colorFrom = '#57ddff',
  colorTo = '#7af6ff',
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-solid border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth }}
    >
      <div
        className="absolute aspect-square"
        style={
          {
            width: size,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
            offsetPath: `rect(0 auto auto 0 round ${radius}px)`,
            animation: `border-beam ${duration}s linear ${-delay}s infinite`,
          } as CSSProperties
        }
      />
    </div>
  )
}
