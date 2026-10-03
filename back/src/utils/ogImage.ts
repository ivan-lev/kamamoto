import fs from 'node:fs/promises';
import path from 'node:path';
import { PATHS } from '../variables/paths';

const { CERAMIC_STYLES, DEFAULT_OG_IMAGE, SITE_URL, STATIC_DIR, STATIC_URL } = PATHS;

// jpg первым: webp понимают не все соцсети и мессенджеры, поэтому он только запасной вариант
export const OG_FILENAMES = ['og.jpg', 'og.webp'];

// Разделы, в которые og-картинку можно загрузить из админки: static/<папка раздела>/<key>/og.<jpg|webp>
export const OG_TARGETS = {
	'ceramic-styles': CERAMIC_STYLES,
} as const satisfies Record<string, string>;

export type OgTarget = keyof typeof OG_TARGETS;

export function isOgTarget(target: string): target is OgTarget {
	return Object.hasOwn(OG_TARGETS, target);
}

export function getOgFolder(target: OgTarget, key: string) {
	const folder = `${OG_TARGETS[target]}/${key}`;
	return { dir: path.join(STATIC_DIR, folder), url: `${STATIC_URL}/${folder}` };
}

// Первая найденная og-картинка в папке, вместе с версией для адреса.
// Версия нужна, потому что статика кэшируется на год, а соцсети кешируют превью по URL:
// иначе заменённый og.jpg не подхватится
export async function findOgFile(dir: string) {
	for (const filename of OG_FILENAMES) {
		const filePath = path.join(dir, filename);
		try {
			const { mtimeMs } = await fs.stat(filePath);
			return { filename, version: Math.round(mtimeMs) };
		}
		catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
				console.error(`Не удалось прочитать ${filePath}`, error);
		}
	}
	return null;
}

// Удаляет og-картинки папки, кроме keep: в папке должна остаться одна, иначе jpg заслонит новый webp
export async function removeOgFiles(dir: string, keep?: string) {
	await Promise.all(OG_FILENAMES.filter(filename => filename !== keep).map(async (filename) => {
		try {
			await fs.unlink(path.join(dir, filename));
		}
		catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
				console.error(`Не удалось удалить ${dir}/${filename}`, error);
		}
	}));
}

// Картинка для превью страницы в соцсетях: og.jpg (или og.webp) из папки записи в static/, иначе общая картинка сайта.
// Пример: getOgImage(EXHIBITS, String(exhibit.id)) → static/exhibits/<id>/og.jpg
export async function getOgImage(...folder: string[]) {
	const relativeDir = path.posix.join(...folder);
	const dir = path.join(STATIC_DIR, relativeDir);

	// сегменты пути могут прийти из URL: не даём выйти за пределы static/
	if (!dir.startsWith(`${STATIC_DIR}${path.sep}`))
		return DEFAULT_OG_IMAGE;

	const ogFile = await findOgFile(dir);
	if (!ogFile)
		return DEFAULT_OG_IMAGE;

	return new URL(`${STATIC_URL}/${relativeDir}/${ogFile.filename}?v=${ogFile.version}`, SITE_URL).href;
}
