# Frontend (front/)

React 19 SPA на Vite 8 (rolldown). React Compiler включён через babel-плагин, поэтому **`useMemo`/`useCallback` вручную не нужны** (старые в коде есть, новых не добавлять). ESM, TypeScript strict с `noUnusedLocals`/`noUnusedParameters`. Алиас `@/` → `src/`.

## Команды

```bash
npm run dev        # vite --host, порт 5173 (из корня `npm run dev` поднимает ещё и back)
npm run build      # tsc && vite build → dist/
npx tsc --noEmit && npx eslint . --max-warnings 0
npx stylelint '**/*.scss'
```

## Окружение

- `PATHS.BASE_API_URL`: в production `/api`, в dev `VITE_BASE_API_DEV_URL` из `front/.env` (`http://localhost:3000/api`).
- `PATHS.STATIC_URL`: в production `/static`, в dev `http://localhost:3000/static`.
- `htmlParserOptions` в dev дописывает к `<img src>` в HTML статей префикс `http://localhost:3000`, потому что в HTML из БД пути относительные (`/static/...`).
- `VITE_EMAILJS_*` (форма на странице контактов) и `VITE_MAP_API_KEY` берутся из корневого `.env`. В dev их подставляет `dotenv-cli` из корневого `npm run dev`. Если запускать `npm run dev` прямо в `front/`, этих переменных не будет.

## Структура `src/`

```
components/
  App/                 роутер верхнего уровня: /admin/* (lazy) и /* (VisitorView)
  visitor/<Name>/      страницы и блоки сайта; <Name>.tsx + <Name>.scss рядом
  admin/<Name>/        разделы админки (формы, таблицы)
  admin/shared/        ArticleForm (редактор статей со слайдами), RichTextEditor (tiptap)
  shared/              Button, Modal, Preloader — общие для обеих частей
slices/visitor/*       RTK-слайсы сайта, стор создаётся лениво (getVisitorStore)
slices/admin/*         RTK-слайсы админки, отдельный стор (getAdminStore)
utils/api/api.<x>.ts   fetch-обёртки по сущностям, собраны в `api` (utils/api/api.ts)
types/*                интерфейсы + default-объекты для форм (defaultExhibitAdmin и т.п.)
variables/*            PATHS, CATEGORIES, STORAGE_KEYS, SITE_VERSION, ссылки меню, статичный контент
styles/*.scss          глобальные БЭМ-блоки (button, form, table, section, text, title...), variables.scss — CSS-переменные
assets/icons/*.svg     спрайт через vite-plugin-svg-spritemap: `/__spritemap#sprite-<file>-view`
```

## Роутинг (react-router 8, `BrowserRouter`)

- Сайт: `components/visitor/VisitorView/VisitorView.tsx`, все страницы — `lazy()`. Layout: Header, Main (Outlet), Footer.
- Админка: `components/admin/AdminView/AdminView.tsx` → `Admin` (сайдбар + Outlet, без логина редиректит на `/admin/login`).
- Для 404 используется `navigate('/404', { replace: true })`, путь ловит `*` → `NotFound`.
- **Хвостовые слэши задаёт Caddy** (301-редиректы): у страниц-списков слэш есть (`/collection/`, `/exhibitions/`, `/ceramic-styles/`, `/lnt-potters/`, `/useful/`), у остальных нет. Новая страница = правка регулярок в `Caddyfile`, иначе будут дубли URL для SEO.

## Работа с API

```ts
const token = storage.get<string>(STORAGE_KEYS.TOKEN); // localStorage, значения в JSON
if (token) {
	try {
		const response = await api.potters.updatePotter(token, potterToEdit);
		// обновить список в слайсе
		setSaveMessage('Данные обновлены');
	}
	catch (error: any) {
		setSaveMessage(error.message || 'Что-то пошло не так :(');
	}
}
```

- Все запросы проходят через `checkResponseStatus`: при `!ok` он бросает `ApiError(message, status)`, где `message` — текст ошибки с бэкенда. Страницы сайта по `error.status === 404` уводят на `/404`.
- Для форм админки GET вызывается с `isAdmin = true`: добавляется заголовок `is-admin: 'true'`, и бэк отдаёт сырые имена файлов вместо URL.
- RTK Query не используется: запросы идут из `useEffect` компонентов, результат кладётся в слайс через `dispatch`.

## Паттерн раздела админки

Список (`<Entity>.tsx`: таблица `.table` / `.table__row` / `.table__cell--span-N`) + `Modal` с формой (`<Entity>FormView.tsx` или `<Entity>Form.tsx`).
Слайс админки хранит `list`, `<entity>ToEdit` и `isExisting<Entity>Edited`. Отсюда два режима формы: «Создать/Очистить» и «Сохранить/Удалить». На время запроса форма блокируется через `inert={ isFormDisabled }`, результат показывается в `saveMessage`, который сбрасывается через 3 секунды.
Хорошие свежие образцы: `admin/CeramicStyles/*`, `admin/Potters/*`, `admin/Dictionary/*`, `admin/Markers/*`.

## Статьи (стили керамики, LNT-гончары)

- Структура данных: `article: { content: string (HTML), slides?: { filename, source?, caption? }[] }[]`. Флаг `showArticle` открывает статью публично.
- Админка: `<ArticleForm entity onChange slidesStorage={{ target, key, emptyKeyHint }} />`. Секции редактируются в tiptap (`RichTextEditor`), слайды загружаются drag'n'drop через `ArticleFormSlidesDropzone`.
- На сайте `<Article data=... />` → `ArticleSection` (HTML разбирается через `html-react-parser` + `htmlParserOptions`, который расставляет БЭМ-классы тегам) + `ArticleSlider` (swiper).
- Внешние слайды (URL, начинающийся с `http`) бэк не трогает. Локальные превращаются в `${STATIC_URL}/<раздел>/<key>/slides/<file>`.

## Стили

- Методология БЭМ: `block__element--modifier`, desktop-first. Компонентные стили лежат рядом с компонентом, общие блоки — в `styles/`, подключаются через `styles/_index.scss`.
- Цвета, отступы, радиусы и z-index — только через CSS-переменные из `styles/variables.scss` (`var(--gap-16)`, `var(--text-muted)` и т.д.). Сырых hex и px-отступов в новом коде быть не должно.
- stylelint (`stylelint-config-clean-order`) проверяет порядок свойств. Если что-то поехало, `npx stylelint --fix`.

## Подводные камни

- `CATEGORIES` в `variables/variables.ts` — **захардкоженный** список категорий: страница `Category` показывает 404 для категорий не из этого списка. Если категория добавлена в БД, её нужно добавить и сюда (и в `sitemap.xml` / `llms.txt`).
- `SITE_VERSION` (`variables.ts`) и `version` в `package.json` меняются вместе (сейчас 2.5.4).
- При новой публичной странице обновляем `public/sitemap.xml`, `public/llms.txt` и, если нужно, `Caddyfile`.
- Маршрут админки `features` сейчас показывает `AdminCeramicStyles` — это заготовка под незаконченную фичу, пункт меню закомментирован.
- Имя папки `admin/Exbitions/` с опечаткой — это существующий путь, не «исправлять» его попутно.
