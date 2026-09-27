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

// Одна картинка записи: /static/<target>/<файл>. target должен быть разрешён на бэкенде (IMAGE_TARGETS в utils/images.ts).
// filename — желаемое имя без расширения (например, id термина); бэк транслитерирует его и не перезапишет существующий файл
async function uploadImage(token: string, target: string, file: File, filename?: string): Promise<{ filename: string, url: string }> {
	const formData = new FormData();
	formData.append('file', file, filename || file.name);

	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/images/${target}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	});
	return checkResponseStatus(response);
}

export const uploads = {
	uploadSlides,
	uploadImage,
};
