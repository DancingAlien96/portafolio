import { Mail } from 'lucide-react'
import { profile } from '@/data/portfolio'
import { cn } from '@/lib/utils'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const links = [
  {
    label: 'WhatsApp',
    href: profile.whatsapp,
    className: 'from-[#25d366] to-[#128c7e]',
    icon: <img src="https://cdn.simpleicons.org/whatsapp/ffffff" width={24} height={24} alt="" className="size-6" />,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    className: 'from-[#0077b5] to-[#00a0dc]',
    icon: <LinkedInIcon className="size-6" />,
  },
  {
    label: 'GitHub',
    href: profile.github,
    className: 'from-[#24292e] to-[#57606a]',
    icon: <img src="https://cdn.simpleicons.org/github/ffffff" width={24} height={24} alt="" className="size-6" />,
  },
  {
    label: 'Correo',
    href: `mailto:${profile.email}`,
    className: 'from-[#0e7490] to-[#57ddff]',
    icon: <Mail className="size-6" />,
  },
]

export function Contact() {
  return (
    <section id="contact" className="px-4 pb-16 pt-10 md:px-6">
      <h2 className="mb-3 text-center text-[clamp(1.25rem,3vw,2rem)] font-bold uppercase tracking-[0.04em] text-white">
        Contacto
      </h2>
      <p className="mx-auto mb-8 max-w-md text-center text-muted">
        ¿Tienes un proyecto o una oportunidad? Escríbeme por el medio que prefieras.
      </p>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r px-5 py-4 font-bold text-white shadow-[0_12px_28px_rgb(0_0_0/0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgb(0_0_0/0.25)]',
              l.className,
            )}
          >
            {l.icon}
            {l.label}
          </a>
        ))}
      </div>
      <footer className="mt-14 text-center text-xs text-muted/70">
        © {new Date().getFullYear()} {profile.name} · Hecho con React, Tailwind y Motion
      </footer>
    </section>
  )
}
