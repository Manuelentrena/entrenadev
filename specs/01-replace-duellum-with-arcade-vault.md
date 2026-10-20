# SPEC 01 — Reemplazar el proyecto "Duellum" por "Arcade Vault"

> **Estado:** Implemented
> **Depende de:** —
> **Version bump:** Fix
> **Fecha:** 2026-10-20
> **Objetivo:** Sustituir el proyecto "Duellum" por "Arcade Vault" en los datos del portfolio, para que la sección "My Projects" muestre el nuevo proyecto con sus datos reales (descripción, fechas, stack, video y enlace).

## Por qué existe este spec

"Duellum" es el primer elemento del array `DATA.projects` en `resources/js/data/resume.tsx` y aparece como proyecto activo en la sección "My Projects" del home. El usuario quiere retirarlo y mostrar en su lugar "Arcade Vault", un proyecto real con datos ya definidos (URL, fechas, descripción, stack y video). Hoy el contenido del portfolio vive en un único archivo sin separación por idioma (el spec de i18n del portfolio, ahora spec 05, sigue en `Draft`), así que este cambio se hace directamente sobre `resume.tsx`.

## Scope

**In:**

- Editar `resources/js/data/resume.tsx`: reemplazar el objeto del proyecto "Duellum" (primer elemento de `DATA.projects`) por el objeto de "Arcade Vault", en la misma posición del array.
- Añadir el campo `"version"` a `package.json` (hoy no existe) y dejarlo en `0.1.1` tras este spec.
- Renumerar los specs existentes: el 01 original pasa a ser este archivo; los specs 01–05 anteriores se desplazan a 02–06 (ya ejecutado como parte de este spec — ver Implementation plan).
- Añadir a `ProjectCard` (`resources/js/components/project-card.tsx`) un badge opcional "Made with Claude" (mismo estilo de fondo naranja/amarillo que los badges de `Website`/`Source`, solo icono, sin texto) que se muestre cuando el proyecto tenga `builtWithClaude: true`. Se activa únicamente en el proyecto "Arcade Vault" en este spec — el resto de proyectos no se tocan. El icono usa el SVG de Claude (añadido a `Icons.claude` en `resources/js/components/ui/icons.tsx`) con `fill="currentColor"`, igual que el resto de iconos de un solo color del mapa (`github`, `linkedin`, `x`): en modo claro hereda el `text-white` del badge (como el resto de iconos); en modo oscuro se fuerza con `dark:text-[#D97757]` para mostrar el color de marca original de Claude en vez de heredar el `dark:text-black` del badge.

**Out of scope (para otros specs):**

- Separar el contenido de `resume.tsx` por idioma (`resume.en.tsx` / `resume.es.tsx`) — eso es responsabilidad del spec 05 (i18n del portfolio), que sigue en `Draft`.
- Cualquier cambio a los demás proyectos del array `DATA.projects` (Carlos Arte, etc.), incluido el badge "Made with Claude" — no se activa en ningún otro proyecto en este spec.
- Generar o subir una imagen propia para el campo `image` del proyecto — queda como string vacío `''`, patrón ya usado en otro proyecto del repo para entradas sin imagen propia (el video cubre el preview visual de la card).
- Cualquier otro cambio de diseño, layout o lógica de `ProjectCard` / `projects-section.tsx` más allá del badge "Made with Claude" descrito arriba.

## Data model

No se introduce ninguna estructura nueva. Se reemplaza un elemento existente del array `DATA.projects` (mismo shape que el resto de proyectos):

```tsx
// resources/js/data/resume.tsx — antes (primer elemento de projects)
{
    title: 'Duellum',
    href: 'https://duellum.online/login',
    dates: 'Jun 2025 - Present',
    active: true,
    description: 'Duellum is a fast-paced online strategy game...',
    technologies: ['Nest.js', 'Typescript', 'React', 'PostgreSQL', 'TailwindCSS', '8bitcn', 'Docker', 'GitHub Actions'],
    links: [{ type: 'Website', href: 'https://duellum.online/login', icon: <Icons.globe className="size-3" /> }],
    image: 'https://imagedelivery.net/.../public',
    video: 'https://res.cloudinary.com/manuelentrena/video/upload/v1777566359/duellum_a0jqii.mp4',
}
```

