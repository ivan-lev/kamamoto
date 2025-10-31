import type { Potter } from '@/types/potter';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	POTTERS,
} = PATHS;

async function getPotters(isAdmin = false) {
	const response = await fetch(`${BASE_API_URL}/${POTTERS}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

async function createPotter(token: string, potter: Potter) {
	const response = await fetch(`${BASE_API_URL}/${POTTERS}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(potter),
	});
	return checkResponseStatus(response);
}

async function updatePotter(token: string, potter: Potter) {
	const response = await fetch(`${BASE_API_URL}/${POTTERS}/${potter.id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(potter),
	});
	return checkResponseStatus(response);
}

async function deletePotter(token: string, id: string) {
	const response = await fetch(`${BASE_API_URL}/${POTTERS}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const potters = {
	getPotters,
	createPotter,
	updatePotter,
	deletePotter,
};
