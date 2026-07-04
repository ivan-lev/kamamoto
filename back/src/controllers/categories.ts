import type { NextFunction, Request, Response } from 'express';
import type { Category as CategoryType } from '../types/category';
import type { Exhibit as ExhibitType } from '../types/exhibit';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { STATIC_URL, CATEGORIES, EXHIBITS } = PATHS;

function getCategories(req: Request, res: Response, next: NextFunction): void {
	// check if request was made from admin panel
	// and return thumb in appropriate format below
	const isAdmin = req.headers['is-admin'];
	Category.find({})
		.select({ _id: 0 })
		.then((categories) => {
			return categories.map((cat: CategoryType) => {
				const { name, title } = cat;
				const thumbnailPath = `${STATIC_URL}/${CATEGORIES}/${cat.thumbnail}`;
				return { name, title, thumbnail: isAdmin === 'true' ? cat.thumbnail : thumbnailPath };
			});
		})
		.then(categories => res.send(categories))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY); });
}

function getExhibitsByCategory(req: Request, res: Response, next: NextFunction): void {
	Category.findOne({ category: req.params.category })
		.orFail()
		.then((category) => {
			Exhibit.find({ category: category._id, isActive: true })
				.then((exhibits: ExhibitType[]) => {
					return exhibits.map((exhibit) => {
						const thumbnailPath = `${STATIC_URL}/${EXHIBITS}/${exhibit.id}/${exhibit.thumbnail}`;
						return { link: exhibit.id.toString(), title: exhibit.name, thumbnail: thumbnailPath };
					});
				})
				.then(exhibits => res.send(exhibits))
				.catch((error) => {
					return next(error);
				});
		})
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY); });
}

function createCategory(req: Request, res: Response, next: NextFunction): void {
	const category = req.body;

	Category.create({ ...category })
		.then(category => res.status(201).send(category))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY); });
}

function deleteCategory(req: Request, res: Response, next: NextFunction): void {
	Category.findOneAndDelete({ category: req.params.category })
		.orFail()
		.select('category')
		.then(category => res.send(category))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY); });
}

function updateCategory(req: Request, res: Response, next: NextFunction): void {
	const newCategoryData: CategoryType = req.body;
	Category.findOneAndUpdate({ category: req.params.category }, newCategoryData, {
		returnDocument: 'after',
		runValidators: true,
	})
		.orFail()
		.then(category => res.send(category))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY); });
}

export const category = {
	createCategory,
	deleteCategory,
	getCategories,
	getExhibitsByCategory,
	updateCategory,
};
