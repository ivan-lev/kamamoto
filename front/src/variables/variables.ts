const mode = import.meta.env.MODE;

export const PATHS = Object.freeze({
	BASE_API_URL: mode === 'production' ? '/api' : import.meta.env.VITE_BASE_API_DEV_URL,
	STATIC_URL: mode === 'production' ? '/static' : 'http://localhost:3000/static/',

	ARTICLES: 'articles',
	CATEGORIES: 'categories',
	CERAMIC_STYLES: 'ceramic-styles',
	COLLECTION: 'collection',
	COMPLECTATION: 'complectation',
	EXHIBIT: 'exhibits',
	EXHIBITS: 'exhibits',
	EXHIBITIONS: 'exhibitions',
	IMAGES: 'images',
	LETTERS: 'letters',
	PARTNERS: 'partners',
	POTTERS: 'potters',
	SIGNIN: 'signin',
	STATISTICS: 'statistics',
	USEFUL: 'useful',
	USERS: 'users',
});

export const homepageSliderImages = [
	'images/homepage-slider/01.webp',
	'images/homepage-slider/02.webp',
	'images/homepage-slider/03.webp',
	'images/homepage-slider/04.webp',
	'images/homepage-slider/05.webp',
	'images/homepage-slider/06.webp',
	'images/homepage-slider/07.webp',
	'images/homepage-slider/08.webp',
	'images/homepage-slider/09.webp',
	'images/homepage-slider/10.webp',
];

export const CATEGORIES: { [key: string]: string } = {
	bowls: 'Чаши',
	caddies: 'Чайницы',
	cups: 'Пиалы',
	other: 'Другое',
	plates: 'Тарелки',
	teapots: 'Чайники',
	vases: 'Вазы',
	archive: 'Архив',
};

export const LOGIN_MESSAGES = Object.freeze({
	WRONG_CREDEINTIALS: 'Неправильный email или пароль.',
	LOGIN_ERROR: 'Ошибка логина...',
	TOKEN_ERROR: 'Ошибка проверки токена.',
	WRONG_EMAIL_FORMAT: 'Неправильный формат email-адреса',
});

export const DESCRIPTION_DUMMY = '<p>Описание в процессе подготовки</p>';

export const SITE_VERSION = '2.1.1yd';
