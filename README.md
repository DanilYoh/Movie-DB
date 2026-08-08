# Movie Discovery

A responsive TMDB client for discovering films, browsing genres and keeping a personal rated list. The interface handles loading, empty results and offline state.

[Live demo](https://movie-psi-nine.vercel.app/)

## Highlights

- Debounced movie search with server-side pagination.
- Genre metadata and release-date formatting.
- Personal 10-point ratings and a dedicated rated tab.
- Explicit online/offline UI states.
- TMDB credentials supplied through environment variables rather than source code.
- Automated lint, service tests and production builds in GitHub Actions.

## Stack

React 18, Vite, Ant Design, date-fns, Vitest and ESLint.

## Local setup

Requirements: Node.js 20.19+, npm 10+ and a TMDB v3 API key.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Set `VITE_TMDB_API_KEY` in `.env.local`. Configure the same variable in Vercel before deploying this branch.

## Quality commands

```bash
npm run lint
npm run test
npm run build
npm run check
```
