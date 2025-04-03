import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const { BASE_URL, SIGNIN, USERS } = PATHS;

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

export const auth = {
	checkToken,
	authorize,
};
