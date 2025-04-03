import type { Exhibit } from '@/types/exhibitType';
import type { Category } from '../../types/category';
import type { Exhibition } from '../../types/exhibitionType';
import type { Partner } from '../../types/partnerType';

import { auth } from '@/utils/api/api.auth';
import { checkResponseStatus } from '@/utils/api/api.common';
import { exhibit } from '@/utils/api/api.exhibit';

import { PATHS } from '../../variables/variables';

const { BASE_URL, CATEGORIES, EXHIBITIONS, EXHIBITS, LETTERS, PARTNERS, SIGNIN, STATISTICS, USERS } = PATHS;

// Authorization logic

async function authorize(email: string, password: string) {
	const response = await fetch(`${BASE_URL}/${SIGNIN}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	return checkResponseStatus(response);
}

async function checkToken(token: string) {
	const response = await fetch(`${BASE_URL}/${USERS}/`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

// Get requests

async function getExhibitById(id: string) {
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/${id}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getExhibits() {
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getExhibitsByCategory(category: string) {
	const response = await fetch(`${BASE_URL}/${CATEGORIES}/${category}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getExhibitions() {
	const response = await fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getExhibitionById(id: string) {
	const response = await fetch(`${BASE_URL}/${EXHIBITIONS}/${id}`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getStatistics() {
	const response = await fetch(`${BASE_URL}/${STATISTICS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getPartners() {
	const response = await fetch(`${BASE_URL}/${PARTNERS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getCategories(isAdmin = false) {
	const response = await fetch(`${BASE_URL}/${CATEGORIES}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

async function getLetters() {
	const response = await fetch(`${BASE_URL}/${LETTERS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

// Admin requests

async function updateExhibit(token: string, exhibit: Exhibit) {
	const response = await fetch(`${BASE_URL}/${EXHIBITS}/${exhibit.id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(exhibit),
	});
	return checkResponseStatus(response);
}

async function createExhibition(token: string, exhibition: Exhibition) {
	const response = await fetch(`${BASE_URL}/${EXHIBITIONS}/`, {
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
	const response = await fetch(`${BASE_URL}/${EXHIBITIONS}/${exhibition.id}`, {
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
	const response = await fetch(`${BASE_URL}/${EXHIBITIONS}/${exhibition.id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

async function createPartner(token: string, title: string, link: string, logo: string, isActive: boolean) {
	const response = await fetch(`${BASE_URL}/${PARTNERS}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({ title, link, logo, isActive }),
	});
	return checkResponseStatus(response);
}

async function updatePartner(token: string, partner: Partner) {
	const response = await fetch(`${BASE_URL}/${PARTNERS}/${partner._id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(partner),
	});
	return checkResponseStatus(response);
}

async function deletePartner(token: string, id: string) {
	const response = await fetch(`${BASE_URL}/${PARTNERS}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

async function createCategory(token: string, category: string, title: string, thumbnail: string) {
	const response = await fetch(`${BASE_URL}/${CATEGORIES}/`, {
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
	const response = await fetch(`${BASE_URL}/${CATEGORIES}/${category.category}`, {
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
	const response = await fetch(`${BASE_URL}/${CATEGORIES}/${category}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const api = {
	getExhibitById,
	getExhibits,
	getExhibitsByCategory,
	updateExhibit,
	//
	getExhibitions,
	getExhibitionById,
	createExhibition,
	updateExhibition,
	deleteExhibition,
	//
	getLetters,
	//
	checkToken,
	authorize,
	getStatistics,
	//
	getPartners,
	createPartner,
	updatePartner,
	deletePartner,
	//
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	//
	auth,
	exhibit,
};
