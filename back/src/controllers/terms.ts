import type { NextFunction, Request, Response } from 'express';
import type { Term as ITerm } from '../types/term';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Term from '../models/term';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { DICTIONARY, STATIC_URL } = PATHS;

function withImagePath(term: ITerm, isAdmin: boolean) {
	if (!term.image)
		return term;
	return { ...term, image: isAdmin ? term.image : `${STATIC_URL}/${DICTIONARY}/${term.image}` };
}

async function getTerms(req: Request, res: Response, next: NextFunction) {
	const isAdmin = req.headers['is-admin'] === 'true';

	try {
		const terms = await Term.find({}).select({ _id: 0 }).lean<ITerm[]>();
		terms.sort((a, b) => a.title.localeCompare(b.title, 'ru'));

		const sections = new Map<string, ITerm[]>();
		terms.forEach((term) => {
			const preparedTerm = withImagePath(term, isAdmin);
			const sectionTerms = sections.get(term.letter) ?? [];
			sectionTerms.push(preparedTerm);
			sections.set(term.letter, sectionTerms);
		});

		const result = [...sections.entries()]
			.sort(([letterA], [letterB]) => letterA.localeCompare(letterB, 'ru'))
			.map(([letter, sectionTerms]) => ({ letter, terms: sectionTerms }));

		res.send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.TERM); }
}

async function createTerm(req: Request, res: Response, next: NextFunction) {
	const term: ITerm = req.body;

	try {
		const createdDocument = await Term.create(term);
		if (createdDocument) {
			const result = await Term.findOne({ id: createdDocument.id }).select({ _id: 0 });
			res.status(201).send(result);
		}
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.TERM); }
}

async function updateTerm(req: Request, res: Response, next: NextFunction) {
	const term: ITerm = req.body;

	try {
		const result = await Term.findOneAndUpdate(
			{ id: req.params.id },
			term,
			{ returnDocument: 'after', runValidators: true },
		).select({ _id: 0 }).orFail();

		res.status(201).send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.TERM); }
}

async function deleteTerm(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await Term.findOneAndDelete({ id: req.params.id }).orFail();
		res.send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.TERM); }
}

export const term = {
	getTerms,
	createTerm,
	updateTerm,
	deleteTerm,
};
