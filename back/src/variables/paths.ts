import { BASE_URL, PORT } from '../config';
import 'dotenv/config';

const { PUBLIC_URL } = process.env;

export const PATHS = Object.freeze({
	COMPLECTATION: 'complectation',
	CATEGORIES: 'categories',
	CERAMIC_STYLES: 'ceramic-styles',
	EXHIBITIONS: 'exhibitions',
	EXHIBITS: 'exhibits',
	LETTERS: 'letters',
	PARTNERS: 'partners',
	PUBLIC_PATH: `${BASE_URL}:${PORT}`,
	PUBLIC_URL,
});
