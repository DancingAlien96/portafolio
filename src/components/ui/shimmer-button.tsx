// Inspirado en "Shimmer Button" (Magic UI / 21st.dev): un destello cruza el botón
// periódicamente y el halo crece al pasar el cursor.
import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function ShimmerButton({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-[0.95rem] font-bold text-ink',
        'shadow-[0_8px_20px_rgb(87_221_255/0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgb(87_221_255/0.55)] active:translate-y-0',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        style={{ animation: 'shimmer-sweep 3.2s ease-in-out infinite' }}
      />
      <span className="relative">{children}</span>
    </a>
  )
}
