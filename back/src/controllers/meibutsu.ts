import type { NextFunction, Request, Response } from 'express';
import type { Meibutsu as IMeibutsu } from '../types/meibutsu';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Meibutsu from '../models/meibutsu';
import { removeImage } from '../utils/images';
import { removeUnusedSlides } from '../utils/slides';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { MEIBUTSU, STATIC_URL } = PATHS;

// Список для админки: сырые имена файлов, включая неопубликованные
async function getMeibutsuList(req: Request, res: Response, next: NextFunction) {
	try {
		const items = await Meibutsu.find({}).select({ _id: 0 }).lean<IMeibutsu[]>();
		items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		res.send(items);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MEIBUTSU); }
}

// Карточки для списка /meibutsu/: только опубликованные, фото → URL
async function getMeibutsuArticlesList(req: Request, res: Response, next: NextFunction) {
	try {
		const items = await Meibutsu.find({ showArticle: true }, '-_id -article -info -japaneseName -showArticle').lean<IMeibutsu[]>();

		items.forEach((item) => {
			if (item.photo)
				item.photo = `${STATIC_URL}/${MEIBUTSU}/${item.id}/${item.photo}`;
		});

		res.send(items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MEIBUTSU); }
}

// Статья вещи для сайта: слайды и фото → URL, неопубликованная → 404 с пустым телом
async function getMeibutsuArticle(req: Request, res: Response, next: NextFunction) {
	try {
		const item = await Meibutsu.findOne({ id: req.params.id }, '-_id').orFail();

		if (item === null || item.showArticle === false) {
			res.status(404);
			res.send();
			return;
		}

		const pathToMeibutsuFolder = `${STATIC_URL}/${MEIBUTSU}/${item.id}`;

		if (item.photo) {
			item.photo = `${pathToMeibutsuFolder}/${item.photo}`;
		};

		item.article.forEach(section => section.slides?.forEach((slide) => {
			if (!slide.filename.startsWith('http') && slide.filename.trim() !== '') {
				slide.filename = `${pathToMeibutsuFolder}/slides/${slide.filename}`;
			}
		}));

		res.send(item);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MEIBUTSU); }
}

async function createMeibutsu(req: Request, res: Response, next: NextFunction) {
	const meibutsu: IMeibutsu = req.body;

	try {
		const createdDocument = await Meibutsu.create(meibutsu);
		if (createdDocument) {
			const result = await Meibutsu.findOne({ id: createdDocument.id }).select({ _id: 0 });
			res.status(201).send(result);
		}
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MEIBUTSU); }
}

async function updateMeibutsu(req: Request, res: Response, next: NextFunction) {
	const meibutsu: IMeibutsu = req.body;

	const meibutsuId = req.params.id as string;

	try {
		const previousMeibutsu = await Meibutsu.findOne({ id: meibutsuId }, 'article photo').lean<Pick<IMeibutsu, 'article' | 'photo'>>();
		const result = await Meibutsu.findOneAndUpdate(
			{ id: meibutsuId },
			meibutsu,
			{ returnDocument: 'after', runValidators: true },
		).select({ _id: 0 }).orFail();

		// При смене id слайды и фото остаются в папке со старым id, поэтому их не трогаем
		if (previousMeibutsu && result.id === meibutsuId) {
			await removeUnusedSlides('meibutsu', meibutsuId, previousMeibutsu.article, result.article);

			// фото заменили либо убрали — старый файл больше не нужен
			if (previousMeibutsu.photo && previousMeibutsu.photo !== result.photo)
				await removeImage('meibutsu', previousMeibutsu.photo, meibutsuId);
		}

		res.send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MEIBUTSU); }
}

async function deleteMeibutsu(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await Meibutsu.findOneAndDelete({ id: req.params.id }).orFail();
		res.send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MEIBUTSU); }
}

export const meibutsu = {
	getMeibutsuList,
	getMeibutsuArticlesList,
	getMeibutsuArticle,
	createMeibutsu,
	updateMeibutsu,
	deleteMeibutsu,
};
