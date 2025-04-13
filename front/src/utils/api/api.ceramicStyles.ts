import type { CeramicStyle } from '@/types/ceramicStyles';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_URL,
	CERAMIS_STYLES,
} = PATHS;

async function getCeramicStyles(isAdmin = false) {
	const response = await fetch(`${BASE_URL}/${CERAMIS_STYLES}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

async function createCeramicStyle(token: string, ceramicStyle: CeramicStyle) {
	const response = await fetch(`${BASE_URL}/${CERAMIS_STYLES}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(ceramicStyle),
	});
	return checkResponseStatus(response);
}

async function updateCeramicStyle(token: string, style: CeramicStyle) {
	const response = await fetch(`${BASE_URL}/${CERAMIS_STYLES}/${style.name}`, {
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
	const response = await fetch(`${BASE_URL}/${CERAMIS_STYLES}/${name}`, {
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
	createCeramicStyle,
	updateCeramicStyle,
	deleteCeramicStyle,
};
