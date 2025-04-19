import type { NextFunction, Request, Response } from 'express';

import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Letters from '../models/letter';
import Partners from '../models/partner';

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
		.catch((error) => { return next(error); });
}
