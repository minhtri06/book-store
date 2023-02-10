const customValidation = require("./custom-validation")
const Joi = require("joi")

const commonElements = {
    user: {
        name: Joi.string(),
        password: Joi.string().alphanum().min(6).max(30),
        email: Joi.string().email(),
        role: Joi.string().valid("user", "admin"),
        avatar: Joi.string(),
    },
    query: {
        limit: Joi.number().integer(),
        page: Joi.number().integer(),

        attributes: Joi.string()
            .regex(/^[a-zA-Z0-9,]{1,}$/)
            .custom(customValidation.query.splitByCommas),

        attributesExclude: Joi.string()
            .regex(/^[a-zA-Z0-9,]{1,}$/)
            .custom(customValidation.query.splitByCommas),

        include: Joi.string()
            .regex(/^[a-zA-Z0-9,]{1,}$/)
            .custom(customValidation.query.splitByCommas),

        sortBy: (allowedFields) =>
            Joi.string()
                .regex(/^[a-zA-Z0-9,-]{1,}$/)
                .custom(customValidation.query.sortBy(allowedFields)),

        numericFilters: (allowedFields) =>
            Joi.string()
                .regex(/^[a-zA-Z0-9,<>=.]{1,}$/)
                .custom(customValidation.query.numericFilters(allowedFields)),
    },
}
module.exports = commonElements
