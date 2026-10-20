# SPEC 03 — Rutas con prefijo de idioma (`/en`, `/es`) en Laravel/Inertia

> **Estado:** Draft
> **Depende de:** SPEC 02
> **Version bump:** Minor
> **Fecha:** 2026-10-07
> **Objetivo:** Las páginas de la web se sirven bajo `/en` y `/es`, con redirect automático desde las rutas actuales sin prefijo para no romper enlaces existentes.

## Por qué existe este spec

Hoy no hay ninguna infraestructura de locale: `config/app.php` tiene el default de Laravel sin usar y no existe middleware de idioma. El usuario decidió explícitamente prefijo de path (`/en`, `/es`) sobre subdominios (`es.entrena.dev`) porque no requiere DNS nuevo, no toca `SESSION_DOMAIN`, y el certificado TLS actual ya lo cubre. Este spec es la base de la que dependen el blog por idioma (spec 04) y la traducción del portfolio (spec 05) — ambos necesitan saber en qué idioma está la request actual.

## Scope

**In:**

- Middleware `SetLocale` que valida el segmento `{locale}` contra `['en', 'es']`, llama a `App::setLocale($locale)`, devuelve 404 si no es un locale soportado.
- Grupo de rutas con prefijo `{locale}` envolviendo las rutas de `routes/web.php` que hoy dependen de contenido traducible (home, blog index, blog show).
- Redirect 301 desde las rutas actuales sin prefijo (`/`, `/blog`, `/blog/{slug}`) hacia su equivalente con el locale por defecto (`es`, ver Decisiones), para no romper enlaces/bookmarks/SEO existentes.
- `HandleInertiaRequests::share()` expone `locale` (el actual) y `availableLocales` (`['en', 'es']`) como props globales de Inertia.
- Regenerar Wayfinder (`php artisan wayfinder:generate --with-form`) y actualizar cada call site en `resources/js` que llama `.url()`/`.get()`/`.post()`/`.form()` de las rutas que ahora exigen `locale` como parámetro.
- Detección de idioma preferido en la raíz (`Accept-Language` del navegador) para decidir a qué locale redirigir cuando no hay uno explícito en la URL.

**Out of scope (para otros specs):**

- Traducir el contenido real del blog o del portfolio (eso son los specs 03 y 04 — este spec solo monta el mecanismo de routing/locale).
- Language switcher en la UI (spec 05).
- Cualquier cosa de Keystatic (spec 06).

## Data model

Este spec no introduce modelos de base de datos. Sí introduce una constante compartida:

```php
// config/app.php o similar
'available_locales' => ['en', 'es'],
'default_locale' => 'es',
```

Prop global de Inertia añadida por `HandleInertiaRequests`:

```php
[
    'locale' => 'es',            // locale resuelto de la request actual
    'availableLocales' => ['en', 'es'],
]
```

## Implementation plan

1. Añadir `available_locales` y `default_locale` a `config/app.php` (o un config nuevo `config/locale.php` si se prefiere no tocar `app.php`).
2. Crear `app/Http/Middleware/SetLocale.php`: lee `{locale}` de la ruta, valida contra `available_locales`, llama `App::setLocale()`, 404 si no es válido. Registrar el middleware en `bootstrap/app.php`.
3. Envolver en `routes/web.php` las rutas de home y blog en un grupo `Route::prefix('{locale}')->middleware(SetLocale::class)->group(...)`. Verificación manual: `GET /es` y `GET /en` responden 200, `GET /fr` responde 404.
4. Añadir las rutas de redirect legacy (`/`, `/blog`, `/blog/{slug}`) que hacen `redirect("/{$defaultLocale}" . $path, 301)`. Verificación manual: `GET /blog/docker-optimization` redirige 301 a `/es/blog/docker-optimization`.
5. Implementar la detección de `Accept-Language` en el redirect de `/` (si el navegador prefiere `en` y no hay cookie/sesión previa, redirigir a `/en` en vez de al default). Verificación manual: cambiar el header `Accept-Language` en una request y comprobar el destino del redirect.
6. Compartir `locale` y `availableLocales` en `HandleInertiaRequests::share()`. Verificación manual: inspeccionar el payload de Inertia en devtools y confirmar que ambas props llegan.
7. Correr `php artisan wayfinder:generate --with-form` y actualizar cada call site afectado en `resources/js` (buscar usos de las rutas de home/blog) para pasar `locale` como parámetro. Verificación: `npm run types:check` pasa sin errores.
8. Bump de versión: `0.1.1` → `0.2.0` en `package.json`. No se publica post de changelog.

## Acceptance criteria

- [ ] `GET /es` y `GET /en` devuelven 200 con el contenido correspondiente.
- [ ] `GET /fr` (locale no soportado) devuelve 404.
- [ ] `GET /`, `GET /blog`, `GET /blog/{slug}` redirigen 301 a su equivalente con locale (por defecto, o detectado por `Accept-Language` en la raíz).
- [ ] El payload de Inertia incluye `locale` y `availableLocales` en cualquier página.
- [ ] `npm run types:check` y `composer run ci:check` pasan sin errores tras regenerar Wayfinder.
- [ ] La versión quedó en `0.2.0` en `package.json` y no se creó ningún post de changelog.

## Decisions

- **Sí:** prefijo de path (`/en`, `/es`) en vez de subdominio. Decisión ya tomada por el usuario — cero cambio de DNS/TLS/`SESSION_DOMAIN`.
- **Sí:** `es` como locale por defecto. El único contenido real que existe hoy (el post del blog) está en español, y el usuario es hispanohablante.
- **Sí:** redirect 301 desde las rutas legacy en vez de dejarlas servir contenido directamente sin locale. Evita una ruta "fantasma" que coexista para siempre con las versiones con prefijo, y preserva SEO/bookmarks existentes.
- **No:** usar cookie/sesión como única fuente de verdad del idioma (sin reflejarlo en la URL). El usuario quiere el idioma visible y enlazable en la URL, no oculto en sesión.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Call sites de Wayfinder que se olviden de pasar `locale` rompen en build/type-check | `npm run types:check` falla en CI antes de llegar a producción — el propio compilador de TypeScript detecta el parámetro faltante. |
| El redirect por `Accept-Language` sorprende a un usuario que esperaba el idioma por defecto | Loguear/documentar el comportamiento; siempre se puede navegar explícitamente a `/es` o `/en`. |

## What is **not** in this spec

- Traducción real de contenido (blog: spec 04; portfolio: spec 05).
- Switcher de idioma en la UI (spec 05).
- Keystatic (spec 06).

Cada uno de esos, si aterriza, va en su propio spec.
