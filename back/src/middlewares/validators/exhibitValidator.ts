import { celebrate, Joi } from 'celebrate';

export const exhibitValidator = celebrate({
  body: Joi.object().keys({
    id: Joi.number().min(0).max(9999).required(),
    name: Joi.string().min(10).required(),
    age: Joi.string().min(4),
    category: Joi.string().hex().length(24).required(),
    thumbnail: Joi.string(),
    style: Joi.string().required(),
    description: Joi.string().required(),
    potterName: Joi.string(),
    potterJapaneseName: Joi.string(),
    potterLifeDates: Joi.string().min(5),
    potterPhoto: Joi.string(),
    potterInfo: Joi.string(),
    additionalDescription: Joi.string(),
    additionalPhotos: Joi.boolean(),
    additionalPhotosCount: Joi.number(),
    price: Joi.number(),
    weight: Joi.number(),
    height: Joi.number(),
    length: Joi.number(),
    width: Joi.number(),
    diameter: Joi.number(),
    footDiameter: Joi.number(),
    volume: Joi.number(),
    weightOfSet: Joi.number(),
    complectation: Joi.string().required(),
    preservation: Joi.string().required(),
  }),
});

export const exhibitIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.number().min(0).max(9999).required(),
  }),
});
