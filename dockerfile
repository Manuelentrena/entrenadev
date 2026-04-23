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

COPY . .


# =========================
# 2. BUILD (PHP + NODE + WAYFINDER + VITE)
# =========================
FROM php:8.4-cli-alpine AS build

WORKDIR /app

RUN apk add --no-cache \
    bash \
    git \
    unzip \
    nodejs \
    npm \
    libzip-dev

# PHP extensiones mínimas para artisan
RUN docker-php-ext-install zip

COPY . .
COPY --from=vendor /app/vendor ./vendor

# 🔥 Wayfinder (requiere PHP aquí)
RUN php artisan wayfinder:generate --with-form

# frontend build
RUN npm ci
RUN npm run build


# =========================
# 3. RUNTIME FINAL (PHP-FPM)
# =========================
FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    nginx \
    bash \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    curl

RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    zip \
    bcmath \
    intl \
    xml \
    opcache

# Opcache
RUN { \
    echo "opcache.enable=1"; \
    echo "opcache.enable_cli=1"; \
    echo "opcache.jit_buffer_size=128M"; \
    echo "opcache.jit=tracing"; \
} > /usr/local/etc/php/conf.d/opcache.ini


# =========================
# APP
# =========================
COPY . .

COPY --from=vendor /app/vendor ./vendor
COPY --from=build /app/resources/js/routes ./resources/js/routes
COPY --from=build /app/public/build ./public/build
# Config Nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf


RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD sh -c "php-fpm & nginx -g 'daemon off;'"
