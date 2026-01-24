import type { NextFunction, Request, Response } from 'express';
import type { Exhibit as ExhibitType } from '../types/exhibit';
import type { Potter as IPotter } from '../types/potter';
import type { Style as IStyle } from '../types/style';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Category from '../models/category';
import Exhibit from '../models/exhibit';
import Potter from '../models/potter';
import Style from '../models/style';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { EXHIBITS, POTTERS, STATIC_URL, STYLES } = PATHS;

function getExhibits(req: Request, res: Response, next: NextFunction): void {
	Exhibit
		.find({})
		.select({ _id: 0 })
		.populate({
			path: 'category',
			select: 'title name -_id',
		})
		.populate({
			path: 'style',
			select: 'title name -_id',
		})
		.then((exhibits: ExhibitType[]) => res.send(exhibits))
		.catch((error: any) => { return next(error); });
}

async function findExhibitById(req: Request, res: Response, next: NextFunction) {
	try {
		const exhibit = await Exhibit.findOne({ id: req.params.id }, '-_id')
			.populate<{ style: IStyle }>({ path: 'style', select: '-_id name title brief showArticle mapImage' })
			.populate<{ potter: IPotter }>({ path: 'potter', select: '-_id' })
			.lean()
			.orFail();

		const pathToExhibitFolder = `${STATIC_URL}/${EXHIBITS}/${exhibit.id}`;

		exhibit.images.forEach((image: string, i: number) => {
			exhibit.images[i] = `${pathToExhibitFolder}/${image}`;
		});

		exhibit.additionalImages.forEach((image: string, i: number) => {
			exhibit.additionalImages[i] = `${pathToExhibitFolder}/additional/${image}`;
		});

		exhibit.style.mapImage = `${STATIC_URL}/${STYLES}/${exhibit.style.name}/${exhibit.style.mapImage}`;

		exhibit.potter.photo = `${STATIC_URL}/${POTTERS}/${exhibit.potter.photo}`;

		res.send(exhibit);
	}

	catch (error: any) {
		if (error.name === 'CastError') {
			return next(new ValidationError(ERROR_MESSAGES.EXHIBIT_WRONG_ID));
		}

		if (error.name === 'DocumentNotFoundError') {
			return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT_NOT_FOUND));
		}

		return next(error);
	};
}

async function createExhibit(req: Request, res: Response, next: NextFunction) {
	const exhibit: ExhibitType = req.body;

	try {
		const category = await Category.findOne({ category: exhibit.category });
		const style = await Style.findOne({ name: exhibit.style });
		const potter = await Potter.findOne({ id: exhibit.potter });

		const result = await Exhibit.create({ ...exhibit, category: category?._id, style: style?._id, potter: potter?._id });
		res.status(201).send(result);
	}
	catch (error: any) {
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
	};
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

async function updateExhibit(req: Request, res: Response, next: NextFunction) {
	const exhibit: ExhibitType = req.body;

	try {
		const category = await Category.findOne({ category: exhibit.category });
		const style = await Style.findOne({ name: exhibit.style });

		const result = await Exhibit.findOneAndUpdate(
			{ id: req.params.id },
			{ ...exhibit, category: category?._id, style: style?._id },
			{ new: true, runValidators: true },
		).select({ _id: 0 }).orFail().populate({
			path: 'category',
			select: 'name title -_id',
		}).populate({
			path: 'style',
			select: 'name title -_id',
		});

		res.status(201).send(result);
	}
	catch (error: any) {
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
	};
}

export const exhibit = {
	getExhibits,
	findExhibitById,
	createExhibit,
	deleteExhibit,
	updateExhibit,
};
