import { Monitor, Smartphone, Wrench } from 'lucide-react'
import { motion } from 'motion/react'
import { SectionTitle } from '@/components/section-title'
import { IconCloud } from '@/components/ui/icon-cloud'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { stack, type StackGroup } from '@/data/portfolio'

const cloudIcons = stack.flatMap((g) => g.items.map((i) => i.icon))

const groupIcon: Record<StackGroup['kind'], typeof Monitor> = {
  web: Monitor,
  mobile: Smartphone,
  tools: Wrench,
}

export function Stack() {
  return (
    <section id="stack" className="px-4 py-10 md:px-6">
      <SectionTitle>Stack tecnológico</SectionTitle>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto -mt-2 mb-6 w-full max-w-[340px] md:max-w-[400px]"
      >
        <div className="pointer-events-none absolute inset-[18%] rounded-full bg-accent/10 blur-3xl" />
        <IconCloud icons={cloudIcons} className="relative" />
        <p className="-mt-2 text-center font-mono text-xs text-muted">↻ arrastra la esfera</p>
      </motion.div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => {
          const Icon = groupIcon[group.kind]
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 80px 0px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <SpotlightCard className="h-full p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3 border-b border-dashed border-accent/15 pb-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-accent/25 bg-accent/[0.08] text-accent">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-3 py-[7px] text-[0.83rem] font-medium leading-none text-[#eaf8ff] transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
                    >
                      <img src={item.icon} width={16} height={16} alt="" loading="lazy" className="size-4" />
                      {item.name}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
