# Portafolio — Cristofer Pérez

Portafolio profesional de Desarrollador Full Stack, construido con **React + Vite + TypeScript + Tailwind CSS + Motion**.

## Componentes

Varios componentes están basados en la comunidad de [21st.dev](https://21st.dev/community/components):

| Componente | Archivo | Sección |
|---|---|---|
| Morphing Scroll Navbar | `src/components/ui/morphing-navbar.tsx` | Menú superior |
| Spotlight Card | `src/components/ui/spotlight-card.tsx` | Stack y proyectos |
| Bento Grid | `src/components/ui/bento-grid.tsx` | Reconocimientos |
| Radial Orbital Timeline | `src/components/ui/radial-orbital-timeline.tsx` | Experiencia (escritorio) |
| Icon Cloud | `src/components/ui/icon-cloud.tsx` | Stack |
| Number Ticker | `src/components/ui/number-ticker.tsx` | Cifras bajo el hero |
| Border Beam | `src/components/ui/border-beam.tsx` | Presentación del hero |
| Shimmer Button | `src/components/ui/shimmer-button.tsx` | Botón principal |
| Scroll Progress | `src/components/ui/scroll-progress.tsx` | Barra superior |

El proyecto tiene `components.json`, así que puedes instalar más componentes de 21st.dev / shadcn con `npx shadcn@latest add <url>`.

## Editar contenido

Todo el contenido (perfil, stack, proyectos, logros y experiencia) está en **`src/data/portfolio.ts`**. Para agregar un proyecto o un logro basta con añadir un elemento a la lista correspondiente. Las imágenes van en `src/assets/` (preferiblemente `.webp`).

## Desarrollo

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # genera la versión de producción en dist/
npm run preview   # sirve dist/ localmente
```

## Despliegue

- **GitHub Pages:** el workflow `.github/workflows/deploy.yml` compila y publica en cada push a `main`. En *Settings → Pages → Source* selecciona **GitHub Actions**.
- **Vercel / Netlify:** importa el repo; detectan Vite automáticamente (build `npm run build`, salida `dist`).
