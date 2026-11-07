# Техническая карта проекта kamamoto.ru

> Анализ архитектуры на основе кода репозитория и внутренней документации (`CLAUDE.md`, `back/CLAUDE.md`, `front/CLAUDE.md`). Код проекта не изменялся.

## 0. Общая картина

Сайт частной коллекции японской керамики. Монорепозиторий **без npm workspaces** — каждая часть (`front/`, `back/`, `yuding/`) со своим `package.json` и `node_modules`. Прод: VPS, Docker, Caddy (реверс-прокси + TLS), деплой через rsync (`npm run upload:*`), БД — MongoDB (синхронизация local ↔ VPS через `mongo/db-push.sh` / `db-pull.sh`).

| Путь | Назначение | Стек |
|---|---|---|
| `front/` | SPA посетителя + админка `/admin` | React 19 (+ React Compiler), Vite 8, Redux Toolkit, react-router 8, SCSS (БЭМ, desktop-first), tiptap, swiper, motion |
| `back/` | REST API `/api` + раздача `/static` + HTML страниц | Express 5, Mongoose 9, TypeScript (CommonJS, node20), celebrate/Joi, JWT, multer, winston, helmet |
| `mongo/` | скрипты синхронизации БД | bash, mongodump/mongorestore |
| `static/` | контентные файлы (вне git, деплой отдельно) | раздаёт back как express.static |
| `docs/` | документация (Astro Starlight), changelog | Astro |
| `yuding/` | побочный проект — не относится к kamamoto | — |
| `Caddyfile`, `docker-compose.yml`, `ops.sh` | инфраструктура прод | Caddy, Docker |

## 1. Основные модули и их назначение

### Backend (`back/src/`)

| Модуль | Назначение |
|---|---|
| `app.ts` | Конвейер: limiter (10000/15 мин) → cors → winston request logger → helmet → body-parser → `/static` → `/api` → `/sitemap.xml` → `GET /{*splat}` (HTML страниц с мета-тегами) → error logger → celebrate-адаптер → финальный error handler |
| `routes/` | Роутеры по сущностям (categories, ceramicStyles, complectation, exhibits, exhibitions, letters, maps, partners, potters, statistics, terms, uploads, users). `routes/index.ts`: `POST /signin` открыт → глобальный `auth` → все роутеры → 404 |
| `controllers/` | Логика эндпоинтов; `pages.ts` — серверный рендер `index.html` с SEO-мета; `sitemap.ts` — динамический `sitemap.xml` из БД с кэшем (TTL 1 час) |
| `models/` | Mongoose-схемы: exhibit, exhibition, potter, style, category, complectation, term, marker, partner, letter, file, feature, user |
| `middlewares/auth.ts` | JWT: все `GET` публичны; не-GET требует `Authorization: Bearer <jwt>`; `requireAuth` / `optionalAuth` для закрытых GET |
| `middlewares/validators/` | celebrate/Joi-валидаторы по сущностям, сообщения на русском |
| `errors/` | Иерархия: ValidationError 400, AuthorizationError 401, RightsError 403, NotFoundError 404, ConflictError 409 (все со `statusCode`) |
| `variables/` | `messages.ts` (тексты ошибок), `paths.ts` (структура `static/`, `STATIC_URL`), `staticPages.ts` (SEO статичных страниц), `regexes.ts`, `markerGroups.ts` |
| `utils/` | `slides.ts` (слайды статей), `gallery.ts` (фото лотов), `images.ts`, `ogImage.ts` |

### Frontend (`front/src/`)

