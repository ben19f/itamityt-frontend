# FROM nginx:alpineb

# COPY . /usr/share/nginx/html

# EXPOSE 80


# Используем готовый образ Nginx + PHP-FPM (в версии указали хеш исходника  у нашего другой)
FROM 192.168.96.116:5000/base/nginx-php-fpm:fdaa086c82611024776048db9d1eec6324aa1058e1d867a15004c92d24df6187
COPY default.conf /etc/nginx/sites-available/default.conf

# Копируем все файлы сайта внутрь контейнера
COPY . /var/www/html

# Опционально: выставляем права
RUN chown -R www-data:www-data /var/www/html

# Порт, который будет слушать Nginx
EXPOSE 80

# CMD уже прописан в базовом образе (Nginx + PHP-FPM)