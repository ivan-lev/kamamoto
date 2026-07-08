import type { NextFunction, Request, Response } from 'express';
import type { ArticlePayload, ArticlesListPayload } from '../types/article';
import type { Feature } from '../types/feature';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import FeatureModel from '../models/feature';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { FEATURES, STATIC_URL } = PATHS;

async function getFeatures(req: Request, res: Response, next: NextFunction) {
	const isAdmin = req.headers['is-admin'];

	try {
		const features = await FeatureModel.find({}, '-_id').lean<Feature[]>();

		if (isAdmin === 'false') {
			features.forEach((feature) => {
				const { thumbnail } = feature;
				const pathToFeatureFolder = `${STATIC_URL}/${FEATURES}/${feature.name}`;
				if (thumbnail)
					feature.thumbnail = `${pathToFeatureFolder}/${thumbnail}`;
			});
		}

		res.send(features.sort((a, b) => a.title.localeCompare(b.title)));
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.FEATURE); }
}

async function getFeaturesArticlesList(req: Request, res: Response, next: NextFunction) {
	try {
		const featuresList = await FeatureModel.find({ showArticle: true }, '-_id -article -description -showArticle').lean<ArticlesListPayload[]>();

		featuresList.forEach((features) => {
			const { thumbnail } = features;
			const pathToFeatureFolder = `${STATIC_URL}/${FEATURES}/${features.name}`;
			if (thumbnail)
				features.thumbnail = `${pathToFeatureFolder}/${thumbnail}`;
		});

		res.send(featuresList.sort((a, b) => a.title.localeCompare(b.title)));
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.FEATURE); }
}

async function getFeatureArticle(req: Request, res: Response, next: NextFunction) {
	const { feature } = req.params;
	try {
		const featureData = await FeatureModel.findOne({ name: feature }, '-_id title name article showArticle').lean<ArticlePayload>();

		if (featureData === null || featureData.showArticle === false) {
			res.status(404);
			res.send();
			return;
		}

		const { title, name, article } = featureData;

		const pathToFeatureFolder = `${STATIC_URL}/${FEATURES}/${name}`;
		article.forEach(section => section.slides?.forEach((slide) => {
			if (!slide.filename.startsWith('http')) {
				slide.filename = `${pathToFeatureFolder}/slides/${slide.filename}`;
			}
		}));

		res.send({ title, name, article });
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.FEATURE); }
};

async function createFeature(req: Request, res: Response, next: NextFunction) {
	const feature = req.body;
	try {
		const result = await FeatureModel.create(feature);

		const { _id, ...featureData } = result.toObject();
		res.status(201).send(featureData);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.FEATURE); }
}

// function createFeature(req: Request, res: Response, next: NextFunction): void {
// 	const ceramicStyle = req.body;

// 	FeatureModel.create(ceramicStyle)
// 		.then((ceramicStyle) => {
// 			const { _id, ...styleData } = ceramicStyle.toObject();
// 			res.status(201).send(styleData);
// 		})
// 		.catch((error) => {
// 			if (error.name === 'CastError') {
// 				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID));
// 			}

// 			if (error.name === 'ValidationError') {
// 				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA));
// 			}

// 			if (error.code === 11000) {
// 				return next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS));
// 			}

// 			return next(error);
// 		});
// }

async function deleteFeature(req: Request<{ name: string }>, res: Response, next: NextFunction) {
	try {
		const name = req.params.name;

		const feature = await FeatureModel.findOneAndDelete({ name })
			.orFail()
			.select('name');

		res.send(feature);
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.FEATURE); }
}

// function deleteFeature(req: Request<{ name: string }>, res: Response, next: NextFunction): void {
// 	const name = req.params.name;
// 	FeatureModel.findOneAndDelete({ name })
// 		.orFail()
// 		.select('name')
// 		.then(style => res.send(style))
// 		.catch((error) => {
// 			if (error.name === 'CastError') {
// 				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID));
// 			}

// 			if (error.name === 'DocumentNotFoundError') {
// 				return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
// 			}

// 			return next(error);
// 		});
// }

async function updateFeature(req: Request<{ name: string }>, res: Response, next: NextFunction): Promise<void> {
	try {
		const style = await FeatureModel.findOneAndUpdate(
			{ name: req.params.name },
			req.body,
			{
				returnDocument: 'after',
				runValidators: true,
			},
		)
			.select('-_id')
			.orFail();

		res.send(style);
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.FEATURE); }
}

// function updateFeature(req: Request<{ name: string }>, res: Response, next: NextFunction): void {
// 	const newCeramicStyleData: Feature = req.body;
// 	const ceramicStyleName = req.params.name;

// 	FeatureModel.findOneAndUpdate(
// 		{ name: ceramicStyleName },
// 		newCeramicStyleData,
// 		{ returnDocument: 'after', runValidators: true },
// 	)
// 		.select('-_id')
// 		.orFail()
// 		.then(style => res.send(style))
// 		.catch((error) => {
// 			if (error.name === 'DocumentNotFoundError') {
// 				return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
// 			}

// 			if (error.name === 'ValidationError') {
// 				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_DATA));
// 			}

// 			if (error.name === 'CastError') {
// 				return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
// 			}

// 			if (error.code === 11000) {
// 				return next(new ConflictError(ERROR_MESSAGES.CATEGORY_EXISTS));
// 			}

// 			return next(error);
// 		});
// }

export const features = {
	getFeatures,
	getFeaturesArticlesList,
	getFeatureArticle,
	createFeature,
	updateFeature,
	deleteFeature,
};
