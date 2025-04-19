import { celebrate, Joi } from 'celebrate';
import { REGEX } from '../../constants';

export const exhibitionValidator = celebrate({
	body: Joi.object().keys({
		id: Joi.number().greater(0).required(),
		year: Joi.number().greater(2020).required(),
		dates: Joi.string().min(5).required(),
		city: Joi.string().required(),
		address: Joi.string().required(),
		place: Joi.string().required(),
		name: Joi.string().required(),
		link: Joi.string().allow('').pattern(REGEX.URL),
		description: Joi.string().allow('').required(),
		photos: Joi.array().items(Joi.string()),
		poster: Joi.string().allow(''),
		curators: Joi.string().allow(''),
		organisators: Joi.string().allow(''),
		isActive: Joi.boolean().required(),
	}),
});

export const exhibitionIdValidator = celebrate({
	params: Joi.object().keys({
		id: Joi.number().greater(0).required(),
	}),
});
