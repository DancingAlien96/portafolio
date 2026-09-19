import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { SectionTitle } from '@/components/section-title'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { projects, type Project } from '@/data/portfolio'

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <h3 className="mb-2 text-2xl font-semibold text-white">{project.title}</h3>
      <div className="mb-4 text-sm font-medium text-accent/90">{project.meta}</div>
      <div className="mb-3 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md border border-accent/20 bg-accent/[0.08] px-3 py-1.5 text-xs font-semibold text-accent">
            {t}
          </span>
        ))}
      </div>
      <p className="my-3.5 text-[0.95rem] leading-[1.8] text-text-soft">{project.summary}</p>
      <div className="my-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {project.features.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2.5 rounded-[10px] border-l-[3px] border-accent/30 bg-white/[0.015] px-3.5 py-3 transition hover:border-accent hover:bg-accent/[0.04]"
          >
            <Icon size={18} className="shrink-0 text-accent" aria-hidden />
            <span className="text-[0.88rem] text-text-soft">{text}</span>
          </div>
        ))}
      </div>
      {project.detail && <p className="text-[0.95rem] leading-[1.8] text-text-soft">{project.detail}</p>}
      {project.links && project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/10"
            >
              {l.label} <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="px-4 pt-10 md:px-6">
      <SectionTitle>Proyectos destacados</SectionTitle>

      {/* Proyecto principal con la animación de pantalla 3D al hacer scroll */}
      <div className="-mt-20 md:-mt-24">
        <ContainerScroll
          titleComponent={
            <p className="mb-4 font-mono text-sm text-accent md:text-base">
              <span className="text-muted">~/proyectos/</span>
              {featured.title.toLowerCase().replace(/\s+/g, '-')}
            </p>
          }
        >
          <img
            src={featured.image}
            alt={`Captura de ${featured.title}`}
            className="size-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="-mt-16 space-y-5 sm:-mt-10 md:-mt-24">
        <SpotlightCard className="p-5 md:p-7">
          <ProjectBody project={featured} />
        </SpotlightCard>

        {rest.map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 80px 0px' }}
            transition={{ duration: 0.45 }}
          >
            <SpotlightCard className="p-5 md:p-7">
              <div className="mb-6 overflow-hidden rounded-xl shadow-[0_8px_24px_rgb(0_0_0/0.3)]">
                <img
                  src={project.image}
                  alt={`Captura de ${project.title}`}
                  loading="lazy"
                  className="w-full transition duration-300 group-hover/spot:scale-[1.02]"
                />
              </div>
              <ProjectBody project={project} />
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
