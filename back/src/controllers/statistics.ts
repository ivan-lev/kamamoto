import type { NextFunction, Request, Response } from 'express';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Letters from '../models/letter';
import Partners from '../models/partner';
import { ERROR_MESSAGES } from '../variables/messages';

export function getStatistics(req: Request, res: Response, next: NextFunction): void {
	Promise.all([
		Exhibit.estimatedDocumentCount(),
		Exhibition.estimatedDocumentCount(),
		Category.estimatedDocumentCount(),
		Partners.estimatedDocumentCount(),
		Letters.estimatedDocumentCount(),
	])
		.then((results) => {
			const [exhibits, exhibitions, categories, partners, letters] = results;
			res.send({ exhibits, exhibitions, categories, partners, letters });
		})
		.catch((error: Error) => { return handleMongooseError(error, next, ERROR_MESSAGES.USER); });
}
