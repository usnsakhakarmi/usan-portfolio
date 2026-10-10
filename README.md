# Portfolio

Personal portfolio site built with Next.js (App Router, Cache Components), TypeScript and
Tailwind CSS v4. Every route is prerendered to static output.

## Requirements

- Node.js 24 (see `.nvmrc`)
- pnpm (`npm install -g pnpm`)

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Script           | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Start the dev server                             |
| `pnpm build`     | Production build (fails if a route isn't static) |
| `pnpm start`     | Serve the production build                       |
| `pnpm typecheck` | Generate route types and run `tsc`               |
| `pnpm lint`      | ESLint, including the jsx-a11y rules             |
| `pnpm format`    | Format with Prettier (sorts Tailwind classes)    |
| `pnpm check`     | Typecheck + lint + format check (same as CI)     |

## Project structure

```
src/
  app/                 Routes, root layout, global styles and design tokens (globals.css)
  components/
    layout/            Header, footer, navigation, theme toggle, skip link
    ui/                Presentational primitives (Container, Section, ...)
  content/             Site content as typed data (no content lives in components)
  lib/                 Utilities (cn, theme)
```

## Design tokens

Colours are semantic CSS variables defined once in `src/app/globals.css` (`bg`, `surface`,
`fg`, `muted`, `border`, `accent`, `accent-fg`) with light and dark values. Use the matching
Tailwind utilities (`bg-bg`, `text-muted`, `border-border`, ...) instead of raw colours.

## Updating content

All personal content lives in `src/content/`. Edit the data, save, and the site updates; no
component changes are needed.

| File         | What it holds                                            |
| ------------ | -------------------------------------------------------- |
| `profile.ts` | Name, title, intro, email, location, resume path         |
| `socials.ts` | Links shown in the hero and contact section (LinkedIn …) |
| `site.ts`    | Site URL and locale                                      |

Content is validated against the schemas in `src/lib/schema.ts`. A mistake (for example, an
invalid email or URL) stops `pnpm dev` / `pnpm build` with an error naming the bad field.
Optional fields (like `intro` or `resume`) are simply hidden on the site until they're filled
in.

## Deploying (static hosting, e.g. a `.com.np` cPanel host)

The site is a **static export**: no Node.js server is needed. `pnpm build` writes plain
HTML/CSS/JS to `out/`.

1. Create `.env.production` with your domain (see `.env.example`):
   `NEXT_PUBLIC_SITE_URL=https://your-domain.com.np`
2. Run `pnpm build`.
3. Upload **the contents of `out/`** (not the folder itself) to the web root on your host,
   usually `public_html/`. Include the hidden `.htaccess` file.
4. Open your domain. Updating the site later = edit content, `pnpm build`, upload again.

`out/.htaccess` (from `public/.htaccess`) sets security headers, HTTPS redirect, caching and
the 404 page on Apache/cPanel hosts. `public/_headers` does the same on Netlify/Cloudflare Pages.
