import type { NextFunction, Request, Response } from 'express';
import type { ArticlePayload, ArticlesListPayload } from '../types/article';
import type { Style as CeramicStyleType } from '../types/style';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import CeramicStyleModel from '../models/style';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { CERAMIC_STYLES, STATIC_URL } = PATHS;

async function getCeramicStyles(req: Request, res: Response, next: NextFunction) {
	const isAdmin = req.headers['is-admin'];

	try {
		const styles = await CeramicStyleModel.find({}, '-_id').lean<CeramicStyleType[]>();

		if (isAdmin === 'false') {
			styles.forEach((style) => {
				const { thumbnail } = style;
				const pathToCeramicStyleFolder = `${STATIC_URL}/${CERAMIC_STYLES}/${style.name}`;
				if (thumbnail)
					style.thumbnail = `${pathToCeramicStyleFolder}/${thumbnail}`;
			});
		}

		res.send(styles.sort((a, b) => a.title.localeCompare(b.title)));
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.CERAMIC_STYLE); }
}

async function getCeramicStylesArticlesList(req: Request, res: Response, next: NextFunction) {
	try {
		const articlesList = await CeramicStyleModel.find({ showArticle: true }, '-_id -article -description -mapImage -showArticle').lean<ArticlesListPayload[]>();

		articlesList.forEach((article) => {
			const { thumbnail } = article;
			const pathToCeramicStyleFolder = `${STATIC_URL}/${CERAMIC_STYLES}/${article.name}`;
			if (thumbnail)
				article.thumbnail = `${pathToCeramicStyleFolder}/${thumbnail}`;
		});

		res.send(articlesList.sort((a, b) => a.title.localeCompare(b.title)));
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.CERAMIC_STYLE); }
}

async function getCeramicStylesArticle(req: Request, res: Response, next: NextFunction) {
	const { style } = req.params;
	try {
		const articleData = await CeramicStyleModel.findOne({ name: style }, '-_id title name article showArticle').lean<ArticlePayload>();

		if (articleData === null || articleData.showArticle === false) {
			res.status(404);
			res.send();
			return;
		}

		const { title, name, article } = articleData;

		const pathToSlidesFolder = `${STATIC_URL}/${CERAMIC_STYLES}/${name}`;
		article.forEach(section => section.slides?.forEach((slide) => {
			if (!slide.filename.startsWith('http')) {
				slide.filename = `${pathToSlidesFolder}/slides/${slide.filename}`;
			}
		}));

		res.send({ title, name, article });
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.CERAMIC_STYLE); }
};

async function createCeramicStyle(req: Request, res: Response, next: NextFunction): Promise<void> {
	const ceramicStyle = req.body;

	try {
		const createdStyle = await CeramicStyleModel.create(ceramicStyle);
		const { _id, ...styleData } = createdStyle.toObject();
		res.status(201).send(styleData);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

async function deleteCeramicStyle(req: Request<{ name: string }>, res: Response, next: NextFunction): Promise<void> {
	const name = req.params.name;
	try {
		const style = await CeramicStyleModel.findOneAndDelete({ name }).orFail().select('name');
		res.send(style);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

async function updateCeramicStyle(req: Request<{ name: string }>, res: Response, next: NextFunction): Promise<void> {
	const newCeramicStyleData: CeramicStyleType = req.body;
	const ceramicStyleName = req.params.name;

	try {
		const style = await CeramicStyleModel.findOneAndUpdate(
			{ name: ceramicStyleName },
			newCeramicStyleData,
			{ returnDocument: 'after', runValidators: true },
		).select('-_id').orFail();
		res.send(style);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

export const ceramicStyle = {
	createCeramicStyle,
	getCeramicStyles,
	getCeramicStylesArticlesList,
	getCeramicStylesArticle,
	updateCeramicStyle,
	deleteCeramicStyle,
};
