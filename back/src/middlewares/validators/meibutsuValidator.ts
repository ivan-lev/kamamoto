import { celebrate, Joi } from 'celebrate';
import { REGEX } from '../../variables/regexes';

export const meibutsuValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.string().pattern(/^[a-z0-9-]+$/).required().messages({
			'string.base': 'поле id должно быть строкой',
			'string.empty': 'поле id должно содержать значение',
			'string.pattern.base': 'поле id должно состоять из латинских букв, цифр и дефисов',
			'any.required': 'поле id обязательное',
		}),
		name: Joi.string().min(3).required().messages({
			'string.base': 'название вещи должно быть строкой',
			'string.empty': 'название вещи не должно быть пустым',
			'string.min': 'название вещи должно быть длиннее 3 символов',
			'any.required': 'нужно написать название вещи',
		}),
		japaneseName: Joi.string().allow(''),
		photo: Joi.string().pattern(REGEX.IMAGE).allow('').messages({
			'string.pattern.base': 'поле photo должно состоять из английских букв и заканчиваться на jpg или webp',
		}),
		info: Joi.string().allow(''),
		showArticle: Joi.boolean().messages({
			'boolean.base': 'поле showArticle должно быть булевым',
		}),
		article: Joi.allow(),
	}),
});

export const meibutsuIdValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.string().required(),
	}),
});
