const Joi = require("joi");

exports.schemas = {
    signup: Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(8)
            .required()
    }),
    signin: Joi.object({}),
    product: Joi.object({
        name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        price: Joi.number()
            .min(5)
            .max(2000),
        category: Joi.string()
            .required(),
        description: Joi.string()
            .required()
            .max(150),
        sizes: Joi.array()
            .items(
                Joi.string()
            )
            .required(),
        totalQty: Joi.number()
            .required(),
        colors: Joi.array()
            .items(
                Joi.string()
            )
            .required(),
        brand: Joi.string(),
        totalQty: Joi.number(),
        totalSold: Joi.number()
    })
}
