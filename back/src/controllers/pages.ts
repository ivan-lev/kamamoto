import type { NextFunction, Request, Response } from 'express';
import fs from 'node:fs/promises';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Potter from '../models/potter';
import Style from '../models/style';
import { getOgImage } from '../utils/ogImage';
import { PATHS } from '../variables/paths';
import { NOT_FOUND_TITLE, STATIC_PAGES } from '../variables/staticPages';

const { CATEGORIES, CERAMIC_STYLES, DEFAULT_OG_IMAGE, EXHIBITIONS, EXHIBITS, FRONT_INDEX, PAGES, POTTERS, SITE_URL } = PATHS;

interface PageMeta {
	title: string;
	ogTitle: string;
	description?: string;
	image?: string;
}

function escapeAttribute(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

// HTML из БД → текст без тегов и сущностей
function toPlainText(html: string) {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/\s+/g, ' ')
		.trim();
}

// итоговая длина вместе с многоточием не превышает maxLength
function truncate(text: string, maxLength: number) {
	if (text.length <= maxLength)
		return text;

	// режем по пробелу, а если его нет поблизости (японский текст) — жёстко по длине
	const limit = maxLength - 1;
	const lastSpace = text.lastIndexOf(' ', limit);
	const cutAt = lastSpace > limit / 2 ? lastSpace : limit;

	return `${text.slice(0, cutAt).trimEnd()}…`;
}

function setMetaContent(html: string, key: string, value: string) {
	const pattern = new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`);
	return html.replace(pattern, `$1${escapeAttribute(value)}$2`);
}

// адрес нужен любой странице: иначе в og:url остаётся главная, и все страницы называют себя ею.
// canonical вставляется, а не заменяется: если вставка не сработает, страница останется без него,
// а не объявит себя главной
function applyUrl(html: string, url: string) {
	const result = setMetaContent(html, 'og:url', url);
	return result.replace('</head>', `\t<link rel="canonical" href="${escapeAttribute(url)}" />\n\t</head>`);
}

function applyMeta(html: string, meta: PageMeta) {
	let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(meta.title)}</title>`);
	result = setMetaContent(result, 'og:title', meta.ogTitle);

	// Google обрезает сниппет на ~160 символах, превью в соцсетях — на ~125
	if (meta.description) {
		result = setMetaContent(result, 'description', truncate(meta.description, 160));
		result = setMetaContent(result, 'og:description', truncate(meta.description, 125));
	}

	// общая картинка уже стоит в index.html вместе с её размерами
	if (meta.image && meta.image !== DEFAULT_OG_IMAGE) {
		result = setMetaContent(result, 'og:image', meta.image);
		result = setMetaContent(result, 'twitter:image', meta.image);
		// у общей картинки своя подпись в index.html, у картинки страницы — её название
		result = setMetaContent(result, 'og:image:alt', meta.ogTitle);
		// размеры в index.html относятся к общей картинке сайта
		result = result.replace(/\s*<meta property="og:image:(?:width|height)"[^>]*>/g, '');
	}

	return result;
}

