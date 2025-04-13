import type { NextFunction, Request, Response } from 'express';
import type { Exhibit as ExhibitType } from '../types/exhibit';
import { ObjectId } from 'mongodb';
import { ERROR_MESSAGES, PATHS } from '../constants';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Exhibit from '../models/exhibit';
import Style from '../models/style';

const { EXHIBITS, PUBLIC_PATH } = PATHS;

function getExhibits(req: Request, res: Response, next: NextFunction): void {
	Exhibit
		.find({})
		.select({ _id: 0 })
		.populate({
			path: 'category',
			select: 'title _id',
		})
		.populate({
			path: 'style',
			select: 'title name -_id',
		})
		.then((exhibits: ExhibitType[]) => res.send(exhibits))
		.catch((error: any) => { return next(error); });
}

function findExhibitById(req: Request, res: Response, next: NextFunction): void {
	Exhibit
		.findOne({ id: req.params.id })
		.populate({
			path: 'style',
			select: 'name title brief showArticle',
		})
		.orFail()
		.then((exhibit: ExhibitType) => {
			const pathToExhibitFolder = `${PUBLIC_PATH}/${EXHIBITS}/${exhibit.id}`;

			if (exhibit.images) {
				exhibit.images.forEach((image, i) => {
					exhibit.images[i] = `${pathToExhibitFolder}/${image}`;
				});
			}

			if (exhibit.additionalImages) {
				exhibit.additionalImages.forEach((image, i) => {
					exhibit.additionalImages[i] = `${pathToExhibitFolder}/additional/${image}`;
				});
			}

			if (exhibit.potterPhoto)
				exhibit.potterPhoto = `${pathToExhibitFolder}/${exhibit.potterPhoto}`;

			res.send(exhibit);
		})
		.catch((error: any) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			return next(error);
		});
}

function createExhibit(req: Request, res: Response, next: NextFunction): void {
	const exhibit = req.body;

	Exhibit.create({ ...exhibit })
		.then((exhibit: ExhibitType) => res.status(201).send(exhibit))
		.catch((error: any) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
			}

			return next(error);
		});
}

function deleteExhibit(req: Request, res: Response, next: NextFunction): void {
	Exhibit.findOneAndDelete({ id: req.params.id })
		.orFail()
		.then((exhibit: ExhibitType) => res.send(exhibit))
		.catch((error: any) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
			}

			return next(error);
		});
}

function updateExhibit(req: Request, res: Response, next: NextFunction): void {
	const newExhibitData: ExhibitType = req.body;
	const newStyle = newExhibitData.style;

	const newCategory = new ObjectId(newExhibitData.category);
	newExhibitData.category = newCategory;

	Style
		.findOne({ name: newStyle })
		.then((style) => {
			newExhibitData.style = new ObjectId(style?._id);
		})
		.then(() => {
			Exhibit.findOneAndUpdate(
				{ id: req.params.id },
				newExhibitData,
				{ new: true, runValidators: true },
			).select({ _id: 0 }).orFail().populate({
				path: 'category',
				select: 'title _id',
			}).populate({
				path: 'style',
				select: 'name title -_id',
			}).then((exhibit: ExhibitType) => res.send(exhibit)).catch((error: any) => {
				if (error.name === 'DocumentNotFoundError') {
					return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
				}

				if (error.name === 'ValidationError') {
					return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_DATA));
				}

				if (error.name === 'CastError') {
					return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
				}

				if (error.code === 11000) {
					return next(new ConflictError(ERROR_MESSAGES.EXHIBIT_EXISTS));
				}

				return next(error);
			});
		});
}

export const exhibit = {
	getExhibits,
	findExhibitById,
	createExhibit,
	deleteExhibit,
	updateExhibit,
};
