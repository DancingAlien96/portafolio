// Basado en "Radial Orbital Timeline" de @jatin-yadav05 (21st.dev).
// Los nodos orbitan alrededor de un núcleo; al hacer clic, el nodo sube
// a la parte superior y despliega su tarjeta con detalle y nodos relacionados.
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { ArrowRight, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type OrbitalItem = {
  id: number
  title: string
  subtitle: string
  date: string
  content: string
  tags?: string[]
  current?: boolean
  icon: ComponentType<{ size?: number; className?: string }>
  relatedIds: number[]
}

export function RadialOrbitalTimeline({ items }: { items: OrbitalItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [radius, setRadius] = useState(200)
  const autoRotate = expandedId === null

  // Radio según el ancho disponible
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setRadius(Math.max(110, Math.min(210, entry.contentRect.width / 2 - 70)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!autoRotate) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setRotation((r) => (r + 0.25) % 360), 50)
    return () => clearInterval(timer)
  }, [autoRotate])

  const toggle = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null)
      return
    }
    setExpandedId(id)
    const index = items.findIndex((i) => i.id === id)
    // Lleva el nodo seleccionado a la parte superior (270°)
    setRotation(270 - (index / items.length) * 360)
  }

  const expanded = items.find((i) => i.id === expandedId)
  const related = new Set(expanded?.relatedIds ?? [])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[40rem] w-full items-center justify-center overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) setExpandedId(null)
      }}
    >
      {/* Núcleo */}
      <div className="pointer-events-none absolute flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-accent via-sky-500 to-indigo-500">
        <div className="absolute size-20 animate-ping rounded-full border border-accent/30 [animation-duration:3s]" />
        <div className="absolute size-24 animate-ping rounded-full border border-accent/15 [animation-delay:1s] [animation-duration:3s]" />
        <div className="size-8 rounded-full bg-white/80 backdrop-blur" />
      </div>

      {/* Órbita */}
      <div
        className="pointer-events-none absolute rounded-full border border-accent/15"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {items.map((item, index) => {
        const angle = (((index / items.length) * 360 + rotation) % 360) * (Math.PI / 180)
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        const isExpanded = item.id === expandedId
        const isRelated = related.has(item.id)
        const depth = (1 + Math.sin(angle)) / 2
        const Icon = item.icon

        return (
          <div
            key={item.id}
            className="absolute transition-all duration-700 ease-out"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              zIndex: isExpanded ? 50 : Math.round(10 + depth * 10),
              opacity: isExpanded || expandedId === null || isRelated ? 1 : 0.45 + depth * 0.3,
            }}
          >
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-label={`${item.title} — ${item.subtitle}`}
              onClick={(e) => {
                e.stopPropagation()
                toggle(item.id)
              }}
              className={cn(
                'relative flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-300',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
                isExpanded
                  ? 'scale-125 border-accent bg-accent text-ink shadow-[0_0_24px_rgb(87_221_255/0.6)]'
                  : isRelated
                    ? 'animate-pulse border-accent bg-accent/40 text-white'
                    : 'border-accent/40 bg-bg-0 text-accent hover:border-accent',
              )}
            >
              {item.current && !isExpanded && (
                <span className="absolute -inset-1.5 animate-ping rounded-full border border-accent/50 [animation-duration:2.5s]" />
              )}
              <Icon size={18} />
            </button>

            <div
              className={cn(
                'pointer-events-none absolute left-0 top-7 -translate-x-1/2 whitespace-nowrap text-center text-xs font-semibold tracking-wide transition-all duration-300',
                isExpanded ? 'text-white opacity-0' : 'text-text-soft/80',
              )}
            >
              {item.subtitle}
            </div>

            {isExpanded && (
              <div
                className="absolute left-0 top-10 w-[min(18rem,80vw)] -translate-x-1/2 rounded-xl border border-accent/30 bg-bg-0/95 p-4 text-left shadow-[0_12px_40px_rgb(87_221_255/0.18)] backdrop-blur-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-accent/50" />
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                      item.current
                        ? 'border-accent bg-accent/15 text-accent'
                        : 'border-white/15 bg-white/5 text-muted',
                    )}
                  >
                    {item.current ? 'Actual' : 'Completado'}
                  </span>
                  <span className="font-mono text-xs text-muted">{item.date}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                <div className="text-xs text-accent">{item.subtitle}</div>
                <p className="mt-2 text-xs leading-relaxed text-text-soft/90">{item.content}</p>

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded border border-accent/20 bg-accent/5 px-1.5 py-0.5 text-[10px] text-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {item.relatedIds.length > 0 && (
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <div className="mb-2 flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted">
                      <Link2 size={10} /> Relacionado
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.relatedIds.map((rid) => {
                        const rel = items.find((i) => i.id === rid)
                        if (!rel) return null
                        return (
                          <button
                            key={rid}
                            type="button"
                            onClick={() => toggle(rid)}
                            className="flex items-center gap-1 rounded border border-white/15 px-2 py-1 text-[11px] text-text-soft transition hover:border-accent hover:text-accent"
                          >
                            {rel.subtitle} <ArrowRight size={10} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
