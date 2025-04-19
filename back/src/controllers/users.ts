import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../config';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import User from '../models/user';
import { ERROR_MESSAGES } from '../variables/messages';

export function login(req: Request, res: Response, next: NextFunction): void {
	const { email, password } = req.body;

	return User.findUserByCredentials(email as string, password as string)
		.then((user: any) => {
			const token = jwt.sign(
				{ _id: user._id },
				NODE_ENV === 'production' ? JWT_SECRET : 'default-key',
				{ expiresIn: '7d' },
			);
			res.send({ token });
		})
		.catch((error: any) => { next(error); });
}

export function checkToken(req: any, res: Response, next: NextFunction): void {
	const currentUserId = req.user._id;

	User.findById(currentUserId, {
		_id: 1,
		email: 1,
		name: 1,
	})
		.orFail()
		.then(() => res.send({ answer: `Token checked!` }))
		.catch((error) => {
			if (error.name === 'CastError') {
				return next(new ValidationError(ERROR_MESSAGES.USER_WRONG_ID));
			}

			if (error.name === 'DocumentNotFoundError') {
				return next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND));
			}

			return next(error);
		});
}
