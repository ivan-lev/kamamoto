import type { SearchResponse } from '@/types/search';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

async function search(query: string, limit = 20, signal?: AbortSignal): Promise<SearchResponse> {
	const url = `${PATHS.BASE_API_URL}/search/?q=${encodeURIComponent(query)}&limit=${limit}`;
	const response = await fetch(url, { method: 'GET', signal });
	return checkResponseStatus<SearchResponse>(response);
}

export const searchApi = { search };
