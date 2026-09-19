// "Scroll Progress" (Magic UI / 21st.dev): barra superior que se llena al hacer scroll.
import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-accent via-accent-2 to-indigo-400 shadow-[0_0_10px_rgb(87_221_255/0.6)]"
    />
  )
}
