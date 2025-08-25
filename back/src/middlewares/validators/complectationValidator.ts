import { celebrate, Joi } from 'celebrate';

export const complectationCreateValidator = celebrate({
	body: Joi.object().keys({
		title: Joi.string().required(),
		name: Joi.string().required(),
	}),
});
