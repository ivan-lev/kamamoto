import type { UploadedSlide } from '@/components/visitor/Article/Article.types';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	UPLOADS,
} = PATHS;

export interface UploadedImage {
	filename: string;
	url: string;
}

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

// Несколько картинок в папку записи (фото лота): /static/<папка раздела>/<key>[/<подпапка>].
// target задаёт бэкенд (GALLERY_TARGETS в utils/gallery.ts), имена файлов в ответе уже уникальны в папке
async function uploadGallery(token: string, target: string, key: string, files: File[]): Promise<UploadedImage[]> {
	const formData = new FormData();
	files.forEach(file => formData.append('files', file));

	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/gallery/${target}/${encodeURIComponent(key)}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	});
	return checkResponseStatus(response);
}

// Одна картинка записи: /static/<target>/<файл> или /static/<target>/<key>/<файл>.
// target и нужен ли ему key, задаёт бэкенд (IMAGE_TARGETS в utils/images.ts).
// filename — желаемое имя без расширения (например, id термина); бэк транслитерирует его и не перезапишет существующий файл
async function uploadImage(token: string, target: string, file: File, { filename, key }: { filename?: string, key?: string } = {}): Promise<UploadedImage> {
	const formData = new FormData();
	formData.append('file', file, filename || file.name);

	const keyPath = key ? `/${encodeURIComponent(key)}` : '';
	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/images/${target}${keyPath}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	});
	return checkResponseStatus(response);
}

// og-картинка записи: /static/<target>/<key>/og.jpg или og.webp. В записи не хранится, бэк находит её по имени файла.
// url уже с версией ?v=<mtime>, так что после замены превью не берётся из кэша
async function getOgImage(target: string, key: string): Promise<UploadedImage | null> {
	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/og/${target}/${encodeURIComponent(key)}`);
	return checkResponseStatus(response);
}

// Заменяет og-картинку записи, файл другого формата бэк удаляет
async function uploadOgImage(token: string, target: string, key: string, file: File): Promise<UploadedImage> {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/og/${target}/${encodeURIComponent(key)}`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	});
	return checkResponseStatus(response);
}

async function deleteOgImage(token: string, target: string, key: string): Promise<null> {
	const response = await fetch(`${BASE_API_URL}/${UPLOADS}/og/${target}/${encodeURIComponent(key)}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
	});
	return checkResponseStatus(response);
}

export const uploads = {
	uploadSlides,
	uploadGallery,
	uploadImage,
	getOgImage,
	uploadOgImage,
	deleteOgImage,
};
