import { useEffect, useState } from 'react'
import { Building2, Code2, Cpu, GraduationCap } from 'lucide-react'
import { SectionTitle } from '@/components/section-title'
import { RadialOrbitalTimeline, type OrbitalItem } from '@/components/ui/radial-orbital-timeline'
import { experience, type Job } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const icons: Record<Job['icon'], OrbitalItem['icon']> = {
  building: Building2,
  code: Code2,
  school: GraduationCap,
  cpu: Cpu,
}

const items: OrbitalItem[] = experience.map((job) => ({
  id: job.id,
  title: job.title,
  subtitle: job.company,
  date: job.period,
  content: job.description,
  tags: job.skills,
  current: job.current,
  icon: icons[job.icon],
  relatedIds: job.relatedIds,
}))

function useIsDesktop() {
  const query = '(min-width: 768px)'
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return matches
}

// En móvil la órbita queda muy apretada: se muestra una línea de tiempo vertical.
function MobileTimeline() {
  return (
    <ol className="relative ml-2 space-y-5 border-l-2 border-accent/30 pl-6">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.id} className="relative">
            <span
              className={cn(
                'absolute -left-[2.4rem] top-4 flex size-7 items-center justify-center rounded-full border-2 bg-bg-0 text-accent',
                item.current ? 'border-accent shadow-[0_0_14px_rgb(87_221_255/0.6)]' : 'border-accent/40',
              )}
            >
              <Icon size={14} />
            </span>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <span
                className={cn(
                  'inline-block rounded-md border px-2.5 py-0.5 text-xs font-semibold',
                  item.current ? 'border-accent bg-accent/15 text-accent' : 'border-accent/20 bg-accent/[0.08] text-accent',
                )}
              >
                {item.date}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <div className="text-sm text-muted">{item.subtitle}</div>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-text-soft">{item.content}</p>
              {item.tags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-md border border-accent/15 bg-accent/[0.06] px-2 py-1 text-xs text-accent">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function Experience() {
  const isDesktop = useIsDesktop()

  return (
    <section id="experience" className="px-4 py-10 md:px-6">
      <SectionTitle subtitle={isDesktop ? 'Haz clic en cada punto de la órbita para ver el detalle.' : undefined}>
        Experiencia laboral
      </SectionTitle>
      {isDesktop ? <RadialOrbitalTimeline items={items} /> : <MobileTimeline />}
    </section>
  )
}
