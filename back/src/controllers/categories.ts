import type { NextFunction, Request, Response } from 'express';
import type { Category as CategoryType } from '../types/category';
import type { Exhibit as ExhibitType } from '../types/exhibit';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

function getCategories(req: Request, res: Response, next: NextFunction): void {
	// check if request was made from admin panel
	// and return thumb in appropriate format below
	const isAdmin = req.headers['is-admin'];
	Category.find({})
		.select({ _id: 0 })
		.then((categories) => {
			return categories.map((cat: CategoryType) => {
				const { name, title } = cat;
				const thumbnailPath = `${PATHS.PUBLIC_PATH}/${PATHS.CATEGORIES}/${cat.thumbnail}`;
				return { name, title, thumbnail: isAdmin === 'true' ? cat.thumbnail : thumbnailPath };
			});
		})
		.then(categories => res.send(categories))
		.catch((error) => { return next(error); });
}

function getExhibitsByCategory(req: Request, res: Response, next: NextFunction): void {
	Category.findOne({ category: req.params.category })
		.orFail()
		.then((category) => {
			Exhibit.find({ category: category._id, isActive: true })
				.then((exhibits: ExhibitType[]) => {
					return exhibits.map((exhibit) => {
						const thumbnailPath = `${PATHS.PUBLIC_PATH}/${PATHS.EXHIBITS}/${exhibit.id}/${exhibit.thumbnail}`;
						return { link: exhibit.id.toString(), title: exhibit.name, thumbnail: thumbnailPath };
					});
				})
				.then(exhibits => res.send(exhibits))
				.catch((error: any) => {
					return next(error);
				});
		})
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

function createCategory(req: Request, res: Response, next: NextFunction): void {
	const category = req.body;

	Category.create({ ...category })
		.then(category => res.status(201).send(category))
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

function deleteCategory(req: Request, res: Response, next: NextFunction): void {
	Category.findOneAndDelete({ category: req.params.category })
		.orFail()
		.select('category')
		.then(category => res.send(category))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.CATEGORY_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND));
			}

			return next(error);
		});
}

function updateCategory(req: Request, res: Response, next: NextFunction): void {
	const newCategoryData: CategoryType = req.body;
	Category.findOneAndUpdate({ category: req.params.category }, newCategoryData, {
		new: true,
		runValidators: true,
	})
		.orFail()
		.then(category => res.send(category))
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

export const category = {
	createCategory,
	deleteCategory,
	getCategories,
	// getCategoriesFront,
	getExhibitsByCategory,
	updateCategory,
};
