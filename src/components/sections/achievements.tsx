import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { SectionTitle } from '@/components/section-title'
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid'
import { achievements, type Achievement } from '@/data/portfolio'
import { cn } from '@/lib/utils'

// Tamaños del bento: el primero ocupa dos columnas para dar ritmo a la cuadrícula
const spans = ['md:col-span-2', '', '', 'md:col-span-2', 'md:col-span-2', '']

function Header({ item, wide }: { item: Achievement; wide: boolean }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl md:h-44">
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className={cn(
            'size-full object-cover transition duration-500 group-hover/bento:scale-105',
            wide ? 'object-center' : 'object-top',
          )}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgb(87_221_255/0.25),transparent_60%),linear-gradient(135deg,#0f1f33,#0a0e1a)]">
          <span className="text-6xl drop-shadow-[0_0_24px_rgb(87_221_255/0.5)]">{item.badge}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-0/70 via-transparent to-transparent" />
      {item.image && (
        <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-amber-300/95 text-xl shadow-[0_4px_12px_rgb(255_215_0/0.35)]">
          {item.badge}
        </span>
      )}
    </div>
  )
}

export function Achievements() {
  const [open, setOpen] = useState<Achievement | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="achievements" className="px-4 py-10 md:px-6">
      <SectionTitle>Reconocimientos y logros</SectionTitle>

      <BentoGrid>
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            className={cn('flex', spans[i % spans.length])}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 80px 0px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
          >
            <BentoItem
              className="w-full"
              title={item.title}
              description={item.summary}
              header={<Header item={item} wide={spans[i % spans.length] !== ''} />}
              eyebrow={<span className="text-xs italic text-muted">{item.issuer}</span>}
              onClick={() => setOpen(item)}
            />
          </motion.div>
        ))}
      </BentoGrid>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="achievement-title"
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-accent/25 bg-bg-1 shadow-[0_24px_60px_rgb(0_0_0/0.5)]"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Cerrar"
                autoFocus
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-bg-0/80 text-text transition hover:text-accent"
              >
                <X size={18} />
              </button>
              {open.image && <img src={open.image} alt={open.title} className="max-h-[50vh] w-full bg-black object-contain" />}
              <div className="p-5 md:p-7">
                <div className="text-sm italic text-muted">
                  {open.issuer}
                  {open.date && ` · ${open.date}`}
                </div>
                <h3 id="achievement-title" className="mt-1 text-xl font-semibold text-accent">
                  {open.badge} {open.title}
                </h3>
                <p className="mt-3 leading-[1.8] text-text-soft">{open.summary}</p>
                <p className="mt-3 leading-[1.8] text-text-soft">{open.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
