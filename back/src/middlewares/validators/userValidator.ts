import { celebrate, Joi } from 'celebrate';

export const signInValidator = celebrate({
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});
