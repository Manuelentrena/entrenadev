# =========================
# 1. DEPENDENCIAS PHP (COMPOSER)
# =========================
FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts \
    --no-progress


# =========================
# 2. FRONTEND (NODE + VITE)
# =========================
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY . .

RUN npm run build


# =========================
# 3. APP FINAL (PHP-FPM)
# =========================
FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

# 🔧 Dependencias del sistema
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    curl

# 🔧 Extensiones PHP necesarias para Laravel
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    zip \
    bcmath \
    intl \
    xml \
    opcache

# ⚡ OPCACHE optimizado
RUN { \
    echo "opcache.enable=1"; \
    echo "opcache.enable_cli=1"; \
    echo "opcache.jit_buffer_size=128M"; \
    echo "opcache.jit=tracing"; \
} > /usr/local/etc/php/conf.d/opcache.ini

# 📂 Copiamos app
COPY . .

# 📦 Copiamos vendor ya construido
COPY --from=vendor /app/vendor ./vendor

# 🎨 Copiamos assets compilados (Vite)
COPY --from=frontend /app/public/build ./public/build

# 🔐 Permisos correctos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
