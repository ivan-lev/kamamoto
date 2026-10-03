# API — справочник эндпоинтов

База: `/api` (прод: `https://kamamoto.ru/api`, dev: `http://localhost:3000/api`).
Источник истины — `back/src/routes/*.ts`. Если меняешь роуты, обнови этот файл.

## Общие правила

- **Авторизация**: `GET` открыт всем, кроме `GET /users/`, `/exhibits/` и `/maps/` — им нужен токен (`requireAuth`). `GET /exhibitions/` и `/partners/` работают и с токеном, и без (`optionalAuth`): ответ зависит от того, пришёл ли валидный токен, битый токен → 401. `POST`/`PATCH`/`DELETE` требуют `Authorization: Bearer <jwt>`. Если токена нет или он неверный → `401 { message: 'Необходима авторизация' }`.
- **Ошибки** всегда приходят в виде `{ message: string }`. 400 — ошибка валидации (celebrate или Mongoose), 404, 409 — дубликат уникального поля, 500 — `DEFAULT_MESSAGE`.
- **Лишние поля в body** → 400 (Joi `keys()` запрещает неизвестные ключи). Там, где у роута нет валидатора body, в модель уходит всё подряд, но Mongoose отбрасывает поля, которых нет в схеме.
- Неизвестный путь под `/api` → `404 { message: 'Страница не найдена' }`. `GET` на любой путь вне `/api` и `/static` — не API: бэк отдаёт HTML страницы сайта (см. [back/CLAUDE.md](../../back/CLAUDE.md#html-страниц-и-мета-теги)).
- `_id` из ответов обычно вырезается. Исключения: партнёры, маркеры (`GET /maps/`) и ответы `create*`, где отправляется созданный документ целиком.

## Заголовок `is-admin`

Определяет, что лежит в полях с файлами: сырое имя (для форм админки) или готовый URL (для сайта). Заголовок может прислать кто угодно, поэтому он выбирает **только формат**, а не то, какие записи отдавать. **Контроллеры проверяют заголовок по-разному:**

| Эндпоинт | Сырые имена, когда | URL, когда |
|---|---|---|
| `GET /categories/` | `is-admin: true` | иначе (в том числе без заголовка) |
| `GET /partners/` | заголовок не используется: с токеном | без токена |
| `GET /terms/` | `is-admin: true` | иначе |
| `GET /ceramic-styles/` | иначе (в том числе без заголовка!) | `is-admin: false` |
| `GET /exhibitions/` | заголовок не используется: с токеном | без токена |
| `GET /potters/` | всегда | никогда |
| `GET /exhibits/` (только с токеном) | всегда | никогда |

Фронтовые `api.*.getX(isAdmin = false)` всегда отправляют заголовок явно (`'true'` или `'false'`), так что на практике всё работает. В новом коде использовать форму `req.headers['is-admin'] === 'true'`.

---

## Auth

| Метод | Путь | Body | Ответ |
|---|---|---|---|
| POST | `/signin` | `{ email, password }` (Joi: email, строка) | `{ token }` — JWT `{ _id }`, живёт 7 дней |
| GET | `/users/` | — (нужен Bearer) | `{ answer: 'Token checked!' }` |

Регистрации нет: пользователь создаётся вручную в БД (пароль — bcrypt-хэш).

## Exhibits — лоты `/exhibits`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | `requireAuth` | **все** лоты, включая неактивные, сырые имена файлов, сортировка по `id`. Без токена → 401. `category: {title,name}`, `style: {title,name}`, `potter: {id,name}` |
| GET | `/:id` | `id` число ≥ 0 | один **активный** лот (неактивный → 404). Картинки → URL; `complectation` → массив `title`; `style` с `description, mapImage (URL), showArticle`; `potter` целиком, `photo` → URL |
| POST | `/` | `exhibitValidator` | 201, созданный лот (populate как в GET /) |
| PATCH | `/:id` | `exhibitValidator` (без проверки params) | 201, обновлённый лот |
| DELETE | `/:id` | `id` число | удалённый документ |

Body лота: `category`, `style`, `potter` передаются **строками** (`category.name`, `style.name`, `potter.id`). Бэк ищет по ним ObjectId: категорию — по легаси-полю `category`, стиль — по `name`, гончара — по `id`.
Обязательные поля Joi: `id` (0–9999), `name` (≥ 10 символов), `category`, `images[]`, `thumbnail`, `style`, `description` (можно `''`), `potter`, `complectation[]`, `preservation` (можно `''`). Числовые размеры принимают число, `''` или `null`.

## Categories `/categories`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | — | `[{ name, title, thumbnail }]` (про `is-admin` — см. выше) |
| GET | `/:category` | — | карточки активных лотов категории: `[{ link: '<id>', title, thumbnail: URL }]`. Если категории нет → 404 |
| POST | `/` | `categoryValidator`: `name` `[a-z]+`, `title` `[а-я]+`, `thumbnail` `*.jpg/webp` | 201 |
| PATCH | `/:category` | — | обновлённая категория |
| DELETE | `/:category` | `categoryDeleteValidator` — **сломан**, см. known-issues | |

## Ceramic styles `/ceramic-styles`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | — | все стили (без `_id`), сортировка по `title` |
| GET | `/articles` | — | `[{ name, title, thumbnail: URL }]` для `showArticle: true` |
| GET | `/:style` | — | `{ title, name, article }`, локальные слайды → URL. Нет стиля или `showArticle: false` → 404 **с пустым телом** |
| POST | `/` | `ceramicStyleValidator` | 201, стиль без `_id` |
| PATCH | `/:name` | — | обновлённый стиль, плюс чистка удалённых слайдов с диска |
| DELETE | `/:name` | — | `{ name }` (+ `_id`) |

`name` — `[a-z-]+`, `title` — только кириллица и дефис (пробелы запрещены!), `thumbnail` — `*.jpg/webp`, `mapImage` — `*.svg`.
Порядок роутов: `/articles` объявлен раньше `/:style`, поэтому стиль с `name: 'articles'` открыть нельзя.

## Potters `/potters`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | — | все гончары, сырые имена, сортировка по `name` |
| GET | `/lnt` | — | `[{ thumbnail: URL фото, title: name, link: '/lnt-potters/<id>' }]` для `showArticle && isLNT` |
| GET | `/:id` | `id` строка | полный документ гончара, слайды → URL. `showArticle: false` → 404 с пустым телом. `photo` здесь **не** превращается в URL |
| POST | `/` | `potterValidator` (`id`, `name` ≥ 6) | 201 |
| PATCH | `/:id` | только `potterIdValidator` — **body не валидируется** | 201, плюс чистка слайдов |
| DELETE | `/:id` | `id` | удалённый документ |

Гончар с `id: 'lnt'` будет перекрыт роутом `/lnt`.

## Exhibitions — выставки `/exhibitions`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | `optionalAuth` | с токеном — все выставки (без `_id`) с сырыми именами файлов (админка). Без токена (сайт) — тоже все: активные целиком, `photos`/`poster` → URL; неактивные только с полями карточки `{ id, year, dates, city, place, name, isActive }` — на сайте они видны в списке карточкой без ссылки |
| GET | `/:id` | `id` > 0 | активная выставка, `photos`/`poster` → URL. Неактивная → 404 (админка этот эндпоинт не использует) |
| POST | `/` | `exhibitionValidator` | 201 |
| PATCH | `/:id` | `exhibitionValidator` | обновлённая выставка |
| DELETE | `/:id` | `id` > 0 | число `id` |

Обязательные поля: `id` > 0, `year` > 2020, `dates` (≥ 5 символов), `city`, `address`, `place`, `name`, `description` (можно `''`), `isActive`. `link` — URL или `''`.

## Terms — словарь `/terms`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | — | `[{ letter, terms: Term[] }]`, сортировка по-русски и по букве, и по названию |
| POST | `/` | `termValidator` | 201 |
| PATCH | `/:id` | `termIdValidator` + `termValidator` | 201 |
| DELETE | `/:id` | `termIdValidator` | удалённый документ |

`id` — `[a-z0-9-]+`, `image` — `*.jpg/webp` или `''`, обязательны `title`, `definition`, `letter`.
PATCH удаляет с диска прежнюю картинку, если `image` сменился или стал `''`, DELETE — картинку удалённого термина. В обоих случаях файл остаётся, если на него ссылается другой термин.

## Maps — маркеры карты `/maps`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | `requireAuth` | все маркеры, включая неактивные, с `_id` (для админки). Без токена → 401 |
| GET | `/groups` | — | `[{ groupName, markers: [{ geocode, title, kanji, romaji, info, image }] }]`, только активные |
| POST | `/` | `markerCreateValidator` | 201 |
| PATCH | `/:_id` | `markerUpdateValidator` (в body **обязателен** `_id`) | обновлённый маркер |
| DELETE | `/:_id` | `_id` hex | `{ _id }` |

`geocode` — `[lat, lng]`. `groupName` — один из `MARKER_GROUP_NAMES`. `image` — имя файла; URL `/static/map/<image>` собирает **фронт** (`MapMarker.tsx`), а не бэк.

## Partners `/partners`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | `optionalAuth` | `[{ _id, isActive, link, title, logo }]`. С токеном — все партнёры, `logo` — сырое имя (админка); без токена — только `isActive: true`, `logo` → URL (сайт) |
| POST | `/` | `partnerCreateValidator` (`title`, `link` URL, `logo`, `isActive`) | 201 |
| PATCH | `/:_id` | `partnerUpdateValidator` (в body обязателен `_id`) | обновлённый партнёр |
| DELETE | `/:_id` | `_id` hex | `{ _id }` |

## Letters — благодарственные письма `/letters`

| Метод | Путь | Ответ |
|---|---|---|
| GET | `/` | все письма, `name` (pdf) и `thumbnail` → URL `/static/letters/...` |
| POST/PATCH/DELETE | | формально есть, но **не работают** (валидатор требует `preview`, PATCH ищет по `req.params._id`). Письма заводятся прямо в БД |

`/files` сейчас указывает на тот же `lettersRouter` (баг). Коллекции `files` нет.

## Complectation — варианты комплектации `/complectation`

| Метод | Путь | Валидатор | Ответ |
|---|---|---|---|
| GET | `/` | — | `[{ name, title }]` |
| POST | `/` | `{ name, title }` | 201 `{ name, title }` |
| PATCH | `/:id` | `{ name, title }` | 201. Поиск идёт по **`body.name`**, параметр пути игнорируется, поэтому `name` так не переименовать |
| DELETE | `/:name` | `complectationNameValidator` проверяет body, а не params (по факту ничего не проверяет) | удалённый документ |

## Statistics `/statistics`

`GET /` → `{ exhibits, exhibitions, categories, partners, letters }` (`estimatedDocumentCount`).

## Uploads `/uploads`

`POST /slides/:target/:key`, multipart, поле `files` (до 30 файлов по 20 МБ, image/jpeg|png|webp|avif|gif).
`target` ∈ `SLIDES_TARGETS` (`ceramic-styles`, `potters`), `key` — `[\w-]+`.
Ответ 201: `[{ filename, url }]`. `filename` уже транслитерирован и уникален в папке, в статью записывается именно он.

`POST /images/:target` и `POST /images/:target/:key`, multipart, одно поле `file` (20 МБ) — одиночная картинка записи в `/static/<папка раздела>/<файл>` или, для разделов с `hasKey`, в `/static/<папка раздела>/<key>/<файл>` (`key` — `[\w-]+`; лишний или недостающий `key` → 400).
`target` ∈ `IMAGE_TARGETS` (`back/src/utils/images.ts`):
- `dictionary` — без `key`, jpeg|webp (как в `termValidator`), фронт шлёт имя = `id` термина;
- `ceramic-styles` — `key` = `name` стиля, jpeg|webp|svg (тхумб — jpg/webp, карта — svg; поле↔формат проверяет `ceramicStyleValidator`), фронт шлёт имя = `name` стиля → `bizen.webp`, `bizen.svg`. Заменённые тхумб и карту `PATCH /ceramic-styles/:name` удаляет с диска (если имя стиля не менялось).

Имя файла в multipart — желаемое имя. Ответ 201: `{ filename, url }`, запись в БД фронт сохраняет отдельным запросом.

`/og/:target/:key` — og-картинка записи `/static/<папка раздела>/<key>/og.jpg|og.webp`. В БД её нет, `getOgImage` (`utils/ogImage.ts`) находит файл по имени, jpg приоритетнее.
`target` ∈ `OG_TARGETS` (сейчас только `ceramic-styles`, key = `name` стиля), `key` — `[\w-]+`.
- `GET` (публичный) → `{ filename, url }` или `null`; в `url` версия `?v=<mtime>`.
- `POST`, multipart, поле `file` (jpeg|webp, 20 МБ) → 201 `{ filename, url }`. Файл **перезаписывается** (`og.<ext>`), og другого формата удаляется.
- `DELETE` → `null`, удаляет og.jpg и og.webp.

Для обоих эндпоинтов расширение файла берётся из MIME-типа, а не из имени (`x.html` с `image/jpeg` сохранится как `x.jpg`). Существующие файлы не перезаписываются, к имени добавляется `-1`, `-2`…
