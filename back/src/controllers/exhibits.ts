import type { NextFunction, Request, Response } from 'express';
import type { Exhibit as ExhibitType } from '../types/exhibit';
import type { Potter as IPotter } from '../types/potter';
import type { Style as IStyle } from '../types/style';
import { NotFoundError } from '../errors/not-found-error';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Category from '../models/category';
import Complectation from '../models/complectation';
import Exhibit from '../models/exhibit';
import Potter from '../models/potter';
import Style from '../models/style';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { CERAMIC_STYLES, EXHIBITS, POTTERS, STATIC_URL } = PATHS;

async function getExhibits(req: Request, res: Response, next: NextFunction) {
	try {
		const exhibits = await Exhibit
			.find({})
			.select({ _id: 0 })
			.populate([
				{	path: 'category', select: 'title name -_id' },
				{ path: 'style', select: 'title name -_id' },
				{ path: 'potter', select: 'id name -_id' },
			]);

		res.send(exhibits.sort((first, second) => first.id - second.id));
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBIT); }
}

async function findExhibitById(req: Request, res: Response, next: NextFunction) {
	const id = Number(req.params.id);
	try {
		const exhibit = await Exhibit.findOne({ id }, '-_id')
			.populate<{ style: IStyle; potter: IPotter }>([
				{ path: 'style', select: '-_id name title description mapImage showArticle' },
				{ path: 'potter', select: '-_id' },
			])
			.lean()
			.orFail();

		if (!exhibit.isActive) {
			return next(new NotFoundError(ERROR_MESSAGES.EXHIBIT.NOT_FOUND));
		}

		const complectations = await Complectation.find(
			{ name: { $in: exhibit.complectation } },
			'-_id name title',
		);

		exhibit.complectation = exhibit.complectation.map((name) => {
			const found = complectations.find(c => c.name === name);
			return found ? found.title : name;
		});

		const pathToExhibitFolder = `${STATIC_URL}/${EXHIBITS}/${exhibit.id}`;

		exhibit.images.forEach((image: string, i: number) => {
			exhibit.images[i] = `${pathToExhibitFolder}/${image}`;
		});

		exhibit.additionalImages.forEach((image: string, i: number) => {
			exhibit.additionalImages[i] = `${pathToExhibitFolder}/additional/${image}`;
		});

		if (exhibit.style.mapImage?.length !== 0 && exhibit.style.mapImage !== undefined) {
			exhibit.style.mapImage = `${STATIC_URL}/${CERAMIC_STYLES}/${exhibit.style.name}/${exhibit.style.mapImage}`;
		}
		else {
			exhibit.style.mapImage = '';
		}

		if (exhibit.potter.photo?.length !== 0 && exhibit.potter.photo !== undefined)
			exhibit.potter.photo = `${STATIC_URL}/${POTTERS}/${exhibit.potter.photo}`;

		res.send(exhibit);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBIT); }
}

async function createExhibit(req: Request, res: Response, next: NextFunction) {
	const exhibit: ExhibitType = req.body;

	try {
		const category = await Category.findOne({ category: exhibit.category });
		const style = await Style.findOne({ name: String(exhibit.style) });
		const potter = await Potter.findOne({ id: String(exhibit.potter) });

		const createdExhibit = await Exhibit.create({
			...exhibit,
			category: category?._id,
			style: style?._id,
			potter: potter?._id,
		});

		const result = await createdExhibit.populate([
			{ path: 'category', select: 'title name -_id' },
			{ path: 'style', select: 'title name -_id' },
			{ path: 'potter', select: 'id name -_id' },
		]);

		res.status(201).send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBIT); }
}

async function deleteExhibit(req: Request, res: Response, next: NextFunction): Promise<void> {
	const id = Number(req.params.id);
	try {
		const exhibit: ExhibitType = await Exhibit.findOneAndDelete({ id }).orFail();
		res.send(exhibit);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.EXHIBIT);
	}
}

async function updateExhibit(req: Request, res: Response, next: NextFunction) {
	const id = Number(req.params.id);
	const exhibit: ExhibitType = req.body;

	try {
		const category = await Category.findOne({ category: exhibit.category });
		const style = await Style.findOne({ name: String(exhibit.style) });
		const potter = await Potter.findOne({ id: String(exhibit.potter) });

		const result = await Exhibit.findOneAndUpdate(
			{ id },
			{ ...exhibit, category: category?._id, style: style?._id, potter: potter?._id },
			{ returnDocument: 'after', runValidators: true },
		).select({ _id: 0 }).orFail().populate([
			{ path: 'category', select: 'name title -_id' },
			{ path: 'style', select: 'name title -_id' },
			{ path: 'potter', select: 'name id -_id' },
		]);

		res.status(201).send(result);
	}
	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.EXHIBIT); }
}

export const exhibit = {
	getExhibits,
	findExhibitById,
	createExhibit,
	deleteExhibit,
	updateExhibit,
};
