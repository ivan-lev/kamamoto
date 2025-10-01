import type { Category } from '@/types/category';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	CATEGORIES,
} = PATHS;

async function getExhibitsByCategory(category: string) {
	const response = await fetch(`${BASE_API_URL}/${CATEGORIES}/${category}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getCategories(isAdmin = false) {
	const response = await fetch(`${BASE_API_URL}/${CATEGORIES}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

async function createCategory(token: string, category: string, title: string, thumbnail: string) {
	const response = await fetch(`${BASE_API_URL}/${CATEGORIES}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({ category, title, thumbnail }),
	});
	return checkResponseStatus(response);
}

async function updateCategory(token: string, category: Category) {
	const response = await fetch(`${BASE_API_URL}/${CATEGORIES}/${category.name}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(category),
	});
	return checkResponseStatus(response);
}

async function deleteCategory(token: string, category: string) {
	const response = await fetch(`${BASE_API_URL}/${CATEGORIES}/${category}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const categories = {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	getExhibitsByCategory,
};
