import type { Complectation } from '@/types/compleactation';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '@/variables/variables';

const { BASE_API_URL, COMPLECTATION } = PATHS;

async function getComplections(): Promise<Complectation[]> {
	const response = await fetch(`${BASE_API_URL}/${COMPLECTATION}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function createComplectation(token: string, complectation: Complectation) {
	const response = await fetch(`${BASE_API_URL}/${COMPLECTATION}/`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(complectation),
	});
	return checkResponseStatus(response);
}

async function updateComplectation(token: string, complectation: Complectation) {
	const response = await fetch(`${BASE_API_URL}/${COMPLECTATION}/${complectation.name}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(complectation),
	});
	return checkResponseStatus(response);
}

async function deleteComplectation(token: string, complectationName: string) {
	const response = await fetch(`${BASE_API_URL}/${COMPLECTATION}/${complectationName}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const complectation = {
	getComplections,
	createComplectation,
	updateComplectation,
	deleteComplectation,
};