| Модуль | Назначение |
|---|---|
| `components/App/` | Точка роутинга: `/admin/*` (lazy) и `/*` → `VisitorView` |
| `components/visitor/*` | Публичные страницы (~45 компонентов): HomePage, Collection/Category/ExhibitView (каталог), Exhibitions, CeramicStyle (статьи о стилях), Dictionary (словарь), LNTPotters (гончары ЛНТ), Map (OSM + маркеры), Useful, About, Contacts (emailjs), Files, ThanksLetters и др. |
| `components/admin/*` | Админка: Admin (сайдбар + логин), формы и таблицы сущностей (ExhibitForm, ExhibitionForm, Dictionary, Potters, Markers, Statistics, Letters, …) |
| `components/admin/shared/` | ArticleForm (статьи со слайдами), RichTextEditor (tiptap), ImageDropzone, SortableTags, GalleryField |
| `components/shared/` | Button, Modal, Preloader |
| `slices/visitor/*`, `slices/admin/*` | Два отдельных RTK-стора (ленивое создание `getVisitorStore()` / `getAdminStore()`) |
| `utils/api/api.<entity>.ts` | fetch-обёртки по сущностям, собираются в объект `api` |
| `types/*` | Интерфейсы сущностей + default-объекты форм (дублируются руками с back) |
| `variables/*` | PATHS (BASE_API_URL, STATIC_URL), STORAGE_KEYS, SITE_VERSION, меню, статичный контент |
| `styles/*.scss` | Глобальные БЭМ-блоки; CSS-переменные в `variables.scss` |

### Маршрутизация (React Router 8, BrowserRouter)

- Layout посетителя: Header + Main (Outlet) + Footer; все страницы `lazy()`.
- Публичные маршруты: `/`, `/about`, `/assistants`, `/collection/`, `/collection/:category/`, `/collection/:category/:exhibit`, `/contacts`, `/documents`, `/downloads`, `/exhibitions/`, `/exhibitions/:exhId`, `/thanksletters`, `/useful`, `/dictionary`, `/ceramic-styles`, `/ceramic-styles/:style`, `/japanese-exhibitions`, `/japanese-societies`, `/map`, `/lnt-potters`, `/lnt-potters/:potter`, `*` → NotFound.
- Хвостовые слэши задаёт Caddy (301): у страниц-списков слэш есть, у остальных нет.
- **404 без редиректа**: страница записи без данных сама рендерит `<NotFound />` по тому же адресу (HTTP-статус 404 ставит бэк).

## 2. Взаимосвязи frontend ↔ backend

1. **Единая точка API**: фронт ходит в `${BASE_API_URL}` (`/api` на проде, `http://localhost:3000/api` в dev); статика — `${STATIC_URL}`.
2. **Файлы**: в БД хранится только имя файла; полный URL собирает бэк (`${STATIC_URL}/<раздел>/<ключ>/<файл>`). Заголовок `is-admin: 'true'` в формах админки переключает формат на сырые имена (поддержка контроллерами непоследовательна).
3. **Авторизация**: JWT в localStorage (`STORAGE_KEYS.TOKEN`), заголовок `Authorization: Bearer` на мутациях и закрытых GET.
4. **SEO**: HTML отдаёт бэк (`pages.ts`) — берёт собранный `front/index.html` и подставляет `<title>`, `description`, `og:*`, `twitter:image`, `canonical`. Фронтовый `<Seo>` рендерит только `<title>` (переходы внутри SPA); заголовки дублируются в `staticPages.ts` — меняя одно, правишь другое.
5. **Дублирование типов**: `front/src/types` ↔ `back/src/types` ↔ Mongoose-схема ↔ Joi-валидатор — 4 места синхронизации; формат ответа ещё и в сигнатурах `api.*.ts` (tsc расхождение не ловит).
6. **Валидация**: celebrate не пропускает лишние поля — новое поле добавляется и в Joi-схему, иначе 400.

### Модели MongoDB и связи

| Модель | Ключ | Связи |
|---|---|---|
| `exhibit` (лот) | числовой `id` | `category` → ObjectId(category), `style` → ObjectId(style), `potter` → ObjectId(potter), `complectation: [String]`; `images`, `thumbnail` — имена файлов; `isActive` |
| `exhibition` (выставка) | числовой `id` | самостоятельна (лоты связаны через собственные поля выставок/каталога) |
| `potter` (гончар) | строковый `id` | связь с лотами через `exhibit.potter`; флаги `showArticle`, `isLNT` |
| `style` (стиль керамики) | `name` | `exhibit.style`; `showArticle` — публичность статьи |
| `category` | `name` | `exhibit.category` |
| `complectation` | `name` | строки в `exhibit.complectation` |
| `term` (словарь) | строковый `id` | самостоятельна, картинка в своей папке |
| `marker` (карта) | Mongo `_id` | самостоятельна, группы из `variables/markerGroups.ts` |
| `partner`, `letter`, `file` | `_id` | вспомогательные |
| `user` | — | админ-аккаунт, JWT |
| `feature` | — | **незаконченная фича** (декоративные приёмы), роутер не подключён |

