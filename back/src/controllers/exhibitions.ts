import type { NextFunction, Request, Response } from 'express';
import type { Exhibition as ExhibitionType } from '../types/exhibition';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Exhibition from '../models/exhibition';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { EXHIBITIONS, STATIC_URL } = PATHS;

function getExhibitions(req: Request, res: Response, next: NextFunction): void {
	const isAdmin = req.headers['is-admin'];
	Exhibition.find({}, { _id: 0 })
		.then((exhibitions: ExhibitionType[]) => {
			if (isAdmin === 'false') {
				exhibitions.forEach((exhibition) => {
					const { id, photos, poster } = exhibition;
					const pathToExhibitionFolder = `${STATIC_URL}/${EXHIBITIONS}/${id}`;

					if (photos) {
						photos.forEach((photo, i) => {
							photos[i] = `${pathToExhibitionFolder}/${photo}`;
						});
					}

					if (poster)
						exhibition.poster = `${pathToExhibitionFolder}/${poster}`;
				});
			}

			return exhibitions;
		})
		.then(exhibitions => res.send(exhibitions))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION); });
}

function createExhibition(req: Request, res: Response, next: NextFunction): void {
	const exhibition = req.body;

	Exhibition.create({ ...exhibition })
		.then(exhibition => res.status(201).send(exhibition))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION); });
}

function getExhibitionById(req: Request, res: Response, next: NextFunction): void {
	const id = Number(req.params.id);
	Exhibition.findOne({ id }, { _id: 0 })
		.orFail()
		.then((exhibition) => {
			const { photos, poster } = exhibition;
			const pathToExhibitionFolder = `${STATIC_URL}/${EXHIBITIONS}/${exhibition.id}`;

			if (photos.length) {
				photos.forEach((photo, i) => {
					photos[i] = `${pathToExhibitionFolder}/${photo}`;
				});
			}

			if (poster)
				exhibition.poster = `${pathToExhibitionFolder}/${poster}`;

			return exhibition;
		})
		.then((exhibition) => {
			res.send(exhibition);
		})
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION); });
}

function updateExhibition(req: Request, res: Response, next: NextFunction): void {
	const newExhibitionData: ExhibitionType = req.body;
	const id = Number(req.params.id);
	Exhibition.findOneAndUpdate({ id }, newExhibitionData, {
		returnDocument: 'after',
		runValidators: true,
		projection: { _id: 0 },
	})
		.orFail()
		.then(exhibition => res.send(exhibition))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION); });
}

function deleteExhibition(req: Request, res: Response, next: NextFunction): void {
	const id = Number(req.params.id);
	Exhibition.findOneAndDelete({ id })
		.orFail()
		.then(exhibition => res.send(exhibition.id))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBITION); });
}

export const exhibition = {
	createExhibition,
	deleteExhibition,
	getExhibitions,
	getExhibitionById,
	updateExhibition,
};
