import type { NextFunction, Request, Response } from 'express';
import type { Category as CategoryType } from '../types/category';
import type { Exhibit as ExhibitType } from '../types/exhibit';
import { ConflictError } from '../errors/conflict-error';
import { handleMongooseError } from '../middlewares/error-handler-mongoose';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { STATIC_URL, CATEGORIES, EXHIBITS } = PATHS;

async function getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
	// check if request was made from admin panel
	// and return thumb in appropriate format below
	const isAdmin = req.headers['is-admin'];
	try {
		const categories = await Category.find({}).select({ _id: 0 });
		const result = categories.map((cat: CategoryType) => {
			const { name, title } = cat;
			const thumbnailPath = `${STATIC_URL}/${CATEGORIES}/${cat.thumbnail}`;
			return { name, title, thumbnail: isAdmin === 'true' ? cat.thumbnail : thumbnailPath };
		});
		res.send(result);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

async function getExhibitsByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
	let category;
	try {
		category = await Category.findOne({ name: req.params.name }).orFail();
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
		return;
	}

	try {
		const exhibits: ExhibitType[] = await Exhibit.find({ category: category._id, isActive: true });
		const result = exhibits.map((exhibit) => {
			const thumbnailPath = `${STATIC_URL}/${EXHIBITS}/${exhibit.id}/${exhibit.thumbnail}`;
			return { link: exhibit.id.toString(), title: exhibit.name, thumbnail: thumbnailPath };
		});
		res.send(result);
	}
	catch (error) {
		next(error);
	}
}

async function createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
	const category = req.body;

	try {
		const createdCategory = await Category.create({ ...category });
		res.status(201).send(createdCategory);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

async function deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const category = await Category.findOne({ name: req.params.name }).orFail();

		// без проверки лоты остались бы со ссылкой в никуда, и их страницы падали бы с 500
		if (await Exhibit.exists({ category: category._id })) {
			next(new ConflictError(ERROR_MESSAGES.CATEGORY.HAS_EXHIBITS));
			return;
		}

		await category.deleteOne();
		res.send({ name: category.name });
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

async function updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
	const newCategoryData: CategoryType = req.body;
	try {
		const category = await Category.findOneAndUpdate({ name: req.params.name }, newCategoryData, {
			returnDocument: 'after',
			runValidators: true,
		}).select({ _id: 0 }).orFail();
		res.send(category);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.CATEGORY);
	}
}

export const category = {
	createCategory,
	deleteCategory,
	getCategories,
	getExhibitsByCategory,
	updateCategory,
};
