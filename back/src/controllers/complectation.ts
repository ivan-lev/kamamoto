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

async function createComplectation(req: Request, res: Response, next: NextFunction) {
	const payload: IComplectation = req.body;
	try {
		const result = await Complectation.create(payload);
		const { name, title } = result.toObject();
		res.status(201).send({ name, title });
	}
	catch (error: any) {
		if (error.name === 'CastError') {
			return next(new ValidationError(ERROR_MESSAGES.COMPLECTATION_WRONG_ID));
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
	};
}

async function updateComplectation(req: Request, res: Response, next: NextFunction) {
	const payload: IComplectation = req.body;

	const { name } = payload;

	try {
		const result = await Complectation.findOneAndUpdate(
			{ name },
			payload,
			{ new: true, runValidators: true },
		).select({ _id: 0 }).orFail();

		res.status(201).send(result);
	}
	catch (error: any) {
		if (error.name === 'CastError') {
			return next(new ValidationError(ERROR_MESSAGES.COMPLECTATION_WRONG_ID));
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
	};
}

function deleteComplectation(req: Request, res: Response, next: NextFunction): void {
	Complectation.findOneAndDelete({ name: req.params.name })
		.orFail()
		.then(complectation => res.send(complectation))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.COMPLECTATION_WRONG_ID));
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
	updateComplectation,
	deleteComplectation,
};
