# streakme — landing page

the social streak platform where people build consistency together. this is phase 1: the marketing landing page.

## stack

- **bun** — package manager & runtime
- **react 19** + **typescript**
- **vite** — build tool
- **tailwind css v4** — css-first config (`@theme` in `src/styles/tokens.css`, no `tailwind.config.js`)
- **framer-motion** — scroll and load animations
- **react-router** — routing (ready for future pages)
- **react-helmet-async** — per-page SEO meta tags + JSON-LD

## getting started

```bash
bun install
bun dev        # http://localhost:5173
bun run build  # production build -> dist/
bun run preview
```

## design system

light mode uses the brand blue (`#287bff`), dark mode automatically switches the primary
to the brand green (`#2bd47d`). every color is a CSS variable defined once in
`src/styles/tokens.css` and consumed as Tailwind v4 theme tokens (`bg-(--color-primary)`,
`text-(--color-ink)`, etc.), so there is a single source of truth for the palette and
switching `[data-theme]` on `<html>` re-themes the whole app instantly. typography is a
single family, **Quicksand**, with hierarchy carried by size and weight.

toggle the theme with the sun/moon control in the navbar — the choice is persisted to
`localStorage` and otherwise falls back to the visitor's OS preference.

## folder structure

```
public/                     static assets served as-is (favicon, og image, robots.txt, sitemap.xml)
src/
  components/
    ui/                     small reusable primitives (Button, Logo, Eyebrow, ThemeToggle)
    layout/                 shared chrome (Navbar, Footer)
  hooks/
    use-theme.tsx           light/dark theme context + persistence
  lib/
    cn.ts                   clsx + tailwind-merge class helper
    seo.ts                  site metadata + JSON-LD structured data
  pages/
    landing/
      index.tsx             bundles the landing page + <Helmet> SEO tags
      sections/
        hero.tsx
        logo-cloud.tsx
        features.tsx
        how-it-works.tsx
        community.tsx
        testimonials.tsx
        cta.tsx
        index.ts             barrel export
  styles/
    index.css               tailwind import + base layer
    tokens.css               design tokens (@theme, light/dark variables)
  App.tsx                    router + providers
  main.tsx                   entry point
```

Adding a new page later means adding `src/pages/<name>/index.tsx` (with its own `sections/`
folder if it's complex) and registering the route in `App.tsx` — the landing page pattern is
the template to copy.

## SEO

- unique `<title>` / meta description / canonical URL, Open Graph + Twitter card tags, and
  `Organization` / `WebSite` / `SoftwareApplication` JSON-LD are all injected per-page via
  `react-helmet-async` (see `src/lib/seo.ts`).
- `public/sitemap.xml` and `public/robots.txt` are in place so this app's route <-> section
  anchors can pick up sitelinks once it's deployed and indexed.
- `public/og-image.svg` is a placeholder social share card — swap it for a rendered PNG/JPEG
  before launch, since not every crawler rasterizes SVG for `og:image`.

## notes / next phase

- the hero heatmap, feed cards, and stats are static illustrative data — wire these up once
  the streak/social API exists.
- `react-router` is installed and wired but only has the `/` route today; it's ready for
  `/login`, `/onboarding`, etc.
