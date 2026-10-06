import type { Statistics } from '@/types/statistics';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	STATISTICS,
} = PATHS;

async function getStatistics(): Promise<Statistics> {
	const response = await fetch(`${BASE_API_URL}/${STATISTICS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

export const statistics = {
	getStatistics,
};
