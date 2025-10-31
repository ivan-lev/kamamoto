import { celebrate, Joi } from 'celebrate';

export const exhibitValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.number().min(0).max(9999).required(),
		name: Joi.string().min(10).required().messages({
			'string.base': 'название лота должно быть строкой',
			'string.empty': 'название лота не должно быть пустым',
			'string.min': 'название лота должно быть длинее 10 символов',
			'any.required': 'нужно заполнить название лота',
		}),
		age: Joi.string().min(4).allow(''),
		category: Joi.string().required(),
		images: Joi.array().items(Joi.string()).required(),
		additionalImages: Joi.array().items(Joi.string()),
		thumbnail: Joi.string(),
		style: Joi.string().required(),
		description: Joi.string().allow('').required(),
		potter: Joi.string().required(),
		additionalDescription: Joi.string().allow(''),
		price: Joi.number().allow(''),
		weight: Joi.number().allow(''),
		height: Joi.number().allow(''),
		length: Joi.number().allow(''),
		width: Joi.number().allow(''),
		diameter: Joi.number().allow(''),
		footDiameter: Joi.number().allow(''),
		volume: Joi.number().allow(''),
		weightOfSet: Joi.number().allow(''),
		complectation: Joi.array().items(Joi.string()).required(),
		preservation: Joi.string().allow('').required(),
		season: Joi.string().allow(''),
		isActive: Joi.boolean(),
	}),
});

export const exhibitIdValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.number().min(0).required(),
	}),
});
