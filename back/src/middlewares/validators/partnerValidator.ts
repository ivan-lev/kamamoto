import { celebrate, Joi } from 'celebrate';
import { REGEX } from '../../constants';

export const partnerCreateValidator = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().pattern(REGEX.URL).required(),
    logo: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
});

export const partnerUpdateValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().required(),
    title: Joi.string().required(),
    link: Joi.string().pattern(REGEX.URL).required(),
    logo: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
});

export const partnerIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
});
