# SPEC 06 — Admin de Keystatic self-hosted en el VPS

> **Estado:** Draft
> **Depende de:** SPEC 04
> **Version bump:** Minor
> **Fecha:** 2026-10-07
> **Objetivo:** Un admin web de Keystatic, corriendo en el propio VPS, permite crear/editar posts del blog en ambos idiomas abriendo un Pull Request por cada guardado.

## Por qué existe este spec

El usuario decidió self-hostear el admin de Keystatic (no Vercel) y usar un flujo de PR por post (no commit directo a `main`). Keystatic no es una alternativa a Markdown: sigue escribiendo `.md` con front matter YAML, solo cambia quién/cómo los escribe — por eso puede apuntar directamente a las carpetas `resources/content/blog/{en,es}/` creadas en el spec 04 sin que `BlogService` necesite cambiar. Este spec cubre únicamente lo que es código/repo; los pasos manuales de infraestructura (DNS, proxy del host, OAuth App, certificados) están en `docs/vps-keystatic-i18n-setup.md`, porque `/spec-impl` no puede ejecutar pasos manuales fuera del repo.

## Scope

**In:**

- `keystatic.config.ts` en la raíz del proyecto: dos colecciones, `blog-en` → `resources/content/blog/en/*.md` y `blog-es` → `resources/content/blog/es/*.md`, mismo esquema de campos que hoy (`title`, `summary`, `published_at`, `cover_image`, body).
- `storage.kind: 'github'` apuntando al repo `Manuelentrena/entrenadev`, en modo que abre un Pull Request por cada guardado (no commit directo a `main`).
- Un sidecar Node pequeño (Vite/Express) que sirve la UI de Keystatic + sus rutas de API (incluyendo el callback OAuth de GitHub), con su propio `Dockerfile` independiente del de la app principal.
- Nuevo servicio `keystatic` en `compose.prod.yaml` (puerto interno propio, sin volumen de contenido — habla con GitHub vía API, no necesita filesystem local).
- Nuevo workflow de GitHub Actions que construye y publica la imagen del sidecar a GHCR, independiente del pipeline `CI (Lint & Tests)` → `docker.yml` → `deploy.yml` de la app principal (un cambio de contenido no debería rebuildear el admin, y un cambio al admin no debería rebuildear la app PHP).

**Out of scope (para otros specs, y para la guía de VPS, no para un spec de código):**

- Creación de la GitHub OAuth App, registro DNS, edición del reverse proxy del host, emisión de certificado TLS — todo esto es manual, fuera del repo, y está documentado en `docs/vps-keystatic-i18n-setup.md`.
- Traducción del post existente al inglés vía Keystatic (se puede hacer después de que esto esté desplegado, no es parte de "construir el admin").
- Cualquier edición de contenido del portfolio desde Keystatic (el portfolio sigue siendo `resume.en.tsx`/`resume.es.tsx`, spec 05 — fuera de alcance de Keystatic por ahora).

## Data model

Este spec no introduce modelos de base de datos (Keystatic en modo `github` no usa DB, guarda todo como commits/PRs en git). Estructura de configuración nueva:

```ts
// keystatic.config.ts
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'Manuelentrena/entrenadev',
  },
  collections: {
    blogEn: collection({
      label: 'Blog (EN)',
      path: 'resources/content/blog/en/*',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary' }),
        published_at: fields.date({ label: 'Published at' }),
        cover_image: fields.url({ label: 'Cover image' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    blogEs: collection({
      label: 'Blog (ES)',
      path: 'resources/content/blog/es/*',
      slugField: 'title',
      schema: { /* mismo esquema que blogEn */ },
    }),
  },
});
```

## Implementation plan

