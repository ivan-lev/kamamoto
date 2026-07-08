import type { NextFunction, Request, Response } from 'express';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Letters from '../models/letter';
import Partners from '../models/partner';
import { ERROR_MESSAGES } from '../variables/messages';

export async function getStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const [exhibits, exhibitions, categories, partners, letters] = await Promise.all([
			Exhibit.estimatedDocumentCount(),
			Exhibition.estimatedDocumentCount(),
			Category.estimatedDocumentCount(),
			Partners.estimatedDocumentCount(),
			Letters.estimatedDocumentCount(),
		]);
		res.send({ exhibits, exhibitions, categories, partners, letters });
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.USER);
	}
}
