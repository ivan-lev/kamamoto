import type { Meibutsu, MeibutsuPreview } from '@/types/meibutsu';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	MEIBUTSU,
} = PATHS;

// Список для админки: сырые имена файлов, включая неопубликованные
async function getMeibutsu(): Promise<Meibutsu[]> {
	const response = await fetch(`${BASE_API_URL}/${MEIBUTSU}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getMeibutsuArticles(): Promise<MeibutsuPreview[]> {
	const response = await fetch(`${BASE_API_URL}/${MEIBUTSU}/articles`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getMeibutsuArticle(id: string): Promise<Meibutsu> {
	const response = await fetch(`${BASE_API_URL}/${MEIBUTSU}/${id}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function createMeibutsu(token: string, meibutsu: Meibutsu): Promise<Meibutsu> {
	const response = await fetch(`${BASE_API_URL}/${MEIBUTSU}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(meibutsu),
	});
	return checkResponseStatus(response);
}

async function updateMeibutsu(token: string, meibutsu: Meibutsu, initialId: string): Promise<Meibutsu> {
	const response = await fetch(`${BASE_API_URL}/${MEIBUTSU}/${initialId}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(meibutsu),
	});
	return checkResponseStatus(response);
}

async function deleteMeibutsu(token: string, id: string): Promise<Meibutsu> {
	const response = await fetch(`${BASE_API_URL}/${MEIBUTSU}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	});
	return checkResponseStatus(response);
}

export const meibutsu = {
	getMeibutsu,
	getMeibutsuArticles,
	getMeibutsuArticle,
	createMeibutsu,
	updateMeibutsu,
	deleteMeibutsu,
};
