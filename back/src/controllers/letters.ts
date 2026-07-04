import type { NextFunction, Request, Response } from 'express';
import type { File } from '../types/file';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Letter from '../models/letter';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { STATIC_URL, LETTERS } = PATHS;

function getLetters(req: Request, res: Response, next: NextFunction): void {
	Letter.find({}, { _id: 0 })
		.then((letters: File[]) => {
			return letters.map((letter) => {
				letter.name = `${STATIC_URL}/${LETTERS}/${letter.name}`;
				letter.thumbnail = `${STATIC_URL}/${LETTERS}/${letter.thumbnail}`;
				return letter;
			});
		})
		.then(letters => res.send(letters))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.LETTER); });
}

function createLetter(req: Request, res: Response, next: NextFunction): void {
	const letter = req.body;

	Letter.create({ ...letter })
		.then(letter => res.status(201).send(letter))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.LETTER); });
}

function updateLetter(req: Request, res: Response, next: NextFunction): void {
	const newLetterData: File = req.body;
	Letter.findOneAndUpdate({ _id: req.params._id }, newLetterData, {
		returnDocument: 'after',
		runValidators: true,
	})
		.orFail()
		.then(letter => res.send(letter))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.LETTER); });
}

function deleteLetter(req: Request, res: Response, next: NextFunction): void {
	const id = Number(req.params.id);
	Letter.findOneAndDelete({ id })
		.orFail()
		.select('_id')
		.then(letter => res.send(letter))
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.LETTER); });
}

export const letters = {
	createLetter,
	deleteLetter,
	getLetters,
	updateLetter,
};
