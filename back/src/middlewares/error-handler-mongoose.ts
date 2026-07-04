import type { NextFunction } from 'express';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';

export interface ErrorMessages {
	WRONG_ID: string;
	WRONG_DATA: string;
	NOT_FOUND: string;
	ALREADY_EXISTS: string;
}

export function handleMongooseError(error: any, next: NextFunction, messages: ErrorMessages) {
	if (error.name === 'CastError' && messages.WRONG_ID) {
		return next(new ValidationError(messages.WRONG_ID));
	}

	if (error.name === 'ValidationError' && messages.WRONG_DATA) {
		return next(new ValidationError(messages.WRONG_DATA));
	}

	if (error.name === 'DocumentNotFoundError' && messages.NOT_FOUND) {
		return next(new NotFoundError(messages.NOT_FOUND));
	}

	if (error.code === 11000 && messages.ALREADY_EXISTS) {
		return next(new ConflictError(messages.ALREADY_EXISTS));
	}

	return next(error);
}
