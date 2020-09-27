import Joi = require('@hapi/joi');
import { LoginRequest } from './login.request';

export const LoginRequestValidationSchema = Joi.object<LoginRequest>({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});
