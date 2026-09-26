# Рецепты: типовые доработки

Чек-листы, чтобы не забыть одно из мест, которые нужно синхронизировать. За образец лучше брать свежий код (стили керамики, гончары, словарь, маркеры), а не старый (письма, категории).

## 1. Новое поле у существующей сущности

1. `back/src/types/<entity>.ts` — поле в интерфейсе.
2. `back/src/models/<entity>.ts` — поле в схеме (`default`, если оно необязательное).
3. `back/src/middlewares/validators/<entity>Validator.ts` — поле в Joi. **Без этого PATCH/POST из админки получат 400 «... is not allowed».** Если поле может быть пустым, добавить `.allow('')`.
4. Контроллер: если поле — файл, собрать URL в GET-ответе для сайта и оставить сырое имя для `is-admin: true`.
5. `front/src/types/<entity>.ts` — интерфейс **и** `default<Entity>` (иначе у формы будет uncontrolled input).
6. Форма админки — инпут с `name="<поле>"` (общий `handleChange` берёт ключ из `event.target.name`).
7. Компонент сайта, где поле показывается.
8. Если нужно заполнить поле у старых документов, предложить пользователю одноразовый `mongosh`-скрипт. Самому его не запускать.

## 2. Новая CRUD-сущность

**Бэк:**
1. `types/<entity>.ts`, `models/<entity>.ts` (`versionKey: false`, русские сообщения в `required`).
2. `variables/messages.ts` — блок `ERROR_MESSAGES.<ENTITY>` с 4 ключами.
3. `variables/paths.ts` — имя папки в `static/`, если у сущности есть файлы.
4. `middlewares/validators/<entity>Validator.ts` — валидатор тела и валидатор параметра-ключа.
5. `controllers/<entity>.ts` — async-функции + `export const <entity> = {...}`, ошибки через `handleMongooseError(error, next, ERROR_MESSAGES.<ENTITY>)`, PATCH с `{ returnDocument: 'after', runValidators: true }` + `.orFail()`.
6. `routes/<entity>.ts` + регистрация в `routes/index.ts` **после** `routes.use(auth)`. Статические пути (`/articles`, `/lnt`) объявлять раньше `/:param`.
7. Если сущность должна считаться в статистике — `controllers/statistics.ts`.

**Фронт:**
1. `types/<entity>.ts` — интерфейс + `default<Entity>`.
2. `utils/api/api.<entity>.ts` по образцу `api.terms.ts` + регистрация в `utils/api/api.ts`. Имя сегмента добавить в `PATHS` в `variables/variables.ts`.
3. `slices/admin/<entity>.ts` (`list`, `toEdit`, `isExistingEdited`) + reducer в `slices/admin/index.ts`.
4. `components/admin/<Entity>/<Entity>.tsx` (таблица + Modal) и `<Entity>FormView.tsx`.
5. Роут в `components/admin/AdminView/AdminView.tsx` + пункт меню в `components/admin/Admin/Admin.tsx` (`listOne` / `listTwo`).
6. Публичная часть — см. рецепт 3.

**Доки:** `.claude/specs/api.md`, `.claude/specs/data-model.md`.

## 3. Новая публичная страница

1. Компонент `components/visitor/<Name>/<Name>.tsx` (+ `.scss`). Внутри `<Seo title="Камамото: ..." description="..." />`, `<PageTop title=... />`, контент в `<section className="section">`, `useLayoutEffect(() => scrollToTop(), [])`.
2. `lazy()`-импорт и `<Route>` в `VisitorView.tsx`.
3. Ссылка: меню и подвал в `variables/links.ts`, раздел «Полезное» в `Useful.tsx`.
4. `Caddyfile` — добавить путь в `@staticToRemoveSlash` (одиночная страница) или в `@listingToAddSlash` (список со слэшем на конце). Этот файл деплоится отдельно (`upload:config` + рестарт caddy), сказать об этом пользователю.
5. `front/public/sitemap.xml` и `front/public/llms.txt`.
6. Если страница грузит данные: preloader, пока данных нет; при `error.status === 404` — `navigate('/404', { replace: true })`.

## 4. Статья со слайдами для нового раздела

1. Модель: поля `showArticle` и `article` с той же подсхемой, что у `style`/`potter` (`_id: false`).
2. `back/src/utils/slides.ts` → в `SLIDES_TARGETS` добавить `'<target>': PATHS.<FOLDER>`.
3. В PATCH-контроллере прочитать `previous.article` **до** обновления и после успешного обновления вызвать `removeUnusedSlides('<target>', key, previous.article, updated.article)` (только если ключ не менялся).
4. В GET статьи превратить локальные `slide.filename` в `${STATIC_URL}/<folder>/<key>/slides/<file>`. Пустые имена и имена, начинающиеся с `http`, пропускать.
5. Фронт-форма: `<ArticleForm entity onChange slidesStorage={{ target: '<target>', key: entity.<key>, emptyKeyHint: '...' }} />`.
6. Сайт: страница-обёртка по образцу `CeramicStyle.tsx` / `LNTPotter.tsx` → `<Article ... data={...} />`.

## 5. Новая категория коллекции

Категории частично захардкожены:
1. Документ в `categories` с полями `name`, **`category` (то же значение — на него завязаны запросы)**, `title` (строчными), `thumbnail`. Файл — в `static/categories/`.
2. `front/src/variables/variables.ts` → `CATEGORIES` (иначе страница категории отдаст 404) и `types/exhibitCategory.ts`.
3. `sitemap.xml`, `llms.txt`.

## 6. Выпуск версии сайта

Версии идут в формате `2.<раздел>.<пункт>`, changelog ведётся по-русски.
1. `front/package.json` → `version`.
2. `front/src/variables/variables.ts` → `SITE_VERSION` (показывается в подвале).
3. `docs/src/content/docs/versions/<major>-<minor>.md` — новый пункт (или новый файл для новой минорной версии, по образцу `2-5.md`).
Делать только по просьбе пользователя или предложить в конце большой фичи.

## 7. Проверка изменений

- Код: команды из корневого `CLAUDE.md` (tsc + eslint для каждой затронутой папки).
- Поведение API: при запущенном `npm run dev` — `curl -s http://localhost:3000/api/<path>/`. Для мутирующих запросов нужен токен, их лучше не дёргать без согласия пользователя, потому что локальная БД — это его рабочая копия, которая потом уходит на прод через `db:push`.
- UI: скилл `run` / браузер, dev-сервер на `http://localhost:5173`.
