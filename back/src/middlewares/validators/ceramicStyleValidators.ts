import { celebrate, Joi } from 'celebrate';
import { REGEX } from '../../variables/regexes';

const { CERAMIC_STYLE_NAME, CERAMIC_STYLE_TITLE } = REGEX;

export const ceramicStyleValidator = celebrate({
	body: Joi.object().keys({
		name: Joi.string().pattern(CERAMIC_STYLE_NAME).required().messages({
			'string.base': 'поле name должно быть строкой',
			'string.empty': 'поле name должно содержать значение',
			'string.pattern.base': 'поле name должно состоять из английских букв a-z',
			'any.required': 'поле name обязательное',
		}),
		title: Joi.string().pattern(CERAMIC_STYLE_TITLE).required().messages({
			'string.base': 'поле title должно быть строкой',
			'string.empty': 'поле title должно содержать значение',
			'string.pattern.base': 'поле title должно состоять из русских букв а-я',
			'any.required': 'поле title обязательное',
		}),
		brief: Joi.string().required().messages({
			'string.base': 'поле brief должно быть строкой',
			'string.empty': 'поле brief должно содержать значение',
			'any.required': 'поле brief обязательное',
		}),
		description: Joi.string().allow('').messages({
			'string.base': 'поле brief должно быть строкой',
		}),
		showArticle: Joi.boolean().messages({
			'boolean.base': 'поле brief должно быть булевым',
		}),
		thumbnail: Joi.string().allow('').pattern(REGEX.IMAGE).messages({
			'string.base': 'поле thumbnail должно быть строкой',
			'string.pattern.base': 'поле thumbnail должно состоять из английских букв и заканчиваться на .jpg',
			'any.required': 'поле thumbnail обязательное',
		}),
		images: Joi.array().items(Joi.string()).messages({
			'array.base': 'в поле images нужно передать массив строк',
		}),
		additionalImages: Joi.array().items(Joi.string()).messages({
			'array.base': 'в поле additionalImages нужно передать массив строк',
		}),
	}),
});

// export const categoryDeleteValidator = celebrate({
// 	params: Joi.object().keys({
// 		category: Joi.string().pattern(REGEX.CATEGORY_EN).required().messages({
// 			'string.base': 'поле category должно быть строкой',
// 			'string.empty': 'поле category должно содержать значение',
// 			'string.pattern.base': 'поле category должно состоять из английских букв a-z',
// 			'any.required': 'поле category обязательное',
// 		}),
// 	}),
// });
