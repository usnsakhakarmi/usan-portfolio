@AGENTS.md

## Shell

- `pnpm` is on PATH and works in PowerShell. Call `pnpm` directly. Never refresh the PATH
  with `$env:Path = [Environment]::GetEnvironmentVariable(...)`.

## Hosting

- The site is a static export (`output: "export"` in `next.config.ts`). `pnpm build` writes
  plain files to `out/`; there is no Node.js server in production. Don't add features that
  need one (route handlers using Request, server actions, `headers()`/redirects/rewrites in
  config, ISR, default image optimization, Cache Components / `ensureStatic`).
- Security headers live in `public/.htaccess` and `public/_headers`, not in `next.config.ts`.
