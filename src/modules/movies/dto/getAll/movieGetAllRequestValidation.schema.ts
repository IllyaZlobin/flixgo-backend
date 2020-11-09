import Joi = require("@hapi/joi");
import { PaginationSchema } from "../../../../core/nest";
import { MovieGetAllRequest } from "./movieGetAll.request";

export const MovieGetAllRequestValidationSchema = Joi.object<MovieGetAllRequest>({
    ...PaginationSchema
})