```tsx
// resources/js/data/resume.tsx — después (mismo primer elemento de projects)
{
    title: 'Arcade Vault',
    href: 'https://arcade-vault-chi.vercel.app/',
    dates: 'Aug 2026 - Sep 2026',
    active: false,
    description:
        'Arcade Vault is a retro arcade platform where players compete across 5 games for high scores. Real accounts, leaderboards, a hall of fame, and personal-best tracking, backed by a landing page, a game library, a guest play option, and a contact form.',
    technologies: ['Next.js', 'React', 'Typescript', 'Supabase', 'Vercel'],
    links: [
        { type: 'Website', href: 'https://arcade-vault-chi.vercel.app/', icon: <Icons.globe className="size-3" /> },
        { type: 'Source', href: 'https://github.com/Manuelentrena/arcade-vault', icon: <Icons.github className="size-3" /> },
    ],
    image: '',
    video: 'https://res.cloudinary.com/manuelentrena/video/upload/v1792493598/arcade_vault_my647u.mp4',
    builtWithClaude: true,
}
```

```tsx
// resources/js/components/ui/icons.tsx — nuevo icono en el mapa Icons, junto a github/linkedin/x
claude: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Claude</title>
        <path
            clipRule="evenodd"
            d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
),
```

```tsx
// resources/js/components/project-card.tsx — nuevo prop (badge decorativo, no-link)
interface Props {
    // ...props existentes...
    builtWithClaude?: boolean;
}

// dentro del bloque "LINKS BADGES" (misma esquina), junto a los badges de links,
// con el mismo estilo de fondo naranja/amarillo que los badges de Website/Source:
{builtWithClaude && (
    <Badge title="Made with Claude" className="flex h-5 items-center gap-1.5 bg-orange-400 text-xs text-white hover:bg-orange-600/90 dark:bg-orange-200 dark:text-black hover:dark:bg-orange-300/90">
        <Icons.claude className="size-3 dark:text-[#D97757]" />
    </Badge>
)}
```

## Implementation plan

1. En `resources/js/data/resume.tsx`, reemplazar el primer elemento de `DATA.projects` (actualmente "Duellum") por el objeto "Arcade Vault" definido arriba (incluye `builtWithClaude: true`).
2. Añadir el icono `claude` al mapa `Icons` en `resources/js/components/ui/icons.tsx` (SVG con `fill="currentColor"`). En `resources/js/components/project-card.tsx`: añadir prop opcional `builtWithClaude?: boolean` y renderizar un `Badge` "Made with Claude" (mismo estilo que Website/Source, solo icono, con `dark:text-[#D97757]` para que en oscuro muestre el color de marca original) en la esquina de los badges de links cuando sea `true`. En `resources/js/components/section/projects-section.tsx`, pasar `builtWithClaude={project.builtWithClaude}` a `ProjectCard`.
3. Verificación manual: levantar el dev server (`composer run dev` o `npm run dev`) y confirmar visualmente que la sección "My Projects" del home muestra la card de "Arcade Vault" en la posición donde antes estaba "Duellum", con el video reproduciéndose, la descripción, el stack, los enlaces "Website" (`https://arcade-vault-chi.vercel.app/`) y "Source" (`https://github.com/Manuelentrena/arcade-vault`), y el badge "Made with Claude" visible en la misma esquina. *(Hecho — verificado vía navegador contra Sail/`http://localhost`, incluyendo el cambio de color del icono de Claude entre modo claro/oscuro.)*
4. `npm run types:check` y `npm run lint:check` pasan sin errores.
5. Renumerar los specs existentes (01 a 05 → 02 a 06) y actualizar todas las referencias cruzadas "SPEC 0X" / "spec 0X" dentro de cada archivo para que la cadena de dependencias siga siendo coherente. *(Este paso ya se ejecutó como parte de la preparación de este spec: `01-fix-ci-content-path-filter.md` → `02-...`, `02-locale-routing-backend.md` → `03-...`, `03-blog-locale-restructure.md` → `04-...`, `04-frontend-i18n-portfolio.md` → `05-...`, `05-keystatic-admin-self-host.md` → `06-...`, con sus "Depende de" y menciones internas ajustadas en +1.)*
6. Bump de versión: añadir `"version": "0.1.0"` a `package.json` como baseline (no existía el campo) y dejarlo en `"0.1.1"` (Fix) tras este spec. No se publica post de changelog.

