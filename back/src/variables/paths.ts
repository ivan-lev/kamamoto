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
	TERMS: 'terms',
	// public folder on disk, lives outside back/ so deploys never wipe it
	STATIC_DIR: path.resolve(__dirname, '../../../static'),
	STATIC_URL: NODE_ENV === 'production' ? `/${STATIC_URL}` : `${BASE_URL}:${PORT}/${STATIC_URL}`,
});
