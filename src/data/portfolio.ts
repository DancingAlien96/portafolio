import {
  BarChart3,
  CalendarDays,
  Car,
  CreditCard,
  Landmark,
  Link2,
  GraduationCap,
  Network,
  Package,
  Plane,
  Presentation,
  ShoppingCart,
  Smartphone,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import ecodama from '@/assets/ecodama.webp'
import aquaequipos from '@/assets/aquaequipos.webp'
import vehiculos from '@/assets/vehiculos.webp'
import movilidad from '@/assets/movilidad.webp'
import tallercunori from '@/assets/tallercunori.webp'
import tecnicointecap from '@/assets/tecnicointecap.webp'
import plantrifinio from '@/assets/plantrifinio.webp'
import kotlin from '@/assets/kotlin.webp'

export const profile = {
  name: 'Cristofer Pérez',
  role: 'Desarrollador Full Stack',
  degree: 'Ingeniero en Ciencias y Sistemas',
  email: 'cristoferperez3@gmail.com',
  whatsapp: 'https://wa.me/50233074483',
  linkedin: 'https://www.linkedin.com/in/cristofer-perez-8b4b67140',
  github: 'https://github.com/DancingAlien96',
  typing: [
    'Hola — bienvenido a mi portafolio',
    'Desarrollador Full Stack',
    'Web • React, Angular, Node.js',
    'Mobile • Kotlin, Flutter',
    'Construyo productos con foco en UX y rendimiento',
  ],
}

// Año del primer empleo (Instructor de Electrónica); se usa para calcular los años de experiencia
export const startYear = 2021

const icon = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`

export type StackGroup = {
  title: string
  kind: 'web' | 'mobile' | 'tools'
  items: { name: string; icon: string }[]
}

export const stack: StackGroup[] = [
  {
    title: 'Desarrollo Web',
    kind: 'web',
    items: [
      { name: 'React', icon: icon('react', '61DAFB') },
      { name: 'Angular', icon: icon('angular', 'DD0031') },
      { name: 'Next.js', icon: icon('nextdotjs', 'ffffff') },
      { name: 'Node.js', icon: icon('nodedotjs', '339933') },
      { name: 'Express', icon: icon('express', 'ffffff') },
      { name: 'JavaScript', icon: icon('javascript', 'F7DF1E') },
      { name: 'TypeScript', icon: icon('typescript', '3178C6') },
      { name: 'HTML5', icon: icon('html5', 'E34F26') },
      { name: 'CSS3', icon: icon('css', '1572B6') },
      { name: 'MySQL', icon: icon('mysql', '4479A1') },
      { name: 'PostgreSQL', icon: icon('postgresql', '4169E1') },
    ],
  },
  {
    title: 'Desarrollo Mobile',
    kind: 'mobile',
    items: [
      { name: 'Kotlin', icon: icon('kotlin', '7F52FF') },
      { name: 'Android Nativo', icon: icon('android', '3DDC84') },
      { name: 'Flutter', icon: icon('flutter', '02569B') },
      { name: 'Dart', icon: icon('dart', '0175C2') },
      { name: 'Jetpack Compose', icon: icon('jetpackcompose', '4285F4') },
      { name: 'Material Design', icon: icon('materialdesign', 'ffffff') },
    ],
  },
  {
    title: 'Herramientas',
    kind: 'tools',
    items: [
      { name: 'Git', icon: icon('git', 'F05032') },
      { name: 'GitHub', icon: icon('github', 'ffffff') },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Android Studio', icon: icon('androidstudio', '3DDC84') },
      { name: 'Postman', icon: icon('postman', 'FF6C37') },
      { name: 'Figma', icon: icon('figma', 'F24E1E') },
      { name: 'Linux', icon: icon('linux', 'FCC624') },
    ],
  },
]

export type Project = {
  title: string
  meta: string
  image: string
  tech: string[]
  summary: string
  features: { icon: LucideIcon; text: string }[]
  detail?: string
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: 'EcoDama',
    meta: 'SaaS en producción · Reservas para salones de belleza',
    image: ecodama,
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Nginx'],
    summary:
      'Plataforma SaaS de citas para salones, spas y profesionales de la belleza. Cada salón obtiene su propia página de reservas, cobra anticipos y gestiona su agenda y clientas desde un panel administrativo.',
    features: [
      { icon: CalendarDays, text: 'Calendario inteligente con bloqueos y disponibilidad' },
      { icon: Link2, text: 'Página de reservas única por salón, optimizada para móvil' },
      { icon: Landmark, text: 'Anticipos por transferencia con aprobación de comprobantes' },
      { icon: BarChart3, text: 'Panel con métricas de ingresos, ocupación y retención' },
    ],
    detail:
      'Producto propio, diseñado, desarrollado y desplegado de principio a fin: desde la experiencia de reserva de las clientas hasta el panel de administración y la infraestructura en servidor propio.',
    links: [{ label: 'Visitar ecodama.online', href: 'https://ecodama.online' }],
  },
  {
    title: 'Ecommerce Aqua Equipos',
    meta: 'Desarrollo Full Stack · E-commerce',
    image: aquaequipos,
    tech: ['React', 'Node.js', 'TiloPay', 'MySQL'],
    summary:
      'Plataforma de comercio electrónico para Aqua Equipos, especializada en la venta de bombas de agua y productos relacionados. Los clientes exploran el catálogo completo, realizan pedidos y pagan de forma segura.',
    features: [
      { icon: ShoppingCart, text: 'Carrito de compras y gestión de pedidos' },
      { icon: CreditCard, text: 'Pagos con tarjeta de débito/crédito integrados' },
      { icon: Package, text: 'Sistema de envíos y seguimiento' },
      { icon: Smartphone, text: 'Diseño responsive para todos los dispositivos' },
    ],
    detail:
      'Desarrollé la solución completa desde cero —backend, frontend y base de datos—, implementando pasarelas de pago seguras y optimizando la experiencia de usuario para maximizar conversiones.',
    // Agrega aquí enlaces a demo o repositorio, p. ej. { label: 'Ver sitio', href: 'https://…' }
    links: [],
  },
  {
    title: 'Sistema de Solicitud y Gestión de Vehículos CUNORI',
    meta: 'Desarrollo Full Stack · Sistema Académico',
    image: vehiculos,
    tech: ['Angular', 'Node.js', 'MySQL'],
    summary:
      'Aplicación web colaborativa, desarrollada junto a dos compañeros, para gestionar las solicitudes de vehículos de la universidad usados en viajes académicos, actividades administrativas y eventos especiales.',
    features: [
      { icon: Car, text: 'Gestión de solicitudes de vehículos' },
      { icon: CalendarDays, text: 'Calendario y programación de reservas' },
      { icon: Users, text: 'Panel administrativo multiusuario' },
    ],
    links: [],
  },
]

export type Achievement = {
  title: string
  issuer: string
  icon: LucideIcon
  summary: string
  detail: string
  image?: string
  date?: string
}

// Resumen corto visible en la tarjeta; el detalle completo se abre al hacer clic.
export const achievements: Achievement[] = [
  {
    title: 'Cierre de Pensum — Ingeniería en Ciencias y Sistemas',
    issuer: 'Universidad de San Carlos de Guatemala · CUNORI',
    icon: GraduationCap,
    date: 'Noviembre 2025',
    summary: 'Completé la totalidad de cursos de la carrera de Ingeniería en Ciencias y Sistemas.',
    detail:
      'Constancia de cierre de pensum emitida por Control Académico del Centro Universitario de Oriente, que acredita el cumplimiento de todos los requisitos académicos de la carrera de Ingeniería en Ciencias y Sistemas a nivel de grado.',
  },
  {
    title: 'Movilidad Académica Internacional',
    issuer: 'USAC · Coordinadora General de Cooperación y Relaciones Internacionales',
    icon: Plane,
    image: movilidad,
    summary: 'Representé a mi universidad en un programa académico de carácter internacional.',
    detail:
      'La distinción destaca mi capacidad para representar a mi institución en espacios globales, aportando conocimiento, disciplina y una visión orientada a la colaboración internacional. Refleja competencias como liderazgo, adaptabilidad y compromiso con estándares académicos de alto nivel, y mi interés en generar impacto más allá del entorno local.',
  },
  {
    title: 'Facilitador de Taller de Automatización',
    issuer: 'USAC · Programa de Formación Docente CUNORI',
    icon: Workflow,
    image: tallercunori,
    summary: 'Capacité a docentes universitarios en automatizar el envío de diplomas con Google Sheets y Autocrat.',
    detail:
      'Compartí soluciones prácticas orientadas a la automatización de procesos académicos, optimizando la generación y distribución de documentos mediante herramientas digitales. Refleja mi capacidad para diseñar soluciones tecnológicas aplicadas a la educación y transferir conocimiento técnico de forma clara.',
  },
  {
    title: 'Administrador de Equipos de Red CISCO',
    issuer: 'INTECAP',
    icon: Network,
    image: tecnicointecap,
    summary: 'Formación en gestión, configuración y mantenimiento de infraestructuras de red y telecomunicaciones.',
    detail:
      'Adquirí conocimientos en redes, protocolos de comunicación, administración de dispositivos y resolución de problemas bajo un enfoque práctico. Esta base me permite entender y trabajar con las infraestructuras que soportan sistemas digitales, automatizaciones y servicios en línea.',
  },
  {
    title: 'Facilitador en Talleres de Reforzamiento',
    issuer: 'USAC · CUNORI · Plan Trifinio',
    icon: Presentation,
    image: plantrifinio,
    summary: 'Impartí talleres de matemática, física, lenguaje y química a aspirantes universitarios.',
    detail:
      'Contribuí a la preparación de estudiantes para su ingreso a la universidad, estructurando contenidos, comunicando de forma efectiva y adaptándome a distintos niveles de aprendizaje. Refleja mi compromiso con la educación y el impacto social.',
  },
  {
    title: 'Kotlin Everywhere & Google I/O Extended',
    issuer: 'Comunidades de Desarrolladores · Ecosistema Google',
    icon: Smartphone,
    image: kotlin,
    summary: 'Participación en el evento de Kotlin y Google I/O Extended de la región de Oriente.',
    detail:
      'Fortalecí mis conocimientos en desarrollo de software moderno, especialmente en Kotlin, y en las tendencias presentadas en Google I/O: buenas prácticas, herramientas del ecosistema Google y enfoques innovadores para crear soluciones digitales.',
  },
]

export type Job = {
  id: number
  title: string
  company: string
  period: string
  description: string
  skills?: string[]
  current?: boolean
  icon: 'building' | 'code' | 'school' | 'cpu'
  relatedIds: number[]
}

// Del más reciente al más antiguo
export const experience: Job[] = [
  {
    id: 1,
    title: 'Desarrollador Full Stack',
    company: 'Aqua Equipos',
    period: 'Actualmente',
    current: true,
    icon: 'building',
    description:
      'Desarrollo y mantenimiento de la plataforma de comercio electrónico de la empresa: backend, frontend y base de datos. Integración de pasarelas de pago, gestión de catálogo y optimización de la experiencia de compra.',
    skills: ['React', 'Node.js', 'MySQL', 'TiloPay'],
    relatedIds: [2],
  },
  {
    id: 2,
    title: 'Desarrollador Full Stack',
    company: 'Freelance',
    period: 'Independiente',
    icon: 'code',
    description:
      'Backend, frontend y base de datos para proyectos creados desde cero, con enfoque en soluciones escalables y buena experiencia de usuario.',
    skills: ['React', 'Node.js', 'MySQL', 'PostgreSQL'],
    relatedIds: [1],
  },
  {
    id: 3,
    title: 'Facilitador de Taller Tecnológico',
    company: 'Centro Universitario de Oriente',
    period: '2025',
    icon: 'school',
    description:
      'Taller a docentes universitarios sobre la automatización del envío de diplomas con Google Sheets y Autocrat, promoviendo la transformación digital en procesos académicos.',
    relatedIds: [4],
  },
  {
    id: 4,
    title: 'Instructor de Electrónica',
    company: 'Instituto Privado de Oriente ITPO',
    period: '2021 – 2023',
    icon: 'cpu',
    description:
      'Clases de electrónica a nivel técnico, desarrollando habilidades pedagógicas y la capacidad de transmitir conocimientos técnicos complejos.',
    relatedIds: [3],
  },
]
