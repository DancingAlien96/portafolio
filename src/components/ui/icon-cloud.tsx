// Inspirado en "Icon Cloud" (Magic UI / 21st.dev): esfera 3D de logos que gira sola
// y se puede arrastrar. Implementada en canvas, sin dependencias extra.
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Point = { x: number; y: number; z: number; img: HTMLImageElement }

// Distribuye N puntos uniformemente sobre una esfera (espiral de Fibonacci)
function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = []
  const offset = 2 / n
  const increment = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * increment
    pts.push([Math.cos(phi) * r, y, Math.sin(phi) * r])
  }
  return pts
}

export function IconCloud({ icons, className }: { icons: string[]; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const points: Point[] = fibonacciSphere(icons.length).map(([x, y, z], i) => {
      const img = new Image()
      img.src = icons[i]
      return { x, y, z, img }
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let size = 0
    let rotX = 0.3
    let rotY = 0
    let velX = 0
    let velY = reduceMotion ? 0 : 0.004
    let dragging = false
    let lastX = 0
    let lastY = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      size = canvas.clientWidth
      canvas.width = size * dpr
      canvas.height = size * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      frame = requestAnimationFrame(draw)
      if (!visible) return

      if (!dragging) {
        // Inercia que vuelve suavemente a la rotación automática
        velX *= 0.95
        velY = velY * 0.95 + (reduceMotion ? 0 : 0.004) * 0.05
      }
      rotX += velX
      rotY += velY

      const cx = size / 2
      const radius = size * 0.38
      const base = Math.max(22, size * 0.085)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      const projected = points
        .map((p) => {
          // Rotación en Y y luego en X
          const x1 = p.x * cosY + p.z * sinY
          const z1 = -p.x * sinY + p.z * cosY
          const y2 = p.y * cosX - z1 * sinX
          const z2 = p.y * sinX + z1 * cosX
          return { img: p.img, x: x1, y: y2, z: z2 }
        })
        .sort((a, b) => a.z - b.z)

      ctx.clearRect(0, 0, size, size)
      for (const p of projected) {
        const depth = (p.z + 1) / 2 // 0 atrás, 1 adelante
        const scale = 0.55 + depth * 0.6
        const s = base * scale
        const px = cx + p.x * radius
        const py = cx + p.y * radius

        ctx.globalAlpha = 0.25 + depth * 0.75
        ctx.beginPath()
        ctx.arc(px, py, s * 0.78, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10,14,26,0.85)'
        ctx.fill()
        ctx.strokeStyle = `rgba(87,221,255,${0.12 + depth * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()
        if (p.img.complete && p.img.naturalWidth) {
          ctx.drawImage(p.img, px - s / 2, py - s / 2, s, s)
        }
      }
      ctx.globalAlpha = 1
    }

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      velY = (e.clientX - lastX) * 0.005
      velX = (e.clientY - lastY) * 0.005
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = () => {
      dragging = false
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
    }
  }, [icons])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Esfera interactiva con los logos de mi stack tecnológico"
      className={cn('aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing', className)}
    />
  )
}