## Acceptance criteria

- [x] `DATA.projects` en `resources/js/data/resume.tsx` ya no contiene ningún proyecto con `title: 'Duellum'`.
- [x] El primer elemento de `DATA.projects` es "Arcade Vault" con `href: 'https://arcade-vault-chi.vercel.app/'`, `dates: 'Aug 2026 - Sep 2026'`, `active: false`, `technologies: ['Next.js', 'React', 'Typescript', 'Supabase', 'Vercel']`, `video` apuntando a `.../arcade_vault_my647u.mp4`, `image: ''`, `builtWithClaude: true`, y `links` con `Website` (`https://arcade-vault-chi.vercel.app/`) y `Source` (`https://github.com/Manuelentrena/arcade-vault`).
- [x] La sección "My Projects" en `/` muestra la card de "Arcade Vault" en la posición donde antes estaba "Duellum", con el video funcionando, los enlaces "Website" y "Source" funcionando, y el badge "Made with Claude" visible en la misma esquina que esos enlaces. Verificado visualmente vía navegador (claro y oscuro): hrefs confirmados (`https://arcade-vault-chi.vercel.app/` y `https://github.com/Manuelentrena/arcade-vault`), badge con icono de Claude a la misma altura, color blanco en claro y naranja de marca (`#D97757`) en oscuro.
- [x] Ningún otro proyecto de `DATA.projects` muestra el badge "Made with Claude" (su `builtWithClaude` es `undefined`/falsy). Verificado visualmente: la card "Carlos Arte - Personal Brand" solo muestra Website/Source.
- [x] `npm run types:check` y `npm run lint:check` pasan sin errores.
- [x] Los archivos `specs/02-fix-ci-content-path-filter.md` a `specs/06-keystatic-admin-self-host.md` existen con esos nombres, y cada "Depende de" / referencia cruzada interna apunta al número correcto tras el desplazamiento.
- [x] `package.json` tiene el campo `"version"` en `"0.1.1"` y no se creó ningún post de changelog.

## Decisions

- **Sí:** mantener la posición del proyecto en el array (primer elemento), igual que "Duellum" — `projects-section.tsx` renderiza el array en orden literal sin ordenar por fecha, así que reordenar sería un cambio de UX fuera de scope.
- **Sí:** `image` queda como string vacío `''` — patrón ya existente en el repo para proyectos sin imagen propia; el `video` cubre el preview visual de la card. El usuario confirmó que no hace falta imagen.
- **No:** no se traduce ni se separa este contenido por idioma en este spec — eso es responsabilidad del spec 05 (i18n del portfolio), que sigue en `Draft` y no bloquea este cambio porque `resume.tsx` sigue siendo la fuente única hoy.
- **Sí:** version bump tipo Fix, no Minor — es sustitución de contenido existente por otro, no funcionalidad nueva. Como `package.json` no tenía campo `version`, se añade como baseline `0.1.0` y este spec lo deja en `0.1.1`.
- **Sí:** se añade `builtWithClaude: false` también al objeto "Carlos Arte - Personal Brand" — TypeScript infiere el tipo de cada elemento de `DATA.projects` individualmente (array `as const`), así que si solo "Arcade Vault" tuviera el campo, acceder a `project.builtWithClaude` en `projects-section.tsx` fallaría en type-check. No es un cambio de contenido de "Carlos Arte" (sigue sin mostrar el badge, `false` es falsy), es un requisito de consistencia de tipos.
- **Sí:** esta spec se numera como 01 y el resto de specs existentes (01–05) se desplaza a 02–06, por decisión explícita del usuario, en vez de añadirse al final de la numeración como es el comportamiento por defecto de `/spec`.

## Identified risks

- El bundle compilado en `public/build/assets/*.js` todavía contiene la cadena `"Duellum"` hasta el próximo `npm run build` — no es código fuente, no requiere acción en este spec, pero conviene tenerlo presente si se verifica en producción antes de rebuildear/desplegar.
