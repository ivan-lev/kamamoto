import type { NextFunction, Request, Response } from 'express';
import type { Term as ITerm } from '../types/term';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Term from '../models/term';
import { removeImage } from '../utils/images';
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
		const previousTerm = await Term.findOne({ id: req.params.id }).lean<ITerm>().orFail();
		const result = await Term.findOneAndUpdate(
			{ id: req.params.id },
			term,
			{ returnDocument: 'after', runValidators: true },
		).select({ _id: 0 }).orFail();

		// картинку заменили или убрали — старый файл больше не нужен, если на него не ссылается другой термин
		const previousImage = previousTerm.image;
		if (previousImage && previousImage !== result.image && !(await Term.exists({ image: previousImage })))
			await removeImage('dictionary', previousImage);

		res.status(201).send(result);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.TERM); }
}

async function deleteTerm(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await Term.findOneAndDelete({ id: req.params.id }).orFail();

		// картинка удалённого термина больше не нужна, если на неё не ссылается другой термин
		if (result.image && !(await Term.exists({ image: result.image })))
			await removeImage('dictionary', result.image);

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
