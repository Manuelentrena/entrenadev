# SPEC 02 — El contenido del blog dispara CI aunque el resto de `.md` se ignore

> **Estado:** Draft
> **Depende de:** —
> **Version bump:** Fix
> **Fecha:** 2026-10-07
> **Objetivo:** Un `.md` dentro de `resources/content/blog/**` dispara CI/build/deploy, mientras el resto de cambios solo-Markdown del repo (specs, docs, README) siguen sin dispararlo.

## Por qué existe este spec

`.github/workflows/ci.yml` tiene `paths-ignore: '**/*.md'` en push a `main`. `docker.yml` y `deploy.yml` dependen de que `CI (Lint & Tests)` termine (`workflow_run`), así que hoy **cualquier push que solo toque un `.md` nunca construye ni despliega nada**. Esto incluye los posts del blog (`resources/content/blog/*.md`), que es contenido real de producto, no documentación de repo. El plan de Keystatic (specs 03 y 05) depende de que publicar un post sí dispare el pipeline — si no se arregla esto antes, Keystatic "publicará" posts que nunca llegan a la web.

## Scope

**In:**

- Ajustar `paths-ignore` de `.github/workflows/ci.yml` para que `resources/content/blog/**` quede excluido de la regla de ignorar `.md`.
- Verificar que un cambio que solo toca `resources/content/blog/**` sí dispara `CI (Lint & Tests)` → `docker.yml` → `deploy.yml`.
- Verificar que un cambio que solo toca otro `.md` del repo (ej. `specs/*.md`, `README.md`) sigue sin disparar CI.

**Out of scope (para otros specs):**

- Cualquier cambio de rutas, locale o estructura de carpetas del blog (eso es el spec 04).
- Cualquier cambio al admin de Keystatic (spec 06).

## Data model

Este spec no introduce estructuras de datos nuevas. Solo cambia configuración de CI.

## Implementation plan

1. En `.github/workflows/ci.yml`, cambiar:

   ```yaml
   paths-ignore:
     - '**/*.md'
   ```

   por:

   ```yaml
   paths-ignore:
     - '**/*.md'
     - '!resources/content/blog/**'
   ```

   (GitHub Actions evalúa los patrones de `paths-ignore` en orden; el último patrón que matchea gana. La negación hace que los `.md` dentro de `resources/content/blog/**` sí cuenten como cambio relevante, aunque el resto de `.md` del repo siga ignorado.)

2. Probar en una rama: hacer un commit que solo añada/edite un archivo en `resources/content/blog/` y confirmar en la pestaña Actions de GitHub que `CI (Lint & Tests)` se dispara. Hacer un segundo commit que solo toque `README.md` (o cualquier otro `.md` fuera de esa carpeta) y confirmar que **no** se dispara.
3. Bump de versión: el repo no tiene hoy ningún campo `"version"` en `package.json` ni `composer.json`. Este spec crea esa referencia por primera vez, añadiendo `"version": "0.1.1"` a `package.json` (se asume `0.1.0` como punto de partida implícito, ver Decisiones). Los specs siguientes leen y actualizan ese mismo campo. No se publica ningún post de changelog (bump `Fix`).

## Acceptance criteria

- [ ] Un push que solo toca `resources/content/blog/**` dispara `CI (Lint & Tests)`.
- [ ] Un push que solo toca un `.md` fuera de `resources/content/blog/**` sigue sin disparar `CI (Lint & Tests)`.
- [ ] Un push que toca código normal (PHP/TS) sigue disparando CI exactamente igual que antes (no hay regresión).
- [ ] La versión se actualizó de `0.1.0` a `0.1.1` y no se creó ningún post de changelog.

## Decisions

- **Sí:** patrón de negación en `paths-ignore` en vez de quitar `**/*.md` del todo. Mantiene el beneficio original (no rebuildear por cada doc/readme) y solo abre la excepción necesaria.
- **No:** mover el contenido del blog fuera de `resources/content/` a una extensión no-`.md` (ej. `.mdx` o JSON) para evadir el filtro. Cambiaría `BlogService` y el formato de autoría sin necesidad — el patrón de negación resuelve el problema sin tocar nada más.
- **Sí:** asumir `0.1.0` como versión base del repo (no existía ningún campo de versión antes de este spec). Decisión tomada directamente con el usuario fuera de esta spec, al no haber ningún registro previo que consultar.

## What is **not** in this spec

- Reestructurar el contenido del blog por idioma (spec 04).
- Nada del admin de Keystatic (spec 06).
- Nada de rutas o locale (spec 03).

Cada uno de esos, si aterriza, va en su propio spec.
