import type { Partner } from '@/types/partnerType';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_URL,
	PARTNERS,
} = PATHS;

async function getPartners() {
	const response = await fetch(`${BASE_URL}/${PARTNERS}/`, {
		method: 'GET',
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

export const partners = {
	getPartners,
	createPartner,
	updatePartner,
	deletePartner,
};
