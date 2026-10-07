# EntrenaDev

Personal portfolio and blog, built on Laravel + Inertia.js + React. Live at [entrena.dev](https://entrena.dev).

## Stack

- **Backend:** Laravel 13, PHP 8.5, Inertia.js v3, Laravel Fortify (auth), Laravel Wayfinder (typed routes)
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui ("new-york" style)
- **Database:** PostgreSQL (local via Sail, CI, and production)
- **Deployment:** Docker image published to GHCR, deployed to a VPS via `docker compose`

## Features

- Portfolio home page with work, projects, hackathons, and contact sections
- File-based blog — posts are Markdown files with YAML front matter, no database or admin needed
- Full auth flow via Fortify: registration, login, password reset, email verification, two-factor authentication (TOTP + recovery codes)
- User settings: profile, security (password/2FA), appearance (light/dark/system, persisted server-side)

## Getting started

Requirements: PHP 8.3+, Composer, Node 20+, npm, Docker (for Postgres via Sail).

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate

# Start Postgres (Sail) in the background, then run migrations
./vendor/bin/sail up -d pgsql
php artisan migrate

php artisan wayfinder:generate --with-form
```

Run the full dev loop (PHP server, queue listener, log tail, and Vite, all concurrently):

```bash
composer run dev
```

## Commands

**Backend**
- `php artisan test --compact` — run tests (add a path or `--filter=name` to scope it)
- `vendor/bin/pint --dirty --format agent` — fix lint on changed PHP files only
- `composer test` — full backend suite incl. lint

**Frontend**
- `npm run lint` / `npm run lint:check` — ESLint (fix / check)
- `npm run format` / `npm run format:check` — Prettier
- `npm run types:check` — TypeScript
- `npm run build` — production build (required after frontend changes unless `npm run dev` is running)

**Everything CI checks:**

```bash
composer run ci:check
```

See `CLAUDE.md` for architecture notes and conventions, and `AGENTS.md` for Laravel Boost's framework-level guidelines.

## CI/CD

- `.github/workflows/ci.yml` — lint + typecheck + tests on every PR and push to `main`
- `.github/workflows/docker.yml` — builds and pushes the Docker image to GHCR after CI succeeds on `main`
- `.github/workflows/deploy.yml` — SSHes into the VPS and runs `docker compose -f compose.prod.yaml up -d` plus migrations after a successful image push

## License

No license file is currently set — all rights reserved by default.
