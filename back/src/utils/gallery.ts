import path from 'node:path';
import { PATHS } from '../variables/paths';

const { EXHIBITS, STATIC_DIR, STATIC_URL } = PATHS;

// Разделы с несколькими картинками в папке записи (не слайды статьи): /static/<папка раздела>/<key>[/<подпапка>].
// В БД хранятся только имена файлов, порядок задаёт массив в записи.
// Файлы при удалении из записи не стираем: в той же папке лежат тхумб и og.jpg, а на них могут ссылаться по тому же имени
export const GALLERY_TARGETS = {
	'exhibits': { folder: EXHIBITS, subfolder: '', keyRegex: /^\d{1,4}$/ },
	'exhibits-additional': { folder: EXHIBITS, subfolder: 'additional', keyRegex: /^\d{1,4}$/ },
} as const satisfies Record<string, { folder: string; subfolder: string; keyRegex: RegExp }>;

export type GalleryTarget = keyof typeof GALLERY_TARGETS;

export function isGalleryTarget(target: string): target is GalleryTarget {
	return Object.hasOwn(GALLERY_TARGETS, target);
}

export function isValidGalleryKey(target: GalleryTarget, key: string) {
	return GALLERY_TARGETS[target].keyRegex.test(key);
}

export function getGalleryFolder(target: GalleryTarget, key: string) {
	const { folder, subfolder } = GALLERY_TARGETS[target];
	const relativeFolder = [folder, key, subfolder].filter(Boolean).join('/');
	return { dir: path.join(STATIC_DIR, relativeFolder), url: `${STATIC_URL}/${relativeFolder}` };
}
