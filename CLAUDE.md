# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **Bun** as the package manager and runtime.

```bash
# Install dependencies
bun install

# Development server (runs basehub dev and astro dev concurrently)
bun dev
# Dev server runs at http://localhost:4321

# Build for production (runs basehub codegen then astro build)
bun build

# Preview production build
bun preview

# Astro CLI
bun astro [command]
```

## Architecture Overview

This is a personal portfolio site built with **Astro** (SSR mode) + **React** + **TailwindCSS v4** + **BaseHub CMS**.

### Tech Stack

- **Framework**: Astro 5 (server-side rendering enabled via `output: "server"`)
- **Deployment**: Vercel adapter (`@astrojs/vercel`)
- **Styling**: TailwindCSS v4 with custom theme, tw-animate-css for animations
- **CMS**: BaseHub for content management (writings/blog posts)
- **UI Components**: Mix of Astro components (.astro) and React components (.tsx)
- **Icons**: Lucide React
- **Fonts**: DM Sans Variable (sans), Instrument Serif (serif)

### Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (navbar, footer, sidebar, etc.)
│   │   ├── *.astro      # Astro components
│   │   └── *.tsx        # React components (clock, music, icons)
│   └── works/           # Work-specific components
├── layouts/
│   └── Layout.astro     # Main layout with navbar, sidebar, footer
├── lib/
│   ├── basehub.ts       # BaseHub client configuration
│   └── utils.ts         # Utility functions (cn for classnames)
├── pages/               # File-based routing
│   ├── index.astro      # Homepage
│   ├── writings/
│   │   ├── index.astro  # Writings list
│   │   └── [slug].astro # Dynamic writing pages
│   ├── works.astro
│   ├── archive.astro
│   └── socials.astro
├── assets/              # Images and static assets
└── styles/
    └── global.css       # Global styles with Tailwind theme
```

### Key Architectural Patterns

**Path Aliases**: The project uses `~/` as an alias for `src/` (configured in tsconfig.json).

**BaseHub Integration**:
- Content is fetched from BaseHub CMS using GraphQL-like queries
- Types are auto-generated in `basehub-types.d.ts` by running `basehub` command
- The BaseHub client handles environment-specific token loading (dev vs production)
- Used primarily for the writings/blog section with dynamic routing

**Dynamic Routes**:
- `/writings/[slug].astro` uses `getStaticPaths()` despite SSR mode being enabled
- Queries BaseHub for all writing slugs, then fetches individual writing data
- Uses `Astro.rewrite("/404.astro")` for missing content

**Styling System**:
- Custom TailwindCSS v4 theme with OKLCH colors defined in global.css
- Dark theme foundation (no light mode)
- Custom CSS for masonry layouts (`#masonry`, `#archive-masonry`)
- Custom marquee animation for scrolling text
- Rich text styling for BaseHub content (`.richtext` class)

**Component Patterns**:
- Container component for consistent page width/padding
- Layout component wraps all pages with consistent head/navbar/footer
- Client-side interactivity via Astro's `<script>` tags and React islands
- Uses Astro's View Transitions (`<ClientRouter />`) for SPA-like navigation

**Image Handling**:
- Uses Astro's built-in image optimization (`astro:assets`)
- WebP conversion in index.astro masonry gallery
- BaseHub images served via their CDN for writings

**Environment Variables**:
- `BASEHUB_TOKEN` required for CMS access (loaded from .env in dev, process.env in production)

### Styling Conventions

- Uses `cn()` utility (clsx + tailwind-merge) for conditional classnames
- Semantic color tokens (background, foreground, muted, accent, etc.)
- Font variables: `font-sans` (DM Sans), `font-serif` (Instrument Serif)
- Responsive design with mobile-first approach
- Custom CSS variables for radius and colors in `:root`
