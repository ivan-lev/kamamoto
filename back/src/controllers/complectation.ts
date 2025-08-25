import type { NextFunction, Request, Response } from 'express';
import type { Complectation as IComplectation } from '../types/complectation';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Complectation from '../models/complectation';
import { ERROR_MESSAGES } from '../variables/messages';

function getComplectations(req: Request, res: Response, next: NextFunction): void {
	Complectation.find({}, { _id: 0 })
		.then(complectations => res.send(complectations))
		.catch((error) => { return next(error); });
}

function createComplectation(req: Request, res: Response, next: NextFunction): void {
	const complectation: IComplectation = req.body;

	Complectation.create(complectation)
		.then(complectation => res.status(201).send(complectation))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.COMPLECTATION_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.COMPLECTATION_EXISTS));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.COMPLECTATION_NOT_FOUND));
			}

			return next(error);
		});
}

export const complectation = {
	getComplectations,
	createComplectation,
};
