import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_URL,
	CERAMIS_STYLES,
} = PATHS;

async function getCeramicStyles(isAdmin = false) {
	const response = await fetch(`${BASE_URL}/${CERAMIS_STYLES}/`, {
		method: 'GET',
		headers: { 'is-admin': isAdmin ? 'true' : 'false' },
	});
	return checkResponseStatus(response);
}

export const ceramicStyles = {
	getCeramicStyles,
};