Особенность: связи лота (категория/стиль/гончар) фронт отправляет строкой (`name`/`id`), бэк сам резолвит в ObjectId; если не нашлось — в поле тихо попадает `undefined` и срабатывает дефолт схемы (ошибки нет). В схемах есть хардкод-дефолты ObjectId конкретных документов.

## 3. Существующие архитектурные решения

- **SPA + серверная подмена мета-тегов**: SPA без SSR; ботам и мессенджерам бэк отдаёт `index.html` с подставленными тегами через регулярки. Отсюда жёсткий контракт на формат тегов в `index.html`.
- **Настоящий HTTP 404** для несуществующих записей (не soft-404), при этом страницу NotFound рисует фронт на том же URL.
- **Разделение сторов** visitor/admin (лениво), отдельные наборы RTK-слайсов.
- **Канон обработки ошибок**: контроллеры → `handleMongooseError` → Error-классы со `statusCode` → celebrate-адаптер → финальный handler. Логирование winston в `logs/*.log`.
- **Безопасность**: helmet (CSP снимается только для HTML-страниц), rate-limiter, JWT-ключ зависит от NODE_ENV (слабый ключ роняет прод при старте), `optionalAuth`/`requireAuth` для избирательно закрытых GET.
- **Кэш sitemap** в памяти процесса (TTL 1 ч, кэшируется промис — одновременные запросы ждут одну сборку).
- **Отказоустойчивость мета-тегов**: недоступная БД не роняет страницу — отдаются общие теги со статусом 200.
- **Загрузка файлов «с умом»**: файлы загружаются при сохранении записи (не при выборе), старые удаляются бэком — нет мусора в `static/`.
- **Infra**: Caddy управляет слэшами и перезаписывает заголовки; static вне репозитория и деплоя бэка.

## 4. Потенциальные технические проблемы

1. **Четырёхкратное дублирование контрактов** (front/types, back/types, Mongoose, Joi + сигнатуры api-обёрток) — главный источник тихих расхождений; фронт не проверяет ответы API.
2. **SEO-подстановка регулярками**: любое изменение формата `<meta>`/`<title>` в `index.html` молча ломает подстановку. Заголовки продублированы в 2–3 местах (`<Seo>`, `pages.ts`, `staticPages.ts`).
3. **Тихая потеря связей**: нерезолвленная строка связи → `undefined` → дефолт схемы (хардкод-ObjectId в коде схемы — риск при переносе БД).
4. **Незаконченные/сломанные места** (известные, намеренно не «чинить» попутно): `/api/files` подключён к `lettersRouter` (опечатка); фича `features` не подключена и использует чужой валидатор; в админке маршрут `features` показывает CeramicStyles; опечатка `admin/Exbitions/`.
5. **Несогласованности API**: PATCH где-то 200, где-то 201; заголовок `is-admin` поддержан по-разному.
6. **Mongoose autoIndex** не удаляет старые индексы — удаление поля из схемы оставляет unique-индекс, дающий E11000 (409) на новых документах.
7. **Нет тестов** — только ручные tsc/eslint/stylelint.
8. **SPA без SSR**: контент приходит из API в браузере (потому `/api` открыт роботам в robots.txt); индексация зависит от подмены тегов.
9. **Общий limiter и in-memory кэш sitemap** — сломаются при масштабировании на несколько инстансов (сейчас не критично).
10. **Строковые идентификаторы** (`name` как ключ сущности) — переименование ломает URL и связи.

## 5. Как расширять функциональность, не ломая существующее

### Чек-лист «новая сущность» (канон проекта)

