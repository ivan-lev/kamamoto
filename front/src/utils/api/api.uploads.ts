import type { UploadedSlide } from '@/components/visitor/Article/Article.types';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	UPLOADS,
} = PATHS;

async function uploadSlides(token: string, target: string, key: string, files: File[]): Promise<UploadedSlide[]> {
	const formData = new FormData();
	files.forEach(file => formData.append('files', file));

	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/slides/${target}/${encodeURIComponent(key)}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	});
	return checkResponseStatus(response);
}

export const uploads = {
	uploadSlides,
};
