import type { NextFunction, Request, Response } from 'express';
import type { Exhibition as ExhibitionType } from '../types/exhibition';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Exhibition from '../models/exhibition';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { EXHIBITIONS, STATIC_URL } = PATHS;

// с токеном (optionalAuth) — все выставки с сырыми именами файлов для админки, без — для сайта, с URL
async function getExhibitions(req: any, res: Response, next: NextFunction): Promise<void> {
	const isAdmin = Boolean(req.user);
	try {
		const exhibitions: ExhibitionType[] = await Exhibition.find({}, { _id: 0 });

		if (isAdmin) {
			res.send(exhibitions);
			return;
		}

		const publicExhibitions = exhibitions.map((exhibition) => {
			const { id, year, dates, city, place, name, isActive, photos, poster } = exhibition;

			// неактивная выставка остаётся в списке карточкой без ссылки — отдаём только поля карточки
			if (!isActive)
				return { id, year, dates, city, place, name, isActive };

			const pathToExhibitionFolder = `${STATIC_URL}/${EXHIBITIONS}/${id}`;

			if (photos) {
				photos.forEach((photo, i) => {
					photos[i] = `${pathToExhibitionFolder}/${photo}`;
				});
			}

			if (poster)
				exhibition.poster = `${pathToExhibitionFolder}/${poster}`;

			return exhibition;
		});

		res.send(publicExhibitions);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION);
	}
}

async function createExhibition(req: Request, res: Response, next: NextFunction): Promise<void> {
	const exhibition = req.body;

	try {
		const createdExhibition = await Exhibition.create({ ...exhibition });
		res.status(201).send(createdExhibition);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION);
	}
}

async function getExhibitionById(req: Request, res: Response, next: NextFunction): Promise<void> {
	const id = Number(req.params.id);
	try {
		// неактивная выставка для посетителя не существует, админка этот эндпоинт не использует
		const exhibition = await Exhibition.findOne({ id, isActive: true }, { _id: 0 }).orFail();
		const { photos, poster } = exhibition;
		const pathToExhibitionFolder = `${STATIC_URL}/${EXHIBITIONS}/${exhibition.id}`;

		if (photos.length) {
			photos.forEach((photo, i) => {
				photos[i] = `${pathToExhibitionFolder}/${photo}`;
			});
		}

		if (poster)
			exhibition.poster = `${pathToExhibitionFolder}/${poster}`;

		res.send(exhibition);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION);
	}
}

async function updateExhibition(req: Request, res: Response, next: NextFunction): Promise<void> {
	const newExhibitionData: ExhibitionType = req.body;
	const id = Number(req.params.id);
	try {
		const exhibition = await Exhibition.findOneAndUpdate({ id }, newExhibitionData, {
			returnDocument: 'after',
			runValidators: true,
			projection: { _id: 0 },
		}).orFail();
		res.send(exhibition);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION);
	}
}

async function deleteExhibition(req: Request, res: Response, next: NextFunction): Promise<void> {
	const id = Number(req.params.id);
	try {
		const exhibition = await Exhibition.findOneAndDelete({ id }).orFail();
		res.send(exhibition.id);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION);
	}
}

export const exhibition = {
	createExhibition,
	deleteExhibition,
	getExhibitions,
	getExhibitionById,
	updateExhibition,
};
