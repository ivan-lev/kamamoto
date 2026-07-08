import type { NextFunction, Request, Response } from 'express';
import type { File } from '../types/file';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Letter from '../models/letter';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { STATIC_URL, LETTERS } = PATHS;

async function getLetters(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const letters: File[] = await Letter.find({}, { _id: 0 });
		const result = letters.map((letter) => {
			letter.name = `${STATIC_URL}/${LETTERS}/${letter.name}`;
			letter.thumbnail = `${STATIC_URL}/${LETTERS}/${letter.thumbnail}`;
			return letter;
		});
		res.send(result);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.LETTER);
	}
}

async function createLetter(req: Request, res: Response, next: NextFunction): Promise<void> {
	const letter = req.body;

	try {
		const createdLetter = await Letter.create({ ...letter });
		res.status(201).send(createdLetter);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.LETTER);
	}
}

async function updateLetter(req: Request, res: Response, next: NextFunction): Promise<void> {
	const newLetterData: File = req.body;
	try {
		const letter = await Letter.findOneAndUpdate({ _id: req.params._id }, newLetterData, {
			returnDocument: 'after',
			runValidators: true,
		}).orFail();
		res.send(letter);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.LETTER);
	}
}

async function deleteLetter(req: Request, res: Response, next: NextFunction): Promise<void> {
	const id = Number(req.params.id);
	try {
		const letter = await Letter.findOneAndDelete({ id }).orFail().select('_id');
		res.send(letter);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.LETTER);
	}
}

export const letters = {
	createLetter,
	deleteLetter,
	getLetters,
	updateLetter,
};
