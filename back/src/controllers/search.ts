import type { NextFunction, Request, Response } from 'express';
import { mongo } from 'mongoose';
import { SearchUnavailableError } from '../errors/search-unavailable-error';
import Potter from '../models/potter';
import CeramicStyleModel from '../models/style';
import Term from '../models/term';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { CERAMIC_STYLES, DICTIONARY, LNT_POTTERS, STATIC_URL, POTTERS } = PATHS;

const SNIPPET_LENGTH = 200;

interface SearchItem {
	title: string;
	link: string;
	snippet: string;
	thumbnail: string;
	// article — стили керамики и мастера, term — глоссарий
	type: 'article' | 'term';
	score: number;
}

// HTML из БД → текст без тегов (как toPlainText в controllers/pages.ts, он не экспортируется)
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

function truncate(text: string, maxLength: number) {
	if (text.length <= maxLength)
		return text;

	const limit = maxLength - 1;
	const lastSpace = text.lastIndexOf(' ', limit);
	const cutAt = lastSpace > limit / 2 ? lastSpace : limit;

	return `${text.slice(0, cutAt).trimEnd()}…`;
}

// пути полей с весами: заголовок > имена/теги > описание > содержимое.
// русские и японские варианты индексируются через multi-поля .ru / .ja
// Для японского текста используем phrase: токены должны идти подряд (常滑焼 как последовательность),
// иначе OR-семантика should находит статьи по одному частому токену 焼 и выдаёётся всё подряд
const CJK_REGEX = /[\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

function buildClauses(fields: Array<{ path: string; boost: number }>, query: string) {
	const operator = CJK_REGEX.test(query) ? 'phrase' : 'text';

	return fields.map(({ path, boost }) => ({
		[operator]: {
			query,
			path,
			score: { boost: { value: boost } },
		},
	}));
}

async function searchStyles(query: string, limit: number): Promise<SearchItem[]> {
	const pipeline = [
		{
			$search: {
				index: 'articles_search',
				compound: { should: buildClauses([
					{ path: 'title', boost: 10 },
					{ path: 'title.ru', boost: 10 },
					{ path: 'title.ja', boost: 10 },
					{ path: 'name', boost: 8 },
					{ path: 'description', boost: 5 },
					{ path: 'description.ru', boost: 5 },
					{ path: 'description.ja', boost: 5 },
					{ path: 'article.content', boost: 2 },
					{ path: 'article.content.ru', boost: 2 },
					{ path: 'article.content.ja', boost: 2 },
				], query) },
			},
		},
		{ $match: { showArticle: true } },
		{ $limit: limit },
		{ $project: { _id: 0, title: 1, name: 1, description: 1, thumbnail: 1, score: { $meta: 'searchScore' } } },
	];

	const results = await CeramicStyleModel.aggregate(pipeline);

	return results.map((style) => {
		const thumbnail = style.thumbnail
			? `${STATIC_URL}/${CERAMIC_STYLES}/${style.name}/${style.thumbnail}`
			: '';

		return {
			title: style.title,
			link: `/${CERAMIC_STYLES}/${style.name}`,
			snippet: truncate(toPlainText(style.description || ''), SNIPPET_LENGTH),
			thumbnail,
			type: 'article' as const,
			score: style.score,
		};
	});
}

async function searchPotters(query: string, limit: number): Promise<SearchItem[]> {
	const pipeline = [
		{
			$search: {
				index: 'potters_search',
				compound: { should: buildClauses([
					{ path: 'name', boost: 10 },
					{ path: 'name.ru', boost: 10 },
					{ path: 'name.ja', boost: 10 },
					{ path: 'japaneseName', boost: 8 },
					{ path: 'id', boost: 6 },
					{ path: 'info', boost: 4 },
					{ path: 'info.ru', boost: 4 },
					{ path: 'info.ja', boost: 4 },
					{ path: 'article.content', boost: 2 },
					{ path: 'article.content.ru', boost: 2 },
					{ path: 'article.content.ja', boost: 2 },
				], query) },
			},
		},
		{ $match: { showArticle: true, isLNT: true } },
		{ $limit: limit },
		{ $project: { _id: 0, name: 1, id: 1, info: 1, photo: 1, score: { $meta: 'searchScore' } } },
	];

	const results = await Potter.aggregate(pipeline);

	return results.map((potter) => {
		const photo = potter.photo
			? `${STATIC_URL}/${POTTERS}/${potter.id}/${potter.photo}`
			: '';

		return {
			title: potter.name,
			link: `/${LNT_POTTERS}/${potter.id}`,
			snippet: truncate(toPlainText(potter.info || ''), SNIPPET_LENGTH),
			thumbnail: photo,
			type: 'article' as const,
			score: potter.score,
		};
	});
}

async function searchTerms(query: string, limit: number): Promise<SearchItem[]> {
	const pipeline = [
		{
			$search: {
				index: 'terms_search',
				compound: { should: buildClauses([
					{ path: 'title', boost: 10 },
					{ path: 'title.ru', boost: 10 },
					{ path: 'title.ja', boost: 10 },
					{ path: 'kanji', boost: 8 },
					{ path: 'romaji', boost: 6 },
					{ path: 'id', boost: 6 },
					{ path: 'definition', boost: 4 },
					{ path: 'definition.ru', boost: 4 },
					{ path: 'definition.ja', boost: 4 },
				], query) },
			},
		},
		{ $limit: limit },
		{ $project: { _id: 0, title: 1, id: 1, definition: 1, image: 1, score: { $meta: 'searchScore' } } },
	];

	const results = await Term.aggregate(pipeline);

	return results.map((term) => {
		const image = term.image
			? `${STATIC_URL}/dictionary/${term.image}`
			: '';

		return {
			title: term.title,
			link: `/${DICTIONARY}#${term.id}`,
			snippet: truncate(toPlainText(term.definition || ''), SNIPPET_LENGTH),
			thumbnail: image,
			type: 'term' as const,
			score: term.score,
		};
	});
}

async function search(req: Request, res: Response, next: NextFunction) {
	const query = String(req.query.q ?? '').trim();
	const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);

	try {
		const [styles, potters, terms] = await Promise.all([
			searchStyles(query, limit),
			searchPotters(query, limit),
			searchTerms(query, limit),
		]);

		const items = [...styles, ...potters, ...terms]
			.sort((a, b) => b.score - a.score)
			.slice(0, limit)
			.map(({ title, link, snippet, thumbnail, type }) => ({ title, link, snippet, thumbnail, type }));

		res.send({ items, query });
	}
	catch (error) {
		// недоступен mongot / нет индекса: сообщаем об этом, а не отдаём 500 с внутренностями
		const isMongotError = (error instanceof mongo.MongoServerError && ['HostUnreachable', 'Location186346', 'Unavailable'].some(s => String(error.codeName).includes(s) || String(error.message).includes(s)))
			|| (error instanceof Error && /search|mongot|index/i.test(error.message));

		if (isMongotError)
			return next(new SearchUnavailableError(ERROR_MESSAGES.SEARCH.UNAVAILABLE));

		return next(error);
	}
}

export const searchController = { search };
