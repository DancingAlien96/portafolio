import { useMemo } from 'react'

const LINES = 10
const NODES = 14

// Fondo de circuitos del sitio original: líneas con pulso de energía y nodos brillantes.
export function CircuitBackground() {
  const { lines, nodes } = useMemo(() => {
    const r = Math.random
    return {
      lines: Array.from({ length: LINES }, () => {
        const vertical = r() > 0.5
        const size = `${r() * 400 + 150}px`
        return {
          vertical,
          style: {
            top: `${r() * 100}%`,
            left: `${r() * 100}%`,
            animationDelay: `${r() * 2}s`,
            ...(vertical ? { height: size } : { width: size }),
          },
        }
      }),
      nodes: Array.from({ length: NODES }, () => ({
        top: `${r() * 100}%`,
        left: `${r() * 100}%`,
        animationDelay: `${r() * 2}s`,
      })),
    }
  }, [])

  return (
    <div className="circuit-bg" aria-hidden>
      {lines.map((l, i) => (
        <div key={i} className={l.vertical ? 'circuit-line circuit-line--vertical' : 'circuit-line'} style={l.style} />
      ))}
      {nodes.map((style, i) => (
        <div key={i} className="circuit-node" style={style} />
      ))}
    </div>
  )
}
