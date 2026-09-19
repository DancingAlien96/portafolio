// Inspirado en "Spotlight Card" de @jahed (21st.dev): un halo sigue al cursor
// sobre el fondo y el borde de la tarjeta.
import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Color del halo en formato "r g b" */
  glow?: string
  size?: number
}

export function SpotlightCard({
  className,
  children,
  glow = '87 221 255',
  size = 360,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--y', `${e.clientY - rect.top}px`)
    }
    onPointerMove?.(e)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      style={{ '--glow': glow, '--size': `${size}px` } as CSSProperties}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border border-accent/10 bg-white/[0.025] transition-[border-color,transform,box-shadow] duration-300',
        'hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_12px_40px_rgb(87_221_255/0.12)]',
        className,
      )}
      {...props}
    >
      {/* Halo interior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(var(--size) circle at var(--x, 50%) var(--y, 50%), rgb(var(--glow) / 0.10), transparent 60%)',
        }}
      />
      {/* Borde iluminado */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background:
            'radial-gradient(calc(var(--size) * 0.6) circle at var(--x, 50%) var(--y, 50%), rgb(var(--glow) / 0.7), transparent 60%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
