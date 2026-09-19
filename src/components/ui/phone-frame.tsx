// Marco de teléfono para mostrar la versión móvil de un proyecto sobre su captura de escritorio.
import { cn } from '@/lib/utils'

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.1rem] border-[4px] border-[#0b0f17] bg-black shadow-[0_18px_40px_rgb(0_0_0/0.55),0_0_0_1px_rgb(255_255_255/0.12)] sm:rounded-[1.6rem] sm:border-[6px]',
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-1 z-10 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-[#0b0f17] sm:top-1.5 sm:h-2.5"
      />
      <img src={src} alt={alt} loading="lazy" draggable={false} className="block w-full" />
    </div>
  )
}
