import type { NextFunction, Request, Response } from 'express';
import type { Partner as PartnerType } from '../types/partner';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import Partner from '../models/partner';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

async function getPartners(req: Request, res: Response, next: NextFunction) {
	// check if request was made from admin panel
	// and return thumb in appropriate format below
	const isAdmin = req.headers['is-admin'];
	try {
		const partners = await Partner.find({});
		const newPartners = partners.map((partner: PartnerType) => {
			const { _id, isActive, link, logo, title } = partner;
			const logoPath = `${PATHS.PUBLIC_URL}/${PATHS.PARTNERS}/${logo}`;
			return { _id, isActive, link, title, logo: isAdmin === 'true' ? logo : logoPath };
		});
		res.send(newPartners);
	}
	catch (error) {
		return next(error);
	};
}

function createPartner(req: Request, res: Response, next: NextFunction): void {
	const partner = req.body;

	Partner.create({ ...partner })
		.then(partner => res.status(201).send(partner))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.PARTNER_EXISTS));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
			}

			return next(error);
		});
}

function getPartnerById(req: Request, res: Response, next: NextFunction): void {
	Partner.findOne({ _id: req.params._id })
		.orFail()
		.then((partner) => {
			res.send(partner);
		})
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
			}

			return next(error);
		});
}

function updatePartner(req: Request, res: Response, next: NextFunction): void {
	const newPartnerData: PartnerType = req.body;
	Partner.findOneAndUpdate({ _id: req.params._id }, newPartnerData, {
		new: true,
		runValidators: true,
	})
		.orFail()
		.then(partner => res.send(partner))
		.catch((error) => {
			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_DATA));
			}

			if (error.name === 'CastError') {
				return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
			}

			return next(error);
		});
}

function deletePartner(req: Request, res: Response, next: NextFunction): void {
	Partner.findOneAndDelete({ _id: req.params._id })
		.orFail()
		.select('_id')
		.then(partner => res.send(partner))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
			}

			return next(error);
		});
}

export const partners = {
	createPartner,
	deletePartner,
	getPartnerById,
	getPartners,
	updatePartner,
};
