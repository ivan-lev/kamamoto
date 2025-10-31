import { celebrate, Joi } from 'celebrate';

export const potterValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.string().required().messages({
			'string.base': 'нужно задать непустое уникальное имя',
		}),
		name: Joi.string().min(6).required().messages({
			'string.base': 'имя гончара должно быть строкой',
			'string.empty': 'имя гончара не должно быть пустым',
			'string.min': 'имя гончара должно быть длинее 6 символов',
			'any.required': 'нужно написать имя гончара',
		}),
		japaneseName: Joi.string().allow(''),
		lifeDates: Joi.string().allow(''),
		photo: Joi.string().allow(''),
		info: Joi.string().allow(''),
	}),
});

export const potterIdValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.string().required(),
	}),
});
