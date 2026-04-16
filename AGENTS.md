# AGENTS.md

## Cursor Cloud specific instructions

### Overview

**Bodas de Hoy** is a Spanish-language wedding vendor directory and planning platform. This is a **frontend-only** Next.js 12 app (Pages Router) that consumes external GraphQL APIs.

### Node version

Requires **Node 18**. The project uses TypeScript 4.3.5, which is incompatible with newer `@types/node` versions (v20+). Use `nvm use 18` before running any commands.

### Package manager

Both `package-lock.json` and `yarn.lock` exist. Use **npm** with `--legacy-peer-deps` flag due to `react-quill` peer dependency conflict with React 17.

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (runs on port 4000) |
| Lint | `npm run lint` |
| Build | `npm run build` |

### Known issues

- **`npm run build` fails** due to a pre-existing lockfile issue: `react-day-picker@8.10.1` uses `export { type ... }` syntax unsupported by TypeScript 4.3.5. The dev server (`npm run dev`) works fine since it doesn't enforce full type checking at build time.
- Category and internal pages may show runtime errors when the external backend API (`api.bodasdehoy.com`) is unreachable or returns unexpected data. The homepage loads correctly regardless.

### External dependencies

All data comes from external services not in this repo:
- Primary GraphQL API: `https://api.bodasdehoy.com/graphql`
- Firebase Auth (project `bodasdehoy-1063`)
- Algolia search (App ID `4YG7QHCVEA`, index `bodasdehoy`)

### Environment variables

- `.env` contains `NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE` (Google API key, committed)
- `.env.production` contains production API URLs (committed)
- For dev, Next.js loads `.env` automatically. The `NEXT_PUBLIC_BASE_URL` is not set in dev mode (only in `.env.production`), so API calls to the backend will fail on internal pages; the homepage still renders.
