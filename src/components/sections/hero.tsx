import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import avatar from '@/assets/avatar.webp'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { profile } from '@/data/portfolio'

function useTyping(phrases: string[]) {
  const [text, setText] = useState('')

  useEffect(() => {
    let p = 0
    let ch = 0
    let forward = true
    let timer: ReturnType<typeof setTimeout>

    const step = () => {
      const str = phrases[p]
      if (forward) {
        ch++
        setText(str.slice(0, ch))
        if (ch === str.length) {
          forward = false
          timer = setTimeout(step, 900)
          return
        }
      } else {
        ch--
        setText(str.slice(0, ch))
        if (ch === 0) {
          forward = true
          p = (p + 1) % phrases.length
        }
      }
      timer = setTimeout(step, forward ? 80 : 40)
    }
    step()
    return () => clearTimeout(timer)
  }, [phrases])

  return text
}

export function Hero() {
  const typed = useTyping(profile.typing)

  return (
    <header
      id="top"
      className="relative flex flex-col items-center gap-8 px-4 pb-10 pt-28 text-center md:px-6 md:pt-32 lg:flex-row lg:gap-12 lg:text-left"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="group relative shrink-0"
      >
        <div className="pointer-events-none absolute -inset-2.5 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--color-accent),transparent_45%,var(--color-accent-2)_65%,transparent_95%,var(--color-accent))] opacity-20 blur-lg" />
        <img
          src={avatar}
          alt={`Foto de ${profile.name}`}
          width={200}
          height={200}
          className="relative size-40 animate-float rounded-full border-4 border-accent/20 object-cover transition duration-300 group-hover:border-accent group-hover:shadow-[0_18px_44px_rgb(87_221_255/0.22)] md:size-[180px] lg:size-[200px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="min-w-0 flex-1"
      >
        <h1 className="mb-3.5 text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-tight tracking-tight">
          Hola, soy{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{profile.name}</span>
        </h1>

        <div className="min-h-[2.4em] font-mono text-[0.92rem] text-accent md:min-h-[1.6em] md:text-base" aria-live="off">
          {typed}
          <span className="ml-1 animate-blink" aria-hidden>
            ▌
          </span>
        </div>

        <p className="mb-5 mt-3.5 text-[1.05rem] text-muted">
          Desarrollador <strong className="font-semibold text-accent">web</strong> y{' '}
          <strong className="font-semibold text-accent">mobile</strong> enfocado en construir productos con buena
          experiencia y rendimiento.
        </p>

        <div className="relative mx-auto my-6 max-w-3xl lg:mx-0 overflow-hidden rounded-[10px] border-l-[3px] border-accent bg-gradient-to-br from-accent/[0.04] to-white/[0.015] px-4 py-5 text-left md:px-6">
          <p className="relative leading-[1.8] text-text-soft [&_strong]:font-semibold [&_strong]:text-accent">
            Soy <strong>Desarrollador Full Stack</strong> e <strong>{profile.degree}</strong>, apasionado por construir
            soluciones tecnológicas con impacto real. Trabajo en <strong>desarrollo web</strong> (React, Angular, Node.js)
            y <strong>aplicaciones móviles</strong> con Kotlin/Android y Flutter, cubriendo backend, frontend y base de
            datos. Me caracterizo por ser <strong>autodidacta, disciplinado y orientado a resultados</strong>, siempre
            buscando aprender, colaborar y aplicar mis habilidades en entornos que valoren la innovación y la mejora
            continua.
          </p>
          <BorderBeam size={140} duration={9} radius={10} />
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
          <ShimmerButton href="#projects">Ver proyectos</ShimmerButton>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-[10px] border border-accent/25 px-5 py-3 text-[0.95rem] font-bold text-accent transition hover:-translate-y-0.5 hover:bg-accent/[0.08]"
          >
            Contáctame
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </header>
  )
}
