import { BASE_URL, PORT } from './config';

export const ERROR_MESSAGES = {
	DEFAULT_MESSAGE: 'На сервере произошла ошибка',
	UNAUTHORIZED: 'Необходима авторизация',
	PAGE_NOT_FOUND: 'Страница не найдена',

	USER_WRONG_DATA: 'При создании пользователя переданы невалидные данные',
	USER_EXISTS: 'Пользователь с таким email уже существует',
	USER_UPDATE_ERROR: 'При обновлении профиля переданы невалидные данные',
	USER_NOT_FOUND: 'Пользователь с таким _id не найден',
	USER_WRONG_ID: 'Передан некорректный _id пользователя',
	USER_WRONG_CREDENTIALS: 'Неправильные почта или пароль',

	EXHIBIT_WRONG_DATA: 'При сохранении лота переданы невалидные данные',
	EXHIBIT_WRONG_ID: 'Передан некорректный id лота для удаления',
	EXHIBIT_NOT_FOUND: 'Лот с таким id не найден',
	EXHIBIT_EXISTS: 'Лот с таким id уже существует',

	EXHIBITION_WRONG_DATA: 'При сохранении выставки переданы невалидные данные',
	EXHIBITION_WRONG_ID: 'Передан некорректный id выставки',
	EXHIBITION_NOT_FOUND: 'Выставка с таким id не найдена',
	EXHIBITION_EXISTS: 'Выставка с таким id уже существует',

	PARTNER_WRONG_DATA: 'При сохранении партнёра переданы невалидные данные',
	PARTNER_WRONG_ID: 'Передан некорректный id партнёра',
	PARTNER_NOT_FOUND: 'Партнёр с таким id не найден',
	PARTNER_EXISTS: 'Партнёр с таким id уже существует',

	LETTER_WRONG_DATA: 'При сохранении письма переданы невалидные данные',
	LETTER_WRONG_ID: 'Передан некорректный id письма',
	LETTER_NOT_FOUND: 'Письмо с таким id не найден',
	LETTER_EXISTS: 'Письмо с таким id уже существует',

	CATEGORY_WRONG_DATA: 'При сохранении категории переданы невалидные данные',
	CATEGORY_WRONG_ID: 'Передано некорректное название категории',
	CATEGORY_NOT_FOUND: 'Категория с таким названием не найдена',
	CATEGORY_EXISTS: 'Категория с таким названием или путём уже существует',
};

export const REGEX = {
	CATEGORY_EN: /^[a-z]+$/,
	CATEGORY_RU: /^[а-я]+$/,
	IMAGE: /\w+\.(jpe?g|webp)$/i,
	URL: /(https?:\/\/)(www\.)?[\w-]+\.[a-z]{2}[\w\-.~:/?#[\]@!$&'()*+,;=]*/,
};

export const PATHS = {
	CATEGORIES: 'categories',
	EXHIBITIONS: 'exhibitions',
	EXHIBITS: 'exhibits',
	LETTERS: 'letters',
	PUBLIC_PATH: `${BASE_URL}:${PORT}`,
};
