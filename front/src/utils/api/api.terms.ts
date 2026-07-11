import type { DictionarySection, Term } from '@/types/term';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	TERMS,
} = PATHS;

async function getTerms(isAdmin = false): Promise<DictionarySection[]> {
	const response = await fetch(`${BASE_API_URL}/${TERMS}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

async function createTerm(token: string, term: Term) {
	const response = await fetch(`${BASE_API_URL}/${TERMS}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(term),
	});
	return checkResponseStatus(response);
}

async function updateTerm(token: string, term: Term) {
	const response = await fetch(`${BASE_API_URL}/${TERMS}/${term.id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(term),
	});
	return checkResponseStatus(response);
}

async function deleteTerm(token: string, id: string) {
	const response = await fetch(`${BASE_API_URL}/${TERMS}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const terms = {
	getTerms,
	createTerm,
	updateTerm,
	deleteTerm,
};
