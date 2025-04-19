import { celebrate, Joi } from 'celebrate';

export const fileValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.number().required(),
		name: Joi.string().required(),
		preview: Joi.string().required(),
		description: Joi.string().required(),
		isActive: Joi.boolean().required(),
	}),
});

export const fileDeleteValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.number().required(),
	}),
});
