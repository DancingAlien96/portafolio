// "Number Ticker" (Magic UI / 21st.dev): el número cuenta desde 0 al entrar en pantalla.
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

export function NumberTicker({ value, delay = 0, className }: { value: number; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, value, delay, motionValue])

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString()
      }),
    [spring],
  )

  return (
    <span ref={ref} className={className}>
      0
    </span>
  )
}
