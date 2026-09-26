# Модель данных

MongoDB 8. База `DB_NAME`, аутентификация через `authSource=admin`. Имя коллекции — имя модели во множественном числе (Mongoose).
Схемы: `back/src/models/*.ts`, у всех схем `versionKey: false`. Каскадных удалений и проверок ссылочной целостности **нет**.

## Сущности и ключи

| Сущность | Модель → коллекция | Публичный ключ | Где на фронте | Файлы в `static/` |
|---|---|---|---|---|
| Лот (экспонат) | `exhibit` → `exhibits` | `id: number` (unique, 0–9999) | `/collection/<category>/<id>` | `exhibits/<id>/<images[]>`, `exhibits/<id>/<thumbnail>`, `exhibits/<id>/additional/<additionalImages[]>` |
| Категория | `category` → `categories` | `name` (+ легаси `category` с тем же значением) | `/collection/<name>/` | `categories/<thumbnail>` |
| Стиль керамики | `style` → `styles` | `name` (unique, `[a-z-]+`) | `/ceramic-styles/<name>` | `ceramic-styles/<name>/<thumbnail>`, `.../<mapImage>.svg`, `.../slides/*` |
| Гончар | `potter` → `potters` | `id: string` (unique, латиница) | `/lnt-potters/<id>` | `potters/<id>/<photo>`, `potters/<id>/slides/*` |
| Выставка | `exhibition` → `exhibitions` | `id: number` (unique, > 0) | `/exhibitions/<id>` | `exhibitions/<id>/<photos[]>`, `exhibitions/<id>/<poster>` |
| Термин словаря | `term` → `terms` | `id: string` (`[a-z0-9-]+`) | `/dictionary` (якоря) | `dictionary/<image>` |
| Маркер карты | `marker` → `markers` | `_id` | `/map` | `map/<image>` |
| Партнёр | `partner` → `partners` | `_id` | главная / блоки | `partners/<logo>` |
| Благодарственное письмо | `letter` → `letters` | `id: number` | `/thanksletters` | `letters/<name>.pdf`, `letters/<thumbnail>` |
| Вариант комплектации | `complectation` → `complectations` | `name` (unique) | в карточке лота | — |
| Пользователь админки | `user` → `users` | `email` (unique) | `/admin/login` | — |
| Декоративный приём (WIP) | `feature` → `features` | `name` | не подключено | `features/<name>/...` (план) |

## Лот (`exhibit`) — поля

| Поле | Тип | Примечание |
|---|---|---|
| `id` | number | номер лота, он же папка с фото |
| `name` | string | Joi: ≥ 10 символов |
| `age` | string? | эпоха/возраст, произвольный текст |
| `category` | ObjectId → category | default `66c7346ebc34b51d2a432a8d` = `other` («другое») |
| `style` | ObjectId → style | default `67f8082ad7087fa1cababada` = `unknown` («неизвестен») |
| `potter` | ObjectId → potter | default `690201704cdb3b65432973f2` = `id: 'unknown'` («неизвестный мастер»). У ~13 старых неактивных лотов поля `potter` нет совсем |
| `images`, `additionalImages` | string[] | имена файлов |
| `thumbnail` | string | default `thumb.jpg` |
| `description`, `additionalDescription` | string (HTML) | default «Описание в процессе создания» |
| `price` | number ≥ 0 | **выдаётся публично** через `GET /exhibits/` |
| `weight`, `height`, `length`, `width`, `diameter`, `footDiameter`, `volume`, `weightOfSet` | number? | |
| `complectation` | string[] | значения `complectation.name` (**не** ObjectId). В `GET /exhibits/:id` заменяются на `title` |
| `preservation` | string | состояние |
| `season` | `'весна' \| 'лето' \| 'осень' \| 'зима'` | в схеме — просто String |
| `isActive` | boolean | default false. Неактивный лот не показывается на сайте, но есть в `GET /exhibits/` |

## Статьи (общая структура для `style`, `potter`, `feature`)

```ts
showArticle: boolean;                       // публикация статьи
article: {
	content: string;                          // HTML из tiptap: p, h2, h3, ul/ol, blockquote, a, i, img[class]
	slides?: { filename: string; source?: string; caption?: string }[];   // filename — имя файла в .../slides/ или внешний http-URL
}[];
```

В подсхемах `article` и `slides` стоит `_id: false`.

## Прочие схемы (кратко)

- **category**: `name`, `title` (unique, строчными: «чаши»), `thumbnail`. Сейчас 8 категорий: bowls, caddies, cups, other, plates, teapots, vases, archive — список продублирован во фронте (`variables.ts` → `CATEGORIES`, `types/exhibitCategory.ts`).
- **style**: `name`, `title` (unique), `description` (HTML, показывается в карточке лота), `thumbnail`, `mapImage` (svg-миникарта), `showArticle`, `article`.
- **potter**: `id`, `name` (unique), `japaneseName`, `lifeDates`, `photo`, `info` (HTML), `isLNT` (живое национальное сокровище), `showArticle`, `article`.
- **exhibition**: `id`, `year`, `dates` (строка), `city`, `address`, `place`, `name`, `link` (URL или ''), `description`, `photos[]`, `poster`, `curators`, `organisators`, `isActive`.
- **term**: `id`, `title`, `kanji`, `romaji`, `image`, `definition` (HTML), `letter` (первая буква раздела словаря, задаётся вручную).
- **marker**: `geocode [lat, lng]`, `title`, `kanji`, `romaji`, `info` (HTML), `image`, `isActive`, `groupName`.
- **partner**: `title`, `link` (URL), `logo`, `isActive`.
- **letter / file**: `id`, `name` (файл), `thumbnail`, `description`, `isActive`.
- **complectation**: `name` (unique, латиница), `title` (русское название).
- **user**: `email`, `password` (bcrypt, `select: false`).

## Справочники, которые дублируются во фронте и бэке

| Что | Бэк | Фронт |
|---|---|---|
| Группы маркеров | `back/src/variables/markerGroups.ts` (`MARKER_GROUP_NAMES`) | `front/src/components/visitor/Map/markerGroups.ts` (`MARKER_GROUPS` + title + icon) |
| Категории | коллекция `categories` | `front/src/variables/variables.ts` (`CATEGORIES`), `types/exhibitCategory.ts` |
| Цели загрузки слайдов | `back/src/utils/slides.ts` (`SLIDES_TARGETS`) | `slidesStorage.target` в формах админки |
| Имена папок статики | `back/src/variables/paths.ts` (`PATHS`) | `front/src/variables/variables.ts` (`PATHS`), `MapMarker.tsx` (`/map`) |

## Работа с данными

- Локальная БД: `DB_HOST:DB_PORT` из корневого `.env`. Смотреть данные можно read-only через `mongosh` (он установлен). Строку подключения собирать из переменных `.env`, **не печатая значения в вывод**.
- Контент (фото) живёт только в `static/` на диске, а не в git. Если добавил запись в БД, положи рядом и файлы.
- Миграций нет. Если меняется форма документов, нужен одноразовый скрипт (`mongosh --eval`), и его стоит согласовать с пользователем, потому что потом он же применяется к проду через `db:push`.
