import type { NextFunction, Request, Response } from 'express';
import type { File as FileType } from '../types/file';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import File from '../models/file';
import { ERROR_MESSAGES } from '../variables/messages';
import { PATHS } from '../variables/paths';

const { STATIC_URL, LETTERS } = PATHS;

async function getFiles(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const files: FileType[] = await File.find({}, { _id: 0 });
		const result = files.map((file) => {
			file.name = `${STATIC_URL}/${LETTERS}/${file.name}`;
			file.thumbnail = `${STATIC_URL}/${LETTERS}/${file.thumbnail}`;
			return file;
		});
		res.send(result);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.FILE);
	}
}

async function createFile(req: Request, res: Response, next: NextFunction): Promise<void> {
	const file = req.body;

	try {
		const createdFile = await File.create(file);
		res.status(201).send(createdFile);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.FILE);
	}
}

async function updateFile(req: Request, res: Response, next: NextFunction): Promise<void> {
	const newFileData: File = req.body;
	try {
		const file = await File.findOneAndUpdate({ _id: req.params._id }, newFileData, {
			returnDocument: 'after',
			runValidators: true,
		}).orFail();
		res.send(file);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.FILE);
	}
}

async function deleteFile(req: Request, res: Response, next: NextFunction): Promise<void> {
	const id = Number(req.params.id);
	try {
		const file = await File.findOneAndDelete({ id }).orFail().select('_id');
		res.send(file);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.FILE);
	}
}

export const files = {
	createFile,
	deleteFile,
	getFiles,
	updateFile,
};
