import type { NextFunction, Response } from 'express';

import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config';
import { AuthorizationError } from '../errors/authorization-error';
import { ERROR_MESSAGES } from '../variables/messages';

// проверяет Bearer-токен и кладёт payload в req.user
function verifyToken(req: any, next: NextFunction): void {
	const { authorization }: { authorization: string } = req.headers;

	if (!authorization?.startsWith('Bearer ')) {
		return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
	}

	const token: string = authorization.replace('Bearer ', '');
	let payload;

	try {
		payload = jwt.verify(token, JWT_KEY);
	}
	catch (error) {
		console.error(error);
		return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
	}

	req.user = payload;
	next();
}

// глобальная: GET публичные, остальные методы — по токену. Закрытые GET помечаются requireAuth в роутере
export function auth(req: any, res: Response, next: NextFunction): void {
	if (req.method === 'GET') {
		return next();
	}

	verifyToken(req, next);
}

// GET, которые нужны только админке
export function requireAuth(req: any, res: Response, next: NextFunction): void {
	verifyToken(req, next);
}

// GET для всех: с токеном контроллер отдаёт данные для админки, без — публичные.
// Битый токен — 401, а не публичный ответ: иначе форма админки молча получила бы URL вместо имён файлов
export function optionalAuth(req: any, res: Response, next: NextFunction): void {
	if (!req.headers.authorization) {
		return next();
	}

	verifyToken(req, next);
}
