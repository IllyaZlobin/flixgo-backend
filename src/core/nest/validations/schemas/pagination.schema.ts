import Joi = require("@hapi/joi");

export const PaginationSchema = {
  limit: Joi.number().integer().positive().allow(null).optional().default(50),
  offset: Joi.number().integer().min(0).allow(null).optional().default(0),
}