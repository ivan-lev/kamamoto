import type { CeramicStyle } from '@/types/ceramicStyles';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	CERAMIC_STYLES,
	ARTICLES,
} = PATHS;

async function getCeramicStyles(isAdmin = false) {
	const response = await fetch(`${BASE_API_URL}/${CERAMIC_STYLES}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

async function getCeramicStylesArticles() {
	const response = await fetch(`${BASE_API_URL}/${CERAMIC_STYLES}/${ARTICLES}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getCeramicStylesArticle(style: string) {
	const response = await fetch(`${BASE_API_URL}/${CERAMIC_STYLES}/${style}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function createCeramicStyle(token: string, ceramicStyle: CeramicStyle) {
	const response = await fetch(`${BASE_API_URL}/${CERAMIC_STYLES}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(ceramicStyle),
	});
	return checkResponseStatus(response);
}

async function updateCeramicStyle(token: string, style: CeramicStyle, initialName: string) {
	const response = await fetch(`${BASE_API_URL}/${CERAMIC_STYLES}/${initialName}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(style),
	});
	return checkResponseStatus(response);
}

async function deleteCeramicStyle(token: string, name: string) {
	const response = await fetch(`${BASE_API_URL}/${CERAMIC_STYLES}/${name}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const ceramicStyles = {
	getCeramicStyles,
	getCeramicStylesArticles,
	getCeramicStylesArticle,
	createCeramicStyle,
	updateCeramicStyle,
	deleteCeramicStyle,
};
