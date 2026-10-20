# SPEC 04 — Blog organizado por idioma

> **Estado:** Draft
> **Depende de:** SPEC 03
> **Version bump:** Minor
> **Fecha:** 2026-10-07
> **Objetivo:** El contenido del blog vive en carpetas separadas por idioma y `BlogService`/`BlogController` sirven los posts del locale actual.

## Por qué existe este spec

Hoy `BlogService` lee todos los `.md` de una única carpeta plana (`resources/content/blog/*.md`), sin noción de idioma. Para que el spec 03 (rutas con locale) tenga contenido real que mostrar en `/en/blog` y `/es/blog`, y para que el admin de Keystatic (spec 06) tenga colecciones separadas por idioma a las que apuntar, el contenido tiene que reorganizarse primero.

## Scope

**In:**

- Nuevas carpetas `resources/content/blog/en/` y `resources/content/blog/es/`.
- Mover `resources/content/blog/docker-optimization.md` (el único post existente, en español) a `resources/content/blog/es/`.
- `BlogService::all(string $locale)` y `BlogService::find(string $slug, string $locale)`: escanear la carpeta del locale pedido en vez de la carpeta plana.
- `BlogController` pasa el locale actual (de la request/Inertia, resuelto por el middleware del spec 03) a esas llamadas.
- Mantener exactamente el mismo esquema de front matter (`title`, `summary`, `published_at`, `cover_image`) — no se introduce ningún campo nuevo en este spec.

**Out of scope (para otros specs):**

- Traducir el post existente al inglés (no es parte de este spec — se puede hacer después, a mano o vía Keystatic, en cualquier momento; este spec solo prepara la estructura).
- El admin de Keystatic y sus colecciones (spec 06).
- Cualquier cambio de UI del blog (listado/detalle) más allá de que reciban contenido ya filtrado por locale — el spec no toca componentes React salvo lo estrictamente necesario para pasar el locale.

## Data model

No se introducen campos nuevos de front matter. Cambia la ubicación física de los archivos:

```
resources/content/blog/
  en/
    (vacío por ahora, o posts nuevos en inglés)
  es/
    docker-optimization.md   (movido desde la carpeta plana anterior)
```

Firma de servicio actualizada:

```php
// app/Services/BlogService.php
public function all(string $locale): Collection { ... }
public function find(string $slug, string $locale): ?Post { ... }
```

## Implementation plan

1. Crear `resources/content/blog/en/` y `resources/content/blog/es/`; mover `docker-optimization.md` a `es/` con `git mv` para conservar el historial.
2. Actualizar `BlogService::all()` para aceptar `string $locale` y construir la ruta de escaneo como `resources/content/blog/{$locale}`. Verificación manual: `BlogService::all('es')` devuelve el post existente, `BlogService::all('en')` devuelve una colección vacía.
3. Actualizar `BlogService::find()` para aceptar `string $locale` con la misma lógica de resolución de carpeta.
4. Actualizar `BlogController::index()` y `::show()` para leer el locale actual (de `request()->route('locale')` o del prop compartido por Inertia, lo que ya exista tras el spec 03) y pasarlo a `BlogService`.
5. Verificación manual end-to-end: `GET /es/blog` muestra el post existente; `GET /en/blog` muestra una lista vacía (sin error 500); `GET /es/blog/docker-optimization` muestra el detalle; `GET /en/blog/docker-optimization` devuelve 404 (el post no existe en esa carpeta).
6. Bump de versión: `0.2.0` → `0.3.0` en `package.json`. No se publica post de changelog.

## Acceptance criteria

- [ ] `resources/content/blog/es/docker-optimization.md` existe y `resources/content/blog/en/` existe (vacía o no).
- [ ] `GET /es/blog` lista el post existente; `GET /en/blog` no da error y muestra lista vacía.
- [ ] `GET /es/blog/docker-optimization` renderiza el detalle correctamente.
- [ ] `GET /en/blog/docker-optimization` devuelve 404.
- [ ] `php artisan test --compact` sigue pasando (incluye cualquier test existente de `BlogService`/`BlogController`, actualizado a la nueva firma si hace falta).
- [ ] La versión quedó en `0.3.0` en `package.json` y no se creó ningún post de changelog.

## Decisions

- **Sí:** una carpeta por idioma (`en/`, `es/`) en vez de un campo `locale` en el front matter de una carpeta plana. Es el patrón estándar en CMS basados en Git (y es el que mejor mapea a colecciones separadas de Keystatic en el spec 06: `blog-en` / `blog-es`).
- **No:** traducir el post existente como parte de este spec. Es contenido, no estructura — se puede añadir en cualquier momento posterior sin bloquear el resto del plan.
- **Sí:** mantener el mismo esquema de front matter. Cambiar el esquema ahora mezclaría dos cambios distintos (estructura de carpetas vs. forma de los datos) en un solo spec.

## What is **not** in this spec

- Traducción del contenido del post existente al inglés.
- El admin de Keystatic (spec 06).
- Traducción del portfolio (spec 05).

Cada uno de esos, si aterriza, va en su propio spec.
