# Backend (back/)

Express 5 + Mongoose 9 на TypeScript (CommonJS, `module: node20` + `moduleResolution: node16`, strict). `node20` нужен, чтобы из CommonJS можно было `require()` ESM-only пакеты (celebrate 16+); в рантайме это умеет Node ≥ 20.19, прод и CI — Node 24. Точка входа — `src/app.ts`, в проде работает собранный `dist/app.js` внутри Docker.

## Команды

```bash
npm run dev     # nodemon + ts-node, env берётся из ../.env (DOTENV_CONFIG_PATH в nodemon.json)
npm run build   # tsc → dist/
npx tsc --noEmit && npx eslint .   # проверка перед сдачей
```

## Как проходит запрос

`app.ts`: `limiter` (10000 запросов / 15 мин) → `cors()` → winston request logger (`logs/request.log`) → `helmet` → body-parser → `/static` (express.static из `../static`) → `/api` → `GET /sitemap.xml` (`controllers/sitemap.ts`) → `GET /{*splat}` (HTML страниц сайта, `controllers/pages.ts`) → winston error logger → `celebrateErrorAdapter` → `errorHandler`.

`routes/index.ts`: `POST /signin` открыт → `auth` → все роутеры.

`middlewares/auth.ts`: глобальная `auth` пропускает любой `GET`, для остальных методов проверяет `Bearer`-JWT и кладёт payload в `req.user`. Закрытые GET помечаются в роутере: `requireAuth` — только с токеном (`GET /users/`, `/exhibits/`, `/maps/`), `optionalAuth` — токен необязателен, но если пришёл, должен быть валидным, иначе 401 (`GET /exhibitions/`, `/partners/`: контроллер смотрит на `req.user`). Новый GET, который отдаёт неактивные записи или служебные поля, закрывать так же. В не-production секрет JWT — захардкоженный `'default-key'`, так что локальный токен на проде не работает, и наоборот.

## Структура `src/`

| Папка | Содержимое | Правило |
|---|---|---|
| `routes/<entity>.ts` | `Router()`: валидатор + метод контроллера | регистрируется в `routes/index.ts` |
| `controllers/<entity>.ts` | async-функции `(req, res, next)`, в конце файла `export const <entity> = { ... }` | ошибки передаются в `handleMongooseError` |
| `models/<entity>.ts` | `new Schema<T>({...}, { versionKey: false })`, `export default model<T>('<entity>', schema)` | тексты `required` на русском |
| `types/<entity>.ts` | интерфейс документа | держать в синхроне с `front/src/types` |
| `middlewares/validators/<entity>Validator.ts` | `celebrate({ body/params: Joi.object().keys({...}) })` | `.messages({...})` на русском |
| `errors/*` | `ValidationError` 400, `AuthorizationError` 401, `RightsError` 403, `NotFoundError` 404, `ConflictError` 409 | все хранят `statusCode` |
| `variables/messages.ts` | `ERROR_MESSAGES.<ENTITY>.{WRONG_DATA, WRONG_ID, NOT_FOUND, ALREADY_EXISTS}` | новая сущность = новый блок |
| `variables/paths.ts` | `PATHS`: имена папок в `static/`, `STATIC_DIR`, `STATIC_URL` | имя папки = сегмент URL |
| `variables/regexes.ts` | `REGEX` для валидаторов | |
| `utils/slides.ts` | загрузка и удаление слайдов статей | см. ниже |

## Обработка ошибок — канон

```ts
async function updateThing(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await Thing.findOneAndUpdate({ name: req.params.name }, req.body, {
			returnDocument: 'after',
			runValidators: true,
		}).select({ _id: 0 }).orFail();
		res.send(result);
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.THING); }
}
```

`handleMongooseError` переводит ошибки: `CastError` → 400 WRONG_ID, `ValidationError` → 400 WRONG_DATA, `DocumentNotFoundError` (из `.orFail()`) → 404, код `11000` → 409. Всё остальное уходит в `errorHandler`, и клиент получает 500 с `DEFAULT_MESSAGE`. Сообщение ошибки клиенту не показывается.

Ответ об ошибке всегда имеет вид `{ message: string }`. Фронт читает именно `message`.

Ошибки celebrate превращаются в `ValidationError` с первым сообщением Joi (через `error-handler-celebrate.ts`), поэтому тексты в `.messages()` видит пользователь админки.

