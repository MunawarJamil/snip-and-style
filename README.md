# Snip & Style

> Where craft meets character.

An elevated salon booking experience for him and her — master stylists, premium
services, and online booking that respects your time. Built for two studios:
**Women** and **Men**.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** with a CSS-first theme, **shadcn/ui** components
- **TanStack Query v5** for client data
- **react-hook-form** + **zod** for forms and validation
- **framer-motion**, **sonner**, **date-fns** / **react-day-picker**

## Project Structure

```
frontend/              # pnpm workspace — all app code lives here
  src/
    app/               # App Router routes (marketing, auth, dashboard)
    features/          # feature-sliced data layer (api, hooks, schemas)
    components/        # shared UI + shadcn components
    lib/               # HTTP client, query setup, utilities
    config/            # site config + env validation
```

The frontend is decoupled from the backend and talks to an external API via
`NEXT_PUBLIC_API_URL`.

## Getting Started

> Requires **Node.js 20+** and **pnpm**. Run all commands from `frontend/`.

```bash
cd frontend
pnpm install

# Configure environment
cp .env.example .env.local   # then fill in the values

pnpm dev                     # start the dev server at http://localhost:3000
```

## Scripts

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Start the development server         |
| `pnpm build` | Create a production build            |
| `pnpm start` | Serve the production build           |
| `pnpm lint`  | Run ESLint                           |

## Environment Variables

Copy `frontend/.env.example` to `.env.local` and set:

| Variable                | Description                              |
| ----------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Public site URL                          |
| `NEXT_PUBLIC_SITE_NAME` | Display name of the site                 |
| `NEXT_PUBLIC_API_URL`   | Backend API base URL (no trailing slash) |

Env vars are validated with Zod at boot — the app fails fast on bad config.

## License

Private project. All rights reserved.
