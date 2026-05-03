---
title: '10 tips para optimizar imágenes Docker'
summary: 'Reduce el tamaño de tus imágenes Docker, mejora tiempos de build y acelera despliegues con estas prácticas esenciales.'
published_at: 2026-05-01
cover_image: blog/covers/docker-optimization.webp
---

Docker es una herramienta increíble para empaquetar aplicaciones, pero muchas veces terminamos con imágenes innecesariamente grandes, lentas de construir y difíciles de mantener.

Aquí tienes **10 consejos prácticos** para optimizar tus imágenes Docker y mejorar tanto el rendimiento como la eficiencia de tus builds.

---

## 1. Usa imágenes base ligeras y específicas

Prefiere `alpine` , `slim` o `distroless` en lugar de versiones `latest` o completas como `ubuntu:latest`.

```dockerfile
# ❌ Evitar
FROM node:18

# ✅ Mejor
FROM node:18-alpine
```

Ahorro típico: de 900 MB a ~170 MB para Node.js.

## 2. Aplica multi-stage builds

Separa la construcción del entorno de ejecución. Solo copias lo necesario a la imagen final.

```dockerfile
# Build stage
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp .

# Runtime stage
FROM alpine:latest
COPY --from=builder /app/myapp /usr/local/bin/
CMD ['myapp']
```

Beneficio: elimina compiladores, herramientas de desarrollo y código fuente.

## 3. Ordena capas de menos a más cambiantes

Docker cachea capas. Lo que menos cambia (dependencias) debe ir al principio.

```dockerfile
# ✅ Orden óptimo
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
```

## 4. Limpia residuos en la misma capa

Combina RUN para instalar, limpiar cachés y eliminar archivos temporales. Cada RUN crea una capa.

```dockerfile
# ❌ Capa extra sucia
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# ✅ Todo en una capa
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

## 5. Usa .dockerignore como si fuera .gitignore

Evita enviar archivos innecesarios al contexto del build (node_modules, .git, \*.log, etc.).

```dockerfile
# .dockerignore
node_modules/
.git/
*.md
.gitignore
.env
Dockerfile
.dockerignore
```

Impacto: builds más rápidos y contexto más pequeño.

## 6. Instala solo paquetes indispensables

En Alpine, evita apk add --no-cache sin más; filtra con --no-cache --virtual si necesitas herramientas temporales.

```dockerfile
RUN apk add --no-cache --virtual .build-deps gcc musl-dev && \
    pip install cryptography && \
    apk del .build-deps
```

## 7. Usa --link y --chown en COPY para eficiencia (BuildKit)

Con BuildKit activado (DOCKER_BUILDKIT=1), COPY --link permite reutilizar capas independientemente del orden.

```dockerfile
# Mejor para bases de datos de capas
COPY --link --chown=node:node . .
```

## 8. Minimiza variables de entorno embebidas

No metas secretos ni rutas largas que varíen por entorno. Usa ENV solo para valores constantes.

```dockerfile
ENV NODE_ENV=production
# Evitar: ENV PATH=/custom/... si no es estrictamente necesario
```

## 9. Aplica etiquetas (labels) útiles pero no excesivas

Las LABEL no pesan casi nada, pero ordena la metadata sin abusar.

```dockerfile
LABEL maintainer='dev@ejemplo.com' \
      version='1.0.0' \
      description='API optimizada'
```

## 10. Escanea y analiza capas con herramientas externas

Usa dive, docker history o trivy para inspeccionar capas, encontrar archivos grandes y vulnerabilidades.

```bash
# Analiza eficiencia de capas
dive mi-imagen:latest

# Ver histograma de pesos
docker history mi-imagen:latest
Bonus: combinación de todos
```

## Bonus: combinación de todos

Una imagen final optimizada típicamente:

- Usa alpine o scratch (para binarios estáticos).
- Tiene ≤ 5 capas después de multi-stage.
- No contiene shells ni paquetes de desarrollo.
- Pesa entre 5 y 100 MB (dependiendo del stack).

```dockerfile
# Ejemplo final para Go
FROM golang:1.21-alpine AS builder
WORKDIR /src
COPY go.mod go.sum .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags='-s -w' -o /out/app .

FROM scratch
COPY --from=builder /out/app /app
ENTRYPOINT ['/app']
```

Resultado: imágenes pequeñas, seguras y rápidas de desplegar.