## Статика и URL

- На диске: `STATIC_DIR = path.resolve(__dirname, '../../../static')`. Из `src/variables/` и из `dist/variables/` это корень репозитория, `/static`. В Docker `./static` монтируется в `/static`.
- В ответах: `PATHS.STATIC_URL` — в production `/${STATIC_URL}` (то есть `/static`), в dev `${BASE_URL}:${PORT}/${STATIC_URL}`.
- Контроллер сам собирает полный URL из имени файла. Шаблоны путей по сущностям — в `.claude/specs/data-model.md`.
- Чтобы в ответе не было `_id`, используется `.select({ _id: 0 })` / `'-_id'`. Исключения: партнёры и маркеры — там `_id` служит ключом.
- Для чтения с последующей правкой полей удобнее `.lean<T>()`, чем мутировать документ Mongoose.

## Слайды статей (`utils/slides.ts`, `controllers/uploads.ts`)

- `POST /api/uploads/slides/:target/:key` (multipart, поле `files`, до 30 файлов по 20 МБ, только jpeg/png/webp/avif/gif). Файлы кладутся в `static/<SLIDES_TARGETS[target]>/<key>/slides/`.
- Имя файла транслитерируется в латиницу. Существующие файлы **не перезаписываются**, к имени добавляется `-1`, `-2`: картинки кэшируются на год, и под старым именем показывалась бы старая версия.
- Разрешённые `target` сейчас: `ceramic-styles` (key = `style.name`), `potters` (key = `potter.id`). Как подключить новый раздел — в `recipes.md`.
- При PATCH статьи контроллер вызывает `removeUnusedSlides(target, key, before, after)`: удаляет с диска только файлы, которые были в статье до сохранения и исчезли после. Если в том же PATCH сменился ключ (name/id), слайды не трогаются: они остаются в старой папке и **не переносятся**.

## HTML страниц и мета-теги (`controllers/pages.ts`)

Мессенджеры и соцсети не выполняют JS, поэтому `Seo` на фронте им не виден. На прод Caddy отдаёт сам только существующие файлы сборки (и `/` — там есть `index.html`), а остальные пути сайта проксирует в бэк. `renderPage` читает `PATHS.FRONT_INDEX` (на проде `/srv/front/index.html` из volume `front_build`, локально `front/dist/index.html` — нужен `npm run build` во `front/`) и подставляет мета-теги страницы.

- Файл читается на каждый запрос, без кэша, чтобы пересборка фронта подхватывалась без рестарта бэка.
- `og:url` и `<link rel="canonical">` (`applyUrl`) ставятся **любой** странице, которую отдаёт бэк, по `req.path`. Canonical вставляется перед `</head>`, а не заменяется: в `index.html` его нет, и если вставка не сработает, страница останется без canonical, а не объявит себя главной. Главную `/` Caddy отдаёт сам, без canonical.
- `findPageMeta(path)` проходит по таблице `PAGE_ROUTES` и берёт первый подошедший шаблон (порядок важен: лот раньше категории, статичные страницы последними). Поддержаны: лот (`isActive`), категория (поиск по `name`), выставка (только `isActive` — как `GET /exhibitions/:id`), стиль и гончар (если `showArticle !== false` — как их API статей), статичные страницы из `variables/staticPages.ts`. Видимость повторяет API, который вызывает фронт: скрытое не должно светиться в мета-тегах. Нет совпадения или записи → **статус 404** и `<title>` из `NOT_FOUND_TITLE` (`variables/staticPages.ts`, дублирует `<Seo>` в `NotFound`): иначе поисковики индексируют несуществующие адреса как soft 404. Саму страницу «не найдено» рисует фронт по тому же адресу. Исключения со статусом 200 и общими тегами — `PAGES_WITHOUT_META`: главная `/` (на проде её отдаёт Caddy) и `/admin/*`. Ошибка БД → тоже 200 с общими тегами, а не 404. **Новая публичная страница фронта без записи в `PAGE_ROUTES`/`STATIC_PAGES` будет отдаваться с 404** — при её добавлении это обязательная правка.
- Заголовки повторяют `<Seo>` соответствующих страниц фронта. Описания живут **только на бэке** (фронтовый `Seo` рендерит один `<title>`): берутся из HTML-поля записи (`description` / `info`), если оно пустое — запасной текст. Заголовки и описания статичных страниц — в `variables/staticPages.ts`; ключ — путь без слэшей, он же папка `static/pages/<ключ>/` для `og.jpg`.
- Новая сущность = функция `get<Entity>Meta(param)`, возвращающая `PageMeta`, + строка в `PAGE_ROUTES`. Новая статичная страница = запись в `STATIC_PAGES`.
- Картинка превью — `getOgImage(...папка)` из `utils/ogImage.ts`: ищет `static/<папка>/og.jpg`, затем `og.webp` (у стилей его можно загрузить из админки, см. `/uploads/og` в api.md), иначе отдаёт `PATHS.DEFAULT_OG_IMAGE` (`front/public/images/og-image.jpg`, его теги в `index.html` — размеры и `og:image:alt` — тогда не трогаются; для своей картинки `og:image:alt` = `ogTitle`). `og.jpg` — отдельный файл, потому что webp понимают не все соцсети. К адресу добавляется `?v=<mtime>`: и Caddy, и соцсети кешируют картинку по URL, так что заменённый `og.jpg` подхватывается сразу.
- Значения из БД экранируются (`escapeAttribute`), описание проходит через `toPlainText` (убирает теги) и `truncate`: `description` — до 160 символов (сниппет Google), `og:description` — до 125 (превью в соцсетях), многоточие входит в лимит.
- Ошибка БД не роняет страницу: логируется, отдаются общие теги. Ошибка чтения `index.html` → 500.
- CSP от helmet в HTML-ответе снимается (`removeHeader`): он рассчитан на API и сломал бы карту, emailjs и внешние слайды.
- `/static/*`, для которого не нашлось файла, пропускается дальше (404), а не превращается в HTML.
- Проверка локально: `curl -s localhost:3000/collection/bowls/1337 | grep -E '<title|og:'` (в dev `og:image` указывает на localhost — это нормально).

