const mode = import.meta.env.MODE;

export const PATHS = Object.freeze({
	BASE_API_URL: mode === 'production' ? '/api' : import.meta.env.VITE_BASE_API_DEV_URL,
	CATEGORIES: 'categories',
	CERAMIC_STYLES: 'ceramic-styles',
	COMPLECTATION: 'complectation',
	EXHIBIT: 'exhibits',
	EXHIBITS: 'exhibits',
	EXHIBITIONS: 'exhibitions',
	IMAGES: 'images',
	LETTERS: 'letters',
	PARTNERS: 'partners',
	SIGNIN: 'signin',
	STATISTICS: 'statistics',
	USERS: 'users',
});

export const homepageSliderImages = [
	'images/homepage-slider/0.jpg',
	'images/homepage-slider/1.jpg',
	'images/homepage-slider/2.jpg',
	'images/homepage-slider/3.jpg',
	'images/homepage-slider/4.jpg',
	'images/homepage-slider/5.jpg',
	'images/homepage-slider/6.jpg',
	'images/homepage-slider/7.jpg',
	'images/homepage-slider/8.jpg',
];

export const LOGIN_MESSAGES = Object.freeze({
	WRONG_CREDEINTIALS: 'Неправильный email или пароль.',
	LOGIN_ERROR: 'Ошибка логина...',
	TOKEN_ERROR: 'Ошибка проверки токена.',
	WRONG_EMAIL_FORMAT: 'Неправильный формат email-адреса',
});

export const SITE_VERSION = '1.8.7';
