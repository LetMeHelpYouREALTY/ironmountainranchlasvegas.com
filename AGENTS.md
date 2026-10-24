# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **single Next.js 14 (App Router) marketing / lead-gen website** (`heyberkshire-com`) — not a monorepo. Node deps install with **pnpm** (both `pnpm-lock.yaml` and `package-lock.json` exist, but pnpm is what the scripts assume). The startup update script already runs `pnpm install`, so you normally don't need to install anything.

Standard commands live in `package.json` scripts and `CONTRIBUTING.md`. Note: the root `README.md` is a leftover from the Vercel `nextjs-flask` starter (it describes an unrelated "FAQ Generator") — ignore it for setup; `CONTRIBUTING.md` is the accurate reference.

### Running the app (non-obvious)
- Start the dev server with **`pnpm run next-dev`** (Next.js on port 3000). Do **not** use `pnpm run dev` — that also launches `flask-dev`, a vestigial Python/Flask FAQ server that runs `pip install -r requirements.txt` on start and needs Python + extra env vars. The real-estate app does not use it (the `/api/*` routes are served by Next.js under `app/api`).
- **Do not run a production build (`pnpm run build` / `next build`) while `next-dev` is running.** The build overwrites `.next`, which makes the live dev server start returning HTTP 500. If that happens, stop dev, `rm -rf .next`, and restart `pnpm run next-dev`.
- Node: `.nvmrc` pins `20`; Node 22 also works fine (Next 14.2 supports Node ≥ 18.17). No `engines` field is enforced.

### Environment / integrations
- The site renders and is browsable with **no secrets**. All external integrations are optional but note their failure modes:
  - Lead capture API `POST /api/leads/capture` always calls Follow Up Boss, so without a valid `FUB_API_KEY` it returns HTTP 500 (`FUB API Error (401)`). It does not silently skip.
  - AI chat API `POST /api/chat` needs a valid `OPENROUTER_API_KEY`. The value committed in `.env` is malformed (doubled `sk-or-v1-` prefix) and returns 401 — replace it with a real key to use chat.
  - Upstash (rate limiting) and Turnstile (CAPTCHA) degrade gracefully / skip when unset.
- `components/chat/AIChatWidget.tsx` exists but is **not** imported into any layout, so no chat bubble appears on the site by default.

### Lint / type-check / test / build
- Lint: `pnpm run lint` (passes with warnings only). Type-check: `pnpm run type-check` (clean). Combined gate: `pnpm run validate` (type-check + lint + format:check).
- Tests: `pnpm run test:run` (Vitest). **Known pre-existing failure:** `tests/setup.ts` contains JSX (`<img .../>`) but has a `.ts` extension, so esbuild fails to transform it and the entire suite errors out before any test runs. This is committed on `main` and CI (`.github/workflows/pr-review.yml` → `npm run test:ci`) hits the same failure. Fix (if asked): rename `tests/setup.ts` → `tests/setup.tsx` and update `setupFiles` in `vitest.config.ts`.
- Build: `pnpm run build` compiles successfully (Next standalone output; Sentry wraps the config but is silent without a `SENTRY_AUTH_TOKEN`).
