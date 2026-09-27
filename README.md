# ITAMITYT Frontend

Frontend сервиса [itamityt.ru](https://itamityt.ru).

Frontend отвечает за отображение публичных профилей, личного кабинета пользователей, управление ссылками и профилем, а также взаимодействие с backend API.

---

# Архитектура

Frontend отделён от backend.

```text
                    ┌─────────────────────┐
                    │     Браузер         │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │   Frontend      │         │      S3         │
        │   PHP + JS + CSS│         │    images       │
        └────────┬────────┘         └────────▲────────┘
                 │                           │
                 │ REST API                  │
                 ▼                           │
        ┌─────────────────┐                  │
        │     Backend     │──────────────────┘
        │     FastAPI     │
        └─────────────────┘
```

Frontend **не хранит S3 credentials**.

Для загрузки изображений используется backend:

```text
Browser
   │
   │ multipart/form-data
   ▼
FastAPI
   │
   │ boto3
   ▼
S3
```

После загрузки backend возвращает URL изображения.

---

# Стек

* PHP
* HTML5
* CSS3
* JavaScript
* Fetch API
* REST API
* Docker
* Nginx
* Kubernetes
* Helm

Frontend не использует jQuery.

---

# Структура проекта

Примерная структура:

```text
itamityt-frontend/
├── css/
│   ├── style.css
│   ├── profile.css
│   └── ...
│
├── js/
│   ├── login.js
│   ├── register.js
│   ├── profile.js
│   ├── public_profile.js
│   └── ...
│
├── images/
│   ├── default-avatar.png
│   └── ...
│
├── includes/
│   ├── header.php
│   └── menu.php
│
├── index.php
├── login.php
├── register.php
├── profile.php
├── 404.php
├── Dockerfile
└── README.md
```

Конкретный набор файлов может изменяться по мере развития проекта.

---

# Основные страницы

## Главная

```text
/
```

Основная страница сервиса.

---

## Авторизация

```text
/login.php
```

Страница входа пользователя.

После успешной авторизации JWT сохраняется в:

```javascript
localStorage
```

под ключом:

```text
token
```

---

## Регистрация

```text
/register.php
```

Создание нового аккаунта.

---

# Публичный профиль

Публичные профили имеют URL:

```text
/uun/{username}
```

Например:

```text
/uun/muzej_kostej
```

Страница не требует авторизации.

Frontend получает данные через:

```http
GET /public/profile/{username}
```

Пример данных:

```json
{
  "username": "muzej_kostej",
  "display_name": "Выставка \"Музей костей\"",
  "avatar_url": null,
  "photos": [],
  "items": [],
  "profile_description": "...",
  "profile_extra_info": "...",
  "blocks": [
    "gallery",
    "description",
    "links",
    "extra"
  ]
}
```

---

# Блоки публичного профиля

Публичный профиль может содержать:

```text
gallery
description
links
extra
```

Порядок блоков определяется полем:

```json
{
  "blocks": [
    "gallery",
    "description",
    "links",
    "extra"
  ]
}
```

Если `blocks` отсутствует или пустой, используется порядок по умолчанию:

```text
gallery
description
links
extra
```

---

# Галерея

Публичный профиль поддерживает фотографии пользователя.

Backend возвращает:

```json
{
  "photos": [
    "https://s3.example.com/..."
  ]
}
```

Frontend отображает фотографии в галерее.

Фотографии:

* загружаются непосредственно из S3;
* имеют lazy loading;
* являются кликабельными;
* открываются в увеличенном просмотрщике;
* поддерживают переключение между фотографиями.

В просмотрщике:

```text
← предыдущая
→ следующая
Esc закрыть
× закрыть
```

На мобильных устройствах просмотрщик адаптируется под размер экрана.

---

# Avatar

Аватар отображается в верхней части публичного профиля.

Backend возвращает:

```json
{
  "avatar_url": "https://s3.example.com/..."
}
```

Если аватар отсутствует, используется:

```text
/images/default-avatar.png
```

---

# Личный кабинет

Личный кабинет доступен авторизованному пользователю.

Основные возможности:

* изменение имени профиля;
* изменение описания;
* изменение дополнительной информации;
* загрузка аватара;
* удаление аватара;
* загрузка фотографий;
* удаление фотографий;
* управление ссылками;
* выход из аккаунта;
* удаление аккаунта.

---

# Авторизация

JWT хранится в:

```javascript
localStorage.getItem("token")
```

При обращении к защищённым API frontend отправляет:

```http
Authorization: Bearer <token>
```

Например:

```javascript
const token = localStorage.getItem("token");

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};
```

---

# Проверка авторизации

На страницах, требующих авторизацию:

```javascript
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.php";
}
```

Если токена нет, пользователь перенаправляется на страницу входа.

---

# API configuration

Адрес backend API задаётся через JavaScript-конфигурацию.

Например:

```javascript
const API_URL = "https://api.itamityt.ru";
```

Адрес redirect-сервиса ссылок:

```javascript
const REDIRECT_URL = "https://itamityt.ru/go";
```

В проекте желательно держать такие значения централизованно, а не дублировать их по каждому JS-файлу.

---

# Работа с API

Frontend использует стандартный `fetch()`.

GET:

```javascript
const response = await fetch(
    `${API_URL}/users/me`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
);
```

POST JSON:

```javascript
const response = await fetch(
    `${API_URL}/users/me`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
);
```

---

# Загрузка файлов

Для загрузки аватара используется:

```text
POST /users/me/avatar
```

Файл отправляется через `FormData`.

Пример:

```javascript
const formData = new FormData();

formData.append("file", file);

const response = await fetch(
    `${API_URL}/users/me/avatar`,
    {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    }
);
```

При отправке `FormData` **не нужно вручную устанавливать**:

```http
Content-Type: multipart/form-data
```

Браузер самостоятельно добавляет правильный `boundary`.

---

# Avatar API

Загрузка:

```http
POST /users/me/avatar
```

Удаление:

```http
DELETE /users/me/avatar
```

После загрузки backend возвращает:

```json
{
  "avatar_url": "https://s3.example.com/..."
}
```

---

# Photos API

Получение фотографий:

```http
GET /users/me/photos
```

Загрузка:

```http
POST /users/me/photos
```

Удаление:

```http
DELETE /users/me/photos/{photo_id}
```

Загрузка выполняется через:

```text
multipart/form-data
```

Frontend передаёт:

```text
file
```

---

# Ограничения изображений

Поддерживаемые форматы:

```text
JPEG
PNG
WEBP
```

Аватар:

```text
до 5 MB
```

Фотография:

```text
до 10 MB
```

Максимальное количество фотографий:

```text
5
```

Frontend выполняет предварительную проверку формата, но окончательная проверка выполняется backend.

---

# Profile API

Получение профиля:

```http
GET /users/me
```

Изменение:

```http
PATCH /users/me
```

Пример:

```json
{
  "display_name": "Музей костей",
  "profile_description": "Просветительская выставка анатомических скелетов",
  "profile_extra_info": "Сочи"
}
```

---

# Links

В личном кабинете пользователь может управлять ссылками.

Получение:

```http
GET /items/
```

Создание:

```http
POST /items/
```

Удаление:

```http
DELETE /items/{item_id}
```

Пример создания:

```json
{
  "name": "VK",
  "description": "Группа ВКонтакте"
}
```

---

# Redirect links

Публичные ссылки пользователя проходят через redirect endpoint.

Frontend формирует URL:

```javascript
const redirectUrl =
    `${REDIRECT_URL}/${item.link_id}`;
```

Например:

```text
https://itamityt.ru/go/AR5DHzyH
```

Это позволяет backend учитывать переходы по ссылкам.

---

# CSS

CSS организован по функциональности.

Основные элементы публичного профиля:

```text
profile
profile-name
profile-avatar
profile-verification
profile-gallery
profile-description
profile-links
profile-extra
```

Галерея использует:

```text
user-photo-card
```

Просмотрщик изображений:

```text
image-viewer
image-viewer-image
image-viewer-close
image-viewer-prev
image-viewer-next
image-viewer-counter
```

---

# JavaScript

Основные JS-файлы:

```text
js/
├── login.js
├── register.js
├── profile.js
└── public_profile.js
```

## `public_profile.js`

Отвечает за:

* получение username из URL;
* загрузку публичного профиля;
* отображение аватара;
* отображение имени;
* отображение username;
* отображение verification;
* отображение галереи;
* просмотр фотографий;
* описание;
* ссылки;
* дополнительную информацию;
* копирование URL профиля.

---

## `profile.js`

Отвечает за личный кабинет:

* загрузку профиля;
* изменение профиля;
* загрузку аватара;
* удаление аватара;
* загрузку фотографий;
* удаление фотографий;
* загрузку ссылок;
* создание ссылок;
* удаление ссылок;
* logout;
* удаление аккаунта.

---

# Local development

Для разработки frontend необходим работающий backend API.

Например:

```text
Frontend
http://localhost

Backend
http://localhost:8100
```

В JavaScript должен быть указан соответствующий:

```javascript
API_URL
```

---

# Docker

Frontend собирается в Docker image.

Пример:

```bash
docker build \
  -t 192.168.96.116:5000/itamityt/frontend:latest \
  .
```

Push:

```bash
docker push \
  192.168.96.116:5000/itamityt/frontend:latest
```

---

# Kubernetes

Frontend разворачивается в Kubernetes через Helm.

Обычно используются:

```text
Deployment
Service
Ingress
```

Frontend не хранит S3 credentials и database credentials.

Все операции с пользователями выполняются через backend API.

---

# Deploy

После публикации Docker image в registry:

```bash
helm upgrade --install frontend ./helm \
  -n testspaceita \
  -f values-test.yaml
```

Проверка:

```bash
kubectl -n testspaceita get pods
```

Проверка Deployment:

```bash
kubectl -n testspaceita get deployment
```

Логи:

```bash
kubectl -n testspaceita logs deployment/frontend
```

---

# Cache

При изменении JavaScript или CSS браузер может продолжать использовать старую версию файлов из cache.

При разработке можно использовать:

```text
Ctrl + F5
```

или:

```text
DevTools → Network → Disable cache
```

Для production желательно использовать versioning/static asset cache busting.

Например:

```html
<script src="/js/profile.js?v=2"></script>
```

или автоматическую генерацию версии файла при сборке.

---

# Проверка frontend

После deploy проверить:

## Главная

```text
https://itamityt.ru/
```

## Регистрация

```text
https://itamityt.ru/register.php
```

## Авторизация

```text
https://itamityt.ru/login.php
```

## Личный кабинет

```text
https://itamityt.ru/profile.php
```

## Публичный профиль

```text
https://itamityt.ru/uun/{username}
```

---

# Проверка публичного профиля

После изменения профиля проверить:

* username;
* display name;
* avatar;
* description;
* extra;
* verification;
* links;
* gallery.

Для галереи проверить:

* отображение фотографий;
* открытие фотографии;
* увеличение;
* предыдущая фотография;
* следующая фотография;
* `Esc`;
* закрытие по фону;
* мобильное отображение.

---

# Troubleshooting

## Публичный профиль не загружается

Открыть DevTools:

```text
F12 → Network
```

Проверить запрос:

```text
GET /public/profile/{username}
```

Проверить:

* HTTP status;
* Response;
* Console.

---

## API возвращает 401

Проверить наличие JWT:

```javascript
localStorage.getItem("token")
```

Проверить header:

```http
Authorization: Bearer <token>
```

---

## Фотография не загружается

Проверить:

1. frontend отправляет `FormData`;
2. поле называется `file`;
3. JWT передаётся;
4. backend отвечает `200`;
5. backend вернул `image_url`;
6. S3 URL открывается непосредственно в браузере.

---

## Фотография загружается, но не отображается

Открыть URL фотографии непосредственно в браузере.

Если URL не открывается:

```text
Frontend
   ↓
Backend
   ↓
S3
```

проблема находится на стороне backend/S3.

Если URL открывается напрямую, проверить:

```text
DevTools → Console
DevTools → Network
```

---

## Изменения JS/CSS не видны

Сделать:

```text
Ctrl + F5
```

или очистить cache.

При необходимости изменить версию:

```html
<script src="/js/public_profile.js?v=2"></script>
```

---

# Безопасность

Frontend не должен содержать:

* database credentials;
* S3 access key;
* S3 secret key;
* `SECRET_KEY`;
* другие server-side secrets.

JWT является пользовательским credential и должен храниться только там, где это предусмотрено текущей архитектурой приложения.

S3 credentials используются только backend.

---

# Принцип взаимодействия

Frontend не работает напрямую с PostgreSQL.

Frontend не работает с S3 credentials.

Основная схема:

```text
                    ┌───────────────┐
                    │    Browser    │
                    └───────┬───────┘
                            │
                    HTTPS / REST API
                            │
                            ▼
                    ┌───────────────┐
                    │    FastAPI    │
                    │    Backend    │
                    └───────┬───────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       ┌───────────────┐          ┌───────────────┐
       │  PostgreSQL   │          │      S3       │
       │               │          │    Storage    │
       └───────────────┘          └───────────────┘
```

Для изображений:

```text
Browser
   │
   │ upload
   ▼
Backend
   │
   │ S3 API
   ▼
S3
   │
   │ public URL
   ▼
Browser
```

---

# Development workflow

Рекомендуемый процесс:

```text
Изменение HTML/CSS/JS
        ↓
Локальная проверка
        ↓
Проверка API
        ↓
Docker build
        ↓
Push в registry
        ↓
Helm deploy
        ↓
Проверка Pod
        ↓
Проверка сайта
        ↓
Проверка DevTools
```

---

# Production принцип

Frontend и backend разворачиваются независимо.

Можно обновить frontend без изменения backend:

```text
frontend:v2
backend:v1
```

и backend без изменения frontend:

```text
frontend:v1
backend:v2
```

При изменении API необходимо учитывать совместимость frontend и backend.

---

# License

Проект находится в разработке.

Copyright © ITAMITYT