function lowerFirst(text: string) {
	return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function upperFirst(text: string) {
	return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

// Заголовки повторяют <Seo> на соответствующих страницах фронта, описания живут только здесь.
// Видимость записей — как в API, которое вызывает фронт: скрытое там не должно светиться в мета-тегах

async function getExhibitMeta(id: string): Promise<PageMeta | undefined> {
	const exhibit = await Exhibit.findOne({ id: Number(id), isActive: true }, '-_id id name description').lean();
	if (!exhibit)
		return undefined;

	return {
		title: `Камамото: ${lowerFirst(exhibit.name)}`,
		ogTitle: exhibit.name,
		description: toPlainText(exhibit.description || '') || undefined,
		image: await getOgImage(EXHIBITS, String(exhibit.id)),
	};
}

async function getCategoryMeta(name: string): Promise<PageMeta | undefined> {
	const category = await Category.findOne({ name }, '-_id name title').lean();
	if (!category)
		return undefined;

	const title = category.title.toLowerCase();

	return {
		title: `Камамото: ${title}`,
		ogTitle: upperFirst(title),
		description: `Страница с каталогом предметов из категории ${title}`,
		image: await getOgImage(CATEGORIES, category.name),
	};
}

async function getExhibitionMeta(id: string): Promise<PageMeta | undefined> {
	const exhibition = await Exhibition.findOne({ id: Number(id), isActive: true }, '-_id id name description').lean();
	if (!exhibition)
		return undefined;

	const { name } = exhibition;

	return {
		title: `Камамото: выставка ${name}`,
		ogTitle: `Выставка «${name}»`,
		description: toPlainText(exhibition.description || '') || `Страница о выставке "${name}" с описанием и фотографиями`,
		image: await getOgImage(EXHIBITIONS, String(exhibition.id)),
	};
}

async function getCeramicStyleMeta(name: string): Promise<PageMeta | undefined> {
	const style = await Style.findOne({ name }, '-_id name title description showArticle').lean();
	if (!style || style.showArticle === false)
		return undefined;

	return {
		title: `Камамото: керамика ${style.title}`,
		ogTitle: `Керамика ${style.title}`,
		description: toPlainText(style.description || '') || `Страница со статьёй о керамике ${style.title}`,
		image: await getOgImage(CERAMIC_STYLES, style.name),
	};
}

async function getPotterMeta(id: string): Promise<PageMeta | undefined> {
	const potter = await Potter.findOne({ id }, '-_id id name info showArticle').lean();
	if (!potter || potter.showArticle === false)
		return undefined;

	return {
		title: `Камамото: гончар ${potter.name}`,
		ogTitle: potter.name,
		description: toPlainText(potter.info || '') || `Страница со статьёй о гончаре ${potter.name}`,
		image: await getOgImage(POTTERS, potter.id),
	};
}

async function getStaticPageMeta(key: string): Promise<PageMeta | undefined> {
	// hasOwn, а не `in`: иначе путь /constructor найдёт свойство прототипа
	if (!Object.hasOwn(STATIC_PAGES, key))
		return undefined;

	const { title, description } = STATIC_PAGES[key];

	return {
		title,
		ogTitle: upperFirst(title.replace(/^Камамото: /, '')),
		description,
		image: await getOgImage(PAGES, key),
	};
}

// страницы, у которых нет своих мета-тегов: им остаются общие из index.html
const PAGES_WITHOUT_META = /^\/(?:admin(?:\/.*)?)?$/;

// Порядок важен: берётся первый подошедший шаблон (лот раньше категории, статичные страницы последними)
const PAGE_ROUTES: { pattern: RegExp; getMeta: (param: string) => Promise<PageMeta | undefined> }[] = [
	{ pattern: /^\/collection\/[^/]+\/(\d+)$/, getMeta: getExhibitMeta },
	{ pattern: /^\/collection\/([^/]+)\/?$/, getMeta: getCategoryMeta },
	{ pattern: /^\/exhibitions\/(\d+)$/, getMeta: getExhibitionMeta },
	{ pattern: /^\/ceramic-styles\/([^/]+)$/, getMeta: getCeramicStyleMeta },
	{ pattern: /^\/lnt-potters\/([^/]+)$/, getMeta: getPotterMeta },
	{ pattern: /^\/([^/]+)\/?$/, getMeta: getStaticPageMeta },
];

async function findPageMeta(path: string) {
	for (const { pattern, getMeta } of PAGE_ROUTES) {
		const match = path.match(pattern);
		if (match)
			return getMeta(match[1]);
	}

	return undefined;
}

// отдаёт index.html фронта с мета-тегами конкретной страницы, чтобы превью в мессенджерах работали без JS
async function renderPage(req: Request, res: Response, next: NextFunction) {
	// несуществующий файл статики не должен превращаться в html-страницу
	if (req.path.startsWith('/static/'))
		return next();

	try {
		let html = applyUrl(await fs.readFile(FRONT_INDEX, 'utf8'), `${SITE_URL}${req.path}`);
		let status = 200;

		// если БД недоступна, сайт всё равно должен открыться — с общими мета-тегами и статусом 200
		try {
			if (!PAGES_WITHOUT_META.test(req.path)) {
				const meta = await findPageMeta(req.path);
				if (meta) {
					html = applyMeta(html, meta);
				}
				else {
					// настоящий 404, а не 200: иначе поисковики индексируют несуществующие адреса (soft 404).
					// Страницу «не найдено» по-прежнему рисует фронт, по тому же адресу
					status = 404;
					html = html.replace(/<title>[^<]*<\/title>/, `<title>${NOT_FOUND_TITLE}</title>`);
				}
			}
		}
		catch (error) {
			console.error(error);
		}

		// CSP от helmet рассчитан на API и сломал бы карту, emailjs и внешние слайды
		res.removeHeader('Content-Security-Policy');
		res.status(status).type('html').send(html);
	}
	catch (error) { return next(error); }
}

export const pages = { renderPage };
