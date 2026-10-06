import type { NextFunction } from 'express';
import { mongo, Error as MongooseError } from 'mongoose';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';

export interface ErrorMessages {
	WRONG_ID: string;
	WRONG_DATA: string;
	NOT_FOUND: string;
	ALREADY_EXISTS: string;
}

export function handleMongooseError(error: unknown, next: NextFunction, messages: ErrorMessages) {
	if (error instanceof MongooseError.CastError && messages.WRONG_ID) {
		return next(new ValidationError(messages.WRONG_ID));
	}

	if (error instanceof MongooseError.ValidationError && messages.WRONG_DATA) {
		return next(new ValidationError(messages.WRONG_DATA));
	}

	if (error instanceof MongooseError.DocumentNotFoundError && messages.NOT_FOUND) {
		return next(new NotFoundError(messages.NOT_FOUND));
	}

	// дубликат уникального индекса
	if (error instanceof mongo.MongoServerError && error.code === 11000 && messages.ALREADY_EXISTS) {
		return next(new ConflictError(messages.ALREADY_EXISTS));
	}

	return next(error);
}
