import type { NextFunction, Request, Response } from 'express';
import type { Exhibition as ExhibitionType } from '../types/exhibition';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
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
		.catch((error) => { return next(error); });
}

function createExhibition(req: Request, res: Response, next: NextFunction): void {
	const exhibition = req.body;

	Exhibition.create({ ...exhibition })
		.then(exhibition => res.status(201).send(exhibition))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.EXHIBITION_EXISTS));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
			}

			return next(error);
		});
}

function getExhibitionById(req: Request, res: Response, next: NextFunction): void {
	Exhibition.findOne({ id: req.params.id }, { _id: 0 })
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
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
			}

			return next(error);
		});
}

function updateExhibition(req: Request, res: Response, next: NextFunction): void {
	const newExhibitionData: ExhibitionType = req.body;
	Exhibition.findOneAndUpdate({ id: req.params.id }, newExhibitionData, {
		new: true,
		runValidators: true,
		projection: { _id: 0 },
	})
		.orFail()
		.then(exhibition => res.send(exhibition))
		.catch((error) => {
			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_DATA));
			}

			if (error.name === 'CastError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
			}

			return next(error);
		});
}

function deleteExhibition(req: Request, res: Response, next: NextFunction): void {
	Exhibition.findOneAndDelete({ id: req.params.id })
		.orFail()
		.then(exhibition => res.send(exhibition.id))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBITION_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBITION_NOT_FOUND));
			}

			return next(error);
		});
}

export const exhibition = {
	createExhibition,
	deleteExhibition,
	getExhibitions,
	getExhibitionById,
	updateExhibition,
};
