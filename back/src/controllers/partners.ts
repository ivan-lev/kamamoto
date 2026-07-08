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

async function createPartner(req: Request, res: Response, next: NextFunction): Promise<void> {
	const partner = req.body;

	try {
		const createdPartner = await Partner.create({ ...partner });
		res.status(201).send(createdPartner);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.PARTNER);
	}
}

async function getPartnerById(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const partner = await Partner.findOne({ _id: req.params._id }).orFail();
		res.send(partner);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.PARTNER);
	}
}

async function updatePartner(req: Request, res: Response, next: NextFunction): Promise<void> {
	const newPartnerData: PartnerType = req.body;
	try {
		const partner = await Partner.findOneAndUpdate({ _id: req.params._id }, newPartnerData, {
			returnDocument: 'after',
			runValidators: true,
		}).orFail();
		res.send(partner);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.PARTNER);
	}
}

async function deletePartner(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const partner = await Partner.findOneAndDelete({ _id: req.params._id }).orFail().select('_id');
		res.send(partner);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.PARTNER);
	}
}

export const partners = {
	createPartner,
	deletePartner,
	getPartnerById,
	getPartners,
	updatePartner,
};
