const Joi = require("joi");

exports.schemas = {
    user: Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        pass: Joi.string()
            .min(6)
            .max(8)
            .required()
    }),
    login: Joi.object({})
}