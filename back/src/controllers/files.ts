import type { NextFunction, Request, Response } from 'express';
import type { File as FileType } from '../types/file';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import File from '../models/file';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

function getFiles(req: Request, res: Response, next: NextFunction): void {
	File.find({}, { _id: 0 })
		.then((files: FileType[]) => {
			return files.map((file) => {
				file.name = `${PATHS.PUBLIC_PATH}/${PATHS.LETTERS}/${file.name}`;
				file.thumbnail = `${PATHS.PUBLIC_PATH}/${PATHS.LETTERS}/${file.thumbnail}`;
				return file;
			});
		})
		.then(files => res.send(files))
		.catch((error) => { return next(error); });
}

function createFile(req: Request, res: Response, next: NextFunction): void {
	const file = req.body;

	File.create(file)
		.then(file => res.status(201).send(file))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.FILE_WRONG_ID));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.FILE_WRONG_DATA));
			}

			if (error.code === 11000) {
				return next(new ConflictError(ERROR_MESSAGES.FILE_EXISTS));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.FILE_NOT_FOUND));
			}

			return next(error);
		});
}

function updateFile(req: Request, res: Response, next: NextFunction): void {
	const newFileData: File = req.body;
	File.findOneAndUpdate({ _id: req.params._id }, newFileData, {
		new: true,
		runValidators: true,
	})
		.orFail()
		.then(file => res.send(file))
		.catch((error) => {
			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.FILE_NOT_FOUND));
			}

			if (error.name === 'ValidationError') {
				return next(new ValidationError(ERROR_MESSAGES.FILE_WRONG_DATA));
			}

			if (error.name === 'CastError') {
				return next(new NotFoundError(ERROR_MESSAGES.FILE_NOT_FOUND));
			}

			return next(error);
		});
}

function deleteFile(req: Request, res: Response, next: NextFunction): void {
	File.findOneAndDelete({ id: req.params.id })
		.orFail()
		.select('_id')
		.then(file => res.send(file))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.FILE_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.FILE_NOT_FOUND));
			}

			return next(error);
		});
}

export const files = {
	createFile,
	deleteFile,
	getFiles,
	updateFile,
};
