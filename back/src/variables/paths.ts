import { BASE_URL, NODE_ENV, PORT, STATIC_URL } from '../config';
import 'dotenv/config';

export const PATHS = Object.freeze({
	COMPLECTATION: 'complectation',
	CATEGORIES: 'categories',
	CERAMIC_STYLES: 'ceramic-styles',
	EXHIBITIONS: 'exhibitions',
	EXHIBITS: 'exhibits',
	LETTERS: 'letters',
	PARTNERS: 'partners',
	STATIC_URL: NODE_ENV === 'production' ? STATIC_URL : `${BASE_URL}:${PORT}/static`,
});
