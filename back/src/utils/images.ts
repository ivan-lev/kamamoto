import fs from 'node:fs/promises';
import path from 'node:path';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { DICTIONARY, STATIC_DIR, STATIC_URL } = PATHS;

// Разделы с одной картинкой на запись (не слайды статьи): файл лежит в /static/<папка раздела>/<файл>.
// Форматы ограничены тем, что пропускает валидатор сущности: иначе загруженный файл нельзя будет сохранить
export const IMAGE_TARGETS = {
	dictionary: {
		folder: DICTIONARY,
		mimeRegex: /^image\/(?:jpeg|webp)$/,
		wrongTypeMessage: ERROR_MESSAGES.UPLOAD.WRONG_TYPE_JPG_WEBP,
	},
} as const satisfies Record<string, { folder: string; mimeRegex: RegExp; wrongTypeMessage: string }>;

export type ImageTarget = keyof typeof IMAGE_TARGETS;

export function isImageTarget(target: string): target is ImageTarget {
	return Object.hasOwn(IMAGE_TARGETS, target);
}

export function getImageFolder(target: ImageTarget) {
	const { folder } = IMAGE_TARGETS[target];
	return { dir: path.join(STATIC_DIR, folder), url: `${STATIC_URL}/${folder}` };
}

// Удаляет картинку, которую заменили или убрали при сохранении.
// Ошибки только логируем: запись уже сохранена, и из-за неудалённого файла запрос падать не должен
export async function removeImage(target: ImageTarget, filename: string) {
	// только имя файла: путь с подпапками может указать за пределы папки раздела
	if (!filename || path.basename(filename) !== filename)
		return;

	const { dir } = getImageFolder(target);

	try {
		await fs.unlink(path.join(dir, filename));
	}
	catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
			console.error(`Не удалось удалить картинку ${dir}/${filename}`, error);
	}
}
