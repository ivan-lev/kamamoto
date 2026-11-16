import { celebrate, Joi } from 'celebrate';

export const searchValidator = celebrate({
	query: Joi.object().keys({
		q: Joi.string().trim().min(1).max(200).required().messages({
			'string.base': 'Параметр q должен быть строкой',
			'string.empty': 'Поисковый запрос не может быть пустым',
			'string.max': 'Поисковый запрос не может быть длиннее 200 символов',
			'any.required': 'Параметр q обязателен',
		}),
		limit: Joi.number().integer().min(1).max(50).default(20).messages({
			'number.base': 'Параметр limit должен быть числом',
			'number.integer': 'Параметр limit должен быть целым числом',
			'number.min': 'Параметр limit должен быть не меньше 1',
			'number.max': 'Параметр limit не может быть больше 50',
		}),
	}).unknown(true),
});
