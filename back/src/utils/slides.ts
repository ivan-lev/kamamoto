import type { ArticleSection } from '../types/article';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PATHS } from '../variables/paths';

const { CERAMIC_STYLES, POTTERS, STATIC_DIR, STATIC_URL } = PATHS;

// Разделы, в статьи которых можно загружать слайды.
// Слайды лежат в /static/<папка раздела>/<key>/slides, где key — name стиля, id гончара и т.д.
// Чтобы подключить загрузку к новому разделу, достаточно добавить его сюда
// и вызывать removeUnusedSlides при сохранении статьи
export const SLIDES_TARGETS = {
	'ceramic-styles': CERAMIC_STYLES,
	'potters': POTTERS,
} as const satisfies Record<string, string>;

export type SlidesTarget = keyof typeof SLIDES_TARGETS;

const KEY_REGEX = /^[\w-]+$/;

export function isSlidesTarget(target: string): target is SlidesTarget {
	return Object.hasOwn(SLIDES_TARGETS, target);
}

export function isValidSlidesKey(key: string) {
	return KEY_REGEX.test(key);
}

export function getSlidesFolder(target: SlidesTarget, key: string) {
	const targetFolder = SLIDES_TARGETS[target];
	return { dir: path.join(STATIC_DIR, targetFolder, key, 'slides'), url: `${STATIC_URL}/${targetFolder}/${key}/slides` };
}

// Только локальные файлы: внешние ссылки и пути с подпапками не трогаем
function getLocalFilenames(article: ArticleSection[] = []) {
	return new Set(article
		.flatMap(section => section.slides ?? [])
		.map(slide => slide.filename?.trim())
		.filter(filename => filename && !filename.startsWith('http') && path.basename(filename) === filename));
}

// Удаляет с диска слайды, которые были в статье до сохранения и пропали после.
// Остальные файлы в папке не трогаем: там могут лежать нужные файлы, не добавленные в статью.
// Ошибки только логируем: статья уже сохранена, и из-за неудалённого файла запрос падать не должен
export async function removeUnusedSlides(target: SlidesTarget, key: string, previousArticle?: ArticleSection[], nextArticle?: ArticleSection[]) {
	if (!isValidSlidesKey(key))
		return;

	const { dir } = getSlidesFolder(target, key);
	const usedFilenames = getLocalFilenames(nextArticle);
	const removedFilenames = [...getLocalFilenames(previousArticle)].filter(filename => !usedFilenames.has(filename));

	await Promise.all(removedFilenames.map(async (filename) => {
		try {
			await fs.unlink(path.join(dir, filename));
		}
		catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
				console.error(`Не удалось удалить слайд ${dir}/${filename}`, error);
		}
	}));
}
