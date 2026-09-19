// Basado en "Container Scroll Animation" de @manuarora700 (21st.dev / Aceternity UI).
// Adaptado: motion/react, alto de sección menor y tarjeta con proporción fija para capturas.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

export function ContainerScroll({
  titleComponent,
  children,
  overlay,
}: {
  titleComponent: ReactNode
  children: ReactNode
  /** Elemento que sobresale de la pantalla y gira con ella (p. ej. la vista móvil) */
  overlay?: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.85, 1] : [1.05, 1])
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[30rem] items-center sm:h-[40rem] justify-center p-2 md:h-[56rem] md:p-12"
    >
      <div className="relative w-full py-10 md:py-20" style={{ perspective: '1000px' }}>
        <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
          {titleComponent}
        </motion.div>
        <Card rotate={rotate} scale={scale} overlay={overlay}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Card({
  rotate,
  scale,
  children,
  overlay,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
  overlay?: ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="relative mx-auto -mt-8 w-full max-w-5xl rounded-[24px] border-4 border-[#3a4655] bg-[#141b27] p-2 md:rounded-[30px] md:p-4"
    >
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-bg-1">{children}</div>
      {overlay}
    </motion.div>
  )
}
