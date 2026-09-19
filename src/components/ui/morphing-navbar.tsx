// Inspirado en "Morphing Scroll Navbar" (21st.dev): barra completa arriba que,
// al hacer scroll, se transforma en una píldora flotante con indicador de sección activa.
import { useEffect, useState, type ComponentType } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

export type NavItem = {
  id: string
  label: string
  icon: ComponentType<{ size?: number; className?: string }>
}

export function MorphingNavbar({ brand, items }: { brand: string; items: NavItem[] }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  // Sección activa según lo que está en pantalla
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        // En orden del menú; sin ninguna visible (p. ej. en el hero) no se marca nada
        setActive(items.find((i) => visible.has(i.id))?.id ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <motion.nav
        layout
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className={cn(
          'pointer-events-auto flex items-center gap-2 border transition-colors duration-300',
          scrolled
            ? 'rounded-full border-accent/20 bg-bg-0/70 px-2 py-1.5 shadow-[0_8px_32px_rgb(0_0_0/0.35)] backdrop-blur-xl'
            : 'w-full max-w-6xl rounded-2xl border-transparent bg-transparent px-4 py-3',
        )}
      >
        <motion.a
          layout="position"
          href="#top"
          className={cn(
            'mr-auto whitespace-nowrap font-mono text-sm font-bold text-accent transition-all',
            scrolled ? 'hidden sm:block sm:px-2' : 'block',
          )}
        >
          {scrolled ? (
            '<CP />'
          ) : (
            <>
              <span className="min-[360px]:hidden">{'<CP />'}</span>
              <span className="hidden min-[360px]:inline">{brand}</span>
            </>
          )}
        </motion.a>

        <ul className="flex items-center gap-0.5">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative isolate flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm min-[360px]:px-3 font-medium transition-colors',
                    isActive ? 'text-accent' : 'text-text-soft/75 hover:text-white',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-lamp"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                    >
                      <span className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent shadow-[0_0_12px_3px_rgb(87_221_255/0.5)]" />
                    </motion.span>
                  )}
                  <Icon size={16} className="md:hidden" />
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="sr-only md:hidden">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </motion.nav>
    </div>
  )
}
