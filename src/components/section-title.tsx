import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionTitle({ children, subtitle, className }: { children: ReactNode; subtitle?: string; className?: string }) {
  return (
    <div className={cn('mb-8', className)}>
      <h2 className="relative flex items-center gap-3.5 pb-3.5 text-[clamp(1.25rem,3vw,2rem)] font-bold uppercase tracking-[0.04em] text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-20 after:rounded-sm after:bg-gradient-to-r after:from-accent after:to-transparent">
        <span className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
        {children}
      </h2>
      {subtitle && <p className="mt-4 max-w-2xl text-[0.98rem] text-muted">{subtitle}</p>}
    </div>
  )
}
