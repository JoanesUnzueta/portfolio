## Goal

Convert the portfolio from TanStack Start (SSR Worker app) to a plain static Vite + React SPA that can be deployed directly to GitHub Pages.

## What changes

### 1. Strip TanStack Start, keep Vite + React

Remove the SSR/router framework — it's overkill for a single-page image scroller and can't run on GitHub Pages.

- Delete: `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routes/`, `src/routeTree.gen.ts`, `wrangler.jsonc`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`
- Delete: `src/components/PortfolioPage.tsx` (unused)
- Remove deps: `@tanstack/react-start`, `@tanstack/react-router`, `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`, `wrangler`, `framer-motion`
- Add deps: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite` (already transitively present)

### 2. New entry points

- `index.html` at project root — standard Vite SPA shell with `<div id="root">` and `<script type="module" src="/src/main.tsx">`. Includes `<title>` and meta description.
- `src/main.tsx` — mounts `<App />` into `#root`, imports `./styles.css`.
- `src/App.tsx` — contains the current portfolio JSX (images + contact section) moved out of `src/routes/index.tsx`.

### 3. New `vite.config.ts`

Plain Vite config with React + Tailwind plugins and `base: './'` so assets resolve correctly under `username.github.io/repo-name/`.

### 4. GitHub Pages deployment

Add `.github/workflows/deploy.yml` that on push to `main`:
- installs deps with bun
- runs `bun run build`
- uploads `dist/` to GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages`

Add `public/.nojekyll` so GitHub Pages serves Vite's `_`-prefixed asset folders.

### 5. Update `package.json` scripts

```
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

## Result

After implementation, you will:
1. Push the repo to GitHub (via Lovable's GitHub integration).
2. In the repo's **Settings → Pages**, set Source to **GitHub Actions**.
3. The workflow runs automatically and publishes the site at `https://<username>.github.io/<repo-name>/`.

## Notes

- The portfolio has no server logic, so nothing is lost in the conversion.
- If you later want a custom domain (e.g. `username.github.io` root), I'd switch `base` to `'/'` and add a `CNAME` file.
