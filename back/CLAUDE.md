# Backend (back/)

Express 5 + Mongoose 9 на TypeScript (CommonJS, `module: node20` + `moduleResolution: node16`, strict). `node20` нужен, чтобы из CommonJS можно было `require()` ESM-only пакеты (celebrate 16+); в рантайме это умеет Node ≥ 20.19, прод и CI — Node 24. Точка входа — `src/app.ts`, в проде работает собранный `dist/app.js` внутри Docker.

## Команды

```bash
npm run dev     # nodemon + ts-node, env берётся из ../.env (DOTENV_CONFIG_PATH в nodemon.json)
npm run build   # tsc → dist/
npx tsc --noEmit && npx eslint .   # проверка перед сдачей
```

## Как проходит запрос

`app.ts`: `limiter` (10000 запросов / 15 мин) → `cors()` → winston request logger (`logs/request.log`) → `helmet` → body-parser → `/static` (express.static из `../static`) → `/api` → winston error logger → `celebrateErrorAdapter` → `errorHandler`.

`routes/index.ts`: `POST /signin` открыт → `auth` → все роутеры.

`middlewares/auth.ts` пропускает любой `GET`, кроме `originalUrl === '/api/users/'`. Для остальных методов проверяет `Bearer`-JWT и кладёт payload в `req.user`. В не-production секрет JWT — захардкоженный `'default-key'`, так что локальный токен на проде не работает, и наоборот.

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

## Подводные камни

- Модель `category`: в документах БД есть и легаси-поле `category`, и `name` (с одинаковым значением). Контроллеры категорий и `createExhibit`/`updateExhibit` ищут по `{ category: ... }`. Подробности — в known-issues.
- `/api/files` сейчас подключён к `lettersRouter` (опечатка). Контроллер `files.ts` не используется.
- `routes/features.ts`, `controllers/features.ts`, `models/feature.ts` — **незаконченная работа** (раздел «декоративные приёмы»). Роутер не подключён в `routes/index.ts`, POST использует валидатор стилей керамики.
- Ответы на PATCH разные: где-то 200, где-то 201. Фронт на код успеха не смотрит, но в новом коде PATCH должен отвечать 200.
- `console.log` запрещён линтером (разрешён `console.warn` / `console.error`). Если очень нужно, `// eslint-disable-line no-console`.
