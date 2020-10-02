import Joi = require('@hapi/joi');
import {
  MovieGenres,
  MovieQuality,
  MovieStatus,
} from '../../../../core/models';
import { COUNTRIES } from '../../../../core/typeorm/factories/country.factory';
import { MovieCreateRequest } from './movieCreate.request';

export const MovieCreateRequestValidationSchema = Joi.object<MovieCreateRequest>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  release: Joi.number()
    .integer()
    .positive()
    .min(1900),
  runtime: Joi.number().required(),
  genre: Joi.array()
    .items(Joi.string().valid(...Object.keys(MovieGenres)))
    .required().custom((value, helper) => {
      return value.join(',')  
    }),
  age: Joi.number()
    .integer()
    .positive(),
  status: Joi.string()
    .valid(...Object.keys(MovieStatus))
    .required(),
  quality: Joi.string()
    .valid(...Object.keys(MovieQuality))
    .required(),
  country: Joi.string()
    .valid(...COUNTRIES.map(x => x.name))
    .required(),
});
