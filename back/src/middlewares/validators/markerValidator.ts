import { celebrate, Joi } from 'celebrate';
import { MARKER_GROUP_NAMES } from '../../variables/markerGroups';

export const markerCreateValidator = celebrate({
	body: Joi.object().keys({
		geocode: Joi.array().items(Joi.number()).length(2).required().messages({
			'array.base': 'поле geocode должно быть массивом из двух чисел',
			'array.length': 'поле geocode должно содержать широту и долготу',
			'any.required': 'нужно указать координаты маркера',
		}),
		title: Joi.string().required().messages({
			'string.base': 'поле title должно быть строкой',
			'string.empty': 'поле title не должно быть пустым',
			'any.required': 'нужно указать название маркера',
		}),
		kanji: Joi.string().allow(''),
		romaji: Joi.string().allow(''),
		info: Joi.string().allow(''),
		image: Joi.string().allow(''),
		isActive: Joi.boolean(),
		groupName: Joi.string().valid(...MARKER_GROUP_NAMES).required().messages({
			'any.only': 'поле groupName должно быть одной из существующих групп',
			'any.required': 'нужно указать группу маркера',
		}),
	}),
});

export const markerUpdateValidator = celebrate({
	body: Joi.object().keys({
		_id: Joi.string().hex().required(),
		geocode: Joi.array().items(Joi.number()).length(2).required().messages({
			'array.base': 'поле geocode должно быть массивом из двух чисел',
			'array.length': 'поле geocode должно содержать широту и долготу',
			'any.required': 'нужно указать координаты маркера',
		}),
		title: Joi.string().required().messages({
			'string.base': 'поле title должно быть строкой',
			'string.empty': 'поле title не должно быть пустым',
			'any.required': 'нужно указать название маркера',
		}),
		kanji: Joi.string().allow(''),
		romaji: Joi.string().allow(''),
		info: Joi.string().allow(''),
		image: Joi.string().allow(''),
		isActive: Joi.boolean(),
		groupName: Joi.string().valid(...MARKER_GROUP_NAMES).required().messages({
			'any.only': 'поле groupName должно быть одной из существующих групп',
			'any.required': 'нужно указать группу маркера',
		}),
	}),
});

export const markerIdValidator = celebrate({
	params: Joi.object().keys({
		_id: Joi.string().hex().required(),
	}),
});
