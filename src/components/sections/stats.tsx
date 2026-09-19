import { motion } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { achievements, projects, stack, startYear } from '@/data/portfolio'

const stats = [
  { value: new Date().getFullYear() - startYear, suffix: '+', label: 'Años de experiencia' },
  { value: stack.reduce((n, g) => n + g.items.length, 0), suffix: '+', label: 'Tecnologías' },
  { value: projects.length, suffix: '', label: 'Proyectos destacados' },
  { value: achievements.length, suffix: '', label: 'Reconocimientos' },
]

export function Stats() {
  return (
    <section aria-label="Resumen" className="px-4 pt-8 md:px-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-accent/10 bg-white/[0.025] px-4 py-5 text-center"
          >
            <div className="bg-gradient-to-b from-white to-accent bg-clip-text font-mono text-4xl font-bold tabular-nums text-transparent md:text-5xl">
              <NumberTicker value={s.value} delay={0.15 + i * 0.1} />
              {s.suffix}
            </div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted md:text-[0.8rem]">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
