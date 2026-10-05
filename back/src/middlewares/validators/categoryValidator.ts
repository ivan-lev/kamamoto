import { celebrate, Joi } from 'celebrate';
import { REGEX } from '../../variables/regexes';

const name = Joi.string().pattern(REGEX.CATEGORY_EN).required().messages({
	'string.base': 'поле name должно быть строкой',
	'string.empty': 'поле name должно содержать значение',
	'string.pattern.base': 'поле name должно состоять из английских букв a-z',
	'any.required': 'поле name обязательное',
});

const categoryBody = Joi.object().keys({
	name,
	title: Joi.string().pattern(REGEX.CATEGORY_RU).required().messages({
		'string.base': 'поле title должно быть строкой',
		'string.empty': 'поле title должно содержать значение',
		'string.pattern.base': 'поле title должно состоять из русских букв а-я',
		'any.required': 'поле title обязательное',
	}),
	thumbnail: Joi.string().pattern(REGEX.IMAGE).required().messages({
		'string.base': 'поле thumbnail должно быть строкой',
		'string.empty': 'поле thumbnail должно содержать значение',
		'string.pattern.base': 'поле thumbnail должно состоять из английских букв и заканчиваться на jpg или webp',
		'any.required': 'поле thumbnail обязательное',
	}),
});

const categoryParams = Joi.object().keys({ name });

export const categoryValidator = celebrate({ body: categoryBody });

export const categoryUpdateValidator = celebrate({ params: categoryParams, body: categoryBody });

export const categoryDeleteValidator = celebrate({ params: categoryParams });
