import type { NextFunction, Request, Response } from 'express';
import type { AuthRequest } from '../types/auth';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config';
import { AuthorizationError } from '../errors/authorization-error';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import User from '../models/user';
import { ERROR_MESSAGES } from '../variables/messages';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { email, password } = req.body;

	try {
		const user = await User.findUserByCredentials(email as string, password as string);
		const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
		res.send({ token });
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.USER);
	}
}

export async function checkToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
	// роут закрыт requireAuth, но без этой проверки контракт держался бы только на роутере
	if (!req.user)
		return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));

	const currentUserId = req.user._id;

	try {
		await User.findById(currentUserId, {
			_id: 1,
			email: 1,
			name: 1,
		}).orFail();
		res.send({ answer: `Token checked!` });
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.USER);
	}
}
