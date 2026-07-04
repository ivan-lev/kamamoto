import type { NextFunction, Request, Response } from 'express';
import type { Error } from 'mongoose';
import type { UserDocument } from '../models/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../config';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import User from '../models/user';
import { ERROR_MESSAGES } from '../variables/messages';

export function login(req: Request, res: Response, next: NextFunction): void {
	const { email, password } = req.body;

	return User.findUserByCredentials(email as string, password as string)
		.then((user: UserDocument) => {
			const token = jwt.sign(
				{ _id: user._id },
				NODE_ENV === 'production' ? JWT_SECRET : 'default-key',
				{ expiresIn: '7d' },
			);
			res.send({ token });
		})
		.catch((error: Error) => { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); });
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
		.catch((error) => { return handleMongooseError(error, next, ERROR_MESSAGES.PARTNER); });
}
