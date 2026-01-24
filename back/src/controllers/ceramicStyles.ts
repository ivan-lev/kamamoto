import type { NextFunction, Request, Response } from 'express';
import type { Style as CeramicStyleType } from '../types/style';
import type { DeleteCeramicStyleParams, UpdateCeramicStyleParams } from './ceramicStyles.types';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import ceramicStylesSorter from '../middlewares/utils/ceramicStylesSorter';
import CeramicStyleModel from '../models/style';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { CERAMIC_STYLES, STATIC_URL } = PATHS;

function getCeramicStyles(req: Request, res: Response, next: NextFunction): void {
	const isAdmin = req.headers['is-admin'];
	CeramicStyleModel.find({}, '-_id')
		.then((styles: CeramicStyleType[]) => {
			if (isAdmin === 'false') {
				styles.forEach((style) => {
					const { thumbnail } = style;
					const pathToCeramicStyleFolder = `${STATIC_URL}/${CERAMIC_STYLES}/${style.name}`;
					if (thumbnail)
						style.thumbnail = `${pathToCeramicStyleFolder}/${thumbnail}`;
				});
			}

			styles.sort(ceramicStylesSorter);

			return styles;
		})
		.then(styles => res.send(styles))
		.catch((error) => { return next(error); });
}

function getCeramicStylesArticles(req: Request, res: Response, next: NextFunction): void {
	CeramicStyleModel.find({ showArticle: true }, '-_id -article -brief -description -images -additionalImages -mapImage -showArticle')
		.then((styles: CeramicStyleType[]) => {
			styles.forEach((style) => {
				const { thumbnail } = style;
				const pathToCeramicStyleFolder = `${STATIC_URL}/${CERAMIC_STYLES}/${style.name}`;
				if (thumbnail)
					style.thumbnail = `${pathToCeramicStyleFolder}/${thumbnail}`;
			});

			return styles;
		})
		.then(styles => res.send(styles))
		.catch((error) => { return next(error); });
}

async function getCeramicStylesArticle(req: Request, res: Response, next: NextFunction) {
	const { style } = req.params;
	try {
		const articleData = await CeramicStyleModel.findOne({ name: style }, '-_id -brief -thumbnail -description -images -additionalImages -mapImage -showArticle').lean();
		const pathToSlidesFolder = `${STATIC_URL}/${CERAMIC_STYLES}/${articleData?.name}`;
		articleData?.article.forEach(section => section.slides?.forEach((slide) => {
			if (!slide.filename.startsWith('http')) {
				slide.filename = `${pathToSlidesFolder}/${slide.filename}`;
			}
		}));
		res.send(articleData);
	}
	catch (error) {
		return next(error);
	}
};

function createCeramicStyle(req: Request, res: Response, next: NextFunction): void {
	const ceramicStyle = req.body;

	CeramicStyleModel.create(ceramicStyle)
		.then((ceramicStyle) => {
			const { _id, ...styleData } = ceramicStyle.toObject();
			res.status(201).send(styleData);
		})
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS));
			}

			return next(error);
		});
}

function deleteCeramicStyle(req: Request<DeleteCeramicStyleParams>, res: Response, next: NextFunction): void {
	const name = req.params.name;
	CeramicStyleModel.findOneAndDelete({ name })
		.orFail()
		.select('name')
		.then(style => res.send(style))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			return next(error);
		});
}

function updateCeramicStyle(req: Request<UpdateCeramicStyleParams>, res: Response, next: NextFunction): void {
	const newCeramicStyleData: CeramicStyleType = req.body;
	const ceramicStyleName = req.params.name;

	CeramicStyleModel.findOneAndUpdate(
		{ name: ceramicStyleName },
		newCeramicStyleData,
		{ new: true, runValidators: true },
	)
		.select('-_id')
		.orFail()
		.then(style => res.send(style))
		.catch((error) => {
			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA));
			}

			if (error.name === 'CastError') {
				return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS));
			}

			return next(error);
		});
}

export const ceramicStyle = {
	createCeramicStyle,
	getCeramicStyles,
	getCeramicStylesArticles,
	getCeramicStylesArticle,
	updateCeramicStyle,
	deleteCeramicStyle,
};
