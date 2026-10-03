import type { NextFunction, Request, Response } from 'express';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Potter from '../models/potter';
import Style from '../models/style';
import { PATHS } from '../variables/paths';
import { LISTING_PAGES, STATIC_PAGES } from '../variables/staticPages';

const { SITE_URL } = PATHS;

// Новые записи появятся в sitemap с задержкой до часа — поисковикам это неважно, а БД не нагружается частыми запросами
const CACHE_TTL = 60 * 60 * 1000;

// Кэшируется промис, а не строка: одновременные запросы при пустом кэше ждут одну сборку, а не запускают каждый свою
let cache: { xml: Promise<string>; expiresAt: number } | undefined;

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/'/g, '&apos;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

// В sitemap попадают только страницы, на которые есть ссылки на сайте, по тем же условиям, что и в API списков.
// Адреса — в том виде, в каком их оставляет Caddy (со слэшем или без), иначе поисковик получит редирект.
// lastmod не пишем: в схемах нет timestamps, а одинаковая фиктивная дата хуже отсутствующей
async function buildSitemap() {
	const [categories, exhibits, exhibitions, styles, potters] = await Promise.all([
		Category.find({}, 'name').lean(),
		Exhibit.find({ isActive: true }, '-_id id category').sort({ id: 1 }).lean(),
		Exhibition.find({ isActive: true }, '-_id id').sort({ id: 1 }).lean(),
		Style.find({ showArticle: true }, '-_id name').lean(),
		Potter.find({ showArticle: true, isLNT: true }, '-_id id').lean(),
	]);

	const categoryNames = new Map(categories.map(category => [String(category._id), category.name]));

	const staticPaths = Object.keys(STATIC_PAGES).map(key => (LISTING_PAGES.has(key) ? `/${key}/` : `/${key}`));
	const exhibitPaths = exhibits.flatMap((exhibit) => {
		// лот без существующей категории открыть по ссылке нельзя
		const categoryName = categoryNames.get(String(exhibit.category));
		return categoryName ? [`/collection/${categoryName}/${exhibit.id}`] : [];
	});

	const paths = [
		'/',
		...staticPaths,
		...categories.map(category => `/collection/${category.name}/`),
		...exhibitPaths,
		...exhibitions.map(exhibition => `/exhibitions/${exhibition.id}`),
		...styles.map(style => `/ceramic-styles/${style.name}`),
		...potters.map(potter => `/lnt-potters/${potter.id}`),
	];

	const urls = paths.map(path => `\t<url><loc>${escapeXml(encodeURI(`${SITE_URL}${path}`))}</loc></url>`);
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...urls,
		'</urlset>',
		'',
	].join('\n');
}

async function getSitemap(req: Request, res: Response, next: NextFunction) {
	if (!cache || cache.expiresAt < Date.now()) {
		const xml = buildSitemap();
		cache = { xml, expiresAt: Date.now() + CACHE_TTL };
		// ошибку БД не кэшируем на час: следующий запрос попробует собрать sitemap заново.
		// Сравнение — чтобы поздно упавшая старая сборка не сбросила уже новый кэш
		xml.catch(() => {
			if (cache?.xml === xml)
				cache = undefined;
		});
	}

	const { xml } = cache;

	try {
		res.type('application/xml').send(await xml);
	}
	catch (error) { return next(error); }
}

export const sitemap = { getSitemap };
