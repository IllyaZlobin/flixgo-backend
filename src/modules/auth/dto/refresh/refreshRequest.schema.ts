import Joi = require('@hapi/joi');
import { RefreshRequest } from './refresh.request';

export const RefreshRequestValidationSchema = Joi.object<RefreshRequest>({
  refreshToken: Joi.string().required(),
});
