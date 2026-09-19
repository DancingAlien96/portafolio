// Cuadrícula tipo Bento (categoría "Grids & Bento" de 21st.dev).
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function BentoGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('grid auto-rows-[minmax(18rem,auto)] grid-cols-1 gap-4 md:grid-cols-3', className)}>
      {children}
    </div>
  )
}

type BentoItemProps = HTMLAttributes<HTMLButtonElement> & {
  title: string
  description: string
  header?: ReactNode
  eyebrow?: ReactNode
}

export function BentoItem({ className, title, description, header, eyebrow, ...props }: BentoItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'group/bento relative flex flex-col overflow-hidden rounded-2xl border border-accent/10 bg-white/[0.025] p-4 text-left transition duration-300',
        'hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_16px_40px_rgb(87_221_255/0.14)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
      {...props}
    >
      {header}
      <div className="mt-4 flex flex-1 flex-col transition duration-300 group-hover/bento:translate-x-1">
        {eyebrow}
        <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-soft/85">{description}</p>
        <span className="mt-auto pt-3 text-xs font-medium text-accent opacity-70 transition group-hover/bento:opacity-100">
          Ver detalle →
        </span>
      </div>
    </button>
  )
}
