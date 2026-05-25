# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Read this first

This project uses **Next.js 16** (`next@16.2.6`) and **React 19**. From `frontend/AGENTS.md`:

> This is NOT the Next.js you know. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.

Treat anything you "remember" about Next.js APIs (especially around `fetch`, caching, `params`/`searchParams`, server actions, image config) as suspect until verified against the local docs.

## Repo layout

All app code lives in `frontend/` (a pnpm workspace). There is no backend in this repo — the frontend talks to an external API at `NEXT_PUBLIC_API_URL`. Run all commands from `frontend/`.

```
pnpm dev          # next dev
pnpm build        # next build
pnpm start        # next start (after build)
pnpm lint         # eslint (flat config; uses eslint-config-next + prettier)
```

There is no test runner configured. Don't fabricate test commands.

Package manager is **pnpm** (`pnpm-workspace.yaml` sets `ignoredBuiltDependencies: [sharp, unrs-resolver]`). Use `pnpm`, not `npm`/`yarn`.

## Stack

- Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/postcss`)
- shadcn/ui style `radix-nova`, icons via `lucide-react` — see `components.json`
- TanStack Query v5 for client data
- `react-hook-form` + `zod` + `@hookform/resolvers` for forms
- `sonner` for toasts, `framer-motion` for animation, `date-fns` + `react-day-picker` for dates
- Path alias: `@/*` → `frontend/src/*`

## Architecture

### Route groups (`src/app/`)
- `(marketing)` — public site. Has its own `layout.tsx` with `Navbar`/`Footer`/`WhatsappFab`/`Toaster`. Routes: `/`, `/services/[category]/[serviceId]`, `/book`.
- `(auth)` — `/login`, `/signup`. No marketing chrome.
- `dashboard/` — currently empty, reserved.
- Root `layout.tsx` wraps everything in `QueryProvider` and applies the Inter (`--font-inter`) and Playfair Display (`--font-display`) font variables.

### Feature-sliced data layer (`src/features/<feature>/`)

`categories` is the canonical pattern — copy its shape when adding new features:

```
features/categories/
  api/category.api.ts         # apiRequest() calls + Next fetch tags/revalidate
  services/category.service.ts # business logic (sort/filter/fallbacks) — server-side
  hooks/useCategories.ts      # "use client" — TanStack Query hooks
  schemas/category.schema.ts  # Zod schemas; types are z.infer of schemas
  queryKeys.ts                # hierarchical query key factory
  index.ts                    # public barrel — import from here, not from subpaths
```

Rules:
- `api/` returns validated data via `apiRequest({ schema })`. Add Next cache `tags` so server code can revalidate.
- `services/` is for **server** callers (Server Components, route handlers). Don't import it from `"use client"` files.
- `hooks/` is for **client** callers. Always typed `UseQueryOptions<TData, ApiError, TData>`.
- Schemas are the source of truth — derive TS types via `z.infer`, don't hand-write parallel interfaces. (Note: `src/types/index.ts` contains a legacy parallel set of hand-written types — prefer the Zod-derived ones from feature barrels.)

### HTTP client (`src/lib/api/`)

`apiRequest<T>()` in `client.ts` is the single fetch entry point. Features must go through it. It handles:
- URL building against `publicEnv.NEXT_PUBLIC_API_URL` (validated by Zod in `env.ts` at module load — boot fails fast on bad config).
- Per-request timeout (default 10s, `timeoutMs: 0` disables) wired through a linked `AbortController`.
- Bearer token via the `token` option — the client **never reads cookies/storage directly**. Callers pass tokens explicitly.
- Optional response validation when `schema` is provided.
- Next.js fetch directives via `next: { revalidate, tags }` and `noStore`.
- Throws `ApiError` (see `errors.ts`) with a stable `code` taxonomy (`NETWORK`, `TIMEOUT`, `UNAUTHORIZED`, `VALIDATION`, …). Use `isApiError()` to narrow.

### TanStack Query (`src/lib/query/`)

`getQueryClient()` returns a fresh client on the server and a singleton in the browser. Defaults: `staleTime` 60s, `gcTime` 5min, `refetchOnWindowFocus: false`. **Retry is disabled for `UNAUTHORIZED`/`FORBIDDEN`/`NOT_FOUND`/`VALIDATION`/`ABORTED`** — preserve this behavior when touching the client.

### Domain constraints

- `CategoryId` is a Zod enum: `"women" | "men"`. The whole site is built around these two studios — propagate the enum, don't widen to `string`.
- Prices are PKR; format with `formatPKR()` from `src/lib/utils.ts`. Durations format with `formatDuration()`.
- WhatsApp links go through `whatsappLink()` in `src/lib/whatsapp.ts` (reads `siteConfig.contact.whatsapp`). Don't hand-build `wa.me` URLs.
- Site-wide copy/contact/nav lives in `src/config/site.ts` (`siteConfig`). Keep hard-coded strings out of components.

## Styling

- Tailwind v4 with CSS-first config in `src/app/globals.css`. Custom theme tokens are declared via `@theme inline { --color-… }`.
- Brand palette tokens: `gold`, `gold-soft`, `gold-deep`, `ivory`, `ivory-dim`, `noir`, `noir-soft`, `noir-panel`. Per-category accents: `women`, `men`. **Use these tokens** (`bg-noir`, `text-gold`, `border-ivory/15`) rather than generic Tailwind colors.
- Font utility: `font-display` (Playfair) for headings, default sans (Inter) for body.
- shadcn components live in `src/components/ui/` (style: `radix-nova`, base color: `neutral`, no class prefix). Add new ones via the shadcn CLI rather than editing by hand.
- Prettier runs with `prettier-plugin-tailwindcss` (class sorting). `eslint-config-prettier` is last in the ESLint chain — don't reintroduce stylistic ESLint rules.

## Images

`next.config.ts` only allows `images.unsplash.com` and `plus.unsplash.com` as remote image hosts, with `qualities: [60, 75, 90]`. Adding a new external image source requires updating `remotePatterns`.

## Environment

Two Zod-validated env loaders, both fail fast at module load:
- `src/config/env.ts` — public site config (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`).
- `src/lib/api/env.ts` — `NEXT_PUBLIC_API_URL` (required, must be a URL).

See `frontend/.env.example` for the full set. Copy to `.env.local` for local dev.
