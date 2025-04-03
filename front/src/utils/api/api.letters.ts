import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '@/variables/variables';

const { BASE_URL, LETTERS } = PATHS;

async function getLetters() {
	const response = await fetch(`${BASE_URL}/${LETTERS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

export const letters = {
	getLetters,
};
