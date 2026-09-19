import { Briefcase, FolderGit2, Layers, Mail, Trophy } from 'lucide-react'
import { CircuitBackground } from '@/components/circuit-background'
import { Achievements } from '@/components/sections/achievements'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Stack } from '@/components/sections/stack'
import { Stats } from '@/components/sections/stats'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { MorphingNavbar, type NavItem } from '@/components/ui/morphing-navbar'
import { profile } from '@/data/portfolio'

const nav: NavItem[] = [
  { id: 'stack', label: 'Stack', icon: Layers },
  { id: 'projects', label: 'Proyectos', icon: FolderGit2 },
  { id: 'achievements', label: 'Logros', icon: Trophy },
  { id: 'experience', label: 'Experiencia', icon: Briefcase },
  { id: 'contact', label: 'Contacto', icon: Mail },
]

export default function App() {
  return (
    <>
      <CircuitBackground />
      <ScrollProgress />
      <MorphingNavbar brand={profile.name} items={nav} />
      <main className="relative z-[1] mx-auto max-w-[1100px]">
        <Hero />
        <Stats />
        <Stack />
        <Projects />
        <Achievements />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
