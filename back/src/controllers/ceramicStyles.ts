import type { NextFunction, Request, Response } from 'express';
import type { Style as CeramicStyleType } from '../types/style';
import type { DeleteCeramicStyleParams, UpdateCeramicStyleParams } from './ceramicStyles.types';
import { ERROR_MESSAGES, PATHS } from '../constants';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';

import { ValidationError } from '../errors/validation-error';
import CeramicStyleModel from '../models/style';

const { CERAMIC_STYLES, PUBLIC_PATH } = PATHS;

function getCeramicStyles(req: Request, res: Response, next: NextFunction): void {
	const isAdmin = req.headers['is-admin'];
	CeramicStyleModel.find({}, '-_id')
		.then((styles) => {
			if (!isAdmin) {
				styles.forEach((style) => {
					const { thumbnail, images, additionalImages } = style;
					const pathToCeramicStyleFolder = `${PUBLIC_PATH}/${CERAMIC_STYLES}/${style.name}`;
					if (thumbnail)
						style.thumbnail = `${pathToCeramicStyleFolder}/${thumbnail}`;

					if (images) {
						images.forEach((image, i) => {
							images[i] = `${pathToCeramicStyleFolder}/${image}`;
						});
					}

					if (additionalImages) {
						additionalImages.forEach((image, i) => {
							additionalImages[i] = `${pathToCeramicStyleFolder}/additional/${image}`;
						});
					}
				});
			}

			return styles;
		})
		.then(styles => res.send(styles))
		.catch((error) => { return next(error); });
}

function createCeramicStyle(req: Request, res: Response, next: NextFunction): void {
	const ceramicStyle = req.body;

	CeramicStyleModel.create(ceramicStyle)
		.then((ceramicStyle) => {
			const { _id, ...otherFileds } = ceramicStyle.toObject();
			res.status(201).send(otherFileds);
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
	updateCeramicStyle,
	deleteCeramicStyle,
};
