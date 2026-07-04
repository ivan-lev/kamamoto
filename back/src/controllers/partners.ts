import type { NextFunction, Request, Response } from 'express';
import type { Partner as PartnerType } from '../types/partner';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Partner from '../models/partner';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { STATIC_URL, PARTNERS } = PATHS;

async function getPartners(req: Request, res: Response, next: NextFunction) {
	// check if request was made from admin panel
	// and return thumb in appropriate format below
	const isAdmin = req.headers['is-admin'];
	try {
		const partners = await Partner.find({});
		const newPartners = partners.map((partner: PartnerType) => {
			const { _id, isActive, link, logo, title } = partner;
			const logoPath = `${STATIC_URL}/${PARTNERS}/${logo}`;
			return { _id, isActive, link, title, logo: isAdmin === 'true' ? logo : logoPath };
		});
		res.send(newPartners);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); }
}

function createPartner(req: Request, res: Response, next: NextFunction): void {
	const partner = req.body;

	Partner.create({ ...partner })
		.then(partner => res.status(201).send(partner))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); });
}

function getPartnerById(req: Request, res: Response, next: NextFunction): void {
	Partner.findOne({ _id: req.params._id })
		.orFail()
		.then((partner) => {
			res.send(partner);
		})
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); });
}

function updatePartner(req: Request, res: Response, next: NextFunction): void {
	const newPartnerData: PartnerType = req.body;
	Partner.findOneAndUpdate({ _id: req.params._id }, newPartnerData, {
		returnDocument: 'after',
		runValidators: true,
	})
		.orFail()
		.then(partner => res.send(partner))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); });
}

function deletePartner(req: Request, res: Response, next: NextFunction): void {
	Partner.findOneAndDelete({ _id: req.params._id })
		.orFail()
		.select('_id')
		.then(partner => res.send(partner))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); });
}

export const partners = {
	createPartner,
	deletePartner,
	getPartnerById,
	getPartners,
	updatePartner,
};
