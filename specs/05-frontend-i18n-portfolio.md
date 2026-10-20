# SPEC 05 — Traducción completa del portfolio (ES/EN)

> **Estado:** Draft
> **Depende de:** SPEC 03
> **Version bump:** Minor
> **Fecha:** 2026-10-07
> **Objetivo:** Todo el texto del portfolio (hero, about, work, projects, hackathons, contact, navbar) se muestra en español o inglés según el locale actual, con un switcher para cambiar entre ambos.

## Por qué existe este spec

Hoy el contenido del portfolio vive mezclado en dos formas: datos estructurados en `resources/js/data/resume.tsx` (export `DATA`, usado por `home.tsx` y por los componentes de `resources/js/components/section/*`) y etiquetas sueltas hardcodeadas en JSX dentro de esos mismos archivos (ej. "About Me", "Work Experience", "Education"). El usuario decidió explícitamente traducir el portfolio completo, no solo el blog, así que ambas formas de contenido necesitan tratamiento.

## Scope

**In:**

- Instalar y configurar `react-i18next` (+ `i18next`), inicializado con el `locale` que ya comparte Inertia desde el spec 03.
- Archivos de traducción `resources/js/locales/en.json` y `resources/js/locales/es.json` para las etiquetas de UI sueltas hoy hardcodeadas en `home.tsx` y en `resources/js/components/section/*`.
- Dividir `resources/js/data/resume.tsx` en datos por idioma (ej. `resume.en.tsx` / `resume.es.tsx` con la misma forma, o una función `getResumeData(locale)` que devuelva el objeto correspondiente) — es contenido real (experiencia, educación, skills), no etiquetas de UI, así que no va en los JSON de `react-i18next`.
- Nuevo componente de language switcher en el navbar: construye la URL actual intercambiando el segmento `/en` ↔ `/es`, preservando el resto del path.

**Out of scope (para otros specs):**

- Cualquier cambio al blog (ya cubierto en spec 04).
- Cualquier cambio de backend/rutas más allá de consumir lo que el spec 03 ya expone (`locale`, `availableLocales`).
- Traducción automática por IA del contenido — el usuario escribe/revisa las traducciones de `resume.en.tsx`/`resume.es.tsx` y de los JSON a mano (o las pega, pero la mecánica de este spec no incluye generarlas).

## Data model

```ts
// resources/js/locales/es.json
{
  "home": {
    "about": "Sobre mí",
    "workExperience": "Experiencia laboral",
    "education": "Educación"
  }
}
```

```ts
// resources/js/data/resume.es.tsx (misma forma que el resume.tsx actual, en español)
export const DATA = { ... };

// resources/js/data/resume.ts (nuevo, reemplaza las importaciones directas de resume.tsx)
import { DATA as DATA_EN } from './resume.en';
import { DATA as DATA_ES } from './resume.es';
export function getResumeData(locale: 'en' | 'es') {
  return locale === 'en' ? DATA_EN : DATA_ES;
}
```

## Implementation plan

1. `npm install react-i18next i18next`. Configurar la instancia de i18next (ej. `resources/js/lib/i18n.ts`) inicializada con el `locale` que llega como prop de Inertia, sin detección de navegador propia (el spec 03 ya resuelve eso en el redirect del backend).
2. Crear `resources/js/locales/en.json` y `es.json` con las claves de las etiquetas hoy hardcodeadas en `home.tsx` (identificar cada string literal de UI, ej. "About Me", "Work Experience", "Education").
3. Reemplazar esas strings en `home.tsx` por `t('home.about')`, etc. Verificación manual: cambiar manualmente el locale en la URL (`/es` vs `/en`) y confirmar que los títulos cambian.
4. Repetir el paso 2-3 para cada componente en `resources/js/components/section/*` que tenga texto hardcodeado (work, projects, hackathons, contact).
5. Dividir `resources/js/data/resume.tsx` en `resume.en.tsx` / `resume.es.tsx` + la función `getResumeData(locale)`. Actualizar los imports en `home.tsx` y en los section components para usar `getResumeData(locale)` en vez de importar `DATA` directamente.
6. Crear el componente de language switcher (ej. `resources/js/components/language-switcher.tsx`) y añadirlo al navbar. Construye el link intercambiando el primer segmento del path actual.
7. Verificación manual end-to-end: navegar `/es` y `/en`, confirmar que absolutamente todo el texto visible del portfolio (hero, about, work, projects, hackathons, contact, navbar) cambia de idioma, y que el switcher lleva de uno a otro sin perder el resto de la ruta.
8. `npm run types:check` y `npm run lint:check` pasan.
9. Bump de versión: `0.3.0` → `0.4.0` en `package.json` (o `0.4.0` si el spec 04 ya se implementó antes; ver Decisiones sobre orden). No se publica post de changelog.

## Acceptance criteria

- [ ] No queda ninguna string de UI hardcodeada en inglés en `home.tsx` ni en `resources/js/components/section/*` fuera de los JSON de traducción.
- [ ] `resources/js/data/resume.tsx` ya no existe como fuente única — hay versión `en` y `es` con la misma forma de datos.
- [ ] Navegar `/es` muestra el portfolio completo en español; `/en` lo muestra completo en inglés.
- [ ] El language switcher cambia de `/es/...` a `/en/...` (y viceversa) preservando el resto del path.
- [ ] `npm run types:check` y `npm run lint:check` pasan sin errores.
- [ ] La versión quedó actualizada en `package.json` (encadenada tras el spec 04, ver Decisiones) y no se creó ningún post de changelog.

## Decisions

- **Sí:** `react-i18next` para las etiquetas de UI sueltas. Es la librería estándar de facto para i18n en React, con soporte de namespaces e interpolación si hace falta más adelante.
- **No:** meter el contenido de `resume.tsx` (experiencia, educación, bio) dentro de los JSON de `react-i18next`. Es contenido estructurado real con forma de objeto, no pares clave-valor de UI — mezclar ambos en el mismo mecanismo lo haría más difícil de mantener.
- **Sí:** el switcher solo intercambia el primer segmento del path, sin lógica de traducción de slugs. Si en el futuro un post de blog tiene slugs distintos por idioma, eso se resuelve en un spec propio del blog, no aquí.
- **Decisión pendiente de orden real:** este spec depende solo del spec 03 (no del 04), así que puede implementarse en paralelo al spec 04. El número de versión final (`0.4.0`) asume que el 04 ya corrió antes; si se implementa antes que el 04, ajustar el bump en el momento de `/spec-impl` para que sea consistente con la versión real del repo en ese momento.

## What is **not** in this spec

- Nada del blog (spec 04).
- Nada de Keystatic (spec 06).
- Traducción automática por IA del contenido.

Cada uno de esos, si aterriza, va en su propio spec.