## sitemap.xml (`controllers/sitemap.ts`)

Статичного файла нет: Caddy не находит `/sitemap.xml` в сборке фронта и проксирует запрос в бэк. Маршрут зарегистрирован до `renderPage`, иначе на этот адрес ушёл бы HTML. Адрес sitemap указан в `front/public/robots.txt`.

- Собирается из БД и час хранится в памяти процесса (`CACHE_TTL`): частые запросы к sitemap не нагружают Mongo, а новые записи появляются в нём с задержкой до часа или сразу после рестарта бэка. Кэшируется промис, поэтому одновременные запросы ждут одну сборку.
- В sitemap попадают: главная, `STATIC_PAGES`, категории, активные лоты (`/collection/<category.name>/<id>`; лот, чья категория не нашлась, пропускается), активные выставки, стили с `showArticle: true`, гончары с `showArticle: true` и `isLNT: true`. Условия — как в API списков: в sitemap только страницы, на которые есть ссылки на сайте.
- Адреса — в том виде, в каком их оставляет Caddy: страницы-списки из `LISTING_PAGES` (`variables/staticPages.ts`) — со слэшем на конце, остальные без. Если меняется `@listingToAddSlash` в `Caddyfile`, нужно поправить и `LISTING_PAGES`.
- `lastmod` и `priority` не пишутся: в схемах нет `timestamps`, а `priority` Google игнорирует.
- Ошибка БД → 500 (поисковик повторит запрос позже), а не обрезанный sitemap. Ошибка не кэшируется: следующий запрос соберёт sitemap заново.
- Проверка локально: `curl -s localhost:3000/sitemap.xml | xmllint --noout -`.

## Подводные камни

- Модель `category`: в документах БД есть и легаси-поле `category`, и `name` (с одинаковым значением). Контроллеры категорий и `createExhibit`/`updateExhibit` ищут по `{ category: ... }`. Подробности — в known-issues.
- `/api/files` сейчас подключён к `lettersRouter` (опечатка). Контроллер `files.ts` не используется.
- `routes/features.ts`, `controllers/features.ts`, `models/feature.ts` — **незаконченная работа** (раздел «декоративные приёмы»). Роутер не подключён в `routes/index.ts`, POST использует валидатор стилей керамики.
- Ответы на PATCH разные: где-то 200, где-то 201. Фронт на код успеха не смотрит, но в новом коде PATCH должен отвечать 200.
- `console.log` запрещён линтером (разрешён `console.warn` / `console.error`). Если очень нужно, `// eslint-disable-line no-console`.
