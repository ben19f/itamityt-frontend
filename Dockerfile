# FROM nginx:alpine

# COPY . /usr/share/nginx/html

# EXPOSE 80


# Используем готовый образ Nginx + PHP-FPM
FROM richarvey/nginx-php-fpm:latest

# Копируем все файлы сайта внутрь контейнера
COPY . /var/www/html

# Опционально: выставляем права
RUN chown -R www-data:www-data /var/www/html

# Порт, который будет слушать Nginx
EXPOSE 80

# CMD уже прописан в базовом образе (Nginx + PHP-FPM)