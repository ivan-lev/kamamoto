import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ERROR_MESSAGES } from '../variables/messages';

// statusCode есть у наших ошибок (errors/*) и у ошибок body-parser (например, битый JSON → 400)
function getStatusCode(err: unknown): number {
	if (typeof err === 'object' && err !== null && 'statusCode' in err && typeof err.statusCode === 'number')
		return err.statusCode;

	return 500;
}

const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
	const statusCode = getStatusCode(err);

	res.status(statusCode).send({
		// текст 500-й ошибки клиенту не показываем: в нём могут быть детали сервера
		message: statusCode === 500 || !(err instanceof Error) ? ERROR_MESSAGES.DEFAULT_MESSAGE : err.message,
	});
	return next();
};

export default errorHandler;
