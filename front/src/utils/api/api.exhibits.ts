import type { Exhibit } from '@/types/exhibitType';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '@/variables/variables';

const { BASE_URL, EXHIBITS } = PATHS;

async function getExhibits(): Promise<Exhibit[]> {
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getExhibitById(id: string) {
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/${id}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function createExhibit(token: string, exhibit: Exhibit) {
	const exhibitCategoryHexId = exhibit.category?._id;
	const exhibitStyleName = exhibit.style?.name;
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...exhibit, category: exhibitCategoryHexId, style: exhibitStyleName }),
	});
	return checkResponseStatus(response);
}

async function updateExhibit(token: string, exhibit: Exhibit) {
	const exhibitCategoryHexId = exhibit.category?._id;
	const exhibitStyleName = exhibit.style?.name;
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/${exhibit.id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...exhibit, category: exhibitCategoryHexId, style: exhibitStyleName }),
	});
	return checkResponseStatus(response);
}

async function deleteExhibit(token: string, id: number) {
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const exhibits = {
	getExhibitById,
	getExhibits,
	createExhibit,
	updateExhibit,
	deleteExhibit,
};
