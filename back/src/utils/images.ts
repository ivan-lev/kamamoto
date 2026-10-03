import fs from 'node:fs/promises';
import path from 'node:path';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';
import { isValidSlidesKey } from './slides';

const { CERAMIC_STYLES, DICTIONARY, STATIC_DIR, STATIC_URL } = PATHS;

// Разделы с одиночными картинками записи (не слайды статьи). Файл лежит в /static/<папка раздела>/<файл>,
// а если у раздела hasKey — в папке записи /static/<папка раздела>/<key>/<файл> (key — name стиля и т.п.).
// Форматы ограничены тем, что пропускает валидатор сущности: иначе загруженный файл нельзя будет сохранить
export const IMAGE_TARGETS = {
	'dictionary': {
		folder: DICTIONARY,
		hasKey: false,
		mimeRegex: /^image\/(?:jpeg|webp)$/,
		wrongTypeMessage: ERROR_MESSAGES.UPLOAD.WRONG_TYPE_JPG_WEBP,
	},
	// thumbnail — jpg или webp, mapImage — svg; какой формат в какое поле, проверяет ceramicStyleValidator
	'ceramic-styles': {
		folder: CERAMIC_STYLES,
		hasKey: true,
		mimeRegex: /^image\/(?:jpeg|webp|svg\+xml)$/,
		wrongTypeMessage: ERROR_MESSAGES.UPLOAD.WRONG_TYPE_JPG_WEBP_SVG,
	},
} as const satisfies Record<string, { folder: string; hasKey: boolean; mimeRegex: RegExp; wrongTypeMessage: string }>;

export type ImageTarget = keyof typeof IMAGE_TARGETS;

export function isImageTarget(target: string): target is ImageTarget {
	return Object.hasOwn(IMAGE_TARGETS, target);
}

// Ключ нужен ровно тем разделам, у которых hasKey, и должен быть безопасным именем папки
export function isValidImageKey(target: ImageTarget, key?: string) {
	return IMAGE_TARGETS[target].hasKey ? key !== undefined && isValidSlidesKey(key) : key === undefined;
}

export function getImageFolder(target: ImageTarget, key?: string) {
	const folder = key ? `${IMAGE_TARGETS[target].folder}/${key}` : IMAGE_TARGETS[target].folder;
	return { dir: path.join(STATIC_DIR, folder), url: `${STATIC_URL}/${folder}` };
}

// Удаляет картинку, которую заменили или убрали при сохранении.
// Ошибки только логируем: запись уже сохранена, и из-за неудалённого файла запрос падать не должен
export async function removeImage(target: ImageTarget, filename: string, key?: string) {
	// только имя файла: путь с подпапками может указать за пределы папки раздела
	if (!filename || path.basename(filename) !== filename || !isValidImageKey(target, key))
		return;

	const { dir } = getImageFolder(target, key);

	try {
		await fs.unlink(path.join(dir, filename));
	}
	catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
			console.error(`Не удалось удалить картинку ${dir}/${filename}`, error);
	}
}
