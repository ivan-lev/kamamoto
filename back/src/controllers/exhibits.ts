import type { NextFunction, Request, Response } from 'express';

import type { Exhibit as ExhibitType } from '../types/exhibit';

import { ERROR_MESSAGES, PATHS } from '../constants';

import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Exhibit from '../models/exhibit';

const { EXHIBITS, PUBLIC_PATH } = PATHS;

function getExhibits(req: Request, res: Response, next: NextFunction): void {
	Exhibit.find({})
		.populate({
			path: 'category',
			// Explicitly exclude `_id`
			select: 'title -_id',
		})
		.then((exhibits: ExhibitType[]) => res.send(exhibits))
		.catch((error: any) => { return next(error); });
}

function findExhibitById(req: Request, res: Response, next: NextFunction): void {
	Exhibit.findOne({ id: req.params.id })
		.orFail()
		.then((exhibit: ExhibitType) => {
			// console.error(exhibit);
			exhibit.images.forEach((image, i) => {
				exhibit.images[i] = `${PUBLIC_PATH}/${EXHIBITS}/${exhibit.id}/${image}`;
			});
			exhibit.additionalImages.forEach((image, i) => {
				exhibit.additionalImages[i] = `${PUBLIC_PATH}/${EXHIBITS}/${exhibit.id}/additional/${image}`;
			});
			res.send(exhibit);
		})
		.catch((error: any) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			return next(error);
		});
}

function createExhibit(req: Request, res: Response, next: NextFunction): void {
	const exhibit = req.body;

	Exhibit.create({ ...exhibit })
		.then((exhibit: ExhibitType) => res.status(201).send(exhibit))
		.catch((error: any) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
			}

			return next(error);
		});
}

function deleteExhibit(req: Request, res: Response, next: NextFunction): void {
	Exhibit.findOneAndDelete({ is: req.params.is })
		.orFail()
		.then((exhibit: ExhibitType) => res.send(exhibit))
		.catch((error: any) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			return next(error);
		});
}

function updateExhibit(req: Request, res: Response, next: NextFunction): void {
	const newExhibitData: ExhibitType = req.body;
	Exhibit.findOneAndUpdate({ is: req.params.is }, newExhibitData, {
		new: true,
		runValidators: true,
	})
		.orFail()
		.then((exhibit: ExhibitType) => res.send(exhibit))
		.catch((error: any) => {
			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
			}

			if (error.name === 'CastError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
			}

			return next(error);
		});
}

export const exhibit = {
	getExhibits,
	findExhibitById,
	createExhibit,
	deleteExhibit,
	updateExhibit,
};
