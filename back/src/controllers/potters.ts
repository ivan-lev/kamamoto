import type { NextFunction, Request, Response } from 'express';
import type { Potter as IPotter } from '../types/potter';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Potter from '../models/potter';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { LNT_POTTERS, POTTERS, STATIC_URL } = PATHS;

async function getPotters(req: Request, res: Response, next: NextFunction) {
	try {
		const potters = await Potter.find({}).select({ _id: 0 }).lean<IPotter[]>();
		potters.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		res.send(potters);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.POTTER); }
}

async function getLNTPotters(req: Request, res: Response, next: NextFunction) {
	try {
		const potters = (await Potter.find({}).select({ _id: 0, japaneseName: 0, lifeDates: 0, info: 0 }).lean<IPotter[]>()).filter(potter => potter.isLNT === true);
		potters.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

		potters.forEach((potter) => {
			const pathToPotterFolder = `${STATIC_URL}/${POTTERS}/${potter.id}`;

			if (potter.photo) {
				potter.photo = `${pathToPotterFolder}/${potter.photo}`;
			};
		});
		const response = potters.map((potter) => {
			return { thumbnail: potter.photo, title: potter.name, link: `/${LNT_POTTERS}/${potter.id}` };
		});
		res.send(response);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.POTTER); }
}

async function findPotterById(req: Request, res: Response, next: NextFunction) {
	try {
		const potter = await Potter.findOne({ id: req.params.id }, '-_id').orFail();

		const pathToPotterFolder = `${STATIC_URL}/${POTTERS}/${potter.id}`;

		if (potter.photo) {
			potter.photo = `${pathToPotterFolder}/${potter.photo}`;
		};

		res.send(potter);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.POTTER); }
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

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.POTTER); }
}

async function updatePotter(req: Request, res: Response, next: NextFunction) {
	const potter: IPotter = req.body;

	try {
		const result = await Potter.findOneAndUpdate(
			{ id: req.params.id },
			potter,
			{ returnDocument: 'after', runValidators: true },
		).select({ _id: 0 }).orFail();

		res.status(201).send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.POTTER); }
}

async function deletePotter(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await Potter.findOneAndDelete({ id: req.params.id }).orFail();
		res.send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.POTTER); }
}

export const potter = {
	getPotters,
	getLNTPotters,
	findPotterById,
	createPotter,
	updatePotter,
	deletePotter,
};
