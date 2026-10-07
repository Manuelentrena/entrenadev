# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Laravel 13 + Inertia.js v3 + React 19 portfolio/blog site (`laravel/react-starter-kit` base). PHP 8.5, TypeScript, Tailwind v4, shadcn/ui ("new-york" style, neutral base, Lucide icons).

This repo ships Laravel Boost (MCP server + guideline skills). Boost's own guidelines live in `AGENTS.md` and are authoritative for PHP/Laravel/Inertia/Pint/PHPUnit/Wayfinder conventions — read that file; this one only adds what Boost doesn't cover.

## Commands

**Dev loop** (runs server + queue + logs + vite concurrently): `composer run dev`

**Backend**
- Tests: `php artisan test --compact` (all), `php artisan test --compact tests/Feature/X.php` (file), `php artisan test --compact --filter=testName` (single test)
- Lint/format PHP: `vendor/bin/pint --dirty --format agent` (fix only changed files — run this before finalizing any PHP change)
- Full suite incl. lint: `composer test`

**Frontend**
- Lint: `npm run lint` (fix) / `npm run lint:check`
- Format: `npm run format` / `npm run format:check`
- Type check: `npm run types:check`
- Build: `npm run build` (needed after frontend changes if not running `npm run dev`/`composer run dev` — Inertia will throw a Vite manifest error otherwise)

**CI parity**: `composer run ci:check` runs lint:check (Pint) + npm lint:check + format:check + types:check + tests — mirrors `.github/workflows/ci.yml`.

## Spec workflow

This repo uses the `/spec` and `/spec-impl` skills (`.claude/skills/spec*`) for larger features: `/spec` turns a description into a numbered file in `specs/` through a guided Q&A, `/spec-impl NN-slug` implements an `Approved` spec step by step on its own branch. Skip them for small, obvious changes.

## Architecture

**Routing / typed frontend calls (Wayfinder)**: Backend routes (`routes/web.php`, `routes/settings.php`) and controller methods are mirrored into generated TypeScript in `resources/js/routes/` (named routes) and `resources/js/actions/` (controller actions). Never hand-write a URL string in a React page — import the generated function (e.g. `import { edit } from '@/routes/profile'`) and call `.url()`/`.get()`/`.post()`/`.form()`. Regenerate after adding/changing backend routes with `php artisan wayfinder:generate --with-form` (CI does this before building).

**Pages/layouts split**: `resources/js/pages/**` are Inertia page components rendered by `Inertia::render()` from controllers — one file per route. `resources/js/layouts/**` holds the shared shells (`app-layout`, `auth-layout`, `portfolio-layout`, `settings/layout`) that pages compose into. `resources/js/components/ui/**` is the shadcn primitive layer (don't hand-roll a primitive that already exists there); `resources/js/components/section/**` holds the portfolio page's content sections (work/projects/hackathons/contact).

**Blog is file-based, not DB-backed**: Posts are Markdown files with YAML front matter in `resources/content/blog/*.md` (fields: `title`, `summary`, `published_at`, `cover_image`). `App\Services\BlogService` reads/parses/sorts them (via `spatie/yaml-front-matter` + `league/commonmark`) and is the only place that knows about that directory; `BlogController` just calls `BlogService::all()`/`find($slug)`. To add a post, add a markdown file — no migration, no model, no seeder.

**Auth**: Handled by Laravel Fortify (`app/Actions/Fortify/*`, `config/fortify.php`, `FortifyServiceProvider`), not hand-written auth controllers — login/register/2FA/password-reset routes and controllers come from Fortify. `app/Concerns/*ValidationRules.php` traits hold shared validation rules (profile/password) used by Fortify actions and `Http/Requests/Settings/*`.

**Inertia request plumbing**: `HandleInertiaRequests` middleware shares global props (auth user, flash, etc.) to every page; `HandleAppearance` persists the light/dark/system appearance cookie server-side so SSR/first paint matches the client theme (paired with `use-appearance.tsx` on the frontend).

**DB**: Postgres everywhere — local dev via Sail's `compose.yaml` (service `pgsql`), CI spins up a `postgres:16` service container, production via `compose.prod.yaml`. `config/database.php` falls back to SQLite if `DB_CONNECTION` is unset, but the checked-in `.env.example` and this repo's actual local setup both point at Postgres; `database/database.sqlite` is a leftover, not the active store. Only `users`/`cache`/`jobs` (plus their Laravel-standard companion tables — sessions, password reset tokens, failed/batched jobs) exist — most content on the site (blog) deliberately bypasses the DB.

**Deployment**: Docker image built by `.github/workflows/docker.yml` on CI success, then `.github/workflows/deploy.yml` SSHes into the VPS and runs `docker compose -f compose.prod.yaml up -d` plus migrations — not Laravel Cloud, despite what Boost's generic guidance suggests.
