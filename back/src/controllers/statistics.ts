import type { NextFunction, Request, Response } from 'express';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Letters from '../models/letter';
import Partners from '../models/partner';

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
	// у подсчёта нет ошибок, которые переводит handleMongooseError: только сбой БД → 500
	catch (error) {
		next(error);
	}
}