1. `back/src/types/<entity>.ts` — интерфейс документа.
2. `back/src/models/<entity>.ts` — схема (`versionKey: false`, тексты `required` на русском).
3. `back/src/middlewares/validators/<entity>Validator.ts` — celebrate/Joi (+ `.messages` на русском); помнить: лишнее поле = 400.
4. `back/src/controllers/<entity>.ts` — async-функции, `try/catch` → `handleMongooseError`, экспорт объекта в конце файла.
5. `back/src/routes/<entity>.ts` + регистрация в `routes/index.ts`; закрытые GET помечать `requireAuth`/`optionalAuth`; PATCH отвечать 200.
6. `back/src/variables/messages.ts` — блок `ERROR_MESSAGES.<ENTITY>`; при файлах — новая папка в `variables/paths.ts`.
7. `front/src/types/<entity>.ts` (+ default-объект формы), `front/src/utils/api/api.<entity>.ts` (+ сборка в `api.ts`), RTK-слайсы (visitor/admin), компоненты visitor/admin, БЭМ-стили через CSS-переменные.

### Чек-лист «новая публичная страница»

1. Компонент в `components/visitor/`, маршрут в `VisitorView.tsx` (lazy).
2. `<Seo>` — только `<title>`; описание — на бэке (`staticPages.ts`, для страниц записей — `pages.ts`).
3. `Caddyfile`: правила хвостовых слэшей; `LISTING_PAGES` в `back/src/variables/staticPages.ts` должна соответствовать `@listingToAddSlash`.
4. `STATIC_PAGES` — страница попадает в sitemap; обновить `public/llms.txt`.
5. Для параметрических адресов — шаблон в `PAGE_ROUTES` (`pages.ts`) **после** существующих (порядок = приоритет, лот раньше категории, статичные последними).
6. Формат тегов в `index.html` не менять (регулярки бэка): `<meta property="og:..." content="..." />` в одну строку, атрибуты в этом порядке.

### Общие принципы безопасности изменений

- **Не менять формат ответов существующих эндпоинтов** — фронт их не валидирует; добавлять новые поля можно, удалять/переименовывать нельзя.
- **Новые поля записи** = все 4 места типов + Joi-валидатор + форма админки.
- **Публичный GET** отдаёт только активное/публичное (фильтр `isActive`/`showArticle` на бэке) — всё без токена видит весь интернет; заголовок `is-admin` — не механизм доступа.
- **Удаление поля из схемы**: сначала `dropIndex`, потом `$unset` (иначе E11000 на втором документе).
- **Секреты** — только в `.env`; JWT-ключи dev/прод разные by design.
- **Проверка перед сдачей**: `cd back && npx tsc --noEmit && npx eslint .`; `cd front && npx tsc --noEmit && npx eslint . --max-warnings 0` (+ `npx stylelint '**/*.scss'` при правке стилей). Тестов и CI-линтера нет.
- **Не запускать без явной просьбы**: `db:push`, `db:pull`, `upload:*`, `ops.sh` — действия на проде.
- **Стиль кода**: табы, одинарные кавычки, точки с запятой, `function` вместо стрелок, `async/await`, комментарии на русском («почему»), константы в `Object.freeze` в `variables/`; на фронте `useMemo`/`useCallback` не добавлять (React Compiler); явный `any` и `console.log` запрещены.
- **Не трогать попутно**: `yuding/`, известные опечатки (`admin/Exbitions/`), хвостовые слэши.

### Возможные направления развития (в порядке убывания риска для существующего)

1. **Завершить фичу features** («декоративные приёмы») — модель и заготовки уже есть; идти по чек-листу новой сущности.
2. **Унифицировать `is-admin` и коды PATCH (200)** — точечные фиксы, фронт не заметит.
3. **Единый источник SEO-мета** — генерировать `staticPages.ts`/`<Seo>` из одного файла, убрать дублирование.
4. **Runtime-валидация ответов API на фронте** (например, zod в `api.*.ts`) — закрывает проблему «tsc не ловит расхождение».
5. **Версионирование API (`/api/v1`)** — если планируются ломающие изменения контрактов.
6. **SSR / пре-рендер статей** (Astro уже используется в `docs/`) — большой шаг, замена подмены тегов регулярками; только как отдельный проект.

---
*Файл создан по результатам анализа кода (2026-11-08); код проекта не изменялся.*
