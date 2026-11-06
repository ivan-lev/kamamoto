import type { NextFunction, Request, Response } from 'express';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Exhibition from '../models/exhibition';
import Letters from '../models/letter';
import Markers from '../models/marker';
import Partners from '../models/partner';
import Potters from '../models/potter';
import Styles from '../models/style';
import Terms from '../models/term';

export async function getStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const [exhibits, exhibitions, categories, partners, letters, potters, styles, terms, mapPins] = await Promise.all([
			Exhibit.estimatedDocumentCount(),
			Exhibition.estimatedDocumentCount(),
			Category.estimatedDocumentCount(),
			Partners.estimatedDocumentCount(),
			Letters.estimatedDocumentCount(),
			Potters.countDocuments({ showArticle: true }),
			Styles.countDocuments({ showArticle: true }),
			Terms.estimatedDocumentCount(),
			Markers.countDocuments({ isActive: true }),
		]);
		res.send({ exhibits, exhibitions, categories, partners, letters, articles: potters + styles, terms, mapPins });
	}
	// у подсчёта нет ошибок, которые переводит handleMongooseError: только сбой БД → 500
	catch (error) {
		next(error);
	}
}
