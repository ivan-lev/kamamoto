import type { Exhibition } from '@/types/exhibitionType';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	EXHIBITIONS,
} = PATHS;

// с токеном — все выставки с сырыми именами файлов (админка), без — только активные с URL (сайт)
async function getExhibitions(token?: string) {
	const response = await fetch(`${BASE_API_URL}/${EXHIBITIONS}/`, {
		method: 'GET',
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
	return checkResponseStatus(response);
}

async function getExhibitionById(id: string) {
	const response = await fetch(`${BASE_API_URL}/${EXHIBITIONS}/${id}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function createExhibition(token: string, exhibition: Exhibition) {
	const response = await fetch(`${BASE_API_URL}/${EXHIBITIONS}/`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(exhibition),
	});
	return checkResponseStatus(response);
}

async function updateExhibition(token: string, exhibition: Exhibition) {
	const response = await fetch(`${BASE_API_URL}/${EXHIBITIONS}/${exhibition.id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(exhibition),
	});
	return checkResponseStatus(response);
}

async function deleteExhibition(token: string, exhibition: Exhibition) {
	const response = await fetch(`${BASE_API_URL}/${EXHIBITIONS}/${exhibition.id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const exhibitions = {
	getExhibitions,
	getExhibitionById,
	createExhibition,
	updateExhibition,
	deleteExhibition,
};
