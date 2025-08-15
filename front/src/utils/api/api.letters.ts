import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '@/variables/variables';

const { BASE_API_URL, LETTERS } = PATHS;

async function getLetters() {
	const response = await fetch(`${BASE_API_URL}/${LETTERS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

export const letters = {
	getLetters,
};
