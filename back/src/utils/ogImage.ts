import fs from 'node:fs/promises';
import path from 'node:path';
import { PATHS } from '../variables/paths';

const { DEFAULT_OG_IMAGE, SITE_URL, STATIC_DIR, STATIC_URL } = PATHS;

const OG_FILENAME = 'og.jpg';

// Картинка для превью страницы в соцсетях: og.jpg из папки записи в static/, иначе общая картинка сайта.
// Отдельный jpg, потому что webp понимают не все соцсети и мессенджеры.
// Пример: getOgImage(EXHIBITS, String(exhibit.id)) → static/exhibits/<id>/og.jpg
export async function getOgImage(...folder: string[]) {
	const relativePath = path.posix.join(...folder, OG_FILENAME);
	const filePath = path.join(STATIC_DIR, relativePath);

	// сегменты пути могут прийти из URL: не даём выйти за пределы static/
	if (!filePath.startsWith(`${STATIC_DIR}${path.sep}`))
		return DEFAULT_OG_IMAGE;

	try {
		const { mtimeMs } = await fs.stat(filePath);
		// версия в адресе: статика кэшируется на год, а соцсети кешируют превью по URL,
		// поэтому заменённый og.jpg иначе не подхватится
		return new URL(`${STATIC_URL}/${relativePath}?v=${Math.round(mtimeMs)}`, SITE_URL).href;
	}
	catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
			console.error(`Не удалось прочитать ${filePath}`, error);

		return DEFAULT_OG_IMAGE;
	}
}