1. Añadir `@keystatic/core` y las dependencias del sidecar (ej. Vite + un adaptador genérico/Express) en un `package.json` propio del sidecar, separado del `package.json` principal de la app (evita mezclar dependencias de un admin Node con el build de Vite de la app principal).
2. Escribir `keystatic.config.ts` con las dos colecciones `blog-en`/`blog-es` tal como arriba. Verificación manual: correr el sidecar en local (`npm run dev` dentro de su carpeta) y confirmar que el admin muestra ambas colecciones y lista el post existente de `es/`.
3. Configurar `storage.kind: 'github'` con el repo real. Verificación manual local: autenticar con una GitHub OAuth App de prueba (puede ser la misma que se cree en producción, ver guía de VPS) y confirmar que guardar un cambio de prueba abre un PR real en GitHub (y luego cerrarlo/descartarlo sin mergear).
4. Escribir el `Dockerfile` del sidecar (Node, build de la UI de Keystatic + arranque del servidor que sirve UI + API).
5. Añadir el servicio `keystatic` a `compose.prod.yaml`: imagen propia, puerto interno (ej. `8081:3000`), variables de entorno para el Client ID/secret de la OAuth App (sin volumen de contenido).
6. Crear el workflow de GitHub Actions que construye/publica la imagen del sidecar a GHCR, disparado solo por cambios en la carpeta del sidecar (no por cambios en `resources/content/blog/**` ni en el resto de la app) y añadir el paso de deploy correspondiente a `deploy.yml` (o un workflow de deploy separado) para que `docker compose -f compose.prod.yaml pull keystatic && up -d keystatic` se ejecute cuando esa imagen cambie.
7. Verificación manual end-to-end (requiere haber completado los pasos de `docs/vps-keystatic-i18n-setup.md` en el VPS): crear un post de prueba desde el admin desplegado, confirmar que abre PR en GitHub, mergear, confirmar que el deploy de la app principal se dispara (gracias al spec 02) y que el post aparece en `/es/blog/...` o `/en/blog/...`.
8. Bump de versión: `0.4.0` → `0.5.0` en `package.json`. No se publica post de changelog.

## Acceptance criteria

- [ ] El admin de Keystatic corre en local y lista las colecciones `blog-en`/`blog-es` con el contenido real de `resources/content/blog/`.
- [ ] Guardar un cambio desde el admin abre un Pull Request en GitHub (no un commit directo a `main`).
- [ ] `compose.prod.yaml` tiene el servicio `keystatic` definido, sin volumen de contenido.
- [ ] El workflow de build/push del sidecar es independiente del pipeline de la app principal (un cambio solo en `resources/content/blog/**` no reconstruye la imagen del sidecar, y viceversa).
- [ ] Tras desplegar (ver guía de VPS), crear un post real, mergear su PR, y verlo aparecer en la web sin pasos manuales adicionales.
- [ ] La versión quedó en `0.5.0` en `package.json` y no se creó ningún post de changelog.

## Decisions

- **Sí:** self-host en el VPS en vez de Vercel. Decisión explícita del usuario — todo queda en infraestructura propia.
- **Sí:** `storage.kind: 'github'` con flujo de PR, incluso self-hosted. El modo GitHub (vs. modo "local" de Keystatic) es lo que da el flujo de PR nativo y evita tener que gestionar credenciales de `git push` dentro del contenedor del admin.
- **Sí:** imagen y workflow de CI/CD propios para el sidecar, separados de la app principal. Evita que lint/tests de PHP bloqueen el deploy del CMS, y que un cambio de contenido del blog reconstruya innecesariamente el admin.
- **No:** usar Keystatic Cloud (el servicio de pago de Keystatic). El modo GitHub sin Cloud ya cubre el flujo de PR y la autoría de contenido; Cloud añade principalmente media library hospedada, que no hace falta porque `cover_image` ya es una URL externa, igual que hoy.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| El token/OAuth App de GitHub queda con más permisos de los necesarios | Limitar el scope de la OAuth App al repo concreto (`Manuelentrena/entrenadev`), nunca a toda la cuenta. |
| Un PR de Keystatic con contenido malformado rompe `BlogService` al mergear | `CI (Lint & Tests)` corre en el PR antes de poder mergear (gracias al spec 02, que ya no ignora `resources/content/blog/**`) — un front matter inválido debería fallar ahí, no en producción. |
| El sidecar queda huérfano si se abandona Keystatic más adelante | Al estar completamente aislado (su propio Dockerfile, su propio workflow, sin volumen compartido), se puede apagar quitando solo el servicio `keystatic` de `compose.prod.yaml` sin afectar la app principal. |

## What is **not** in this spec

- Nada de DNS, proxy del host, certificados TLS o creación de la OAuth App — eso es `docs/vps-keystatic-i18n-setup.md`.
- Edición del portfolio desde Keystatic.
- Traducción del post existente al inglés.

Cada uno de esos, si aterriza, va en su propio spec (o en la guía de VPS, cuando no es código).
