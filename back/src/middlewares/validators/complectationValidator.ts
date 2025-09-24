import { celebrate, Joi } from 'celebrate';

export const complectationNameValidator = celebrate({
	body: Joi.object().keys({
		name: Joi.string().required(),
	}),
});

export const complectationValidator = celebrate({
	body: Joi.object().keys({
		title: Joi.string().required(),
		name: Joi.string().required(),
	}),
});
