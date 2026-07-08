import type { NextFunction, Request, Response } from 'express';
import type { Error } from 'mongoose';
import type { UserDocument } from '../models/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../config';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import User from '../models/user';
import { ERROR_MESSAGES } from '../variables/messages';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { email, password } = req.body;

	try {
		const user: UserDocument = await User.findUserByCredentials(email as string, password as string);
		const token = jwt.sign(
			{ _id: user._id },
			NODE_ENV === 'production' ? JWT_SECRET : 'default-key',
			{ expiresIn: '7d' },
		);
		res.send({ token });
	}
	catch (error) {
		handleMongooseError(error as Error, next, ERROR_MESSAGES.PARTNER);
	}
}

export async function checkToken(req: any, res: Response, next: NextFunction): Promise<void> {
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
		handleMongooseError(error, next, ERROR_MESSAGES.PARTNER);
	}
}
