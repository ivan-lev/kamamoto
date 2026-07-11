import { celebrate, Joi } from 'celebrate';
import { REGEX } from '../../variables/regexes';

export const termValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.string().pattern(/^[a-z0-9-]+$/).required().messages({
			'string.base': 'поле id должно быть строкой',
			'string.empty': 'поле id должно содержать значение',
			'string.pattern.base': 'поле id должно состоять из латинских букв, цифр и дефисов',
			'any.required': 'поле id обязательное',
		}),
		title: Joi.string().required().messages({
			'string.base': 'поле title должно быть строкой',
			'string.empty': 'поле title должно содержать значение',
			'any.required': 'поле title обязательное',
		}),
		kanji: Joi.string().allow('').messages({
			'string.base': 'поле kanji должно быть строкой',
		}),
		romaji: Joi.string().allow(''),
		image: Joi.string().pattern(REGEX.IMAGE).allow('').messages({
			'string.pattern.base': 'поле image должно состоять из английских букв и заканчиваться на jpg или webp',
		}),
		definition: Joi.string().required().messages({
			'string.base': 'поле definition должно быть строкой',
			'string.empty': 'поле definition должно содержать значение',
			'any.required': 'поле definition обязательное',
		}),
		letter: Joi.string().required().messages({
			'string.base': 'поле letter должно быть строкой',
			'string.empty': 'поле letter должно содержать значение',
			'any.required': 'поле letter обязательное',
		}),
	}),
});

export const termIdValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.string().required(),
	}),
});
