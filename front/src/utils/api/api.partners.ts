import type { Partner } from '@/types/partnerType';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	PARTNERS,
} = PATHS;

// с токеном — все партнёры с сырым именем логотипа (админка), без — только активные с URL (сайт)
async function getPartners(token?: string) {
	const response = await fetch(`${BASE_API_URL}/${PARTNERS}/`, {
		method: 'GET',
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
	return checkResponseStatus(response);
}

async function createPartner(token: string, title: string, link: string, logo: string, isActive: boolean) {
	const response = await fetch(`${BASE_API_URL}/${PARTNERS}/`, {
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
	const response = await fetch(`${BASE_API_URL}/${PARTNERS}/${partner._id}`, {
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
	const response = await fetch(`${BASE_API_URL}/${PARTNERS}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const partners = {
	getPartners,
	createPartner,
	updatePartner,
	deletePartner,
};
