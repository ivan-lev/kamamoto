import type { NextFunction, Request, Response } from 'express';
import type { Complectation as IComplectation } from '../types/complectation';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Complectation from '../models/complectation';
import { ERROR_MESSAGES } from '../variables/messages';

async function getComplectations(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const complectations = await Complectation.find({}, { _id: 0 });
		res.send(complectations);
	}
	catch (error) {
		next(error);
	}
}

async function createComplectation(req: Request, res: Response, next: NextFunction) {
	const payload: IComplectation = req.body;
	try {
		const result = await Complectation.create(payload);
		const { name, title } = result.toObject();
		res.status(201).send({ name, title });
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.COMPLECTATION); }
}

async function updateComplectation(req: Request, res: Response, next: NextFunction) {
	const payload: IComplectation = req.body;

	const { name } = payload;

	try {
		const result = await Complectation.findOneAndUpdate(
			{ name },
			payload,
			{ returnDocument: 'after', runValidators: true },
		).select({ _id: 0 }).orFail();

		res.status(201).send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.COMPLECTATION); }
}

async function deleteComplectation(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const complectation = await Complectation.findOneAndDelete({ name: req.params.name }).orFail();
		res.send(complectation);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.COMPLECTATION);
	}
}

export const complectation = {
	getComplectations,
	createComplectation,
	updateComplectation,
	deleteComplectation,
};
