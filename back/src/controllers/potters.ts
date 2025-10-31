import type { NextFunction, Request, Response } from 'express';
import type { Potter as IPotter } from '../types/potter';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Potter from '../models/potter';
import { ERROR_MESSAGES } from '../variables/messages';

async function getPotters(req: Request, res: Response, next: NextFunction) {
	try {
		const potters = await Potter.find({}).lean();
		potters.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		res.send(potters);
	}

	catch (error: any) { return next(error); };
}

async function findPotterById(req: Request, res: Response, next: NextFunction) {
	try {
		res.send('Some logic will be here if necessary');
	}

	catch (error: any) { return next(error); };
	// try {
	// 	const potter = await Potter.findOne({ id: req.params.id }, '-_id').orFail();

	// 	const pathToPotterFolder = `${STATIC_URL}/${POTTERS}/${potter.id}`;

	// 	if (potter.photo) {
	// 		potter.photo = `${pathToPotterFolder}/${potter.photo}`;
	// 	};

	// 	res.send(potter);
	// }

	// catch (error: any) {
	// 	if (error.name === 'CastError') {
	// 		return next(new ValidationError(ERROR_MESSAGES.POTTER_WRONG_ID));
	// 	}

	// 	if (error.name === 'DocumentNotFoundError') {
	// 		return next(new NotFoundError(ERROR_MESSAGES.POTTER_NOT_FOUND));
	// 	}

	// 	return next(error);
	// };
}

async function createPotter(req: Request, res: Response, next: NextFunction) {
	const potter: IPotter = req.body;

	try {
		const createdDocument = await Potter.create(potter);
		if (createdDocument) {
			const result = await Potter.findOne({ id: createdDocument.id }).select({ _id: 0 });
			res.status(201).send(result);
		}
	}

	catch (error: any) {
		if (error.name === 'CastError') {
			return next(new ValidationError(ERROR_MESSAGES.POTTER_WRONG_ID));
		}

		if (error.name === 'ValidationError') {
			return next(new ValidationError(ERROR_MESSAGES.POTTER_WRONG_DATA));
		}

		if (error.code === 11000) {
			return next(new ConflictError(ERROR_MESSAGES.POTTER_EXISTS));
		}

		return next(error);
	};
}

async function updatePotter(req: Request, res: Response, next: NextFunction) {
	const potter: IPotter = req.body;

	try {
		const result = await Potter.findOneAndUpdate(
			{ id: req.params.id },
			potter,
			{ new: true, runValidators: true },
		).select({ _id: 0 }).orFail();

		res.status(201).send(result);
	}

	catch (error: any) {
		if (error.name === 'CastError') {
			return next(new ValidationError(ERROR_MESSAGES.POTTER_WRONG_ID));
		}

		if (error.name === 'ValidationError') {
			return next(new ValidationError(ERROR_MESSAGES.POTTER_WRONG_DATA));
		}

		if (error.code === 11000) {
			return next(new ConflictError(ERROR_MESSAGES.POTTER_EXISTS));
		}

		return next(error);
	};
}

async function deletePotter(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await Potter.findOneAndDelete({ id: req.params.id }).orFail();
		res.send(result);
	}

	catch (error: any) {
		if (error.name === 'CastError') {
			return next(new ValidationError(ERROR_MESSAGES.POTTER_WRONG_ID));
		}

		if (error.name === 'DocumentNotFoundError') {
			return next(new NotFoundError(ERROR_MESSAGES.POTTER_NOT_FOUND));
		}

		return next(error);
	};
}

export const potter = {
	getPotters,
	findPotterById,
	createPotter,
	updatePotter,
	deletePotter,
};
