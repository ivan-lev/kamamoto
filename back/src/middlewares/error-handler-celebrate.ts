import type { ErrorRequestHandler } from 'express';
import { isCelebrateError } from 'celebrate';
import { ValidationError } from '../errors/validation-error';

const celebrateErrorAdapter: ErrorRequestHandler = (err, req, res, next) => {
	if (isCelebrateError(err)) {
		const segment = err.details.get('body')
			?? err.details.get('params')
			?? err.details.get('query');

		const message = segment?.details[0]?.message ?? 'Ошибка валидации';
		return next(new ValidationError(message));
	}

	return next(err);
};

export default celebrateErrorAdapter;
