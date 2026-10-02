import path from 'node:path';
import { BASE_URL, NODE_ENV, PORT, STATIC_URL } from '../config';
import 'dotenv/config';

export const PATHS = Object.freeze({
	COMPLECTATION: 'complectation',
	CATEGORIES: 'categories',
	CERAMIC_STYLES: 'ceramic-styles',
	DICTIONARY: 'dictionary',
	EXHIBITIONS: 'exhibitions',
	EXHIBITS: 'exhibits',
	FEATURES: 'features',
	LETTERS: 'letters',
	MAPS: 'maps',
	PARTNERS: 'partners',
	POTTERS: 'potters',
	LNT_POTTERS: 'lnt-potters',
	PAGES: 'pages', // og.jpg страниц без записи в БД: static/pages/<страница>/og.jpg
	TERMS: 'terms',
	// public folder on disk, lives outside back/ so deploys never wipe it
	STATIC_DIR: path.resolve(__dirname, '../../../static'),
	STATIC_URL: NODE_ENV === 'production' ? `/${STATIC_URL}` : `${BASE_URL}:${PORT}/${STATIC_URL}`,
	// собранный фронт: в Docker это volume front_build, локально — front/dist после `npm run build`
	FRONT_INDEX: NODE_ENV === 'production' ? '/srv/front/index.html' : path.resolve(__dirname, '../../../front/dist/index.html'),
	SITE_URL: 'https://kamamoto.ru',
	// общая картинка превью, лежит во front/public/images
	DEFAULT_OG_IMAGE: 'https://kamamoto.ru/images/og-image.jpg',
});
