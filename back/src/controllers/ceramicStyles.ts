import type { NextFunction, Request, Response } from 'express';
import type { CeramicStyle as CeramicStyleType } from '../types/ceramicStyle';
import { ERROR_MESSAGES, PATHS } from '../constants';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';

import CeramicStyle from '../models/ceramicStyle';

const { CERAMIC_STYLES, PUBLIC_PATH } = PATHS;

function getCeramicStyles(req: Request, res: Response, next: NextFunction): void {
	const isAdmin = req.headers['is-admin'];
	CeramicStyle.find({})
		.then((styles) => {
			return styles.map((style: CeramicStyleType) => {
				const { name, thumbnail, images, additionalImages } = style;

				if (isAdmin) {
					return { ...style };
				}
				else {
					style.thumbnail = `${PUBLIC_PATH}/${CERAMIC_STYLES}/${name}/${thumbnail}`;
					const pathToCeramicStyleFolder = `${PUBLIC_PATH}/${CERAMIC_STYLES}/${name}`;

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

					return { ...style };
				}
			});
		})
		.then(categories => res.send(categories))
		.catch((error) => { return next(error); });
}

function createCeramicStyle(req: Request, res: Response, next: NextFunction): void {
	const ceramicStyle = req.body;

	CeramicStyle.create(ceramicStyle)
		.then(ceramicStyle => res.status(201).send(ceramicStyle))
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

export const ceramicStyle = {
	createCeramicStyle,
	getCeramicStyles,
};
