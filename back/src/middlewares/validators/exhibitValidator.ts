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
		potterName: Joi.string().allow(''),
		potterJapaneseName: Joi.string().allow(''),
		potterLifeDates: Joi.string().min(5).allow(''),
		potterPhoto: Joi.string().allow(''),
		potterInfo: Joi.string().allow(''),
		additionalDescription: Joi.string().allow(''),
		price: Joi.number(),
		weight: Joi.number(),
		height: Joi.number(),
		length: Joi.number(),
		width: Joi.number(),
		diameter: Joi.number(),
		footDiameter: Joi.number(),
		volume: Joi.number(),
		weightOfSet: Joi.number(),
		complectation: Joi.string().allow('').required(),
		preservation: Joi.string().allow('').required(),
		isActive: Joi.boolean(),
	}),
});

export const exhibitIdValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.number().min(0).max(9999).required(),
	}),
});
